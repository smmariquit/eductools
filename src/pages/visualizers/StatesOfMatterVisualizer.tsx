import { useState, useEffect, useRef } from 'react';
import Matter from 'matter-js';
import VisualizerLayout from '../../components/VisualizerLayout';

const { Engine, Render, World, Bodies, Body, Runner, Composite } = Matter;

const PARTICLE_COUNT = 80;
const CANVAS_W = 600;
const CANVAS_H = 350;
const PARTICLE_RADIUS = 7;

const StatesOfMatterVisualizer = () => {
  const [temperature, setTemperature] = useState(20);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const particlesRef = useRef<Matter.Body[]>([]);

  let state = 'Solid (Yelo)';
  if (temperature > 30 && temperature <= 70) state = 'Liquid (Tubig)';
  else if (temperature > 70) state = 'Gas (Singaw)';

  // Initialize Matter.js engine and renderer once
  useEffect(() => {
    if (!containerRef.current) return;

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
        background: '#0f172a',
        pixelRatio: window.devicePixelRatio || 1,
      },
    });
    renderRef.current = render;

    // Walls (invisible containment)
    const wallOptions = { isStatic: true, render: { visible: false }, restitution: 0.8 };
    const walls = [
      Bodies.rectangle(CANVAS_W / 2, CANVAS_H + 25, CANVAS_W, 50, wallOptions), // floor
      Bodies.rectangle(CANVAS_W / 2, -25, CANVAS_W, 50, wallOptions),             // ceiling
      Bodies.rectangle(-25, CANVAS_H / 2, 50, CANVAS_H, wallOptions),             // left
      Bodies.rectangle(CANVAS_W + 25, CANVAS_H / 2, 50, CANVAS_H, wallOptions),   // right
    ];

    // Create particles in a grid
    const particles: Matter.Body[] = [];
    const cols = 10;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = 150 + col * (PARTICLE_RADIUS * 2.5);
      const y = CANVAS_H - 50 - row * (PARTICLE_RADIUS * 2.5);
      
      const particle = Bodies.circle(x, y, PARTICLE_RADIUS, {
        restitution: 0.9,
        friction: 0.01,
        frictionAir: 0.005,
        render: {
          fillStyle: '#3b82f6',
          strokeStyle: '#1d4ed8',
          lineWidth: 1,
        },
      });
      particles.push(particle);
    }
    particlesRef.current = particles;

    World.add(engine.world, [...walls, ...particles]);

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

    // Make the canvas responsive
    const canvas = render.canvas;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      if (render.canvas && render.canvas.parentNode) {
        render.canvas.parentNode.removeChild(render.canvas);
      }
    };
  }, []);

  // React to temperature changes by adjusting particle behavior
  useEffect(() => {
    const engine = engineRef.current;
    const particles = particlesRef.current;
    if (!engine || particles.length === 0) return;

    const isSolid = temperature <= 30;
    const isLiquid = temperature > 30 && temperature <= 70;
    const isGas = temperature > 70;

    // Adjust gravity based on state
    if (isSolid) {
      engine.gravity.y = 2;
      engine.gravity.scale = 0.001;
    } else if (isLiquid) {
      engine.gravity.y = 1;
      engine.gravity.scale = 0.001;
    } else {
      engine.gravity.y = 0;
      engine.gravity.scale = 0;
    }

    // Apply velocity and visual changes to each particle
    particles.forEach(p => {
      const speed = isGas ? 8 + temperature * 0.05 : isLiquid ? 2 + (temperature - 30) * 0.08 : 0.3;
      
      Body.setVelocity(p, {
        x: (Math.random() - 0.5) * speed,
        y: (Math.random() - 0.5) * speed,
      });

      // Color shift: blue (solid) → deep blue (liquid) → purple (gas)
      if (isSolid) {
        p.render.fillStyle = '#93c5fd';
        p.render.strokeStyle = '#1d4ed8';
      } else if (isLiquid) {
        p.render.fillStyle = '#3b82f6';
        p.render.strokeStyle = '#1e3a8a';
      } else {
        p.render.fillStyle = '#c084fc';
        p.render.strokeStyle = '#7e22ce';
      }

      p.frictionAir = isGas ? 0.0005 : isLiquid ? 0.005 : 0.08;
      p.restitution = isGas ? 1.0 : isLiquid ? 0.7 : 0.2;
    });
  }, [temperature]);

  return (
    <VisualizerLayout
      title="Mga Anyo ng Bagay (States of Matter)"
      description="Matter.js-powered particle simulation showing how temperature affects molecular motion."
      adSlotId="1001"
      educationalContent={
        <>
          <h2>States of Matter: Grade 3 Science</h2>
          <p>Matter is everything around us. It exists primarily in three states: Solid, Liquid, and Gas. This simulation uses a real <strong>2D physics engine (Matter.js)</strong> to model particle behavior.</p>
          <h3>How Temperature Affects Matter</h3>
          <ul>
            <li><strong>Solid (Halimbawa: Ice Candy):</strong> Particles are tightly packed and vibrate in place. This happens at lower temperatures. Notice how the physics engine keeps them settled at the bottom.</li>
            <li><strong>Liquid (Halimbawa: Tubig sa baso):</strong> As temperature increases, particles gain energy and slide past each other, affected by gravity but free to flow.</li>
            <li><strong>Gas (Halimbawa: Singaw ng mainit na Sinigang):</strong> At high temperatures, gravity is effectively overcome. Particles move freely with high kinetic energy, bouncing off walls elastically.</li>
          </ul>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center p-4 md:p-8">
          
          <div className="w-full max-w-3xl bg-slate-900 rounded-xl overflow-hidden shadow-inner border-[4px] border-slate-700 relative">
            <div ref={containerRef} className="w-full" />
            <div className="absolute top-4 left-4 text-white/50 text-xs tracking-widest font-mono pointer-events-none">
              MATTER.JS KINETIC SIMULATION
            </div>
            <div className="absolute top-4 right-4 pointer-events-none">
              <span className={`badge badge-sm ${temperature <= 30 ? 'badge-info' : temperature <= 70 ? 'badge-primary' : 'badge-secondary'}`}>
                {Composite.allBodies(engineRef.current?.world || Engine.create().world).filter(b => !b.isStatic).length} particles
              </span>
            </div>
          </div>
          
          <div className="w-full max-w-3xl mt-8 bg-base-200 p-6 rounded-xl border border-base-300">
            <div className="flex flex-col sm:flex-row justify-between mb-6 font-semibold text-base-content gap-4">
              <span className="text-xl">Init (Temperature): <span className="text-primary font-mono ml-2">{temperature}°C</span></span>
              <span className="text-xl">Anyo (State): <span className="text-secondary font-bold ml-2">{state}</span></span>
            </div>
            
            <input 
              type="range" min="0" max="100" 
              value={temperature} 
              onChange={(e) => setTemperature(Number(e.target.value))} 
              className="range range-primary w-full" 
            />
            
            <div className="flex justify-between text-xs sm:text-sm px-2 mt-4 text-base-content/60 font-medium">
              <span>0°C (Nagyeyelo / Freezing)</span>
              <span>100°C (Kumukulo / Boiling)</span>
            </div>
          </div>
          
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default StatesOfMatterVisualizer;
