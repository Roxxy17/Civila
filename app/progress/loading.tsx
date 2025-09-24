import { Skeleton } from "@/components/ui/skeleton"

export default function ProgressLoading() {
  return (
    <div className="min-h-screen">
      <nav className="relative z-20 p-6 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-40" />
          </div>
        </div>
      </nav>

      <div className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Skeleton className="h-12 w-80 mb-4" />
            <Skeleton className="h-6 w-96" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-6 rounded-xl border border-border bg-card/50">
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border border-border bg-card/50">
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card/50">
              <Skeleton className="h-8 w-48 mb-6" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
