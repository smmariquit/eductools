import React from 'react';

export type TableCell = string | number;

export interface TableProps {
  /** Table heading shown above the table. */
  title?: string;
  /** Column headers, left to right. */
  columns: string[];
  /** Rows of cells, each row matching the column count. */
  rows: TableCell[][];
  /** Short attribution shown under the table. */
  source?: string;
  /**
   * Per-column alignment. Defaults to left for the first column and right for
   * the rest (the usual label-then-numbers layout). Pass to override.
   */
  align?: ('left' | 'right' | 'center')[];
}

/**
 * A crayon-styled reference table for multi-attribute data where looking up
 * values matters more than comparing magnitudes.
 * Import directly in MDX: `import { Table } from '../../components/content'`.
 */
export const Table: React.FC<TableProps> = ({ title, columns, rows, source, align }) => {
  const alignOf = (col: number): 'left' | 'right' | 'center' =>
    align?.[col] ?? (col === 0 ? 'left' : 'right');

  const alignClass: Record<'left' | 'right' | 'center', string> = {
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
  };

  return (
    <figure className="not-prose my-8 rounded-2xl border border-base-300 bg-base-200 p-5 shadow-sm">
      {title && <figcaption className="mb-4 font-display text-base font-bold text-base-content">{title}</figcaption>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-base-300">
              {columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={`px-3 py-2 font-display text-xs font-bold uppercase tracking-wide text-base-content/70 ${alignClass[alignOf(i)]}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="border-b border-base-300/60 last:border-0">
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={`px-3 py-2 ${alignClass[alignOf(c)]} ${
                      c === 0 ? 'font-medium text-base-content' : 'font-mono text-base-content/80'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {source && <p className="mt-4 text-xs text-base-content/60">Source: {source}</p>}
    </figure>
  );
};

export default Table;
