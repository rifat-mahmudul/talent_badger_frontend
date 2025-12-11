
export default function DashboardCardsSkeleton() {
  return (
    <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-lg border border-gray-200 p-5 animate-pulse">

      {/* TOP */}
      <div className="flex items-start gap-5">

        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-gray-200" />

        <div className="flex-1 space-y-3">
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-3 w-32 bg-gray-200 rounded" />
          <div className="h-3 w-28 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      </div>

      {/* BIO */}
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-4/5 bg-gray-200 rounded" />
      </div>

      {/* BADGES */}
      <div className="flex gap-2 mt-4 flex-wrap">
        <div className="h-6 w-20 bg-gray-200 rounded-lg" />
        <div className="h-6 w-24 bg-gray-200 rounded-lg" />
        <div className="h-6 w-16 bg-gray-200 rounded-lg" />
      </div>

      {/* SKILLS */}
      <div className="flex gap-2 mt-5">
        <div className="h-6 w-14 bg-gray-200 rounded-full" />
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="h-6 w-12 bg-gray-200 rounded-full" />
      </div>

      {/* BUTTONS */}
      <div className="mt-6 flex gap-3">
        <div className="w-1/2 h-10 bg-gray-200 rounded-lg" />
        <div className="w-1/2 h-10 bg-gray-200 rounded-lg" />
      </div>

    </div>
  );
}