import { useState } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';

const ChemicalBondingVisualizer = () => {
  const [bonded, setBonded] = useState(false);

  return (
    <VisualizerLayout
      title="Pagbuo ng Asin (Chemical Bonding)"
      description="Visualize ionic bonding and electron transfer between Sodium (Na) and Chlorine (Cl) to make Table Salt."
      adSlotId="1006"
      educationalContent={
        <>
          <h2>Ionic Bonds: Grade 9 Chemistry</h2>
          <p>Chemical bonding involves the transfer or sharing of electrons to achieve a stable electron configuration, known as the octet rule.</p>
          <h3>Sodium Chloride (Asin)</h3>
          <p>Table salt (Asin) is a staple in Philippine cooking, essential for making <em>Tuyo</em>, <em>Daing</em>, and flavoring <em>Sinigang</em>. But how is it formed chemically?</p>
          <p>Sodium (Na) has one valence electron, while Chlorine (Cl) has seven. By transferring its single valence electron to Chlorine, Sodium empties its outermost shell. Chlorine accepts this electron to complete its shell. The opposite charges strongly attract each other, forming an <strong>ionic bond</strong>.</p>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center py-12 overflow-x-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center relative min-w-[500px]">
            
            {/* Sodium Atom */}
            <div className="relative w-[200px] h-[200px] flex items-center justify-center">
              <div className="z-10 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg border-2 border-red-700">
                Na{bonded && <sup className="ml-0.5 text-xs">+</sup>}
              </div>
              {/* Shell 1 */}
              <div className="absolute w-[80px] h-[80px] border border-base-content/20 rounded-full"></div>
              {/* Shell 2 */}
              <div className="absolute w-[130px] h-[130px] border border-base-content/20 rounded-full"></div>
              {/* Shell 3 (Valence) */}
              <div 
                className="absolute w-[180px] h-[180px] border border-dashed border-base-content/40 rounded-full transition-opacity duration-1000"
                style={{ opacity: bonded ? 0.1 : 1 }}
              ></div>
              
              {/* The transferring electron */}
              <div 
                className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_#facc15] transition-transform duration-1000 ease-in-out z-20"
                style={{ 
                  top: '6px', right: '86px',
                  transform: bonded ? 'translate(260px, 90px)' : 'translate(0, 0)',
                }}
              ></div>
            </div>

            <div className="text-base-content/40 text-4xl hidden md:block font-bold">&rarr;</div>
            <div className="text-base-content/40 text-4xl block md:hidden font-bold">&darr;</div>

            {/* Chlorine Atom */}
            <div className="relative w-[220px] h-[220px] flex items-center justify-center mt-8 md:mt-0">
              <div className="z-10 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg border-2 border-emerald-700">
                Cl{bonded && <sup className="ml-0.5 text-xs">-</sup>}
              </div>
              {/* Shell 1 */}
              <div className="absolute w-[80px] h-[80px] border border-base-content/20 rounded-full"></div>
              {/* Shell 2 */}
              <div className="absolute w-[130px] h-[130px] border border-base-content/20 rounded-full"></div>
              {/* Shell 3 (Valence) */}
              <div className="absolute w-[200px] h-[200px] border border-base-content/40 rounded-full bg-emerald-500/5">
                {/* Existing 7 Valence Electrons */}
                <div className="absolute w-3 h-3 bg-blue-400 rounded-full top-[4px] left-[95px]"></div>
                <div className="absolute w-3 h-3 bg-blue-400 rounded-full top-[30px] right-[30px]"></div>
                <div className="absolute w-3 h-3 bg-blue-400 rounded-full top-[95px] right-[-6px]"></div>
                <div className="absolute w-3 h-3 bg-blue-400 rounded-full bottom-[30px] right-[30px]"></div>
                <div className="absolute w-3 h-3 bg-blue-400 rounded-full bottom-[4px] left-[95px]"></div>
                <div className="absolute w-3 h-3 bg-blue-400 rounded-full bottom-[30px] left-[30px]"></div>
                <div className="absolute w-3 h-3 bg-blue-400 rounded-full top-[95px] left-[-6px]"></div>
              </div>
            </div>

          </div>

          <button 
            className={`btn btn-lg mt-12 w-full max-w-sm ${bonded ? 'btn-outline' : 'btn-primary'}`} 
            onClick={() => setBonded(!bonded)}
          >
            {bonded ? 'Reset Atoms' : 'Transfer Electron (Form NaCl)'}
          </button>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default ChemicalBondingVisualizer;
