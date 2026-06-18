import React from 'react';
import { Link } from 'react-router-dom';
import { formatISODate } from '../../utils/formatDate';
import type { ReleaseEntry, ToolVersionRecord } from '../../data/versioning';
import { VersionBadge } from './VersionBadge';

export interface ReleaseChangelogProps {
  releases: ReleaseEntry[];
  className?: string;
}

/**
 * Semver release history — used on the site changelog page and per-tool panels.
 */
export const ReleaseChangelog: React.FC<ReleaseChangelogProps> = ({
  releases,
  className = '',
}) => {
  const sorted = [...releases].sort((a, b) =>
    b.version.localeCompare(a.version, undefined, { numeric: true }),
  );

  return (
    <div className={`space-y-6 ${className}`.trim()}>
      {sorted.map((release) => (
        <section
          key={release.version}
          id={`v${release.version.replace(/\./g, '-')}`}
          className="scroll-mt-24 border border-base-300 rounded-xl bg-base-100 p-5 md:p-6"
        >
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <VersionBadge version={release.version} size="sm" />
            <time dateTime={release.date} className="text-sm text-base-content/60 font-mono">
              {formatISODate(release.date)}
            </time>
          </div>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-base-content/80 m-0">
            {release.changes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export interface ToolVersionPanelProps {
  toolTitle: string;
  record: ToolVersionRecord;
  className?: string;
}

/** Collapsible semver changelog on a visualizer page. */
export const ToolVersionPanel: React.FC<ToolVersionPanelProps> = ({
  toolTitle,
  record,
  className = '',
}) => (
  <details
    className={`not-prose group mt-3 rounded-xl border border-base-300 bg-base-200/50 ${className}`.trim()}
  >
    <summary className="cursor-pointer list-none px-4 py-3 flex flex-wrap items-center gap-2 text-sm text-base-content/70 hover:text-base-content">
      <VersionBadge version={record.version} size="sm" />
      <span className="font-display font-semibold text-base-content">{toolTitle}</span>
      <span className="text-base-content/60">changelog</span>
      <span className="ml-auto text-xs text-base-content/50 group-open:hidden">Expand</span>
    </summary>
    <div className="px-4 pb-4 pt-1 border-t border-base-300/80">
      <ReleaseChangelog releases={record.changelog} />
      <p className="text-xs text-base-content/50 mt-3 mb-0">
        <Link to="/changelog" className="link link-primary">
          Site-wide changelog
        </Link>
      </p>
    </div>
  </details>
);
