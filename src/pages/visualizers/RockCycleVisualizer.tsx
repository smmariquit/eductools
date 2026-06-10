import RockCycleMdx from '../../content/deep-dives/rock-cycle.mdx';
import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { motion } from 'framer-motion';

const RockCycleVisualizer = () => {
  const [rock, setRock] = useState('Magma');

  const rocks = [
    { id: 'Magma', name: 'Magma / Lava', desc: 'Molten rock beneath or on the surface (e.g., inside Mt. Pinatubo).', color: 'bg-orange-600' },
    { id: 'Igneous', name: 'Batong Apoy (Igneous)', desc: 'Cooled magma/lava (e.g., Pumice from Pinatubo, Basalt).', color: 'bg-stone-800' },
    { id: 'Sedimentary', name: 'Batong Latak (Sedimentary)', desc: 'Compacted sediments (e.g., Limestone in Palawan Underground River).', color: 'bg-amber-600' },
    { id: 'Metamorphic', name: 'Batong Nagbago (Metamorphic)', desc: 'Rocks changed by heat/pressure (e.g., Romblon Marble).', color: 'bg-slate-300 text-slate-800' }
  ];

  return (
    <VisualizerLayout
      title="Siklo ng mga Bato (Rock Cycle)"
      description="Discover how geological processes transform rocks over time in the Philippine archipelago."
      adSlotId="2009"
      educationalContent={<RockCycleMdx />}
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-10 text-center">
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10">
            {rocks.map((r) => (
              <button 
                key={r.id} 
                onClick={() => setRock(r.id)} 
                className={`btn ${rock === r.id ? 'btn-primary' : 'btn-outline'}`}
              >
                {r.name}
              </button>
            ))}
          </div>

          <div className="relative h-[250px] flex items-center justify-center bg-base-200 rounded-xl border border-base-300 overflow-hidden">
            <motion.div 
              key={rock}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`w-40 h-40 rounded-3xl shadow-2xl flex items-center justify-center p-4 text-center font-bold ${rocks.find(r => r.id === rock)?.color}`}
            >
              {rocks.find(r => r.id === rock)?.name}
            </motion.div>

            <div className="absolute bottom-4 left-0 right-0 text-base-content/70 font-semibold px-4">
              {rock === 'Magma' && "Cooling & Crystallization ➔ Igneous"}
              {rock === 'Igneous' && "Weathering & Erosion ➔ Sediments ➔ Compaction ➔ Sedimentary"}
              {rock === 'Sedimentary' && "Extreme Heat & Pressure ➔ Metamorphic"}
              {rock === 'Metamorphic' && "Melting deep in the mantle ➔ Magma"}
            </div>
          </div>
          
          <p className="mt-8 text-lg">{rocks.find(r => r.id === rock)?.desc}</p>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default RockCycleVisualizer;
