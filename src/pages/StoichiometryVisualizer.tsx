import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';

const StoichiometryVisualizer = () => {
  const [h2, setH2] = useState(1);
  const [o2, setO2] = useState(1);
  const [h2o, setH2o] = useState(1);

  const isBalanced = (h2 * 2 === h2o * 2) && (o2 * 2 === h2o * 1);

  return (
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="legacy-btn legacy-btn-outline">&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>Balancing Chemical Equations</h1>
        <p>Apply the Law of Conservation of Mass to synthesize water.</p>
      </div>

      <div className="legacy-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="number" min="1" max="5" value={h2} onChange={e => setH2(Number(e.target.value))} style={{ width: '60px', marginRight: '10px' }} />
            H<sub>2</sub>
          </div>
          <div>+</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="number" min="1" max="5" value={o2} onChange={e => setO2(Number(e.target.value))} style={{ width: '60px', marginRight: '10px' }} />
            O<sub>2</sub>
          </div>
          <div>&rarr;</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="number" min="1" max="5" value={h2o} onChange={e => setH2o(Number(e.target.value))} style={{ width: '60px', marginRight: '10px' }} />
            H<sub>2</sub>O
          </div>
        </div>

        <div style={{ padding: '1.5rem', background: isBalanced ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', border: `2px solid ${isBalanced ? '#10b981' : '#ef4444'}`, borderRadius: '4px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem', color: isBalanced ? '#10b981' : '#ef4444' }}>
            {isBalanced ? "Equation is Balanced!" : "Equation is NOT Balanced"}
          </h3>
          <p>Reactant Atoms: H = {h2 * 2}, O = {o2 * 2}</p>
          <p>Product Atoms: H = {h2o * 2}, O = {h2o * 1}</p>
        </div>
      </div>

      <article className="article-content">
        <h2>Stoichiometry: Grade 12 Chemistry</h2>
        <p>The Law of Conservation of Mass states that matter cannot be created or destroyed. In a chemical reaction, the number of atoms of each element in the reactants must equal the number of atoms of each element in the products.</p>
        <p>To balance the synthesis of water, you must ensure there are equal numbers of Hydrogen (H) and Oxygen (O) atoms on both sides of the arrow.</p>
      </article>
      <AdUnit slotId="2010" format="auto" />
    </div>
  );
};
export default StoichiometryVisualizer;
