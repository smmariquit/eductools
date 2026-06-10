import { useState, useEffect, useRef } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';
import { InlineMath } from 'react-katex';

const ProjectileMotionVisualizer = () => {
  const [angle, setAngle] = useState(35);
  const [velocity, setVelocity] = useState(15);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  const g = 9.8; // m/s^2
  const v0x = velocity * Math.cos(angle * (Math.PI / 180));
  const v0y = velocity * Math.sin(angle * (Math.PI / 180));

  // Current metric values
  const currentX = v0x * time;
  const currentY = Math.max(0, v0y * time - 0.5 * g * time * time);
  const currentVy = v0y - g * time;
  const isSapul = currentX >= 19.5 && currentX <= 20.5 && currentY <= 0.5;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = time;
    const pixelsPerMeter = 15; // Scaled up so 20m fits well
    const groundY = 380;
    const startX = 50;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let i = 0; i < 40; i += 2) {
        ctx.moveTo(startX + i * pixelsPerMeter, 0);
        ctx.lineTo(startX + i * pixelsPerMeter, groundY);
      }
      for(let j = 0; j < 25; j += 2) {
        ctx.moveTo(0, groundY - j * pixelsPerMeter);
        ctx.lineTo(canvas.width, groundY - j * pixelsPerMeter);
      }
      ctx.stroke();

      // Draw ground
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(0, groundY, canvas.width, 20);

      // Draw Lata (Target at 20m)
      ctx.fillStyle = '#94a3b8';
      const targetX = startX + 20 * pixelsPerMeter;
      ctx.fillRect(targetX - 5, groundY - 20, 10, 20);
      ctx.fillStyle = '#f87171';
      ctx.fillRect(targetX - 5, groundY - 15, 10, 5); // red stripe on can

      // Physics Calculation
      if (isPlaying) {
        t += 0.03; 
        setTime(t);
      }
      
      const x = startX + (v0x * t) * pixelsPerMeter;
      const y = groundY - (v0y * t - 0.5 * g * t * t) * pixelsPerMeter;

      // Stop condition
      if (y >= groundY && t > 0.1) {
        setIsPlaying(false);
        setTime((v0y + Math.sqrt(v0y*v0y)) / g); 
      }

      // Draw Pamato (Slipper)
      ctx.save();
      ctx.translate(x, Math.min(y, groundY));
      ctx.rotate(t * 10); // Spinning slipper
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.ellipse(0, 0, 12, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Sapul text
      if (isSapul && !isPlaying) {
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('SAPUL!', targetX - 50, groundY - 40);
      }

      if (isPlaying) animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, angle, velocity, isSapul]);

  return (
    <VisualizerLayout
      title="Tumbang Preso (Projectile Motion)"
      description="Analyze 2D kinematics of throwing a Pamato at a Lata 20 meters away."
      adSlotId="2006"
      educationalContent={
        <>
          <h2>Laro ng Lahi: Grade 9 Physics</h2>
          <p>Projectile motion is the motion of an object projected into the air, subject to gravity. To make this relatable, we use the traditional Filipino game <strong>Tumbang Preso</strong>.</p>
          <p>To score a <strong>"SAPUL!"</strong> (Direct Hit), you must adjust your angle and velocity so that the <em>Pamato</em> lands exactly on the <em>Lata</em> located 20 meters away.</p>
          <div className="bg-base-200 p-3 rounded-lg space-y-2 border border-base-300">
            <div><strong>Layo (Distance x):</strong> <InlineMath math={String.raw`x = v \cos(\theta) \cdot t`} /></div>
            <div><strong>Taas (Height y):</strong> <InlineMath math={String.raw`y = v \sin(\theta) \cdot t - \frac{1}{2}gt^2`} /></div>
          </div>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6">
          <div className="bg-slate-900 border border-base-300 rounded-xl overflow-hidden relative">
            <canvas ref={canvasRef} width={600} height={400} className="w-full h-auto block bg-slate-900" />
            
            {/* Translanguaged HUD */}
            <div className="absolute top-4 right-4 bg-black/80 p-4 rounded-lg border border-base-content/20 text-sm backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <div>
                  <div className="text-base-content/60">Oras (Time)</div>
                  <strong className="text-sky-400">{time.toFixed(2)} s</strong>
                </div>
                <div>
                  <div className="text-base-content/60">Taas (y)</div>
                  <strong className="text-emerald-400">{currentY.toFixed(1)} m</strong>
                </div>
                <div>
                  <div className="text-base-content/60">Layo (x)</div>
                  <strong className="text-amber-400">{currentX.toFixed(1)} m</strong>
                </div>
                <div>
                  <div className="text-base-content/60">Bilis (v_y)</div>
                  <strong className="text-rose-400">{currentVy.toFixed(1)} m/s</strong>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="flex flex-col gap-4">
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Anggulo (Angle <InlineMath math={String.raw`\theta`} />)</span>
                  <span className="text-primary">{angle}°</span>
                </label>
                <input type="range" min="0" max="90" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="range range-primary range-sm" />
              </div>
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Bilis ng Hagis (Velocity <InlineMath math="v_0" />)</span>
                  <span className="text-secondary">{velocity} m/s</span>
                </label>
                <input type="range" min="0" max="40" value={velocity} onChange={(e) => setVelocity(Number(e.target.value))} className="range range-secondary range-sm" />
              </div>
            </div>

            <div className="flex gap-4 items-center h-full">
              <button className={`btn flex-1 ${isPlaying ? 'btn-error' : 'btn-primary'}`} onClick={() => { if(!isPlaying) setTime(0); setIsPlaying(!isPlaying); }}>
                {isPlaying ? 'Reset' : 'Hagis! (Throw)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default ProjectileMotionVisualizer;
