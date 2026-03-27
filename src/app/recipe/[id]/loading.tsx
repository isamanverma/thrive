import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Back Button Skeleton */}
      <div className="sticky top-0 z-20 w-full bg-card border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <Skeleton className="h-6 w-16" />
        </div>
      </div>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3" />

              <Skeleton className="aspect-square w-full rounded-2xl" />

              <div className="rounded-xl border border-border p-6">
                <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i}>
                      <Skeleton className="mx-auto h-4 w-20 mb-2" />
                      <Skeleton className="mx-auto h-6 w-16" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border p-6">
                <Skeleton className="h-8 w-32 mb-6" />
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-12">
              <Skeleton className="h-10 w-40 mb-6" />
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center"
                  >
                    <Skeleton className="mb-2 h-24 w-24 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <Skeleton className="h-10 w-40 mb-6" />
              <div className="space-y-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-5/6" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-10 w-40 mb-6" />
              <Skeleton className="aspect-video w-full rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
