import ElectromagneticSpectrumMdx from '../../content/blog/electromagnetic-spectrum.mdx';
import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

const ElectromagneticSpectrumVisualizer = () => {
  const [wavelength, setWavelength] = useState(5); // 0 to 10 scale
  
  const getSpectrumData = (val: number) => {
    if (val < 2) return { name: 'Radio Waves', desc: 'Used for AM/FM radio stations (e.g., DZBB, DZMM).', freq: '10^4 Hz', color: '#dc2626' };
    if (val < 4) return { name: 'Microwaves', desc: 'Used for cell signals and warming leftover Adobo.', freq: '10^8 Hz', color: '#ea580c' };
    if (val < 6) return { name: 'Infrared', desc: 'Felt as heat, used in TV remotes.', freq: '10^12 Hz', color: '#ca8a04' };
    if (val < 7) return { name: 'Visible Light', desc: 'The colors we see (Bahaghari).', freq: '10^15 Hz', color: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' };
    if (val < 8) return { name: 'Ultraviolet', desc: 'Causes sunburns when at the beach in Boracay.', freq: '10^16 Hz', color: '#8b5cf6' };
    if (val < 9) return { name: 'X-Rays', desc: 'Used in hospitals for medical imaging.', freq: '10^18 Hz', color: '#c026d3' };
    return { name: 'Gamma Rays', desc: 'Highly penetrating, emitted by radioactive decay.', freq: '10^20 Hz', color: '#e11d48' };
  };

  const data = getSpectrumData(wavelength);
  const waveCount = wavelength * 2 + 1;

  return (
    <VisualizerLayout
      title="Electromagnetic Spectrum (Mga Uri ng Radiation)"
      description="Explore the relationship between wavelength, frequency, and real-world energy applications."
      adSlotId="2007"
      educationalContent={<ElectromagneticSpectrumMdx />}
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center p-6 md:p-10">
          
          {/* Wave visualizer */}
          <div className="w-full h-[200px] bg-slate-900 rounded-xl relative overflow-hidden border border-base-300 mb-8 shadow-inner flex items-center justify-center">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-[80%] opacity-80">
              <path 
                d={`M 0 10 ${Array.from({length: waveCount}).map((_, i) => `Q ${i*100/waveCount + 50/waveCount} ${i%2===0 ? 0 : 20}, ${(i+1)*100/waveCount} 10`).join(' ')}`} 
                fill="none" 
                stroke={data.name === 'Visible Light' ? 'white' : data.color} 
                strokeWidth="0.5" 
                style={{ transition: 'all 0.3s ease-in-out' }}
              />
            </svg>
            <div className="absolute top-4 left-4 text-white/50 text-xs tracking-widest font-mono">
              WAVELENGTH VISUALIZATION
            </div>
          </div>

          <div className="w-full max-w-2xl">
            <div 
              className="flex flex-col sm:flex-row justify-between mb-8 p-6 shadow-md rounded-xl text-white"
              style={{ background: data.color.startsWith('linear') ? data.color : data.color }}
            >
              <div>
                <div className="text-3xl font-extrabold drop-shadow-md">{data.name}</div>
                <div className="mt-2 text-sm opacity-90 drop-shadow-sm">{data.desc}</div>
              </div>
              <div className="mt-4 sm:mt-0 sm:text-right">
                <div className="text-xs uppercase tracking-wider opacity-80">Frequency</div>
                <div className="text-xl font-mono drop-shadow-md">~{data.freq}</div>
              </div>
            </div>
            
            <input 
              type="range" min="0" max="10" step="0.1" 
              value={wavelength} 
              onChange={e => setWavelength(Number(e.target.value))} 
              className="range range-primary w-full" 
            />
            
            <div className="flex justify-between text-xs sm:text-sm text-base-content/60 mt-3 font-semibold">
              <span className="text-left">Long Wavelength<br/>Low Energy</span>
              <span className="text-right">Short Wavelength<br/>High Energy</span>
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default ElectromagneticSpectrumVisualizer;
