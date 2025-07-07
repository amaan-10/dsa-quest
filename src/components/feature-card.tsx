import type React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="h-full transition-all duration-500 hover:shadow-xl hover:-translate-y-2 bg-white border-copper-200 hover:border-copper-300 group">
      <CardContent className="p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-copper-400/20 to-copper-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-copper-100 to-copper-200 p-4 rounded-2xl border border-copper-300 group-hover:border-copper-400 transition-all duration-300">
              {icon}
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-copper-600 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-sandstone-700 leading-relaxed text-lg">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
