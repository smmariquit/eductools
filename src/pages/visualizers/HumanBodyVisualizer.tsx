import { useState, useEffect, useRef } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { IntroState, useIntroState } from '../../components/onboarding';

type ViewMode = 'map' | 'homeostasis' | 'vascular' | 'absorption' | 'reflex';

const CANVAS_CLASS =
  'rounded-xl border-2 border-base-300 w-full max-w-[560px] h-auto bg-base-200 mx-auto block';

// Shared compact slider strip — one row on wide screens, no tall empty card.
const ActivitySlider = ({
  id,
  label,
  value,
  onChange,
  onReset,
  minLabel,
  maxLabel,
  formatValue,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  onReset: () => void;
  minLabel: string;
  maxLabel: string;
  formatValue: (v: number) => string;
}) => (
  <div className="bg-base-200 px-4 py-3 rounded-xl border border-base-300">
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <label htmlFor={id} className="text-sm font-bold shrink-0">{label}</label>
      <span className="text-primary font-mono text-sm font-bold tabular-nums shrink-0">{formatValue(value)}</span>
      <div className="flex-1 min-w-[12rem] basis-[200px]">
        <input
          id={id}
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="range range-primary w-full"
          aria-valuetext={formatValue(value)}
        />
        <div className="flex justify-between text-[10px] mt-0.5 text-base-content/60 font-semibold uppercase tracking-wide">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      </div>
      <button type="button" className="btn btn-ghost btn-xs shrink-0" onClick={onReset}>Reset</button>
    </div>
  </div>
);
const reducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const themeColor = (el: HTMLElement, name: string, fallback: string) =>
  getComputedStyle(el).getPropertyValue(name).trim() || fallback;

interface SystemInfo {
  id: Exclude<ViewMode, 'map'>;
  num: number;
  title: string;
  tagalog: string;
  blurb: string;
  region: string;
}

const SYSTEMS: SystemInfo[] = [
  { id: 'homeostasis', num: 1, title: 'Heart & Lungs', tagalog: 'Puso at Baga', blurb: 'Watch your heartbeat and breathing speed up as you go from resting to sprinting.', region: 'Chest' },
  { id: 'vascular', num: 2, title: 'Blood Highway', tagalog: 'Daluyan ng Dugo', blurb: 'Follow blood on its loop: out to the body, back to the lungs to pick up oxygen.', region: 'Whole body' },
  { id: 'absorption', num: 3, title: 'Food Absorption', tagalog: 'Pagsipsip ng Pagkain', blurb: 'See how the small intestine soaks up sugars and fats from your food into the blood.', region: 'Tummy' },
  { id: 'reflex', num: 4, title: 'Nerves & Reflexes', tagalog: 'Nerbiyos', blurb: 'Tap the knee and watch the signal race to the spinal cord and back to the muscle.', region: 'Spine & legs' },
];

const HumanBodyVisualizer = () => {
  const intro = useIntroState();
  const [viewMode, setViewMode] = useState<ViewMode>('map');

  const activeSystem = SYSTEMS.find((s) => s.id === viewMode);

  return (
    <VisualizerLayout
      title="Human Body Systems (Mga Sistema ng Katawan)"
      description="Start on the body map, tap a system, and explore how the heart, blood, digestion, and nerves actually work."
      adSlotId="1003"
      guideLink="/blog/human-body"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">

        {!intro.started ? (
          <div className="p-4 md:p-8">
            <IntroState
              lead="Explore how the heart, blood, digestion, and nerves work, one body system at a time."
              actionLabel="Open the body map"
              onStart={intro.start}
            />
          </div>
        ) : (
          <>
        {/* Navigation */}
        <div className="bg-base-200 p-2 flex flex-wrap justify-center border-b border-base-300 gap-2" role="tablist" aria-label="Body systems">
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'map'}
            className={`btn btn-sm font-bold ${viewMode === 'map' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setViewMode('map')}
          >
            Body Map
          </button>
          {SYSTEMS.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={viewMode === s.id}
              className={`btn btn-sm font-bold ${viewMode === s.id ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setViewMode(s.id)}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-6">
          {viewMode === 'map' && <SystemMap onSelect={setViewMode} />}

          {viewMode !== 'map' && (
            <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
              <button className="btn btn-ghost btn-sm" onClick={() => setViewMode('map')}>
                ← Back to body map
              </button>
              {activeSystem && (
                <div className="text-right">
                  <h2 className="font-display font-bold text-lg m-0">{activeSystem.title} <span className="text-base-content/50 font-normal">/ {activeSystem.tagalog}</span></h2>
                </div>
              )}
            </div>
          )}

          {viewMode === 'homeostasis' && <HomeostasisEngine />}
          {viewMode === 'vascular' && <VascularEngine />}
          {viewMode === 'absorption' && <AbsorptionEngine />}
          {viewMode === 'reflex' && <ReflexEngine />}
        </div>
          </>
        )}

      </div>
    </VisualizerLayout>
  );
};

// ==========================================
// 0. Grade-5 entry layer: clickable system map
// ==========================================
const SystemMap = ({ onSelect }: { onSelect: (v: ViewMode) => void }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="font-display font-bold text-xl md:text-2xl m-0">Tap a body system to explore it</h2>
        <p className="text-base-content/60 text-sm mt-1 m-0">Each number on the body matches a card below.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Friendly body silhouette with numbered hotspots */}
        <div className="flex justify-center">
          <svg viewBox="0 0 200 320" className="w-44 md:w-52 h-auto" role="img" aria-label="A body outline with four numbered spots for the heart and lungs, the blood, digestion, and the nerves.">
            {/* body */}
            <g className="text-base-content" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
              <circle cx="100" cy="38" r="24" className="text-primary" fill="currentColor" fillOpacity="0.08" />
              <path d="M70 78 Q100 66 130 78 L138 170 Q120 180 100 180 Q80 180 62 170 Z" className="text-primary" fill="currentColor" fillOpacity="0.06" />
              <path d="M70 80 L40 140 M130 80 L160 140" />
              <path d="M84 180 L74 300 M116 180 L126 300" />
            </g>
            {/* numbered hotspots */}
            {[
              { n: 1, x: 100, y: 110, id: 'homeostasis' as const },
              { n: 2, x: 60, y: 150, id: 'vascular' as const },
              { n: 3, x: 100, y: 160, id: 'absorption' as const },
              { n: 4, x: 100, y: 70, id: 'reflex' as const },
            ].map((h) => (
              <g key={h.n} className="cursor-pointer text-secondary" onClick={() => onSelect(h.id)}>
                <circle cx={h.x} cy={h.y} r="13" fill="currentColor" />
                <text x={h.x} y={h.y} textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="bold" fill="white">{h.n}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* System cards */}
        <div className="grid grid-cols-1 gap-3">
          {SYSTEMS.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className="text-left bg-base-200 hover:bg-base-300 border border-base-300 rounded-xl p-4 transition-colors flex gap-3 items-start"
            >
              <span className="badge badge-secondary badge-lg font-bold shrink-0">{s.num}</span>
              <span>
                <span className="font-display font-bold block">{s.title} <span className="text-base-content/50 font-normal text-sm">/ {s.tagalog}</span></span>
                <span className="text-sm text-base-content/70 block mt-0.5">{s.blurb}</span>
                <span className="text-xs text-primary font-semibold mt-1 inline-block">Explore →</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 1. Homeostasis Engine (Heart & Lungs)
// ==========================================
const HomeostasisEngine = () => {
  const DEFAULT_INTENSITY = 0;
  const [intensity, setIntensity] = useState(DEFAULT_INTENSITY);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ intensity: 0, time: 0 });

  useEffect(() => {
    stateRef.current.intensity = intensity;
  }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;

    const colBg = themeColor(canvas, '--color-base-200', '#fffdf8');
    const colInk = themeColor(canvas, '--color-base-content', '#2b2b3a');

    const render = () => {
      const { intensity, time } = stateRef.current;
      const hrHz = 1.0 + intensity * 2.0;
      const brHz = 0.2 + intensity * 0.6;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = colBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Lungs
      const angleLungs = time * 0.016 * 2 * Math.PI * brHz;
      const displacement = Math.sin(angleLungs);
      const diaphragmY = 280 + displacement * (15 + intensity * 15);
      const lungScale = 1.0 + (displacement + 1.0) * 0.15;

      ctx.save();
      ctx.translate(250, 180);
      ctx.scale(1.0, lungScale);
      ctx.beginPath();
      ctx.arc(0, 0, 40, Math.PI, 0, false);
      ctx.quadraticCurveTo(50, 40, 0, 80);
      ctx.quadraticCurveTo(-50, 40, -40, 0);
      ctx.fillStyle = `rgb(${200 + (displacement + 1) * 20}, 120, 120)`;
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(180, 280);
      ctx.quadraticCurveTo(250, diaphragmY, 320, 280);
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#8b5a2b';
      ctx.stroke();

      // Heart
      const angleHeart = time * 0.016 * 2 * Math.PI * hrHz;
      const contraction = Math.abs(Math.sin(angleHeart));
      const heartRadius = 35 - contraction * (5 + intensity * 5);
      ctx.beginPath();
      ctx.arc(500, 200, heartRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#b22222';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = colBg;
      ctx.stroke();

      // Labels
      ctx.fillStyle = colInk;
      ctx.font = '16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Breathing Rate: ${(brHz * 60).toFixed(0)} breaths/min`, 250, 350);
      ctx.fillText(`Heart Rate: ${(hrHz * 60).toFixed(0)} BPM`, 500, 350);
      ctx.fillText(`CO₂ Level: ${(40 + intensity * 20).toFixed(1)} mmHg`, 375, 40);
    };

    if (reducedMotion()) {
      render();
      return;
    }

    const tick = () => {
      stateRef.current.time += 1;
      render();
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <ActivitySlider
        id="hb-intensity"
        label="Physical Activity Intensity"
        value={intensity}
        onChange={setIntensity}
        onReset={() => setIntensity(DEFAULT_INTENSITY)}
        minLabel="Resting"
        maxLabel="Sprinting"
        formatValue={(v) => `${(v * 100).toFixed(0)}%`}
      />
      <canvas
        ref={canvasRef}
        width={750}
        height={400}
        className={`${CANVAS_CLASS} aspect-[15/8]`}
        role="img"
        aria-label="The lungs expand and contract and the heart beats faster as activity intensity increases."
      />
    </div>
  );
};

// ==========================================
// 2. Vascular Engine (Blood Highway)
// ==========================================
const VascularEngine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const colBg = themeColor(canvas, '--color-base-200', '#fffdf8');
    const colInk = themeColor(canvas, '--color-base-content', '#2b2b3a');

    const getOxygenationColor = (o2Percent: number) => {
      const rStart = 0x4a, gStart = 0x0e, bStart = 0x17;
      const rEnd = 0xd6, gEnd = 0x22, bEnd = 0x29;
      const r = Math.round(rStart + (rEnd - rStart) * o2Percent);
      const g = Math.round(gStart + (gEnd - gStart) * o2Percent);
      const b = Math.round(bStart + (bEnd - bStart) * o2Percent);
      return `rgb(${r}, ${g}, ${b})`;
    };

    const vesselPaths = [
      { name: 'Systemic Artery', points: [[300, 250], [250, 350], [150, 350]], o2: 0.98 },
      { name: 'Systemic Vein', points: [[150, 400], [250, 400], [300, 270]], o2: 0.70 },
      { name: 'Pulmonary Artery', points: [[300, 230], [250, 100], [150, 100]], o2: 0.70 },
      { name: 'Pulmonary Vein', points: [[150, 150], [250, 150], [300, 240]], o2: 0.98 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = colBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Heart
      ctx.beginPath();
      ctx.arc(300, 250, 40, 0, 2 * Math.PI);
      ctx.fillStyle = '#7D181D';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = colBg;
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('HEART', 300, 255);

      // Capillary beds
      ctx.fillStyle = 'rgba(43,43,58,0.06)';
      ctx.fillRect(50, 75, 100, 100);
      ctx.fillStyle = colInk;
      ctx.fillText('LUNGS', 100, 130);
      ctx.fillStyle = 'rgba(43,43,58,0.06)';
      ctx.fillRect(50, 325, 100, 100);
      ctx.fillStyle = colInk;
      ctx.fillText('BODY TISSUES', 100, 380);

      vesselPaths.forEach((vessel) => {
        ctx.beginPath();
        ctx.moveTo(vessel.points[0][0], vessel.points[0][1]);
        for (let i = 1; i < vessel.points.length; i++) ctx.lineTo(vessel.points[i][0], vessel.points[i][1]);
        ctx.strokeStyle = getOxygenationColor(vessel.o2);
        ctx.lineWidth = 12;
        ctx.lineJoin = 'round';
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        for (let p = 0; p < 5; p++) {
          const offset = (time + p * 40) % 200;
          const progress = offset / 200;
          let cxp, cyp;
          if (progress < 0.5) {
            const tt = progress * 2;
            cxp = vessel.points[0][0] + (vessel.points[1][0] - vessel.points[0][0]) * tt;
            cyp = vessel.points[0][1] + (vessel.points[1][1] - vessel.points[0][1]) * tt;
          } else {
            const tt = (progress - 0.5) * 2;
            cxp = vessel.points[1][0] + (vessel.points[2][0] - vessel.points[1][0]) * tt;
            cyp = vessel.points[1][1] + (vessel.points[2][1] - vessel.points[1][1]) * tt;
          }
          ctx.beginPath();
          ctx.arc(cxp, cyp, 3, 0, 2 * Math.PI);
          ctx.fill();
        }

        ctx.fillStyle = colInk;
        ctx.font = '12px Inter';
        ctx.fillText(vessel.name, vessel.points[1][0], vessel.points[1][1] - 15);
      });

      // Legend
      ctx.fillStyle = colInk;
      ctx.textAlign = 'left';
      ctx.fillText('O₂ Saturation:', 450, 50);
      const grad = ctx.createLinearGradient(450, 60, 650, 60);
      grad.addColorStop(0, getOxygenationColor(0));
      grad.addColorStop(0.5, getOxygenationColor(0.5));
      grad.addColorStop(1, getOxygenationColor(1));
      ctx.fillStyle = grad;
      ctx.fillRect(450, 60, 200, 20);
      ctx.fillStyle = colInk;
      ctx.fillText('0% (Low oxygen)', 450, 95);
      ctx.textAlign = 'right';
      ctx.fillText('100% (Oxygen-rich)', 650, 95);
    };

    if (reducedMotion()) {
      render();
      return;
    }

    const tick = () => {
      time += 2;
      render();
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={750}
      height={500}
      className={`${CANVAS_CLASS} aspect-[3/2]`}
      role="img"
      aria-label="Blood flows in a loop: oxygen-rich blood (bright red) leaves the heart to the body, and oxygen-poor blood (dark red) returns and goes to the lungs."
    />
  );
};

// ==========================================
// 3. Absorption Engine (Food Absorption)
// ==========================================
const AbsorptionEngine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let time = 0;

    const colBg = themeColor(canvas, '--color-base-200', '#fffdf8');
    const colLumen = themeColor(canvas, '--color-base-300', '#f2e6d6');
    const colInk = themeColor(canvas, '--color-base-content', '#2b2b3a');

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = colBg;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = colLumen;
      ctx.fillRect(0, 0, width, 120);
      ctx.fillStyle = colInk;
      ctx.font = 'bold 16px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Intestinal Lumen (Food Particles)', width / 2, 30);

      // Villus wall
      ctx.save();
      ctx.strokeStyle = '#d2b48c';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(150, height + 20);
      ctx.bezierCurveTo(150, 100, width - 150, 100, width - 150, height + 20);
      ctx.stroke();
      ctx.restore();

      // Blood capillary
      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(200, height);
      ctx.lineTo(200, 180);
      ctx.arc(width / 2, 180, width / 2 - 200, Math.PI, 0);
      ctx.lineTo(width - 200, height);
      ctx.stroke();

      // Lacteal
      ctx.fillStyle = '#eab308';
      ctx.fillRect(width / 2 - 20, 230, 40, height - 230);
      ctx.beginPath();
      ctx.arc(width / 2, 230, 20, Math.PI, 0);
      ctx.fill();

      ctx.fillStyle = colInk;
      ctx.font = '12px Inter';
      ctx.fillText('Blood Capillary (Absorbs Sugars/Amino Acids)', 200, height - 20);
      ctx.fillText('Central Lacteal (Absorbs Lipids)', width / 2, height - 60);

      // Glucose to capillary
      ctx.fillStyle = '#06b6d4';
      for (let i = 0; i < 15; i++) {
        const offset = (time + i * 40) % 300;
        const prog = offset / 300;
        const startX = 100 + (i * 30) % 400;
        ctx.beginPath();
        ctx.arc(startX + (200 - startX) * prog, 80 + (300 - 80) * prog, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Lipids to lacteal
      ctx.fillStyle = '#eab308';
      for (let i = 0; i < 10; i++) {
        const offset = (time + i * 55) % 300;
        const prog = offset / 300;
        const startX = 150 + (i * 45) % 300;
        ctx.fillRect(startX + (width / 2 - startX) * prog - 4, 60 + (280 - 60) * prog - 4, 8, 8);
      }
    };

    if (reducedMotion()) {
      render();
      return;
    }

    const tick = () => {
      time += 1;
      render();
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={500}
      className={`${CANVAS_CLASS} aspect-[6/5]`}
      role="img"
      aria-label="In the small intestine, sugars travel into the blood capillary while fats are absorbed into the central lacteal."
    />
  );
};

// ==========================================
// 4. Reflex Engine (Nerves & Reflexes)
// ==========================================
const ReflexEngine = () => {
  const [phase, setPhase] = useState<'REST' | 'STIM' | 'SYNAPSE' | 'MOTOR'>('REST');
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer: number;
    if (phase !== 'REST') {
      timer = window.setInterval(() => {
        setTime((t) => {
          if (t > 40 && phase === 'STIM') setPhase('SYNAPSE');
          if (t > 80 && phase === 'SYNAPSE') setPhase('MOTOR');
          if (t > 130) {
            setPhase('REST');
            return 0;
          }
          return t + 1;
        });
      }, 30);
    } else {
      setTimeout(() => setTime(0), 0);
    }
    return () => clearInterval(timer);
  }, [phase]);

  let extensorVoltage = -70;
  let flexorVoltage = -70;
  if (phase === 'SYNAPSE') {
    extensorVoltage = -70 + Math.min(35, (time - 40) * 2);
    flexorVoltage = -70 - Math.min(15, (time - 40) * 1);
  } else if (phase === 'MOTOR') {
    extensorVoltage = 30;
    flexorVoltage = -80;
  }

  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-2xl mx-auto">
      <div className="w-full bg-base-200 p-4 md:p-5 rounded-xl border border-base-300 relative overflow-hidden">
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div className="text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-xs border-4 transition-all duration-300 ${phase === 'STIM' ? 'bg-warning text-warning-content border-warning scale-110' : 'bg-base-100 border-base-300 text-base-content/50'}`}>
              Sensory
            </div>
          </div>
          <div className="text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center font-bold text-xs border-4 transition-all duration-300 ${phase === 'SYNAPSE' ? 'bg-primary text-primary-content border-primary scale-110' : 'bg-base-100 border-base-300 text-base-content/50'}`}>
              Spinal Cord
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center font-bold text-xs border-4 transition-all duration-300 ${phase === 'MOTOR' ? 'bg-success text-success-content border-success scale-110' : 'bg-base-100 border-base-300 text-base-content/50'}`}>
              <span>Extensor</span>
              <span className="opacity-70 font-mono mt-1">{extensorVoltage}mV</span>
            </div>
            <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center font-bold text-xs border-4 transition-all duration-300 ${phase === 'MOTOR' ? 'bg-error text-error-content border-error scale-110' : 'bg-base-100 border-base-300 text-base-content/50'}`}>
              <span>Flexor</span>
              <span className="opacity-70 font-mono mt-1">{flexorVoltage}mV</span>
            </div>
          </div>
        </div>

        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" style={{ padding: '2rem' }}>
          <path d="M 50 80 L 300 80" className="text-warning" stroke="currentColor" strokeWidth="4" strokeDasharray={phase === 'STIM' ? '10 10' : '0'} fill="none" opacity={phase !== 'REST' ? 1 : 0.2} />
          <path d="M 350 70 L 500 40" className="text-success" stroke="currentColor" strokeWidth="4" fill="none" opacity={phase === 'MOTOR' ? 1 : 0.2} />
          <path d="M 350 90 L 500 120" className="text-error" stroke="currentColor" strokeWidth="4" fill="none" opacity={phase === 'MOTOR' || phase === 'SYNAPSE' ? 1 : 0.2} />
        </svg>

        <div className="flex justify-center gap-3 mt-8 relative z-10">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => { setPhase('STIM'); setTime(0); }}
            disabled={phase !== 'REST'}
          >
            Trigger Patellar Hammer
          </button>
          <button
            className="btn btn-ghost btn-lg"
            onClick={() => { setPhase('REST'); setTime(0); }}
            disabled={phase === 'REST'}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
        <div className="bg-base-200 p-4 rounded-xl text-center border border-base-300">
          <h3 className="font-bold text-success mb-2">Extensor Muscle</h3>
          <p className="text-sm font-mono">{extensorVoltage >= -50 ? 'CONTRACTING (Excitatory)' : 'Resting'}</p>
        </div>
        <div className="bg-base-200 p-4 rounded-xl text-center border border-base-300">
          <h3 className="font-bold text-error mb-2">Flexor Muscle</h3>
          <p className="text-sm font-mono">{flexorVoltage < -70 ? 'INHIBITED (Hyperpolarized)' : 'Resting'}</p>
        </div>
      </div>
    </div>
  );
};

export default HumanBodyVisualizer;
