export interface VisualizerModule {
  id: string;
  title: string;
  description: string;
  path: string;
  tags: string[];
}

export const visualizerModules: VisualizerModule[] = [
  { id: 'fractions', title: 'Fractions Visualizer', description: 'Interactive tool for understanding basic mathematical fractions.', path: '/visualizer/fractions', tags: ['Grade 1', 'Grade 2', 'Grade 3', 'Math', 'MATATAG Aligned'] },
  { id: 'states-of-matter', title: 'States of Matter Simulator', description: 'Interactive tool for understanding how temperature affects particle motion.', path: '/visualizer/states-of-matter', tags: ['Grade 3', 'Science', 'MATATAG Aligned'] },
  { id: 'life-cycles', title: 'Life Cycles Visualizer', description: 'Explore the biological life cycle of a frog.', path: '/visualizer/life-cycles', tags: ['Grade 4', 'Biology', 'MATATAG Aligned'] },
  { id: 'water-cycle', title: 'Water Cycle', description: 'Interactive visualization of Evaporation, Condensation, and Precipitation.', path: '/visualizer/water-cycle', tags: ['Grade 4', 'Earth Science', 'MATATAG Aligned'] },
  { id: 'human-body', title: 'Human Body Systems', description: 'Toggle between different biological systems of the human body.', path: '/visualizer/human-body', tags: ['Grade 5', 'Biology', 'MATATAG Aligned'] },
  { id: 'food-web', title: 'Food Chain Visualizer', description: 'Explore the flow of energy from producers to consumers.', path: '/visualizer/food-web', tags: ['Grade 5', 'Biology', 'MATATAG Aligned'] },
  { id: 'solar-system', title: 'Solar System Explorer', description: 'An interactive visualizer demonstrating planetary orbits, relative distances, and rotational speeds.', path: '/visualizer/solar-system', tags: ['Grade 6', 'Earth Science', 'MATATAG Aligned'] },
  { id: 'seasons', title: 'Seasons and Earth Tilt', description: 'Understand why the Earth experiences seasons due to its axial tilt.', path: '/visualizer/seasons', tags: ['Grade 6', 'Earth Science', 'MATATAG Aligned'] },
  { id: 'microscope', title: 'Virtual Microscope', description: 'Examine cellular structures at different magnifications.', path: '/visualizer/microscope', tags: ['Grade 7', 'Biology', 'MATATAG Aligned'] },
  { id: 'density', title: 'Density Simulator', description: 'Observe how density determines whether objects sink or float in water.', path: '/visualizer/density', tags: ['Grade 7', 'Physics', 'MATATAG Aligned'] },
  { id: 'forces-motion', title: 'Forces and Motion', description: 'Simulate Newton\'s Second Law of Motion (F = ma).', path: '/visualizer/forces-motion', tags: ['Grade 8', 'Physics', 'MATATAG Aligned'] },
  { id: 'punnett-square', title: 'Punnett Square Maker', description: 'Simulate Mendelian inheritance patterns.', path: '/visualizer/punnett-square', tags: ['Grade 8', 'Biology', 'MATATAG Aligned'] },
  { id: 'chemical-bonding', title: 'Chemical Bonding Simulator', description: 'Visualize ionic bonding and electron transfer.', path: '/visualizer/chemical-bonding', tags: ['Grade 9', 'Chemistry', 'MATATAG Aligned'] },
  { id: 'projectile-motion', title: 'Projectile Motion Visualizer', description: 'Analyze 2D kinematics of a fired projectile.', path: '/visualizer/projectile-motion', tags: ['Grade 9', 'Physics', 'MATATAG Aligned'] },
  { id: 'plate-tectonics', title: 'Plate Tectonics', description: 'Visualize different types of tectonic plate boundaries.', path: '/visualizer/plate-tectonics', tags: ['Grade 10', 'Earth Science', 'MATATAG Aligned'] },
  { id: 'wave-physics', title: 'Wave Physics Simulator', description: 'A dynamic physics simulation that allows students to manipulate transverse waves.', path: '/visualizer/wave-physics', tags: ['Grade 10', 'Physics', 'MATATAG Aligned'] },
  { id: 'em-spectrum', title: 'Electromagnetic Spectrum', description: 'Explore the relationship between wavelength, frequency, and energy.', path: '/visualizer/em-spectrum', tags: ['Grade 10', 'Physics', 'MATATAG Aligned'] },
  { id: 'photosynthesis', title: 'Photosynthesis Simulator', description: 'Explore limiting factors in the process of photosynthesis.', path: '/visualizer/photosynthesis', tags: ['Grade 11', 'Grade 12', 'Biology'] },
  { id: 'cell-division', title: 'Mitosis Cell Division', description: 'Observe the stages of cellular replication.', path: '/visualizer/cell-division', tags: ['Grade 11', 'Grade 12', 'Biology'] },
  { id: 'rock-cycle', title: 'The Rock Cycle', description: 'Discover how geological processes transform rocks over time.', path: '/visualizer/rock-cycle', tags: ['Grade 11', 'Earth Science'] },
  { id: 'stoichiometry', title: 'Balancing Chemical Equations', description: 'Apply the Law of Conservation of Mass to synthesize water.', path: '/visualizer/stoichiometry', tags: ['Grade 12', 'Chemistry'] },
  { id: 'typhoon-tracker', title: 'Typhoon Tracker (DRRR)', description: 'Simulate typhoon categories and potential landfall impacts.', path: '/visualizer/typhoon-tracker', tags: ['Grade 11', 'Grade 12', 'Earth Science', 'DRRR'] },
  { id: 'electric-circuits', title: 'Electric Circuits Simulator', description: 'Compare how Series and Parallel circuits work.', path: '/visualizer/electric-circuits', tags: ['Grade 8', 'Physics', 'MATATAG Aligned'] },
  { id: 'gas-laws', title: 'Gas Laws Simulator', description: 'Explore Boyle\'s, Charles\'s, and Gay-Lussac\'s Laws with animated gas particles and a virtual piston.', path: '/visualizer/gas-laws', tags: ['Grade 10', 'Physics', 'Chemistry', 'MATATAG Aligned'] },
  { id: 'solution-concentration', title: 'Solution Concentration Lab', description: 'Explore percent by mass and percent by volume. Observe saturation and solubility limits visually.', path: '/visualizer/solution-concentration', tags: ['Grade 7', 'Chemistry', 'MATATAG Aligned'] },
  { id: 'integer-number-line', title: 'Integer Number Line', description: 'Visualize addition and subtraction of integers on an interactive number line.', path: '/visualizer/integer-number-line', tags: ['Grade 7', 'Math', 'MATATAG Aligned'] },
  { id: 'trigonometry', title: 'Trigonometry Visualizer', description: 'Explore sine, cosine, and tangent ratios with an interactive right triangle and unit circle.', path: '/visualizer/trigonometry', tags: ['Grade 9', 'Math', 'MATATAG Aligned'] },
  { id: 'sequences', title: 'Sequences & Patterns', description: 'Visualize arithmetic and geometric sequences. Build the formula for the nth term interactively.', path: '/visualizer/sequences', tags: ['Grade 8', 'Math', 'MATATAG Aligned'] },
  { id: 'optics', title: 'Optics Simulator', description: 'Explore image formation by concave, convex, and plane mirrors with ray tracing.', path: '/visualizer/optics', tags: ['Grade 10', 'Physics', 'MATATAG Aligned'] },
  { id: 'gcf-lcm', title: 'GCF & LCM Explorer', description: 'Find the Greatest Common Factor and Least Common Multiple using prime factorization and Venn diagrams.', path: '/visualizer/gcf-lcm', tags: ['Grade 4', 'Grade 5', 'Math', 'MATATAG Aligned'] },
  { id: 'sets-venn', title: 'Sets & Venn Diagrams', description: 'Explore set operations: union, intersection, and difference using interactive Venn diagrams.', path: '/visualizer/sets-venn', tags: ['Grade 7', 'Math', 'MATATAG Aligned'] }
];

// Derive tags from actual data instead of maintaining a separate manual list
export const allTags = ['All', ...Array.from(new Set(visualizerModules.flatMap(m => m.tags)))];
