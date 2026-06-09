import { useState, useEffect, useRef } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';

const ProjectileMotionVisualizer = () => {
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(20);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  const g = 9.8; // m/s^2
  const v0x = velocity * Math.cos(angle * (Math.PI / 180));
  const v0y = velocity * Math.sin(angle * (Math.PI / 180));

  // Current metric values
  const currentX = v0x * time;
  const currentY = Math.max(0, v0y * time - 0.5 * g * time * time);
  const currentVx = v0x;
  const currentVy = v0y - g * time;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = time;
    const pixelsPerMeter = 3;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid / axes
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let i = 0; i < 200; i += 20) {
        // Vertical lines (Distance)
        ctx.moveTo(50 + i * pixelsPerMeter, 0);
        ctx.lineTo(50 + i * pixelsPerMeter, 380);
        if (i % 40 === 0) {
          ctx.fillStyle = 'rgba(255,255,255,0.3)';
          ctx.fillText(`${i}m`, 50 + i * pixelsPerMeter - 10, 395);
        }
      }
      for(let j = 0; j < 100; j += 20) {
        // Horizontal lines (Height)
        ctx.moveTo(40, 380 - j * pixelsPerMeter);
        ctx.lineTo(600, 380 - j * pixelsPerMeter);
        if (j > 0 && j % 40 === 0) {
          ctx.fillText(`${j}m`, 20, 380 - j * pixelsPerMeter + 4);
        }
      }
      ctx.stroke();

      // Draw ground
      ctx.fillStyle = '#16a34a';
      ctx.fillRect(0, 380, canvas.width, 20);

      // Trajectory calculation
      if (isPlaying) {
        t += 0.03; // Real-time delta
        setTime(t);
      }
      
      const x = 50 + (v0x * t) * pixelsPerMeter;
      const y = 380 - (v0y * t - 0.5 * g * t * t) * pixelsPerMeter;

      // Stop condition
      if (y >= 380 && t > 0.1) {
        setIsPlaying(false);
        setTime((v0y + Math.sqrt(v0y*v0y)) / g); // Exact landing time
      }

      // Draw projectile
      ctx.beginPath();
      ctx.arc(x, Math.min(y, 380), 8, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      // Draw cannon
      ctx.save();
      ctx.translate(50, 380);
      ctx.rotate(-angle * (Math.PI / 180));
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(-10, -10, 40, 20);
      ctx.restore();

      if (isPlaying) animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, angle, velocity]); // Removed time from deps to prevent React render loop stealing the canvas loop

  return (
    <VisualizerLayout
      title="Projectile Motion Visualizer"
      description="Analyze 2D kinematics of a fired projectile."
      adSlotId="2006"
      educationalContent={
        <>
          <h2>Kinematics: Grade 9 Physics</h2>
          <p>Projectile motion is a form of motion experienced by an object or particle that is projected near Earth's surface and moves along a curved path under the action of gravity only.</p>
          <p>The path is a parabola. Notice that the optimal angle for maximum horizontal distance (range) is 45 degrees, assuming launch and landing heights are the same.</p>
          <p><strong>Equations:</strong></p>
          <ul>
            <li>$x = v_0 \cos(\theta) t$</li>
            <li>$y = v_0 \sin(\theta) t - \frac{1}{2}gt^2$</li>
          </ul>
        </>
      }
    >
      <div className="card flex-col gap-2">
        <div style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
          <canvas ref={canvasRef} width={600} height={400} style={{ width: '100%', height: 'auto', display: 'block', background: '#0f172a' }} />
          
          {/* Live Data HUD */}
          <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ color: 'var(--text-secondary)' }}>Time ($t$)</div>
                <strong style={{ color: '#38bdf8' }}>{time.toFixed(2)} s</strong>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)' }}>Height ($y$)</div>
                <strong style={{ color: '#10b981' }}>{currentY.toFixed(1)} m</strong>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)' }}>Distance ($x$)</div>
                <strong style={{ color: '#f59e0b' }}>{currentX.toFixed(1)} m</strong>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)' }}>Velocity ($v_y$)</div>
                <strong style={{ color: '#ef4444' }}>{currentVy.toFixed(1)} m/s</strong>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '1rem', background: 'var(--surface-hover)', borderRadius: '4px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600 }}>
              Launch Angle ($\theta$): <span style={{ color: 'var(--accent-color)' }}>{angle}°</span>
              <input type="range" min="0" max="90" value={angle} onChange={e => {setAngle(Number(e.target.value)); setIsPlaying(false); setTime(0);}} style={{ width: '100%' }} />
            </label>
            <label style={{ display: 'block', fontWeight: 600 }}>
              Initial Velocity ($v_0$): <span style={{ color: 'var(--accent-color)' }}>{velocity} m/s</span>
              <input type="range" min="5" max="40" value={velocity} onChange={e => {setVelocity(Number(e.target.value)); setIsPlaying(false); setTime(0);}} style={{ width: '100%' }} />
            </label>
          </div>
          
          <div className="flex-col gap-1 flex-center">
            <button className="btn btn-primary" onClick={() => { setTime(0); setIsPlaying(true); }} style={{ width: '100%' }}>Fire Projectile!</button>
            <button className="btn btn-outline" onClick={() => { setIsPlaying(false); setTime(0); }} style={{ width: '100%' }}>Reset</button>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default ProjectileMotionVisualizer;
