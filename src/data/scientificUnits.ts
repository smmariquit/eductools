export const scientificUnits = [
  // --- BASE SI UNITS ---
  {
    name: 'Meter', symbol: 'm', category: 'Physics / Base SI',
    description: 'The base unit of length and distance in the metric system.',
    misconception: 'Students often confuse distance (total ground covered) with displacement (straight-line distance from start to finish).'
  },
  {
    name: 'Kilogram', symbol: 'kg', category: 'Physics / Base SI',
    description: 'The base unit of mass, which measures the amount of matter in an object.',
    misconception: 'Mass is constantly confused with Weight. Mass (kg) never changes; Weight (Newtons) depends on gravity.'
  },
  {
    name: 'Second', symbol: 's', category: 'Physics / Base SI',
    description: 'The base unit of time. Currently defined by the radiation cycles of a Cesium-133 atom.',
    misconception: 'Students struggle with standardizing time in calculations, often leaving minutes or hours in equations that require seconds.'
  },
  {
    name: 'Ampere', symbol: 'A', category: 'Physics / Base SI',
    description: 'The base unit of electric current, measuring the flow rate of electrical charge (electrons) through a wire.',
    misconception: 'Students view current as "using up" electricity. Current doesn\'t get consumed; it flows in a complete circuit.'
  },
  {
    name: 'Kelvin', symbol: 'K', category: 'Physics / Base SI',
    description: 'The absolute scale for thermodynamic temperature, starting at Absolute Zero.',
    misconception: 'Written as "Degrees Kelvin" (°K). Unlike Celsius, Kelvin is absolute, so it is just "Kelvins".'
  },
  {
    name: 'Mole', symbol: 'mol', category: 'Chemistry / Base SI',
    description: 'A specific number used to count atoms. Exactly 6.022 × 10²³ particles (Avogadro\'s number).',
    misconception: 'Struggling with the scale. A mole of water easily fits inside a tiny shot glass, but a mole of basketballs is the size of Earth.'
  },
  {
    name: 'Candela', symbol: 'cd', category: 'Physics / Base SI',
    description: 'The base unit of luminous intensity, measuring how bright a light source appears to the human eye.',
    misconception: 'Often confused with Watts. Watts measure absolute power output, while Candelas measure perceived brightness based on human vision.'
  },

  // --- KINEMATICS & DYNAMICS ---
  {
    name: 'Meter per Second', symbol: 'm/s', category: 'Physics / Kinematics',
    description: 'The standard unit for speed and velocity. Walking at 1 m/s is a brisk pace.',
    misconception: 'Speed and Velocity used interchangeably. Speed is scalar; Velocity is a vector (includes direction).'
  },
  {
    name: 'Meter per Second Squared', symbol: 'm/s²', category: 'Physics / Kinematics',
    description: 'The unit of acceleration, measuring how much velocity changes every second.',
    misconception: 'Assuming moving fast means high acceleration. An airplane flying steadily at 900 km/h has zero acceleration.'
  },
  {
    name: 'Newton', symbol: 'N', category: 'Physics / Dynamics',
    description: 'The standard unit of force, representing the push or pull on an object.',
    misconception: 'Using kilograms to describe gravity\'s pull. Weight is a force and must be measured in Newtons.'
  },
  {
    name: 'Joule', symbol: 'J', category: 'Physics / Energy',
    description: 'The standard unit of energy or work. Lifting a small apple one meter straight up requires one Joule.',
    misconception: 'Conflating Energy and Power. A Joule is an absolute amount; a Watt is how fast you use it.'
  },
  {
    name: 'Watt', symbol: 'W', category: 'Physics / Energy',
    description: 'The unit of power, measuring the rate of energy transfer (1 Watt = 1 Joule/second).',
    misconception: 'Thought of only as "electricity". Watts measure any power, including mechanical or biological power.'
  },
  {
    name: 'Pascal', symbol: 'Pa', category: 'Physics / Earth Science',
    description: 'The standard unit of pressure, equal to one Newton of force spread evenly over one square meter.',
    misconception: 'Confusing Pressure with Force. A sharp needle requires little Force to create massive Pressure.'
  },
  {
    name: 'Hertz', symbol: 'Hz', category: 'Physics / Waves',
    description: 'The unit of frequency, measuring the number of cycles or waves that happen in exactly one second.',
    misconception: 'Confusing frequency with wave speed. Hertz is how often waves hit the shore, not how fast they travel.'
  },
  {
    name: 'Newton Meter', symbol: 'N·m', category: 'Physics / Mechanics',
    description: 'The unit of torque, measuring the rotational force applied around an axis or fulcrum.',
    misconception: 'Confusing Torque with Work (Joules). Although both are force × distance, Torque is a twisting force, not energy transferred.'
  },
  {
    name: 'Kilogram Meter per Second', symbol: 'kg·m/s', category: 'Physics / Mechanics',
    description: 'The standard unit of momentum, measuring the quantity of motion an object has.',
    misconception: 'Thinking heavy objects always have more momentum. A tiny bullet has immense momentum because of extreme velocity.'
  },

  // --- ELECTRICITY & MAGNETISM ---
  {
    name: 'Volt', symbol: 'V', category: 'Physics / Electricity',
    description: 'The unit of electrical potential difference. Represents the "water pressure" pushing electrons.',
    misconception: 'Assuming high voltage means high danger. Static shocks are 20,000 Volts but harmless because they have zero continuous current (Amps).'
  },
  {
    name: 'Ohm', symbol: 'Ω', category: 'Physics / Electricity',
    description: 'The unit of electrical resistance. Measures how much a material resists electron flow.',
    misconception: 'Thinking thicker wires have higher resistance. Thicker wires have LOWER resistance (more room for electrons).'
  },
  {
    name: 'Coulomb', symbol: 'C', category: 'Physics / Electricity',
    description: 'The standard unit of electric charge. One Coulomb represents roughly 6.24 × 10¹⁸ electrons.',
    misconception: 'Confusing Charge (Coulombs) with Current (Amps). Current is the *flow rate* of Coulombs per second.'
  },
  {
    name: 'Farad', symbol: 'F', category: 'Physics / Electricity',
    description: 'The unit of electrical capacitance, measuring the ability of a body to store an electrical charge.',
    misconception: 'A 1 Farad capacitor is actually massive. Most everyday electronics use microfarads (μF) or picofarads (pF).'
  },
  {
    name: 'Weber', symbol: 'Wb', category: 'Physics / Magnetism',
    description: 'The standard unit of magnetic flux, representing the total magnetic field passing through an area.',
    misconception: 'Students often confuse the total magnetic flux (Weber) with the magnetic field density (Tesla).'
  },
  {
    name: 'Tesla', symbol: 'T', category: 'Physics / Magnetism',
    description: 'The standard unit of magnetic flux density (strength of a magnetic field).',
    misconception: 'Underestimating how strong 1 Tesla is. A fridge magnet is 0.005 T. An MRI machine is 1.5 to 3 T.'
  },
  {
    name: 'Henry', symbol: 'H', category: 'Physics / Electromagnetism',
    description: 'The unit of electrical inductance. Measures how much a coil resists changes in current.',
    misconception: 'Confusing inductance with resistance. Inductance only matters when current is *changing* (AC), not when it is steady (DC).'
  },
  {
    name: 'Siemens', symbol: 'S', category: 'Physics / Electricity',
    description: 'The unit of electrical conductance, which is the exact inverse of electrical resistance (Ohms).',
    misconception: 'Rarely taught in early grades. Students assume resistance is the only way to measure a circuit\'s properties.'
  },

  // --- CHEMISTRY & THERMODYNAMICS ---
  {
    name: 'Celsius', symbol: '°C', category: 'Chemistry / Earth Science',
    description: 'A scale and unit of measurement for temperature, where 0 is water freezing and 100 is water boiling.',
    misconception: 'Thinking 20°C is "twice as hot" as 10°C. Temperature ratios only work on the absolute Kelvin scale.'
  },
  {
    name: 'Molarity', symbol: 'M (mol/L)', category: 'Chemistry',
    description: 'The measure of chemical concentration (moles of solute per liter of solution).',
    misconception: 'Confused with absolute amount. A cup of 1 M acid and a pool of 1 M acid have the same concentration but different total amounts.'
  },
  {
    name: 'Molality', symbol: 'm (mol/kg)', category: 'Chemistry',
    description: 'The measure of chemical concentration based on the mass of the solvent (moles per kilogram of solvent).',
    misconception: 'Easily confused with Molarity. Molality is used because mass does not change with temperature, whereas liquid volume (used in Molarity) expands when heated.'
  },
  {
    name: 'Gram per Cubic Centimeter', symbol: 'g/cm³', category: 'Chemistry / Physics',
    description: 'The standard unit of density. Pure water has a density of exactly 1.0 g/cm³.',
    misconception: 'Thinking "heavier" objects sink. A heavy log floats (low density), while a light pebble sinks (high density).'
  },
  {
    name: 'Liters', symbol: 'L', category: 'Chemistry / Everyday Science',
    description: 'A metric unit of volume. One liter equals 1,000 cubic centimeters.',
    misconception: 'Assuming 1 Liter of any liquid weighs 1 Kilogram. This is only true for pure water; 1 Liter of mercury weighs over 13 kg.'
  },
  {
    name: 'Parts Per Million', symbol: 'ppm', category: 'Chemistry / Environmental',
    description: 'A way of measuring extremely dilute concentrations. 400 ppm CO₂ means 400 out of 1 million air molecules are CO₂.',
    misconception: 'Struggling to visualize the scale. In a 50-liter bathtub (1 million drops of water), one ppm is exactly one drop.'
  },
  {
    name: 'Parts Per Billion', symbol: 'ppb', category: 'Chemistry / Environmental',
    description: 'Measures microscopic traces of pollutants or chemicals. One part per billion is roughly one drop of water in an Olympic swimming pool.',
    misconception: 'Often dismissed as "zero". In toxicology, even 10 ppb of lead in drinking water can cause severe neurological damage.'
  },
  {
    name: 'Atomic Mass Unit', symbol: 'amu (or u)', category: 'Chemistry',
    description: 'The standard unit used to measure the mass of protons, neutrons, and atoms.',
    misconception: 'Students assume an amu is exactly the mass of a proton. It is technically defined as exactly 1/12th the mass of a Carbon-12 atom.'
  },
  {
    name: 'Dalton', symbol: 'Da', category: 'Biochemistry',
    description: 'An alternative name for the atomic mass unit, primarily used by biologists when discussing large proteins.',
    misconception: 'Thinking it is a different measurement than the amu. 1 Dalton = 1 amu.'
  },
  {
    name: 'Joule per Kilogram Kelvin', symbol: 'J/(kg·K)', category: 'Thermodynamics',
    description: 'The unit for specific heat capacity, measuring how much energy is required to raise the temperature of 1 kg of a substance by 1 Kelvin.',
    misconception: 'Assuming all materials heat up at the same rate. Water has a massive specific heat capacity, meaning it takes huge amounts of energy to boil.'
  },

  // --- BIOLOGY & OPTICS ---
  {
    name: 'Photosynthetic Photon Flux Density', symbol: 'μmol m⁻² s⁻¹', category: 'Biology / Botany',
    description: 'Measures the exact amount of plant-useful light (photons between 400–700 nm) striking a leaf surface per second.',
    misconception: 'Confused with Lux. Lux measures human brightness (green light). Plants need red and blue light, so a green light (high Lux) will starve a plant.'
  },
  {
    name: 'Lux', symbol: 'lx', category: 'Optics',
    description: 'The unit of illuminance, measuring how much luminous flux is spread over a given area as perceived by the human eye.',
    misconception: 'Used incorrectly in botany and agriculture. Lux is weighted to human vision, rendering it useless for measuring plant growth.'
  },
  {
    name: 'Lumen', symbol: 'lm', category: 'Optics',
    description: 'The unit of luminous flux, representing the total amount of visible light emitted by a source in all directions.',
    misconception: 'Confusing Lumens with Watts. An LED bulb uses only 10 Watts of energy but can produce 800 Lumens of brightness.'
  },
  {
    name: 'Diopter', symbol: 'D', category: 'Optics / Biology',
    description: 'The unit of measurement for the optical power of a lens or curved mirror.',
    misconception: 'Students don\'t realize it\'s simply the reciprocal of the focal length in meters (1/m). A +2.00 prescription means the focal length is 0.5 meters.'
  },
  {
    name: 'Decibel', symbol: 'dB', category: 'Physics / Biology',
    description: 'A logarithmic unit used to measure the intensity of a sound relative to the threshold of human hearing.',
    misconception: 'Misunderstanding the logarithmic scale. A 10 dB increase means the sound is 10 times more intense, not slightly louder.'
  },
  {
    name: 'Base Pair', symbol: 'bp', category: 'Biology / Genetics',
    description: 'A unit representing a single pair of matching nucleotides (A-T or C-G) on a DNA double helix.',
    misconception: 'Underestimating the scale of a genome. The human genome contains roughly 3 billion base pairs in every single cell.'
  },
  {
    name: 'Kilobase', symbol: 'kb', category: 'Biology / Genetics',
    description: 'A unit of length for DNA or RNA consisting of 1,000 base pairs.',
    misconception: 'Assuming genes are very small. A single human gene can span hundreds of kilobases.'
  },
  {
    name: 'Beats Per Minute', symbol: 'bpm', category: 'Biology / Physiology',
    description: 'The standard medical unit for measuring heart rate.',
    misconception: 'Confusing bpm with blood pressure. Heart rate is the speed of the pump; blood pressure is the physical force against the pipe walls.'
  },

  // --- ASTRONOMY & EARTH SCIENCE ---
  {
    name: 'Light-Year', symbol: 'ly', category: 'Astronomy',
    description: 'The absolute distance that light travels in a vacuum in one Earth year (roughly 9.46 trillion kilometers).',
    misconception: 'Assuming a light-year is a measure of time. It is strictly a measure of physical distance.'
  },
  {
    name: 'Astronomical Unit', symbol: 'AU', category: 'Astronomy',
    description: 'A unit of length representing the average distance from the Earth to the Sun (about 150 million kilometers).',
    misconception: 'Students assume planetary orbits are perfect circles. The AU is an *average* because Earth\'s orbit is actually an ellipse.'
  },
  {
    name: 'Parsec', symbol: 'pc', category: 'Astronomy',
    description: 'An astronomical unit of distance equal to about 3.26 light-years, derived from the parallax of a star.',
    misconception: 'Famously misused by Han Solo in Star Wars as a unit of time ("made the Kessel Run in less than 12 parsecs"). It is purely a unit of distance.'
  },
  {
    name: 'Solar Mass', symbol: 'M☉', category: 'Astronomy',
    description: 'A standard unit of mass in astronomy, equal to the mass of our Sun (approx 2 × 10³⁰ kg).',
    misconception: 'Failing to grasp the extreme scale. Our Sun accounts for 99.8% of all the mass in the entire Solar System combined.'
  },
  {
    name: 'Knot', symbol: 'kn', category: 'Earth Science / Navigation',
    description: 'A unit of speed equal to one nautical mile per hour, historically used in maritime and aviation contexts.',
    misconception: 'Students confuse nautical miles with land miles. A nautical mile is based on the circumference of the Earth and is longer than a standard mile.'
  },
  {
    name: 'Millibar', symbol: 'mb', category: 'Earth Science / Meteorology',
    description: 'A unit of atmospheric pressure. Standard sea-level pressure is exactly 1013.25 millibars.',
    misconception: 'Confused by the different units used on weather maps. 1 millibar is exactly identical to 1 hectoPascal (hPa).'
  },
  {
    name: 'Richter Magnitude', symbol: 'ML', category: 'Earth Science',
    description: 'A historical logarithmic scale used to quantify the energy released by an earthquake.',
    misconception: 'Scientists no longer use the Richter scale for large earthquakes, preferring the Moment Magnitude scale (Mw), though media still misreports it.'
  },
  {
    name: 'Sverdrup', symbol: 'Sv', category: 'Earth Science / Oceanography',
    description: 'A unit of volume transport used to measure ocean currents. 1 Sv equals 1 million cubic meters of water per second.',
    misconception: 'Extremely obscure to students, but crucial for climate models. The entire flow of all the world\'s rivers combined is roughly 1 Sv.'
  },

  // --- RADIATION & NUCLEAR PHYSICS ---
  {
    name: 'Becquerel', symbol: 'Bq', category: 'Nuclear Physics',
    description: 'The SI unit of radioactivity. One Becquerel is defined as exactly one atomic nucleus decaying per second.',
    misconception: 'Students assume radiation is always deadly. A human body naturally emits about 4,000 Bq due to radioactive Carbon-14 and Potassium-40.'
  },
  {
    name: 'Electronvolt', symbol: 'eV', category: 'Nuclear Physics / Quantum',
    description: 'A tiny unit of energy equal to the work done on a single electron accelerating through a potential difference of one volt.',
    misconception: 'Confusing it with Voltage. An electronvolt is a measure of absolute Energy (like tiny Joules), not electrical potential.'
  },
  {
    name: 'Gray', symbol: 'Gy', category: 'Nuclear Physics',
    description: 'The unit of ionizing radiation dose, representing the absorption of one Joule of radiation energy per kilogram of matter.',
    misconception: 'Confusing physical dose (Gray) with biological damage (Sievert). Gray measures raw energy absorbed, regardless of what tissue it hits.'
  },
  {
    name: 'Sievert', symbol: 'Sv', category: 'Nuclear Physics / Health',
    description: 'A unit representing the health effect (biological damage) of ionizing radiation on the human body.',
    misconception: 'Students hear "Sievert" in sci-fi and panic. You receive about 0.0001 Sieverts just from eating a banana (Banana Equivalent Dose).'
  },
  {
    name: 'Half-Life', symbol: 't₁/₂', category: 'Nuclear Physics',
    description: 'Not strictly a unit, but the time required for exactly half of the radioactive atoms in a sample to decay.',
    misconception: 'Assuming that after two half-lives, the entire sample is gone. After two half-lives, 25% of the original sample still remains.'
  },

  // --- PREFIXES & METRICS (Often confused as base units) ---
  {
    name: 'Kilo-', symbol: 'k', category: 'Metric Prefix',
    description: 'A multiplier representing exactly 1,000 of the base unit. E.g., 1 kilometer = 1,000 meters.',
    misconception: 'Students mistakenly refer to a "kilogram" simply as a "kilo," leading to confusion when applying the prefix to watts (kilowatt) or bytes (kilobyte).'
  },
  {
    name: 'Milli-', symbol: 'm', category: 'Metric Prefix',
    description: 'A multiplier representing exactly 1/1,000th of the base unit. E.g., 1 millimeter = 0.001 meters.',
    misconception: 'Often confused with the prefix Micro- (μ) or Nano- (n), leading to massive calculation errors in chemistry equations.'
  },
  {
    name: 'Micro-', symbol: 'μ', category: 'Metric Prefix',
    description: 'A multiplier representing exactly one millionth (10⁻⁶) of the base unit.',
    misconception: 'Students often miswrite the Greek letter mu (μ) as a standard lowercase "u", creating confusion in peer-reviewed contexts.'
  },
  {
    name: 'Nano-', symbol: 'n', category: 'Metric Prefix',
    description: 'A multiplier representing exactly one billionth (10⁻⁹) of the base unit. Visible light wavelengths are measured in nanometers.',
    misconception: 'Failing to grasp the microscopic scale. Your fingernails grow at roughly 1 nanometer per second.'
  },

  // --- IMPERIAL / NON-STANDARD (Included to explain why they are avoided in STEM) ---
  {
    name: 'Pound', symbol: 'lb', category: 'US Customary / Avoided',
    description: 'A unit of force (weight) in the US Customary system.',
    misconception: 'Routinely conflated with mass (kilograms). Because pounds measure force, your weight in pounds changes on the Moon, but your mass in kilograms does not.'
  },
  {
    name: 'Inch', symbol: 'in', category: 'US Customary / Avoided',
    description: 'A unit of length equal to exactly 2.54 centimeters.',
    misconception: 'Students try to use fractions (1/16th of an inch) in scientific calculations. Science strictly uses decimals and the metric system for precise engineering.'
  },
  {
    name: 'Fahrenheit', symbol: '°F', category: 'US Customary / Avoided',
    description: 'A temperature scale where water freezes at 32° and boils at 212°.',
    misconception: 'Students assume 0°F is the absolute coldest possible temperature. True zero is Absolute Zero (0 Kelvin), which is -459.67°F.'
  },
  {
    name: 'Calorie', symbol: 'cal', category: 'Obsolete Metric',
    description: 'The energy needed to raise 1 gram of water by 1°C. Officially replaced by the Joule in science.',
    misconception: 'Food labels use "Calories" with a capital C (which are actually kilocalories). Eating a 100-Calorie snack means you consumed 100,000 standard scientific calories.'
  },
  {
    name: 'Horsepower', symbol: 'hp', category: 'Imperial / Avoided',
    description: 'An archaic unit of power coined by James Watt to compare steam engines to draft horses. 1 hp = 746 Watts.',
    misconception: 'Assuming a real horse produces exactly 1 horsepower. A fit draft horse can actually peak at around 15 horsepower in a short sprint.'
  },
  {
    name: 'Gallon', symbol: 'gal', category: 'US Customary / Avoided',
    description: 'A unit of liquid volume. The US gallon is exactly 3.785 liters.',
    misconception: 'The Imperial (UK) Gallon and the US Gallon are physically different sizes, causing catastrophic errors in international engineering projects.'
  },
  {
    name: 'Foot-Pound', symbol: 'ft·lb', category: 'US Customary / Avoided',
    description: 'A unit of work or energy. The energy transferred on applying a force of one pound through a distance of one foot.',
    misconception: 'Completely incompatible with SI units, requiring complex conversion constants that led to the loss of the $125 million Mars Climate Orbiter in 1999.'
  },
  {
    name: 'BTU', symbol: 'BTU', category: 'US Customary / Avoided',
    description: 'British Thermal Unit. The amount of heat required to raise the temperature of one pound of water by one degree Fahrenheit.',
    misconception: 'Still used in HVAC (air conditioning) ratings, but scientists strictly use Joules for thermal energy to maintain universal standardization.'
  },

  // --- ADDITIONAL SPECIALTY UNITS ---
  {
    name: 'Radian', symbol: 'rad', category: 'Mathematics / Physics',
    description: 'The standard unit of angular measure, defined by wrapping the radius of a circle around its circumference.',
    misconception: 'Students stubbornly prefer Degrees. Radians are dimensionless and essential for calculus; using degrees in advanced physics equations breaks the math.'
  },
  {
    name: 'Steradian', symbol: 'sr', category: 'Mathematics / Optics',
    description: 'The SI unit of solid angle, representing a 3D cone-like angle extending from the center of a sphere.',
    misconception: 'Highly abstract for middle schoolers. While a circle has 2π radians, a complete sphere has exactly 4π steradians.'
  },
  {
    name: 'Becquerel', symbol: 'Bq', category: 'Nuclear Physics',
    description: 'The SI unit of radioactivity. One Becquerel is defined as exactly one atomic nucleus decaying per second.',
    misconception: 'Students assume radiation is always deadly. A human body naturally emits about 4,000 Bq due to radioactive Carbon-14 and Potassium-40.'
  },
  {
    name: 'Lux', symbol: 'lx', category: 'Optics',
    description: 'The unit of illuminance, measuring how much luminous flux is spread over a given area as perceived by the human eye.',
    misconception: 'Used incorrectly in botany and agriculture. Lux is weighted to human vision, rendering it useless for measuring plant growth.'
  },
  {
    name: 'Katal', symbol: 'kat', category: 'Biochemistry',
    description: 'The SI unit of catalytic activity, used primarily for describing enzymes. One katal is the activity of a catalyst that speeds up a reaction by one mole per second.',
    misconception: 'Virtually unknown outside advanced biochemistry, yet it is an official SI derived unit.'
  },
  {
    name: 'Centipoise', symbol: 'cP', category: 'Physics / Fluid Dynamics',
    description: 'A unit of dynamic viscosity used to measure how "thick" or "sticky" a fluid is. Water at room temperature is roughly 1 cP.',
    misconception: 'Students confuse viscosity with density. Honey is highly viscous, while mercury is highly dense but surprisingly fluid.'
  },
  {
    name: 'Mach', symbol: 'M', category: 'Physics / Aviation',
    description: 'A dimensionless ratio representing the speed of an object relative to the speed of sound in the surrounding medium.',
    misconception: 'Assuming Mach 1 is a fixed speed. The speed of sound changes drastically depending on air temperature and altitude.'
  },
  {
    name: 'Light-Year', symbol: 'ly', category: 'Astronomy',
    description: 'The absolute distance that light travels in a vacuum in one Earth year (roughly 9.46 trillion kilometers).',
    misconception: 'Assuming a light-year is a measure of time. It is strictly a measure of physical distance.'
  },
  {
    name: 'Decibel', symbol: 'dB', category: 'Physics / Acoustics',
    description: 'A logarithmic unit used to measure the intensity of a sound relative to the threshold of human hearing.',
    misconception: 'Misunderstanding the logarithmic scale. A 10 dB increase means the sound is 10 times more intense, not slightly louder.'
  },
  {
    name: 'Volt-Ampere', symbol: 'VA', category: 'Electrical Engineering',
    description: 'The unit used for the apparent power in an electrical circuit. For DC circuits, it is identical to a Watt.',
    misconception: 'In AC circuits, VA and Watts can be very different because voltage and current can fall out of phase. This is known as the "Power Factor".'
  },
  {
    name: 'Tesla', symbol: 'T', category: 'Physics / Magnetism',
    description: 'The standard unit of magnetic flux density (strength of a magnetic field).',
    misconception: 'Underestimating how strong 1 Tesla is. A fridge magnet is 0.005 T. An MRI machine is 1.5 to 3 T.'
  },
  {
    name: 'Knot', symbol: 'kn', category: 'Earth Science / Navigation',
    description: 'A unit of speed equal to one nautical mile per hour, historically used in maritime and aviation contexts.',
    misconception: 'Students confuse nautical miles with land miles. A nautical mile is based on the circumference of the Earth and is longer than a standard mile.'
  },
  {
    name: 'Millibar', symbol: 'mb', category: 'Earth Science / Meteorology',
    description: 'A unit of atmospheric pressure. Standard sea-level pressure is exactly 1013.25 millibars.',
    misconception: 'Confused by the different units used on weather maps. 1 millibar is exactly identical to 1 hectoPascal (hPa).'
  },
  {
    name: 'Solar Mass', symbol: 'M☉', category: 'Astronomy',
    description: 'A standard unit of mass in astronomy, equal to the mass of our Sun (approx 2 × 10³⁰ kg).',
    misconception: 'Failing to grasp the extreme scale. Our Sun accounts for 99.8% of all the mass in the entire Solar System combined.'
  },
  {
    name: 'Astronomical Unit', symbol: 'AU', category: 'Astronomy',
    description: 'A unit of length representing the average distance from the Earth to the Sun (about 150 million kilometers).',
    misconception: 'Students assume planetary orbits are perfect circles. The AU is an *average* because Earth\'s orbit is actually an ellipse.'
  },
  {
    name: 'Parsec', symbol: 'pc', category: 'Astronomy',
    description: 'An astronomical unit of distance equal to about 3.26 light-years, derived from the parallax of a star.',
    misconception: 'Famously misused by Han Solo in Star Wars as a unit of time ("made the Kessel Run in less than 12 parsecs"). It is purely a unit of distance.'
  },
  {
    name: 'Richter Magnitude', symbol: 'ML', category: 'Earth Science',
    description: 'A historical logarithmic scale used to quantify the energy released by an earthquake.',
    misconception: 'Scientists no longer use the Richter scale for large earthquakes, preferring the Moment Magnitude scale (Mw), though media still misreports it.'
  },
  {
    name: 'Dalton', symbol: 'Da', category: 'Biochemistry',
    description: 'An alternative name for the atomic mass unit, primarily used by biologists when discussing large proteins.',
    misconception: 'Thinking it is a different measurement than the amu. 1 Dalton = 1 amu.'
  },
  {
    name: 'Joule per Kilogram Kelvin', symbol: 'J/(kg·K)', category: 'Thermodynamics',
    description: 'The unit for specific heat capacity, measuring how much energy is required to raise the temperature of 1 kg of a substance by 1 Kelvin.',
    misconception: 'Assuming all materials heat up at the same rate. Water has a massive specific heat capacity, meaning it takes huge amounts of energy to boil.'
  },
  {
    name: 'Farad', symbol: 'F', category: 'Physics / Electricity',
    description: 'The unit of electrical capacitance, measuring the ability of a body to store an electrical charge.',
    misconception: 'A 1 Farad capacitor is actually massive. Most everyday electronics use microfarads (μF) or picofarads (pF).'
  },
  {
    name: 'Henry', symbol: 'H', category: 'Physics / Electromagnetism',
    description: 'The unit of electrical inductance. Measures how much a coil resists changes in current.',
    misconception: 'Confusing inductance with resistance. Inductance only matters when current is *changing* (AC), not when it is steady (DC).'
  },
  {
    name: 'Weber', symbol: 'Wb', category: 'Physics / Magnetism',
    description: 'The standard unit of magnetic flux, representing the total magnetic field passing through an area.',
    misconception: 'Students often confuse the total magnetic flux (Weber) with the magnetic field density (Tesla).'
  },
  {
    name: 'Electronvolt', symbol: 'eV', category: 'Nuclear Physics',
    description: 'A tiny unit of energy equal to the work done on a single electron accelerating through a potential difference of one volt.',
    misconception: 'Confusing it with Voltage. An electronvolt is a measure of absolute Energy (like tiny Joules), not electrical potential.'
  },
  {
    name: 'Gray', symbol: 'Gy', category: 'Nuclear Physics',
    description: 'The unit of ionizing radiation dose, representing the absorption of one Joule of radiation energy per kilogram of matter.',
    misconception: 'Confusing physical dose (Gray) with biological damage (Sievert). Gray measures raw energy absorbed, regardless of what tissue it hits.'
  },
  {
    name: 'Sievert', symbol: 'Sv', category: 'Nuclear Physics',
    description: 'A unit representing the health effect (biological damage) of ionizing radiation on the human body.',
    misconception: 'Students hear "Sievert" in sci-fi and panic. You receive about 0.0001 Sieverts just from eating a banana (Banana Equivalent Dose).'
  },
  {
    name: 'Half-Life', symbol: 't₁/₂', category: 'Nuclear Physics',
    description: 'Not strictly a unit, but the time required for exactly half of the radioactive atoms in a sample to decay.',
    misconception: 'Assuming that after two half-lives, the entire sample is gone. After two half-lives, 25% of the original sample still remains.'
  },
  {
    name: 'Lumen', symbol: 'lm', category: 'Optics',
    description: 'The unit of luminous flux, representing the total amount of visible light emitted by a source in all directions.',
    misconception: 'Confusing Lumens with Watts. An LED bulb uses only 10 Watts of energy but can produce 800 Lumens of brightness.'
  },
  {
    name: 'Diopter', symbol: 'D', category: 'Optics',
    description: 'The unit of measurement for the optical power of a lens or curved mirror.',
    misconception: 'Students don\'t realize it\'s simply the reciprocal of the focal length in meters (1/m). A +2.00 prescription means the focal length is 0.5 meters.'
  },
  {
    name: 'Base Pair', symbol: 'bp', category: 'Biology / Genetics',
    description: 'A unit representing a single pair of matching nucleotides (A-T or C-G) on a DNA double helix.',
    misconception: 'Underestimating the scale of a genome. The human genome contains roughly 3 billion base pairs in every single cell.'
  },
  {
    name: 'Kilobase', symbol: 'kb', category: 'Biology / Genetics',
    description: 'A unit of length for DNA or RNA consisting of 1,000 base pairs.',
    misconception: 'Assuming genes are very small. A single human gene can span hundreds of kilobases.'
  },
  {
    name: 'Beats Per Minute', symbol: 'bpm', category: 'Biology',
    description: 'The standard medical unit for measuring heart rate.',
    misconception: 'Confusing bpm with blood pressure. Heart rate is the speed of the pump; blood pressure is the physical force against the pipe walls.'
  },
  {
    name: 'Sverdrup', symbol: 'Sv', category: 'Oceanography',
    description: 'A unit of volume transport used to measure ocean currents. 1 Sv equals 1 million cubic meters of water per second.',
    misconception: 'Extremely obscure to students, but crucial for climate models. The entire flow of all the world\'s rivers combined is roughly 1 Sv.'
  },
  {
    name: 'Kilo-', symbol: 'k', category: 'Metric Prefix',
    description: 'A multiplier representing exactly 1,000 of the base unit. E.g., 1 kilometer = 1,000 meters.',
    misconception: 'Students mistakenly refer to a "kilogram" simply as a "kilo," leading to confusion when applying the prefix to watts or bytes.'
  },
  {
    name: 'Milli-', symbol: 'm', category: 'Metric Prefix',
    description: 'A multiplier representing exactly 1/1,000th of the base unit. E.g., 1 millimeter = 0.001 meters.',
    misconception: 'Often confused with the prefix Micro- (μ) or Nano- (n), leading to massive calculation errors in chemistry equations.'
  },
  {
    name: 'Micro-', symbol: 'μ', category: 'Metric Prefix',
    description: 'A multiplier representing exactly one millionth (10⁻⁶) of the base unit.',
    misconception: 'Students often miswrite the Greek letter mu (μ) as a standard lowercase "u", creating confusion in peer-reviewed contexts.'
  },
  {
    name: 'Nano-', symbol: 'n', category: 'Metric Prefix',
    description: 'A multiplier representing exactly one billionth (10⁻⁹) of the base unit.',
    misconception: 'Failing to grasp the microscopic scale. Your fingernails grow at roughly 1 nanometer per second.'
  },
  {
    name: 'Pico-', symbol: 'p', category: 'Metric Prefix',
    description: 'A multiplier representing exactly one trillionth (10⁻¹²) of the base unit.',
    misconception: 'A picometer is smaller than most atoms. Hydrogen, the smallest atom, has a radius of roughly 53 picometers.'
  },
  {
    name: 'Mega-', symbol: 'M', category: 'Metric Prefix',
    description: 'A multiplier representing exactly one million (10⁶) of the base unit.',
    misconception: 'Writing it as a lowercase "m", which actually means milli-. A "MW" is a Megawatt (huge power plant), an "mW" is a milliwatt (laser pointer).'
  },
  {
    name: 'Giga-', symbol: 'G', category: 'Metric Prefix',
    description: 'A multiplier representing exactly one billion (10⁹) of the base unit.',
    misconception: 'Students generally only associate Giga with computer bytes (Gigabytes), forgetting it applies to Hertz (GHz) and Watts (GW).'
  },
  {
    name: 'Angstrom', symbol: 'Å', category: 'Chemistry / Physics',
    description: 'A non-SI unit of length equal to 10⁻¹⁰ meters, commonly used to measure atomic radii and chemical bond lengths.',
    misconception: 'Because it is not a standard SI prefix, students forget how it converts to nanometers (10 Angstroms = 1 nanometer).'
  },
  {
    name: 'Barn', symbol: 'b', category: 'Nuclear Physics',
    description: 'A tiny unit of area used to describe the cross-section of atomic nuclei for scattering experiments (10⁻²⁸ m²).',
    misconception: 'Named as a joke ("as big as a barn" to hit with a particle). It highlights how incredibly small nuclear targets actually are.'
  },
  {
    name: 'Pound-Force', symbol: 'lbf', category: 'US Customary / Avoided',
    description: 'A unit of force (weight) in the US Customary system.',
    misconception: 'Routinely conflated with mass (kilograms). Because pounds measure force, your weight in pounds changes on the Moon.'
  },
  {
    name: 'Inch', symbol: 'in', category: 'US Customary / Avoided',
    description: 'A unit of length equal to exactly 2.54 centimeters.',
    misconception: 'Students try to use fractions (1/16th of an inch) in scientific calculations. Science strictly uses decimals and the metric system.'
  },
  {
    name: 'Fahrenheit', symbol: '°F', category: 'US Customary / Avoided',
    description: 'A temperature scale where water freezes at 32° and boils at 212°.',
    misconception: 'Students assume 0°F is the absolute coldest possible temperature. True zero is Absolute Zero (0 Kelvin), which is -459.67°F.'
  },
  {
    name: 'Calorie', symbol: 'cal', category: 'Obsolete Metric',
    description: 'The energy needed to raise 1 gram of water by 1°C. Officially replaced by the Joule in science.',
    misconception: 'Food labels use "Calories" with a capital C (kilocalories). Eating a 100-Calorie snack means you consumed 100,000 scientific calories.'
  },
  {
    name: 'Horsepower', symbol: 'hp', category: 'Imperial / Avoided',
    description: 'An archaic unit of power coined to compare steam engines to draft horses. 1 hp = 746 Watts.',
    misconception: 'Assuming a real horse produces exactly 1 horsepower. A fit draft horse can actually peak at around 15 horsepower in a sprint.'
  },
  {
    name: 'Gallon', symbol: 'gal', category: 'US Customary / Avoided',
    description: 'A unit of liquid volume. The US gallon is exactly 3.785 liters.',
    misconception: 'The Imperial (UK) Gallon and the US Gallon are physically different sizes, causing catastrophic errors in international projects.'
  },
  {
    name: 'Foot-Pound', symbol: 'ft·lb', category: 'US Customary / Avoided',
    description: 'A unit of work or energy. The energy transferred applying one pound of force through a distance of one foot.',
    misconception: 'Completely incompatible with SI units, requiring complex conversion constants that led to the loss of the $125M Mars Climate Orbiter.'
  },
  {
    name: 'BTU', symbol: 'BTU', category: 'US Customary / Avoided',
    description: 'British Thermal Unit. The heat required to raise the temperature of one pound of water by one degree Fahrenheit.',
    misconception: 'Still used in HVAC (air conditioning) ratings, but scientists strictly use Joules for thermal energy to maintain universal standardization.'
  },
  {
    name: 'Atmosphere', symbol: 'atm', category: 'Chemistry / Earth Science',
    description: 'A non-SI unit of pressure defined as exactly 101,325 Pascals (roughly average sea-level pressure).',
    misconception: 'Students assume atmospheric pressure is constant everywhere. The "atm" is just an average baseline; pressure fluctuates constantly with weather.'
  },
  {
    name: 'Torr', symbol: 'Torr', category: 'Chemistry',
    description: 'A unit of pressure based on an absolute scale, exactly 1/760 of a standard atmosphere.',
    misconception: 'Named after Torricelli, it is often confused with millimeters of mercury (mmHg). While extremely close, they are technically slightly different.'
  },
  {
    name: 'Millimeters of Mercury', symbol: 'mmHg', category: 'Medicine / Biology',
    description: 'A manometric unit of pressure used globally for blood pressure readings.',
    misconception: 'A literal measurement of how many millimeters a column of liquid mercury is pushed up by a pressure source.'
  },
  {
    name: 'Poise', symbol: 'P', category: 'Physics / Fluid Dynamics',
    description: 'The standard CGS unit of dynamic viscosity. Often used as centipoise (cP) where water is roughly 1 cP.',
    misconception: 'Viscosity is independent of density. Heavy liquids can flow easily, while light liquids can be sticky.'
  },
  {
    name: 'Jansky', symbol: 'Jy', category: 'Astronomy',
    description: 'A non-SI unit of spectral flux density, used widely in radio astronomy.',
    misconception: 'An incredibly tiny unit (10⁻²⁶ watts per square meter per hertz). The signals astronomers listen to from deep space are almost incomprehensibly faint.'
  },
  {
    name: 'Curie', symbol: 'Ci', category: 'Nuclear Physics / Avoided',
    description: 'An obsolete non-SI unit of radioactivity, originally defined as the activity of 1 gram of Radium-226.',
    misconception: 'Replaced by the Becquerel. A single Curie is an incredibly massive amount of radiation (37 billion decays per second).'
  },
  {
    name: 'Roentgen', symbol: 'R', category: 'Nuclear Physics / Avoided',
    description: 'A legacy unit of measurement for the exposure of X-rays and gamma rays.',
    misconception: 'Replaced by the Gray and Sievert. Made famous by the quote "3.6 Roentgen... not great, not terrible" in Chernobyl.'
  },
  {
    name: 'Milliampere-Hour', symbol: 'mAh', category: 'Electricity',
    description: 'A unit of electric charge commonly used to describe the energy capacity of batteries.',
    misconception: 'Students confuse it with energy. A 5000 mAh battery capacity tells you the charge, but without knowing the voltage, you don\'t know the total energy (Joules).'
  },
  {
    name: 'Kilowatt-Hour', symbol: 'kWh', category: 'Electricity',
    description: 'A billing unit for energy delivered to consumers by electric utilities.',
    misconception: 'Students see "Watt" and assume it measures power. A Kilowatt-Hour is a unit of ENERGY (equivalent to 3.6 million Joules).'
  },
  {
    name: 'Electron', symbol: 'e⁻', category: 'Chemistry',
    description: 'While a particle, its elementary charge (1.602 × 10⁻¹⁹ Coulombs) is often used as a fundamental unit in quantum mechanics.',
    misconception: 'The charge is quantized. You can never have a fraction of an electron\'s charge; all charge in the universe is a multiple of this number.'
  },
  {
    name: 'Speed of Light', symbol: 'c', category: 'Physics / Relativity',
    description: 'A fundamental physical constant (exactly 299,792,458 m/s), often used as a unit of velocity in relativistic physics.',
    misconception: 'Students think "c" can be broken. According to relativity, it is the absolute cosmic speed limit for any information or matter in the universe.'
  },
  {
    name: 'Planck Length', symbol: 'ℓP', category: 'Quantum Physics',
    description: 'The base unit of length in the system of Planck units, roughly 1.616 × 10⁻³⁵ meters.',
    misconception: 'Often described as the "pixel size" of the universe. Meaningful physics models break down if you attempt to measure distances smaller than this.'
  }
];
