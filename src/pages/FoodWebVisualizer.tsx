import { useState, useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import VisualizerLayout from '../components/VisualizerLayout';

const organisms = [
  { id: 'palay', label: 'Palay\n(Rice)', role: 'Producer', color: '#22c55e' },
  { id: 'kangkong', label: 'Kangkong\n(Water Spinach)', role: 'Producer', color: '#22c55e' },
  { id: 'tipaklong', label: 'Tipaklong\n(Grasshopper)', role: 'Primary Consumer', color: '#3b82f6' },
  { id: 'suso', label: 'Suso\n(Snail)', role: 'Primary Consumer', color: '#3b82f6' },
  { id: 'palaka', label: 'Palaka\n(Frog)', role: 'Secondary Consumer', color: '#f59e0b' },
  { id: 'tagak', label: 'Tagak\n(Heron)', role: 'Secondary Consumer', color: '#f59e0b' },
  { id: 'ahas', label: 'Ahas\n(Snake)', role: 'Tertiary Consumer', color: '#ef4444' },
  { id: 'eagle', label: 'Philippine\nEagle', role: 'Apex Predator', color: '#8b5cf6' },
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

const FoodWebVisualizer = () => {
  const cyRef = useRef<HTMLDivElement>(null);
  const cyInstanceRef = useRef<cytoscape.Core | null>(null);
  const [activeNode, setActiveNode] = useState('palay');

  useEffect(() => {
    if (!cyRef.current) return;

    const cy = cytoscape({
      container: cyRef.current,
      elements: [
        ...organisms.map(o => ({ data: { id: o.id, label: o.label, color: o.color } })),
        ...edgeData.map((e, i) => ({ data: { id: `e${i}`, source: e.source, target: e.target } })),
      ],
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'text-wrap': 'wrap',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '9px',
            'font-weight': 'bold',
            'color': '#fff',
            'text-outline-color': 'data(color)',
            'text-outline-width': 2,
            'background-color': 'data(color)',
            'border-width': 3,
            'border-color': '#334155',
            'width': 65,
            'height': 65,
          },
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#475569',
            'target-arrow-color': '#475569',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'opacity': 0.5,
          },
        },
        {
          selector: 'node.highlighted',
          style: { 'border-color': '#facc15', 'border-width': 5, 'width': 80, 'height': 80 },
        },
        {
          selector: 'edge.highlighted',
          style: { 'line-color': '#facc15', 'target-arrow-color': '#facc15', 'width': 4, 'opacity': 1 },
        },
      ],
      layout: {
        name: 'breadthfirst',
        directed: true,
        spacingFactor: 1.4,
        roots: ['palay', 'kangkong'],
      },
      userZoomingEnabled: false,
      boxSelectionEnabled: false,
    });

    cyInstanceRef.current = cy;
    cy.on('tap', 'node', (e) => setActiveNode(e.target.id()));

    return () => { cy.destroy(); };
  }, []);

  useEffect(() => {
    const cy = cyInstanceRef.current;
    if (!cy) return;
    cy.elements().removeClass('highlighted');
    const node = cy.getElementById(activeNode);
    node.addClass('highlighted');
    node.connectedEdges().addClass('highlighted');
    node.neighborhood('node').addClass('highlighted');
  }, [activeNode]);

  const activeOrg = organisms.find(o => o.id === activeNode);
  const preys = edgeData.filter(e => e.target === activeNode).map(e => organisms.find(o => o.id === e.source)?.label.replace('\n', ' '));
  const predators = edgeData.filter(e => e.source === activeNode).map(e => organisms.find(o => o.id === e.target)?.label.replace('\n', ' '));

  return (
    <VisualizerLayout
      title="Sapot ng Pagkain (Philippine Food Web)"
      description="Interactive Cytoscape.js network graph of a Philippine rice paddy ecosystem."
      adSlotId="2002"
      educationalContent={
        <>
          <h2>Ecosystems and Energy Flow: Grade 7 Science</h2>
          <p>A food web shows interconnected food chains. This graph uses <strong>Cytoscape.js</strong>, the same library used by research biologists. Click any node to explore relationships.</p>
          <ul>
            <li><strong>Producers:</strong> <em>Palay</em> and <em>Kangkong</em></li>
            <li><strong>Primary Consumers:</strong> <em>Tipaklong</em> and <em>Suso</em></li>
            <li><strong>Secondary Consumers:</strong> <em>Palaka</em> and <em>Tagak</em></li>
            <li><strong>Apex Predator:</strong> <em>Philippine Eagle</em></li>
          </ul>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-4 md:p-8">
          <div ref={cyRef} className="w-full h-[450px] bg-slate-900 rounded-xl border-[3px] border-slate-700 shadow-inner" />

          {activeOrg && (
            <div className="mt-8 bg-base-200 p-6 rounded-xl border border-base-300">
              <h3 className="text-2xl font-bold mb-2" style={{ color: activeOrg.color }}>
                {activeOrg.label.replace('\n', ' ')}
              </h3>
              <div className="badge badge-lg mb-4" style={{ backgroundColor: activeOrg.color, color: '#fff' }}>{activeOrg.role}</div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-base-100 p-4 rounded-lg border border-base-300">
                  <div className="text-xs uppercase tracking-wider mb-2 font-bold text-base-content/60">Eaten by ↑</div>
                  {predators.length > 0 ? <ul className="list-disc list-inside">{predators.map((p, i) => <li key={i}>{p}</li>)}</ul> : <span className="italic text-base-content/50">Apex — no predators</span>}
                </div>
                <div className="bg-base-100 p-4 rounded-lg border border-base-300">
                  <div className="text-xs uppercase tracking-wider mb-2 font-bold text-base-content/60">Eats ↓</div>
                  {preys.length > 0 ? <ul className="list-disc list-inside">{preys.map((p, i) => <li key={i}>{p}</li>)}</ul> : <span className="italic text-base-content/50">Producer — photosynthesis</span>}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {organisms.map(o => (
              <button key={o.id} onClick={() => setActiveNode(o.id)} className={`btn btn-sm ${activeNode === o.id ? '' : 'btn-outline'}`} style={activeNode === o.id ? { backgroundColor: o.color, borderColor: o.color, color: '#fff' } : {}}>
                {o.label.split('\n')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default FoodWebVisualizer;
