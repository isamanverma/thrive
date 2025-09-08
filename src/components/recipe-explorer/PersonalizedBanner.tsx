"use client";

import { RefreshCw } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { cn } from "@/lib/utils";

interface PersonalizedBannerProps {
  onRegenerate: () => void;
  loading?: boolean;
}

export function PersonalizedBanner({
  onRegenerate,
  loading = false,
}: PersonalizedBannerProps) {
  return (
    <BlurFade delay={0.4} inView>
      <div
        className={cn(
          "rounded-lg bg-gradient-to-r from-green-50 to-green-100 p-4 transition-all duration-300",
          "border border-green-200/50",
          "dark:from-green-950/30 dark:to-green-900/30 dark:border-green-800/30"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-foreground">
              <span className="font-semibold text-green-700 dark:text-green-400">
                Just for you!
              </span>{" "}
              We&apos;ve tailored these recipes based on your preferences.
            </p>
          </div>
          <div className="ml-4">
            <ShimmerButton
              className={cn(
                "flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-medium shadow-sm",
                "hover:bg-green-50 transition-all duration-200",
                "dark:bg-green-900/50 dark:hover:bg-green-900/70",
                loading && "opacity-75 cursor-not-allowed"
              )}
              onClick={onRegenerate}
              disabled={loading}
            >
              <RefreshCw
                className={cn(
                  "h-3 w-3 text-green-600 dark:text-green-400",
                  loading && "animate-spin"
                )}
              />
              <span className="text-green-700 dark:text-green-300">
                {loading ? "Regenerating..." : "Regenerate"}
              </span>
            </ShimmerButton>
          </div>
        </div>
      </div>
    </BlurFade>
  );
}
