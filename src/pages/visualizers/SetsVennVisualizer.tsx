import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

const SetsVennVisualizer = () => {
  const [setAInput, setSetAInput] = useState('1, 2, 3, 4, 5');
  const [setBInput, setSetBInput] = useState('3, 4, 5, 6, 7');
  const [operation, setOperation] = useState<'union' | 'intersection' | 'differenceAB' | 'differenceBA'>('union');

  const parseSet = (input: string): number[] => {
    return [...new Set(
      input.split(',')
        .map(s => s.trim())
        .filter(s => s !== '' && !isNaN(Number(s)))
        .map(Number)
    )].sort((a, b) => a - b);
  };

  const setA = parseSet(setAInput);
  const setB = parseSet(setBInput);

  const union = [...new Set([...setA, ...setB])].sort((a, b) => a - b);
  const intersection = setA.filter(x => setB.includes(x));
  const differenceAB = setA.filter(x => !setB.includes(x));
  const differenceBA = setB.filter(x => !setA.includes(x));

  const getResult = () => {
    switch (operation) {
      case 'union': return union;
      case 'intersection': return intersection;
      case 'differenceAB': return differenceAB;
      case 'differenceBA': return differenceBA;
    }
  };

  const result = getResult();

  const getOperationLabel = () => {
    switch (operation) {
      case 'union': return 'A ∪ B (Union)';
      case 'intersection': return 'A ∩ B (Intersection)';
      case 'differenceAB': return 'A − B (Difference)';
      case 'differenceBA': return 'B − A (Difference)';
    }
  };



  // Elements unique to A, common, unique to B for Venn display
  const onlyA = setA.filter(x => !setB.includes(x));
  const common = intersection;
  const onlyB = setB.filter(x => !setA.includes(x));

  const isHighlighted = (num: number) => result.includes(num);

  return (
    <VisualizerLayout
      title="Sets & Venn Diagrams (Mga Set at Venn Diagram)"
      description="Explore set operations: union, intersection, and difference using interactive Venn diagrams."
      adSlotId="2016"
      guideLink="/blog/sets-venn"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col gap-8">

          {/* Input controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-200 p-6 rounded-xl border border-base-300">
            <div>
              <label className="block mb-2 font-bold text-sm text-primary">Set A (comma-separated):</label>
              <input
                type="text"
                value={setAInput}
                onChange={e => setSetAInput(e.target.value)}
                className="input input-bordered w-full font-mono"
                placeholder="1, 2, 3, 4, 5"
              />
              <div className="mt-1 text-xs text-base-content/50">
                A = &#123;{setA.join(', ')}&#125; &nbsp; n(A) = {setA.length}
              </div>
            </div>
            <div>
              <label className="block mb-2 font-bold text-sm text-secondary">Set B (comma-separated):</label>
              <input
                type="text"
                value={setBInput}
                onChange={e => setSetBInput(e.target.value)}
                className="input input-bordered w-full font-mono"
                placeholder="3, 4, 5, 6, 7"
              />
              <div className="mt-1 text-xs text-base-content/50">
                B = &#123;{setB.join(', ')}&#125; &nbsp; n(B) = {setB.length}
              </div>
            </div>
          </div>

          {/* Operation selector */}
          <div className="flex flex-wrap gap-2 justify-center">
            {([
              { key: 'union', label: 'A ∪ B', desc: 'Union' },
              { key: 'intersection', label: 'A ∩ B', desc: 'Intersection' },
              { key: 'differenceAB', label: 'A − B', desc: 'Difference' },
              { key: 'differenceBA', label: 'B − A', desc: 'Difference' },
            ] as const).map(op => (
              <button
                key={op.key}
                onClick={() => setOperation(op.key)}
                className={`btn ${operation === op.key ? 'btn-warning' : 'btn-outline'}`}
              >
                <span className="font-mono font-bold">{op.label}</span>
                <span className="text-xs opacity-70 ml-1">({op.desc})</span>
              </button>
            ))}
          </div>

          {/* Venn Diagram */}
          <div className="bg-slate-900 rounded-xl p-8 border-2 border-base-300">
            <div className="flex items-center justify-center relative min-h-[220px]">
              {/* Circle A */}
              <div className={`w-56 h-56 rounded-full border-3 flex items-center justify-center relative -mr-16 z-10 transition-all duration-300 ${
                operation === 'differenceBA' ? 'border-base-300 bg-base-200/50' : 'border-base-300 bg-base-200'
              }`}>
                <div className="absolute -top-2 left-4 text-sm font-bold text-primary">Set A</div>
                <div className="flex flex-wrap gap-2 justify-center pr-14 max-w-28">
                  {onlyA.map(n => (
                    <span
                      key={`a-${n}`}
                      className={`badge font-mono font-bold transition-all duration-300 ${
                        isHighlighted(n) ? 'badge-primary badge-lg scale-110' : 'badge-ghost badge-sm opacity-40'
                      }`}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Overlap */}
              <div className="absolute z-20 flex flex-wrap gap-2 justify-center max-w-24">
                {common.map(n => (
                  <span
                    key={`c-${n}`}
                    className={`badge font-mono font-bold transition-all duration-300 ${
                      isHighlighted(n) ? 'badge-warning badge-lg scale-110 shadow-lg' : 'badge-ghost badge-sm opacity-40'
                    }`}
                  >
                    {n}
                  </span>
                ))}
              </div>

              {/* Circle B */}
              <div className={`w-56 h-56 rounded-full border-3 flex items-center justify-center relative -ml-16 z-10 transition-all duration-300 ${
                operation === 'differenceAB' ? 'border-base-300 bg-base-200/50' : 'border-base-300 bg-base-200'
              }`}>
                <div className="absolute -top-2 right-4 text-sm font-bold text-secondary">Set B</div>
                <div className="flex flex-wrap gap-2 justify-center pl-14 max-w-28">
                  {onlyB.map(n => (
                    <span
                      key={`b-${n}`}
                      className={`badge font-mono font-bold transition-all duration-300 ${
                        isHighlighted(n) ? 'badge-secondary badge-lg scale-110' : 'badge-ghost badge-sm opacity-40'
                      }`}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-base-200 border-2 border-base-300 rounded-xl p-6 text-center">
            <div className="text-sm font-bold text-warning/70 uppercase tracking-wider mb-2">
              {getOperationLabel()}
            </div>
            <div className="text-2xl font-mono font-bold text-warning mb-2">
              &#123;{result.join(', ')}&#125;
            </div>
            <div className="text-sm text-base-content/60">
              Cardinality: n = {result.length}
            </div>
          </div>

          {/* Quick examples */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => { setSetAInput('1, 2, 3, 4, 5'); setSetBInput('3, 4, 5, 6, 7'); }} className="btn btn-outline btn-xs">Example 1</button>
            <button onClick={() => { setSetAInput('2, 4, 6, 8, 10'); setSetBInput('1, 2, 3, 4, 5'); }} className="btn btn-outline btn-xs">Even & Small</button>
            <button onClick={() => { setSetAInput('1, 3, 5, 7, 9'); setSetBInput('2, 4, 6, 8, 10'); }} className="btn btn-outline btn-xs">Odd & Even (Disjoint)</button>
            <button onClick={() => { setSetAInput('1, 2, 3'); setSetBInput('1, 2, 3, 4, 5'); }} className="btn btn-outline btn-xs">Subset</button>
          </div>

        </div>
      </div>
    </VisualizerLayout>
  );
};
export default SetsVennVisualizer;
