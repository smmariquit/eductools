export const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
};

export const lcm = (a: number, b: number): number =>
  a === 0 || b === 0 ? 0 : Math.abs((a * b) / gcd(a, b));

export interface SimpleFraction {
  n: number;
  d: number;
}

/** Reduce; sign lives on the numerator. */
export function simplify(n: number, d: number): SimpleFraction {
  if (d === 0) return { n: 0, d: 1 };
  const sign = (Math.sign(n) * Math.sign(d)) || 1;
  const g = gcd(n, d);
  return { n: (Math.abs(n) / g) * sign, d: Math.abs(d) / g };
}

export interface MixedFraction {
  sign: 1 | -1;
  whole: number;
  num: number;
  den: number;
}

export function toMixed(n: number, d: number): MixedFraction {
  const { n: sn, d: sd } = simplify(n, d);
  const sign = (sn < 0 ? -1 : 1) as 1 | -1;
  const absN = Math.abs(sn);
  return {
    sign,
    whole: Math.floor(absN / sd),
    num: absN % sd,
    den: sd,
  };
}

export type FractionKind = 'zero' | 'whole' | 'proper' | 'improper';

export function fractionKind(n: number, d: number): FractionKind {
  const absN = Math.abs(n);
  if (absN === 0) return 'zero';
  if (absN % Math.abs(d) === 0) return 'whole';
  if (absN < Math.abs(d)) return 'proper';
  return 'improper';
}

export function addFractions(a: SimpleFraction, b: SimpleFraction): SimpleFraction {
  const common = lcm(a.d, b.d);
  const scaledA = (a.n * common) / a.d;
  const scaledB = (b.n * common) / b.d;
  return simplify(scaledA + scaledB, common);
}

export function scaleToDenominator(n: number, d: number, targetDen: number): number {
  if (d === 0) return 0;
  return (n * targetDen) / d;
}

export const equivalents = (n: number, d: number, count = 4) => {
  const { n: sn, d: sd } = simplify(n, d);
  return Array.from({ length: count }, (_, i) => {
    const k = i + 1;
    return { n: sn * k, d: sd * k };
  });
};

export function minusSign(sign: 1 | -1): string {
  return sign < 0 ? '−' : '';
}
