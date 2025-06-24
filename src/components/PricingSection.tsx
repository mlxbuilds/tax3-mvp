import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: 'Free',
    period: 'forever',
    description: 'Perfect for getting started',
    icon: Check,
    features: [
      'Up to 100 transactions',
      'Basic tax calculations',
      'PDF export',
      'Single wallet import'
    ],
    buttonText: 'Start Free',
    popular: false,
    variant: 'outline' as const
  },
  {
    name: 'Quarter',
    price: '1 SOL',
    period: '3 months',
    description: 'Perfect for active traders',
    icon: Zap,
    features: [
      'Unlimited transactions',
      'Multiple wallet support',
      'Advanced tax optimization',
      'FIFO & LIFO methods',
      'Form 8949 export',
      'Priority support'
    ],
    buttonText: 'Get Quarter Access',
    popular: true,
    variant: 'default' as const
  },
  {
    name: 'Lifetime',
    price: '4 SOL',
    period: 'lifetime',
    description: 'One-time payment, lifetime access',
    icon: Crown,
    features: [
      'Everything in Quarter plan',
      'Lifetime updates',
      'API access',
      'Custom export formats',
      'White-label reports',
      'Direct CPA support'
    ],
    buttonText: 'Get Lifetime Access',
    popular: false,
    variant: 'secondary' as const
  }
];

export const PricingSection: React.FC = () => {
  return (
    <div className="py-16 lg:py-20 bg-background" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing that scales with your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative bg-card border-border hover:border-primary/20 transition-colors ${
                  plan.popular ? 'border-primary scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg mb-4">
                      <plan.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <Check className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full"
                    variant={plan.variant}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              All plans include professional tax calculations and support. 
              No hidden fees, cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 