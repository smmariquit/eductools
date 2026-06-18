import { useState, useMemo, useEffect, useRef } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { StatCard } from '../../components/ui/StatCard';
import { Toggle } from '../../components/ui/Toggle';
import { GuidedInputFlow, useTouchedFields } from '../../components/onboarding';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const BlockMath = ({ math }: { math: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(math, ref.current, { displayMode: true, throwOnError: false });
    }
  }, [math]);
  return <div ref={ref} />;
};

const InlineMath = ({ math }: { math: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(math, ref.current, { displayMode: false, throwOnError: false });
    }
  }, [math]);
  return <span ref={ref} />;
};

type Mode = 'permutation' | 'combination';

const DEFAULTS = { mode: 'permutation' as Mode, n: 5, r: 3 };

// Descending list of whole numbers from `from` down to `to` (inclusive).
const descending = (from: number, to: number): number[] => {
  const out: number[] = [];
  for (let i = from; i >= to; i--) out.push(i);
  return out;
};
// Factors of k! written out: k × (k−1) × … × 1 (empty product for 0! and 1!).
const factorialFactors = (k: number): number[] => (k <= 1 ? [] : descending(k, 1));
const factorsText = (k: number): string => {
  const f = factorialFactors(k);
  return f.length === 0 ? '1' : f.join(' × ');
};

const PermutationsCombinationsVisualizer = () => {
  const [mode, setMode] = useState<Mode>(DEFAULTS.mode);
  const [n, setN] = useState(DEFAULTS.n);
  const [r, setR] = useState(DEFAULTS.r);
  const fields = useTouchedFields<'mode' | 'n' | 'r'>();
  const ready = fields.isTouched('mode') && fields.isTouched('n') && fields.isTouched('r');

  const reset = () => {
    setMode(DEFAULTS.mode);
    setN(DEFAULTS.n);
    setR(DEFAULTS.r);
    fields.reset();
  };

  const fillExample = () => {
    setMode(DEFAULTS.mode);
    setN(DEFAULTS.n);
    setR(DEFAULTS.r);
    fields.touchAll(['mode', 'n', 'r']);
  };

  const factorial = (num: number): number => {
    if (num <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) result *= i;
    return result;
  };

  const nPr = factorial(n) / factorial(n - r);
  const nCr = factorial(n) / (factorial(r) * factorial(n - r));
  const result = mode === 'permutation' ? nPr : nCr;

  // Generate visual items (colored circles)
  const items = useMemo(() => {
    const colors = [
      { bg: 'bg-red-500', text: 'A', ring: 'ring-red-400' },
      { bg: 'bg-blue-500', text: 'B', ring: 'ring-blue-400' },
      { bg: 'bg-green-500', text: 'C', ring: 'ring-green-400' },
      { bg: 'bg-yellow-500', text: 'D', ring: 'ring-yellow-400' },
      { bg: 'bg-purple-500', text: 'E', ring: 'ring-purple-400' },
      { bg: 'bg-pink-500', text: 'F', ring: 'ring-pink-400' },
      { bg: 'bg-cyan-500', text: 'G', ring: 'ring-cyan-400' },
      { bg: 'bg-orange-500', text: 'H', ring: 'ring-orange-400' },
      { bg: 'bg-teal-500', text: 'I', ring: 'ring-teal-400' },
      { bg: 'bg-indigo-500', text: 'J', ring: 'ring-indigo-400' },
    ];
    return colors.slice(0, n);
  }, [n]);

  // Generate a sample of arrangements (limited to prevent performance issues)
  const sampleArrangements = useMemo(() => {
    const arrangements: number[][] = [];
    const indices = Array.from({ length: n }, (_, i) => i);

    if (mode === 'permutation') {
      // Generate permutations using backtracking (limited)
      const generate = (current: number[], remaining: number[]) => {
        if (arrangements.length >= 20) return;
        if (current.length === r) {
          arrangements.push([...current]);
          return;
        }
        for (let i = 0; i < remaining.length; i++) {
          current.push(remaining[i]);
          generate(current, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
          current.pop();
        }
      };
      generate([], indices);
    } else {
      // Generate combinations
      const generate = (start: number, current: number[]) => {
        if (arrangements.length >= 20) return;
        if (current.length === r) {
          arrangements.push([...current]);
          return;
        }
        for (let i = start; i < n; i++) {
          current.push(i);
          generate(i + 1, current);
          current.pop();
        }
      };
      generate(0, []);
    }

    return arrangements;
  }, [n, r, mode]);

  const modeControl = (
    <Toggle
      options={[
        { value: 'permutation', label: 'Permutation (Order Matters)', activeColor: 'primary' },
        { value: 'combination', label: "Combination (Order Doesn't)", activeColor: 'secondary' }
      ]}
      value={mode}
      onChange={(val) => { setMode(val as 'permutation' | 'combination'); fields.touch('mode'); }}
    />
  );

  const nControl = (
    <Slider
      label={<>Total items (<span className="font-serif italic">n</span>)</>}
      value={n}
      min={2}
      max={10}
      colorClass="primary"
      onChange={e => { const v = Number(e.target.value); setN(v); if (r > v) setR(v); fields.touch('n'); }}
      aria-valuetext={`${n} total items`}
    />
  );

  const rControl = (
    <Slider
      label={<>Choose (<span className="font-serif italic">r</span>)</>}
      value={r}
      min={1}
      max={n}
      colorClass="secondary"
      onChange={e => { setR(Number(e.target.value)); fields.touch('r'); }}
      aria-valuetext={`choose ${r}`}
    />
  );

  return (
    <VisualizerLayout
      title="Permutations & Combinations (Permutasyon at Kumbinasyon)"
      description="Understand the difference between permutations (order matters) and combinations (order doesn't matter) with visual counting."
      adSlotId="2020"
      guideLink="/blog/permutations-combinations"
    >
      {!ready ? (
        <GuidedInputFlow
          intro="Choose whether order matters, then set how many items you have and how many to pick."
          onFillExample={fillExample}
          onReset={reset}
          steps={[
            { id: 'mode', title: 'Pick the counting type', helper: 'Permutation if order matters, combination if not.', complete: fields.isTouched('mode'), children: modeControl },
            { id: 'n', title: 'Set the total items', helper: 'How many items to choose from (2 to 10).', complete: fields.isTouched('n'), children: nControl },
            { id: 'r', title: 'Set how many to choose', helper: 'How many to pick (1 to n).', complete: fields.isTouched('r'), children: rControl },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col gap-8">

          {/* Mode toggle */}
          {modeControl}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Visual area */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Available items */}
              <div className="bg-base-200 p-5 rounded-xl border border-base-300">
                <div className="text-xs font-bold text-base-content/60 uppercase tracking-wider mb-3">
                  Available Items (n = {n})
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {items.map((item, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample arrangements */}
              <div className="bg-base-200 rounded-xl p-5 border-2 border-base-300 max-h-[360px] overflow-y-auto">
                <div className="text-xs font-bold text-base-content/60 uppercase tracking-wider mb-3">
                  {mode === 'permutation' ? 'Arrangements' : 'Groups'} (showing {Math.min(sampleArrangements.length, 20)} of {result > 9999 ? result.toExponential(0) : result})
                </div>
                <div className="flex flex-col gap-2">
                  {sampleArrangements.map((arr, i) => (
                    <div key={i} className="flex items-center gap-2 bg-base-100/5 p-2 rounded-lg">
                      <span className="text-xs font-mono text-base-content/40 w-6">{i + 1}.</span>
                      <div className="flex gap-1">
                        {arr.map((idx, j) => (
                          <div key={j} className={`w-8 h-8 rounded-full ${items[idx].bg} flex items-center justify-center text-white font-bold text-xs`}>
                            {items[idx].text}
                          </div>
                        ))}
                      </div>
                      {mode === 'permutation' && (
                        <span className="text-xs font-mono text-base-content/30 ml-2">
                          ({arr.map(idx => items[idx].text).join(', ')})
                        </span>
                      )}
                    </div>
                  ))}
                  {result > 20 && (
                    <div className="text-center text-sm text-base-content/40 py-2">
                      ... and {result - 20} more {mode === 'permutation' ? 'arrangements' : 'groups'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Controls & formula */}
            <div className="w-full lg:w-80 flex flex-col gap-6">
              <div className="bg-base-200 p-6 rounded-xl border border-base-300 flex flex-col gap-5">
                {nControl}
                {rControl}
              </div>

              {/* Formula breakdown */}
              <div className="bg-base-200 p-6 rounded-xl border border-base-300 space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-base-content/60">Formula</h3>

                {mode === 'permutation' ? (
                  <div className="overflow-x-auto text-primary">
                    <BlockMath math={`P(${n}, ${r}) = \\frac{${n}!}{(${n}-${r})!}`} />
                    <BlockMath math={`= \\frac{${factorial(n)}}{${factorial(n - r)}}`} />
                  </div>
                ) : (
                  <div className="overflow-x-auto text-secondary">
                    <BlockMath math={`C(${n}, ${r}) = \\frac{${n}!}{${r}! \\times (${n}-${r})!}`} />
                    <BlockMath math={`= \\frac{${factorial(n)}}{${factorial(r)} \\times ${factorial(n - r)}}`} />
                  </div>
                )}

                <StatCard 
                  label="Result"
                  value={result > 9999 ? result.toExponential(2) : result}
                  color="warning"
                  borderWidth={2}
                />
              </div>

              {/* Step-by-step expansion — factorials are not a black box */}
              <div className="bg-base-200 p-6 rounded-xl border border-base-300 space-y-3">
                <h3 className="font-bold text-sm uppercase tracking-wider text-base-content/60">Step-by-step</h3>

                <div className="space-y-1 font-mono text-sm">
                  <div>
                    <span className="text-base-content/60">{n}! = </span>
                    <span className="text-primary">{factorsText(n)}</span>
                    <span className="text-base-content/60"> = </span>
                    <span className="font-bold">{factorial(n) > 9999 ? factorial(n).toExponential(1) : factorial(n)}</span>
                  </div>
                  <div>
                    <span className="text-base-content/60">({n}−{r})! = {n - r}! = </span>
                    <span className="text-accent">{factorsText(n - r)}</span>
                    <span className="text-base-content/60"> = </span>
                    <span className="font-bold">{factorial(n - r)}</span>
                  </div>
                  {mode === 'combination' && (
                    <div>
                      <span className="text-base-content/60">{r}! = </span>
                      <span className="text-secondary">{factorsText(r)}</span>
                      <span className="text-base-content/60"> = </span>
                      <span className="font-bold">{factorial(r)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-base-300 pt-3 space-y-2 text-sm">
                  <p className="m-0 text-base-content/70">
                    The {n - r}! factors cancel the tail of {n}!, leaving just the first <span className="font-bold">{r}</span> factors going down:
                  </p>
                  <div className="font-mono">
                    <span className="text-primary font-bold">P({n}, {r})</span>
                    <span className="text-base-content/60"> = </span>
                    <span>{descending(n, n - r + 1).join(' × ')}</span>
                    <span className="text-base-content/60"> = </span>
                    <span className="font-bold text-warning">{nPr > 9999 ? nPr.toExponential(1) : nPr}</span>
                  </div>
                  {mode === 'combination' && (
                    <>
                      <p className="m-0 text-base-content/70">
                        Order doesn&rsquo;t matter, so divide by {r}! to remove the {factorial(r)} re-orderings of each group:
                      </p>
                      <div className="font-mono">
                        <span className="text-secondary font-bold">C({n}, {r})</span>
                        <span className="text-base-content/60"> = </span>
                        <span>{nPr > 9999 ? nPr.toExponential(1) : nPr} ÷ {factorial(r)}</span>
                        <span className="text-base-content/60"> = </span>
                        <span className="font-bold text-warning">{nCr > 9999 ? nCr.toExponential(1) : nCr}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Comparison */}
              <div className="bg-base-200 p-5 rounded-xl border border-base-300">
                <h3 className="font-bold text-xs uppercase tracking-wider text-base-content/60 mb-3">Compare</h3>
                <div className="grid grid-cols-2 gap-3">
                  <StatCard 
                    label={<InlineMath math={`P(${n},${r})`} />}
                    value={nPr > 9999 ? nPr.toExponential(1) : nPr}
                    color="primary"
                    valueClassName="font-mono font-bold text-lg"
                  />
                  <StatCard 
                    label={<InlineMath math={`C(${n},${r})`} />}
                    value={nCr > 9999 ? nCr.toExponential(1) : nCr}
                    color="secondary"
                    valueClassName="font-mono font-bold text-lg"
                  />
                </div>
                <div className="text-xs text-center mt-2 text-base-content/50">
                  P is always ≥ C because order creates more arrangements
                </div>
              </div>

              <button type="button" onClick={reset} className="btn btn-ghost btn-sm self-end">Reset</button>
            </div>
          </div>

        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default PermutationsCombinationsVisualizer;
