/** Registry tool id → deep-dive filename when they differ. */
export const TOOL_ID_TO_WRITEUP_SLUG: Record<string, string> = {
  'forces-motion': 'forces-and-motion',
  'em-spectrum': 'electromagnetic-spectrum',
};

/** Old blog URLs that should resolve to the canonical writeup slug. */
export const LEGACY_BLOG_SLUGS: Record<string, string> = {
  'forces-motion': 'forces-and-motion',
  'em-spectrum': 'electromagnetic-spectrum',
};

export function writeupSlugForTool(toolId: string): string {
  return TOOL_ID_TO_WRITEUP_SLUG[toolId] ?? toolId;
}

export function resolveWriteupSlug(slug: string): string {
  return LEGACY_BLOG_SLUGS[slug] ?? slug;
}

/** Writeup or blog slug → studyExamples / writeupExercises key. */
export function resolveWriteupModuleId(id: string): string {
  const slug = resolveWriteupSlug(id);
  return TOOL_ID_TO_WRITEUP_SLUG[id] ?? slug;
}
