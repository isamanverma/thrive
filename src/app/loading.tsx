import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Header skeleton */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-xl" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-20 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>
        </div>
      </header>

      <main>
        {/* Hero skeleton */}
        <section className="px-5 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <Skeleton className="h-[4.7rem] w-full max-w-[15ch] mt-6" />
              <Skeleton className="h-5 w-full max-w-[56ch] mt-6" />
              <Skeleton className="h-5 w-3/4 max-w-[56ch] mt-2" />
              <div className="mt-8 flex flex-wrap gap-3">
                <Skeleton className="h-11 w-36 rounded-full" />
                <Skeleton className="h-11 w-44 rounded-full" />
              </div>
            </div>

            <aside className="space-y-6 rounded-[1.8rem] border border-border bg-card p-6 sm:p-7">
              <div>
                <Skeleton className="h-3 w-24" />
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-14 rounded-xl" />
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full mt-2" />
                <div className="mt-3 space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 rounded-lg" />
                  ))}
                </div>
              </div>

              <div className="flex items-end justify-between border-t border-border pt-6">
                <div>
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-3 w-48 mt-1" />
                </div>
                <Skeleton className="h-16 w-16 rounded-full" />
              </div>
            </aside>
          </div>
        </section>

        {/* Features skeleton */}
        <section className="px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-10 w-64 mt-3" />
              </div>
              <Skeleton className="h-4 w-72" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          </div>
        </section>

        {/* Start now skeleton */}
        <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
              <div>
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-10 w-56 mt-3" />
                <Skeleton className="h-4 w-full max-w-[58ch] mt-4" />
                <Skeleton className="h-11 w-36 rounded-full mt-7" />
              </div>
              <div className="flex items-center justify-end">
                <div className="text-right">
                  <Skeleton className="h-14 w-28 ml-auto" />
                  <Skeleton className="h-4 w-44 mt-1 ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer skeleton */}
      <footer className="border-t border-border px-5 py-7 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-56" />
        </div>
      </footer>
    </div>
  );
}
