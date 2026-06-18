import React from 'react';

/** Minimal Philippine archipelago silhouette (Luzon → Sulu). viewBox 0 0 120 210. */
export const PHILIPPINES_VIEWBOX = '0 0 120 210';

export interface PhilippinesArchipelagoProps {
  /** Extra classes on the island group (e.g. fill-success stroke-success-content). */
  className?: string;
  strokeWidth?: number;
  showLabel?: boolean;
  /** Label fill; defaults to currentColor at 85% opacity via inline style when omitted. */
  labelFill?: string;
}

/** Island paths only — embed inside a parent `<svg>` via `<g>` or nested `<svg>`. */
export const PhilippinesArchipelago: React.FC<PhilippinesArchipelagoProps> = ({
  className = 'fill-success stroke-success-content',
  strokeWidth = 0.8,
  showLabel = true,
  labelFill,
}) => (
  <>
    <g className={className} strokeWidth={strokeWidth} strokeLinejoin="round">
      {/* Luzon */}
      <path d="M64 6 C54 6 48 14 49 24 C50 32 44 36 48 44 C52 50 50 56 58 58 C64 62 66 70 74 74 C86 80 94 88 90 92 C86 94 82 88 78 82 C72 76 66 72 64 64 C70 58 72 50 70 42 C74 30 76 20 72 12 C70 7 68 6 64 6 Z" />
      {/* Mindoro */}
      <path d="M44 96 C50 95 53 100 51 106 C49 111 42 110 41 104 C40 99 41 97 44 96 Z" />
      {/* Palawan */}
      <path d="M52 112 C55 113 55 117 52 120 L18 176 C16 179 12 178 12 175 C12 173 14 171 16 169 L48 116 C49 113 50 112 52 112 Z" />
      {/* Visayas */}
      <path d="M62 108 L73 110 L67 128 L61 118 Z" />
      <path d="M75 110 L83 113 L81 134 L76 124 Z" />
      <path d="M85 112 L89 114 L88 136 L85 132 Z" />
      <path d="M92 110 L99 115 L96 132 L92 122 Z" />
      <path d="M98 102 L108 107 L103 124 L97 114 Z" />
      <path d="M88 138 C94 137 96 142 92 145 C88 147 85 143 86 140 C86 138 87 138 88 138 Z" />
      {/* Mindanao */}
      <path d="M74 148 C66 149 62 156 56 158 C52 160 52 164 57 163 C64 162 68 160 72 164 C74 170 70 176 74 182 C80 192 92 196 102 192 C113 187 117 175 113 165 C116 156 108 150 98 149 C88 147 80 147 74 148 Z" />
      {/* Sulu archipelago */}
      <circle cx="48" cy="176" r="2.2" />
      <circle cx="41" cy="183" r="1.8" />
      <circle cx="35" cy="189" r="1.4" />
    </g>
    {showLabel && (
      <text
        x="6"
        y="20"
        fontSize="6"
        fontWeight="bold"
        fill={labelFill ?? 'currentColor'}
        fillOpacity={labelFill ? undefined : 0.85}
      >
        PHILIPPINES
      </text>
    )}
  </>
);

export interface PhilippinesMapProps extends PhilippinesArchipelagoProps {
  /** Classes on the outer `<svg>` (positioning, opacity, etc.). */
  svgClassName?: string;
  width?: number | string;
  height?: number | string;
  /** For embedding as a nested SVG inside a parent diagram. */
  x?: number | string;
  y?: number | string;
  role?: string;
  'aria-label'?: string;
}

/** Standalone or nested SVG map of the Philippine archipelago. */
export const PhilippinesMap: React.FC<PhilippinesMapProps> = ({
  svgClassName,
  width = '100%',
  height = '100%',
  x,
  y,
  role = 'img',
  'aria-label': ariaLabel = 'Map of the Philippines',
  ...archipelagoProps
}) => (
  <svg
    x={x}
    y={y}
    width={width}
    height={height}
    viewBox={PHILIPPINES_VIEWBOX}
    preserveAspectRatio="xMidYMid meet"
    className={svgClassName}
    role={role}
    aria-label={ariaLabel}
  >
    <PhilippinesArchipelago {...archipelagoProps} />
  </svg>
);

export default PhilippinesMap;
