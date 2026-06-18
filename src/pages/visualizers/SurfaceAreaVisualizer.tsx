import { useState, useRef, useEffect, useCallback } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { GuidedInputFlow, useTouchedFields, useVisualizationGate } from '../../components/onboarding';

type Shape = 'rectangular-prism' | 'cube' | 'triangular-prism' | 'cylinder';

type FaceKind = 'rect' | 'triangle' | 'circle';

interface NetFace {
  id: string;
  termId: string;
  kind: FaceKind;
  x: number;
  y: number;
  w: number;
  h: number;
  isCenter?: boolean;
  triApex?: 'left' | 'right';
  label: string;
  area: number;
}

interface Term {
  id: string;
  color: string;
  expr: string;
  value: number;
}

interface NetModel {
  faces: NetFace[];
  terms: Term[];
  total: number;
}

const DEFAULTS = { length: 5, width: 3, height: 4, radius: 3 };
const ANIM_MS = 1100;
const U = 18; // px per unit (schematic; the formula carries the true numbers)
const sz = (v: number) => Math.max(16, Math.min(v * U, 120));

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const easeInOut = (k: number) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);

const shapeLabels: Record<Shape, string> = {
  'rectangular-prism': 'Rectangular Prism (Prisma)',
  cube: 'Cube (Kubo)',
  'triangular-prism': 'Triangular Prism',
  cylinder: 'Cylinder (Silindro)',
};

const SurfaceAreaVisualizer = () => {
  const [shape, setShape] = useState<Shape>('rectangular-prism');
  const [length, setLength] = useState(DEFAULTS.length);
  const [width, setWidth] = useState(DEFAULTS.width);
  const [height, setHeight] = useState(DEFAULTS.height);
  const [radius, setRadius] = useState(DEFAULTS.radius);
  const [fold, setFold] = useState(0); // 0 = flat net, 1 = folded up
  const [pinned, setPinned] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const fields = useTouchedFields<'shape' | 'dims'>();
  const gate = useVisualizationGate();
  const buildComplete = fields.isTouched('shape') && fields.isTouched('dims');
  const showVisualization = buildComplete && gate.visualizationConfirmed;

  const active = hover ?? pinned;

  const stop = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const play = useCallback(() => {
    stop();
    if (reducedMotion()) {
      setFold((p) => (p >= 1 ? 0 : 1));
      return;
    }
    const forward = fold < 1;
    const begin = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - begin) / ANIM_MS);
      const e = easeInOut(k);
      setFold(forward ? e : 1 - e);
      if (k < 1) rafRef.current = requestAnimationFrame(tick);
      else rafRef.current = null;
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [stop, fold]);

  useEffect(() => stop, [stop]);

  const reset = () => {
    stop();
    setLength(DEFAULTS.length);
    setWidth(DEFAULTS.width);
    setHeight(DEFAULTS.height);
    setRadius(DEFAULTS.radius);
    setFold(0);
    setPinned(null);
    setHover(null);
    gate.resetVisualization();
    fields.reset();
  };

  const fillExample = () => {
    stop();
    setLength(DEFAULTS.length);
    setWidth(DEFAULTS.width);
    setHeight(DEFAULTS.height);
    setRadius(DEFAULTS.radius);
    setFold(0);
    setPinned(null);
    setHover(null);
    fields.touchAll(['shape', 'dims']);
  };

  const buildModel = (): NetModel => {
    if (shape === 'cube') {
      const s = length;
      const c = sz(s);
      const faces: NetFace[] = [
        { id: 'front', termId: 's2', kind: 'rect', x: 0, y: 0, w: c, h: c, isCenter: true, label: `${s}×${s}`, area: s * s },
        { id: 'top', termId: 's2', kind: 'rect', x: 0, y: -c, w: c, h: c, label: `${s}×${s}`, area: s * s },
        { id: 'bottom', termId: 's2', kind: 'rect', x: 0, y: c, w: c, h: c, label: `${s}×${s}`, area: s * s },
        { id: 'left', termId: 's2', kind: 'rect', x: -c, y: 0, w: c, h: c, label: `${s}×${s}`, area: s * s },
        { id: 'right', termId: 's2', kind: 'rect', x: c, y: 0, w: c, h: c, label: `${s}×${s}`, area: s * s },
        { id: 'back', termId: 's2', kind: 'rect', x: 2 * c, y: 0, w: c, h: c, label: `${s}×${s}`, area: s * s },
      ];
      return {
        faces,
        terms: [{ id: 's2', color: 'text-primary', expr: `6 × ${s}² `, value: 6 * s * s }],
        total: 6 * s * s,
      };
    }

    if (shape === 'rectangular-prism') {
      const L = length, W = width, H = height;
      const Lp = sz(L), Wp = sz(W), Hp = sz(H);
      const faces: NetFace[] = [
        { id: 'front', termId: 'lh', kind: 'rect', x: 0, y: 0, w: Lp, h: Hp, isCenter: true, label: `${L}×${H}`, area: L * H },
        { id: 'top', termId: 'lw', kind: 'rect', x: 0, y: -Wp, w: Lp, h: Wp, label: `${L}×${W}`, area: L * W },
        { id: 'bottom', termId: 'lw', kind: 'rect', x: 0, y: Hp, w: Lp, h: Wp, label: `${L}×${W}`, area: L * W },
        { id: 'left', termId: 'wh', kind: 'rect', x: -Wp, y: 0, w: Wp, h: Hp, label: `${W}×${H}`, area: W * H },
        { id: 'right', termId: 'wh', kind: 'rect', x: Lp, y: 0, w: Wp, h: Hp, label: `${W}×${H}`, area: W * H },
        { id: 'back', termId: 'lh', kind: 'rect', x: Lp + Wp, y: 0, w: Lp, h: Hp, label: `${L}×${H}`, area: L * H },
      ];
      return {
        faces,
        terms: [
          { id: 'lw', color: 'text-primary', expr: `2(${L}·${W})`, value: 2 * L * W },
          { id: 'lh', color: 'text-secondary', expr: `2(${L}·${H})`, value: 2 * L * H },
          { id: 'wh', color: 'text-accent', expr: `2(${W}·${H})`, value: 2 * W * H },
        ],
        total: 2 * (L * W + L * H + W * H),
      };
    }

    if (shape === 'triangular-prism') {
      const L = length, W = width, H = height;
      const slant = Math.sqrt((W / 2) ** 2 + H * H);
      const Lp = sz(L), Wp = sz(W), Hp = sz(H), Sp = sz(slant);
      const triArea = 0.5 * W * H;
      const faces: NetFace[] = [
        { id: 'base', termId: 'base', kind: 'rect', x: 0, y: 0, w: Lp, h: Wp, isCenter: true, label: `${L}×${W}`, area: L * W },
        { id: 'slantTop', termId: 'slant', kind: 'rect', x: 0, y: -Sp, w: Lp, h: Sp, label: `${L}×${slant.toFixed(1)}`, area: L * slant },
        { id: 'slantBot', termId: 'slant', kind: 'rect', x: 0, y: Wp, w: Lp, h: Sp, label: `${L}×${slant.toFixed(1)}`, area: L * slant },
        { id: 'triL', termId: 'tri', kind: 'triangle', triApex: 'left', x: -Hp, y: 0, w: Hp, h: Wp, label: `½·${W}·${H}`, area: triArea },
        { id: 'triR', termId: 'tri', kind: 'triangle', triApex: 'right', x: Lp, y: 0, w: Hp, h: Wp, label: `½·${W}·${H}`, area: triArea },
      ];
      return {
        faces,
        terms: [
          { id: 'tri', color: 'text-primary', expr: `2(½·${W}·${H})`, value: 2 * triArea },
          { id: 'base', color: 'text-secondary', expr: `${L}·${W}`, value: L * W },
          { id: 'slant', color: 'text-accent', expr: `2(${L}·${slant.toFixed(1)})`, value: 2 * L * slant },
        ],
        total: 2 * triArea + L * W + 2 * L * slant,
      };
    }

    // cylinder
    const r = radius, h = height;
    const lat = 2 * Math.PI * r;
    const latP = Math.min(sz(lat), 150);
    const hP = sz(h);
    const dP = sz(2 * r);
    const circleArea = Math.PI * r * r;
    const cx = (latP - dP) / 2;
    const faces: NetFace[] = [
      { id: 'lat', termId: 'lat', kind: 'rect', x: 0, y: 0, w: latP, h: hP, isCenter: true, label: `2πr × ${h}`, area: lat * h },
      { id: 'top', termId: 'circ', kind: 'circle', x: cx, y: -dP, w: dP, h: dP, label: `πr²`, area: circleArea },
      { id: 'bottom', termId: 'circ', kind: 'circle', x: cx, y: hP, w: dP, h: dP, label: `πr²`, area: circleArea },
    ];
    return {
      faces,
      terms: [
        { id: 'circ', color: 'text-primary', expr: `2π·${r}²`, value: 2 * circleArea },
        { id: 'lat', color: 'text-secondary', expr: `2π·${r}·${h}`, value: lat * h },
      ],
      total: 2 * circleArea + lat * h,
    };
  };

  const model = buildModel();
  const center = model.faces.find((f) => f.isCenter)!;
  const termColor = (id: string) => model.terms.find((t) => t.id === id)?.color ?? 'text-base-content';

  // bounds for viewBox
  const PAD = 16;
  const minX = Math.min(...model.faces.map((f) => f.x));
  const minY = Math.min(...model.faces.map((f) => f.y));
  const maxX = Math.max(...model.faces.map((f) => f.x + f.w));
  const maxY = Math.max(...model.faces.map((f) => f.y + f.h));
  const offX = -minX + PAD;
  const offY = -minY + PAD;
  const vbW = maxX - minX + 2 * PAD;
  const vbH = maxY - minY + 2 * PAD;

  // Fold by foreshortening each outer face about the edge it shares with the
  // centre face: as it "folds up", that face turns edge-on and shrinks to a line.
  const foldTransform = (f: NetFace) => {
    if (f.isCenter || fold === 0) return undefined;
    const cxc = center.x + center.w / 2;
    const cyc = center.y + center.h / 2;
    const fxc = f.x + f.w / 2;
    const fyc = f.y + f.h / 2;
    if (Math.abs(fxc - cxc) > Math.abs(fyc - cyc)) {
      const hinge = fxc < cxc ? f.x + f.w : f.x;
      return `translate(${hinge} 0) scale(${1 - fold} 1) translate(${-hinge} 0)`;
    }
    const hinge = fyc < cyc ? f.y + f.h : f.y;
    return `translate(0 ${hinge}) scale(1 ${1 - fold}) translate(0 ${-hinge})`;
  };

  const faceShape = (f: NetFace) => {
    if (f.kind === 'circle') {
      return <ellipse cx={f.x + f.w / 2} cy={f.y + f.h / 2} rx={f.w / 2} ry={f.h / 2} fill="currentColor" fillOpacity="0.85" stroke="currentColor" strokeWidth="1.5" />;
    }
    if (f.kind === 'triangle') {
      const pts = f.triApex === 'left'
        ? `${f.x + f.w},${f.y} ${f.x + f.w},${f.y + f.h} ${f.x},${f.y + f.h / 2}`
        : `${f.x},${f.y} ${f.x},${f.y + f.h} ${f.x + f.w},${f.y + f.h / 2}`;
      return <polygon points={pts} fill="currentColor" fillOpacity="0.85" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />;
    }
    return <rect x={f.x} y={f.y} width={f.w} height={f.h} fill="currentColor" fillOpacity="0.85" stroke="currentColor" strokeWidth="1.5" />;
  };

  const foldPct = Math.round(fold * 100);

  const shapeSelector = (
    <div className="flex flex-wrap gap-2 justify-center">
      {(Object.keys(shapeLabels) as Shape[]).map((s) => (
        <button
          key={s}
          onClick={() => { setShape(s); setPinned(null); setHover(null); fields.touch('shape'); }}
          className={`btn btn-sm ${shape === s ? 'btn-primary' : 'btn-outline'}`}
          aria-pressed={shape === s}
        >
          {shapeLabels[s]}
        </button>
      ))}
    </div>
  );

  const dimensionControls = (
    <>
      {shape !== 'cylinder' && (
        <Slider
          id="sa-length"
          motif="length"
          label={<>{shape === 'cube' ? 'Side' : 'Length'} (<span className="font-serif italic">{shape === 'cube' ? 's' : 'l'}</span>)</>}
          value={length}
          min={1}
          max={10}
          step={1}
          colorClass="primary"
          onChange={(e) => { setLength(Number(e.target.value)); fields.touch('dims'); }}
          aria-valuetext={`${shape === 'cube' ? 'side' : 'length'} ${length} units`}
        />
      )}
      {(shape === 'rectangular-prism' || shape === 'triangular-prism') && (
        <Slider
          id="sa-width"
          motif="width"
          label={<>Width (<span className="font-serif italic">w</span>)</>}
          value={width}
          min={1}
          max={10}
          step={1}
          colorClass="secondary"
          onChange={(e) => { setWidth(Number(e.target.value)); fields.touch('dims'); }}
          aria-valuetext={`width ${width} units`}
        />
      )}
      {shape !== 'cube' && (
        <Slider
          id="sa-height"
          motif="height"
          label={<>Height (<span className="font-serif italic">h</span>)</>}
          value={height}
          min={1}
          max={10}
          step={1}
          colorClass="accent"
          onChange={(e) => { setHeight(Number(e.target.value)); fields.touch('dims'); }}
          aria-valuetext={`height ${height} units`}
        />
      )}
      {shape === 'cylinder' && (
        <Slider
          id="sa-radius"
          motif="radius"
          label={<>Radius (<span className="font-serif italic">r</span>)</>}
          value={radius}
          min={1}
          max={8}
          step={0.5}
          colorClass="primary"
          formatValue={(v) => String(v)}
          onChange={(e) => { setRadius(Number(e.target.value)); fields.touch('dims'); }}
          aria-valuetext={`radius ${radius} units`}
        />
      )}
    </>
  );

  return (
    <VisualizerLayout
      title="Surface Area Builder (Sukat ng Ibabaw)"
      description="Fold a flat net up into a 3D shape and back. Each face lights up with the matching term in the surface area formula."
      adSlotId="2017"
      guideLink="/blog/surface-area"
    >
      {!showVisualization ? (
        <GuidedInputFlow
          intro="Pick a 3D shape and set its dimensions to fold up its net and total the surface area."
          onFillExample={fillExample}
          onReset={reset}
          awaitingVisualizationConfirm={buildComplete && !gate.visualizationConfirmed}
          onVisualizationConfirm={gate.confirmVisualization}

          steps={[
            { id: 'shape', title: 'Choose a shape', helper: 'Prism, cube, triangular prism, or cylinder.', complete: fields.isTouched('shape'), children: shapeSelector },
            { id: 'dims', title: 'Set the dimensions', helper: 'Drag the sliders to size your shape.', complete: fields.isTouched('dims'), children: <div className="flex flex-col gap-5">{dimensionControls}</div> },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col gap-6">

          {/* Shape selector */}
          {shapeSelector}

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Net */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              <div className="rounded-xl border-2 border-base-300 bg-base-200 p-4 flex items-center justify-center min-h-[300px]">
                <svg viewBox={`0 0 ${vbW} ${vbH}`} className="w-full max-w-[460px] h-auto" role="img" aria-label={`Net of ${shapeLabels[shape]}, ${foldPct}% folded`}>
                  <g transform={`translate(${offX} ${offY})`}>
                    {model.faces.map((f) => {
                      const isActive = active === f.termId;
                      const dimmed = active != null && !isActive;
                      return (
                        <g
                          key={f.id}
                          transform={foldTransform(f)}
                          className={termColor(f.termId)}
                          opacity={dimmed ? 0.3 : 1}
                          onMouseEnter={() => setHover(f.termId)}
                          onMouseLeave={() => setHover(null)}
                          style={{ cursor: 'pointer' }}
                        >
                          {faceShape(f)}
                          {isActive && f.kind === 'rect' && (
                            <rect x={f.x} y={f.y} width={f.w} height={f.h} fill="none" className="text-warning" stroke="currentColor" strokeWidth="3" />
                          )}
                        </g>
                      );
                    })}
                    {/* crisp labels, hidden as the net folds */}
                    <g opacity={Math.max(0, 1 - fold * 1.6)}>
                      {model.faces.map((f) => (
                        <text
                          key={`t-${f.id}`}
                          x={f.x + f.w / 2}
                          y={f.y + f.h / 2}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="10"
                          fontWeight="bold"
                          className="text-base-content"
                          fill="currentColor"
                          style={{ pointerEvents: 'none' }}
                        >
                          {f.label}
                        </text>
                      ))}
                    </g>
                  </g>
                </svg>
              </div>

              {/* Fold control */}
              <div className="bg-base-200 p-4 rounded-xl border border-base-300">
                <Slider
                  id="sa-fold"
                  motif="fold"
                  label="Fold"
                  value={foldPct}
                  min={0}
                  max={100}
                  colorClass="primary"
                  readout={fold === 0 ? 'flat net' : fold >= 1 ? 'folded' : `${foldPct}%`}
                  onChange={(e) => { stop(); setFold(Number(e.target.value) / 100); }}
                  aria-valuetext={`${foldPct} percent folded`}
                />
                <div className="flex gap-2 mt-3">
                  <button className="btn btn-primary btn-sm" onClick={play}>{fold < 1 ? 'Fold up' : 'Unfold'}</button>
                  <button className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="w-full lg:w-64 flex flex-col gap-5 bg-base-200 p-6 rounded-xl border border-base-300">
              {dimensionControls}

              <div className="border-t border-base-300 pt-4">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60 mb-2">Surface area formula</div>
                <p className="text-xs text-base-content/50 m-0 mb-3">Tap a term to highlight its faces.</p>
                <div className="flex flex-col gap-2">
                  {model.terms.map((term) => (
                    <button
                      key={term.id}
                      className={`btn btn-sm justify-between font-mono ${active === term.id ? 'btn-active' : 'btn-ghost'} border border-base-300`}
                      aria-pressed={pinned === term.id}
                      onClick={() => setPinned((p) => (p === term.id ? null : term.id))}
                      onMouseEnter={() => setHover(term.id)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(term.id)}
                      onBlur={() => setHover(null)}
                    >
                      <span className={term.color}>{term.expr}</span>
                      <span className="text-base-content/70">= {term.value.toFixed(1)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="text-center p-6 rounded-xl bg-base-200 border-2 border-base-300">
            <div className="text-xs uppercase tracking-wider font-bold text-warning/70 mb-2">Total Surface Area</div>
            <div className="text-4xl font-extrabold font-mono text-warning">{model.total.toFixed(2)} sq. units</div>
            <div className="text-sm font-mono text-base-content/60 mt-2">
              = {model.terms.map((t) => t.value.toFixed(1)).join(' + ')}
            </div>
          </div>

        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default SurfaceAreaVisualizer;
