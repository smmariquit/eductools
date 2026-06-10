import WavePhysicsMdx from '../../content/blog/wave-physics.mdx';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import VisualizerLayout from '../../components/VisualizerLayout';

const WaveMesh = ({ amplitude, frequency, speed }: { amplitude: number, frequency: number, speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);

  // We create a grid of vertices
  const [gridSize, segments] = [20, 64];

  useFrame(({ clock }) => {
    if (!geometryRef.current) return;
    const t = clock.getElapsedTime() * speed;
    const position = geometryRef.current.attributes.position;

    // Modulate the Z position of each vertex based on its X and Y and time
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      
      // Calculate a 3D wave interference pattern
      const z = Math.sin(x * frequency + t) * Math.cos(y * frequency + t) * amplitude;
      position.setZ(i, z);
    }
    
    position.needsUpdate = true;
    geometryRef.current.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry ref={geometryRef} args={[gridSize, gridSize, segments, segments]} />
      <meshStandardMaterial 
        color="#0ea5e9" 
        wireframe={false} 
        roughness={0.1}
        metalness={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const WavePhysicsVisualizer = () => {
  const [amplitude, setAmplitude] = useState(2);
  const [frequency, setFrequency] = useState(0.5);
  const [speed, setSpeed] = useState(2);

  return (
    <VisualizerLayout
      title="Mga Alon (Wave Physics)"
      description="Interactive 3D visualizer demonstrating mechanical wave interference, amplitude, and frequency."
      adSlotId="1005"
      educationalContent={<WavePhysicsMdx />}
    >
      <div className="card lg:card-side bg-base-100 shadow-xl border border-base-200 overflow-hidden">
        <div className="w-full lg:w-2/3 h-[400px] md:h-[500px] bg-[#020617] cursor-grab active:cursor-grabbing relative border-b lg:border-b-0 lg:border-r border-base-300">
          <Canvas camera={{ position: [0, 8, 12], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
            <directionalLight position={[-10, 10, -5]} intensity={1} color="#60a5fa" />
            
            <WaveMesh amplitude={amplitude} frequency={frequency} speed={speed} />
            
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            <Environment preset="city" />
          </Canvas>
          <div className="absolute bottom-4 left-4 bg-black/50 p-2 rounded text-xs text-white/50 pointer-events-none">
            Drag to rotate, scroll to zoom
          </div>
        </div>

        <div className="card-body lg:w-1/3 flex flex-col gap-6 justify-center bg-base-100">
          <div>
            <label className="flex justify-between mb-2 font-semibold text-sm">
              <span>Laki ng Alon (Amplitude)</span>
              <span className="text-primary font-mono">{amplitude.toFixed(1)}</span>
            </label>
            <input 
              type="range" min="0" max="5" step="0.1" 
              value={amplitude} 
              onChange={(e) => setAmplitude(Number(e.target.value))} 
              className="range range-primary range-sm w-full" 
            />
          </div>

          <div>
            <label className="flex justify-between mb-2 font-semibold text-sm">
              <span>Dalas (Frequency)</span>
              <span className="text-secondary font-mono">{frequency.toFixed(2)}</span>
            </label>
            <input 
              type="range" min="0.1" max="2" step="0.05" 
              value={frequency} 
              onChange={(e) => setFrequency(Number(e.target.value))} 
              className="range range-secondary range-sm w-full" 
            />
          </div>

          <div>
            <label className="flex justify-between mb-2 font-semibold text-sm">
              <span>Bilis (Speed)</span>
              <span className="text-accent font-mono">{speed.toFixed(1)}</span>
            </label>
            <input 
              type="range" min="0.1" max="5" step="0.1" 
              value={speed} 
              onChange={(e) => setSpeed(Number(e.target.value))} 
              className="range range-accent range-sm w-full" 
            />
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default WavePhysicsVisualizer;
