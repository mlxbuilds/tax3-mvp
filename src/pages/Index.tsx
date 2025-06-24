import React from "react";
import { Hero } from "@/components/Hero";
import { TrustBadges } from "@/components/TrustBadges";
import { DemoSection } from "@/components/DemoSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { PricingSection } from "@/components/PricingSection";
import { UrgencyBanner } from "@/components/UrgencyBanner";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Floating Header */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-fit">
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-full px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg">
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Calculator className="w-3 h-3 text-primary" />
              </div>
              <span className="font-sans font-semibold text-sm text-foreground">
                Tax3
              </span>
            </div>

            {/* Navigation - Hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-4">
              <a
                href="#demo"
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Demo
              </a>
              <a
                href="#pricing"
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </a>
              <Link
                to="/docs"
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Docs
              </Link>
            </nav>

            {/* CTA */}
            <Link to="/import">
              <Button
                size="sm"
                className="rounded-full h-7 sm:h-8 px-3 sm:px-4 text-xs font-medium"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Hero />
        <TrustBadges />
        <DemoSection />
        <FeatureGrid />
        <PricingSection />
        <UrgencyBanner />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
