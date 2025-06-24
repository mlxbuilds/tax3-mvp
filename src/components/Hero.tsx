
import React from 'react';
import { TrendingUp, Shield, FileText } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="container mx-auto px-6 pt-16 pb-8">
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8 animate-fade-in">
          <TrendingUp className="w-4 h-4 text-purple-300 mr-2" />
          <span className="text-white/90 text-sm font-medium">Trusted by 10,000+ Solana users</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 animate-fade-in delay-200">
          Solana Tax Report
          <br />
          <span className="text-5xl md:text-6xl">Generator</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
          Generate comprehensive tax reports for all your Solana activities. 
          Handle DeFi, staking, and trading with professional-grade accuracy.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-white/70 animate-fade-in delay-400">
          <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <Shield className="w-4 h-4 mr-2 text-green-400" />
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <FileText className="w-4 h-4 mr-2 text-blue-400" />
            <span>IRS Compliant</span>
          </div>
          <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <TrendingUp className="w-4 h-4 mr-2 text-purple-400" />
            <span>FIFO Cost Basis</span>
          </div>
        </div>
      </div>
    </div>
  );
};
