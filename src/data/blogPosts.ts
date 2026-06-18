import { images } from '../lib/images';
import { resolveWriteupSlug, writeupSlugForTool } from '../lib/writeupSlugs';
import { getVisualizerDates, getWriteupDates } from './contentDates';
import { visualizerModules } from './registry';

export interface BlogPost {
  id: string;
  toolId: string;
  title: string;
  excerpt: string;
  date: string;
  /** ISO date for sorting (YYYY-MM-DD). */
  sortDate: string;
  author?: {
    name: string;
    url?: string;
    avatar?: string;
  };
}

export const DEFAULT_AUTHOR = {
  name: 'Simonee Ezekiel Mariquit',
  url: 'https://stimmie.dev',
  avatar: images.team.author,
} as const;

function formatDisplayDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Standalone articles with no matching visualizer tool. */
const standalonePosts: BlogPost[] = [
  {
    id: 'digital-divide',
    toolId: '',
    title: "What's actually plugged in at the other end",
    excerpt:
      'Before you ship an edtech tool to a Philippine classroom, it helps to know what that classroom actually has. A look at the reading numbers, the licensing and teacher-time gaps behind the hardware, and where a free browser tool honestly fits.',
    date: 'June 18, 2026',
    sortDate: '2026-06-18',
  },
];

const toolWriteupPosts: BlogPost[] = visualizerModules.map((module) => {
  const writeupSlug = writeupSlugForTool(module.id);
  const dates = getWriteupDates(writeupSlug) ?? getVisualizerDates(module.id);
  const sortDate = dates?.updated ?? '2026-06-18';

  return {
    id: writeupSlug,
    toolId: module.id,
    title: module.title,
    excerpt: module.description,
    date: formatDisplayDate(sortDate),
    sortDate,
  };
});

/** Every tool deep-dive plus standalone articles — same content as visualizer writeups. */
export const blogPosts: BlogPost[] = [...toolWriteupPosts, ...standalonePosts].sort((a, b) =>
  b.sortDate.localeCompare(a.sortDate),
);

export function findBlogPost(id: string): BlogPost | undefined {
  const slug = resolveWriteupSlug(id);
  return blogPosts.find((post) => post.id === slug);
}
