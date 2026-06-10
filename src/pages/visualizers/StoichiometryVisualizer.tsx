import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

const StoichiometryVisualizer = () => {
  const [h2, setH2] = useState(1);
  const [o2, setO2] = useState(1);
  const [h2o, setH2o] = useState(1);

  const isBalanced = (h2 * 2 === h2o * 2) && (o2 * 2 === h2o * 1);

  return (
    <VisualizerLayout
      title="Pagbalanse ng Chemical Equations"
      description="Apply the Law of Conservation of Mass to synthesize water, essential for local irrigation."
      adSlotId="2002"
      educationalContent={
        <>
          <h2>Stoichiometry: Grade 10 Chemistry</h2>
          <p>The Law of Conservation of Mass states that matter cannot be created or destroyed. In a chemical reaction, the number of atoms for each element must be equal on both the reactant side and the product side.</p>
          <h3>Synthesizing Water</h3>
          <p>Water (H&sub2;O) is vital for life and agriculture (like watering rice fields). To make water chemically, hydrogen gas (H&sub2;) reacts with oxygen gas (O&sub2;). Try adjusting the coefficients until the equation is balanced!</p>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8">
          
          <div className="text-center bg-base-200 p-6 rounded-xl border border-base-300 mb-8 overflow-x-auto shadow-inner">
            <div className="min-w-max text-3xl font-bold p-4">
              <span className={h2 > 0 ? 'text-primary' : 'text-base-content/30'}>{h2}</span> H<sub className="text-lg">2</sub>
              <span className="mx-4 text-base-content/50">+</span>
              <span className={o2 > 0 ? 'text-secondary' : 'text-base-content/30'}>{o2}</span> O<sub className="text-lg">2</sub>
              <span className="mx-4 text-base-content/50">&rarr;</span>
              <span className={h2o > 0 ? 'text-success' : 'text-base-content/30'}>{h2o}</span> H<sub className="text-lg">2</sub>O
            </div>
            
            {/* Native HTML fallback for equation */}
            <div className="mt-4 opacity-70 font-serif text-2xl tracking-widest text-center">
              {h2}H&sub2; + {o2}O&sub2; &rarr; {h2o}H&sub2;O
            </div>

            <div className={`mt-6 badge badge-lg p-4 font-bold ${isBalanced ? 'badge-success animate-bounce' : 'badge-error'}`}>
              {isBalanced ? 'BALANCED! (Tumpak!)' : 'NOT BALANCED (Hindi Balanse)'}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between p-4 border rounded-lg border-primary/30 bg-primary/5">
                <div className="font-semibold text-lg">H<sub className="text-xs">2</sub> Multiplier:</div>
                <input type="number" min="1" max="10" value={h2} onChange={e => setH2(Number(e.target.value))} className="input input-bordered w-24 text-center font-mono text-xl" />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg border-secondary/30 bg-secondary/5">
                <div className="font-semibold text-lg">O<sub className="text-xs">2</sub> Multiplier:</div>
                <input type="number" min="1" max="10" value={o2} onChange={e => setO2(Number(e.target.value))} className="input input-bordered w-24 text-center font-mono text-xl" />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg border-success/30 bg-success/5">
                <div className="font-semibold text-lg">H<sub className="text-xs">2</sub>O Multiplier:</div>
                <input type="number" min="1" max="10" value={h2o} onChange={e => setH2o(Number(e.target.value))} className="input input-bordered w-24 text-center font-mono text-xl" />
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-xl flex flex-col justify-center shadow-inner relative overflow-hidden">
              <div className="absolute top-4 left-4 text-white/30 text-xs tracking-widest font-mono">ATOM COUNT</div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="border-b border-white/20 pb-2 mb-4 text-sm font-bold tracking-widest text-white/70">REACTANTS</h4>
                  <div className="flex justify-between mb-2">
                    <span className="text-blue-300">Hydrogen (H):</span>
                    <span className="font-mono text-xl font-bold">{h2 * 2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-300">Oxygen (O):</span>
                    <span className="font-mono text-xl font-bold">{o2 * 2}</span>
                  </div>
                </div>

                <div>
                  <h4 className="border-b border-white/20 pb-2 mb-4 text-sm font-bold tracking-widest text-white/70">PRODUCTS</h4>
                  <div className="flex justify-between mb-2">
                    <span className="text-blue-300">Hydrogen (H):</span>
                    <span className={`font-mono text-xl font-bold ${h2 * 2 === h2o * 2 ? 'text-emerald-400' : 'text-rose-400'}`}>{h2o * 2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-300">Oxygen (O):</span>
                    <span className={`font-mono text-xl font-bold ${o2 * 2 === h2o * 1 ? 'text-emerald-400' : 'text-rose-400'}`}>{h2o * 1}</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </VisualizerLayout>
  );
};
export default StoichiometryVisualizer;
