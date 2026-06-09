import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';

const CellDivisionVisualizer = () => {
  const [phase, setPhase] = useState(0); // 0: Prophase, 1: Metaphase, 2: Anaphase, 3: Telophase

  const phases = ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'];

  return (
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-outline">&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>Mitosis Cell Division</h1>
        <p>Observe the stages of cellular replication.</p>
      </div>

      <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '2rem' }}>
        <div style={{ height: '300px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Cell Membrane */}
          {phase < 3 ? (
             <div style={{ width: '200px', height: '200px', borderRadius: '50%', border: '4px solid #10b981', position: 'relative' }}>
                {/* Chromosomes inside single cell */}
                {phase === 0 && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100px', height: '100px', border: '2px dashed #3b82f6', borderRadius: '50%' }}>
                     <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '2rem', color: '#ef4444' }}>X X</div>
                     <div style={{ position: 'absolute', bottom: '20px', right: '20px', fontSize: '2rem', color: '#ef4444' }}>X X</div>
                  </div>
                )}
                {phase === 1 && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                     <div style={{ fontSize: '1.5rem', color: '#ef4444' }}>X</div>
                     <div style={{ fontSize: '1.5rem', color: '#ef4444' }}>X</div>
                     <div style={{ fontSize: '1.5rem', color: '#ef4444' }}>X</div>
                     <div style={{ fontSize: '1.5rem', color: '#ef4444' }}>X</div>
                  </div>
                )}
                {phase === 2 && (
                  <>
                    <div style={{ position: 'absolute', top: '20%', left: '20%', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                       <div style={{ fontSize: '1.5rem', color: '#ef4444' }}>&lt;</div>
                       <div style={{ fontSize: '1.5rem', color: '#ef4444' }}>&lt;</div>
                    </div>
                    <div style={{ position: 'absolute', top: '20%', right: '20%', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                       <div style={{ fontSize: '1.5rem', color: '#ef4444' }}>&gt;</div>
                       <div style={{ fontSize: '1.5rem', color: '#ef4444' }}>&gt;</div>
                    </div>
                  </>
                )}
             </div>
          ) : (
            // Telophase / Cytokinesis: Two cells splitting
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', border: '4px solid #10b981', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', border: '2px solid #3b82f6', borderRadius: '50%' }}></div>
              </div>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', border: '4px solid #10b981', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', border: '2px solid #3b82f6', borderRadius: '50%' }}></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {phases.map((p, i) => (
            <button key={p} onClick={() => setPhase(i)} className={`btn ${phase === i ? 'btn-primary' : 'btn-outline'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <article className="article-content">
        <h2>Cellular Reproduction: Senior High Biology</h2>
        <p>Mitosis is a part of the cell cycle when replicated chromosomes are separated into two new nuclei.</p>
        <p>In <strong>Prophase</strong>, chromosomes condense. In <strong>Metaphase</strong>, they align at the cell equator. In <strong>Anaphase</strong>, sister chromatids are pulled apart. In <strong>Telophase</strong>, the cell divides into two identical daughter cells.</p>
      </article>
      <AdUnit slotId="2008" format="auto" />
    </div>
  );
};
export default CellDivisionVisualizer;
