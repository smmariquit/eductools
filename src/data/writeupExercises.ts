import { resolveStudyExamplesId } from './studyExamples';

export interface WriteupExerciseInteger {
  prompt: string;
  kind: 'integer';
  answer: number;
  why?: string;
}

export interface WriteupExerciseOpen {
  prompt: string;
  kind: 'open';
  answer: string;
  why: string;
}

export type WriteupExercise = WriteupExerciseInteger | WriteupExerciseOpen;

const int = (prompt: string, answer: number, why?: string): WriteupExerciseInteger => ({
  prompt,
  kind: 'integer',
  answer,
  why,
});

const open = (prompt: string, answer: string, why: string): WriteupExerciseOpen => ({
  prompt,
  kind: 'open',
  answer,
  why,
});

/** Three to five reflection or practice prompts per tool writeup and blog article. */
export const writeupExercises: Record<string, WriteupExercise[]> = {
  fractions: [
    open(
      'Set pie A to 3/8 and pie B to 2/5. Which slice is larger? Show your cross-multiplication.',
      'Pie B (2/5) is larger than pie A (3/8).',
      'Cross-multiply: 3 × 5 = 15 and 2 × 8 = 16. Since 15 < 16, 3/8 < 2/5.',
    ),
    open(
      'Rename 1/2 and 1/3 to sixths, then add. Why could you not add the tops and bottoms directly?',
      '1/2 + 1/3 = 3/6 + 2/6 = 5/6.',
      'Denominators count different slice sizes. You can only add when pieces match — rename both to sixths first.',
    ),
    int(
      'Find an equivalent fraction for 4/6 with denominator 12. What is the numerator?',
      8,
      'Multiply top and bottom by 2: 4/6 = 8/12. Same amount, different name.',
    ),
    int(
      'A recipe calls for 2/3 cup of coconut milk. You only have a 1/6 cup measure. How many scoops do you need?',
      4,
      '2/3 = 4/6, so four 1/6-cup scoops equal two-thirds of a cup.',
    ),
  ],
  'states-of-matter': [
    open(
      'At 25°C in the tool, what state is water in? What changes at 0°C and at 100°C?',
      'Liquid at 25°C; freezes at 0°C; boils at 100°C (at normal pressure).',
      'Crossing melting and boiling points changes how tightly particles bind and how freely they move.',
    ),
    open(
      'Switch to dry ice (CO₂). Why does the badge never show “liquid” at normal pressure?',
      'CO₂ sublimes — it goes straight from solid to gas at everyday pressure.',
      'Not every substance has a stable liquid phase at 1 atm; dry ice skips liquid without enough pressure.',
    ),
    open(
      'Compare iron and ethanol at room temperature. Which stays solid, and which boils first when you heat?',
      'Iron stays solid; ethanol is liquid and boils long before iron melts.',
      'Strong metallic bonds hold iron until very high temperature; ethanol’s weaker forces vaporize with modest heat.',
    ),
    open(
      'In your own words, what are particles doing in a solid versus a gas?',
      'Solid: vibrate in fixed positions. Gas: move freely and spread out.',
      'Same particles, different energy — locked in place in solids, far apart and colliding in gases.',
    ),
    open(
      'Mercury is liquid in many thermometers at room temperature. Use the tool to find its melting point and explain why that matters.',
      'Mercury melts around −39°C, so it stays liquid in typical room temperatures.',
      'Thermometer fluid must stay liquid across the range you measure; mercury’s low melting point helps where water would freeze.',
    ),
  ],
  'life-cycles': [
    int(
      'Step through the Philippine eagle cycle. About how many years between successful breeding attempts?',
      2,
      'Philippine eagles often wait roughly two years between breeding attempts — slow, high-investment reproduction.',
    ),
    open(
      'Compare mosquito and cockroach: which reaches adulthood faster, and why might that affect control efforts?',
      'Mosquito (weeks) is much faster than cockroach (months).',
      'Fast breeders rebound quickly after control; slow breeders need long-term habitat protection.',
    ),
    open(
      'Name one complete-metamorphosis stage sequence and one incomplete-metamorphosis sequence from the tool.',
      'Complete: egg → larva → pupa → adult. Incomplete: egg → nymph → adult.',
      'Complete metamorphosis rebuilds the body in a pupa; incomplete adds size through nymph stages.',
    ),
    open(
      'Why might a slow breeder like the tamaraw be harder to recover after habitat loss than a fast breeder?',
      'Each lost individual takes years to replace; population growth is very slow.',
      'Recovery needs surviving adults, safe habitat, and time — fast species can repopulate in a season.',
    ),
  ],
  'water-cycle': [
    open(
      'Trace one raindrop from ocean evaporation back to the ocean. Name each step you pass.',
      'Evaporation → condensation → precipitation → runoff/collection → ocean.',
      'Water changes state and location but is conserved in the loop.',
    ),
    open(
      'During tag-ulan, which process adds the most water vapor to the air over land: evaporation or transpiration?',
      'Transpiration from plants often rivals or exceeds open-water evaporation over forested land.',
      'Plants pump soil water through leaves; lush wet-season vegetation releases huge amounts of vapor.',
    ),
    open(
      'What happens to rain that falls on a paved city street versus a forest watershed?',
      'Pavement speeds runoff into drains; forest soil absorbs and releases water slowly.',
      'Impervious surfaces reduce infiltration and increase flooding; forests recharge groundwater.',
    ),
    open(
      'Draw a simple diagram (on paper) of the cycle and label five processes in English or Filipino.',
      'Any diagram with evaporation, condensation, precipitation, runoff, and collection/transpiration.',
      'Naming processes in either language builds the same mental model of the water loop.',
    ),
  ],
  'human-body': [
    open(
      'In order, list the path of blood from the heart to the lungs and back to the body.',
      'Heart → lungs → heart → body.',
      'Blood picks up oxygen in the lungs, returns to the heart, then is pumped to organs and muscles.',
    ),
    open(
      'What does the small intestine absorb that the bloodstream then delivers to cells?',
      'Digested nutrients — sugars, amino acids, fatty acids, vitamins, and minerals.',
      'Most absorption happens in the small intestine; blood carries those supplies to every cell.',
    ),
    open(
      'Describe the reflex arc when you touch something hot — which parts react before you “decide” to pull away?',
      'Receptor → sensory neuron → spinal cord → motor neuron → muscle.',
      'Reflexes skip conscious thought to protect the body; withdrawal happens before full brain processing.',
    ),
    open(
      'Why do you breathe faster after exercise? Connect lungs, blood, and muscles in your answer.',
      'Muscles need more O₂ and produce more CO₂; faster breathing swaps gases in the lungs.',
      'Working muscles raise demand; respiratory and circulatory systems scale up together.',
    ),
  ],
  'food-web': [
    open(
      'Start at palay. Name two consumers that eat it and one predator above them.',
      'Examples: maya and daga eat palay; uwak or a snake may eat those consumers.',
      'Energy flows up trophic levels; each link depends on the level below.',
    ),
    int(
      'Roughly how much energy reaches the third trophic level if the producer starts with 10,000 units?',
      100,
      'About 10% passes per level: 10,000 → 1,000 → 100. Most energy is lost as heat at each step.',
    ),
    open(
      'What role do decomposers play if all producers disappeared for one season?',
      'They break down dead matter, but new producers cannot return without living plants or seeds.',
      'Decomposers recycle nutrients but do not create energy from sunlight.',
    ),
    open(
      'Add one invasive species to the web on paper. Who might lose food if it eats the same prey?',
      'Any native consumer that competes for the same prey or is eaten by the invader.',
      'Invasives shift balances by outcompeting natives or adding new predators.',
    ),
  ],
  'solar-system': [
    open(
      'List the eight planets in order from the Sun. Which two are the ice giants?',
      'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune — ice giants: Uranus and Neptune.',
      'Inner rocky worlds sit close to the Sun; gas and ice giants dominate the outer system.',
    ),
    open(
      'Mars is farther from the Sun than Earth. What does the tool suggest about its orbital period?',
      'Mars takes longer than Earth to orbit (about 687 Earth days).',
      'Farther planets travel longer paths and move more slowly, so their year is longer.',
    ),
    open(
      'Why does the visualizer use a log scale instead of true-to-scale distances?',
      'True scale would cram inner planets and push outer ones off-screen; log scale keeps all orbits visible.',
      'Log spacing shows order and relative gaps without unusable empty space.',
    ),
    open(
      'In AU, how much farther is Neptune than Mercury? Use the tool readout to estimate.',
      'Neptune ~30 AU vs Mercury ~0.4 AU — roughly 75× farther.',
      'AU compares distances to Earth–Sun separation; the outer system is vastly farther out.',
    ),
  ],
  seasons: [
    open(
      'Set the date to June in the Philippines. Is the noon sun higher or lower than in December?',
      'Higher in June.',
      'Earth’s tilt aims the northern hemisphere toward the Sun in June, raising the midday sun angle.',
    ),
    open(
      'What tilt direction brings tag-init, and what large-scale wind shift brings tag-ulan?',
      'Tag-init: higher sun and drier winds. Tag-ulan: monsoon shift bringing moist southwest flow.',
      'Seasons combine astronomy (tilt) with regional wind and rain patterns.',
    ),
    open(
      'If Earth’s axis were not tilted, would Manila still have wet and dry seasons? Explain.',
      'Likely yes from monsoon winds, but sun angle would vary much less.',
      'Near the equator, rainfall often follows winds and oceans as much as axial tilt.',
    ),
    open(
      'Sketch Earth in orbit for March and September. What is special about day and night length at the equinox?',
      'Day and night are nearly equal (about 12 hours each) worldwide.',
      'At equinox, neither hemisphere is tilted toward the Sun.',
    ),
  ],
  microscope: [
    open(
      'At the highest zoom, identify the nucleus, cell wall, and at least one chloroplast.',
      'Nucleus: central control; cell wall: rigid outer layer; chloroplasts: green photosynthesis sites.',
      'All three are visible in plant cells at high magnification.',
    ),
    open(
      'Which organelle would be missing in an animal cheek cell compared with this plant cell?',
      'Cell wall and chloroplasts (and often a large central vacuole).',
      'Animal cells are flexible and do not photosynthesize.',
    ),
    open(
      'What is the difference between magnification and resolution in your own words?',
      'Magnification makes things look bigger; resolution lets you see fine detail clearly.',
      'Zoom without resolution just enlarges blur.',
    ),
    open(
      'Why might a blurry slide still look “green” but hide the structures you need to see?',
      'Chlorophyll color spreads across the view even when structures are out of focus.',
      'Color shows chloroplasts are present; sharp focus reveals walls and nucleus.',
    ),
  ],
  density: [
    open(
      'Set mass 600 kg and volume 1 m³ in fresh water (1000 kg/m³). Float or sink?',
      'Float — object density 600 kg/m³ is less than water.',
      'Compare ρ_object to ρ_fluid; lower density means it displaces its weight before fully submerging.',
    ),
    open(
      'Switch fluid to seawater (1025 kg/m³). Does the submerged fraction increase or decrease?',
      'Decrease — the object rides higher in denser seawater.',
      'Denser fluid gives more buoyant force for the same submerged volume.',
    ),
    open(
      'An ice block (920 kg/m³) sits in a glass of water. Predict how much of it sits below the surface.',
      'About 92% submerged (920/1000).',
      'Floating objects sink until submerged fraction matches ρ_object/ρ_fluid.',
    ),
    open(
      'Explain why a steel ship floats even though a steel bolt sinks.',
      'The ship’s average density (steel + air) is below water; the bolt is solid steel.',
      'Shape spreads mass over volume, lowering average density below water.',
    ),
  ],
  'forces-and-motion': [
    int(
      'With mass 1500 kg and friction 0.05, how much force (N) is needed just to overcome static friction (approx.)?',
      735,
      'Maximum static friction ≈ μmg = 0.05 × 1500 × 9.8 = 735 N in the tool.',
    ),
    open(
      'Double the applied force without changing mass. What happens to acceleration?',
      'Acceleration doubles (F = ma, same m).',
      'Newton’s second law: net force and acceleration scale together when mass is fixed.',
    ),
    open(
      'Double the mass without changing force. What happens to acceleration?',
      'Acceleration halves.',
      'Same net force moves twice the mass, so acceleration drops by half.',
    ),
    open(
      'The jeep stops when net force is zero but friction is still on. Which law explains steady speed?',
      'Newton’s first law — zero net force means constant velocity (including staying at rest).',
      'Friction can balance applied force so net force is zero and speed no longer changes.',
    ),
  ],
  'punnett-square': [
    open(
      'Cross two heterozygous parents (Rr × Rr). What genotype ratio appears in the grid?',
      '1 RR : 2 Rr : 1 rr.',
      'Each parent passes R or r with equal chance; the Punnett square counts all four combinations.',
    ),
    open(
      'From that cross, what phenotype ratio do you expect if R (red) is dominant?',
      '3 red : 1 white (or recessive phenotype).',
      'RR, Rr, and Rr show dominant red; only rr shows recessive.',
    ),
    open(
      'If one parent is rr and the other is Rr, can any offspring show the recessive phenotype? Why?',
      'Yes — half the offspring can be rr.',
      'Rr parent passes r half the time; rr × Rr gives 50% rr genotypes.',
    ),
    open(
      'Define genotype and phenotype using your gumamela example.',
      'Genotype: allele letters (e.g. Rr). Phenotype: visible trait (e.g. red flower).',
      'Genotype is the genetic code; phenotype is what you actually observe.',
    ),
  ],
  'chemical-bonding': [
    int(
      'In NaCl formation, does sodium gain or lose electrons? How many?',
      1,
      'Sodium loses 1 electron to reach a stable octet, becoming Na⁺.',
    ),
    int(
      'In Cl₂, how many electrons are shared in one covalent bond?',
      2,
      'One shared pair — two electrons — holds the two chlorine atoms together.',
    ),
    open(
      'Why does sodium not simply share one electron with chlorine instead of transferring it?',
      'Sodium’s electron is too weakly held; transfer to chlorine’s high affinity is lower energy than sharing.',
      'Large electronegativity difference favors ionic transfer over covalent sharing.',
    ),
    open(
      'Name one ionic and one covalent substance you use at home.',
      'Ionic: table salt (NaCl). Covalent: sugar or water.',
      'Ionic compounds often dissolve as ions; covalent molecules share electrons in discrete units.',
    ),
  ],
  'projectile-motion': [
    open(
      'Launch at 45° and 15 m/s. Record range, apex height, and time of flight from the tool.',
      'Read all three from the tool readout at those settings.',
      'Range, max height, and flight time depend on angle and speed — use the simulator values.',
    ),
    open(
      'Same speed at 30° versus 60° — which gives greater range? Why?',
      'They give the same range (complementary angles on level ground).',
      '30° and 60° are symmetric for range without air resistance; one trades height for horizontal speed.',
    ),
    open(
      'At the top of the path, what is the vertical velocity component?',
      'Zero — momentarily neither rising nor falling.',
      'Vertical velocity goes from up to zero to down; horizontal component stays roughly constant.',
    ),
    open(
      'How would range change on the Moon if gravity were weaker but launch speed stayed the same?',
      'Range and apex height increase; time of flight increases.',
      'Weaker g means the same launch speed keeps the projectile airborne longer and farther.',
    ),
  ],
  'plate-tectonics': [
    open(
      'What happens at a convergent boundary where oceanic crust meets continental crust?',
      'Oceanic plate subducts beneath the continent; trench and volcanoes form.',
      'Denser oceanic crust dives down; melting fuels volcanic arcs inland.',
    ),
    open(
      'Where is the West Valley Fault on the map, and what kind of boundary is it?',
      'Through Metro Manila area — a transform (strike-slip) fault.',
      'Transform boundaries slide past each other; the West Valley Fault stores seismic strain.',
    ),
    open(
      'Why do volcanoes often form behind a subduction trench?',
      'Subducting slab releases water; mantle melt rises as magma.',
      'Added water lowers melting point of overlying rock, feeding volcanic arcs.',
    ),
    open(
      'Name one Philippine hazard linked to plate motion and one linked to a transform fault.',
      'Subduction: volcanic eruptions or tsunamis. Transform: earthquakes along the West Valley Fault.',
      'Different boundary types produce different hazard profiles.',
    ),
  ],
  'wave-physics': [
    open(
      'Double frequency while keeping the same string. What happens to wavelength and wave speed?',
      'Wavelength halves; wave speed stays the same (set by the medium).',
      'v = fλ with fixed v means f and λ are inversely related.',
    ),
    open(
      'If amplitude doubles, does wave speed change? What about energy carried?',
      'Speed unchanged; energy carried increases.',
      'Amplitude affects energy, not the medium’s wave speed.',
    ),
    open(
      'Write the relationship v = fλ in words, then verify with one slider setting.',
      'Wave speed equals frequency times wavelength.',
      'Pick any readout: multiply f and λ — product should match the string’s speed.',
    ),
    open(
      'Is the highlighted dot on the string moving horizontally, vertically, or both?',
      'Vertically (for a transverse wave on a horizontal string).',
      'Particles oscillate perpendicular to wave travel in transverse waves.',
    ),
  ],
  'electromagnetic-spectrum': [
    open(
      'Order radio, visible light, and gamma rays from lowest to highest frequency.',
      'Radio → visible → gamma.',
      'Frequency increases across the spectrum; wavelength decreases the opposite way.',
    ),
    open(
      'At visible light on the slider, estimate wavelength and frequency from the readout.',
      'Use the tool values (visible light ≈ hundreds of THz, hundreds of nm).',
      'The slider locks f, λ, and photon energy together at c = fλ.',
    ),
    open(
      'Why can UV cause sunburn but FM radio generally cannot?',
      'UV photons carry enough energy to damage skin; radio photons are too low-energy.',
      'Higher frequency means higher photon energy (E = hf).',
    ),
    open(
      'If frequency doubles, what happens to photon energy according to E = hf?',
      'Photon energy doubles.',
      'Energy is directly proportional to frequency with Planck’s constant h fixed.',
    ),
  ],
  photosynthesis: [
    open(
      'Set light high but CO₂ very low. Which factor limits the rate first?',
      'CO₂ (carbon dioxide) becomes the limiting factor.',
      'When one input is scarce, raising others cannot speed the reaction until that bottleneck is fixed.',
    ),
    open(
      'Reset CO₂ and raise temperature past the optimum. What happens to the rate curve?',
      'Rate rises then falls — enzymes denature at high temperature.',
      'Moderate heat speeds collisions; excessive heat damages chloroplast enzymes.',
    ),
    open(
      'List the inputs and outputs of photosynthesis as shown in the tool.',
      'Inputs: light, CO₂, water. Outputs: glucose (food) and O₂.',
      'Plants trap light energy to build sugar and release oxygen as a by-product.',
    ),
    open(
      'Why does a plant not grow faster forever when you keep adding light?',
      'Another factor (CO₂, temperature, or enzymes) eventually limits the rate.',
      'Liebig’s law: growth is limited by the scarcest required resource.',
    ),
  ],
  'cell-division': [
    open(
      'Put interphase, prophase, metaphase, anaphase, and telophase in order.',
      'Interphase → prophase → metaphase → anaphase → telophase.',
      'IPMAT is the standard mitosis sequence for one round of division.',
    ),
    open(
      'At metaphase, where do chromosomes line up?',
      'Along the cell equator (metaphase plate).',
      'Alignment ensures each daughter cell gets one copy of each chromosome.',
    ),
    int(
      'After one full mitosis, how many cells exist and how does chromosome number compare to the parent?',
      2,
      'One parent cell splits into two daughter cells, each with the same chromosome number.',
    ),
    open(
      'Why is mitosis called “equational division”?',
      'Chromosome number stays the same in each daughter cell.',
      '“Equational” means equal — no halving like in meiosis.',
    ),
  ],
  'rock-cycle': [
    open(
      'Start with magma. Name the rock type after cooling, then one path to sedimentary rock.',
      'Magma → igneous; weathering → sediment → compaction → sedimentary.',
      'Cooling crystallizes magma; surface processes break rock down and re-cement it.',
    ),
    open(
      'What process turns sediment into rock without melting it first?',
      'Compaction and cementation (lithification).',
      'Pressure and mineral glue lock grains together into sedimentary rock.',
    ),
    open(
      'Give a Philippine example of igneous rock and how it might enter the cycle again.',
      'Volcanic basalt or andesite; weathering and erosion break it into sediment.',
      'Ring-of-Fire volcanism produces igneous rock that weathers back into the cycle.',
    ),
    open(
      'Can any rock type become any other type? Use the tool paths to justify yes or no.',
      'Yes — given enough time, heat, pressure, or melting, any type can transform.',
      'The cycle has multiple routes: melt, weather, bury, or metamorphose.',
    ),
  ],
  stoichiometry: [
    open(
      'For 2H₂ + O₂ → 2H₂O, start with 4 mol H₂ and 4 mol O₂. Which reactant limits the product?',
      'H₂ is limiting — O₂ is in excess.',
      '2 mol H₂ needs 1 mol O₂; 4 mol H₂ needs only 2 mol O₂, so H₂ runs out first.',
    ),
    int(
      'How many moles of H₂O form when the limiting reactant is fully used?',
      4,
      '4 mol H₂ produces 4 mol H₂O (2:2 ratio from the balanced equation).',
    ),
    open(
      'Switch to the NH₃ reaction. If H₂ runs out first, what is left over?',
      'N₂ remains in excess.',
      'Limiting reactant is consumed; the other reactant is left over.',
    ),
    open(
      'In one sentence, define “limiting reactant.”',
      'The reactant that runs out first and stops the reaction from making more product.',
      'It caps product amount because other reactants cannot react without it.',
    ),
  ],
  'typhoon-tracker': [
    int(
      'Set wind to 65 km/h. What PAGASA wind signal number appears?',
      2,
      '62–88 km/h corresponds to Signal No. 2 (Tropical Storm winds).',
    ),
    open(
      'At Signal No. 3, list three actions from the checklist you would take at home.',
      'Examples: secure loose objects, stock water and food, know evacuation route.',
      'Signal 3 means moderate to heavy damage possible — prepare shelter and supplies.',
    ),
    open(
      'Why is central pressure shown alongside wind speed?',
      'Lower pressure generally means stronger storms; pressure and wind are related.',
      'Pressure maps the storm’s intensity; wind is what structures and people feel directly.',
    ),
    open(
      'What is the PAR, and why does PAGASA track storms inside it differently from storms outside?',
      'Philippine Area of Responsibility — PAGASA issues warnings for storms that enter or threaten it.',
      'PAR defines the zone where Philippine warnings and signals apply to keep coastal communities informed.',
    ),
  ],
  'electric-circuits': [
    open(
      'Two identical bulbs in series versus parallel at the same battery voltage — which is brighter?',
      'Parallel — each bulb gets full battery voltage.',
      'Series splits voltage; parallel gives each branch the full potential difference.',
    ),
    open(
      'In series, if one bulb burns out, what happens to the other? Why?',
      'The other goes out — the circuit path is broken.',
      'Series is one loop; no complete path means no current anywhere.',
    ),
    open(
      'If battery voltage doubles, what happens to current through one bulb (Ohm’s law)?',
      'Current doubles (if resistance stays the same).',
      'I = V/R — voltage and current scale together at fixed resistance.',
    ),
    open(
      'Where would you place a switch in a household parallel circuit so one room can turn off without killing the whole house?',
      'On the branch (room) wire, not the main line shared by all rooms.',
      'Parallel branches are independent; a branch switch isolates one room only.',
    ),
  ],
  'gas-laws': [
    open(
      'Boyle’s law: compress the piston at fixed temperature. Describe pressure vs volume in one sentence.',
      'Volume decreases, pressure increases — inverse relationship.',
      'PV ≈ constant at fixed temperature (more collisions in less space).',
    ),
    open(
      'Charles’s law: warm the gas at fixed pressure. What happens to volume?',
      'Volume increases.',
      'Hotter particles push the piston outward to keep pressure constant.',
    ),
    open(
      'Why does the tool measure pressure from particle collisions instead of a hidden formula?',
      'Pressure is what particles actually do to the walls — collisions per area.',
      'Microscopic collisions explain macroscopic pressure visually.',
    ),
    open(
      'A sealed bag of chips expands on a hot bus. Which law best explains that?',
      'Charles’s law (or combined gas law) — volume rises with temperature at near-constant pressure.',
      'Heating the air inside increases volume until the bag stretches.',
    ),
  ],
  'solution-concentration': [
    int(
      'Dissolve 10 g salt in 90 g water. What is the percent by mass?',
      10,
      '10 g solute / 100 g solution × 100% = 10%.',
    ),
    open(
      'Keep adding salt until saturation. What appears in the beaker that was not there before?',
      'Undissolved salt crystals at the bottom.',
      'At saturation the solvent cannot dissolve more solute at that temperature.',
    ),
    open(
      'Why is percent by volume not the same as percent by mass for the same solution?',
      'Mass and volume measure different quantities; density links them but they are not interchangeable.',
      '10 mL solute in 100 mL solution differs from 10 g in 100 g when densities differ.',
    ),
    open(
      'If you double the water but keep the same mass of sugar, does the solution get more or less concentrated?',
      'Less concentrated — same sugar in more solvent.',
      'Percent by mass drops when solvent mass increases without adding solute.',
    ),
  ],
  'integer-number-line': [
    int(
      'Compute −3 + 5 using hops on the number line.',
      2,
      'Start at −3, hop 5 units right: −3 + 5 = 2.',
    ),
    int(
      'Compute 4 − 7. Did the arrow land left or right of zero?',
      -3,
      '4 − 7 = −3, left of zero. (Direction: left of zero.)',
    ),
    int(
      'Without the tool, predict −8 + 3, then check.',
      -5,
      'From −8, hop 3 right: −8 + 3 = −5.',
    ),
    open(
      'Give a real-world example where adding a negative number makes sense (debt, temperature, elevation).',
      'Examples: ₱500 debt plus another ₱200 debt = −700 total; temperature drop; diving below sea level.',
      'Negative numbers model amounts below a reference zero.',
    ),
  ],
  trigonometry: [
    open(
      'At 30°, read sin θ and cos θ from the triangle and unit circle. Do they match?',
      'Yes — triangle ratios equal the unit-circle coordinates.',
      'The right triangle and unit circle share the same angle definitions.',
    ),
    open(
      'For a 3-4-5 triangle, verify that sin θ = opposite/hypotenuse.',
      'sin θ = 3/5 (or 4/5 depending on which acute angle).',
      'Opposite over hypotenuse matches the y-coordinate on the unit circle at that angle.',
    ),
    open(
      'As θ approaches 90°, what happens to cos θ on the unit circle?',
      'cos θ approaches 0.',
      'The x-coordinate shrinks as the point climbs toward the top of the circle.',
    ),
    open(
      'Why is tan θ undefined at 90° in the right-triangle view?',
      'cos θ = 0, so opposite/adjacent division by zero fails.',
      'tan θ = sin θ / cos θ; zero cosine makes tangent undefined.',
    ),
  ],
  sequences: [
    int(
      'Arithmetic: a₁ = 2, d = 3. What is the fifth term?',
      14,
      'Terms: 2, 5, 8, 11, 14 — add 3 each time.',
    ),
    open(
      'Geometric: a₁ = 2, r = −2. Write the first four terms. When does the sign flip?',
      '2, −4, 8, −16 — sign flips every term because r is negative.',
      'Multiplying by a negative ratio alternates positive and negative terms.',
    ),
    open(
      'Which sequence grows faster in the long run: adding 3 each time or multiplying by 2?',
      'Multiplying by 2 (geometric) eventually outpaces adding 3.',
      'Repeated multiplication grows faster than repeated addition for large n.',
    ),
    open(
      'Write a real-life pattern that fits an arithmetic sequence (not geometric).',
      'Examples: saving ₱50 each week; taxi flag-down plus per-km charge.',
      'Constant step size (common difference) models many linear real-world patterns.',
    ),
  ],
  optics: [
    open(
      'Concave mirror: place the object beyond C. Is the image real or virtual? Upright or inverted?',
      'Real and inverted.',
      'Objects beyond the center of curvature form real, inverted images inside F and C.',
    ),
    open(
      'Convex mirror: why is the image always virtual?',
      'Reflected rays diverge; they only meet behind the mirror as virtual extensions.',
      'Virtual images cannot be projected on a screen.',
    ),
    open(
      'Draw the three principal rays for one mirror setting you tried.',
      'Parallel ray, focal ray, and center ray — location where they meet is the image.',
      'Principal rays locate the image without drawing every ray from the object.',
    ),
    open(
      'Where is a plane mirror’s image located relative to the mirror?',
      'Same distance behind the mirror as the object is in front; same size, virtual.',
      'Plane mirrors give upright virtual images at equal object distance.',
    ),
  ],
  'gcf-lcm': [
    open(
      'Find GCF and LCM of 12 and 18 using the factor trees in the tool.',
      'GCF = 6, LCM = 36.',
      'Prime factors: 12 = 2²×3, 18 = 2×3² — share 2×3 for GCF; use highest powers for LCM.',
    ),
    int(
      'Verify that GCF × LCM = 12 × 18 with your numbers.',
      216,
      '6 × 36 = 216, and 12 × 18 = 216 — always true for two positive integers.',
    ),
    open(
      'Use the LCM as a common denominator to add 1/4 + 1/6.',
      'LCM 12 → 3/12 + 2/12 = 5/12.',
      'Rename fractions to twelfths using the least common multiple of denominators.',
    ),
    int(
      'Two buses leave every 12 and every 18 minutes. How many minutes until they leave together again?',
      36,
      'LCM(12, 18) = 36 — the next time both intervals align.',
    ),
  ],
  'sets-venn': [
    open(
      'A = {1,2,3,4}, B = {3,4,5,6}. List A ∩ B and A ∪ B.',
      'A ∩ B = {3,4}; A ∪ B = {1,2,3,4,5,6}.',
      'Intersection is shared elements; union is all elements from either set.',
    ),
    int(
      'How many elements are in A ∪ B if |A| = 10, |B| = 8, and |A ∩ B| = 3?',
      15,
      'n(A∪B) = n(A) + n(B) − n(A∩B) = 10 + 8 − 3 = 15.',
    ),
    open(
      'Shade A \\ B (difference). Which elements belong only to A?',
      'Elements in A but not in B.',
      'Set difference removes overlap; only A-only members remain.',
    ),
    open(
      'Give a classroom example where union makes sense but intersection does not.',
      'Union: all students in club A or club B. Empty intersection if no one joins both.',
      'Union counts everyone in either group; intersection needs shared members.',
    ),
  ],
  'surface-area': [
    int(
      'Cube with edge 4 cm: what is the surface area in cm²?',
      96,
      'SA = 6 × 4² = 6 × 16 = 96 cm² — six equal square faces.',
    ),
    open(
      'Which faces of a rectangular prism net are equal in area?',
      'Opposite faces — top/bottom, front/back, left/right pairs match.',
      'A box has three pairs of congruent rectangular faces.',
    ),
    open(
      'If you double only the height of a cylinder, which part of the surface area formula changes?',
      'The lateral (side) area doubles; top and bottom caps stay the same.',
      'Lateral area depends on height; circular bases depend on radius only.',
    ),
    open(
      'Why is surface area measured in square units, not cubic units?',
      'Surface area covers faces (2D), not interior volume (3D).',
      'Square units count how much skin covers the outside; cubic units fill space inside.',
    ),
  ],
  pythagorean: [
    int(
      'Legs 3 and 4 — find the hypotenuse without the tool first, then check.',
      5,
      '3² + 4² = 9 + 16 = 25 = 5².',
    ),
    open(
      'Does 5-12-13 form a right triangle? Show the calculation.',
      'Yes — 5² + 12² = 25 + 144 = 169 = 13².',
      'If a² + b² = c², the triangle is a right triangle.',
    ),
    int(
      'A ladder 5 m long leans against a wall with its foot 3 m from the wall. How high does it reach (m)?',
      4,
      'h = √(5² − 3²) = √16 = 4 m.',
    ),
    open(
      'Can the hypotenuse ever be shorter than a leg? Why or why not?',
      'No — it is always the longest side in a right triangle.',
      'The hypotenuse faces the right angle and spans the greatest distance.',
    ),
  ],
  'reaction-rate': [
    open(
      'Raise temperature without a catalyst. What happens to the fraction of molecules above Eₐ?',
      'It increases — more molecules have enough energy to react.',
      'Higher temperature spreads kinetic energy; more collisions exceed activation energy.',
    ),
    open(
      'Add a catalyst. Does it change the curve’s peak or the activation energy line?',
      'Lowers the activation energy barrier (Ea line); does not change total energy of molecules.',
      'Catalysts provide an alternate pathway with lower Eₐ.',
    ),
    open(
      'Why do two molecules need the correct orientation to react in the particle box?',
      'Bonds form only when reactive sites align during collision.',
      'Collision theory requires sufficient energy and proper orientation.',
    ),
    open(
      'Give one everyday example where heating speeds up a chemical change.',
      'Examples: cooking food, rusting faster in warm humid air, baking bread.',
      'Higher temperature increases reaction rate for many everyday processes.',
    ),
  ],
  'permutations-combinations': [
    int(
      'How many ways to arrange 3 distinct books on a shelf (3!)?',
      6,
      '3! = 3 × 2 × 1 = 6 orderings.',
    ),
    int(
      'How many ways to choose 2 fruits from 5 regardless of order (C(5,2))?',
      10,
      'C(5,2) = 5!/(2!×3!) = 10 pairs.',
    ),
    open(
      'Why is P(5,2) larger than C(5,2) for the same n and r?',
      'Permutations count order; AB and BA are different.',
      'Combinations merge those into one selection.',
    ),
    open(
      'Password PIN vs committee selection: which is a permutation and which is a combination?',
      'PIN order matters (permutation); committee membership does not (combination).',
      '1234 ≠ 4321 for a PIN; {Ana, Ben} = {Ben, Ana} for a committee.',
    ),
  ],
  'computer-science': [
    open(
      'Convert decimal 13 to binary. Toggle bits in the tool to verify.',
      '1101₂ (8 + 4 + 0 + 1 = 13).',
      'Each bit is a power of two; 1101 has 1×8 + 1×4 + 0×2 + 1×1 = 13.',
    ),
    int(
      'One byte holds values 0–255. How many possibilities is that?',
      256,
      '2⁸ = 256 distinct 8-bit patterns.',
    ),
    open(
      'If red = 255, green = 0, blue = 0, what color appears on the pixel preview?',
      'Full red.',
      'RGB (255,0,0) is maximum red channel, no green or blue.',
    ),
    open(
      'Why does one dead bit in a byte change the decimal value?',
      'Each bit position has a different power-of-two weight; flipping one changes the sum.',
      'Binary is positional — one bit toggles a specific contribution to the total.',
    ),
  ],
  'digital-divide': [
    open(
      'List three things your school has that a rural school with one lab might not.',
      'Examples: reliable Wi-Fi, 1:1 devices, IT support, projector in every room.',
      'Access gaps are more than hardware — maintenance and connectivity matter too.',
    ),
    open(
      'When load-shedding or brownouts hit, which activities still work on an offline-ready browser tool?',
      'Cached or offline-capable lessons and simulations already loaded in the browser.',
      'No server needed once assets are local — electricity for devices still required.',
    ),
    open(
      'How could a teacher use one projector and phones instead of one device per student?',
      'Demonstrate on projector; students follow on phones in pairs or small groups.',
      'Shared screen plus personal interaction beats no access — design for low device counts.',
    ),
    open(
      'What policy or community action (not a gadget) would shrink the divide in your barangay?',
      'Examples: library hours, teacher training, barangay internet hub, solar for schools.',
      'Infrastructure and support often matter as much as buying devices.',
    ),
  ],
};

export function getWriteupExercises(id: string): WriteupExercise[] | undefined {
  const key = resolveStudyExamplesId(id);
  return writeupExercises[key];
}
