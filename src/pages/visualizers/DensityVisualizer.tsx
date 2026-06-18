import { useState, useSyncExternalStore } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { GuidedInputFlow, useTouchedFields } from '../../components/onboarding';

const DEFAULT_MASS = 600; // kg
const DEFAULT_VOLUME = 1.0; // m³
const DEFAULT_FLUID = 1000; // kg/m³ (fresh water)

const WATER_SURFACE_Y = 150; // px from top of the 350px tank
const TANK_BOTTOM_Y = 350;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const subscribeReducedMotion = (onChange: () => void): (() => void) => {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};
const usePrefersReducedMotion = (): boolean =>
  useSyncExternalStore(
    subscribeReducedMotion,
    () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(REDUCED_MOTION_QUERY).matches : false),
    () => false,
  );

const FLUIDS = [
  { label: 'Langis / Cooking oil', density: 920 },
  { label: 'Tubig-tabang / Fresh water', density: 1000 },
  { label: 'Tubig-dagat / Seawater', density: 1025 },
];

const DensityVisualizer = () => {
  const [mass, setMass] = useState(DEFAULT_MASS);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [fluidDensity, setFluidDensity] = useState(DEFAULT_FLUID);
  const reducedMotion = usePrefersReducedMotion();
  const fields = useTouchedFields<'mass' | 'volume' | 'fluid'>();
  const ready = fields.isTouched('mass') && fields.isTouched('volume') && fields.isTouched('fluid');

  const density = mass / volume; // kg/m³
  const isFloating = density < fluidDensity;

  // A floating object sits with the fraction of its volume below the waterline
  // equal to the ratio of densities; a denser object sinks (fully submerged).
  const submergedFraction = isFloating ? density / fluidDensity : 1;

  const sideLength = Math.cbrt(volume) * 60; // px, edge of the cube
  // Floating: only (1 - fraction) of the cube pokes above the surface.
  const dropTop = isFloating
    ? WATER_SURFACE_Y - (1 - submergedFraction) * sideLength
    : TANK_BOTTOM_Y - sideLength;

  const setObjectPreset = (m: number, v: number) => {
    setMass(m);
    setVolume(v);
    fields.touch('mass');
    fields.touch('volume');
  };

  const reset = () => {
    setMass(DEFAULT_MASS);
    setVolume(DEFAULT_VOLUME);
    setFluidDensity(DEFAULT_FLUID);
    fields.reset();
  };

  const fillExample = () => {
    setMass(DEFAULT_MASS);
    setVolume(DEFAULT_VOLUME);
    setFluidDensity(DEFAULT_FLUID);
    fields.touchAll(['mass', 'volume', 'fluid']);
  };

  const objectPresets = [
    { label: 'Kahoy / Wood (600 kg/m³)', m: 600, v: 1.0 },
    { label: 'Yelo / Ice (920 kg/m³)', m: 920, v: 1.0 },
    { label: 'Bato / Brick (2000 kg/m³)', m: 2000, v: 1.0 },
  ];

  const massControl = (
    <Slider
      id="d-mass"
      motif="mass"
      label={<>Mass / Bigat (<span className="font-serif italic">m</span>)</>}
      value={mass}
      min={100}
      max={3000}
      step={50}
      unit=" kg"
      colorClass="primary"
      onChange={(e) => { setMass(Number(e.target.value)); fields.touch('mass'); }}
      aria-valuetext={`${mass} kilograms`}
    />
  );

  const volumeControl = (
    <Slider
      id="d-volume"
      motif="volume"
      label={<>Volume / Laki (<span className="font-serif italic">V</span>)</>}
      value={volume}
      min={0.1}
      max={3.0}
      step={0.1}
      unit=" m³"
      colorClass="secondary"
      formatValue={(v) => v.toFixed(1)}
      onChange={(e) => { setVolume(Number(e.target.value)); fields.touch('volume'); }}
      aria-valuetext={`${volume.toFixed(1)} cubic metres`}
    />
  );

  const fluidControl = (
    <div>
      <Slider
        id="d-fluid"
        motif="fluid"
        label={<>Fluid density / Likido (<span className="font-serif italic">ρ</span><sub>fluid</sub>)</>}
        value={fluidDensity}
        min={500}
        max={1500}
        step={5}
        unit=" kg/m³"
        colorClass="accent"
        onChange={(e) => { setFluidDensity(Number(e.target.value)); fields.touch('fluid'); }}
        aria-valuetext={`fluid density ${fluidDensity} kilograms per cubic metre`}
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {FLUIDS.map((f) => (
          <button
            key={f.density}
            onClick={() => { setFluidDensity(f.density); fields.touch('fluid'); }}
            className={`btn btn-xs ${fluidDensity === f.density ? 'btn-accent' : 'btn-outline'}`}
            aria-pressed={fluidDensity === f.density}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <VisualizerLayout
      title="Density at Buoyancy (Lulutang o Lulubog?)"
      description="Compare an object's density with the fluid's to predict whether it floats, how deep it sits, or sinks."
      adSlotId="2004"
      guideLink="/blog/density"
    >
      {!ready ? (
        <GuidedInputFlow
          intro="Set an object's mass and volume and the fluid's density to predict whether it floats or sinks."
          onFillExample={fillExample}
          onReset={reset}
          steps={[
            { id: 'mass', title: 'Set the mass', helper: 'The object\u2019s mass in kilograms (100 to 3000).', complete: fields.isTouched('mass'), children: massControl },
            { id: 'volume', title: 'Set the volume', helper: 'The object\u2019s volume in cubic metres (0.1 to 3.0).', complete: fields.isTouched('volume'), children: volumeControl },
            { id: 'fluid', title: 'Set the fluid density', helper: 'Pick a fluid or set kg/m³ (500 to 1500).', complete: fields.isTouched('fluid'), children: fluidControl },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8">

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-base-200 p-6 rounded-xl border border-base-300 flex flex-col gap-5">
              {massControl}
              {volumeControl}
              {fluidControl}
            </div>

            <div className="bg-base-300 p-6 rounded-xl border border-base-300 flex flex-col justify-center shadow-inner">
              <div className="mb-4">
                <span className="text-base-content/60 text-sm uppercase tracking-wider block mb-2">Object density</span>
                <div className="text-xl px-2 py-1 bg-base-100 rounded font-serif italic text-base-content">
                  ρ = {mass} / {volume.toFixed(1)} =
                </div>
                <div className={`text-4xl font-bold mt-1 ${isFloating ? 'text-success' : 'text-error'}`}>
                  {density.toFixed(0)} <span className="text-lg font-normal">kg/m³</span>
                </div>
              </div>
              <div className="border-t border-base-content/15 pt-4 flex justify-between items-center gap-3">
                <div className="text-sm">
                  <div className="text-base-content/60">Submerged</div>
                  <div className="font-mono font-bold text-base-content">{Math.round(submergedFraction * 100)}%</div>
                </div>
                <div className={`badge badge-lg ${isFloating ? 'badge-success' : 'badge-error'}`}>
                  {isFloating ? 'Lulutang (Floating)' : 'Lulubog (Sinking)'}
                </div>
              </div>
              <p className="text-xs text-base-content/60 mt-3 m-0">
                {isFloating
                  ? `Lighter than the fluid, so it floats with ${Math.round(submergedFraction * 100)}% of its volume under the surface (ρ_object / ρ_fluid).`
                  : 'Denser than the fluid, so the buoyant force can\u2019t hold it up and it sinks.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {objectPresets.map((p) => (
              <button
                key={p.label}
                onClick={() => setObjectPreset(p.m, p.v)}
                className={`btn btn-outline btn-sm ${mass === p.m && volume === p.v ? 'btn-active' : ''}`}
                aria-pressed={mass === p.m && volume === p.v}
              >
                {p.label}
              </button>
            ))}
            <button onClick={reset} className="btn btn-ghost btn-sm">Reset</button>
          </div>

          <div className="relative h-[350px] bg-info/5 border border-base-300 rounded-xl overflow-hidden shadow-inner">
            {/* Water */}
            <div className="absolute left-0 right-0 bg-info/25 border-t-2 border-dashed border-info" style={{ top: `${WATER_SURFACE_Y}px`, bottom: 0 }}>
              <span className="absolute top-2 right-4 text-info text-sm font-bold opacity-70">Water surface</span>
            </div>

            {/* Object */}
            <div
              className="absolute left-1/2 flex items-center justify-center font-bold text-base-100 shadow-lg rounded-sm border-2 border-base-content/30"
              style={{
                top: `${dropTop}px`,
                transform: 'translateX(-50%)',
                width: `${sideLength}px`,
                height: `${sideLength}px`,
                background: isFloating ? 'var(--color-warning)' : 'var(--color-error)',
                transition: reducedMotion ? 'none' : 'top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <span className="text-[10px] sm:text-xs">{mass} kg</span>
            </div>
          </div>
        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default DensityVisualizer;
