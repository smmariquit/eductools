import { scientificUnits, type ScientificUnit } from '../data/scientificUnits';

/** URL hash fragment for a unit symbol (matches existing `/units#…` links). */
export function unitGuideSlug(symbol: string): string {
  return symbol.trim().replace(/\s+/g, '-');
}

const SKIP_UNITS = new Set(['', '%', '×', 'x', 'units', 'unit', 'percent']);

/** Display variants → canonical symbol in `scientificUnits`. */
const UNIT_ALIASES: Record<string, string> = {
  kmh: 'kn',
  'km/h': 'kn',
  hpa: 'mb',
  hPa: 'mb',
  hectopascal: 'mb',
  mbar: 'mb',
  mb: 'mb',
  cm: 'm',
  centimeter: 'm',
  centimetre: 'm',
  m3: 'm',
  'm³': 'm',
  ml: 'L',
  mL: 'L',
  g: 'kg',
  'kg/m3': 'g/cm³',
  'kg/m³': 'g/cm³',
  'g/mol': 'Da',
  ghz: 'Hz',
  GHz: 'Hz',
  mhz: 'Hz',
  MHz: 'Hz',
  khz: 'Hz',
  kHz: 'Hz',
  '°': 'rad',
  deg: 'rad',
  degree: 'rad',
  degrees: 'rad',
  psi: 'Pa',
  liter: 'L',
  litre: 'L',
  celsius: '°C',
  kelvin: 'K',
  newton: 'N',
  newtons: 'N',
  joule: 'J',
  joules: 'J',
  watt: 'W',
  watts: 'W',
  hertz: 'Hz',
  meter: 'm',
  metre: 'm',
  meters: 'm',
  metres: 'm',
  'm/s2': 'm/s²',
  'm/s^2': 'm/s²',
  'ms-1': 'm/s',
  'ms-2': 'm/s²',
  ohm: 'Ω',
  ohms: 'Ω',
  '\u03a9': 'Ω',
  volt: 'V',
  volts: 'V',
  mv: 'V',
  mV: 'V',
  'kj/mol': 'J',
  'kJ/mol': 'J',
  au: 'AU',
  ev: 'eV',
  eV: 'eV',
  ppm: 'ppm',
  ppb: 'ppb',
  'μmol m⁻² s⁻¹': 'μmol m⁻² s⁻¹',
  'umol m-2 s-1': 'μmol m⁻² s⁻¹',
};

function normalizeUnitKey(raw: string): string {
  return raw
    .trim()
    .replace(/\u03a9/gi, 'Ω')
    .replace(/\u00b2/g, '²')
    .replace(/\u00b3/g, '³')
    .replace(/\u00b9/g, '¹');
}

function buildLookup(): Map<string, ScientificUnit> {
  const map = new Map<string, ScientificUnit>();

  for (const unit of scientificUnits) {
    const sym = normalizeUnitKey(unit.symbol);
    map.set(sym, unit);
    map.set(unitGuideSlug(unit.symbol), unit);
    map.set(unitGuideSlug(sym), unit);
    const paren = unit.symbol.match(/^([^(]+)/);
    if (paren) {
      map.set(normalizeUnitKey(paren[1]), unit);
    }
  }

  for (const [alias, symbol] of Object.entries(UNIT_ALIASES)) {
    const target = map.get(normalizeUnitKey(symbol));
    if (target) {
      map.set(normalizeUnitKey(alias), target);
    }
  }

  return map;
}

const UNIT_LOOKUP = buildLookup();

/** Resolve a displayed unit string to a guide entry, or null if none applies. */
export function resolveUnitGuide(unit: string): ScientificUnit | null {
  const key = normalizeUnitKey(unit);
  if (SKIP_UNITS.has(key)) return null;
  return (
    UNIT_LOOKUP.get(key) ??
    UNIT_LOOKUP.get(unitGuideSlug(key)) ??
    null
  );
}

/** Path to the units explorer with hash for the resolved guide. */
export function unitGuideHref(unit: string): string | null {
  const resolved = resolveUnitGuide(unit);
  if (!resolved) return null;
  return `/units#${unitGuideSlug(resolved.symbol)}`;
}
