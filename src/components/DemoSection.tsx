import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowRight, Wallet, FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockTransactions = [
  { type: 'Swap', token: 'SOL → USDC', amount: '5.24 SOL', gainLoss: '+$124.50', status: 'Short-term' },
  { type: 'Staking', token: 'SOL Rewards', amount: '0.15 SOL', gainLoss: '+$18.75', status: 'Income' },
  { type: 'Trade', token: 'RAY → SOL', amount: '125 RAY', gainLoss: '-$45.20', status: 'Long-term' },
  { type: 'DeFi', token: 'LP Rewards', amount: '2.8 USDC', gainLoss: '+$2.80', status: 'Income' }
];

export const DemoSection: React.FC = () => {
  return (
    <div className="py-16 lg:py-20 bg-background" id="demo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-foreground mb-6 tracking-tight">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Three simple steps to get your professional tax report
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Demo Input */}
            <div className="space-y-6">
              <Card className="bg-card border-border p-6">
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <h3 className="font-semibold text-foreground">Connect Wallet</h3>
                  </div>
                  <Input 
                    placeholder="Enter wallet address..." 
                    className="font-mono text-sm"
                    disabled
                    value="7xKXtg2CW87d1o9TJ6EYLKRWmWdWaVY3mN8zKx..."
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Paste your Solana wallet address
                  </p>
                </div>
              </Card>

              <Card className="bg-card border-border p-6">
                                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <h3 className="font-semibold text-foreground">Auto Processing</h3>
                  </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transactions:</span>
                    <span className="font-medium text-foreground">1,247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax Events:</span>
                    <span className="font-medium text-foreground">89</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing:</span>
                    <span className="font-medium text-primary">30 seconds</span>
                  </div>
                </div>
              </Card>

                              <div className="text-center">
                  <Link to="/import">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8">
                      Start Your Tax Report
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-2">
                    Free sample • No signup required • 3 minutes
                  </p>
                </div>
            </div>

            {/* Demo Output */}
            <div className="space-y-6">
              <Card className="bg-card border-border p-6">
                                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">3</span>
                      </div>
                      <h3 className="font-semibold text-foreground">Tax Report</h3>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                      IRS Ready
                    </Badge>
                  </div>

                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4 bg-muted/20">
                    <h4 className="font-medium text-foreground mb-3">Tax Summary 2024</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Short-term Gains:</span>
                        <div className="font-medium text-emerald-400">+$2,847.50</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Long-term Gains:</span>
                        <div className="font-medium text-emerald-400">+$1,205.75</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Staking Income:</span>
                        <div className="font-medium text-blue-400">+$456.20</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Taxes:</span>
                        <div className="font-medium text-yellow-400">$1,124.83</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground text-sm">Recent Transactions</h4>
                    {mockTransactions.map((tx, index) => (
                      <div key={index} className="flex items-center justify-between text-xs p-2 bg-muted/10 rounded">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">{tx.type}</Badge>
                          <span className="text-muted-foreground">{tx.token}</span>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${tx.gainLoss.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                            {tx.gainLoss}
                          </div>
                          <div className="text-muted-foreground">{tx.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 