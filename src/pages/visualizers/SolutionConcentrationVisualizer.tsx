import SolutionConcentrationMdx from '../../content/blog/solution-concentration.mdx';
import { useState, useRef, useEffect } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

const SolutionConcentrationVisualizer = () => {
  const [soluteMass, setSoluteMass] = useState(10); // grams
  const [solventVolume, setSolventVolume] = useState(100); // mL
  const [soluteType, setSoluteType] = useState<'salt' | 'sugar'>('salt');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<{ x: number; y: number; vy: number; settled: boolean; opacity: number }[]>([]);

  // Solubility limits (g per 100mL at room temp)
  const solubility = soluteType === 'salt' ? 36 : 200;
  const soluteLabel = soluteType === 'salt' ? 'Asin (NaCl)' : 'Asukal (C₁₂H₂₂O₁₁)';

  // Calculate concentration
  const totalMass = soluteMass + solventVolume; // approx: 1mL water ≈ 1g
  const percentByMass = (soluteMass / totalMass) * 100;
  const percentByVolume = (soluteMass / solventVolume) * 100; // simplified
  const dissolvedMass = Math.min(soluteMass, (solubility * solventVolume) / 100);
  const undissolvedMass = Math.max(0, soluteMass - dissolvedMass);
  const isSaturated = soluteMass >= (solubility * solventVolume) / 100;
  const isSupersaturated = soluteMass > (solubility * solventVolume) / 100 * 1.2;

  const getSolutionStatus = () => {
    if (isSupersaturated) return { label: 'Supersaturated (Sobrang Puno)', color: 'text-error', badge: 'badge-error' };
    if (isSaturated) return { label: 'Saturated (Puno na)', color: 'text-warning', badge: 'badge-warning' };
    return { label: 'Unsaturated (Hindi pa puno)', color: 'text-success', badge: 'badge-success' };
  };

  const status = getSolutionStatus();

  // Initialize particles when solute mass changes
  useEffect(() => {
    const particles: { x: number; y: number; vy: number; settled: boolean; opacity: number }[] = [];
    const numParticles = Math.min(80, Math.floor(soluteMass * 2));
    const numDissolved = Math.floor((dissolvedMass / Math.max(1, soluteMass)) * numParticles);

    for (let i = 0; i < numParticles; i++) {
      const isDissolved = i < numDissolved;
      particles.push({
        x: Math.random() * 380 + 60,
        y: isDissolved ? Math.random() * 200 + 40 : 30 + Math.random() * 20,
        vy: isDissolved ? 0 : 0.3 + Math.random() * 0.5,
        settled: isDissolved,
        opacity: 1,
      });
    }
    particlesRef.current = particles;
  }, [soluteMass, solventVolume, soluteType, dissolvedMass]);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const waterLevel = 60;
      const waterHeight = h - waterLevel - 20;

      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      // Beaker outline
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(50, 20);
      ctx.lineTo(50, h - 15);
      ctx.lineTo(w - 50, h - 15);
      ctx.lineTo(w - 50, 20);
      ctx.stroke();

      // Beaker lip
      ctx.beginPath();
      ctx.moveTo(45, 20);
      ctx.lineTo(50, 20);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(w - 50, 20);
      ctx.lineTo(w - 45, 20);
      ctx.stroke();

      // Water - color changes with concentration
      const concentrationNorm = Math.min(1, percentByMass / 30);
      const waterR = Math.floor(56 + concentrationNorm * 100);
      const waterG = Math.floor(189 - concentrationNorm * 80);
      const waterB = Math.floor(248 - concentrationNorm * 120);
      const waterAlpha = 0.3 + concentrationNorm * 0.35;

      ctx.fillStyle = `rgba(${waterR}, ${waterG}, ${waterB}, ${waterAlpha})`;
      ctx.fillRect(53, waterLevel, w - 106, waterHeight);

      // Measurement marks
      ctx.fillStyle = '#475569';
      ctx.font = '10px Inter, system-ui';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 5; i++) {
        const y = waterLevel + (waterHeight / 5) * i;
        ctx.fillRect(50, y, 8, 1);
        ctx.fillText(`${100 - i * 20}`, 46, y + 4);
      }

      // Undissolved solute at bottom
      if (undissolvedMass > 0) {
        const pileHeight = Math.min(40, undissolvedMass * 1.5);
        const pileColor = soluteType === 'salt' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 220, 160, 0.8)';
        ctx.fillStyle = pileColor;
        ctx.beginPath();
        ctx.ellipse(w / 2, h - 18, 80, pileHeight, 0, Math.PI, 0);
        ctx.fill();

        ctx.fillStyle = '#f87171';
        ctx.font = 'bold 11px Inter, system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(`${undissolvedMass.toFixed(1)}g undissolved`, w / 2, h - 20 - pileHeight);
      }

      // Dissolved particles
      const particleColor = soluteType === 'salt' ? 'rgb(255, 255, 255)' : 'rgb(255, 200, 120)';
      const particleGlow = soluteType === 'salt' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 200, 120, 0.3)';

      particlesRef.current.forEach((p) => {
        if (p.settled) {
          // Dissolved: gentle drift
          p.x += (Math.random() - 0.5) * 1.2;
          p.y += (Math.random() - 0.5) * 1.2;
          // Keep in water bounds
          p.x = Math.max(58, Math.min(w - 58, p.x));
          p.y = Math.max(waterLevel + 10, Math.min(h - 30, p.y));
        } else {
          // Falling then settling at bottom
          p.y += p.vy;
          if (p.y > h - 30) {
            p.y = h - 25 - Math.random() * 10;
            p.vy = 0;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = particleGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      // Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 12px Inter, system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('Virtual Beaker', w / 2, 14);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [soluteMass, solventVolume, soluteType, percentByMass, undissolvedMass]);

  return (
    <VisualizerLayout
      title="Solution Concentration Lab (Konsentrasyon ng Solusyon)"
      description="Explore percent by mass and percent by volume. Observe saturation and solubility limits visually with a virtual beaker."
      adSlotId="2010"
      educationalContent={<SolutionConcentrationMdx />}
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          {/* Canvas */}
          <div className="flex-1">
            <canvas
              ref={canvasRef}
              width={500}
              height={300}
              className="w-full rounded-xl border-2 border-base-300"
            />

            {/* Live readout cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">% by Mass</div>
                <div className="text-xl font-bold font-mono text-primary">{percentByMass.toFixed(1)}%</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">% by Volume</div>
                <div className="text-xl font-bold font-mono text-secondary">{percentByVolume.toFixed(1)}%</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Dissolved</div>
                <div className="text-xl font-bold font-mono text-success">{dissolvedMass.toFixed(1)}g</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Status</div>
                <div className={`badge ${status.badge} badge-sm font-bold mt-1`}>{status.label}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 flex flex-col gap-6 bg-base-200 p-6 rounded-xl border border-base-300">
            <div>
              <label className="block mb-2 font-bold text-base-content text-sm">Solute (Natutunaw):</label>
              <div className="flex gap-2">
                <button onClick={() => setSoluteType('salt')} className={`btn flex-1 btn-sm ${soluteType === 'salt' ? 'btn-primary' : 'btn-outline'}`}>
                  🧂 Asin (NaCl)
                </button>
                <button onClick={() => setSoluteType('sugar')} className={`btn flex-1 btn-sm ${soluteType === 'sugar' ? 'btn-primary' : 'btn-outline'}`}>
                  🍬 Asukal
                </button>
              </div>
              <div className="text-xs text-base-content/50 mt-1">
                Solubility: {solubility}g per 100mL
              </div>
            </div>

            <div>
              <label className="flex justify-between mb-2 font-semibold text-sm">
                <span>Mass ng {soluteLabel}</span>
                <span className="text-primary">{soluteMass}g</span>
              </label>
              <input
                type="range" min="0" max="80" step="1"
                value={soluteMass}
                onChange={(e) => setSoluteMass(Number(e.target.value))}
                className="range range-primary range-sm"
              />
            </div>

            <div>
              <label className="flex justify-between mb-2 font-semibold text-sm">
                <span>Volume ng Tubig</span>
                <span className="text-secondary">{solventVolume} mL</span>
              </label>
              <input
                type="range" min="50" max="200" step="10"
                value={solventVolume}
                onChange={(e) => setSolventVolume(Number(e.target.value))}
                className="range range-secondary range-sm"
              />
            </div>

            {/* Formula display */}
            <div className="bg-base-100 p-4 rounded-lg border border-base-300 space-y-2">
              <div className="text-xs font-bold text-base-content/60 uppercase tracking-wider">Formula</div>
              <div className="text-sm font-mono">
                <span className="text-primary">%m/m</span> = <span className="text-base-content/80">{soluteMass}g</span> / <span className="text-base-content/80">{totalMass.toFixed(0)}g</span> × 100
              </div>
              <div className="text-sm font-mono">
                <span className="text-secondary">%m/v</span> = <span className="text-base-content/80">{soluteMass}g</span> / <span className="text-base-content/80">{solventVolume}mL</span> × 100
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default SolutionConcentrationVisualizer;
