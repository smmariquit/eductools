import { useState } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';

const FoodWebVisualizer = () => {
  const [active, setActive] = useState('Palay (Rice)');
  const relations: Record<string, string[]> = {
    'Palay (Rice)': ['Tipaklong (Grasshopper)'],
    'Tipaklong (Grasshopper)': ['Palaka (Frog)'],
    'Palaka (Frog)': ['Ahas (Snake)'],
    'Ahas (Snake)': ['Philippine Eagle'],
    'Philippine Eagle': []
  };

  const getRole = (org: string) => {
    if (org === 'Palay (Rice)') return 'Producer (Tagagawa)';
    if (org === 'Tipaklong (Grasshopper)') return 'Primary Consumer (Unang Mamimili)';
    if (org === 'Palaka (Frog)') return 'Secondary Consumer';
    if (org === 'Ahas (Snake)') return 'Tertiary Consumer';
    return 'Apex Predator (Pinakamataas na Maninila)';
  };

  return (
    <VisualizerLayout
      title="Sapot ng Pagkain (Philippine Food Web)"
      description="Explore the flow of energy from local producers to apex predators in Philippine ecosystems."
      adSlotId="2002"
      educationalContent={
        <>
          <h2>Ecosystems and Energy Flow: Grade 7 Science</h2>
          <p>A food chain shows how nutrients and energy are passed from creature to creature. By looking at a local Philippine ecosystem (like a rice paddy near a forest edge), we can see these direct connections.</p>
          <ul>
            <li><strong>Producers (Tagagawa):</strong> Plants like <em>Palay (Rice)</em> that make their own food using sunlight via photosynthesis.</li>
            <li><strong>Primary Consumers:</strong> Herbivores like the <em>Tipaklong (Grasshopper)</em> that eat the crops.</li>
            <li><strong>Secondary/Tertiary Consumers:</strong> Carnivores like the <em>Palaka (Frog)</em> and <em>Ahas (Snake)</em> that control pest populations.</li>
            <li><strong>Apex Predators:</strong> The majestic <em>Philippine Eagle (Haring Ibon)</em> sits at the top of the food chain, hunting snakes and other forest animals. It has no natural predators.</li>
          </ul>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center p-6 md:p-10">
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 mb-10 w-full justify-between max-w-4xl">
            {Object.keys(relations).map((org, index, arr) => (
              <div key={org} className="flex flex-col md:flex-row items-center gap-2">
                <button 
                  onClick={() => setActive(org)}
                  className={`w-32 h-32 rounded-full border-4 flex items-center justify-center text-center p-2 text-sm font-bold shadow-md transition-all ${active === org ? 'border-primary bg-primary/10 scale-110' : 'border-base-300 bg-base-200 hover:border-primary/50'}`}
                >
                  {org}
                </button>
                {index < arr.length - 1 && (
                  <div className="text-2xl text-base-content/30 rotate-90 md:rotate-0 md:mx-2">
                    ➔
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-base-200 p-6 rounded-xl border border-base-300 w-full max-w-2xl text-center">
            <h3 className="text-2xl font-bold text-primary mb-2">{active}</h3>
            <div className="badge badge-secondary badge-lg mb-4">{getRole(active)}</div>
            <p className="text-lg">
              Energy flows from <strong>{active}</strong> {relations[active].length > 0 ? `into the ${relations[active][0]}` : 'into decomposers when it naturally dies'}.
            </p>
          </div>
          
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default FoodWebVisualizer;
