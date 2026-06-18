import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { GuidedInputFlow, useTouchedFields } from '../../components/onboarding';

interface Particle {
  x: number;
  y: number;
  vx: number; // base velocity at the reference temperature (px/frame)
  vy: number;
  radius: number;
}

type Law = 'boyle' | 'charles' | 'gaylussac';

const NUM_PARTICLES = 40;
const PARTICLE_MASS = 1; // arbitrary mass unit for momentum bookkeeping
const BASE_SPEED = 2.2; // px/frame at the reference temperature
const REF_TEMP = 300; // K
const BASE_VOLUME = 50; // arbitrary container units (50% of the canvas width)
const CANVAS_W = 500;
const CANVAS_H = 300;
const WINDOW_FRAMES = 24; // frames per pressure measurement
const PISTON_W = 6;

// Calibration so a steady collision measurement at the reference state reads ~1 atm.
// Average force on a vertical wall from one particle is m·vx²/W; summed over the
// gas and divided by the two wall lengths this is m·Σvx² / (W·H).
const EXPECTED_SUM_VX2 = NUM_PARTICLES * BASE_SPEED * BASE_SPEED * 0.5;
const BASE_W = (BASE_VOLUME / 100) * CANVAS_W;
const PRESSURE_CAL = (BASE_W * CANVAS_H) / (PARTICLE_MASS * EXPECTED_SUM_VX2);

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const subscribeReducedMotion = (onChange: () => void): (() => void) => {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};
const usePrefersReducedMotion = (): boolean =>
  useSyncExternalStore(
    subscribeReducedMotion,
    () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(REDUCED_MOTION_QUERY).matches : false),
    () => false,
  );

const cssVar = (name: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

const GasLawsVisualizer = () => {
  const [law, setLaw] = useState<Law>('boyle');
  const [temperature, setTemperature] = useState(REF_TEMP); // Kelvin
  const [volume, setVolume] = useState(BASE_VOLUME); // arbitrary container units (Boyle control)
  const reducedMotion = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reducedMotion);
  const [measuredP, setMeasuredP] = useState(1);
  const fields = useTouchedFields<'law' | 'param'>();
  const ready = fields.isTouched('law') && fields.isTouched('param');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const impulseRef = useRef(0);
  const frameCountRef = useRef(0);
  const measuredRawRef = useRef(EXPECTED_SUM_VX2 / (BASE_W * CANVAS_H));

  // Geometry and speed follow the selected law; pressure is then *measured* from
  // the wall collisions rather than read back out of PV = nRT.
  const getState = useCallback(() => {
    switch (law) {
      case 'boyle':
        return { displayV: volume, displayT: REF_TEMP };
      case 'charles':
        return { displayV: Math.max(10, Math.min(100, (BASE_VOLUME * temperature) / REF_TEMP)), displayT: temperature };
      case 'gaylussac':
        return { displayV: BASE_VOLUME, displayT: temperature };
    }
  }, [law, volume, temperature]);

  const { displayV, displayT } = getState();

  // Pressure the kinetic theory predicts for this state (used as the readout
  // while the animation is paused, e.g. under reduced-motion).
  const analyticP = (displayT / REF_TEMP) * (BASE_VOLUME / displayV);
  const displayP = playing ? measuredP : analyticP;

  useEffect(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const angle = Math.random() * Math.PI * 2;
      particles.push({
        x: Math.random() * (BASE_W - 2 * PISTON_W) + PISTON_W,
        y: Math.random() * (CANVAS_H - 20) + 10,
        vx: Math.cos(angle) * BASE_SPEED,
        vy: Math.sin(angle) * BASE_SPEED,
        radius: 4,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ink = cssVar('--color-base-content', '#2b2b3a');
    const surface = cssVar('--color-base-300', '#f2e6d6');
    const chamber = cssVar('--color-primary', '#2f8fe6');
    const piston = cssVar('--color-base-content', '#2b2b3a');

    const draw = (step: boolean) => {
      const w = canvas.width;
      const h = canvas.height;
      const containerWidth = (displayV / 100) * w;
      const speedFactor = Math.sqrt(displayT / REF_TEMP); // v_rms ∝ √T

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = surface;
      ctx.fillRect(0, 0, w, h);

      // Gas chamber tint
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = chamber;
      ctx.fillRect(0, 0, containerWidth, h);
      ctx.restore();

      // Piston wall + handle
      ctx.fillStyle = piston;
      ctx.fillRect(containerWidth - PISTON_W, 0, 2 * PISTON_W, h);
      ctx.fillRect(containerWidth + PISTON_W, h / 2 - 18, w - containerWidth - PISTON_W, 36);

      // Container outline
      ctx.strokeStyle = ink;
      ctx.lineWidth = 3;
      ctx.strokeRect(1, 1, containerWidth - 2, h - 2);

      // Temperature colormap (domain colours: cool blue → hot orange-red)
      const t = Math.min(1, Math.max(0, (displayT - 100) / 500));
      const pr = Math.round(60 + t * 195);
      const pg = Math.round(150 - t * 110);
      const pb = Math.round(235 - t * 195);
      const particleColor = `rgb(${pr}, ${pg}, ${pb})`;

      const rightWall = containerWidth - PISTON_W;
      particlesRef.current.forEach((p) => {
        if (step) {
          p.x += p.vx * speedFactor;
          p.y += p.vy * speedFactor;

          // Vertical walls: record the momentum handed to the wall (2·m·|vx_eff|).
          if (p.x - p.radius < 0) {
            p.x = p.radius;
            impulseRef.current += 2 * PARTICLE_MASS * Math.abs(p.vx) * speedFactor;
            p.vx = Math.abs(p.vx);
          }
          if (p.x + p.radius > rightWall) {
            p.x = rightWall - p.radius;
            impulseRef.current += 2 * PARTICLE_MASS * Math.abs(p.vx) * speedFactor;
            p.vx = -Math.abs(p.vx);
          }
          if (p.y - p.radius < 0) { p.y = p.radius; p.vy = Math.abs(p.vy); }
          if (p.y + p.radius > h) { p.y = h - p.radius; p.vy = -Math.abs(p.vy); }
        } else if (p.x + p.radius > rightWall) {
          // Keep particles inside if the piston moved while paused.
          p.x = rightWall - p.radius;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      if (step) {
        frameCountRef.current += 1;
        if (frameCountRef.current >= WINDOW_FRAMES) {
          // Average force on the two vertical walls over the window, per wall length.
          const raw = impulseRef.current / (frameCountRef.current * 2 * h);
          measuredRawRef.current = measuredRawRef.current * 0.6 + raw * 0.4; // smooth
          setMeasuredP(measuredRawRef.current * PRESSURE_CAL);
          impulseRef.current = 0;
          frameCountRef.current = 0;
        }
      }

      ctx.font = 'bold 13px Inter, system-ui';
      ctx.fillStyle = ink;
      ctx.globalAlpha = 0.6;
      ctx.textAlign = 'center';
      ctx.fillText('← Volume →', containerWidth / 2, h - 10);
      ctx.globalAlpha = 1;
    };

    if (playing) {
      const loop = () => {
        draw(true);
        animFrameRef.current = requestAnimationFrame(loop);
      };
      loop();
      return () => cancelAnimationFrame(animFrameRef.current);
    }
    draw(false); // static frame
  }, [displayV, displayT, playing]);

  const lawInfo: Record<Law, { name: string; tagalog: string; formula: string; constant: string; description: string }> = {
    boyle: {
      name: "Boyle's Law",
      tagalog: 'Batas ni Boyle',
      formula: 'P₁V₁ = P₂V₂',
      constant: 'Temperatura (T) = Constant',
      description: 'Squeeze the gas into less volume and the particles hit the walls more often, so the measured pressure climbs. P is inversely proportional to V at fixed T.',
    },
    charles: {
      name: "Charles's Law",
      tagalog: 'Batas ni Charles',
      formula: 'V₁/T₁ = V₂/T₂',
      constant: 'Presyon (P) = Constant',
      description: 'Heat the gas and the piston slides out so pressure stays put. Volume grows in step with absolute temperature.',
    },
    gaylussac: {
      name: 'Gay-Lussac\'s Law',
      tagalog: 'Batas ni Gay-Lussac',
      formula: 'P₁/T₁ = P₂/T₂',
      constant: 'Dami (V) = Constant',
      description: 'Hold the volume fixed and heat the gas. Faster particles transfer more momentum per hit, so the measured pressure rises with temperature.',
    },
  };

  const info = lawInfo[law];

  const reset = () => {
    setLaw('boyle');
    setTemperature(REF_TEMP);
    setVolume(BASE_VOLUME);
    setPlaying(!reducedMotion);
    fields.reset();
  };

  const fillExample = () => {
    setLaw('boyle');
    setVolume(30);
    setTemperature(REF_TEMP);
    fields.touchAll(['law', 'param']);
  };

  const lawPicker = (
    <div className="flex flex-col gap-2">
      {(['boyle', 'charles', 'gaylussac'] as const).map((l) => (
        <button
          key={l}
          onClick={() => { setLaw(l); setTemperature(REF_TEMP); setVolume(BASE_VOLUME); fields.touch('law'); }}
          className={`btn btn-sm ${law === l ? 'btn-primary' : 'btn-outline'}`}
          aria-pressed={law === l}
        >
          {lawInfo[l].name}
        </button>
      ))}
    </div>
  );

  const volumeSlider = (
    <div>
      <label htmlFor="gas-volume" className="flex justify-between mb-2 font-semibold text-sm">
        <span>Volume (Dami)</span>
        <span className="text-secondary">{volume.toFixed(0)} units</span>
      </label>
      <input
        id="gas-volume"
        type="range" min="15" max="100" step="1"
        value={volume}
        onChange={(e) => { setVolume(Number(e.target.value)); fields.touch('param'); }}
        className="range range-secondary range-sm w-full"
        aria-valuetext={`${volume.toFixed(0)} container units`}
      />
    </div>
  );

  const tempSlider = (
    <div>
      <label htmlFor="gas-temp" className="flex justify-between mb-2 font-semibold text-sm">
        <span>Temperature (Temperatura)</span>
        <span className="text-accent">{temperature} K</span>
      </label>
      <input
        id="gas-temp"
        type="range" min="100" max="600" step="10"
        value={temperature}
        onChange={(e) => { setTemperature(Number(e.target.value)); fields.touch('param'); }}
        className="range range-accent range-sm w-full"
        aria-valuetext={`${temperature} kelvin`}
      />
    </div>
  );

  const paramSlider = law === 'boyle' ? volumeSlider : tempSlider;

  return (
    <VisualizerLayout
      title="Gas Laws Simulator (Mga Batas ng Gas)"
      description="Watch gas particles bounce off a piston, and read off a pressure that is measured from those wall collisions, the kinetic molecular theory behind Boyle's, Charles's, and Gay-Lussac's Laws."
      adSlotId="2009"
      guideLink="/blog/gas-laws"
    >
      {!ready ? (
        <GuidedInputFlow
          intro="Pick a gas law, then set the one variable it changes to watch the measured pressure respond."
          onFillExample={fillExample}
          onReset={reset}
          steps={[
            { id: 'law', title: 'Pick a gas law', helper: 'Sets which variable you control.', complete: fields.isTouched('law'), children: lawPicker },
            {
              id: 'param',
              title: law === 'boyle' ? 'Set the volume' : 'Set the temperature',
              helper: law === 'boyle' ? 'Container units, 15 to 100.' : 'Absolute temperature, 100 to 600 K.',
              complete: fields.isTouched('param'),
              children: paramSlider,
            },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          {/* Canvas */}
          <div className="flex-1 min-w-0">
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="w-full h-auto aspect-[5/3] rounded-xl border-2 border-base-300"
            />

            {/* Live readout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="text-center p-3 rounded-lg border bg-base-200 border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Pressure (measured)</div>
                <div className="text-2xl font-bold font-mono text-primary">{displayP.toFixed(2)}</div>
                <div className="text-xs text-base-content/50">atm</div>
              </div>
              <div className="text-center p-3 rounded-lg border bg-base-200 border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Volume</div>
                <div className="text-2xl font-bold font-mono">{displayV.toFixed(0)}</div>
                <div className="text-xs text-base-content/50">units</div>
              </div>
              <div className="text-center p-3 rounded-lg border bg-base-200 border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Temperature</div>
                <div className="text-2xl font-bold font-mono">{displayT.toFixed(0)}</div>
                <div className="text-xs text-base-content/50">K</div>
              </div>
            </div>
            <p className="text-xs text-base-content/60 mt-2 m-0">
              Pressure is totalled from the momentum each particle delivers to the walls. {playing ? 'Pause to read the kinetic-theory value instead.' : 'Press play to measure it live from collisions.'}
            </p>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 flex flex-col gap-6 bg-base-200 p-6 rounded-xl border border-base-300">
            <div>
              <span className="block mb-2 font-bold text-base-content text-sm">Select gas law:</span>
              {lawPicker}
            </div>

            <div className="bg-base-100 p-4 rounded-lg border border-base-300">
              <div className="text-center text-xl font-mono font-bold text-primary mb-1">{info.formula}</div>
              <div className="text-center text-xs text-success font-semibold">{info.constant}</div>
            </div>

            {law === 'boyle' ? volumeSlider : tempSlider}

            <div className="flex gap-2">
              <button
                className={`btn btn-sm flex-1 ${playing ? 'btn-error' : 'btn-primary'}`}
                onClick={() => setPlaying((p) => !p)}
                aria-pressed={playing}
              >
                {playing ? 'Pause' : 'Play'}
              </button>
              <button className="btn btn-sm btn-outline flex-1" onClick={reset}>Reset</button>
            </div>

            <div className="text-sm text-base-content/80 leading-relaxed bg-base-100 p-3 rounded-lg border border-base-300">
              <p className="font-semibold text-primary mb-1">{info.tagalog}</p>
              <p className="m-0">{info.description}</p>
            </div>
          </div>
        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default GasLawsVisualizer;
