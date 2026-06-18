import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { GuidedInputFlow, useVisualizationGate } from '../../components/onboarding';

type Operation = 'union' | 'intersection' | 'differenceAB' | 'differenceBA';

const EXAMPLE_A = '1, 2, 3, 4, 5';
const EXAMPLE_B = '3, 4, 5, 6, 7';

// SVG geometry for the two overlapping circles
const AX = 158;
const BX = 242;
const CY = 130;
const R = 96;

const SetsVennVisualizer = () => {
  const [setAInput, setSetAInput] = useState('');
  const [setBInput, setSetBInput] = useState('');
  const [operation, setOperation] = useState<Operation>('union');

  const parseSet = (input: string): number[] =>
    [...new Set(
      input.split(',').map((s) => s.trim()).filter((s) => s !== '' && !isNaN(Number(s))).map(Number),
    )].sort((a, b) => a - b);

  const setA = parseSet(setAInput);
  const setB = parseSet(setBInput);

  const union = [...new Set([...setA, ...setB])].sort((a, b) => a - b);
  const intersection = setA.filter((x) => setB.includes(x));
  const differenceAB = setA.filter((x) => !setB.includes(x));
  const differenceBA = setB.filter((x) => !setA.includes(x));

  const onlyA = differenceAB;
  const common = intersection;
  const onlyB = differenceBA;

  const result =
    operation === 'union' ? union
    : operation === 'intersection' ? intersection
    : operation === 'differenceAB' ? differenceAB
    : differenceBA;

  const operationLabel =
    operation === 'union' ? 'A ∪ B (Union)'
    : operation === 'intersection' ? 'A ∩ B (Intersection)'
    : operation === 'differenceAB' ? 'A − B (Difference)'
    : 'B − A (Difference)';

  // Which Venn regions the active operation lights up.
  const active = {
    onlyA: operation === 'union' || operation === 'differenceAB',
    inter: operation === 'union' || operation === 'intersection',
    onlyB: operation === 'union' || operation === 'differenceBA',
  };

  const gate = useVisualizationGate();
  const buildComplete = setA.length > 0 && setB.length > 0;
  const showVisualization = buildComplete && gate.visualizationConfirmed;

  const reset = () => {
    setSetAInput('');
    setSetBInput('');
    gate.resetVisualization();
    setOperation('union');
  };

  const fillExample = () => {
    setSetAInput(EXAMPLE_A);
    setSetBInput(EXAMPLE_B);
    setOperation('union');
  };

  const renderNumbers = (nums: number[], cx: number, lit: boolean) => {
    const lineH = 20;
    const startY = CY - ((nums.length - 1) * lineH) / 2;
    return nums.map((n, i) => (
      <text
        key={n}
        x={cx}
        y={startY + i * lineH}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="15"
        fontWeight="bold"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        className={lit ? 'text-base-content' : 'text-base-content/30'}
      >
        {n}
      </text>
    ));
  };

  const inputA = (
    <div>
      <label htmlFor="venn-a" className="block mb-2 font-bold text-sm text-primary">Set A (comma-separated):</label>
      <input
        id="venn-a"
        type="text"
        value={setAInput}
        onChange={(e) => setSetAInput(e.target.value)}
        className="input input-bordered w-full font-mono"
        placeholder="1, 2, 3, 4, 5"
      />
      <div className="mt-1 text-xs text-base-content/50">
        A = &#123;{setA.join(', ')}&#125; &nbsp; n(A) = {setA.length}
      </div>
    </div>
  );

  const inputB = (
    <div>
      <label htmlFor="venn-b" className="block mb-2 font-bold text-sm text-secondary">Set B (comma-separated):</label>
      <input
        id="venn-b"
        type="text"
        value={setBInput}
        onChange={(e) => setSetBInput(e.target.value)}
        className="input input-bordered w-full font-mono"
        placeholder="3, 4, 5, 6, 7"
      />
      <div className="mt-1 text-xs text-base-content/50">
        B = &#123;{setB.join(', ')}&#125; &nbsp; n(B) = {setB.length}
      </div>
    </div>
  );

  return (
    <VisualizerLayout
      title="Sets & Venn Diagrams (Mga Set at Venn Diagram)"
      description="Type two sets, pick union, intersection, or difference, and watch the matching Venn region fill in while the inclusion–exclusion count updates live."
      adSlotId="2016"
      guideLink="/blog/sets-venn"
    >
      {!showVisualization ? (
        <GuidedInputFlow
          intro="Type two sets of numbers, then shade their union, intersection, or difference on a Venn diagram."
          onFillExample={fillExample}
          onReset={reset}
          awaitingVisualizationConfirm={buildComplete && !gate.visualizationConfirmed}
          onVisualizationConfirm={gate.confirmVisualization}

          steps={[
            { id: 'a', title: 'Type Set A', helper: 'Comma-separated numbers, e.g. 1, 2, 3, 4, 5.', complete: setA.length > 0, children: inputA },
            { id: 'b', title: 'Type Set B', helper: 'Comma-separated numbers, e.g. 3, 4, 5, 6, 7.', complete: setB.length > 0, children: inputB },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col gap-8">

          {/* Input controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-200 p-6 rounded-xl border border-base-300">
            {inputA}
            {inputB}
          </div>

          {/* Operation selector */}
          <div className="flex flex-wrap gap-2 justify-center">
            {([
              { key: 'union', label: 'A ∪ B', desc: 'Union' },
              { key: 'intersection', label: 'A ∩ B', desc: 'Intersection' },
              { key: 'differenceAB', label: 'A − B', desc: 'Difference' },
              { key: 'differenceBA', label: 'B − A', desc: 'Difference' },
            ] as const).map((op) => (
              <button
                key={op.key}
                onClick={() => setOperation(op.key)}
                className={`btn ${operation === op.key ? 'btn-warning' : 'btn-outline'}`}
                aria-pressed={operation === op.key}
              >
                <span className="font-mono font-bold">{op.label}</span>
                <span className="text-xs opacity-70 ml-1">({op.desc})</span>
              </button>
            ))}
          </div>

          {/* Venn diagram (SVG with real region fills) */}
          <div className="bg-base-200 rounded-xl p-4 border-2 border-base-300">
            <svg
              viewBox="0 0 400 260"
              className="w-full h-auto max-h-[320px]"
              role="img"
              aria-label={`Venn diagram. The ${operationLabel} region is shaded. Result is {${result.join(', ')}}.`}
            >
              <defs>
                <clipPath id="venn-clipA">
                  <circle cx={AX} cy={CY} r={R} />
                </clipPath>
                <mask id="venn-maskA">
                  <circle cx={AX} cy={CY} r={R} fill="white" />
                  <circle cx={BX} cy={CY} r={R} fill="black" />
                </mask>
                <mask id="venn-maskB">
                  <circle cx={BX} cy={CY} r={R} fill="white" />
                  <circle cx={AX} cy={CY} r={R} fill="black" />
                </mask>
              </defs>

              {/* Faint base fills so both circles always read */}
              <circle cx={AX} cy={CY} r={R} fill="currentColor" className="text-primary" fillOpacity="0.05" />
              <circle cx={BX} cy={CY} r={R} fill="currentColor" className="text-secondary" fillOpacity="0.05" />

              {/* Active region highlights */}
              {active.onlyA && (
                <circle cx={AX} cy={CY} r={R} fill="currentColor" className="text-warning" fillOpacity="0.35" mask="url(#venn-maskA)" />
              )}
              {active.onlyB && (
                <circle cx={BX} cy={CY} r={R} fill="currentColor" className="text-warning" fillOpacity="0.35" mask="url(#venn-maskB)" />
              )}
              {active.inter && (
                <g clipPath="url(#venn-clipA)">
                  <circle cx={BX} cy={CY} r={R} fill="currentColor" className="text-warning" fillOpacity="0.6" />
                </g>
              )}

              {/* Circle outlines */}
              <circle cx={AX} cy={CY} r={R} fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary" />
              <circle cx={BX} cy={CY} r={R} fill="none" stroke="currentColor" strokeWidth="2.5" className="text-secondary" />

              {/* Set labels */}
              <text x={AX - R + 18} y={CY - R + 18} fontSize="16" fontWeight="bold" fill="currentColor" className="text-primary">A</text>
              <text x={BX + R - 26} y={CY - R + 18} fontSize="16" fontWeight="bold" fill="currentColor" className="text-secondary">B</text>

              {/* Region members */}
              {renderNumbers(onlyA, AX - 42, active.onlyA)}
              {renderNumbers(common, (AX + BX) / 2, active.inter)}
              {renderNumbers(onlyB, BX + 42, active.onlyB)}
            </svg>
          </div>

          {/* Result */}
          <div className="bg-base-200 border-2 border-base-300 rounded-xl p-6 text-center">
            <div className="text-sm font-bold text-warning/70 uppercase tracking-wider mb-2">{operationLabel}</div>
            <div className="text-2xl font-mono font-bold text-warning mb-2">
              &#123;{result.join(', ')}&#125;
            </div>
            <div className="text-sm text-base-content/60">Cardinality: n = {result.length}</div>
          </div>

          {/* Inclusion–exclusion identity (live) */}
          <div className="bg-base-200 border border-base-300 rounded-xl p-6">
            <h3 className="font-bold text-sm uppercase tracking-wider text-base-content/60 mb-3">
              Inclusion–Exclusion Principle
            </h3>
            <p className="text-sm text-base-content/70 m-0 mb-4">
              When you simply add n(A) and n(B), the shared elements get counted twice — once in each set. Subtracting n(A ∩ B) fixes the double count, which is why this always matches n(A ∪ B).
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-lg">
              <span className="text-base-content/70">n(A ∪ B)</span>
              <span>=</span>
              <span className="text-primary font-bold">n(A)</span>
              <span>+</span>
              <span className="text-secondary font-bold">n(B)</span>
              <span>−</span>
              <span className="text-warning font-bold">n(A ∩ B)</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-2xl mt-2">
              <span className="font-extrabold text-base-content">{union.length}</span>
              <span>=</span>
              <span className="text-primary font-bold">{setA.length}</span>
              <span>+</span>
              <span className="text-secondary font-bold">{setB.length}</span>
              <span>−</span>
              <span className="text-warning font-bold">{intersection.length}</span>
            </div>
            <div className="text-center text-xs text-base-content/50 mt-2">
              {setA.length} + {setB.length} − {intersection.length} = {setA.length + setB.length - intersection.length}
            </div>
          </div>

          {/* Quick examples */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => { setSetAInput('1, 2, 3, 4, 5'); setSetBInput('3, 4, 5, 6, 7'); }} className="btn btn-outline btn-xs">Overlapping</button>
            <button onClick={() => { setSetAInput('2, 4, 6, 8, 10'); setSetBInput('1, 2, 3, 4, 5'); }} className="btn btn-outline btn-xs">Even &amp; Small</button>
            <button onClick={() => { setSetAInput('1, 3, 5, 7, 9'); setSetBInput('2, 4, 6, 8, 10'); }} className="btn btn-outline btn-xs">Odd &amp; Even (Disjoint)</button>
            <button onClick={() => { setSetAInput('1, 2, 3'); setSetBInput('1, 2, 3, 4, 5'); }} className="btn btn-outline btn-xs">Subset</button>
            <button onClick={reset} className="btn btn-ghost btn-xs">Reset</button>
          </div>

        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default SetsVennVisualizer;
