import React from 'react';

export interface VersionBadgeProps {
  version: string;
  size?: 'sm' | 'md';
  className?: string;
}

/** Small semver pill — e.g. v1.1.0 */
export const VersionBadge: React.FC<VersionBadgeProps> = ({
  version,
  size = 'md',
  className = '',
}) => (
  <span
    className={`badge badge-outline font-mono font-bold border-base-content/25 text-base-content/80 ${
      size === 'sm' ? 'badge-sm text-[0.65rem]' : 'badge-md text-xs'
    } ${className}`.trim()}
    title={`Version ${version}`}
  >
    v{version}
  </span>
);
