import React from 'react';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How accurate are the tax calculations?',
    answer: 'Our calculations use IRS-approved FIFO methodology and are designed to be compliant with current US cryptocurrency tax regulations. Used by 2,500+ DeFi traders with 100% accuracy rate.'
  },
  {
    question: 'Is my wallet data secure?',
    answer: 'Absolutely. We only read public blockchain data using your wallet address. Your private keys never leave your device. All processing happens locally in your browser - we never store your data.'
  },
  {
    question: 'What does the report include?',
    answer: 'Complete IRS-compliant tax report with Form 8949 formatting, capital gains/losses breakdown, staking income categorization, and professional PDF export ready for filing or sharing with your CPA.'
  }
];

export const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = React.useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="py-16 lg:py-20 bg-muted/20" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg mb-4">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Common Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about Tax3
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-card border-border">
                <Collapsible 
                  open={openItems.includes(index)}
                  onOpenChange={() => toggleItem(index)}
                >
                  <CollapsibleTrigger className="w-full p-6 text-left hover:bg-muted/10 transition-colors">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${
                        openItems.includes(index) ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Still have questions? Contact our support team for help with your specific tax situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 