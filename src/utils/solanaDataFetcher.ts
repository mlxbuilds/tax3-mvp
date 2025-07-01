import { Connection, PublicKey, ParsedTransactionWithMeta, PartiallyDecodedInstruction } from '@solana/web3.js';
import { Transaction } from '@/types/transaction';

export interface SolanaTransaction {
  signature: string;
  slot: number;
  timestamp: number;
  fee: number;
  status: 'success' | 'failed';
  instructions: unknown[];
}

class RateLimiter {
  private callTimes: number[] = [];
  private readonly maxCallsPerSecond: number;
  private readonly timeWindow: number = 1000; // 1 second in milliseconds

  constructor(maxCallsPerSecond: number = 9) {
    this.maxCallsPerSecond = maxCallsPerSecond;
  }

  async waitForNextCall(): Promise<void> {
    const now = Date.now();
    
    // Remove calls older than 1 second
    this.callTimes = this.callTimes.filter(time => now - time < this.timeWindow);
    
    // If we've made too many calls in the last second, wait
    if (this.callTimes.length >= this.maxCallsPerSecond) {
      const oldestCall = this.callTimes[0];
      const waitTime = this.timeWindow - (now - oldestCall);
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime + 10)); // Add 10ms buffer
        return this.waitForNextCall(); // Recursively check again
      }
    }
    
    // Record this call
    this.callTimes.push(now);
  }
}

export class SolanaDataFetcher {
  private connection: Connection;
  private priceCache: Map<string, { price: number; timestamp: number }> = new Map();
  private rateLimiter: RateLimiter;

  constructor(rpcEndpoint: string) {
    this.connection = new Connection(rpcEndpoint, 'confirmed');
    this.rateLimiter = new RateLimiter(9); // 9 calls per second
  }

  async fetchWalletTransactions(
    walletAddress: string,
    limit: number = 1000
  ): Promise<Transaction[]> {
    try {
      const publicKey = new PublicKey(walletAddress);
      
      // Rate limit the initial signatures call
      await this.rateLimiter.waitForNextCall();
      const signatures = await this.connection.getSignaturesForAddress(
        publicKey,
        { limit }
      );

      const transactions: Transaction[] = [];
      const batchSize = 5; // Reduced batch size to better control rate limiting

      for (let i = 0; i < signatures.length; i += batchSize) {
        const batch = signatures.slice(i, i + batchSize);
        
        // Process each transaction in the batch with rate limiting
        for (const sig of batch) {
          await this.rateLimiter.waitForNextCall();
          
          try {
            const parsedTransaction = await this.connection.getParsedTransaction(sig.signature, {
              maxSupportedTransactionVersion: 0
            });
            
            if (parsedTransaction) {
              const processedTx = await this.processTransaction(
                parsedTransaction,
                walletAddress,
                sig.signature
              );
              
              if (processedTx.length > 0) {
                transactions.push(...processedTx);
              }
            }
          } catch (txError) {
            console.warn(`Failed to process transaction ${sig.signature}:`, txError);
            // Continue processing other transactions
          }
        }
      }

      return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    } catch (error) {
      console.error('Error fetching transactions for wallet:', walletAddress, error);
      throw new Error(`Failed to fetch transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async processTransaction(
    parsedTx: ParsedTransactionWithMeta,
    walletAddress: string,
    signature: string
  ): Promise<Transaction[]> {
    if (!parsedTx || !parsedTx.meta || parsedTx.meta.err) {
      return [];
    }

    const transactions: Transaction[] = [];
    const timestamp = new Date((parsedTx.blockTime || 0) * 1000);
    const walletPubkey = new PublicKey(walletAddress);

    // Process SOL transfers
    const preBalances = parsedTx.meta.preBalances;
    const postBalances = parsedTx.meta.postBalances;
    const accountKeys = parsedTx.transaction.message.accountKeys;

    for (let i = 0; i < accountKeys.length; i++) {
      if (accountKeys[i].pubkey.equals(walletPubkey)) {
        const preBalance = preBalances[i] / 1000000000; // Convert lamports to SOL
        const postBalance = postBalances[i] / 1000000000;
        const netChange = postBalance - preBalance;
        const fee = parsedTx.meta.fee / 1000000000;

        if (Math.abs(netChange) > 0.001) { // Only include significant changes
          const solPrice = await this.getTokenPrice('SOL', timestamp);
          
          transactions.push({
            id: `${signature}_sol_${i}`,
            type: this.determineTransactionType(parsedTx),
            direction: netChange > 0 ? 'in' : 'out',
            amount: Math.abs(netChange),
            token: 'SOL',
            timestamp,
            signature,
            price: solPrice,
            classification: 'unclassified',
            walletAddress: `${walletAddress.slice(0, 8)}...${walletAddress.slice(-4)}`,
            walletLabel: 'Connected Wallet'
          });
        }
      }
    }

    // Process SPL token transfers
    if (parsedTx.meta.innerInstructions) {
      for (const innerInstruction of parsedTx.meta.innerInstructions) {
        for (const instruction of innerInstruction.instructions) {
          if ('parsed' in instruction && instruction.program === 'spl-token') {
            const parsedInfo = instruction.parsed.info;
            
            if (instruction.parsed.type === 'transfer' || instruction.parsed.type === 'transferChecked') {
              const source = parsedInfo.source || parsedInfo.account;
              const destination = parsedInfo.destination;
              const amount = parsedInfo.amount || parsedInfo.tokenAmount?.amount;
              const decimals = parsedInfo.decimals || parsedInfo.tokenAmount?.decimals || 6;

              // Check if this wallet is involved in the transfer
              const sourceOwner = await this.getTokenAccountOwner(source);
              const destinationOwner = await this.getTokenAccountOwner(destination);

              if (sourceOwner === walletAddress || destinationOwner === walletAddress) {
                const adjustedAmount = amount / Math.pow(10, decimals);
                const tokenMint = parsedInfo.mint || await this.getTokenMint(source);
                const tokenSymbol = await this.getTokenSymbol(tokenMint) || 'UNKNOWN';
                const tokenPrice = await this.getTokenPrice(tokenSymbol, timestamp);

                transactions.push({
                  id: `${signature}_${tokenMint}_${transactions.length}`,
                  type: this.determineTransactionType(parsedTx),
                  direction: sourceOwner === walletAddress ? 'out' : 'in',
                  amount: adjustedAmount,
                  token: tokenSymbol,
                  timestamp,
                  signature,
                  price: tokenPrice,
                  classification: 'unclassified',
                  walletAddress: `${walletAddress.slice(0, 8)}...${walletAddress.slice(-4)}`,
                  walletLabel: 'Connected Wallet'
                });
              }
            }
          }
        }
      }
    }

    return transactions;
  }

  private determineTransactionType(parsedTx: ParsedTransactionWithMeta): Transaction['type'] {
    if (!parsedTx.transaction.message.instructions) return 'transfer';

    const instructions = parsedTx.transaction.message.instructions;
    
    for (const instruction of instructions) {
      if ('parsed' in instruction) {
        // Check for common DeFi programs
        if (instruction.program === 'spl-token') {
          return 'transfer';
        }
        
        // Add more program checks for different transaction types
        const programId = instruction.programId?.toString();
        
        if (programId?.includes('stake') || programId?.includes('vote')) {
          return 'staking';
        }
        
        if (programId?.includes('swap') || programId?.includes('dex')) {
          return 'swap';
        }
      }
    }

    return 'transfer';
  }

  private async getTokenAccountOwner(tokenAccount: string): Promise<string | null> {
    try {
      // Rate limit this RPC call
      await this.rateLimiter.waitForNextCall();
      const accountInfo = await this.connection.getParsedAccountInfo(new PublicKey(tokenAccount));
      if (accountInfo.value && 'parsed' in accountInfo.value.data) {
        return accountInfo.value.data.parsed.info.owner;
      }
    } catch (error) {
      console.warn('Could not get token account owner:', error);
    }
    return null;
  }

  private async getTokenMint(tokenAccount: string): Promise<string> {
    try {
      // Rate limit this RPC call
      await this.rateLimiter.waitForNextCall();
      const accountInfo = await this.connection.getParsedAccountInfo(new PublicKey(tokenAccount));
      if (accountInfo.value && 'parsed' in accountInfo.value.data) {
        return accountInfo.value.data.parsed.info.mint;
      }
    } catch (error) {
      console.warn('Could not get token mint:', error);
    }
    return 'UNKNOWN';
  }

  private async getTokenSymbol(mintAddress: string): Promise<string> {
    // This is a simplified token symbol lookup
    // In production, you'd want to use a proper token registry
    const knownTokens: { [key: string]: string } = {
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 'USDC',
      'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB': 'USDT',
      '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R': 'RAY',
      'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt': 'SRM',
      // Add more known tokens
    };

    return knownTokens[mintAddress] || mintAddress.slice(0, 8);
  }

  private async getTokenPrice(symbol: string, timestamp: Date): Promise<number> {
    // Check cache first
    const cacheKey = `${symbol}_${timestamp.toDateString()}`;
    const cached = this.priceCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < 3600000) { // 1 hour cache
      return cached.price;
    }

    try {
      // Simple price estimation - in production you'd use a proper price API
      const prices: { [key: string]: number } = {
        'SOL': 100, // Approximate SOL price
        'USDC': 1,
        'USDT': 1,
        'RAY': 2,
        'SRM': 0.5,
      };

      const price = prices[symbol] || 0.01;
      
      // Cache the price
      this.priceCache.set(cacheKey, { price, timestamp: Date.now() });
      
      return price;
    } catch (error) {
      console.warn('Could not fetch price for', symbol, error);
      return 0.01; // Default fallback price
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      // Rate limit the test connection call
      await this.rateLimiter.waitForNextCall();
      const slot = await this.connection.getSlot();
      return slot > 0;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
} 