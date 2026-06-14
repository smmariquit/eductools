import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

const GcfLcmVisualizer = () => {
  const [numA, setNumA] = useState(12);
  const [numB, setNumB] = useState(18);

  const primeFactorize = (n: number): number[] => {
    const factors: number[] = [];
    let num = Math.abs(n);
    if (num <= 1) return [num];
    for (let d = 2; d * d <= num; d++) {
      while (num % d === 0) { factors.push(d); num /= d; }
    }
    if (num > 1) factors.push(num);
    return factors;
  };

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { [a, b] = [b, a % b]; }
    return a;
  };

  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  const factorsA = primeFactorize(numA);
  const factorsB = primeFactorize(numB);
  const gcfValue = gcd(numA, numB);
  const lcmValue = lcm(numA, numB);

  // Build factor frequency maps for Venn diagram
  const freqA: Record<number, number> = {};
  const freqB: Record<number, number> = {};
  factorsA.forEach(f => freqA[f] = (freqA[f] || 0) + 1);
  factorsB.forEach(f => freqB[f] = (freqB[f] || 0) + 1);

  // Common factors (intersection): min of each prime
  const allPrimes = [...new Set([...Object.keys(freqA), ...Object.keys(freqB)])].map(Number).sort((a, b) => a - b);
  
  const commonFactors: string[] = [];
  const onlyA: string[] = [];
  const onlyB: string[] = [];

  allPrimes.forEach(p => {
    const countA = freqA[p] || 0;
    const countB = freqB[p] || 0;
    const common = Math.min(countA, countB);
    const extraA = countA - common;
    const extraB = countB - common;
    for (let i = 0; i < common; i++) commonFactors.push(String(p));
    for (let i = 0; i < extraA; i++) onlyA.push(String(p));
    for (let i = 0; i < extraB; i++) onlyB.push(String(p));
  });

  const renderFactorTree = (n: number, factors: number[]) => {
    if (factors.length <= 1) {
      return <span className="badge badge-primary font-mono font-bold">{n}</span>;
    }

    const steps: { value: number; factor: number }[] = [];
    let remaining = n;
    for (const f of factors) {
      steps.push({ value: remaining, factor: f });
      remaining = remaining / f;
    }

    return (
      <div className="flex flex-col items-center gap-1">
        <div className="badge badge-lg badge-outline font-mono font-bold text-lg">{n}</div>
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-px h-3 bg-base-content/20" />
            <div className="flex items-center gap-3">
              <span className="badge badge-primary badge-sm font-mono font-bold">{step.factor}</span>
              <span className="text-xs text-base-content/40">×</span>
              <span className="badge badge-outline badge-sm font-mono">
                {i < steps.length - 1 ? step.value / step.factor : step.value / step.factor}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <VisualizerLayout
      title="GCF & LCM Explorer (GCF at LCM)"
      description="Find the Greatest Common Factor and Least Common Multiple using prime factorization and Venn diagrams."
      adSlotId="2015"
      guideLink="/blog/gcf-lcm"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col gap-8">

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-200 p-6 rounded-xl border border-base-300">
            <div>
              <label className="flex justify-between mb-2 font-semibold text-sm">
                <span>Number A</span>
                <span className="text-primary font-mono text-lg font-bold">{numA}</span>
              </label>
              <input type="range" min="2" max="60" step="1" value={numA} onChange={e => setNumA(Number(e.target.value))} className="range range-primary range-sm" />
            </div>
            <div>
              <label className="flex justify-between mb-2 font-semibold text-sm">
                <span>Number B</span>
                <span className="text-secondary font-mono text-lg font-bold">{numB}</span>
              </label>
              <input type="range" min="2" max="60" step="1" value={numB} onChange={e => setNumB(Number(e.target.value))} className="range range-secondary range-sm" />
            </div>
          </div>

          {/* Factor Trees */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-base-200 p-5 rounded-xl border border-base-300">
              <h3 className="font-bold text-sm text-primary mb-3">Factor Tree of {numA}</h3>
              <div className="flex justify-center">
                {renderFactorTree(numA, factorsA)}
              </div>
              <div className="mt-3 text-center text-sm font-mono text-base-content/70">
                {numA} = {factorsA.join(' × ')}
              </div>
            </div>
            <div className="bg-base-200 p-5 rounded-xl border border-base-300">
              <h3 className="font-bold text-sm text-secondary mb-3">Factor Tree of {numB}</h3>
              <div className="flex justify-center">
                {renderFactorTree(numB, factorsB)}
              </div>
              <div className="mt-3 text-center text-sm font-mono text-base-content/70">
                {numB} = {factorsB.join(' × ')}
              </div>
            </div>
          </div>

          {/* Venn Diagram */}
          <div className="bg-slate-900 rounded-xl p-8 border-2 border-base-300">
            <h3 className="text-center text-sm font-bold text-base-content/60 uppercase tracking-wider mb-6">Venn Diagram of Prime Factors</h3>
            <div className="flex items-center justify-center gap-0 relative min-h-[180px]">
              {/* Circle A */}
              <div className="w-48 h-48 rounded-full border-3 border-primary/50 bg-primary/10 flex items-center justify-center relative -mr-12 z-10">
                <div className="absolute top-2 left-4 text-xs font-bold text-primary">{numA}</div>
                <div className="flex flex-wrap gap-1 justify-center pr-10">
                  {onlyA.map((f, i) => (
                    <span key={`a-${i}`} className="badge badge-primary badge-sm font-mono font-bold">{f}</span>
                  ))}
                </div>
              </div>

              {/* Overlap zone */}
              <div className="absolute z-20 flex flex-wrap gap-1 justify-center max-w-20">
                {commonFactors.map((f, i) => (
                  <span key={`c-${i}`} className="badge badge-warning badge-sm font-mono font-bold">{f}</span>
                ))}
              </div>

              {/* Circle B */}
              <div className="w-48 h-48 rounded-full border-3 border-secondary/50 bg-secondary/10 flex items-center justify-center relative -ml-12 z-10">
                <div className="absolute top-2 right-4 text-xs font-bold text-secondary">{numB}</div>
                <div className="flex flex-wrap gap-1 justify-center pl-10">
                  {onlyB.map((f, i) => (
                    <span key={`b-${i}`} className="badge badge-secondary badge-sm font-mono font-bold">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-6 rounded-xl bg-base-200 border-2 border-base-300">
              <div className="text-xs uppercase tracking-wider font-bold text-warning/70 mb-2">Greatest Common Factor</div>
              <div className="text-4xl font-extrabold font-mono text-warning mb-2">{gcfValue}</div>
              <div className="text-sm font-mono text-base-content/60">
                GCF = {commonFactors.length > 0 ? commonFactors.join(' × ') : '1'}
              </div>
            </div>
            <div className="text-center p-6 rounded-xl bg-base-200 border-2 border-base-300">
              <div className="text-xs uppercase tracking-wider font-bold text-accent/70 mb-2">Least Common Multiple</div>
              <div className="text-4xl font-extrabold font-mono text-accent mb-2">{lcmValue}</div>
              <div className="text-sm font-mono text-base-content/60">
                LCM = {[...onlyA, ...commonFactors, ...onlyB].join(' × ') || '1'}
              </div>
            </div>
          </div>

        </div>
      </div>
    </VisualizerLayout>
  );
};
export default GcfLcmVisualizer;
