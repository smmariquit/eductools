import { useState } from 'react';
import { motion } from 'framer-motion';
import VisualizerLayout from '../components/VisualizerLayout';

const PhotosynthesisVisualizer = () => {
  const [light, setLight] = useState(50);
  const [co2, setCo2] = useState(50);
  
  const oxygenRate = (light * co2) / 100;

  return (
    <VisualizerLayout
      title="Photosynthesis Simulator"
      description="Explore limiting factors in the process of photosynthesis."
      adSlotId="1008"
      educationalContent={
        <>
          <h2>Photosynthesis: Senior High School Biology</h2>
          <p>Photosynthesis is the process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water.</p>
          <h3>Limiting Factors</h3>
          <p>The rate of photosynthesis is affected by light intensity, carbon dioxide concentration, and temperature. If any of these factors is in short supply, it limits the overall rate of oxygen and glucose production.</p>
        </>
      }
    >
      <div className="legacy-card" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <div style={{ background: 'var(--bg-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', minHeight: '300px', paddingBottom: '2rem', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* Oxygen bubbles based on rate */}
            {Array.from({ length: Math.floor(oxygenRate / 10) }).map((_, i) => (
              <motion.div 
                key={i} 
                animate={{ y: [0, -100], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                style={{ width: '10px', height: '10px', background: '#3b82f6', borderRadius: '50%' }} 
              />
            ))}
          </div>
          <div style={{ fontSize: '4rem' }}>🌱</div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Environmental Factors</h3>
          <label style={{ display: 'block', marginBottom: '1rem' }}>
            Light Intensity: {light}%
            <input type="range" min="0" max="100" value={light} onChange={e => setLight(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <label style={{ display: 'block', marginBottom: '2rem' }}>
            CO2 Concentration: {co2}%
            <input type="range" min="0" max="100" value={co2} onChange={e => setCo2(Number(e.target.value))} style={{ width: '100%' }} />
          </label>
          <div style={{ padding: '1rem', background: 'var(--surface-hover)', borderRadius: '4px' }}>
            <strong>Oxygen Production Rate:</strong><br/>
            <span style={{ fontSize: '1.5rem', color: '#10b981' }}>{oxygenRate.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default PhotosynthesisVisualizer;
