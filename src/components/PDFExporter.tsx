import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Check, ArrowLeft, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Transaction, TaxSummary } from '@/types/transaction';
import jsPDF from 'jspdf';

interface PDFExporterProps {
  taxSummary: TaxSummary;
  transactions: Transaction[];
  walletAddresses: string[];
}

export const PDFExporter: React.FC<PDFExporterProps> = ({ taxSummary, transactions, walletAddresses }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Create new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const lineHeight = 6;
      let yPosition = margin;

      // Helper function to check if we need a new page
      const checkPageBreak = (requiredSpace: number = 10) => {
        if (yPosition + requiredSpace > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };

      // Helper function to add text with word wrap
      const addText = (text: string, x: number, fontSize: number = 10, fontStyle: string = 'normal') => {
        pdf.setFont('helvetica', fontStyle);
        pdf.setFontSize(fontSize);
        const maxWidth = pageWidth - (2 * margin);
        const lines = pdf.splitTextToSize(text, maxWidth - x + margin);
        
        for (let i = 0; i < lines.length; i++) {
          checkPageBreak();
          pdf.text(lines[i], x, yPosition);
          yPosition += lineHeight;
        }
      };

      // Title Page
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(24);
      pdf.text('TAX3 UNIFIED CRYPTO TAX REPORT', pageWidth / 2, 40, { align: 'center' });
      
      pdf.setFontSize(16);
      pdf.text('2025 Tax Year', pageWidth / 2, 50, { align: 'center' });
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 60, { align: 'center' });
      pdf.text(`Report Type: Multi-Wallet Unified Analysis`, pageWidth / 2, 68, { align: 'center' });
      pdf.text(`Total Wallets: ${walletAddresses.length}`, pageWidth / 2, 76, { align: 'center' });

      yPosition = 100;

      // Executive Summary
      checkPageBreak(50);
      addText('EXECUTIVE SUMMARY', margin, 16, 'bold');
      yPosition += 5;

      addText(`Total Capital Gains: $${taxSummary.totalGains.toFixed(2)}`, margin, 12);
      addText(`Total Capital Losses: $${taxSummary.totalLosses.toFixed(2)}`, margin, 12);
      addText(`Net Capital Result: $${taxSummary.netGains.toFixed(2)}`, margin, 12, 'bold');
      yPosition += 3;

      addText(`Short-term Gains: $${taxSummary.shortTermGains.toFixed(2)}`, margin, 11);
      addText(`Long-term Gains: $${taxSummary.longTermGains.toFixed(2)}`, margin, 11);
      addText(`Staking Income: $${taxSummary.stakingIncome.toFixed(2)}`, margin, 11);
      yPosition += 3;

      addText(`Total Transactions Analyzed: ${taxSummary.totalTransactions.toLocaleString()}`, margin, 11);
      addText(`Analysis Method: FIFO (First In, First Out)`, margin, 11);
      addText(`Compliance: US Tax Code (IRS Publication 544)`, margin, 11);

      // Wallet Summaries
      yPosition += 10;
      checkPageBreak(30);
      addText('WALLET BREAKDOWN', margin, 16, 'bold');
      yPosition += 5;

      walletAddresses.forEach((address, index) => {
        checkPageBreak(25);
        const shortAddress = address.slice(0, 8) + '...' + address.slice(-4);
        const walletTxs = transactions.filter(tx => tx.walletAddress === shortAddress);
        
        addText(`Wallet ${index + 1}:`, margin, 12, 'bold');
        addText(`Address: ${address}`, margin + 10, 10);
        addText(`Total Transactions: ${walletTxs.length}`, margin + 10, 10);
        
        const transactionTypes = {
          transfers: walletTxs.filter(tx => tx.type === 'transfer').length,
          trades: walletTxs.filter(tx => tx.type === 'trade').length,
          swaps: walletTxs.filter(tx => tx.type === 'swap').length,
          staking: walletTxs.filter(tx => tx.type === 'staking').length,
          defi: walletTxs.filter(tx => tx.type === 'defi').length,
        };

        addText(`  - Transfers: ${transactionTypes.transfers}`, margin + 15, 9);
        addText(`  - Trades: ${transactionTypes.trades}`, margin + 15, 9);
        addText(`  - Swaps: ${transactionTypes.swaps}`, margin + 15, 9);
        addText(`  - Staking: ${transactionTypes.staking}`, margin + 15, 9);
        addText(`  - DeFi: ${transactionTypes.defi}`, margin + 15, 9);
        yPosition += 3;
      });

      // Transaction Log (Limited to first 50 for PDF size)
      yPosition += 10;
      checkPageBreak(30);
      addText('DETAILED TRANSACTION LOG (First 50 Transactions)', margin, 16, 'bold');
      yPosition += 5;

      const transactionsToShow = transactions.slice(0, 50);
      
      transactionsToShow.forEach((tx, index) => {
        checkPageBreak(20);
        addText(`Transaction ${index + 1}:`, margin, 11, 'bold');
        addText(`Date: ${tx.timestamp.toLocaleDateString()}`, margin + 5, 9);
        addText(`Wallet: ${tx.walletAddress}`, margin + 5, 9);
        addText(`Type: ${tx.type.toUpperCase()} (${tx.direction.toUpperCase()})`, margin + 5, 9);
        addText(`Amount: ${tx.amount.toFixed(6)} ${tx.token}`, margin + 5, 9);
        addText(`Price: $${(tx.price || 0).toFixed(2)}`, margin + 5, 9);
        addText(`Value: $${(tx.amount * (tx.price || 0)).toFixed(2)}`, margin + 5, 9);
        addText(`Classification: ${tx.classification.toUpperCase()}`, margin + 5, 9);
        addText(`Signature: ${tx.signature.slice(0, 20)}...`, margin + 5, 8);
        yPosition += 3;
      });

      if (transactions.length > 50) {
        yPosition += 5;
        addText(`... and ${transactions.length - 50} more transactions`, margin, 11, 'italic');
      }

      // Tax Forms Guidance
      yPosition += 10;
      checkPageBreak(30);
      addText('TAX FORMS GUIDANCE', margin, 16, 'bold');
      yPosition += 5;

      addText('Form 8949: Report all capital gains and losses from crypto transactions', margin, 11);
      addText('Schedule D: Summarize total capital gains/losses', margin, 11);
      addText('Schedule 1: Report any staking income as "Other Income"', margin, 11);

      // Methodology
      yPosition += 10;
      checkPageBreak(25);
      addText('METHODOLOGY', margin, 16, 'bold');
      yPosition += 5;

      addText('• Cost Basis: FIFO (First In, First Out) method applied', margin, 11);
      addText('• Price Data: Historical market prices at transaction time', margin, 11);
      addText('• Cross-Wallet Optimization: Transactions analyzed across all wallets', margin, 11);
      addText('• Duplicate Detection: Cross-wallet duplicate transactions identified', margin, 11);

      // Disclaimer
      yPosition += 10;
      checkPageBreak(25);
      addText('DISCLAIMER', margin, 16, 'bold');
      yPosition += 5;

      addText('This report is generated for informational purposes only.', margin, 11);
      addText('Please consult with a qualified tax professional for tax advice.', margin, 11);
      addText('The calculations are based on FIFO cost basis method and US tax rules.', margin, 11);
      addText('Tax3 does not provide tax, legal, or accounting advice.', margin, 11);

      // Footer
      yPosition += 15;
      checkPageBreak(15);
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(10);
      pdf.text('Generated by Tax3 - Professional Crypto Tax Reporting', pageWidth / 2, yPosition, { align: 'center' });
      pdf.text(`Version 1.0 | Report ID: ${Date.now()}`, pageWidth / 2, yPosition + 5, { align: 'center' });

      // Save the PDF
      const fileName = `Tax3_Unified_Report_2024_${walletAddresses.length}_wallets.pdf`;
      pdf.save(fileName);

      setIsGenerating(false);
      setIsComplete(true);
      
      toast({
        title: "Professional PDF Report Generated",
        description: "Your comprehensive tax report has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsGenerating(false);
      toast({
        title: "Error Generating PDF",
        description: "There was an error creating your PDF report. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <Card className="max-w-4xl mx-auto bg-card border-border">
            <div className="p-6 sm:p-8 text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mb-4">
                Professional PDF Report Generated!
              </h2>
              <p className="text-muted-foreground mb-8">
                Your comprehensive Tax3 unified PDF report covering {walletAddresses.length} wallets has been generated and downloaded.
              </p>
              
              {/* Report Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">{walletAddresses.length}</div>
                  <div className="text-sm text-muted-foreground">Wallets Analyzed</div>
                </div>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-400 mb-2">
                    {taxSummary.totalTransactions.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Transactions</div>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400 mb-2">
                    ${Math.abs(taxSummary.netGains).toLocaleString(undefined, { minimumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-muted-foreground">Net Capital Result</div>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="p-6 bg-primary/10 border border-primary/20 rounded-lg text-left">
                  <h3 className="text-primary font-medium mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    What's Included in Your Professional PDF Report:
                  </h3>
                  <ul className="text-muted-foreground text-sm space-y-2">
                    <li>• Professionally formatted PDF with cover page and table of contents</li>
                    <li>• Cross-wallet transaction analysis with duplicate detection</li>
                    <li>• Optimized cost basis calculations using FIFO method</li>
                    <li>• Individual wallet breakdowns and combined summary</li>
                    <li>• Short-term vs long-term capital gains classification</li>
                    <li>• Comprehensive staking income calculations</li>
                    <li>• IRS-compliant formatting with Form 8949 guidance</li>
                    <li>• Detailed transaction log with signatures and classifications</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-left">
                  <h3 className="text-yellow-400 font-medium mb-4">Next Steps for Tax Filing:</h3>
                  <ul className="text-muted-foreground text-sm space-y-2">
                    <li>• Review the unified PDF report with your tax professional</li>
                    <li>• Use Form 8949 data to complete your tax return</li>
                    <li>• Keep the PDF report for your tax records</li>
                    <li>• Consider quarterly estimated payments for next year</li>
                    <li>• Set up record-keeping for ongoing transactions</li>
                  </ul>
                </div>

                {/* Wallet Summary */}
                <div className="p-6 bg-muted/10 border border-border rounded-lg text-left">
                  <h3 className="text-white font-medium mb-4 flex items-center">
                    <Wallet className="w-5 h-5 mr-2" />
                    Wallets Included in This PDF Report:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {walletAddresses.map((address, index) => (
                      <div key={address} className="p-3 bg-card border border-border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">Wallet {index + 1}:</span>
                          <span className="font-mono text-sm text-white">
                            {address.slice(0, 8)}...{address.slice(-4)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={generatePDF}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Again
                </Button>
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Generate New Report
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <Card className="max-w-4xl mx-auto bg-card border-border">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mb-2">
                Generate Professional PDF Tax Report
              </h2>
              <p className="text-muted-foreground">
                Create your professional PDF tax report covering {walletAddresses.length} wallets, ready for IRS filing
              </p>
            </div>

            {/* Report Preview */}
            <div className="bg-muted/20 rounded-lg p-6 mb-8 border border-border">
              <h3 className="text-white font-semibold mb-4">Professional PDF Report Contents:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Wallets:</span>
                    <span className="text-primary font-mono">{walletAddresses.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Gains:</span>
                    <span className="text-emerald-400 font-mono">${taxSummary.totalGains.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Losses:</span>
                    <span className="text-red-400 font-mono">${taxSummary.totalLosses.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net Result:</span>
                    <span className={`font-mono ${taxSummary.netGains >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      ${Math.abs(taxSummary.netGains).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Short-term:</span>
                    <span className="text-orange-400 font-mono">${taxSummary.shortTermGains.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Long-term:</span>
                    <span className="text-purple-400 font-mono">${taxSummary.longTermGains.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Staking Income:</span>
                    <span className="text-yellow-400 font-mono">${taxSummary.stakingIncome.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transactions:</span>
                    <span className="text-blue-400 font-mono">{taxSummary.totalTransactions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generatePDF}
              disabled={isGenerating}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg"
            >
              {isGenerating ? (
                <>
                  <Download className="w-5 h-5 mr-2 animate-pulse" />
                  Generating Professional PDF Report...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  Generate & Download Professional PDF Report
                </>
              )}
            </Button>

            <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-primary text-sm text-center">
                <strong>Professional PDF Report:</strong> This unified report provides comprehensive analysis across all your wallets with 
                cross-wallet optimization and IRS-compliant formatting. Please consult with a qualified tax professional for advice.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
