import { useState } from 'react';
import { motion } from 'framer-motion';
import VisualizerLayout from '../components/VisualizerLayout';

const PhotosynthesisVisualizer = () => {
  const [light, setLight] = useState(50);
  const [co2, setCo2] = useState(50);
  
  const oxygenRate = (light * co2) / 100;

  return (
    <VisualizerLayout
      title="Photosynthesis Simulator"
      description="Explore limiting factors in the process of photosynthesis."
      adSlotId="1008"
      educationalContent={
        <>
          <h2>Photosynthesis: Senior High School Biology</h2>
          <p>Photosynthesis is the process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water.</p>
          <h3>Limiting Factors</h3>
          <p>The rate of photosynthesis is affected by light intensity, carbon dioxide concentration, and temperature. If any of these factors is in short supply, it limits the overall rate of oxygen and glucose production.</p>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8">
          <div className="grid md:grid-cols-[1fr_300px] gap-8">
            <div className="bg-base-200 rounded-xl flex flex-col items-center justify-end min-h-[300px] pb-8 border border-base-300 relative overflow-hidden">
              {/* Sun visualization based on light */}
              <div 
                className="absolute top-4 right-4 rounded-full bg-warning transition-all duration-300 blur-[2px]"
                style={{ 
                  width: `${light}px`, 
                  height: `${light}px`,
                  opacity: light / 100
                }}
              />
              <div className="flex gap-4">
                {/* Oxygen bubbles based on rate */}
                {Array.from({ length: Math.floor(oxygenRate / 10) }).map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ y: [0, -150], opacity: [1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                    className="w-3 h-3 bg-info rounded-full shadow-sm"
                  />
                ))}
              </div>
              <div className="text-7xl mt-4 z-10">🌱</div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-lg border-b border-base-300 pb-2">Environmental Factors</h3>
              
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Light Intensity</span>
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
                  <span>CO2 Concentration</span>
                  <span className="text-neutral-500">{co2}%</span>
                </label>
                <input 
                  type="range" min="0" max="100" 
                  value={co2} 
                  onChange={e => setCo2(Number(e.target.value))} 
                  className="range range-neutral w-full" 
                />
              </div>
              
              <div className="bg-base-200 p-5 rounded-xl border border-base-300 mt-auto">
                <strong className="block text-sm text-base-content/70 mb-1">Oxygen Production Rate:</strong>
                <span className="text-3xl font-bold text-success">{oxygenRate.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default PhotosynthesisVisualizer;
