import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              © 2025 Tax3. Professional Solana tax reporting made simple.
            </p>
            
            {/* Legal Links */}
            <div className="flex justify-center items-center space-x-6 mb-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto">
                    Terms & Conditions
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Terms & Conditions</DialogTitle>
                  </DialogHeader>
                  <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
                    <h3>1. Acceptance of Terms</h3>
                    <p>By using Tax3, you agree to these terms and conditions. If you do not agree, please do not use our service.</p>
                    
                    <h3>2. Service Description</h3>
                    <p>Tax3 provides automated tax calculation tools for Solana blockchain transactions. Our service analyzes public blockchain data to generate tax reports.</p>
                    
                    <h3>3. User Responsibilities</h3>
                    <ul>
                      <li>You are responsible for the accuracy of wallet addresses provided</li>
                      <li>You must verify all calculations before filing taxes</li>
                      <li>You acknowledge this is not professional tax advice</li>
                    </ul>
                    
                    <h3>4. Limitations</h3>
                    <p>Tax3 is a tool to assist with tax calculations. We do not guarantee accuracy and recommend consulting with a qualified tax professional.</p>
                    
                    <h3>5. Payment & Refunds</h3>
                    <p>All purchases are final. Refunds may be considered on a case-by-case basis within 7 days of purchase.</p>
                    
                    <h3>6. Liability</h3>
                    <p>Tax3 is not liable for any tax penalties, interest, or other consequences resulting from the use of our service.</p>
                    
                    <h3>7. Changes to Terms</h3>
                    <p>We may update these terms at any time. Continued use of the service constitutes acceptance of updated terms.</p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto">
                    Privacy Policy
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Privacy Policy</DialogTitle>
                  </DialogHeader>
                  <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
                    <h3>Information We Collect</h3>
                    <p>Tax3 is designed with privacy in mind:</p>
                    <ul>
                      <li>We only access public blockchain data</li>
                      <li>Wallet addresses are processed locally in your browser</li>
                      <li>No private keys or sensitive data are transmitted to our servers</li>
                    </ul>
                    
                    <h3>Data Processing</h3>
                    <p>All transaction analysis happens in your browser. We do not store your wallet data or transaction history on our servers.</p>
                    
                    <h3>Cookies & Analytics</h3>
                    <p>We may use cookies and analytics tools to improve our service. These do not contain personal financial information.</p>
                    
                    <h3>Third-Party Services</h3>
                    <p>We use third-party services for:</p>
                    <ul>
                      <li>Blockchain data (Solana RPC endpoints)</li>
                      <li>Price data (CoinGecko API)</li>
                      <li>Payment processing</li>
                    </ul>
                    
                    <h3>Data Security</h3>
                    <p>We implement industry-standard security measures. However, no system is 100% secure.</p>
                    
                    <h3>Your Rights</h3>
                    <p>Since we don't store your personal data, there's nothing to delete or modify. Your privacy is protected by design.</p>
                    
                    <h3>Contact</h3>
                    <p>For privacy concerns, contact us through our support channels.</p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto">
                    Disclaimer
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Legal Disclaimer</DialogTitle>
                  </DialogHeader>
                  <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
                    <h3>⚠️ Important Notice</h3>
                    <p className="text-amber-600 dark:text-amber-400 font-semibold">
                      Tax3 is a software tool, not a tax advisory service. This disclaimer is critical to understand before using our service.
                    </p>
                    
                    <h3>Not Tax Advice</h3>
                    <p>Tax3 provides calculations and reports based on blockchain data, but:</p>
                    <ul>
                      <li>We do not provide tax advice</li>
                      <li>We are not tax professionals or CPAs</li>
                      <li>Our calculations may not cover all tax scenarios</li>
                      <li>Tax laws vary by jurisdiction and change frequently</li>
                    </ul>
                    
                    <h3>Professional Consultation Required</h3>
                    <p>You should always:</p>
                    <ul>
                      <li>Consult with a qualified tax professional</li>
                      <li>Verify all calculations independently</li>
                      <li>Consider your specific tax situation</li>
                      <li>Stay informed about current tax laws</li>
                    </ul>
                    
                    <h3>Accuracy Limitations</h3>
                    <p>While we strive for accuracy:</p>
                    <ul>
                      <li>Blockchain data may be incomplete or misinterpreted</li>
                      <li>Price data may have gaps or inaccuracies</li>
                      <li>Complex transactions may require manual review</li>
                      <li>Tax rules are subject to interpretation</li>
                    </ul>
                    
                    <h3>User Responsibility</h3>
                    <p>You are solely responsible for:</p>
                    <ul>
                      <li>The accuracy of your tax filings</li>
                      <li>Compliance with applicable tax laws</li>
                      <li>Any penalties or interest from tax authorities</li>
                      <li>Verifying and validating all data</li>
                    </ul>
                    
                    <h3>No Guarantees</h3>
                    <p>Tax3 makes no warranties or guarantees about:</p>
                    <ul>
                      <li>Accuracy of calculations</li>
                      <li>Completeness of data</li>
                      <li>Compliance with tax regulations</li>
                      <li>Fitness for any particular purpose</li>
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <p className="text-xs text-muted-foreground/80">
              Not tax advice. Always consult with a qualified tax professional.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}; 