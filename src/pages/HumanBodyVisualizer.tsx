import { useState } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';

const SvgLabel = ({ x, y, lineX, lineY, text }: { x: number, y: number, lineX: number, lineY: number, text: string }) => (
  <g>
    <line x1={x} y1={y} x2={lineX} y2={lineY} stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="2 2" />
    <text x={x} y={y - 2} fill="#f8fafc" fontSize="8" fontWeight="normal" letterSpacing="0.5" textAnchor={x < 100 ? "end" : "start"}>
      {text}
    </text>
  </g>
);

const HumanBodyVisualizer = () => {
  const [system, setSystem] = useState('Skeletal');

  return (
    <VisualizerLayout
      title="Human Body Systems"
      description="Interactive anatomical diagram with explicit organ labels and biological structures."
      adSlotId="1003"
      educationalContent={
        <>
          <h2>The Human Organ Systems: Grade 5 Science</h2>
          <p>Understanding the human body is essential for health and biology. The body is made of interacting systems that work together to maintain homeostasis.</p>
          <ul>
            <li><strong>Skeletal System:</strong> Provides structural support and protects internal organs using rigid bones like the skull, ribs, and femur.</li>
            <li><strong>Muscular System:</strong> Enables movement and generates heat through the contraction of tissues (e.g., pectorals, biceps).</li>
            <li><strong>Digestive System:</strong> Breaks down food starting from the esophagus, into the stomach, and through the intestines to absorb nutrients.</li>
            <li><strong>Respiratory System:</strong> Facilitates the exchange of oxygen and carbon dioxide via the trachea, lungs, and diaphragm.</li>
          </ul>
        </>
      }
    >
      <div className="card lg:card-side bg-base-100 shadow-xl border border-base-200 p-0 overflow-hidden">
        <div className="lg:w-2/3 bg-base-300 h-[500px] flex items-center justify-center relative border-b lg:border-b-0 lg:border-r border-base-200">
          
          <svg viewBox="0 0 200 500" className="h-full w-full max-w-full">
            {/* Outline of Human Body */}
            <path d="M 100 20 C 115 20, 125 35, 125 50 C 125 70, 110 80, 100 80 C 90 80, 75 70, 75 50 C 75 35, 85 20, 100 20 Z" fill="none" stroke="currentColor" className="text-base-content/30" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 75 80 L 50 100 L 40 220 L 60 220 L 70 140 L 75 140 M 125 80 L 150 100 L 160 220 L 140 220 L 130 140 L 125 140" fill="none" stroke="currentColor" className="text-base-content/30" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 75 80 L 125 80 L 120 240 L 80 240 Z" fill="none" stroke="currentColor" className="text-base-content/30" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 80 240 L 70 450 L 95 450 L 100 280 M 120 240 L 130 450 L 105 450 L 100 280" fill="none" stroke="currentColor" className="text-base-content/30" strokeWidth="2" strokeDasharray="4 4" />

            {/* Skeletal System */}
            {system === 'Skeletal' && (
              <g stroke="#f8fafc" strokeWidth="4" strokeLinecap="round">
                <circle cx="100" cy="50" r="15" fill="none" strokeWidth="3" />
                <line x1="100" y1="65" x2="100" y2="230" />
                <path d="M 100 100 Q 75 110 85 130 M 100 100 Q 125 110 115 130" fill="none" strokeWidth="2" />
                <path d="M 100 120 Q 75 130 85 150 M 100 120 Q 125 130 115 150" fill="none" strokeWidth="2" />
                <path d="M 85 230 Q 100 250 115 230 Z" fill="none" strokeWidth="2" />
                <path d="M 100 85 L 60 110 L 50 160 L 45 210 M 100 85 L 140 110 L 150 160 L 155 210" fill="none" />
                <line x1="90" y1="240" x2="80" y2="340" />
                <line x1="110" y1="240" x2="120" y2="340" />
                <line x1="80" y1="340" x2="75" y2="440" />
                <line x1="120" y1="340" x2="125" y2="440" />
                
                <SvgLabel x={40} y={40} lineX={85} lineY={50} text="Skull (Cranium)" />
                <SvgLabel x={160} y={110} lineX={115} lineY={120} text="Rib Cage" />
                <SvgLabel x={40} y={180} lineX={100} lineY={180} text="Spine" />
                <SvgLabel x={160} y={240} lineX={100} lineY={240} text="Pelvis" />
                <SvgLabel x={40} y={300} lineX={85} lineY={290} text="Femur" />
              </g>
            )}

            {/* Muscular System */}
            {system === 'Muscular' && (
              <g fill="#ef4444" opacity="0.9">
                <path d="M 100 90 Q 120 90 125 110 Q 100 115 100 120 Q 100 115 75 110 Q 80 90 100 90 Z" />
                <rect x="90" y="125" width="20" height="40" rx="2" />
                <line x1="90" y1="145" x2="110" y2="145" stroke="#7f1d1d" strokeWidth="2" />
                <line x1="100" y1="125" x2="100" y2="165" stroke="#7f1d1d" strokeWidth="2" />
                <path d="M 75 100 Q 60 120 65 140 Q 80 120 75 100 Z" />
                <path d="M 125 100 Q 140 120 135 140 Q 120 120 125 100 Z" />
                <path d="M 85 240 Q 70 280 80 330 Q 95 280 85 240 Z" />
                <path d="M 115 240 Q 130 280 120 330 Q 105 280 115 240 Z" />
                
                <SvgLabel x={40} y={100} lineX={80} lineY={100} text="Pectorals" />
                <SvgLabel x={160} y={130} lineX={130} lineY={130} text="Biceps" />
                <SvgLabel x={40} y={145} lineX={90} lineY={145} text="Abdominals" />
                <SvgLabel x={160} y={280} lineX={115} lineY={280} text="Quadriceps" />
              </g>
            )}

            {/* Digestive System */}
            {system === 'Digestive' && (
              <g>
                <path d="M 100 65 C 105 90, 95 110, 100 130" stroke="#f59e0b" strokeWidth="4" fill="none" />
                <path d="M 100 130 C 120 120, 130 150, 105 160 C 90 165, 80 140, 100 130 Z" fill="#d97706" />
                <path d="M 115 160 L 80 160 L 80 220 L 120 220 L 120 190" fill="none" stroke="#78350f" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 100 160 Q 80 180 100 190 Q 120 200 100 210 Q 80 215 100 220" fill="none" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
                
                <SvgLabel x={40} y={90} lineX={98} lineY={90} text="Esophagus" />
                <SvgLabel x={160} y={145} lineX={115} lineY={145} text="Stomach" />
                <SvgLabel x={40} y={170} lineX={80} lineY={170} text="Large Int." />
                <SvgLabel x={160} y={200} lineX={110} lineY={200} text="Small Int." />
              </g>
            )}

            {/* Respiratory System */}
            {system === 'Respiratory' && (
              <g>
                <path d="M 100 65 L 100 110" stroke="#93c5fd" strokeWidth="4" />
                <path d="M 100 110 L 85 125 M 100 110 L 115 125" stroke="#93c5fd" strokeWidth="3" />
                <path d="M 85 110 C 70 100, 60 160, 85 170 C 95 170, 100 130, 85 110 Z" fill="#3b82f6" opacity="0.8" />
                <path d="M 115 110 C 130 100, 140 160, 115 170 C 105 170, 100 130, 115 110 Z" fill="#3b82f6" opacity="0.8" />
                <path d="M 70 175 Q 100 160 130 175" fill="none" stroke="#2dd4bf" strokeWidth="4" />
                
                <SvgLabel x={40} y={80} lineX={100} lineY={80} text="Trachea" />
                <SvgLabel x={160} y={140} lineX={120} lineY={140} text="Lungs" />
                <SvgLabel x={40} y={175} lineX={80} lineY={170} text="Diaphragm" />
              </g>
            )}
          </svg>
        </div>
        
        <div className="card-body lg:w-1/3 flex flex-col justify-center p-6">
          <h2 className="text-2xl font-bold text-primary mb-6">{system} System</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {['Skeletal', 'Muscular', 'Digestive', 'Respiratory'].map((s) => (
              <button 
                key={s} 
                onClick={() => setSystem(s)} 
                className={`btn btn-sm h-12 ${system === s ? 'btn-primary' : 'btn-outline'}`}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="text-base-content/80 text-sm">This interactive diagram dynamically displays the major organs and structures of the {system.toLowerCase()} system.</p>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default HumanBodyVisualizer;
