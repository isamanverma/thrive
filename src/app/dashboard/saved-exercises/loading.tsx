import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-9 w-52" />
        <Skeleton className="h-5 w-80" />
      </div>

      {/* Filter tabs */}
      <div className="flex space-x-4 border-b overflow-x-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 mb-0" />
        ))}
      </div>

      {/* Exercise card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-24" />
              <div className="flex gap-1">
                <Skeleton className="h-6 w-14 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-36" />
              </div>
              <div className="flex space-x-2 pt-2">
                <Skeleton className="h-10 flex-1 rounded-md" />
                <Skeleton className="h-10 w-28 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  );
}
