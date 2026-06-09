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
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-outline" style={{ display: 'inline-block', fontSize: '0.875rem' }}>&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>Wave Physics Simulator (3D)</h1>
        <p>A robust interactive 3D visualizer demonstrating wave interference, amplitude, and frequency.</p>
      </div>

      <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <div style={{ 
          width: '100%', height: '500px', 
          background: '#020617', 
          borderRadius: '8px', 
          overflow: 'hidden',
          cursor: 'grab',
          border: '1px solid var(--border-color)'
        }}>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Amplitude (Height)</span>
              <span style={{ fontWeight: 600 }}>{amplitude.toFixed(1)}</span>
            </label>
            <input 
              type="range" min="0" max="5" step="0.1" 
              value={amplitude} 
              onChange={(e) => setAmplitude(Number(e.target.value))} 
              style={{ width: '100%' }} 
            />
          </div>

          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Frequency (Cycles)</span>
              <span style={{ fontWeight: 600 }}>{frequency.toFixed(2)}</span>
            </label>
            <input 
              type="range" min="0.1" max="2" step="0.05" 
              value={frequency} 
              onChange={(e) => setFrequency(Number(e.target.value))} 
              style={{ width: '100%' }} 
            />
          </div>

          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Wave Speed</span>
              <span style={{ fontWeight: 600 }}>{speed.toFixed(1)}x</span>
            </label>
            <input 
              type="range" min="0" max="10" step="0.5" 
              value={speed} 
              onChange={(e) => setSpeed(Number(e.target.value))} 
              style={{ width: '100%' }} 
            />
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface-hover)', borderRadius: '4px', fontSize: '0.875rem' }}>
            <p><strong>Tip:</strong> Click and drag the 3D viewer to rotate the wave. Scroll to zoom in/out.</p>
          </div>
        </div>
      </div>

      <article className="article-content">
        <h2>Transverse Waves: Grade 10 Physics</h2>
        <p>A transverse wave is a moving wave whose oscillations are perpendicular to the direction of the wave's advance.</p>
        <ul>
          <li><strong>Amplitude:</strong> The maximum displacement from the rest position. A higher amplitude means a taller wave and generally carries more energy.</li>
          <li><strong>Frequency:</strong> The number of wave cycles that pass a fixed point per unit time. Higher frequency means more waves are visible in the same space.</li>
          <li><strong>Speed:</strong> How fast the wave propagates through the medium.</li>
        </ul>
      </article>
      <AdUnit slotId="1005" format="auto" />
    </div>
  );
};

export default WavePhysicsVisualizer;
