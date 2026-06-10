import SequencesMdx from '../../content/deep-dives/sequences.mdx';
import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

type SeqType = 'arithmetic' | 'geometric';

const SequencesVisualizer = () => {
  const [seqType, setSeqType] = useState<SeqType>('arithmetic');
  const [firstTerm, setFirstTerm] = useState(2);
  const [commonDiff, setCommonDiff] = useState(3);
  const [commonRatio, setCommonRatio] = useState(2);
  const [nthTerm, setNthTerm] = useState(8);

  const generateSequence = (count: number) => {
    const terms: number[] = [];
    for (let i = 0; i < count; i++) {
      if (seqType === 'arithmetic') {
        terms.push(firstTerm + i * commonDiff);
      } else {
        terms.push(firstTerm * Math.pow(commonRatio, i));
      }
    }
    return terms;
  };

  const terms = generateSequence(nthTerm);

  const getNthValue = (n: number) => {
    if (seqType === 'arithmetic') return firstTerm + (n - 1) * commonDiff;
    return firstTerm * Math.pow(commonRatio, n - 1);
  };

  const nthValue = getNthValue(nthTerm);

  // Find max value for scaling the bars
  const maxVal = Math.max(...terms.map(Math.abs), 1);

  return (
    <VisualizerLayout
      title="Sequences & Patterns (Mga Pagkakasunud-sunod)"
      description="Visualize arithmetic and geometric sequences. Build the formula for the nth term interactively."
      adSlotId="2013"
      educationalContent={<SequencesMdx />}
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col lg:flex-row gap-8">

          {/* Visualization */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Bar chart */}
            <div className="bg-slate-900 rounded-xl p-6 border-2 border-base-300 min-h-[280px] flex items-end gap-1 md:gap-2">
              {terms.map((val, i) => {
                const barHeight = Math.max(8, (Math.abs(val) / maxVal) * 220);
                const isNegative = val < 0;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs font-mono font-bold text-base-content/80 truncate max-w-full">
                      {val > 9999 ? val.toExponential(1) : val}
                    </span>
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 ${
                        i === terms.length - 1
                          ? 'bg-warning shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                          : seqType === 'arithmetic'
                          ? 'bg-primary/70'
                          : 'bg-secondary/70'
                      } ${isNegative ? 'opacity-50' : ''}`}
                      style={{ height: `${barHeight}px` }}
                    />
                    <span className="text-[10px] font-mono text-base-content/50">
                      {i + 1}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Differences / Ratios row */}
            <div className="flex items-center gap-1 flex-wrap justify-center">
              {terms.slice(0, -1).map((val, i) => {
                const next = terms[i + 1];
                return (
                  <div key={i} className="flex items-center gap-1">
                    <div className="badge badge-sm badge-outline font-mono">{val > 9999 ? val.toExponential(0) : val}</div>
                    <span className="text-xs font-bold text-warning">
                      {seqType === 'arithmetic' ? `+${commonDiff}` : `×${commonRatio}`}
                    </span>
                    {i === terms.length - 2 && (
                      <div className="badge badge-sm badge-warning font-mono">{next > 9999 ? next.toExponential(0) : next}</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Formula display */}
            <div className="bg-base-200 p-5 rounded-xl border border-base-300">
              <div className="text-xs font-bold text-base-content/60 uppercase tracking-wider mb-3">Formula Builder</div>
              {seqType === 'arithmetic' ? (
                <div className="space-y-2">
                  <div className="font-mono text-lg">
                    <span className="text-warning font-bold">a<sub>n</sub></span>
                    {' = '}
                    <span className="text-primary">{firstTerm}</span>
                    {' + ('}
                    <span className="text-secondary">n</span>
                    {' − 1) × '}
                    <span className="text-accent">{commonDiff}</span>
                  </div>
                  <div className="font-mono text-lg">
                    <span className="text-warning font-bold">a<sub>{nthTerm}</sub></span>
                    {' = '}
                    <span className="text-primary">{firstTerm}</span>
                    {' + ('}
                    <span className="text-secondary">{nthTerm}</span>
                    {' − 1) × '}
                    <span className="text-accent">{commonDiff}</span>
                    {' = '}
                    <span className="text-warning font-extrabold text-2xl">{nthValue}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="font-mono text-lg">
                    <span className="text-warning font-bold">a<sub>n</sub></span>
                    {' = '}
                    <span className="text-primary">{firstTerm}</span>
                    {' × '}
                    <span className="text-accent">{commonRatio}</span>
                    <sup>(<span className="text-secondary">n</span> − 1)</sup>
                  </div>
                  <div className="font-mono text-lg">
                    <span className="text-warning font-bold">a<sub>{nthTerm}</sub></span>
                    {' = '}
                    <span className="text-primary">{firstTerm}</span>
                    {' × '}
                    <span className="text-accent">{commonRatio}</span>
                    <sup>({nthTerm} − 1)</sup>
                    {' = '}
                    <span className="text-warning font-extrabold text-2xl">{nthValue > 9999 ? nthValue.toExponential(2) : nthValue}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 flex flex-col gap-5 bg-base-200 p-6 rounded-xl border border-base-300">
            <div>
              <label className="block mb-2 font-bold text-sm">Sequence Type:</label>
              <div className="flex gap-2">
                <button onClick={() => setSeqType('arithmetic')} className={`btn flex-1 btn-sm ${seqType === 'arithmetic' ? 'btn-primary' : 'btn-outline'}`}>
                  Arithmetic
                </button>
                <button onClick={() => setSeqType('geometric')} className={`btn flex-1 btn-sm ${seqType === 'geometric' ? 'btn-secondary' : 'btn-outline'}`}>
                  Geometric
                </button>
              </div>
            </div>

            <div>
              <label className="flex justify-between mb-2 font-semibold text-sm">
                <span>First Term (<span className="font-serif italic">a<sub>1</sub></span>)</span>
                <span className="text-primary font-mono">{firstTerm}</span>
              </label>
              <input type="range" min="-5" max="10" step="1" value={firstTerm} onChange={e => setFirstTerm(Number(e.target.value))} className="range range-primary range-sm" />
            </div>

            {seqType === 'arithmetic' ? (
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Common Diff (<span className="font-serif italic">d</span>)</span>
                  <span className="text-accent font-mono">{commonDiff}</span>
                </label>
                <input type="range" min="-5" max="10" step="1" value={commonDiff} onChange={e => setCommonDiff(Number(e.target.value))} className="range range-accent range-sm" />
              </div>
            ) : (
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Common Ratio (<span className="font-serif italic">r</span>)</span>
                  <span className="text-accent font-mono">{commonRatio}</span>
                </label>
                <input type="range" min="-3" max="5" step="1" value={commonRatio} onChange={e => setCommonRatio(Number(e.target.value))} className="range range-accent range-sm" />
              </div>
            )}

            <div>
              <label className="flex justify-between mb-2 font-semibold text-sm">
                <span>Show terms up to <span className="font-serif italic">n</span></span>
                <span className="text-warning font-mono">{nthTerm}</span>
              </label>
              <input type="range" min="3" max="15" step="1" value={nthTerm} onChange={e => setNthTerm(Number(e.target.value))} className="range range-warning range-sm" />
            </div>

            {/* Quick examples */}
            <div className="border-t border-base-300 pt-4">
              <label className="block mb-2 font-bold text-xs text-base-content/60 uppercase tracking-wider">Try These Patterns</label>
              <div className="flex flex-col gap-2">
                <button onClick={() => { setSeqType('arithmetic'); setFirstTerm(2); setCommonDiff(3); setNthTerm(8); }} className="btn btn-outline btn-xs">2, 5, 8, 11... (d=3)</button>
                <button onClick={() => { setSeqType('arithmetic'); setFirstTerm(10); setCommonDiff(-2); setNthTerm(8); }} className="btn btn-outline btn-xs">10, 8, 6, 4... (d=−2)</button>
                <button onClick={() => { setSeqType('geometric'); setFirstTerm(3); setCommonRatio(2); setNthTerm(8); }} className="btn btn-outline btn-xs">3, 6, 12, 24... (r=2)</button>
                <button onClick={() => { setSeqType('geometric'); setFirstTerm(1); setCommonRatio(3); setNthTerm(7); }} className="btn btn-outline btn-xs">1, 3, 9, 27... (r=3)</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </VisualizerLayout>
  );
};
export default SequencesVisualizer;
