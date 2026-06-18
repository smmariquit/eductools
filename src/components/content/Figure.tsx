import React from 'react';

export interface FigureProps {
  src: string;
  alt: string;
  /** Visible caption under the image. */
  caption?: string;
  /** Attribution / credit line, shown muted under the caption. */
  credit?: string;
  /** Optional max width, e.g. "32rem". Defaults to full width. */
  maxWidth?: string;
}

/**
 * An image with caption and credit, styled for the crayon design system.
 * Import directly in MDX: `import { Figure } from '../../components/content'`.
 */
export const Figure: React.FC<FigureProps> = ({ src, alt, caption, credit, maxWidth }) => {
  return (
    <figure className="not-prose my-8" style={maxWidth ? { maxWidth } : undefined}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-2xl border border-base-300 shadow-sm"
      />
      {(caption || credit) && (
        <figcaption className="mt-3 text-sm text-base-content/70">
          {caption}
          {credit && <span className="block text-xs text-base-content/50">{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
};

export default Figure;
