import PlateTectonicsMdx from '../../content/blog/plate-tectonics.mdx';
import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

const PlateTectonicsVisualizer = () => {
  const [boundary, setBoundary] = useState('Nagsasalpukan');

  return (
    <VisualizerLayout
      title="Philippine Plate Tectonics"
      description="Visualize different types of tectonic plate boundaries using Philippine geological features."
      adSlotId="1007"
      educationalContent={<PlateTectonicsMdx />}
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
