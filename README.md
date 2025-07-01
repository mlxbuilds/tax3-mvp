# Tax3 MVP - Solana Tax Calculator

A comprehensive Solana tax calculation app that automatically fetches transaction data from the blockchain and generates IRS-compliant tax reports.

## 🚀 Features

### ✅ Real Solana Integration
- **Live Wallet Connection**: Connect Phantom, Solflare, and Coinbase wallets
- **Blockchain Data Fetching**: Automatically retrieves real transaction history from Solana
- **Multi-Wallet Support**: Process multiple wallets simultaneously
- **Real-time Balance Display**: Shows current SOL balance for connected wallets

### ✅ Transaction Processing
- **Comprehensive Analysis**: Processes SOL transfers and SPL token transactions
- **Smart Classification**: Automatically categorizes transactions (transfers, swaps, staking, DeFi)
- **Historical Data**: Fetches complete transaction history with timestamps
- **Cross-wallet Optimization**: Optimizes cost basis calculations across multiple wallets

### ✅ Tax Calculations
- **FIFO Methodology**: IRS-compliant First-In-First-Out calculations
- **Capital Gains/Losses**: Accurate short-term and long-term calculations
- **Staking Income**: Proper categorization of staking rewards
- **Wash Sale Detection**: Identifies and handles wash sale transactions

### ✅ Professional Reporting
- **Form 8949 Ready**: Generates reports in proper IRS format
- **PDF Export**: Professional PDF reports ready for filing
- **Detailed Breakdown**: Complete transaction-by-transaction analysis
- **Summary Statistics**: Clear overview of tax implications

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Blockchain**: Solana Web3.js + Wallet Adapter
- **UI Components**: shadcn/ui component library
- **State Management**: React Query for data fetching
- **Routing**: React Router
- **Build Tool**: Vite

## 🏃‍♂️ Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

4. **Connect your Solana wallet** on the Import page

5. **Generate your tax report** with real blockchain data!

## 📱 How to Use

### Step 1: Connect Wallets
1. Navigate to the Import page (`/import`)
2. Click "Select Wallet" to connect your Solana wallet
3. Authorize the connection in your wallet
4. Your wallet address and balance will be displayed
5. Connect additional wallets if needed

### Step 2: Process Transactions
1. Click "Generate Tax Report" 
2. The app will automatically fetch all transaction history from the Solana blockchain
3. Real-time progress updates show fetching status for each wallet
4. Transaction data is processed and categorized automatically

### Step 3: Review & Classify
1. Review the fetched transactions in the unified table view
2. Classify transactions as "Personal" or "Business" as needed
3. The system automatically detects transaction types (transfers, swaps, staking, etc.)
4. Make any necessary adjustments to transaction classifications

### Step 4: Generate Report
1. Proceed to tax calculations with FIFO methodology
2. Review the comprehensive tax summary including:
   - Total capital gains/losses
   - Short-term vs long-term breakdown
   - Staking income
   - Per-wallet statistics
3. Export professional PDF report ready for filing

## 🔒 Security & Privacy

- **No Private Keys**: Only reads public transaction data from the blockchain
- **Wallet Security**: Private keys never leave your wallet
- **Local Processing**: All calculations happen in your browser
- **No Data Storage**: We don't store your wallet data or transaction history

## 🌐 Supported Wallets

- Phantom Wallet
- Solflare Wallet  
- Coinbase Wallet
- Any wallet compatible with Solana Wallet Adapter

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── WalletConnection.tsx    # Wallet connection interface
│   ├── TransactionProcessor.tsx # Real blockchain data processing
│   ├── TaxCalculator.tsx       # FIFO tax calculations
│   └── ui/             # shadcn/ui components
├── utils/
│   ├── solanaDataFetcher.ts    # Blockchain data fetching
│   └── taxCalculations.ts      # Tax calculation engine
├── types/
│   └── transaction.ts  # TypeScript interfaces
└── pages/              # Route components
```

### Key Implementation Details

#### Real Blockchain Integration
- Uses `@solana/web3.js` for blockchain connectivity
- Implements batch processing to respect RPC rate limits
- Handles both SOL and SPL token transactions
- Includes error handling for network issues

#### Tax Calculation Engine
- FIFO (First-In-First-Out) methodology for cost basis
- Wash sale detection and adjustment
- Short-term vs long-term capital gains classification
- Staking income categorization

#### Performance Optimizations
- Batch transaction processing
- Price caching to reduce API calls
- Progressive loading with user feedback
- Error recovery for individual wallet failures

## 🚀 Production Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Preview the build**:
   ```bash
   npm run preview
   ```

3. **Deploy** to your preferred hosting platform (Vercel, Netlify, etc.)

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**⚠️ Tax Disclaimer**: This tool is for informational purposes only. Please consult with a qualified tax professional for tax advice specific to your situation.
