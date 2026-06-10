import { useState } from 'react';
import { motion } from 'framer-motion';
import VisualizerLayout from '../../components/VisualizerLayout';

const MicroscopeVisualizer = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const zoomFactor = zoomLevel === 1 ? 1 : zoomLevel === 2 ? 3 : 8;

  return (
    <VisualizerLayout
      title="Birtwal na Mikroskopyo (Microscope)"
      description="Examine the cellular structures of a Mango leaf at varying magnifications."
      adSlotId="1004"
      educationalContent={
        <>
          <h2>Microscopy and Cells: Grade 7 Science</h2>
          <p>The microscope is the primary tool used by biologists to study cells, the basic unit of life. Not all schools have physical microscopes, so this virtual tool helps you see the microscopic world.</p>
          <h3>Dahon ng Mangga (Mango Leaf Cell)</h3>
          <p>In this simulation, you are viewing a typical plant cell from a Mango tree. Switch objectives to observe detail:</p>
          <ul>
            <li><strong>Cell Wall:</strong> The rigid outer boundary that gives the plant cell its shape.</li>
            <li><strong>Nucleus (Blue):</strong> The control center of the cell containing genetic material.</li>
            <li><strong>Large Central Vacuole (Light Blue):</strong> Stores water and maintains turgor pressure during the dry season.</li>
            <li><strong>Chloroplasts (Green):</strong> The site of photosynthesis. At 400x magnification, you can see the internal grana stacks.</li>
          </ul>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center p-6 md:p-10">
          
          {/* Microscope Lens Viewport */}
          <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border-[20px] border-[#0f172a] bg-[#f8fafc] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6),inset_0_0_50px_rgba(0,0,0,0.5)]">
            <motion.div 
              initial={false}
              animate={{ 
                scale: zoomFactor,
                x: zoomFactor === 1 ? 0 : zoomFactor === 3 ? -25 : -50, 
                y: zoomFactor === 1 ? 0 : zoomFactor === 3 ? -15 : -35
              }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
              className="absolute top-0 left-0 w-full h-full origin-[40%_40%]"
            >
              <svg viewBox="0 0 100 100" width="100%" height="100%" className="opacity-90 drop-shadow-md">
                {/* Plant Cell Wall & Membrane */}
                <polygon points="10,20 80,10 90,70 20,90" fill="#a7f3d0" stroke="#059669" strokeWidth="2" />
                <polygon points="12,22 78,13 87,68 22,87" fill="#d1fae5" />
                
                {/* Large Central Vacuole */}
                <path d="M 30 30 Q 60 20 70 50 Q 50 80 25 70 Q 20 50 30 30 Z" fill="#93c5fd" opacity="0.6" stroke="#60a5fa" strokeWidth="0.5" />
                
                {/* Nucleus */}
                <circle cx="75" cy="30" r="12" fill="#60a5fa" stroke="#2563eb" strokeWidth="1" />
                <circle cx="72" cy="28" r="4" fill="#1e3a8a" /> {/* Nucleolus */}
                
                {/* Chloroplasts (Only visible properly at higher zoom) */}
                <g opacity={zoomLevel >= 2 ? 1 : 0.6} style={{ transition: 'opacity 0.5s' }}>
                  <ellipse cx="20" cy="40" rx="6" ry="3" fill="#22c55e" stroke="#166534" strokeWidth="0.5" transform="rotate(30 20 40)" />
                  <ellipse cx="60" cy="80" rx="7" ry="4" fill="#22c55e" stroke="#166534" strokeWidth="0.5" transform="rotate(-20 60 80)" />
                  <ellipse cx="85" cy="55" rx="5" ry="3" fill="#22c55e" stroke="#166534" strokeWidth="0.5" transform="rotate(60 85 55)" />
                  
                  {/* Thylakoids inside chloroplasts (visible at highest zoom) */}
                  {zoomLevel === 3 && (
                    <>
                      <line x1="17" y1="40" x2="23" y2="40" stroke="#14532d" strokeWidth="0.5" />
                      <line x1="57" y1="80" x2="63" y2="80" stroke="#14532d" strokeWidth="0.5" />
                    </>
                  )}
                </g>

                {/* Mitochondria */}
                <g opacity={zoomLevel >= 2 ? 1 : 0.4}>
                  <ellipse cx="40" cy="80" rx="5" ry="2" fill="#fbbf24" stroke="#b45309" strokeWidth="0.5" transform="rotate(10 40 80)" />
                  <ellipse cx="50" cy="15" rx="4" ry="2" fill="#fbbf24" stroke="#b45309" strokeWidth="0.5" transform="rotate(-40 50 15)" />
                </g>
              </svg>
            </motion.div>

            {/* Crosshairs */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/30"></div>
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black/30"></div>
          </div>

          <div className="mt-10 w-full max-w-2xl bg-base-200 p-4 rounded-xl border border-base-300">
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button className={`btn flex-1 ${zoomLevel === 1 ? 'btn-primary' : 'btn-outline'}`} onClick={() => setZoomLevel(1)}>Scanner (40x)</button>
              <button className={`btn flex-1 ${zoomLevel === 2 ? 'btn-primary' : 'btn-outline'}`} onClick={() => setZoomLevel(2)}>High Power (100x)</button>
              <button className={`btn flex-1 ${zoomLevel === 3 ? 'btn-primary' : 'btn-outline'}`} onClick={() => setZoomLevel(3)}>Oil Immersion (400x)</button>
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default MicroscopeVisualizer;
