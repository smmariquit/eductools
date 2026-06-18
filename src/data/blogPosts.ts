export interface BlogPost {
  id: string;
  toolId: string;
  title: string;
  excerpt: string;
  date: string;
  author?: {
    name: string;
    url?: string;
    avatar?: string;
  };
}

export const DEFAULT_AUTHOR = {
  name: 'Simonee Ezekiel Mariquit',
  url: 'https://stimmie.dev',
  avatar: '/team/author.jpg',
} as const;

/** Standalone blog articles only — tool deep-dives live under each visualizer. */
export const blogPosts: BlogPost[] = [
  {
    id: 'digital-divide',
    toolId: '',
    title: "What's actually plugged in at the other end",
    excerpt:
      'Before you ship an edtech tool to a Philippine classroom, it helps to know what that classroom actually has. A look at the reading numbers, the licensing and teacher-time gaps behind the hardware, and where a free browser tool honestly fits.',
    date: 'June 18, 2026',
  },
  {
    id: 'forces-motion',
    toolId: 'forces-and-motion',
    title: 'Forces and Motion: Physics in Jeepneys and Tricycles',
    excerpt:
      "I learned Newton's laws standing in a packed jeepney, not a classroom. Inertia, mass, and acceleration read off the best physics lab in the country: the back of a jeepney at rush hour.",
    date: 'March 30, 2026',
  },
  {
    id: 'em-spectrum',
    toolId: 'em-spectrum',
    title: 'Electromagnetic Spectrum: Signals Across the Archipelago',
    excerpt:
      'The interesting end of the spectrum is not the one with skulls on the warning labels. It is the quiet radio and microwave middle, the crowded strip most Filipinos actually live inside.',
    date: 'May 30, 2026',
  },
];
