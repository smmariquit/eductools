import FractionsMdx from '../../content/deep-dives/fractions.mdx';
import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

const FractionsVisualizer = () => {
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(8); // Standard pizza slices

  return (
    <VisualizerLayout
      title="Hatig-bilang (Fractions Visualizer)"
      description="Interactive tool for understanding basic mathematical fractions using a Buko Pie."
      adSlotId="1010"
      educationalContent={<FractionsMdx />}
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-10 flex flex-col items-center">
          
          {/* Circular "Pie" Visualization */}
          <div className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full border-4 border-orange-200 bg-orange-100 shadow-inner overflow-hidden mb-12 transform rotate-90">
            {Array.from({ length: denominator }).map(() => {
              // Only works perfectly for SVG, using conic-gradient for CSS circle slicing
              return null;
            })}
            
            <div 
              className="absolute inset-0"
              style={{
                background: `conic-gradient(#f59e0b 0deg, #f59e0b ${numerator * (360/denominator)}deg, transparent ${numerator * (360/denominator)}deg, transparent 360deg)`
              }}
            ></div>

            {/* Slice Lines */}
            {Array.from({ length: denominator }).map((_, i) => (
              <div 
                key={i}
                className="absolute top-0 left-1/2 w-[2px] h-1/2 origin-bottom bg-orange-300"
                style={{ transform: `translateX(-50%) rotate(${i * (360/denominator)}deg)` }}
              />
            ))}
            
            {/* Pie Crust effect */}
            <div className="absolute inset-0 rounded-full border-[10px] border-amber-600/30 pointer-events-none"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center w-full max-w-lg">
            
            {/* The Fraction */}
            <div className="flex flex-col items-center text-5xl md:text-6xl font-black text-base-content font-mono">
              <div className="border-b-[6px] border-base-content px-4 pb-2 text-primary">{numerator}</div>
              <div className="pt-2 text-secondary">{denominator}</div>
            </div>
            
            {/* Controls */}
            <div className="flex flex-col gap-6 w-full">
              <div className="bg-base-200 p-4 rounded-xl border border-base-300">
                <label className="flex flex-col gap-2 font-semibold">
                  <div className="flex justify-between text-sm">
                    <span className="uppercase tracking-wider">Slices Taken (Numerator)</span>
                    <span className="text-primary">{numerator}</span>
                  </div>
                  <input type="range" min="0" max={denominator} value={numerator} onChange={e => setNumerator(Number(e.target.value))} className="range range-primary" />
                </label>
              </div>
              
              <div className="bg-base-200 p-4 rounded-xl border border-base-300">
                <label className="flex flex-col gap-2 font-semibold">
                  <div className="flex justify-between text-sm">
                    <span className="uppercase tracking-wider">Total Slices (Denominator)</span>
                    <span className="text-secondary">{denominator}</span>
                  </div>
                  <input type="range" min="1" max="20" value={denominator} onChange={e => { 
                    const val = Number(e.target.value);
                    setDenominator(val); 
                    if(numerator > val) setNumerator(val); 
                  }} className="range range-secondary" />
                </label>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default FractionsVisualizer;
