import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, X, AlertCircle, Wallet } from "lucide-react";
import { TransactionProcessor } from "./TransactionProcessor";

interface WalletEntry {
  id: string;
  address: string;
  label: string;
  isValid: boolean;
}

export const MultiWalletImport: React.FC = () => {
  const [wallets, setWallets] = useState<WalletEntry[]>([
    { id: "1", address: "", label: "Main Wallet", isValid: false },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const validateAddress = (address: string): boolean => {
    const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return solanaAddressPattern.test(address);
  };

  const addWallet = () => {
    const newWallet: WalletEntry = {
      id: Date.now().toString(),
      address: "",
      label: `Wallet ${wallets.length + 1}`,
      isValid: false,
    };
    setWallets([...wallets, newWallet]);
    setError(""); // Clear any existing errors
  };

  const removeWallet = (id: string) => {
    if (wallets.length > 1) {
      setWallets(wallets.filter((w) => w.id !== id));
    }
  };

  const updateWallet = (
    id: string,
    field: "address" | "label",
    value: string
  ) => {
    setWallets(
      wallets.map((wallet) => {
        if (wallet.id === id) {
          const updated = { ...wallet, [field]: value };
          if (field === "address") {
            updated.isValid = validateAddress(value.trim());
          }
          return updated;
        }
        return wallet;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validWallets = wallets.filter((w) => w.address.trim() && w.isValid);

    if (validWallets.length === 0) {
      setError("Please enter at least one valid wallet address");
      return;
    }

    const invalidWallets = wallets.filter(
      (w) => w.address.trim() && !w.isValid
    );
    if (invalidWallets.length > 0) {
      setError("Please fix invalid wallet addresses before proceeding");
      return;
    }

    setIsProcessing(true);
  };

  const validWalletCount = wallets.filter(
    (w) => w.address.trim() && w.isValid
  ).length;

  if (isProcessing) {
    const validWallets = wallets.filter((w) => w.address.trim() && w.isValid);
    return (
      <TransactionProcessor
        walletAddresses={validWallets.map((w) => w.address.trim())}
      />
    );
  }

  return (
    <div className="pt-24 pb-12 lg:pt-28 lg:pb-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border shadow-lg">
            <div className="p-6 sm:p-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-foreground mb-6 tracking-tight">
                  Connect Your Wallets
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
                  Add your Solana wallet addresses to generate a comprehensive tax report
                </p>
                
                {/* Progress Steps */}
                <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                      1
                    </div>
                    <span className="text-xs sm:text-sm text-foreground ml-1 sm:ml-2">Connect</span>
                  </div>
                  <div className="w-4 sm:w-8 h-px bg-border"></div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-muted border border-border rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground">
                      2
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">Process</span>
                  </div>
                  <div className="w-4 sm:w-8 h-px bg-border"></div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-muted border border-border rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground">
                      3
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">Download</span>
                  </div>
                </div>
                
                            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 max-w-lg mx-auto">
              <p className="text-sm text-muted-foreground">
                    <strong>🔒 Your keys stay safe:</strong> We only read public transaction data. 
                    Your private keys never leave your device.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {wallets.map((wallet, index) => (
                    <div
                      key={wallet.id}
                      className="p-4 bg-muted/10 border border-border rounded-lg"
                    >
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
                            onChange={(e) =>
                              updateWallet(wallet.id, "label", e.target.value)
                            }
                            className="bg-input border-border text-white placeholder-muted-foreground"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-white mb-2">
                            Wallet Address
                          </label>
                          <div className="relative">
                            <Input
                              placeholder="Paste your Solana wallet address..."
                              value={wallet.address}
                              onChange={(e) =>
                                updateWallet(
                                  wallet.id,
                                  "address",
                                  e.target.value
                                )
                              }
                              className={`bg-input border-border text-white placeholder-muted-foreground font-mono text-sm pr-12 h-12 ${
                                wallet.address.trim() && !wallet.isValid
                                  ? "border-red-500"
                                  : ""
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
                    className="border-border text-foreground hover:bg-muted flex-1 h-12"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Wallet
                  </Button>

                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium flex-1 sm:flex-none h-12"
                    disabled={validWalletCount === 0}
                  >
                    Generate Report ({validWalletCount} wallet
                    {validWalletCount !== 1 ? "s" : ""})
                  </Button>
                </div>

                {error && (
                  <div className="flex items-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                    <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                    {error}
                  </div>
                )}
              </form>

              <div className="mt-8 p-6 bg-muted/30 border border-border rounded-xl">
                <h4 className="font-semibold text-foreground mb-3 text-base">
                  What's Included:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• IRS-compliant FIFO calculations</li>
                  <li>• Automatic transaction categorization</li>
                  <li>• Professional PDF export</li>
                  <li>• Short-term vs long-term breakdown</li>
                  <li>• Form 8949 ready format</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
