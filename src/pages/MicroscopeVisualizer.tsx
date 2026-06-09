import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdUnit from '../components/AdUnit';

const MicroscopeVisualizer = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const zoomFactor = zoomLevel === 1 ? 1 : zoomLevel === 2 ? 3 : 8;

  return (
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-outline" style={{ display: 'inline-block', fontSize: '0.875rem' }}>&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>Virtual Microscope</h1>
        <p>Examine cellular structures of a plant cell at varying magnifications.</p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Microscope Lens Viewport */}
        <div style={{ 
          width: '350px', height: '350px', 
          borderRadius: '50%', 
          border: '15px solid #1e293b',
          background: 'var(--bg-color)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.8)'
        }}>
          <motion.div 
            initial={false}
            animate={{ 
              scale: zoomFactor,
              x: zoomFactor === 1 ? 0 : zoomFactor === 3 ? -20 : -40, // slight panning
              y: zoomFactor === 1 ? 0 : zoomFactor === 3 ? -10 : -30
            }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              transformOrigin: '40% 40%'
            }}
          >
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              {/* Plant Cell Wall & Membrane */}
              <polygon points="10,20 80,10 90,70 20,90" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <polygon points="12,22 78,13 87,68 22,87" fill="#047857" opacity="0.6" />
              
              {/* Large Central Vacuole */}
              <path d="M 30 30 Q 60 20 70 50 Q 50 80 25 70 Q 20 50 30 30 Z" fill="#60a5fa" opacity="0.5" />
              
              {/* Nucleus */}
              <circle cx="75" cy="30" r="12" fill="#3b82f6" />
              <circle cx="72" cy="28" r="4" fill="#1e3a8a" /> {/* Nucleolus */}
              
              {/* Chloroplasts (Only visible properly at higher zoom) */}
              <g opacity={zoomLevel >= 2 ? 1 : 0.4} style={{ transition: 'opacity 0.5s' }}>
                <ellipse cx="20" cy="40" rx="6" ry="3" fill="#22c55e" transform="rotate(30 20 40)" />
                <ellipse cx="60" cy="80" rx="7" ry="4" fill="#22c55e" transform="rotate(-20 60 80)" />
                <ellipse cx="85" cy="55" rx="5" ry="3" fill="#22c55e" transform="rotate(60 85 55)" />
                
                {/* Thylakoids inside chloroplasts (visible at highest zoom) */}
                {zoomLevel === 3 && (
                  <>
                    <line x1="17" y1="40" x2="23" y2="40" stroke="#14532d" strokeWidth="0.5" />
                    <line x1="57" y1="80" x2="63" y2="80" stroke="#14532d" strokeWidth="0.5" />
                  </>
                )}
              </g>

              {/* Mitochondria */}
              <g opacity={zoomLevel >= 2 ? 1 : 0.3}>
                <ellipse cx="40" cy="80" rx="5" ry="2" fill="#f59e0b" transform="rotate(10 40 80)" />
                <ellipse cx="50" cy="15" rx="4" ry="2" fill="#f59e0b" transform="rotate(-40 50 15)" />
              </g>
            </svg>
          </motion.div>

          {/* Crosshairs */}
          <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
          <div style={{ position: 'absolute', top: 0, left: '50%', width: '1px', height: '100%', background: 'rgba(255,255,255,0.2)' }}></div>
        </div>

        <div style={{ marginTop: '2rem', width: '100%', maxWidth: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className={`btn ${zoomLevel === 1 ? 'btn-primary' : 'btn-outline'}`} onClick={() => setZoomLevel(1)}>Low Power (40x)</button>
            <button className={`btn ${zoomLevel === 2 ? 'btn-primary' : 'btn-outline'}`} onClick={() => setZoomLevel(2)}>High Power (100x)</button>
            <button className={`btn ${zoomLevel === 3 ? 'btn-primary' : 'btn-outline'}`} onClick={() => setZoomLevel(3)}>Oil Immersion (400x)</button>
          </div>
        </div>
      </div>

      <article className="article-content">
        <h2>Microscopy and Cells: Grade 7 Science</h2>
        <p>In Key Stage 3, students are introduced to the microscopic world. The microscope is the primary tool used by biologists to study cells, the basic unit of life.</p>
        <h3>Plant Cell Organelles</h3>
        <p>In this simulation, you are viewing a typical plant cell. By switching objectives, you can observe different levels of detail:</p>
        <ul>
          <li><strong>Cell Wall:</strong> The rigid outer boundary that gives the plant cell its geometric shape.</li>
          <li><strong>Nucleus (Blue):</strong> The control center of the cell containing genetic material. The darker spot is the nucleolus.</li>
          <li><strong>Large Central Vacuole (Light Blue):</strong> Stores water and maintains turgor pressure.</li>
          <li><strong>Chloroplasts (Green):</strong> The site of photosynthesis. At 400x magnification, you can begin to see the internal grana stacks (thylakoids).</li>
        </ul>
      </article>
      <AdUnit slotId="1004" format="auto" />
    </div>
  );
};
export default MicroscopeVisualizer;
