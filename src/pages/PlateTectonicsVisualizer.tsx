import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';

const PlateTectonicsVisualizer = () => {
  const [boundary, setBoundary] = useState('Convergent');

  return (
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-outline" style={{ display: 'inline-block', fontSize: '0.875rem' }}>&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>Plate Tectonics</h1>
        <p>Visualize different types of tectonic plate boundaries.</p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          {['Convergent', 'Divergent', 'Transform'].map(b => (
            <button key={b} className={`btn ${boundary === b ? 'btn-primary' : 'btn-outline'}`} onClick={() => setBoundary(b)}>
              {b}
            </button>
          ))}
        </div>

        <div style={{ width: '100%', maxWidth: '600px', height: '200px', background: '#020617', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Plate 1 */}
          <div style={{
            width: '200px', height: '100px', background: '#b45309', border: '2px solid #78350f',
            transform: boundary === 'Convergent' ? 'translateX(20px)' : boundary === 'Divergent' ? 'translateX(-40px)' : 'translateY(-20px)',
            transition: 'transform 1s ease'
          }}></div>
          {/* Plate 2 */}
          <div style={{
            width: '200px', height: '100px', background: '#b45309', border: '2px solid #78350f',
            transform: boundary === 'Convergent' ? 'translateX(-20px)' : boundary === 'Divergent' ? 'translateX(40px)' : 'translateY(20px)',
            transition: 'transform 1s ease'
          }}></div>
        </div>
      </div>

      <article className="article-content">
        <h2>Earth's Plates: Grade 10 Earth Science</h2>
        <p>The Earth's lithosphere is broken into massive plates that slowly move due to convection currents in the mantle.</p>
        <ul>
          <li><strong>Convergent Boundaries:</strong> Plates collide. This can form mountains or cause subduction (leading to volcanoes and trenches).</li>
          <li><strong>Divergent Boundaries:</strong> Plates move apart. Magma rises to create new crust, often forming mid-ocean ridges.</li>
          <li><strong>Transform Boundaries:</strong> Plates slide past each other horizontally. The friction causes earthquakes.</li>
        </ul>
      </article>
      <AdUnit slotId="1007" format="auto" />
    </div>
  );
};
export default PlateTectonicsVisualizer;
