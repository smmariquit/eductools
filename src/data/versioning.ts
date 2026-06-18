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
};

const DEFAULT_V11: string[] = [
  'Themed crayon sliders with contextual SVG track holders.',
  'UI layout and copy polish.',
];

const INITIAL_V10: string[] = ['Initial interactive release.'];

function buildToolRecord(id: string): ToolVersionRecord {
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
