import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  ArrowUpDown,
  TrendingUp,
  Coins,
  FileText,
  Zap,
  Shield,
  AlertTriangle,
  Wallet,
} from "lucide-react";
import { TransactionTable } from "./TransactionTable";
import { TaxCalculator } from "./TaxCalculator";
import { Transaction } from "@/types/transaction";
import { SolanaDataFetcher } from "@/utils/solanaDataFetcher";
import { useConnection } from '@solana/wallet-adapter-react';

interface TransactionProcessorProps {
  walletAddresses: string[];
}

export const TransactionProcessor: React.FC<TransactionProcessorProps> = ({
  walletAddresses,
}) => {
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentStep, setCurrentStep] = useState<
    "processing" | "review" | "calculate"
  >("processing");
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentWallet, setCurrentWallet] = useState(0);
  const [error, setError] = useState<string>('');

  // Fetch real transaction data from Solana blockchain
  useEffect(() => {
    const fetchRealTransactionData = async () => {
      setError('');
      setIsLoading(true);
      setCurrentStep("processing");
      
      try {
        const dataFetcher = new SolanaDataFetcher(connection.rpcEndpoint);
        
        // Test connection first
        const isConnected = await dataFetcher.testConnection();
        if (!isConnected) {
          throw new Error('Unable to connect to Solana network');
        }

        const allTransactions: Transaction[] = [];
        
        // Process each wallet sequentially with progress updates
        for (let i = 0; i < walletAddresses.length; i++) {
          const walletAddress = walletAddresses[i];
          setCurrentWallet(i);
          
          // Update progress based on wallet being processed
          const baseProgress = (i / walletAddresses.length) * 80; // 80% for fetching
          setProcessingProgress(baseProgress + 10);

          try {
            console.log(`Fetching transactions for wallet: ${walletAddress}`);
            const walletTransactions = await dataFetcher.fetchWalletTransactions(walletAddress, 1000);
            
            console.log(`Found ${walletTransactions.length} transactions for wallet ${i + 1}`);
            allTransactions.push(...walletTransactions);
            
            // Update progress for completed wallet
            setProcessingProgress(baseProgress + 20);
          } catch (walletError) {
            console.error(`Error fetching transactions for wallet ${walletAddress}:`, walletError);
            // Continue processing other wallets even if one fails
          }
        }

        // Final processing steps
        setProcessingProgress(85);
        console.log(`Total transactions fetched: ${allTransactions.length}`);

        // Sort all transactions by timestamp
        const sortedTransactions = allTransactions.sort(
          (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
        );

        setProcessingProgress(95);
        await new Promise(resolve => setTimeout(resolve, 500));

        setTransactions(sortedTransactions);
        setProcessingProgress(100);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsLoading(false);
        setCurrentStep("review");

        if (sortedTransactions.length === 0) {
          setError('No transactions found for the connected wallets. This could be because the wallets are new or have no transaction history.');
        }

      } catch (error) {
        console.error('Error fetching transaction data:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch transaction data');
        setIsLoading(false);
      }
    };

    fetchRealTransactionData();
  }, [walletAddresses, connection]);

  const updateTransactionClassification = (
    id: string,
    classification: "personal" | "business"
  ) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, classification } : tx))
    );
  };

  const updateBulkTransactionClassification = (
    transactionIds: string[],
    classification: "personal" | "business"
  ) => {
    setTransactions((prev) =>
      prev.map((tx) => 
        transactionIds.includes(tx.id) ? { ...tx, classification } : tx
      )
    );
  };

  const proceedToCalculation = () => {
    setCurrentStep("calculate");
  };

  const getUnclassifiedCount = () => {
    return transactions.filter((tx) => tx.classification === "unclassified")
      .length;
  };

  const getTransactionStats = () => {
    const stats = {
      transfer: transactions.filter((tx) => tx.type === "transfer").length,
      trade: transactions.filter((tx) => tx.type === "trade").length,
      staking: transactions.filter((tx) => tx.type === "staking").length,
      swap: transactions.filter((tx) => tx.type === "swap").length,
      defi: transactions.filter((tx) => tx.type === "defi").length,
      personal: transactions.filter((tx) => tx.classification === "personal")
        .length,
      business: transactions.filter((tx) => tx.classification === "business")
        .length,
      unclassified: transactions.filter(
        (tx) => tx.classification === "unclassified"
      ).length,
    };
    return stats;
  };

  if (isLoading || currentStep === "processing") {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <Card className="max-w-3xl mx-auto bg-card border-border">
            <div className="p-6 sm:p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mb-4">
                Fetching Real Blockchain Data
              </h2>
              <p className="text-muted-foreground mb-6">
                Connecting to Solana blockchain and fetching transaction history for {walletAddresses.length} wallet
                {walletAddresses.length !== 1 ? "s" : ""}...
              </p>
              
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center">
                  <AlertTriangle className="w-5 h-5 mx-auto mb-2" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-3 mb-6">
                <div
                  className="bg-gradient-to-r from-primary to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${processingProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground mb-8">
                {processingProgress}% Complete
              </p>

              {/* Wallet Progress */}
              <div className="mb-8">
                <h3 className="text-lg font-sans font-semibold text-white mb-4">
                  Processing Wallets
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {walletAddresses.map((address, index) => (
                    <div
                      key={address}
                      className={`p-3 rounded-lg border min-w-fit ${
                        index < currentWallet
                          ? "bg-emerald-500/10 border-emerald-500/30"
                          : index === currentWallet
                          ? "bg-primary/10 border-primary/30"
                          : "bg-muted/10 border-border"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Wallet
                          className={`w-4 h-4 ${
                            index < currentWallet
                              ? "text-emerald-400"
                              : index === currentWallet
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                        <span className="text-sm font-mono text-white">
                          {address.slice(0, 6)}...{address.slice(-4)}
                        </span>
                      </div>
                      {index < currentWallet && (
                        <Badge className="bg-emerald-500/20 text-emerald-400 text-xs mt-2">
                          Complete
                        </Badge>
                      )}
                      {index === currentWallet && (
                        <Badge className="bg-primary/20 text-primary text-xs mt-2">
                          Processing
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-left max-w-md mx-auto">
                <div className="flex items-center text-muted-foreground">
                  <Zap className="w-4 h-4 mr-3 text-primary" />
                  Fetching transaction data from Solana blockchain
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Shield className="w-4 h-4 mr-3 text-primary" />
                  Cross-wallet duplicate detection and classification
                </div>
                <div className="flex items-center text-muted-foreground">
                  <TrendingUp className="w-4 h-4 mr-3 text-primary" />
                  Optimizing cost basis across all wallets
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === "calculate") {
    return (
      <TaxCalculator
        transactions={transactions}
        walletAddresses={walletAddresses}
      />
    );
  }

  const stats = getTransactionStats();
  const unclassifiedCount = getUnclassifiedCount();

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Card className="bg-card border-border mb-8">
            <div className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mb-4">
                  Review Your Unified Report
                </h2>
                <p className="text-muted-foreground mb-6">
                  We found{" "}
                  <strong>{transactions.length.toLocaleString()}</strong>{" "}
                  transactions across <strong>{walletAddresses.length}</strong>{" "}
                  wallet{walletAddresses.length !== 1 ? "s" : ""}. Please review
                  and classify them before generating your tax report.
                </p>

                {/* Wallet Summary */}
                <div className="flex flex-wrap gap-4 justify-center mb-6">
                  {walletAddresses.map((address, index) => {
                    const walletTxs = transactions.filter(
                      (tx) =>
                        tx.walletAddress ===
                        address.slice(0, 8) + "..." + address.slice(-4)
                    );
                    return (
                      <div
                        key={address}
                        className="p-4 bg-muted/10 border border-border rounded-lg min-w-fit"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Wallet className="w-4 h-4 text-primary" />
                          <span className="text-sm font-mono text-white">
                            {address.slice(0, 8)}...{address.slice(-4)}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-white text-center">
                          {walletTxs.length.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground text-center">
                          transactions
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Transaction Type Summary */}
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <div className="text-center p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg min-w-fit">
                  <Badge className="bg-purple-500/20 text-purple-200 border-purple-500/30 mb-2">
                    <ArrowUpDown className="w-4 h-4 mr-1" />
                    Transfers
                  </Badge>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                    {stats.transfer.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg min-w-fit">
                  <Badge className="bg-blue-500/20 text-blue-200 border-blue-500/30 mb-2">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Trades
                  </Badge>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                    {stats.trade.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg min-w-fit">
                  <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-500/30 mb-2">
                    <Coins className="w-4 h-4 mr-1" />
                    Staking
                  </Badge>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                    {stats.staking.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg min-w-fit">
                  <Badge className="bg-orange-500/20 text-orange-200 border-orange-500/30 mb-2">
                    <Zap className="w-4 h-4 mr-1" />
                    Swaps
                  </Badge>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                    {stats.swap.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg min-w-fit">
                  <Badge className="bg-cyan-500/20 text-cyan-200 border-cyan-500/30 mb-2">
                    <Shield className="w-4 h-4 mr-1" />
                    DeFi
                  </Badge>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                    {stats.defi.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Classification Summary */}
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <div className="text-center p-4 bg-primary/10 border border-primary/20 rounded-lg min-w-fit flex-1 max-w-xs">
                  <div className="text-lg font-mono font-bold text-primary">
                    {stats.personal.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Personal</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg min-w-fit flex-1 max-w-xs">
                  <div className="text-lg font-mono font-bold text-blue-400">
                    {stats.business.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Business</div>
                </div>
                <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg min-w-fit flex-1 max-w-xs">
                  <div className="text-lg font-mono font-bold text-yellow-400">
                    {stats.unclassified.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Unclassified
                  </div>
                </div>
              </div>

              {/* Warning and Action */}
              {unclassifiedCount > 0 && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="font-sans font-semibold text-yellow-400 mb-1">
                        Classification Required
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        You have {unclassifiedCount.toLocaleString()}{" "}
                        unclassified transactions. Please classify all
                        transactions as personal or business before generating
                        your unified tax report.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center">
                <Button
                  onClick={proceedToCalculation}
                  disabled={unclassifiedCount > 0}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Generate Unified Tax Report
                </Button>
              </div>
            </div>
          </Card>

          {/* Transaction Table */}
          <TransactionTable
            transactions={transactions}
            onClassificationChange={updateTransactionClassification}
            onBulkClassificationChange={updateBulkTransactionClassification}
          />
        </div>
      </div>
    </div>
  );
};
