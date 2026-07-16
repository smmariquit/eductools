import { useState, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import VisualizerLayout from '../../components/VisualizerLayout';
import { IntroState, useIntroState } from '../../components/onboarding';

interface Organelle {
  id: string;
  name: string;
  fn: string;
  // Approx. centre in the 0..100 SVG viewBox, for the callout marker.
  cx: number;
  cy: number;
}

const ORGANELLES: Organelle[] = [
  { id: 'cell-wall', name: 'Cell wall', fn: 'Rigid outer layer of cellulose that gives the plant cell its shape and support.', cx: 50, cy: 12 },
  { id: 'vacuole', name: 'Central vacuole', fn: 'Large fluid-filled sac that stores water and keeps the cell firm (turgor).', cx: 45, cy: 50 },
  { id: 'nucleus', name: 'Nucleus', fn: 'Control centre that holds the DNA and directs the cell\'s activities.', cx: 75, cy: 30 },
  { id: 'chloroplast', name: 'Chloroplast', fn: 'Contains chlorophyll and carries out photosynthesis, making food from sunlight.', cx: 20, cy: 40 },
  { id: 'mitochondrion', name: 'Mitochondrion', fn: 'Releases energy from food through respiration; the cell\'s powerhouse.', cx: 40, cy: 80 },
];

const ZOOMS = [
  { level: 1, label: 'Scanner (40x)', factor: 1 },
  { level: 2, label: 'High Power (100x)', factor: 3 },
  { level: 3, label: 'Oil Immersion (400x)', factor: 7 },
];

// Default focal point when nothing is selected but the user has zoomed in:
// the nucleus is the most detail-rich structure to examine.
const DEFAULT_FOCUS = { x: 75, y: 30 };

const MicroscopeVisualizer = () => {
  const intro = useIntroState();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const zoom = ZOOMS.find((z) => z.level === zoomLevel) ?? ZOOMS[0];
  const selectedOrg = ORGANELLES.find((o) => o.id === selected) ?? null;

  // At the scanner level we always frame the whole cell. Once magnified, we
  // centre on the selected organelle (or the nucleus by default) so the field
  // of view lands on real structure instead of an empty patch of cytoplasm.
  // Using percentage-based origin + translate keeps this correct at every
  // viewport size (the circle is 300px on mobile, 400px on desktop).
  const focus = zoomLevel === 1
    ? { x: 50, y: 50 }
    : selectedOrg
      ? { x: selectedOrg.cx, y: selectedOrg.cy }
      : DEFAULT_FOCUS;

  const toggle = (id: string) => setSelected((cur) => (cur === id ? null : id));
  const onKey = (e: KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(id); }
  };

  // Highlight ring helper per organelle.
  const ring = (id: string) => (selected === id ? 'opacity-100' : 'opacity-0');

  return (
    <VisualizerLayout
      title="Birtwal na Mikroskopyo (Microscope)"
      description="Examine a plant (mango) leaf cell at different magnifications. Click any organelle to reveal its name and what it does."
      adSlotId="1004"
      guideLink="/blog/microscope"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center p-6 md:p-10 gap-8">
          {!intro.started ? (
            <IntroState
              lead="Zoom into a plant leaf cell and tap each part to see its name and what it does."
              actionLabel="Look in the microscope"
              onStart={intro.start}
            />
          ) : (
            <>

          {/* Microscope viewport */}
          <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border-[20px] border-neutral bg-base-100 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.45)]">
            <motion.div
              initial={false}
              animate={{
                scale: zoom.factor,
                x: `${50 - focus.x}%`,
                y: `${50 - focus.y}%`,
                originX: focus.x / 100,
                originY: focus.y / 100,
              }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <svg viewBox="0 0 100 100" width="100%" height="100%" className="text-base-content">
                {/* Cell wall & membrane */}
                <g onClick={() => toggle('cell-wall')} role="button" tabIndex={0} aria-pressed={selected === 'cell-wall'} aria-label="Cell wall" onKeyDown={(e) => onKey(e, 'cell-wall')} className="cursor-pointer">
                  <polygon points="10,20 80,10 90,70 20,90" className="fill-success/30 stroke-success" strokeWidth="2" />
                  <polygon points="12,22 78,13 87,68 22,87" className="fill-success/10" />
                  <polygon points="10,20 80,10 90,70 20,90" className={`fill-none stroke-warning transition-opacity ${ring('cell-wall')}`} strokeWidth="3" />
                </g>

                {/* Central vacuole */}
                <g onClick={() => toggle('vacuole')} role="button" tabIndex={0} aria-pressed={selected === 'vacuole'} aria-label="Central vacuole" onKeyDown={(e) => onKey(e, 'vacuole')} className="cursor-pointer">
                  <path d="M 30 30 Q 60 20 70 50 Q 50 80 25 70 Q 20 50 30 30 Z" className="fill-info/40 stroke-info" strokeWidth="0.6" />
                  <path d="M 30 30 Q 60 20 70 50 Q 50 80 25 70 Q 20 50 30 30 Z" className={`fill-none stroke-warning transition-opacity ${ring('vacuole')}`} strokeWidth="2" />
                </g>

                {/* Nucleus */}
                <g onClick={() => toggle('nucleus')} role="button" tabIndex={0} aria-pressed={selected === 'nucleus'} aria-label="Nucleus" onKeyDown={(e) => onKey(e, 'nucleus')} className="cursor-pointer">
                  <circle cx="75" cy="30" r="12" className="fill-primary stroke-primary" strokeWidth="1" />
                  <circle cx="72" cy="28" r="4" className="fill-primary-content/70" />
                  {/* Fine structure revealed at higher magnification. */}
                  {zoomLevel >= 2 && (
                    <g className="stroke-primary-content/50" strokeWidth="0.6" fill="none">
                      <circle cx="79" cy="34" r="2" className="fill-primary-content/50 stroke-none" />
                      <path d="M67 30 Q72 26 77 30 T84 31" />
                      <path d="M68 35 Q73 33 78 36" />
                      <path d="M70 24 Q75 23 80 26" />
                    </g>
                  )}
                  <circle cx="75" cy="30" r="13" className={`fill-none stroke-warning transition-opacity ${ring('nucleus')}`} strokeWidth="2" />
                </g>

                {/* Chloroplasts */}
                <g onClick={() => toggle('chloroplast')} role="button" tabIndex={0} aria-pressed={selected === 'chloroplast'} aria-label="Chloroplast" onKeyDown={(e) => onKey(e, 'chloroplast')} className="cursor-pointer">
                  <ellipse cx="20" cy="40" rx="6" ry="3" className="fill-success stroke-success" strokeWidth="0.5" transform="rotate(30 20 40)" />
                  <ellipse cx="60" cy="80" rx="7" ry="4" className="fill-success stroke-success" strokeWidth="0.5" transform="rotate(-20 60 80)" />
                  <ellipse cx="85" cy="55" rx="5" ry="3" className="fill-success stroke-success" strokeWidth="0.5" transform="rotate(60 85 55)" />
                  {zoomLevel >= 2 && (
                    <>
                      <line x1="17" y1="40" x2="23" y2="40" className="stroke-success-content" strokeWidth="0.5" />
                      <line x1="18" y1="38.5" x2="22.5" y2="41.5" className="stroke-success-content" strokeWidth="0.4" />
                      <line x1="57" y1="80" x2="63" y2="80" className="stroke-success-content" strokeWidth="0.5" />
                    </>
                  )}
                  <ellipse cx="20" cy="40" rx="8" ry="5" className={`fill-none stroke-warning transition-opacity ${ring('chloroplast')}`} strokeWidth="1.5" transform="rotate(30 20 40)" />
                </g>

                {/* Mitochondria */}
                <g onClick={() => toggle('mitochondrion')} role="button" tabIndex={0} aria-pressed={selected === 'mitochondrion'} aria-label="Mitochondrion" onKeyDown={(e) => onKey(e, 'mitochondrion')} className="cursor-pointer">
                  <ellipse cx="40" cy="80" rx="5" ry="2.4" className="fill-warning stroke-warning" strokeWidth="0.5" transform="rotate(10 40 80)" />
                  <ellipse cx="50" cy="15" rx="4" ry="2.2" className="fill-warning stroke-warning" strokeWidth="0.5" transform="rotate(-40 50 15)" />
                  <ellipse cx="40" cy="80" rx="7" ry="4" className={`fill-none stroke-warning transition-opacity ${ring('mitochondrion')}`} strokeWidth="1.2" transform="rotate(10 40 80)" />
                </g>
              </svg>
            </motion.div>

            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-base-content/20 pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-base-content/20 pointer-events-none"></div>
          </div>

          {/* Selected organelle callout */}
          <div className="w-full max-w-2xl min-h-[5.5rem] bg-base-200 p-5 rounded-xl border border-base-300" aria-live="polite">
            {selectedOrg ? (
              <>
                <h3 className="font-display text-lg font-bold text-primary m-0 mb-1">{selectedOrg.name}</h3>
                <p className="text-sm text-base-content/80 m-0">{selectedOrg.fn}</p>
              </>
            ) : (
              <p className="text-sm text-base-content/60 m-0">Click a structure in the cell (or pick one below) to see its name and what it does.</p>
            )}
          </div>

          {/* Organelle picker (keyboard-friendly) */}
          <div className="w-full max-w-2xl flex flex-wrap gap-2 justify-center">
            {ORGANELLES.map((o) => (
              <button
                key={o.id}
                type="button"
                aria-pressed={selected === o.id}
                onClick={() => toggle(o.id)}
                className={`btn btn-sm ${selected === o.id ? 'btn-primary' : 'btn-outline'}`}
              >
                {o.name}
              </button>
            ))}
          </div>

          {/* Zoom controls */}
          <div className="w-full max-w-2xl bg-base-200 p-4 rounded-xl border border-base-300">
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              {ZOOMS.map((z) => (
                <button
                  key={z.level}
                  type="button"
                  aria-pressed={zoomLevel === z.level}
                  className={`btn flex-1 ${zoomLevel === z.level ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setZoomLevel(z.level)}
                >
                  {z.label}
                </button>
              ))}
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default MicroscopeVisualizer;
