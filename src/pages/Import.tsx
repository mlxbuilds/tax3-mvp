import React from 'react';
import { Link } from 'react-router-dom';
import { MultiWalletImport } from '@/components/MultiWalletImport';

import { Footer } from '@/components/Footer';
import { ArrowLeft, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Import = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
            {/* Floating Header */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-fit">
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-full px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Back Button */}
            <Link to="/">
              <Button variant="ghost" size="sm" className="rounded-full h-7 sm:h-8 px-2 sm:px-3 text-xs font-medium hover:bg-muted/50">
                <ArrowLeft className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </Link>
            
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Calculator className="w-3 h-3 text-primary" />
              </div>
              <span className="font-sans font-semibold text-sm text-foreground">Tax3</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <MultiWalletImport />
      </main>

      <Footer />
    </div>
  );
};

export default Import; 