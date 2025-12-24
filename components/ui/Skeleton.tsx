interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-dark">
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

export function SkeletonCoachCard() {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-dark">
      <Skeleton className="h-6 w-2/3 mb-3" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-4 w-1/3 mb-4" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

export function SkeletonSessionCard() {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-dark">
      <Skeleton className="h-4 w-20 mb-2" />
      <Skeleton className="h-5 w-3/4 mb-1" />
      <Skeleton className="h-4 w-16 mb-4" />
      <Skeleton className="h-4 w-16 mb-2" />
      <Skeleton className="h-5 w-1/2 mb-1" />
      <Skeleton className="h-4 w-1/3 mb-4" />
      <Skeleton className="h-4 w-20 mb-2" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20 rounded" />
        <Skeleton className="h-6 w-24 rounded" />
      </div>
    </div>
  );
}

export function SkeletonSlotCard() {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-dark">
      <Skeleton className="h-5 w-16 rounded mb-3" />
      <Skeleton className="h-5 w-2/3 mb-2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div>
      <Skeleton className="h-4 w-28 mb-4" />
      <Skeleton className="h-10 w-2/3 mb-6" />
      <div className="space-y-4">
        <div>
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div>
          <Skeleton className="h-3 w-12 mb-2" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div>
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-5 w-36" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6, type = 'card' }: { count?: number; type?: 'card' | 'coach' | 'session' | 'slot' }) {
  const Card = type === 'coach' ? SkeletonCoachCard : type === 'session' ? SkeletonSessionCard : type === 'slot' ? SkeletonSlotCard : SkeletonCard;
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} />
      ))}
    </div>
  );
}

