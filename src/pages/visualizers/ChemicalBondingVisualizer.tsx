import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { IntroState, useIntroState } from '../../components/onboarding';

type Mode = 'ionic' | 'covalent';

// Valence electrons placed one-per-side first, then paired — the standard
// Lewis-dot convention. Returns up to `count` dot coordinates.
const lewisDots = (cx: number, cy: number, count: number, r = 30, o = 7) => {
  const slots = [
    { x: cx - o, y: cy - r }, // top a
    { x: cx + r, y: cy - o }, // right a
    { x: cx - o, y: cy + r }, // bottom a
    { x: cx - r, y: cy - o }, // left a
    { x: cx + o, y: cy - r }, // top b
    { x: cx + r, y: cy + o }, // right b
    { x: cx + o, y: cy + r }, // bottom b
    { x: cx - r, y: cy + o }, // left b
  ];
  return slots.slice(0, Math.max(0, Math.min(8, count)));
};

const STEPS: Record<Mode, { title: string; body: string; octet: [boolean, boolean] }[]> = {
  ionic: [
    { title: 'Valence electrons', body: 'Sodium has 1 valence electron, chlorine has 7. Neither atom has a full outer shell (octet) yet.', octet: [false, false] },
    { title: 'Electron transfer', body: 'Sodium gives up its single valence electron. In ionic bonding, electrons move from the metal to the non-metal.', octet: [false, false] },
    { title: 'Ions form', body: 'Sodium becomes Na⁺ (its outer shell is now empty; the shell beneath is already a full octet). Chlorine becomes Cl⁻ with 8 valence electrons.', octet: [true, true] },
    { title: 'Ionic lattice', body: 'Opposite charges attract and stack into a repeating 3D lattice. That ordered grid is what a grain of table salt (NaCl) is.', octet: [true, true] },
  ],
  covalent: [
    { title: 'Valence electrons', body: 'Two chlorine atoms each have 7 valence electrons, including one unpaired electron each.', octet: [false, false] },
    { title: 'Atoms approach', body: 'Neither atom will give up an electron, so they move close enough for their unpaired electrons to overlap.', octet: [false, false] },
    { title: 'Sharing a pair', body: 'The atoms share one pair of electrons. Each chlorine now counts 8 electrons in its outer shell, a full octet.', octet: [true, true] },
    { title: 'Cl₂ molecule', body: 'The shared pair is a single covalent bond. It holds the two atoms together as one chlorine molecule, Cl₂.', octet: [true, true] },
  ],
};

const ChemicalBondingVisualizer = () => {
  const intro = useIntroState();
  const [mode, setMode] = useState<Mode>('ionic');
  const [step, setStep] = useState(0);

  const steps = STEPS[mode];
  const current = steps[step];

  const setModeReset = (m: Mode) => { setMode(m); setStep(0); };
  const next = () => setStep((s) => Math.min(steps.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const dotCls = 'fill-base-content';
  const moveCls = 'fill-accent';
  const shareCls = 'fill-secondary';

  return (
    <VisualizerLayout
      title="Chemical Bonding: Reaching an Octet"
      description="Step through how atoms reach a stable octet, either by transferring electrons to form ions (ionic bonding, NaCl) or by sharing a pair to form a molecule (covalent bonding, Cl₂)."
      adSlotId="1006"
      guideLink="/blog/chemical-bonding"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 gap-6">
          {!intro.started ? (
            <IntroState
              lead="Choose a bond type and step through how atoms reach a stable octet."
              options={[
                {
                  label: 'Ionic bond (Na + Cl)',
                  hint: 'Electrons transfer to form ions',
                  onSelect: () => { setModeReset('ionic'); intro.start(); },
                },
                {
                  label: 'Covalent bond (Cl + Cl)',
                  hint: 'Atoms share a pair of electrons',
                  onSelect: () => { setModeReset('covalent'); intro.start(); },
                },
              ]}
            />
          ) : (
            <>

          {/* Mode toggle */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button type="button" aria-pressed={mode === 'ionic'} onClick={() => setModeReset('ionic')} className={`btn btn-sm ${mode === 'ionic' ? 'btn-primary' : 'btn-outline'}`}>Ionic bond (Na + Cl)</button>
            <button type="button" aria-pressed={mode === 'covalent'} onClick={() => setModeReset('covalent')} className={`btn btn-sm ${mode === 'covalent' ? 'btn-primary' : 'btn-outline'}`}>Covalent bond (Cl + Cl)</button>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2">
            {steps.map((s, i) => (
              <div key={s.title} className={`h-2 rounded-full transition-[width,background-color] ${i === step ? 'w-8 bg-primary' : i < step ? 'w-2 bg-primary/50' : 'w-2 bg-base-300'}`} aria-hidden="true" />
            ))}
          </div>

          {/* Diagram */}
          <div className="rounded-xl border border-base-300 bg-base-200/40 p-4">
            <svg viewBox="0 0 360 220" className="w-full max-w-[520px] mx-auto text-base-content" role="img" aria-label={`${mode} bonding, step ${step + 1} of ${steps.length}: ${current.title}. ${current.body}`}>

              {mode === 'ionic' ? (
                <>
                  {step < 3 ? (
                    <>
                      {/* Sodium */}
                      <g>
                        <circle cx="100" cy="110" r="26" className="fill-error/15 stroke-error" strokeWidth="2" />
                        <text x="100" y="116" textAnchor="middle" fontSize="20" fontWeight="bold" className="fill-error">
                          Na{step >= 2 ? '⁺' : ''}
                        </text>
                        {/* Na valence dot only before transfer */}
                        {step < 1 && lewisDots(100, 110, 1).map((d, i) => (
                          <circle key={i} cx={d.x} cy={d.y} r="3.5" className={dotCls} />
                        ))}
                        {step === 1 && lewisDots(100, 110, 1).map((d, i) => (
                          <circle key={i} cx={d.x} cy={d.y} r="3.5" className={moveCls} />
                        ))}
                      </g>

                      {/* transfer arrow */}
                      {step === 1 && (
                        <g className="stroke-accent" strokeWidth="2.5" fill="none">
                          <path d="M 138 90 Q 180 70 222 90" markerEnd="url(#arrow)" />
                        </g>
                      )}

                      {/* Chlorine */}
                      <g>
                        <circle cx="260" cy="110" r="30" className="fill-success/15 stroke-success" strokeWidth="2" />
                        <text x="260" y="116" textAnchor="middle" fontSize="20" fontWeight="bold" className="fill-success">
                          Cl{step >= 2 ? '⁻' : ''}
                        </text>
                        {lewisDots(260, 110, 7).map((d, i) => (
                          <circle key={i} cx={d.x} cy={d.y} r="3.5" className={dotCls} />
                        ))}
                        {/* gained electron (8th) appears at step 2 */}
                        {step >= 2 && lewisDots(260, 110, 8).slice(7).map((d, i) => (
                          <circle key={`g${i}`} cx={d.x} cy={d.y} r="3.5" className={moveCls} />
                        ))}
                      </g>
                    </>
                  ) : (
                    // Ionic lattice (step 3)
                    <g>
                      {[0, 1, 2, 3].map((row) => (
                        [0, 1, 2, 3].map((col) => {
                          const isNa = (row + col) % 2 === 0;
                          const x = 110 + col * 48;
                          const y = 50 + row * 40;
                          return (
                            <g key={`${row}-${col}`}>
                              <circle cx={x} cy={y} r={isNa ? 12 : 16} className={isNa ? 'fill-error' : 'fill-success'} />
                              <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fontWeight="bold" className="fill-base-100">{isNa ? 'Na⁺' : 'Cl⁻'}</text>
                            </g>
                          );
                        })
                      ))}
                    </g>
                  )}
                </>
              ) : (
                <>
                  {step < 3 ? (
                    <>
                      {/* Two chlorine atoms; they slide together as the step advances */}
                      {(() => {
                        const gap = step === 0 ? 90 : 64; // closer when approaching/sharing
                        const leftX = 180 - gap;
                        const rightX = 180 + gap;
                        return (
                          <>
                            <circle cx={leftX} cy="110" r="30" className="fill-success/15 stroke-success" strokeWidth="2" />
                            <text x={leftX} y="116" textAnchor="middle" fontSize="20" fontWeight="bold" className="fill-success">Cl</text>
                            <circle cx={rightX} cy="110" r="30" className="fill-success/15 stroke-success" strokeWidth="2" />
                            <text x={rightX} y="116" textAnchor="middle" fontSize="20" fontWeight="bold" className="fill-success">Cl</text>

                            {/* 6 lone electrons on each (away from the bond) */}
                            {lewisDots(leftX, 110, 6).map((d, i) => (
                              <circle key={`l${i}`} cx={d.x} cy={d.y} r="3.5" className={dotCls} />
                            ))}
                            {lewisDots(rightX, 110, 6).map((d, i) => (
                              <circle key={`r${i}`} cx={d.x} cy={d.y} r="3.5" className={dotCls} />
                            ))}

                            {/* the unpaired / shared electrons in the middle */}
                            {step < 2 ? (
                              <>
                                <circle cx={leftX + 32} cy="110" r="3.5" className={dotCls} />
                                <circle cx={rightX - 32} cy="110" r="3.5" className={dotCls} />
                              </>
                            ) : (
                              <>
                                <circle cx="180" cy="100" r="3.5" className={shareCls} />
                                <circle cx="180" cy="120" r="3.5" className={shareCls} />
                              </>
                            )}
                          </>
                        );
                      })()}
                    </>
                  ) : (
                    // Cl₂ molecule with single bond (step 3)
                    <g>
                      <circle cx="130" cy="110" r="32" className="fill-success/20 stroke-success" strokeWidth="2" />
                      <circle cx="230" cy="110" r="32" className="fill-success/20 stroke-success" strokeWidth="2" />
                      <text x="130" y="116" textAnchor="middle" fontSize="22" fontWeight="bold" className="fill-success">Cl</text>
                      <text x="230" y="116" textAnchor="middle" fontSize="22" fontWeight="bold" className="fill-success">Cl</text>
                      {/* shared bond pair */}
                      <circle cx="180" cy="100" r="3.5" className={shareCls} />
                      <circle cx="180" cy="120" r="3.5" className={shareCls} />
                      <line x1="162" y1="110" x2="198" y2="110" className="stroke-secondary" strokeWidth="2" />
                      <text x="180" y="165" textAnchor="middle" fontSize="11" className="fill-base-content/70">single covalent bond</text>
                    </g>
                  )}
                </>
              )}

              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" className="fill-accent" />
                </marker>
              </defs>
            </svg>
          </div>

          {/* Octet status */}
          <div className="flex flex-wrap gap-3 justify-center">
            {(mode === 'ionic' ? ['Na', 'Cl'] : ['Cl (left)', 'Cl (right)']).map((atom, i) => (
              <div key={atom} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold ${current.octet[i] ? 'border-success/40 bg-success/10 text-success' : 'border-base-300 bg-base-200 text-base-content/60'}`}>
                <span>{atom}</span>
                <span>{current.octet[i] ? 'octet satisfied' : 'octet not yet full'}</span>
              </div>
            ))}
          </div>

          {/* Explanation */}
          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5">
            <h3 className="font-display font-bold text-primary m-0 mb-1">Step {step + 1} · {current.title}</h3>
            <p className="text-sm text-base-content/80 m-0">{current.body}</p>
          </div>

          {/* Step controls */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button type="button" className="btn btn-outline btn-sm" onClick={prev} disabled={step === 0}>← Prev</button>
            <button type="button" className="btn btn-primary btn-sm" onClick={next} disabled={step === steps.length - 1}>Next →</button>
          </div>
            </>
          )}
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default ChemicalBondingVisualizer;
