import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import VisualizerLayout from '../components/VisualizerLayout';

// Component for individual planets
const Planet = ({ 
  name, color, radius, distance, speed, labelY 
}: { 
  name: string, color: string, radius: number, distance: number, speed: number, labelY: number 
}) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed;
      ref.current.position.x = Math.cos(t) * distance;
      ref.current.position.z = Math.sin(t) * distance;
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
      </mesh>
      <Html distanceFactor={15} position={[0, labelY, 0]} center>
        <div className="text-white bg-black/60 px-2 py-0.5 rounded border border-white/20 text-[10px] font-semibold backdrop-blur-sm shadow-lg whitespace-nowrap">
          {name}
        </div>
      </Html>
    </group>
  );
};

// Component for the static orbit paths
const OrbitPath = ({ radius }: { radius: number }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
      <meshBasicMaterial color="rgba(255, 255, 255, 0.15)" side={THREE.DoubleSide} transparent />
    </mesh>
  );
};

const SolarSystemVisualizer = () => {
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const planets = [
    { name: 'Merkuryo (Mercury)', color: '#888888', radius: 0.3, distance: 4, speed: 0.8 * speedMultiplier, labelY: 0.8 },
    { name: 'Venus', color: '#eab308', radius: 0.5, distance: 7, speed: 0.6 * speedMultiplier, labelY: 1.0 },
    { name: 'Mundo (Earth)', color: '#3b82f6', radius: 0.6, distance: 10, speed: 0.4 * speedMultiplier, labelY: 1.2 },
    { name: 'Mars', color: '#ef4444', radius: 0.4, distance: 13, speed: 0.3 * speedMultiplier, labelY: 1.0 },
    { name: 'Jupiter', color: '#f59e0b', radius: 1.5, distance: 18, speed: 0.1 * speedMultiplier, labelY: 2.5 }
  ];

  return (
    <VisualizerLayout
      title="Ang Sistema Solar (Solar System)"
      description="Interactive 3D visualizer demonstrating planetary orbits and relative distances."
      adSlotId="1009"
      educationalContent={
        <>
          <h2>Earth and Space: Grade 6 Science</h2>
          <p>The Solar System consists of the Sun and the astronomical objects bound to it by gravity. Historically, ancient Filipinos (like pre-colonial Visayans and Tagalogs) used the stars and planets for navigation and agriculture, observing cycles to know when to plant crops.</p>
          <h3>Planetary Orbits</h3>
          <p>Notice how planets closer to the Sun (like Merkuryo) travel much faster and have shorter orbital periods compared to gas giants like Jupiter, due to stronger gravitational pull.</p>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-4 md:p-6">
          <div className="w-full h-[400px] md:h-[500px] bg-black rounded-xl overflow-hidden cursor-grab active:cursor-grabbing border border-base-300 relative">
            <Canvas camera={{ position: [0, 15, 30], fov: 45 }}>
              <ambientLight intensity={0.1} />
              <pointLight position={[0, 0, 0]} intensity={1000} distance={100} color="#ffecd4" />
              
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              
              {/* Sun */}
              <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="#facc15" />
                <Html distanceFactor={15} position={[0, 3, 0]} center>
                  <div className="text-yellow-400 bg-black/60 px-2 py-0.5 rounded border border-yellow-400/30 text-[12px] font-bold">
                    Araw (Sun)
                  </div>
                </Html>
              </mesh>

              {/* Planets and their orbits */}
              {planets.map((p, i) => (
                <group key={i}>
                  <OrbitPath radius={p.distance} />
                  <Planet {...p} />
                </group>
              ))}
            </Canvas>
            
            <div className="absolute bottom-4 left-4 bg-black/50 p-2 rounded text-xs text-white/50 pointer-events-none">
              Scroll to zoom, drag to rotate
            </div>
          </div>

          <div className="mt-6 bg-base-200 p-4 rounded-xl border border-base-300">
            <label className="flex justify-between mb-2 font-semibold text-sm">
              <span>Bilis ng Pag-ikot (Orbital Speed Multiplier)</span>
              <span className="text-primary">{speedMultiplier.toFixed(1)}x</span>
            </label>
            <input 
              type="range" min="0.1" max="5" step="0.1" 
              value={speedMultiplier} 
              onChange={(e) => setSpeedMultiplier(Number(e.target.value))} 
              className="range range-primary w-full" 
            />
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default SolarSystemVisualizer;
