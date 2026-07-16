import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { MeasuredValue } from '../../components/scientific-units/UnitGuideLink';
import { GuidedInputFlow, useTouchedFields, useVisualizationGate } from '../../components/onboarding';
import { PhilippinesMap } from '../../components/maps/PhilippinesMap';

const DEFAULT_WIND = 120; // km/h
const LANDFALL_DURATION = 4; // seconds, matches the motion transition

// Disaster-preparedness checklist (before / during / after a typhoon),
// aligned with NDRRMC and PAGASA public guidance.
const DRRR = {
  before: [
    'Pack a go-bag: drinking water, ready-to-eat food, flashlight, battery radio, first-aid kit, medicines, and IDs in a waterproof pouch.',
    'Know your nearest evacuation centre and whether your area floods or has landslide history.',
    'Charge phones and power banks, and store clean water.',
    'Secure or bring in loose outdoor items and trim weak branches.',
    'Follow PAGASA bulletins and your local government\'s advisories.',
  ],
  during: [
    'Stay indoors and away from windows. Keep listening to official updates.',
    'If told to evacuate, leave early and use the marked routes.',
    'Never wade or drive through floodwater; it can hide deep or fast-moving currents.',
    'Watch for a sudden calm. It may be the eye, with strong winds returning soon after.',
    'Switch off the main power if floodwater is entering the house.',
  ],
  after: [
    'Return home only after officials say it is safe.',
    'Stay clear of downed power lines and report them.',
    'Do not use flooded appliances until they are checked; boil or treat water if unsure.',
    'Drain stagnant water to help prevent leptospirosis and dengue.',
    'Check on neighbours, especially the elderly and those living alone.',
  ],
};

type Phase = 'before' | 'during' | 'after';

const TyphoonTrackerVisualizer = () => {
  const [windSpeed, setWindSpeed] = useState(DEFAULT_WIND); // km/h
  const [simulating, setSimulating] = useState(false);
  const [phase, setPhase] = useState<Phase>('before');
  const fields = useTouchedFields<'wind'>();
  const gate = useVisualizationGate();
  const buildComplete = fields.isTouched('wind');
  const showVisualization = buildComplete && gate.visualizationConfirmed;
  const reduceMotion = useReducedMotion();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getTyphoonData = (speed: number) => {
    if (speed < 62) return { category: 'Tropical Depression (TD)', surge: '< 0.5m', color: '#3b82f6', size: 60 };
    if (speed <= 88) return { category: 'Tropical Storm (TS)', surge: '0.5m - 1.0m', color: '#10b981', size: 90 };
    if (speed <= 117) return { category: 'Severe Tropical Storm (STS)', surge: '1.0m - 2.0m', color: '#f59e0b', size: 120 };
    if (speed <= 184) return { category: 'Typhoon (TY)', surge: '2.0m - 3.0m', color: '#ef4444', size: 160 };
    return { category: 'Super Typhoon (STY)', surge: '> 3.0m', color: 'var(--crayon-ink)', size: 220 };
  };

  // PAGASA Tropical Cyclone Wind Signal (TCWS), 2022 wind-speed bands.
  const getWindSignal = (speed: number) => {
    if (speed < 39) return { num: 0, label: 'No Signal', advice: 'Winds below warning threshold.' };
    if (speed <= 61) return { num: 1, label: 'Signal No. 1', advice: '39–61 km/h. Minimal damage to very light structures; expected within 36 hours.' };
    if (speed <= 88) return { num: 2, label: 'Signal No. 2', advice: '62–88 km/h. Light to moderate damage; suspend classes, secure loose objects.' };
    if (speed <= 117) return { num: 3, label: 'Signal No. 3', advice: '89–117 km/h. Moderate to heavy damage; evacuate low-lying and coastal areas.' };
    if (speed <= 184) return { num: 4, label: 'Signal No. 4', advice: '118–184 km/h. Heavy to very heavy damage; only emergency travel.' };
    return { num: 5, label: 'Signal No. 5', advice: '≥185 km/h. Widespread devastation; shelter in the safest sturdy structure available.' };
  };

  const data = getTyphoonData(windSpeed);
  const signal = getWindSignal(windSpeed);
  const pressure = Math.max(890, Math.floor(1010 - (windSpeed * 0.4)));

  const startSimulation = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSimulating(false);
    setTimeout(() => setSimulating(true), 100);
    timeoutRef.current = setTimeout(() => setSimulating(false), 100 + LANDFALL_DURATION * 1000);
  };

  const reset = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSimulating(false);
    setWindSpeed(DEFAULT_WIND);
    setPhase('before');
    gate.resetVisualization();
    fields.reset();
  };

  const fillExample = () => {
    setWindSpeed(DEFAULT_WIND);
    fields.touch('wind');
  };

  const windControl = (
    <div className="bg-base-200 px-4 py-3 rounded-xl border border-base-300">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <label htmlFor="wind-speed" className="text-sm font-bold shrink-0">Maximum Sustained Wind Speed</label>
        <span className="shrink-0" style={{ color: data.color }}>
          <MeasuredValue value={windSpeed} unit="km/h" valueClassName="text-lg font-mono font-bold tabular-nums" />
        </span>
        <div className="flex-1 min-w-[12rem] basis-[200px]">
          <Slider
            id="wind-speed"
            compact
            motif="wind"
            label="Maximum Sustained Wind Speed"
            value={windSpeed}
            min={40}
            max={300}
            step={5}
            unit=" km/h"
            onChange={(e) => { setWindSpeed(Number(e.target.value)); fields.touch('wind'); }}
            disabled={simulating}
            aria-valuetext={`${windSpeed} km/h, ${data.category}, ${signal.label}`}
          />
        </div>
      </div>
      {simulating && (
        <p className="text-xs text-base-content/60 mt-2 mb-0">Wind speed is locked while a landfall is in progress…</p>
      )}
    </div>
  );

  return (
    <VisualizerLayout
      title="Typhoon Tracker (DRRR)"
      description="Set a cyclone's wind speed to see its PAGASA category and wind signal, where the Philippine Area of Responsibility sits, and what to do before, during, and after the storm."
      adSlotId="1009"
      guideLink="/blog/typhoon-tracker"
    >
      {!showVisualization ? (
        <GuidedInputFlow
          intro="Set the maximum sustained wind speed to see the PAGASA category and wind signal."
          onFillExample={fillExample}
          onReset={reset}
          awaitingVisualizationConfirm={buildComplete && !gate.visualizationConfirmed}
          onVisualizationConfirm={gate.confirmVisualization}

          steps={[
            { id: 'wind', title: 'Set the wind speed', helper: 'Maximum sustained wind, 40 to 300 km/h.', complete: fields.isTouched('wind'), children: windControl },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-4 md:p-6 flex flex-col gap-4">

          {/* Controls */}
          {windControl}

          {/* PAGASA Wind Signal context */}
          <div className="bg-base-200 p-5 rounded-xl border border-base-300">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-xl font-display font-extrabold text-2xl shrink-0 text-white"
                style={{ background: data.color }}
                aria-hidden="true"
              >
                {signal.num === 0 ? '—' : `#${signal.num}`}
              </div>
              <div>
                <div className="font-bold text-base-content">PAGASA {signal.label}</div>
                <p className="text-sm text-base-content/70 m-0">{signal.advice}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className={`h-1.5 rounded-full ${n <= signal.num ? 'bg-primary' : 'bg-base-300'}`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          {/* Map Viewport */}
          <div className="h-[400px] bg-neutral relative overflow-hidden border-2 border-base-content/20 rounded-xl shadow-inner">

            {/* Distance Scale / Grid Lines */}
            <div className="absolute top-0 bottom-0 left-[20%] border-l border-dashed border-white/20" />
            <div className="absolute top-0 bottom-0 left-[40%] border-l border-dashed border-white/20" />
            <div className="absolute top-0 bottom-0 left-[60%] border-l border-dashed border-white/20" />
            <div className="absolute bottom-2 left-[20%] text-white/50 text-xs -translate-x-1/2">1000 km</div>
            <div className="absolute bottom-2 left-[40%] text-white/50 text-xs -translate-x-1/2">500 km</div>
            <div className="absolute bottom-2 left-[60%] text-white/50 text-xs -translate-x-1/2">250 km</div>

            {/* PAR — Philippine Area of Responsibility boundary */}
            <div className="absolute inset-y-[8%] left-[30%] right-[8%] border-2 border-dashed border-warning/80 rounded-lg pointer-events-none">
              <span className="absolute -top-3 left-2 bg-neutral px-2 text-[11px] font-bold text-warning tracking-wide">
                PAR · Philippine Area of Responsibility
              </span>
              <span className="absolute bottom-1 right-2 text-[10px] text-warning/70">PAGASA monitors cyclones inside this zone</span>
            </div>

            {/* HUD Overlay */}
            <div
              className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm p-4 rounded-xl border text-white z-10 shadow-lg min-w-[250px]"
              style={{ borderColor: data.color }}
            >
              <h3 className="m-0 mb-4 font-bold text-lg leading-tight" style={{ color: data.color }}>{data.category}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60 text-xs uppercase tracking-wider block">Wind</span>
                  <MeasuredValue value={windSpeed} unit="km/h" valueClassName="font-mono text-base" />
                </div>
                <div>
                  <span className="text-white/60 text-xs uppercase tracking-wider block">Pressure</span>
                  <MeasuredValue value={pressure} unit="hPa" valueClassName="font-mono text-base" />
                </div>
                <div className="col-span-2">
                  <span className="text-white/60 text-xs uppercase tracking-wider block">Est. Storm Surge</span>
                  <strong className="font-mono text-base">{data.surge}</strong>
                </div>
                <div className="col-span-2">
                  <span className="text-white/60 text-xs uppercase tracking-wider block">PAGASA Signal</span>
                  <strong className="font-mono text-base">{signal.num === 0 ? 'None' : `#${signal.num}`}</strong>
                </div>
              </div>
            </div>

            <PhilippinesMap
              svgClassName="absolute right-[4%] top-[4%] w-[34%] h-[92%] opacity-95 z-[5]"
            />

            {/* Typhoon Simulation Node */}
            <motion.div
              animate={{
                rotate: reduceMotion ? 0 : 360,
                left: simulating ? '70%' : '10%'
              }}
              transition={{
                rotate: reduceMotion ? { duration: 0 } : { duration: Math.max(0.2, 2 - (windSpeed / 150)), repeat: Infinity, ease: 'linear' },
                left: { duration: LANDFALL_DURATION, ease: 'linear' }
              }}
              style={{
                position: 'absolute', top: '40%',
                width: `${data.size}px`, height: `${data.size}px`,
                background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, ${data.color}40 40%, transparent 70%)`,
                borderRadius: '50%',
                originX: 0.5, originY: 0.5,
                transform: 'translate(-50%, -50%)',
                zIndex: 8
              }}
            >
              {/* Eye of the storm */}
              <div className="absolute top-1/2 left-1/2 w-[15%] h-[15%] bg-neutral rounded-full border border-white/50 -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          </div>

          <div className="flex justify-center gap-3 mt-2">
            <button
              className="btn btn-primary btn-wide shadow-md"
              onClick={startSimulation}
              disabled={simulating}
            >
              {simulating ? 'Landfall in progress…' : 'Simulate Landfall'}
            </button>
            <button className="btn btn-outline" onClick={reset}>
              Reset
            </button>
          </div>

          {/* DRRR preparedness checklist */}
          <div className="bg-base-200 p-5 rounded-xl border border-base-300">
            <h3 className="font-display text-lg font-bold text-base-content m-0 mb-1">Disaster preparedness checklist</h3>
            <p className="text-sm text-base-content/70 m-0 mb-4">What to do at each stage of a typhoon.</p>

            <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Preparedness phase">
              {(['before', 'during', 'after'] as Phase[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  role="tab"
                  aria-selected={phase === p}
                  aria-pressed={phase === p}
                  onClick={() => setPhase(p)}
                  className={`btn btn-sm capitalize ${phase === p ? 'btn-primary' : 'btn-outline'}`}
                >
                  {p} the typhoon
                </button>
              ))}
            </div>

            <ul className="space-y-2">
              {DRRR[phase].map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-base-content/80">
                  <Check aria-hidden="true" className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default TyphoonTrackerVisualizer;
