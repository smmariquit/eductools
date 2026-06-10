import { useState } from 'react';
import { motion } from 'framer-motion';
import VisualizerLayout from '../components/VisualizerLayout';

const PhotosynthesisVisualizer = () => {
  const [light, setLight] = useState(50);
  const [co2, setCo2] = useState(50);
  
  const oxygenRate = (light * co2) / 100;

  return (
    <VisualizerLayout
      title="Paggawa ng Pagkain (Photosynthesis)"
      description="Explore the limiting factors in how plants produce their own food using sunlight."
      adSlotId="1008"
      educationalContent={
        <>
          <h2>Photosynthesis: Grade 9 Science</h2>
          <p>Photosynthesis is the process by which green plants, like our local <em>Palay</em> (Rice) or <em>Mangga</em> (Mango) trees, use sunlight to synthesize nutrients from Carbon Dioxide (CO2) and water.</p>
          <h3>Limiting Factors in the Tropics</h3>
          <p>The rate of photosynthesis is heavily affected by <strong>Light Intensity</strong> and <strong>CO2 Concentration</strong>. In the Philippines, plants usually get abundant sunlight, allowing for lush tropical rainforests and robust agriculture. However, during heavy typhoons (cloudy days), the drop in light intensity slows down their food production.</p>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8">
          <div className="grid md:grid-cols-[1fr_300px] gap-8">
            <div className="bg-sky-900 rounded-xl flex flex-col items-center justify-end min-h-[350px] pb-8 border border-base-300 relative overflow-hidden shadow-inner">
              
              {/* Sun visualization based on light */}
              <div 
                className="absolute top-4 right-4 rounded-full bg-yellow-400 transition-all duration-300 blur-[2px] shadow-[0_0_50px_rgba(250,204,21,0.8)]"
                style={{ 
                  width: `${Math.max(20, light)}px`, 
                  height: `${Math.max(20, light)}px`,
                  opacity: light / 100 + 0.1
                }}
              />

              {/* Plant visual (Palay/Seedling) */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex gap-4 absolute -top-16">
                  {/* Oxygen bubbles based on rate */}
                  {Array.from({ length: Math.floor(oxygenRate / 10) }).map((_, i) => (
                    <motion.div 
                      key={i} 
                      animate={{ y: [0, -200], opacity: [1, 0], scale: [0.5, 1.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: i * 0.3 }}
                      className="w-4 h-4 bg-cyan-300/60 rounded-full shadow-sm flex items-center justify-center text-[8px] text-cyan-900"
                    >
                      O₂
                    </motion.div>
                  ))}
                </div>
                <div className="text-9xl filter drop-shadow-xl transition-transform duration-500" style={{ transform: `scale(${0.8 + (oxygenRate/200)})` }}>
                  🌾
                </div>
              </div>

              {/* Ground */}
              <div className="absolute bottom-0 w-full h-12 bg-emerald-800 border-t-4 border-emerald-600"></div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-lg border-b border-base-300 pb-2">Environmental Factors</h3>
              
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Liwanag ng Araw (Light)</span>
                  <span className="text-warning">{light}%</span>
                </label>
                <input 
                  type="range" min="0" max="100" 
                  value={light} 
                  onChange={e => setLight(Number(e.target.value))} 
                  className="range range-warning w-full" 
                />
              </div>
              
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Carbon Dioxide (CO₂)</span>
                  <span className="text-emerald-500">{co2}%</span>
                </label>
                <input 
                  type="range" min="0" max="100" 
                  value={co2} 
                  onChange={e => setCo2(Number(e.target.value))} 
                  className="range range-success w-full" 
                />
              </div>
              
              <div className="bg-base-200 p-5 rounded-xl border border-base-300 mt-auto shadow-sm">
                <strong className="block text-sm text-base-content/70 mb-1">Rate of Oxygen Production:</strong>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-extrabold text-info">{oxygenRate.toFixed(1)}</span>
                  <span className="text-info/70 font-semibold pb-1">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default PhotosynthesisVisualizer;
