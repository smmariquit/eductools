import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { GuidedInputFlow, useTouchedFields } from '../../components/onboarding';

const DEFAULTS = { numA: 1, denA: 2, numB: 2, denB: 3 };

const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
};

// One pie slice as an SVG sector path. Angles start at the top and go clockwise.
const sectorPath = (cx: number, cy: number, r: number, startDeg: number, endDeg: number) => {
  const toXY = (deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  if (endDeg - startDeg >= 359.999) {
    // full circle: two arcs so the path is valid
    const [x1, y1] = toXY(startDeg);
    const [x2, y2] = toXY(startDeg + 180);
    return `M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2} A ${r} ${r} 0 1 1 ${x1} ${y1} Z`;
  }
  const [sx, sy] = toXY(startDeg);
  const [ex, ey] = toXY(endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey} Z`;
};

const Pie = ({ num, den, fillClass }: { num: number; den: number; fillClass: string }) => {
  const slices = Array.from({ length: den }, (_, i) => i);
  const step = 360 / den;
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[220px] mx-auto" role="img" aria-label={`${num} of ${den} slices filled`}>
      {/* empty pie base */}
      <circle cx="100" cy="100" r="92" className="text-base-200" fill="currentColor" />
      {slices.map((i) => (
        <path
          key={`s-${i}`}
          d={sectorPath(100, 100, 90, i * step, (i + 1) * step)}
          className={i < num ? fillClass : 'text-base-300'}
          fill="currentColor"
          fillOpacity={i < num ? 0.85 : 0.25}
        />
      ))}
      {/* slice dividers */}
      {den > 1 && slices.map((i) => {
        const rad = ((i * step - 90) * Math.PI) / 180;
        return (
          <line
            key={`l-${i}`}
            x1="100" y1="100"
            x2={100 + 90 * Math.cos(rad)} y2={100 + 90 * Math.sin(rad)}
            className="text-base-100" stroke="currentColor" strokeWidth="1.5"
          />
        );
      })}
      {/* crust ring */}
      <circle cx="100" cy="100" r="90" fill="none" className="text-warning" stroke="currentColor" strokeWidth="6" strokeOpacity="0.7" />
    </svg>
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

  const simplify = (n: number, d: number) => {
    const g = gcd(n, d);
    return { n: n / g, d: d / g, g };
  };

  const sA = simplify(numA, denA);
  const sB = simplify(numB, denB);
  const valA = numA / denA;
  const valB = numB / denB;

  // Compare with cross multiplication so there is no rounding error.
  const left = numA * denB;
  const right = numB * denA;
  const cmp = left === right ? '=' : left > right ? '>' : '<';

  const equivalents = (n: number, d: number) =>
    [1, 2, 3, 4].map((k) => ({ n: n * k, d: d * k }));

  const renderFractionSliders = (
    num: number,
    den: number,
    setNum: (v: number) => void,
    setDen: (v: number) => void,
    idPrefix: string,
    touchKey: 'a' | 'b',
  ) => (
    <div className="space-y-3 pt-1">
      <Slider
        id={`${idPrefix}-num`}
        motif="fraction"
        label="Numerator"
        value={num}
        min={0}
        max={den}
        colorClass="primary"
        onChange={(e) => { setNum(Number(e.target.value)); fields.touch(touchKey); }}
        aria-valuetext={`${num} of ${den} parts`}
      />
      <Slider
        id={`${idPrefix}-den`}
        motif="denominator"
        label="Denominator"
        value={den}
        min={1}
        max={12}
        colorClass="secondary"
        onChange={(e) => {
          const v = Number(e.target.value);
          setDen(v);
          if (num > v) setNum(v);
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
    simp: { n: number; d: number; g: number },
    value: number,
    touchKey: 'a' | 'b',
  ) => (
    <div className="rounded-xl border border-base-300 bg-base-200/40 p-5 flex flex-col gap-4">
      <h2 className={`font-display text-lg font-bold m-0 ${accent}`}>{label}</h2>

      <Pie num={Math.min(num, den)} den={den} fillClass={accent} />

      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center text-4xl font-black font-mono leading-none">
          <span className={accent}>{num}</span>
          <span className="border-t-4 border-base-content w-full text-center my-1" />
          <span className="text-base-content/80">{den}</span>
        </div>
        <div className="text-sm text-base-content/70 space-y-1">
          <div>= <span className="font-mono font-bold">{value.toFixed(3)}</span></div>
          <div>
            simplest: <span className="font-mono font-bold">{simp.n}/{simp.d}</span>
            {simp.g > 1 && <span className="text-base-content/50"> (÷{simp.g})</span>}
          </div>
        </div>
      </div>

      {/* equivalence chain */}
      <div>
        <div className="text-xs uppercase tracking-wider font-bold text-base-content/50 mb-1">Equivalent fractions</div>
        <div className="flex flex-wrap gap-1.5">
          {equivalents(simp.n, simp.d).map((eq) => (
            <span key={`${eq.n}/${eq.d}`} className="badge badge-outline font-mono">{eq.n}/{eq.d}</span>
          ))}
        </div>
      </div>

      {renderFractionSliders(num, den, setNum, setDen, idPrefix, touchKey)}
    </div>
  );

  return (
    <VisualizerLayout
      title="Hatig-bilang (Fractions Visualizer)"
      description="Slice two buko pies to compare fractions, see equivalent forms, and reduce each one to its simplest terms."
      adSlotId="1010"
      guideLink="/blog/fractions"
    >
      {!ready ? (
        <GuidedInputFlow
          intro="Set two fractions to compare them, see equivalent forms, and reduce each to simplest terms."
          onFillExample={fillExample}
          onReset={reset}
          steps={[
            { id: 'a', title: 'Build fraction A', helper: 'Set its numerator and denominator (up to 12).', complete: fields.isTouched('a'), children: renderFractionSliders(numA, denA, setNumA, setDenA, 'fracA', 'a') },
            { id: 'b', title: 'Build fraction B', helper: 'Set its numerator and denominator (up to 12).', complete: fields.isTouched('b'), children: renderFractionSliders(numB, denB, setNumB, setDenB, 'fracB', 'b') },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col gap-6">

          <div className="grid md:grid-cols-2 gap-6">
            {renderColumn('Fraction A', numA, denA, setNumA, setDenA, 'text-primary', 'fracA', sA, valA, 'a')}
            {renderColumn('Fraction B', numB, denB, setNumB, setDenB, 'text-secondary', 'fracB', sB, valB, 'b')}
          </div>

          {/* Comparison */}
          <div className="rounded-xl border-2 border-accent/30 bg-accent/5 p-5">
            <h3 className="font-display font-bold text-accent m-0 mb-3 text-center">Which slice is bigger?</h3>
            <div className="flex items-center justify-center gap-4 text-3xl font-black font-mono">
              <span className="text-primary">{numA}/{denA}</span>
              <span className="text-accent text-4xl">{cmp}</span>
              <span className="text-secondary">{numB}/{denB}</span>
            </div>
            <p className="text-sm text-base-content/70 text-center mt-3 m-0">
              Cross-multiply to compare without rounding: {numA}×{denB} = {left} and {numB}×{denA} = {right}, so {numA}/{denA} {cmp} {numB}/{denB}.
            </p>
          </div>

          <div className="flex justify-end">
            <button className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
          </div>

        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default FractionsVisualizer;
