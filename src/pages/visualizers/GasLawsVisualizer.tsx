import GasLawsMdx from '../../content/deep-dives/gas-laws.mdx';
import { useState, useRef, useEffect, useCallback } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const GasLawsVisualizer = () => {
  const [law, setLaw] = useState<'boyle' | 'charles' | 'gaylussac'>('boyle');
  const [temperature, setTemperature] = useState(300); // Kelvin
  const [pressure, setPressure] = useState(1); // atm
  const [volume, setVolume] = useState(50); // arbitrary units (percentage of canvas width)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const NUM_PARTICLES = 40;

  // Compute dependent variable based on which law is selected
  // Boyle: P1V1 = P2V2 (T constant). User changes P, we compute V.
  // Charles: V1/T1 = V2/T2 (P constant). User changes T, we compute V.
  // Gay-Lussac: P1/T1 = P2/T2 (V constant). User changes T, we compute P.

  const getComputedValues = useCallback(() => {
    const baseP = 1;
    const baseV = 50; // Set to 50 so it can expand up to 100
    const baseT = 300;

    switch (law) {
      case 'boyle': {
        // PV = const → V = baseP * baseV / P
        const computedV = Math.max(10, Math.min(100, (baseP * baseV) / pressure));
        return { displayP: pressure, displayV: computedV, displayT: temperature };
      }
      case 'charles': {
        // V/T = const → V = baseV * T / baseT
        const computedV = Math.max(10, Math.min(100, (baseV * temperature) / baseT));
        return { displayP: pressure, displayV: computedV, displayT: temperature };
      }
      case 'gaylussac': {
        // P/T = const → P = baseP * T / baseT
        const computedP = Math.max(0.1, Math.min(5, (baseP * temperature) / baseT));
        return { displayP: computedP, displayV: volume, displayT: temperature };
      }
      default:
        return { displayP: pressure, displayV: volume, displayT: temperature };
    }
  }, [law, pressure, temperature, volume]);

  const { displayP, displayV, displayT } = getComputedValues();

  // Initialize particles
  useEffect(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: Math.random() * 300 + 50,
        y: Math.random() * 250 + 25,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        radius: 4,
      });
    }
    particlesRef.current = particles;
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const containerWidth = (displayV / 100) * w;
      const speedMultiplier = displayT / 300;

      ctx.clearRect(0, 0, w, h);

      // Draw container (piston)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, w, h);

      // Gas chamber
      ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.fillRect(0, 0, containerWidth, h);

      // Piston wall
      const gradient = ctx.createLinearGradient(containerWidth - 12, 0, containerWidth + 12, 0);
      gradient.addColorStop(0, '#64748b');
      gradient.addColorStop(0.5, '#94a3b8');
      gradient.addColorStop(1, '#475569');
      ctx.fillStyle = gradient;
      ctx.fillRect(containerWidth - 6, 0, 12, h);

      // Piston handle
      ctx.fillStyle = '#334155';
      ctx.fillRect(containerWidth + 6, h / 2 - 20, w - containerWidth - 6, 40);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(containerWidth + 6, h / 2 - 20, w - containerWidth - 6, 40);

      // Container walls
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, containerWidth, h);

      // Temperature color based on Kelvin
      const tempNormalized = Math.min(1, Math.max(0, (displayT - 100) / 500));
      const r = Math.floor(100 + tempNormalized * 155);
      const g = Math.floor(180 - tempNormalized * 130);
      const b = Math.floor(255 - tempNormalized * 200);

      // Update and draw particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        // Bounce off walls
        if (p.x - p.radius < 0) { p.x = p.radius; p.vx = Math.abs(p.vx); }
        if (p.x + p.radius > containerWidth - 6) { p.x = containerWidth - 6 - p.radius; p.vx = -Math.abs(p.vx); }
        if (p.y - p.radius < 0) { p.y = p.radius; p.vy = Math.abs(p.vy); }
        if (p.y + p.radius > h) { p.y = h - p.radius; p.vy = -Math.abs(p.vy); }

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.3)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fill();
      });

      // Labels on canvas
      ctx.font = 'bold 13px Inter, system-ui';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText('← Volume →', containerWidth / 2, h - 10);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [displayV, displayT]);

  const lawInfo = {
    boyle: {
      name: "Boyle's Law",
      tagalog: "Batas ni Boyle",
      formula: "P₁V₁ = P₂V₂",
      constant: "Temperatura (T) = Constant",
      description: "At constant temperature, the pressure of a gas is inversely proportional to its volume. Squeeze the gas → pressure goes up, volume goes down.",
      variable: "Pressure",
    },
    charles: {
      name: "Charles's Law",
      tagalog: "Batas ni Charles",
      formula: "V₁/T₁ = V₂/T₂",
      constant: "Presyon (P) = Constant",
      description: "At constant pressure, the volume of a gas is directly proportional to its absolute temperature. Heat the gas → it expands.",
      variable: "Temperature",
    },
    gaylussac: {
      name: "Gay-Lussac's Law",
      tagalog: "Batas ni Gay-Lussac",
      formula: "P₁/T₁ = P₂/T₂",
      constant: "Dami (V) = Constant",
      description: "At constant volume, the pressure of a gas is directly proportional to its absolute temperature. Heat a sealed container → pressure rises.",
      variable: "Temperature",
    },
  };

  const info = lawInfo[law];

  return (
    <VisualizerLayout
      title="Gas Laws Simulator (Mga Batas ng Gas)"
      description="Explore Boyle's, Charles's, and Gay-Lussac's Laws with an interactive piston and animated gas particles. Understand the Kinetic Molecular Theory visually."
      adSlotId="2009"
      educationalContent={<GasLawsMdx />}
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

            {/* Live readout */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className={`text-center p-3 rounded-lg border ${law === 'boyle' ? 'bg-primary/10 border-primary/30' : law === 'gaylussac' ? 'bg-warning/10 border-warning/30' : 'bg-base-200 border-base-300'}`}>
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Pressure</div>
                <div className="text-2xl font-bold font-mono">{displayP.toFixed(2)}</div>
                <div className="text-xs text-base-content/50">atm</div>
              </div>
              <div className={`text-center p-3 rounded-lg border ${law === 'boyle' || law === 'charles' ? 'bg-secondary/10 border-secondary/30' : 'bg-base-200 border-base-300'}`}>
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Volume</div>
                <div className="text-2xl font-bold font-mono">{displayV.toFixed(0)}</div>
                <div className="text-xs text-base-content/50">mL</div>
              </div>
              <div className={`text-center p-3 rounded-lg border ${law === 'charles' || law === 'gaylussac' ? 'bg-accent/10 border-accent/30' : 'bg-base-200 border-base-300'}`}>
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Temperature</div>
                <div className="text-2xl font-bold font-mono">{displayT}</div>
                <div className="text-xs text-base-content/50">K</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 flex flex-col gap-6 bg-base-200 p-6 rounded-xl border border-base-300">
            {/* Law selector */}
            <div>
              <label className="block mb-2 font-bold text-base-content text-sm">Select Gas Law:</label>
              <div className="flex flex-col gap-2">
                {(['boyle', 'charles', 'gaylussac'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => { setLaw(l); setPressure(1); setTemperature(300); setVolume(50); }}
                    className={`btn btn-sm ${law === l ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {lawInfo[l].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Formula display */}
            <div className="bg-base-100 p-4 rounded-lg border border-base-300">
              <div className="text-center text-xl font-mono font-bold text-primary mb-1">{info.formula}</div>
              <div className="text-center text-xs text-success font-semibold">{info.constant}</div>
            </div>

            {/* Dynamic slider */}
            {law === 'boyle' && (
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Pressure (Presyon)</span>
                  <span className="text-primary">{pressure.toFixed(1)} atm</span>
                </label>
                <input
                  type="range" min="0.3" max="5" step="0.1"
                  value={pressure}
                  onChange={(e) => setPressure(Number(e.target.value))}
                  className="range range-primary range-sm"
                />
              </div>
            )}

            {(law === 'charles' || law === 'gaylussac') && (
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Temperature (Temperatura)</span>
                  <span className="text-accent">{temperature} K</span>
                </label>
                <input
                  type="range" min="100" max="600" step="10"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="range range-accent range-sm"
                />
              </div>
            )}

            {/* Description */}
            <div className="text-sm text-base-content/80 leading-relaxed bg-base-100 p-3 rounded-lg border border-base-300">
              <p className="font-semibold text-primary mb-1">{info.tagalog}</p>
              <p>{info.description}</p>
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default GasLawsVisualizer;
