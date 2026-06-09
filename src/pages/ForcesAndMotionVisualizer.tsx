import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';

const ForcesAndMotionVisualizer = () => {
  const [force, setForce] = useState(0);
  const [mass, setMass] = useState(10);
  const [position, setPosition] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let animationId: number;
    if (isPlaying) {
      const acceleration = force / mass;
      animationId = requestAnimationFrame(() => {
        setVelocity(v => v + acceleration * 0.1);
        setPosition(p => p + velocity * 0.1);
      });
    }
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, force, mass, velocity]);

  return (
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="legacy-btn legacy-btn-outline" style={{ display: 'inline-block', fontSize: '0.875rem' }}>&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>Forces and Motion</h1>
        <p>Simulate Newton's Second Law of Motion (F = ma).</p>
      </div>

      <div className="legacy-card">
        <div style={{ height: '200px', background: 'var(--bg-color)', position: 'relative', borderBottom: '4px solid var(--border-color)', marginBottom: '2rem', overflow: 'hidden' }}>
          <div style={{ 
            position: 'absolute', bottom: 0, left: `${position}%`, 
            width: `${mass * 5}px`, height: `${mass * 5}px`, 
            background: 'var(--accent-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 600
          }}>
            {mass}kg
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>Force (N)</span><span>{force}N</span></label>
            <input type="range" min="0" max="100" value={force} onChange={(e) => setForce(Number(e.target.value))} style={{ width: '100%' }} />
            
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', marginTop: '1rem' }}><span>Mass (kg)</span><span>{mass}kg</span></label>
            <input type="range" min="5" max="50" value={mass} onChange={(e) => setMass(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'var(--surface-hover)', borderRadius: '4px' }}>
              <strong>Acceleration:</strong> {(force / mass).toFixed(2)} m/s²<br/>
              <strong>Velocity:</strong> {velocity.toFixed(2)} m/s
            </div>
            <button className="legacy-btn legacy-btn-primary" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? 'Stop' : 'Apply Force'}
            </button>
            <button className="legacy-btn legacy-btn-outline" onClick={() => { setPosition(0); setVelocity(0); setIsPlaying(false); }}>Reset</button>
          </div>
        </div>
      </div>

      <article className="article-content">
        <h2>Newton's Laws of Motion: Grade 8 Physics</h2>
        <p>Newton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
        <h3>F = ma</h3>
        <p>In this simulation, applying a larger force increases acceleration. Conversely, increasing the mass of the block decreases the acceleration for a given force.</p>
      </article>
      <AdUnit slotId="1005" format="auto" />
    </div>
  );
};
export default ForcesAndMotionVisualizer;
