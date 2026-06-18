import React from 'react';

export type AsideVariant = 'book' | 'tool' | 'watch' | 'note';

export interface AsideProps {
  variant?: AsideVariant;
  /** The thing being recommended (book title, tool name). Linked if `href` is set. */
  title?: string;
  /** External link to the book / tool / resource. */
  href?: string;
  /** Author of a book, or the dev/org behind a tool — shown as credit. */
  credit?: string;
  /** Your own words: why you recommend it. First-person is good here. */
  children: React.ReactNode;
}

const VARIANTS: Record<AsideVariant, { label: string; color: string }> = {
  book: { label: 'On my shelf', color: 'var(--crayon-grape)' },
  tool: { label: 'Credit where it’s due', color: 'var(--crayon-leaf)' },
  watch: { label: 'Worth watching', color: 'var(--crayon-sky)' },
  note: { label: 'From experience', color: 'var(--crayon-sunshine)' },
};

/**
 * A short first-person callout that shows the author's hand: a book they
 * personally recommend, a tool they tip their hat to, a video worth watching,
 * or a note from experience. Builds credibility and trust. Keep it genuine,
 * and verify any link is live.
 *
 * Import: `import { Aside } from '../../components/content'`.
 */
export const Aside: React.FC<AsideProps> = ({ variant = 'note', title, href, credit, children }) => {
  const { label, color } = VARIANTS[variant];

  return (
    <aside
      className="not-prose my-8 rounded-2xl border border-base-300 bg-base-200 p-5 shadow-sm"
      style={{ borderLeft: `6px solid ${color}` }}
    >
      <p className="m-0 mb-2 text-xs font-bold uppercase tracking-wider" style={{ color }}>
        {label}
      </p>
      {title && (
        <p className="m-0 mb-1 font-display text-base font-bold text-base-content">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="link link-hover text-base-content">
              {title}
            </a>
          ) : (
            title
          )}
          {credit && <span className="font-normal text-base-content/50"> — {credit}</span>}
        </p>
      )}
      <div className="text-sm leading-relaxed text-base-content/80">{children}</div>
    </aside>
  );
};

export default Aside;
