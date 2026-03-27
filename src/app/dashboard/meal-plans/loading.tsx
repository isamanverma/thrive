import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-none px-4 pt-2 h-full min-h-0 flex flex-col overflow-hidden">
      {/* MealPlanHeader skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-7 w-40" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-20 rounded-lg" />
          <Skeleton className="h-9 w-20 rounded-lg" />
        </div>
      </div>

      {/* Stats row */}
      <div className="mb-6 flex items-baseline gap-8 px-1">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>

      {/* Weekly grid skeleton */}
      <div className="grid grid-cols-[40px_repeat(7,1fr)] gap-2">
        <Skeleton className="h-8 w-10 rounded-lg" />
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={`head-${i}`} className="h-8 w-full rounded-lg" />
        ))}
        {Array.from({ length: 4 }).map((_, row) => (
          <React.Fragment key={`row-${row}`}>
            <Skeleton className="h-20 w-10 rounded-xl" />
            {Array.from({ length: 7 }).map((_, col) => (
              <Skeleton
                key={`cell-${row}-${col}`}
                className="h-20 w-full rounded-xl"
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
