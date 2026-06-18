import React from 'react';
import { formatISODate } from '../../utils/formatDate';

export interface ChangelogEntry {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Short description of what changed. */
  note: string;
}

export interface ChangelogProps {
  /** ISO date the writeup was first published, YYYY-MM-DD. */
  created: string;
  /** ISO date of the most recent edit, YYYY-MM-DD. Auto-stamped by the MDX edit hook. */
  updated: string;
  /** Newest-first list of edits. */
  entries: ChangelogEntry[];
}

function formatISO(iso: string): string {
  return formatISODate(iso);
}

/**
 * Edit metadata for an article: created date, visible "Last updated" date, plus a
 * collapsible changelog. Required as the LAST element of every content MDX
 * file (see .cursor/rules/mdx-changelog.mdc). The `updated` date is also
 * auto-stamped by the afterFileEdit hook as a backstop.
 *
 * Import: `import { Changelog } from '../../components/content'`.
 */
export const Changelog: React.FC<ChangelogProps> = ({ created, updated, entries }) => {
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  const latest = sorted[0]?.date ?? updated;

  return (
    <section className="not-prose mt-10 border-t border-base-300 pt-5 text-sm">
      <p className="m-0 text-base-content/60">
        Created{' '}
        <time dateTime={created} className="font-semibold text-base-content/80">
          {formatISO(created)}
        </time>
        {created !== latest && (
          <>
            {' · '}
            Last updated:{' '}
            <time dateTime={latest} className="font-semibold text-base-content/80">
              {formatISO(latest)}
            </time>
          </>
        )}
      </p>
      {sorted.length > 0 && (
        <details className="group mt-2">
          <summary className="cursor-pointer list-none text-base-content/60 hover:text-base-content">
            <span className="font-display font-semibold">Changelog</span>
            <span className="ml-1 text-xs">({sorted.length})</span>
          </summary>
          <ul className="mt-3 flex flex-col gap-2 border-l-2 border-base-300 pl-4">
            {sorted.map((e, i) => (
              <li key={`${e.date}-${i}`} className="text-base-content/70">
                <time dateTime={e.date} className="font-mono text-xs text-base-content/50">
                  {formatISO(e.date)}
                </time>
                <span className="ml-2">{e.note}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
};

export default Changelog;
