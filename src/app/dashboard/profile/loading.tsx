import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-5 w-80" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Picture skeleton */}
        <div className="rounded-xl border border-border p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="text-center">
            <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
            <Skeleton className="h-6 w-24 mx-auto" />
            <Skeleton className="h-4 w-36 mx-auto mt-1" />
          </div>
        </div>

        {/* Personal Information skeleton */}
        <div className="rounded-xl border border-border p-6 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-8 w-16" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-5 w-5 rounded" />
                <div>
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Health Information skeleton */}
        <div className="rounded-xl border border-border p-6">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-8 w-16" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-7 w-24" />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Skeleton className="h-4 w-12 mb-1" />
            <Skeleton className="h-7 w-32" />
          </div>
        </div>

        {/* Fitness Goals skeleton */}
        <div className="rounded-xl border border-border p-6">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-16" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-7 w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dietary Preferences skeleton */}
      <div className="rounded-xl border border-border p-6">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-5 w-20 mb-2" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-7 w-20 rounded-full" />
                <Skeleton className="h-7 w-24 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Actions skeleton */}
      <div className="rounded-xl border border-border p-6">
        <Skeleton className="h-6 w-36 mb-4" />
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-10 w-36 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
