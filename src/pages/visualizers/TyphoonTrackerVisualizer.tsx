import TyphoonTrackerMdx from '../../content/blog/typhoon-tracker.mdx';
import { useState } from 'react';
import { motion } from 'framer-motion';
import VisualizerLayout from '../../components/VisualizerLayout';

const TyphoonTrackerVisualizer = () => {
  const [windSpeed, setWindSpeed] = useState(120); // km/h
  const [simulating, setSimulating] = useState(false);

  const getTyphoonData = (speed: number) => {
    if (speed < 62) return { category: 'Tropical Depression (TD)', surge: '< 0.5m', color: '#3b82f6', size: 60 };
    if (speed <= 88) return { category: 'Tropical Storm (TS)', surge: '0.5m - 1.0m', color: '#10b981', size: 90 };
    if (speed <= 117) return { category: 'Severe Tropical Storm (STS)', surge: '1.0m - 2.0m', color: '#f59e0b', size: 120 };
    if (speed <= 184) return { category: 'Typhoon (TY)', surge: '2.0m - 3.0m', color: '#ef4444', size: 160 };
    return { category: 'Super Typhoon (STY)', surge: '> 3.0m', color: '#8b5cf6', size: 220 };
  };

  const data = getTyphoonData(windSpeed);
  const pressure = Math.max(890, Math.floor(1010 - (windSpeed * 0.4)));

  return (
    <VisualizerLayout
      title="Typhoon Tracker (DRRR)"
      description="Simulate PAGASA Tropical Cyclone categories and potential landfall impacts."
      adSlotId="1009"
      educationalContent={<TyphoonTrackerMdx />}
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 flex flex-col gap-6">
          
          {/* Controls */}
          <div className="bg-base-200 p-6 rounded-xl border border-base-300">
            <label className="flex flex-col font-bold gap-4">
              <div className="flex justify-between items-center text-sm md:text-base">
                <span>Maximum Sustained Wind Speed:</span>
                <span className="text-2xl font-mono" style={{ color: data.color }}>{windSpeed} km/h</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="300" 
                step="5"
                value={windSpeed} 
                onChange={e => setWindSpeed(Number(e.target.value))} 
                className="range"
                style={{ '--range-shdw': data.color } as React.CSSProperties}
                disabled={simulating}
              />
            </label>
          </div>

          {/* Map Viewport */}
          <div className="h-[400px] bg-slate-900 relative overflow-hidden border-2 border-base-content/20 rounded-xl shadow-inner">
            
            {/* Distance Scale / Grid Lines */}
            <div className="absolute top-0 bottom-0 left-[20%] border-l border-dashed border-white/20" />
            <div className="absolute top-0 bottom-0 left-[40%] border-l border-dashed border-white/20" />
            <div className="absolute top-0 bottom-0 left-[60%] border-l border-dashed border-white/20" />
            <div className="absolute bottom-2 left-[20%] text-white/50 text-xs -translate-x-1/2">1000 km</div>
            <div className="absolute bottom-2 left-[40%] text-white/50 text-xs -translate-x-1/2">500 km</div>
            <div className="absolute bottom-2 left-[60%] text-white/50 text-xs -translate-x-1/2">250 km</div>

            {/* HUD Overlay */}
            <div 
              className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm p-4 rounded-xl border text-white z-10 shadow-lg min-w-[250px]"
              style={{ borderColor: data.color }}
            >
              <h3 className="m-0 mb-4 font-bold text-lg leading-tight" style={{ color: data.color }}>{data.category}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60 text-xs uppercase tracking-wider block">Wind</span>
                  <strong className="font-mono text-base">{windSpeed} km/h</strong>
                </div>
                <div>
                  <span className="text-white/60 text-xs uppercase tracking-wider block">Pressure</span>
                  <strong className="font-mono text-base">{pressure} hPa</strong>
                </div>
                <div className="col-span-2">
                  <span className="text-white/60 text-xs uppercase tracking-wider block">Est. Storm Surge</span>
                  <strong className="font-mono text-base">{data.surge}</strong>
                </div>
              </div>
            </div>

            {/* Mock Philippine Map (Eastern Seaboard) */}
            <svg className="absolute right-[5%] top-[5%] w-[30%] h-[90%] opacity-90 z-[5]" viewBox="0 0 100 200" preserveAspectRatio="none">
              <path d="M50 10 Q70 30 60 70 T40 130 Q30 160 50 190 L80 190 Q90 150 85 100 T95 20 Z" fill="#166534" stroke="#4ade80" strokeWidth="1"/>
              <text x="65" y="100" fill="#4ade80" fontSize="8" fontWeight="bold">PHILIPPINES</text>
            </svg>
            
            {/* Typhoon Simulation Node */}
            <motion.div 
              animate={{ 
                rotate: 360,
                left: simulating ? '70%' : '10%'
              }}
              transition={{ 
                rotate: { duration: Math.max(0.2, 2 - (windSpeed / 150)), repeat: Infinity, ease: "linear" },
                left: { duration: 4, ease: "linear" }
              }}
              style={{
                position: 'absolute', top: '40%',
                width: `${data.size}px`, height: `${data.size}px`,
                background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, ${data.color}40 40%, transparent 70%)`,
                borderRadius: '50%',
                originX: 0.5, originY: 0.5,
                transform: 'translate(-50%, -50%)',
                zIndex: 8
              }}
            >
              {/* Eye of the storm */}
              <div className="absolute top-1/2 left-1/2 w-[15%] h-[15%] bg-slate-900 rounded-full border border-white/50 -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          </div>

          <div className="flex justify-center mt-2">
            <button 
              className="btn btn-primary btn-wide shadow-md" 
              onClick={() => { setSimulating(false); setTimeout(() => setSimulating(true), 100); }}
            >
              Simulate Landfall
            </button>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default TyphoonTrackerVisualizer;
