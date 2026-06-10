import SeasonsMdx from '../../content/blog/seasons.mdx';
import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

const SeasonsVisualizer = () => {
  const [month, setMonth] = useState(6); // 1 = Jan, 6 = June, 12 = Dec
  
  // Rough angle based on month
  const angle = ((month - 3) / 12) * 360; 

  const getPhilippineSeason = (m: number) => {
    // Roughly: Dec-May is Dry, Jun-Nov is Wet
    if (m >= 6 && m <= 11) return { season: 'Tag-ulan (Wet Season)', wind: 'Habagat (Southwest Monsoon)' };
    return { season: 'Tag-araw / Tag-init (Dry Season)', wind: 'Amihan (Northeast Monsoon)' };
  };

  const { season, wind } = getPhilippineSeason(month);

  return (
    <VisualizerLayout
      title="Panahon sa Pilipinas (Seasons & Monsoons)"
      description="Understand why the Earth's tilt causes seasons, and how it affects the Philippine wet and dry periods."
      adSlotId="2003"
      educationalContent={<SeasonsMdx />}
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center p-6 md:p-10">
          
          <div className="relative w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full border border-dashed border-base-content/30 flex items-center justify-center mb-8">
            {/* Sun */}
            <div className="w-16 h-16 bg-yellow-400 rounded-full shadow-[0_0_40px_rgba(250,204,21,0.6)] z-10" />
            
            {/* Earth Orbit Container */}
            <div 
              className="absolute w-full h-full transition-transform duration-1000 ease-in-out"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div 
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                style={{ transform: `rotate(-${angle}deg) rotate(23.5deg)` }} // Keeps earth upright but tilted 23.5
              >
                {/* Equator line */}
                <div className="w-8 h-px bg-white/80" />
              </div>
            </div>
          </div>

          <div className="w-full max-w-md bg-base-200 p-6 rounded-xl border border-base-300">
            <div className="flex justify-between items-end mb-4">
              <div>
                <div className="text-sm text-base-content/60 font-semibold uppercase tracking-wider mb-1">Month</div>
                <div className="text-2xl font-bold text-primary">{new Date(2024, month - 1).toLocaleString('default', { month: 'long' })}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-secondary">{season}</div>
                <div className="text-sm text-base-content/70">{wind}</div>
              </div>
            </div>
            
            <input 
              type="range" min="1" max="12" 
              value={month} 
              onChange={(e) => setMonth(Number(e.target.value))} 
              className="range range-primary w-full" 
            />
            <div className="w-full flex justify-between text-xs px-2 mt-2 text-base-content/50">
              <span>Jan</span>
              <span>Jun</span>
              <span>Dec</span>
            </div>
          </div>
          
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default SeasonsVisualizer;
