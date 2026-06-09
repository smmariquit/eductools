import { useState } from 'react';
import { motion } from 'framer-motion';
import VisualizerLayout from '../components/VisualizerLayout';

const MicroscopeVisualizer = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const zoomFactor = zoomLevel === 1 ? 1 : zoomLevel === 2 ? 3 : 8;

  return (
    <VisualizerLayout
      title="Virtual Microscope"
      description="Examine cellular structures of a plant cell at varying magnifications."
      adSlotId="1004"
      educationalContent={
        <>
          <h2>Microscopy and Cells: Grade 7 Science</h2>
          <p>In Key Stage 3, students are introduced to the microscopic world. The microscope is the primary tool used by biologists to study cells, the basic unit of life.</p>
          <h3>Plant Cell Organelles</h3>
          <p>In this simulation, you are viewing a typical plant cell. By switching objectives, you can observe different levels of detail:</p>
          <ul>
            <li><strong>Cell Wall:</strong> The rigid outer boundary that gives the plant cell its geometric shape.</li>
            <li><strong>Nucleus (Blue):</strong> The control center of the cell containing genetic material. The darker spot is the nucleolus.</li>
            <li><strong>Large Central Vacuole (Light Blue):</strong> Stores water and maintains turgor pressure.</li>
            <li><strong>Chloroplasts (Green):</strong> The site of photosynthesis. At 400x magnification, you can begin to see the internal grana stacks (thylakoids).</li>
          </ul>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center p-6 md:p-10">
          
          {/* Microscope Lens Viewport */}
          <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full border-[15px] border-[#1e293b] bg-base-300 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_0_40px_rgba(0,0,0,0.8)]">
            <motion.div 
              initial={false}
              animate={{ 
                scale: zoomFactor,
                x: zoomFactor === 1 ? 0 : zoomFactor === 3 ? -20 : -40, // slight panning
                y: zoomFactor === 1 ? 0 : zoomFactor === 3 ? -10 : -30
              }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
              className="absolute top-0 left-0 w-full h-full origin-[40%_40%]"
            >
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                {/* Plant Cell Wall & Membrane */}
                <polygon points="10,20 80,10 90,70 20,90" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <polygon points="12,22 78,13 87,68 22,87" fill="#047857" opacity="0.6" />
                
                {/* Large Central Vacuole */}
                <path d="M 30 30 Q 60 20 70 50 Q 50 80 25 70 Q 20 50 30 30 Z" fill="#60a5fa" opacity="0.5" />
                
                {/* Nucleus */}
                <circle cx="75" cy="30" r="12" fill="#3b82f6" />
                <circle cx="72" cy="28" r="4" fill="#1e3a8a" /> {/* Nucleolus */}
                
                {/* Chloroplasts (Only visible properly at higher zoom) */}
                <g opacity={zoomLevel >= 2 ? 1 : 0.4} style={{ transition: 'opacity 0.5s' }}>
                  <ellipse cx="20" cy="40" rx="6" ry="3" fill="#22c55e" transform="rotate(30 20 40)" />
                  <ellipse cx="60" cy="80" rx="7" ry="4" fill="#22c55e" transform="rotate(-20 60 80)" />
                  <ellipse cx="85" cy="55" rx="5" ry="3" fill="#22c55e" transform="rotate(60 85 55)" />
                  
                  {/* Thylakoids inside chloroplasts (visible at highest zoom) */}
                  {zoomLevel === 3 && (
                    <>
                      <line x1="17" y1="40" x2="23" y2="40" stroke="#14532d" strokeWidth="0.5" />
                      <line x1="57" y1="80" x2="63" y2="80" stroke="#14532d" strokeWidth="0.5" />
                    </>
                  )}
                </g>

                {/* Mitochondria */}
                <g opacity={zoomLevel >= 2 ? 1 : 0.3}>
                  <ellipse cx="40" cy="80" rx="5" ry="2" fill="#f59e0b" transform="rotate(10 40 80)" />
                  <ellipse cx="50" cy="15" rx="4" ry="2" fill="#f59e0b" transform="rotate(-40 50 15)" />
                </g>
              </svg>
            </motion.div>

            {/* Crosshairs */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20"></div>
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/20"></div>
          </div>

          <div className="mt-8 w-full max-w-lg">
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button className={`btn ${zoomLevel === 1 ? 'btn-primary' : 'btn-outline'}`} onClick={() => setZoomLevel(1)}>Low Power (40x)</button>
              <button className={`btn ${zoomLevel === 2 ? 'btn-primary' : 'btn-outline'}`} onClick={() => setZoomLevel(2)}>High Power (100x)</button>
              <button className={`btn ${zoomLevel === 3 ? 'btn-primary' : 'btn-outline'}`} onClick={() => setZoomLevel(3)}>Oil Immersion (400x)</button>
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default MicroscopeVisualizer;
