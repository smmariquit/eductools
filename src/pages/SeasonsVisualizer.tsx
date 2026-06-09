import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';

const SeasonsVisualizer = () => {
  const [month, setMonth] = useState(6); // 1 = Jan, 6 = June, 12 = Dec
  
  // Rough angle based on month
  const angle = ((month - 3) / 12) * 360; 

  return (
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-outline">&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>Seasons and Earth's Tilt</h1>
        <p>Understand why the Earth experiences seasons due to its axial tilt.</p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '400px', height: '400px', borderRadius: '50%', border: '1px dashed var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Sun */}
          <div style={{ width: '60px', height: '60px', background: '#facc15', borderRadius: '50%', boxShadow: '0 0 30px #facc15' }} />
          
          {/* Earth Orbit Container */}
          <div style={{ 
            position: 'absolute', width: '100%', height: '100%', 
            transform: `rotate(${angle}deg)`, transition: 'transform 1s ease-in-out' 
          }}>
            <div style={{ 
              position: 'absolute', right: '-15px', top: '185px', 
              width: '30px', height: '30px', background: '#3b82f6', borderRadius: '50%',
              transform: `rotate(-${angle}deg) rotate(23.5deg)`, // Keeps earth upright but tilted 23.5
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid white'
            }}>
              {/* Equator line */}
              <div style={{ width: '30px', height: '1px', background: 'rgba(255,255,255,0.8)' }} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', width: '100%', maxWidth: '400px' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span>Month: {month}</span>
            <span>{month === 6 || month === 7 || month === 8 ? 'Northern Summer' : month === 12 || month === 1 || month === 2 ? 'Northern Winter' : 'Equinox'}</span>
          </label>
          <input type="range" min="1" max="12" value={month} onChange={(e) => setMonth(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>

      <article className="article-content">
        <h2>Earth and Space: Grade 6 Science</h2>
        <p>The Earth's axis of rotation is tilted at an angle of 23.5 degrees relative to its orbital plane around the Sun.</p>
        <p>As the Earth orbits the Sun, different parts of Earth receive the Sun's most direct rays. When the North Pole tilts toward the Sun, it's summer in the Northern Hemisphere. When the South Pole tilts toward the Sun, it's winter in the Northern Hemisphere.</p>
      </article>
      <AdUnit slotId="2003" format="auto" />
    </div>
  );
};
export default SeasonsVisualizer;
