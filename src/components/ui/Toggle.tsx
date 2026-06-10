export type ToggleColor = 'primary' | 'secondary' | 'accent' | 'warning' | 'info' | 'success' | 'error' | 'neutral';

export interface ToggleOption<T extends string> {
  value: T;
  label: string;
  activeColor?: ToggleColor;
}

export interface ToggleProps<T extends string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const colorClassMap: Record<ToggleColor, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  warning: 'btn-warning',
  info: 'btn-info',
  success: 'btn-success',
  error: 'btn-error',
  neutral: 'btn-neutral',
};

export const Toggle = <T extends string>({ 
  options, 
  value, 
  onChange, 
  className = '',
  size = 'md'
}: ToggleProps<T>) => {
  const sizeClass = size === 'md' ? '' : `btn-${size}`;

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="join">
        {options.map((option) => {
          const isActive = value === option.value;
          const activeColorClass = option.activeColor ? colorClassMap[option.activeColor] : colorClassMap.primary;
          const btnClass = isActive ? activeColorClass : 'btn-outline';
          
          return (
            <button 
              key={option.value}
              onClick={() => onChange(option.value)} 
              className={`join-item btn ${sizeClass} ${btnClass}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
