/**
 * Raster image paths and helpers.
 *
 * All photos and PNG/JPG/WebP assets live under `public/images/<category>/`
 * and are referenced at runtime as `/images/<category>/<file>`.
 *
 * Decorative SVG art uses CrayonArt (`src/assets/crayon/`), not this module.
 */

/** Allowed top-level folders under `public/images/`. */
export type ImageCategory = 'deep-dives' | 'life-cycles' | 'team' | 'brand';

/** Build a public URL for a raster asset. */
export function imagePath(category: ImageCategory, filename: string): string {
  return `/images/${category}/${filename}`;
}

/** First-party raster assets used in multiple places. */
export const images = {
  team: {
    author: imagePath('team', 'author.jpg'),
  },
  brand: {
    favicon: '/favicon.svg',
  },
} as const;
