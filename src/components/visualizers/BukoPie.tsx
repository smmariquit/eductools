/** Top-down buko pie for the fractions visualizer — golden crust, cream filling, coconut shreds. */

import type { ReactNode } from 'react';

const sectorPath = (cx: number, cy: number, r: number, startDeg: number, endDeg: number) => {
  const toXY = (deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
  };
  if (endDeg - startDeg >= 359.999) {
    const [x1, y1] = toXY(startDeg);
    const [x2, y2] = toXY(startDeg + 180);
    return `M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2} A ${r} ${r} 0 1 1 ${x1} ${y1} Z`;
  }
  const [sx, sy] = toXY(startDeg);
  const [ex, ey] = toXY(endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey} Z`;
};

const outerArcPath = (cx: number, cy: number, r: number, startDeg: number, endDeg: number) => {
  const toXY = (deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
  };
  const [sx, sy] = toXY(startDeg);
  const [ex, ey] = toXY(endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`;
};

/** Wobbly hand-drawn crimp bumps along the outer rim. */
const crimpPath = (cx: number, cy: number, r: number, bumps: number) => {
  const step = 360 / bumps;
  let d = '';
  for (let i = 0; i < bumps; i++) {
    const a0 = i * step;
    const a1 = a0 + step * 0.45;
    const a2 = a0 + step;
    const rad0 = ((a0 - 90) * Math.PI) / 180;
    const rad1 = ((a1 - 90) * Math.PI) / 180;
    const rad2 = ((a2 - 90) * Math.PI) / 180;
    const wobble = (i % 3) * 0.6 - 0.6;
    const x0 = cx + r * Math.cos(rad0);
    const y0 = cy + r * Math.sin(rad0);
    const x1 = cx + (r + 2.5 + wobble) * Math.cos(rad1);
    const y1 = cy + (r + 2.5 + wobble) * Math.sin(rad1);
    const x2 = cx + r * Math.cos(rad2);
    const y2 = cy + r * Math.sin(rad2);
    d += i === 0 ? `M ${x0} ${y0}` : '';
    d += ` Q ${x1} ${y1} ${x2} ${y2}`;
  }
  return `${d} Z`;
};

/** Curved coconut shred strokes inside a wedge. */
const coconutShreds = (
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
  sliceIndex: number,
) => {
  const span = endDeg - startDeg;
  const lines: ReactNode[] = [];
  for (let k = 0; k < 5; k++) {
    const t = 0.22 + k * 0.14;
    const angle = startDeg + span * t + ((sliceIndex + k) % 3) * 1.2;
    const dist = r * (0.32 + (k % 2) * 0.18);
    const rad = ((angle - 90) * Math.PI) / 180;
    const rad2 = ((angle + 8 - (k % 2) * 16 - 90) * Math.PI) / 180;
    const x1 = cx + dist * Math.cos(rad);
    const y1 = cy + dist * Math.sin(rad);
    const x2 = cx + (dist + 14) * Math.cos(rad2);
    const y2 = cy + (dist + 14) * Math.sin(rad2);
    const cx2 = (x1 + x2) / 2 + (k % 2 === 0 ? 3 : -3);
    const cy2 = (y1 + y2) / 2 + (k % 2 === 0 ? -2 : 2);
    lines.push(
      <path
        key={`shred-${sliceIndex}-${k}`}
        d={`M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${cx2.toFixed(1)} ${cy2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`}
        fill="none"
        stroke="var(--buko-coconut)"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity={0.85 - k * 0.05}
      />,
    );
  }
  return lines;
};

export type BukoPieIntent = 'have' | 'owe' | 'neutral';

export interface BukoPieProps {
  num: number;
  den: number;
  /** Rim accent on the pie tin — matches fraction A/B column color. */
  variant?: 'primary' | 'secondary' | 'accent';
  /** Positive = slices you have; negative = slices owed (hatched). */
  intent?: BukoPieIntent;
  className?: string;
  ariaLabel?: string;
}

export const BukoPie = ({
  num,
  den,
  variant = 'primary',
  intent = 'have',
  className = '',
  ariaLabel,
}: BukoPieProps) => {
  const safeDen = Math.max(1, den);
  const slices = Array.from({ length: safeDen }, (_, i) => i);
  const step = 360 / safeDen;
  const filled = Math.max(0, Math.min(num, safeDen));
  const uid = `buko-${variant}-${intent}`;
  const isOwe = intent === 'owe';

  return (
    <svg
      viewBox="0 0 200 200"
      className={`buko-pie w-full max-w-[240px] mx-auto ${className}`.trim()}
      role="img"
      aria-label={ariaLabel ?? `${isOwe ? 'owe ' : ''}${filled} of ${safeDen} buko pie slices`}
      data-variant={variant}
      data-intent={intent}
    >
      <defs>
        <radialGradient id={`${uid}-cream`} cx="42%" cy="38%" r="68%">
          <stop offset="0%" stopColor="var(--buko-cream-light)" />
          <stop offset="55%" stopColor="var(--buko-cream)" />
          <stop offset="100%" stopColor="var(--buko-cream-shadow)" />
        </radialGradient>
        <radialGradient id={`${uid}-taken`} cx="38%" cy="35%" r="72%">
          <stop offset="0%" stopColor={isOwe ? '#ffe8ee' : 'var(--buko-taken-light)'} />
          <stop offset="50%" stopColor={isOwe ? '#ffc8d4' : 'var(--buko-taken)'} />
          <stop offset="100%" stopColor="var(--buko-cream-shadow)" />
        </radialGradient>
        <pattern id={`${uid}-hatch`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--crayon-berry)" strokeWidth="2.5" opacity="0.45" />
        </pattern>
        <linearGradient id={`${uid}-crust`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--buko-crust-light)" />
          <stop offset="100%" stopColor="var(--buko-crust)" />
        </linearGradient>
      </defs>

      {/* Pie tin shadow */}
      <ellipse cx="100" cy="112" rx="86" ry="10" fill="var(--buko-shadow)" opacity="0.35" />

      {/* Tin rim */}
      <circle
        cx="100"
        cy="100"
        r="96"
        fill="none"
        stroke={
          variant === 'primary'
            ? 'var(--buko-rim-primary)'
            : variant === 'accent'
              ? 'var(--buko-rim-accent)'
              : 'var(--buko-rim-secondary)'
        }
        strokeWidth="3.5"
        opacity="0.55"
      />

      {/* Bottom crust plate */}
      <circle cx="100" cy="100" r="90" fill={`url(#${uid}-crust)`} opacity="0.35" />

      {/* Slices — unfilled first, filled on top for a cleaner stack */}
      {slices.map((i) => {
        const taken = i < filled;
        return (
          <g key={`slice-${i}`}>
            <path
              d={sectorPath(100, 100, 86, i * step, (i + 1) * step)}
              fill={taken ? `url(#${uid}-taken)` : 'var(--buko-empty)'}
              stroke="none"
            />
            {taken && isOwe && (
              <path
                d={sectorPath(100, 100, 86, i * step, (i + 1) * step)}
                fill={`url(#${uid}-hatch)`}
                stroke="none"
              />
            )}
          </g>
        );
      })}

      {/* Coconut shreds on taken slices (positive amounts only) */}
      {!isOwe &&
        slices.slice(0, filled).map((i) => (
          <g key={`shreds-${i}`}>{coconutShreds(100, 100, 86, i * step, (i + 1) * step, i)}</g>
        ))}

      {/* Per-slice outer crust cap */}
      {slices.map((i) => (
        <path
          key={`crust-${i}`}
          d={outerArcPath(100, 100, 86, i * step, (i + 1) * step)}
          fill="none"
          stroke={`url(#${uid}-crust)`}
          strokeWidth={i < filled ? 7 : 5}
          strokeLinecap="round"
          opacity={i < filled ? 0.95 : 0.5}
        />
      ))}

      {/* Knife cuts */}
      {den > 1 &&
        slices.map((i) => {
          const rad = ((i * step - 90) * Math.PI) / 180;
          return (
            <line
              key={`cut-${i}`}
              x1="100"
              y1="100"
              x2={100 + 86 * Math.cos(rad)}
              y2={100 + 86 * Math.sin(rad)}
              stroke="var(--buko-cut)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.65"
            />
          );
        })}

      {/* Hand-crimped outer edge */}
      <path
        d={crimpPath(100, 100, 88, 36)}
        fill="none"
        stroke={`url(#${uid}-crust)`}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Inner cream lip */}
      <circle cx="100" cy="100" r="84" fill="none" stroke="var(--buko-cream-light)" strokeWidth="2" opacity="0.5" />

      {/* Center hub where slices meet */}
      <circle cx="100" cy="100" r="5" fill="var(--buko-crust)" stroke="var(--buko-cut)" strokeWidth="1" />

      {/* Gloss highlight — makes the filling look wet/creamy like buko */}
      <ellipse cx="78" cy="72" rx="28" ry="18" fill="white" opacity="0.12" transform="rotate(-18 78 72)" />
    </svg>
  );
};

export default BukoPie;
