import React, { type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

export interface IntroOption {
  label: ReactNode;
  onSelect: () => void;
  /** Optional supporting line under the label. */
  hint?: ReactNode;
}

export interface IntroStateProps {
  /** One line: what the learner will do here. Plain microcopy. */
  lead: ReactNode;
  /** Primary action label, e.g. "Start", "Pick a body system". */
  actionLabel?: string;
  /** Primary action handler. Omit when only `options` are used. */
  onStart?: () => void;
  /**
   * Quick-pick entry points (e.g. body systems, two sets). Rendered as a
   * choice grid instead of, or alongside, the primary action.
   */
  options?: IntroOption[];
  /** Optional decorative art / icon shown above the lead. */
  art?: ReactNode;
  className?: string;
}

/**
 * Inviting empty/intro state for explore & animation tools that have no
 * required numeric entry. Replaces an immediately busy canvas with a single
 * "what you'll do here" line and a clear way in, until the learner starts.
 */
export const IntroState: React.FC<IntroStateProps> = ({
  lead,
  actionLabel,
  onStart,
  options,
  art,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-base-300 bg-base-200/50 p-8 text-center sm:p-12 ${className}`}
    >
      {art && <div aria-hidden="true">{art}</div>}

      <p className="max-w-md text-base text-base-content/80">{lead}</p>

      {onStart && actionLabel && (
        <button type="button" onClick={onStart} className="btn btn-primary gap-2">
          {actionLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      {options && options.length > 0 && (
        <div className="grid w-full max-w-xl gap-3 sm:grid-cols-2">
          {options.map((opt, i) => (
            <button
              key={i}
              type="button"
              onClick={opt.onSelect}
              className="group flex items-center justify-between gap-3 rounded-xl border border-base-300 bg-base-100 p-4 text-left motion-safe:transition-colors hover:border-primary/60 hover:bg-base-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex flex-col">
                <span className="font-semibold text-base-content">{opt.label}</span>
                {opt.hint && <span className="text-xs text-base-content/60">{opt.hint}</span>}
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-base-content/40 motion-safe:transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default IntroState;
