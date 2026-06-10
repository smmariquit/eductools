import LifeCyclesMdx from '../../content/blog/life-cycles.mdx';
import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

const LifeCyclesVisualizer = () => {
  const [stage, setStage] = useState(0);
  const stages = [
    { name: 'Itlog (Egg)', desc: 'Sardinella tawilis spawns in the open waters of Taal Lake.', icon: '🥚' },
    { name: 'Semilya (Larva)', desc: 'Hatchlings emerge and feed on microscopic plankton in the lake.', icon: '🫧' },
    { name: 'Fingerling (Juvenile)', desc: 'Young tawilis begin forming schools to protect against predators.', icon: '🐟' },
    { name: 'Tawilis (Adult)', desc: 'The only freshwater sardine in the world, fully grown and ready to spawn.', icon: '🐠' }
  ];

  return (
    <VisualizerLayout
      title="Sardinella tawilis Life Cycle"
      description="Explore the biological life cycle of the endemic Sardinella tawilis of Taal Lake."
      adSlotId="1002"
      educationalContent={<LifeCyclesMdx />}
    >
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
    </VisualizerLayout>
  );
};
export default LifeCyclesVisualizer;
