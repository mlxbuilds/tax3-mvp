
import React from 'react';
import { Calculator, FileText, DollarSign } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="border-b border-border bg-black">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-card border border-border rounded-lg mb-6">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-sans font-bold text-white mb-6 tracking-tight">
              Solana Tax Report Generator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Generate IRS-compliant tax reports for your Solana transactions. 
              Professional-grade calculations with proper FIFO cost basis and Form 8949 compatibility.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-card border border-border rounded-lg mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans font-semibold text-white mb-2">IRS Compliant</h3>
              <p className="text-sm text-muted-foreground">Form 8949 and Schedule D ready exports</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-card border border-border rounded-lg mb-4">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans font-semibold text-white mb-2">FIFO Cost Basis</h3>
              <p className="text-sm text-muted-foreground">Accurate first-in-first-out calculations</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-card border border-border rounded-lg mb-4">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans font-semibold text-white mb-2">Wash Sale Detection</h3>
              <p className="text-sm text-muted-foreground">Automatic wash sale rule application</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
