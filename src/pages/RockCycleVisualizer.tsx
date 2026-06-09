import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';

const RockCycleVisualizer = () => {
  const [rock, setRock] = useState('Magma');

  return (
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-outline">&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>The Rock Cycle</h1>
        <p>Discover how geological processes transform rocks over time.</p>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {['Magma', 'Igneous', 'Sedimentary', 'Metamorphic'].map((r) => (
            <button key={r} onClick={() => setRock(r)} className={`btn ${rock === r ? 'btn-primary' : 'btn-outline'}`}>
              {r}
            </button>
          ))}
        </div>

        <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', padding: '2rem', background: 'var(--bg-color)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
          {rock === 'Magma' && "Cooling & Crystallization -> Igneous Rock"}
          {rock === 'Igneous' && "Weathering & Erosion -> Sediments -> Compaction -> Sedimentary Rock"}
          {rock === 'Sedimentary' && "Heat & Pressure -> Metamorphic Rock"}
          {rock === 'Metamorphic' && "Melting -> Magma"}
        </div>
      </div>

      <article className="article-content">
        <h2>Earth Science: Grade 11</h2>
        <p>The rock cycle is a basic concept in geology that describes transitions through geologic time among the three main rock types: sedimentary, metamorphic, and igneous.</p>
        <p>Earth's internal heat, pressure, and surface weathering are the driving forces behind these transformations.</p>
      </article>
      <AdUnit slotId="2009" format="auto" />
    </div>
  );
};
export default RockCycleVisualizer;
