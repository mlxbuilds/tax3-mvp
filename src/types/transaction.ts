
export interface Transaction {
  id: string;
  type: 'transfer' | 'trade' | 'staking' | 'swap' | 'defi';
  direction: 'in' | 'out';
  amount: number;
  token: string;
  timestamp: Date;
  signature: string;
  price?: number;
  classification: 'personal' | 'business' | 'unclassified';
  walletAddress?: string;
  walletLabel?: string;
}

export interface TaxSummary {
  totalGains: number;
  totalLosses: number;
  netGains: number;
  shortTermGains: number;
  longTermGains: number;
  stakingIncome: number;
  totalTransactions: number;
}
