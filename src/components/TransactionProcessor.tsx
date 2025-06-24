import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowUpDown, TrendingUp, Coins, FileText } from 'lucide-react';
import { TransactionList } from './TransactionList';
import { TaxCalculator } from './TaxCalculator';
import { Transaction } from '@/types/transaction';

interface TransactionProcessorProps {
  walletAddress: string;
}

export const TransactionProcessor: React.FC<TransactionProcessorProps> = ({ walletAddress }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentStep, setCurrentStep] = useState<'processing' | 'review' | 'calculate'>('processing');

  // Mock transaction data generation
  useEffect(() => {
    const generateMockTransactions = (): Transaction[] => {
      const mockData: Transaction[] = [
        {
          id: '1',
          type: 'transfer',
          direction: 'in',
          amount: 10.5,
          token: 'SOL',
          timestamp: new Date('2024-01-15'),
          signature: '3KmX7QNmQBZ8YzVLRv9p2Gg1hzXqVzJyN8KpqFrABC123',
          price: 95.50,
          classification: 'unclassified'
        },
        {
          id: '2',
          type: 'trade',
          direction: 'out',
          amount: 5.0,
          token: 'SOL',
          timestamp: new Date('2024-02-01'),
          signature: '4NpY8ROnQCa9AzWMSw0q3Hh2kYrWzKzZO9LqrGsADE456',
          price: 102.30,
          classification: 'unclassified'
        },
        {
          id: '3',
          type: 'staking',
          direction: 'in',
          amount: 0.25,
          token: 'SOL',
          timestamp: new Date('2024-02-15'),
          signature: '5QrZ9SPqQDb0BzXNTx1r4Ii3mZsXzLzAP0MrsHtAFG789',
          price: 108.75,
          classification: 'unclassified'
        },
        {
          id: '4',
          type: 'trade',
          direction: 'in',
          amount: 1000,
          token: 'USDC',
          timestamp: new Date('2024-03-01'),
          signature: '6SsA0TRrQEe1CzYOUy2s5Jj4nAtYzMzBQ1NstIuAGH012',
          price: 1.00,
          classification: 'unclassified'
        },
        {
          id: '5',
          type: 'staking',
          direction: 'in',
          amount: 0.18,
          token: 'SOL',
          timestamp: new Date('2024-03-15'),
          signature: '7TtB1USsQFf2DzZPVz3t6Kk5oButAzNcR2OtuJvAHI345',
          price: 115.20,
          classification: 'unclassified'
        }
      ];
      return mockData;
    };

    setTimeout(() => {
      setTransactions(generateMockTransactions());
      setIsLoading(false);
      setCurrentStep('review');
    }, 3000);
  }, [walletAddress]);

  const updateTransactionClassification = (id: string, classification: 'personal' | 'business') => {
    setTransactions(prev => 
      prev.map(tx => 
        tx.id === id ? { ...tx, classification } : tx
      )
    );
  };

  const proceedToCalculation = () => {
    setCurrentStep('calculate');
  };

  if (isLoading || currentStep === 'processing') {
    return (
      <div className="container mx-auto px-6 py-12">
        <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border-white/20">
          <div className="p-8 text-center">
            <Loader2 className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-spin" />
            <h2 className="text-2xl font-bold text-white mb-4">Processing Your Transactions</h2>
            <p className="text-white/70 mb-6">
              Analyzing your Solana wallet and fetching transaction history...
            </p>
            <div className="space-y-2 text-left max-w-md mx-auto">
              <div className="flex items-center text-white/60">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
                Fetching transaction data from Solana blockchain
              </div>
              <div className="flex items-center text-white/60">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse delay-300"></div>
                Classifying DeFi and trading activities
              </div>
              <div className="flex items-center text-white/60">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse delay-700"></div>
                Calculating cost basis and fair market values
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (currentStep === 'calculate') {
    return <TaxCalculator transactions={transactions} walletAddress={walletAddress} />;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
          <div className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Review Your Transactions</h2>
            <p className="text-white/70 mb-6">
              We found {transactions.length} transactions. Please review and classify them before generating your tax report.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Badge className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                <ArrowUpDown className="w-4 h-4 mr-1" />
                {transactions.filter(tx => tx.type === 'transfer').length} Transfers
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-200 border-blue-500/30">
                <TrendingUp className="w-4 h-4 mr-1" />
                {transactions.filter(tx => tx.type === 'trade').length} Trades
              </Badge>
              <Badge className="bg-green-500/20 text-green-200 border-green-500/30">
                <Coins className="w-4 h-4 mr-1" />
                {transactions.filter(tx => tx.type === 'staking').length} Staking Rewards
              </Badge>
            </div>

            <Button 
              onClick={proceedToCalculation}
              disabled={transactions.some(tx => tx.classification === 'unclassified')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
            >
              <FileText className="w-5 h-5 mr-2" />
              Generate Tax Report
            </Button>
            
            {transactions.some(tx => tx.classification === 'unclassified') && (
              <p className="text-orange-300 text-sm mt-2">
                Please classify all transactions before proceeding
              </p>
            )}
          </div>
        </Card>

        <TransactionList 
          transactions={transactions} 
          onClassificationChange={updateTransactionClassification}
        />
      </div>
    </div>
  );
};
