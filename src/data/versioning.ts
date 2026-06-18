import packageJson from '../../package.json';
import { visualizerModules } from './registry';

/** Semver release entry (site or tool). */
export interface ReleaseEntry {
  version: string;
  date: string;
  changes: string[];
}

export interface ToolVersionRecord {
  /** Current semver for this visualizer. */
  version: string;
  /** Newest-first release history. */
  changelog: ReleaseEntry[];
}

/** Live site version — kept in sync with package.json. */
export const SITE_VERSION: string = packageJson.version;

export const siteChangelog: ReleaseEntry[] = [
  {
    version: '1.2.13',
    date: '2026-06-18',
    changes: [
      'Blog index lists every tool writeup; /blog/{slug} serves the same deep-dive MDX as each visualizer.',
      'Writeup exercises: auto-check for integer answers, reveal dropdown for open questions.',
      'Crayon-orbit loader and skeleton UIs while visualizers, writeups, and blog articles load.',
    ],
  },
  {
    version: '1.2.12',
    date: '2026-06-18',
    changes: [
      'Each tool writeup and blog article now ends with 3–5 exercises or reflection questions.',
    ],
  },
  {
    version: '1.2.11',
    date: '2026-06-18',
    changes: [
      'Study examples now render inside each tool writeup (and blog articles), not in the tool header above the canvas.',
    ],
  },
  {
    version: '1.2.10',
    date: '2026-06-18',
    changes: [
      'Question-mark links beside scientific units across sliders, charts, and tool readouts — each opens the matching unit guide.',
    ],
  },
  {
    version: '1.2.9',
    date: '2026-06-18',
    changes: [
      'States of Matter: toggle between water and other substances (mercury, ethanol, dry ice, iron) with substance-specific melting and boiling points.',
    ],
  },
  {
    version: '1.2.8',
    date: '2026-06-18',
    changes: [
      'All sliders now show min, midpoint, and max labels under the track by default.',
    ],
  },
  {
    version: '1.2.7',
    date: '2026-06-18',
    changes: [
      'Guided-input tools require an explicit “Show visualization” confirm — no flashbang on first slider touch.',
    ],
  },
  {
    version: '1.2.6',
    date: '2026-06-18',
    changes: [
      'Standardized raster images: /images/<category>/ paths, Figure variants (article, inline, avatar), and images.mdc rule.',
    ],
  },
  {
    version: '1.2.5',
    date: '2026-06-18',
    changes: [
      'Every tool and writeup now lists one or two common study examples in the header and deep-dive.',
    ],
  },
  {
    version: '1.2.4',
    date: '2026-06-18',
    changes: [
      'Fractions tool: sliders stay fixed above the buko pie preview while values change.',
    ],
  },
  {
    version: '1.2.3',
    date: '2026-06-18',
    changes: [
      'Life cycles tool: mosquito and cockroach added as fast-breeding contrasts to the eagle and tamaraw.',
    ],
  },
  {
    version: '1.2.2',
    date: '2026-06-18',
    changes: [
      'Life cycles tool: every eagle and tamaraw stage now has its own Wikimedia reference photo.',
    ],
  },
  {
    version: '1.2.1',
    date: '2026-06-18',
    changes: [
      'Life cycles tool: hand-drawn stage illustrations plus Wikimedia reference photos in the detail panel.',
    ],
  },
  {
    version: '1.2.0',
    date: '2026-06-18',
    changes: [
      'Fractions tool: improper and mixed forms, negative values, and addition with common denominators.',
    ],
  },
  {
    version: '1.1.6',
    date: '2026-06-18',
    changes: [
      'Units reference: full SI prefix ladder including hecto, deca, deci, centi, and yotta–yocto.',
    ],
  },
  {
    version: '1.1.5',
    date: '2026-06-18',
    changes: [
      'Minimum readable font and tap-target sizes enforced across all visualizer tools.',
      'Sliders: larger labels, motif icons, thumbs, and optional scale marks.',
    ],
  },
  {
    version: '1.1.4',
    date: '2026-06-18',
    changes: [
      'Slider labels and values now sit together (no more far-apart readouts).',
    ],
  },
  {
    version: '1.1.3',
    date: '2026-06-18',
    changes: [
      'Fractions visualizer pies now look like buko pie — golden crust, cream filling, coconut shreds.',
    ],
  },
  {
    version: '1.1.2',
    date: '2026-06-18',
    changes: [
      'Per-tool changelog moved to the bottom of visualizer pages.',
    ],
  },
  {
    version: '1.1.1',
    date: '2026-06-18',
    changes: [
      'Fraction sliders: distinct numerator vs denominator pie icons with clearer meaning.',
      'Fixed crayon slider thumbs getting clipped top and bottom.',
    ],
  },
  {
    version: '1.1.0',
    date: '2026-06-18',
    changes: [
      'Crayon-themed sliders with contextual SVG holders on every visualizer.',
      'Site-wide and per-tool semantic versioning with changelogs.',
      'Fixed direct links to tools (SPA routing on Vercel).',
      'Content and copy audit; blog trimmed to real articles only.',
      'Removed unfinished translation layer; English-only Vite app.',
      'Shared Philippines map for typhoon and seasons tools.',
      'Authoritative figures in microscope and typhoon writeups.',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-06-10',
    changes: [
      'Initial public release with 36 interactive STEM visualizers.',
      'MDX deep-dives with cited sources for every module.',
      'Crayon Cosmos design system and offline-capable PWA.',
      'MATATAG grade tags across Philippine science and math tools.',
    ],
  },
];

/** Tool-specific notes for 1.1.0 — everything else gets the default polish line. */
const TOOL_V11: Partial<Record<string, string[]>> = {
  microscope: [
    'Fixed high-magnification pan so organelles stay centered and visible.',
    'Crayon sliders and deep-dive figures (Hooke cork, chloroplast micrograph).',
  ],
  'typhoon-tracker': [
    'Shared archipelago map; compact wind slider with crayon motif.',
    'PAGASA category and wind-signal panel tied to the slider.',
  ],
  seasons: [
    'Shared Philippines map with monsoon context.',
    'Month slider with seasonal readouts for tag-init and tag-ulan.',
  ],
  'forces-and-motion': [
    'Jeepney simulation with force, mass, and friction crayon sliders.',
  ],
  'human-body': [
    'Fixed tab contrast on systems view.',
    'Compact activity slider with crayon holder.',
  ],
  photosynthesis: [
    'Fixed tab contrast between stomata and mass-balance views.',
    'Light, CO₂, and water sliders with sun, leaf, and droplet motifs.',
  ],
  'food-web': [
    'Re-center view control for the cytoscape food-web graph.',
  ],
  'chemical-bonding': [
    'Step-through ionic and covalent modes without a redundant reset.',
  ],
  'wave-physics': [
    'Wave sliders use sine-rail and wind motifs; speed comes from the medium.',
  ],
  'em-spectrum': [
    'Single frequency slider locks wavelength and photon energy together.',
  ],
  'integer-number-line': [
    'Predict-the-answer mode with crayon number-line sliders.',
  ],
  'computer-science': [
    'RGB byte editors with live pixel preview.',
  ],
  fractions: [
    'Buko pie illustration — golden crimped crust, cream filling, and coconut shreds on taken slices.',
    'Numerator and denominator sliders use distinct pie icons (one slice vs divided whole).',
    'Crayon slider thumb clipping fix.',
  ],
};

const DEFAULT_V11: string[] = [
  'Themed crayon sliders with contextual SVG track holders.',
  'UI layout and copy polish.',
];

const INITIAL_V10: string[] = ['Initial interactive release.'];

function buildToolRecord(id: string): ToolVersionRecord {
  if (id === 'life-cycles') {
    return {
      version: '1.2.3',
      changelog: [
        {
          version: '1.2.3',
          date: '2026-06-18',
          changes: [
            'Mosquito (complete metamorphosis) and cockroach (incomplete metamorphosis) join as fast-breeding contrasts.',
            'Four-species picker grouped into slow endemic breeders vs fast multipliers.',
            'Eight new stage illustrations and Wikimedia reference photos for insect life stages.',
          ],
        },
        {
          version: '1.2.2',
          date: '2026-06-18',
          changes: [
            'All nine life stages (five eagle, four tamaraw) now have distinct reference photos.',
            'Downloaded five new eagle images (nest, nestling, juvenile, breeding) from Wikimedia Commons.',
            'Tamaraw breeding stage uses its own group photo instead of reusing the adult image.',
          ],
        },
        {
          version: '1.2.1',
          date: '2026-06-18',
          changes: [
            'Nine crayon life-stage drawings (eagle + tamaraw) replace emoji in the cycle diagram.',
            'Reference photos from Wikimedia Commons in the stage detail panel with credits.',
            'Larger cycle nodes and illustration + photo layout in ProcessCycle.',
          ],
        },
        {
          version: '1.1.0',
          date: '2026-06-18',
          changes: TOOL_V11['life-cycles'] ?? DEFAULT_V11,
        },
        {
          version: '1.0.0',
          date: '2026-06-10',
          changes: INITIAL_V10,
        },
      ],
    };
  }

  if (id === 'fractions') {
    return {
      version: '1.2.1',
      changelog: [
        {
          version: '1.2.1',
          date: '2026-06-18',
          changes: [
            'Fraction sliders sit above the buko pie preview so controls do not shift while dragging.',
            'Reserved min-height on the pie area to reduce layout jump below the sliders.',
          ],
        },
        {
          version: '1.2.0',
          date: '2026-06-18',
          changes: [
            'Improper and mixed fraction notation with multi-pie buko visuals.',
            'Signed numerators (negative = pie owed, hatched slices).',
            'Add fractions: LCD rename, step-by-step work, and sum pie.',
          ],
        },
        {
          version: '1.1.0',
          date: '2026-06-18',
          changes: TOOL_V11.fractions ?? DEFAULT_V11,
        },
        {
          version: '1.0.0',
          date: '2026-06-10',
          changes: INITIAL_V10,
        },
      ],
    };
  }

  return {
    version: '1.1.0',
    changelog: [
      {
        version: '1.1.0',
        date: '2026-06-18',
        changes: TOOL_V11[id] ?? DEFAULT_V11,
      },
      {
        version: '1.0.0',
        date: '2026-06-10',
        changes: INITIAL_V10,
      },
    ],
  };
}

/** Per-visualizer semver history keyed by registry id. */
export const toolVersions: Record<string, ToolVersionRecord> = Object.fromEntries(
  visualizerModules.map((m) => [m.id, buildToolRecord(m.id)]),
);

export function getToolVersion(id: string): ToolVersionRecord | undefined {
  return toolVersions[id];
}

export function getLatestSiteRelease(): ReleaseEntry {
  return siteChangelog[0];
}
