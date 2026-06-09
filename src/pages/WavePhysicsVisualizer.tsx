import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import AdUnit from '../components/AdUnit';

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
        color="#38bdf8" 
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
    <div className="w-full">
      <div className="mb-6">
        <Link to="/" className="btn btn-outline btn-sm">&larr; Back to Modules</Link>
      </div>
      <div className="pb-4 border-b border-base-300 mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Wave Physics Simulator (3D)</h1>
        <p className="text-base-content/80">A robust interactive 3D visualizer demonstrating wave interference, amplitude, and frequency.</p>
      </div>

      <div className="card lg:card-side bg-base-100 shadow-xl border border-base-200">
        <div className="w-full lg:w-2/3 h-[500px] bg-[#020617] rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none overflow-hidden cursor-grab active:cursor-grabbing border-b lg:border-b-0 lg:border-r border-base-300">
          <Canvas camera={{ position: [0, 8, 12], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
            <directionalLight position={[-10, 10, -5]} intensity={1} color="#60a5fa" />
            
            <WaveMesh amplitude={amplitude} frequency={frequency} speed={speed} />
            
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            {/* Optional: Add environment reflections to make it look premium */}
            <Environment preset="city" />
          </Canvas>
        </div>

        <div className="card-body lg:w-1/3 flex flex-col gap-6 justify-center">
          <div>
            <label className="flex justify-between mb-2 font-semibold text-sm text-base-content">
              <span>Amplitude (Height)</span>
              <span className="text-primary">{amplitude.toFixed(1)}</span>
            </label>
            <input 
              type="range" min="0" max="5" step="0.1" 
              value={amplitude} 
              onChange={(e) => setAmplitude(Number(e.target.value))} 
              className="range range-primary range-sm w-full" 
            />
          </div>

          <div>
            <label className="flex justify-between mb-2 font-semibold text-sm text-base-content">
              <span>Frequency (Cycles)</span>
              <span className="text-primary">{frequency.toFixed(2)}</span>
            </label>
            <input 
              type="range" min="0.1" max="2" step="0.05" 
              value={frequency} 
              onChange={(e) => setFrequency(Number(e.target.value))} 
              className="range range-primary range-sm w-full" 
            />
          </div>

          <div>
            <label className="flex justify-between mb-2 font-semibold text-sm text-base-content">
              <span>Wave Speed</span>
              <span className="text-primary">{speed.toFixed(1)}x</span>
            </label>
            <input 
              type="range" min="0" max="10" step="0.5" 
              value={speed} 
              onChange={(e) => setSpeed(Number(e.target.value))} 
              className="range range-primary range-sm w-full" 
            />
          </div>

          <div className="alert alert-info shadow-sm mt-4 text-sm">
            <span><strong>Tip:</strong> Click and drag the 3D viewer to rotate the wave. Scroll to zoom in/out.</span>
          </div>
        </div>
      </div>

      <article className="prose lg:prose-xl mt-12 pt-8 border-t border-base-300 max-w-none text-base-content">
        <h2 className="text-primary">Transverse Waves: Grade 10 Physics</h2>
        <p>A transverse wave is a moving wave whose oscillations are perpendicular to the direction of the wave's advance.</p>
        <ul>
          <li><strong>Amplitude:</strong> The maximum displacement from the rest position. A higher amplitude means a taller wave and generally carries more energy.</li>
          <li><strong>Frequency:</strong> The number of wave cycles that pass a fixed point per unit time. Higher frequency means more waves are visible in the same space.</li>
          <li><strong>Speed:</strong> How fast the wave propagates through the medium.</li>
        </ul>
      </article>
      <div className="mt-8">
        <AdUnit slotId="1005" format="auto" />
      </div>
    </div>
  );
};

export default WavePhysicsVisualizer;
