import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import AdUnit from '../components/AdUnit';

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
        <div style={{ color: 'white', background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '4px', fontSize: '10px' }}>
          {name}
        </div>
      </Html>
      {/* Orbit ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        {/* We can't easily draw an orbit ring inside the moving group. We will draw them centrally later. */}
      </mesh>
    </group>
  );
};

// Component for the static orbit paths
const OrbitPath = ({ radius }: { radius: number }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
      <meshBasicMaterial color="rgba(255, 255, 255, 0.1)" side={THREE.DoubleSide} transparent />
    </mesh>
  );
};

const SolarSystemVisualizer = () => {
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const planets = [
    { name: 'Mercury', color: '#888888', radius: 0.3, distance: 4, speed: 0.8 * speedMultiplier, labelY: 0.8 },
    { name: 'Venus', color: '#eab308', radius: 0.5, distance: 7, speed: 0.6 * speedMultiplier, labelY: 1.0 },
    { name: 'Earth', color: '#3b82f6', radius: 0.6, distance: 10, speed: 0.4 * speedMultiplier, labelY: 1.2 },
    { name: 'Mars', color: '#ef4444', radius: 0.4, distance: 13, speed: 0.3 * speedMultiplier, labelY: 1.0 },
    { name: 'Jupiter', color: '#f59e0b', radius: 1.5, distance: 18, speed: 0.1 * speedMultiplier, labelY: 2.5 }
  ];

  return (
  return (
    <div className="w-full">
      <div className="mb-6">
        <Link to="/" className="btn btn-outline btn-sm">&larr; Back to Modules</Link>
      </div>
      <div className="pb-4 border-b border-base-300 mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Solar System Explorer (3D)</h1>
        <p className="text-base-content/80">A robust interactive 3D visualizer demonstrating planetary orbits and relative distances.</p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center p-4 md:p-8">
          <div className="w-full h-[500px] bg-black rounded-xl overflow-hidden cursor-grab active:cursor-grabbing border border-base-300">
            <Canvas camera={{ position: [0, 15, 30], fov: 45 }}>
              <ambientLight intensity={0.1} />
              {/* The Sun acts as a point light source */}
              <pointLight position={[0, 0, 0]} intensity={1000} distance={100} color="#ffecd4" />
              
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              
              {/* Sun */}
              <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="#facc15" />
                <Html distanceFactor={15} position={[0, 3, 0]} center>
                  <div className="text-white bg-black/50 px-2 py-0.5 rounded text-[10px]">
                    Sun
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
          </div>

          <div className="mt-8 w-full max-w-2xl bg-base-200 p-6 rounded-xl border border-base-300">
            <label className="flex justify-between mb-4 font-semibold text-base-content">
              <span>Orbital Speed Multiplier:</span>
              <span className="text-primary">{speedMultiplier}x</span>
            </label>
            <input 
              type="range" min="0" max="5" step="0.5" 
              value={speedMultiplier} 
              onChange={(e) => setSpeedMultiplier(Number(e.target.value))} 
              className="range range-primary w-full" 
            />
            <p className="mt-4 text-sm text-base-content/60 text-center font-medium">
              Click and drag to rotate the camera. Scroll to zoom.
            </p>
          </div>
        </div>
      </div>

      <article className="prose lg:prose-xl mt-12 pt-8 border-t border-base-300 max-w-none text-base-content">
        <h2 className="text-primary">Earth and Space: Grade 6 Science</h2>
        <p>The solar system consists of the Sun and everything that orbits around it, bound by gravity. This robust 3D model allows you to explore the relative speeds and distances of the inner planets and Jupiter.</p>
        <h3>Planetary Motion</h3>
        <p>Notice that planets closer to the Sun (like Mercury) orbit much faster than planets further away (like Jupiter). This is described by Kepler's Laws of Planetary Motion.</p>
      </article>
      <div className="mt-8">
        <AdUnit slotId="1000" format="auto" />
      </div>
    </div>
  );
};

export default SolarSystemVisualizer;
