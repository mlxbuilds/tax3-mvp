import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calculator, TrendingUp, TrendingDown, Coins, DollarSign, FileText, Wallet } from 'lucide-react';
import { PDFExporter } from './PDFExporter';
import { Transaction, TaxSummary } from '@/types/transaction';
import { calculateFIFOGains, calculateStakingIncome, categorizeTransactions } from '@/utils/taxCalculations';

interface TaxCalculatorProps {
  transactions: Transaction[];
  walletAddresses: string[];
}

export const TaxCalculator: React.FC<TaxCalculatorProps> = ({ transactions, walletAddresses }) => {
  const [isCalculating, setIsCalculating] = useState(true);
  const [taxSummary, setTaxSummary] = useState<TaxSummary | null>(null);
  const [showExporter, setShowExporter] = useState(false);
  const [calculationProgress, setCalculationProgress] = useState(0);

  useEffect(() => {
    const performTaxCalculations = async () => {
      const steps = [
        { progress: 10, message: 'Categorizing transactions...' },
        { progress: 30, message: 'Calculating FIFO cost basis...' },
        { progress: 50, message: 'Computing capital gains/losses...' },
        { progress: 70, message: 'Calculating staking income...' },
        { progress: 85, message: 'Optimizing across wallets...' },
        { progress: 95, message: 'Generating summary...' },
        { progress: 100, message: 'Complete!' }
      ];

      for (const step of steps) {
        setCalculationProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Perform actual calculations
      const categorizedTransactions = categorizeTransactions(transactions);
      const fifoResults = calculateFIFOGains(categorizedTransactions.trades, categorizedTransactions.swaps);
      const stakingIncome = calculateStakingIncome(categorizedTransactions.staking);

      const summary: TaxSummary = {
        totalGains: fifoResults.totalGains,
        totalLosses: fifoResults.totalLosses,
        netGains: fifoResults.totalGains - fifoResults.totalLosses,
        shortTermGains: fifoResults.shortTermGains,
        longTermGains: fifoResults.longTermGains,
        stakingIncome: stakingIncome,
        totalTransactions: transactions.length
      };

      setTaxSummary(summary);
      setIsCalculating(false);
    };

    performTaxCalculations();
  }, [transactions]);

  if (isCalculating) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <Card className="max-w-2xl mx-auto bg-card border-border">
            <div className="p-6 sm:p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mb-4">
                Calculating Your Unified Tax Report
              </h2>
              <p className="text-muted-foreground mb-6">
                Processing {transactions.length.toLocaleString()} transactions across {walletAddresses.length} wallets using FIFO accounting...
              </p>
              
              <div className="w-full bg-muted rounded-full h-3 mb-6">
                <div 
                  className="bg-gradient-to-r from-primary to-emerald-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${calculationProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">{calculationProgress}% Complete</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (showExporter && taxSummary) {
    return <PDFExporter taxSummary={taxSummary} transactions={transactions} walletAddresses={walletAddresses} />;
  }

  if (!taxSummary) return null;

  // Calculate wallet-specific stats
  const walletStats = walletAddresses.map(address => {
    const shortAddress = address.slice(0, 8) + '...' + address.slice(-4);
    const walletTransactions = transactions.filter(tx => tx.walletAddress === shortAddress);
    const walletTrades = walletTransactions.filter(tx => tx.type === 'trade' || tx.type === 'swap');
    const totalValue = walletTrades.reduce((sum, tx) => sum + (tx.amount * (tx.price || 0)), 0);
    
    return {
      address: shortAddress,
      transactionCount: walletTransactions.length,
      totalValue: totalValue
    };
  });

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <Card className="bg-card border-border mb-8">
            <div className="p-6 sm:p-8 text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mb-2">
                Unified Tax Report Generated
              </h2>
              <p className="text-muted-foreground">
                Your comprehensive tax analysis across {walletAddresses.length} wallets is ready
              </p>
            </div>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-emerald-400" />
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    Gains
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  ${taxSummary.totalGains.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <p className="text-sm text-muted-foreground">Total Capital Gains</p>
              </div>
            </Card>

            <Card className="bg-card border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingDown className="w-8 h-8 text-red-400" />
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    Losses
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  ${taxSummary.totalLosses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <p className="text-sm text-muted-foreground">Total Capital Losses</p>
              </div>
            </Card>

            <Card className="bg-card border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-primary" />
                  <Badge className={`${taxSummary.netGains >= 0 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                    {taxSummary.netGains >= 0 ? 'Profit' : 'Loss'}
                  </Badge>
                </div>
                <div className={`text-2xl font-bold mb-1 ${taxSummary.netGains >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  ${Math.abs(taxSummary.netGains).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <p className="text-sm text-muted-foreground">Net Capital Result</p>
              </div>
            </Card>

            <Card className="bg-card border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Coins className="w-8 h-8 text-yellow-400" />
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    Income
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  ${taxSummary.stakingIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <p className="text-sm text-muted-foreground">Staking Income</p>
              </div>
            </Card>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Tax Breakdown */}
            <Card className="bg-card border-border">
              <div className="p-6">
                <h3 className="text-xl font-sans font-semibold text-white mb-6">Tax Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                    <span className="text-muted-foreground">Short-term Capital Gains</span>
                    <span className="font-mono font-bold text-orange-400">
                      ${taxSummary.shortTermGains.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                    <span className="text-muted-foreground">Long-term Capital Gains</span>
                    <span className="font-mono font-bold text-purple-400">
                      ${taxSummary.longTermGains.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                    <span className="text-muted-foreground">Staking/Mining Income</span>
                    <span className="font-mono font-bold text-yellow-400">
                      ${taxSummary.stakingIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">Total Transactions</span>
                      <span className="font-mono font-bold text-primary">
                        {taxSummary.totalTransactions.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Wallet Breakdown */}
            <Card className="bg-card border-border">
              <div className="p-6">
                <h3 className="text-xl font-sans font-semibold text-white mb-6">Wallet Breakdown</h3>
                <div className="space-y-4">
                  {walletStats.map((wallet, index) => (
                    <div key={wallet.address} className="p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Wallet className="w-4 h-4 text-primary" />
                          <span className="font-mono text-white text-sm">{wallet.address}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Wallet {index + 1}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Transactions:</span>
                          <div className="font-mono font-bold text-white">
                            {wallet.transactionCount.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Value:</span>
                          <div className="font-mono font-bold text-primary">
                            ${wallet.totalValue.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Action Button */}
          <Card className="bg-card border-border">
            <div className="p-6 sm:p-8 text-center">
              <h3 className="text-xl font-sans font-semibold text-white mb-4">
                Ready to Generate Your Report?
              </h3>
              <p className="text-muted-foreground mb-6">
                Download your comprehensive, IRS-compliant tax report with all calculations and supporting documentation.
              </p>
              <Button
                onClick={() => setShowExporter(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              >
                <FileText className="w-5 h-5 mr-2" />
                Generate PDF Report
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
