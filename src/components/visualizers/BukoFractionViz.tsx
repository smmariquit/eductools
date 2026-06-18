import { BukoPie, type BukoPieIntent } from './BukoPie';

export interface BukoFractionVizProps {
  /** Signed numerator (may exceed denominator). */
  num: number;
  den: number;
  variant?: 'primary' | 'secondary' | 'accent';
  /** Smaller pies for addition row. */
  compact?: boolean;
  className?: string;
}

const MAX_WHOLE_PIES = 3;

/** Whole pies plus a remainder slice — handles proper, improper, and negative amounts. */
export const BukoFractionViz = ({
  num,
  den,
  variant = 'primary',
  compact = false,
  className = '',
}: BukoFractionVizProps) => {
  const safeDen = Math.max(1, den);
  const absNum = Math.abs(num);
  const intent: BukoPieIntent = num < 0 ? 'owe' : 'have';
  const wholes = Math.floor(absNum / safeDen);
  const partial = absNum % safeDen;
  const hiddenWholes = Math.max(0, wholes - MAX_WHOLE_PIES);
  const shownWholes = Math.min(wholes, MAX_WHOLE_PIES);

  const pies: { key: string; filled: number; label: string }[] = [];

  for (let i = 0; i < shownWholes; i++) {
    pies.push({ key: `w-${i}`, filled: safeDen, label: 'whole pie' });
  }
  if (partial > 0) {
    pies.push({ key: 'partial', filled: partial, label: `${partial} of ${safeDen} slices` });
  }
  if (absNum === 0) {
    pies.push({ key: 'empty', filled: 0, label: 'empty pie' });
  }

  const sizeClass = compact ? 'max-w-[108px]' : 'max-w-[168px]';

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`.trim()}>
      <div className="flex flex-wrap justify-center items-end gap-2">
        {pies.map((p) => (
          <BukoPie
            key={p.key}
            num={p.filled}
            den={safeDen}
            variant={variant}
            intent={intent}
            className={sizeClass}
            ariaLabel={`${num < 0 ? 'owe ' : ''}${p.label}`}
          />
        ))}
      </div>
      {hiddenWholes > 0 && (
        <span className="badge badge-outline badge-sm font-mono">
          +{hiddenWholes} whole {hiddenWholes === 1 ? 'pie' : 'pies'}
        </span>
      )}
    </div>
  );
};

export default BukoFractionViz;
