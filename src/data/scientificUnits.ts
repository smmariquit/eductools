export interface SourceLink {
  /** Citation text shown to the reader. */
  label: string;
  /** Live URL to the primary source. Verified to load before shipping. */
  href: string;
}

export interface ScientificUnit {
  name: string;
  symbol: string;
  category: string;
  description: string;
  misconception: string | null;
  formalDefinition: string;
  sources: SourceLink[];
  body: string;
}

/*
 * Verified primary-source pool. Every URL below was checked with
 * `curl -sS -o /dev/null -m 25 -L -A "Mozilla/5.0" -w "%{http_code}"` and
 * returned 200 (BIPM brochure pages are heavy but live). Reusing these keeps
 * citations consistent and traceable to the body that actually sets each value.
 */
const SRC = {
  siBrochure: {
    label: 'BIPM, The International System of Units (SI Brochure, 9th ed., 2019)',
    href: 'https://www.bipm.org/en/publications/si-brochure',
  },
  cgpm2018: {
    label: 'BIPM, Resolution 1 of the 26th CGPM (2018) on the redefinition of the SI',
    href: 'https://www.bipm.org/en/committees/cg/cgpm/26-2018/resolution-1',
  },
  nistUnits: {
    label: 'NIST, SI Units (Constants, Units & Uncertainty)',
    href: 'https://physics.nist.gov/cuu/Units/units.html',
  },
  nistPrefixes: {
    label: 'NIST, SI Prefixes',
    href: 'https://physics.nist.gov/cuu/Units/prefixes.html',
  },
  nistConstants: {
    label: 'NIST, Fundamental Physical Constants (CODATA)',
    href: 'https://physics.nist.gov/cuu/Constants/index.html',
  },
  nistSP811: {
    label: 'NIST Special Publication 811 (2008), Guide for the Use of the SI',
    href: 'https://www.nist.gov/pml/special-publication-811',
  },
  nistSIredef: {
    label: 'NIST, SI Redefinition',
    href: 'https://www.nist.gov/si-redefinition',
  },
  nistMeter: { label: 'NIST, Redefining the Meter', href: 'https://www.nist.gov/si-redefinition/meter' },
  nistKilogram: { label: 'NIST, Redefining the Kilogram', href: 'https://www.nist.gov/si-redefinition/kilogram' },
  nistSecond: { label: 'NIST, Redefining the Second', href: 'https://www.nist.gov/si-redefinition/second' },
  nistAmpere: { label: 'NIST, Redefining the Ampere', href: 'https://www.nist.gov/si-redefinition/ampere' },
  nistKelvin: { label: 'NIST, Redefining the Kelvin', href: 'https://www.nist.gov/si-redefinition/kelvin' },
  nistMole: { label: 'NIST, Redefining the Mole', href: 'https://www.nist.gov/si-redefinition/mole' },
  nistCandela: { label: 'NIST, Redefining the Candela', href: 'https://www.nist.gov/si-redefinition/candela' },
  nistValC: { label: 'NIST CODATA value: speed of light in vacuum', href: 'https://physics.nist.gov/cgi-bin/cuu/Value?c' },
  nistValE: { label: 'NIST CODATA value: elementary charge', href: 'https://physics.nist.gov/cgi-bin/cuu/Value?e' },
  nistValEv: { label: 'NIST CODATA value: electron volt', href: 'https://physics.nist.gov/cgi-bin/cuu/Value?evj' },
  nistValNa: { label: 'NIST CODATA value: Avogadro constant', href: 'https://physics.nist.gov/cgi-bin/cuu/Value?na' },
  nistValU: { label: 'NIST CODATA value: atomic mass constant', href: 'https://physics.nist.gov/cgi-bin/cuu/Value?tukg' },
  iupacMole: { label: 'IUPAC Gold Book: mole', href: 'https://goldbook.iupac.org/terms/view/M03980' },
  jplAstro: { label: 'NASA JPL, Astrodynamic Parameters', href: 'https://ssd.jpl.nasa.gov/astro_par.html' },
  iau: { label: 'International Astronomical Union', href: 'https://www.iau.org/' },
  noaaSverdrup: { label: 'NOAA Ocean Service, What is a sverdrup?', href: 'https://oceanservice.noaa.gov/facts/sverdrup.html' },
  genomeBp: { label: 'NHGRI, Genetics Glossary: Base Pair', href: 'https://www.genome.gov/genetics-glossary/Base-Pair' },
  genomeKb: { label: 'NHGRI, Genetics Glossary: Kilobase', href: 'https://www.genome.gov/genetics-glossary/Kilobase' },
  nhlbiBp: { label: 'NHLBI, High Blood Pressure', href: 'https://www.nhlbi.nih.gov/health/high-blood-pressure' },
} satisfies Record<string, SourceLink>;

export const scientificUnits: ScientificUnit[] = [
  {
    "name": "Meter",
    "symbol": "m",
    "category": "Physics / Base SI",
    "description": "The SI base unit of length. The trick almost everyone misses: we no longer keep a master metre anywhere. We keep the speed of light, and the metre falls out of it.",
    "misconception": "Distance and displacement get treated as the same thing. Distance is the whole path your tricycle actually drove; displacement is the straight line from where you started to where you stopped.",
    "formalDefinition": "The meter, symbol $\\text{m}$, is the SI unit of length. It is defined by taking the fixed numerical value of the speed of light in vacuum $c$ to be $299\\,792\\,458$ when expressed in the unit $\\text{m s}^{-1}$, where the second is defined in terms of the cesium frequency $\\Delta\\nu_{\\text{Cs}}$.",
    "sources": [SRC.nistMeter, SRC.siBrochure],
    "body": "The metre started in 1791 as one ten-millionth of the distance from the equator to the North Pole, then spent decades as a platinum-iridium bar in a vault near Paris. Since 1983 the BIPM has defined it through the speed of light: light travels exactly 299,792,458 metres every second, so a metre is just how far light goes in 1/299,792,458 of a second. That is why a metre measured in a Quezon City lab and a metre measured on Mars come out identical. Nobody has to ship the bar."
  },
  {
    "name": "Kilogram",
    "symbol": "kg",
    "category": "Physics / Base SI",
    "description": "The SI base unit of mass, the amount of matter in a thing. As of 2019 it is the first base unit pinned to a constant of nature rather than a physical object.",
    "misconception": "Mass and weight get used interchangeably. Your mass in kilograms is the same in Manila, on the Moon, or floating in orbit. Your weight, the pull of gravity on that mass, is a force and changes with where you are.",
    "formalDefinition": "The kilogram, symbol $\\text{kg}$, is the SI unit of mass. It is defined by taking the fixed numerical value of the Planck constant $h$ to be $6.62607015 \\times 10^{-34}$ when expressed in the unit $\\text{J s}$, which is equal to $\\text{kg m}^2 \\text{s}^{-1}$, where the meter and the second are defined in terms of $c$ and $\\Delta\\nu_{\\text{Cs}}$.",
    "sources": [SRC.nistKilogram, SRC.cgpm2018],
    "body": "For 130 years the kilogram was a single platinum-iridium cylinder kept in Sèvres, France, and every kitchen scale on Earth ultimately traced back to it. The problem the BIPM kept finding: that cylinder slowly drifted against its official copies, so the world's mass standard was literally changing. In 2018 the CGPM voted to redefine the kilogram through the Planck constant, realised with a Kibble balance that ties mass to electrical measurement. The redefinition took effect on World Metrology Day, 20 May 2019."
  },
  {
    "name": "Second",
    "symbol": "s",
    "category": "Physics / Base SI",
    "description": "The SI base unit of time, and the most precisely realised unit we have. It is counted out by a specific vibration inside a caesium-133 atom.",
    "misconception": "In calculations, minutes and hours get left sitting in equations that need seconds. A speed in m/s will not forgive you for feeding it hours.",
    "formalDefinition": "The second, symbol $\\text{s}$, is the SI unit of time. It is defined by taking the fixed numerical value of the cesium frequency $\\Delta\\nu_{\\text{Cs}}$, the unperturbed ground-state hyperfine transition frequency of the cesium-133 atom, to be $9\\,192\\,631\\,770$ when expressed in the unit $\\text{Hz}$, which is equal to $\\text{s}^{-1}$.",
    "sources": [SRC.nistSecond, SRC.siBrochure],
    "body": "We used to define the second as 1/86,400 of a day, but the Earth's spin is gradually slowing and wobbles with the seasons, so a day is not a reliable ruler. Since 1967 the second has been defined by atoms: a caesium-133 atom flips between two energy states at exactly 9,192,631,770 cycles per second, and an atomic clock counts those cycles. NIST notes their caesium standards are good enough that they would not gain or lose a second over tens of millions of years. Every text message timestamp and GPS fix on your phone leans on this."
  },
  {
    "name": "Ampere",
    "symbol": "A",
    "category": "Physics / Base SI",
    "description": "The SI base unit of electric current, the rate at which charge flows past a point. Since 2019 it is defined by literally counting electrons.",
    "misconception": "People picture current as electricity being \"used up\" in a device. The current that enters a lightbulb is the same current that leaves it; what gets used is energy, not the moving charge.",
    "formalDefinition": "The ampere, symbol $\\text{A}$, is the SI unit of electric current. It is defined by taking the fixed numerical value of the elementary charge $e$ to be $1.602176634 \\times 10^{-19}$ when expressed in the unit $\\text{C}$, which is equal to $\\text{A s}$, where the second is defined in terms of $\\Delta\\nu_{\\text{Cs}}$.",
    "sources": [SRC.nistAmpere, SRC.cgpm2018],
    "body": "The old ampere was defined by the force between two infinitely long parallel wires, a setup nobody could actually build. The 2019 redefinition fixes the elementary charge instead: one ampere is one coulomb of charge flowing per second, and a coulomb is a fixed number of electron charges. Everyday scale helps here. The breaker on a typical Philippine 20 A household circuit trips when current climbs past 20 amperes, while a single LED draws a few hundredths of an ampere."
  },
  {
    "name": "Kelvin",
    "symbol": "K",
    "category": "Physics / Base SI",
    "description": "The SI base unit of thermodynamic temperature, measured from absolute zero up. It tracks the actual thermal energy jiggling around in particles.",
    "misconception": "Writing \"degrees Kelvin\" or \"°K\". Because the scale is absolute and starts at true zero, you just say kelvins and write K. No degree sign.",
    "formalDefinition": "The kelvin, symbol $\\text{K}$, is the SI unit of thermodynamic temperature. It is defined by taking the fixed numerical value of the Boltzmann constant $k$ to be $1.380649 \\times 10^{-23}$ when expressed in the unit $\\text{J K}^{-1}$, which is equal to $\\text{kg m}^2 \\text{s}^{-2} \\text{K}^{-1}$, where the kilogram, meter and second are defined in terms of $h$, $c$ and $\\Delta\\nu_{\\text{Cs}}$.",
    "sources": [SRC.nistKelvin, SRC.cgpm2018],
    "body": "The scale is named for Lord Kelvin, who argued temperature needed an absolute zero where particle motion stops, which sits at 0 K (about -273.15 °C). For a long time the kelvin was fixed to the triple point of water at exactly 273.16 K. The 2019 redefinition swapped that for the Boltzmann constant, which directly links a temperature to the average energy of particles. A 33 °C Manila afternoon is about 306 K, and nothing in nature has ever been measured at 0 K."
  },
  {
    "name": "Mole",
    "symbol": "mol",
    "category": "Chemistry / Base SI",
    "description": "The SI base unit for amount of substance: a fixed, enormous count of particles (6.022 140 76 × 10²³), the chemist's version of saying \"a dozen.\"",
    "misconception": "The scale fools people. A mole of water molecules barely fills a shot glass, but a mole of marbles would bury the entire country meters deep. Same count, wildly different sizes of thing.",
    "formalDefinition": "The mole, symbol $\\text{mol}$, is the SI unit of amount of substance. One mole contains exactly $6.02214076 \\times 10^{23}$ elementary entities. This number is the fixed numerical value of the Avogadro constant $N_{\\text{A}}$ when expressed in the unit $\\text{mol}^{-1}$ and is called the Avogadro number.",
    "sources": [SRC.iupacMole, SRC.nistMole],
    "body": "Atoms are far too small and too numerous to count one by one, so the mole is the bridge between the atomic world and the grams you can weigh on a balance. Until 2019 a mole was defined as the number of atoms in 12 grams of carbon-12; now, per the BIPM, it is simply fixed at the Avogadro number, 6.022 140 76 × 10²³ entities. That is why a mole of carbon weighs about 12 grams and a mole of water about 18 grams. The count is locked, so the mass just follows from what you are counting."
  },
  {
    "name": "Candela",
    "symbol": "cd",
    "category": "Physics / Base SI",
    "description": "The SI base unit of luminous intensity: how bright a source looks in a given direction, weighted by what the human eye can actually see.",
    "misconception": "Candelas get confused with watts. Watts measure raw radiated power; the candela only counts the light your eye responds to, so a heat lamp can pour out watts while barely registering in candelas.",
    "formalDefinition": "The candela, symbol $\\text{cd}$, is the SI unit of luminous intensity in a given direction. It is defined by taking the fixed numerical value of the luminous efficacy of monochromatic radiation of frequency $540 \\times 10^{12} \\text{ Hz}$, $K_{\\text{cd}}$, to be $683$ when expressed in the unit $\\text{lm W}^{-1}$, which is equal to $\\text{cd sr W}^{-1}$ or $\\text{cd sr kg}^{-1} \\text{m}^{-2} \\text{s}^3$.",
    "sources": [SRC.nistCandela, SRC.siBrochure],
    "body": "The candela is the one SI base unit built around human biology: it is tied to green-yellow light at 540 × 10¹² Hz, right where our eyes are most sensitive. Its name is Latin for candle, and that is roughly the scale, since an ordinary candle shines at about one candela. The BIPM definition fixes the luminous efficacy constant so that perceived brightness connects back to measurable radiant power. It is why two bulbs can use the same wattage yet one looks noticeably brighter to you."
  },
  {
    "name": "Meter per Second",
    "symbol": "m/s",
    "category": "Physics / Kinematics",
    "description": "The SI unit of speed and velocity: metres of ground covered per second. A brisk walk is about 1.4 m/s.",
    "misconception": "Speed and velocity get swapped. Speed is just how fast (a single number); velocity is how fast and in what direction. A jeepney going 8 m/s around the rotonda keeps its speed but its velocity changes every moment.",
    "formalDefinition": "The metre per second, symbol $\\text{m/s}$, is the SI coherent derived unit of speed and velocity. It is one metre of displacement per second of time:\n\n$$1\\text{ m/s} = 1\\text{ m}\\cdot\\text{s}^{-1}$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "This is the rate that ties length and time together, and it is worth getting a feel for it. Walking is roughly 1.4 m/s, a fast run is about 8 m/s, and the 100 km/h speed limit on NLEX works out to about 28 m/s. The BIPM calls m/s a coherent derived unit because it is built straight from the base units with no extra conversion factor. When you mix it up, the usual culprit is leaving speed in km/h inside a physics equation that quietly expects m/s."
  },
  {
    "name": "Meter per Second Squared",
    "symbol": "m/s²",
    "category": "Physics / Kinematics",
    "description": "The SI unit of acceleration: how much your velocity changes each second. Earth's gravity pulls things down at about 9.8 m/s².",
    "misconception": "Fast does not mean accelerating. A plane cruising steadily at 900 km/h has zero acceleration, while a tricycle pulling away from a stoplight has plenty even though it is slow.",
    "formalDefinition": "The metre per second squared, symbol $\\text{m/s}^2$, is the SI coherent derived unit of acceleration. It is a change of one metre per second of velocity for every second of time:\n\n$$1\\text{ m/s}^2 = 1\\text{ m}\\cdot\\text{s}^{-2}$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Acceleration is the rate that velocity itself changes, which is why the seconds show up twice. The everyday benchmark is free fall: near the surface the Earth accelerates a dropped object at about 9.8 m/s², so after one second it falls at 9.8 m/s, after two seconds 19.6 m/s, and so on. That same number is why you feel heavier for a moment when a fast elevator in a Makati high-rise starts climbing. Any push that changes how fast you are moving, in any direction, is measured in m/s²."
  },
  {
    "name": "Newton",
    "symbol": "N",
    "category": "Physics / Dynamics",
    "description": "The SI derived unit of force: the push or pull needed to accelerate one kilogram at one metre per second squared.",
    "misconception": "Using kilograms to state how hard gravity pulls. A kilogram measures mass; the downward pull on it is a force and belongs in newtons. A 1 kg bag of rice is pulled down with about 9.8 N.",
    "formalDefinition": "The Newton, symbol $\\text{N}$, is the SI derived unit of force. It is defined as the force required to accelerate a mass of one kilogram at a rate of one meter per second squared:\n\n$$1\\text{ N} = 1\\text{ kg}\\cdot\\text{m/s}^2$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "The newton is named for Isaac Newton, whose second law, force equals mass times acceleration, is exactly where the unit comes from. A handy mental image: a medium apple resting in your palm pushes down with roughly one newton, since its 0.1 kg mass times 9.8 m/s² of gravity lands near 1 N. Scale that up and a 60 kg person presses on the ground with about 590 N. The BIPM lists it as a coherent derived unit, kg·m/s² with a friendlier name."
  },
  {
    "name": "Joule",
    "symbol": "J",
    "category": "Physics / Energy",
    "description": "The SI derived unit of energy, work, and heat. Lifting a small apple one metre straight up takes about one joule.",
    "misconception": "Energy and power get blurred together. A joule is a fixed amount of energy; a watt is how fast you spend it. A snack holds a certain number of joules whether you burn them in a sprint or a slow walk.",
    "formalDefinition": "The Joule, symbol $\\text{J}$, is the SI derived unit of energy, work, or heat. It is defined as the work done by a force of one newton moving its point of application one meter in the direction of the force:\n\n$$1\\text{ J} = 1\\text{ N}\\cdot\\text{m} = 1\\text{ kg}\\cdot\\text{m}^2\\text{/s}^2$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Named for James Prescott Joule, who showed that heat and mechanical work are two faces of the same thing, the joule is the SI's single currency for energy. One joule is small: lifting a 100 g apple one metre costs about a joule. A day of eating, the 2,000 \"Calories\" on a nutrition label, is roughly 8.4 million joules, since each food Calorie is about 4,184 J. Whether the energy is chemical, electrical, or kinetic, the BIPM measures it all in the same joule."
  },
  {
    "name": "Watt",
    "symbol": "W",
    "category": "Physics / Energy",
    "description": "The SI derived unit of power: the rate of energy transfer, equal to one joule every second.",
    "misconception": "Watts get filed under \"electricity only.\" Power is power: a person climbing stairs, a jeepney engine, and a rice cooker are all rated in watts.",
    "formalDefinition": "The Watt, symbol $\\text{W}$, is the SI derived unit of power, representing the rate of energy transfer or work done per unit time, equivalent to one joule per second:\n\n$$1\\text{ W} = 1\\text{ J/s} = 1\\text{ kg}\\cdot\\text{m}^2\\text{/s}^3$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "The watt, named for steam-engine improver James Watt, answers how fast, not how much. An 8 W LED bulb and an old 60 W incandescent can light a room similarly, but the LED converts far less of its power into wasted heat. A person jogging sustains roughly 100 to 200 W of mechanical output. This is also why your Meralco bill is not in watts but in kilowatt-hours: watts are the rate, and you pay for rate multiplied by time."
  },
  {
    "name": "Pascal",
    "symbol": "Pa",
    "category": "Physics / Earth Science",
    "description": "The SI derived unit of pressure: one newton of force spread over one square metre. It is a deliberately small unit.",
    "misconception": "Pressure and force are not the same. A thumbtack needs only a gentle push, but because that force is concentrated on a tiny point, the pressure under the tip is enormous. Spread the same force over your palm and nothing happens.",
    "formalDefinition": "The Pascal, symbol $\\text{Pa}$, is the SI derived unit of pressure or stress. It is equal to one newton of force spread uniformly over one square meter:\n\n$$1\\text{ Pa} = 1\\text{ N/m}^2 = 1\\text{ kg}/(\\text{m}\\cdot\\text{s}^2)$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Named for Blaise Pascal, who studied fluids and the atmosphere, the pascal is so small that a single sheet of paper lying flat presses down with about 1 Pa. That is why real-world pressures show up with prefixes: standard sea-level air pressure is about 101,325 Pa, or 101.3 kPa, and PAGASA reports typhoon pressures in hectopascals, where 1 hPa is 100 Pa. A deep low like a strong typhoon's eye can drop below 950 hPa, and that pressure deficit is part of what drives the storm."
  },
  {
    "name": "Hertz",
    "symbol": "Hz",
    "category": "Physics / Waves",
    "description": "The SI derived unit of frequency: how many cycles of a repeating event happen each second.",
    "misconception": "Frequency gets mistaken for speed. Hertz counts how often the waves arrive, not how fast they travel. Two sounds can share a pitch yet move through air and water at very different speeds.",
    "formalDefinition": "The Hertz, symbol $\\text{Hz}$, is the SI derived unit of frequency, defined as the number of cycles or occurrences per second of a periodic phenomenon:\n\n$$1\\text{ Hz} = 1\\text{/s}$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Named for Heinrich Hertz, who first generated and detected radio waves, one hertz is simply one cycle per second. Human hearing runs from about 20 Hz to 20,000 Hz, and the A above middle C that a band tunes to sits at 440 Hz. Push much higher and you reach radio: Philippine FM stations broadcast around 88 to 108 MHz, megahertz being millions of cycles per second. A phone's processor ticks in gigahertz, billions of cycles every second."
  },
  {
    "name": "Newton Meter",
    "symbol": "N·m",
    "category": "Physics / Mechanics",
    "description": "The SI unit of torque: a twisting force applied at a distance from a pivot. It is what a wrench actually delivers to a bolt.",
    "misconception": "Torque and energy share the units kg·m²/s² but are not the same thing. A joule is energy transferred along a push; a newton metre of torque is rotational effort around an axis. To keep them distinct, torque stays written as N·m, never as joules.",
    "formalDefinition": "The newton metre, symbol $\\text{N}\\cdot\\text{m}$, is the SI unit of torque (moment of force). It is the turning effect of a force of one newton applied perpendicular at a distance of one metre from the axis:\n\n$$1\\text{ N}\\cdot\\text{m} = 1\\text{ kg}\\cdot\\text{m}^2\\cdot\\text{s}^{-2}$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Torque is why a longer wrench loosens a stubborn bolt with the same hand strength: more distance from the pivot multiplies the turning effect. Push on a door near the hinge and it barely moves; push at the handle, far from the hinge, and it swings easily, even though your hand pushes just as hard. The BIPM keeps torque in N·m rather than joules precisely so it is not mistaken for energy, since the geometry of force and lever arm matters here, not distance travelled."
  },
  {
    "name": "Kilogram Meter per Second",
    "symbol": "kg·m/s",
    "category": "Physics / Mechanics",
    "description": "The SI unit of momentum: mass multiplied by velocity, a measure of how much motion something carries and how hard it is to stop.",
    "misconception": "Heavy does not automatically mean high momentum. A light bullet can carry more momentum than a strolling carabao because momentum is mass times velocity, and the bullet's speed is extreme.",
    "formalDefinition": "The kilogram metre per second, symbol $\\text{kg}\\cdot\\text{m/s}$, is the SI coherent derived unit of linear momentum, the product of mass and velocity:\n\n$$p = mv,\\qquad 1\\text{ kg}\\cdot\\text{m/s} = 1\\text{ kg}\\cdot\\text{m}\\cdot\\text{s}^{-1}$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Momentum is the quantity that is conserved in collisions, which is why it sits at the heart of crash physics and billiards alike. A 70 kg person jogging at 3 m/s carries about 210 kg·m/s; a 1,200 kg car creeping at the same 3 m/s carries 3,600 kg·m/s, and that is why a slow-moving car still does real damage. To change an object's momentum you apply a force over time, an impulse, which is exactly what a longer crumple zone or a boxer rolling with a punch stretches out."
  },
  {
    "name": "Volt",
    "symbol": "V",
    "category": "Physics / Electricity",
    "description": "The SI derived unit of electric potential difference: the \"pressure\" that pushes charge through a circuit. One volt moves one joule of energy per coulomb of charge.",
    "misconception": "High voltage is assumed to mean high danger. A dry-season static shock from a doorknob can be tens of thousands of volts yet harmless, because almost no current flows. It is sustained current through the body, not voltage alone, that hurts you.",
    "formalDefinition": "The Volt, symbol $\\text{V}$, is the SI derived unit of electric potential, potential difference, and electromotive force. It is defined as the potential difference across a conductor when a current of one ampere dissipates one watt of power:\n\n$$1\\text{ V} = 1\\text{ W/A} = 1\\text{ kg}\\cdot\\text{m}^2\\text{/}(\\text{A}\\cdot\\text{s}^3)$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Named for Alessandro Volta, inventor of the first battery, the volt measures how much energy each unit of charge carries as it moves. The water analogy holds up: voltage is like pressure, current is the flow rate. A AA battery supplies 1.5 V, a phone charger about 5 V, and Philippine wall sockets run at 230 V at 60 Hz, which is why imported 120 V appliances need a transformer here. The BIPM defines the volt as one watt per ampere, tying it cleanly to power and current."
  },
  {
    "name": "Ohm",
    "symbol": "Ω",
    "category": "Physics / Electricity",
    "description": "The SI derived unit of electrical resistance: how strongly a material fights the flow of current. One ohm passes one ampere when pushed by one volt.",
    "misconception": "People assume a thicker wire resists more. It is the opposite: a fatter wire gives electrons more room, so resistance drops. Resistance rises with length and falls with cross-section.",
    "formalDefinition": "The Ohm, symbol $\\Omega$, is the SI derived unit of electrical resistance. It is defined as the resistance between two points of a conductor when a constant potential difference of one volt applied to these points produces in the conductor a current of one ampere:\n\n$$1\\ \\Omega = 1\\text{ V/A} = 1\\text{ kg}\\cdot\\text{m}^2\\text{/}(\\text{A}^2\\cdot\\text{s}^3)$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Georg Ohm's law, voltage equals current times resistance, is the workhorse of every circuit class, and the unit carries his name. Copper wiring has resistance near zero, which is why we use it, while rubber insulation runs into the millions of ohms, which is why it is safe to grip. Resistance is also why a long extension cord can sag the voltage at the far end, and why undersized wiring heats up: the energy lost to resistance turns into heat, the same effect a flat iron uses on purpose."
  },
  {
    "name": "Coulomb",
    "symbol": "C",
    "category": "Physics / Electricity",
    "description": "The SI derived unit of electric charge: the amount of charge carried past a point by one ampere in one second, about 6.24 × 10¹⁸ electron charges.",
    "misconception": "Charge and current get conflated. A coulomb is a quantity of charge sitting or moving; an ampere is a coulomb flowing per second. Charge is the water, current is the flow rate.",
    "formalDefinition": "The Coulomb, symbol $\\text{C}$, is the SI derived unit of electric charge. It is defined as the quantity of electricity carried in one second by a constant current of one ampere:\n\n$$1\\text{ C} = 1\\text{ A}\\cdot\\text{s}$$",
    "sources": [SRC.siBrochure, SRC.nistValE],
    "body": "Named for Charles-Augustin de Coulomb, who measured the force between charges, the coulomb is a large unit at the everyday scale. Since the 2019 redefinition fixed the elementary charge at 1.602 176 634 × 10⁻¹⁹ C, one coulomb is exactly the charge of about 6.24 × 10¹⁸ protons. A lightning stroke transfers on the order of 15 coulombs in a flash, and a typical phone battery rated at 4,000 mAh holds about 14,400 coulombs. Current is just how quickly those coulombs move."
  },
  {
    "name": "Farad",
    "symbol": "F",
    "category": "Physics / Electricity",
    "description": "The SI derived unit of capacitance: how much charge a component stores per volt applied. One farad is a huge amount.",
    "misconception": "A one-farad capacitor sounds modest but is physically large. Nearly all everyday electronics use microfarads (µF) or picofarads (pF), millionths and trillionths of a farad.",
    "formalDefinition": "The Farad, symbol $\\text{F}$, is the SI derived unit of electrical capacitance. It is defined as the capacitance of a capacitor that stores a charge of one coulomb when a potential difference of one volt is applied across its plates:\n\n$$1\\text{ F} = 1\\text{ C/V} = 1\\text{ A}^2\\cdot\\text{s}^4\\text{/}(\\text{kg}\\cdot\\text{m}^2)$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Michael Faraday's name sits on the unit for storing charge, and the farad turns out to be enormous in practice. The capacitor smoothing the power in a radio might be a few microfarads; the one tuning a circuit, a few picofarads. Supercapacitors, the kind buffering power in some electronics and buses, finally reach whole farads and thousands of farads. A capacitor stores energy in an electric field and releases it quickly, which is what lets a camera flash dump its charge in an instant."
  },
  {
    "name": "Weber",
    "symbol": "Wb",
    "category": "Physics / Magnetism",
    "description": "The SI derived unit of magnetic flux: the total amount of magnetic field threading through a given area.",
    "misconception": "Flux (weber) and flux density (tesla) get mixed up. The weber is the whole bundle of field lines passing through a loop; the tesla is how tightly those lines are packed per square metre.",
    "formalDefinition": "The Weber, symbol $\\text{Wb}$, is the SI derived unit of magnetic flux. It is defined as the amount of magnetic flux that, linking a circuit of one turn, produces an electromotive force of one volt when the flux is reduced to zero at a uniform rate in one second:\n\n$$1\\text{ Wb} = 1\\text{ V}\\cdot\\text{s} = 1\\text{ kg}\\cdot\\text{m}^2\\text{/}(\\text{A}\\cdot\\text{s}^2)$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Named for Wilhelm Weber, a collaborator of Gauss on early telegraphy, the weber captures Faraday's key insight: a changing magnetic flux through a coil generates a voltage. That single fact runs the modern world. Spin a magnet near a coil and you change the flux in webers, which drives a current, which is exactly how the generators at a Philippine hydro or geothermal plant make electricity. One weber spread over one square metre is one tesla, so flux and flux density are linked by area."
  },
  {
    "name": "Tesla",
    "symbol": "T",
    "category": "Physics / Magnetism",
    "description": "The SI derived unit of magnetic flux density: how concentrated a magnetic field is. One tesla is a strong field.",
    "misconception": "People badly underestimate one tesla. Earth's field is only tens of microteslas, a fridge magnet a few milliteslas, while a hospital MRI runs at 1.5 to 3 teslas, hundreds of times stronger than anything in your house.",
    "formalDefinition": "The Tesla, symbol $\\text{T}$, is the SI derived unit of magnetic flux density (magnetic field strength). It is defined as one Weber per square meter, or equivalent to a force of one newton exerted on a conductor carrying one ampere of current per meter:\n\n$$1\\text{ T} = 1\\text{ Wb/m}^2 = 1\\text{ kg}/(\\text{A}\\cdot\\text{s}^2)$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Named for Nikola Tesla, the unit measures how densely magnetic field lines are packed. The scale surprises people: the Earth's magnetic field, the one a compass needle follows, is only about 30 to 60 microteslas, yet it is enough to guide migrating birds. A refrigerator magnet manages a few milliteslas up close. MRI scanners reach 1.5 to 3 teslas, strong enough that loose metal becomes a serious hazard near the machine, which is why clinics screen so carefully before a scan."
  },
  {
    "name": "Henry",
    "symbol": "H",
    "category": "Physics / Electromagnetism",
    "description": "The SI derived unit of inductance: how strongly a coil opposes a change in the current flowing through it.",
    "misconception": "Inductance gets confused with resistance. A coil's inductance only pushes back while the current is changing, as in AC circuits. With steady DC, an ideal inductor barely notices it is there.",
    "formalDefinition": "The Henry, symbol $\\text{H}$, is the SI derived unit of electrical inductance. It is defined as the inductance of a closed loop in which an electromotive force of one volt is induced when the current in the loop varies uniformly at a rate of one ampere per second:\n\n$$1\\text{ H} = 1\\text{ V}\\cdot\\text{s/A} = 1\\text{ kg}\\cdot\\text{m}^2\\text{/}(\\text{A}^2\\cdot\\text{s}^2)$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Joseph Henry discovered self-inductance around the same time as Faraday, and the unit honors him. An inductor stores energy in a magnetic field and resists sudden changes in current, which makes it the partner to the capacitor in countless circuits. Pair the two and you get a tuned circuit, the thing that lets a radio lock onto one station and reject the rest. Inductors also smooth the supply in power adapters and block high-frequency noise from sensitive electronics."
  },
  {
    "name": "Siemens",
    "symbol": "S",
    "category": "Physics / Electricity",
    "description": "The SI derived unit of electrical conductance: the exact inverse of resistance. High conductance means current flows easily.",
    "misconception": "Resistance is treated as the only way to describe a circuit. Conductance is just its flip side (1 siemens = 1/ohm), and it is often the more natural quantity when components sit in parallel.",
    "formalDefinition": "The Siemens, symbol $\\text{S}$, is the SI derived unit of electrical conductance, the reciprocal of resistance:\n\n$$1\\text{ S} = 1\\ \\Omega^{-1} = 1\\text{ A/V} = 1\\text{ kg}^{-1}\\text{m}^{-2}\\text{s}^3\\text{A}^2$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Named for Werner von Siemens, the unit answers how readily charge flows rather than how hard it is held back. A 10-ohm resistor has a conductance of 0.1 siemens, and that simple inversion is handy because conductances add up directly when paths run in parallel, the way extra lanes ease traffic on EDSA. Conductance also shows up in water testing: dissolved salts and minerals make water more conductive, so meters report it in microsiemens per centimetre to gauge purity."
  },
  {
    "name": "Celsius",
    "symbol": "°C",
    "category": "Chemistry / Earth Science",
    "description": "The everyday temperature scale where water freezes at 0° and boils at 100° at sea level. Formally it is just the kelvin scale shifted by 273.15.",
    "misconception": "Saying 30 °C is \"twice as hot\" as 15 °C. Celsius zero is an arbitrary marker, not true zero, so doubling the number is meaningless. Only the absolute kelvin scale supports that kind of ratio.",
    "formalDefinition": "The degree Celsius, symbol $^\\circ\\text{C}$, is a unit of thermodynamic temperature. The Celsius scale is defined relative to the Kelvin scale such that temperature $t$ in Celsius is:\n\n$$t_{^\\circ\\text{C}} = T_{\\text{K}} - 273.15$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Anders Celsius proposed a 100-step scale between the freezing and boiling points of water, and the modern version pins those near 0 °C and 100 °C at standard pressure. Today the BIPM defines it exactly through the kelvin, with a degree Celsius equal in size to a kelvin and offset by 273.15. The numbers suit daily life in the Philippines: a comfortable aircon room sits near 24 °C, a hot Manila noon hits the mid-30s, and PAGASA's heat index can push the felt temperature past 40 °C."
  },
  {
    "name": "Molarity",
    "symbol": "M (mol/L)",
    "category": "Chemistry",
    "description": "A measure of concentration: how many moles of dissolved substance sit in each litre of solution.",
    "misconception": "Concentration is not the same as total amount. A cup and a swimming pool can both be 1 M salt water; they share the concentration but hold vastly different total amounts of salt.",
    "formalDefinition": "Molarity (amount-of-substance concentration), symbol $c$ or $M$, is the amount of solute per unit volume of solution:\n\n$$c = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}},\\qquad 1\\text{ M} = 1\\text{ mol/L} = 1000\\text{ mol/m}^3$$",
    "sources": [SRC.iupacMole, SRC.nistSP811],
    "body": "Molarity is the concentration unit most chemistry labs reach for first, because measuring out a volume of solution is quick. Dissolve one mole of table salt, about 58 grams, in enough water to make exactly one litre and you have a 1 M solution. The catch worth remembering: molarity depends on the total volume of solution, and liquids expand when warmed, so a solution's molarity shifts slightly with temperature. When that matters, chemists switch to molality, which is based on mass instead."
  },
  {
    "name": "Molality",
    "symbol": "m (mol/kg)",
    "category": "Chemistry",
    "description": "A measure of concentration based on the mass of solvent: moles of solute per kilogram of solvent.",
    "misconception": "Molality gets confused with molarity. The key reason molality exists is temperature: mass never changes when you heat a solution, but the volume that molarity relies on does.",
    "formalDefinition": "Molality, symbol $b$ or $m$, is the amount of solute per unit mass of solvent:\n\n$$b = \\frac{n_{\\text{solute}}}{m_{\\text{solvent}}},\\qquad \\text{unit } \\text{mol/kg}$$",
    "sources": [SRC.nistSP811, SRC.iupacMole],
    "body": "Molality is the concentration of choice whenever temperature is in play, since it counts solute against the kilograms of solvent rather than a volume that swells with heat. It is the natural unit for the colligative effects students meet, like why dissolving salt lowers the freezing point and raises the boiling point of water. Dissolve one mole of solute in one kilogram of water and you have a 1 m solution, and that ratio stays put whether the beaker is iced or boiling."
  },
  {
    "name": "Gram per Cubic Centimeter",
    "symbol": "g/cm³",
    "category": "Chemistry / Physics",
    "description": "A common unit of density, mass packed into volume. Pure water is the reference at almost exactly 1.0 g/cm³.",
    "misconception": "\"Heavy\" things are assumed to sink. What decides floating is density, not weight: a massive log floats because it is less dense than water, while a small steel bolt sinks.",
    "formalDefinition": "The gram per cubic centimetre is a unit of mass density (mass per unit volume), equal in SI to:\n\n$$1\\text{ g/cm}^3 = 1000\\text{ kg/m}^3$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Density tells you how much matter is squeezed into a given space, and water's tidy value of 1 g/cm³ makes it the handy yardstick. Anything denser than water sinks in it and anything less dense floats, which is the whole logic behind why ice (about 0.92 g/cm³) bobs in your halo-halo while a coin drops to the bottom. Metals run high: aluminium is about 2.7 g/cm³ and lead about 11.3, so a small lead sinker feels startlingly heavy for its size."
  },
  {
    "name": "Liters",
    "symbol": "L",
    "category": "Chemistry / Everyday Science",
    "description": "A metric unit of volume equal to 1,000 cubic centimetres, or one cubic decimetre. The everyday unit for liquids.",
    "misconception": "Assuming a litre of any liquid weighs a kilogram. That holds only for water. A litre of cooking oil weighs less, and a litre of mercury weighs over 13 kilograms.",
    "formalDefinition": "The litre, symbol $\\text{L}$, is a non-SI unit of volume accepted for use with the SI:\n\n$$1\\text{ L} = 1\\text{ dm}^3 = 1000\\text{ cm}^3 = 10^{-3}\\text{ m}^3$$",
    "sources": [SRC.nistSP811, SRC.siBrochure],
    "body": "The litre is not an SI base unit, but the BIPM accepts it for use alongside the SI because it is so deeply woven into daily life. A standard soft-drink bottle is one litre, a sako of water at the refilling station is the familiar 5-gallon container of about 19 litres, and fuel pumps along the highway sell by the litre. One litre of water weighs almost exactly one kilogram, which is a useful coincidence, but it is only a coincidence: weight depends on what the litre is full of."
  },
  {
    "name": "Parts Per Million",
    "symbol": "ppm",
    "category": "Chemistry / Environmental",
    "description": "A way to express very dilute concentrations: how many units of something sit among a million units of the whole.",
    "misconception": "The scale is hard to picture. One ppm is one grain in a million grains. Reading 400 ppm of CO₂ means 400 of every million air molecules are carbon dioxide, which is small but climatically significant.",
    "formalDefinition": "Parts per million is a dimensionless ratio expressing a quantity per million of the same quantity:\n\n$$1\\text{ ppm} = 10^{-6} = 0.0001\\%$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "When a concentration is far too small for percentages, ppm keeps the numbers readable. It is the standard for environmental and water-quality reporting: atmospheric CO₂ has climbed past 420 ppm, and drinking-water guidelines limit contaminants to a few ppm or less. A clean mental model is a drop in a large drum, roughly one drop of dye in a 50-litre container. NIST cautions that ppm should always state what is being compared, since parts by mass and by volume can differ."
  },
  {
    "name": "Parts Per Billion",
    "symbol": "ppb",
    "category": "Chemistry / Environmental",
    "description": "Concentration a thousand times finer than ppm: one part among a billion. The scale for trace pollutants and toxins.",
    "misconception": "Trace amounts get dismissed as effectively zero. In toxicology they are not. Even single-digit ppb of lead in drinking water is a recognized health risk, especially for children.",
    "formalDefinition": "Parts per billion is a dimensionless ratio expressing a quantity per thousand million of the same quantity:\n\n$$1\\text{ ppb} = 10^{-9} = 0.001\\text{ ppm}$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Parts per billion is the unit that shows up once measuring instruments get sensitive enough to find contamination most people would assume is absent. Picture roughly one drop of ink in an Olympic-sized swimming pool. At this scale, small numbers still carry weight: health agencies set limits for substances like arsenic and mercury in ppb because the body responds to tiny but persistent doses. NIST again stresses noting whether a ppb figure is by mass or by volume, since the two are not interchangeable."
  },
  {
    "name": "Atomic Mass Unit",
    "symbol": "amu (or u)",
    "category": "Chemistry",
    "description": "The unit for masses of atoms and subatomic particles, defined as exactly one twelfth of the mass of a carbon-12 atom.",
    "misconception": "An amu is not exactly the mass of a proton. It is one twelfth of a carbon-12 atom, which is close to a proton's mass but not identical, partly because of nuclear binding energy.",
    "formalDefinition": "The unified atomic mass unit, symbol $\\text{u}$ (also amu), is defined as one twelfth of the mass of a free carbon-12 atom at rest in its ground state:\n\n$$1\\text{ u} = \\tfrac{1}{12}\\,m(^{12}\\text{C}) \\approx 1.66053907 \\times 10^{-27}\\text{ kg}$$",
    "sources": [SRC.nistValU, SRC.nistConstants],
    "body": "Working with atoms in kilograms means dragging around 10⁻²⁷, so chemists scale to the atomic mass unit, anchored to carbon-12 as exactly 12 u. On this scale a proton and neutron are each close to 1 u, which is why an atom's mass number roughly matches the count of protons and neutrons in its nucleus. NIST's measured value, about 1.66 × 10⁻²⁷ kg, is the bridge back to SI when you need real grams from a periodic-table mass."
  },
  {
    "name": "Dalton",
    "symbol": "Da",
    "category": "Biochemistry",
    "description": "The atomic mass unit by another name, favored in biology and biochemistry for the masses of large molecules like proteins.",
    "misconception": "Treating the dalton as a different quantity from the amu. They are identical: 1 Da = 1 u. The name simply scales gracefully, as in kilodaltons for proteins.",
    "formalDefinition": "The dalton, symbol $\\text{Da}$, is identical to the unified atomic mass unit:\n\n$$1\\text{ Da} = 1\\text{ u} = \\tfrac{1}{12}\\,m(^{12}\\text{C}) \\approx 1.66053907 \\times 10^{-27}\\text{ kg}$$",
    "sources": [SRC.nistValU, SRC.nistSP811],
    "body": "Named for John Dalton, the father of modern atomic theory, the dalton is the same unit as the amu but with a name that takes prefixes comfortably. Biochemists lean on it because their molecules are huge: hemoglobin weighs in around 64,000 Da, or 64 kilodaltons, and gel results are routinely read off in kDa. Reporting a protein as 50 kDa is just a cleaner way of saying 50,000 atomic mass units, the combined mass of all its atoms."
  },
  {
    "name": "Joule per Kilogram Kelvin",
    "symbol": "J/(kg·K)",
    "category": "Thermodynamics",
    "description": "The unit of specific heat capacity: the energy needed to raise one kilogram of a substance by one kelvin.",
    "misconception": "Assuming everything heats at the same rate. Water has an unusually high specific heat, so it soaks up a lot of energy for a small temperature rise, which is exactly why it takes so long to boil.",
    "formalDefinition": "The joule per kilogram kelvin is the SI unit of specific heat capacity, the energy per unit mass needed to change temperature:\n\n$$c = \\frac{Q}{m\\,\\Delta T},\\qquad 1\\text{ J/(kg}\\cdot\\text{K)} = 1\\text{ m}^2\\text{s}^{-2}\\text{K}^{-1}$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Specific heat explains why some things warm up fast and others stubbornly resist. Water sits near 4,184 J/(kg·K), much higher than sand at roughly 800 or metals lower still, and that single fact shapes the climate of an archipelago. The seas around the Philippines absorb enormous heat with only a modest temperature change, moderating coastal weather and storing the warmth that feeds typhoons. The same property is why a metal spoon left in soup scalds your hand long before the ceramic bowl does."
  },
  {
    "name": "Photosynthetic Photon Flux Density",
    "symbol": "μmol m⁻² s⁻¹",
    "category": "Biology / Botany",
    "description": "A measure of usable plant light: how many photons in the 400 to 700 nm range strike a surface each second, per square metre.",
    "misconception": "Confusing it with lux. Lux is weighted to human vision, which peaks in green, the very light plants reflect. A space can look bright to you in lux yet starve a plant that needs red and blue photons.",
    "formalDefinition": "Photosynthetic photon flux density (PPFD) is the photon irradiance over the 400–700 nm photosynthetically active range, in micromoles of photons per square metre per second:\n\n$$\\text{PPFD} = \\mu\\text{mol}\\;\\text{m}^{-2}\\,\\text{s}^{-1}$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Plants do not care how bright light looks to us; they care how many photons of the right colors land on their leaves to drive photosynthesis. PPFD counts exactly that, in micromoles of usable photons per square metre each second. Outdoor noon sun can exceed 2,000 µmol m⁻² s⁻¹, while many leafy crops grow well around a few hundred. This is why serious indoor and greenhouse growers measure PPFD rather than lux, since a grow light tuned to look pleasant can still leave plants underfed."
  },
  {
    "name": "Lux",
    "symbol": "lx",
    "category": "Optics",
    "description": "The SI derived unit of illuminance: how much visible light, weighted to the human eye, lands on a surface per square metre.",
    "misconception": "Lux is misused to judge plant lighting. Because it is weighted to human vision, lux says little about the red and blue photons plants actually use, so it is the wrong tool for growing.",
    "formalDefinition": "The Lux, symbol $\\text{lx}$, is the SI derived unit of illuminance. It is defined as one lumen of luminous flux spread uniformly over an area of one square meter:\n\n$$1\\text{ lx} = 1\\text{ lm/m}^2 = 1\\text{ cd}\\cdot\\text{sr/m}^2$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Lux measures how well a surface is lit for human eyes, which is why it governs lighting standards for classrooms, offices, and operating rooms. The range is wide: direct midday sun delivers around 100,000 lx, a well-lit classroom aims for 300 to 500 lx, and a full moon gives less than 1 lx. Because it counts the same lumens spread over more area, doubling your distance from a lamp roughly quarters the lux, the inverse-square law at work in your study corner."
  },
  {
    "name": "Lumen",
    "symbol": "lm",
    "category": "Optics",
    "description": "The SI derived unit of luminous flux: the total amount of visible light a source pours out in every direction.",
    "misconception": "Buying bulbs by watts instead of lumens. Watts tell you energy drawn; lumens tell you light produced. An LED can make 800 lumens on under 10 watts, where an old bulb needed 60.",
    "formalDefinition": "The Lumen, symbol $\\text{lm}$, is the SI derived unit of luminous flux. It is defined as the luminous flux emitted in a solid angle of one steradian by a uniform point source having a luminous intensity of one candela:\n\n$$1\\text{ lm} = 1\\text{ cd}\\cdot\\text{sr}$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Where the candela measures brightness in one direction, the lumen adds it up over all directions to give a source's total light output. This is the number that actually belongs on a bulb's box, and it is why lighting shifted to selling lumens once LEDs broke the old link between watts and brightness. A bulb's efficacy, lumens per watt, is the real efficiency figure: modern LEDs reach 80 to 100 lm/W, so you get the light of the old 60 W bulb while the meter barely moves."
  },
  {
    "name": "Diopter",
    "symbol": "D",
    "category": "Optics / Biology",
    "description": "The unit of optical power for a lens, equal to the reciprocal of its focal length in metres. It is the number on your eyeglass prescription.",
    "misconception": "Not realizing a diopter is simply 1 divided by the focal length in metres. A +2.00 D lens has a focal length of half a metre; stronger prescriptions mean shorter focal lengths.",
    "formalDefinition": "The dioptre, symbol $\\text{D}$, is the unit of optical (refractive) power, the reciprocal of the focal length measured in metres:\n\n$$P = \\frac{1}{f},\\qquad 1\\text{ D} = 1\\text{ m}^{-1}$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Optical power in dioptres is handy because lenses add up: stack a +1 D and a +2 D lens and you get +3 D, which is far easier than juggling focal lengths. That is the math behind every prescription at the optical shop. Positive dioptres describe converging lenses for farsightedness and reading glasses, negative ones the diverging lenses for nearsightedness. A relaxed human eye already provides about +60 D of focusing power, with the flexible lens adding more to bring near objects into focus."
  },
  {
    "name": "Decibel",
    "symbol": "dB",
    "category": "Physics / Biology",
    "description": "A logarithmic unit comparing one intensity to a reference. In sound, it measures level against the quietest pressure a healthy ear can detect.",
    "misconception": "Reading the scale as if it were linear. A 10 dB rise is ten times the sound intensity, not a slight bump, and roughly doubles perceived loudness. Decibels add where intensities multiply.",
    "formalDefinition": "The decibel, symbol $\\text{dB}$, is a logarithmic ratio unit. In acoustics, sound pressure level ($L_p$) is defined relative to the reference hearing threshold pressure $p_0 = 20\\ \\mu\\text{Pa}$ as:\n\n$$L_p = 20 \\log_{10}\\left(\\frac{p}{p_0}\\right)\\text{ dB}$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Human hearing spans a factor of about a trillion between the faintest whisper and a painful roar, so a plain linear scale would be useless. The logarithmic decibel compresses that range into readable numbers: a quiet library is around 40 dB, normal conversation 60 dB, and EDSA traffic can sit near 85 dB, the level where prolonged exposure starts to risk hearing. Because the scale is logarithmic, two equally loud sources together add only about 3 dB, not double the number."
  },
  {
    "name": "Base Pair",
    "symbol": "bp",
    "category": "Biology / Genetics",
    "description": "The basic rung of the DNA ladder: one pairing of complementary bases, adenine with thymine or cytosine with guanine.",
    "misconception": "Underestimating genome scale. Every cell in your body carries roughly 3 billion base pairs of DNA, packed into a nucleus only micrometres across.",
    "formalDefinition": "A base pair (bp) is the unit of length of double-stranded nucleic acids, counting one complementary pairing of bases (A–T or G–C) across the two strands of the helix.",
    "sources": [SRC.genomeBp, SRC.genomeKb],
    "body": "DNA is a two-stranded helix, and a base pair is one matched step on that twisted ladder, with adenine always opposite thymine and cytosine opposite guanine. Genome biologists count length in base pairs the way you would count letters in a book. The NHGRI puts the human genome at about 3 billion base pairs per cell, a sequence so long that if you read one pair per second it would take roughly a century. That pairing rule is also what lets a cell copy DNA faithfully, since each strand is a template for the other."
  },
  {
    "name": "Kilobase",
    "symbol": "kb",
    "category": "Biology / Genetics",
    "description": "A unit of nucleic-acid length equal to 1,000 base pairs, used to size genes and DNA fragments.",
    "misconception": "Assuming genes are tiny. A single human gene can stretch across hundreds of kilobases, most of it non-coding regions spliced out before the protein is built.",
    "formalDefinition": "The kilobase, symbol $\\text{kb}$, is a unit of length for nucleic acids equal to one thousand bases or base pairs:\n\n$$1\\text{ kb} = 1000\\text{ base pairs}$$",
    "sources": [SRC.genomeKb, SRC.genomeBp],
    "body": "Once you are dealing with whole genes, single base pairs become unwieldy, so molecular biologists scale up to kilobases. The NHGRI notes that a kilobase is a thousand bases, and the unit makes lab talk manageable: a plasmid might be 5 kb, while the dystrophin gene runs past 2,000 kb. Bigger jobs reach the megabase, a million base pairs. These units are the everyday ruler of genetic engineering, from reading a PCR result to mapping an entire chromosome."
  },
  {
    "name": "Beats Per Minute",
    "symbol": "bpm",
    "category": "Biology / Physiology",
    "description": "The standard measure of heart rate: how many times the heart contracts in one minute.",
    "misconception": "Heart rate is confused with blood pressure. Beats per minute is the pump's speed; blood pressure is the force pushing against the artery walls. You can have a calm rate and high pressure at once.",
    "formalDefinition": "Beats per minute is a frequency expressed per minute of cardiac cycles:\n\n$$1\\text{ bpm} = \\frac{1}{60}\\text{ Hz} \\approx 0.0167\\text{ Hz}$$",
    "sources": [SRC.nhlbiBp, SRC.nistSP811],
    "body": "Heart rate in beats per minute is the simplest window into how hard your heart is working. A resting adult typically falls between 60 and 100 bpm, trained athletes can dip below 50, and a brisk climb up a footbridge can briefly push you past 150. It is a frequency, so it converts to about 1.2 hertz at 72 bpm, one beat roughly every 0.83 seconds. As the NHLBI explains, rate and blood pressure are separate vital signs, which is why a check-up records both."
  },
  {
    "name": "Light-Year",
    "symbol": "ly",
    "category": "Astronomy",
    "description": "A distance, not a time: how far light travels in one year, about 9.46 trillion kilometres.",
    "misconception": "Hearing \"year\" and reading it as time. A light-year measures distance. Saying a star is 4 light-years away is like saying a town is two hours' drive away, a distance phrased through travel.",
    "formalDefinition": "A light-year, symbol $\\text{ly}$, is a non-SI astronomical unit of length. It is defined as the distance that light travels in a vacuum in one Julian year ($365.25$ days of $86\\,400\\text{ seconds}$ each):\n\n$$1\\text{ ly} = c \\cdot t \\approx 9.4607 \\times 10^{15}\\text{ m}$$",
    "sources": [SRC.iau, SRC.nistSP811],
    "body": "Because light moves at a fixed 299,792 km/s, the distance it covers in a year is a natural cosmic ruler. The scale humbles you: sunlight takes about 8 minutes to reach us, but light from Proxima Centauri, the nearest star beyond the Sun, has been travelling about 4.2 years before it hits your eye. So looking out into space is also looking back in time, and a galaxy seen at a million light-years is seen as it was a million years ago. The light-year stays popular in public astronomy for exactly this intuition."
  },
  {
    "name": "Astronomical Unit",
    "symbol": "AU",
    "category": "Astronomy",
    "description": "The yardstick of the solar system: the average Earth–Sun distance, fixed at exactly 149,597,870,700 metres.",
    "misconception": "Picturing orbits as perfect circles. The AU is an average because Earth's orbit is an ellipse, so the real distance to the Sun shifts by a few million kilometres over the year.",
    "formalDefinition": "The astronomical unit, symbol $\\text{au}$ or $\\text{AU}$, is a unit of length defined by the IAU (2012) as exactly:\n\n$$1\\text{ AU} = 149\\,597\\,870\\,700\\text{ m}$$",
    "sources": [SRC.jplAstro, SRC.iau],
    "body": "For distances within the solar system, light-years are absurdly large, so astronomers use the average Earth–Sun gap as the unit. In 2012 the IAU stopped defining it through orbital mechanics and simply fixed it at 149,597,870,700 metres, a clean number JPL uses in its ephemerides. The scale makes the solar system legible: Mars orbits at about 1.5 AU, Jupiter near 5.2 AU, and Neptune out around 30 AU. Sunlight, which takes 8 minutes to cross 1 AU to Earth, needs more than four hours to reach Neptune."
  },
  {
    "name": "Parsec",
    "symbol": "pc",
    "category": "Astronomy",
    "description": "The professional astronomer's distance unit, about 3.26 light-years, defined through the geometry of stellar parallax.",
    "misconception": "Famously misused in Star Wars as a time (\"the Kessel Run in less than 12 parsecs\"). A parsec is strictly a distance, derived from an angle, not a duration.",
    "formalDefinition": "The parsec, symbol $\\text{pc}$, is a unit of length used in astronomy. It is defined as the distance at which a baseline of one astronomical unit subtends an angle of exactly one arcsecond:\n\n$$1\\text{ pc} = \\frac{1\\text{ AU}}{\\tan(1'')} \\approx 3.0857 \\times 10^{16}\\text{ m} \\approx 3.2616\\text{ ly}$$",
    "sources": [SRC.iau, SRC.jplAstro],
    "body": "The name is short for \"parallax second,\" and it comes straight from how astronomers actually measure distance. As Earth orbits the Sun, a nearby star appears to shift slightly against the far background, and a star whose shift is one arcsecond across a one-AU baseline sits exactly one parsec away. The smaller the wobble, the farther the star. Professionals prefer the parsec because it falls out of the measurement itself, and they scale up to kiloparsecs across the galaxy and megaparsecs between galaxies."
  },
  {
    "name": "Solar Mass",
    "symbol": "M☉",
    "category": "Astronomy",
    "description": "The standard unit of mass in astronomy, set equal to the mass of the Sun, about 2 × 10³⁰ kilograms.",
    "misconception": "Failing to grasp the scale. The Sun holds about 99.8% of all the mass in the solar system, so everything else, all the planets and moons combined, is a rounding error by comparison.",
    "formalDefinition": "The solar mass, symbol $M_\\odot$, is the standard astronomical unit of mass, equal to the mass of the Sun. The IAU fixes the related parameter $GM_\\odot$, giving:\n\n$$1\\,M_\\odot \\approx 1.988 \\times 10^{30}\\text{ kg}$$",
    "sources": [SRC.jplAstro, SRC.iau],
    "body": "Stellar and galactic masses are so vast that kilograms become unreadable, so astronomers measure them in Suns. The IAU works with the gravitational parameter GM☉, which is measured far more precisely than the Sun's mass on its own, and from it the solar mass comes out near 2 × 10³⁰ kg. The unit gives instant context: a white dwarf can be packed below about 1.4 solar masses, the Chandrasekhar limit, while the black hole at the Milky Way's centre weighs about 4 million solar masses."
  },
  {
    "name": "Knot",
    "symbol": "kn",
    "category": "Earth Science / Navigation",
    "description": "A unit of speed equal to one nautical mile per hour, standard in shipping and aviation and in PAGASA's wind reports.",
    "misconception": "Confusing nautical miles with land miles. A nautical mile is tied to the Earth's geometry, one minute of latitude, and is longer than a statute mile, so a knot is faster than a mile per hour.",
    "formalDefinition": "The knot, symbol $\\text{kn}$, is a non-SI unit of speed equal to one nautical mile per hour:\n\n$$1\\text{ kn} = 1.852\\text{ km/h} \\approx 0.5144\\text{ m/s}$$",
    "sources": [SRC.nistSP811, SRC.siBrochure],
    "body": "The knot survives because a nautical mile is one minute of arc along a meridian, which makes navigation and chart work natural at sea and in the air. The name is literal: sailors once timed knots on a rope paid out behind the ship to gauge speed. In the Philippines the unit is most visible in weather bulletins, where PAGASA reports a typhoon's maximum sustained winds in knots, and a super typhoon's winds well above 100 kn translate to over 185 km/h."
  },
  {
    "name": "Millibar",
    "symbol": "mb",
    "category": "Earth Science / Meteorology",
    "description": "A unit of atmospheric pressure used on weather charts. Standard sea-level pressure is 1013.25 millibars.",
    "misconception": "Being thrown by the mix of units on weather maps. One millibar is exactly one hectopascal (hPa), so PAGASA's hPa readings and older millibar figures are the same numbers.",
    "formalDefinition": "The millibar, symbol $\\text{mb}$ or $\\text{mbar}$, is a non-SI unit of pressure equal to one hectopascal:\n\n$$1\\text{ mb} = 1\\text{ hPa} = 100\\text{ Pa}$$",
    "sources": [SRC.nistSP811, SRC.siBrochure],
    "body": "Meteorologists adopted the bar and its millibar because everyday air pressure lands near a round 1,000, easier to read off a chart than 100,000 pascals. The number matters for forecasting: lower central pressure generally means a stronger storm. In the western Pacific, a typhoon's central pressure dropping toward 900 mb signals a violent system, and PAGASA tracks that figure in hectopascals, which are numerically identical. The millibar and hectopascal are interchangeable, which is why both appear in older and newer bulletins."
  },
  {
    "name": "Richter Magnitude",
    "symbol": "ML",
    "category": "Earth Science",
    "description": "An early logarithmic scale for earthquake size, based on the amplitude recorded on a seismograph.",
    "misconception": "It is largely retired for big quakes. Seismologists now report the moment magnitude (Mw) for large events, though news outlets still loosely call any value \"the Richter scale.\"",
    "formalDefinition": "The local (Richter) magnitude $M_L$ is a base-10 logarithmic measure of the maximum seismograph amplitude $A$ relative to a reference $A_0$ at a given distance:\n\n$$M_L = \\log_{10}(A) - \\log_{10}(A_0)$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Charles Richter built his 1935 scale on the logarithm of recorded shaking, so each whole step up means about ten times the seismograph amplitude and roughly 32 times the energy released. The logarithm is why the jump from magnitude 6 to 7 is not a small one. In the Philippines, where PHIVOLCS monitors a famously active fault network, large events are reported on the moment magnitude scale, which holds up better for great earthquakes than Richter's original method, designed for moderate California quakes."
  },
  {
    "name": "Sverdrup",
    "symbol": "Sv",
    "category": "Earth Science / Oceanography",
    "description": "A unit of volume transport for ocean currents: one sverdrup is a million cubic metres of water moving past per second.",
    "misconception": "It is obscure but essential to climate science. For perspective, the combined flow of every river on Earth is only about 1 Sv, while a major ocean current moves tens of sverdrups.",
    "formalDefinition": "The sverdrup, symbol $\\text{Sv}$, is a non-SI unit of volume transport used in oceanography:\n\n$$1\\text{ Sv} = 10^6\\text{ m}^3/\\text{s}$$",
    "sources": [SRC.noaaSverdrup, SRC.nistSP811],
    "body": "Ocean currents move staggering volumes of water, so oceanographers need a big unit, and the sverdrup, named for Harald Sverdrup, fits. NOAA notes that one sverdrup is a million cubic metres per second, and that all the world's rivers together carry only about one of them. The Kuroshio Current, which sweeps warm tropical water northward past the Philippines and Japan, transports tens of sverdrups, redistributing heat that shapes regional climate. Note the symbol Sv collides with the sievert, so context matters."
  },
  {
    "name": "Becquerel",
    "symbol": "Bq",
    "category": "Nuclear Physics",
    "description": "The SI derived unit of radioactivity: exactly one atomic nucleus decaying per second.",
    "misconception": "Assuming any radioactivity is dangerous. Your own body runs at about 4,000 Bq from natural carbon-14 and potassium-40, decaying away quietly every second of your life.",
    "formalDefinition": "The Becquerel, symbol $\\text{Bq}$, is the SI derived unit of radioactivity. It is defined as the activity of a quantity of radioactive material in which one nucleus decays per second:\n\n$$1\\text{ Bq} = 1\\text{/s}$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Named for Henri Becquerel, who discovered radioactivity, the becquerel counts raw decay events, one nucleus breaking down per second. It is a tiny unit, so real samples read in thousands or millions of becquerels. The reassuring context: a single banana, rich in potassium-40, registers around 15 Bq, and a human body around 4,000 Bq, all perfectly normal. The becquerel measures how often decays happen, not how much harm they do, which is a separate question answered by the gray and sievert."
  },
  {
    "name": "Electronvolt",
    "symbol": "eV",
    "category": "Nuclear Physics / Quantum",
    "description": "A tiny unit of energy: the energy one electron gains crossing a potential difference of one volt. The natural currency of particle and atomic physics.",
    "misconception": "Confusing it with voltage. An electronvolt is an amount of energy, like a minuscule joule, not an electric potential. The volt in its definition is just how the energy is delivered.",
    "formalDefinition": "The electronvolt, symbol $\\text{eV}$, is a non-SI unit of energy equal to the work done moving one elementary charge through one volt:\n\n$$1\\text{ eV} = e \\times 1\\text{ V} = 1.602176634 \\times 10^{-19}\\text{ J}$$",
    "sources": [SRC.nistValEv, SRC.nistConstants],
    "body": "Joules are hopelessly large for single particles, so physicists measure their energies in electronvolts, fixed by NIST at about 1.602 × 10⁻¹⁹ J. The unit scales beautifully across the small world: visible-light photons carry a couple of eV, the electron binding hydrogen sits at 13.6 eV, and X-rays run to thousands. Push to the extreme and particle accelerators reach giga- and tera-electronvolts, which is why the collider that found the Higgs boson is described in TeV, not joules."
  },
  {
    "name": "Gray",
    "symbol": "Gy",
    "category": "Nuclear Physics",
    "description": "The SI derived unit of absorbed radiation dose: one joule of radiation energy deposited per kilogram of matter.",
    "misconception": "Mixing up physical dose (gray) with biological harm (sievert). The gray counts raw energy absorbed, regardless of which tissue absorbs it or what kind of radiation it is.",
    "formalDefinition": "The Gray, symbol $\\text{Gy}$, is the SI derived unit of absorbed radiation dose. It is defined as the absorption of one joule of radiation energy per kilogram of matter:\n\n$$1\\text{ Gy} = 1\\text{ J/kg}$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Named for radiobiology pioneer Louis Harold Gray, this unit measures the physical energy that ionizing radiation, such as X-rays or gamma rays, dumps into a material. It is purely about energy per mass, so it applies just as well to a tumor in radiotherapy as to a steel plate. What the gray deliberately ignores is biology: the same absorbed dose does different damage depending on radiation type and tissue, and that weighting is exactly what the sievert adds on top."
  },
  {
    "name": "Sievert",
    "symbol": "Sv",
    "category": "Nuclear Physics / Health",
    "description": "The SI unit of radiation dose weighted for biological harm: the gray adjusted by how damaging the radiation and exposed tissue are.",
    "misconception": "Panicking at the word from sci-fi. Eating one banana gives roughly 0.1 microsieverts, and a chest X-ray about 100 microsieverts. The dangerous doses are thousands of times larger.",
    "formalDefinition": "The Sievert, symbol $\\text{Sv}$, is the SI derived unit of equivalent or effective radiation dose. It is the absorbed dose in grays multiplied by a dimensionless quality factor $W$ for biological effectiveness:\n\n$$H = W \\cdot D,\\qquad 1\\text{ Sv} = 1\\text{ J/kg}$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Named for Rolf Sievert, the unit takes the physical dose in grays and scales it by how harmful the radiation actually is to living tissue, so a gray of alpha particles counts for far more than a gray of X-rays. Because one whole sievert is a serious dose, real life is measured in milli- and microsieverts. Natural background radiation runs about 2.4 mSv per year, a long-haul flight adds a few microsieverts from cosmic rays, and dose limits for radiation workers are set with these numbers in mind."
  },
  {
    "name": "Half-Life",
    "symbol": "t₁/₂",
    "category": "Nuclear Physics",
    "description": "Not a unit but a time: how long it takes for half the radioactive atoms in a sample to decay. It is constant for a given isotope.",
    "misconception": "Thinking two half-lives empties the sample. After one half-life, half remains; after two, a quarter remains, not zero. Decay halves again and again but never fully reaches nothing.",
    "formalDefinition": "The half-life $t_{1/2}$ is the time for a quantity undergoing exponential decay to fall to half its value, set by the decay constant $\\lambda$:\n\n$$N(t) = N_0\\left(\\tfrac{1}{2}\\right)^{t/t_{1/2}},\\qquad t_{1/2} = \\frac{\\ln 2}{\\lambda}$$",
    "sources": [SRC.nistConstants, SRC.nistUnits],
    "body": "Half-life is the clock of the atomic world, and its values span an almost comic range. Carbon-14 halves every 5,730 years, which is why it dates archaeological wood and bone, while some isotopes used in medical imaging halve in hours so they clear the body fast. The steady, predictable halving is what makes radiometric dating trustworthy: after ten half-lives less than a thousandth of the original remains, but in principle a trace lingers far longer, just halving forever."
  },
  {
    "name": "Kilo-",
    "symbol": "k",
    "category": "Metric Prefix",
    "description": "The SI prefix for one thousand. A kilometre is 1,000 metres; a kilogram, 1,000 grams.",
    "misconception": "Shortening \"kilogram\" to just \"kilo,\" which muddies things once the prefix lands on other units. A kilowatt and a kilobyte have nothing to do with mass.",
    "formalDefinition": "Kilo, symbol $\\text{k}$, is the SI prefix denoting a factor of one thousand:\n\n$$\\text{k} = 10^{3} = 1000$$",
    "sources": [SRC.nistPrefixes, SRC.siBrochure],
    "body": "Kilo is the prefix everyone meets first, partly because it sits on the SI base unit of mass itself, the kilogram. The BIPM standardizes the lowercase k, and consistency matters: km, kW, and kHz all mean a thousand of their base unit. It is the rung that turns metres into the kilometres on a highway sign and grams into the kilograms on a palengke scale. Each big SI prefix climbs by a factor of a thousand, so kilo is the first step on a ladder that keeps reaching upward to mega and giga."
  },
  {
    "name": "Milli-",
    "symbol": "m",
    "category": "Metric Prefix",
    "description": "The SI prefix for one thousandth. A millimetre is 0.001 metres; a millilitre, a thousandth of a litre.",
    "misconception": "Mixing milli- up with micro- (µ) or nano- (n). Skipping a prefix is a factor of a thousand off, the kind of slip that ruins a dosage or a chemistry calculation.",
    "formalDefinition": "Milli, symbol $\\text{m}$, is the SI prefix denoting a factor of one thousandth:\n\n$$\\text{m} = 10^{-3} = 0.001$$",
    "sources": [SRC.nistPrefixes, SRC.siBrochure],
    "body": "Milli is the workhorse small prefix, the one on the ruler markings and the medicine label. A millimetre is the fine division on your steel rule, and a 500 mL bottle of water is half a litre. Note the case carefully, since the BIPM assigns lowercase m to milli but the same letter, capitalized, is the symbol for the metre, so context tells them apart. Medicine leans on it heavily: dosages in milligrams and millilitres are routine, and confusing milli with micro there can be a thousandfold error."
  },
  {
    "name": "Micro-",
    "symbol": "μ",
    "category": "Metric Prefix",
    "description": "The SI prefix for one millionth (10⁻⁶), written with the Greek letter mu.",
    "misconception": "Writing micro as a plain \"u\" instead of the Greek µ. It is a common shortcut when the symbol is hard to type, but it is technically wrong and can be ambiguous in careful work.",
    "formalDefinition": "Micro, symbol $\\mu$, is the SI prefix denoting a factor of one millionth:\n\n$$\\mu = 10^{-6} = 0.000001$$",
    "sources": [SRC.nistPrefixes, SRC.siBrochure],
    "body": "Micro takes you into the world you need a microscope to see. A human hair is roughly 70 micrometres thick, a red blood cell about 7 µm, and many bacteria around 1 µm. The BIPM symbol is the Greek letter mu, µ, which is why typing it is a small nuisance and why people fall back on a Latin u. The prefix is everywhere in the lab and clinic, from microlitres pipetted in a reaction to the micrograms of active ingredient in a tablet."
  },
  {
    "name": "Nano-",
    "symbol": "n",
    "category": "Metric Prefix",
    "description": "The SI prefix for one billionth (10⁻⁹). Visible-light wavelengths and computer-chip features live at this scale.",
    "misconception": "Failing to feel how small a nanometre is. Your fingernails grow at roughly a nanometre per second, and a single atom is only a fraction of a nanometre across.",
    "formalDefinition": "Nano, symbol $\\text{n}$, is the SI prefix denoting a factor of one billionth:\n\n$$\\text{n} = 10^{-9} = 0.000000001$$",
    "sources": [SRC.nistPrefixes, SRC.siBrochure],
    "body": "Nano is where physics meets chemistry: visible light runs from about 400 nm (violet) to 700 nm (red), and the transistors in a modern processor are patterned at just a few nanometres. The BIPM standardizes the lowercase n. The scale is genuinely atomic, since a typical atom spans a few tenths of a nanometre, which is why nanotechnology means building with individual molecules. A useful image: a nanometre is to a metre what a marble is to the whole Earth."
  },
  {
    "name": "Pound",
    "symbol": "lb",
    "category": "US Customary / Avoided",
    "description": "A US customary unit of mass, defined as exactly 0.453 592 37 kilograms. In strict physics it is mass, not force.",
    "misconception": "Treating pounds as weight that changes with gravity. The avoirdupois pound is legally a unit of mass, fixed against the kilogram. The force version is the separate pound-force.",
    "formalDefinition": "The (avoirdupois) pound, symbol $\\text{lb}$, is a US customary and imperial unit of mass defined exactly in terms of the kilogram:\n\n$$1\\text{ lb} = 0.45359237\\text{ kg}\\;(\\text{exact})$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "The pound is one of the few customary units with a clean, exact tie to the SI, since the US and UK long ago defined it as precisely 0.453 592 37 kilograms. NIST documents that definition, which is why a conversion is never an approximation. In everyday speech people use pounds as weight, but in careful work the pound is a mass, and the force gravity exerts on it is the pound-force. Filipinos meet it mostly through imported labels and gym plates, alongside the kilograms used at the market."
  },
  {
    "name": "Inch",
    "symbol": "in",
    "category": "US Customary / Avoided",
    "description": "A US customary unit of length, defined as exactly 2.54 centimetres since the 1959 international agreement.",
    "misconception": "Carrying fractional inches like 1/16\" into scientific work. Science uses decimals and metric units; fractions of an inch are a workshop convention, not a research one.",
    "formalDefinition": "The inch, symbol $\\text{in}$, is a US customary and imperial unit of length defined exactly as:\n\n$$1\\text{ in} = 2.54\\text{ cm} = 0.0254\\text{ m}\\;(\\text{exact})$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "The inch was pinned to the metric system in 1959 at exactly 2.54 centimetres, an agreement NIST records, so every inch-to-centimetre conversion is precise rather than rounded. In the Philippines it lingers in trades and products that came through American channels: plumbing fittings, plywood thickness, and TV or monitor sizes are all quoted in inches even though metric rules the classroom. That mismatch is why a hardware run can mean juggling both a tape measure in inches and one in centimetres."
  },
  {
    "name": "Fahrenheit",
    "symbol": "°F",
    "category": "US Customary / Avoided",
    "description": "A temperature scale used mainly in the United States, where water freezes at 32° and boils at 212°.",
    "misconception": "Assuming 0 °F is the coldest possible temperature. True zero is absolute zero, 0 kelvin, which is about -459.67 °F. The Fahrenheit zero is just an old reference point.",
    "formalDefinition": "The degree Fahrenheit, symbol $^\\circ\\text{F}$, relates to Celsius by:\n\n$$T_{^\\circ\\text{F}} = \\tfrac{9}{5}\\,T_{^\\circ\\text{C}} + 32$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Daniel Fahrenheit's early-1700s scale put 32 °F at water's freezing point and 212 °F at boiling, 180 degrees apart, which makes each Fahrenheit degree smaller than a Celsius one. Most of the world, the Philippines included, runs on Celsius, so the scale mainly turns up in imported recipes, American weather reports, and some medical thermometers. The conversion is worth memorizing for travel: a 35 °C Manila day is a sweltering 95 °F, and normal body temperature of 37 °C is the familiar 98.6 °F."
  },
  {
    "name": "Calorie",
    "symbol": "cal",
    "category": "Obsolete Metric",
    "description": "An older energy unit: the heat needed to warm one gram of water by one degree Celsius. Science has replaced it with the joule.",
    "misconception": "Food \"Calories\" use a capital C and are actually kilocalories. A 100-Calorie snack holds 100,000 of these small scientific calories, which is why the labels and physics units never seem to match.",
    "formalDefinition": "The (thermochemical) calorie, symbol $\\text{cal}$, is a non-SI unit of energy defined in terms of the joule:\n\n$$1\\text{ cal} = 4.184\\text{ J}\\;(\\text{exact, thermochemical})$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "The calorie predates the modern emphasis on the joule and survives mostly in nutrition and some chemistry. The confusion is real and worth clearing up: the Calorie on a food label is a kilocalorie, 1,000 small calories, so a 2,000-Calorie daily intake is about 8.4 million joules. NIST fixes the thermochemical calorie at exactly 4.184 J. For science class the rule is simple, energy goes in joules, but for counting what is on your plate of sinigang, the kilocalorie still rules."
  },
  {
    "name": "Horsepower",
    "symbol": "hp",
    "category": "Imperial / Avoided",
    "description": "An old unit of power coined by James Watt to sell steam engines against draft horses. One mechanical horsepower is about 746 watts.",
    "misconception": "Thinking a real horse makes exactly one horsepower. Watt's figure was a marketing average; a strong horse can briefly peak at several horsepower in a hard pull.",
    "formalDefinition": "The mechanical horsepower, symbol $\\text{hp}$, is a non-SI unit of power defined in terms of the watt:\n\n$$1\\text{ hp} \\approx 745.7\\text{ W}$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "James Watt invented horsepower as a sales tool, a way to tell buyers how many horses his steam engine could replace, and the irony is that the SI unit of power, the watt, now carries his name. About 746 watts make a horsepower, so a modest car engine rated at 100 hp is pushing roughly 75 kilowatts. The unit clings to the automotive and appliance worlds, which is why a Philippine car spec sheet still lists horsepower while a physics problem about the same engine would use kilowatts."
  },
  {
    "name": "Gallon",
    "symbol": "gal",
    "category": "US Customary / Avoided",
    "description": "A US customary unit of liquid volume. The US gallon is exactly 3.785 411 784 litres.",
    "misconception": "Assuming all gallons are equal. The US gallon and the imperial (UK) gallon are different sizes, about 3.79 L versus 4.55 L, a gap that has caused real fuel and engineering errors.",
    "formalDefinition": "The US liquid gallon, symbol $\\text{gal}$, is a US customary unit of volume defined exactly as:\n\n$$1\\text{ US gal} = 3.785411784\\text{ L}\\;(\\text{exact})$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "The gallon is a reminder that customary units are not even internally consistent: the US and imperial gallons differ by about 20%, so a recipe or fuel figure can go badly wrong if you grab the wrong one. NIST records the exact US value as 3.785411784 litres. In the Philippines the unit is most familiar from the blue 5-gallon water container at the refilling station, which holds roughly 19 litres, while fuel and most groceries are sold by the litre."
  },
  {
    "name": "Foot-Pound",
    "symbol": "ft·lb",
    "category": "US Customary / Avoided",
    "description": "A US customary unit of work or energy: a force of one pound-force acting through a distance of one foot.",
    "misconception": "Assuming customary and SI units mix freely. They do not, and unit mismatches have crashed real hardware, most famously the loss of NASA's Mars Climate Orbiter in 1999 to a customary-versus-metric error in spacecraft data.",
    "formalDefinition": "The foot pound-force, symbol $\\text{ft}\\cdot\\text{lbf}$, is a unit of energy or work defined in terms of the joule:\n\n$$1\\text{ ft}\\cdot\\text{lbf} \\approx 1.355818\\text{ J}$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "The foot-pound multiplies a pound-force by a foot of distance to measure work, the customary cousin of the joule. About 1.36 joules make a foot-pound, and NIST publishes the exact conversion for anyone forced to translate. The unit endures in American mechanical specs, like the torque setting stamped on bolts, where it is more properly the pound-foot. Its real lesson is caution: the Mars Climate Orbiter was lost when a contractor reported thruster data in customary units while the navigation software expected SI, a mistake metric-only science is built to avoid."
  },
  {
    "name": "BTU",
    "symbol": "BTU",
    "category": "US Customary / Avoided",
    "description": "British Thermal Unit, the heat needed to raise one pound of water by one degree Fahrenheit. About 1,055 joules.",
    "misconception": "Treating it as a scientific energy unit. It survives in heating and air-conditioning ratings, but research uses joules for thermal energy to keep one consistent standard.",
    "formalDefinition": "The British thermal unit (IT), symbol $\\text{BTU}$, is a non-SI unit of energy defined in terms of the joule:\n\n$$1\\text{ BTU}_{\\text{IT}} \\approx 1055.06\\text{ J}$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "The BTU is the customary counterpart to the calorie, defined on the pound and the Fahrenheit degree, and it clings to one stubborn corner of modern life: heating and cooling. Air conditioner capacities are quoted in BTU per hour, so a small bedroom unit might be rated 9,000 BTU/h and a large room 24,000, even in metric countries. NIST sets one BTU near 1,055 joules. For a Filipino shopping for an aircon, the BTU rating is really a power figure in disguise, telling you how much heat the unit can move."
  },
  {
    "name": "Radian",
    "symbol": "rad",
    "category": "Mathematics / Physics",
    "description": "The natural unit of angle, defined by wrapping a circle's radius along its own circumference. A full circle is 2π radians.",
    "misconception": "Clinging to degrees in advanced work. Radians are the unit that makes calculus and rotational physics come out clean; plug degrees into those formulas and the results are simply wrong.",
    "formalDefinition": "The Radian, symbol $\\text{rad}$, is the SI coherent derived unit of plane angle. It is the angle subtended at the center of a circle by an arc equal in length to the radius:\n\n$$\\theta = \\frac{s}{r}$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Degrees split a circle into 360 arbitrary parts, a number inherited from ancient astronomy, but the radian is defined by the circle itself: lay the radius along the arc and the angle it spans is one radian, about 57.3°. A full turn is 2π radians, roughly 6.28. The BIPM treats it as a coherent derived unit, and it is essential because the tidy results of calculus, like the derivative of sine, hold only when angles are in radians. That is why physics and engineering live in radians."
  },
  {
    "name": "Steradian",
    "symbol": "sr",
    "category": "Mathematics / Optics",
    "description": "The unit of solid angle, the three-dimensional cousin of the radian. A full sphere spans 4π steradians.",
    "misconception": "Finding it too abstract to place. A radian measures a slice of a circle; a steradian measures a cone-shaped patch of a sphere, and the whole sphere holds exactly 4π of them.",
    "formalDefinition": "The Steradian, symbol $\\text{sr}$, is the SI coherent derived unit of solid angle. It is the solid angle subtended at the center of a sphere of radius $r$ by a surface patch of area $r^2$:\n\n$$\\Omega = \\frac{A}{r^2}$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Where the radian measures a flat opening, the steradian measures how much of your full surroundings something covers, like the cone of sky a satellite dish accepts. The whole sphere around a point is 4π steradians, about 12.57. The BIPM lists it as a coherent derived unit, and it shows up wherever spreading in three dimensions matters: the lumen, for instance, is defined as one candela shining into one steradian, which is how total light output is built from intensity in a direction."
  },
  {
    "name": "Katal",
    "symbol": "kat",
    "category": "Biochemistry",
    "description": "The SI derived unit of catalytic activity: a catalyst that converts one mole of substrate per second has an activity of one katal.",
    "misconception": "Assuming it is too niche to be official. The katal is a fully recognized SI derived unit, adopted in 1999 to standardize how enzyme activity is reported.",
    "formalDefinition": "The katal, symbol $\\text{kat}$, is the SI derived unit of catalytic activity:\n\n$$1\\text{ kat} = 1\\text{ mol/s}$$",
    "sources": [SRC.siBrochure, SRC.nistUnits],
    "body": "Enzymes are measured by how fast they drive a reaction, and the katal pins that to the SI: one katal turns over one mole of substrate per second. The BIPM adopted it in 1999 to replace a clutter of older, lab-specific enzyme units. Because a whole mole per second is a furious rate, clinical labs work in microkatals and nanokatals when reporting enzyme levels from a blood test. It is the unit that lets a result from one hospital's analyzer mean the same thing at another's."
  },
  {
    "name": "Centipoise",
    "symbol": "cP",
    "category": "Physics / Fluid Dynamics",
    "description": "A practical unit of dynamic viscosity, a measure of a fluid's thickness. Water at room temperature is conveniently about 1 cP.",
    "misconception": "Confusing viscosity with density. Honey is very viscous but only moderately dense, while mercury is extremely dense yet flows freely. Thickness and heaviness are different properties.",
    "formalDefinition": "The centipoise, symbol $\\text{cP}$, is a CGS-based unit of dynamic viscosity equal in SI to:\n\n$$1\\text{ cP} = 10^{-3}\\text{ Pa}\\cdot\\text{s} = 1\\text{ mPa}\\cdot\\text{s}$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Viscosity measures how much a fluid resists flowing, and the centipoise endures because water lands at almost exactly 1 cP, a built-in reference. From there everything else makes intuitive sense: blood is around 3 to 4 cP, cooking oil tens of cP, and honey thousands. In SI a centipoise is one millipascal-second, which NIST documents. The property is temperature-sensitive, which is why warm honey pours and engine oil flows so much more easily on a hot day than a cold morning."
  },
  {
    "name": "Mach",
    "symbol": "M",
    "category": "Physics / Aviation",
    "description": "A dimensionless ratio of an object's speed to the speed of sound in the surrounding air. Mach 1 is right at the sound barrier.",
    "misconception": "Treating Mach 1 as a fixed speed. The speed of sound drops in colder, thinner air, so Mach 1 is slower high up than at sea level. The same Mach number is a different actual speed at altitude.",
    "formalDefinition": "The Mach number, symbol $\\text{Ma}$ or $M$, is a dimensionless ratio of flow or object speed $v$ to the local speed of sound $a$:\n\n$$\\text{Ma} = \\frac{v}{a}$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Mach is a ratio, not a unit of length over time, which is exactly what makes it useful in aviation: what matters near the sound barrier is your speed relative to how fast sound travels around you, and that depends on air temperature. At sea level sound moves about 1,235 km/h, so Mach 1 is roughly that, but in the cold thin air at cruising altitude it is noticeably less. An airliner cruising near Mach 0.85 is flying just below the speed of sound, where drag stays manageable."
  },
  {
    "name": "Volt-Ampere",
    "symbol": "VA",
    "category": "Electrical Engineering",
    "description": "The unit of apparent power in an AC circuit: voltage times current, before accounting for how well they line up in time.",
    "misconception": "Assuming volt-amperes equal watts. In DC they do, but in AC the voltage and current can fall out of phase, so apparent power (VA) exceeds the real power (W) that does useful work.",
    "formalDefinition": "The volt-ampere, symbol $\\text{VA}$, is the unit of apparent power, the product of RMS voltage and RMS current:\n\n$$S = V_{\\text{rms}} \\cdot I_{\\text{rms}}\\;[\\text{VA}],\\qquad P = S\\cos\\varphi\\;[\\text{W}]$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "In a DC circuit, volts times amps simply gives watts, but AC is trickier because voltage and current can peak at different moments. The volt-ampere tracks that full apparent power, while the watt tracks only the part doing real work, and their ratio is the power factor. This is why a UPS or generator is rated in VA, not watts: it has to supply the whole apparent load. It is also why utilities care about power factor, since a poor one means more current for the same useful output."
  },
  {
    "name": "Pico-",
    "symbol": "p",
    "category": "Metric Prefix",
    "description": "The SI prefix for one trillionth (10⁻¹²), the scale of atoms and the fastest electronics.",
    "misconception": "Struggling to picture the scale. A picometre is smaller than an atom: hydrogen's radius is roughly 53 picometres, so atoms are measured in tens to hundreds of pm.",
    "formalDefinition": "Pico, symbol $\\text{p}$, is the SI prefix denoting a factor of one trillionth:\n\n$$\\text{p} = 10^{-12} = 0.000000000001$$",
    "sources": [SRC.nistPrefixes, SRC.siBrochure],
    "body": "Pico reaches all the way down to atomic dimensions and to the rhythm of cutting-edge electronics. Atomic radii and chemical bond lengths run in the tens to hundreds of picometres, which is why the older angstrom (100 pm) lingers in chemistry. In timing, a picosecond is a trillionth of a second, the scale at which signals race between parts of a fast chip. Capacitors in radio and high-frequency circuits are often just a few picofarads. The BIPM standardizes the lowercase p."
  },
  {
    "name": "Mega-",
    "symbol": "M",
    "category": "Metric Prefix",
    "description": "The SI prefix for one million (10⁶). A megawatt powers a neighborhood; a megahertz is a million cycles per second.",
    "misconception": "Writing mega as a lowercase m, which actually means milli. A MW is a megawatt, enough for a small town; an mW is a milliwatt, the order of a laser pointer. The capital matters.",
    "formalDefinition": "Mega, symbol $\\text{M}$, is the SI prefix denoting a factor of one million:\n\n$$\\text{M} = 10^{6} = 1\\,000\\,000$$",
    "sources": [SRC.nistPrefixes, SRC.siBrochure],
    "body": "Mega is the prefix for things at human-industrial scale. Power plants are rated in megawatts, and a typical Philippine geothermal or coal unit might produce a few hundred MW to feed the grid. The BIPM assigns it the capital M, which is the whole point of the misconception warning, since lowercase m is milli and the two differ by a factor of a billion. You also meet mega in everyday speech through megabytes and megapixels, where it keeps its million."
  },
  {
    "name": "Giga-",
    "symbol": "G",
    "category": "Metric Prefix",
    "description": "The SI prefix for one billion (10⁹). It shows up in processor speeds, network rates, and grid-scale power.",
    "misconception": "Linking giga only to computer storage. Beyond gigabytes, it measures gigahertz processor clocks, gigawatts of power output, and gigapascals of pressure deep in the Earth.",
    "formalDefinition": "Giga, symbol $\\text{G}$, is the SI prefix denoting a factor of one billion:\n\n$$\\text{G} = 10^{9} = 1\\,000\\,000\\,000$$",
    "sources": [SRC.nistPrefixes, SRC.siBrochure],
    "body": "Giga is the prefix of the digital age, but it ranges well past storage. A phone's processor ticks at a few gigahertz, billions of cycles per second, and broadband is sold in gigabits per second. At larger scales, the entire Luzon grid's peak demand runs to several gigawatts, and pressures inside the Earth reach gigapascals. The BIPM uses the capital G. Each top-tier SI prefix steps up by a thousand, so giga is a thousand mega, and the ladder keeps climbing to tera and beyond."
  },
  {
    "name": "Angstrom",
    "symbol": "Å",
    "category": "Chemistry / Physics",
    "description": "A non-SI length of 10⁻¹⁰ metres, the convenient scale of atoms and chemical bonds.",
    "misconception": "Forgetting it is not an SI prefix unit. Ten angstroms make one nanometre, so an O–H bond of about 1 Å is 0.1 nm, a conversion easy to fumble.",
    "formalDefinition": "The angstrom, symbol $\\text{Å}$, is a non-SI unit of length:\n\n$$1\\text{ Å} = 10^{-10}\\text{ m} = 0.1\\text{ nm} = 100\\text{ pm}$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Named for Anders Ångström, an early spectroscopist, the angstrom persists because atomic sizes land so neatly on it: most atoms are 1 to 3 Å across and typical chemical bonds about 1 to 2 Å long. The BIPM does not include it in the SI, and NIST encourages nanometres or picometres instead, but it is too entrenched in crystallography and chemistry to vanish. Ten angstroms equal one nanometre, the single conversion worth memorizing so a bond length never lands a factor of ten off."
  },
  {
    "name": "Barn",
    "symbol": "b",
    "category": "Nuclear Physics",
    "description": "A tiny unit of area, 10⁻²⁸ m², used for the cross-sections that describe how likely particles are to interact with a nucleus.",
    "misconception": "Missing the joke in the name. It comes from \"big as a barn,\" wry irony for an area this small, underscoring how minuscule a nuclear target really is.",
    "formalDefinition": "The barn, symbol $\\text{b}$, is a non-SI unit of area used in nuclear and particle physics:\n\n$$1\\text{ b} = 10^{-28}\\text{ m}^2 = 100\\text{ fm}^2$$",
    "sources": [SRC.nistSP811, SRC.nistConstants],
    "body": "A cross-section is the effective target area a nucleus presents to an incoming particle, a stand-in for how probable an interaction is. The barn, about the geometric size of a uranium nucleus, became the working unit, and physicists named it tongue-in-cheek: hitting a nucleus is so hard that landing one felt like hitting the broad side of a barn. NIST lists it among accepted non-SI units. Reaction probabilities span a huge range, so you also see millibarns and microbarns at particle accelerators."
  },
  {
    "name": "Pound-Force",
    "symbol": "lbf",
    "category": "US Customary / Avoided",
    "description": "The US customary unit of force: the gravitational pull on one pound of mass at standard gravity, about 4.45 newtons.",
    "misconception": "Blurring pound-force with the pound of mass. The pound (lb) is mass; the pound-force (lbf) is the weight that mass has under standard gravity. Keeping them apart avoids real engineering errors.",
    "formalDefinition": "The pound-force, symbol $\\text{lbf}$, is a US customary unit of force defined exactly via the kilogram and standard gravity:\n\n$$1\\text{ lbf} = 4.4482216152605\\text{ N}\\;(\\text{exact})$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "The pound-force exists to settle the pound's identity crisis: it is specifically the force of standard gravity acting on one pound of mass, which NIST fixes at exactly 4.448 newtons. Engineers in customary systems use it for thrust, tension, and load, so a rocket engine's push might be quoted in thousands of pounds-force. The clean lesson for science students is that force and mass are different quantities, and pairing the pound (mass) with the pound-force (force) keeps that distinction explicit rather than hidden in a single word."
  },
  {
    "name": "Atmosphere",
    "symbol": "atm",
    "category": "Chemistry / Earth Science",
    "description": "A non-SI pressure unit defined as exactly 101,325 pascals, set near average sea-level air pressure.",
    "misconception": "Thinking sea-level pressure is constant. The standard atmosphere is a fixed reference, but actual air pressure shifts with weather and altitude, which is exactly what barometers track for forecasts.",
    "formalDefinition": "The standard atmosphere, symbol $\\text{atm}$, is a non-SI unit of pressure defined exactly as:\n\n$$1\\text{ atm} = 101\\,325\\text{ Pa} = 1013.25\\text{ hPa}$$",
    "sources": [SRC.nistSP811, SRC.siBrochure],
    "body": "The atmosphere was chosen to sit at roughly the air pressure we live under at sea level, which makes it an intuitive reference in chemistry and diving. It is now fixed exactly at 101,325 Pa, so it is a defined constant, not the literal pressure outside on any given day. Real pressure changes with weather, and it falls with height: atop a mountain there is noticeably less than one atmosphere. Underwater the opposite happens, with pressure rising by about one atmosphere for every ten metres of depth a diver descends."
  },
  {
    "name": "Torr",
    "symbol": "Torr",
    "category": "Chemistry",
    "description": "A pressure unit equal to 1/760 of a standard atmosphere, about 133.3 pascals. Common in vacuum work.",
    "misconception": "Treating the torr as identical to the millimetre of mercury. They were defined to be nearly equal and differ only minutely, but they come from different definitions, so they are not exactly the same.",
    "formalDefinition": "The torr, symbol $\\text{Torr}$, is a non-SI unit of pressure defined as one 760th of a standard atmosphere:\n\n$$1\\text{ Torr} = \\frac{1}{760}\\text{ atm} \\approx 133.322\\text{ Pa}$$",
    "sources": [SRC.nistSP811, SRC.siBrochure],
    "body": "Named for Evangelista Torricelli, who built the first mercury barometer, the torr is defined as exactly one 760th of a standard atmosphere, since 760 mm of mercury was the classic measure of sea-level pressure. It is the everyday unit of vacuum science: a rough vacuum pump pulls down to a few torr, and high-vacuum systems reach billionths of a torr. The torr and the millimetre of mercury agree to better than a part in a million, close enough that the two are used interchangeably in practice but not by definition."
  },
  {
    "name": "Millimeters of Mercury",
    "symbol": "mmHg",
    "category": "Medicine / Biology",
    "description": "A pressure unit based on the height of a mercury column. It is the worldwide standard for reporting blood pressure.",
    "misconception": "Forgetting it is literally a height. One mmHg is the pressure that lifts a mercury column one millimetre, a holdover from the original mercury sphygmomanometers and barometers.",
    "formalDefinition": "The millimetre of mercury, symbol $\\text{mmHg}$, is a non-SI unit of pressure approximately equal to:\n\n$$1\\text{ mmHg} \\approx 133.322\\text{ Pa} \\approx 1\\text{ Torr}$$",
    "sources": [SRC.nhlbiBp, SRC.nistSP811],
    "body": "The unit comes straight from the old mercury manometer, where pressure was read off as the height a mercury column rose. Medicine kept it even after mercury devices faded, which is why a clinic reports blood pressure as two numbers in mmHg, the systolic over the diastolic. The NHLBI uses 120/80 mmHg as the normal benchmark, with readings consistently at or above 130/80 flagged as high. One mmHg is about 133 pascals and effectively equal to a torr, the two differing only in the sixth digit."
  },
  {
    "name": "Poise",
    "symbol": "P",
    "category": "Physics / Fluid Dynamics",
    "description": "The CGS unit of dynamic viscosity. It is large for everyday liquids, so the centipoise (1/100 P) is used far more often.",
    "misconception": "Tying viscosity to density. A dense liquid can flow easily and a light one can be sticky; viscosity is about internal resistance to flow, not how much mass is packed in.",
    "formalDefinition": "The poise, symbol $\\text{P}$, is the CGS unit of dynamic viscosity, equal in SI to:\n\n$$1\\text{ P} = 0.1\\text{ Pa}\\cdot\\text{s} = 100\\text{ cP}$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Named for the physician Jean Léonard Marie Poiseuille, who studied blood flow in narrow tubes, the poise is the older CGS measure of how stiffly a fluid resists shearing. It is inconveniently large for common liquids, since water is only 0.01 poise, so chemistry and engineering almost always use the centipoise, where water reads a tidy 1 cP. In SI a poise is a tenth of a pascal-second, the conversion NIST documents. Poiseuille's law, which it underpins, still describes flow through pipes and blood vessels alike."
  },
  {
    "name": "Jansky",
    "symbol": "Jy",
    "category": "Astronomy",
    "description": "A non-SI unit of spectral flux density used in radio astronomy: a measure of how much radio energy from the sky lands per area, per frequency band.",
    "misconception": "Underrating how faint these signals are. One jansky is 10⁻²⁶ watts per square metre per hertz, so the cosmic radio sources astronomers study deliver almost unimaginably little power to a dish.",
    "formalDefinition": "The jansky, symbol $\\text{Jy}$, is a non-SI unit of spectral flux density:\n\n$$1\\text{ Jy} = 10^{-26}\\text{ W}\\,\\text{m}^{-2}\\,\\text{Hz}^{-1}$$",
    "sources": [SRC.nistSP811, SRC.iau],
    "body": "Named for Karl Jansky, who discovered radio waves coming from the Milky Way in 1933 and effectively founded radio astronomy, the jansky measures the trickle of radio energy reaching us from space. The faintness is the point: bright radio sources register a few janskys, while the targets of deep surveys are measured in millijanskys and microjanskys. Catching them requires enormous dishes and arrays, since each antenna gathers such a vanishingly small flux that astronomers combine many to build a usable signal."
  },
  {
    "name": "Curie",
    "symbol": "Ci",
    "category": "Nuclear Physics / Avoided",
    "description": "An older unit of radioactivity, originally tied to one gram of radium-226. It is a very large amount of decay, now replaced by the becquerel.",
    "misconception": "Confusing it with the modern becquerel. One curie is 37 billion decays per second, an enormous activity, so doses today are in becquerels or sensible fractions of a curie.",
    "formalDefinition": "The curie, symbol $\\text{Ci}$, is a non-SI unit of radioactivity defined exactly in terms of the becquerel:\n\n$$1\\text{ Ci} = 3.7 \\times 10^{10}\\text{ Bq}\\;(\\text{exact})$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Named for Marie and Pierre Curie, the unit was originally set to the activity of one gram of radium-226 and survives mainly in older texts and parts of the nuclear and medical industries. It is huge: 37 billion decays every second, which is why practical sources are described in millicuries and microcuries. The SI replaced it with the becquerel, one decay per second, and NIST publishes the exact link. Seeing curies in a document is usually a sign of an older source or an American industrial context."
  },
  {
    "name": "Roentgen",
    "symbol": "R",
    "category": "Nuclear Physics / Avoided",
    "description": "A legacy unit for radiation exposure from X-rays and gamma rays, measured by the ionization they cause in air.",
    "misconception": "Reading it as absorbed or biological dose. The roentgen measures ionization in air, not energy absorbed by tissue, so it is not interchangeable with the gray or the sievert.",
    "formalDefinition": "The roentgen, symbol $\\text{R}$, is a legacy non-SI unit of X-ray and gamma-ray exposure (ionization in air):\n\n$$1\\text{ R} = 2.58 \\times 10^{-4}\\text{ C/kg}\\;(\\text{exact})$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Named for Wilhelm Röntgen, who discovered X-rays, the roentgen quantifies exposure by the charge that radiation liberates in a known mass of air, defined exactly as 2.58 × 10⁻⁴ coulombs per kilogram. It has been superseded by the gray for absorbed dose and the sievert for biological effect, which describe what radiation does to matter and to people far better. The unit re-entered pop culture through the Chernobyl series and its grim line about readings, a reminder of why clear, modern dose units matter."
  },
  {
    "name": "Milliampere-Hour",
    "symbol": "mAh",
    "category": "Electricity",
    "description": "A unit of electric charge used to rate battery capacity: a current of one milliampere sustained for one hour.",
    "misconception": "Reading mAh as energy. It is charge, not energy. A 5,000 mAh rating tells you the charge, but without the voltage you cannot know the stored energy in joules or watt-hours.",
    "formalDefinition": "The milliampere-hour, symbol $\\text{mAh}$, is a unit of electric charge equal to:\n\n$$1\\text{ mAh} = 3.6\\text{ C};\\qquad \\text{energy} = \\text{mAh} \\times V$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Battery makers quote capacity in mAh because it directly answers a practical question: how long will this last. A 5,000 mAh power bank can in principle deliver 500 mA for ten hours, or 1,000 mA for five. The subtlety students miss is that mAh is charge, so comparing batteries fairly means also knowing the voltage, since energy is charge times voltage. That is why a 5,000 mAh phone cell and a 5,000 mAh power bank at a different voltage do not hold the same energy in watt-hours."
  },
  {
    "name": "Kilowatt-Hour",
    "symbol": "kWh",
    "category": "Electricity",
    "description": "The unit on your electricity bill: the energy used by a one-kilowatt load running for one hour, equal to 3.6 million joules.",
    "misconception": "Seeing \"watt\" and assuming it is power. A kilowatt-hour is energy, power multiplied by time. The kilowatt is the rate; the hour turns it into a total amount of energy delivered.",
    "formalDefinition": "The kilowatt-hour, symbol $\\text{kWh}$, is a unit of energy equal to one kilowatt of power sustained for one hour:\n\n$$1\\text{ kWh} = 3.6 \\times 10^6\\text{ J} = 3.6\\text{ MJ}$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "The kilowatt-hour is how utilities sell energy, because joules are too small to bill conveniently. One kWh equals 3.6 million joules, and it maps neatly to appliances: a 1,000 W aircon running an hour uses 1 kWh, while a 10 W phone charger would need a hundred hours to do the same. This is why your Meralco bill multiplies kWh consumed by a per-kWh rate, and why energy-efficient appliances, drawing fewer watts for the same job, quietly shrink that monthly number."
  },
  {
    "name": "Electron",
    "symbol": "e⁻",
    "category": "Chemistry",
    "description": "A fundamental particle whose charge, the elementary charge of about 1.602 × 10⁻¹⁹ coulombs, serves as a natural unit of charge in physics.",
    "misconception": "Missing that charge comes in fixed lumps. You can never have a fraction of an electron's charge; all free charge is a whole-number multiple of this elementary unit.",
    "formalDefinition": "The elementary charge, symbol $e$, is the magnitude of the electron's electric charge, fixed exactly since 2019:\n\n$$e = 1.602176634 \\times 10^{-19}\\text{ C}$$",
    "sources": [SRC.nistValE, SRC.cgpm2018],
    "body": "The electron's charge is so important that the 2019 SI redefinition fixed it exactly, at 1.602 176 634 × 10⁻¹⁹ coulombs, and then built the ampere from it. Charge is quantized, meaning it only ever appears in whole multiples of this value, a fact Millikan's famous oil-drop experiment first nailed down. As a unit of charge, the elementary charge underlies the electronvolt and the counting definition of the ampere, which is how a property of a single particle ends up anchoring the entire system of electrical units."
  },
  {
    "name": "Speed of Light",
    "symbol": "c",
    "category": "Physics / Relativity",
    "description": "A fundamental constant, exactly 299,792,458 metres per second in vacuum. It doubles as the natural unit of speed in relativity.",
    "misconception": "Imagining c can be exceeded. Relativity makes it the universal speed limit for matter, energy, and information; nothing carrying a signal can outrun it.",
    "formalDefinition": "The speed of light in vacuum, symbol $c$, is a fixed fundamental constant that also defines the metre:\n\n$$c = 299\\,792\\,458\\text{ m/s}\\;(\\text{exact})$$",
    "sources": [SRC.nistValC, SRC.siBrochure],
    "body": "Light's speed in vacuum is not measured anymore; it is defined, fixed at exactly 299,792,458 m/s, and the metre is built from it. In relativity, c sets the cosmic speed limit and links mass to energy through E = mc². The number is finite but vast: light circles the Earth about seven and a half times a second, yet still takes 8 minutes from the Sun and years from the nearest stars. Physicists often measure speeds as fractions of c, where 0.1c already means moving at a tenth of light speed."
  },
  {
    "name": "Planck Length",
    "symbol": "ℓP",
    "category": "Quantum Physics",
    "description": "The fundamental length in the system of Planck units, about 1.616 × 10⁻³⁵ metres, built from the constants G, ℏ, and c.",
    "misconception": "Calling it the \"pixel size\" of the universe. It is not a confirmed smallest distance; rather, it marks the scale where current physics is expected to break down without a theory of quantum gravity.",
    "formalDefinition": "The Planck length, symbol $\\ell_P$, is a natural unit of length built from fundamental constants:\n\n$$\\ell_P = \\sqrt{\\frac{\\hbar G}{c^3}} \\approx 1.616255 \\times 10^{-35}\\text{ m}$$",
    "sources": [SRC.nistConstants, SRC.nistValC],
    "body": "The Planck length comes from combining the gravitational constant, the reduced Planck constant, and the speed of light into something with units of length, and it lands at an almost incomprehensible 10⁻³⁵ metres, about 10²⁰ times smaller than a proton. NIST lists the Planck units among its constants. Physicists treat it as the rough scale where quantum effects and gravity should both matter at once, so a working theory of quantum gravity is expected before any claim about distances this small can be tested."
  },
  {
    "name": "Bit",
    "symbol": "b",
    "category": "Computer Science",
    "description": "The most basic unit of information: a single binary choice, 0 or 1, yes or no.",
    "misconception": "Mixing up bits and bytes in speeds. Internet rates are usually in megabits per second (Mbps) while file sizes are in megabytes (MB), and a byte is eight bits, so divide Mbps by eight to estimate download speed.",
    "formalDefinition": "The bit, symbol $\\text{b}$, is the basic unit of information in computing and digital communications. It is the information capacity of a binary digit with two possible states, $0$ or $1$.",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "The bit is the atom of information, a single yes-or-no, and Claude Shannon's information theory showed how everything digital builds from it. Physically a bit is just a distinguishable two-state thing: a voltage high or low, a magnetic patch one way or the other, a pit or no pit on a disc. The lowercase b for bit versus capital B for byte is the source of endless confusion in internet plans, where a 100 Mbps connection delivers about 12.5 megabytes per second of actual downloads."
  },
  {
    "name": "Byte",
    "symbol": "B",
    "category": "Computer Science",
    "description": "A group of eight bits, the standard chunk computers address at once. One byte can hold a single character of text.",
    "misconception": "Assuming a kilobyte is exactly 1,000 bytes. Because computers count in binary, the traditional kilobyte is 1,024 bytes (2¹⁰); the strict 1,000-byte version is the kilobyte (kB), and 1,024 is the kibibyte (KiB).",
    "formalDefinition": "The byte, symbol $\\text{B}$, is a unit of digital information consisting of eight bits, the smallest addressable unit of memory in most architectures:\n\n$$1\\text{ B} = 8\\text{ b}$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "A byte settled at eight bits in the 1960s with the IBM System/360, after earlier machines tried 6-bit and 9-bit groupings, and eight bits is enough for 256 distinct values, which covers the basic ASCII character set. That is why a byte historically meant one letter of text. The lingering confusion is the binary-versus-decimal kilobyte: storage marketers use 1,000-based units while operating systems often count in 1,024, which is why a \"500 GB\" drive shows up as somewhat less once your computer measures it."
  },
  {
    "name": "FLOPS",
    "symbol": "FLOPS",
    "category": "Computer Science",
    "description": "Floating-point operations per second: how many real-number calculations a processor completes each second. The standard measure of computing horsepower.",
    "misconception": "Confusing FLOPS with clock speed in hertz. Hertz counts how fast a chip ticks; FLOPS counts how much actual math it finishes, and a higher clock does not always mean more useful work.",
    "formalDefinition": "FLOPS is a performance rate, the number of floating-point arithmetic operations executed per second:\n\n$$\\text{FLOPS} = \\frac{\\text{floating-point operations}}{\\text{second}}$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "FLOPS measures the real workhorse capability of a processor, its ability to crunch decimal arithmetic, which is what scientific simulation, graphics, and AI training all demand. The scale has exploded: a phone manages billions of operations per second (gigaFLOPS), a good graphics card reaches teraFLOPS, and the fastest supercomputers now hit the exaFLOPS range, a quintillion operations per second. It is a far better gauge of number-crunching power than clock speed, since modern chips do many operations in parallel during each tick."
  },
  {
    "name": "Pixel",
    "symbol": "px",
    "category": "Computer Science / Graphics",
    "description": "The smallest controllable dot in a digital image. Short for \"picture element.\"",
    "misconception": "Assuming a pixel has a fixed physical size. A pixel on a stadium screen is the size of your fist, while one on a phone is microscopic. What matters is pixel density, the dots packed per inch.",
    "formalDefinition": "The pixel, symbol $\\text{px}$, is the smallest addressable element of a raster image or display. It denotes a count of picture elements rather than a fixed physical length.",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "A pixel is one controllable dot of color, and an image or screen is a grid of them, so a 1920 by 1080 display holds about two million. The point students miss is that a pixel is a count, not a length: the same pixel count looks razor-sharp on a small phone and blocky on a giant billboard, because what your eye judges is density, pixels per inch. On screens each pixel is usually three tiny subpixels (red, green, blue) whose brightness blends into the color you actually see."
  },
  {
    "name": "Baud",
    "symbol": "Bd",
    "category": "Computer Science / Telecommunications",
    "description": "The symbol rate of a communication channel: how many signal changes, or symbols, are sent per second.",
    "misconception": "Equating baud with bits per second. If each symbol encodes several bits, the bit rate is higher than the baud rate. A 1,000 Bd link carrying 4 bits per symbol moves 4,000 bits per second.",
    "formalDefinition": "The baud, symbol $\\text{Bd}$, is the unit of symbol rate, the number of signalling events (symbols) per second:\n\n$$\\text{bit rate} = \\text{baud} \\times \\log_2 M$$",
    "sources": [SRC.nistSP811, SRC.nistUnits],
    "body": "Named for telegraph pioneer Émile Baudot, the baud counts how many distinct signal states a channel sends each second, which is not the same as bits per second. Modern modems pack many bits into each symbol using clever modulation, so the bit rate can be many times the baud rate. Old dial-up modems were rated around a few thousand baud, and the distinction still matters to engineers designing everything from fiber links to the radio in your phone, where squeezing more bits per symbol is how data rates keep climbing."
  }
];
