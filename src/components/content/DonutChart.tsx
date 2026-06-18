import React from 'react';
import { UnitSuffix } from '../scientific-units/UnitGuideLink';
import type { CrayonColor } from './BarChart';

export interface DonutDatum {
  label: string;
  value: number;
  color?: CrayonColor;
}

export interface DonutChartProps {
  /** Chart heading shown above the donut. */
  title?: string;
  data: DonutDatum[];
  /** Unit appended to each value in the legend, e.g. "%". */
  unit?: string;
  /** Short attribution shown under the chart, e.g. "USGS (2024)". */
  source?: string;
}

const DEFAULT_COLORS: CrayonColor[] = ['sky', 'berry', 'sunshine', 'leaf', 'grape'];

/**
 * A dependency-free, crayon-styled donut chart for part-of-a-whole data.
 * Slices are sized exactly by each datum's share of the total.
 * Import directly in MDX: `import { DonutChart } from '../../components/content'`.
 */
export const DonutChart: React.FC<DonutChartProps> = ({ title, data, unit = '', source }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  let accumulated = 0;
  const slices = data.map((d, i) => {
    const color = d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
    const pct = (d.value / total) * 100;
    const slice = { color, pct, offset: -accumulated, label: d.label, value: d.value };
    accumulated += pct;
    return slice;
  });

  const ariaLabel = `${title ? `${title}. ` : ''}${data
    .map((d) => `${d.label}: ${d.value}${unit}`)
    .join(', ')}`;

  return (
    <figure className="not-prose my-8 rounded-2xl border border-base-300 bg-base-200 p-5 shadow-sm">
      {title && <figcaption className="mb-4 font-display text-base font-bold text-base-content">{title}</figcaption>}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <svg
          viewBox="0 0 40 40"
          className="h-40 w-40 shrink-0"
          role="img"
          aria-label={ariaLabel}
        >
          <g transform="rotate(-90 20 20)">
            <circle cx="20" cy="20" r="16" fill="none" className="stroke-base-300" strokeWidth="8" />
            {slices.map((s) => (
              <circle
                key={s.label}
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke={`var(--crayon-${s.color})`}
                strokeWidth="8"
                pathLength={100}
                strokeDasharray={`${s.pct} ${100 - s.pct}`}
                strokeDashoffset={s.offset}
              />
            ))}
          </g>
        </svg>
        <ul className="flex w-full flex-col gap-2">
          {slices.map((s) => (
            <li key={s.label} className="flex items-center gap-2 text-sm">
              <span
                className="inline-block h-3 w-3 shrink-0 rounded-[3px]"
                style={{ backgroundColor: `var(--crayon-${s.color})` }}
                aria-hidden="true"
              />
              <span className="flex-1 text-base-content/80">{s.label}</span>
              <span className="shrink-0 font-mono text-sm font-bold text-base-content inline-flex items-baseline gap-0.5">
                {s.value}
                <UnitSuffix unit={unit} />
              </span>
            </li>
          ))}
        </ul>
      </div>
      {source && <p className="mt-4 text-xs text-base-content/60">Source: {source}</p>}
    </figure>
  );
};

export default DonutChart;
