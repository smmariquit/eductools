import React, { useCallback, useEffect, useId, useState, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, ChevronRight } from 'lucide-react';
import { CrayonArt, type CrayonColor } from '../crayon';

export interface StageIllustration {
  /** Registered crayon SVG file name (without extension). */
  name: string;
  color?: CrayonColor;
}

export interface StagePhoto {
  src: string;
  alt: string;
  credit: string;
}

export interface ProcessStage {
  /** Stable identifier for the stage. */
  id: string;
  /** Short stage name shown on the node and detail panel. */
  title: string;
  /** Optional one-line qualifier (e.g. a Filipino gloss or sub-label). */
  subtitle?: string;
  /** Plain-language explanation of what happens at this stage. */
  description: string;
  /** Optional Philippine-context note tied to this stage. */
  phContext?: string;
  /** Hand-drawn crayon spot/icon for this stage (preferred). */
  illustration?: StageIllustration;
  /** Optional reference photo in the detail panel (with credit). */
  photo?: StagePhoto;
  /** Fallback visual (emoji or custom node) if no illustration. */
  art?: React.ReactNode;
}

export interface ProcessCycleProps {
  /** Ordered stages of the process. */
  stages: ProcessStage[];
  /**
   * `cycle` arranges stages around a loop with directional arrows back to the
   * start; `linear` lays them out as a one-way sequence (no wrap-around).
   */
  mode?: 'cycle' | 'linear';
  /** Auto-advance interval in ms while playing. */
  autoPlayMs?: number;
  /** Accessible label for the diagram region. */
  diagramAriaLabel?: string;
  /**
   * Optional labels for the transition *into* each stage (process arrows).
   * `transitionLabels[i]` describes the change from stage `i-1` to stage `i`
   * (in `cycle` mode index 0 is the wrap-around from the last stage).
   */
  transitionLabels?: string[];
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const subscribeReducedMotion = (onChange: () => void): (() => void) => {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};

const usePrefersReducedMotion = (): boolean =>
  useSyncExternalStore(
    subscribeReducedMotion,
    () => (typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(REDUCED_MOTION_QUERY).matches
      : false),
    () => false,
  );

const StageNodeArt = ({ stage, size }: { stage: ProcessStage; size: 'node' | 'detail' }) => {
  const box = size === 'node' ? 44 : 120;
  if (stage.illustration) {
    return (
      <CrayonArt
        name={stage.illustration.name}
        size={box}
        color={stage.illustration.color ?? 'ink'}
        className="shrink-0"
        title={size === 'detail' ? stage.title : undefined}
      />
    );
  }
  if (stage.art) {
    return (
      <span className={size === 'node' ? 'text-2xl md:text-3xl leading-none' : 'text-5xl leading-none'} aria-hidden="true">
        {stage.art}
      </span>
    );
  }
  return null;
};

/**
 * Data-driven cycle / process visualizer. Renders an ordered set of stages
 * either around a loop (`cycle`) or as a one-way sequence (`linear`), with
 * play / pause / step / reset controls, click-to-jump stages, and an
 * aria-live detail panel describing the active stage.
 */
export const ProcessCycle: React.FC<ProcessCycleProps> = ({
  stages,
  mode = 'cycle',
  autoPlayMs = 3500,
  diagramAriaLabel = 'Process stages',
  transitionLabels,
}) => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const baseId = useId();
  const count = stages.length;

  const goTo = useCallback(
    (i: number) => setActive(((i % count) + count) % count),
    [count],
  );
  const next = useCallback(() => {
    setActive((i) => {
      if (mode === 'linear' && i === count - 1) return i;
      return (i + 1) % count;
    });
  }, [count, mode]);
  const prev = useCallback(() => {
    setActive((i) => {
      if (mode === 'linear' && i === 0) return i;
      return (i - 1 + count) % count;
    });
  }, [count, mode]);
  const reset = useCallback(() => {
    setPlaying(false);
    setActive(0);
  }, []);

  // Auto-advance while playing.
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setActive((i) => {
        if (mode === 'linear' && i === count - 1) {
          setPlaying(false);
          return i;
        }
        return (i + 1) % count;
      });
    }, autoPlayMs);
    return () => window.clearInterval(id);
  }, [playing, autoPlayMs, count, mode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      prev();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(count - 1);
    }
  };

  const activeStage = stages[active];
  const motionTransition = reducedMotion ? { duration: 0 } : { duration: 0.4 };

  return (
    <div className="flex flex-col gap-6">
      {/* Diagram */}
      {mode === 'cycle' ? (
        <CycleDiagram
          stages={stages}
          active={active}
          onSelect={goTo}
          onKeyDown={handleKeyDown}
          ariaLabel={diagramAriaLabel}
          baseId={baseId}
        />
      ) : (
        <LinearDiagram
          stages={stages}
          active={active}
          onSelect={goTo}
          onKeyDown={handleKeyDown}
          ariaLabel={diagramAriaLabel}
          baseId={baseId}
          transitionLabels={transitionLabels}
        />
      )}

      {/* Active-stage detail panel (announced to screen readers) */}
      <motion.div
        key={activeStage.id}
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={motionTransition}
        className="rounded-2xl border border-base-300 bg-base-200 p-5 md:p-6"
        aria-live="polite"
        aria-atomic="true"
      >
        {(activeStage.illustration || activeStage.photo || activeStage.art) && (
          <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center sm:items-start">
            <div className="shrink-0 rounded-2xl border border-base-300 bg-base-100 p-3 shadow-sm">
              <StageNodeArt stage={activeStage} size="detail" />
            </div>
            {activeStage.photo && (
              <figure className="flex-1 min-w-0 m-0">
                <img
                  src={activeStage.photo.src}
                  alt={activeStage.photo.alt}
                  className="w-full max-h-52 object-cover rounded-xl border border-base-300"
                  loading="lazy"
                />
                <figcaption className="text-tool-caption text-base-content/55 mt-2 leading-snug">
                  {activeStage.photo.credit}
                </figcaption>
              </figure>
            )}
          </div>
        )}
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="badge badge-primary badge-sm font-semibold">
            {mode === 'linear'
              ? `Step ${active + 1} of ${count}`
              : `Stage ${active + 1} of ${count}`}
          </span>
          <h3 className="text-xl font-bold text-base-content">{activeStage.title}</h3>
          {activeStage.subtitle && (
            <span className="text-base-content/60 font-medium">{activeStage.subtitle}</span>
          )}
        </div>
        <p className="mt-3 text-base-content/80 leading-relaxed">{activeStage.description}</p>
        {activeStage.phContext && (
          <p className="mt-3 flex gap-2 text-sm text-base-content/80 bg-base-100 border border-base-300 rounded-lg p-3">
            <CrayonArt name="globe" size={18} color="sky" className="shrink-0 mt-0.5" />
            <span>
              <span className="font-semibold text-secondary">Sa Pilipinas: </span>
              {activeStage.phContext}
            </span>
          </p>
        )}
      </motion.div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          className="btn btn-sm btn-outline"
          onClick={prev}
          disabled={mode === 'linear' && active === 0}
          aria-label="Previous stage"
        >
          <SkipBack className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <button
          type="button"
          className={`btn btn-sm ${playing ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={playing}
          aria-label={playing ? 'Pause auto-play' : 'Play auto-play'}
        >
          {playing ? (
            <>
              <Pause className="w-4 h-4" aria-hidden="true" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" aria-hidden="true" />
              <span>Play</span>
            </>
          )}
        </button>

        <button
          type="button"
          className="btn btn-sm btn-outline"
          onClick={next}
          disabled={mode === 'linear' && active === count - 1}
          aria-label="Next stage"
        >
          <span className="hidden sm:inline">Next</span>
          <SkipForward className="w-4 h-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          className="btn btn-sm btn-ghost"
          onClick={reset}
          aria-label="Reset to the first stage"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};

interface DiagramProps {
  stages: ProcessStage[];
  active: number;
  onSelect: (i: number) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  ariaLabel: string;
  baseId: string;
}

const CycleDiagram: React.FC<DiagramProps> = ({
  stages,
  active,
  onSelect,
  onKeyDown,
  ariaLabel,
  baseId,
}) => {
  const count = stages.length;
  // Geometry in a 0..100 viewBox; nodes sit on a ring, arrows on a slightly
  // smaller ring so heads don't collide with the node circles.
  const cx = 50;
  const cy = 50;
  const nodeR = 38; // ring radius for node centers
  const arrowR = 38;
  const angleFor = (i: number) => (-90 + (360 / count) * i) * (Math.PI / 180);

  // Build directional arc segments between consecutive nodes (clockwise),
  // including the wrap-around from the last node back to the first.
  const gap = 18; // degrees trimmed at each end so arcs don't touch nodes
  const segments = stages.map((_, i) => {
    const startDeg = -90 + (360 / count) * i + gap;
    const endDeg = -90 + (360 / count) * (i + 1) - gap;
    const a0 = startDeg * (Math.PI / 180);
    const a1 = endDeg * (Math.PI / 180);
    const x0 = cx + arrowR * Math.cos(a0);
    const y0 = cy + arrowR * Math.sin(a0);
    const x1 = cx + arrowR * Math.cos(a1);
    const y1 = cy + arrowR * Math.sin(a1);
    return { x0, y0, x1, y1 };
  });

  return (
    <div className="relative mx-auto w-full max-w-[480px] aspect-square">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <marker
            id={`${baseId}-arrow`}
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="fill-base-content/40" />
          </marker>
        </defs>
        {segments.map((s, i) => (
          <path
            key={i}
            d={`M ${s.x0} ${s.y0} A ${arrowR} ${arrowR} 0 0 1 ${s.x1} ${s.y1}`}
            fill="none"
            className="stroke-base-content/25"
            strokeWidth={1.2}
            strokeLinecap="round"
            markerEnd={`url(#${baseId}-arrow)`}
          />
        ))}
      </svg>

      <div role="group" aria-label={ariaLabel} onKeyDown={onKeyDown} className="absolute inset-0">
        {stages.map((stage, i) => {
          const a = angleFor(i);
          const left = 50 + nodeR * Math.cos(a);
          const top = 50 + nodeR * Math.sin(a);
          const isActive = i === active;
          const hasIllustration = Boolean(stage.illustration);
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={isActive}
              aria-label={`Stage ${i + 1}: ${stage.title}`}
              tabIndex={isActive ? 0 : -1}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center rounded-full border-2 text-center transition-all motion-reduce:transition-none focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 ${
                isActive
                  ? 'border-primary bg-primary text-primary-content shadow-lg scale-110 z-10'
                  : 'border-base-300 bg-base-100 text-base-content hover:border-primary/60'
              }`}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: hasIllustration ? 'clamp(76px, 24%, 108px)' : 'clamp(64px, 22%, 92px)',
                height: hasIllustration ? 'clamp(76px, 24%, 108px)' : 'clamp(64px, 22%, 92px)',
              }}
            >
              {(stage.illustration || stage.art) && (
                <span className="flex items-center justify-center mb-0.5">
                  <StageNodeArt stage={stage} size="node" />
                </span>
              )}
              <span className="text-tool-caption font-semibold leading-tight px-1 line-clamp-2">
                {stage.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface LinearDiagramProps extends DiagramProps {
  transitionLabels?: string[];
}

const LinearDiagram: React.FC<LinearDiagramProps> = ({
  stages,
  active,
  onSelect,
  onKeyDown,
  ariaLabel,
  transitionLabels,
}) => {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className="flex flex-col md:flex-row md:items-stretch md:flex-wrap gap-2 justify-center"
    >
      {stages.map((stage, i) => {
        const isActive = i === active;
        return (
          <React.Fragment key={stage.id}>
            {i > 0 && (
              <div className="flex md:flex-col items-center justify-center text-base-content/40 px-1">
                <ChevronRight className="w-5 h-5 rotate-90 md:rotate-0" aria-hidden="true" />
                {transitionLabels?.[i] && (
                  <span className="text-[0.65rem] md:max-w-[80px] text-center leading-tight text-base-content/60 md:mt-1">
                    {transitionLabels[i]}
                  </span>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={isActive}
              aria-label={`Step ${i + 1}: ${stage.title}`}
              tabIndex={isActive ? 0 : -1}
              className={`flex-1 md:min-w-[120px] md:max-w-[180px] flex flex-col items-center justify-center gap-1 rounded-2xl border-2 p-3 text-center transition-all motion-reduce:transition-none focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 ${
                isActive
                  ? 'border-primary bg-primary text-primary-content shadow-lg md:scale-105 z-10'
                  : 'border-base-300 bg-base-100 text-base-content hover:border-primary/60'
              }`}
            >
              {(stage.illustration || stage.art) && (
                <span className="flex items-center justify-center">
                  <StageNodeArt stage={stage} size="node" />
                </span>
              )}
              <span className="text-sm font-semibold leading-tight">{stage.title}</span>
              {stage.subtitle && (
                <span
                  className={`text-xs leading-tight ${isActive ? 'text-primary-content/80' : 'text-base-content/60'}`}
                >
                  {stage.subtitle}
                </span>
              )}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProcessCycle;
