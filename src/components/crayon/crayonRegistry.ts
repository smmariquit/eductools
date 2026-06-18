/**
 * Crayon art registry.
 *
 * Auto-discovers every hand-authored crayon SVG under `src/assets/crayon/`,
 * mirroring how visualizers are auto-registered in `src/data/registry.ts`.
 *
 * To add new art: drop a spec-compliant `.svg` into
 * `src/assets/crayon/<category>/<name>.svg`. It is registered automatically by
 * its file name (no extension), e.g. `beaker.svg` -> `<CrayonArt name="beaker" />`.
 *
 * See `docs/design-system/crayon.md` for the authoring spec.
 */

// Eager + raw: each SVG is inlined as a string at build time. SVGs are tiny,
// so synchronous inlining keeps <CrayonArt> simple (no async/Suspense).
const modules = import.meta.glob('../../assets/crayon/**/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function fileNameOf(path: string): string {
  const file = path.split('/').pop() ?? path;
  return file.replace(/\.svg$/i, '');
}

function categoryOf(path: string): string {
  // .../assets/crayon/<category>/<name>.svg
  const parts = path.split('/');
  const idx = parts.lastIndexOf('crayon');
  return idx >= 0 && parts[idx + 2] ? parts[idx + 1] : 'misc';
}

export interface CrayonAsset {
  name: string;
  category: string;
  svg: string;
}

export const crayonAssets: Record<string, CrayonAsset> = Object.fromEntries(
  Object.entries(modules).map(([path, svg]) => {
    const name = fileNameOf(path);
    return [name, { name, category: categoryOf(path), svg }];
  }),
);

/** All available crayon art names (for galleries, validation, iteration). */
export const CRAYON_ART_NAMES: string[] = Object.keys(crayonAssets).sort();

/**
 * Names are kept as `string` (not a literal union) so dropping in a new SVG
 * works with zero code changes. Unknown names are caught at runtime in dev.
 */
export type CrayonArtName = string;

export function getCrayonAsset(name: string): CrayonAsset | undefined {
  return crayonAssets[name];
}
