import type { CrayonColor } from '../crayon/CrayonArt';

/** Thematic crayon holder for a slider — pick what the control is about. */
export type SliderMotif =
  | 'default'
  | 'force'
  | 'mass'
  | 'friction'
  | 'temperature'
  | 'angle'
  | 'speed'
  | 'wave'
  | 'amplitude'
  | 'frequency'
  | 'wavelength'
  | 'length'
  | 'width'
  | 'height'
  | 'radius'
  | 'light'
  | 'co2'
  | 'water'
  | 'concentration'
  | 'volume'
  | 'fluid'
  | 'electric'
  | 'wind'
  | 'orbit'
  | 'number'
  | 'ratio'
  | 'terms'
  | 'fraction'
  | 'denominator'
  | 'pressure'
  | 'particles'
  | 'catalyst'
  | 'fold'
  | 'intensity'
  | 'focal'
  | 'object'
  | 'rearrange';

export interface SliderMotifConfig {
  art: string;
  color: CrayonColor;
  rail: string;
  wiggle?: boolean;
  /** Accessible label for the decorative motif (what it means). */
  hint?: string;
}

export const SLIDER_MOTIFS: Record<SliderMotif, SliderMotifConfig> = {
  default:       { art: 'star',          color: 'ink',      rail: 'rail-default' },
  force:         { art: 'bolt',          color: 'sunshine', rail: 'rail-default' },
  mass:          { art: 'weight',        color: 'berry',    rail: 'rail-default' },
  friction:      { art: 'scribble-circle', color: 'grape',  rail: 'rail-default', wiggle: true },
  temperature:   { art: 'thermometer',   color: 'berry',    rail: 'rail-thermo' },
  angle:         { art: 'protractor',    color: 'sky',      rail: 'rail-default' },
  speed:         { art: 'rocket',        color: 'leaf',     rail: 'rail-default' },
  wave:          { art: 'wind',          color: 'sky',      rail: 'rail-wave', wiggle: true },
  amplitude:     { art: 'wind',          color: 'berry',    rail: 'rail-wave' },
  frequency:     { art: 'bolt',          color: 'grape',    rail: 'rail-wave' },
  wavelength:    { art: 'ruler',         color: 'leaf',     rail: 'rail-wave' },
  length:        { art: 'ruler',         color: 'sky',      rail: 'rail-default' },
  width:         { art: 'ruler',         color: 'berry',    rail: 'rail-default' },
  height:        { art: 'ruler',         color: 'leaf',     rail: 'rail-default' },
  radius:        { art: 'protractor',    color: 'grape',    rail: 'rail-default' },
  light:         { art: 'sun',           color: 'sunshine', rail: 'rail-default', wiggle: true },
  co2:           { art: 'leaf',          color: 'leaf',     rail: 'rail-default' },
  water:         { art: 'droplet',       color: 'sky',      rail: 'rail-default' },
  concentration: { art: 'beaker',        color: 'sky',      rail: 'rail-default' },
  volume:        { art: 'beaker',        color: 'berry',    rail: 'rail-default' },
  fluid:         { art: 'droplet',       color: 'grape',    rail: 'rail-default' },
  electric:      { art: 'bolt',          color: 'sunshine', rail: 'rail-default' },
  wind:          { art: 'wind',          color: 'sky',      rail: 'rail-wave', wiggle: true },
  orbit:         { art: 'planet',        color: 'grape',    rail: 'rail-default' },
  number:        { art: 'open-book',     color: 'sky',      rail: 'rail-default' },
  ratio:         { art: 'star',          color: 'grape',    rail: 'rail-default' },
  terms:         { art: 'open-book',     color: 'sunshine', rail: 'rail-default' },
  fraction:      { art: 'pie-slice',     color: 'berry',    rail: 'rail-default', hint: 'Parts taken — the top number' },
  denominator:   { art: 'pie-divided',   color: 'sky',      rail: 'rail-default', hint: 'Equal slices in the whole — the bottom number' },
  pressure:      { art: 'beaker',        color: 'leaf',     rail: 'rail-thermo' },
  particles:     { art: 'beaker',        color: 'sky',      rail: 'rail-default' },
  catalyst:      { art: 'leaf',          color: 'leaf',     rail: 'rail-default' },
  fold:          { art: 'ruler',         color: 'sky',      rail: 'rail-default' },
  intensity:     { art: 'bolt',          color: 'berry',    rail: 'rail-default' },
  focal:         { art: 'protractor',    color: 'sunshine', rail: 'rail-default' },
  object:        { art: 'ruler',         color: 'sky',      rail: 'rail-default' },
  rearrange:     { art: 'sparkle',       color: 'sunshine', rail: 'rail-default', wiggle: true },
};

const railModules = import.meta.glob('../../assets/crayon/sliders/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export function getSliderRailSvg(railName: string): string | undefined {
  return railModules[`../../assets/crayon/sliders/${railName}.svg`];
}
