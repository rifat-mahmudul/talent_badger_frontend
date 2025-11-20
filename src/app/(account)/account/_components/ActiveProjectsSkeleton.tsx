import { Skeleton } from "@/components/ui/skeleton";

export default function ActiveProjectsSkeleton() {
  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Project Card 1 */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-56" />
            <Skeleton className="h-4 w-72" />

            <div className="flex items-center gap-3 pt-2">
              <Skeleton className="h-4 w-20 rounded-full" /> {/* Status */}
              <Skeleton className="h-4 w-28" />              {/* Time */}
            </div>
          </div>

          {/* Avatar group */}
          <div className="flex -space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>

      {/* Project Card 2 */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-56" />
            <Skeleton className="h-4 w-72" />

            <div className="flex items-center gap-3 pt-2">
              <Skeleton className="h-4 w-20 rounded-full" /> {/* Status */}
              <Skeleton className="h-4 w-28" />              {/* Time */}
            </div>
          </div>

          {/* Avatar group */}
          <div className="flex -space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
