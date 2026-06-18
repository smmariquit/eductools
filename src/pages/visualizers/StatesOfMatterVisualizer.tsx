import { useState, useEffect, useRef } from 'react';
import Matter from 'matter-js';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { IntroState, useIntroState } from '../../components/onboarding';

const { Engine, Render, World, Bodies, Body, Runner, Events } = Matter;

const PARTICLE_COUNT = 80;
const CANVAS_W = 600;
const CANVAS_H = 350;
const PARTICLE_RADIUS = 7;

const DEFAULT_TEMP = 20;

// Water phase points (°C) — transitions happen at the SAME values the axis labels.
const FREEZING = 0;
const BOILING = 100;

type Phase = 'solid' | 'liquid' | 'gas';
const phaseOf = (t: number): Phase => (t <= FREEZING ? 'solid' : t >= BOILING ? 'gas' : 'liquid');

const STATE_LABEL: Record<Phase, string> = {
  solid: 'Solid (Solido)',
  liquid: 'Liquid (Likido)',
  gas: 'Gas (Gas)',
};

const ARRANGEMENT: Record<Phase, string> = {
  solid: 'Packed lattice — particles locked in place, only vibrating.',
  liquid: 'Sliding — particles stay close but flow past one another.',
  gas: 'Dispersed — particles spread out to fill the container.',
};

const StatesOfMatterVisualizer = () => {
  const intro = useIntroState();
  const [temperature, setTemperature] = useState(DEFAULT_TEMP);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const particlesRef = useRef<Matter.Body[]>([]);
  const homesRef = useRef<{ x: number; y: number }[]>([]);
  const tempRef = useRef(temperature);

  // Keep the latest temperature available to the persistent physics loop
  // without re-subscribing or re-randomising velocities each slider tick.
  useEffect(() => {
    tempRef.current = temperature;
  }, [temperature]);

  const phase = phaseOf(temperature);
  const state = STATE_LABEL[phase];

  // Initialize Matter.js engine and renderer once the learner has started
  // (the canvas container only renders after the intro state).
  useEffect(() => {
    if (!intro.started || !containerRef.current) return;

    const engine = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 },
    });
    engineRef.current = engine;

    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width: CANVAS_W,
        height: CANVAS_H,
        wireframes: false,
        background: '#2b2b3a', // crayon ink, matches bg-neutral
        pixelRatio: window.devicePixelRatio || 1,
      },
    });

    // Walls (invisible containment)
    const wallOptions = { isStatic: true, render: { visible: false }, restitution: 0.8 };
    const walls = [
      Bodies.rectangle(CANVAS_W / 2, CANVAS_H + 25, CANVAS_W, 50, wallOptions), // floor
      Bodies.rectangle(CANVAS_W / 2, -25, CANVAS_W, 50, wallOptions),             // ceiling
      Bodies.rectangle(-25, CANVAS_H / 2, 50, CANVAS_H, wallOptions),             // left
      Bodies.rectangle(CANVAS_W + 25, CANVAS_H / 2, 50, CANVAS_H, wallOptions),   // right
    ];

    // Create particles in a packed grid — these positions double as the
    // "home" lattice sites the solid springs back to.
    const particles: Matter.Body[] = [];
    const homes: { x: number; y: number }[] = [];
    const cols = 10;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = 150 + col * (PARTICLE_RADIUS * 2.5);
      const y = CANVAS_H - 50 - row * (PARTICLE_RADIUS * 2.5);
      homes.push({ x, y });

      const particle = Bodies.circle(x, y, PARTICLE_RADIUS, {
        restitution: 0.9,
        friction: 0.01,
        frictionAir: 0.05,
        render: {
          fillStyle: '#93c5fd',
          strokeStyle: '#1d4ed8',
          lineWidth: 1,
        },
      });
      particles.push(particle);
    }
    particlesRef.current = particles;
    homesRef.current = homes;

    World.add(engine.world, [...walls, ...particles]);

    // Persistent thermal loop: applies forces each tick based on the CURRENT
    // temperature. Particles keep their own velocities — we never overwrite
    // them wholesale, so dragging the slider nudges motion instead of resetting it.
    Events.on(engine, 'beforeUpdate', () => {
      const t = tempRef.current;
      const ph = phaseOf(t);
      const bodies = particlesRef.current;
      const homeSites = homesRef.current;

      bodies.forEach((p, i) => {
        if (ph === 'solid') {
          // Spring toward the lattice site + tiny vibration that grows with T.
          const home = homeSites[i];
          const k = 0.0009;
          const jiggle = 0.000015 * ((t + 20) / 20); // a little even below 0
          Body.applyForce(p, p.position, {
            x: (home.x - p.position.x) * k + (Math.random() - 0.5) * jiggle,
            y: (home.y - p.position.y) * k + (Math.random() - 0.5) * jiggle,
          });
        } else {
          // Liquid/gas: random thermal agitation scaled by temperature.
          const warmth = ph === 'gas' ? (t / 100) : (t - FREEZING) / (BOILING - FREEZING);
          const mag = (ph === 'gas' ? 0.00009 : 0.00004) * Math.max(0.2, warmth);
          Body.applyForce(p, p.position, {
            x: (Math.random() - 0.5) * mag,
            y: (Math.random() - 0.5) * mag,
          });
        }
      });
    });

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Make the canvas responsive
    const canvas = render.canvas;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';

    return () => {
      Events.off(engine, 'beforeUpdate');
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      if (render.canvas && render.canvas.parentNode) {
        render.canvas.parentNode.removeChild(render.canvas);
      }
    };
  }, [intro.started]);

  // React to temperature changes by adjusting bulk PROPERTIES only
  // (gravity, damping, restitution, color) — never by re-rolling velocities.
  useEffect(() => {
    const engine = engineRef.current;
    const particles = particlesRef.current;
    if (!engine || particles.length === 0) return;

    const ph = phaseOf(temperature);

    if (ph === 'solid') {
      engine.gravity.scale = 0; // the lattice spring holds the shape
    } else if (ph === 'liquid') {
      engine.gravity.y = 1;
      engine.gravity.scale = 0.001; // pools and flows at the bottom
    } else {
      engine.gravity.scale = 0; // gas disperses, no settling
    }

    particles.forEach(p => {
      if (ph === 'solid') {
        p.render.fillStyle = '#93c5fd';
        p.render.strokeStyle = '#1d4ed8';
        p.frictionAir = 0.12; // damp vibration so the lattice is crisp
        p.restitution = 0.2;
      } else if (ph === 'liquid') {
        p.render.fillStyle = '#3b82f6';
        p.render.strokeStyle = '#1e3a8a';
        p.frictionAir = 0.02;
        p.restitution = 0.5;
      } else {
        p.render.fillStyle = '#c084fc';
        p.render.strokeStyle = '#7e22ce';
        p.frictionAir = 0.001;
        p.restitution = 1.0;
      }
    });
  }, [temperature, intro.started]);

  const reset = () => setTemperature(DEFAULT_TEMP);

  return (
    <VisualizerLayout
      title="Mga Anyo ng Bagay (States of Matter)"
      description="Matter.js-powered particle simulation showing how temperature affects molecular motion."
      adSlotId="1001"
      guideLink="/blog/states-of-matter"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center p-4 md:p-8">
          {!intro.started ? (
            <IntroState
              lead="Drag a temperature slider to watch water particles freeze, flow, and spread out as a solid, liquid, and gas."
              actionLabel="Start the simulation"
              onStart={intro.start}
            />
          ) : (
            <>

          <div className="w-full max-w-3xl bg-neutral rounded-xl overflow-hidden shadow-inner border-[4px] border-base-300 relative">
            <div ref={containerRef} className="w-full" />
            <div className="absolute top-4 left-4 text-white/50 text-xs tracking-widest font-mono pointer-events-none">
              WATER (TUBIG) · {PARTICLE_COUNT} PARTICLES
            </div>
            <div className="absolute top-4 right-4 pointer-events-none">
              <span className={`badge badge-sm ${phase === 'solid' ? 'badge-info' : phase === 'liquid' ? 'badge-primary' : 'badge-secondary'}`}>
                {state}
              </span>
            </div>
          </div>

          <div className="w-full max-w-3xl mt-8 bg-base-200 p-6 rounded-xl border border-base-300">
            <div className="flex justify-end mb-1">
              <span className="font-semibold text-base-content">
                Anyo (State): <span className="text-secondary font-bold">{state}</span>
              </span>
            </div>
            <p className="text-base-content/70 mb-4">{ARRANGEMENT[phase]}</p>

            <Slider
              id="temperature"
              motif="temperature"
              label={<>Temperatura (Temperature)</>}
              value={temperature}
              min={-20}
              max={120}
              unit="°C"
              colorClass="primary"
              onChange={(e) => setTemperature(Number(e.target.value))}
              aria-valuetext={`${temperature} degrees Celsius, ${state}`}
              marks={[
                { label: '-20°C' },
                { label: '0°C (Freezing)' },
                { label: '100°C (Boiling)' },
                { label: '120°C' },
              ]}
            />

            <div className="flex justify-end mt-4">
              <button className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
            </div>
          </div>

            </>
          )}
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default StatesOfMatterVisualizer;
