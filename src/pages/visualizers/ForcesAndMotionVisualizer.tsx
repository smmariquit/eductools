import { useState, useRef, useEffect } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { GuidedInputFlow, useTouchedFields } from '../../components/onboarding';

const G = 9.8; // m/s², for the weight that sets the friction force
const DEFAULT_FORCE = 0;
const DEFAULT_MASS = 1500; // base jeepney mass (kg)
const DEFAULT_FRICTION = 0.05; // rolling-resistance-ish coefficient
const REST_THRESHOLD = 0.01; // m/s — below this the jeep counts as stopped

// Net force for the current state. Static friction holds the jeep still until
// the applied force beats it; once rolling, kinetic friction opposes motion.
const netForceFor = (applied: number, mass: number, mu: number, v: number) => {
  const frictionMax = mu * mass * G;
  if (Math.abs(v) < REST_THRESHOLD) {
    if (Math.abs(applied) <= frictionMax) return 0; // static friction balances it
    return applied - Math.sign(applied) * frictionMax;
  }
  return applied - Math.sign(v) * frictionMax;
};

const ForcesAndMotionVisualizer = () => {
  const [force, setForce] = useState(DEFAULT_FORCE);
  const [mass, setMass] = useState(DEFAULT_MASS);
  const [friction, setFriction] = useState(DEFAULT_FRICTION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [motion, setMotion] = useState({ v: 0, x: 0 });
  const fields = useTouchedFields<'force' | 'mass' | 'friction'>();
  const ready = fields.isTouched('force') && fields.isTouched('mass') && fields.isTouched('friction');

  // Live inputs the animation frame reads, so the loop never closes over stale state.
  const forceRef = useRef(force);
  const massRef = useRef(mass);
  const frictionRef = useRef(friction);
  useEffect(() => {
    forceRef.current = force;
    massRef.current = mass;
    frictionRef.current = friction;
  }, [force, mass, friction]);

  const rafRef = useRef<number | undefined>(undefined);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    if (!isPlaying) return;
    lastRef.current = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastRef.current) / 1000); // clamp so a backgrounded tab can't jump
      lastRef.current = now;
      setMotion((prev) => {
        const fNet = netForceFor(forceRef.current, massRef.current, frictionRef.current, prev.v);
        const a = fNet / massRef.current;
        let v = prev.v + a * dt;
        // Friction shouldn't drag a coasting jeep backwards past a standstill.
        if (Math.abs(prev.v) >= REST_THRESHOLD && Math.sign(v) !== Math.sign(prev.v) && Math.abs(forceRef.current) <= frictionRef.current * massRef.current * G) {
          v = 0;
        }
        return { v, x: prev.x + v * dt };
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying]);

  const fNet = netForceFor(force, mass, friction, motion.v);
  const accel = fNet / mass;
  const frictionForce = Math.abs(motion.v) < REST_THRESHOLD
    ? Math.min(Math.abs(force), friction * mass * G)
    : friction * mass * G;

  const reset = () => {
    setIsPlaying(false);
    setMotion({ v: 0, x: 0 });
    setForce(DEFAULT_FORCE);
    setFriction(DEFAULT_FRICTION);
    fields.reset();
  };

  const fillExample = () => {
    setIsPlaying(false);
    setMotion({ v: 0, x: 0 });
    setForce(4000);
    setMass(DEFAULT_MASS);
    setFriction(DEFAULT_FRICTION);
    fields.touchAll(['force', 'mass', 'friction']);
  };

  // Map metres travelled onto the looping road (0–100% of the track).
  const trackPercent = ((motion.x / 40) % 1 + 1) % 1 * 100;

  const forceControl = (
    <div>
      <label htmlFor="fm-force" className="flex justify-between mb-2 font-semibold text-sm text-base-content">
        <span>Pwersa ng Makina (Applied force)</span>
        <span className="text-primary">{force} N</span>
      </label>
      <input
        id="fm-force"
        type="range" min="0" max="8000" step="100"
        value={force}
        onChange={(e) => { setForce(Number(e.target.value)); fields.touch('force'); }}
        className="range range-primary w-full"
        aria-valuetext={`${force} newtons applied force`}
      />
    </div>
  );

  const massControl = (
    <div>
      <label htmlFor="fm-mass" className="flex justify-between mb-2 font-semibold text-sm text-base-content">
        <span>Bigat: Jeep + Pasahero (Mass)</span>
        <span className="text-primary">{mass} kg</span>
      </label>
      <input
        id="fm-mass"
        type="range" min="1500" max="4000" step="100"
        value={mass}
        onChange={(e) => { setMass(Number(e.target.value)); fields.touch('mass'); }}
        className="range range-secondary w-full"
        aria-valuetext={`${mass} kilograms total mass`}
      />
    </div>
  );

  const frictionControl = (
    <div>
      <label htmlFor="fm-friction" className="flex justify-between mb-2 font-semibold text-sm text-base-content">
        <span>Friksyon sa Kalsada (Friction coefficient)</span>
        <span className="text-primary">{friction.toFixed(2)}</span>
      </label>
      <input
        id="fm-friction"
        type="range" min="0" max="0.4" step="0.01"
        value={friction}
        onChange={(e) => { setFriction(Number(e.target.value)); fields.touch('friction'); }}
        className="range range-accent w-full"
        aria-valuetext={`friction coefficient ${friction.toFixed(2)}`}
      />
    </div>
  );

  return (
    <VisualizerLayout
      title="Jeepney Dynamics (Forces & Motion)"
      description="See how applied force, friction, and mass set a jeepney's acceleration through Newton's second law, F_net = ma."
      adSlotId="1005"
      guideLink="/blog/forces-and-motion"
    >
      {!ready ? (
        <GuidedInputFlow
          intro="Set the engine force, the jeepney's mass, and the road friction to see the net force and acceleration."
          onFillExample={fillExample}
          onReset={reset}
          steps={[
            { id: 'force', title: 'Set the applied force', helper: 'Engine push in newtons (0 to 8000).', complete: fields.isTouched('force'), children: forceControl },
            { id: 'mass', title: 'Set the mass', helper: 'Jeep plus passengers in kilograms (1500 to 4000).', complete: fields.isTouched('mass'), children: massControl },
            { id: 'friction', title: 'Set the friction', helper: 'Road friction coefficient (0 to 0.40).', complete: fields.isTouched('friction'), children: frictionControl },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8">
          {/* Road */}
          <div className="h-[200px] bg-base-200 relative border-b-4 border-base-content/20 mb-8 overflow-hidden rounded-t-xl">
            <div className="absolute bottom-8 left-0 right-0 h-px bg-base-content/20" />
            <div
              className="absolute bottom-8"
              style={{ left: `${trackPercent}%`, transform: 'translateX(-50%)' }}
            >
              {/* Force / friction arrows */}
              <div className="relative h-0">
                {force > 0 && (
                  <div className="absolute -top-10 left-1/2 flex items-center text-primary text-xs font-bold" style={{ transform: 'translateX(-50%)' }}>
                    <span aria-hidden="true">F →</span>
                  </div>
                )}
              </div>
              {/* Jeepney */}
              <div
                className="relative flex items-center justify-center text-accent-content font-bold shadow-lg rounded-t-lg"
                style={{ width: '120px', height: '60px', background: 'linear-gradient(to right, var(--color-accent), var(--color-secondary))', border: '2px solid var(--color-base-content)' }}
              >
                <div className="text-[10px] absolute top-1 bg-base-content text-base-100 px-2 rounded-full">PASAY–QUIAPO</div>
                <div className="absolute -bottom-3 left-3 w-6 h-6 rounded-full bg-base-content border-2 border-base-300" />
                <div className="absolute -bottom-3 right-3 w-6 h-6 rounded-full bg-base-content border-2 border-base-300" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              {forceControl}
              {massControl}
              {frictionControl}
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div className="bg-base-200 p-4 rounded-xl border border-base-300 flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-base-content/70">Friction force (<span className="font-serif italic">f</span>):</span>
                  <span className="font-mono font-bold">{frictionForce.toFixed(0)} N</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-base-content/70">Net force (<span className="font-serif italic">F</span><sub>net</sub>):</span>
                  <span className="font-mono font-bold">{fNet.toFixed(0)} N</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-base-content/70">Acceleration (<span className="font-serif italic">a</span>):</span>
                  <span className="font-mono font-bold">{accel.toFixed(2)} m/s²</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-base-content/70">Velocity (<span className="font-serif italic">v</span>):</span>
                  <span className="font-mono font-bold">{motion.v.toFixed(2)} m/s</span>
                </div>
                <p className="text-xs text-base-content/60 mt-1 m-0">
                  {Math.abs(fNet) < 1
                    ? motion.v < REST_THRESHOLD
                      ? 'Static friction cancels the engine force, so the jeep stays put.'
                      : 'Net force is zero, so the jeep holds a steady speed (Newton\u2019s first law).'
                    : `F_net = ${fNet.toFixed(0)} N \u00f7 ${mass} kg gives a = ${accel.toFixed(2)} m/s\u00b2.`}
                </p>
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  className={`btn flex-1 ${isPlaying ? 'btn-error' : 'btn-primary'}`}
                  onClick={() => setIsPlaying((p) => !p)}
                  aria-pressed={isPlaying}
                >
                  {isPlaying ? 'Tigil / Preno (Pause)' : 'Arangkada! (Start)'}
                </button>
                <button className="btn btn-outline" onClick={reset}>Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default ForcesAndMotionVisualizer;
