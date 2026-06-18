import React from 'react';
import { UnitSuffix } from '../scientific-units/UnitGuideLink';
import type { CrayonColor } from './BarChart';

export interface LinePoint {
  /** Numeric x positions the points to scale; string x treats points as evenly spaced categories. */
  x: number | string;
  y: number;
}

export interface LineSeries {
  /** Series name shown in the legend (only rendered when more than one series). */
  name?: string;
  color?: CrayonColor;
  points: LinePoint[];
}

export interface LineChartProps {
  /** Chart heading shown above the plot. */
  title?: string;
  series: LineSeries[];
  /** Axis captions. */
  xLabel?: string;
  yLabel?: string;
  /** Unit appended to y-axis tick labels, e.g. " psi". */
  unit?: string;
  /** Short attribution shown under the chart. */
  source?: string;
}

const DEFAULT_COLORS: CrayonColor[] = ['sky', 'berry', 'sunshine', 'leaf', 'grape'];

// Internal coordinate system; SVG scales responsively via viewBox.
const W = 340;
const H = 210;
const PAD = { top: 12, right: 16, bottom: 34, left: 46 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

function niceTicks(max: number, count = 4): number[] {
  if (max <= 0) return [0];
  const raw = max / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm >= 5 ? 10 : norm >= 2 ? 5 : norm >= 1 ? 2 : 1) * mag;
  const ticks: number[] = [];
  for (let v = 0; v <= max + step / 2; v += step) ticks.push(Number(v.toFixed(6)));
  return ticks;
}

function formatTick(v: number): string {
  if (Math.abs(v) >= 1000) return v.toLocaleString('en-US');
  return String(Number(v.toFixed(2)));
}

/**
 * A dependency-free, crayon-styled line chart for trends and relationships.
 * Supports one or more series; numeric x values are scaled, string x values
 * are treated as evenly spaced categories.
 * Import directly in MDX: `import { LineChart } from '../../components/content'`.
 */
export const LineChart: React.FC<LineChartProps> = ({ title, series, xLabel, yLabel, unit = '', source }) => {
  const numericX = series.every((s) => s.points.every((p) => typeof p.x === 'number'));

  // x domain
  const categories = numericX ? [] : Array.from(new Set(series.flatMap((s) => s.points.map((p) => String(p.x)))));
  const allX = series.flatMap((s) => s.points.map((p) => (typeof p.x === 'number' ? p.x : categories.indexOf(String(p.x)))));
  const xMin = Math.min(...allX);
  const xMax = Math.max(...allX);
  const xSpan = xMax - xMin || 1;

  // y domain (baseline at 0)
  const yMaxData = Math.max(...series.flatMap((s) => s.points.map((p) => p.y)), 0);
  const ticks = niceTicks(yMaxData);
  const yMax = ticks[ticks.length - 1] || 1;

  const sx = (x: number) => PAD.left + ((x - xMin) / xSpan) * PLOT_W;
  const sy = (y: number) => PAD.top + PLOT_H - (y / yMax) * PLOT_H;

  const xValueOf = (p: LinePoint) => (typeof p.x === 'number' ? p.x : categories.indexOf(String(p.x)));

  // x tick labels: numeric uses the union of x positions; categorical uses category names.
  const xTicks = numericX
    ? Array.from(new Set(allX)).sort((a, b) => a - b).map((v) => ({ pos: v, label: formatTick(v) }))
    : categories.map((c, i) => ({ pos: i, label: c }));

  const showLegend = series.length > 1 && series.some((s) => s.name);

  return (
    <figure className="not-prose my-8 rounded-2xl border border-base-300 bg-base-200 p-5 shadow-sm">
      {title && (
        <figcaption className="mb-4 font-display text-base font-bold text-base-content">
          {title}
          {unit.trim() && (
            <span className="ml-2 inline-flex items-baseline font-normal text-sm text-base-content/70">
              (<UnitSuffix unit={unit} />)
            </span>
          )}
        </figcaption>
      )}
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={title ?? 'Line chart'}>
        {/* y gridlines + labels */}
        {ticks.map((t) => (
          <g key={`y-${t}`}>
            <line x1={PAD.left} y1={sy(t)} x2={W - PAD.right} y2={sy(t)} stroke="currentColor" strokeOpacity={0.12} strokeWidth={1} />
            <text x={PAD.left - 6} y={sy(t)} textAnchor="end" dominantBaseline="middle" className="fill-base-content/60" fontSize={9}>
              {formatTick(t)}
            </text>
          </g>
        ))}
        {/* x ticks + labels */}
        {xTicks.map((t) => (
          <text key={`x-${t.pos}`} x={sx(t.pos)} y={H - PAD.bottom + 14} textAnchor="middle" className="fill-base-content/60" fontSize={9}>
            {t.label}
          </text>
        ))}
        {/* axes */}
        <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + PLOT_H} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} />
        <line x1={PAD.left} y1={PAD.top + PLOT_H} x2={W - PAD.right} y2={PAD.top + PLOT_H} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} />
        {/* series */}
        {series.map((s, i) => {
          const color = `var(--crayon-${s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]})`;
          const pts = [...s.points].sort((a, b) => xValueOf(a) - xValueOf(b));
          const d = pts.map((p) => `${sx(xValueOf(p))},${sy(p.y)}`).join(' ');
          return (
            <g key={s.name ?? i}>
              <polyline points={d} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
              {pts.map((p, j) => (
                <circle key={j} cx={sx(xValueOf(p))} cy={sy(p.y)} r={3} fill={color} />
              ))}
            </g>
          );
        })}
        {xLabel && (
          <text x={PAD.left + PLOT_W / 2} y={H - 2} textAnchor="middle" className="fill-base-content/70" fontSize={9}>
            {xLabel}
          </text>
        )}
        {yLabel && (
          <text x={12} y={PAD.top + PLOT_H / 2} textAnchor="middle" className="fill-base-content/70" fontSize={9} transform={`rotate(-90 12 ${PAD.top + PLOT_H / 2})`}>
            {yLabel}
          </text>
        )}
      </svg>
      {showLegend && (
        <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1">
          {series.map((s, i) => (
            <li key={s.name ?? i} className="flex items-center gap-2 text-sm text-base-content/80">
              <span
                className="inline-block h-3 w-3 shrink-0 rounded-[3px]"
                style={{ backgroundColor: `var(--crayon-${s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]})` }}
                aria-hidden="true"
              />
              {s.name}
            </li>
          ))}
        </ul>
      )}
      {source && <p className="mt-4 text-xs text-base-content/60">Source: {source}</p>}
    </figure>
  );
};

export default LineChart;
