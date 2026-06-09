import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';

const ElectromagneticSpectrumVisualizer = () => {
  const [wavelength, setWavelength] = useState(5); // 0 to 10 scale
  
  const getSpectrumData = (val: number) => {
    if (val < 2) return { name: 'Radio Waves', freq: '10^4 Hz', color: '#dc2626' };
    if (val < 4) return { name: 'Microwaves', freq: '10^8 Hz', color: '#ea580c' };
    if (val < 6) return { name: 'Infrared', freq: '10^12 Hz', color: '#ca8a04' };
    if (val < 7) return { name: 'Visible Light', freq: '10^15 Hz', color: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' };
    if (val < 8) return { name: 'Ultraviolet', freq: '10^16 Hz', color: '#8b5cf6' };
    if (val < 9) return { name: 'X-Rays', freq: '10^18 Hz', color: '#c026d3' };
    return { name: 'Gamma Rays', freq: '10^20 Hz', color: '#e11d48' };
  };

  const data = getSpectrumData(wavelength);
  // Frequency visual (higher wave frequency for higher values)
  const waveCount = wavelength * 2 + 1;

  return (
    <div className="page-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" className="btn btn-outline">&larr; Back to Modules</Link>
      </div>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>Electromagnetic Spectrum</h1>
        <p>Explore the relationship between wavelength, frequency, and energy.</p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Wave visualizer */}
        <div style={{ width: '100%', height: '200px', background: 'var(--bg-color)', position: 'relative', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d={`M 0 10 ${Array.from({length: waveCount}).map((_, i) => `Q ${i*100/waveCount + 50/waveCount} ${i%2===0 ? 0 : 20}, ${(i+1)*100/waveCount} 10`).join(' ')}`} fill="none" stroke={data.name === 'Visible Light' ? 'white' : data.color} strokeWidth="0.5" />
          </svg>
        </div>

        <div style={{ width: '100%', maxWidth: '600px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '1rem', background: data.color.startsWith('linear') ? data.color : data.color, color: 'white', borderRadius: '4px', fontWeight: 'bold' }}>
            <span>{data.name}</span>
            <span>Freq: ~{data.freq}</span>
          </div>
          <input type="range" min="0" max="10" step="0.1" value={wavelength} onChange={e => setWavelength(Number(e.target.value))} style={{ width: '100%' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            <span>Long Wavelength / Low Energy</span>
            <span>Short Wavelength / High Energy</span>
          </div>
        </div>
      </div>

      <article className="article-content">
        <h2>Electromagnetic Radiation: Grade 10 Physics</h2>
        <p>The electromagnetic (EM) spectrum is the range of all types of EM radiation. Radiation is energy that travels and spreads out as it goes.</p>
        <p>As you move from Radio Waves to Gamma Rays, the <strong>wavelength decreases</strong> while the <strong>frequency and energy increase</strong>.</p>
      </article>
      <AdUnit slotId="2007" format="auto" />
    </div>
  );
};
export default ElectromagneticSpectrumVisualizer;
