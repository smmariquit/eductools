import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';

const LifeCyclesVisualizer = () => {
  const [stage, setStage] = useState(0);
  const stages = [
    { name: 'Egg', desc: 'Frogs lay hundreds of eggs in water, known as frogspawn.', icon: '🥚' },
    { name: 'Tadpole', desc: 'Tadpoles hatch with gills and a tail to swim in water.', icon: '🐟' },
    { name: 'Froglet', desc: 'Legs begin to grow and lungs develop as it prepares for land.', icon: '🦎' },
    { name: 'Adult Frog', desc: 'The tail disappears completely, and the frog lives on land and water.', icon: '🐸' }
  ];

  return (
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-outline" style={{ display: 'inline-block', fontSize: '0.875rem' }}>&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>Life Cycles Visualizer</h1>
        <p>Explore the biological life cycle of a frog.</p>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '6rem', margin: '2rem 0' }}>{stages[stage].icon}</div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>{stages[stage].name}</h2>
        <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>{stages[stage].desc}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          {stages.map((_, i) => (
            <button key={i} onClick={() => setStage(i)} className={`btn ${stage === i ? 'btn-primary' : 'btn-outline'}`}>
              Stage {i + 1}
            </button>
          ))}
        </div>
      </div>

      <article className="article-content">
        <h2>Understanding Life Cycles in Grade 4 Science</h2>
        <p>The study of plant and animal life cycles introduces students to biological growth, development, and reproduction. In the MATATAG curriculum, recognizing these stages builds an appreciation for nature.</p>
        <h3>Metamorphosis</h3>
        <p>Frogs undergo a process called <strong>metamorphosis</strong>, meaning a dramatic change in body structure during their development. They transition from an aquatic, gill-breathing tadpole into a terrestrial, lung-breathing adult frog.</p>
      </article>
      <AdUnit slotId="1002" format="auto" />
    </div>
  );
};
export default LifeCyclesVisualizer;
