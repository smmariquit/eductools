import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import VisualizerLayout from '../../components/VisualizerLayout';
import { IntroState, useIntroState } from '../../components/onboarding';

// Real mean orbital radii in astronomical units (AU). Source: NASA planetary
// fact sheets. We place orbits on a log scale so inner and outer planets fit.
const AU_MIN = 0.39; // Mercury
const AU_MAX = 30.05; // Neptune
const logMin = Math.log10(AU_MIN);
const logMax = Math.log10(AU_MAX);
const SCENE_MIN = 4;
const SCENE_MAX = 28;
const sceneDistance = (au: number) => SCENE_MIN + ((Math.log10(au) - logMin) / (logMax - logMin)) * (SCENE_MAX - SCENE_MIN);

interface PlanetData {
  name: string;
  color: string;
  radius: number;
  au: number;
  speed: number;
  labelY: number;
}

// Planet body colours are genuinely domain-specific, so they stay as fixed hex.
const PLANETS: PlanetData[] = [
  { name: 'Merkuryo (Mercury)', color: '#9a8478', radius: 0.30, au: 0.39, speed: 0.80, labelY: 0.9 },
  { name: 'Venus', color: '#d9a441', radius: 0.45, au: 0.72, speed: 0.60, labelY: 1.0 },
  { name: 'Mundo (Earth)', color: '#2f8fe6', radius: 0.50, au: 1.00, speed: 0.45, labelY: 1.1 },
  { name: 'Mars', color: '#c1440e', radius: 0.40, au: 1.52, speed: 0.35, labelY: 1.0 },
  { name: 'Jupiter', color: '#caa472', radius: 1.10, au: 5.20, speed: 0.18, labelY: 1.7 },
  { name: 'Saturn', color: '#e3c98b', radius: 1.00, au: 9.58, speed: 0.13, labelY: 1.6 },
  { name: 'Uranus', color: '#9fe3e0', radius: 0.80, au: 19.2, speed: 0.09, labelY: 1.4 },
  { name: 'Neptune', color: '#3b6fd4', radius: 0.80, au: 30.05, speed: 0.07, labelY: 1.4 },
];

const Planet = ({ name, color, radius, distance, speed, labelY, animate }: {
  name: string; color: string; radius: number; distance: number; speed: number; labelY: number; animate: boolean;
}) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = animate ? clock.getElapsedTime() * speed : 0;
    ref.current.position.x = Math.cos(t) * distance;
    ref.current.position.z = Math.sin(t) * distance;
    if (animate) ref.current.rotation.y += 0.01;
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
      </mesh>
      <Html distanceFactor={18} position={[0, labelY, 0]} center>
        <div className="text-white bg-black/60 px-2 py-0.5 rounded border border-white/20 text-[10px] font-semibold backdrop-blur-sm shadow-lg whitespace-nowrap">
          {name}
        </div>
      </Html>
    </group>
  );
};

const OrbitPath = ({ radius }: { radius: number }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]}>
    <ringGeometry args={[radius - 0.04, radius + 0.04, 96]} />
    <meshBasicMaterial color="#ffffff" opacity={0.15} side={THREE.DoubleSide} transparent />
  </mesh>
);

const DEFAULT_SPEED = 1;

const SolarSystemVisualizer = () => {
  const intro = useIntroState();
  // Respect prefers-reduced-motion: freeze the orbits by default.
  const [speedMultiplier, setSpeedMultiplier] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      ? 0
      : DEFAULT_SPEED,
  );

  const animate = speedMultiplier > 0;
  const reset = () => setSpeedMultiplier(DEFAULT_SPEED);

  return (
    <VisualizerLayout
      title="Ang Sistema Solar (Solar System)"
      description="The eight planets orbiting the Sun, with orbits drawn on a log scale so the inner and outer planets all fit on one screen. Distances and planet sizes are not shown to scale."
      adSlotId="1009"
      guideLink="/blog/solar-system"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-4 md:p-6 gap-6">
          {!intro.started ? (
            <IntroState
              lead="Watch the eight planets orbit the Sun and compare their real distances on a log scale."
              actionLabel="Explore the solar system"
              onStart={intro.start}
            />
          ) : (
            <>
          <div className="w-full h-[400px] md:h-[520px] bg-black rounded-xl overflow-hidden cursor-grab active:cursor-grabbing border border-base-300 relative">
            <Canvas camera={{ position: [0, 22, 48], fov: 45 }}>
              <ambientLight intensity={0.15} />
              <pointLight position={[0, 0, 0]} intensity={1200} distance={120} color="#ffecd4" />
              <Stars radius={120} depth={50} count={5000} factor={4} saturation={0} fade speed={animate ? 1 : 0} />
              <OrbitControls enablePan enableZoom enableRotate />

              <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="#facc15" />
                <Html distanceFactor={18} position={[0, 3, 0]} center>
                  <div className="text-yellow-300 bg-black/60 px-2 py-0.5 rounded border border-yellow-300/30 text-[12px] font-bold">Araw (Sun)</div>
                </Html>
              </mesh>

              {PLANETS.map((p) => (
                <group key={p.name}>
                  <OrbitPath radius={sceneDistance(p.au)} />
                  <Planet
                    name={p.name}
                    color={p.color}
                    radius={p.radius}
                    distance={sceneDistance(p.au)}
                    speed={p.speed * speedMultiplier}
                    labelY={p.labelY}
                    animate={animate}
                  />
                </group>
              ))}
            </Canvas>

            {/* Not-to-scale legend */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm p-2.5 rounded-lg border border-white/20 text-white text-[11px] max-w-[210px] pointer-events-none">
              <div className="font-bold mb-0.5">Not to scale</div>
              <p className="m-0 opacity-80 leading-snug">Orbit spacing uses a log scale and planet sizes are exaggerated, so everything is visible at once. Real distances are in the table below.</p>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded text-[11px] text-white/60 pointer-events-none">
              Scroll to zoom, drag to rotate
            </div>
          </div>

          {/* Speed control */}
          <div className="bg-base-200 p-4 rounded-xl border border-base-300">
            <label htmlFor="orbit-speed" className="flex justify-between mb-2 font-semibold text-sm">
              <span>Bilis ng Pag-ikot (Orbital Speed)</span>
              <span className="text-primary font-mono">{speedMultiplier.toFixed(1)}×</span>
            </label>
            <input
              id="orbit-speed"
              type="range" min="0" max="5" step="0.1"
              value={speedMultiplier}
              onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
              className="range range-primary w-full"
              aria-valuetext={speedMultiplier === 0 ? 'paused' : `${speedMultiplier.toFixed(1)} times speed`}
            />
            {speedMultiplier === 0 && <p className="text-xs text-base-content/60 mt-2 m-0">Orbits are paused. Drag the slider to start the planets moving.</p>}
          </div>

          {/* Real distances table */}
          <div className="bg-base-200 p-4 rounded-xl border border-base-300 overflow-x-auto">
            <h3 className="font-display font-bold text-base-content m-0 mb-2">Real orbital distances</h3>
            <table className="table table-sm">
              <thead>
                <tr><th>Planet</th><th className="text-right">Distance from Sun (AU)</th><th className="text-right">≈ million km</th></tr>
              </thead>
              <tbody>
                {PLANETS.map((p) => (
                  <tr key={p.name}>
                    <td className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} aria-hidden="true" />
                      {p.name}
                    </td>
                    <td className="text-right font-mono">{p.au.toFixed(2)}</td>
                    <td className="text-right font-mono">{Math.round(p.au * 149.6)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-base-content/60 mt-2 m-0">1 AU = the average Earth–Sun distance ≈ 149.6 million km. Neptune is about 77× farther from the Sun than Mercury, which is why a linear map can't show them together.</p>
          </div>

          <div className="flex justify-end">
            <button type="button" className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
          </div>
            </>
          )}
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default SolarSystemVisualizer;
