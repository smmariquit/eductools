import { useState } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';

const DensityVisualizer = () => {
  const [mass, setMass] = useState(600); // kg
  const [volume, setVolume] = useState(1.0); // m^3

  const density = mass / volume; // kg/m^3
  const isFloating = density < 1000;
  
  // Calculate visual size based on volume (cube root).
  // 1 m^3 = 60px size roughly.
  const sideLength = Math.cbrt(volume) * 60;
  
  // Density ratio compared to water
  const densityRatio = density / 1000;

  // Top is 0, Water surface is at 150px, Bottom is at 350px
  let dropPosition = 0;
  if (isFloating) {
    // If floating, the proportion of the block submerged equals the density ratio.
    dropPosition = 150 - sideLength * (1 - densityRatio);
  } else {
    // Sinking to the bottom
    dropPosition = 350 - sideLength;
  }

  // Helper to set preset materials
  const setPreset = (m: number, v: number) => {
    setMass(m);
    setVolume(v);
  };

  return (
    <VisualizerLayout
      title="Density & Buoyancy Simulator"
      description="Observe Archimedes' principle using Mass, Volume, and Density."
      adSlotId="2004"
      educationalContent={
        <>
          <h2>Properties of Matter: Grade 7 Science</h2>
          <p>Density ($\rho$) is a measure of mass ($m$) per unit of volume ($V$). The formula is <strong>$\rho = m/V$</strong>.</p>
          <p>The density of pure water is <strong>1000 kg/m³</strong>. According to Archimedes' principle, an object will float if its density is less than the fluid it is in. The fraction of the volume submerged is proportional to the ratio of the object's density to the fluid's density.</p>
        </>
      }
    >
      <div className="card flex-col gap-2">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: 'var(--surface-hover)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 600, gap: '0.5rem', marginBottom: '1rem' }}>
              Mass ($m$): <span style={{ color: 'var(--accent-color)', fontSize: '1.25rem' }}>{mass} kg</span>
              <input type="range" min="100" max="3000" step="50" value={mass} onChange={e => setMass(Number(e.target.value))} style={{ width: '100%' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 600, gap: '0.5rem' }}>
              Volume ($V$): <span style={{ color: 'var(--accent-color)', fontSize: '1.25rem' }}>{volume.toFixed(1)} m³</span>
              <input type="range" min="0.1" max="3.0" step="0.1" value={volume} onChange={e => setVolume(Number(e.target.value))} style={{ width: '100%' }} />
            </label>
          </div>
          
          <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Calculation:</strong><br/>
              $\rho = {mass} \div {volume.toFixed(1)} = $<span style={{ fontSize: '1.5rem', color: isFloating ? '#10b981' : '#ef4444' }}>{density.toFixed(0)} kg/m³</span>
            </div>
            <div>
              <strong>Water Density:</strong> 1000 kg/m³<br/>
              <strong>Status:</strong> {isFloating ? 'Floating' : 'Sinking'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button onClick={() => setPreset(600, 1.0)} className="btn btn-outline btn-sm">Wood (600 kg/m³)</button>
          <button onClick={() => setPreset(920, 1.0)} className="btn btn-outline btn-sm">Ice (920 kg/m³)</button>
          <button onClick={() => setPreset(2000, 1.0)} className="btn btn-outline btn-sm">Brick (2000 kg/m³)</button>
          <button onClick={() => setPreset(1000, 1.0)} className="btn btn-outline btn-sm">Water Balloon (1000 kg/m³)</button>
        </div>

        <div style={{ position: 'relative', height: '350px', background: 'var(--bg-color)', border: '2px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
          {/* Air level */}
          <div style={{ position: 'absolute', top: 0, width: '100%', height: '150px', background: 'transparent' }} />
          
          {/* Water level */}
          <div style={{ position: 'absolute', top: '150px', bottom: 0, width: '100%', background: 'rgba(56, 189, 248, 0.2)', borderTop: '2px dashed #38bdf8' }}>
            <span style={{ position: 'absolute', top: '5px', right: '10px', color: '#38bdf8', fontSize: '0.8rem' }}>Water Surface</span>
          </div>
          
          {/* Object */}
          <div style={{ 
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            top: `${dropPosition}px`,
            width: `${sideLength}px`, height: `${sideLength}px`, 
            background: isFloating ? '#b45309' : '#dc2626',
            transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
            border: '2px solid rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem', textShadow: '1px 1px 2px black' }}>
              {mass}kg
            </span>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default DensityVisualizer;
