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
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-outline" style={{ display: 'inline-block', fontSize: '0.875rem' }}>&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>States of Matter Simulator</h1>
        <p>Interactive tool for understanding how temperature affects particle motion.</p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
          <canvas ref={canvasRef} width={600} height={300} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
        
        <div style={{ width: '100%', maxWidth: '600px', marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Temperature: {temperature}°C</span>
            <span style={{ fontWeight: 600, color: 'var(--accent-color)' }}>State: {state}</span>
          </div>
          <input type="range" min="0" max="100" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>

      <article className="article-content">
        <h2>States of Matter: Grade 3 Science</h2>
        <p>Matter is everything around us. It exists primarily in three states: Solid, Liquid, and Gas. Understanding these states is a fundamental concept in the Key Stage 1 MATATAG curriculum.</p>
        <h3>How Temperature Affects Matter</h3>
        <ul>
          <li><strong>Solid:</strong> Particles are tightly packed and vibrate in place. This happens at lower temperatures.</li>
          <li><strong>Liquid:</strong> As temperature increases, particles gain energy and slide past each other, allowing liquids to flow.</li>
          <li><strong>Gas:</strong> At high temperatures, particles have high energy and move freely, filling their container.</li>
        </ul>
      </article>
      <AdUnit slotId="1001" format="auto" />
    </div>
  );
};
export default StatesOfMatterVisualizer;
