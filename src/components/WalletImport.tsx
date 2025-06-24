
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, AlertCircle } from 'lucide-react';
import { TransactionProcessor } from './TransactionProcessor';

export const WalletImport: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const validateAddress = (address: string): boolean => {
    // Basic Solana address validation (base58, 32-44 characters)
    const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return solanaAddressPattern.test(address);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!walletAddress.trim()) {
      setError('Please enter a wallet address');
      return;
    }

    if (!validateAddress(walletAddress.trim())) {
      setError('Please enter a valid Solana wallet address');
      return;
    }

    setIsProcessing(true);
  };

  if (isProcessing) {
    return <TransactionProcessor walletAddress={walletAddress.trim()} />;
  }

  return (
    <div className="border-b border-border bg-black">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card border-border">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-sans font-semibold text-white mb-3">
                  Import Wallet Transactions
                </h2>
                <p className="text-muted-foreground">
                  Enter your Solana wallet address to analyze transactions and generate tax reports
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="wallet" className="block text-sm font-medium text-white mb-2">
                    Wallet Address
                  </label>
                  <div className="relative">
                    <Input
                      id="wallet"
                      type="text"
                      placeholder="Enter Solana wallet address (e.g., 7xKXtg2CW87d...)"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      className="bg-input border-border text-white placeholder-muted-foreground font-mono text-sm pr-12"
                    />
                    <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                  {error && (
                    <div className="flex items-center mt-2 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {error}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  disabled={!walletAddress.trim()}
                >
                  Analyze Transactions
                </Button>
              </form>

              <div className="mt-8 p-4 bg-muted/30 border border-border rounded-lg">
                <h4 className="font-medium text-white mb-2 text-sm">What we'll analyze:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• SOL transfers and trades</li>
                  <li>• SPL token transactions</li>
                  <li>• Staking rewards and validator income</li>
                  <li>• DeFi interactions (swaps, lending, liquidity)</li>
                  <li>• Proper cost basis calculations with FIFO method</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
