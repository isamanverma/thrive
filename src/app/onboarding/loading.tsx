import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="mx-auto min-h-screen max-w-7xl p-5 flex flex-col bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center h-16">
        <div className="flex flex-row items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-9 w-24 rounded-full" />
      </nav>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs mb-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>

      {/* Form skeleton */}
      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xl">
          <div className="w-full bg-card rounded-lg shadow-lg p-8">
            <Skeleton className="h-8 w-3/4 mb-6" />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-lg" />
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <Skeleton className="h-10 w-20 rounded-lg" />
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
