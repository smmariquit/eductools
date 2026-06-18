import { useState, useMemo } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { GuidedInputFlow, useTouchedFields } from '../../components/onboarding';

const GENOTYPES = ['RR', 'Rr', 'rr'] as const;
type Genotype = (typeof GENOTYPES)[number];

// Always write a heterozygous pair with the dominant allele first (Rr, not rR).
const order = (a: string, b: string) => (a === 'R' || b === 'r' ? a + b : b + a);
const isDominant = (g: string) => g.includes('R');
const phenotype = (g: string) => (isDominant(g) ? 'Pula (Red)' : 'Puti (White)');
const cellClass = (g: string) => (isDominant(g) ? 'bg-error text-error-content' : 'bg-base-100 text-base-content border-2 border-base-300');

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const reduce = (nums: number[]) => {
  const nonzero = nums.filter((n) => n > 0);
  if (nonzero.length === 0) return nums;
  const g = nonzero.reduce((acc, n) => gcd(acc, n));
  return nums.map((n) => n / (g || 1));
};

const DEFAULT_P1: Genotype = 'Rr';
const DEFAULT_P2: Genotype = 'Rr';

const PunnettSquareVisualizer = () => {
  const [parent1, setParent1] = useState<Genotype>(DEFAULT_P1);
  const [parent2, setParent2] = useState<Genotype>(DEFAULT_P2);
  const fields = useTouchedFields<'p1' | 'p2'>();
  const ready = fields.isTouched('p1') && fields.isTouched('p2');

  const p1 = parent1.split('');
  const p2 = parent2.split('');

  const { cells, genotypeRatio, phenotypeRatio, genoCounts, phenoCounts } = useMemo(() => {
    const grid: { g: string }[] = [];
    // Each parent contributes one allele per gamete; the grid pairs every
    // gamete from parent 1 with every gamete from parent 2.
    const g1 = parent1.split('');
    const g2 = parent2.split('');
    for (const a2 of g2) {
      for (const a1 of g1) {
        grid.push({ g: order(a1, a2) });
      }
    }
    const gc = { RR: 0, Rr: 0, rr: 0 } as Record<string, number>;
    grid.forEach((c) => { gc[c.g] = (gc[c.g] ?? 0) + 1; });
    const pc = { red: 0, white: 0 };
    grid.forEach((c) => { if (isDominant(c.g)) pc.red++; else pc.white++; });

    const gRatio = reduce([gc.RR, gc.Rr, gc.rr]);
    const pRatio = reduce([pc.red, pc.white]);
    return { cells: grid, genotypeRatio: gRatio, phenotypeRatio: pRatio, genoCounts: gc, phenoCounts: pc };
  }, [parent1, parent2]);

  const reset = () => { setParent1(DEFAULT_P1); setParent2(DEFAULT_P2); fields.reset(); };

  const fillExample = () => { setParent1('Rr'); setParent2('Rr'); fields.touchAll(['p1', 'p2']); };

  const genoParts = (['RR', 'Rr', 'rr'] as const)
    .map((g, i) => ({ g, n: genotypeRatio[i] }))
    .filter((x) => x.n > 0);
  const phenoParts = [
    { label: 'Red', n: phenotypeRatio[0] },
    { label: 'White', n: phenotypeRatio[1] },
  ].filter((x) => x.n > 0);

  const parentButtons = (current: Genotype, set: (g: Genotype) => void, active: string, touchKey: 'p1' | 'p2') =>
    GENOTYPES.map((g) => (
      <button
        key={g}
        type="button"
        aria-pressed={current === g}
        onClick={() => { set(g); fields.touch(touchKey); }}
        className={`btn flex-1 font-mono ${current === g ? active : 'btn-outline'}`}
      >
        {g}
      </button>
    ));

  const parent1Buttons = <div className="flex gap-2">{parentButtons(parent1, setParent1, 'btn-primary', 'p1')}</div>;
  const parent2Buttons = <div className="flex gap-2">{parentButtons(parent2, setParent2, 'btn-secondary', 'p2')}</div>;

  return (
    <VisualizerLayout
      title="Punnett Square (Pagmamana ng Katangian)"
      description="Cross two Gumamela parents (R = red dominant, r = white recessive). See how each parent's alleles split into gametes, then read the genotype and phenotype ratios straight from the grid."
      adSlotId="2005"
      guideLink="/blog/punnett-square"
    >
      {!ready ? (
        <GuidedInputFlow
          intro="Pick each parent's genotype (R = red dominant, r = white recessive) to cross them."
          onFillExample={fillExample}
          onReset={reset}
          steps={[
            { id: 'p1', title: "Pick Parent 1's genotype", helper: 'RR, Rr, or rr.', complete: fields.isTouched('p1'), children: parent1Buttons },
            { id: 'p2', title: "Pick Parent 2's genotype", helper: 'RR, Rr, or rr.', complete: fields.isTouched('p2'), children: parent2Buttons },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col lg:flex-row gap-8">

          <div className="flex-1 flex flex-col gap-6">
            {/* Gamete logic */}
            <div className="bg-base-200 p-4 rounded-xl border border-base-300">
              <h2 className="font-display font-bold text-base-content m-0 mb-3">Step 1 · Split each parent into gametes</h2>
              <div className="flex flex-wrap items-center justify-around gap-4 text-center">
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-primary mb-1">Parent 1</div>
                  <div className="text-2xl font-mono font-bold">{parent1}</div>
                  <div className="text-base-content/50 my-1">↓</div>
                  <div className="flex gap-2 justify-center">
                    {p1.map((a, i) => <span key={i} className="badge badge-lg badge-primary font-mono">{a}</span>)}
                  </div>
                </div>
                <div className="text-3xl text-base-content/30 font-bold">×</div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-secondary mb-1">Parent 2</div>
                  <div className="text-2xl font-mono font-bold">{parent2}</div>
                  <div className="text-base-content/50 my-1">↓</div>
                  <div className="flex gap-2 justify-center">
                    {p2.map((a, i) => <span key={i} className="badge badge-lg badge-secondary font-mono">{a}</span>)}
                  </div>
                </div>
              </div>
              <p className="text-xs text-base-content/60 mt-3 m-0">Each parent passes on just one allele per gamete. A homozygous parent (RR or rr) makes one kind of gamete; a heterozygous parent (Rr) makes two.</p>
            </div>

            {/* Punnett grid */}
            <div className="overflow-x-auto">
              <h2 className="font-display font-bold text-base-content m-0 mb-3">Step 2 · Fill the grid</h2>
              <div className="min-w-[320px] grid grid-cols-[44px_1fr_1fr] grid-rows-[44px_1fr_1fr] gap-2 items-center justify-center">
                <div></div>
                <div className="text-2xl text-center font-bold text-primary font-mono self-end pb-1">{p1[0]}</div>
                <div className="text-2xl text-center font-bold text-primary font-mono self-end pb-1">{p1[1]}</div>

                <div className="text-2xl text-right font-bold text-secondary font-mono pr-2">{p2[0]}</div>
                {[cells[0], cells[1]].map((c, i) => (
                  <div key={`r0-${i}`} className={`h-28 rounded-xl flex flex-col items-center justify-center transition-colors duration-300 ${cellClass(c.g)}`}>
                    <span className="text-3xl font-bold font-mono tracking-widest">{c.g}</span>
                    <span className="text-[11px] uppercase mt-1 font-semibold tracking-wider opacity-90">{phenotype(c.g)}</span>
                  </div>
                ))}

                <div className="text-2xl text-right font-bold text-secondary font-mono pr-2">{p2[1]}</div>
                {[cells[2], cells[3]].map((c, i) => (
                  <div key={`r1-${i}`} className={`h-28 rounded-xl flex flex-col items-center justify-center transition-colors duration-300 ${cellClass(c.g)}`}>
                    <span className="text-3xl font-bold font-mono tracking-widest">{c.g}</span>
                    <span className="text-[11px] uppercase mt-1 font-semibold tracking-wider opacity-90">{phenotype(c.g)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controls + results */}
          <div className="w-full lg:w-72 flex flex-col gap-6">
            <div className="bg-base-200 p-5 rounded-xl border border-base-300 flex flex-col gap-5">
              <div>
                <label className="block mb-2 font-bold text-primary">Parent 1 (top)</label>
                {parent1Buttons}
              </div>
              <div>
                <label className="block mb-2 font-bold text-secondary">Parent 2 (left)</label>
                {parent2Buttons}
              </div>
            </div>

            {/* Ratios */}
            <div className="bg-base-200 p-5 rounded-xl border border-base-300">
              <h3 className="font-display font-bold text-base-content m-0 mb-3">Step 3 · Read the ratios</h3>

              <div className="mb-4">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60 mb-1">Genotype ratio</div>
                <div className="text-xl font-mono font-bold text-base-content">
                  {genoParts.map((x, i) => (
                    <span key={x.g}>{i > 0 && <span className="text-base-content/40"> : </span>}{x.n} {x.g}</span>
                  ))}
                </div>
                <div className="text-xs text-base-content/50 mt-1">from counts RR {genoCounts.RR} · Rr {genoCounts.Rr} · rr {genoCounts.rr}</div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60 mb-1">Phenotype ratio</div>
                <div className="text-xl font-mono font-bold text-base-content">
                  {phenoParts.map((x, i) => (
                    <span key={x.label}>{i > 0 && <span className="text-base-content/40"> : </span>}{x.n} {x.label}</span>
                  ))}
                </div>
                <div className="text-xs text-base-content/50 mt-1">from counts Red {phenoCounts.red} · White {phenoCounts.white} (out of 4)</div>
              </div>
            </div>

            <button type="button" className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
          </div>
        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default PunnettSquareVisualizer;
