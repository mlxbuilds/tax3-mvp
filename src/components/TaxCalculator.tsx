import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Download, FileText, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { TaxCalculationEngine } from '@/utils/taxCalculations';
import { PDFExporter } from './PDFExporter';
import { Transaction, TaxSummary } from '@/types/transaction';

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
      const engine = new TaxCalculationEngine();
      const summary = engine.calculateTaxes(transactions);
      setTaxSummary(summary);
      setIsCalculating(false);
    };

    setTimeout(calculateTaxes, 2000);
  }, [transactions]);

  if (isCalculating || !taxSummary) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-6 py-12">
          <Card className="max-w-2xl mx-auto bg-card border-border">
            <div className="p-8 text-center">
              <Calculator className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-sans font-semibold text-white mb-4">
                Calculating Tax Report
              </h2>
              <p className="text-muted-foreground mb-6">
                Processing {transactions.length} transactions with FIFO cost basis method...
              </p>
              <div className="space-y-3 text-left max-w-md mx-auto">
                <div className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Applying FIFO cost basis calculations
                </div>
                <div className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Detecting wash sale violations
                </div>
                <div className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Generating Form 8949 data
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (showPDFExporter) {
    return <PDFExporter taxSummary={taxSummary} transactions={transactions} walletAddress={walletAddress} />;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-sans font-bold text-white mb-2">
              Tax Report Summary
            </h1>
            <p className="text-muted-foreground">
              Wallet: <code className="font-mono text-sm bg-muted px-2 py-1 rounded">{walletAddress}</code>
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <Badge variant="outline" className="border-emerald-400/30 text-emerald-400">
                    Gains
                  </Badge>
                </div>
                <div className="text-2xl font-mono font-bold text-white mb-1">
                  ${taxSummary.totalGains.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">Total Capital Gains</div>
              </div>
            </Card>

            <Card className="bg-card border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  <Badge variant="outline" className="border-red-400/30 text-red-400">
                    Losses
                  </Badge>
                </div>
                <div className="text-2xl font-mono font-bold text-white mb-1">
                  ${taxSummary.totalLosses.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">Total Capital Losses</div>
              </div>
            </Card>

            <Card className="bg-card border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Calculator className="w-5 h-5 text-blue-400" />
                  <Badge variant="outline" className={`${taxSummary.netGains >= 0 ? 'border-emerald-400/30 text-emerald-400' : 'border-red-400/30 text-red-400'}`}>
                    Net {taxSummary.netGains >= 0 ? 'Gain' : 'Loss'}
                  </Badge>
                </div>
                <div className="text-2xl font-mono font-bold text-white mb-1">
                  ${Math.abs(taxSummary.netGains).toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">Net Capital Result</div>
              </div>
            </Card>

            <Card className="bg-card border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="w-5 h-5 text-yellow-400" />
                  <Badge variant="outline" className="border-yellow-400/30 text-yellow-400">
                    Income
                  </Badge>
                </div>
                <div className="text-2xl font-mono font-bold text-white mb-1">
                  ${taxSummary.stakingIncome.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">Staking Income</div>
              </div>
            </Card>
          </div>

          {/* Tax Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card border-border">
              <div className="p-6">
                <h3 className="font-sans font-semibold text-white mb-4">Capital Gains Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Short-term (≤365 days)</span>
                    <span className="font-mono text-white">
                      ${taxSummary.shortTermGains.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Long-term ({'>'} 365 days)</span>
                    <span className="font-mono text-white">
                      ${taxSummary.longTermGains.toFixed(2)}
                    </span>
                  </div>
                  {taxSummary.washSaleLosses > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Wash sale adjustments</span>
                      <span className="font-mono text-red-400">
                        ${taxSummary.washSaleLosses.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border">
              <div className="p-6">
                <h3 className="font-sans font-semibold text-white mb-4">Form 8949 Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Short-term transactions</span>
                    <span className="font-mono text-white">
                      {taxSummary.form8949ShortTerm.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Long-term transactions</span>
                    <span className="font-mono text-white">
                      {taxSummary.form8949LongTerm.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total disposals</span>
                    <span className="font-mono text-white">
                      {taxSummary.form8949ShortTerm.length + taxSummary.form8949LongTerm.length}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Warning for wash sales */}
          {taxSummary.washSaleLosses > 0 && (
            <Card className="bg-card border-destructive/30 mb-8">
              <div className="p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                  <div>
                    <h4 className="font-sans font-semibold text-white mb-2">Wash Sale Detected</h4>
                    <p className="text-sm text-muted-foreground">
                      ${taxSummary.washSaleLosses.toFixed(2)} in losses have been disallowed due to wash sale rules. 
                      These losses have been added to the cost basis of replacement positions.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Generate Report Button */}
          <Card className="bg-card border-border">
            <div className="p-8 text-center">
              <h3 className="text-xl font-sans font-semibold text-white mb-4">
                Generate Professional Tax Report
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Export a comprehensive PDF report with Form 8949 transactions, 
                Schedule D summary, and detailed methodology for tax filing.
              </p>
              <Button 
                onClick={() => setShowPDFExporter(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Tax Report
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
