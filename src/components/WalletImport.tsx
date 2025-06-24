
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Wallet, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TransactionProcessor } from './TransactionProcessor';

export const WalletImport = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [showProcessor, setShowProcessor] = useState(false);
  const { toast } = useToast();

  const validateSolanaAddress = (address: string) => {
    // Basic Solana address validation (base58, 32-44 characters)
    const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return solanaRegex.test(address);
  };

  const handleWalletSubmit = async () => {
    if (!validateSolanaAddress(walletAddress)) {
      toast({
        title: "Invalid Wallet Address",
        description: "Please enter a valid Solana wallet address.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call to fetch transactions
    setTimeout(() => {
      setIsProcessing(false);
      setIsValidated(true);
      setShowProcessor(true);
      toast({
        title: "Wallet Connected Successfully",
        description: "Starting transaction analysis...",
      });
    }, 2000);
  };

  if (showProcessor) {
    return <TransactionProcessor walletAddress={walletAddress} />;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-white/70">Enter your Solana wallet address to begin generating your tax report</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter Solana wallet address (e.g., 9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM)"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 h-14 text-lg backdrop-blur-sm focus:bg-white/10 transition-all duration-300"
                disabled={isProcessing}
              />
              {isValidated && (
                <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-green-400" />
              )}
            </div>

            <Button
              onClick={handleWalletSubmit}
              disabled={!walletAddress || isProcessing}
              className="w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing Wallet...
                </>
              ) : (
                <>
                  Start Tax Report Generation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>

          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg backdrop-blur-sm">
            <p className="text-blue-200 text-sm">
              <strong>Privacy Notice:</strong> Your wallet data is processed locally and never stored on our servers. 
              We only fetch publicly available transaction data from the Solana blockchain.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
