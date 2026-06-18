import React, { type ReactNode, useId, useMemo } from 'react';
import { CrayonArt } from '../crayon';
import {
  SLIDER_MOTIFS,
  getSliderRailSvg,
  type SliderMotif,
} from './sliderMotifs';

export type { SliderMotif };

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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Optional formatter for the value readout (defaults to raw number + unit). */
  formatValue?: (value: number) => string;
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
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const config = SLIDER_MOTIFS[motif];
  const railSvg = useMemo(() => getSliderRailSvg(config.rail), [config.rail]);
  const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;

  return (
    <div className={`crayon-slider w-full ${className}`} data-motif={motif}>
      {!compact && (
        <label htmlFor={inputId} className="flex justify-between mb-2 font-semibold text-sm gap-2">
          <span>{label}</span>
          {!hideReadout && (
            <span className={`text-${colorClass} font-mono shrink-0`}>
              {readout ?? displayValue}
            </span>
          )}
        </label>
      )}

      <div className="crayon-slider__row flex items-center gap-2.5">
        <CrayonArt
          name={config.art}
          size={30}
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
    </div>
  );
};

export default Slider;
