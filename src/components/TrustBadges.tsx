import React from "react";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Zap, CheckCircle } from "lucide-react";

export const TrustBadges: React.FC = () => {
  return (
    <div className="py-12 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Trusted by Solana DeFi users worldwide
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg mx-auto mb-2">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">2,500+</div>
              <div className="text-xs text-muted-foreground">
                Reports Generated
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mx-auto mb-2">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-foreground">100%</div>
              <div className="text-xs text-muted-foreground">
                Secure & Private
              </div>
            </div>

            <div className="text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg mx-auto mb-2">
              <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">3 min</div>
              <div className="text-xs text-muted-foreground">
                Average Process
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-lg mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-foreground">IRS</div>
              <div className="text-xs text-muted-foreground">Compliant</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-muted/50 text-muted-foreground border-border">
              🔒 Your keys never leave your browser
            </Badge>
            <Badge className="bg-muted/50 text-muted-foreground border-border">
              📊 Used by 500+ DeFi traders
            </Badge>
            <Badge className="bg-muted/50 text-muted-foreground border-border">
              ⚡ Sub-3min report generation
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
