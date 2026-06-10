import React, { type ReactNode } from 'react';

export type StatColor = 'primary' | 'secondary' | 'accent' | 'warning' | 'info' | 'success' | 'error' | 'base';

export interface StatCardProps {
  label: ReactNode;
  value: ReactNode;
  color?: StatColor;
  borderWidth?: 1 | 2;
  className?: string;
  valueClassName?: string;
}

const colorMap: Record<StatColor, { bg: string, border: string, text: string, textMuted: string }> = {
  primary: { bg: 'bg-primary/10', border: 'border-primary/30', text: 'text-primary', textMuted: 'text-primary/70' },
  secondary: { bg: 'bg-secondary/10', border: 'border-secondary/30', text: 'text-secondary', textMuted: 'text-secondary/70' },
  accent: { bg: 'bg-accent/10', border: 'border-accent/30', text: 'text-accent', textMuted: 'text-accent/70' },
  warning: { bg: 'bg-warning/10', border: 'border-warning/30', text: 'text-warning', textMuted: 'text-warning/70' },
  info: { bg: 'bg-info/10', border: 'border-info/30', text: 'text-info', textMuted: 'text-info/70' },
  success: { bg: 'bg-success/10', border: 'border-success/30', text: 'text-success', textMuted: 'text-success/70' },
  error: { bg: 'bg-error/10', border: 'border-error/30', text: 'text-error', textMuted: 'text-error/70' },
  base: { bg: 'bg-base-200', border: 'border-base-300', text: 'text-base-content', textMuted: 'text-base-content/70' },
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  color = 'primary',
  borderWidth = 1,
  className = '',
  valueClassName = 'text-4xl font-extrabold font-mono',
}) => {
  const theme = colorMap[color];
  const borderClass = borderWidth === 2 ? `border-2 ${theme.border}` : `border ${theme.border}`;

  return (
    <div className={`text-center p-4 rounded-lg flex flex-col items-center ${theme.bg} ${borderClass} ${className}`}>
      <div className={`text-xs font-bold uppercase mb-1 ${theme.textMuted}`}>{label}</div>
      <div className={`${valueClassName} ${theme.text}`}>
        {value}
      </div>
    </div>
  );
};
