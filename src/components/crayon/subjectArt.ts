import type { CrayonColor } from './CrayonArt';

/**
 * Maps a subject/tag to a crayon icon + accent color. Used for module cards,
 * nav, and filters so every subject has a consistent hand-drawn identity.
 * Falls back to a friendly default for unknown subjects.
 */
const SUBJECT_ART: Record<string, { name: string; color: CrayonColor }> = {
  Math: { name: 'ruler', color: 'sunshine' },
  Mathematics: { name: 'ruler', color: 'sunshine' },
  Science: { name: 'beaker', color: 'sky' },
  Biology: { name: 'leaf', color: 'leaf' },
  Physics: { name: 'bolt', color: 'sunshine' },
  Chemistry: { name: 'beaker', color: 'sky' },
  'Earth Science': { name: 'planet', color: 'grape' },
  DRRR: { name: 'globe', color: 'sky' },
};

const PRIORITY = [
  'Biology', 'Physics', 'Chemistry', 'Earth Science', 'DRRR', 'Math', 'Science',
];

const DEFAULT_ART = { name: 'sparkle', color: 'sky' as CrayonColor };

/** Pick the best crayon icon for a set of tags (e.g. a visualizer's tags). */
export function crayonArtForTags(tags: string[]): { name: string; color: CrayonColor } {
  for (const subject of PRIORITY) {
    if (tags.includes(subject) && SUBJECT_ART[subject]) return SUBJECT_ART[subject];
  }
  return DEFAULT_ART;
}

export function crayonArtForSubject(subject: string): { name: string; color: CrayonColor } {
  return SUBJECT_ART[subject] ?? DEFAULT_ART;
}
