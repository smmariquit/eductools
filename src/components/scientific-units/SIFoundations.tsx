import { useEffect, useRef } from 'react';
import katex from 'katex';
import { Sources } from '../content';
import type { SourceItem } from '../content';

/*
 * Canonical, widely-recognized reference visuals for the SI:
 *  1. The seven SI base units and the defining constant behind each.
 *  2. The SI prefix ladder (tera down to pico, powers of ten).
 *  3. How common derived units are built from the base units.
 *
 * All colors come from crayon CSS variables and DaisyUI semantic theme
 * tokens; no hardcoded hex lives in this file.
 */

const InlineMath = ({ math }: { math: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(math, ref.current, { displayMode: false, throwOnError: false });
    }
  }, [math]);
  return <span ref={ref} />;
};

type Crayon = 'sky' | 'berry' | 'sunshine' | 'leaf' | 'grape' | 'ink';

interface BaseUnit {
  symbol: string;
  name: string;
  quantity: string;
  constant: string;
  constantLabel: string;
  color: Crayon;
}

// Values per the BIPM SI Brochure (9th ed., 2019) defining constants.
const BASE_UNITS: BaseUnit[] = [
  { symbol: 's', name: 'second', quantity: 'time', constantLabel: 'caesium frequency', constant: '\\Delta\\nu_{\\text{Cs}} = 9\\,192\\,631\\,770\\ \\text{Hz}', color: 'sky' },
  { symbol: 'm', name: 'metre', quantity: 'length', constantLabel: 'speed of light', constant: 'c = 299\\,792\\,458\\ \\text{m/s}', color: 'leaf' },
  { symbol: 'kg', name: 'kilogram', quantity: 'mass', constantLabel: 'Planck constant', constant: 'h = 6.626\\,070\\,15 \\times 10^{-34}\\ \\text{J s}', color: 'berry' },
  { symbol: 'A', name: 'ampere', quantity: 'electric current', constantLabel: 'elementary charge', constant: 'e = 1.602\\,176\\,634 \\times 10^{-19}\\ \\text{C}', color: 'sunshine' },
  { symbol: 'K', name: 'kelvin', quantity: 'temperature', constantLabel: 'Boltzmann constant', constant: 'k = 1.380\\,649 \\times 10^{-23}\\ \\text{J/K}', color: 'grape' },
  { symbol: 'mol', name: 'mole', quantity: 'amount of substance', constantLabel: 'Avogadro number', constant: 'N_{\\text{A}} = 6.022\\,140\\,76 \\times 10^{23}\\ \\text{mol}^{-1}', color: 'sky' },
  { symbol: 'cd', name: 'candela', quantity: 'luminous intensity', constantLabel: 'luminous efficacy', constant: 'K_{\\text{cd}} = 683\\ \\text{lm/W}', color: 'sunshine' },
];

interface Prefix {
  name: string;
  symbol: string;
  power: string;
  factorWords: string;
  color: Crayon;
}

// Per NIST, SI Prefixes. Ordered largest to smallest, tera down to pico.
const PREFIXES: Prefix[] = [
  { name: 'tera', symbol: 'T', power: '12', factorWords: 'trillion', color: 'grape' },
  { name: 'giga', symbol: 'G', power: '9', factorWords: 'billion', color: 'berry' },
  { name: 'mega', symbol: 'M', power: '6', factorWords: 'million', color: 'sunshine' },
  { name: 'kilo', symbol: 'k', power: '3', factorWords: 'thousand', color: 'leaf' },
  { name: '(base unit)', symbol: '', power: '0', factorWords: 'one', color: 'ink' },
  { name: 'milli', symbol: 'm', power: '-3', factorWords: 'thousandth', color: 'leaf' },
  { name: 'micro', symbol: 'μ', power: '-6', factorWords: 'millionth', color: 'sunshine' },
  { name: 'nano', symbol: 'n', power: '-9', factorWords: 'billionth', color: 'berry' },
  { name: 'pico', symbol: 'p', power: '-12', factorWords: 'trillionth', color: 'grape' },
];

interface Derived {
  symbol: string;
  name: string;
  formula: string;
  inBase: string;
  color: Crayon;
}

// Coherent SI derived units expressed via base units (BIPM SI Brochure, Table 4).
const DERIVED: Derived[] = [
  { symbol: 'N', name: 'newton (force)', formula: '\\text{N} = \\text{kg}\\cdot\\text{m/s}^2', inBase: 'mass × acceleration', color: 'sky' },
  { symbol: 'Pa', name: 'pascal (pressure)', formula: '\\text{Pa} = \\text{N/m}^2', inBase: 'force ÷ area', color: 'leaf' },
  { symbol: 'J', name: 'joule (energy)', formula: '\\text{J} = \\text{N}\\cdot\\text{m}', inBase: 'force × distance', color: 'sunshine' },
  { symbol: 'W', name: 'watt (power)', formula: '\\text{W} = \\text{J/s}', inBase: 'energy ÷ time', color: 'berry' },
  { symbol: 'Hz', name: 'hertz (frequency)', formula: '\\text{Hz} = 1/\\text{s}', inBase: 'cycles ÷ time', color: 'grape' },
  { symbol: 'V', name: 'volt (potential)', formula: '\\text{V} = \\text{W/A}', inBase: 'power ÷ current', color: 'sky' },
];

const crayonVar = (c: Crayon) => `var(--crayon-${c})`;

const SOURCES: SourceItem[] = [
  { label: 'BIPM, The International System of Units (SI Brochure, 9th ed., 2019)', href: 'https://www.bipm.org/en/publications/si-brochure' },
  { label: 'NIST, SI Units (Constants, Units & Uncertainty)', href: 'https://physics.nist.gov/cuu/Units/units.html' },
  { label: 'NIST, SI Prefixes', href: 'https://physics.nist.gov/cuu/Units/prefixes.html' },
];

const SectionHeading = ({ kicker, title, blurb }: { kicker: string; title: string; blurb: string }) => (
  <div className="mb-5">
    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{kicker}</span>
    <h3 className="text-xl md:text-2xl font-extrabold text-base-content tracking-tight">{title}</h3>
    <p className="text-sm text-base-content/70 mt-1 max-w-2xl leading-relaxed">{blurb}</p>
  </div>
);

const BaseUnitsFigure = () => (
  <figure className="not-prose">
    <SectionHeading
      kicker="Figure 1"
      title="The seven SI base units"
      blurb="Since the 2019 redefinition, every base unit is fixed to a constant of nature rather than a physical object. Each card pairs the unit with the defining constant that sets it."
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {BASE_UNITS.map((u) => (
        <div key={u.symbol} className="flex gap-3 items-start bg-base-100 border border-base-300 rounded-2xl p-4 shadow-sm">
          <svg viewBox="0 0 48 48" className="h-12 w-12 shrink-0" role="img" aria-label={`${u.name} symbol`}>
            <circle cx="24" cy="24" r="21" fill={crayonVar(u.color)} opacity="0.16" />
            <circle cx="24" cy="24" r="21" fill="none" stroke={crayonVar(u.color)} strokeWidth="2.5" />
            <text x="24" y="24" textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="800" fill={crayonVar(u.color)} fontFamily="ui-monospace, monospace">
              {u.symbol}
            </text>
          </svg>
          <div className="min-w-0">
            <div className="font-bold text-base-content capitalize leading-tight">{u.name}</div>
            <div className="text-[11px] uppercase tracking-wider text-base-content/50 mb-1">{u.quantity}</div>
            <div className="text-xs text-base-content/70 leading-relaxed">
              <span className="font-semibold">{u.constantLabel}: </span>
              <span className="block mt-0.5 overflow-x-auto scrollbar-none"><InlineMath math={u.constant} /></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </figure>
);

const PrefixLadder = () => {
  const rungH = 46;
  const top = 14;
  const height = top * 2 + rungH * (PREFIXES.length - 1);
  return (
    <figure className="not-prose">
      <SectionHeading
        kicker="Figure 2"
        title="The SI prefix ladder"
        blurb="Each big rung multiplies or divides the base unit by another factor of one thousand, from tera at the top to pico at the bottom. Same unit, different scale."
      />
      <div className="bg-base-100 border border-base-300 rounded-2xl p-4 md:p-6 shadow-sm overflow-x-auto">
        <svg viewBox={`0 0 520 ${height}`} className="w-full min-w-[460px]" role="img" aria-label="SI prefix ladder from tera to pico">
          <line x1="150" y1={top} x2="150" y2={height - top} stroke="var(--crayon-ink)" strokeWidth="2" opacity="0.25" />
          {PREFIXES.map((p, i) => {
            const y = top + i * rungH;
            const isBase = p.symbol === '';
            return (
              <g key={p.name}>
                <line x1="150" y1={y} x2="178" y2={y} stroke={crayonVar(p.color)} strokeWidth="3" />
                <circle cx="150" cy={y} r="6" fill={crayonVar(p.color)} />
                <text x="138" y={y} textAnchor="end" dominantBaseline="central" fontSize="13" fontWeight="700" fill="var(--crayon-ink)">
                  {p.name}
                </text>
                <text x="190" y={y} dominantBaseline="central" fontSize="15" fontWeight="800" fill={crayonVar(p.color)} fontFamily="ui-monospace, monospace">
                  {isBase ? '1' : p.symbol}
                </text>
                <text x="230" y={y} dominantBaseline="central" fontSize="13" fill="var(--crayon-ink)" fontFamily="ui-monospace, monospace">
                  {isBase ? '10⁰' : `10${p.power.startsWith('-') ? '⁻' : ''}${superscript(p.power.replace('-', ''))}`}
                </text>
                <text x="320" y={y} dominantBaseline="central" fontSize="12" fill="var(--crayon-ink)" opacity="0.7">
                  {p.factorWords}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
};

const SUP: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const superscript = (n: string) => n.split('').map((d) => SUP[d] ?? d).join('');

const DerivedUnitsFigure = () => (
  <figure className="not-prose">
    <SectionHeading
      kicker="Figure 3"
      title="Derived units build from base units"
      blurb="Most named units are shorthand. A newton is just kilograms times metres per second squared; everything traces back to the seven base units."
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {DERIVED.map((d) => (
        <div key={d.symbol} className="bg-base-100 border border-base-300 rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <div
            className="shrink-0 h-12 w-12 rounded-xl flex items-center justify-center font-mono text-lg font-black text-base-100"
            style={{ backgroundColor: crayonVar(d.color) }}
          >
            {d.symbol}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-base-content">{d.name}</div>
            <div className="overflow-x-auto scrollbar-none my-0.5"><InlineMath math={d.formula} /></div>
            <div className="text-[11px] text-base-content/60">{d.inBase}</div>
          </div>
        </div>
      ))}
    </div>
  </figure>
);

export const SIFoundations = () => (
  <section className="bg-base-200/40 border border-base-300 rounded-2xl p-5 md:p-8 shadow-sm">
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight">How the system fits together</h2>
      <p className="text-sm md:text-base text-base-content/70 mt-1 max-w-3xl leading-relaxed">
        Before browsing individual units, it helps to see the scaffolding. The whole SI rests on seven base units,
        a ladder of powers-of-ten prefixes, and a handful of rules for combining them. These three figures are the
        canonical pictures the BIPM and NIST use to teach it.
      </p>
    </div>
    <div className="space-y-10">
      <BaseUnitsFigure />
      <PrefixLadder />
      <DerivedUnitsFigure />
    </div>
    <Sources items={SOURCES} title="Sources for these figures" />
  </section>
);

export default SIFoundations;
