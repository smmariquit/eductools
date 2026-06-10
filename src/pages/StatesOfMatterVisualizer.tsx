import { useState, useEffect, useRef } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';

const StatesOfMatterVisualizer = () => {
  const [temperature, setTemperature] = useState(20);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  let state = 'Solid (Yelo)';
  if (temperature > 30 && temperature <= 70) state = 'Liquid (Tubig)';
  else if (temperature > 70) state = 'Gas (Singaw)';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles = Array.from({ length: 150 }).map((_, i) => ({
      x: 150 + (i % 15) * 20,
      y: 250 - Math.floor(i / 15) * 20,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      baseX: 150 + (i % 15) * 20,
      baseY: 250 - Math.floor(i / 15) * 20,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const speed = temperature * 0.08;
      const isSolid = temperature <= 30;
      const isLiquid = temperature > 30 && temperature <= 70;
      
      particles.forEach(p => {
        if (isSolid) {
          // Vibrate around base position
          p.x = p.baseX + (Math.random() - 0.5) * (speed + 0.5);
          p.y = p.baseY + (Math.random() - 0.5) * (speed + 0.5);
        } else if (isLiquid) {
          // Move but stay somewhat near the bottom
          p.x += p.vx * speed * 0.6;
          p.y += p.vy * speed * 0.6;
          
          // Gravity pull to bottom
          if (p.y < 150) p.vy += 0.2;
          
          if (p.x < 10 || p.x > canvas.width - 10) p.vx *= -1;
          if (p.y < 10 || p.y > canvas.height - 10) p.vy *= -1;
          
          p.x = Math.max(10, Math.min(canvas.width - 10, p.x));
          p.y = Math.max(10, Math.min(canvas.height - 10, p.y));
        } else {
          // Gas: free movement, bouncing off walls
          p.x += p.vx * speed * 1.8;
          p.y += p.vy * speed * 1.8;
          
          if (p.x < 10 || p.x > canvas.width - 10) p.vx *= -1;
          if (p.y < 10 || p.y > canvas.height - 10) p.vy *= -1;
          
          p.x = Math.max(10, Math.min(canvas.width - 10, p.x));
          p.y = Math.max(10, Math.min(canvas.height - 10, p.y));
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(p.x - 2, p.y - 2, 1, p.x, p.y, 8);
        gradient.addColorStop(0, isSolid ? '#93c5fd' : isLiquid ? '#3b82f6' : '#d8b4fe');
        gradient.addColorStop(1, isSolid ? '#1d4ed8' : isLiquid ? '#1e3a8a' : '#7e22ce');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
      });

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [temperature]);

  return (
    <VisualizerLayout
      title="Mga Anyo ng Bagay (States of Matter)"
      description="Interactive tool for understanding how temperature affects molecular motion."
      adSlotId="1001"
      educationalContent={
        <>
          <h2>States of Matter: Grade 3 Science</h2>
          <p>Matter is everything around us. It exists primarily in three states: Solid, Liquid, and Gas.</p>
          <h3>How Temperature Affects Matter</h3>
          <ul>
            <li><strong>Solid (Halimbawa: Ice Candy):</strong> Particles are tightly packed and vibrate in place. This happens at lower temperatures.</li>
            <li><strong>Liquid (Halimbawa: Tubig sa baso):</strong> As temperature increases, particles gain energy and slide past each other, allowing liquids to flow.</li>
            <li><strong>Gas (Halimbawa: Singaw ng mainit na Sinigang):</strong> At high temperatures, particles have high energy and move freely, filling their container.</li>
          </ul>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center p-4 md:p-8">
          
          <div className="w-full max-w-3xl bg-slate-900 rounded-xl overflow-hidden shadow-inner border-[4px] border-slate-700 relative">
            <canvas ref={canvasRef} width={600} height={300} className="w-full h-auto block" />
            <div className="absolute top-4 left-4 text-white/50 text-xs tracking-widest font-mono">
              MOLECULAR KINETIC SIMULATION
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
