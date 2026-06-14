import { useState } from 'react';
import { motion } from 'framer-motion';
import VisualizerLayout from '../../components/VisualizerLayout';

const WaterCycleVisualizer = () => {
  const [stage, setStage] = useState('Pagsingaw (Evaporation)');

  const stages = ['Pagsingaw (Evaporation)', 'Pamumuo (Condensation)', 'Pag-ulan (Precipitation)'];

  return (
    <VisualizerLayout
      title="Siklo ng Tubig (Water Cycle)"
      description="Interactive visualization of how water moves through the Philippine environment."
      adSlotId="2001"
      guideLink="/blog/water-cycle"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 grid md:grid-cols-2 gap-8">
          
          <div className="bg-sky-400 h-[300px] relative overflow-hidden border border-base-300 rounded-xl">
            {/* Ground/Water */}
            <div className="absolute bottom-0 w-full h-[100px] bg-blue-600" />
            <div className="absolute bottom-[100px] w-2/5 h-[50px] bg-green-600 rounded-tr-[50px]" />
            
            {/* Sun */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-400 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.8)]" />
            
            {/* Clouds */}
            <div className={`absolute top-10 left-1/3 w-24 h-10 bg-white rounded-full transition-opacity duration-1000 ${stage === 'Pagsingaw (Evaporation)' ? 'opacity-40' : 'opacity-100 shadow-lg'}`} />
            <div className={`absolute top-14 left-[40%] w-20 h-8 bg-white rounded-full transition-opacity duration-1000 ${stage === 'Pagsingaw (Evaporation)' ? 'opacity-30' : 'opacity-90 shadow-lg'}`} />

            {/* Animations based on stage */}
            {stage === 'Pagsingaw (Evaporation)' && (
              <div className="absolute bottom-[100px] right-1/4 flex gap-6">
                <motion.div animate={{ y: [0, -60], opacity: [1, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="w-1 h-12 bg-white/50 rounded-full" />
                <motion.div animate={{ y: [0, -60], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-1 h-12 bg-white/50 rounded-full" />
                <motion.div animate={{ y: [0, -60], opacity: [1, 0] }} transition={{ duration: 1.0, repeat: Infinity, ease: "linear" }} className="w-1 h-12 bg-white/50 rounded-full" />
              </div>
            )}
            
            {stage === 'Pag-ulan (Precipitation)' && (
              <div className="absolute top-20 left-1/3 flex gap-4">
                <motion.div animate={{ y: [0, 120], opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }} className="w-1 h-4 bg-blue-300 rounded-full" />
                <motion.div animate={{ y: [0, 120], opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="w-1 h-4 bg-blue-300 rounded-full" />
                <motion.div animate={{ y: [0, 120], opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} className="w-1 h-4 bg-blue-300 rounded-full" />
                <motion.div animate={{ y: [0, 120], opacity: [1, 0] }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} className="w-1 h-4 bg-blue-300 rounded-full" />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center gap-4">
            <h3 className="text-xl font-bold text-base-content mb-2">Select a Stage:</h3>
            <div className="flex flex-col gap-3">
              {stages.map(s => (
                <button 
                  key={s} 
                  onClick={() => setStage(s)} 
                  className={`btn ${stage === s ? 'btn-primary' : 'btn-outline'}`}
                >
                  {s}
                </button>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-base-200 rounded-lg text-sm border border-base-300">
              {stage === 'Pagsingaw (Evaporation)' && "Water absorbs heat energy from the sun and turns into vapor."}
              {stage === 'Pamumuo (Condensation)' && "Water vapor cools as it rises, forming clouds over the mountains."}
              {stage === 'Pag-ulan (Precipitation)' && "The clouds release water back to the ground as rain, supporting ecosystems."}
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default WaterCycleVisualizer;
