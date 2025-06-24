
import React from 'react';
import { Logo } from '@/components/Logo';
import { MultiWalletImport } from '@/components/MultiWalletImport';
import { PricingSection } from '@/components/PricingSection';
import { FeatureGrid } from '@/components/FeatureGrid';
import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, Globe } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="border-b border-border bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Logo />
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#import" className="text-muted-foreground hover:text-white transition-colors">
                Import Wallets
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                Sign In
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative">
        <Hero />
        
        <div id="import">
          <MultiWalletImport />
        </div>
        
        <div id="features">
          <FeatureGrid />
        </div>
        
        <div id="pricing">
          <PricingSection />
        </div>

        {/* Trust Section */}
        <div className="border-b border-border bg-black">
          <div className="container mx-auto px-4 sm:px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mb-4">
                Trusted by Crypto Users Worldwide
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tax3 provides accurate, compliant tax reporting for the Solana ecosystem
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-sans font-semibold text-white mb-2">IRS Compliant</h3>
                <p className="text-sm text-muted-foreground">
                  Built following US tax regulations and FIFO accounting standards
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-sans font-semibold text-white mb-2">10,000+ Users</h3>
                <p className="text-sm text-muted-foreground">
                  Trusted by thousands of crypto traders and DeFi users
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-sans font-semibold text-white mb-2">Global Support</h3>
                <p className="text-sm text-muted-foreground">
                  Supporting crypto tax compliance in 30+ countries
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <Logo className="mb-4" />
                <p className="text-sm text-muted-foreground">
                  Professional crypto tax reporting for the Solana ecosystem.
                </p>
              </div>

              <div>
                <h4 className="font-sans font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-sans font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tax Resources</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-sans font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tax Disclaimer</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border mt-12 pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                © 2024 Tax3. All rights reserved. This tool is for informational purposes only. 
                Please consult with a qualified tax professional.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
