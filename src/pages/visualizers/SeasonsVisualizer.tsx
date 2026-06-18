import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { IntroState, useIntroState } from '../../components/onboarding';
import { PhilippinesMap } from '../../components/maps/PhilippinesMap';

const AXIAL_TILT = 23.5; // degrees
const MANILA_LAT = 14.6; // °N
const DEFAULT_MONTH = 6;

// Sub-solar latitude (solar declination), simplified to a cosine of the year.
// June solstice → +23.5°N, December solstice → −23.5° (S), equinoxes → 0°.
const declination = (month: number) => AXIAL_TILT * Math.cos((2 * Math.PI * (month - 6)) / 12);

// Northern-hemisphere TEMPERATE season (the thing axial tilt actually causes).
const nHemisphereSeason = (m: number) => {
  if (m >= 3 && m <= 5) return 'Spring';
  if (m >= 6 && m <= 8) return 'Summer';
  if (m >= 9 && m <= 11) return 'Autumn';
  return 'Winter';
};

// Philippine wet/dry pattern — driven by the MONSOON, not by tilt.
const getPhilippineMonsoon = (m: number) => {
  if (m >= 6 && m <= 11) {
    return {
      wind: 'Habagat (Southwest Monsoon)',
      season: 'Tag-ulan (Wet Season)',
      rot: -45, // arrows blow toward the NE
      badge: 'badge-info',
      note: 'Warm, moisture-laden air sweeps in from the southwest, bringing heavy rain.',
    };
  }
  if (m === 12 || m <= 2) {
    return {
      wind: 'Amihan (Northeast Monsoon)',
      season: 'Tag-lamig (Cool, Dry)',
      rot: 135, // arrows blow toward the SW
      badge: 'badge-primary',
      note: 'Cool, dry air flows from the northeast off the Asian landmass.',
    };
  }
  return {
    wind: 'Easterlies / weakening Amihan',
    season: 'Tag-init (Hot, Dry)',
    rot: 180, // arrows blow toward the W
    badge: 'badge-warning',
    note: 'Winds ease and skies clear; the hottest, driest stretch before the rains.',
  };
};

const SeasonsVisualizer = () => {
  const intro = useIntroState();
  const [month, setMonth] = useState(DEFAULT_MONTH);

  const dec = declination(month);
  const hemiToward = dec > 1 ? 'Northern' : dec < -1 ? 'Southern' : 'Neither (equinox)';
  const subSolar = `${Math.abs(dec).toFixed(1)}°${dec >= 0 ? 'N' : 'S'}`;
  const monsoon = getPhilippineMonsoon(month);
  const monthName = new Date(2024, month - 1).toLocaleString('default', { month: 'long' });

  // Orbital position: June on the left of the Sun, December on the right.
  // The axis keeps a FIXED direction in space, so it leans toward the Sun on
  // one side of the orbit and away half a year later.
  const theta = (180 - ((month - 6) / 12) * 360) * (Math.PI / 180);
  const orbitR = 105;
  const earthX = 160 + orbitR * Math.cos(theta);
  const earthY = 160 + orbitR * Math.sin(theta);

  const reset = () => setMonth(DEFAULT_MONTH);

  return (
    <VisualizerLayout
      title="Panahon sa Pilipinas (Seasons & Monsoons)"
      description="Why axial tilt gives temperate places four seasons — and why the Philippines' wet and dry seasons come from the monsoon instead."
      adSlotId="2003"
      guideLink="/blog/seasons"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 gap-6">
          {!intro.started ? (
            <IntroState
              lead="Drag through the months to see how axial tilt gives temperate places four seasons while the monsoon drives the Philippine wet and dry seasons."
              actionLabel="Start"
              onStart={intro.start}
            />
          ) : (
            <>

          {/* Shared month control */}
          <div className="bg-base-200 p-5 rounded-xl border border-base-300">
            <Slider
              id="month"
              motif="orbit"
              label="Month"
              value={month}
              min={1}
              max={12}
              colorClass="primary"
              readout={<span className="text-2xl font-bold">{monthName}</span>}
              onChange={(e) => setMonth(Number(e.target.value))}
              aria-valuetext={monthName}
            />
            <div className="w-full flex justify-between text-xs px-1 mt-2 text-base-content/50">
              <span>Jan</span><span>Jun</span><span>Dec</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">

            {/* Panel A — Axial tilt → temperate four seasons */}
            <div className="rounded-xl border border-base-300 bg-base-200/40 p-5 flex flex-col">
              <h2 className="font-display text-lg font-bold text-base-content m-0 mb-1">A · Axial Tilt &amp; Sunlight Angle</h2>
              <p className="text-sm text-base-content/70 m-0 mb-4">The real cause of <strong>temperate four-season</strong> climates.</p>

              <svg viewBox="0 0 320 320" className="w-full max-w-[340px] mx-auto">
                {/* Orbit */}
                <circle cx="160" cy="160" r={orbitR} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="4 5" />
                {/* Sun */}
                <circle cx="160" cy="160" r="26" fill="#f5a800" />
                <circle cx="160" cy="160" r="26" fill="none" stroke="#f5a800" strokeOpacity="0.4" strokeWidth="10" />
                <text x="160" y="205" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.6">Sun (Araw)</text>

                {/* Earth */}
                <g>
                  {/* lit hemisphere hint: a ray from the sun to earth */}
                  <line x1="160" y1="160" x2={earthX} y2={earthY} stroke="#f5a800" strokeOpacity="0.35" strokeWidth="2" />
                  <circle cx={earthX} cy={earthY} r="18" fill="#2f8fe6" stroke="#1e3a8a" strokeWidth="1.5" />
                  {/* equator */}
                  <line x1={earthX - 18} y1={earthY} x2={earthX + 18} y2={earthY} stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1" />
                  {/* fixed-direction tilted axis (N pole leans toward upper-right) */}
                  <g transform={`rotate(-${AXIAL_TILT} ${earthX} ${earthY})`}>
                    <line x1={earthX} y1={earthY - 28} x2={earthX} y2={earthY + 28} stroke="#ff6b8a" strokeWidth="2" />
                    <circle cx={earthX} cy={earthY - 28} r="3" fill="#ff6b8a" />
                    <text x={earthX + 5} y={earthY - 28} fontSize="9" fill="#ff6b8a">N</text>
                  </g>
                </g>
              </svg>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-lg bg-base-100 border border-base-300">
                  <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Sun overhead at</div>
                  <div className="text-lg font-bold font-mono text-accent">{subSolar}</div>
                </div>
                <div className="p-3 rounded-lg bg-base-100 border border-base-300">
                  <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Tilts toward Sun</div>
                  <div className="text-lg font-bold text-secondary">{hemiToward}</div>
                </div>
                <div className="col-span-2 p-3 rounded-lg bg-base-100 border border-base-300">
                  <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">N. Hemisphere season (e.g. Japan, USA)</div>
                  <div className="text-lg font-bold text-primary">{nHemisphereSeason(month)}</div>
                </div>
              </div>

              <p className="text-xs text-base-content/60 mt-3 leading-snug">
                Earth's axis always points the same way in space. As Earth orbits, one hemisphere leans toward the Sun (long days, steep sun → summer) and, half a year later, away (short days, low sun → winter).
              </p>
            </div>

            {/* Panel B — Monsoon wind reversal → PH wet/dry */}
            <div className="rounded-xl border border-base-300 bg-base-200/40 p-5 flex flex-col">
              <h2 className="font-display text-lg font-bold text-base-content m-0 mb-1">B · Monsoon Wind Reversal</h2>
              <p className="text-sm text-base-content/70 m-0 mb-4">The real cause of the <strong>Philippine wet and dry seasons</strong>.</p>

              <svg viewBox="0 0 320 320" className="w-full max-w-[340px] mx-auto">
                {/* ocean */}
                <rect x="0" y="0" width="320" height="320" rx="12" fill="#2f8fe6" fillOpacity="0.12" />
                {/* wind arrows (reverse with the season) */}
                <g transform={`rotate(${monsoon.rot} 160 160)`}>
                  {[70, 130, 190, 250].map((y) => (
                    <g key={y} stroke="#2f8fe6" strokeWidth="3" fill="#2f8fe6">
                      <line x1="40" y1={y} x2="270" y2={y} strokeOpacity="0.55" />
                      <polygon points={`${275},${y} ${262},${y - 6} ${262},${y + 6}`} fillOpacity="0.7" />
                    </g>
                  ))}
                </g>
                <PhilippinesMap
                  x={100}
                  y={55}
                  width={120}
                  height={210}
                  labelFill="#0f3d27"
                  role="img"
                  aria-label="Map of the Philippines"
                />
                {/* rain dots during wet season */}
                {monsoon.season.startsWith('Tag-ulan') &&
                  [...Array(14)].map((_, i) => (
                    <circle key={i} cx={120 + (i % 7) * 12} cy={90 + Math.floor(i / 7) * 90 + (i % 3) * 10} r="2.4" fill="#1d4ed8" fillOpacity="0.7" />
                  ))}
              </svg>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between p-3 rounded-lg bg-base-100 border border-base-300">
                  <span className="text-base-content/70">Prevailing wind</span>
                  <span className="font-bold text-secondary text-right">{monsoon.wind}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-base-100 border border-base-300">
                  <span className="text-base-content/70">Philippine season</span>
                  <span className={`badge ${monsoon.badge}`}>{monsoon.season}</span>
                </div>
              </div>

              <p className="text-xs text-base-content/60 mt-3 leading-snug">{monsoon.note}</p>
            </div>
          </div>

          {/* The key correction */}
          <div className="rounded-xl border-2 border-secondary/40 bg-secondary/5 p-5">
            <h3 className="font-display font-bold text-secondary m-0 mb-1">Important: tilt is not why Manila has wet &amp; dry seasons</h3>
            <p className="text-sm text-base-content/80 m-0">
              The Philippines sits near the equator (Manila ≈ {MANILA_LAT}°N), so the midday Sun is always high and day length barely changes — axial tilt does <strong>not</strong> give Manila temperate seasons like summer and winter. Instead, the Philippine <strong>wet (Habagat)</strong> and <strong>dry (Amihan)</strong> seasons come from the seasonal <strong>reversal of monsoon winds</strong> shown in Panel&nbsp;B.
            </p>
          </div>

          <div className="flex justify-end">
            <button className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
          </div>

            </>
          )}
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default SeasonsVisualizer;
