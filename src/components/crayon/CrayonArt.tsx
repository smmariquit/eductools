import React from 'react';
import { getCrayonAsset, type CrayonArtName } from './crayonRegistry';

export type CrayonColor =
  | 'ink'
  | 'sky'
  | 'berry'
  | 'sunshine'
  | 'leaf'
  | 'grape'
  | 'paper';

export type CrayonAnimate = 'none' | 'draw' | 'wiggle';

export interface CrayonArtProps {
  /** File name (without extension) of an SVG in `src/assets/crayon/`. */
  name: CrayonArtName;
  /** Box size (square). Number => px. Defaults to `1.5em` so it scales with text. */
  size?: number | string;
  /** Width override (for wide art like dividers/underlines). Number => px. */
  width?: number | string;
  /** Height override. Number => px. */
  height?: number | string;
  /**
   * Sets `currentColor` for paths drawn with `stroke="currentColor"` /
   * `fill="currentColor"`. Multi-color drawings use their own fill tokens and
   * ignore this. Defaults to `ink`.
   */
  color?: CrayonColor;
  /** Entrance/idle motion. Honors `prefers-reduced-motion`. */
  animate?: CrayonAnimate;
  /**
   * Accessible label. If provided, the art is exposed as an image with this
   * label; if omitted, the art is `aria-hidden` (purely decorative).
   */
  title?: string;
  className?: string;
}

const sizeToCss = (size: number | string): string =>
  typeof size === 'number' ? `${size}px` : size;

/**
 * Renders a hand-authored crayon SVG inline so it inherits theme color tokens
 * and CSS-driven motion. Assets are first-party and inlined at build time, so
 * `dangerouslySetInnerHTML` is safe here.
 */
export const CrayonArt: React.FC<CrayonArtProps> = ({
  name,
  size = '1.5em',
  width,
  height,
  color = 'ink',
  animate = 'none',
  title,
  className = '',
}) => {
  const asset = getCrayonAsset(name);

  if (!asset) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        `[CrayonArt] Unknown art "${name}". Add src/assets/crayon/<category>/${name}.svg ` +
          `or check the name. See docs/design-system/crayon.md.`,
      );
    }
    return null;
  }

  const w = sizeToCss(width ?? size);
  const h = sizeToCss(height ?? size);
  const decorative = !title;

  return (
    <span
      className={`crayon-art ${className}`}
      data-animate={animate}
      style={{ width: w, height: h, color: `var(--crayon-${color})` }}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? true : undefined}
      dangerouslySetInnerHTML={{ __html: asset.svg }}
    />
  );
};

export default CrayonArt;
