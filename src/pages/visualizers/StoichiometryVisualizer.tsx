import { useState, useMemo } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { GuidedInputFlow, useTouchedFields } from '../../components/onboarding';

interface Reaction {
  id: string;
  label: string;
  r1: { sym: string; coeff: number };
  r2: { sym: string; coeff: number };
  product: { sym: string; coeff: number };
  note: string;
}

// All coefficients here come from balanced equations; the mole ratios are real.
const REACTIONS: Reaction[] = [
  {
    id: 'water',
    label: 'Synthesis of water',
    r1: { sym: 'H₂', coeff: 2 },
    r2: { sym: 'O₂', coeff: 1 },
    product: { sym: 'H₂O', coeff: 2 },
    note: '2 H₂ + O₂ → 2 H₂O. Two moles of hydrogen react with one mole of oxygen.',
  },
  {
    id: 'ammonia',
    label: 'Haber process (ammonia)',
    r1: { sym: 'N₂', coeff: 1 },
    r2: { sym: 'H₂', coeff: 3 },
    product: { sym: 'NH₃', coeff: 2 },
    note: 'N₂ + 3 H₂ → 2 NH₃. Hydrogen is needed in a 3:1 ratio to nitrogen.',
  },
  {
    id: 'salt',
    label: 'Table salt (NaCl)',
    r1: { sym: 'Na', coeff: 2 },
    r2: { sym: 'Cl₂', coeff: 1 },
    product: { sym: 'NaCl', coeff: 2 },
    note: '2 Na + Cl₂ → 2 NaCl. Sodium and chlorine combine in a 2:1 ratio.',
  },
];

const DEFAULT_R1 = 4;
const DEFAULT_R2 = 4;

const fmt = (n: number) => (Number.isInteger(n) ? n.toString() : n.toFixed(2));

const StoichiometryVisualizer = () => {
  const [reactionId, setReactionId] = useState(REACTIONS[0].id);
  const [molesR1, setMolesR1] = useState(DEFAULT_R1);
  const [molesR2, setMolesR2] = useState(DEFAULT_R2);
  const fields = useTouchedFields<'reaction' | 'r1' | 'r2'>();
  const ready = fields.isTouched('reaction') && fields.isTouched('r1') && fields.isTouched('r2');

  const reaction = REACTIONS.find((r) => r.id === reactionId) ?? REACTIONS[0];

  const result = useMemo(() => {
    const { r1, r2, product } = reaction;
    // "Reaction extent" each reactant can support, in units of the balanced eqn.
    const extentR1 = molesR1 / r1.coeff;
    const extentR2 = molesR2 / r2.coeff;
    const extent = Math.min(extentR1, extentR2);

    let limiting: 'r1' | 'r2' | 'none';
    if (Math.abs(extentR1 - extentR2) < 1e-9) limiting = 'none';
    else limiting = extentR1 < extentR2 ? 'r1' : 'r2';

    const usedR1 = extent * r1.coeff;
    const usedR2 = extent * r2.coeff;
    const productFormed = extent * product.coeff;
    const leftoverR1 = molesR1 - usedR1;
    const leftoverR2 = molesR2 - usedR2;

    return { extentR1, extentR2, extent, limiting, usedR1, usedR2, productFormed, leftoverR1, leftoverR2 };
  }, [reaction, molesR1, molesR2]);

  const reset = () => {
    setReactionId(REACTIONS[0].id);
    setMolesR1(DEFAULT_R1);
    setMolesR2(DEFAULT_R2);
    fields.reset();
  };

  const fillExample = () => {
    setReactionId(REACTIONS[0].id);
    setMolesR1(4);
    setMolesR2(4);
    fields.touchAll(['reaction', 'r1', 'r2']);
  };

  const maxExtent = Math.max(result.extentR1, result.extentR2, 0.001);
  const { r1, r2, product } = reaction;

  const reactionPicker = (
    <div className="flex flex-wrap gap-2">
      {REACTIONS.map((rx) => (
        <button
          key={rx.id}
          type="button"
          aria-pressed={reactionId === rx.id}
          onClick={() => { setReactionId(rx.id); fields.touch('reaction'); }}
          className={`btn btn-sm ${reactionId === rx.id ? 'btn-primary' : 'btn-outline'}`}
        >
          {rx.label}
        </button>
      ))}
    </div>
  );

  const sliderR1 = (
    <div>
      <label htmlFor="moles-r1" className="flex justify-between mb-2 font-semibold text-sm">
        <span className="text-primary">Moles of {r1.sym}</span>
        <span className="font-mono">{molesR1} mol</span>
      </label>
      <input
        id="moles-r1"
        type="range" min="0" max="12" step="1"
        value={molesR1}
        onChange={(e) => { setMolesR1(Number(e.target.value)); fields.touch('r1'); }}
        className="range range-primary w-full"
        aria-valuetext={`${molesR1} moles of ${r1.sym}`}
      />
    </div>
  );

  const sliderR2 = (
    <div>
      <label htmlFor="moles-r2" className="flex justify-between mb-2 font-semibold text-sm">
        <span className="text-secondary">Moles of {r2.sym}</span>
        <span className="font-mono">{molesR2} mol</span>
      </label>
      <input
        id="moles-r2"
        type="range" min="0" max="12" step="1"
        value={molesR2}
        onChange={(e) => { setMolesR2(Number(e.target.value)); fields.touch('r2'); }}
        className="range range-secondary w-full"
        aria-valuetext={`${molesR2} moles of ${r2.sym}`}
      />
    </div>
  );

  return (
    <VisualizerLayout
      title="Stoichiometry: Limiting Reactant"
      description="Pick how many moles of each reactant you start with. The balanced equation's mole ratio decides which reactant runs out first, how much product forms, and what is left over."
      adSlotId="2002"
      guideLink="/blog/stoichiometry"
    >
      {!ready ? (
        <GuidedInputFlow
          intro="Pick a reaction, then set how many moles of each reactant you start with to find the limiting reactant."
          onFillExample={fillExample}
          onReset={reset}
          steps={[
            { id: 'reaction', title: 'Pick a reaction', helper: 'Sets the balanced equation and mole ratio.', complete: fields.isTouched('reaction'), children: reactionPicker },
            { id: 'r1', title: `Set moles of ${r1.sym}`, helper: '0 to 12 mol.', complete: fields.isTouched('r1'), children: sliderR1 },
            { id: 'r2', title: `Set moles of ${r2.sym}`, helper: '0 to 12 mol.', complete: fields.isTouched('r2'), children: sliderR2 },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 gap-6">

          {/* Reaction picker */}
          {reactionPicker}

          {/* Balanced equation + mole ratio */}
          <div className="text-center bg-base-200 p-6 rounded-xl border border-base-300">
            <div className="text-2xl md:text-3xl font-bold font-mono">
              <span className="text-primary">{r1.coeff}</span> {r1.sym}
              <span className="mx-3 text-base-content/50">+</span>
              <span className="text-secondary">{r2.coeff}</span> {r2.sym}
              <span className="mx-3 text-base-content/50">→</span>
              <span className="text-success">{product.coeff}</span> {product.sym}
            </div>
            <div className="mt-3 text-sm text-base-content/70">
              Mole ratio {r1.sym}:{r2.sym}:{product.sym} = <span className="font-mono font-bold">{r1.coeff}:{r2.coeff}:{product.coeff}</span>
            </div>
            <p className="text-xs text-base-content/60 mt-2 m-0">{reaction.note}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Inputs */}
            <div className="flex flex-col gap-6 bg-base-200/50 p-5 rounded-xl border border-base-300">
              {sliderR1}
              {sliderR2}

              {/* Reaction-equivalents comparison: the shorter bar limits the reaction */}
              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60 mb-2">
                  How many "reaction sets" each reactant can supply
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{r1.sym} ÷ {r1.coeff}</span>
                      <span className="font-mono">{fmt(result.extentR1)}</span>
                    </div>
                    <div className="h-4 bg-base-300 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${result.limiting === 'r1' ? 'bg-error' : 'bg-primary'}`}
                        style={{ width: `${(result.extentR1 / maxExtent) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{r2.sym} ÷ {r2.coeff}</span>
                      <span className="font-mono">{fmt(result.extentR2)}</span>
                    </div>
                    <div className="h-4 bg-base-300 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${result.limiting === 'r2' ? 'bg-error' : 'bg-secondary'}`}
                        style={{ width: `${(result.extentR2 / maxExtent) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60 mb-1">Limiting reactant</div>
                {result.extent === 0 ? (
                  <div className="text-lg font-bold text-base-content/50">No reaction (a reactant is at 0 mol)</div>
                ) : result.limiting === 'none' ? (
                  <div className="text-lg font-bold text-success">Neither — exact stoichiometric amounts</div>
                ) : (
                  <div className="text-2xl font-bold text-error font-mono">
                    {result.limiting === 'r1' ? r1.sym : r2.sym}
                  </div>
                )}
                <p className="text-xs text-base-content/60 mt-1 m-0">The reactant that runs out first caps how much product can form.</p>
              </div>

              <div className="p-4 rounded-xl bg-success/10 border border-success/30">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60 mb-1">Product formed</div>
                <div className="text-2xl font-bold text-success font-mono">{fmt(result.productFormed)} mol {product.sym}</div>
                <p className="text-xs text-base-content/60 mt-1 m-0">
                  {fmt(result.extent)} reaction sets × {product.coeff} = {fmt(result.productFormed)} mol.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-base-200 border border-base-300">
                  <div className="text-xs uppercase tracking-wider font-bold text-base-content/60 mb-1">{r1.sym} used / left</div>
                  <div className="font-mono text-sm">used {fmt(result.usedR1)} mol</div>
                  <div className={`font-mono text-sm font-bold ${result.leftoverR1 > 1e-9 ? 'text-warning' : 'text-base-content/50'}`}>
                    leftover {fmt(result.leftoverR1)} mol
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-base-200 border border-base-300">
                  <div className="text-xs uppercase tracking-wider font-bold text-base-content/60 mb-1">{r2.sym} used / left</div>
                  <div className="font-mono text-sm">used {fmt(result.usedR2)} mol</div>
                  <div className={`font-mono text-sm font-bold ${result.leftoverR2 > 1e-9 ? 'text-warning' : 'text-base-content/50'}`}>
                    leftover {fmt(result.leftoverR2)} mol
                  </div>
                </div>
              </div>

              {(result.leftoverR1 > 1e-9 || result.leftoverR2 > 1e-9) && (
                <p className="text-sm text-base-content/70 m-0">
                  The excess reactant ({result.leftoverR1 > 1e-9 ? r1.sym : r2.sym}) is left over because there is not enough {result.limiting === 'r1' ? r1.sym : r2.sym} to react with all of it.
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
          </div>
        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default StoichiometryVisualizer;
