import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { GuidedInputFlow, useTouchedFields } from '../../components/onboarding';
import { BukoFractionViz } from '../../components/visualizers/BukoFractionViz';
import {
  addFractions,
  equivalents,
  fractionKind,
  lcm,
  scaleToDenominator,
  simplify,
  toMixed,
  minusSign,
} from '../../utils/fractions';

const NUM_MIN = -24;
const NUM_MAX = 24;
const DEN_MAX = 12;

const DEFAULTS = { numA: 1, denA: 2, numB: 1, denB: 3 };

const kindLabel: Record<ReturnType<typeof fractionKind>, string> = {
  zero: 'Zero',
  whole: 'Whole number',
  proper: 'Proper fraction',
  improper: 'Improper fraction',
};

const FractionNotation = ({
  n,
  d,
  accent,
  size = 'lg',
}: {
  n: number;
  d: number;
  accent: string;
  size?: 'lg' | 'md';
}) => {
  const text = size === 'lg' ? 'text-4xl' : 'text-2xl';
  const sign = n < 0 ? '−' : '';
  const absN = Math.abs(n);
  return (
    <div className={`flex flex-col items-center font-black font-mono leading-none ${text}`}>
      <span className={accent}>{sign}{absN}</span>
      <span className="border-t-4 border-base-content w-full text-center my-0.5" />
      <span className="text-base-content/80">{d}</span>
    </div>
  );
};

const MixedNotation = ({
  n,
  d,
  accent,
  size = 'lg',
}: {
  n: number;
  d: number;
  accent: string;
  size?: 'lg' | 'md';
}) => {
  const mixed = toMixed(n, d);
  const text = size === 'lg' ? 'text-3xl' : 'text-xl';
  const fracText = size === 'lg' ? 'text-4xl' : 'text-2xl';

  if (mixed.whole === 0 && mixed.num === 0) {
    return <span className={`font-black font-mono ${text} ${accent}`}>0</span>;
  }

  return (
    <div className={`flex items-center gap-2 font-black font-mono ${text}`}>
      {mixed.sign < 0 && <span className={accent}>−</span>}
      {mixed.whole > 0 && <span className={accent}>{mixed.whole}</span>}
      {mixed.num > 0 && (
        <div className={`flex flex-col items-center leading-none ${fracText}`}>
          <span className={accent}>{mixed.num}</span>
          <span className="border-t-4 border-base-content w-full text-center my-0.5" />
          <span className="text-base-content/80">{mixed.den}</span>
        </div>
      )}
      {mixed.whole > 0 && mixed.num === 0 && (
        <span className="text-base-content/50 text-sm font-semibold">(whole)</span>
      )}
    </div>
  );
};

const FractionsVisualizer = () => {
  const [numA, setNumA] = useState(DEFAULTS.numA);
  const [denA, setDenA] = useState(DEFAULTS.denA);
  const [numB, setNumB] = useState(DEFAULTS.numB);
  const [denB, setDenB] = useState(DEFAULTS.denB);
  const fields = useTouchedFields<'a' | 'b'>();
  const ready = fields.isTouched('a') && fields.isTouched('b');

  const reset = () => {
    setNumA(DEFAULTS.numA);
    setDenA(DEFAULTS.denA);
    setNumB(DEFAULTS.numB);
    setDenB(DEFAULTS.denB);
    fields.reset();
  };

  const fillExample = () => {
    setNumA(DEFAULTS.numA);
    setDenA(DEFAULTS.denA);
    setNumB(DEFAULTS.numB);
    setDenB(DEFAULTS.denB);
    fields.touchAll(['a', 'b']);
  };

  const sA = simplify(numA, denA);
  const sB = simplify(numB, denB);
  const valA = numA / denA;
  const valB = numB / denB;

  const left = numA * denB;
  const right = numB * denA;
  const cmp = left === right ? '=' : left > right ? '>' : '<';

  const commonDen = lcm(denA, denB);
  const scaledA = scaleToDenominator(numA, denA, commonDen);
  const scaledB = scaleToDenominator(numB, denB, commonDen);
  const sum = addFractions({ n: numA, d: denA }, { n: numB, d: denB });
  const sumMixed = toMixed(sum.n, sum.d);

  const renderFractionSliders = (
    num: number,
    den: number,
    setNum: (v: number) => void,
    setDen: (v: number) => void,
    idPrefix: string,
    touchKey: 'a' | 'b',
    colorClass: 'primary' | 'secondary',
  ) => (
    <div className="space-y-3 pt-1">
      <Slider
        id={`${idPrefix}-num`}
        motif="fraction"
        label="Numerator (signed — negative = owe pie)"
        value={num}
        min={NUM_MIN}
        max={NUM_MAX}
        colorClass={colorClass}
        onChange={(e) => { setNum(Number(e.target.value)); fields.touch(touchKey); }}
        aria-valuetext={`${num} of ${den} parts${num < 0 ? ', owed' : ''}`}
      />
      <Slider
        id={`${idPrefix}-den`}
        motif="denominator"
        label="Denominator"
        value={den}
        min={1}
        max={DEN_MAX}
        colorClass={colorClass === 'primary' ? 'secondary' : 'primary'}
        onChange={(e) => {
          setDen(Number(e.target.value));
          fields.touch(touchKey);
        }}
        aria-valuetext={`cut into ${den} equal parts`}
      />
    </div>
  );

  const renderColumn = (
    label: string,
    num: number,
    den: number,
    setNum: (v: number) => void,
    setDen: (v: number) => void,
    accent: string,
    idPrefix: string,
    simp: { n: number; d: number },
    value: number,
    touchKey: 'a' | 'b',
    variant: 'primary' | 'secondary',
    colorClass: 'primary' | 'secondary',
  ) => {
    const kind = fractionKind(num, den);
    return (
      <div className="rounded-xl border border-base-300 bg-base-200/40 p-5 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className={`font-display text-lg font-bold m-0 ${accent}`}>{label}</h2>
          <span className="badge badge-outline badge-sm">{kindLabel[kind]}</span>
        </div>

        <BukoFractionViz num={num} den={den} variant={variant} />

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-base-300 bg-base-100/80 p-3 text-center">
            <div className="text-tool-caption uppercase tracking-wider font-bold text-base-content/50 mb-2">Improper</div>
            <FractionNotation n={num} d={den} accent={accent} />
          </div>
          <div className="rounded-lg border border-base-300 bg-base-100/80 p-3 text-center">
            <div className="text-tool-caption uppercase tracking-wider font-bold text-base-content/50 mb-2">Mixed</div>
            <MixedNotation n={num} d={den} accent={accent} />
          </div>
        </div>

        <div className="text-sm text-base-content/70 space-y-1 text-center sm:text-left">
          <div>Decimal ≈ <span className="font-mono font-bold">{value.toFixed(3)}</span></div>
          <div>
            Simplest: <span className="font-mono font-bold">{simp.n}/{simp.d}</span>
            {num < 0 && <span className="text-base-content/50"> (negative)</span>}
          </div>
        </div>

        <div>
          <div className="text-tool-caption uppercase tracking-wider font-bold text-base-content/50 mb-1">Equivalent fractions</div>
          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
            {equivalents(simp.n, simp.d).map((eq) => (
              <span key={`${eq.n}/${eq.d}`} className="badge badge-outline font-mono">{eq.n}/{eq.d}</span>
            ))}
          </div>
        </div>

        {renderFractionSliders(num, den, setNum, setDen, idPrefix, touchKey, colorClass)}
      </div>
    );
  };

  return (
    <VisualizerLayout
      title="Hatig-bilang (Fractions Visualizer)"
      description="Slice buko pies to compare, add, and rename fractions — proper, improper, mixed, and negative."
      adSlotId="1010"
      guideLink="/blog/fractions"
    >
      {!ready ? (
        <GuidedInputFlow
          intro="Build two signed fractions (numerator can be negative or larger than the denominator). Then compare them, add them with a common denominator, and see improper and mixed forms."
          onFillExample={fillExample}
          onReset={reset}
          steps={[
            {
              id: 'a',
              title: 'Build fraction A',
              helper: 'Numerator −24 to 24; denominator 1 to 12. Try 7/4 or −3/8.',
              complete: fields.isTouched('a'),
              children: renderFractionSliders(numA, denA, setNumA, setDenA, 'fracA', 'a', 'primary'),
            },
            {
              id: 'b',
              title: 'Build fraction B',
              helper: 'Set a second fraction to compare or add.',
              complete: fields.isTouched('b'),
              children: renderFractionSliders(numB, denB, setNumB, setDenB, 'fracB', 'b', 'secondary'),
            },
          ]}
        />
      ) : (
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body p-6 md:p-8 flex flex-col gap-6">

            <div className="grid md:grid-cols-2 gap-6">
              {renderColumn('Fraction A', numA, denA, setNumA, setDenA, 'text-primary', 'fracA', sA, valA, 'a', 'primary', 'primary')}
              {renderColumn('Fraction B', numB, denB, setNumB, setDenB, 'text-secondary', 'fracB', sB, valB, 'b', 'secondary', 'secondary')}
            </div>

            <div className="rounded-xl border-2 border-accent/30 bg-accent/5 p-5">
              <h3 className="font-display font-bold text-accent m-0 mb-3 text-center">Which amount is bigger?</h3>
              <div className="flex flex-wrap items-center justify-center gap-3 text-2xl md:text-3xl font-black font-mono">
                <FractionNotation n={numA} d={denA} accent="text-primary" size="md" />
                <span className="text-accent text-4xl">{cmp}</span>
                <FractionNotation n={numB} d={denB} accent="text-secondary" size="md" />
              </div>
              <p className="text-sm text-base-content/70 text-center mt-3 m-0 max-w-prose mx-auto">
                Cross-multiply: {numA}×{denB} = {left} and {numB}×{denA} = {right}, so {numA}/{denA} {cmp} {numB}/{denB}.
              </p>
            </div>

            <div className="rounded-xl border-2 border-success/30 bg-success/5 p-5">
              <h3 className="font-display font-bold text-success m-0 mb-2 text-center">Add the fractions</h3>
              <p className="text-sm text-base-content/70 text-center m-0 mb-4 max-w-prose mx-auto">
                Rename both to slices of size 1/{commonDen}, then add the numerators. Hatched slices mean a negative amount (pie owed).
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 text-xl md:text-2xl font-black font-mono mb-4">
                <FractionNotation n={numA} d={denA} accent="text-primary" size="md" />
                <span className="text-success">+</span>
                <FractionNotation n={numB} d={denB} accent="text-secondary" size="md" />
                <span className="text-success">=</span>
                <FractionNotation n={sum.n} d={sum.d} accent="text-success" size="md" />
              </div>

              <div className="rounded-lg border border-base-300 bg-base-100/90 p-4 mb-4 font-mono text-sm text-base-content/80 space-y-1 max-w-lg mx-auto">
                <p className="m-0">LCD({denA}, {denB}) = {commonDen}</p>
                <p className="m-0">
                  {numA}/{denA} = {scaledA}/{commonDen}
                  {' '}and {numB}/{denB} = {scaledB}/{commonDen}
                </p>
                <p className="m-0">
                  {scaledA}/{commonDen} + {scaledB}/{commonDen} = {scaledA + scaledB}/{commonDen}
                  {' '}= {sum.n}/{sum.d}
                  {sumMixed.whole > 0 || sumMixed.num > 0 ? (
                    <>
                      {' '}= {minusSign(sumMixed.sign)}
                      {sumMixed.whole > 0 ? `${sumMixed.whole}` : ''}
                      {sumMixed.num > 0 ? ` ${sumMixed.num}/${sumMixed.den}` : ''}
                      {' '}(mixed)
                    </>
                  ) : null}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 max-w-xl mx-auto items-end">
                <div className="text-center">
                  <BukoFractionViz num={scaledA} den={commonDen} variant="primary" compact />
                  <div className="font-mono text-sm font-bold text-primary mt-1">{scaledA}/{commonDen}</div>
                </div>
                <div className="text-center text-success font-black text-2xl pb-8">+</div>
                <div className="text-center">
                  <BukoFractionViz num={scaledB} den={commonDen} variant="secondary" compact />
                  <div className="font-mono text-sm font-bold text-secondary mt-1">{scaledB}/{commonDen}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-success/20 flex flex-col items-center gap-2">
                <div className="font-display font-bold text-success">Sum</div>
                <BukoFractionViz num={sum.n} den={sum.d} variant="accent" />
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <FractionNotation n={sum.n} d={sum.d} accent="text-success" size="md" />
                  <MixedNotation n={sum.n} d={sum.d} accent="text-success" size="md" />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
            </div>
          </div>
        </div>
      )}
    </VisualizerLayout>
  );
};

export default FractionsVisualizer;
