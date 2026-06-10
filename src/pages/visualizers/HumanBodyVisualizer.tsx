import HumanBodyMdx from '../../content/deep-dives/human-body.mdx';
import { useState, useEffect, useRef } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

type ViewMode = 'homeostasis' | 'vascular' | 'absorption' | 'reflex';

const HumanBodyVisualizer = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('homeostasis');

  return (
    <VisualizerLayout
      title="Advanced Human Body Systems"
      description="Interactive physiological models based on international competency standards."
      adSlotId="1003"
      educationalContent={<HumanBodyMdx />}
    >
      <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="tabs tabs-boxed rounded-none bg-base-200 p-2 flex flex-wrap justify-center border-b border-base-300">
          <button className={`tab ${viewMode === 'homeostasis' ? 'tab-active btn-primary text-primary-content font-bold' : ''}`} onClick={() => setViewMode('homeostasis')}>Cardiorespiratory</button>
          <button className={`tab ${viewMode === 'vascular' ? 'tab-active btn-primary text-primary-content font-bold' : ''}`} onClick={() => setViewMode('vascular')}>Vascular Mapping</button>
          <button className={`tab ${viewMode === 'absorption' ? 'tab-active btn-primary text-primary-content font-bold' : ''}`} onClick={() => setViewMode('absorption')}>Micro-Absorption</button>
          <button className={`tab ${viewMode === 'reflex' ? 'tab-active btn-primary text-primary-content font-bold' : ''}`} onClick={() => setViewMode('reflex')}>Reflex Arc</button>
        </div>

        <div className="p-4 md:p-8">
          {viewMode === 'homeostasis' && <HomeostasisEngine />}
          {viewMode === 'vascular' && <VascularEngine />}
          {viewMode === 'absorption' && <AbsorptionEngine />}
          {viewMode === 'reflex' && <ReflexEngine />}
        </div>

      </div>
    </VisualizerLayout>
  );
};

// ==========================================
// 1. Homeostasis Engine
// ==========================================
const HomeostasisEngine = () => {
  const [intensity, setIntensity] = useState(0.0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ intensity: 0.0, time: 0 });

  useEffect(() => {
    stateRef.current.intensity = intensity;
  }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;

    const tick = () => {
      stateRef.current.time += 1;
      const { intensity, time } = stateRef.current;

      const hrHz = 1.0 + intensity * 2.0; 
      const brHz = 0.2 + intensity * 0.6; 

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Diaphragm and Lungs
      const angleLungs = time * 0.016 * 2 * Math.PI * brHz;
      const displacement = Math.sin(angleLungs); 
      const diaphragmY = 280 + displacement * (15 + intensity * 15);
      const lungScale = 1.0 + (displacement + 1.0) * 0.15; 

      ctx.save();
      ctx.translate(250, 180);
      ctx.scale(1.0, lungScale);
      ctx.beginPath();
      ctx.arc(0, 0, 40, Math.PI, 0, false);
      ctx.quadraticCurveTo(50, 40, 0, 80);
      ctx.quadraticCurveTo(-50, 40, -40, 0);
      ctx.fillStyle = `rgb(${200 + (displacement + 1) * 20}, 120, 120)`;
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(180, 280);
      ctx.quadraticCurveTo(250, diaphragmY, 320, 280);
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#8b5a2b';
      ctx.stroke();

      // Draw Heart
      const angleHeart = time * 0.016 * 2 * Math.PI * hrHz;
      const contraction = Math.abs(Math.sin(angleHeart));
      const heartRadius = 35 - contraction * (5 + intensity * 5);

      ctx.beginPath();
      ctx.arc(500, 200, heartRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#b22222';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      // Labels
      ctx.fillStyle = '#fff';
      ctx.font = '16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Breathing Rate: ${(brHz * 60).toFixed(0)} breaths/min`, 250, 350);
      ctx.fillText(`Heart Rate: ${(hrHz * 60).toFixed(0)} BPM`, 500, 350);
      ctx.fillText(`CO2 Levels: ${(40 + intensity * 20).toFixed(1)} mmHg`, 375, 40);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-base-200 p-6 rounded-xl border border-base-300">
        <label className="font-bold flex justify-between mb-4">
          <span>Physical Activity Intensity</span>
          <span className="text-primary font-mono">{(intensity * 100).toFixed(0)}%</span>
        </label>
        <input 
          type="range" 
          min="0" max="1" step="0.05" 
          value={intensity} 
          onChange={(e) => setIntensity(parseFloat(e.target.value))}
          className="range range-primary"
        />
        <div className="flex justify-between text-xs mt-2 text-base-content/60 font-semibold uppercase tracking-wide">
          <span>Resting</span>
          <span>Sprinting</span>
        </div>
      </div>
      <div className="flex justify-center w-full">
         <canvas ref={canvasRef} width={750} height={400} className="rounded-xl border-2 border-base-300 w-full h-auto aspect-[15/8] max-w-[750px] bg-slate-900" />
      </div>
    </div>
  );
};

// ==========================================
// 2. Vascular Engine
// ==========================================
const VascularEngine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animId: number;
    let time = 0;

    const getOxygenationColor = (o2Percent: number) => {
      const rStart = 0x4a, gStart = 0x0e, bStart = 0x17;
      const rEnd = 0xd6, gEnd = 0x22, bEnd = 0x29;
      const r = Math.round(rStart + (rEnd - rStart) * o2Percent);
      const g = Math.round(gStart + (gEnd - gStart) * o2Percent);
      const b = Math.round(bStart + (bEnd - bStart) * o2Percent);
      return `rgb(${r}, ${g}, ${b})`;
    };

    const vesselPaths = [
      { name: 'Systemic Artery', points: [[300, 250], [250, 350], [150, 350]], o2: 0.98, away: true },
      { name: 'Systemic Vein', points: [[150, 400], [250, 400], [300, 270]], o2: 0.70, away: false },
      { name: 'Pulmonary Artery', points: [[300, 230], [250, 100], [150, 100]], o2: 0.70, away: true },
      { name: 'Pulmonary Vein', points: [[150, 150], [250, 150], [300, 240]], o2: 0.98, away: false }
    ];

    const tick = () => {
      time += 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Heart
      ctx.beginPath();
      ctx.arc(300, 250, 40, 0, 2 * Math.PI);
      ctx.fillStyle = '#7D181D';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#fff';
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('HEART', 300, 255);

      // Draw Capillaries (Lungs & Body)
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(50, 75, 100, 100);
      ctx.fillText('LUNGS', 100, 130);
      
      ctx.fillRect(50, 325, 100, 100);
      ctx.fillText('BODY TISSUES', 100, 380);

      // Draw Vessels and particles
      vesselPaths.forEach(v => {
        ctx.beginPath();
        ctx.moveTo(v.points[0][0], v.points[0][1]);
        for (let i = 1; i < v.points.length; i++) {
          ctx.lineTo(v.points[i][0], v.points[i][1]);
        }
        ctx.strokeStyle = getOxygenationColor(v.o2);
        ctx.lineWidth = 12;
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Particles
        ctx.fillStyle = '#ffffff';
        for (let p = 0; p < 5; p++) {
          const offset = (time + p * 40) % 200;
          const progress = offset / 200;
          // Simplified interpolation for 3 points
          let currentX, currentY;
          if (progress < 0.5) {
            const t = progress * 2;
            currentX = v.points[0][0] + (v.points[1][0] - v.points[0][0]) * t;
            currentY = v.points[0][1] + (v.points[1][1] - v.points[0][1]) * t;
          } else {
            const t = (progress - 0.5) * 2;
            currentX = v.points[1][0] + (v.points[2][0] - v.points[1][0]) * t;
            currentY = v.points[1][1] + (v.points[2][1] - v.points[1][1]) * t;
          }
          ctx.beginPath();
          ctx.arc(currentX, currentY, 3, 0, 2 * Math.PI);
          ctx.fill();
        }

        // Labels
        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px Inter';
        ctx.fillText(v.name, v.points[1][0], v.points[1][1] - 15);
      });

      // Legend
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'left';
      ctx.fillText('O2 Saturation:', 450, 50);
      
      const grad = ctx.createLinearGradient(450, 60, 650, 60);
      grad.addColorStop(0, getOxygenationColor(0));
      grad.addColorStop(0.5, getOxygenationColor(0.5));
      grad.addColorStop(1, getOxygenationColor(1));
      ctx.fillStyle = grad;
      ctx.fillRect(450, 60, 200, 20);
      
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('0% (Deoxygenated)', 450, 95);
      ctx.textAlign = 'right';
      ctx.fillText('100% (Oxygenated)', 650, 95);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="flex justify-center w-full">
      <canvas ref={canvasRef} width={750} height={500} className="rounded-xl border-2 border-base-300 w-full h-auto aspect-[3/2] max-w-[750px] bg-slate-900" />
    </div>
  );
};

// ==========================================
// 3. Absorption Engine
// ==========================================
const AbsorptionEngine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let time = 0;

    const tick = () => {
      time += 1;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Intestinal Lumen background
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, width, 120);
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 16px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Intestinal Lumen (Food Particles)', width / 2, 30);

      // Villus Wall
      ctx.save();
      ctx.strokeStyle = '#d2b48c';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(150, height + 20);
      ctx.bezierCurveTo(150, 100, width - 150, 100, width - 150, height + 20);
      ctx.stroke();
      ctx.restore();

      // Blood Capillary (Red)
      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(200, height);
      ctx.lineTo(200, 180);
      ctx.arc(width/2, 180, width/2 - 200, Math.PI, 0);
      ctx.lineTo(width - 200, height);
      ctx.stroke();

      // Lacteal (Yellow)
      ctx.fillStyle = '#fde047';
      ctx.fillRect(width / 2 - 20, 230, 40, height - 230);
      ctx.beginPath();
      ctx.arc(width / 2, 230, 20, Math.PI, 0);
      ctx.fill();

      // Labels
      ctx.fillStyle = '#fff';
      ctx.font = '12px Inter';
      ctx.fillText('Blood Capillary (Absorbs Sugars/Amino Acids)', 200, height - 20);
      ctx.fillText('Central Lacteal (Absorbs Lipids)', width / 2, height - 60);

      // Particles (Glucose to Capillary)
      ctx.fillStyle = '#06b6d4';
      for (let i = 0; i < 15; i++) {
        const offset = (time + i * 40) % 300;
        const prog = offset / 300;
        const startX = 100 + (i * 30) % 400;
        const startY = 80;
        const targetX = 200; // Left capillary branch
        const targetY = 300;
        ctx.beginPath();
        ctx.arc(startX + (targetX - startX) * prog, startY + (targetY - startY) * prog, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Particles (Lipids to Lacteal)
      ctx.fillStyle = '#fde047';
      for (let i = 0; i < 10; i++) {
        const offset = (time + i * 55) % 300;
        const prog = offset / 300;
        const startX = 150 + (i * 45) % 300;
        const startY = 60;
        const targetX = width / 2;
        const targetY = 280;
        ctx.beginPath();
        ctx.rect(startX + (targetX - startX) * prog - 4, startY + (targetY - startY) * prog - 4, 8, 8);
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="flex justify-center w-full">
      <canvas ref={canvasRef} width={600} height={500} className="rounded-xl border-2 border-base-300 w-full h-auto aspect-[6/5] max-w-[600px] bg-slate-900" />
    </div>
  );
};

// ==========================================
// 4. Reflex Engine
// ==========================================
const ReflexEngine = () => {
  const [phase, setPhase] = useState<'REST' | 'STIM' | 'SYNAPSE' | 'MOTOR'>('REST');
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer: number;
    if (phase !== 'REST') {
      timer = window.setInterval(() => {
        setTime(t => {
          if (t > 40 && phase === 'STIM') setPhase('SYNAPSE');
          if (t > 80 && phase === 'SYNAPSE') setPhase('MOTOR');
          if (t > 130) {
            setPhase('REST');
            return 0;
          }
          return t + 1;
        });
      }, 30);
    } else {
      setTime(0);
    }
    return () => clearInterval(timer);
  }, [phase]);

  // Logic ported from the Deep Research doc
  let extensorVoltage = -70;
  let flexorVoltage = -70;

  if (phase === 'SYNAPSE' || phase === 'MOTOR') {
    if (phase === 'SYNAPSE') {
      extensorVoltage = -70 + Math.min(35, (time - 40) * 2);
      flexorVoltage = -70 - Math.min(15, (time - 40) * 1);
    } else {
      extensorVoltage = 30; // Spike
      flexorVoltage = -80;  // Hyperpolarized
    }
  }

  return (
    <div className="flex flex-col gap-8 items-center w-full">
      <div className="w-full max-w-2xl bg-base-200 p-8 rounded-xl border border-base-300 relative overflow-hidden">
        
        {/* Nodes */}
        <div className="flex justify-between items-center mb-16 relative z-10">
          <div className="text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-xs border-4 transition-all duration-300 ${phase === 'STIM' ? 'bg-warning text-warning-content border-warning scale-110 shadow-[0_0_20px_rgba(251,191,36,0.5)]' : 'bg-base-100 border-base-300 text-base-content/50'}`}>
              Sensory
            </div>
          </div>
          <div className="text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center font-bold text-xs border-4 transition-all duration-300 ${phase === 'SYNAPSE' ? 'bg-primary text-primary-content border-primary scale-110 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-base-100 border-base-300 text-base-content/50'}`}>
              Spinal Cord
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center font-bold text-xs border-4 transition-all duration-300 ${phase === 'MOTOR' ? 'bg-success text-success-content border-success scale-110 shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'bg-base-100 border-base-300 text-base-content/50'}`}>
              <span>Extensor</span>
              <span className="opacity-70 font-mono mt-1">{extensorVoltage}mV</span>
            </div>
            <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center font-bold text-xs border-4 transition-all duration-300 ${phase === 'MOTOR' ? 'bg-error text-error-content border-error scale-110 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-base-100 border-base-300 text-base-content/50'}`}>
              <span>Flexor</span>
              <span className="opacity-70 font-mono mt-1">{flexorVoltage}mV</span>
            </div>
          </div>
        </div>

        {/* Connections (simplified SVG) */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" style={{ padding: '2rem' }}>
           <path d="M 50 80 L 300 80" stroke="#fbbf24" strokeWidth="4" strokeDasharray={phase === 'STIM' ? '10 10' : '0'} className={phase === 'STIM' ? 'animate-[dash_1s_linear_infinite]' : ''} fill="none" opacity={phase !== 'REST' ? 1 : 0.2} />
           <path d="M 350 70 L 500 40" stroke="#22c55e" strokeWidth="4" fill="none" opacity={phase === 'MOTOR' ? 1 : 0.2} />
           <path d="M 350 90 L 500 120" stroke="#ef4444" strokeWidth="4" fill="none" opacity={phase === 'MOTOR' || phase === 'SYNAPSE' ? 1 : 0.2} />
        </svg>

        <div className="flex justify-center mt-8 relative z-10">
          <button 
            className="btn btn-primary btn-lg" 
            onClick={() => { setPhase('STIM'); setTime(0); }}
            disabled={phase !== 'REST'}
          >
            Trigger Patellar Hammer
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
        <div className="bg-base-200 p-4 rounded-xl text-center">
          <h3 className="font-bold text-success mb-2">Extensor Muscle</h3>
          <p className="text-sm font-mono">{extensorVoltage >= -50 ? 'CONTRACTING (Excitatory)' : 'Resting'}</p>
        </div>
        <div className="bg-base-200 p-4 rounded-xl text-center">
          <h3 className="font-bold text-error mb-2">Flexor Muscle</h3>
          <p className="text-sm font-mono">{flexorVoltage < -70 ? 'INHIBITED (Hyperpolarized)' : 'Resting'}</p>
        </div>
      </div>
    </div>
  );
};

export default HumanBodyVisualizer;
