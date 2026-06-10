import { useState } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';
import { InlineMath, BlockMath } from 'react-katex';

const DensityVisualizer = () => {
  const [mass, setMass] = useState(600); // kg
  const [volume, setVolume] = useState(1.0); // m^3

  const density = mass / volume; // kg/m^3
  const isFloating = density < 1000;
  
  // Calculate visual size based on volume (cube root).
  const sideLength = Math.cbrt(volume) * 60;
  const densityRatio = density / 1000;

  // Top is 0, Water surface is at 150px, Bottom is at 350px
  let dropPosition = 0;
  if (isFloating) {
    dropPosition = 150 - sideLength * (1 - densityRatio);
  } else {
    dropPosition = 350 - sideLength;
  }

  const setPreset = (m: number, v: number) => {
    setMass(m);
    setVolume(v);
  };

  return (
    <VisualizerLayout
      title="Density at Buoyancy (Lulutang o Lulubog?)"
      description="Observe Archimedes' principle to see why heavy boats float while small coins sink."
      adSlotId="2004"
      educationalContent={
        <>
          <h2>Properties of Matter: Grade 7 Science</h2>
          <p>Density (<InlineMath math="\rho" />) is a measure of mass (<InlineMath math="m" />) per unit of volume (<InlineMath math="V" />). The formula is:</p>
          <div className="bg-base-200 p-2 rounded-lg text-center my-2 border border-base-300">
            <BlockMath math="\rho = \frac{m}{V}" />
          </div>
          <h3>Bakit lumulutang ang Bangka? (Why do boats float?)</h3>
          <p>A massive wooden <em>Bangka</em> (boat) can float while a tiny <em>Piso</em> (1-peso coin) sinks immediately. This is because density, not just mass, determines buoyancy. The density of pure water is <strong>1000 kg/m³</strong>. If an object's overall density is less than water's, it floats!</p>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8">
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-base-200 p-6 rounded-xl border border-base-300">
              <label className="flex flex-col font-semibold gap-2 mb-6">
                <div className="flex justify-between">
                  <span>Mass / Bigat (<InlineMath math="m" />)</span>
                  <span className="text-primary">{mass} kg</span>
                </div>
                <input type="range" min="100" max="3000" step="50" value={mass} onChange={e => setMass(Number(e.target.value))} className="range range-primary" />
              </label>
              <label className="flex flex-col font-semibold gap-2">
                <div className="flex justify-between">
                  <span>Volume / Laki (<InlineMath math="V" />)</span>
                  <span className="text-secondary">{volume.toFixed(1)} m³</span>
                </div>
                <input type="range" min="0.1" max="3.0" step="0.1" value={volume} onChange={e => setVolume(Number(e.target.value))} className="range range-secondary" />
              </label>
            </div>
            
            <div className="bg-slate-900 text-white p-6 rounded-xl border border-base-300 flex flex-col justify-center shadow-inner">
              <div className="mb-4">
                <span className="text-white/60 text-sm uppercase tracking-wider block mb-2">Calculation:</span>
                <div className="text-xl px-2 py-1 bg-white/10 rounded">
                  <InlineMath math={`\\rho = \\frac{${mass}}{${volume.toFixed(1)}} =`} />
                </div>
                <div className={`text-4xl font-bold mt-1 ${isFloating ? 'text-emerald-400' : 'text-red-400'}`}>
                  {density.toFixed(0)} <span className="text-lg font-normal">kg/m³</span>
                </div>
              </div>
              <div className="border-t border-white/20 pt-4 flex justify-between items-center">
                <div className="text-sm">
                  <div className="text-white/60">Water Density:</div>
                  <div className="font-mono">1000 kg/m³</div>
                </div>
                <div className={`badge badge-lg ${isFloating ? 'badge-success' : 'badge-error'}`}>
                  {isFloating ? 'Lulutang (Floating)' : 'Lulubog (Sinking)'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button onClick={() => setPreset(600, 1.0)} className="btn btn-outline btn-sm">Kahoy / Wood (600 kg/m³)</button>
            <button onClick={() => setPreset(920, 1.0)} className="btn btn-outline btn-sm">Yelo / Ice (920 kg/m³)</button>
            <button onClick={() => setPreset(2000, 1.0)} className="btn btn-outline btn-sm">Bato / Brick (2000 kg/m³)</button>
          </div>

          <div className="relative h-[350px] bg-sky-100 dark:bg-sky-950 border border-base-300 rounded-xl overflow-hidden shadow-inner">
            {/* Air level */}
            <div className="absolute top-0 w-full h-[150px] bg-transparent" />
            
            {/* Water level */}
            <div className="absolute top-[150px] bottom-0 w-full bg-blue-500/30 border-t-2 border-dashed border-blue-500 backdrop-blur-[2px]">
              <span className="absolute top-2 right-4 text-blue-700 dark:text-blue-300 text-sm font-bold opacity-50">Water Surface</span>
            </div>
            
            {/* Object */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center font-bold text-white shadow-lg rounded-sm"
              style={{ 
                top: `${dropPosition}px`,
                width: `${sideLength}px`, 
                height: `${sideLength}px`, 
                background: isFloating ? '#b45309' : '#dc2626',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                border: '3px solid rgba(0,0,0,0.3)',
              }}
            >
              <span className="text-[10px] sm:text-xs text-shadow">{mass}kg</span>
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default DensityVisualizer;
