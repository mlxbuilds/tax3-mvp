import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { ArrowLeft, BookOpen, Code, Zap, Shield, FileText, HelpCircle } from 'lucide-react';

const Docs = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-fit">
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-full px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="rounded-full h-7 sm:h-8 px-2 sm:px-3 text-xs font-medium hover:bg-muted/50">
                <ArrowLeft className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </Link>
            
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
                <img src="/logo.png" alt="Tax3 Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-sans font-semibold text-sm text-foreground">Tax3</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="py-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl mb-6">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">Documentation</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about generating tax reports for your Solana transactions.
              </p>
            </div>

            {/* Quick Start Guide */}
            <Card className="p-6 mb-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary mr-3" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Quick Start Guide</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Import Your Wallets</h3>
                        <p className="text-sm text-muted-foreground">
                          Add your Solana wallet addresses. We support multiple wallets and all major transaction types.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                        <span className="text-xs font-bold text-primary">2</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Auto-Process Transactions</h3>
                        <p className="text-sm text-muted-foreground">
                          Our engine automatically categorizes and calculates cost basis for all your DeFi activities.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                        <span className="text-xs font-bold text-primary">3</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">Download Reports</h3>
                        <p className="text-sm text-muted-foreground">
                          Get IRS-compliant Form 8949 exports ready for tax filing. CSV and PDF formats available.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <Shield className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Privacy & Security</h3>
                    <p className="text-sm text-muted-foreground">
                      We only read public blockchain data. Your private keys never leave your device. 
                      All processing happens client-side for maximum security.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <FileText className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">IRS Compliance</h3>
                    <p className="text-sm text-muted-foreground">
                      Reports are generated following IRS guidelines with proper Form 8949 formatting. 
                      FIFO cost basis method ensures accurate tax calculations.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* FAQ */}
            <Card className="p-6 mb-8">
              <div className="flex items-start space-x-4 mb-6">
                <HelpCircle className="w-6 h-6 text-primary mr-3" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-foreground mb-2">
                        What transactions are supported?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        We support all major Solana transaction types including swaps, transfers, 
                        staking rewards, NFT trades, DeFi yield farming, and program interactions.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground mb-2">
                        How accurate are the tax calculations?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Our calculations follow IRS guidelines and use the FIFO (First In, First Out) 
                        cost basis method. We source price data from multiple reliable exchanges.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground mb-2">
                        Can I import multiple wallets?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Yes, you can import unlimited wallets. Our system will consolidate all 
                        transactions and generate a unified tax report.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground mb-2">
                        What export formats are available?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        We provide CSV exports for Form 8949 and PDF summary reports. 
                        All formats are ready for direct import into tax software.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* API Documentation */}
            <Card className="p-6 mb-8">
              <div className="flex items-start space-x-4 mb-6">
                <Code className="w-6 h-6 text-primary mr-3" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Technical Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Supported Protocols</h3>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Raydium (AMM swaps)</li>
                        <li>• Jupiter (DEX aggregator)</li>
                        <li>• Orca (AMM swaps)</li>
                        <li>• Magic Eden (NFT marketplace)</li>
                        <li>• Marinade (Liquid staking)</li>
                        <li>• Solana native staking</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Data Sources</h3>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>• Solana RPC nodes for transaction data</li>
                        <li>• CoinGecko API for historical prices</li>
                        <li>• Jupiter API for token metadata</li>
                        <li>• Helius RPC for enhanced parsing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Get Started CTA */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Link to="/import">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Docs; 