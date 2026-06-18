import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import { resolveWriteupSlug } from './writeupSlugs';

const mdxComponents = import.meta.glob([
  '../content/deep-dives/*.mdx',
  '../content/blog/*.mdx',
]);

const mdxCache = new Map<string, LazyExoticComponent<ComponentType<Record<string, unknown>>>>();

function mdxImportFn(slug: string) {
  const resolved = resolveWriteupSlug(slug);
  return (
    mdxComponents[`../content/deep-dives/${resolved}.mdx`] ??
    mdxComponents[`../content/blog/${resolved}.mdx`]
  );
}

export function getMdxComponent(slug: string) {
  const resolved = resolveWriteupSlug(slug);
  if (!mdxCache.has(resolved)) {
    const importFn = mdxImportFn(resolved);
    if (importFn) {
      mdxCache.set(resolved, lazy(importFn as () => Promise<{ default: ComponentType }>));
    }
  }
  return mdxCache.get(resolved) ?? null;
}
