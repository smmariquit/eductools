import React from 'react';

export type FigureVariant = 'article' | 'inline' | 'avatar';

export interface FigureProps {
  src: string;
  alt: string;
  /** Layout preset — see `.cursor/rules/images.mdc`. */
  variant?: FigureVariant;
  /** Visible caption under the image (recommended for `article`). */
  caption?: string;
  /** Attribution line (required for third-party photos). */
  credit?: string;
  /** Optional max width, e.g. "32rem". Used by `article`. */
  maxWidth?: string;
  /** Pixel width/height for `avatar` when not filling a parent box. */
  size?: number;
  loading?: 'lazy' | 'eager';
  /** Set high on the primary above-fold image for LCP. */
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
}

const variantImgClass: Record<FigureVariant, string> = {
  article: 'w-full rounded-2xl border border-base-300 shadow-sm',
  inline: 'w-full max-h-52 object-cover rounded-xl border border-base-300',
  avatar: 'w-full h-full object-cover',
};

const variantFigureClass: Record<FigureVariant, string> = {
  article: 'not-prose my-8',
  inline: 'flex-1 min-w-0 m-0',
  avatar: 'm-0 shrink-0',
};

/**
 * Standard raster image for articles, tools, and avatars.
 * Import in MDX: `import { Figure } from '../../components/content'`.
 *
 * Do not use raw `<img>` for app content — use this component (or YouTubeEmbed
 * for video thumbnails).
 */
export const Figure: React.FC<FigureProps> = ({
  src,
  alt,
  variant = 'article',
  caption,
  credit,
  maxWidth,
  size,
  loading,
  fetchPriority,
  className = '',
}) => {
  const lazy = loading ?? (variant === 'avatar' ? 'eager' : 'lazy');
  const priority = fetchPriority ?? (lazy === 'eager' ? 'high' : 'auto');
  const showCaption = Boolean(caption || credit);
  const imgStyle = size ? { width: size, height: size } : undefined;

  const img = (
    <img
      src={src}
      alt={alt}
      loading={lazy}
      fetchPriority={priority}
      decoding="async"
      style={imgStyle}
      className={`${variantImgClass[variant]} ${className}`.trim()}
    />
  );

  if (variant === 'avatar' && !showCaption) {
    return img;
  }

  return (
    <figure
      className={variantFigureClass[variant]}
      style={maxWidth && variant === 'article' ? { maxWidth } : undefined}
    >
      {img}
      {showCaption && (
        <figcaption
          className={
            variant === 'inline'
              ? 'text-tool-caption text-base-content/55 mt-2 leading-snug'
              : 'mt-3 text-sm text-base-content/70'
          }
        >
          {caption}
          {credit && variant === 'inline' && credit}
          {credit && variant !== 'inline' && (
            <span className="block text-xs text-base-content/50">{credit}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
};

export default Figure;
