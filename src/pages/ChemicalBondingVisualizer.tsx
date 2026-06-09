import { useState } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';

const ChemicalBondingVisualizer = () => {
  const [bonded, setBonded] = useState(false);

  return (
    <VisualizerLayout
      title="Chemical Bonding Simulator"
      description="Visualize ionic bonding and electron transfer between Sodium (Na) and Chlorine (Cl)."
      adSlotId="1006"
      educationalContent={
        <>
          <h2>Ionic Bonds: Grade 9 Chemistry</h2>
          <p>Chemical bonding involves the transfer or sharing of electrons to achieve a stable electron configuration, known as the octet rule.</p>
          <h3>Sodium Chloride (Table Salt)</h3>
          <p>Sodium (Na) has one valence electron in its outermost shell, while Chlorine (Cl) has seven. By transferring its single valence electron to Chlorine, Sodium empties its outermost shell, revealing a stable full shell underneath. It becomes a positively charged ion (cation).</p>
          <p>Chlorine accepts this electron to complete its outermost shell, becoming a negatively charged ion (anion). The opposite charges strongly attract each other, forming an <strong>ionic bond</strong>.</p>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center py-12 overflow-x-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center relative min-w-max">
            
            {/* Sodium Atom */}
            <div className="relative w-[200px] h-[200px] flex items-center justify-center">
              <div className="z-10 w-10 h-10 bg-error rounded-full flex items-center justify-center font-bold text-white shadow-md">
                Na{bonded && <sup className="ml-0.5">+</sup>}
              </div>
              {/* Shell 1 */}
              <div className="absolute w-[80px] h-[80px] border border-base-content/20 rounded-full"></div>
              {/* Shell 2 */}
              <div className="absolute w-[130px] h-[130px] border border-base-content/20 rounded-full"></div>
              {/* Shell 3 (Valence) */}
              <div 
                className="absolute w-[180px] h-[180px] border border-dashed border-base-content/30 rounded-full transition-opacity duration-1000"
                style={{ opacity: bonded ? 0.1 : 1 }}
              ></div>
              
              {/* The transferring electron */}
              <div 
                className="absolute w-3 h-3 bg-warning rounded-full shadow-[0_0_10px_#fbbf24] transition-transform duration-1000 ease-in-out"
                style={{ 
                  top: '10px', right: '90px',
                  transform: bonded ? 'translate(260px, 90px)' : 'translate(0, 0)',
                }}
              ></div>
            </div>

            <div className="text-base-content/40 text-4xl hidden md:block">&rarr;</div>
            <div className="text-base-content/40 text-4xl block md:hidden">&darr;</div>

            {/* Chlorine Atom */}
            <div className="relative w-[220px] h-[220px] flex items-center justify-center mt-8 md:mt-0">
              <div className="z-10 w-10 h-10 bg-success rounded-full flex items-center justify-center font-bold text-white shadow-md">
                Cl{bonded && <sup className="ml-0.5">-</sup>}
              </div>
              {/* Shell 1 */}
              <div className="absolute w-[80px] h-[80px] border border-base-content/20 rounded-full"></div>
              {/* Shell 2 */}
              <div className="absolute w-[130px] h-[130px] border border-base-content/20 rounded-full"></div>
              {/* Shell 3 (Valence) */}
              <div className="absolute w-[200px] h-[200px] border border-base-content/30 rounded-full">
                {/* Existing 7 Valence Electrons */}
                <div className="absolute w-2.5 h-2.5 bg-info rounded-full top-[5px] left-[95px]"></div>
                <div className="absolute w-2.5 h-2.5 bg-info rounded-full top-[30px] right-[30px]"></div>
                <div className="absolute w-2.5 h-2.5 bg-info rounded-full top-[95px] right-[-5px]"></div>
                <div className="absolute w-2.5 h-2.5 bg-info rounded-full bottom-[30px] right-[30px]"></div>
                <div className="absolute w-2.5 h-2.5 bg-info rounded-full bottom-[5px] left-[95px]"></div>
                <div className="absolute w-2.5 h-2.5 bg-info rounded-full bottom-[30px] left-[30px]"></div>
                <div className="absolute w-2.5 h-2.5 bg-info rounded-full top-[95px] left-[-5px]"></div>
              </div>
            </div>

          </div>

          <button 
            className="btn btn-primary btn-lg mt-12" 
            onClick={() => setBonded(!bonded)}
          >
            {bonded ? 'Reset Atoms' : 'Transfer Electron (Form NaCl Bond)'}
          </button>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default ChemicalBondingVisualizer;
