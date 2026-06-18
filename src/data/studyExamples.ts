/**
 * One or two concrete problems or scenarios learners commonly encounter
 * for each tool (and standalone blog articles). Single source for writeup
 * and blog article rendering via `<StudyExamples />` in VisualizerLayout
 * and BlogPost — not duplicated in MDX files.
 */
export const studyExamples: Record<string, string[]> = {
  fractions: [
    'Compare 3/8 and 2/5 — which amount is bigger?',
    'Add 1/2 + 1/3 after renaming both to sixths.',
  ],
  'states-of-matter': [
    'What happens to ice when you heat it past 0°C?',
    'Why does steam rise above a boiling kettle?',
  ],
  'life-cycles': [
    'Philippine eagle: one chick about every two years.',
    'Mosquito: egg to adult in as little as two weeks.',
  ],
  'water-cycle': [
    'Where monsoon rain goes after it hits a watershed.',
    'How transpiration from trees returns water to the sky.',
  ],
  'human-body': [
    'Trace blood from heart → lungs → body and back.',
    'What happens in the reflex arc when you touch something hot.',
  ],
  'food-web': [
    'How energy drops from palay to maya to uwak in a rice paddy.',
    'What decomposers do when plants and animals die.',
  ],
  'solar-system': [
    'Order the eight planets from the Sun outward.',
    'Why Mars takes longer to orbit than Earth (same star, different distance).',
  ],
  seasons: [
    'Why the noon sun is higher in April than in December in the Philippines.',
    'When tag-init and tag-ulan typically arrive and what drives them.',
  ],
  microscope: [
    'Tell chloroplast from nucleus in a plant cell slide.',
    'What the cell wall does that animal cells do not have.',
  ],
  density: [
    'Will an egg float in salt water but sink in tap water?',
    'Why a steel ship floats though solid steel sinks.',
  ],
  'forces-and-motion': [
    'Net force on a jeepney coasting with friction still acting.',
    'How doubling the push changes acceleration when mass stays the same (F = ma).',
  ],
  'punnett-square': [
    'Cross Rr × Rr for gumamela flower color — read the genotype grid.',
    'Predict the 3:1 phenotype ratio from a monohybrid cross.',
  ],
  'chemical-bonding': [
    'How sodium and chlorine form NaCl by electron transfer.',
    'How two chlorine atoms share a pair to form Cl₂.',
  ],
  'projectile-motion': [
    'A ball thrown at 45° — estimate range, apex, and time of flight.',
    'Same launch speed at 30° vs 60° — which goes farther?',
  ],
  'plate-tectonics': [
    'What happens at the West Valley Fault (transform boundary).',
    'Subduction at the Philippine Trench and why volcanoes line up behind it.',
  ],
  'wave-physics': [
    'Double the frequency on a fixed string — what happens to wavelength?',
    'How amplitude affects the energy carried by a wave.',
  ],
  'electromagnetic-spectrum': [
    'Rank radio waves, visible light, and X-rays by wavelength.',
    'Why UV can sunburn skin but FM radio passes through harmlessly.',
  ],
  photosynthesis: [
    'Which factor limits the rate first: light, CO₂, or temperature?',
    'What the leaf makes vs what it needs as inputs.',
  ],
  'cell-division': [
    'Order prophase → metaphase → anaphase → telophase.',
    'How mitosis keeps the chromosome number the same in each daughter cell.',
  ],
  'rock-cycle': [
    'Fresh basalt from a volcano weathering into sediment.',
    'Heat and pressure turning rock metamorphic without melting it first.',
  ],
  stoichiometry: [
    '2H₂ + O₂ → 2H₂O — which reactant runs out first?',
    'Find grams of product and leftover moles after the limiting reactant is used up.',
  ],
  'typhoon-tracker': [
    'At what wind speed does PAGASA issue Signal No. 1?',
    'Prepare a before / during / after checklist for Signal No. 3.',
  ],
  'electric-circuits': [
    'Two identical bulbs in series vs parallel — which setup is brighter?',
    'Why one dead bulb kills an entire old Christmas parol string.',
  ],
  'gas-laws': [
    'Boyle: compress a syringe — pressure vs volume at fixed temperature.',
    'Charles: warm a balloon — volume vs temperature at fixed pressure.',
  ],
  'solution-concentration': [
    'Make a 10% salt solution by mass in a beaker.',
    'What happens when you keep adding sugar past the saturation point.',
  ],
  'integer-number-line': [
    '−3 + 5 as hops on the number line.',
    '4 − 7 — predict left or right before the arrow moves.',
  ],
  trigonometry: [
    'sin 30° and cos 60° from the unit circle.',
    'Opposite / hypotenuse for a 3-4-5 right triangle.',
  ],
  sequences: [
    'Arithmetic: start at 2 and add 3 each term — write the first five.',
    'Geometric: start at 2 and multiply by 2 each term — when does it go negative?',
  ],
  optics: [
    'Ray diagram for a concave mirror — locate a real image.',
    'Why a convex mirror always gives an upright, virtual image.',
  ],
  'gcf-lcm': [
    'GCF and LCM of 12 and 18 from prime factor trees.',
    'Use the LCM to add 1/4 + 1/6 without guessing the denominator.',
  ],
  'sets-venn': [
    'Students who play basketball OR volleyball — shade the union.',
    'Count how many are in neither set using inclusion–exclusion.',
  ],
  'surface-area': [
    'Surface area of a cube with edge 4 cm from its net.',
    'Fold a rectangular prism net and match each face to the formula term.',
  ],
  pythagorean: [
    'Find the hypotenuse of a 3-4-5 triangle.',
    'Check whether a 5-12-13 triangle is actually right.',
  ],
  'reaction-rate': [
    'Why warming reactants speeds up a reaction (collision theory).',
    'How a catalyst lowers activation energy without being consumed.',
  ],
  'permutations-combinations': [
    'Arrange 3 books on a shelf — order matters (permutation).',
    'Choose 2 fruits from 5 — order does not matter (combination).',
  ],
  'computer-science': [
    'Convert decimal 13 to binary (1101).',
    'How 8 bits encode one channel of an RGB pixel.',
  ],
  /** Standalone blog article (no tool). */
  'digital-divide': [
    'A school with one shared computer lab vs students who only have phones.',
    'Using an offline-ready browser tool during brownouts or spotty load.',
  ],
};

import { resolveWriteupModuleId } from '../lib/writeupSlugs';

export function resolveStudyExamplesId(id: string): string {
  return resolveWriteupModuleId(id);
}

export function getStudyExamples(id: string): string[] | undefined {
  const key = resolveStudyExamplesId(id);
  return studyExamples[key];
}
