import { useState, useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import VisualizerLayout from '../../components/VisualizerLayout';
import { IntroState, useIntroState } from '../../components/onboarding';

// Resolve a theme CSS variable to a concrete colour for the cytoscape canvas
// (which can't use CSS classes). Falls back if the variable is missing.
const themeColor = (name: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

interface Organism {
  id: string;
  label: string;
  role: string;
  token: string;
  fallback: string;
}

const organisms: Organism[] = [
  { id: 'palay', label: 'Palay\n(Rice)', role: 'Producer', token: '--color-success', fallback: '#2fa46a' },
  { id: 'kangkong', label: 'Kangkong\n(Water Spinach)', role: 'Producer', token: '--color-success', fallback: '#2fa46a' },
  { id: 'tipaklong', label: 'Tipaklong\n(Grasshopper)', role: 'Primary Consumer', token: '--color-primary', fallback: '#2f8fe6' },
  { id: 'suso', label: 'Suso\n(Snail)', role: 'Primary Consumer', token: '--color-primary', fallback: '#2f8fe6' },
  { id: 'palaka', label: 'Palaka\n(Frog)', role: 'Secondary Consumer', token: '--color-warning', fallback: '#f5a800' },
  { id: 'tagak', label: 'Tagak\n(Heron)', role: 'Secondary Consumer', token: '--color-warning', fallback: '#f5a800' },
  { id: 'ahas', label: 'Ahas\n(Snake)', role: 'Tertiary Consumer', token: '--color-error', fallback: '#ff6b8a' },
  { id: 'eagle', label: 'Philippine\nEagle', role: 'Apex Predator', token: '--crayon-grape', fallback: '#8a6fe0' },
];

const edgeData = [
  { source: 'palay', target: 'tipaklong' },
  { source: 'palay', target: 'suso' },
  { source: 'kangkong', target: 'suso' },
  { source: 'kangkong', target: 'tipaklong' },
  { source: 'tipaklong', target: 'palaka' },
  { source: 'suso', target: 'tagak' },
  { source: 'tipaklong', target: 'tagak' },
  { source: 'palaka', target: 'ahas' },
  { source: 'tagak', target: 'ahas' },
  { source: 'ahas', target: 'eagle' },
  { source: 'palaka', target: 'eagle' },
];

// Trophic energy pyramid. Each level keeps ~10% of the energy of the one below
// (Lindeman's ~10% rule); the other ~90% is lost mostly as heat from respiration.
const PYRAMID = [
  { level: 'Apex predator', example: 'Philippine Eagle', energy: 1, width: 20, token: '--crayon-grape', fallback: '#8a6fe0' },
  { level: 'Tertiary consumers', example: 'Snake', energy: 10, width: 36, token: '--color-error', fallback: '#ff6b8a' },
  { level: 'Secondary consumers', example: 'Frog, Heron', energy: 100, width: 54, token: '--color-warning', fallback: '#f5a800' },
  { level: 'Primary consumers', example: 'Grasshopper, Snail', energy: 1000, width: 72, token: '--color-primary', fallback: '#2f8fe6' },
  { level: 'Producers', example: 'Rice, Kangkong', energy: 10000, width: 92, token: '--color-success', fallback: '#2fa46a' },
];

const FoodWebVisualizer = () => {
  const intro = useIntroState();
  const cyRef = useRef<HTMLDivElement>(null);
  const cyInstanceRef = useRef<cytoscape.Core | null>(null);
  const [activeNode, setActiveNode] = useState('palay');

  // Build the cytoscape graph only after the learner starts, since its
  // container only renders once the intro state is dismissed.
  useEffect(() => {
    if (!intro.started || !cyRef.current) return;

    const edgeColor = themeColor('--color-base-content', '#2b2b3a');
    const borderColor = themeColor('--color-base-300', '#f2e6d6');
    const accent = themeColor('--color-accent', '#f5a800');

    const cy = cytoscape({
      container: cyRef.current,
      elements: [
        ...organisms.map((o) => ({ data: { id: o.id, label: o.label, color: themeColor(o.token, o.fallback) } })),
        ...edgeData.map((e, i) => ({ data: { id: `e${i}`, source: e.source, target: e.target } })),
      ],
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'text-wrap': 'wrap',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '9px',
            'font-weight': 'bold',
            color: '#fff',
            'text-outline-color': 'data(color)',
            'text-outline-width': 2,
            'background-color': 'data(color)',
            'border-width': 3,
            'border-color': borderColor,
            width: 65,
            height: 65,
          },
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': edgeColor,
            'target-arrow-color': edgeColor,
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            opacity: 0.45,
          },
        },
        { selector: 'node.highlighted', style: { 'border-color': accent, 'border-width': 5, width: 80, height: 80 } },
        { selector: 'edge.highlighted', style: { 'line-color': accent, 'target-arrow-color': accent, width: 4, opacity: 1 } },
      ],
      layout: { name: 'breadthfirst', directed: true, spacingFactor: 1.4, roots: ['palay', 'kangkong'] },
      userZoomingEnabled: false,
      boxSelectionEnabled: false,
    });

    cyInstanceRef.current = cy;
    cy.on('tap', 'node', (e) => setActiveNode(e.target.id()));

    return () => { cy.destroy(); };
  }, [intro.started]);

  useEffect(() => {
    const cy = cyInstanceRef.current;
    if (!cy) return;
    cy.elements().removeClass('highlighted');
    const node = cy.getElementById(activeNode);
    node.addClass('highlighted');
    node.connectedEdges().addClass('highlighted');
    node.neighborhood('node').addClass('highlighted');
  }, [activeNode, intro.started]);

  const reset = () => {
    setActiveNode('palay');
    const cy = cyInstanceRef.current;
    if (cy) { cy.fit(undefined, 30); }
  };

  const activeOrg = organisms.find((o) => o.id === activeNode);
  const activeColor = activeOrg ? themeColor(activeOrg.token, activeOrg.fallback) : '#000';
  const preys = edgeData.filter((e) => e.target === activeNode).map((e) => organisms.find((o) => o.id === e.source)?.label.replace('\n', ' '));
  const predators = edgeData.filter((e) => e.source === activeNode).map((e) => organisms.find((o) => o.id === e.target)?.label.replace('\n', ' '));

  return (
    <VisualizerLayout
      title="Sapot ng Pagkain (Philippine Food Web)"
      description="Explore who eats whom in a Philippine rice-paddy ecosystem, then see how energy thins out by about 10x per level and how decomposers recycle nutrients back to producers."
      adSlotId="2002"
      guideLink="/blog/food-web"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-4 md:p-8 gap-6">
          {!intro.started ? (
            <IntroState
              lead="Tap any plant or animal in a rice-paddy food web to see what it eats and what eats it."
              actionLabel="Explore the food web"
              onStart={intro.start}
            />
          ) : (
            <>
          <div ref={cyRef} className="w-full h-[450px] bg-base-200 rounded-xl border-[3px] border-base-300 shadow-inner" />

          {activeOrg && (
            <div className="bg-base-200 p-6 rounded-xl border border-base-300">
              <h3 className="text-2xl font-bold mb-2" style={{ color: activeColor }}>
                {activeOrg.label.replace('\n', ' ')}
              </h3>
              <div className="badge badge-lg mb-4 text-white border-0" style={{ backgroundColor: activeColor }}>{activeOrg.role}</div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-base-100 p-4 rounded-lg border border-base-300">
                  <div className="text-xs uppercase tracking-wider mb-2 font-bold text-base-content/60">Eaten by ↑</div>
                  {predators.length > 0 ? <ul className="list-disc list-inside">{predators.map((p, i) => <li key={i}>{p}</li>)}</ul> : <span className="italic text-base-content/50">Apex — no predators</span>}
                </div>
                <div className="bg-base-100 p-4 rounded-lg border border-base-300">
                  <div className="text-xs uppercase tracking-wider mb-2 font-bold text-base-content/60">Eats ↓</div>
                  {preys.length > 0 ? <ul className="list-disc list-inside">{preys.map((p, i) => <li key={i}>{p}</li>)}</ul> : <span className="italic text-base-content/50">Producer — makes food by photosynthesis</span>}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 justify-center">
            {organisms.map((o) => {
              const isActive = activeNode === o.id;
              const c = themeColor(o.token, o.fallback);
              return (
                <button
                  key={o.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveNode(o.id)}
                  className={`btn btn-sm ${isActive ? 'text-white border-0' : 'btn-outline'}`}
                  style={isActive ? { backgroundColor: c } : {}}
                >
                  {o.label.split('\n')[0]}
                </button>
              );
            })}
          </div>

          {/* Trophic energy pyramid */}
          <div className="bg-base-200 p-5 md:p-6 rounded-xl border border-base-300">
            <h3 className="font-display text-lg font-bold text-base-content m-0 mb-1">Energy pyramid: the ~10% rule</h3>
            <p className="text-sm text-base-content/70 m-0 mb-5">
              Only about a tenth of the energy at one level reaches the next. The rest is mostly lost as heat from respiration, so each step up supports far fewer organisms. Energy is shown in relative units (e.g. kcal per square metre per year).
            </p>

            <div className="flex flex-col items-center gap-1.5">
              {PYRAMID.map((tier, i) => (
                <div key={tier.level} className="w-full flex flex-col items-center">
                  {i > 0 && <div className="text-[11px] font-mono text-base-content/50 mb-0.5">× 0.1 ↓ (≈90% lost as heat)</div>}
                  <div
                    className="rounded-lg text-white flex flex-col items-center justify-center py-2 px-3 text-center shadow-sm"
                    style={{ width: `${tier.width}%`, backgroundColor: themeColor(tier.token, tier.fallback) }}
                  >
                    <span className="font-bold text-sm leading-tight">{tier.level}</span>
                    <span className="text-xs opacity-90">{tier.example} · {tier.energy.toLocaleString()} units</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Decomposers */}
            <div className="mt-5 grid sm:grid-cols-[1fr_auto] gap-4 items-center">
              <div className="p-4 rounded-lg bg-base-100 border-2 border-base-content/20">
                <div className="font-bold text-base-content mb-1">Decomposers (bacteria &amp; fungi)</div>
                <p className="text-sm text-base-content/70 m-0">
                  Decomposers break down dead plants, animals, and waste from every level. Energy still leaves the system as heat, but the nutrients they release (nitrogen, phosphorus, and others) cycle back into the soil for producers to reuse.
                </p>
              </div>
              <div className="text-center text-sm font-semibold text-success">
                <div aria-hidden="true" className="text-2xl">♻</div>
                nutrients returned to producers
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="btn btn-outline btn-sm" onClick={reset}>Re-center view</button>
          </div>
            </>
          )}
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default FoodWebVisualizer;
