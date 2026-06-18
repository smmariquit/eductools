import React from 'react';

export type CrayonColor = 'ink' | 'sky' | 'berry' | 'sunshine' | 'leaf' | 'grape';

export interface BarDatum {
  label: string;
  value: number;
  color?: CrayonColor;
}

export interface BarChartProps {
  /** Chart heading shown above the bars. */
  title?: string;
  data: BarDatum[];
  /** Unit appended to value labels, e.g. "%". */
  unit?: string;
  /** Max value for scaling. Defaults to the largest datum (use 100 for percentages). */
  max?: number;
  /** Short attribution shown under the chart, e.g. "EDCOM 2 (2026)". */
  source?: string;
}

const DEFAULT_COLORS: CrayonColor[] = ['sky', 'berry', 'sunshine', 'leaf', 'grape'];

/**
 * A dependency-free, crayon-styled horizontal bar chart for article writeups.
 * Import directly in MDX: `import { BarChart } from '../../components/content'`.
 */
export const BarChart: React.FC<BarChartProps> = ({ title, data, unit = '', max, source }) => {
  const ceiling = max ?? (Math.max(...data.map((d) => d.value), 0) || 1);

  return (
    <figure className="not-prose my-8 rounded-2xl border border-base-300 bg-base-200 p-5 shadow-sm">
      {title && <figcaption className="mb-4 font-display text-base font-bold text-base-content">{title}</figcaption>}
      <div className="flex flex-col gap-3">
        {data.map((d, i) => {
          const color = d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
          const pct = Math.max(0, Math.min(100, (d.value / ceiling) * 100));
          return (
            <div key={d.label} className="grid grid-cols-[10rem_1fr] items-center gap-3 max-sm:grid-cols-1 max-sm:gap-1">
              <span className="text-sm text-base-content/80">{d.label}</span>
              <div className="flex items-center gap-2">
                <div className="h-5 flex-1 overflow-hidden rounded-full bg-base-300/50">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: `var(--crayon-${color})` }}
                    role="img"
                    aria-label={`${d.label}: ${d.value}${unit}`}
                  />
                </div>
                <span className="w-14 shrink-0 text-right font-mono text-sm font-bold text-base-content">
                  {d.value}
                  {unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {source && <p className="mt-4 text-xs text-base-content/60">Source: {source}</p>}
    </figure>
  );
};

export default BarChart;
