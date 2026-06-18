import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { IntroState, useIntroState } from '../../components/onboarding';

const BULB_RESISTANCE = 10; // ohms per identical bulb
const MAX_VOLTAGE = 24;
const DEFAULT_VOLTAGE = 9;

// Brightest a single bulb can get in this lab: full source voltage across it
// (i.e. one bulb in parallel at max voltage). Used to normalise glow.
const MAX_BULB_POWER = (MAX_VOLTAGE * MAX_VOLTAGE) / BULB_RESISTANCE;

const ElectricCircuitsVisualizer = () => {
  const intro = useIntroState();
  const [circuitType, setCircuitType] = useState<'series' | 'parallel'>('series');
  const [switchedOn, setSwitchedOn] = useState(false);
  const [batteryVoltage, setBatteryVoltage] = useState(DEFAULT_VOLTAGE);

  // Two identical bulbs. Apply Ohm's law (I = V/R) per topology.
  const isSeries = circuitType === 'series';
  const totalResistance = isSeries ? BULB_RESISTANCE * 2 : BULB_RESISTANCE / 2;
  const totalCurrent = switchedOn ? batteryVoltage / totalResistance : 0;

  // Current through ONE bulb and the power it dissipates (P = I²R).
  const bulbCurrent = isSeries ? totalCurrent : totalCurrent / 2;
  const bulbVoltage = bulbCurrent * BULB_RESISTANCE;
  const bulbPower = bulbCurrent * bulbCurrent * BULB_RESISTANCE;

  // Normalised brightness 0..1 — drives the glow on each bulb.
  const brightness = Math.min(1, bulbPower / MAX_BULB_POWER);

  const bulbStyle = (b: number): React.CSSProperties => ({
    backgroundColor: b > 0.02 ? `rgba(253, 224, 71, ${0.35 + b * 0.65})` : undefined,
    boxShadow: b > 0.02 ? `0 0 ${10 + b * 35}px rgba(253, 224, 71, ${b})` : undefined,
    opacity: b > 0.02 ? 1 : 0.5,
  });

  const reset = () => {
    setCircuitType('series');
    setSwitchedOn(false);
    setBatteryVoltage(DEFAULT_VOLTAGE);
  };

  return (
    <VisualizerLayout
      title="Electric Circuits (Kuryente)"
      description="Compare how Series and Parallel circuits work."
      adSlotId="2008"
      guideLink="/blog/electric-circuits"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        {!intro.started ? (
          <div className="card-body p-6 md:p-8">
            <IntroState
              lead="Compare how two bulbs behave in a series or parallel circuit, then change the voltage and flip the switch."
              options={[
                {
                  label: 'Series circuit',
                  hint: 'Bulbs share the voltage',
                  onSelect: () => { setCircuitType('series'); intro.start(); },
                },
                {
                  label: 'Parallel circuit',
                  hint: 'Each bulb gets full voltage',
                  onSelect: () => { setCircuitType('parallel'); intro.start(); },
                },
              ]}
            />
          </div>
        ) : (
        <div className="card-body p-6 md:p-8 flex flex-col md:flex-row gap-10">

          <div className="flex-1 bg-neutral rounded-xl p-8 border-4 border-base-300 min-h-[300px] flex items-center justify-center relative overflow-hidden">
            {/* Visual Circuit Diagram implementation */}
            <div className="w-full max-w-sm aspect-video border-4 border-warning/30 rounded-lg relative flex items-center justify-center">
                {/* Battery */}
                <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 flex flex-col items-center bg-neutral px-2 py-4">
                  <div className="w-8 h-2 bg-slate-400 rounded-t-sm" />
                  <div className="w-12 h-16 bg-error rounded-sm flex items-center justify-center font-bold text-white text-xs">{batteryVoltage}V</div>
                  <div className="w-8 h-2 bg-slate-400 rounded-b-sm" />
                </div>

                {/* Switch */}
                <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 bg-neutral px-4">
                  <button
                    className={`px-4 py-2 rounded font-bold text-white transition-colors border-2 ${switchedOn ? 'bg-success border-success shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-error border-error'}`}
                    onClick={() => setSwitchedOn(!switchedOn)}
                    aria-label={`Circuit switch, currently ${switchedOn ? 'on' : 'off'}`}
                    aria-pressed={switchedOn}
                  >
                    {switchedOn ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* Bulbs */}
                {isSeries ? (
                  <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 bg-neutral px-8 flex gap-8">
                     <div className="w-12 h-12 rounded-full border-2 border-slate-600 bg-slate-700 transition-all duration-300" style={bulbStyle(brightness)} />
                     <div className="w-12 h-12 rounded-full border-2 border-slate-600 bg-slate-700 transition-all duration-300" style={bulbStyle(brightness)} />
                  </div>
                ) : (
                  <div className="absolute top-0 right-0 h-full w-1/2 flex flex-col justify-evenly items-end pr-[20%]">
                     {/* Parallel wires */}
                     <div className="w-full border-b-4 border-warning/30 flex justify-center">
                        <div className="w-12 h-12 rounded-full border-2 border-slate-600 bg-slate-700 -translate-y-1/2 transition-all duration-300" style={bulbStyle(brightness)} />
                     </div>
                     <div className="w-full border-b-4 border-warning/30 flex justify-center">
                        <div className="w-12 h-12 rounded-full border-2 border-slate-600 bg-slate-700 -translate-y-1/2 transition-all duration-300" style={bulbStyle(brightness)} />
                     </div>
                  </div>
                )}
            </div>
          </div>

          <div className="w-full md:w-72 flex flex-col gap-6 bg-base-200 p-6 rounded-xl border border-base-300">
            <div>
              <label htmlFor="circuit-type" className="block mb-2 font-bold text-base-content">Circuit Type:</label>
              <select
                id="circuit-type"
                className="select select-bordered w-full"
                value={circuitType}
                onChange={(e) => setCircuitType(e.target.value as 'series' | 'parallel')}
              >
                <option value="series">Series</option>
                <option value="parallel">Parallel</option>
              </select>
            </div>

            <div>
              <label htmlFor="battery-voltage" className="flex justify-between mb-2 font-bold text-sm">
                <span>Voltage (Battery)</span>
                <span className="text-primary">{batteryVoltage}V</span>
              </label>
              <input
                id="battery-voltage"
                type="range"
                min="1.5"
                max={MAX_VOLTAGE}
                step="1.5"
                value={batteryVoltage}
                onChange={(e) => setBatteryVoltage(Number(e.target.value))}
                className="range range-primary range-sm"
                aria-valuetext={`${batteryVoltage} volts`}
              />
            </div>

            {/* Live physics readout */}
            <div className="bg-base-100 p-4 rounded-lg border border-base-300 space-y-2 text-sm">
              <div className="text-xs font-bold text-base-content/60 uppercase tracking-wider">Ohm's Law (I = V/R)</div>
              <div className="flex justify-between font-mono">
                <span className="text-base-content/70">Bulb resistance R</span>
                <span>{BULB_RESISTANCE} Ω</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-base-content/70">Total current I</span>
                <span className="text-primary">{totalCurrent.toFixed(2)} A</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-base-content/70">Per-bulb voltage</span>
                <span>{bulbVoltage.toFixed(2)} V</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-base-content/70">Per-bulb power</span>
                <span className="text-secondary">{bulbPower.toFixed(2)} W</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-base-content/70">Brightness</span>
                <span className="text-accent">{Math.round(brightness * 100)}%</span>
              </div>
              <p className="text-xs text-base-content/60 pt-1 m-0">
                {isSeries
                  ? 'In series the two bulbs share the voltage, so each is dimmer.'
                  : 'In parallel each bulb gets the full battery voltage, so both stay bright.'}
              </p>
            </div>

            <button className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
          </div>

        </div>
        )}
      </div>
    </VisualizerLayout>
  );
};
export default ElectricCircuitsVisualizer;
