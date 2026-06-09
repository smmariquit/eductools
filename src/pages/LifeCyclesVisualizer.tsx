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
  return (
    <div className="w-full">
      <div className="mb-6">
        <Link to="/" className="btn btn-outline btn-sm">&larr; Back to Modules</Link>
      </div>
      <div className="pb-4 border-b border-base-300 mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Life Cycles Visualizer</h1>
        <p className="text-base-content/80">Explore the biological life cycle of a frog.</p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200 text-center py-10">
        <div className="card-body items-center">
          <div className="text-8xl my-6">{stages[stage].icon}</div>
          <h2 className="text-4xl font-extrabold text-primary mb-4">{stages[stage].name}</h2>
          <p className="text-xl text-base-content/80 mb-8 max-w-lg">{stages[stage].desc}</p>

          <div className="flex flex-wrap justify-center gap-4">
            {stages.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setStage(i)} 
                className={`btn ${stage === i ? 'btn-primary' : 'btn-outline'}`}
              >
                Stage {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <article className="prose lg:prose-xl mt-12 pt-8 border-t border-base-300 max-w-none text-base-content">
        <h2 className="text-primary">Understanding Life Cycles in Grade 4 Science</h2>
        <p>The study of plant and animal life cycles introduces students to biological growth, development, and reproduction. In the MATATAG curriculum, recognizing these stages builds an appreciation for nature.</p>
        <h3>Metamorphosis</h3>
        <p>Frogs undergo a process called <strong>metamorphosis</strong>, meaning a dramatic change in body structure during their development. They transition from an aquatic, gill-breathing tadpole into a terrestrial, lung-breathing adult frog.</p>
      </article>
      <div className="mt-8">
        <AdUnit slotId="1002" format="auto" />
      </div>
    </div>
  );
};
export default LifeCyclesVisualizer;
