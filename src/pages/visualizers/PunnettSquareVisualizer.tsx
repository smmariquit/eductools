import PunnettSquareMdx from '../../content/deep-dives/punnett-square.mdx';
import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

const PunnettSquareVisualizer = () => {
  const [parent1, setParent1] = useState('Rr');
  const [parent2, setParent2] = useState('Rr');

  const p1_alleles = parent1.split('');
  const p2_alleles = parent2.split('');

  const getPhenotype = (genotype: string) => genotype.includes('R') ? 'Pulang Gumamela (Red)' : 'Puting Gumamela (White)';
  const getColor = (genotype: string) => genotype.includes('R') ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-800 border-2 border-slate-300';

  return (
    <VisualizerLayout
      title="Punnett Square (Pagmamana ng Katangian)"
      description="Simulate Mendelian inheritance using Philippine Gumamela flowers (R = Red dominant, r = White recessive)."
      adSlotId="2005"
      educationalContent={<PunnettSquareMdx />}
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col md:flex-row gap-10">
          
          {/* Punnett Grid */}
          <div className="flex-1 overflow-x-auto pb-4">
            <div className="min-w-[300px] grid grid-cols-[50px_1fr_1fr] grid-rows-[50px_1fr_1fr] gap-2 items-center justify-center font-mono">
              <div></div>
              <div className="text-3xl text-center font-bold text-primary self-end pb-2">{p1_alleles[0]}</div>
              <div className="text-3xl text-center font-bold text-primary self-end pb-2">{p1_alleles[1]}</div>

              <div className="text-3xl text-right font-bold text-secondary pr-4">{p2_alleles[0]}</div>
              <div className={`h-32 rounded-xl flex flex-col items-center justify-center shadow-inner transition-colors duration-500 ${getColor(p1_alleles[0]+p2_alleles[0])}`}>
                <span className="text-4xl font-bold tracking-widest">{p1_alleles[0]}{p2_alleles[0]}</span>
                <span className="text-xs uppercase mt-2 font-sans font-semibold tracking-wider opacity-90">{getPhenotype(p1_alleles[0]+p2_alleles[0])}</span>
              </div>
              <div className={`h-32 rounded-xl flex flex-col items-center justify-center shadow-inner transition-colors duration-500 ${getColor(p1_alleles[1]+p2_alleles[0])}`}>
                <span className="text-4xl font-bold tracking-widest">{p1_alleles[1]}{p2_alleles[0]}</span>
                <span className="text-xs uppercase mt-2 font-sans font-semibold tracking-wider opacity-90">{getPhenotype(p1_alleles[1]+p2_alleles[0])}</span>
              </div>

              <div className="text-3xl text-right font-bold text-secondary pr-4">{p2_alleles[1]}</div>
              <div className={`h-32 rounded-xl flex flex-col items-center justify-center shadow-inner transition-colors duration-500 ${getColor(p1_alleles[0]+p2_alleles[1])}`}>
                <span className="text-4xl font-bold tracking-widest">{p1_alleles[0]}{p2_alleles[1]}</span>
                <span className="text-xs uppercase mt-2 font-sans font-semibold tracking-wider opacity-90">{getPhenotype(p1_alleles[0]+p2_alleles[1])}</span>
              </div>
              <div className={`h-32 rounded-xl flex flex-col items-center justify-center shadow-inner transition-colors duration-500 ${getColor(p1_alleles[1]+p2_alleles[1])}`}>
                <span className="text-4xl font-bold tracking-widest">{p1_alleles[1]}{p2_alleles[1]}</span>
                <span className="text-xs uppercase mt-2 font-sans font-semibold tracking-wider opacity-90">{getPhenotype(p1_alleles[1]+p2_alleles[1])}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full md:w-64 flex flex-col gap-8 bg-base-200 p-6 rounded-xl border border-base-300">
            <div>
              <label className="block mb-3 font-bold text-primary">Parent 1 (Top):</label>
              <div className="flex gap-2">
                <button onClick={() => setParent1('RR')} className={`btn flex-1 ${parent1 === 'RR' ? 'btn-primary' : 'btn-outline'}`}>RR</button>
                <button onClick={() => setParent1('Rr')} className={`btn flex-1 ${parent1 === 'Rr' ? 'btn-primary' : 'btn-outline'}`}>Rr</button>
                <button onClick={() => setParent1('rr')} className={`btn flex-1 ${parent1 === 'rr' ? 'btn-primary' : 'btn-outline'}`}>rr</button>
              </div>
            </div>

            <div>
              <label className="block mb-3 font-bold text-secondary">Parent 2 (Left):</label>
              <div className="flex gap-2">
                <button onClick={() => setParent2('RR')} className={`btn flex-1 ${parent2 === 'RR' ? 'btn-secondary' : 'btn-outline'}`}>RR</button>
                <button onClick={() => setParent2('Rr')} className={`btn flex-1 ${parent2 === 'Rr' ? 'btn-secondary' : 'btn-outline'}`}>Rr</button>
                <button onClick={() => setParent2('rr')} className={`btn flex-1 ${parent2 === 'rr' ? 'btn-secondary' : 'btn-outline'}`}>rr</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default PunnettSquareVisualizer;
