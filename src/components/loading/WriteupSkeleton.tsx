import { Skeleton } from '../ui/Skeleton';

export interface WriteupSkeletonProps {
  paragraphs?: number;
  className?: string;
}

/** Prose-shaped skeleton for lazy MDX writeups and blog bodies. */
export const WriteupSkeleton = ({ paragraphs = 5, className = '' }: WriteupSkeletonProps) => (
  <div className={`not-prose space-y-5 ${className}`.trim()} aria-hidden="true">
    <Skeleton variant="title" className="w-4/5 max-w-lg" />
    <div className="space-y-2.5">
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-11/12" />
    </div>
    <Skeleton variant="title" className="w-2/5 max-w-xs h-6" />
    {Array.from({ length: paragraphs - 1 }, (_, i) => (
      <div key={i} className="space-y-2.5">
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className={i % 2 === 0 ? 'w-10/12' : 'w-9/12'} />
      </div>
    ))}
    <Skeleton variant="block" className="w-full h-24 opacity-80" />
  </div>
);

export default WriteupSkeleton;
