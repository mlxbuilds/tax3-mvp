import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export const UrgencyBanner: React.FC = () => {
  // Calculate days until April 15th tax deadline
  const getTaxDeadline = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let taxDeadline = new Date(currentYear, 3, 15); // April 15th (month is 0-indexed)

    // If we're past this year's deadline, use next year's
    if (now > taxDeadline) {
      taxDeadline = new Date(currentYear + 1, 3, 15);
    }

    const timeDiff = taxDeadline.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return { days: daysDiff, year: taxDeadline.getFullYear() };
  };

  const { days, year } = getTaxDeadline();

  return (
    <div className="py-16 bg-gradient-to-r from-orange-500/10 to-red-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto bg-card/50 border-orange-500/20 backdrop-blur-sm">
          <div className="p-6 sm:p-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="w-6 h-6 text-orange-400" />
              <AlertTriangle className="w-6 h-6 text-orange-400" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Tax Season Deadline Approaching
            </h3>

            <div className="mb-6">
              <div className="text-4xl sm:text-5xl font-bold text-orange-400 mb-2">
                {days} Days
              </div>
              <p className="text-lg text-muted-foreground">
                Until April 15th, {year} tax filing deadline
              </p>
            </div>

            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Don't wait until the last minute. Generate your Solana tax report
              now and avoid the stress. Most reports are completed in under 5
              minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/import">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 h-12"
                >
                  Generate Report Now
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                ⚡ Average completion time: 3 minutes
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
