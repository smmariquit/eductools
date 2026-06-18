import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { MeasuredValue } from '../../components/scientific-units/UnitGuideLink';
import { IntroState, useIntroState } from '../../components/onboarding';

// Physical constants (SI).
const C = 2.998e8; // speed of light, m/s
const H = 6.626e-34; // Planck constant, J·s
const EV = 1.602e-19; // joules per electronvolt

// The slider controls log10(frequency). Increasing it raises frequency,
// which (via c = fλ) shortens the wavelength and (via E = hf) raises energy.
const LOG_F_MIN = 6; // 10^6 Hz  (radio)
const LOG_F_MAX = 21; // 10^21 Hz (gamma)
const DEFAULT_LOG_F = 14.7; // visible light

const SUPERSCRIPTS: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻',
};

// Format a number in scientific notation with unicode superscript exponent.
const formatSci = (value: number, digits = 2) => {
  if (value === 0) return '0';
  const exp = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exp);
  const expStr = String(exp).split('').map((ch) => SUPERSCRIPTS[ch] ?? ch).join('');
  return `${mantissa.toFixed(digits)} × 10${expStr}`;
};

const getSpectrumData = (freq: number) => {
  if (freq < 1e9) return { name: 'Radio Waves', desc: 'Used for AM/FM radio stations (e.g., DZBB, DZMM).', color: '#dc2626' };
  if (freq < 1e12) return { name: 'Microwaves', desc: 'Used for cell signals and warming leftover Adobo.', color: '#ea580c' };
  if (freq < 4e14) return { name: 'Infrared', desc: 'Felt as heat, used in TV remotes.', color: '#ca8a04' };
  if (freq < 7.9e14) return { name: 'Visible Light', desc: 'The colors we see (Bahaghari).', color: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' };
  if (freq < 1e16) return { name: 'Ultraviolet', desc: 'Causes sunburns when at the beach in Boracay.', color: '#8b5cf6' };
  if (freq < 1e19) return { name: 'X-Rays', desc: 'Used in hospitals for medical imaging.', color: '#c026d3' };
  return { name: 'Gamma Rays', desc: 'Highly penetrating, emitted by radioactive decay.', color: '#e11d48' };
};

const ElectromagneticSpectrumVisualizer = () => {
  const intro = useIntroState();
  const [logF, setLogF] = useState(DEFAULT_LOG_F);

  // Linked quantities — all derived from one source of truth (frequency).
  const frequency = Math.pow(10, logF); // Hz
  const wavelength = C / frequency; // metres (c = fλ)
  const energyJ = H * frequency; // joules (E = hf)
  const energyEv = energyJ / EV; // electronvolts

  const data = getSpectrumData(frequency);

  // More cycles drawn at higher frequency → visibly shorter wavelength.
  const cycles = Math.max(1, Math.round((logF - LOG_F_MIN) / (LOG_F_MAX - LOG_F_MIN) * 26) + 1);
  const wavePath = `M ${Array.from({ length: 101 }).map((_, x) => {
    const y = 10 - 8 * Math.sin((x / 100) * cycles * 2 * Math.PI);
    return `${x === 0 ? '' : 'L '}${x} ${y.toFixed(2)}`;
  }).join(' ')}`;

  const reset = () => setLogF(DEFAULT_LOG_F);

  return (
    <VisualizerLayout
      title="Electromagnetic Spectrum (Mga Uri ng Radiation)"
      description="Explore the relationship between wavelength, frequency, and real-world energy applications."
      adSlotId="2007"
      guideLink="/blog/electromagnetic-spectrum"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center p-6 md:p-10">
          {!intro.started ? (
            <IntroState
              lead="Slide across the spectrum from radio waves to gamma rays and see how frequency, wavelength, and photon energy are linked."
              actionLabel="Explore the spectrum"
              onStart={intro.start}
            />
          ) : (
          <>

          {/* Wave visualizer */}
          <div className="w-full h-[200px] bg-neutral rounded-xl relative overflow-hidden border border-base-300 mb-8 shadow-inner flex items-center justify-center">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-[80%] opacity-90">
              <path
                d={wavePath}
                fill="none"
                stroke={data.name === 'Visible Light' ? 'white' : data.color}
                strokeWidth="0.5"
                style={{ transition: 'all 0.3s ease-in-out' }}
              />
            </svg>
            <div className="absolute top-4 left-4 text-white/50 text-xs tracking-widest font-mono">
              {cycles} CYCLES SHOWN
            </div>
          </div>

          <div className="w-full max-w-2xl">
            <div
              className="flex flex-col sm:flex-row justify-between mb-6 p-6 shadow-md rounded-xl text-white"
              style={{ background: data.color }}
            >
              <div>
                <div className="text-3xl font-extrabold drop-shadow-md">{data.name}</div>
                <div className="mt-2 text-sm opacity-90 drop-shadow-sm">{data.desc}</div>
              </div>
            </div>

            {/* Linked numeric readouts: c = fλ and E = hf */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6" aria-live="polite">
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Frequency (f)</div>
                <MeasuredValue value={formatSci(frequency)} unit="Hz" valueClassName="text-lg font-bold font-mono text-primary" />
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Wavelength (λ)</div>
                <MeasuredValue value={formatSci(wavelength)} unit="m" valueClassName="text-lg font-bold font-mono text-secondary" />
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Photon Energy (E)</div>
                <MeasuredValue value={formatSci(energyEv)} unit="eV" valueClassName="text-lg font-bold font-mono text-accent" />
                <div className="text-[0.65rem] font-mono text-base-content/50">
                  <MeasuredValue value={formatSci(energyJ)} unit="J" />
                </div>
              </div>
            </div>

            <div className="bg-base-200 p-3 rounded-lg border border-base-300 text-xs font-mono text-base-content/70 mb-6 text-center">
              c = fλ = {formatSci(frequency)} Hz × {formatSci(wavelength)} m ≈ {formatSci(frequency * wavelength)} m/s &nbsp;•&nbsp; E = hf
            </div>

            <Slider
              id="freq-slider"
              motif="frequency"
              label="Frequency (log scale)"
              value={logF}
              min={LOG_F_MIN}
              max={LOG_F_MAX}
              step={0.05}
              colorClass="primary"
              formatValue={() => `${data.name}: ${formatSci(frequency)} Hz`}
              onChange={(e) => setLogF(Number(e.target.value))}
              aria-valuetext={`${data.name}: frequency ${formatSci(frequency)} hertz, wavelength ${formatSci(wavelength)} meters, energy ${formatSci(energyEv)} electronvolts`}
            />

            <div className="flex justify-between text-xs sm:text-sm text-base-content/60 mt-3 font-semibold">
              <span className="text-left">Low Frequency<br/>Long Wavelength · Low Energy</span>
              <span className="text-right">High Frequency<br/>Short Wavelength · High Energy</span>
            </div>

            <div className="flex justify-center mt-6">
              <button className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default ElectromagneticSpectrumVisualizer;
