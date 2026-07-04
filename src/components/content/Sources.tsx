import React from 'react';

export interface SourceItem {
  /** Full citation text, e.g. "OECD (2019), PISA 2018 Results: Philippines". */
  label: string;
  /** Live URL to the primary source. */
  href: string;
}

export interface SourcesProps {
  items: SourceItem[];
  /** Heading text. Defaults to "Sources". */
  title?: string;
}

/**
 * The end-of-article references list. Every writeup should close with one.
 * Import directly in MDX: `import { Sources } from '../../components/content'`.
 */
export const Sources: React.FC<SourcesProps> = ({ items, title = 'Sources' }) => {
  return (
    <section className="not-prose mt-12 border-t border-base-300 pt-6">
      <h2 className="mb-4 font-display text-lg font-bold text-base-content">{title}</h2>
      <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm text-base-content/80 marker:text-base-content/40">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline text-[#1d4ed8] underline-offset-2"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Sources;
