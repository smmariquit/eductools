import { useState, useSyncExternalStore } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { GuidedInputFlow, useTouchedFields, useVisualizationGate } from '../../components/onboarding';

type SeqType = 'arithmetic' | 'geometric';

const DEFAULTS = {
  seqType: 'arithmetic' as SeqType,
  firstTerm: 2,
  commonDiff: 3,
  commonRatio: 2,
  nthTerm: 8,
};

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const usePrefersReducedMotion = (): boolean =>
  useSyncExternalStore(
    (onChange) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {};
      const mq = window.matchMedia(REDUCED_MOTION_QUERY);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(REDUCED_MOTION_QUERY).matches : false),
    () => false,
  );

const CHART_H = 280;
const MIN_BAR = 4;

const fmt = (v: number) => (Math.abs(v) > 9999 ? v.toExponential(1) : `${v}`);

const SequencesVisualizer = () => {
  const [seqType, setSeqType] = useState<SeqType>(DEFAULTS.seqType);
  const [firstTerm, setFirstTerm] = useState(DEFAULTS.firstTerm);
  const [commonDiff, setCommonDiff] = useState(DEFAULTS.commonDiff);
  const [commonRatio, setCommonRatio] = useState(DEFAULTS.commonRatio);
  const [nthTerm, setNthTerm] = useState(DEFAULTS.nthTerm);
  const reducedMotion = usePrefersReducedMotion();
  const fields = useTouchedFields<'type' | 'first' | 'rule'>();
  const gate = useVisualizationGate();
  const buildComplete = fields.isTouched('type') && fields.isTouched('first') && fields.isTouched('rule');
  const showVisualization = buildComplete && gate.visualizationConfirmed;

  const generateSequence = (count: number) => {
    const out: number[] = [];
    for (let i = 0; i < count; i++) {
      out.push(seqType === 'arithmetic' ? firstTerm + i * commonDiff : firstTerm * Math.pow(commonRatio, i));
    }
    return out;
  };

  const terms = generateSequence(nthTerm);

  const getNthValue = (n: number) =>
    seqType === 'arithmetic' ? firstTerm + (n - 1) * commonDiff : firstTerm * Math.pow(commonRatio, n - 1);
  const nthValue = getNthValue(nthTerm);

  // Scale around a real zero baseline: positives grow up, negatives grow down.
  const maxPos = Math.max(0, ...terms.filter((v) => v > 0));
  const maxNeg = Math.max(0, ...terms.filter((v) => v < 0).map((v) => -v));
  const span = maxPos + maxNeg || 1;
  const zeroY = (maxPos / span) * CHART_H; // px from top of plot area down to the baseline
  const topRegion = zeroY;
  const bottomRegion = CHART_H - zeroY;
  const hasNegative = maxNeg > 0;

  const reset = () => {
    setSeqType(DEFAULTS.seqType);
    setFirstTerm(DEFAULTS.firstTerm);
    setCommonDiff(DEFAULTS.commonDiff);
    setCommonRatio(DEFAULTS.commonRatio);
    setNthTerm(DEFAULTS.nthTerm);
    gate.resetVisualization();
    fields.reset();
  };

  const fillExample = () => {
    setSeqType('arithmetic');
    setFirstTerm(2);
    setCommonDiff(3);
    setNthTerm(8);
    fields.touchAll(['type', 'first', 'rule']);
  };

  const typePicker = (
    <div className="flex gap-2">
      <button
        onClick={() => { setSeqType('arithmetic'); fields.touch('type'); }}
        className={`btn flex-1 btn-sm ${seqType === 'arithmetic' ? 'btn-primary' : 'btn-outline'}`}
        aria-pressed={seqType === 'arithmetic'}
      >
        Arithmetic
      </button>
      <button
        onClick={() => { setSeqType('geometric'); fields.touch('type'); }}
        className={`btn flex-1 btn-sm ${seqType === 'geometric' ? 'btn-secondary' : 'btn-outline'}`}
        aria-pressed={seqType === 'geometric'}
      >
        Geometric
      </button>
    </div>
  );

  const firstSlider = (
    <Slider
      id="seq-first"
      motif="terms"
      label={<>First Term (<span className="font-serif italic">a<sub>1</sub></span>)</>}
      value={firstTerm}
      min={-5}
      max={10}
      step={1}
      colorClass="primary"
      onChange={(e) => { setFirstTerm(Number(e.target.value)); fields.touch('first'); }}
      aria-valuetext={`first term ${firstTerm}`}
    />
  );

  const diffSlider = (
    <Slider
      id="seq-diff"
      motif="number"
      label={<>Common Diff (<span className="font-serif italic">d</span>)</>}
      value={commonDiff}
      min={-5}
      max={10}
      step={1}
      colorClass="accent"
      onChange={(e) => { setCommonDiff(Number(e.target.value)); fields.touch('rule'); }}
      aria-valuetext={`common difference ${commonDiff}`}
    />
  );

  const ratioSlider = (
    <Slider
      id="seq-ratio"
      motif="ratio"
      label={<>Common Ratio (<span className="font-serif italic">r</span>)</>}
      value={commonRatio}
      min={-3}
      max={5}
      step={1}
      colorClass="accent"
      onChange={(e) => { setCommonRatio(Number(e.target.value)); fields.touch('rule'); }}
      aria-valuetext={`common ratio ${commonRatio}`}
    />
  );

  const ruleSlider = seqType === 'arithmetic' ? diffSlider : ratioSlider;

  const barColor = (i: number) =>
    i === terms.length - 1
      ? 'bg-warning shadow-[0_0_15px_rgba(245,168,0,0.4)]'
      : seqType === 'arithmetic'
      ? 'bg-primary/70'
      : 'bg-secondary/70';

  const transition = reducedMotion ? '' : 'transition-all duration-500';

  return (
    <VisualizerLayout
      title="Sequences & Patterns (Mga Pagkakasunud-sunod)"
      description="Build arithmetic and geometric sequences and watch each term rise above or drop below a real zero line as you change the rule."
      adSlotId="2013"
      guideLink="/blog/sequences"
    >
      {!showVisualization ? (
        <GuidedInputFlow
          intro="Pick a sequence type, then set the first term and its rule to plot the terms."
          onFillExample={fillExample}
          onReset={reset}
          awaitingVisualizationConfirm={buildComplete && !gate.visualizationConfirmed}
          onVisualizationConfirm={gate.confirmVisualization}

          steps={[
            { id: 'type', title: 'Pick a sequence type', helper: 'Arithmetic adds a step; geometric multiplies.', complete: fields.isTouched('type'), children: typePicker },
            { id: 'first', title: 'Set the first term', helper: 'a₁, from -5 to 10.', complete: fields.isTouched('first'), children: firstSlider },
            {
              id: 'rule',
              title: seqType === 'arithmetic' ? 'Set the common difference' : 'Set the common ratio',
              helper: seqType === 'arithmetic' ? 'd, the step added each term.' : 'r, the factor multiplied each term.',
              complete: fields.isTouched('rule'),
              children: ruleSlider,
            },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col lg:flex-row gap-8">

          {/* Visualization */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Bar chart with a zero baseline */}
            <div className="bg-base-200 rounded-xl p-6 border-2 border-base-300">
              <div
                className="relative w-full"
                style={{ height: `${CHART_H}px` }}
                role="img"
                aria-label={`Sequence terms ${terms.map((v) => Math.round(v)).join(', ')}. Positive terms rise above the zero line; negative terms drop below it.`}
              >
                {/* Zero baseline */}
                <div
                  className="absolute left-0 right-0 border-t-2 border-dashed border-base-content/40 z-0"
                  style={{ top: `${zeroY}px` }}
                >
                  <span className="absolute -left-1 -top-2.5 text-[10px] font-mono font-bold text-base-content/50 bg-base-200 px-1">0</span>
                </div>

                {/* Columns */}
                <div className="absolute inset-0 flex items-stretch gap-1 md:gap-2">
                  {terms.map((val, i) => {
                    const isNeg = val < 0;
                    const height =
                      val === 0
                        ? 0
                        : isNeg
                        ? Math.max(MIN_BAR, (-val / (maxNeg || 1)) * bottomRegion)
                        : Math.max(MIN_BAR, (val / (maxPos || 1)) * topRegion);
                    return (
                      <div key={i} className="relative flex-1">
                        {/* Bar */}
                        <div
                          className={`absolute left-0 right-0 ${barColor(i)} ${transition} ${isNeg ? 'rounded-b-md' : 'rounded-t-md'}`}
                          style={
                            isNeg
                              ? { top: `${zeroY}px`, height: `${height}px` }
                              : { top: `${zeroY - height}px`, height: `${height}px` }
                          }
                        />
                        {/* Value label, just outside the bar end */}
                        <span
                          className="absolute left-0 right-0 text-center text-[10px] md:text-xs font-mono font-bold text-base-content/80 leading-none"
                          style={
                            isNeg
                              ? { top: `${Math.min(CHART_H - 10, zeroY + height + 3)}px` }
                              : { top: `${Math.max(0, zeroY - height - 14)}px` }
                          }
                        >
                          {fmt(val)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Index axis (term position n) */}
              <div className="flex gap-1 md:gap-2 mt-2">
                {terms.map((_, i) => (
                  <span key={i} className="flex-1 text-center text-[10px] font-mono text-base-content/50">
                    {i + 1}
                  </span>
                ))}
              </div>
              <div className="text-center text-[10px] uppercase tracking-wider text-base-content/40 mt-1">
                Term position (n)
              </div>
            </div>

            {/* Differences / Ratios row */}
            <div className="flex items-center gap-1 flex-wrap justify-center">
              {terms.slice(0, -1).map((val, i) => {
                const next = terms[i + 1];
                return (
                  <div key={i} className="flex items-center gap-1">
                    <div className="badge badge-sm badge-outline font-mono">{fmt(val)}</div>
                    <span className="text-xs font-bold text-warning">
                      {seqType === 'arithmetic' ? `${commonDiff >= 0 ? '+' : '−'}${Math.abs(commonDiff)}` : `×${commonRatio}`}
                    </span>
                    {i === terms.length - 2 && <div className="badge badge-sm badge-warning font-mono">{fmt(next)}</div>}
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
                    <span className="text-warning font-extrabold text-2xl">{Math.abs(nthValue) > 9999 ? nthValue.toExponential(2) : nthValue}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 flex flex-col gap-5 bg-base-200 p-6 rounded-xl border border-base-300">
            <div>
              <span className="block mb-2 font-bold text-sm">Sequence Type:</span>
              {typePicker}
            </div>

            {firstSlider}

            {ruleSlider}

            <Slider
              id="seq-n"
              motif="terms"
              label={<>Show terms up to <span className="font-serif italic">n</span></>}
              value={nthTerm}
              min={3}
              max={15}
              step={1}
              colorClass="warning"
              onChange={(e) => setNthTerm(Number(e.target.value))}
              aria-valuetext={`showing ${nthTerm} terms`}
            />

            {hasNegative && (
              <p className="text-xs text-base-content/60 m-0">
                Terms below the dashed zero line are negative — their bars hang downward.
              </p>
            )}

            {/* Quick examples */}
            <div className="border-t border-base-300 pt-4">
              <span className="block mb-2 font-bold text-xs text-base-content/60 uppercase tracking-wider">Try These Patterns</span>
              <div className="flex flex-col gap-2">
                <button onClick={() => { setSeqType('arithmetic'); setFirstTerm(2); setCommonDiff(3); setNthTerm(8); }} className="btn btn-outline btn-xs">2, 5, 8, 11... (d=3)</button>
                <button onClick={() => { setSeqType('arithmetic'); setFirstTerm(10); setCommonDiff(-2); setNthTerm(10); }} className="btn btn-outline btn-xs">10, 8, 6... crossing 0 (d=−2)</button>
                <button onClick={() => { setSeqType('geometric'); setFirstTerm(3); setCommonRatio(2); setNthTerm(8); }} className="btn btn-outline btn-xs">3, 6, 12, 24... (r=2)</button>
                <button onClick={() => { setSeqType('geometric'); setFirstTerm(1); setCommonRatio(-2); setNthTerm(8); }} className="btn btn-outline btn-xs">1, −2, 4, −8... (r=−2)</button>
              </div>
            </div>

            <button onClick={reset} className="btn btn-ghost btn-sm mt-1">Reset</button>
          </div>

        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default SequencesVisualizer;
