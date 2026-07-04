import { useState, useEffect, useRef, useCallback } from 'react';
import Matter from 'matter-js';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { Toggle } from '../../components/ui/Toggle';
import { UnitGuideLink } from '../../components/scientific-units/UnitGuideLink';
import { IntroState, useIntroState } from '../../components/onboarding';
import {
  SUBSTANCES_BY_ID,
  OTHER_SUBSTANCES,
  WATER_SUBSTANCE,
  phaseOf,
  substanceMarks,
  clampTemp,
  type SubstancePhaseModel,
  type Phase,
} from '../../data/substancePhases';

const { Engine, Render, World, Bodies, Body, Runner, Events } = Matter;

const PARTICLE_COUNT = 80;
const CANVAS_W = 600;
const CANVAS_H = 350;
const PARTICLE_RADIUS = 7;

type SubstanceMode = 'water' | 'other';
type OtherSubstanceId = (typeof OTHER_SUBSTANCES)[number]['id'];

const STATE_LABEL: Record<Phase, string> = {
  solid: 'Solid (Solido)',
  liquid: 'Liquid (Likido)',
  gas: 'Gas (Gas)',
};

const ARRANGEMENT: Record<Phase, string> = {
 solid: 'Packed lattice: particles locked in place, only vibrating.',
 liquid: 'Sliding: particles stay close but flow past one another.',
 gas: 'Dispersed: particles spread out to fill the container.',
};

const StatesOfMatterVisualizer = () => {
  const intro = useIntroState();
  const [mode, setMode] = useState<SubstanceMode>('water');
  const [otherId, setOtherId] = useState<OtherSubstanceId>('mercury');
  const substance: SubstancePhaseModel =
    mode === 'water' ? WATER_SUBSTANCE : SUBSTANCES_BY_ID[otherId] ?? OTHER_SUBSTANCES[0];

  const [temperature, setTemperature] = useState(WATER_SUBSTANCE.defaultTemp);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const particlesRef = useRef<Matter.Body[]>([]);
  const homesRef = useRef<{ x: number; y: number }[]>([]);
  const tempRef = useRef(temperature);
  const substanceRef = useRef(substance);

  useEffect(() => {
    tempRef.current = temperature;
  }, [temperature]);

  useEffect(() => {
    substanceRef.current = substance;
  }, [substance]);

  const applySubstance = useCallback((next: SubstancePhaseModel) => {
    setTemperature((prev) => clampTemp(prev, next));
  }, []);

  const handleModeChange = (next: SubstanceMode) => {
    setMode(next);
    applySubstance(next === 'water' ? WATER_SUBSTANCE : SUBSTANCES_BY_ID[otherId]);
  };

  const handleOtherChange = (id: OtherSubstanceId) => {
    setOtherId(id);
    applySubstance(SUBSTANCES_BY_ID[id]);
  };

  const phase = phaseOf(temperature, substance);
  const state = STATE_LABEL[phase];

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
        background: '#2b2b3a',
        pixelRatio: window.devicePixelRatio || 1,
      },
    });

    const wallOptions = { isStatic: true, render: { visible: false }, restitution: 0.8 };
    const walls = [
      Bodies.rectangle(CANVAS_W / 2, CANVAS_H + 25, CANVAS_W, 50, wallOptions),
      Bodies.rectangle(CANVAS_W / 2, -25, CANVAS_W, 50, wallOptions),
      Bodies.rectangle(-25, CANVAS_H / 2, 50, CANVAS_H, wallOptions),
      Bodies.rectangle(CANVAS_W + 25, CANVAS_H / 2, 50, CANVAS_H, wallOptions),
    ];

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
          fillStyle: WATER_SUBSTANCE.colors.liquid.fill,
          strokeStyle: WATER_SUBSTANCE.colors.liquid.stroke,
          lineWidth: 1,
        },
      });
      particles.push(particle);
    }
    particlesRef.current = particles;
    homesRef.current = homes;

    World.add(engine.world, [...walls, ...particles]);

    Events.on(engine, 'beforeUpdate', () => {
      const t = tempRef.current;
      const sub = substanceRef.current;
      const ph = phaseOf(t, sub);
      const bodies = particlesRef.current;
      const homeSites = homesRef.current;
      const span = Math.max(1, sub.boiling - sub.freezing);

      bodies.forEach((p, i) => {
        if (ph === 'solid') {
          const home = homeSites[i];
          const k = 0.0009;
          const cold = sub.tempMin;
          const jiggle = 0.000015 * ((t - cold) / Math.max(1, sub.freezing - cold + 20));
          Body.applyForce(p, p.position, {
            x: (home.x - p.position.x) * k + (Math.random() - 0.5) * jiggle,
            y: (home.y - p.position.y) * k + (Math.random() - 0.5) * jiggle,
          });
        } else {
          const warmth =
            ph === 'gas'
              ? (t - sub.boiling) / Math.max(1, sub.tempMax - sub.boiling)
              : (t - sub.freezing) / span;
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

  useEffect(() => {
    const engine = engineRef.current;
    const particles = particlesRef.current;
    if (!engine || particles.length === 0) return;

    const ph = phaseOf(temperature, substance);
    const colors = substance.colors[ph];

    if (ph === 'solid') {
      engine.gravity.scale = 0;
    } else if (ph === 'liquid') {
      engine.gravity.y = 1;
      engine.gravity.scale = 0.001;
    } else {
      engine.gravity.scale = 0;
    }

    particles.forEach((p) => {
      p.render.fillStyle = colors.fill;
      p.render.strokeStyle = colors.stroke;
      if (ph === 'solid') {
        p.frictionAir = 0.12;
        p.restitution = 0.2;
      } else if (ph === 'liquid') {
        p.frictionAir = 0.02;
        p.restitution = 0.5;
      } else {
        p.frictionAir = 0.001;
        p.restitution = 1.0;
      }
    });
  }, [temperature, substance, intro.started]);

  const reset = () => {
    setMode('water');
    setOtherId('mercury');
    setTemperature(WATER_SUBSTANCE.defaultTemp);
  };

  const substanceTitle =
    substance.tagalog != null ? `${substance.label} (${substance.tagalog})` : substance.label;

  return (
    <VisualizerLayout
 title="Mga Anyo ng Bagay (States of Matter)"
 description="Heat or cool particles and compare water with mercury, ethanol, dry ice, and iron: each substance has its own melting and boiling points."
      adSlotId="1001"
      guideLink="/blog/states-of-matter"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center p-4 md:p-8">
          {!intro.started ? (
            <IntroState
              lead="Start with water, then toggle other substances to see how different melting and boiling points change the same particle model."
              actionLabel="Start the simulation"
              onStart={intro.start}
            />
          ) : (
            <>
              <div className="w-full max-w-3xl mb-6 flex flex-col gap-3">
                <Toggle<SubstanceMode>
                  value={mode}
                  onChange={handleModeChange}
                  options={[
                    { value: 'water', label: 'Water (Tubig)' },
                    { value: 'other', label: 'Other substances' },
                  ]}
                />
                {mode === 'other' && (
                  <Toggle<OtherSubstanceId>
                    value={otherId}
                    onChange={handleOtherChange}
                    size="sm"
                    options={OTHER_SUBSTANCES.map((s) => ({
                      value: s.id as OtherSubstanceId,
                      label: s.tagalog ? `${s.label} (${s.tagalog})` : s.label,
                    }))}
                  />
                )}
              </div>

              <div className="w-full max-w-3xl bg-neutral rounded-xl overflow-hidden shadow-inner border-[4px] border-base-300 relative">
                <div ref={containerRef} className="w-full" />
                <div className="absolute top-4 left-4 text-white/50 text-xs tracking-widest font-mono pointer-events-none">
                  {substanceTitle.toUpperCase()} · {PARTICLE_COUNT} PARTICLES
                </div>
                <div className="absolute top-4 right-4 pointer-events-none">
                  <span
                    className={`badge badge-sm ${phase === 'solid' ? 'badge-info' : phase === 'liquid' ? 'badge-primary' : 'badge-secondary'}`}
                  >
                    {state}
                  </span>
                </div>
              </div>

              <div className="w-full max-w-3xl mt-8 bg-base-200 p-6 rounded-xl border border-base-300">
                <div className="flex flex-wrap justify-between gap-2 mb-1">
                  <span className="font-semibold text-base-content">
                    {substanceTitle}
                  </span>
                  <span className="font-semibold text-base-content">
                    Anyo (State): <span className="text-secondary font-bold">{state}</span>
                  </span>
                </div>
                <p className="text-base-content/70 mb-1">{ARRANGEMENT[phase]}</p>
                <p className="text-sm text-base-content/60 mb-4">{substance.transitionNote}</p>

                <Slider
                  id="temperature"
                  motif="temperature"
                  label={<>Temperatura (Temperature)</>}
                  value={temperature}
                  min={substance.tempMin}
                  max={substance.tempMax}
                  unit="°C"
                  colorClass="primary"
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  aria-valuetext={`${temperature} degrees Celsius, ${substance.label}, ${state}`}
                  marks={substanceMarks(substance).map((m) => ({
                    label: (
                      <span className="inline-flex items-center gap-0.5">
                        {m.label}
                        <UnitGuideLink unit="°C" size={10} />
                      </span>
                    ),
                  }))}
                />

                <div className="flex justify-end mt-4">
                  <button type="button" className="btn btn-outline btn-sm" onClick={reset}>
                    Reset
                  </button>
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
