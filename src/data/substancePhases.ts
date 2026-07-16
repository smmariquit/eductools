export type Phase = 'solid' | 'liquid' | 'gas';

export interface SubstanceColors {
  solid: { fill: string; stroke: string };
  liquid: { fill: string; stroke: string };
  gas: { fill: string; stroke: string };
}

export interface SubstancePhaseModel {
  id: string;
  label: string;
  /** Short Filipino gloss where helpful. */
  tagalog?: string;
  /** Melting / freezing point (°C) at about 1 atm. */
  freezing: number;
  /** Boiling point (°C) at about 1 atm. */
  boiling: number;
  /** Skips the liquid band — solid ↔ gas only (e.g. CO₂ at 1 atm). */
  sublimationOnly?: boolean;
  /** Sublimation temperature when `sublimationOnly` (defaults to `freezing`). */
  sublimation?: number;
  tempMin: number;
  tempMax: number;
  defaultTemp: number;
  colors: SubstanceColors;
  /** Shown under the arrangement line when this substance is active. */
  transitionNote: string;
}

export const WATER_SUBSTANCE: SubstancePhaseModel = {
  id: 'water',
  label: 'Water',
  tagalog: 'Tubig',
  freezing: 0,
  boiling: 100,
  tempMin: -20,
  tempMax: 120,
  defaultTemp: 20,
  colors: {
    solid: { fill: 'var(--crayon-sky)', stroke: 'var(--accent)' },
    liquid: { fill: '#3b82f6', stroke: '#1e3a8a' },
    gas: { fill: '#c084fc', stroke: '#7e22ce' },
  },
  transitionNote: 'Freezes at 0°C and boils at 100°C at sea-level pressure.',
};

/** Other substances learners often meet in class or daily life. */
export const OTHER_SUBSTANCES: SubstancePhaseModel[] = [
  {
    id: 'mercury',
    label: 'Mercury',
    tagalog: 'Asoge',
    freezing: -39,
    boiling: 357,
    tempMin: -50,
    tempMax: 120,
    defaultTemp: 25,
    colors: {
      solid: { fill: '#d1d5db', stroke: '#6b7280' },
      liquid: { fill: '#e5e7eb', stroke: '#9ca3af' },
      gas: { fill: '#f3e8ff', stroke: '#a855f7' },
    },
    transitionNote: 'Melts around −39°C and boils around 357°C — a metal that is liquid in many classrooms.',
  },
  {
    id: 'ethanol',
    label: 'Ethanol',
    tagalog: 'Alcohol',
    freezing: -114,
    boiling: 78,
    tempMin: -20,
    tempMax: 120,
    defaultTemp: 20,
    colors: {
      solid: { fill: '#fde68a', stroke: '#d97706' },
      liquid: { fill: '#fbbf24', stroke: '#b45309' },
      gas: { fill: '#fed7aa', stroke: '#ea580c' },
    },
    transitionNote: 'Boils at about 78°C — lower than water, which is why alcohol evaporates quickly.',
  },
  {
    id: 'co2',
    label: 'Dry ice (CO₂)',
    tagalog: 'CO₂',
    freezing: -78,
    boiling: -78,
    sublimationOnly: true,
    sublimation: -78,
    tempMin: -90,
    tempMax: 30,
    defaultTemp: -20,
    colors: {
      solid: { fill: '#f8fafc', stroke: '#94a3b8' },
      liquid: { fill: '#f8fafc', stroke: '#94a3b8' },
      gas: { fill: '#e2e8f0', stroke: '#64748b' },
    },
    transitionNote: 'At normal pressure it sublimes near −78°C — solid dry ice skips the liquid puddle.',
  },
  {
    id: 'iron',
    label: 'Iron',
    tagalog: 'Bakal',
    freezing: 1538,
    boiling: 2862,
    tempMin: -20,
    tempMax: 120,
    defaultTemp: 20,
    colors: {
      solid: { fill: '#78716c', stroke: '#44403c' },
      liquid: { fill: '#f97316', stroke: '#c2410c' },
      gas: { fill: '#fdba74', stroke: '#ea580c' },
    },
    transitionNote: 'Melts above 1500°C — at everyday temperatures it stays a solid.',
  },
];

export const SUBSTANCES_BY_ID: Record<string, SubstancePhaseModel> = {
  water: WATER_SUBSTANCE,
  ...Object.fromEntries(OTHER_SUBSTANCES.map((s) => [s.id, s])),
};

export function phaseOf(t: number, substance: SubstancePhaseModel): Phase {
  if (substance.sublimationOnly) {
    const sub = substance.sublimation ?? substance.freezing;
    return t < sub ? 'solid' : 'gas';
  }
  if (t <= substance.freezing) return 'solid';
  if (t >= substance.boiling) return 'gas';
  return 'liquid';
}

export function substanceMarks(substance: SubstancePhaseModel): { label: string }[] {
  const unit = '°C';
  const fmt = (n: number) => `${n}${unit}`;

  if (substance.sublimationOnly) {
    const sub = substance.sublimation ?? substance.freezing;
    return [
      { label: fmt(substance.tempMin) },
      { label: `${fmt(sub)} (sublimes)` },
      { label: fmt(substance.tempMax) },
    ];
  }

  const marks: { label: string }[] = [{ label: fmt(substance.tempMin) }];

  if (substance.freezing > substance.tempMin && substance.freezing < substance.tempMax) {
    marks.push({ label: `${fmt(substance.freezing)} (melt)` });
  }

  if (substance.boiling > substance.tempMin && substance.boiling < substance.tempMax) {
    marks.push({ label: `${fmt(substance.boiling)} (boil)` });
  } else if (substance.boiling >= substance.tempMax) {
    marks.push({ label: `>${fmt(substance.tempMax)} to boil` });
  }

  marks.push({ label: fmt(substance.tempMax) });
  return marks;
}

export function clampTemp(t: number, substance: SubstancePhaseModel): number {
  return Math.min(substance.tempMax, Math.max(substance.tempMin, t));
}
