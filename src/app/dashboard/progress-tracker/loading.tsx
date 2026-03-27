import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-9 w-44" />
        <Skeleton className="h-5 w-64" />
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-4 rounded" />
            </div>
            <Skeleton className="h-8 w-20 mb-1" />
            <Skeleton className="h-3 w-28" />
          </div>
        ))}
      </div>

      {/* Progress charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border p-6">
          <Skeleton className="h-6 w-36 mb-2" />
          <Skeleton className="h-4 w-48 mb-4" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
        <div className="rounded-xl border border-border p-6">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48 mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals and achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border p-6">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-40 mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <Skeleton className="h-5 w-36 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-12 ml-auto mb-1" />
                  <Skeleton className="h-3 w-20 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border p-6">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-36 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 p-3 rounded-lg bg-muted"
              >
                <Skeleton className="h-8 w-8 rounded" />
                <div>
                  <Skeleton className="h-5 w-28 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
