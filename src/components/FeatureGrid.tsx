
import React from 'react';
import { Card } from '@/components/ui/card';
import { FileText, Calculator, Shield, Download, Clock, AlertTriangle } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'IRS Form 8949 Compatible',
    description: 'Generate reports that map directly to IRS forms with all required fields and proper formatting for tax filing.'
  },
  {
    icon: Calculator,
    title: 'FIFO Cost Basis Engine',
    description: 'Professional-grade first-in-first-out calculations that track cost basis across all transactions accurately.'
  },
  {
    icon: AlertTriangle,
    title: 'Wash Sale Detection',
    description: 'Automatic identification and adjustment for wash sales per IRS regulations, ensuring compliance.'
  },
  {
    icon: Shield,
    title: 'Tax Law Compliant',
    description: 'Built following current US cryptocurrency tax regulations and guidance from the IRS.'
  },
  {
    icon: Download,
    title: 'Professional Reports',
    description: 'Export detailed PDF reports suitable for tax professionals and direct filing with tax software.'
  },
  {
    icon: Clock,
    title: 'Historical Data',
    description: 'Complete transaction history analysis with proper date classifications for short vs long-term gains.'
  }
];

export const FeatureGrid: React.FC = () => {
  return (
    <div className="bg-black">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-sans font-bold text-white mb-4">
              Professional Tax Compliance
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for accuracy, compliance, and professional use. Generate reports that tax professionals trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:border-border/60 transition-colors">
                <div className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-sans font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-card border-border max-w-4xl mx-auto">
              <div className="p-8">
                <h3 className="text-xl font-sans font-semibold text-white mb-4">
                  Disclaimer
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This tool is for informational purposes only. Tax laws are complex and subject to change. 
                  Always consult with a qualified tax professional for advice specific to your situation. 
                  This software is not a substitute for professional tax advice.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
