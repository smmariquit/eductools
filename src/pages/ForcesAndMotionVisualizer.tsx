import { useState, useEffect } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';

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
    <VisualizerLayout
      title="Forces and Motion"
      description="Simulate Newton's Second Law of Motion (F = ma)."
      adSlotId="1005"
      educationalContent={
        <>
          <h2>Newton's Laws of Motion: Grade 8 Physics</h2>
          <p>Newton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
          <h3>F = ma</h3>
          <p>In this simulation, applying a larger force increases acceleration. Conversely, increasing the mass of the block decreases the acceleration for a given force.</p>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8">
          <div className="h-[200px] bg-base-300 relative border-b-4 border-base-content/20 mb-8 overflow-hidden rounded-t-xl">
            <div 
              className="absolute bottom-0 bg-primary flex items-center justify-center text-primary-content font-bold shadow-lg transition-colors"
              style={{ 
                left: `${Math.min(position, 100)}%`, 
                width: `${mass * 4}px`, 
                height: `${mass * 4}px`, 
              }}
            >
              {mass}kg
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm text-base-content">
                  <span>Force (N)</span>
                  <span className="text-primary">{force}N</span>
                </label>
                <input 
                  type="range" min="0" max="100" 
                  value={force} 
                  onChange={(e) => setForce(Number(e.target.value))} 
                  className="range range-primary w-full" 
                />
              </div>
              
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm text-base-content">
                  <span>Mass (kg)</span>
                  <span className="text-primary">{mass}kg</span>
                </label>
                <input 
                  type="range" min="5" max="50" 
                  value={mass} 
                  onChange={(e) => setMass(Number(e.target.value))} 
                  className="range range-secondary w-full" 
                />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div className="bg-base-200 p-4 rounded-xl border border-base-300 flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-base-content/70">Acceleration:</span>
                  <span className="font-mono font-bold">{(force / mass).toFixed(2)} m/s²</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-base-content/70">Velocity:</span>
                  <span className="font-mono font-bold">{velocity.toFixed(2)} m/s</span>
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <button 
                  className={`btn flex-1 ${isPlaying ? 'btn-error' : 'btn-primary'}`} 
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? 'Stop' : 'Apply Force'}
                </button>
                <button 
                  className="btn btn-outline" 
                  onClick={() => { setPosition(0); setVelocity(0); setIsPlaying(false); }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default ForcesAndMotionVisualizer;
