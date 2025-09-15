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
    <div className="bg-purple-100 border border-purple-200 rounded-2xl p-4 flex items-center justify-between mb-8 shadow-sm">
      <div className="flex items-center gap-4">
        <Lightbulb className="text-purple-600 h-5 w-5" />
        <p className="text-purple-800 text-sm">
          <strong>Tip:</strong> {tip}
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-purple-600 hover:text-purple-800 h-auto p-1"
        onClick={handleDismiss}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}
