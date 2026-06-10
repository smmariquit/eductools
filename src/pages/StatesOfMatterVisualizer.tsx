import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';

const StatesOfMatterVisualizer = () => {
  const [temperature, setTemperature] = useState(20);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  let state = 'Solid';
  if (temperature > 30 && temperature <= 70) state = 'Liquid';
  else if (temperature > 70) state = 'Gas';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles = Array.from({ length: 100 }).map((_, i) => ({
      x: 50 + (i % 10) * 20,
      y: 200 - Math.floor(i / 10) * 20,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      baseX: 50 + (i % 10) * 20,
      baseY: 200 - Math.floor(i / 10) * 20,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Speed multiplier based on temp
      const speed = temperature * 0.05;
      
      particles.forEach(p => {
        if (state === 'Solid') {
          // Vibrate around base position
          p.x = p.baseX + (Math.random() - 0.5) * speed;
          p.y = p.baseY + (Math.random() - 0.5) * speed;
        } else if (state === 'Liquid') {
          // Move but stay somewhat near the bottom
          p.x += p.vx * speed * 0.5;
          p.y += p.vy * speed * 0.5;
          
          // Gravity pull to bottom
          if (p.y < 150) p.vy += 0.1;
          
          if (p.x < 10 || p.x > canvas.width - 10) p.vx *= -1;
          if (p.y < 10 || p.y > canvas.height - 10) p.vy *= -1;
          
          p.x = Math.max(10, Math.min(canvas.width - 10, p.x));
          p.y = Math.max(10, Math.min(canvas.height - 10, p.y));
        } else {
          // Gas: free movement, bouncing off walls
          p.x += p.vx * speed * 1.5;
          p.y += p.vy * speed * 1.5;
          
          if (p.x < 10 || p.x > canvas.width - 10) p.vx *= -1;
          if (p.y < 10 || p.y > canvas.height - 10) p.vy *= -1;
          
          p.x = Math.max(10, Math.min(canvas.width - 10, p.x));
          p.y = Math.max(10, Math.min(canvas.height - 10, p.y));
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(p.x - 2, p.y - 2, 1, p.x, p.y, 8);
        gradient.addColorStop(0, '#60a5fa');
        gradient.addColorStop(1, '#1e3a8a');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
      });

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [temperature, state]);

  return (
    <div className="w-full">
      <div className="mb-6">
        <Link to="/" className="btn btn-outline btn-sm">&larr; Back to Modules</Link>
      </div>
      <div className="pb-4 border-b border-base-300 mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">States of Matter Simulator</h1>
        <p className="text-base-content/80">Interactive tool for understanding how temperature affects particle motion.</p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center p-4 md:p-8">
          <div className="w-full max-w-3xl bg-base-300 border border-base-300 rounded-xl overflow-hidden shadow-inner">
            <canvas ref={canvasRef} width={600} height={300} className="w-full h-auto block" />
          </div>
          
          <div className="w-full max-w-3xl mt-8 bg-base-200 p-6 rounded-xl border border-base-300">
            <div className="flex justify-between mb-4 font-semibold text-base-content">
              <span>Temperature: {temperature}°C</span>
              <span className="text-primary text-lg">State: {state}</span>
            </div>
            <input 
              type="range" min="0" max="100" 
              value={temperature} 
              onChange={(e) => setTemperature(Number(e.target.value))} 
              className="range range-primary w-full" 
            />
            <div className="flex justify-between text-xs px-2 mt-2 text-base-content/60 font-medium">
              <span>0°C (Solid)</span>
              <span>100°C (Gas)</span>
            </div>
          </div>
        </div>
      </div>

      <article className="prose lg:prose-xl mt-12 pt-8 border-t border-base-300 max-w-none text-base-content">
        <h2 className="text-primary">States of Matter: Grade 3 Science</h2>
        <p>Matter is everything around us. It exists primarily in three states: Solid, Liquid, and Gas. Understanding these states is a fundamental concept in the Key Stage 1 MATATAG curriculum.</p>
        <h3>How Temperature Affects Matter</h3>
        <ul>
          <li><strong>Solid:</strong> Particles are tightly packed and vibrate in place. This happens at lower temperatures.</li>
          <li><strong>Liquid:</strong> As temperature increases, particles gain energy and slide past each other, allowing liquids to flow.</li>
          <li><strong>Gas:</strong> At high temperatures, particles have high energy and move freely, filling their container.</li>
        </ul>
      </article>
      <div className="mt-8">
        <AdUnit slotId="1001" format="auto" />
      </div>
    </div>
  );
};
export default StatesOfMatterVisualizer;
