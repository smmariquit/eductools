import { useState } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';

const PlateTectonicsVisualizer = () => {
  const [boundary, setBoundary] = useState('Nagsasalpukan');

  return (
    <VisualizerLayout
      title="Philippine Plate Tectonics"
      description="Visualize different types of tectonic plate boundaries using Philippine geological features."
      adSlotId="1007"
      educationalContent={
        <>
          <h2>Earth's Plates: Grade 10 Earth Science</h2>
          <p>The Earth's lithosphere is broken into massive plates that slowly move. The Philippines is a highly geologically active country situated along the Pacific Ring of Fire.</p>
          <ul>
            <li><strong>Nagsasalpukan (Convergent Boundaries):</strong> Plates collide. The subduction of the Philippine Sea Plate creates trenches and active volcanoes like <strong>Mt. Mayon</strong>.</li>
            <li><strong>Naghihiwalay (Divergent Boundaries):</strong> Plates move apart. Magma rises to create new crust.</li>
            <li><strong>Nagkikiskisan (Transform Boundaries):</strong> Plates slide past each other horizontally. The <strong>Philippine Fault Zone</strong> is a major transform fault system causing significant earthquakes across the archipelago.</li>
          </ul>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center p-6 md:p-10">
          <div className="flex flex-wrap gap-2 md:gap-4 mb-8 justify-center">
            {['Nagsasalpukan', 'Naghihiwalay', 'Nagkikiskisan'].map(b => (
              <button 
                key={b} 
                className={`btn ${boundary === b ? 'btn-primary' : 'btn-outline'}`} 
                onClick={() => setBoundary(b)}
              >
                {b}
              </button>
            ))}
          </div>

          <div className="w-full max-w-2xl h-[250px] bg-slate-900 relative overflow-hidden flex items-center justify-center rounded-xl border border-base-300">
            {/* Plate 1 */}
            <div 
              className="w-[150px] md:w-[200px] h-[100px] bg-amber-700 border-2 border-amber-900 rounded-sm transition-transform duration-1000 ease-in-out"
              style={{
                transform: boundary === 'Nagsasalpukan' ? 'translateX(20px)' : boundary === 'Naghihiwalay' ? 'translateX(-40px)' : 'translateY(-20px)',
              }}
            ></div>
            {/* Plate 2 */}
            <div 
              className="w-[150px] md:w-[200px] h-[100px] bg-amber-700 border-2 border-amber-900 rounded-sm transition-transform duration-1000 ease-in-out"
              style={{
                transform: boundary === 'Nagsasalpukan' ? 'translateX(-20px)' : boundary === 'Naghihiwalay' ? 'translateX(40px)' : 'translateY(20px)',
              }}
            ></div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default PlateTectonicsVisualizer;
