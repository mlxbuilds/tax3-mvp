
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, TrendingUp, Coins, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'transfer' | 'trade' | 'staking';
  direction: 'in' | 'out';
  amount: number;
  token: string;
  timestamp: Date;
  signature: string;
  price?: number;
  classification: 'personal' | 'business' | 'unclassified';
}

interface TransactionListProps {
  transactions: Transaction[];
  onClassificationChange: (id: string, classification: 'personal' | 'business') => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onClassificationChange
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transfer':
        return ArrowUpDown;
      case 'trade':
        return TrendingUp;
      case 'staking':
        return Coins;
      default:
        return ArrowUpDown;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'transfer':
        return 'bg-purple-500/20 text-purple-200 border-purple-500/30';
      case 'trade':
        return 'bg-blue-500/20 text-blue-200 border-blue-500/30';
      case 'staking':
        return 'bg-green-500/20 text-green-200 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-200 border-gray-500/30';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number, token: string) => {
    if (token === 'USDC' || token === 'USD') {
      return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${token}`;
  };

  return (
    <div className="space-y-4">
      {transactions.map((tx) => {
        const TypeIcon = getTypeIcon(tx.type);
        
        return (
          <Card key={tx.id} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(tx.type)}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center">
                      {tx.direction === 'in' ? (
                        <ArrowDown className="w-4 h-4 text-green-400 mr-1" />
                      ) : (
                        <ArrowUp className="w-4 h-4 text-red-400 mr-1" />
                      )}
                      <span className="text-white font-medium capitalize">
                        {tx.type} {tx.direction === 'in' ? 'Received' : 'Sent'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <div className="text-white font-semibold">
                      {formatCurrency(tx.amount, tx.token)}
                    </div>
                    {tx.price && (
                      <div className="text-white/60 text-sm">
                        @ ${tx.price.toFixed(2)} = ${(tx.amount * tx.price).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="text-right">
                    <div className="text-white/70 text-sm">
                      {formatDate(tx.timestamp)}
                    </div>
                    <a 
                      href={`https://solscan.io/tx/${tx.signature}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-xs flex items-center justify-end"
                    >
                      View on Solscan
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      variant={tx.classification === 'personal' ? 'default' : 'outline'}
                      onClick={() => onClassificationChange(tx.id, 'personal')}
                      className={`${
                        tx.classification === 'personal'
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      } transition-all duration-200`}
                    >
                      Personal
                    </Button>
                    <Button
                      size="sm"
                      variant={tx.classification === 'business' ? 'default' : 'outline'}
                      onClick={() => onClassificationChange(tx.id, 'business')}
                      className={`${
                        tx.classification === 'business'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      } transition-all duration-200`}
                    >
                      Business
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
