
import React from 'react';
import { WalletImport } from '@/components/WalletImport';
import { FeatureGrid } from '@/components/FeatureGrid';
import { Hero } from '@/components/Hero';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="relative">
        <Hero />
        <WalletImport />
        <FeatureGrid />
      </div>
    </div>
  );
};

export default Index;
