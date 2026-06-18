import React from 'react';
import { formatISODate } from '../../utils/formatDate';

export interface ContentDatesLineProps {
  created: string;
  updated: string;
  className?: string;
}

/**
 * Compact created / last-updated byline for tools and writeups.
 * Expects ISO dates (YYYY-MM-DD).
 */
export const ContentDatesLine: React.FC<ContentDatesLineProps> = ({
  created,
  updated,
  className = '',
}) => (
  <p className={`text-sm text-base-content/60 m-0 ${className}`.trim()}>
    Created{' '}
    <time dateTime={created} className="text-base-content/75">
      {formatISODate(created)}
    </time>
    {created !== updated && (
      <>
        {' · '}
        Updated{' '}
        <time dateTime={updated} className="text-base-content/75">
          {formatISODate(updated)}
        </time>
      </>
    )}
  </p>
);

export default ContentDatesLine;
