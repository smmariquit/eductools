import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';

const ChemicalBondingVisualizer = () => {
  const [bonded, setBonded] = useState(false);

  return (
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-outline" style={{ display: 'inline-block', fontSize: '0.875rem' }}>&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>Chemical Bonding Simulator</h1>
        <p>Visualize ionic bonding and electron transfer between Sodium (Na) and Chlorine (Cl).</p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 1rem' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', position: 'relative' }}>
          
          {/* Sodium Atom */}
          <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ zIndex: 10, width: '40px', height: '40px', background: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
              Na{bonded && <sup style={{marginLeft: '2px'}}>+</sup>}
            </div>
            {/* Shell 1 */}
            <div style={{ position: 'absolute', width: '80px', height: '80px', border: '1px solid var(--border-color)', borderRadius: '50%' }}></div>
            {/* Shell 2 */}
            <div style={{ position: 'absolute', width: '130px', height: '130px', border: '1px solid var(--border-color)', borderRadius: '50%' }}></div>
            {/* Shell 3 (Valence) */}
            <div style={{ position: 'absolute', width: '180px', height: '180px', border: '1px dashed var(--border-color)', borderRadius: '50%', opacity: bonded ? 0.2 : 1, transition: 'opacity 1s' }}></div>
            
            {/* The transferring electron */}
            <div style={{ 
              position: 'absolute', 
              width: '12px', height: '12px', 
              background: '#fbbf24', 
              borderRadius: '50%',
              top: '10px', right: '90px',
              transform: bonded ? 'translate(260px, 90px)' : 'translate(0, 0)',
              transition: 'transform 1.5s ease-in-out',
              boxShadow: '0 0 10px #fbbf24'
            }}></div>
          </div>

          <div style={{ color: 'var(--text-secondary)', fontSize: '2rem' }}>&rarr;</div>

          {/* Chlorine Atom */}
          <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ zIndex: 10, width: '40px', height: '40px', background: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
              Cl{bonded && <sup style={{marginLeft: '2px'}}>-</sup>}
            </div>
            {/* Shell 1 */}
            <div style={{ position: 'absolute', width: '80px', height: '80px', border: '1px solid var(--border-color)', borderRadius: '50%' }}></div>
            {/* Shell 2 */}
            <div style={{ position: 'absolute', width: '130px', height: '130px', border: '1px solid var(--border-color)', borderRadius: '50%' }}></div>
            {/* Shell 3 (Valence) */}
            <div style={{ position: 'absolute', width: '200px', height: '200px', border: '1px solid var(--border-color)', borderRadius: '50%' }}>
              {/* Existing 7 Valence Electrons */}
              <div style={{ position: 'absolute', width: '10px', height: '10px', background: '#3b82f6', borderRadius: '50%', top: '5px', left: '95px' }}></div>
              <div style={{ position: 'absolute', width: '10px', height: '10px', background: '#3b82f6', borderRadius: '50%', top: '30px', right: '30px' }}></div>
              <div style={{ position: 'absolute', width: '10px', height: '10px', background: '#3b82f6', borderRadius: '50%', top: '95px', right: '-5px' }}></div>
              <div style={{ position: 'absolute', width: '10px', height: '10px', background: '#3b82f6', borderRadius: '50%', bottom: '30px', right: '30px' }}></div>
              <div style={{ position: 'absolute', width: '10px', height: '10px', background: '#3b82f6', borderRadius: '50%', bottom: '5px', left: '95px' }}></div>
              <div style={{ position: 'absolute', width: '10px', height: '10px', background: '#3b82f6', borderRadius: '50%', bottom: '30px', left: '30px' }}></div>
              <div style={{ position: 'absolute', width: '10px', height: '10px', background: '#3b82f6', borderRadius: '50%', top: '95px', left: '-5px' }}></div>
            </div>
          </div>

        </div>

        <button className="btn btn-primary" onClick={() => setBonded(!bonded)} style={{ marginTop: '3rem', fontSize: '1.1rem', padding: '1rem 2rem' }}>
          {bonded ? 'Reset Atoms' : 'Transfer Electron (Form NaCl Bond)'}
        </button>
      </div>

      <article className="article-content">
        <h2>Ionic Bonds: Grade 9 Chemistry</h2>
        <p>Chemical bonding involves the transfer or sharing of electrons to achieve a stable electron configuration, known as the octet rule.</p>
        <h3>Sodium Chloride (Table Salt)</h3>
        <p>Sodium (Na) has one valence electron in its outermost shell, while Chlorine (Cl) has seven. By transferring its single valence electron to Chlorine, Sodium empties its outermost shell, revealing a stable full shell underneath. It becomes a positively charged ion (cation).</p>
        <p>Chlorine accepts this electron to complete its outermost shell, becoming a negatively charged ion (anion). The opposite charges strongly attract each other, forming an <strong>ionic bond</strong>.</p>
      </article>
      <AdUnit slotId="1006" format="auto" />
    </div>
  );
};
export default ChemicalBondingVisualizer;
