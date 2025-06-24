
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Shield, FileText, Calculator, Clock, Download } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: "DeFi & Trading Analysis",
    description: "Automatically classify SOL transfers, SPL token trades via Jupiter/Raydium, and complex DeFi transactions.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Calculator,
    title: "FIFO Cost Basis",
    description: "Calculate capital gains using First-In-First-Out methodology, compliant with US tax regulations.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Clock,
    title: "Staking Rewards",
    description: "Track and categorize staking rewards from validators as ordinary income at fair market value.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Shield,
    title: "IRS Compliant",
    description: "Generate reports that meet IRS requirements with proper classification of short-term vs long-term gains.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: FileText,
    title: "Professional Reports",
    description: "Export detailed PDF reports with transaction summaries, gains/losses, and income calculations.",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Download,
    title: "Easy Export",
    description: "Download tax-ready reports in PDF format, perfect for filing with your tax professional or software.",
    gradient: "from-teal-500 to-blue-500"
  }
];

export const FeatureGrid = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Everything You Need for Solana Taxes
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Professional-grade tax reporting tools designed specifically for the Solana ecosystem
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
          >
            <div className="p-6">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
