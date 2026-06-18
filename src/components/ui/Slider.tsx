import React, { type ReactNode, useId, useMemo } from 'react';
import { CrayonArt } from '../crayon';
import { UnitGuideLink, UnitSuffix } from '../scientific-units/UnitGuideLink';
import { unitGuideHref } from '../../lib/unitGuide';
import {
  SLIDER_MOTIFS,
  getSliderRailSvg,
  type SliderMotif,
} from './sliderMotifs';

export type { SliderMotif };

export interface SliderMark {
  label: ReactNode;
}

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  /** DaisyUI range color token: primary, secondary, accent, etc. */
  colorClass?: string;
  /** Crayon SVG holder + track rail themed to what this slider controls. */
  motif?: SliderMotif;
  /** Optional custom value readout (replaces the default number + unit). */
  readout?: ReactNode;
  /** Hide the value readout on the label row. */
  hideReadout?: boolean;
  /** Rail + motif only — label row omitted (parent supplies context). */
  compact?: boolean;
  /**
   * Scale labels under the track. Defaults to min · mid · max when omitted.
   * Pass `[]` or set `showScaleMarks={false}` to hide.
   */
  marks?: SliderMark[];
  /** When true (default), render min / midpoint / max under the rail. */
  showScaleMarks?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Optional formatter for the value readout (defaults to raw number + unit). */
  formatValue?: (value: number) => string;
}

function decimalsForStep(step: number): number {
  if (!Number.isFinite(step) || step <= 0) return 0;
  const parts = String(step).split('.');
  return parts[1]?.length ?? 0;
}

function roundToStep(n: number, step: number): number {
  if (!Number.isFinite(step) || step <= 0) return n;
  const factor = 1 / step;
  return Math.round(n * factor) / factor;
}

function formatScaleMark(
  n: number,
  unit: string,
  step: number,
  formatValue?: (value: number) => string,
): string {
  if (formatValue) return formatValue(n);
  const rounded = roundToStep(n, step);
  const text = Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(decimalsForStep(step));
  return `${text}${unit}`;
}

function buildScaleMarks(
  min: number,
  max: number,
  step: number,
  unit: string,
  formatValue?: (value: number) => string,
): SliderMark[] {
  if (min === max) {
    return [{ label: formatScaleMark(min, unit, step, formatValue) }];
  }
  const mid = roundToStep((min + max) / 2, step);
  const marks: SliderMark[] = [{ label: formatScaleMark(min, unit, step, formatValue) }];
  if (mid !== min && mid !== max) {
    marks.push({ label: formatScaleMark(mid, unit, step, formatValue) });
  }
  marks.push({ label: formatScaleMark(max, unit, step, formatValue) });
  return marks;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  colorClass = 'primary',
  motif = 'default',
  onChange,
  className = '',
  id,
  'aria-valuetext': ariaValueText,
  formatValue,
  readout,
  hideReadout = false,
  compact = false,
  marks,
  showScaleMarks = true,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const config = SLIDER_MOTIFS[motif];
  const railSvg = useMemo(() => getSliderRailSvg(config.rail), [config.rail]);
  const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;
  const unitTrimmed = unit.trim();
  const hasUnitGuide = Boolean(unitTrimmed && unitGuideHref(unitTrimmed));
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;

  const scaleMarks = useMemo(() => {
    if (!showScaleMarks) return [];
    if (marks !== undefined) return marks;
    return buildScaleMarks(min, max, step, unit, formatValue);
  }, [showScaleMarks, marks, min, max, step, unit, formatValue]);

  const renderReadout = () => {
    if (readout != null) return readout;
    if (formatValue) {
      return (
        <>
          {displayValue}
          {hasUnitGuide && <UnitGuideLink unit={unitTrimmed} size={12} className="ml-0.5" />}
        </>
      );
    }
    return (
      <>
        {value}
        <UnitSuffix unit={unit} />
      </>
    );
  };

  return (
    <div className={`crayon-slider w-full ${className}`} data-motif={motif}>
      {!compact && (
        <label htmlFor={inputId} className="crayon-slider__label block mb-2 font-semibold">
          <span className="inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span>{label}</span>
            {!hideReadout && (
              <>
                <span className="text-base-content/35 font-normal" aria-hidden="true">
                  ·
                </span>
                <span className={`text-${colorClass} font-mono tabular-nums inline-flex items-baseline gap-0.5`}>
                  {renderReadout()}
                </span>
              </>
            )}
          </span>
        </label>
      )}

      <div className="crayon-slider__row flex items-center gap-2.5">
        <CrayonArt
          name={config.art}
          size={36}
          color={config.color}
          animate={config.wiggle ? 'wiggle' : 'none'}
          className="crayon-slider__holder shrink-0"
          title={config.hint}
        />

        <div className="crayon-slider__rail relative flex-1 min-w-0">
          {railSvg && (
            <span
              className="crayon-slider__rail-art pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 opacity-100"
              aria-hidden
              dangerouslySetInnerHTML={{ __html: railSvg }}
            />
          )}
          <input
            id={inputId}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className={`crayon-slider__input range range-${colorClass} range-sm w-full relative z-[1]`}
            style={{ '--slider-pct': `${pct}%` } as React.CSSProperties}
            aria-valuetext={ariaValueText ?? displayValue}
            aria-label={compact && typeof label === 'string' ? label : undefined}
            {...props}
          />
        </div>
      </div>

      {scaleMarks.length > 0 && (
        <div className="crayon-slider__marks" aria-hidden="true">
          {scaleMarks.map((mark, i) => (
            <span key={i} className="inline-flex items-center justify-center gap-0.5">
              {typeof mark.label === 'string' && unitTrimmed && unitGuideHref(unitTrimmed) ? (
                <>
                  {mark.label.replace(new RegExp(`${unitTrimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`), '').trimEnd()}
                  <UnitSuffix unit={unit} />
                </>
              ) : (
                mark.label
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
