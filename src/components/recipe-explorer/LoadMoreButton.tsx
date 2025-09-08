"use client";

import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BlurFade } from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  loading?: boolean;
  hasMore?: boolean;
  className?: string;
}

export function LoadMoreButton({
  onLoadMore,
  loading = false,
  hasMore = true,
  className,
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <BlurFade delay={0.1} inView>
        <div className="flex justify-center">
          <p className="text-muted-foreground text-sm">
            You&apos;ve reached the end of the recipes! 🍽️
          </p>
        </div>
      </BlurFade>
    );
  }

  return (
    <BlurFade delay={0.1} inView>
      <div className="flex justify-center">
        <ShimmerButton
          onClick={onLoadMore}
          disabled={loading}
          className={cn(
            "rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white",
            "hover:bg-green-700 transition-all duration-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            loading && "animate-pulse",
            className
          )}
        >
          {loading ? "Loading..." : "Load More"}
        </ShimmerButton>
      </div>
    </BlurFade>
  );
}
