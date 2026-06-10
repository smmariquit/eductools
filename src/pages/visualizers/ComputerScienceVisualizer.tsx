import { useState } from 'react';
import { Link } from 'react-router-dom';
import VisualizerLayout from '../../components/VisualizerLayout';
import ComputerScienceMdx from '../../content/blog/computer-science.mdx';

const ByteEditor = ({ label, color, bits, onChange }: { label: string, color: string, bits: number[], onChange: (bits: number[]) => void }) => {
  const toggleBit = (index: number) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    onChange(newBits);
  };

  const decimalValue = bits.reduce((acc, bit, i) => acc + (bit * Math.pow(2, 7 - i)), 0);
  const hexValue = decimalValue.toString(16).padStart(2, '0').toUpperCase();

  return (
    <div className="mb-6 p-4 rounded-xl border border-base-300 bg-base-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg uppercase tracking-wider" style={{ color }}>{label} BYTE</h3>
        <div className="flex gap-4">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-base-content/50 block">Decimal</span>
            <span className="font-mono font-bold text-lg">{decimalValue}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-base-content/50 block">Hex</span>
            <span className="font-mono font-bold text-lg">#{hexValue}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between gap-1 sm:gap-2">
        {bits.map((bit, i) => (
          <button 
            key={i}
            onClick={() => toggleBit(i)}
            className={`flex-1 aspect-square rounded-md flex items-center justify-center font-mono font-bold text-xl sm:text-2xl transition-all duration-200 ${
              bit === 1 
                ? 'bg-primary text-primary-content shadow-inner scale-95 border-b-0' 
                : 'bg-base-100 text-base-content/40 hover:bg-base-300 border-b-4 border-base-300'
            }`}
          >
            {bit}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-2 px-2 text-[10px] font-mono text-base-content/40">
        <span>128</span>
        <span>64</span>
        <span>32</span>
        <span>16</span>
        <span>8</span>
        <span>4</span>
        <span>2</span>
        <span>1</span>
      </div>
    </div>
  );
};

const ComputerScienceVisualizer = () => {
  const [redBits, setRedBits] = useState([0,0,1,0,1,1,0,1]); // 45
  const [greenBits, setGreenBits] = useState([1,0,1,1,0,1,0,0]); // 180
  const [blueBits, setBlueBits] = useState([1,1,1,0,0,0,1,1]); // 227

  const bitsToDecimal = (bits: number[]) => bits.reduce((acc, bit, i) => acc + (bit * Math.pow(2, 7 - i)), 0);
  
  const r = bitsToDecimal(redBits);
  const g = bitsToDecimal(greenBits);
  const b = bitsToDecimal(blueBits);
  
  const hexCode = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();

  const handleRandomize = () => {
    setRedBits(Array(8).fill(0).map(() => Math.random() > 0.5 ? 1 : 0));
    setGreenBits(Array(8).fill(0).map(() => Math.random() > 0.5 ? 1 : 0));
    setBlueBits(Array(8).fill(0).map(() => Math.random() > 0.5 ? 1 : 0));
  };

  return (
    <VisualizerLayout
      title="Digital Logic: Bits to Pixels"
      description="Interact with bits to see how raw binary voltage creates physical RGB pixels on a screen."
      educationalContent={<ComputerScienceMdx />}
    >
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto">
        
        {/* LEFT: Bit Editor */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-black text-primary">Transistor States</h2>
            <button onClick={handleRandomize} className="btn btn-sm btn-outline">Randomize</button>
          </div>
          
          <p className="text-sm text-base-content/70 mb-6">
            Click the <Link to="/units#b" className="underline decoration-dotted font-bold hover:text-primary">Bits</Link> below to toggle their voltage state (0 or 1). 
            Each block of 8 bits forms a single <Link to="/units#B" className="underline decoration-dotted font-bold hover:text-primary">Byte</Link>.
          </p>

          <ByteEditor label="Red" color="#ef4444" bits={redBits} onChange={setRedBits} />
          <ByteEditor label="Green" color="#22c55e" bits={greenBits} onChange={setGreenBits} />
          <ByteEditor label="Blue" color="#3b82f6" bits={blueBits} onChange={setBlueBits} />
        </div>

        {/* RIGHT: Pixel Output */}
        <div className="lg:w-96 flex flex-col">
          <h2 className="text-2xl font-black text-secondary mb-4">Physical <Link to="/units#px" className="underline decoration-dotted hover:text-secondary/70">Pixel</Link> Output</h2>
          
          <div className="bg-base-200 border border-base-300 rounded-xl flex-1 flex flex-col overflow-hidden shadow-lg">
            
            {/* The actual colored pixel */}
            <div 
              className="w-full flex-1 min-h-[250px] transition-colors duration-200 flex items-center justify-center shadow-inner relative"
              style={{ backgroundColor: hexCode }}
            >
              {/* Overlay grid to make it look like a zoomed-in screen pixel */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent bg-[length:10px_10px]" />
              
              <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-lg border border-white/10 z-10">
                <span className="font-mono text-3xl font-black text-white tracking-widest">{hexCode}</span>
              </div>
            </div>

            {/* Subpixel breakdown */}
            <div className="p-6 bg-base-100 flex justify-between gap-4">
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full h-8 rounded-t-md opacity-20" style={{ backgroundColor: '#ef4444' }} />
                <div className="w-full h-16 rounded-b-md transition-all duration-200" style={{ backgroundColor: '#ef4444', height: `${(r/255)*64}px`, marginTop: `-${(r/255)*64}px` }} />
                <span className="font-mono font-bold mt-2 text-sm">{r}</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full h-8 rounded-t-md opacity-20" style={{ backgroundColor: '#22c55e' }} />
                <div className="w-full h-16 rounded-b-md transition-all duration-200" style={{ backgroundColor: '#22c55e', height: `${(g/255)*64}px`, marginTop: `-${(g/255)*64}px` }} />
                <span className="font-mono font-bold mt-2 text-sm">{g}</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full h-8 rounded-t-md opacity-20" style={{ backgroundColor: '#3b82f6' }} />
                <div className="w-full h-16 rounded-b-md transition-all duration-200" style={{ backgroundColor: '#3b82f6', height: `${(b/255)*64}px`, marginTop: `-${(b/255)*64}px` }} />
                <span className="font-mono font-bold mt-2 text-sm">{b}</span>
              </div>
            </div>
            
            <div className="bg-base-200 p-4 border-t border-base-300 text-sm text-center text-base-content/70">
              <span className="font-bold">Total Size:</span> 24 Bits (3 Bytes)
            </div>

          </div>
        </div>

      </div>
    </VisualizerLayout>
  );
};

export default ComputerScienceVisualizer;
