import { useState } from 'react';
import { Check } from 'lucide-react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { GuidedInputFlow, useTouchedFields } from '../../components/onboarding';

const DEFAULTS = { numA: 12, numB: 18 };

interface TreeNode {
  value: number;
  isPrime: boolean;
  children?: TreeNode[];
}

// Returns the smallest PROPER prime factor, or null when n is itself prime
// (so 2, 3, 5, ... are leaves rather than splitting into n × 1).
const smallestPrimeFactor = (n: number): number | null => {
  if (n < 4) return null;
  if (n % 2 === 0) return 2;
  for (let d = 3; d * d <= n; d += 2) {
    if (n % d === 0) return d;
  }
  return null;
};

// A real branching factor tree: split off the smallest prime, recurse on the rest.
const buildTree = (n: number): TreeNode => {
  const p = smallestPrimeFactor(n);
  if (p === null) return { value: n, isPrime: true };
  return { value: n, isPrime: false, children: [{ value: p, isPrime: true }, buildTree(n / p)] };
};

const primeFactorize = (n: number): number[] => {
  const out: number[] = [];
  let num = n;
  let p = smallestPrimeFactor(num);
  while (p !== null) {
    out.push(p);
    num /= p;
    p = smallestPrimeFactor(num);
  }
  out.push(num);
  return out;
};

const gcd = (a: number, b: number): number => {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
};

const GAP = 48;
const LEVEL = 56;
const TOP = 22;
const R = 17;

const FactorTree = ({ n, accent }: { n: number; accent: string }) => {
  const root = buildTree(n);
  const nodes: { value: number; x: number; y: number; isPrime: boolean }[] = [];
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  let leaf = 0;
  let maxDepth = 0;

  const layout = (node: TreeNode, depth: number): number => {
    maxDepth = Math.max(maxDepth, depth);
    const y = depth * LEVEL + TOP;
    if (!node.children) {
      const x = leaf * GAP + GAP / 2;
      leaf += 1;
      nodes.push({ value: node.value, x, y, isPrime: node.isPrime });
      return x;
    }
    const childY = (depth + 1) * LEVEL + TOP;
    const xs = node.children.map((c) => layout(c, depth + 1));
    const x = xs.reduce((a, b) => a + b, 0) / xs.length;
    xs.forEach((cx) => edges.push({ x1: x, y1: y, x2: cx, y2: childY }));
    nodes.push({ value: node.value, x, y, isPrime: node.isPrime });
    return x;
  };
  layout(root, 0);

  const w = Math.max(leaf * GAP, GAP);
  const h = (maxDepth + 1) * LEVEL + TOP;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[260px] mx-auto h-auto" role="img" aria-label={`Factor tree for ${n}`}>
      {edges.map((e, i) => (
        <line key={`e-${i}`} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} className="text-base-content" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
      ))}
      {nodes.map((nd, i) => (
        <g key={`n-${i}`} className={nd.isPrime ? 'text-accent' : accent}>
          <circle cx={nd.x} cy={nd.y} r={R} fill="currentColor" fillOpacity={nd.isPrime ? 0.18 : 0.12} stroke="currentColor" strokeWidth={nd.isPrime ? 2.5 : 1.5} />
          <text x={nd.x} y={nd.y} textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="bold" fill="currentColor">{nd.value}</text>
        </g>
      ))}
    </svg>
  );
};

const GcfLcmVisualizer = () => {
  const [numA, setNumA] = useState(DEFAULTS.numA);
  const [numB, setNumB] = useState(DEFAULTS.numB);
  const fields = useTouchedFields<'a' | 'b'>();
  const ready = fields.isTouched('a') && fields.isTouched('b');

  const reset = () => { setNumA(DEFAULTS.numA); setNumB(DEFAULTS.numB); fields.reset(); };

  const fillExample = () => {
    setNumA(DEFAULTS.numA);
    setNumB(DEFAULTS.numB);
    fields.touchAll(['a', 'b']);
  };

  const numAControl = (
    <Slider
      id="gcf-a"
      motif="number"
      label="Number A"
      value={numA}
      min={2}
      max={60}
      step={1}
      colorClass="primary"
      onChange={(e) => { setNumA(Number(e.target.value)); fields.touch('a'); }}
      aria-valuetext={`Number A is ${numA}`}
    />
  );

  const numBControl = (
    <Slider
      id="gcf-b"
      motif="number"
      label="Number B"
      value={numB}
      min={2}
      max={60}
      step={1}
      colorClass="secondary"
      onChange={(e) => { setNumB(Number(e.target.value)); fields.touch('b'); }}
      aria-valuetext={`Number B is ${numB}`}
    />
  );

  const factorsA = primeFactorize(numA);
  const factorsB = primeFactorize(numB);
  const gcfValue = gcd(numA, numB);
  const lcmValue = (numA * numB) / gcfValue;

  const freqA: Record<number, number> = {};
  const freqB: Record<number, number> = {};
  factorsA.forEach((f) => (freqA[f] = (freqA[f] || 0) + 1));
  factorsB.forEach((f) => (freqB[f] = (freqB[f] || 0) + 1));

  const allPrimes = [...new Set([...Object.keys(freqA), ...Object.keys(freqB)])].map(Number).sort((a, b) => a - b);
  const commonFactors: string[] = [];
  const onlyA: string[] = [];
  const onlyB: string[] = [];
  allPrimes.forEach((p) => {
    const cA = freqA[p] || 0;
    const cB = freqB[p] || 0;
    const common = Math.min(cA, cB);
    for (let i = 0; i < common; i++) commonFactors.push(String(p));
    for (let i = 0; i < cA - common; i++) onlyA.push(String(p));
    for (let i = 0; i < cB - common; i++) onlyB.push(String(p));
  });

  const gcfTimesLcm = gcfValue * lcmValue;
  const aTimesB = numA * numB;

  return (
    <VisualizerLayout
      title="GCF & LCM Explorer (GCF at LCM)"
      description="Break two numbers into prime factor trees, find their GCF and LCM, and check the identity GCF × LCM = A × B."
      adSlotId="2015"
      guideLink="/blog/gcf-lcm"
    >
      {!ready ? (
        <GuidedInputFlow
          intro="Pick two whole numbers to factor into primes, then find their GCF and LCM."
          onFillExample={fillExample}
          onReset={reset}
          steps={[
            { id: 'a', title: 'Pick number A', helper: 'A whole number from 2 to 60.', complete: fields.isTouched('a'), children: numAControl },
            { id: 'b', title: 'Pick number B', helper: 'A whole number from 2 to 60.', complete: fields.isTouched('b'), children: numBControl },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col gap-8">

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-200 p-6 rounded-xl border border-base-300">
            {numAControl}
            {numBControl}
          </div>

          {/* Factor Trees */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-base-200 p-5 rounded-xl border border-base-300">
              <h3 className="font-bold text-sm text-primary mb-3">Factor Tree of {numA}</h3>
              <FactorTree n={numA} accent="text-primary" />
              <div className="mt-3 text-center text-sm font-mono text-base-content/70">
                {numA} = {factorsA.join(' × ')}
              </div>
            </div>
            <div className="bg-base-200 p-5 rounded-xl border border-base-300">
              <h3 className="font-bold text-sm text-secondary mb-3">Factor Tree of {numB}</h3>
              <FactorTree n={numB} accent="text-secondary" />
              <div className="mt-3 text-center text-sm font-mono text-base-content/70">
                {numB} = {factorsB.join(' × ')}
              </div>
            </div>
          </div>

          {/* Venn Diagram */}
          <div className="bg-base-200 rounded-xl p-8 border-2 border-base-300">
            <h3 className="text-center text-sm font-bold text-base-content/60 uppercase tracking-wider mb-6">Shared &amp; unique prime factors</h3>
            <div className="flex items-center justify-center gap-0 relative min-h-[180px]">
              <div className="w-48 h-48 rounded-full border-[3px] border-primary/50 bg-primary/10 flex items-center justify-center relative -mr-12 z-10">
                <div className="absolute top-2 left-4 text-xs font-bold text-primary">{numA}</div>
                <div className="flex flex-wrap gap-1 justify-center pr-10">
                  {onlyA.map((f, i) => (
                    <span key={`a-${i}`} className="badge badge-primary badge-sm font-mono font-bold">{f}</span>
                  ))}
                </div>
              </div>
              <div className="absolute z-20 flex flex-wrap gap-1 justify-center max-w-20">
                {commonFactors.map((f, i) => (
                  <span key={`c-${i}`} className="badge badge-warning badge-sm font-mono font-bold">{f}</span>
                ))}
              </div>
              <div className="w-48 h-48 rounded-full border-[3px] border-secondary/50 bg-secondary/10 flex items-center justify-center relative -ml-12 z-10">
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
                GCF = {commonFactors.length > 0 ? commonFactors.join(' × ') : '1 (no shared primes)'}
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

          {/* Identity readout */}
          <div className="rounded-xl border-2 border-info/30 bg-info/5 p-5 text-center">
            <div className="text-xs uppercase tracking-wider font-bold text-info/70 mb-2">The GCF–LCM identity</div>
            <div className="text-lg md:text-2xl font-mono font-bold text-base-content flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span className="text-warning">{gcfValue}</span>
              <span className="text-base-content/50">×</span>
              <span className="text-accent">{lcmValue}</span>
              <span className="text-base-content/50">=</span>
              <span className="text-primary">{numA}</span>
              <span className="text-base-content/50">×</span>
              <span className="text-secondary">{numB}</span>
            </div>
            <div className="text-sm font-mono text-base-content/70 mt-2">
              {gcfTimesLcm} = {aTimesB} {gcfTimesLcm === aTimesB && (
                <Check aria-hidden="true" className="inline w-4 h-4 text-success align-text-bottom" />
              )}
            </div>
            <p className="text-sm text-base-content/70 mt-2 m-0">
              For any two whole numbers, the GCF times the LCM equals the product of the numbers.
            </p>
          </div>

          <div className="flex justify-end">
            <button className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
          </div>

        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default GcfLcmVisualizer;
