import { useCallback, useMemo, useState } from 'react';

/**
 * Tracks whether an explore/animation tool has been "started" from its intro
 * state. Use with <IntroState> for tools that have no required numeric entry.
 */
export function useIntroState(initiallyStarted = false) {
  const [started, setStarted] = useState(initiallyStarted);
  const start = useCallback(() => setStarted(true), []);
  const reset = useCallback(() => setStarted(false), []);
  return { started, start, reset, setStarted } as const;
}

/**
 * Tracks which guided fields the learner has touched. Handy for slider-based
 * tools where the control always has a numeric value, so "filled" is modelled
 * as "the learner has engaged with it" rather than null.
 */
export function useTouchedFields<K extends string>() {
  const [touched, setTouched] = useState<Set<K>>(() => new Set());

  const touch = useCallback((key: K) => {
    setTouched((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  const touchAll = useCallback((keys: readonly K[]) => {
    setTouched(new Set(keys));
  }, []);

  const reset = useCallback(() => setTouched(new Set()), []);

  const isTouched = useCallback((key: K) => touched.has(key), [touched]);

  return useMemo(
    () => ({ touched, touch, touchAll, reset, isTouched }),
    [touched, touch, touchAll, reset, isTouched],
  );
}
