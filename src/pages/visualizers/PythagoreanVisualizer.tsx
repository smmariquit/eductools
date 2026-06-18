import { useState, useRef, useEffect, useCallback } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { GuidedInputFlow, useTouchedFields } from '../../components/onboarding';

const DEFAULT_A = 3;
const DEFAULT_B = 4;
const ANIM_MS = 1300;

type Pt = [number, number];

const TRIPLES: { label: string; a: number; b: number }[] = [
  { label: '3-4-5', a: 3, b: 4 },
  { label: '5-12-13', a: 5, b: 12 },
  { label: '6-8-10', a: 6, b: 8 },
  { label: '7-7', a: 7, b: 7 },
];

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const easeInOut = (k: number) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
const lerp = (p: Pt, q: Pt, t: number): Pt => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];

const PythagoreanVisualizer = () => {
  const [sideA, setSideA] = useState(DEFAULT_A);
  const [sideB, setSideB] = useState(DEFAULT_B);
  // 0 = squares on the legs (a² + b²), 1 = single square on the hypotenuse (c²)
  const [t, setT] = useState(0);
  const rafRef = useRef<number | null>(null);
  const fields = useTouchedFields<'a' | 'b'>();
  const ready = fields.isTouched('a') && fields.isTouched('b');

  const sideC = Math.sqrt(sideA * sideA + sideB * sideB);
  const areaA = sideA * sideA;
  const areaB = sideB * sideB;
  const areaC = areaA + areaB;

  const stop = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const play = useCallback(() => {
    stop();
    if (reducedMotion()) {
      setT((prev) => (prev >= 1 ? 0 : 1));
      return;
    }
    const goingForward = t < 1;
    const begin = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - begin) / ANIM_MS);
      const e = easeInOut(k);
      setT(goingForward ? e : 1 - e);
      if (k < 1) rafRef.current = requestAnimationFrame(tick);
      else rafRef.current = null;
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [stop, t]);

  useEffect(() => stop, [stop]);

  const reset = () => {
    stop();
    setSideA(DEFAULT_A);
    setSideB(DEFAULT_B);
    setT(0);
    fields.reset();
  };

  const fillExample = () => {
    setSideA(3);
    setSideB(4);
    fields.touchAll(['a', 'b']);
  };

  // ---- Geometry (a big square of side a+b holds four congruent right triangles) ----
  // At t=0 the leftover space is two squares a² and b²; at t=1 it is one tilted
  // square c². The four triangles slide (pure translation) between the two layouts,
  // so equal area is preserved the whole way: a² + b² = c².
  const a = sideA;
  const b = sideB;
  const S = a + b;
  const PAD = 30;
  const BOX = 300;
  const scale = BOX / S;
  const px = (x: number) => PAD + x * scale;
  const poly = (pts: Pt[]) => pts.map((p) => `${px(p[0])},${px(p[1])}`).join(' ');

  // Each triangle keeps its orientation, so start → end is a straight slide.
  const triangles: { start: Pt[]; end: Pt[] }[] = [
    { start: [[a, 0], [S, 0], [a, a]], end: [[0, 0], [b, 0], [0, a]] },
    { start: [[S, a], [a, a], [S, 0]], end: [[S, S], [a, S], [S, b]] },
    { start: [[a, a], [a, S], [0, a]], end: [[S, 0], [S, b], [b, 0]] },
    { start: [[0, S], [0, a], [a, S]], end: [[0, S], [0, a], [a, S]] },
  ];

  const cSquare: Pt[] = [[b, 0], [S, b], [a, S], [0, a]];
  const labelOpacityLegs = Math.max(0, 1 - t * 1.4);
  const labelOpacityHyp = Math.max(0, (t - 0.3) / 0.7);
  const phase = t < 0.05 ? 'legs' : t > 0.95 ? 'hyp' : 'moving';

  const pct = Math.round(t * 100);
  const aTriple = TRIPLES.find((tr) => tr.a === sideA && tr.b === sideB);

  const sliderA = (
    <Slider
      id="pyth-a"
      motif="length"
      label={<>Side <span className="text-error font-bold">a</span></>}
      value={sideA}
      min={1}
      max={12}
      step={1}
      colorClass="error"
      onChange={(e) => { setSideA(Number(e.target.value)); fields.touch('a'); }}
      aria-valuetext={`Leg a is ${sideA} units`}
    />
  );

  const sliderB = (
    <Slider
      id="pyth-b"
      motif="length"
      label={<>Side <span className="text-success font-bold">b</span></>}
      value={sideB}
      min={1}
      max={12}
      step={1}
      colorClass="success"
      onChange={(e) => { setSideB(Number(e.target.value)); fields.touch('b'); }}
      aria-valuetext={`Leg b is ${sideB} units`}
    />
  );

  return (
    <VisualizerLayout
      title="Pythagorean Theorem (Teorema ni Pythagoras)"
      description="Drag or play the rearrangement to watch the squares on the two legs slide together into the square on the hypotenuse, showing a² + b² = c²."
      adSlotId="2018"
      guideLink="/blog/pythagorean"
    >
      {!ready ? (
        <GuidedInputFlow
          intro="Set the two shorter sides (legs) of a right triangle, then watch the squares rearrange to prove a² + b² = c²."
          onFillExample={fillExample}
          onReset={reset}
          steps={[
            { id: 'a', title: 'Choose side a', helper: 'The first leg, from 1 to 12 units.', complete: fields.isTouched('a'), children: sliderA },
            { id: 'b', title: 'Choose side b', helper: 'The second leg, from 1 to 12 units.', complete: fields.isTouched('b'), children: sliderB },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          {/* Diagram */}
          <div className="flex-1 min-w-0">
            <div className="rounded-xl border-2 border-base-300 bg-base-200 p-4">
              <svg
                viewBox={`0 0 ${BOX + 2 * PAD} ${BOX + 2 * PAD}`}
                className="w-full h-auto"
                role="img"
                aria-label={`Dissection proof, ${pct}% rearranged from two leg squares into one hypotenuse square`}
              >
                {/* containing (a+b) square */}
                <rect
                  x={px(0)}
                  y={px(0)}
                  width={S * scale}
                  height={S * scale}
                  fill="none"
                  className="text-base-content"
                  stroke="currentColor"
                  strokeOpacity="0.25"
                  strokeWidth="1.5"
                />

                {/* a² square (fades out as the pieces move) */}
                {labelOpacityLegs > 0 && (
                  <g className="text-error" opacity={labelOpacityLegs}>
                    <rect x={px(0)} y={px(0)} width={a * scale} height={a * scale} fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
                    <text x={px(a / 2)} y={px(a / 2)} textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="bold" fill="currentColor">a² = {areaA}</text>
                  </g>
                )}

                {/* b² square */}
                {labelOpacityLegs > 0 && (
                  <g className="text-success" opacity={labelOpacityLegs}>
                    <rect x={px(a)} y={px(a)} width={b * scale} height={b * scale} fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
                    <text x={px(a + b / 2)} y={px(a + b / 2)} textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="bold" fill="currentColor">b² = {areaB}</text>
                  </g>
                )}

                {/* c² tilted square (fades in) */}
                {labelOpacityHyp > 0 && (
                  <g className="text-info" opacity={labelOpacityHyp}>
                    <polygon points={poly(cSquare)} fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="2" />
                    <text x={px(S / 2)} y={px(S / 2)} textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="bold" fill="currentColor">c² = {areaC.toFixed(0)}</text>
                  </g>
                )}

                {/* the four sliding right triangles */}
                <g className="text-warning">
                  {triangles.map((tri, i) => {
                    const pts: Pt[] = tri.start.map((s, j) => lerp(s, tri.end[j], t));
                    return (
                      <polygon
                        key={i}
                        points={poly(pts)}
                        fill="currentColor"
                        fillOpacity="0.35"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    );
                  })}
                </g>
              </svg>
            </div>

            {/* Rearrange control */}
            <div className="mt-4 bg-base-200 p-4 rounded-xl border border-base-300">
              <Slider
                id="pyth-rearrange"
                motif="rearrange"
                label="Rearrange"
                value={Math.round(t * 100)}
                min={0}
                max={100}
                colorClass="warning"
                readout={phase === 'legs' ? 'a² + b²' : phase === 'hyp' ? 'c²' : `${pct}%`}
                onChange={(e) => {
                  stop();
                  setT(Number(e.target.value) / 100);
                }}
                aria-valuetext={`${pct} percent rearranged`}
              />
              <div className="flex gap-2 mt-3">
                <button className="btn btn-primary btn-sm" onClick={play}>
                  {t < 1 ? 'Play rearrangement' : 'Play back'}
                </button>
                <button className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
              </div>
            </div>
          </div>

          {/* Controls & proof */}
          <div className="w-full lg:w-80 flex flex-col gap-6">
            <div className="bg-base-200 p-6 rounded-xl border border-base-300 flex flex-col gap-5">
              {sliderA}
              {sliderB}

              <div className="border-t border-base-300 pt-4">
                <span className="block mb-2 font-bold text-xs text-base-content/60 uppercase tracking-wider">Common right triangles</span>
                <div className="flex flex-wrap gap-2">
                  {TRIPLES.map((tr) => (
                    <button
                      key={tr.label}
                      onClick={() => { setSideA(tr.a); setSideB(tr.b); }}
                      className={`btn btn-xs ${aTriple?.label === tr.label ? 'btn-primary' : 'btn-outline'}`}
                      aria-pressed={aTriple?.label === tr.label}
                    >
                      {tr.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live proof */}
            <div className="bg-base-200 p-6 rounded-xl border border-base-300 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-base-content/60">Live numbers</h3>

              <div className="flex items-center gap-3">
                <div className="text-center p-3 rounded-lg bg-base-100 border border-base-300 flex-1">
                  <div className="text-xs text-error/70 font-bold">a²</div>
                  <div className="text-xl font-bold font-mono text-error">{areaA}</div>
                </div>
                <span className="text-2xl font-bold text-base-content/50">+</span>
                <div className="text-center p-3 rounded-lg bg-base-100 border border-base-300 flex-1">
                  <div className="text-xs text-success/70 font-bold">b²</div>
                  <div className="text-xl font-bold font-mono text-success">{areaB}</div>
                </div>
              </div>

              <div className="text-center text-2xl font-bold text-base-content/50">=</div>

              <div className="text-center p-4 rounded-lg bg-base-100 border-2 border-base-300">
                <div className="text-xs text-info/70 font-bold">c²</div>
                <div className="text-3xl font-extrabold font-mono text-info">{areaC.toFixed(0)}</div>
              </div>

              <div className="text-center font-mono text-sm text-base-content/60">
                c = √{areaC.toFixed(0)} = <span className="text-info font-bold">{sideC.toFixed(4)}</span>
              </div>

              {Number.isInteger(sideC) && (
                <div className="alert alert-success py-2 text-sm">
                  <span>Whole-number hypotenuse: ({sideA}, {sideB}, {sideC}) is a Pythagorean triple.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default PythagoreanVisualizer;
