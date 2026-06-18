import { useState, useEffect, useRef, useCallback } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { GuidedInputFlow, useTouchedFields } from '../../components/onboarding';

const G = 9.8; // m/s²
const DEFAULT_ANGLE = 35;
const DEFAULT_VELOCITY = 15;
const TARGET_X = 20; // metres — the lata (can) in Tumbang Preso

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ProjectileMotionVisualizer = () => {
  const [angle, setAngle] = useState(DEFAULT_ANGLE);
  const [velocity, setVelocity] = useState(DEFAULT_VELOCITY);
  const [isPlaying, setIsPlaying] = useState(false);
  const [t, setT] = useState(0);
  const fields = useTouchedFields<'angle' | 'velocity'>();
  const ready = fields.isTouched('angle') && fields.isTouched('velocity');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  const rad = (angle * Math.PI) / 180;
  const v0x = velocity * Math.cos(rad);
  const v0y = velocity * Math.sin(rad);

  // Analytic results for a launch from ground level
  const timeOfFlight = (2 * v0y) / G;
  const range = v0x * timeOfFlight;
  const apexHeight = (v0y * v0y) / (2 * G);
  const apexTime = v0y / G;

  // Live values at the current animation time
  const curX = v0x * t;
  const curY = Math.max(0, v0y * t - 0.5 * G * t * t);
  const curVy = v0y - G * t;
  const reachesTarget = Math.abs(range - TARGET_X) < 0.7;

  const stopAnim = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    lastTsRef.current = null;
  }, []);

  useEffect(() => stopAnim, [stopAnim]);

  // Animation loop: advance sim time until the projectile lands.
  useEffect(() => {
    if (!isPlaying) return;
    const tick = (now: number) => {
      if (lastTsRef.current == null) lastTsRef.current = now;
      const dt = (now - lastTsRef.current) / 1000;
      lastTsRef.current = now;
      setT((prev) => {
        const next = prev + dt;
        if (next >= timeOfFlight) {
          setIsPlaying(false);
          return timeOfFlight;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return stopAnim;
  }, [isPlaying, timeOfFlight, stopAnim]);

  // Draw the scene (full arc + traveled portion + marker) whenever inputs change.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const styles = getComputedStyle(canvas);
    const v = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
    const colBg = v('--color-base-200', '#fffdf8');
    const colGrid = v('--color-base-300', '#f2e6d6');
    const colInk = v('--color-base-content', '#2b2b3a');
    const colGround = v('--color-success', '#2fa46a');
    const colArc = v('--color-primary', '#2f8fe6');
    const colTravel = v('--color-accent', '#f5a800');
    const colMarker = v('--color-secondary', '#ff6b8a');
    const colTarget = v('--color-error', '#ff6b8a');

    const W = canvas.width;
    const H = canvas.height;
    const pad = 40;
    const groundY = H - 30;
    const startX = pad;

    // Fit both the range (and the can at 20 m) and the apex on screen.
    const worldX = Math.max(range, TARGET_X + 2, 1);
    const worldY = Math.max(apexHeight, 1);
    const ppm = Math.min((W - 2 * pad) / worldX, (groundY - pad) / worldY);

    const sx = (m: number) => startX + m * ppm;
    const sy = (m: number) => groundY - m * ppm;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = colBg;
    ctx.fillRect(0, 0, W, H);

    // Grid every ~5 m
    ctx.strokeStyle = colGrid;
    ctx.lineWidth = 1;
    for (let m = 0; m <= worldX; m += 5) {
      ctx.beginPath(); ctx.moveTo(sx(m), pad); ctx.lineTo(sx(m), groundY); ctx.stroke();
    }
    for (let m = 0; m <= worldY; m += Math.max(1, Math.round(worldY / 6))) {
      ctx.beginPath(); ctx.moveTo(startX, sy(m)); ctx.lineTo(W - pad, sy(m)); ctx.stroke();
    }

    // Ground
    ctx.fillStyle = colGround;
    ctx.fillRect(0, groundY, W, H - groundY);

    // Target lata at 20 m
    ctx.fillStyle = colInk;
    ctx.fillRect(sx(TARGET_X) - 5, groundY - 22, 10, 22);
    ctx.fillStyle = colTarget;
    ctx.fillRect(sx(TARGET_X) - 5, groundY - 17, 10, 5);

    // Full trajectory arc (faint dashed)
    ctx.strokeStyle = colArc;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 5]);
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    for (let tt = 0; tt <= timeOfFlight + 1e-6; tt += timeOfFlight / 120 || 1) {
      const xx = v0x * tt;
      const yy = v0y * tt - 0.5 * G * tt * tt;
      if (tt === 0) ctx.moveTo(sx(xx), sy(Math.max(0, yy)));
      else ctx.lineTo(sx(xx), sy(Math.max(0, yy)));
    }
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // Traveled portion (solid)
    if (t > 0) {
      ctx.strokeStyle = colTravel;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      const steps = 60;
      for (let i = 0; i <= steps; i++) {
        const tt = (t * i) / steps;
        const xx = v0x * tt;
        const yy = Math.max(0, v0y * tt - 0.5 * G * tt * tt);
        if (i === 0) ctx.moveTo(sx(xx), sy(yy));
        else ctx.lineTo(sx(xx), sy(yy));
      }
      ctx.stroke();
    }

    // Apex marker
    if (apexHeight > 0.05) {
      const apexX = v0x * apexTime;
      ctx.fillStyle = colArc;
      ctx.beginPath(); ctx.arc(sx(apexX), sy(apexHeight), 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colInk;
      ctx.font = '11px Inter, system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`apex ${apexHeight.toFixed(1)} m`, sx(apexX), sy(apexHeight) - 8);
    }

    // Range marker on the ground
    ctx.strokeStyle = colMarker;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(sx(range), groundY); ctx.lineTo(sx(range), groundY + 8); ctx.stroke();
    ctx.fillStyle = colInk;
    ctx.font = 'bold 11px Inter, system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(`range ${range.toFixed(1)} m`, sx(range), groundY + 22);

    // Launch angle/velocity vector at start (when at rest)
    if (t === 0) {
      ctx.save();
      ctx.translate(sx(0), sy(0));
      ctx.strokeStyle = colTarget;
      ctx.lineWidth = 2;
      const vlen = velocity * 3;
      const vx = vlen * Math.cos(rad);
      const vy = vlen * Math.sin(rad);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(vx, -vy); ctx.stroke();
      ctx.fillStyle = colTarget;
      ctx.beginPath();
      ctx.moveTo(vx, -vy);
      ctx.lineTo(vx - 8 * Math.cos(rad - 0.5), -(vy - 8 * Math.sin(rad - 0.5)));
      ctx.lineTo(vx - 8 * Math.cos(rad + 0.5), -(vy - 8 * Math.sin(rad + 0.5)));
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Projectile marker (pamato)
    ctx.fillStyle = colMarker;
    ctx.beginPath();
    ctx.arc(sx(curX), sy(curY), 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = colInk;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    if (reachesTarget && t >= timeOfFlight && timeOfFlight > 0) {
      ctx.fillStyle = colTravel;
      ctx.font = 'bold 28px Inter, system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('SAPUL!', sx(TARGET_X), groundY - 40);
    }
  }, [angle, velocity, t, rad, v0x, v0y, range, apexHeight, apexTime, timeOfFlight, curX, curY, reachesTarget]);

  const throwIt = () => {
    stopAnim();
    if (reducedMotion()) {
      // Skip the flight animation; jump straight to the landed state.
      setT(timeOfFlight);
      setIsPlaying(false);
      return;
    }
    setT(0);
    setIsPlaying(true);
  };

  const reset = () => {
    stopAnim();
    setIsPlaying(false);
    setT(0);
    setAngle(DEFAULT_ANGLE);
    setVelocity(DEFAULT_VELOCITY);
    fields.reset();
  };

  const fillExample = () => {
    stopAnim();
    setIsPlaying(false);
    setT(0);
    setAngle(DEFAULT_ANGLE);
    setVelocity(DEFAULT_VELOCITY);
    fields.touchAll(['angle', 'velocity']);
  };

  const angleControl = (
    <div>
      <label htmlFor="proj-angle" className="flex justify-between mb-2 font-semibold text-sm">
        <span>Anggulo (Angle <span className="font-serif italic">θ</span>)</span>
        <span className="text-primary font-mono">{angle}°</span>
      </label>
      <input
        id="proj-angle"
        type="range" min="0" max="90" value={angle}
        onChange={(e) => { setAngle(Number(e.target.value)); setT(0); setIsPlaying(false); fields.touch('angle'); }}
        className="range range-primary range-sm"
        aria-valuetext={`${angle} degrees`}
      />
    </div>
  );

  const velocityControl = (
    <div>
      <label htmlFor="proj-vel" className="flex justify-between mb-2 font-semibold text-sm">
        <span>Bilis ng Hagis (Velocity <span className="font-serif italic">v<sub className="text-xs">0</sub></span>)</span>
        <span className="text-secondary font-mono">{velocity} m/s</span>
      </label>
      <input
        id="proj-vel"
        type="range" min="1" max="40" value={velocity}
        onChange={(e) => { setVelocity(Number(e.target.value)); setT(0); setIsPlaying(false); fields.touch('velocity'); }}
        className="range range-secondary range-sm"
        aria-valuetext={`${velocity} metres per second`}
      />
    </div>
  );

  return (
    <VisualizerLayout
      title="Tumbang Preso (Projectile Motion)"
      description="Set the launch angle and speed, throw the pamato, and read off its range, apex height, and time of flight from the parabolic path it traces."
      adSlotId="2006"
      guideLink="/blog/projectile-motion"
    >
      {!ready ? (
        <GuidedInputFlow
          intro="Set the launch angle and speed, then throw the pamato and read its range, apex, and flight time."
          onFillExample={fillExample}
          onReset={reset}
          steps={[
            { id: 'angle', title: 'Set the launch angle', helper: 'Angle above the ground (0 to 90 degrees).', complete: fields.isTouched('angle'), children: angleControl },
            { id: 'velocity', title: 'Set the launch speed', helper: 'Throw speed in metres per second (1 to 40).', complete: fields.isTouched('velocity'), children: velocityControl },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6">
          <div className="rounded-xl overflow-hidden border border-base-300">
            <canvas
              ref={canvasRef}
              width={600}
              height={380}
              className="w-full h-auto aspect-[30/19] block"
              role="img"
              aria-label={`Projectile launched at ${angle} degrees and ${velocity} metres per second. Range ${range.toFixed(1)} metres, apex height ${apexHeight.toFixed(1)} metres, time of flight ${timeOfFlight.toFixed(2)} seconds.`}
            />
          </div>

          {/* Result readouts */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
              <div className="text-[10px] uppercase font-bold text-secondary/70">Range (Layo)</div>
              <div className="font-mono font-bold text-secondary text-lg">{range.toFixed(1)} m</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
              <div className="text-[10px] uppercase font-bold text-primary/70">Apex (Taas)</div>
              <div className="font-mono font-bold text-primary text-lg">{apexHeight.toFixed(1)} m</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
              <div className="text-[10px] uppercase font-bold text-accent/70">Flight time</div>
              <div className="font-mono font-bold text-accent text-lg">{timeOfFlight.toFixed(2)} s</div>
            </div>
          </div>

          {/* Live values */}
          <div className="grid grid-cols-4 gap-3 mt-3 text-center">
            <div className="text-sm"><div className="text-base-content/60 text-xs">Oras (t)</div><strong className="font-mono">{t.toFixed(2)} s</strong></div>
            <div className="text-sm"><div className="text-base-content/60 text-xs">Layo (x)</div><strong className="font-mono">{curX.toFixed(1)} m</strong></div>
            <div className="text-sm"><div className="text-base-content/60 text-xs">Taas (y)</div><strong className="font-mono">{curY.toFixed(1)} m</strong></div>
            <div className="text-sm"><div className="text-base-content/60 text-xs">Bilis (v_y)</div><strong className="font-mono">{curVy.toFixed(1)} m/s</strong></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="flex flex-col gap-4">
              {angleControl}
              {velocityControl}
            </div>

            <div className="flex gap-3 items-center h-full">
              <button className="btn btn-primary flex-1" onClick={throwIt} disabled={isPlaying || timeOfFlight === 0}>
                {t >= timeOfFlight && t > 0 ? 'Ulitin (Replay)' : 'Hagis! (Throw)'}
              </button>
              <button className="btn btn-outline" onClick={reset}>Reset</button>
            </div>
          </div>
        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default ProjectileMotionVisualizer;
