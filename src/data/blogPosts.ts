import { ReactNode } from 'react';

export interface BlogPost {
  id: string;
  toolId: string;
  title: string;
  excerpt: string;
  date: string;
  content: string; // We'll keep content as string or JSX in actual implementation, but string HTML is easier for the array
}

export const blogPosts: BlogPost[] = [
  {
    id: "solar-system",
    toolId: "solar-system",
    title: "Exploring the Solar System: Philippine Astronomy",
    excerpt: "How our Solar System visualizer introduces grade schoolers to planetary orbits.",
    date: "July 10, 2026",
    content: "<p>The Solar System visualizer breaks down the immense scale of our local star system. By allowing students to manipulate planetary orbits, we shift from static textbook images to dynamic astronomical mechanics.</p>"
  },
  {
    id: "wave-physics",
    toolId: "wave-physics",
    title: "Understanding Wave Physics: From Tsunamis to Radios",
    excerpt: "Visualizing amplitude and frequency using real-world examples.",
    date: "July 12, 2026",
    content: "<p>In an archipelago prone to tsunamis and reliant on radio communication, understanding wave mechanics is vital. This tool helps students visualize how frequency and amplitude dictate a wave's energy.</p>"
  },
  {
    id: "states-of-matter",
    toolId: "states-of-matter",
    title: "States of Matter: The Chemistry of Everyday Life",
    excerpt: "Interactive transitions between solids, liquids, and gases.",
    date: "July 15, 2026",
    content: "<p>By heating and cooling virtual molecules, students can see firsthand how thermal energy breaks molecular bonds to transition water from ice to liquid to vapor.</p>"
  },
  {
    id: "life-cycles",
    toolId: "life-cycles",
    title: "Life Cycles: The Journey of the Philippine Eagle and Tamaraw",
    excerpt: "Tracking the developmental stages of our endemic species.",
    date: "July 18, 2026",
    content: "<p>This module contextualizes biological life cycles by using endemic Philippine species, fostering both scientific understanding and environmental conservation awareness.</p>"
  },
  {
    id: "human-body",
    toolId: "human-body",
    title: "Inside the Human Body: Interactive Anatomy",
    excerpt: "A digital dissection tool for the MATATAG science curriculum.",
    date: "July 20, 2026",
    content: "<p>Many provincial schools lack access to anatomical models. This interactive human body tool allows students to explore the circulatory, respiratory, and digestive systems layer by layer.</p>"
  },
  {
    id: "microscope",
    toolId: "microscope",
    title: "The Digital Microscope: Bringing Micro-Biology to Remote Classrooms",
    excerpt: "Simulating microscopic magnification without expensive hardware.",
    date: "July 25, 2026",
    content: "<p>Microscopes are prohibitively expensive for many rural schools. Our digital microscope tool bridges this gap, allowing students to observe cellular structures digitally.</p>"
  },
  {
    id: "forces-motion",
    toolId: "forces-motion",
    title: "Forces and Motion: Physics in Jeepneys and Tricycles",
    excerpt: "Applying Newton's laws to everyday Philippine transport.",
    date: "August 01, 2026",
    content: "<p>Newton's laws of motion are much easier to understand when applied to the acceleration of a Jeepney or the friction on a Tricycle's wheels.</p>"
  },
  {
    id: "chemical-bonding",
    toolId: "chemical-bonding",
    title: "Chemical Bonding: The Glue of the Universe",
    excerpt: "Visualizing covalent and ionic bonds interactively.",
    date: "August 05, 2026",
    content: "<p>This tool turns abstract electron sharing into a visual drag-and-drop puzzle, helping high school students grasp covalent and ionic interactions.</p>"
  },
  {
    id: "plate-tectonics",
    toolId: "plate-tectonics",
    title: "Plate Tectonics: Living in the Pacific Ring of Fire",
    excerpt: "Understanding the geological forces that shape the Philippines.",
    date: "August 10, 2026",
    content: "<p>Situated squarely on the Pacific Ring of Fire, the Philippines experiences frequent seismic activity. This visualizer explains subduction, fault lines, and earthquake generation.</p>"
  },
  {
    id: "photosynthesis",
    toolId: "photosynthesis",
    title: "Photosynthesis: How the Tropics Harness the Sun",
    excerpt: "Tracking the flow of light, water, and carbon dioxide.",
    date: "August 15, 2026",
    content: "<p>Students can manipulate variables like sunlight intensity and water availability to see how plants in our tropical climate produce energy.</p>"
  },
  {
    id: "typhoon-tracker",
    toolId: "typhoon-tracker",
    title: "Typhoon Tracker: Preparing for the Monsoon Season",
    excerpt: "A meteorological simulator for tracking low-pressure areas.",
    date: "August 20, 2026",
    content: "<p>Typhoon awareness is a crucial survival skill in the Philippines. This tool simulates PAGASA's tracking systems, teaching students about wind speed and atmospheric pressure.</p>"
  },
  {
    id: "fractions",
    toolId: "fractions",
    title: "Gamifying Fractions: Slicing the Buko Pie",
    excerpt: "Reducing math anxiety by making fractions delicious.",
    date: "August 25, 2026",
    content: "<p>Fractions are notoriously difficult for early learners. By slicing a familiar item like a Buko Pie, we make numerators and denominators intuitive and fun.</p>"
  },
  {
    id: "water-cycle",
    toolId: "water-cycle",
    title: "The Water Cycle (Siklo ng Tubig): Philippine Context",
    excerpt: "Interactive visualization of Evaporation, Condensation, and Precipitation.",
    date: "September 01, 2026",
    content: "<p>The water cycle describes the continuous movement of water. In a tropical archipelago, this cycle is highly visible through our distinct wet and dry seasons, and phenomena like the Habagat.</p>"
  },
  {
    id: "food-web",
    toolId: "food-web",
    title: "Food Web: Energy Flow in our Rice Paddies",
    excerpt: "Explore the flow of energy from local producers to apex predators.",
    date: "September 05, 2026",
    content: "<p>This visualizer explores energy flow using a localized food chain: from Palay (Rice) to Tipaklong (Grasshopper), Palaka (Frog), Ahas (Snake), and the Philippine Eagle.</p>"
  },
  {
    id: "seasons",
    toolId: "seasons",
    title: "Seasons: Tag-init and Tag-ulan",
    excerpt: "Why the Philippines only has two main seasons.",
    date: "September 10, 2026",
    content: "<p>Unlike temperate countries with four seasons, our proximity to the equator gives us distinct wet and dry periods. This tool visualizes Earth's axial tilt to explain why.</p>"
  },
  {
    id: "density",
    toolId: "density",
    title: "Understanding Density: Why Objects Float in the Sulu Sea",
    excerpt: "An interactive lab for testing mass and volume.",
    date: "September 15, 2026",
    content: "<p>Drop different materials into virtual water to observe buoyancy and calculate density using the standard Mass/Volume formula.</p>"
  },
  {
    id: "punnett-square",
    toolId: "punnett-square",
    title: "Genetics and the Punnett Square: Traits of Local Flora",
    excerpt: "Predicting genetic inheritance visually.",
    date: "September 20, 2026",
    content: "<p>Students can cross-pollinate virtual local flowers to see how dominant and recessive alleles express themselves across generations.</p>"
  },
  {
    id: "projectile-motion",
    toolId: "projectile-motion",
    title: "Projectile Motion: The Physics of Sepak Takraw",
    excerpt: "Calculating trajectory, angle, and velocity.",
    date: "September 25, 2026",
    content: "<p>By using the flight path of a rattan ball in Sepak Takraw, students learn the mathematics behind parabolic trajectories in a culturally relevant way.</p>"
  },
  {
    id: "em-spectrum",
    toolId: "em-spectrum",
    title: "Electromagnetic Spectrum: Signals Across the Archipelago",
    excerpt: "Visualizing wavelengths from Radio to Gamma rays.",
    date: "October 01, 2026",
    content: "<p>This tool breaks down the electromagnetic spectrum, showing how different wavelengths are used in everyday technologies like cell towers and microwaves.</p>"
  },
  {
    id: "cell-division",
    toolId: "cell-division",
    title: "Cell Division: Mitosis and Meiosis Visualized",
    excerpt: "Step-by-step animations of cellular reproduction.",
    date: "October 05, 2026",
    content: "<p>Students can pause and play the intricate stages of mitosis and meiosis, ensuring they understand cellular division without getting lost in textbook diagrams.</p>"
  },
  {
    id: "rock-cycle",
    toolId: "rock-cycle",
    title: "Rock Cycle: The Geology of Mayon and Taal",
    excerpt: "How volcanic activity creates igneous and metamorphic rocks.",
    date: "October 10, 2026",
    content: "<p>Using Mayon and Taal volcanoes as examples, this visualizer shows how intense heat, pressure, and cooling forge the rocks we see every day.</p>"
  },
  {
    id: "stoichiometry",
    toolId: "stoichiometry",
    title: "Stoichiometry: The Math Behind Chemical Reactions",
    excerpt: "Balancing chemical equations interactively.",
    date: "October 15, 2026",
    content: "<p>Stoichiometry doesn't have to be intimidating. This interactive balance scale lets students physically balance atoms on both sides of a chemical equation.</p>"
  }
];
