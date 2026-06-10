import { useState } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';

const CellDivisionVisualizer = () => {
  const [phase, setPhase] = useState(0); // 0: Prophase, 1: Metaphase, 2: Anaphase, 3: Telophase

  const phases = ['Prophase', 'Metaphase', 'Anaphase', 'Telophase / Cytokinesis'];

  return (
    <VisualizerLayout
      title="Pagdami ng Selula (Cell Division)"
      description="Observe the stages of cellular replication (Mitosis) used for growth and repair."
      adSlotId="2008"
      educationalContent={
        <>
          <h2>Cellular Reproduction: Grade 8 Biology</h2>
          <p>Mitosis is a part of the cell cycle where replicated chromosomes are separated into two new, identical nuclei. This process is essential for growth and repair.</p>
          <h3>Healing a "Sugat" (Wound)</h3>
          <p>Imagine you get a scrape on your knee while playing basketball in the barangay court. How does your skin heal? Your skin cells undergo <strong>Mitosis</strong> to multiply and replace the damaged tissue.</p>
          <ul>
            <li><strong>Prophase:</strong> Chromosomes condense and become visible.</li>
            <li><strong>Metaphase:</strong> They align at the cell's center (equator).</li>
            <li><strong>Anaphase:</strong> They are pulled apart to opposite sides.</li>
            <li><strong>Telophase:</strong> The cell divides into two identical daughter cells, ready to heal your skin!</li>
          </ul>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-10 grid md:grid-cols-[1fr_250px] gap-8">
          
          <div className="h-[300px] bg-slate-900 rounded-xl border border-base-300 relative flex items-center justify-center overflow-hidden">
            {/* Cell Membrane */}
            {phase < 3 ? (
               <div className="w-[200px] h-[200px] rounded-full border-4 border-emerald-500 relative bg-emerald-900/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  {/* Chromosomes inside single cell */}
                  {phase === 0 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] border-2 border-dashed border-blue-400 rounded-full animate-pulse">
                       <div className="absolute top-5 left-5 text-2xl text-red-400 font-bold">X X</div>
                       <div className="absolute bottom-5 right-5 text-2xl text-red-400 font-bold">X X</div>
                    </div>
                  )}
                  {phase === 1 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 items-center">
                       <div className="text-xl text-red-400 font-bold">X</div>
                       <div className="text-xl text-red-400 font-bold">X</div>
                       <div className="text-xl text-red-400 font-bold">X</div>
                       <div className="text-xl text-red-400 font-bold">X</div>
                    </div>
                  )}
                  {phase === 2 && (
                    <>
                      <div className="absolute top-1/4 left-1/4 flex flex-col gap-2 items-center transition-all duration-1000">
                         <div className="text-xl text-red-400 font-bold">&lt;</div>
                         <div className="text-xl text-red-400 font-bold">&lt;</div>
                         <div className="text-xl text-red-400 font-bold">&lt;</div>
                      </div>
                      <div className="absolute top-1/4 right-1/4 flex flex-col gap-2 items-center transition-all duration-1000">
                         <div className="text-xl text-red-400 font-bold">&gt;</div>
                         <div className="text-xl text-red-400 font-bold">&gt;</div>
                         <div className="text-xl text-red-400 font-bold">&gt;</div>
                      </div>
                    </>
                  )}
               </div>
            ) : (
              // Telophase / Cytokinesis: Two cells splitting
              <div className="flex gap-4">
                <div className="w-[140px] h-[140px] rounded-full border-4 border-emerald-500 relative bg-emerald-900/20 animate-[pulse_2s_ease-in-out_infinite]">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] border-2 border-blue-400 rounded-full bg-blue-500/20"></div>
                </div>
                <div className="w-[140px] h-[140px] rounded-full border-4 border-emerald-500 relative bg-emerald-900/20 animate-[pulse_2s_ease-in-out_infinite]">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] border-2 border-blue-400 rounded-full bg-blue-500/20"></div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 justify-center">
            <h3 className="font-bold text-lg mb-2">Select Stage:</h3>
            {phases.map((p, i) => (
              <button 
                key={p} 
                onClick={() => setPhase(i)} 
                className={`btn ${phase === i ? 'btn-primary' : 'btn-outline'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default CellDivisionVisualizer;
