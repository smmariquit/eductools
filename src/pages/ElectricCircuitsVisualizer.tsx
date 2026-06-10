import { useState } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';

const ElectricCircuitsVisualizer = () => {
  const [circuitType, setCircuitType] = useState<'series' | 'parallel'>('series');
  const [switchedOn, setSwitchedOn] = useState(false);
  const [batteryVoltage, setBatteryVoltage] = useState(9);

  return (
    <VisualizerLayout
      title="Electric Circuits (Kuryente)"
      description="Compare how Series and Parallel circuits work."
      adSlotId="2008"
      educationalContent={
        <>
          <h2>Electricity and Circuits: Science Grade 8</h2>
          <p>An electric circuit is a path in which electrons from a voltage or current source flow.</p>
          <h3>Series vs. Parallel Circuits</h3>
          <p>In a <strong>Series Circuit</strong>, components are connected end-to-end, forming a single path for current flow. If one bulb burns out, the entire circuit is broken.</p>
          <p>In a <strong>Parallel Circuit</strong>, components are connected across each other, forming exactly two sets of electrically common points. If one bulb burns out, the other branches continue to work.</p>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col md:flex-row gap-10">
          
          <div className="flex-1 bg-slate-900 rounded-xl p-8 border-4 border-slate-700 min-h-[300px] flex items-center justify-center relative overflow-hidden">
            {/* Visual Circuit Diagram implementation */}
            <div className="w-full max-w-sm aspect-video border-4 border-yellow-500/30 rounded-lg relative flex items-center justify-center">
                {/* Battery */}
                <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 flex flex-col items-center bg-slate-900 px-2 py-4">
                  <div className="w-8 h-2 bg-slate-400 rounded-t-sm" />
                  <div className="w-12 h-16 bg-red-600 rounded-sm flex items-center justify-center font-bold text-white text-xs">{batteryVoltage}V</div>
                  <div className="w-8 h-2 bg-slate-400 rounded-b-sm" />
                </div>

                {/* Switch */}
                <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 bg-slate-900 px-4">
                  <button 
                    className={`px-4 py-2 rounded font-bold text-white transition-colors border-2 ${switchedOn ? 'bg-green-600 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-red-600 border-red-800'}`}
                    onClick={() => setSwitchedOn(!switchedOn)}
                  >
                    {switchedOn ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* Bulbs */}
                {circuitType === 'series' ? (
                  <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 bg-slate-900 px-8 flex gap-8">
                     <div className={`w-12 h-12 rounded-full border-2 border-slate-600 transition-all duration-300 ${switchedOn ? 'bg-yellow-300 shadow-[0_0_30px_rgba(253,224,71,0.8)]' : 'bg-slate-700 opacity-50'}`} />
                     <div className={`w-12 h-12 rounded-full border-2 border-slate-600 transition-all duration-300 ${switchedOn ? 'bg-yellow-300 shadow-[0_0_30px_rgba(253,224,71,0.8)]' : 'bg-slate-700 opacity-50'}`} />
                  </div>
                ) : (
                  <div className="absolute top-0 right-0 h-full w-1/2 flex flex-col justify-evenly items-end pr-[20%]">
                     {/* Parallel wires */}
                     <div className="w-full border-b-4 border-yellow-500/30 flex justify-center">
                        <div className={`w-12 h-12 rounded-full border-2 border-slate-600 -translate-y-1/2 transition-all duration-300 ${switchedOn ? 'bg-yellow-300 shadow-[0_0_40px_rgba(253,224,71,1)]' : 'bg-slate-700 opacity-50'}`} />
                     </div>
                     <div className="w-full border-b-4 border-yellow-500/30 flex justify-center">
                        <div className={`w-12 h-12 rounded-full border-2 border-slate-600 -translate-y-1/2 transition-all duration-300 ${switchedOn ? 'bg-yellow-300 shadow-[0_0_40px_rgba(253,224,71,1)]' : 'bg-slate-700 opacity-50'}`} />
                     </div>
                  </div>
                )}
            </div>
          </div>

          <div className="w-full md:w-64 flex flex-col gap-6 bg-base-200 p-6 rounded-xl border border-base-300">
            <div>
              <label className="block mb-2 font-bold text-base-content">Circuit Type:</label>
              <select 
                className="select select-bordered w-full"
                value={circuitType}
                onChange={(e) => setCircuitType(e.target.value as 'series' | 'parallel')}
              >
                <option value="series">Series</option>
                <option value="parallel">Parallel</option>
              </select>
            </div>
            
            <div>
              <label className="flex justify-between mb-2 font-bold text-sm">
                <span>Voltage (Battery)</span>
                <span className="text-primary">{batteryVoltage}V</span>
              </label>
              <input 
                type="range" 
                min="1.5" 
                max="24" 
                step="1.5"
                value={batteryVoltage} 
                onChange={(e) => setBatteryVoltage(Number(e.target.value))} 
                className="range range-primary range-sm" 
              />
            </div>
          </div>
          
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default ElectricCircuitsVisualizer;
