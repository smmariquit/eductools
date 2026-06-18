import { useState, useRef, useEffect } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { GuidedInputFlow, useTouchedFields, useVisualizationGate } from '../../components/onboarding';

const SolutionConcentrationVisualizer = () => {
  const [soluteMass, setSoluteMass] = useState(10); // grams
  const [solventVolume, setSolventVolume] = useState(100); // mL
  const [soluteType, setSoluteType] = useState<'salt' | 'sugar'>('salt');
  const fields = useTouchedFields<'solute' | 'mass' | 'volume'>();
  const gate = useVisualizationGate();
  const buildComplete = fields.isTouched('solute') && fields.isTouched('mass') && fields.isTouched('volume');
  const showVisualization = buildComplete && gate.visualizationConfirmed;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<{ x: number; y: number; vy: number; settled: boolean; opacity: number }[]>([]);

  // Solubility limits (g per 100mL at room temp)
  const solubility = soluteType === 'salt' ? 36 : 200;
  const soluteLabel = soluteType === 'salt' ? 'Asin (NaCl)' : 'Asukal (C₁₂H₂₂O₁₁)';

  // Densities (g/mL) so we never silently treat millilitres as grams.
  const WATER_DENSITY = 1.0;
  const soluteDensity = soluteType === 'salt' ? 2.16 : 1.59;

  // Calculate concentration.
  // Solution MASS = mass of solute + mass of solvent (water: volume × density).
  const solventMass = solventVolume * WATER_DENSITY; // g
  const totalMass = soluteMass + solventMass; // g (mass of the whole solution)
  const percentByMass = (soluteMass / totalMass) * 100;
  // %m/v = mass of solute / volume of SOLUTION (solvent + dissolved solute), as g/100mL.
  const solutionVolume = solventVolume + soluteMass / soluteDensity; // mL
  const percentByVolume = (soluteMass / solutionVolume) * 100;
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

  const reset = () => {
    setSoluteMass(10);
    setSolventVolume(100);
    setSoluteType('salt');
    gate.resetVisualization();
    fields.reset();
  };

  const fillExample = () => {
    setSoluteType('salt');
    setSoluteMass(10);
    setSolventVolume(100);
    fields.touchAll(['solute', 'mass', 'volume']);
  };

  const solutePicker = (
    <>
      <div className="flex gap-2">
        <button onClick={() => { setSoluteType('salt'); fields.touch('solute'); }} className={`btn flex-1 btn-sm ${soluteType === 'salt' ? 'btn-primary' : 'btn-outline'}`}>
          🧂 Asin (NaCl)
        </button>
        <button onClick={() => { setSoluteType('sugar'); fields.touch('solute'); }} className={`btn flex-1 btn-sm ${soluteType === 'sugar' ? 'btn-primary' : 'btn-outline'}`}>
          🍬 Asukal
        </button>
      </div>
      <div className="text-xs text-base-content/50 mt-1">
        Solubility: {solubility}g per 100mL
      </div>
    </>
  );

  const massSlider = (
    <Slider
      id="solute-mass"
      motif="concentration"
      label={`Mass ng ${soluteLabel}`}
      value={soluteMass}
      min={0}
      max={80}
      step={1}
      unit="g"
      colorClass="primary"
      onChange={(e) => { setSoluteMass(Number(e.target.value)); fields.touch('mass'); }}
      aria-valuetext={`${soluteMass} grams of solute`}
    />
  );

  const volumeSlider = (
    <Slider
      id="solvent-volume"
      motif="volume"
      label="Volume ng Tubig"
      value={solventVolume}
      min={50}
      max={200}
      step={10}
      unit=" mL"
      colorClass="secondary"
      onChange={(e) => { setSolventVolume(Number(e.target.value)); fields.touch('volume'); }}
      aria-valuetext={`${solventVolume} millilitres of water`}
    />
  );

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

    const BEAKER_CAPACITY = 250; // mL — full beaker

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const beakerTop = 20;
      const beakerBottom = h - 15;
      const usableHeight = beakerBottom - beakerTop;
      // Liquid surface height is tied directly to the solvent-volume slider.
      const fillFraction = Math.min(1, solventVolume / BEAKER_CAPACITY);
      const waterLevel = beakerBottom - fillFraction * usableHeight; // y of surface
      const waterHeight = beakerBottom - waterLevel;

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

      // Fixed graduation marks (mL) — a real volume scale, independent of fill.
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Inter, system-ui';
      ctx.textAlign = 'right';
      for (let v = 0; v <= BEAKER_CAPACITY; v += 50) {
        const y = beakerBottom - (v / BEAKER_CAPACITY) * usableHeight;
        ctx.fillRect(50, y, 8, 1);
        ctx.fillText(`${v}`, 46, y + 4);
      }
      // Surface label showing current volume
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'left';
      ctx.fillText(`${solventVolume} mL`, w - 80, waterLevel - 4);

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
      guideLink="/blog/solution-concentration"
    >
      {!showVisualization ? (
        <GuidedInputFlow
          intro="Pick a solute, then set how much solute and water you mix to see the concentration and saturation."
          onFillExample={fillExample}
          onReset={reset}
          awaitingVisualizationConfirm={buildComplete && !gate.visualizationConfirmed}
          onVisualizationConfirm={gate.confirmVisualization}

          steps={[
            { id: 'solute', title: 'Pick a solute', helper: 'Salt or sugar. Sets the solubility limit.', complete: fields.isTouched('solute'), children: solutePicker },
            { id: 'mass', title: 'Set the solute mass', helper: '0 to 80 g.', complete: fields.isTouched('mass'), children: massSlider },
            { id: 'volume', title: 'Set the water volume', helper: '50 to 200 mL.', complete: fields.isTouched('volume'), children: volumeSlider },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          {/* Canvas */}
          <div className="flex-1 min-w-0">
            <canvas
              ref={canvasRef}
              width={500}
              height={300}
              className="w-full h-auto aspect-[5/3] rounded-xl border-2 border-base-300"
            />

            {/* Live readout cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">% by Mass</div>
                <div className="text-xl font-bold font-mono text-primary">{percentByMass.toFixed(1)}%</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">% m/v</div>
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
              {solutePicker}
            </div>

            {massSlider}

            {volumeSlider}

            {/* Formula display */}
            <div className="bg-base-100 p-4 rounded-lg border border-base-300 space-y-2">
              <div className="text-xs font-bold text-base-content/60 uppercase tracking-wider">Formula</div>
              <div className="text-sm font-mono">
                <span className="text-primary">%m/m</span> = <span className="text-base-content/80">{soluteMass}g</span> / <span className="text-base-content/80">{totalMass.toFixed(0)}g solution</span> × 100
              </div>
              <div className="text-sm font-mono">
                <span className="text-secondary">%m/v</span> = <span className="text-base-content/80">{soluteMass}g</span> / <span className="text-base-content/80">{solutionVolume.toFixed(0)}mL solution</span> × 100
              </div>
              <div className="text-[0.7rem] text-base-content/50 leading-snug">
                Solution volume = solvent ({solventVolume}mL) + dissolved solute ({(soluteMass / soluteDensity).toFixed(1)}mL at {soluteDensity} g/mL).
              </div>
            </div>

            <button className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
          </div>
        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default SolutionConcentrationVisualizer;
