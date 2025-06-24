
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, X, AlertCircle, Wallet } from 'lucide-react';
import { TransactionProcessor } from './TransactionProcessor';

interface WalletEntry {
  id: string;
  address: string;
  label: string;
  isValid: boolean;
}

export const MultiWalletImport: React.FC = () => {
  const [wallets, setWallets] = useState<WalletEntry[]>([
    { id: '1', address: '', label: 'Main Wallet', isValid: false }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const validateAddress = (address: string): boolean => {
    const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return solanaAddressPattern.test(address);
  };

  const addWallet = () => {
    const newWallet: WalletEntry = {
      id: Date.now().toString(),
      address: '',
      label: `Wallet ${wallets.length + 1}`,
      isValid: false
    };
    setWallets([...wallets, newWallet]);
  };

  const removeWallet = (id: string) => {
    if (wallets.length > 1) {
      setWallets(wallets.filter(w => w.id !== id));
    }
  };

  const updateWallet = (id: string, field: 'address' | 'label', value: string) => {
    setWallets(wallets.map(wallet => {
      if (wallet.id === id) {
        const updated = { ...wallet, [field]: value };
        if (field === 'address') {
          updated.isValid = validateAddress(value.trim());
        }
        return updated;
      }
      return wallet;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validWallets = wallets.filter(w => w.address.trim() && w.isValid);
    
    if (validWallets.length === 0) {
      setError('Please enter at least one valid wallet address');
      return;
    }

    const invalidWallets = wallets.filter(w => w.address.trim() && !w.isValid);
    if (invalidWallets.length > 0) {
      setError('Please fix invalid wallet addresses before proceeding');
      return;
    }

    setIsProcessing(true);
  };

  const validWalletCount = wallets.filter(w => w.address.trim() && w.isValid).length;

  if (isProcessing) {
    const validWallets = wallets.filter(w => w.address.trim() && w.isValid);
    return <TransactionProcessor walletAddresses={validWallets.map(w => w.address.trim())} />;
  }

  return (
    <div className="border-b border-border bg-black">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border">
            <div className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-white mb-3">
                  Import Your Wallets
                </h2>
                <p className="text-muted-foreground">
                  Add multiple Solana wallet addresses to generate a unified tax report across all your holdings
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {wallets.map((wallet, index) => (
                    <div key={wallet.id} className="p-4 bg-muted/10 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            Wallet {index + 1}
                          </Badge>
                          {wallet.isValid && (
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                              Valid
                            </Badge>
                          )}
                        </div>
                        {wallets.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeWallet(wallet.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                          <label className="block text-sm font-medium text-white mb-2">
                            Label
                          </label>
                          <Input
                            placeholder="e.g., Main Wallet, Trading Wallet"
                            value={wallet.label}
                            onChange={(e) => updateWallet(wallet.id, 'label', e.target.value)}
                            className="bg-input border-border text-white placeholder-muted-foreground"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-white mb-2">
                            Wallet Address
                          </label>
                          <div className="relative">
                            <Input
                              placeholder="Enter Solana wallet address (e.g., 7xKXtg2CW87d...)"
                              value={wallet.address}
                              onChange={(e) => updateWallet(wallet.id, 'address', e.target.value)}
                              className={`bg-input border-border text-white placeholder-muted-foreground font-mono text-sm pr-12 ${
                                wallet.address.trim() && !wallet.isValid ? 'border-red-500' : ''
                              }`}
                            />
                            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          </div>
                          {wallet.address.trim() && !wallet.isValid && (
                            <div className="flex items-center mt-2 text-sm text-red-400">
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Invalid Solana address format
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addWallet}
                    className="border-border text-foreground hover:bg-muted flex-1"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Wallet
                  </Button>
                  
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium flex-1 sm:flex-none"
                    disabled={validWalletCount === 0}
                  >
                    Generate Unified Report ({validWalletCount} wallet{validWalletCount !== 1 ? 's' : ''})
                  </Button>
                </div>

                {error && (
                  <div className="flex items-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                    <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                    {error}
                  </div>
                )}
              </form>

              <div className="mt-8 p-4 bg-muted/30 border border-border rounded-lg">
                <h4 className="font-medium text-white mb-2 text-sm">Unified Report Features:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Combined analysis across all your wallets</li>
                  <li>• Automatic duplicate transaction detection</li>
                  <li>• Cross-wallet cost basis optimization</li>
                  <li>• Consolidated tax summary and reporting</li>
                  <li>• Individual wallet breakdowns included</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
