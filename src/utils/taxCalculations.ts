import { Transaction, FIFOPosition, TaxSummary } from "@/types/transaction";

export class TaxCalculationEngine {
  private fifoQueues: Map<string, FIFOPosition[]> = new Map();
  private washSalePositions: Map<string, { date: Date; loss: number }[]> =
    new Map();

  calculateTaxes(transactions: Transaction[]): TaxSummary {
    // Reset calculation state
    this.fifoQueues.clear();
    this.washSalePositions.clear();

    // Sort transactions by date
    const sortedTransactions = [...transactions].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );

    let totalGains = 0;
    let totalLosses = 0;
    let shortTermGains = 0;
    let longTermGains = 0;
    let stakingIncome = 0;
    let washSaleLosses = 0;
    const form8949ShortTerm: Transaction[] = [];
    const form8949LongTerm: Transaction[] = [];

    for (const tx of sortedTransactions) {
      if (tx.type === "staking") {
        // Staking rewards are ordinary income at FMV when received
        const income = tx.amount * (tx.price || 0);
        stakingIncome += income;

        // Add to FIFO queue as cost basis for future disposals
        this.addToFIFO(tx.token, tx.amount, income, tx.timestamp, tx.signature);
      } else if (tx.direction === "in") {
        // Acquisitions (buys, receives)
        const costBasis = tx.amount * (tx.price || 0);
        this.addToFIFO(
          tx.token,
          tx.amount,
          costBasis,
          tx.timestamp,
          tx.signature
        );
      } else if (tx.direction === "out") {
        // Disposals (sells, sends, swaps)
        const proceeds = tx.amount * (tx.price || 0);
        const { costBasis, isLongTerm, positions } = this.removeFromFIFO(
          tx.token,
          tx.amount,
          tx.timestamp
        );

        const gainLoss = proceeds - costBasis;

        // Check for wash sale
        const isWashSale = this.checkWashSale(tx.token, tx.timestamp, gainLoss);

        // Update transaction with calculated values
        tx.costBasis = costBasis;
        tx.gainLoss = isWashSale ? 0 : gainLoss;
        tx.isWashSale = isWashSale;

        if (isWashSale && gainLoss < 0) {
          washSaleLosses += Math.abs(gainLoss);
          // Adjust cost basis of replacement positions
          this.adjustCostBasisForWashSale(tx.token, Math.abs(gainLoss));
        } else {
          if (gainLoss > 0) {
            totalGains += gainLoss;
            if (isLongTerm) {
              longTermGains += gainLoss;
            } else {
              shortTermGains += gainLoss;
            }
          } else {
            totalLosses += Math.abs(gainLoss);
          }
        }

        // Add to appropriate Form 8949 list
        if (isLongTerm) {
          form8949LongTerm.push(tx);
        } else {
          form8949ShortTerm.push(tx);
        }
      }
    }

    const netGains = totalGains - totalLosses;

    return {
      totalGains,
      totalLosses,
      netGains,
      shortTermGains,
      longTermGains,
      stakingIncome,
      totalTransactions: transactions.length,
      washSaleLosses,
      form8949ShortTerm,
      form8949LongTerm,
    };
  }

  private addToFIFO(
    token: string,
    amount: number,
    costBasis: number,
    date: Date,
    signature: string
  ) {
    if (!this.fifoQueues.has(token)) {
      this.fifoQueues.set(token, []);
    }

    this.fifoQueues.get(token)!.push({
      amount,
      costBasis,
      date,
      signature,
    });
  }

  private removeFromFIFO(
    token: string,
    amount: number,
    saleDate: Date
  ): {
    costBasis: number;
    isLongTerm: boolean;
    positions: FIFOPosition[];
  } {
    const queue = this.fifoQueues.get(token) || [];
    let remainingAmount = amount;
    let totalCostBasis = 0;
    let isLongTerm = true;
    const usedPositions: FIFOPosition[] = [];

    while (remainingAmount > 0 && queue.length > 0) {
      const position = queue[0];
      const daysHeld = Math.floor(
        (saleDate.getTime() - position.date.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Short-term if held for 365 days or less
      if (daysHeld <= 365) {
        isLongTerm = false;
      }

      if (position.amount <= remainingAmount) {
        // Use entire position
        totalCostBasis += position.costBasis;
        remainingAmount -= position.amount;
        usedPositions.push(queue.shift()!);
      } else {
        // Use partial position
        const ratio = remainingAmount / position.amount;
        totalCostBasis += position.costBasis * ratio;
        position.amount -= remainingAmount;
        position.costBasis -= position.costBasis * ratio;

        usedPositions.push({
          amount: remainingAmount,
          costBasis: position.costBasis * ratio,
          date: position.date,
          signature: position.signature,
        });

        remainingAmount = 0;
      }
    }

    return {
      costBasis: totalCostBasis,
      isLongTerm,
      positions: usedPositions,
    };
  }

  private checkWashSale(
    token: string,
    saleDate: Date,
    gainLoss: number
  ): boolean {
    if (gainLoss >= 0) return false; // Wash sale only applies to losses

    const washSalePeriodStart = new Date(
      saleDate.getTime() - 30 * 24 * 60 * 60 * 1000
    );
    const washSalePeriodEnd = new Date(
      saleDate.getTime() + 30 * 24 * 60 * 60 * 1000
    );

    // Check if substantially identical property was acquired within wash sale period
    const queue = this.fifoQueues.get(token) || [];

    return queue.some(
      (position) =>
        position.date >= washSalePeriodStart &&
        position.date <= washSalePeriodEnd &&
        position.date !== saleDate
    );
  }

  private adjustCostBasisForWashSale(token: string, disallowedLoss: number) {
    const queue = this.fifoQueues.get(token) || [];
    if (queue.length === 0) return;

    // Add disallowed loss to cost basis of most recent acquisition
    const mostRecent = queue[queue.length - 1];
    mostRecent.costBasis += disallowedLoss;
  }
}

// Export helper functions that are used by TaxCalculator
export const calculateFIFOGains = (
  trades: Transaction[],
  swaps: Transaction[]
) => {
  const engine = new TaxCalculationEngine();
  const combinedTransactions = [...trades, ...swaps];
  const result = engine.calculateTaxes(combinedTransactions);

  return {
    totalGains: result.totalGains,
    totalLosses: result.totalLosses,
    shortTermGains: result.shortTermGains,
    longTermGains: result.longTermGains,
  };
};

export const calculateStakingIncome = (stakingTransactions: Transaction[]) => {
  return stakingTransactions.reduce((total, tx) => {
    return total + tx.amount * (tx.price || 0);
  }, 0);
};

export const categorizeTransactions = (transactions: Transaction[]) => {
  return {
    trades: transactions.filter((tx) => tx.type === "trade"),
    swaps: transactions.filter((tx) => tx.type === "swap"),
    staking: transactions.filter((tx) => tx.type === "staking"),
    transfers: transactions.filter((tx) => tx.type === "transfer"),
    defi: transactions.filter((tx) => tx.type === "defi"),
  };
};
