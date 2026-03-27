import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-80" />
      </div>

      {/* Filter tabs */}
      <div className="flex space-x-4 border-b">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 mb-0" />
        ))}
      </div>

      {/* Exercise plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Skeleton className="h-6 w-36 mb-2" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-6 w-6 rounded" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Skeleton className="h-12 w-56 rounded-lg" />
      </div>
    </div>
  );
}
