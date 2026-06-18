import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { IntroState, useIntroState } from '../../components/onboarding';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'reactant-a' | 'reactant-b' | 'product';
  // Direction (radians) the reactive site points. A collision only reacts
  // when both molecules meet with their reactive sites facing each other.
  orientation: number;
  spin: number;
  collisionCooldown: number;
}

const DEFAULT_TEMPERATURE = 300; // Kelvin
const DEFAULT_CONCENTRATION = 20;

// Read a theme CSS variable so the canvas matches the active DaisyUI theme
// instead of hardcoded hex. Falls back if the variable is missing.
const themeColor = (name: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

// Orientation tolerance: a reactive site must point within ~60° of the
// line joining the two molecules. cos(60°) = 0.5.
const ORIENTATION_COS = 0.5;

const ReactionRateVisualizer = () => {
  const intro = useIntroState();
  const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE);
  const [concentration, setConcentration] = useState(DEFAULT_CONCENTRATION);
  const [hasCatalyst, setHasCatalyst] = useState(false);
  const [running, setRunning] = useState(
    () => !(typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches),
  );
  const [collisionCount, setCollisionCount] = useState(0);
  const [reactionCount, setReactionCount] = useState(0);
  const [missedEnergy, setMissedEnergy] = useState(0);
  const [missedOrientation, setMissedOrientation] = useState(0);
  const [reactionRate, setReactionRate] = useState('0.00');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const collisionCountRef = useRef(0);
  const reactionCountRef = useRef(0);
  const missedEnergyRef = useRef(0);
  const missedOrientationRef = useRef(0);
  const lastResetRef = useRef(0);
  const runningRef = useRef(running);

  // Activation energy in the simulation's own kinetic-energy units. A catalyst
  // opens a lower-energy pathway, so the threshold drops.
  const activationEnergy = hasCatalyst ? 4 : 9;
  const speedMultiplier = temperature / DEFAULT_TEMPERATURE;

  useEffect(() => { runningRef.current = running; }, [running]);

  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    const half = Math.floor(concentration / 2);
    for (let i = 0; i < concentration; i++) {
      particles.push({
        x: Math.random() * 480 + 10,
        y: Math.random() * 280 + 10,
        vx: (Math.random() - 0.5) * 3 * speedMultiplier,
        vy: (Math.random() - 0.5) * 3 * speedMultiplier,
        radius: 7,
        type: i < half ? 'reactant-a' : 'reactant-b',
        orientation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.12,
        collisionCooldown: 0,
      });
    }
    particlesRef.current = particles;
    collisionCountRef.current = 0;
    reactionCountRef.current = 0;
    missedEnergyRef.current = 0;
    missedOrientationRef.current = 0;
    lastResetRef.current = Date.now();

    requestAnimationFrame(() => {
      setCollisionCount(0);
      setReactionCount(0);
      setMissedEnergy(0);
      setMissedOrientation(0);
      setReactionRate('0.00');
    });
  }, [concentration, speedMultiplier]);

  const resetAll = useCallback(() => {
    setTemperature(DEFAULT_TEMPERATURE);
    setConcentration(DEFAULT_CONCENTRATION);
    setHasCatalyst(false);
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    initParticles();
  }, [concentration, hasCatalyst, initParticles]);

  // Rescale speeds when temperature changes so kinetic energy tracks T.
  useEffect(() => {
    particlesRef.current.forEach((p) => {
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 0) {
        const factor = (speedMultiplier * 2.1) / speed;
        p.vx *= factor;
        p.vy *= factor;
      }
    });
  }, [temperature, speedMultiplier]);

  useEffect(() => {
    if (!intro.started) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = {
      bg: themeColor('--color-base-100', '#fff8ef'),
      grid: themeColor('--color-base-300', '#f2e6d6'),
      ink: themeColor('--color-base-content', '#2b2b3a'),
      a: themeColor('--color-primary', '#2f8fe6'),
      b: themeColor('--color-error', '#ff6b8a'),
      product: themeColor('--color-success', '#2fa46a'),
      catalyst: themeColor('--color-accent', '#f5a800'),
    };

    let frameCount = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 3;
      ctx.strokeRect(2, 2, w - 4, h - 4);

      if (hasCatalyst) {
        ctx.fillStyle = colors.catalyst;
        ctx.globalAlpha = 0.18;
        ctx.fillRect(5, h - 20, w - 10, 18);
        ctx.globalAlpha = 1;
        ctx.fillStyle = colors.catalyst;
        ctx.font = 'bold 10px Lexend, system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('CATALYST SURFACE', w / 2, h - 7);
      }

      const particles = particlesRef.current;
      const advancing = runningRef.current;

      particles.forEach((p) => {
        if (advancing) {
          p.x += p.vx;
          p.y += p.vy;
          p.orientation += p.spin;
          if (p.collisionCooldown > 0) p.collisionCooldown--;
        }
        if (p.x - p.radius < 3) { p.x = p.radius + 3; p.vx = Math.abs(p.vx); }
        if (p.x + p.radius > w - 3) { p.x = w - p.radius - 3; p.vx = -Math.abs(p.vx); }
        if (p.y - p.radius < 3) { p.y = p.radius + 3; p.vy = Math.abs(p.vy); }
        const bottomBound = hasCatalyst ? h - 22 : h - 3;
        if (p.y + p.radius > bottomBound) { p.y = bottomBound - p.radius; p.vy = -Math.abs(p.vy); }
      });

      if (advancing) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
            const minDist = a.radius + b.radius;
            if (dist >= minDist || a.collisionCooldown > 0 || b.collisionCooldown > 0) continue;

            const isReactivePair =
              a.type !== b.type && a.type !== 'product' && b.type !== 'product';

            if (isReactivePair) {
              collisionCountRef.current++;
              // Total kinetic energy of the pair (simulation units).
              const energy = 0.5 * (a.vx * a.vx + a.vy * a.vy + b.vx * b.vx + b.vy * b.vy);
              const enoughEnergy = energy >= activationEnergy;

              // Orientation test: each reactive site must face the other molecule.
              const ux = -dx / dist; // unit vector from a -> b
              const uy = -dy / dist;
              const alignA = Math.cos(a.orientation) * ux + Math.sin(a.orientation) * uy;
              const alignB = Math.cos(b.orientation) * -ux + Math.sin(b.orientation) * -uy;
              const goodOrientation = alignA >= ORIENTATION_COS && alignB >= ORIENTATION_COS;

              if (enoughEnergy && goodOrientation) {
                reactionCountRef.current++;
                a.type = 'product';
                b.type = 'product';
                a.collisionCooldown = 60;
                b.collisionCooldown = 60;
              } else if (!enoughEnergy) {
                missedEnergyRef.current++;
              } else {
                missedOrientationRef.current++;
              }
            }

            // Elastic separation (always).
            const nx = dx / dist;
            const ny = dy / dist;
            const dvx = a.vx - b.vx;
            const dvy = a.vy - b.vy;
            const dot = dvx * nx + dvy * ny;
            a.vx -= dot * nx;
            a.vy -= dot * ny;
            b.vx += dot * nx;
            b.vy += dot * ny;
            const overlap = (minDist - dist) / 2;
            a.x += overlap * nx;
            a.y += overlap * ny;
            b.x -= overlap * nx;
            b.y -= overlap * ny;
            a.collisionCooldown = Math.max(a.collisionCooldown, 8);
            b.collisionCooldown = Math.max(b.collisionCooldown, 8);
          }
        }
      }

      particles.forEach((p) => {
        const color = p.type === 'reactant-a' ? colors.a : p.type === 'reactant-b' ? colors.b : colors.product;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        // Reactive-site notch (reactants only) shows orientation.
        if (p.type !== 'product') {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + Math.cos(p.orientation) * (p.radius + 5), p.y + Math.sin(p.orientation) * (p.radius + 5));
          ctx.strokeStyle = colors.ink;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        if (p.collisionCooldown > 40 && p.type === 'product') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 8, 0, Math.PI * 2);
          ctx.globalAlpha = 0.3;
          ctx.fillStyle = colors.product;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      if (advancing && frameCount % 30 === 0) {
        setCollisionCount(collisionCountRef.current);
        setReactionCount(reactionCountRef.current);
        setMissedEnergy(missedEnergyRef.current);
        setMissedOrientation(missedOrientationRef.current);
        const elapsed = Math.max(1, (Date.now() - lastResetRef.current) / 1000);
        setReactionRate((reactionCountRef.current / elapsed).toFixed(2));
      }
      frameCount++;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [hasCatalyst, activationEnergy, intro.started]);

  // --- Maxwell-Boltzmann energy distribution (qualitative, relative units) ---
  // g(E) ∝ √E · exp(−E / kT). The thermal scale rises with temperature, so the
  // peak shifts right and the fraction of molecules above Ea grows.
  const { curvePath, areaPath, fractionAboveEa, eaX, peakLabel } = useMemo(() => {
    const W = 300;
    const H = 150;
    const eMax = 30; // relative energy units shown on the x-axis
    const kT = temperature / 100; // thermal energy scale (relative units)
    const steps = 120;
    const g = (E: number) => Math.sqrt(Math.max(E, 0)) * Math.exp(-E / kT);

    let peak = 0;
    const samples: { e: number; y: number }[] = [];
    for (let s = 0; s <= steps; s++) {
      const E = (s / steps) * eMax;
      const y = g(E);
      if (y > peak) peak = y;
      samples.push({ e: E, y });
    }

    // Numeric integral of the (unnormalised) curve, total and above Ea.
    let total = 0;
    let above = 0;
    const dE = eMax / steps;
    for (let s = 0; s < steps; s++) {
      const mid = ((s + 0.5) / steps) * eMax;
      const area = g(mid) * dE;
      total += area;
      if (mid >= activationEnergy) above += area;
    }
    const fraction = total > 0 ? above / total : 0;

    const toX = (E: number) => (E / eMax) * W;
    const toY = (y: number) => H - (y / (peak || 1)) * (H - 10);

    let curve = `M ${toX(0)} ${toY(0)}`;
    samples.forEach((p) => { curve += ` L ${toX(p.e).toFixed(1)} ${toY(p.y).toFixed(1)}`; });

    const eaXPos = toX(activationEnergy);
    let area = `M ${eaXPos.toFixed(1)} ${H}`;
    samples.filter((p) => p.e >= activationEnergy).forEach((p) => {
      area += ` L ${toX(p.e).toFixed(1)} ${toY(p.y).toFixed(1)}`;
    });
    area += ` L ${toX(eMax)} ${H} Z`;

    return {
      curvePath: curve,
      areaPath: area,
      fractionAboveEa: fraction,
      eaX: eaXPos,
      peakLabel: kT,
    };
  }, [temperature, activationEnergy]);

  const fractionPct = (fractionAboveEa * 100).toFixed(1);

  return (
    <VisualizerLayout
      title="Reaction Rate Simulator (Bilis ng Reaksyon)"
      description="See how collision theory works: molecules react only when they collide with enough energy and the right orientation. Temperature, concentration, and a catalyst change the rate."
      adSlotId="2019"
      guideLink="/blog/reaction-rate"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        {!intro.started ? (
          <div className="card-body p-6 md:p-8">
            <IntroState
              lead="Watch molecules collide and react, then change temperature, concentration, and a catalyst to speed up or slow down the reaction."
              actionLabel="Start the reaction"
              onStart={intro.start}
            />
          </div>
        ) : (
        <div className="card-body p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <canvas
              ref={canvasRef}
              width={500}
              height={300}
              className="w-full h-auto aspect-[5/3] rounded-xl border-2 border-base-300"
              role="img"
              aria-label="Particle box: reactant A and B molecules bounce and collide. A reaction only occurs when a collision has enough energy and the reactive sites (notches) face each other."
            />

            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-base-content/70">
              <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-primary" aria-hidden="true" />Reactant A</span>
              <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-error" aria-hidden="true" />Reactant B</span>
              <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-success" aria-hidden="true" />Product</span>
              <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 bg-base-content" aria-hidden="true" />Reactive site</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Collisions</div>
                <div className="text-2xl font-bold font-mono text-primary">{collisionCount}</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Reactions</div>
                <div className="text-2xl font-bold font-mono text-success">{reactionCount}</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Too little energy</div>
                <div className="text-2xl font-bold font-mono text-error">{missedEnergy}</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Wrong orientation</div>
                <div className="text-2xl font-bold font-mono text-warning">{missedOrientation}</div>
              </div>
            </div>

            <div className="mt-3 text-center p-3 rounded-lg bg-base-200 border border-base-300">
              <span className="text-xs uppercase tracking-wider font-bold text-base-content/60 mr-2">Reaction rate</span>
              <span className="text-xl font-bold font-mono text-accent">{reactionRate}/s</span>
            </div>

            {/* Maxwell-Boltzmann energy distribution */}
            <div className="mt-4 bg-base-200 p-4 rounded-xl border border-base-300">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-display font-bold text-base-content m-0">Energy of the molecules</h3>
                <span className="text-sm font-mono text-success font-bold">{fractionPct}% above E<sub>a</sub></span>
              </div>
              <svg viewBox="0 0 300 168" className="w-full" role="img" aria-label={`Maxwell-Boltzmann distribution at ${temperature} kelvin. The shaded area is the fraction of molecules with energy above the activation energy: about ${fractionPct} percent.`}>
                <line x1="0" y1="150" x2="300" y2="150" stroke="currentColor" strokeOpacity="0.3" />
                <path d={areaPath} className="fill-success" fillOpacity="0.25" />
                <path d={curvePath} fill="none" className="stroke-primary" strokeWidth="2.5" />
                <line x1={eaX} y1="0" x2={eaX} y2="150" className="stroke-error" strokeWidth="2" strokeDasharray="4 3" />
                <text x={Math.min(eaX + 4, 250)} y="14" className="fill-error" fontSize="11" fontWeight="bold">Ea {hasCatalyst ? '(with catalyst)' : ''}</text>
                <text x="4" y="165" fontSize="10" fill="currentColor" fillOpacity="0.6">low energy</text>
                <text x="300" y="165" fontSize="10" textAnchor="end" fill="currentColor" fillOpacity="0.6">high energy →</text>
              </svg>
              <p className="text-xs text-base-content/60 mt-1 leading-snug">
                Raising the temperature spreads the curve to the right (mean thermal energy ≈ {peakLabel.toFixed(1)} units), so a bigger slice of molecules clears the activation energy. A catalyst instead lowers E<sub>a</sub>, moving the dashed line left. Energy is shown in relative units, not kJ/mol.
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 flex flex-col gap-5 bg-base-200 p-6 rounded-xl border border-base-300">
            <div>
              <label htmlFor="temperature" className="flex justify-between mb-2 font-semibold text-sm">
                <span>Temperature (Temperatura)</span>
                <span className="text-accent font-mono">{temperature} K</span>
              </label>
              <input
                id="temperature"
                type="range" min="100" max="600" step="25"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="range range-accent range-sm w-full"
                aria-valuetext={`${temperature} kelvin`}
              />
              <div className="flex justify-between text-xs text-base-content/50 mt-1"><span>Cold</span><span>Hot</span></div>
            </div>

            <div>
              <label htmlFor="concentration" className="flex justify-between mb-2 font-semibold text-sm">
                <span>Concentration (Particles)</span>
                <span className="text-primary font-mono">{concentration}</span>
              </label>
              <input
                id="concentration"
                type="range" min="6" max="50" step="2"
                value={concentration}
                onChange={(e) => setConcentration(Number(e.target.value))}
                className="range range-primary range-sm w-full"
                aria-valuetext={`${concentration} molecules`}
              />
            </div>

            <button
              type="button"
              onClick={() => setHasCatalyst((c) => !c)}
              aria-pressed={hasCatalyst}
              className={`btn btn-sm justify-start gap-3 ${hasCatalyst ? 'btn-secondary' : 'btn-outline'}`}
            >
              <span className="font-bold">Catalyst (Katalista)</span>
              <span className="text-xs opacity-80">{hasCatalyst ? 'on' : 'off'}</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRunning((r) => !r)}
                aria-pressed={running}
                className={`btn btn-sm flex-1 ${running ? 'btn-primary' : 'btn-outline'}`}
              >
                {running ? 'Pause' : 'Play'}
              </button>
              <button type="button" onClick={resetAll} className="btn btn-outline btn-sm flex-1">Reset</button>
            </div>

            <div className="bg-base-100 p-4 rounded-lg border border-base-300">
              <div className="text-xs font-bold text-base-content/60 uppercase tracking-wider mb-2">Activation Energy</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-base-300 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${hasCatalyst ? 'bg-secondary' : 'bg-error'}`}
                    style={{ width: `${(activationEnergy / 9) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-mono font-bold">{hasCatalyst ? 'LOW' : 'HIGH'}</span>
              </div>
              <p className="text-xs text-base-content/60 mt-2 leading-snug">A reaction needs a collision that is both energetic enough and correctly oriented. The notch on each molecule marks its reactive site.</p>
            </div>
          </div>
        </div>
        )}
      </div>
    </VisualizerLayout>
  );
};
export default ReactionRateVisualizer;
