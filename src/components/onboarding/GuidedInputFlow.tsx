import React, { type ReactNode, useEffect, useId, useRef } from 'react';
import { Check, Lock, Wand2, RotateCcw } from 'lucide-react';

export interface GuidedStep {
  /** Stable identifier for the step. */
  id: string;
  /** Short imperative title, e.g. "Choose the base length". */
  title: ReactNode;
  /** Optional one-line helper text. Keep it plain and short. */
  helper?: ReactNode;
  /** True once the user has provided this input. */
  complete: boolean;
  /** The control(s) for this step (a Slider, number input, set of buttons, etc.). */
  children: ReactNode;
}

export interface GuidedInputFlowProps {
  /** Ordered list of inputs to collect, one at a time. */
  steps: GuidedStep[];
  /**
   * Optional full visualization. When provided, it is rendered in place once
   * every step is complete (or `ready` is true). Tools that branch on
   * readiness themselves can omit this and render the flow only while unready.
   */
  children?: ReactNode;
  /** Override the "all steps complete" readiness check. */
  ready?: boolean;
  /** One-line intro: what the user is about to set up. */
  intro?: ReactNode;
  /** Friendly placeholder shown in the result area before the tool is ready. */
  placeholder?: ReactNode;
  /** Fills sensible example values so the user can see the tool right away. */
  onFillExample?: () => void;
  fillExampleLabel?: string;
  /** Returns the tool to its empty start. */
  onReset?: () => void;
  resetLabel?: string;
  className?: string;
}

const defaultPlaceholder = (label: string) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-base-300 bg-base-200/50 p-10 text-center min-h-[260px]">
    <div className="h-16 w-16 rounded-full bg-base-300/60" aria-hidden="true" />
    <p className="max-w-xs text-sm text-base-content/60">{label}</p>
  </div>
);

/**
 * Guided, field-by-field input flow for calculator/parameter tools.
 *
 * Starts empty and reveals one input at a time with a short prompt
 * ("Step 1 of 3"). Completed steps stay editable; upcoming steps are shown
 * locked so the learner can see how many remain. The full visualization
 * (passed as children) renders only once every input is provided.
 */
export const GuidedInputFlow: React.FC<GuidedInputFlowProps> = ({
  steps,
  children,
  ready,
  intro,
  placeholder,
  onFillExample,
  fillExampleLabel = 'Fill an example for me',
  onReset,
  resetLabel = 'Reset',
  className = '',
}) => {
  const total = steps.length;
  const completedCount = steps.filter((s) => s.complete).length;
  const activeIndex = steps.findIndex((s) => !s.complete);
  const allComplete = activeIndex === -1;
  const isReady = ready ?? allComplete;

  const baseId = useId();
  const activeRef = useRef<HTMLDivElement | null>(null);
  const didMount = useRef(false);
  const prevActive = useRef(activeIndex);

  // Move focus to the active step as the flow advances, but never on first
  // paint (so we don't steal focus when the page loads).
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      prevActive.current = activeIndex;
      return;
    }
    if (activeIndex !== prevActive.current && activeIndex !== -1 && activeRef.current) {
      activeRef.current.focus();
    }
    prevActive.current = activeIndex;
  }, [activeIndex]);

  if (isReady) {
    return children ? <div className={className}>{children}</div> : null;
  }

  return (
    <div className={className}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <section
          aria-label="Set up the visualizer"
          className="rounded-2xl border border-base-300 bg-base-200 p-5 sm:p-6"
        >
          {intro && <p className="mb-4 text-sm text-base-content/70">{intro}</p>}

          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-base-content/50" aria-live="polite">
            Step {Math.min(completedCount + 1, total)} of {total}
          </p>

          <ol className="flex flex-col gap-3">
            {steps.map((step, i) => {
              const isActive = i === activeIndex;
              const isDone = step.complete;
              const isLocked = !isDone && !isActive;
              const headingId = `${baseId}-step-${step.id}`;
              const helperId = step.helper ? `${baseId}-help-${step.id}` : undefined;

              return (
                <li key={step.id}>
                  <div
                    ref={isActive ? activeRef : undefined}
                    tabIndex={isActive ? -1 : undefined}
                    aria-current={isActive ? 'step' : undefined}
                    aria-labelledby={headingId}
                    aria-describedby={helperId}
                    className={[
                      'rounded-xl border p-4 motion-safe:transition-colors',
                      isActive
                        ? 'border-primary/60 bg-base-100 ring-2 ring-primary/30'
                        : isDone
                          ? 'border-base-300 bg-base-100'
                          : 'border-base-300/60 bg-base-200/40',
                      'outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    ].join(' ')}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={[
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                          isDone
                            ? 'bg-success text-success-content'
                            : isActive
                              ? 'bg-primary text-primary-content'
                              : 'bg-base-300 text-base-content/50',
                        ].join(' ')}
                      >
                        {isDone ? <Check className="h-3.5 w-3.5" /> : isLocked ? <Lock className="h-3 w-3" /> : i + 1}
                      </span>
                      <span
                        id={headingId}
                        className={`text-sm font-semibold ${isLocked ? 'text-base-content/40' : 'text-base-content'}`}
                      >
                        {step.title}
                      </span>
                    </div>

                    {step.helper && (isActive || isDone) && (
                      <p id={helperId} className="mb-3 text-xs text-base-content/60">
                        {step.helper}
                      </p>
                    )}

                    {/* Reveal the control only for the active and completed steps. */}
                    {(isActive || isDone) && <div>{step.children}</div>}
                  </div>
                </li>
              );
            })}
          </ol>

          {(onFillExample || onReset) && (
            <div className="mt-5 flex flex-wrap gap-2">
              {onFillExample && (
                <button type="button" onClick={onFillExample} className="btn btn-primary btn-sm gap-1.5">
                  <Wand2 className="h-4 w-4" aria-hidden="true" />
                  {fillExampleLabel}
                </button>
              )}
              {onReset && completedCount > 0 && (
                <button type="button" onClick={onReset} className="btn btn-ghost btn-sm gap-1.5">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  {resetLabel}
                </button>
              )}
            </div>
          )}
        </section>

        <div className="flex">
          {placeholder ?? defaultPlaceholder('Fill in the values to build your visualization.')}
        </div>
      </div>
    </div>
  );
};

export default GuidedInputFlow;
