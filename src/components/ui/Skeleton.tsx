import type { HTMLAttributes } from 'react';

export type SkeletonVariant = 'text' | 'title' | 'circle' | 'block' | 'button';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

const variantClass: Record<SkeletonVariant, string> = {
  text: 'h-3.5 rounded-md',
  title: 'h-8 rounded-lg',
  circle: 'rounded-full aspect-square',
  block: 'rounded-xl',
  button: 'h-9 rounded-lg',
};

/**
 * Shimmer placeholder — decorative only; pair with visible loading text nearby.
 */
export const Skeleton = ({
  variant = 'block',
  className = '',
  ...props
}: SkeletonProps) => (
  <div
    aria-hidden="true"
    className={`skeleton-shimmer ${variantClass[variant]} ${className}`.trim()}
    {...props}
  />
);

export default Skeleton;
