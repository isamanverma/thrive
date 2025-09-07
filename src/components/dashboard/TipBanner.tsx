"use client";

import { Lightbulb, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TipBannerProps {
  tip: string;
  onDismiss?: () => void;
}

export function TipBanner({ tip, onDismiss }: TipBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div className="bg-green-100 border border-green-200 rounded-2xl p-4 flex items-center justify-between mb-8 shadow-sm">
      <div className="flex items-center gap-4">
        <Lightbulb className="text-green-600 h-5 w-5" />
        <p className="text-green-800 text-sm">
          <strong>Tip:</strong> {tip}
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-green-600 hover:text-green-800 h-auto p-1"
        onClick={handleDismiss}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}
