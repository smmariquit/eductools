import { useState } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';

const FractionsVisualizer = () => {
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(4);

  return (
    <VisualizerLayout
      title="Fractions Visualizer"
      description="Interactive tool for understanding basic mathematical fractions."
      adSlotId="1010"
      educationalContent={
        <>
          <h2>Understanding Fractions: Primary Mathematics</h2>
          <p>A fraction represents a part of a whole. The top number (numerator) specifies how many parts we have, and the bottom number (denominator) specifies how many equal parts the whole is divided into.</p>
        </>
      }
    >
      <div className="card flex-col flex-center">
        <div style={{ display: 'flex', width: '300px', height: '50px', background: 'var(--bg-color)', border: '2px solid var(--border-color)', marginBottom: '2rem' }}>
          {Array.from({ length: denominator }).map((_, i) => (
            <div key={i} style={{ flex: 1, background: i < numerator ? 'var(--accent-color)' : 'transparent', borderRight: i < denominator - 1 ? '1px solid var(--border-color)' : 'none' }} />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700 }}>
            <div style={{ borderBottom: '4px solid var(--text-primary)', padding: '0 1rem' }}>{numerator}</div>
            <div>{denominator}</div>
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '260px', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 600 }}>Numerator:</span>
              <input type="number" min="0" max={denominator} value={numerator} onChange={e => setNumerator(Number(e.target.value))} style={{ width: '100px', textAlign: 'center' }} />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '260px' }}>
              <span style={{ fontWeight: 600 }}>Denominator:</span>
              <input type="number" min="1" max="20" value={denominator} onChange={e => { setDenominator(Number(e.target.value)); if(numerator > Number(e.target.value)) setNumerator(Number(e.target.value)); }} style={{ width: '100px', textAlign: 'center' }} />
            </label>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default FractionsVisualizer;
