import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Calculator, BookOpen, Code, Zap, Shield, FileText, HelpCircle } from 'lucide-react';

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
            
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Calculator className="w-3 h-3 text-primary" />
              </div>
              <span className="font-sans font-semibold text-sm text-foreground">Tax3</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl mb-6">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-sans font-bold text-foreground mb-4">
                Tax3 Documentation
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about generating accurate Solana tax reports
              </p>
            </div>

            {/* Quick Start */}
            <Card className="bg-card border-border mb-12">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                  <Zap className="w-6 h-6 text-primary mr-3" />
                  Quick Start Guide
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Connect Your Wallet</h3>
                      <p className="text-muted-foreground">Enter your Solana wallet address(es). We support multiple wallets for comprehensive reporting.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Auto Processing</h3>
                      <p className="text-muted-foreground">Our system analyzes your transaction history and calculates tax implications using IRS-approved methods.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Download Report</h3>
                      <p className="text-muted-foreground">Get your professional PDF report ready for tax filing or sharing with your CPA.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-card border-border">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                    <Shield className="w-5 h-5 text-primary mr-3" />
                    Security & Privacy
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Your private keys never leave your device</li>
                    <li>• We only read public blockchain data</li>
                    <li>• No data stored on our servers</li>
                    <li>• All processing happens in your browser</li>
                  </ul>
                </div>
              </Card>

              <Card className="bg-card border-border">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-primary mr-3" />
                    Tax Compliance
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• IRS-compliant FIFO calculations</li>
                    <li>• Form 8949 ready formatting</li>
                    <li>• Short-term vs long-term classification</li>
                    <li>• Staking income categorization</li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Supported Transactions */}
            <Card className="bg-card border-border mb-12">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Supported Transaction Types</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Trading & Swaps</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Token swaps (Jupiter, Raydium, Orca)</li>
                      <li>• DEX trades</li>
                      <li>• NFT purchases and sales</li>
                      <li>• Token transfers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">DeFi & Staking</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Staking rewards</li>
                      <li>• Liquidity pool rewards</li>
                      <li>• Yield farming</li>
                      <li>• Lending protocol interactions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* FAQ */}
            <Card className="bg-card border-border mb-12">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 text-primary mr-3" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What wallet formats are supported?</h4>
                    <p className="text-muted-foreground">We support all standard Solana wallet addresses (base58 format, 32-44 characters). This includes Phantom, Solflare, and all other Solana wallets.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How far back can I generate reports?</h4>
                    <p className="text-muted-foreground">We can analyze your complete transaction history from when your wallet was first created. There's no time limit.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Can I edit transactions before generating the report?</h4>
                    <p className="text-muted-foreground">Yes, you can classify transactions as personal or business, and make corrections before finalizing your report.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What export formats are available?</h4>
                    <p className="text-muted-foreground">We provide professional PDF reports with Form 8949 formatting. Higher tier plans include CSV and Excel exports.</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* API Documentation */}
            <Card className="bg-card border-border mb-12">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <Code className="w-6 h-6 text-primary mr-3" />
                  For Developers
                  <span className="ml-3 text-sm font-normal text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  We're working on developer tools and API access for Tax3. Stay tuned for updates!
                </p>
                <div className="bg-muted/10 border border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
                  <Code className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Developer API - Coming Soon</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    We're building comprehensive API documentation and developer tools. Expected features:
                  </p>
                  <ul className="text-muted-foreground text-sm space-y-1 text-left max-w-md mx-auto">
                    <li>• REST API for tax calculations</li>
                    <li>• Webhook integrations</li>
                    <li>• SDK for popular languages</li>
                    <li>• Batch processing capabilities</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Support */}
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