"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  count?: number;
  className?: string;
}

export function SkeletonLoader({ count = 4, className }: SkeletonLoaderProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <BlurFade key={index} delay={0.5 + index * 0.1} inView>
          <div
            className={cn(
              "flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-background p-4",
              "animate-pulse",
              className
            )}
          >
            {/* Image Skeleton */}
            <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>

            {/* Content Skeleton */}
            <div className="flex flex-col gap-2">
              <div className="h-5 w-3/4 bg-muted rounded animate-shimmer" />
              <div className="h-4 w-1/2 bg-muted rounded animate-shimmer" />

              {/* Stats Skeleton */}
              <div className="flex gap-4 mt-2">
                <div className="h-3 w-16 bg-muted rounded animate-shimmer" />
                <div className="h-3 w-20 bg-muted rounded animate-shimmer" />
              </div>

              {/* Tags Skeleton */}
              <div className="flex gap-2 mt-2">
                <div className="h-6 w-16 bg-muted rounded-full animate-shimmer" />
                <div className="h-6 w-20 bg-muted rounded-full animate-shimmer" />
              </div>

              {/* Buttons Skeleton */}
              <div className="flex justify-end gap-2 mt-4">
                <div className="h-8 w-8 bg-muted rounded-full animate-shimmer" />
                <div className="h-8 w-8 bg-muted rounded-full animate-shimmer" />
              </div>
            </div>
          </div>
        </BlurFade>
      ))}
    </>
  );
}
