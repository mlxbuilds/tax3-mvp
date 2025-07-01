import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wallet, CheckCircle, AlertCircle, Zap, Shield, TrendingUp } from 'lucide-react';
import { TransactionProcessor } from './TransactionProcessor';

interface ConnectedWallet {
  address: string;
  label: string;
  balance?: number;
}

export const WalletConnection: React.FC = () => {
  const { publicKey, connected, wallet, disconnect } = useWallet();
  const { connection } = useConnection();
  const [connectedWallets, setConnectedWallets] = useState<ConnectedWallet[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  // Fetch balance when wallet connects
  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey && connection) {
        try {
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / 1000000000); // Convert lamports to SOL
        } catch (err) {
          console.error('Error fetching balance:', err);
          setError('Failed to fetch wallet balance');
        }
      }
    };

    fetchBalance();
  }, [publicKey, connection]);

  // Handle wallet connection
  useEffect(() => {
    if (connected && publicKey && wallet) {
      const walletAddress = publicKey.toString();
      const walletLabel = wallet.adapter.name;
      
      // Check if wallet is already connected
      const isAlreadyConnected = connectedWallets.some(w => w.address === walletAddress);
      
      if (!isAlreadyConnected) {
        const newWallet: ConnectedWallet = {
          address: walletAddress,
          label: walletLabel,
          balance: balance
        };
        
        setConnectedWallets(prev => [...prev, newWallet]);
        setError('');
      }
    }
  }, [connected, publicKey, wallet, balance]);

  const handleDisconnectWallet = async (address: string) => {
    if (publicKey?.toString() === address) {
      await disconnect();
    }
    setConnectedWallets(prev => prev.filter(w => w.address !== address));
  };

  const handleGenerateReport = () => {
    if (connectedWallets.length === 0) {
      setError('Please connect at least one wallet to generate a report');
      return;
    }
    setIsProcessing(true);
  };

  if (isProcessing) {
    return (
      <TransactionProcessor
        walletAddresses={connectedWallets.map(w => w.address)}
      />
    );
  }

  return (
    <div className="pt-24 pb-12 lg:pt-28 lg:pb-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border shadow-lg">
            <div className="p-6 sm:p-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-foreground mb-6 tracking-tight">
                  Connect Your Solana Wallets
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
                  Connect your Solana wallets to automatically fetch transactions and generate a comprehensive tax report
                </p>
                
                {/* Progress Steps */}
                <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                      1
                    </div>
                    <span className="text-xs sm:text-sm text-foreground ml-1 sm:ml-2">Connect</span>
                  </div>
                  <div className="w-4 sm:w-8 h-px bg-border"></div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-muted border border-border rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground">
                      2
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">Process</span>
                  </div>
                  <div className="w-4 sm:w-8 h-px bg-border"></div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-muted border border-border rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground">
                      3
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">Download</span>
                  </div>
                </div>
                
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 max-w-lg mx-auto">
                  <p className="text-sm text-muted-foreground">
                    <strong>🔒 Secure Connection:</strong> We only read public transaction data. 
                    Your private keys never leave your wallet.
                  </p>
                </div>
              </div>

              {/* Wallet Connection Section */}
              <div className="space-y-6">
                {/* Connect Wallet Button */}
                <div className="text-center">
                  <div className="mb-4">
                    <WalletMultiButton className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12 px-6 rounded-lg" />
                  </div>
                  
                  {connected && publicKey && (
                    <div className="flex items-center justify-center space-x-2 text-sm text-emerald-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Wallet Connected: {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-4)}</span>
                    </div>
                  )}
                </div>

                {/* Connected Wallets List */}
                {connectedWallets.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-sans font-semibold text-foreground text-center">
                      Connected Wallets ({connectedWallets.length})
                    </h3>
                    
                    {connectedWallets.map((wallet, index) => (
                      <div
                        key={wallet.address}
                        className="p-4 bg-muted/10 border border-border rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {wallet.label}
                            </Badge>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                              Connected
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDisconnectWallet(wallet.address)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            Disconnect
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Wallet Address
                            </label>
                            <div className="p-3 bg-input border border-border rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Wallet className="w-4 h-4 text-primary" />
                                <span className="font-mono text-sm text-foreground">
                                  {wallet.address.slice(0, 12)}...{wallet.address.slice(-12)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Balance
                            </label>
                            <div className="p-3 bg-input border border-border rounded-lg">
                              <div className="text-sm font-medium text-foreground">
                                {wallet.balance?.toFixed(4) || balance.toFixed(4)} SOL
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Generate Report Button */}
                {connectedWallets.length > 0 && (
                  <div className="text-center">
                    <Button
                      onClick={handleGenerateReport}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12 px-8"
                    >
                      Generate Tax Report ({connectedWallets.length} wallet{connectedWallets.length !== 1 ? 's' : ''})
                    </Button>
                  </div>
                )}

                {/* Error Display */}
                {error && (
                  <Alert className="border-red-500/20 bg-red-500/10">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <AlertDescription className="text-red-400">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Features Section */}
                <div className="mt-8 p-6 bg-muted/30 border border-border rounded-xl">
                  <h4 className="font-semibold text-foreground mb-3 text-base">
                    What's Included:
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span>Automatic transaction fetching from Solana blockchain</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>IRS-compliant FIFO calculations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>Professional PDF export with Form 8949 formatting</span>
                    </li>
                    <li>• Automatic transaction categorization</li>
                    <li>• Short-term vs long-term breakdown</li>
                    <li>• Cross-wallet duplicate detection</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}; 