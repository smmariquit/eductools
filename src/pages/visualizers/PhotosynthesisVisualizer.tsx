import { useState, useEffect, useRef } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { MeasuredValue, UnitSuffix } from '../../components/scientific-units/UnitGuideLink';
import { IntroState, useIntroState } from '../../components/onboarding';
// ==========================================
// Object Pool for Canvas Particles (GC Friendly)
// ==========================================
const CONSTANTS = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 400,
  MAX_PARTICLES: 300,
};

class Particle {
  x: number = 0;
  y: number = 0;
  speedY: number = 0;
  speedX: number = 0;
  type: 'CO2' | 'O2' = 'CO2';
  active: boolean = false;
  
  spawn(type: 'CO2' | 'O2', startX: number, startY: number, dirY: number) {
    this.type = type;
    this.x = startX + (Math.random() * 40 - 20);
    this.y = startY;
    this.speedY = dirY * (1 + Math.random());
    this.speedX = (Math.random() - 0.5);
    this.active = true;
  }

  update() {
    if (!this.active) return;
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y < 0 || this.y > CONSTANTS.CANVAS_HEIGHT) {
      this.active = false;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return;
    ctx.beginPath();
    ctx.arc(Math.floor(this.x), Math.floor(this.y), 4, 0, Math.PI * 2);
    // CPK coloring: Carbon (Grey), Oxygen (Red)
    ctx.fillStyle = this.type === 'CO2' ? '#9CA3AF' : '#EF4444';
    ctx.fill();
  }
}

// ==========================================
// Math Logic: Biochemical Rate Curves
// ==========================================
const calculateRate = (light: number, co2: number, water: number) => {
  const aperture = (water / 100) * (Math.min(light, 200) / 200); // 0 to 1
  
  const vMax = 40.0; 
  const km = 300.0;
  const pMax = 30.0;
  const alpha = 0.05;
  const theta = 0.85;
  const rd = 1.5;

  // Non-Rectangular Hyperbola (Light Limitation)
  const term1 = alpha * light + pMax;
  const term2 = Math.sqrt(Math.pow(term1, 2) - 4 * theta * alpha * light * pMax);
  const lightLimitation = ((term1 - term2) / (2 * theta)) - rd;

  // Michaelis-Menten Kinetics (CO2 Limitation)
  const co2Limitation = (vMax * co2) / (km + co2);
  
  // Blackman's Law of Limiting Factors
  const baseRate = Math.max(0, Math.min(lightLimitation, co2Limitation));
  return baseRate * aperture;
};

// ==========================================
// Sub-component: Van Helmont Mass Balance
// ==========================================
const VanHelmontSimulation = ({ rate }: { rate: number }) => {
  const [plantMass, setPlantMass] = useState(2.27); // 5 lbs in kg
  const [soilMass, setSoilMass] = useState(90.72); // 200 lbs in kg
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isSimulating) {
      interval = window.setInterval(() => {
        // Increment plant mass based on rate (CO2 assimilation)
        // Rate is abstract, let's scale it to visual kg ticks
        const massDelta = rate * 0.01;
        setPlantMass(m => m + massDelta);
        // Soil drops by a tiny fraction (minerals only)
        setSoilMass(s => s - (massDelta * 0.001));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isSimulating, rate]);

  const resetSim = () => {
    setPlantMass(2.27);
    setSoilMass(90.72);
    setIsSimulating(false);
  };

  return (
    <div className="flex flex-col items-center bg-base-200 p-6 rounded-xl border border-base-300 shadow-inner">
      <h3 className="font-bold text-lg mb-2">The Van Helmont Experiment (1648)</h3>
      <p className="text-sm text-base-content/70 mb-6 text-center max-w-lg">
        Watch the plant grow. Notice that its mass increases from atmospheric CO₂, while the soil mass remains virtually unchanged! Plants DO NOT eat soil.
      </p>

      <div className="flex gap-8 items-end mb-8 relative">
        {/* CO2 entering from air */}
        {isSimulating && rate > 0 && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-base-content/50 text-xs animate-bounce flex flex-col items-center gap-1">
            <span className="font-mono bg-base-100 px-2 py-1 rounded-md border border-base-300">↓ Absorbing CO₂</span>
          </div>
        )}
        
        <div className="flex flex-col items-center gap-2">
          <div className="w-32 h-32 bg-emerald-800/10 rounded-lg border-2 border-emerald-900/20 flex items-center justify-center relative overflow-hidden">
             {/* Tree scales up */}
             <div className="text-6xl origin-bottom transition-transform duration-200" style={{ transform: `scale(${Math.min(2.5, 0.5 + plantMass / 20)})` }}>🌳</div>
          </div>
          <div className="bg-base-100 px-4 py-2 rounded shadow border border-base-300 text-center w-full">
            <div className="text-xs uppercase text-base-content/60 font-bold tracking-wider">Plant Biomass</div>
            <MeasuredValue value={plantMass.toFixed(2)} unit="kg" valueClassName="text-xl font-mono font-bold text-emerald-600" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-32 h-32 bg-[#452b1b] rounded-lg border-2 border-[#2b1910] flex flex-col justify-end overflow-hidden p-2">
            {/* Minerals representation */}
            <div className="w-full h-2 bg-white/10 rounded"></div>
            <div className="w-3/4 h-2 bg-white/10 rounded mt-1"></div>
          </div>
          <div className="bg-base-100 px-4 py-2 rounded shadow border border-base-300 text-center w-full">
            <div className="text-xs uppercase text-base-content/60 font-bold tracking-wider">Dry Soil Mass</div>
            <MeasuredValue value={soilMass.toFixed(4)} unit="kg" valueClassName="text-xl font-mono font-bold text-amber-700" />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          className={`btn ${isSimulating ? 'btn-error' : 'btn-primary'}`} 
          onClick={() => setIsSimulating(!isSimulating)}
        >
          {isSimulating ? 'Pause Growth' : 'Start Growth (5 Years)'}
        </button>
        <button className="btn btn-outline" onClick={resetSim}>Reset</button>
      </div>
    </div>
  );
};

// ==========================================
// Sub-component: Stomatal Gas Exchange
// ==========================================
const StomatalVisualizer = ({ light, co2, water, rate }: { light: number, co2: number, water: number, rate: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  const particlesRef = useRef<Particle[]>(
    Array.from({ length: CONSTANTS.MAX_PARTICLES }, () => new Particle())
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Optimize rendering by disabling the alpha channel
    const ctx = canvas.getContext('2d', { alpha: false }); 
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CONSTANTS.CANVAS_WIDTH * dpr;
    canvas.height = CONSTANTS.CANVAS_HEIGHT * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `100%`;
    canvas.style.height = `100%`;

    const particles = particlesRef.current;

    const renderLoop = () => {
      // 1. Clear frame buffer (Slate-900 representation of intercellular space)
      ctx.fillStyle = '#0F172A'; 
      ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);

      // Draw Atmospheric boundary
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, CONSTANTS.CANVAS_HEIGHT / 2, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT / 2);

      // 2. Calculate Stomatal Aperture (0 to 80px open) based on turgor pressure (water + light)
      const apertureScale = (water / 100) * (Math.min(light, 200) / 200);
      const aperture = apertureScale * 80;

      // 3. Render Guard Cells
      const centerX = CONSTANTS.CANVAS_WIDTH / 2;
      const centerY = CONSTANTS.CANVAS_HEIGHT / 2;
      
      ctx.fillStyle = '#22C55E'; // Green-500
      
      // Left Guard Cell
      ctx.beginPath();
      ctx.ellipse(centerX - aperture / 2 - 20, centerY, 40, 100, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Right Guard Cell
      ctx.beginPath();
      ctx.ellipse(centerX + aperture / 2 + 20, centerY, 40, 100, 0, 0, Math.PI * 2);
      ctx.fill();

      // Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Leaf Interior', centerX, 40);
      ctx.fillText('Atmosphere', centerX, CONSTANTS.CANVAS_HEIGHT - 40);

      // 4. Spawn particulate elements dynamically based on rate
      if (Math.random() < rate / 10) {
        // Spawn O2 going down out of the stoma
        const freeO2 = particles.find(p => !p.active);
        if (freeO2) freeO2.spawn('O2', centerX, centerY, 2);
        
        // Spawn CO2 going up into the stoma
        const freeCO2 = particles.find(p => !p.active);
        if (freeCO2) freeCO2.spawn('CO2', centerX, CONSTANTS.CANVAS_HEIGHT - 10, -2);
      }

      // 5. Update kinematics and draw active particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
      }

      animationRef.current = requestAnimationFrame(renderLoop);
    };

    animationRef.current = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationRef.current);
  }, [light, co2, water, rate]);

  return (
    <div className="flex flex-col items-center bg-slate-800 p-1 md:p-4 rounded-xl shadow-2xl w-full">
      <div className="relative overflow-hidden border border-slate-700 rounded-lg w-full aspect-[2/1] max-w-[800px]">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    </div>
  );
};


// ==========================================
// Main Component
// ==========================================
type ViewMode = 'mass' | 'stomata';

const PhotosynthesisVisualizer = () => {
  const intro = useIntroState();
  const [viewMode, setViewMode] = useState<ViewMode>('stomata');
  
  // Strict environmental variables
  const [light, setLight] = useState(500); // μmol m-2 s-1 (0 - 2000)
  const [co2, setCo2] = useState(400); // ppm (0 - 1000)
  const [water, setWater] = useState(80); // percentage (0 - 100)

  const rate = calculateRate(light, co2, water);

  return (
    <VisualizerLayout
      title="Advanced Photosynthesis Model"
      description="Interactive biological simulation of photosynthesis using real metabolic rate curves."
      adSlotId="1008"
      guideLink="/blog/photosynthesis"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
        {!intro.started ? (
          <div className="card-body p-6 md:p-8">
            <IntroState
              lead="Explore the limiting factors of photosynthesis by adjusting light, carbon dioxide, and water and watching the rate respond."
              actionLabel="Start exploring"
              onStart={intro.start}
            />
          </div>
        ) : (
        <>
        {/* Navigation Tabs */}
        <div className="bg-base-200 p-2 flex flex-wrap justify-center border-b border-base-300 gap-2" role="tablist" aria-label="Photosynthesis views">
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'stomata'}
            className={`btn btn-sm font-bold ${viewMode === 'stomata' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setViewMode('stomata')}
          >
            Stomatal Gas Exchange
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'mass'}
            className={`btn btn-sm font-bold ${viewMode === 'mass' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setViewMode('mass')}
          >
            Van Helmont Mass Balance
          </button>
        </div>

        <div className="p-4 md:p-8 flex flex-col xl:flex-row gap-8">
          
          <div className="flex-1">
            {viewMode === 'stomata' ? (
              <StomatalVisualizer light={light} co2={co2} water={water} rate={rate} />
            ) : (
              <VanHelmontSimulation rate={rate} />
            )}
          </div>

          <div className="xl:w-80 flex flex-col gap-6 bg-base-200/50 p-6 rounded-xl border border-base-200 shadow-sm">
            <h3 className="font-bold text-lg border-b border-base-300 pb-2">Environmental Limiting Factors</h3>
            
            <Slider
              motif="light"
              label="Light Irradiance"
              value={light}
              min={0}
              max={2000}
              colorClass="warning"
              readout={<>{light} <UnitSuffix unit="μmol m⁻² s⁻¹" className="text-[10px]" /></>}
              onChange={(e) => setLight(Number(e.target.value))}
            />

            <Slider
              motif="co2"
              label="Atmospheric CO₂"
              value={co2}
              min={0}
              max={1000}
              colorClass="neutral"
              readout={<>{co2} <UnitSuffix unit="ppm" className="text-[10px]" /></>}
              onChange={(e) => setCo2(Number(e.target.value))}
            />

            <Slider
              motif="water"
              label="Soil Water Availability"
              value={water}
              min={0}
              max={100}
              unit="%"
              colorClass="info"
              onChange={(e) => setWater(Number(e.target.value))}
            />

            <div className="mt-auto bg-base-100 p-4 rounded-lg border border-base-300 shadow text-center">
              <div className="text-xs uppercase text-base-content/60 font-bold mb-1 tracking-wider">Net Photosynthetic Rate</div>
              <div className="text-3xl font-black font-mono text-success">{rate.toFixed(1)}</div>
              <div className="text-xs text-base-content/50 mt-1">Limited by {
                water === 0 ? 'Water (Stomata Closed)' :
                (rate < 10 && light < 200) ? 'Light (Non-Rectangular Hyperbola)' :
                (rate < 10 && co2 < 300) ? 'CO₂ (Michaelis-Menten)' : 'Multiple Factors'
              }</div>
            </div>
          </div>

        </div>
        </>
        )}
      </div>
    </VisualizerLayout>
  );
};

export default PhotosynthesisVisualizer;
