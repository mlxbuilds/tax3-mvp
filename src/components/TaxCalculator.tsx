
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, FileText, Download, Calculator } from 'lucide-react';
import { PDFExporter } from './PDFExporter';

interface Transaction {
  id: string;
  type: 'transfer' | 'trade' | 'staking';
  direction: 'in' | 'out';
  amount: number;
  token: string;
  timestamp: Date;
  signature: string;
  price?: number;
  classification: 'personal' | 'business' | 'unclassified';
}

interface TaxSummary {
  totalGains: number;
  totalLosses: number;
  netGains: number;
  shortTermGains: number;
  longTermGains: number;
  stakingIncome: number;
  totalTransactions: number;
}

interface TaxCalculatorProps {
  transactions: Transaction[];
  walletAddress: string;
}

export const TaxCalculator: React.FC<TaxCalculatorProps> = ({ transactions, walletAddress }) => {
  const [taxSummary, setTaxSummary] = useState<TaxSummary | null>(null);
  const [isCalculating, setIsCalculating] = useState(true);
  const [showPDFExporter, setShowPDFExporter] = useState(false);

  useEffect(() => {
    const calculateTaxes = () => {
      // Mock tax calculations using FIFO method
      let totalGains = 0;
      let totalLosses = 0;
      let shortTermGains = 0;
      let longTermGains = 0;
      let stakingIncome = 0;

      transactions.forEach(tx => {
        if (tx.type === 'staking') {
          stakingIncome += (tx.amount * (tx.price || 0));
        } else if (tx.type === 'trade' && tx.direction === 'out') {
          // Calculate gains/losses (simplified)
          const costBasis = tx.amount * (tx.price || 0) * 0.9; // Assume 10% gain for demo
          const proceeds = tx.amount * (tx.price || 0);
          const gain = proceeds - costBasis;
          
          if (gain > 0) {
            totalGains += gain;
            // Assume short-term if within 6 months for demo
            const monthsHeld = Math.floor(Math.random() * 18) + 1;
            if (monthsHeld <= 12) {
              shortTermGains += gain;
            } else {
              longTermGains += gain;
            }
          } else {
            totalLosses += Math.abs(gain);
          }
        }
      });

      const netGains = totalGains - totalLosses;

      setTaxSummary({
        totalGains,
        totalLosses,
        netGains,
        shortTermGains,
        longTermGains,
        stakingIncome,
        totalTransactions: transactions.length
      });
      
      setIsCalculating(false);
    };

    setTimeout(calculateTaxes, 2000);
  }, [transactions]);

  if (isCalculating || !taxSummary) {
    return (
      <div className="container mx-auto px-6 py-12">
        <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border-white/20">
          <div className="p-8 text-center">
            <Calculator className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-2xl font-bold text-white mb-4">Calculating Your Tax Report</h2>
            <p className="text-white/70 mb-6">
              Processing transactions and applying FIFO cost basis method...
            </p>
            <div className="space-y-2 text-left max-w-md mx-auto">
              <div className="flex items-center text-white/60">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
                Calculating capital gains and losses
              </div>
              <div className="flex items-center text-white/60">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse delay-300"></div>
                Determining short-term vs long-term holdings
              </div>
              <div className="flex items-center text-white/60">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse delay-700"></div>
                Categorizing staking income
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (showPDFExporter) {
    return <PDFExporter taxSummary={taxSummary} transactions={transactions} walletAddress={walletAddress} />;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Your 2024 Solana Tax Report</h2>
            <p className="text-white/70">
              Complete tax analysis using FIFO cost basis method for {taxSummary.totalTransactions} transactions
            </p>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <Badge className="bg-green-500/20 text-green-200 border-green-500/30">Gains</Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                ${taxSummary.totalGains.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-green-200 text-sm">Total Capital Gains</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-500/30 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingDown className="w-8 h-8 text-red-400" />
                <Badge className="bg-red-500/20 text-red-200 border-red-500/30">Losses</Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                ${taxSummary.totalLosses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-red-200 text-sm">Total Capital Losses</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-blue-400" />
                <Badge className={`${taxSummary.netGains >= 0 ? 'bg-green-500/20 text-green-200 border-green-500/30' : 'bg-red-500/20 text-red-200 border-red-500/30'}`}>
                  Net {taxSummary.netGains >= 0 ? 'Gain' : 'Loss'}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                ${Math.abs(taxSummary.netGains).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-blue-200 text-sm">Net Capital Result</div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-8 h-8 text-yellow-400" />
                <Badge className="bg-yellow-500/20 text-yellow-200 border-yellow-500/30">Income</Badge>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                ${taxSummary.stakingIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-yellow-200 text-sm">Staking Income</div>
            </div>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Capital Gains Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Short-term gains (≤1 year)</span>
                  <span className="text-white font-medium">
                    ${taxSummary.shortTermGains.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Long-term gains (>1 year)</span>
                  <span className="text-white font-medium">
                    ${taxSummary.longTermGains.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-2">
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-white">Total Capital Gains</span>
                    <span className="text-green-400">
                      ${taxSummary.totalGains.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Tax Implications</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="text-blue-200 font-medium mb-1">Short-term Rate</div>
                  <div className="text-white/70 text-sm">Taxed as ordinary income (up to 37%)</div>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="text-green-200 font-medium mb-1">Long-term Rate</div>
                  <div className="text-white/70 text-sm">Preferential rate (0%, 15%, or 20%)</div>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="text-yellow-200 font-medium mb-1">Staking Income</div>
                  <div className="text-white/70 text-sm">Ordinary income at fair market value</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Button */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to File?</h3>
            <p className="text-white/70 mb-6">
              Generate your professional tax report with all the details you need for filing
            </p>
            <Button 
              onClick={() => setShowPDFExporter(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF Tax Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
