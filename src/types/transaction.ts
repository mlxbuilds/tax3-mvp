
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
  costBasis?: number;
  gainLoss?: number;
  isWashSale?: boolean;
}

export interface FIFOPosition {
  amount: number;
  costBasis: number;
  date: Date;
  signature: string;
}

export interface TaxSummary {
  totalGains: number;
  totalLosses: number;
  netGains: number;
  shortTermGains: number;
  longTermGains: number;
  stakingIncome: number;
  totalTransactions: number;
  washSaleLosses: number;
  form8949ShortTerm: Transaction[];
  form8949LongTerm: Transaction[];
}
