import { useState } from 'react';
import { motion } from 'framer-motion';
import VisualizerLayout from '../components/VisualizerLayout';

const TyphoonTrackerVisualizer = () => {
  const [windSpeed, setWindSpeed] = useState(120); // km/h
  const [simulating, setSimulating] = useState(false);

  const getTyphoonData = (speed: number) => {
    if (speed < 62) return { category: 'Tropical Depression (TD)', surge: '< 0.5m', color: '#3b82f6', size: 60 };
    if (speed <= 88) return { category: 'Tropical Storm (TS)', surge: '0.5m - 1.0m', color: '#10b981', size: 90 };
    if (speed <= 117) return { category: 'Severe Tropical Storm (STS)', surge: '1.0m - 2.0m', color: '#f59e0b', size: 120 };
    if (speed <= 184) return { category: 'Typhoon (TY)', surge: '2.0m - 3.0m', color: '#ef4444', size: 160 };
    return { category: 'Super Typhoon (STY)', surge: '> 3.0m', color: '#8b5cf6', size: 220 };
  };

  const data = getTyphoonData(windSpeed);
  const pressure = Math.max(890, Math.floor(1010 - (windSpeed * 0.4)));

  return (
    <VisualizerLayout
      title="Typhoon Tracker (DRRR)"
      description="Simulate PAGASA Tropical Cyclone categories and potential landfall impacts."
      adSlotId="1009"
      educationalContent={
        <>
          <h2>Disaster Readiness and Risk Reduction (DRRR)</h2>
          <p>The Philippines uses the PAGASA Tropical Cyclone Wind Signal (TCWS) system to categorize storms based on maximum sustained winds.</p>
          <ul>
            <li><strong>Tropical Depression (TD):</strong> Up to 61 km/h</li>
            <li><strong>Tropical Storm (TS):</strong> 62 to 88 km/h</li>
            <li><strong>Severe Tropical Storm (STS):</strong> 89 to 117 km/h</li>
            <li><strong>Typhoon (TY):</strong> 118 to 184 km/h</li>
            <li><strong>Super Typhoon (STY):</strong> 185 km/h or higher</li>
          </ul>
          <p>Lower central pressure (hPa) generally correlates with higher wind speeds. Storm surge potential increases exponentially with wind energy.</p>
        </>
      }
    >
      <div className="card flex-col gap-2">
        
        {/* Controls */}
        <div style={{ background: 'var(--surface-hover)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 600, gap: '0.5rem' }}>
            Maximum Sustained Wind Speed: <span style={{ color: data.color, fontSize: '1.25rem' }}>{windSpeed} km/h</span>
            <input 
              type="range" 
              min="40" 
              max="300" 
              step="5"
              value={windSpeed} 
              onChange={e => setWindSpeed(Number(e.target.value))} 
              style={{ width: '100%', accentColor: data.color }} 
              disabled={simulating}
            />
          </label>
        </div>

        {/* Map Viewport */}
        <div style={{ height: '400px', background: '#0f172a', position: 'relative', overflow: 'hidden', border: '2px solid var(--border-color)', borderRadius: '8px' }}>
          
          {/* Distance Scale / Grid Lines */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '20%', borderLeft: '1px dashed rgba(255,255,255,0.2)' }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '40%', borderLeft: '1px dashed rgba(255,255,255,0.2)' }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '60%', borderLeft: '1px dashed rgba(255,255,255,0.2)' }} />
          <div style={{ position: 'absolute', bottom: '10px', left: '20%', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', transform: 'translateX(-50%)' }}>1000 km</div>
          <div style={{ position: 'absolute', bottom: '10px', left: '40%', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', transform: 'translateX(-50%)' }}>500 km</div>
          <div style={{ position: 'absolute', bottom: '10px', left: '60%', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', transform: 'translateX(-50%)' }}>250 km</div>

          {/* HUD Overlay */}
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.8)', padding: '1rem', borderRadius: '8px', border: `1px solid ${data.color}`, color: '#fff', zIndex: 10 }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: data.color }}>{data.category}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Wind</span><br/>
                <strong>{windSpeed} km/h</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Pressure</span><br/>
                <strong>{pressure} hPa</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Est. Surge</span><br/>
                <strong>{data.surge}</strong>
              </div>
            </div>
          </div>

          {/* Mock Philippine Map (Eastern Seaboard) */}
          <svg style={{ position: 'absolute', right: '5%', top: '5%', width: '30%', height: '90%', opacity: 0.9, zIndex: 5 }} viewBox="0 0 100 200" preserveAspectRatio="none">
            <path d="M50 10 Q70 30 60 70 T40 130 Q30 160 50 190 L80 190 Q90 150 85 100 T95 20 Z" fill="#166534" stroke="#4ade80" strokeWidth="1"/>
            <text x="65" y="100" fill="#4ade80" fontSize="8" fontWeight="bold">PHILIPPINES</text>
          </svg>
          
          {/* Typhoon Simulation Node */}
          <motion.div 
            animate={{ 
              rotate: 360,
              left: simulating ? '70%' : '10%'
            }}
            transition={{ 
              rotate: { duration: Math.max(0.2, 2 - (windSpeed / 150)), repeat: Infinity, ease: "linear" },
              left: { duration: 4, ease: "linear" }
            }}
            style={{
              position: 'absolute', top: '40%',
              width: `${data.size}px`, height: `${data.size}px`,
              background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, ${data.color}40 40%, transparent 70%)`,
              borderRadius: '50%',
              originX: 0.5, originY: 0.5,
              transform: 'translate(-50%, -50%)',
              zIndex: 8
            }}
          >
            {/* Eye of the storm */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '15%', height: '15%', background: '#0f172a', borderRadius: '50%', transform: 'translate(-50%, -50%)', border: '1px solid rgba(255,255,255,0.5)' }} />
          </motion.div>
        </div>

        <div className="flex-center">
          <button className="btn btn-primary" onClick={() => { setSimulating(false); setTimeout(() => setSimulating(true), 100); }} style={{ width: '200px' }}>
            Simulate Landfall
          </button>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default TyphoonTrackerVisualizer;
