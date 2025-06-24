
import React from 'react';
import { Calculator } from 'lucide-react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
          <Calculator className="w-4 h-4 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full text-xs flex items-center justify-center">
          <span className="text-black font-bold text-[8px]">3</span>
        </div>
      </div>
      <span className="font-sans font-bold text-xl text-white">Tax3</span>
    </div>
  );
};
