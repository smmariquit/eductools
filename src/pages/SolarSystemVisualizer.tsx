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
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-outline" style={{ display: 'inline-block', fontSize: '0.875rem' }}>&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>Solar System Explorer (3D)</h1>
        <p>A robust interactive 3D visualizer demonstrating planetary orbits and relative distances.</p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ 
          width: '100%', height: '500px', 
          background: '#000000', 
          borderRadius: '8px', 
          overflow: 'hidden',
          cursor: 'grab'
        }}>
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
                <div style={{ color: 'white', background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '4px', fontSize: '10px' }}>
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

        <div style={{ marginTop: '2rem', width: '100%', maxWidth: '600px' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span>Orbital Speed Multiplier: {speedMultiplier}x</span>
          </label>
          <input 
            type="range" min="0" max="5" step="0.5" 
            value={speedMultiplier} 
            onChange={(e) => setSpeedMultiplier(Number(e.target.value))} 
            style={{ width: '100%' }} 
          />
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
            Click and drag to rotate the camera. Scroll to zoom.
          </p>
        </div>
      </div>

      <article className="article-content">
        <h2>Earth and Space: Grade 6 Science</h2>
        <p>The solar system consists of the Sun and everything that orbits around it, bound by gravity. This robust 3D model allows you to explore the relative speeds and distances of the inner planets and Jupiter.</p>
        <h3>Planetary Motion</h3>
        <p>Notice that planets closer to the Sun (like Mercury) orbit much faster than planets further away (like Jupiter). This is described by Kepler's Laws of Planetary Motion.</p>
      </article>
      <AdUnit slotId="1000" format="auto" />
    </div>
  );
};

export default SolarSystemVisualizer;
