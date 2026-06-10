import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';

const WaterCycleVisualizer = () => {
  const [stage, setStage] = useState('Evaporation');

  return (
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="legacy-btn legacy-btn-outline">&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>Water Cycle</h1>
        <p>Interactive visualization of Evaporation, Condensation, and Precipitation.</p>
      </div>

      <div className="legacy-card" style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '2rem' }}>
        <div style={{ background: '#0ea5e9', height: '300px', position: 'relative', overflow: 'hidden', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
          {/* Ground/Water */}
          <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '100px', background: '#2563eb' }} />
          <div style={{ position: 'absolute', bottom: '100px', width: '40%', height: '50px', background: '#16a34a', borderRadius: '0 50px 0 0' }} />
          
          {/* Sun */}
          <div style={{ position: 'absolute', top: '20px', right: '20px', width: '50px', height: '50px', background: '#facc15', borderRadius: '50%' }} />
          
          {/* Clouds */}
          <div style={{ position: 'absolute', top: '40px', left: '30%', width: '100px', height: '40px', background: 'white', borderRadius: '20px', opacity: stage === 'Evaporation' ? 0.3 : 1 }} />

          {/* Animations based on stage */}
          {stage === 'Evaporation' && (
            <div style={{ position: 'absolute', bottom: '100px', right: '30%', display: 'flex', gap: '20px' }}>
              <motion.div 
                animate={{ y: [0, -50], opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ width: '2px', height: '50px', background: 'rgba(255,255,255,0.5)' }} 
              />
              <motion.div 
                animate={{ y: [0, -50], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{ width: '2px', height: '50px', background: 'rgba(255,255,255,0.5)' }} 
              />
            </div>
          )}
          {stage === 'Precipitation' && (
            <div style={{ position: 'absolute', top: '80px', left: '30%', display: 'flex', gap: '20px' }}>
              <motion.div 
                animate={{ y: [0, 100], opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                style={{ width: '4px', height: '10px', background: '#38bdf8' }} 
              />
              <motion.div 
                animate={{ y: [0, 100], opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                style={{ width: '4px', height: '10px', background: '#38bdf8' }} 
              />
              <motion.div 
                animate={{ y: [0, 100], opacity: [1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
                style={{ width: '4px', height: '10px', background: '#38bdf8' }} 
              />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {['Evaporation', 'Condensation', 'Precipitation'].map(s => (
            <button key={s} onClick={() => setStage(s)} className={`btn ${stage === s ? 'legacy-btn-primary' : 'legacy-btn-outline'}`}>
              {s}
            </button>
          ))}
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Select a stage to observe the water's movement.
          </p>
        </div>
      </div>

      <article className="article-content">
        <h2>The Water Cycle (Siklo ng Tubig): Philippine Context</h2>
        <p>The water cycle describes the continuous movement of water on, above, and below the surface of the Earth. In a tropical archipelago like the Philippines, this cycle is highly visible through our distinct wet and dry seasons, and phenomena like the Habagat (Southwest Monsoon).</p>
        <ul>
          <li><strong>Evaporation (Pagsingaw):</strong> The intense tropical sun heats up water in bodies like Laguna de Bay, the Sulu Sea, or local rivers, turning it into water vapor.</li>
          <li><strong>Condensation (Kondensasyon):</strong> As the warm, moist air rises over our mountainous regions (like the Cordilleras), it cools down and changes back into liquid drops, forming the heavy clouds often monitored by PAGASA.</li>
          <li><strong>Precipitation (Presipitasyon):</strong> When the clouds become too heavy, water falls back to the Philippine islands as rain, which is vital for our agriculture (like rice terraces) but can also lead to typhoons if intense.</li>
        </ul>
      </article>
      <AdUnit slotId="2001" format="auto" />
    </div>
  );
};
export default WaterCycleVisualizer;
