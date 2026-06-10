import ReactionRateMdx from '../../content/blog/reaction-rate.mdx';
import { useState, useRef, useEffect, useCallback } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'reactant-a' | 'reactant-b' | 'product';
  collisionCooldown: number;
}

const ReactionRateVisualizer = () => {
  const [temperature, setTemperature] = useState(300); // Kelvin
  const [concentration, setConcentration] = useState(20); // number of particles
  const [hasCatalyst, setHasCatalyst] = useState(false);
  const [collisionCount, setCollisionCount] = useState(0);
  const [reactionCount, setReactionCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const collisionCountRef = useRef(0);
  const reactionCountRef = useRef(0);
  const lastResetRef = useRef(Date.now());

  const activationEnergy = hasCatalyst ? 150 : 350; // lower with catalyst
  const speedMultiplier = temperature / 300;

  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    const half = Math.floor(concentration / 2);
    for (let i = 0; i < concentration; i++) {
      particles.push({
        x: Math.random() * 480 + 10,
        y: Math.random() * 280 + 10,
        vx: (Math.random() - 0.5) * 3 * speedMultiplier,
        vy: (Math.random() - 0.5) * 3 * speedMultiplier,
        radius: 6,
        type: i < half ? 'reactant-a' : 'reactant-b',
        collisionCooldown: 0,
      });
    }
    particlesRef.current = particles;
    collisionCountRef.current = 0;
    reactionCountRef.current = 0;
    lastResetRef.current = Date.now();
    setCollisionCount(0);
    setReactionCount(0);
  }, [concentration, speedMultiplier]);

  useEffect(() => {
    initParticles();
  }, [concentration, hasCatalyst]);

  // Update speeds when temperature changes
  useEffect(() => {
    particlesRef.current.forEach(p => {
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 0) {
        const factor = speedMultiplier / (speed / 2.5);
        p.vx *= factor;
        p.vy *= factor;
      }
    });
  }, [temperature, speedMultiplier]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      frameCount++;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      // Container
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.strokeRect(2, 2, w - 4, h - 4);

      // Catalyst bar at bottom
      if (hasCatalyst) {
        const gradient = ctx.createLinearGradient(0, h - 20, 0, h);
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(5, h - 20, w - 10, 18);
        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 10px Inter, system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('CATALYST SURFACE', w / 2, h - 7);
      }

      const particles = particlesRef.current;

      // Update particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.collisionCooldown > 0) p.collisionCooldown--;

        // Wall bounce
        if (p.x - p.radius < 3) { p.x = p.radius + 3; p.vx = Math.abs(p.vx); }
        if (p.x + p.radius > w - 3) { p.x = w - p.radius - 3; p.vx = -Math.abs(p.vx); }
        if (p.y - p.radius < 3) { p.y = p.radius + 3; p.vy = Math.abs(p.vy); }
        const bottomBound = hasCatalyst ? h - 22 : h - 3;
        if (p.y + p.radius > bottomBound) { p.y = bottomBound - p.radius; p.vy = -Math.abs(p.vy); }
      });

      // Collision detection
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.radius + b.radius;

          if (dist < minDist && a.collisionCooldown === 0 && b.collisionCooldown === 0) {
            collisionCountRef.current++;

            // Check if collision energy exceeds activation energy
            const kineticEnergy = 0.5 * (a.vx * a.vx + a.vy * a.vy + b.vx * b.vx + b.vy * b.vy) * 100;

            if (kineticEnergy > activationEnergy / temperature * 100 && a.type !== b.type && a.type !== 'product' && b.type !== 'product') {
              // Successful reaction!
              reactionCountRef.current++;
              a.type = 'product';
              b.type = 'product';
              a.collisionCooldown = 60;
              b.collisionCooldown = 60;
            }

            // Elastic bounce
            const nx = dx / dist;
            const ny = dy / dist;
            const dvx = a.vx - b.vx;
            const dvy = a.vy - b.vy;
            const dot = dvx * nx + dvy * ny;

            a.vx -= dot * nx;
            a.vy -= dot * ny;
            b.vx += dot * nx;
            b.vy += dot * ny;

            // Separate
            const overlap = (minDist - dist) / 2;
            a.x += overlap * nx;
            a.y += overlap * ny;
            b.x -= overlap * nx;
            b.y -= overlap * ny;

            a.collisionCooldown = Math.max(a.collisionCooldown, 10);
            b.collisionCooldown = Math.max(b.collisionCooldown, 10);
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        let color: string;
        let glowColor: string;
        switch (p.type) {
          case 'reactant-a':
            color = '#3b82f6'; glowColor = 'rgba(59, 130, 246, 0.3)'; break;
          case 'reactant-b':
            color = '#ef4444'; glowColor = 'rgba(239, 68, 68, 0.3)'; break;
          case 'product':
            color = '#22c55e'; glowColor = 'rgba(34, 197, 94, 0.4)'; break;
        }

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = glowColor;
        ctx.fill();

        // Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Flash on recent reaction
        if (p.collisionCooldown > 40 && p.type === 'product') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(34, 197, 94, 0.3)';
          ctx.fill();
        }
      });

      // Legend
      ctx.font = '11px Inter, system-ui';
      ctx.textAlign = 'left';
      const legend = [
        { color: '#3b82f6', label: 'Reactant A' },
        { color: '#ef4444', label: 'Reactant B' },
        { color: '#22c55e', label: 'Product' },
      ];
      legend.forEach((item, i) => {
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.arc(18, 18 + i * 18, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(item.label, 28, 22 + i * 18);
      });

      // Update state every 30 frames
      if (frameCount % 30 === 0) {
        setCollisionCount(collisionCountRef.current);
        setReactionCount(reactionCountRef.current);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [hasCatalyst, activationEnergy, temperature]);

  const elapsedSeconds = Math.max(1, (Date.now() - lastResetRef.current) / 1000);
  const reactionRate = (reactionCount / elapsedSeconds).toFixed(2);

  return (
    <VisualizerLayout
      title="Reaction Rate Simulator (Bilis ng Reaksyon)"
      description="Explore how temperature, concentration, and catalysts affect the rate of chemical reactions through collision theory."
      adSlotId="2019"
      educationalContent={<ReactionRateMdx />}
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          {/* Canvas */}
          <div className="flex-1">
            <canvas ref={canvasRef} width={500} height={300} className="w-full rounded-xl border-2 border-base-300" />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Collisions</div>
                <div className="text-2xl font-bold font-mono text-primary">{collisionCount}</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Reactions</div>
                <div className="text-2xl font-bold font-mono text-success">{reactionCount}</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Rate</div>
                <div className="text-2xl font-bold font-mono text-warning">{reactionRate}/s</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 flex flex-col gap-5 bg-base-200 p-6 rounded-xl border border-base-300">
            <div>
              <label className="flex justify-between mb-2 font-semibold text-sm">
                <span>Temperature (Temperatura)</span>
                <span className="text-accent font-mono">{temperature} K</span>
              </label>
              <input type="range" min="100" max="600" step="25" value={temperature} onChange={e => setTemperature(Number(e.target.value))} className="range range-accent range-sm" />
              <div className="flex justify-between text-xs text-base-content/50 mt-1">
                <span>Cold</span><span>Hot</span>
              </div>
            </div>

            <div>
              <label className="flex justify-between mb-2 font-semibold text-sm">
                <span>Concentration (Particles)</span>
                <span className="text-primary font-mono">{concentration}</span>
              </label>
              <input type="range" min="6" max="50" step="2" value={concentration} onChange={e => setConcentration(Number(e.target.value))} className="range range-primary range-sm" />
            </div>

            <label className="label cursor-pointer justify-start gap-3 bg-base-100 p-3 rounded-lg border border-base-300">
              <input type="checkbox" checked={hasCatalyst} onChange={e => setHasCatalyst(e.target.checked)} className="checkbox checkbox-secondary checkbox-sm" />
              <div>
                <span className="label-text font-bold">Add Catalyst (Katalista)</span>
                <div className="text-xs text-base-content/50">Lowers activation energy</div>
              </div>
            </label>

            <button onClick={initParticles} className="btn btn-outline btn-warning btn-sm">
              🔄 Reset Simulation
            </button>

            {/* Activation energy display */}
            <div className="bg-base-100 p-4 rounded-lg border border-base-300">
              <div className="text-xs font-bold text-base-content/60 uppercase tracking-wider mb-2">Activation Energy</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-base-300 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${hasCatalyst ? 'bg-secondary' : 'bg-error'}`}
                    style={{ width: `${(activationEnergy / 350) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-mono font-bold">{hasCatalyst ? 'LOW' : 'HIGH'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default ReactionRateVisualizer;
