import { ReactNode } from 'react';
import { SkeletonGrid } from './Skeleton';

interface DataStateProps<T> {
  loading: boolean;
  error: string | null;
  data: T[];
  emptyText?: string;
  skeletonCount?: number;
  skeletonType?: 'card' | 'coach' | 'session' | 'slot';
  children: (data: T[]) => ReactNode;
}

export default function DataState<T>({
  loading,
  error,
  data,
  emptyText = 'No data found.',
  skeletonCount = 6,
  skeletonType = 'card',
  children,
}: DataStateProps<T>) {
  if (loading) {
    return <SkeletonGrid count={skeletonCount} type={skeletonType} />;
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">{emptyText}</p>
      </div>
    );
  }

  return <>{children(data)}</>;
}
