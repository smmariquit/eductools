import { useEffect, useRef, useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { IntroState, useIntroState } from '../../components/onboarding';

const CANVAS_W = 600;
const CANVAS_H = 260;
const X_PAD = 40;
const PX_PER_M = (CANVAS_W - 2 * X_PAD) / 10; // 10 metres of string shown
const MARKER_X_M = 1.5; // a single highlighted particle, in metres

const DEFAULTS = { amplitude: 0.8, frequency: 1.0, wavelength: 2.5 };

const WavePhysicsVisualizer = () => {
  const intro = useIntroState();
  const [amplitude, setAmplitude] = useState(DEFAULTS.amplitude); // metres
  const [frequency, setFrequency] = useState(DEFAULTS.frequency); // Hz
  const [wavelength, setWavelength] = useState(DEFAULTS.wavelength); // metres
  const [playing, setPlaying] = useState(true);

  // Speed is DERIVED from v = fλ, so no slider can ever break the relationship.
  const speed = frequency * wavelength; // m/s
  const period = 1 / frequency; // s

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  // Keep live params in a ref so the animation loop never restarts (and the
  // wave never jumps) when a slider moves.
  const paramsRef = useRef({ amplitude, frequency, wavelength, playing });
  useEffect(() => {
    paramsRef.current = { amplitude, frequency, wavelength, playing };
  }, [amplitude, frequency, wavelength, playing]);

  useEffect(() => {
    if (!intro.started) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const start = performance.now();
    let elapsed = 0;
    let last = start;

    const mid = CANVAS_H / 2;

    const draw = (now: number) => {
      const { amplitude: A, frequency: f, wavelength: lambda, playing: isPlaying } = paramsRef.current;
      const dt = (now - last) / 1000;
      last = now;
      if (isPlaying) elapsed += dt;
      const t = elapsed;

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.fillStyle = '#fffdf8';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Equilibrium (rest) line
      ctx.strokeStyle = 'rgba(43,43,58,0.25)';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(X_PAD, mid);
      ctx.lineTo(CANVAS_W - X_PAD, mid);
      ctx.stroke();
      ctx.setLineDash([]);

      // The transverse wave: y(x,t) = A sin(2π(x/λ − f t))
      ctx.strokeStyle = '#2f8fe6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = X_PAD; px <= CANVAS_W - X_PAD; px++) {
        const xm = (px - X_PAD) / PX_PER_M;
        const y = mid - A * PX_PER_M * Math.sin(2 * Math.PI * (xm / lambda - f * t));
        if (px === X_PAD) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      ctx.stroke();

      // Highlighted particle — shows motion is purely vertical (transverse).
      const markerPx = X_PAD + MARKER_X_M * PX_PER_M;
      const markerY = mid - A * PX_PER_M * Math.sin(2 * Math.PI * (MARKER_X_M / lambda - f * t));
      ctx.strokeStyle = 'rgba(43,43,58,0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(markerPx, mid - A * PX_PER_M - 6);
      ctx.lineTo(markerPx, mid + A * PX_PER_M + 6);
      ctx.stroke();
      ctx.fillStyle = '#ff6b8a';
      ctx.beginPath();
      ctx.arc(markerPx, markerY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2b2b3a';
      ctx.font = '11px Inter, system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('moves up & down only', markerPx, mid + A * PX_PER_M + 22);

      // Wavelength marker — span one λ from the first visible crest.
      // Crest where sin = +1 → x/λ − f t = 0.25 + n.
      const nFirst = Math.ceil((0.5 / lambda) - 0.25 + f * t);
      const crest1m = lambda * (0.25 + nFirst + f * t);
      const crest1px = X_PAD + crest1m * PX_PER_M;
      const crest2px = crest1px + lambda * PX_PER_M;
      if (crest2px <= CANVAS_W - X_PAD) {
        const yArrow = 24;
        ctx.strokeStyle = '#f5a800';
        ctx.fillStyle = '#f5a800';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(crest1px, yArrow);
        ctx.lineTo(crest2px, yArrow);
        ctx.stroke();
        // arrowheads
        [[crest1px, 1], [crest2px, -1]].forEach(([x, dir]) => {
          ctx.beginPath();
          ctx.moveTo(x, yArrow);
          ctx.lineTo(x + dir * 6, yArrow - 4);
          ctx.lineTo(x + dir * 6, yArrow + 4);
          ctx.fill();
        });
        ctx.font = 'bold 12px Inter, system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(`λ = ${lambda.toFixed(1)} m`, (crest1px + crest2px) / 2, yArrow - 8);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [intro.started]);

  const reset = () => {
    setAmplitude(DEFAULTS.amplitude);
    setFrequency(DEFAULTS.frequency);
    setWavelength(DEFAULTS.wavelength);
    setPlaying(true);
  };

  return (
    <VisualizerLayout
      title="Mga Alon (Wave Physics)"
      description="A 1D transverse traveling wave on a string. Wavelength, frequency, and wave speed always obey v = fλ."
      adSlotId="1005"
      guideLink="/blog/wave-physics"
    >
      <div className="card lg:card-side bg-base-100 shadow-xl border border-base-200 overflow-hidden">
        {!intro.started ? (
          <div className="card-body p-6 md:p-8">
            <IntroState
              lead="Watch a transverse wave travel along a string, then change its amplitude, frequency, and wavelength to see how v = fλ holds."
              actionLabel="Start the wave"
              onStart={intro.start}
            />
          </div>
        ) : (
        <>
        <div className="w-full lg:w-2/3 p-4 flex flex-col gap-4 justify-center">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="w-full h-auto rounded-xl border-2 border-base-300"
            role="img"
            aria-label={`Transverse wave on a string with wavelength ${wavelength.toFixed(1)} metres, frequency ${frequency.toFixed(1)} hertz, travelling at ${speed.toFixed(2)} metres per second.`}
          />
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
              <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Wave Speed (v = fλ)</div>
              <div className="text-xl font-bold font-mono text-accent">{speed.toFixed(2)} m/s</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
              <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Period (T = 1/f)</div>
              <div className="text-xl font-bold font-mono text-primary">{period.toFixed(2)} s</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
              <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Frequency</div>
              <div className="text-xl font-bold font-mono text-secondary">{frequency.toFixed(1)} Hz</div>
            </div>
          </div>
        </div>

        <div className="card-body lg:w-1/3 flex flex-col gap-6 justify-center bg-base-100">
          <div>
            <label htmlFor="wave-amplitude" className="flex justify-between mb-2 font-semibold text-sm">
              <span>Laki ng Alon (Amplitude)</span>
              <span className="text-primary font-mono">{amplitude.toFixed(1)} m</span>
            </label>
            <input
              id="wave-amplitude"
              type="range" min="0.2" max="1.5" step="0.1"
              value={amplitude}
              onChange={(e) => setAmplitude(Number(e.target.value))}
              className="range range-primary range-sm w-full"
              aria-valuetext={`${amplitude.toFixed(1)} metres`}
            />
          </div>

          <div>
            <label htmlFor="wave-frequency" className="flex justify-between mb-2 font-semibold text-sm">
              <span>Dalas (Frequency)</span>
              <span className="text-secondary font-mono">{frequency.toFixed(1)} Hz</span>
            </label>
            <input
              id="wave-frequency"
              type="range" min="0.2" max="2" step="0.1"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="range range-secondary range-sm w-full"
              aria-valuetext={`${frequency.toFixed(1)} hertz`}
            />
          </div>

          <div>
            <label htmlFor="wave-wavelength" className="flex justify-between mb-2 font-semibold text-sm">
              <span>Haba ng Alon (Wavelength λ)</span>
              <span className="text-accent font-mono">{wavelength.toFixed(1)} m</span>
            </label>
            <input
              id="wave-wavelength"
              type="range" min="0.5" max="5" step="0.1"
              value={wavelength}
              onChange={(e) => setWavelength(Number(e.target.value))}
              className="range range-accent range-sm w-full"
              aria-valuetext={`${wavelength.toFixed(1)} metres`}
            />
          </div>

          <div className="text-xs text-base-content/60 bg-base-200 rounded-lg p-3 border border-base-300">
            Speed isn't a separate slider — it's computed as <span className="font-mono">v = f × λ</span>, so the three quantities always stay consistent.
          </div>

          <div className="flex gap-3">
            <button className="btn btn-primary btn-sm flex-1" onClick={() => setPlaying(p => !p)} aria-pressed={playing}>
              {playing ? 'Pause' : 'Play'}
            </button>
            <button className="btn btn-outline btn-sm flex-1" onClick={reset}>Reset</button>
          </div>
        </div>
        </>
        )}
      </div>
    </VisualizerLayout>
  );
};
export default WavePhysicsVisualizer;
