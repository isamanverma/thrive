import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-5 w-80" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Settings skeleton */}
        <div className="rounded-xl border border-border p-6">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-56 mb-4" />
          <div className="space-y-4">
            <div>
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>

        {/* Notifications skeleton */}
        <div className="rounded-xl border border-border p-6">
          <Skeleton className="h-6 w-36 mb-2" />
          <Skeleton className="h-4 w-56 mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-6 w-10 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Privacy skeleton */}
        <div className="rounded-xl border border-border p-6">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-56 mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-6 w-10 rounded-full" />
              </div>
            ))}
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>

        {/* Appearance skeleton */}
        <div className="rounded-xl border border-border p-6">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-56 mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
