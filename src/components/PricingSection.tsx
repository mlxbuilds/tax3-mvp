
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';

const pricingPlans = [
  {
    name: "Free Tier",
    price: "Free",
    description: "Perfect for trying out Tax3",
    features: [
      "1 wallet only",
      "Up to 100 transactions",
      "Basic PDF report",
      "Shows proof of concept"
    ],
    icon: Star,
    popular: false,
    cta: "Get Started Free"
  },
  {
    name: "Basic Pass",
    price: "1 SOL",
    description: "For individual crypto users",
    features: [
      "Up to 5 wallets",
      "Unlimited transactions per wallet",
      "Full tax year report",
      "Email delivery",
      "Basic support"
    ],
    icon: Zap,
    popular: true,
    cta: "Choose Basic"
  },
  {
    name: "Pro Pass",
    price: "2 SOL",
    description: "For active traders and DeFi users",
    features: [
      "Up to 25 wallets",
      "Unlimited transactions",
      "Combined report across all wallets",
      "Priority email delivery",
      "Priority support",
      "Transaction editing/notes"
    ],
    icon: Crown,
    popular: false,
    cta: "Choose Pro"
  },
  {
    name: "Unlimited Pass",
    price: "4 SOL",
    description: "For businesses and power users",
    features: [
      "Unlimited wallets",
      "All Pro features",
      "API access for bulk import",
      "Custom report formats",
      "Phone/email support"
    ],
    icon: Crown,
    popular: false,
    cta: "Choose Unlimited"
  }
];

export const PricingSection: React.FC = () => {
  return (
    <div className="border-b border-border bg-black" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your crypto tax reporting needs. All plans include our core tax calculation engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pricingPlans.map((plan, index) => (
            <Card key={plan.name} className={`relative bg-card border-border ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  <plan.icon className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-sans font-semibold text-white">{plan.name}</h3>
                </div>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-white mb-2">{plan.price}</div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/80'} text-white`}
                >
                  {plan.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            All prices are one-time payments. No recurring subscriptions. 
            <br className="hidden sm:inline" />
            Need something custom? <a href="#contact" className="text-primary hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
};
