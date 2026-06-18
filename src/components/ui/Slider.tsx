import React, { type ReactNode, useId } from 'react';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  colorClass?: string; // e.g., 'primary', 'secondary', 'accent'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Slider: React.FC<SliderProps> = ({ 
  label, 
  value, 
  min, 
  max, 
  step = 1, 
  unit = '', 
  colorClass = 'primary',
  onChange,
  className = '',
  id,
  'aria-valuetext': ariaValueText,
  ...props 
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={inputId} className="flex justify-between mb-2 font-semibold text-sm">
        <span>{label}</span>
        <span className={`text-${colorClass} font-mono`}>
          {value}{unit}
        </span>
      </label>
      <input 
        id={inputId}
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={onChange} 
        className={`range range-${colorClass} range-sm`} 
        aria-valuetext={ariaValueText ?? `${value}${unit}`}
        {...props}
      />
    </div>
  );
};
