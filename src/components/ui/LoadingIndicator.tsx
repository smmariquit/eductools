export interface LoadingIndicatorProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClass = {
  sm: 'loading-orbit--sm',
  md: 'loading-orbit--md',
  lg: 'loading-orbit--lg',
} as const;

/**
 * Branded crayon-orbit loader with optional caption.
 */
export const LoadingIndicator = ({
  label = 'Loading…',
  size = 'md',
  className = '',
}: LoadingIndicatorProps) => (
  <div
    className={`flex flex-col items-center justify-center gap-4 ${className}`.trim()}
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <div className={`loading-orbit ${sizeClass[size]}`} aria-hidden="true">
      <span className="loading-orbit__dot loading-orbit__dot--sky" />
      <span className="loading-orbit__dot loading-orbit__dot--berry" />
      <span className="loading-orbit__dot loading-orbit__dot--sunshine" />
      <span className="loading-orbit__ring" />
    </div>
    {label && (
      <p className="m-0 text-sm font-semibold text-base-content/60 animate-pulse-soft">{label}</p>
    )}
  </div>
);

export default LoadingIndicator;
