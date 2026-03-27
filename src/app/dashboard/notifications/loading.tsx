import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>

      {/* Notification controls */}
      <div className="flex space-x-4">
        <Skeleton className="h-10 w-36 rounded-lg" />
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>

      {/* Notifications list */}
      <div className="space-y-4">
        {/* Today */}
        <div>
          <Skeleton className="h-4 w-16 mb-3" />
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border p-4">
                <div className="flex items-start space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mt-1" />
                    <Skeleton className="h-3 w-24 mt-2" />
                  </div>
                  <Skeleton className="h-3 w-3 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yesterday */}
        <div>
          <Skeleton className="h-4 w-20 mb-3" />
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border p-4">
                <div className="flex items-start space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3 mt-1" />
                    <Skeleton className="h-3 w-24 mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* This Week */}
        <div>
          <Skeleton className="h-4 w-24 mb-3" />
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border p-4">
                <div className="flex items-start space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mt-1" />
                    <Skeleton className="h-3 w-24 mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
