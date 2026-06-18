import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import { resolveUnitGuide, unitGuideHref } from '../../lib/unitGuide';

export interface UnitGuideLinkProps {
  /** Unit as shown in the UI, e.g. `kg`, `m/s`, `°C`. */
  unit: string;
  className?: string;
  /** Icon size in pixels. */
  size?: number;
}

/** Question-mark link to the matching entry in the Scientific Units explorer. */
export function UnitGuideLink({ unit, className = '', size = 14 }: UnitGuideLinkProps) {
  const href = unitGuideHref(unit);
  const guide = resolveUnitGuide(unit);
  if (!href || !guide) return null;

  return (
    <Link
      to={href}
      className={`inline-flex shrink-0 align-middle text-base-content/45 hover:text-primary transition-colors ${className}`}
      title={`What is ${guide.name}? (${guide.symbol})`}
      aria-label={`Learn about ${guide.name} (${guide.symbol})`}
    >
      <HelpCircle size={size} strokeWidth={2.25} aria-hidden />
    </Link>
  );
}

/** Unit text with a guide link, preserving a leading space when present. */
export function UnitSuffix({ unit, className = '' }: { unit: string; className?: string }) {
  const trimmed = unit.trim();
  if (!trimmed) return null;
  const leadingSpace = unit.startsWith(' ') ? ' ' : '';

  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      {leadingSpace}
      {trimmed}
      <UnitGuideLink unit={trimmed} size={12} />
    </span>
  );
}

/** Numeric (or formatted) value plus unit and guide link. */
export function MeasuredValue({
  value,
  unit,
  className = '',
  valueClassName = '',
}: {
  value: ReactNode;
  unit: string;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <span className={`inline-flex items-baseline gap-0.5 ${className}`}>
      <span className={valueClassName}>{value}</span>
      <UnitSuffix unit={unit.startsWith(' ') ? unit : ` ${unit}`} />
    </span>
  );
}

export default UnitGuideLink;
