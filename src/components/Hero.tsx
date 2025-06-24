import React from "react";
import { Calculator, FileText, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 text-center">
          <div className="mb-20">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-sans font-bold text-foreground mb-8 tracking-tight leading-[0.9]">
              Stop Stressing About
              <span className="block text-primary">Solana Taxes</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
              Generate IRS-compliant tax reports in 3 minutes. Save $500+ vs
              hiring a CPA. Trusted by 2,500+ DeFi traders.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                No CPA fees (save $500+)
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                3-minute processing
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Form 8949 ready
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/import">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 h-12"
                >
                  Generate Report
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="#demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-medium px-8 h-12"
                >
                  Try Sample Report
                </Button>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-card border border-border rounded-lg mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-2">
                IRS Compliant
              </h3>
              <p className="text-sm text-muted-foreground">
                Form 8949 ready exports
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-card border border-border rounded-lg mb-4">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-2">FIFO Method</h3>
              <p className="text-sm text-muted-foreground">
                Accurate cost basis calculations
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-card border border-border rounded-lg mb-4">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-2">
                Smart Detection
              </h3>
              <p className="text-sm text-muted-foreground">
                Auto-categorize transactions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
