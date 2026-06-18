import type { VisualizerModule } from '../data/registry';

/**
 * Lightweight, dependency-free approximate search for the tool catalog.
 *
 * It is case- and diacritic-insensitive, token-based, supports substrings, and
 * is typo-tolerant via a bounded Levenshtein edit distance. Matches are scored
 * across the title, description, the `tags` chips, and the free-text
 * `searchTags`, so synonyms / Tagalog terms (e.g. "bagyo", "kuryente") and
 * small misspellings still surface the right tool.
 */

/** Lowercase, strip diacritics, and collapse punctuation to spaces. */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // combining diacritical marks
    .replace(/[²³]/g, '2') // superscripts used in formulas (a² + b²)
    .replace(/[^a-z0-9+]+/g, ' ') // keep + for "a2+b2=c2"
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value: string): string[] {
  const n = normalize(value);
  return n ? n.split(' ') : [];
}

/** Bounded Levenshtein distance; returns early once it exceeds `max`. */
function boundedLevenshtein(a: string, b: string, max: number): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;

  const prev = new Array(b.length + 1);
  const curr = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      if (curr[j] < rowMin) rowMin = curr[j];
    }
    if (rowMin > max) return max + 1; // whole row already past the limit
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}

/** Allowed typos scale with token length (short tokens must be near-exact). */
function maxEdits(len: number): number {
  if (len <= 3) return 0;
  if (len <= 6) return 1;
  return 2;
}

interface SearchableField {
  tokens: string[];
  text: string;
  weight: number;
}

function buildFields(module: VisualizerModule): SearchableField[] {
  const tagText = module.tags.join(' ');
  const searchTagText = (module.searchTags ?? []).join(' ');
  return [
    { weight: 6, text: normalize(module.title), tokens: tokenize(module.title) },
    { weight: 4, text: normalize(searchTagText), tokens: tokenize(searchTagText) },
    { weight: 3, text: normalize(tagText), tokens: tokenize(tagText) },
    { weight: 2, text: normalize(module.description), tokens: tokenize(module.description) },
  ];
}

/** Best score for a single query token within one field, or 0 if no match. */
function scoreTokenInField(queryToken: string, field: SearchableField): number {
  // Whole-field substring (handles multi-word query tokens are already split,
  // but this also rewards contiguous appearance like "circuit" in "circuits").
  let best = 0;
  if (field.text.includes(queryToken)) {
    best = Math.max(best, 0.9);
  }

  const limit = maxEdits(queryToken.length);
  for (const token of field.tokens) {
    if (token === queryToken) {
      best = Math.max(best, 1);
    } else if (token.startsWith(queryToken)) {
      best = Math.max(best, 0.85);
    } else if (token.includes(queryToken) && queryToken.length >= 3) {
      best = Math.max(best, 0.7);
    } else if (limit > 0) {
      const dist = boundedLevenshtein(queryToken, token, limit);
      if (dist <= limit) {
        best = Math.max(best, 0.65 - (dist - 1) * 0.1);
      }
    }
    if (best === 1) break;
  }
  return best;
}

/**
 * Returns a relevance score for `module` against `query`, or `null` when it is
 * not a match. Every query token must match somewhere (AND semantics) so the
 * results stay precise, while tags widen what counts as a match.
 */
export function scoreModule(module: VisualizerModule, query: string): number | null {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return 0;

  const fields = buildFields(module);
  let total = 0;

  for (const queryToken of queryTokens) {
    let bestForToken = 0;
    for (const field of fields) {
      const fieldScore = scoreTokenInField(queryToken, field) * field.weight;
      if (fieldScore > bestForToken) bestForToken = fieldScore;
    }
    if (bestForToken === 0) return null; // a query token matched nothing
    total += bestForToken;
  }

  return total;
}

/** Filter + rank modules by approximate relevance to `query`. */
export function searchModules<T extends VisualizerModule>(modules: T[], query: string): T[] {
  if (normalize(query) === '') return modules;

  const scored: { module: T; score: number }[] = [];
  for (const module of modules) {
    const score = scoreModule(module, query);
    if (score !== null) scored.push({ module, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((entry) => entry.module);
}
