export interface ScientificUnit {
  name: string;
  symbol: string;
  category: string;
  description: string;
  misconception: string | null;
  formalDefinition: string;
  sources: string[];
  body: string;
}

export const scientificUnits: ScientificUnit[] = [
  {
    "name": "Meter",
    "symbol": "m",
    "category": "Physics / Base SI",
    "description": "The base unit of length and distance in the metric system.",
    "misconception": "Students often confuse distance (total ground covered) with displacement (straight-line distance from start to finish).",
    "formalDefinition": "The meter, symbol $\\text{m}$, is the SI unit of length. It is defined by taking the fixed numerical value of the speed of light in vacuum $c$ to be $299\\,792\\,458$ when expressed in the unit $\\text{m s}^{-1}$, where the second is defined in terms of the cesium frequency $\\Delta\\nu_{\\text{Cs}}$.",
    "sources": [
      "BIPM SI Brochure (9th Edition, 2019)",
      "NIST Special Publication 330 (2019)"
    ],
    "body": "The meter was originally defined in 1791 by the French Academy of Sciences as one ten-millionth of the distance from the equator to the North Pole through Paris. In 1889, a physical prototype bar of platinum-iridium was established as the standard. The definition was updated in 1960 using light wavelengths from krypton-86, and finally in 1983 to its current form, anchoring it to the universal constant speed of light, making the standard immutable and reproducible anywhere in the universe."
  },
  {
    "name": "Kilogram",
    "symbol": "kg",
    "category": "Physics / Base SI",
    "description": "The base unit of mass, which measures the amount of matter in an object.",
    "misconception": "Mass is constantly confused with Weight. Mass (kg) never changes; Weight (Newtons) depends on gravity.",
    "formalDefinition": "The kilogram, symbol $\\text{kg}$, is the SI unit of mass. It is defined by taking the fixed numerical value of the Planck constant $h$ to be $6.62607015 \\times 10^{-34}$ when expressed in the unit $\\text{J s}$, which is equal to $\\text{kg m}^2 \\text{s}^{-1}$, where the meter and the second are defined in terms of $c$ and $\\Delta\\nu_{\\text{Cs}}$.",
    "sources": [
      "BIPM Resolution 1 of the 26th CGPM (2018)",
      "NIST Reference on Mass & Planck Constant"
    ],
    "body": "For 130 years, the kilogram was defined by a physical cylinder of platinum-iridium kept in a vault in Sèvres, France, known as the International Prototype of the Kilogram (IPK). Because the physical cylinder's mass drifted over time, the scientific community voted in 2018 to redefine it in terms of the quantum mechanical Planck constant using a Kibble balance. This landmark shift ensures the unit of mass remains constant forever."
  },
  {
    "name": "Second",
    "symbol": "s",
    "category": "Physics / Base SI",
    "description": "The base unit of time. Currently defined by the radiation cycles of a Cesium-133 atom.",
    "misconception": "Students struggle with standardizing time in calculations, often leaving minutes or hours in equations that require seconds.",
    "formalDefinition": "The second, symbol $\\text{s}$, is the SI unit of time. It is defined by taking the fixed numerical value of the cesium frequency $\\Delta\\nu_{\\text{Cs}}$, the unperturbed ground-state hyperfine transition frequency of the cesium-133 atom, to be $9\\,192\\,631\\,770$ when expressed in the unit $\\text{Hz}$, which is equal to $\\text{s}^{-1}$.",
    "sources": [
      "BIPM SI Brochure (9th Edition, 2019)",
      "NIST Time and Frequency Division Standards"
    ],
    "body": "Historically defined as $1/86\\,400$ of a mean solar day, the second's astronomical definition was abandoned because Earth's rotation is slowing down. In 1967, scientists adopted the atomic definition based on the quantum transitions of cesium-133. Atomic clocks utilizing this definition are so accurate they will not gain or lose a single second in hundreds of millions of years."
  },
  {
    "name": "Ampere",
    "symbol": "A",
    "category": "Physics / Base SI",
    "description": "The base unit of electric current, measuring the flow rate of electrical charge (electrons) through a wire.",
    "misconception": "Students view current as \"using up\" electricity. Current doesn't get consumed; it flows in a complete circuit.",
    "formalDefinition": "The ampere, symbol $\\text{A}$, is the SI unit of electric current. It is defined by taking the fixed numerical value of the elementary charge $e$ to be $1.602176634 \\times 10^{-19}$ when expressed in the unit $\\text{C}$, which is equal to $\\text{A s}$, where the second is defined in terms of $\\Delta\\nu_{\\text{Cs}}$.",
    "sources": [
      "BIPM Resolution 1 of the 26th CGPM (2018)",
      "IEEE Standard Dictionary of Electrical and Electronics Terms"
    ],
    "body": "Previously defined in terms of the electromagnetic force between two parallel current-carrying wires, the ampere was redefined in 2019. The modern definition measures current by counting individual electrons passing through a boundary per unit time, connecting the unit directly to the fundamental quantity of electrical charge."
  },
  {
    "name": "Kelvin",
    "symbol": "K",
    "category": "Physics / Base SI",
    "description": "The absolute scale for thermodynamic temperature, starting at Absolute Zero.",
    "misconception": "Written as \"Degrees Kelvin\" (°K). Unlike Celsius, Kelvin is absolute, so it is just \"Kelvins\".",
    "formalDefinition": "The kelvin, symbol $\\text{K}$, is the SI unit of thermodynamic temperature. It is defined by taking the fixed numerical value of the Boltzmann constant $k$ to be $1.380649 \\times 10^{-23}$ when expressed in the unit $\\text{J K}^{-1}$, which is equal to $\\text{kg m}^2 \\text{s}^{-2} \\text{K}^{-1}$, where the kilogram, meter and second are defined in terms of $h$, $c$ and $\\Delta\\nu_{\\text{Cs}}$.",
    "sources": [
      "BIPM Resolution 1 of the 26th CGPM (2018)",
      "NIST Reference on Temperature & Boltzmann Constant"
    ],
    "body": "Named after Lord Kelvin, who wrote of the need for an absolute thermodynamic scale, the Kelvin scale starts at Absolute Zero (the theoretical point where all molecular motion ceases). The kelvin was historically defined by the triple point of water ($273.16\\text{ K}$), but was redefined in 2019 to link temperature directly to the average thermal energy of particles via the Boltzmann constant."
  },
  {
    "name": "Mole",
    "symbol": "mol",
    "category": "Chemistry / Base SI",
    "description": "A specific number used to count atoms. Exactly 6.022 × 10²³ particles (Avogadro's number).",
    "misconception": "Struggling with the scale. A mole of water easily fits inside a tiny shot glass, but a mole of basketballs is the size of Earth.",
    "formalDefinition": "The mole, symbol $\\text{mol}$, is the SI unit of amount of substance. One mole contains exactly $6.02214076 \\times 10^{23}$ elementary entities. This number is the fixed numerical value of the Avogadro constant $N_{\\text{A}}$ when expressed in the unit $\\text{mol}^{-1}$ and is called the Avogadro number.",
    "sources": [
      "BIPM Resolution 1 of the 26th CGPM (2018)",
      "IUPAC Gold Book (Compendium of Chemical Terminology)"
    ],
    "body": "The mole provides a bridge between the submicroscopic world of atoms and molecules and the macroscopic world we can measure in the laboratory. Originally defined in terms of the number of atoms in 12 grams of carbon-12, the mole is now defined as a precise, count-based value, making chemical calculations independent of mass standards."
  },
  {
    "name": "Candela",
    "symbol": "cd",
    "category": "Physics / Base SI",
    "description": "The base unit of luminous intensity, measuring how bright a light source appears to the human eye.",
    "misconception": "Often confused with Watts. Watts measure absolute power output, while Candelas measure perceived brightness based on human vision.",
    "formalDefinition": "The candela, symbol $\\text{cd}$, is the SI unit of luminous intensity in a given direction. It is defined by taking the fixed numerical value of the luminous efficacy of monochromatic radiation of frequency $540 \\times 10^{12} \\text{ Hz}$, $K_{\\text{cd}}$, to be $683$ when expressed in the unit $\\text{lm W}^{-1}$, which is equal to $\\text{cd sr W}^{-1}$ or $\\text{cd sr kg}^{-1} \\text{m}^{-2} \\text{s}^3$.",
    "sources": [
      "BIPM SI Brochure (9th Edition, 2019)",
      "CIE (International Commission on Illumination) Standards"
    ],
    "body": "The candela measures the perceived power of light emitted by a source in a particular direction, weighted by the human eye's sensitivity to different wavelengths (peaking in the green spectrum at $540 \\times 10^{12}\\text{ Hz}$). Historically based on the light emitted by a standard candle, the candela is now tied to physical radiation power."
  },
  {
    "name": "Meter per Second",
    "symbol": "m/s",
    "category": "Physics / Kinematics",
    "description": "The standard unit for speed and velocity. Walking at 1 m/s is a brisk pace.",
    "misconception": "Speed and Velocity used interchangeably. Speed is scalar; Velocity is a vector (includes direction).",
    "formalDefinition": "Derived scientific unit representing standard ratio or product coordinates: $m/s$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "The standard unit for speed and velocity. Walking at 1 m/s is a brisk pace. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Meter per Second Squared",
    "symbol": "m/s²",
    "category": "Physics / Kinematics",
    "description": "The unit of acceleration, measuring how much velocity changes every second.",
    "misconception": "Assuming moving fast means high acceleration. An airplane flying steadily at 900 km/h has zero acceleration.",
    "formalDefinition": "Derived scientific unit representing standard ratio or product coordinates: $m/s²$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "The unit of acceleration, measuring how much velocity changes every second. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Newton",
    "symbol": "N",
    "category": "Physics / Dynamics",
    "description": "The standard unit of force, representing the push or pull on an object.",
    "misconception": "Using kilograms to describe gravity's pull. Weight is a force and must be measured in Newtons.",
    "formalDefinition": "The Newton, symbol $\\text{N}$, is the SI derived unit of force. It is defined as the force required to accelerate a mass of one kilogram at a rate of one meter per second squared:\n\n$$1\\text{ N} = 1\\text{ kg}\\cdot\\text{m/s}^2$$",
    "sources": [
      "BIPM SI Brochure",
      "Newton's Laws of Motion (Principia Mathematica)"
    ],
    "body": "Named after Sir Isaac Newton in honor of his work in classical mechanics, this unit quantifies physical interactions. Under Earth's gravity, a medium-sized apple exerts about 1 Newton of downward force on your hand ($w = m \\cdot g \\approx 0.1\\text{ kg} \\times 9.8\\text{ m/s}^2 \\approx 1\\text{ N}$)."
  },
  {
    "name": "Joule",
    "symbol": "J",
    "category": "Physics / Energy",
    "description": "The standard unit of energy or work. Lifting a small apple one meter straight up requires one Joule.",
    "misconception": "Conflating Energy and Power. A Joule is an absolute amount; a Watt is how fast you use it.",
    "formalDefinition": "The Joule, symbol $\\text{J}$, is the SI derived unit of energy, work, or heat. It is defined as the work done by a force of one newton moving its point of application one meter in the direction of the force:\n\n$$1\\text{ J} = 1\\text{ N}\\cdot\\text{m} = 1\\text{ kg}\\cdot\\text{m}^2\\text{/s}^2$$",
    "sources": [
      "BIPM SI Brochure",
      "ISO 80000-5 (Quantities and units - Thermodynamics)"
    ],
    "body": "Named after James Prescott Joule, who demonstrated the mechanical equivalent of heat, the Joule represents a fundamental quantity of energy. For example, lifting a small apple ($100\\text{ g}$) one meter high requires one Joule of work. A typical active human body requires about $8.7 \\times 10^6\\text{ Joules}$ (approx 2000 Calories) of dietary energy per day."
  },
  {
    "name": "Watt",
    "symbol": "W",
    "category": "Physics / Energy",
    "description": "The unit of power, measuring the rate of energy transfer (1 Watt = 1 Joule/second).",
    "misconception": "Thought of only as \"electricity\". Watts measure any power, including mechanical or biological power.",
    "formalDefinition": "The Watt, symbol $\\text{W}$, is the SI derived unit of power, representing the rate of energy transfer or work done per unit time, equivalent to one joule per second:\n\n$$1\\text{ W} = 1\\text{ J/s} = 1\\text{ kg}\\cdot\\text{m}^2\\text{/s}^3$$",
    "sources": [
      "BIPM SI Brochure",
      "ISO 80000-3 (Quantities and units - Space and time)"
    ],
    "body": "Named after James Watt for his improvements to the steam engine, the Watt measures power output. Power represents how *fast* energy is consumed or generated. A standard LED bulb uses $8$ to $12$ Watts of electrical power, while a human running at a steady pace generates about $100$ to $200$ Watts of mechanical power."
  },
  {
    "name": "Pascal",
    "symbol": "Pa",
    "category": "Physics / Earth Science",
    "description": "The standard unit of pressure, equal to one Newton of force spread evenly over one square meter.",
    "misconception": "Confusing Pressure with Force. A sharp needle requires little Force to create massive Pressure.",
    "formalDefinition": "The Pascal, symbol $\\text{Pa}$, is the SI derived unit of pressure or stress. It is equal to one newton of force spread uniformly over one square meter:\n\n$$1\\text{ Pa} = 1\\text{ N/m}^2 = 1\\text{ kg}/(\\text{m}\\cdot\\text{s}^2)$$",
    "sources": [
      "BIPM SI Brochure",
      "ISO 80000-4 (Quantities and units - Mechanics)"
    ],
    "body": "Named after Blaise Pascal, who investigated fluid mechanics and atmospheric pressure, the Pascal is a very small unit. A single sheet of printer paper lying flat on a table exerts about $1\\text{ Pa}$ of pressure. Therefore, atmospheric pressure is typically measured in kilopascals ($1\\text{ atm} = 101.3\\text{ kPa}$)."
  },
  {
    "name": "Hertz",
    "symbol": "Hz",
    "category": "Physics / Waves",
    "description": "The unit of frequency, measuring the number of cycles or waves that happen in exactly one second.",
    "misconception": "Confusing frequency with wave speed. Hertz is how often waves hit the shore, not how fast they travel.",
    "formalDefinition": "The Hertz, symbol $\\text{Hz}$, is the SI derived unit of frequency, defined as the number of cycles or occurrences per second of a periodic phenomenon:\n\n$$1\\text{ Hz} = 1\\text{/s}$$",
    "sources": [
      "BIPM SI Brochure",
      "IEC 60027 (Letter symbols to be used in electrical technology)"
    ],
    "body": "Named after Heinrich Hertz, who proved the existence of electromagnetic waves, the hertz is used to describe periodic events. Humans can hear sounds ranging from $20\\text{ Hz}$ up to $20\\text{ kHz}$. Computer processors operate at gigahertz speeds, performing billions of clock cycles every second."
  },
  {
    "name": "Newton Meter",
    "symbol": "N·m",
    "category": "Physics / Mechanics",
    "description": "The unit of torque, measuring the rotational force applied around an axis or fulcrum.",
    "misconception": "Confusing Torque with Work (Joules). Although both are force × distance, Torque is a twisting force, not energy transferred.",
    "formalDefinition": "Derived scientific unit representing standard ratio or product coordinates: $N·m$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "The unit of torque, measuring the rotational force applied around an axis or fulcrum. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Kilogram Meter per Second",
    "symbol": "kg·m/s",
    "category": "Physics / Mechanics",
    "description": "The standard unit of momentum, measuring the quantity of motion an object has.",
    "misconception": "Thinking heavy objects always have more momentum. A tiny bullet has immense momentum because of extreme velocity.",
    "formalDefinition": "Derived scientific unit representing standard ratio or product coordinates: $kg·m/s$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "The standard unit of momentum, measuring the quantity of motion an object has. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Volt",
    "symbol": "V",
    "category": "Physics / Electricity",
    "description": "The unit of electrical potential difference. Represents the \"water pressure\" pushing electrons.",
    "misconception": "Assuming high voltage means high danger. Static shocks are 20,000 Volts but harmless because they have zero continuous current (Amps).",
    "formalDefinition": "The Volt, symbol $\\text{V}$, is the SI derived unit of electric potential, potential difference, and electromotive force. It is defined as the potential difference across a conductor when a current of one ampere dissipates one watt of power:\n\n$$1\\text{ V} = 1\\text{ W/A} = 1\\text{ kg}\\cdot\\text{m}^2\\text{/}(\\text{A}\\cdot\\text{s}^3)$$",
    "sources": [
      "BIPM SI Brochure",
      "IEEE Standard Dictionary of Electrical and Electronics Terms"
    ],
    "body": "Named in honor of Alessandro Volta, inventor of the chemical battery, the Volt measures electric pressure. It is the electromotive force that drives electrons through a circuit. A standard AA battery provides $1.5\\text{ V}$, whereas home electrical sockets deliver $110\\text{ V}$ to $220\\text{ V}$."
  },
  {
    "name": "Ohm",
    "symbol": "Ω",
    "category": "Physics / Electricity",
    "description": "The unit of electrical resistance. Measures how much a material resists electron flow.",
    "misconception": "Thinking thicker wires have higher resistance. Thicker wires have LOWER resistance (more room for electrons).",
    "formalDefinition": "The Ohm, symbol $\\Omega$, is the SI derived unit of electrical resistance. It is defined as the resistance between two points of a conductor when a constant potential difference of one volt applied to these points produces in the conductor a current of one ampere:\n\n$$1\\ \\Omega = 1\\text{ V/A} = 1\\text{ kg}\\cdot\\text{m}^2\\text{/}(\\text{A}^2\\cdot\\text{s}^3)$$",
    "sources": [
      "BIPM SI Brochure",
      "IEC 60050 (International Electrotechnical Vocabulary)"
    ],
    "body": "Named after Georg Ohm, who formulated Ohm's Law ($V = I \\cdot R$), this unit measures how strongly a material opposes the flow of electric current. Good conductors like copper have resistances near zero, whereas insulators like rubber have resistances measuring in megohms or gigohms."
  },
  {
    "name": "Coulomb",
    "symbol": "C",
    "category": "Physics / Electricity",
    "description": "The standard unit of electric charge. One Coulomb represents roughly 6.24 × 10¹⁸ electrons.",
    "misconception": "Confusing Charge (Coulombs) with Current (Amps). Current is the *flow rate* of Coulombs per second.",
    "formalDefinition": "The Coulomb, symbol $\\text{C}$, is the SI derived unit of electric charge. It is defined as the quantity of electricity carried in one second by a constant current of one ampere:\n\n$$1\\text{ C} = 1\\text{ A}\\cdot\\text{s}$$",
    "sources": [
      "BIPM SI Brochure",
      "CODATA Recommended Values of Constants"
    ],
    "body": "Named after Charles-Augustin de Coulomb, who formulated Coulomb's Law of electrostatic attraction, this unit measures the quantity of static electricity. One Coulomb is equivalent to the charge of approximately $6.242 \\times 10^{18}$ protons, or the negative charge of the same number of electrons."
  },
  {
    "name": "Farad",
    "symbol": "F",
    "category": "Physics / Electricity",
    "description": "The unit of electrical capacitance, measuring the ability of a body to store an electrical charge.",
    "misconception": "A 1 Farad capacitor is actually massive. Most everyday electronics use microfarads (μF) or picofarads (pF).",
    "formalDefinition": "The Farad, symbol $\\text{F}$, is the SI derived unit of electrical capacitance. It is defined as the capacitance of a capacitor that stores a charge of one coulomb when a potential difference of one volt is applied across its plates:\n\n$$1\\text{ F} = 1\\text{ C/V} = 1\\text{ A}^2\\cdot\\text{s}^4\\text{/}(\\text{kg}\\cdot\\text{m}^2)$$",
    "sources": [
      "BIPM SI Brochure",
      "IEC 60050"
    ],
    "body": "Named after Michael Faraday, the pioneer of electromagnetism, the Farad is an exceptionally large unit of capacitance. A typical capacitor in electronic circuits is measured in microfarads ($\\mu\\text{F}$, $10^{-6}\\text{ F}$) or picofarad ($\\text{pF}$, $10^{-12}\\text{ F}$). Supercapacitors, used for quick-charge energy storage, can reach values of thousands of Farads."
  },
  {
    "name": "Weber",
    "symbol": "Wb",
    "category": "Physics / Magnetism",
    "description": "The standard unit of magnetic flux, representing the total magnetic field passing through an area.",
    "misconception": "Students often confuse the total magnetic flux (Weber) with the magnetic field density (Tesla).",
    "formalDefinition": "The Weber, symbol $\\text{Wb}$, is the SI derived unit of magnetic flux. It is defined as the amount of magnetic flux that, linking a circuit of one turn, produces an electromotive force of one volt when the flux is reduced to zero at a uniform rate in one second:\n\n$$1\\text{ Wb} = 1\\text{ V}\\cdot\\text{s} = 1\\text{ kg}\\cdot\\text{m}^2\\text{/}(\\text{A}\\cdot\\text{s}^2)$$",
    "sources": [
      "BIPM SI Brochure",
      "IEC 60050"
    ],
    "body": "Named after Wilhelm Eduard Weber, a German physicist who co-developed the first electromagnetic telegraph, this unit represents the total amount of magnetic field lines passing through a given surface area. It is related to the Tesla by multiplying magnetic field strength by the area over which it acts."
  },
  {
    "name": "Tesla",
    "symbol": "T",
    "category": "Physics / Magnetism",
    "description": "The standard unit of magnetic flux density (strength of a magnetic field).",
    "misconception": "Underestimating how strong 1 Tesla is. A fridge magnet is 0.005 T. An MRI machine is 1.5 to 3 T.",
    "formalDefinition": "The Tesla, symbol $\\text{T}$, is the SI derived unit of magnetic flux density (magnetic field strength). It is defined as one Weber per square meter, or equivalent to a force of one newton exerted on a conductor carrying one ampere of current per meter:\n\n$$1\\text{ T} = 1\\text{ Wb/m}^2 = 1\\text{ kg}/(\\text{A}\\cdot\\text{s}^2)$$",
    "sources": [
      "BIPM SI Brochure",
      "IEEE Standards on Magnetics"
    ],
    "body": "Named after Nikola Tesla, this unit measures the concentration of magnetic fields. The Earth's magnetic field is extremely weak, measuring about $30$ to $60$ microteslas ($\\mu\\text{T}$). A strong refrigerator magnet is about $5$ milliteslas ($5\\text{ mT}$), whereas medical MRI machines generate fields between $1.5\\text{ T}$ and $3\\text{ T}$."
  },
  {
    "name": "Henry",
    "symbol": "H",
    "category": "Physics / Electromagnetism",
    "description": "The unit of electrical inductance. Measures how much a coil resists changes in current.",
    "misconception": "Confusing inductance with resistance. Inductance only matters when current is *changing* (AC), not when it is steady (DC).",
    "formalDefinition": "The Henry, symbol $\\text{H}$, is the SI derived unit of electrical inductance. It is defined as the inductance of a closed loop in which an electromotive force of one volt is induced when the current in the loop varies uniformly at a rate of one ampere per second:\n\n$$1\\text{ H} = 1\\text{ V}\\cdot\\text{s/A} = 1\\text{ kg}\\cdot\\text{m}^2\\text{/}(\\text{A}^2\\cdot\\text{s}^2)$$",
    "sources": [
      "BIPM SI Brochure",
      "IEEE Standards Association Inductor Codes"
    ],
    "body": "Named after Joseph Henry, the American scientist who discovered self-inductance independently of Faraday, the Henry measures how effectively a coil stores magnetic energy when current flows through it. Inductors resist changes in electrical current, a property crucial in radio tuning, signal filtering, and power supplies."
  },
  {
    "name": "Siemens",
    "symbol": "S",
    "category": "Physics / Electricity",
    "description": "The unit of electrical conductance, which is the exact inverse of electrical resistance (Ohms).",
    "misconception": "Rarely taught in early grades. Students assume resistance is the only way to measure a circuit's properties.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $S$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "The unit of electrical conductance, which is the exact inverse of electrical resistance (Ohms). This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Celsius",
    "symbol": "°C",
    "category": "Chemistry / Earth Science",
    "description": "A scale and unit of measurement for temperature, where 0 is water freezing and 100 is water boiling.",
    "misconception": "Thinking 20°C is \"twice as hot\" as 10°C. Temperature ratios only work on the absolute Kelvin scale.",
    "formalDefinition": "The degree Celsius, symbol $^\\circ\\text{C}$, is a unit of thermodynamic temperature. The Celsius scale is defined relative to the Kelvin scale such that temperature $t$ in Celsius is:\n\n$$t_{^\\circ\\text{C}} = T_{\\text{K}} - 273.15$$",
    "sources": [
      "BIPM SI Brochure",
      "WMO Meteorological Standards"
    ],
    "body": "Named after Anders Celsius, the Swedish astronomer who created a centigrade scale. The scale was originally defined by the freezing point ($0^\\circ\\text{C}$) and boiling point ($100^\\circ\\text{C}$) of pure water at standard atmospheric pressure. Today, Celsius is formally calibrated using absolute thermodynamic Kelvin offsets."
  },
  {
    "name": "Molarity",
    "symbol": "M (mol/L)",
    "category": "Chemistry",
    "description": "The measure of chemical concentration (moles of solute per liter of solution).",
    "misconception": "Confused with absolute amount. A cup of 1 M acid and a pool of 1 M acid have the same concentration but different total amounts.",
    "formalDefinition": "Derived scientific unit representing standard ratio or product coordinates: $M (mol/L)$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "The measure of chemical concentration (moles of solute per liter of solution). This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Molality",
    "symbol": "m (mol/kg)",
    "category": "Chemistry",
    "description": "The measure of chemical concentration based on the mass of the solvent (moles per kilogram of solvent).",
    "misconception": "Easily confused with Molarity. Molality is used because mass does not change with temperature, whereas liquid volume (used in Molarity) expands when heated.",
    "formalDefinition": "Derived scientific unit representing standard ratio or product coordinates: $m (mol/kg)$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "The measure of chemical concentration based on the mass of the solvent (moles per kilogram of solvent). This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Gram per Cubic Centimeter",
    "symbol": "g/cm³",
    "category": "Chemistry / Physics",
    "description": "The standard unit of density. Pure water has a density of exactly 1.0 g/cm³.",
    "misconception": "Thinking \"heavier\" objects sink. A heavy log floats (low density), while a light pebble sinks (high density).",
    "formalDefinition": "Derived scientific unit representing standard ratio or product coordinates: $g/cm³$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "The standard unit of density. Pure water has a density of exactly 1.0 g/cm³. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Liters",
    "symbol": "L",
    "category": "Chemistry / Everyday Science",
    "description": "A metric unit of volume. One liter equals 1,000 cubic centimeters.",
    "misconception": "Assuming 1 Liter of any liquid weighs 1 Kilogram. This is only true for pure water; 1 Liter of mercury weighs over 13 kg.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $L$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "A metric unit of volume. One liter equals 1,000 cubic centimeters. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Parts Per Million",
    "symbol": "ppm",
    "category": "Chemistry / Environmental",
    "description": "A way of measuring extremely dilute concentrations. 400 ppm CO₂ means 400 out of 1 million air molecules are CO₂.",
    "misconception": "Struggling to visualize the scale. In a 50-liter bathtub (1 million drops of water), one ppm is exactly one drop.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $ppm$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "A way of measuring extremely dilute concentrations. 400 ppm CO₂ means 400 out of 1 million air molecules are CO₂. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Parts Per Billion",
    "symbol": "ppb",
    "category": "Chemistry / Environmental",
    "description": "Measures microscopic traces of pollutants or chemicals. One part per billion is roughly one drop of water in an Olympic swimming pool.",
    "misconception": "Often dismissed as \"zero\". In toxicology, even 10 ppb of lead in drinking water can cause severe neurological damage.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $ppb$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "Measures microscopic traces of pollutants or chemicals. One part per billion is roughly one drop of water in an Olympic swimming pool. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Atomic Mass Unit",
    "symbol": "amu (or u)",
    "category": "Chemistry",
    "description": "The standard unit used to measure the mass of protons, neutrons, and atoms.",
    "misconception": "Students assume an amu is exactly the mass of a proton. It is technically defined as exactly 1/12th the mass of a Carbon-12 atom.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $amu (or u)$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "The standard unit used to measure the mass of protons, neutrons, and atoms. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Dalton",
    "symbol": "Da",
    "category": "Biochemistry",
    "description": "An alternative name for the atomic mass unit, primarily used by biologists when discussing large proteins.",
    "misconception": "Thinking it is a different measurement than the amu. 1 Dalton = 1 amu.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $Da$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "An alternative name for the atomic mass unit, primarily used by biologists when discussing large proteins. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Joule per Kilogram Kelvin",
    "symbol": "J/(kg·K)",
    "category": "Thermodynamics",
    "description": "The unit for specific heat capacity, measuring how much energy is required to raise the temperature of 1 kg of a substance by 1 Kelvin.",
    "misconception": "Assuming all materials heat up at the same rate. Water has a massive specific heat capacity, meaning it takes huge amounts of energy to boil.",
    "formalDefinition": "Derived scientific unit representing standard ratio or product coordinates: $J/(kg·K)$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "The unit for specific heat capacity, measuring how much energy is required to raise the temperature of 1 kg of a substance by 1 Kelvin. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Photosynthetic Photon Flux Density",
    "symbol": "μmol m⁻² s⁻¹",
    "category": "Biology / Botany",
    "description": "Measures the exact amount of plant-useful light (photons between 400–700 nm) striking a leaf surface per second.",
    "misconception": "Confused with Lux. Lux measures human brightness (green light). Plants need red and blue light, so a green light (high Lux) will starve a plant.",
    "formalDefinition": "Derived scientific unit representing standard ratio or product coordinates: $μmol m⁻² s⁻¹$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "Measures the exact amount of plant-useful light (photons between 400–700 nm) striking a leaf surface per second. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Lux",
    "symbol": "lx",
    "category": "Optics",
    "description": "The unit of illuminance, measuring how much luminous flux is spread over a given area as perceived by the human eye.",
    "misconception": "Used incorrectly in botany and agriculture. Lux is weighted to human vision, rendering it useless for measuring plant growth.",
    "formalDefinition": "The Lux, symbol $\\text{lx}$, is the SI derived unit of illuminance. It is defined as one lumen of luminous flux spread uniformly over an area of one square meter:\n\n$$1\\text{ lx} = 1\\text{ lm/m}^2 = 1\\text{ cd}\\cdot\\text{sr/m}^2$$",
    "sources": [
      "BIPM SI Brochure",
      "CIE S 026 (System for Metrology of Optical Radiation)"
    ],
    "body": "The lux measures the intensity of light hitting a surface. Direct sunlight provides about $100\\,000\\text{ lux}$ of illuminance, whereas typical indoor office lighting is about $500\\text{ lux}$, and full moon light is less than $1\\text{ lux}$. It is key for determining lighting levels in buildings and agricultural spaces."
  },
  {
    "name": "Lumen",
    "symbol": "lm",
    "category": "Optics",
    "description": "The unit of luminous flux, representing the total amount of visible light emitted by a source in all directions.",
    "misconception": "Confusing Lumens with Watts. An LED bulb uses only 10 Watts of energy but can produce 800 Lumens of brightness.",
    "formalDefinition": "The Lumen, symbol $\\text{lm}$, is the SI derived unit of luminous flux. It is defined as the luminous flux emitted in a solid angle of one steradian by a uniform point source having a luminous intensity of one candela:\n\n$$1\\text{ lm} = 1\\text{ cd}\\cdot\\text{sr}$$",
    "sources": [
      "BIPM SI Brochure",
      "IESNA (Illuminating Engineering Society of North America) Handbook"
    ],
    "body": "The lumen measures the total amount of visible light emitted by a source in all directions. Unlike watts, which measure electrical power input, lumens measure light power output as perceived by the human eye. Modern energy-efficient LED light bulbs yield about $80$ to $100$ lumens per watt of electrical power."
  },
  {
    "name": "Diopter",
    "symbol": "D",
    "category": "Optics / Biology",
    "description": "The unit of measurement for the optical power of a lens or curved mirror.",
    "misconception": "Students don't realize it's simply the reciprocal of the focal length in meters (1/m). A +2.00 prescription means the focal length is 0.5 meters.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $D$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "The unit of measurement for the optical power of a lens or curved mirror. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Decibel",
    "symbol": "dB",
    "category": "Physics / Biology",
    "description": "A logarithmic unit used to measure the intensity of a sound relative to the threshold of human hearing.",
    "misconception": "Misunderstanding the logarithmic scale. A 10 dB increase means the sound is 10 times more intense, not slightly louder.",
    "formalDefinition": "The decibel, symbol $\\text{dB}$, is a logarithmic ratio unit. In acoustics, sound pressure level ($L_p$) is defined relative to the reference hearing threshold pressure $p_0 = 20\\ \\mu\\text{Pa}$ as:\n\n$$L_p = 20 \\log_{10}\\left(\\frac{p}{p_0}\\right)\\text{ dB}$$",
    "sources": [
      "ISO 80000-8 (Quantities and units - Acoustics)",
      "ANSI/ASA S1.1 (Acoustical Terminology)"
    ],
    "body": "Because human hearing covers a massive range of sound pressures (a factor of one trillion from quietest to loudest), a linear scale is impractical. The logarithmic decibel scale solves this. An increase of $10\\text{ dB}$ represents a tenfold increase in acoustic energy, which humans perceive as roughly doubling the loudness."
  },
  {
    "name": "Base Pair",
    "symbol": "bp",
    "category": "Biology / Genetics",
    "description": "A unit representing a single pair of matching nucleotides (A-T or C-G) on a DNA double helix.",
    "misconception": "Underestimating the scale of a genome. The human genome contains roughly 3 billion base pairs in every single cell.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $bp$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A unit representing a single pair of matching nucleotides (A-T or C-G) on a DNA double helix. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Kilobase",
    "symbol": "kb",
    "category": "Biology / Genetics",
    "description": "A unit of length for DNA or RNA consisting of 1,000 base pairs.",
    "misconception": "Assuming genes are very small. A single human gene can span hundreds of kilobases.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $kb$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A unit of length for DNA or RNA consisting of 1,000 base pairs. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Beats Per Minute",
    "symbol": "bpm",
    "category": "Biology / Physiology",
    "description": "The standard medical unit for measuring heart rate.",
    "misconception": "Confusing bpm with blood pressure. Heart rate is the speed of the pump; blood pressure is the physical force against the pipe walls.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $bpm$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "The standard medical unit for measuring heart rate. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Light-Year",
    "symbol": "ly",
    "category": "Astronomy",
    "description": "The absolute distance that light travels in a vacuum in one Earth year (roughly 9.46 trillion kilometers).",
    "misconception": "Assuming a light-year is a measure of time. It is strictly a measure of physical distance.",
    "formalDefinition": "A light-year, symbol $\\text{ly}$, is a non-SI astronomical unit of length. It is defined as the distance that light travels in a vacuum in one Julian year ($365.25$ days of $86\\,400\\text{ seconds}$ each):\n\n$$1\\text{ ly} = c \\cdot t \\approx 9.4607 \\times 10^{15}\\text{ m}$$",
    "sources": [
      "IAU (International Astronomical Union) Recommendations on Constants"
    ],
    "body": "Used to describe interstellar scales, a light-year is a unit of physical distance, not time. It highlights the vastness of space: light from the Sun takes $8$ minutes to reach Earth, but light from Proxima Centauri, our nearest neighboring star, takes over $4.2$ years to reach us."
  },
  {
    "name": "Astronomical Unit",
    "symbol": "AU",
    "category": "Astronomy",
    "description": "A unit of length representing the average distance from the Earth to the Sun (about 150 million kilometers).",
    "misconception": "Students assume planetary orbits are perfect circles. The AU is an *average* because Earth's orbit is actually an ellipse.",
    "formalDefinition": "The astronomical unit, symbol $\\text{AU}$, is a unit of length. It is defined as exactly $149\\,597\\,870\\,700$ meters, representing the approximate average distance between the Earth and the Sun.",
    "sources": [
      "IAU 2012 Resolution B2",
      "NIST Reference on Astronomical Scales"
    ],
    "body": "Originally defined by Kepler's laws and planetary orbital coordinates, the astronomical unit was anchored to an exact meter value by the International Astronomical Union in 2012. It provides a convenient baseline for measuring distances within our solar system or around other stars."
  },
  {
    "name": "Parsec",
    "symbol": "pc",
    "category": "Astronomy",
    "description": "An astronomical unit of distance equal to about 3.26 light-years, derived from the parallax of a star.",
    "misconception": "Famously misused by Han Solo in Star Wars as a unit of time (\"made the Kessel Run in less than 12 parsecs\"). It is purely a unit of distance.",
    "formalDefinition": "The parsec, symbol $\\text{pc}$, is a unit of length used in astronomy. It is defined as the distance at which a baseline of one astronomical unit subtends an angle of exactly one arcsecond:\n\n$$1\\text{ pc} = \\frac{1\\text{ AU}}{\\tan(1'')\\text{ rad}} \\approx 3.0857 \\times 10^{16}\\text{ m} \\approx 3.2616\\text{ ly}$$",
    "sources": [
      "IAU Astronomical Standards",
      "ESA Hipparcos Mission Definitions"
    ],
    "body": "Short for 'parallax second', the parsec is derived from stellar parallax—the apparent shift in a star's position when viewed from opposite sides of Earth's orbit. If a star has a shift of one arcsecond, it is exactly one parsec away. Professional astronomers prefer the parsec over the light-year for distance calculations."
  },
  {
    "name": "Solar Mass",
    "symbol": "M☉",
    "category": "Astronomy",
    "description": "A standard unit of mass in astronomy, equal to the mass of our Sun (approx 2 × 10³⁰ kg).",
    "misconception": "Failing to grasp the extreme scale. Our Sun accounts for 99.8% of all the mass in the entire Solar System combined.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $M☉$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A standard unit of mass in astronomy, equal to the mass of our Sun (approx 2 × 10³⁰ kg). This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Knot",
    "symbol": "kn",
    "category": "Earth Science / Navigation",
    "description": "A unit of speed equal to one nautical mile per hour, historically used in maritime and aviation contexts.",
    "misconception": "Students confuse nautical miles with land miles. A nautical mile is based on the circumference of the Earth and is longer than a standard mile.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $kn$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A unit of speed equal to one nautical mile per hour, historically used in maritime and aviation contexts. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Millibar",
    "symbol": "mb",
    "category": "Earth Science / Meteorology",
    "description": "A unit of atmospheric pressure. Standard sea-level pressure is exactly 1013.25 millibars.",
    "misconception": "Confused by the different units used on weather maps. 1 millibar is exactly identical to 1 hectoPascal (hPa).",
    "formalDefinition": "Standard scientific coordinate represented by notation: $mb$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A unit of atmospheric pressure. Standard sea-level pressure is exactly 1013.25 millibars. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Richter Magnitude",
    "symbol": "ML",
    "category": "Earth Science",
    "description": "A historical logarithmic scale used to quantify the energy released by an earthquake.",
    "misconception": "Scientists no longer use the Richter scale for large earthquakes, preferring the Moment Magnitude scale (Mw), though media still misreports it.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $ML$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A historical logarithmic scale used to quantify the energy released by an earthquake. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Sverdrup",
    "symbol": "Sv",
    "category": "Earth Science / Oceanography",
    "description": "A unit of volume transport used to measure ocean currents. 1 Sv equals 1 million cubic meters of water per second.",
    "misconception": "Extremely obscure to students, but crucial for climate models. The entire flow of all the world's rivers combined is roughly 1 Sv.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $Sv$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A unit of volume transport used to measure ocean currents. 1 Sv equals 1 million cubic meters of water per second. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Becquerel",
    "symbol": "Bq",
    "category": "Nuclear Physics",
    "description": "The SI unit of radioactivity. One Becquerel is defined as exactly one atomic nucleus decaying per second.",
    "misconception": "Students assume radiation is always deadly. A human body naturally emits about 4,000 Bq due to radioactive Carbon-14 and Potassium-40.",
    "formalDefinition": "The Becquerel, symbol $\\text{Bq}$, is the SI derived unit of radioactivity. It is defined as the activity of a quantity of radioactive material in which one nucleus decays per second:\n\n$$1\\text{ Bq} = 1\\text{/s}$$",
    "sources": [
      "BIPM SI Brochure",
      "IAEA (International Atomic Energy Agency) Safety Glossary"
    ],
    "body": "Named after Henri Becquerel, co-discoverer of radioactivity, this unit measures the raw rate of nuclear decay events. It is a very small quantity; for example, the natural radioactivity of the potassium in a single banana is about $15\\text{ Bq}$. Historically, radioactivity was measured in Curies ($1\\text{ Ci} = 3.7 \\times 10^{10}\\text{ Bq}$)."
  },
  {
    "name": "Electronvolt",
    "symbol": "eV",
    "category": "Nuclear Physics / Quantum",
    "description": "A tiny unit of energy equal to the work done on a single electron accelerating through a potential difference of one volt.",
    "misconception": "Confusing it with Voltage. An electronvolt is a measure of absolute Energy (like tiny Joules), not electrical potential.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $eV$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "A tiny unit of energy equal to the work done on a single electron accelerating through a potential difference of one volt. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Gray",
    "symbol": "Gy",
    "category": "Nuclear Physics",
    "description": "The unit of ionizing radiation dose, representing the absorption of one Joule of radiation energy per kilogram of matter.",
    "misconception": "Confusing physical dose (Gray) with biological damage (Sievert). Gray measures raw energy absorbed, regardless of what tissue it hits.",
    "formalDefinition": "The Gray, symbol $\\text{Gy}$, is the SI derived unit of absorbed radiation dose. It is defined as the absorption of one joule of radiation energy per kilogram of matter:\n\n$$1\\text{ Gy} = 1\\text{ J/kg}$$",
    "sources": [
      "BIPM SI Brochure",
      "ICRU (International Commission on Radiation Units) Reports"
    ],
    "body": "Named after Louis Harold Gray, a pioneer in radiobiology, the Gray measures the physical energy deposited by ionizing radiation (like X-rays or gamma rays) in a material. It is a raw measure of exposure; biological consequences depend on the type of tissue and radiation, which is measured in Sieverts."
  },
  {
    "name": "Sievert",
    "symbol": "Sv",
    "category": "Nuclear Physics / Health",
    "description": "A unit representing the health effect (biological damage) of ionizing radiation on the human body.",
    "misconception": "Students hear \"Sievert\" in sci-fi and panic. You receive about 0.0001 Sieverts just from eating a banana (Banana Equivalent Dose).",
    "formalDefinition": "The Sievert, symbol $\\text{Sv}$, is the SI derived unit of equivalent or effective radiation dose. It is defined as the absorbed dose in grays multiplied by a dimensionless quality factor $W$ representing biological effectiveness:\n\n$$1\\text{ Sv} = 1\\text{ J/kg}$$",
    "sources": [
      "BIPM SI Brochure",
      "ICRP Publication 103 (Recommendations of the International Commission on Radiological Protection)"
    ],
    "body": "Named after Rolf Sievert, this unit evaluates the biological risk of radiation exposure to human tissue. Because $1\\text{ Sv}$ is a very large dose (capable of causing radiation sickness), everyday measurements are expressed in millisieverts ($\\text{mSv}$) or microsieverts ($\\mu\\text{Sv}$). Average natural background radiation is about $2.4\\text{ mSv}$ per year."
  },
  {
    "name": "Half-Life",
    "symbol": "t₁/₂",
    "category": "Nuclear Physics",
    "description": "Not strictly a unit, but the time required for exactly half of the radioactive atoms in a sample to decay.",
    "misconception": "Assuming that after two half-lives, the entire sample is gone. After two half-lives, 25% of the original sample still remains.",
    "formalDefinition": "Derived scientific unit representing standard ratio or product coordinates: $t₁/₂$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "Not strictly a unit, but the time required for exactly half of the radioactive atoms in a sample to decay. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Kilo-",
    "symbol": "k",
    "category": "Metric Prefix",
    "description": "A multiplier representing exactly 1,000 of the base unit. E.g., 1 kilometer = 1,000 meters.",
    "misconception": "Students mistakenly refer to a \"kilogram\" simply as a \"kilo,\" leading to confusion when applying the prefix to watts (kilowatt) or bytes (kilobyte).",
    "formalDefinition": "Standard metric prefix multiplier representing a factor of standard base systems.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A multiplier representing exactly 1,000 of the base unit. E.g., 1 kilometer = 1,000 meters. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Milli-",
    "symbol": "m",
    "category": "Metric Prefix",
    "description": "A multiplier representing exactly 1/1,000th of the base unit. E.g., 1 millimeter = 0.001 meters.",
    "misconception": "Often confused with the prefix Micro- (μ) or Nano- (n), leading to massive calculation errors in chemistry equations.",
    "formalDefinition": "Standard metric prefix multiplier representing a factor of standard base systems.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A multiplier representing exactly 1/1,000th of the base unit. E.g., 1 millimeter = 0.001 meters. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Micro-",
    "symbol": "μ",
    "category": "Metric Prefix",
    "description": "A multiplier representing exactly one millionth (10⁻⁶) of the base unit.",
    "misconception": "Students often miswrite the Greek letter mu (μ) as a standard lowercase \"u\", creating confusion in peer-reviewed contexts.",
    "formalDefinition": "Standard metric prefix multiplier representing a factor of standard base systems.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A multiplier representing exactly one millionth (10⁻⁶) of the base unit. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Nano-",
    "symbol": "n",
    "category": "Metric Prefix",
    "description": "A multiplier representing exactly one billionth (10⁻⁹) of the base unit. Visible light wavelengths are measured in nanometers.",
    "misconception": "Failing to grasp the microscopic scale. Your fingernails grow at roughly 1 nanometer per second.",
    "formalDefinition": "Standard metric prefix multiplier representing a factor of standard base systems.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A multiplier representing exactly one billionth (10⁻⁹) of the base unit. Visible light wavelengths are measured in nanometers. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Pound",
    "symbol": "lb",
    "category": "US Customary / Avoided",
    "description": "A unit of force (weight) in the US Customary system.",
    "misconception": "Routinely conflated with mass (kilograms). Because pounds measure force, your weight in pounds changes on the Moon, but your mass in kilograms does not.",
    "formalDefinition": "Non-standard or legacy measurement unit avoided in official scientific research.",
    "sources": [
      "NIST Handbook 44 (Specifications and Tolerances)"
    ],
    "body": "A unit of force (weight) in the US Customary system. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Inch",
    "symbol": "in",
    "category": "US Customary / Avoided",
    "description": "A unit of length equal to exactly 2.54 centimeters.",
    "misconception": "Students try to use fractions (1/16th of an inch) in scientific calculations. Science strictly uses decimals and the metric system for precise engineering.",
    "formalDefinition": "Non-standard or legacy measurement unit avoided in official scientific research.",
    "sources": [
      "NIST Handbook 44 (Specifications and Tolerances)"
    ],
    "body": "A unit of length equal to exactly 2.54 centimeters. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Fahrenheit",
    "symbol": "°F",
    "category": "US Customary / Avoided",
    "description": "A temperature scale where water freezes at 32° and boils at 212°.",
    "misconception": "Students assume 0°F is the absolute coldest possible temperature. True zero is Absolute Zero (0 Kelvin), which is -459.67°F.",
    "formalDefinition": "Non-standard or legacy measurement unit avoided in official scientific research.",
    "sources": [
      "NIST Handbook 44 (Specifications and Tolerances)"
    ],
    "body": "A temperature scale where water freezes at 32° and boils at 212°. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Calorie",
    "symbol": "cal",
    "category": "Obsolete Metric",
    "description": "The energy needed to raise 1 gram of water by 1°C. Officially replaced by the Joule in science.",
    "misconception": "Food labels use \"Calories\" with a capital C (which are actually kilocalories). Eating a 100-Calorie snack means you consumed 100,000 standard scientific calories.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $cal$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "The energy needed to raise 1 gram of water by 1°C. Officially replaced by the Joule in science. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Horsepower",
    "symbol": "hp",
    "category": "Imperial / Avoided",
    "description": "An archaic unit of power coined by James Watt to compare steam engines to draft horses. 1 hp = 746 Watts.",
    "misconception": "Assuming a real horse produces exactly 1 horsepower. A fit draft horse can actually peak at around 15 horsepower in a short sprint.",
    "formalDefinition": "Non-standard or legacy measurement unit avoided in official scientific research.",
    "sources": [
      "NIST Handbook 44 (Specifications and Tolerances)"
    ],
    "body": "An archaic unit of power coined by James Watt to compare steam engines to draft horses. 1 hp = 746 Watts. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Gallon",
    "symbol": "gal",
    "category": "US Customary / Avoided",
    "description": "A unit of liquid volume. The US gallon is exactly 3.785 liters.",
    "misconception": "The Imperial (UK) Gallon and the US Gallon are physically different sizes, causing catastrophic errors in international engineering projects.",
    "formalDefinition": "Non-standard or legacy measurement unit avoided in official scientific research.",
    "sources": [
      "NIST Handbook 44 (Specifications and Tolerances)"
    ],
    "body": "A unit of liquid volume. The US gallon is exactly 3.785 liters. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Foot-Pound",
    "symbol": "ft·lb",
    "category": "US Customary / Avoided",
    "description": "A unit of work or energy. The energy transferred on applying a force of one pound through a distance of one foot.",
    "misconception": "Completely incompatible with SI units, requiring complex conversion constants that led to the loss of the $125 million Mars Climate Orbiter in 1999.",
    "formalDefinition": "Derived scientific unit representing standard ratio or product coordinates: $ft·lb$.",
    "sources": [
      "NIST Handbook 44 (Specifications and Tolerances)"
    ],
    "body": "A unit of work or energy. The energy transferred on applying a force of one pound through a distance of one foot. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "BTU",
    "symbol": "BTU",
    "category": "US Customary / Avoided",
    "description": "British Thermal Unit. The amount of heat required to raise the temperature of one pound of water by one degree Fahrenheit.",
    "misconception": "Still used in HVAC (air conditioning) ratings, but scientists strictly use Joules for thermal energy to maintain universal standardization.",
    "formalDefinition": "Non-standard or legacy measurement unit avoided in official scientific research.",
    "sources": [
      "NIST Handbook 44 (Specifications and Tolerances)"
    ],
    "body": "British Thermal Unit. The amount of heat required to raise the temperature of one pound of water by one degree Fahrenheit. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Radian",
    "symbol": "rad",
    "category": "Mathematics / Physics",
    "description": "The standard unit of angular measure, defined by wrapping the radius of a circle around its circumference.",
    "misconception": "Students stubbornly prefer Degrees. Radians are dimensionless and essential for calculus; using degrees in advanced physics equations breaks the math.",
    "formalDefinition": "The Radian, symbol $\\text{rad}$, is the SI coherent derived unit of plane angle. It is defined as the angle subtended at the center of a circle by an arc that is equal in length to the radius of the circle:\n\n$$\\theta = \\frac{s}{r}$$",
    "sources": [
      "BIPM SI Brochure",
      "ISO 80000-3"
    ],
    "body": "Unlike degrees, which divide a circle into an arbitrary $360$ parts, the radian is a natural mathematical unit based on the circle's geometry. A full circle contains $2\\pi\\text{ radians}$ (approx $6.28\\text{ rad}$). In physics and calculus, radians are mathematically essential because they simplify derivatives and equations for rotational motion."
  },
  {
    "name": "Steradian",
    "symbol": "sr",
    "category": "Mathematics / Optics",
    "description": "The SI unit of solid angle, representing a 3D cone-like angle extending from the center of a sphere.",
    "misconception": "Highly abstract for middle schoolers. While a circle has 2π radians, a complete sphere has exactly 4π steradians.",
    "formalDefinition": "The Steradian, symbol $\\text{sr}$, is the SI coherent derived unit of solid angle. It is defined as the solid angle subtended at the center of a sphere of radius $r$ by a portion of the surface of the sphere having an area equal to $r^2$:\n\n$$\\Omega = \\frac{A}{r^2}$$",
    "sources": [
      "BIPM SI Brochure",
      "ISO 80000-3"
    ],
    "body": "The steradian is the 3D equivalent of the 2D radian. It measures angular span in three dimensions, like a cone extending from the center of a sphere. A complete sphere encloses a solid angle of exactly $4\\pi\\text{ steradians}$ (approx $12.57\\text{ sr}$). It is used to measure how light spreads from a source."
  },
  {
    "name": "Katal",
    "symbol": "kat",
    "category": "Biochemistry",
    "description": "The SI unit of catalytic activity, used primarily for describing enzymes. One katal is the activity of a catalyst that speeds up a reaction by one mole per second.",
    "misconception": "Virtually unknown outside advanced biochemistry, yet it is an official SI derived unit.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $kat$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "The SI unit of catalytic activity, used primarily for describing enzymes. One katal is the activity of a catalyst that speeds up a reaction by one mole per second. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Centipoise",
    "symbol": "cP",
    "category": "Physics / Fluid Dynamics",
    "description": "A unit of dynamic viscosity used to measure how \"thick\" or \"sticky\" a fluid is. Water at room temperature is roughly 1 cP.",
    "misconception": "Students confuse viscosity with density. Honey is highly viscous, while mercury is highly dense but surprisingly fluid.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $cP$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "A unit of dynamic viscosity used to measure how \"thick\" or \"sticky\" a fluid is. Water at room temperature is roughly 1 cP. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Mach",
    "symbol": "M",
    "category": "Physics / Aviation",
    "description": "A dimensionless ratio representing the speed of an object relative to the speed of sound in the surrounding medium.",
    "misconception": "Assuming Mach 1 is a fixed speed. The speed of sound changes drastically depending on air temperature and altitude.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $M$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "A dimensionless ratio representing the speed of an object relative to the speed of sound in the surrounding medium. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Volt-Ampere",
    "symbol": "VA",
    "category": "Electrical Engineering",
    "description": "The unit used for the apparent power in an electrical circuit. For DC circuits, it is identical to a Watt.",
    "misconception": "In AC circuits, VA and Watts can be very different because voltage and current can fall out of phase. This is known as the \"Power Factor\".",
    "formalDefinition": "Standard scientific coordinate represented by notation: $VA$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "The unit used for the apparent power in an electrical circuit. For DC circuits, it is identical to a Watt. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Pico-",
    "symbol": "p",
    "category": "Metric Prefix",
    "description": "A multiplier representing exactly one trillionth (10⁻¹²) of the base unit.",
    "misconception": "A picometer is smaller than most atoms. Hydrogen, the smallest atom, has a radius of roughly 53 picometers.",
    "formalDefinition": "Standard metric prefix multiplier representing a factor of standard base systems.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A multiplier representing exactly one trillionth (10⁻¹²) of the base unit. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Mega-",
    "symbol": "M",
    "category": "Metric Prefix",
    "description": "A multiplier representing exactly one million (10⁶) of the base unit.",
    "misconception": "Writing it as a lowercase \"m\", which actually means milli-. A \"MW\" is a Megawatt (huge power plant), an \"mW\" is a milliwatt (laser pointer).",
    "formalDefinition": "Standard metric prefix multiplier representing a factor of standard base systems.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A multiplier representing exactly one million (10⁶) of the base unit. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Giga-",
    "symbol": "G",
    "category": "Metric Prefix",
    "description": "A multiplier representing exactly one billion (10⁹) of the base unit.",
    "misconception": "Students generally only associate Giga with computer bytes (Gigabytes), forgetting it applies to Hertz (GHz) and Watts (GW).",
    "formalDefinition": "Standard metric prefix multiplier representing a factor of standard base systems.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A multiplier representing exactly one billion (10⁹) of the base unit. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Angstrom",
    "symbol": "Å",
    "category": "Chemistry / Physics",
    "description": "A non-SI unit of length equal to 10⁻¹⁰ meters, commonly used to measure atomic radii and chemical bond lengths.",
    "misconception": "Because it is not a standard SI prefix, students forget how it converts to nanometers (10 Angstroms = 1 nanometer).",
    "formalDefinition": "Standard scientific coordinate represented by notation: $Å$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "A non-SI unit of length equal to 10⁻¹⁰ meters, commonly used to measure atomic radii and chemical bond lengths. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Barn",
    "symbol": "b",
    "category": "Nuclear Physics",
    "description": "A tiny unit of area used to describe the cross-section of atomic nuclei for scattering experiments (10⁻²⁸ m²).",
    "misconception": "Named as a joke (\"as big as a barn\" to hit with a particle). It highlights how incredibly small nuclear targets actually are.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $b$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "A tiny unit of area used to describe the cross-section of atomic nuclei for scattering experiments (10⁻²⁸ m²). This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Pound-Force",
    "symbol": "lbf",
    "category": "US Customary / Avoided",
    "description": "A unit of force (weight) in the US Customary system.",
    "misconception": "Routinely conflated with mass (kilograms). Because pounds measure force, your weight in pounds changes on the Moon.",
    "formalDefinition": "Non-standard or legacy measurement unit avoided in official scientific research.",
    "sources": [
      "NIST Handbook 44 (Specifications and Tolerances)"
    ],
    "body": "A unit of force (weight) in the US Customary system. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Atmosphere",
    "symbol": "atm",
    "category": "Chemistry / Earth Science",
    "description": "A non-SI unit of pressure defined as exactly 101,325 Pascals (roughly average sea-level pressure).",
    "misconception": "Students assume atmospheric pressure is constant everywhere. The \"atm\" is just an average baseline; pressure fluctuates constantly with weather.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $atm$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "A non-SI unit of pressure defined as exactly 101,325 Pascals (roughly average sea-level pressure). This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Torr",
    "symbol": "Torr",
    "category": "Chemistry",
    "description": "A unit of pressure based on an absolute scale, exactly 1/760 of a standard atmosphere.",
    "misconception": "Named after Torricelli, it is often confused with millimeters of mercury (mmHg). While extremely close, they are technically slightly different.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $Torr$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "A unit of pressure based on an absolute scale, exactly 1/760 of a standard atmosphere. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Millimeters of Mercury",
    "symbol": "mmHg",
    "category": "Medicine / Biology",
    "description": "A manometric unit of pressure used globally for blood pressure readings.",
    "misconception": "A literal measurement of how many millimeters a column of liquid mercury is pushed up by a pressure source.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $mmHg$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A manometric unit of pressure used globally for blood pressure readings. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Poise",
    "symbol": "P",
    "category": "Physics / Fluid Dynamics",
    "description": "The standard CGS unit of dynamic viscosity. Often used as centipoise (cP) where water is roughly 1 cP.",
    "misconception": "Viscosity is independent of density. Heavy liquids can flow easily, while light liquids can be sticky.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $P$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "The standard CGS unit of dynamic viscosity. Often used as centipoise (cP) where water is roughly 1 cP. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Jansky",
    "symbol": "Jy",
    "category": "Astronomy",
    "description": "A non-SI unit of spectral flux density, used widely in radio astronomy.",
    "misconception": "An incredibly tiny unit (10⁻²⁶ watts per square meter per hertz). The signals astronomers listen to from deep space are almost incomprehensibly faint.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $Jy$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A non-SI unit of spectral flux density, used widely in radio astronomy. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Curie",
    "symbol": "Ci",
    "category": "Nuclear Physics / Avoided",
    "description": "An obsolete non-SI unit of radioactivity, originally defined as the activity of 1 gram of Radium-226.",
    "misconception": "Replaced by the Becquerel. A single Curie is an incredibly massive amount of radiation (37 billion decays per second).",
    "formalDefinition": "Non-standard or legacy measurement unit avoided in official scientific research.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "An obsolete non-SI unit of radioactivity, originally defined as the activity of 1 gram of Radium-226. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Roentgen",
    "symbol": "R",
    "category": "Nuclear Physics / Avoided",
    "description": "A legacy unit of measurement for the exposure of X-rays and gamma rays.",
    "misconception": "Replaced by the Gray and Sievert. Made famous by the quote \"3.6 Roentgen... not great, not terrible\" in Chernobyl.",
    "formalDefinition": "Non-standard or legacy measurement unit avoided in official scientific research.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "A legacy unit of measurement for the exposure of X-rays and gamma rays. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Milliampere-Hour",
    "symbol": "mAh",
    "category": "Electricity",
    "description": "A unit of electric charge commonly used to describe the energy capacity of batteries.",
    "misconception": "Students confuse it with energy. A 5000 mAh battery capacity tells you the charge, but without knowing the voltage, you don't know the total energy (Joules).",
    "formalDefinition": "Standard scientific coordinate represented by notation: $mAh$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A unit of electric charge commonly used to describe the energy capacity of batteries. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Kilowatt-Hour",
    "symbol": "kWh",
    "category": "Electricity",
    "description": "A billing unit for energy delivered to consumers by electric utilities.",
    "misconception": "Students see \"Watt\" and assume it measures power. A Kilowatt-Hour is a unit of ENERGY (equivalent to 3.6 million Joules).",
    "formalDefinition": "Standard scientific coordinate represented by notation: $kWh$.",
    "sources": [
      "Standard Scientific Reference Coordination"
    ],
    "body": "A billing unit for energy delivered to consumers by electric utilities. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Electron",
    "symbol": "e⁻",
    "category": "Chemistry",
    "description": "While a particle, its elementary charge (1.602 × 10⁻¹⁹ Coulombs) is often used as a fundamental unit in quantum mechanics.",
    "misconception": "The charge is quantized. You can never have a fraction of an electron's charge; all charge in the universe is a multiple of this number.",
    "formalDefinition": "Derived scientific unit representing standard ratio or product coordinates: $e⁻$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "While a particle, its elementary charge (1.602 × 10⁻¹⁹ Coulombs) is often used as a fundamental unit in quantum mechanics. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Speed of Light",
    "symbol": "c",
    "category": "Physics / Relativity",
    "description": "A fundamental physical constant (exactly 299,792,458 m/s), often used as a unit of velocity in relativistic physics.",
    "misconception": "Students think \"c\" can be broken. According to relativity, it is the absolute cosmic speed limit for any information or matter in the universe.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $c$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "A fundamental physical constant (exactly 299,792,458 m/s), often used as a unit of velocity in relativistic physics. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Planck Length",
    "symbol": "ℓP",
    "category": "Quantum Physics",
    "description": "The base unit of length in the system of Planck units, roughly 1.616 × 10⁻³⁵ meters.",
    "misconception": "Often described as the \"pixel size\" of the universe. Meaningful physics models break down if you attempt to measure distances smaller than this.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $ℓP$.",
    "sources": [
      "BIPM International Bureau of Weights and Measures",
      "NIST Reference on Constants and Units"
    ],
    "body": "The base unit of length in the system of Planck units, roughly 1.616 × 10⁻³⁵ meters. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Bit",
    "symbol": "b",
    "category": "Computer Science",
    "description": "The most basic unit of information in computing, representing a single binary value (either 0 or 1).",
    "misconception": "Students often confuse megabits (Mbps) with megabytes (MB/s) when looking at internet speeds. A bit is a lowercase \"b\", while a byte is a capital \"B\".",
    "formalDefinition": "The bit, symbol $\\text{b}$, is the basic unit of information in computing and digital communications. It is defined as the information capacity of a binary digit, representing a logical state that can have only one of two values: $0$ or $1$.",
    "sources": [
      "IEC 80000-13 (Quantities and units - Information science and technology)",
      "IEEE 1541-2002"
    ],
    "body": "Coined by mathematician John Tukey and popularized by Claude Shannon, the bit is the bedrock of information theory. At a physical level, a bit is represented in hardware as an electrical voltage, a magnetic alignment, or an optical reflection state, acting as the fundamental element of digital computation."
  },
  {
    "name": "Byte",
    "symbol": "B",
    "category": "Computer Science",
    "description": "A unit of digital information that most commonly consists of exactly 8 bits. It represents a single character of text in a computer.",
    "misconception": "Assuming 1 Kilobyte is exactly 1,000 bytes. Because computers operate in binary (base 2), a traditional kilobyte (Kibibyte) is actually 1,024 bytes (2¹⁰).",
    "formalDefinition": "The byte, symbol $\\text{B}$, is a unit of digital information that consists of exactly eight bits. It represents the smallest addressable unit of memory in most computer architectures:\n\n$$1\\text{ B} = 8\\text{ b}$$",
    "sources": [
      "IEC 80000-13",
      "IEEE 1541-2002"
    ],
    "body": "The byte was historically the number of bits used to encode a single character of text in a computer (like ASCII). While early computers experimented with 4-bit, 6-bit, or 9-bit bytes, the industry standardized on 8 bits in the 1960s with the IBM System/360. A byte can represent $2^8 = 256$ distinct values."
  },
  {
    "name": "FLOPS",
    "symbol": "FLOPS",
    "category": "Computer Science",
    "description": "Floating Point Operations Per Second. A measure of computer performance, specifically calculating how many complex math equations a processor can solve in one second.",
    "misconception": "Often confused with Clock Speed (Hertz). Hertz measures how fast the processor ticks, while FLOPS measures how much actual math gets done during those ticks.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $FLOPS$.",
    "sources": [
      "IEEE Standards Board",
      "ISO/IEC Joint Technical Committee"
    ],
    "body": "Floating Point Operations Per Second. A measure of computer performance, specifically calculating how many complex math equations a processor can solve in one second. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Pixel",
    "symbol": "px",
    "category": "Computer Science / Graphics",
    "description": "The smallest controllable element of a picture represented on a screen. Short for \"Picture Element\".",
    "misconception": "Assuming a pixel has a set physical size. A pixel on a giant Jumbotron is massive; a pixel on a modern smartphone is microscopic.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $px$.",
    "sources": [
      "IEEE Standards Board",
      "ISO/IEC Joint Technical Committee"
    ],
    "body": "The smallest controllable element of a picture represented on a screen. Short for \"Picture Element\". This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  },
  {
    "name": "Baud",
    "symbol": "Bd",
    "category": "Computer Science / Telecommunications",
    "description": "The unit for symbol rate or modulation rate in a digitally modulated signal. One baud is one symbol (or state change) per second.",
    "misconception": "Confused with bits per second (bps). If a single signal change carries 4 bits of data, a 1,000 Baud connection is actually transmitting at 4,000 bps.",
    "formalDefinition": "Standard scientific coordinate represented by notation: $Bd$.",
    "sources": [
      "IEEE Standards Board",
      "ISO/IEC Joint Technical Committee"
    ],
    "body": "The unit for symbol rate or modulation rate in a digitally modulated signal. One baud is one symbol (or state change) per second. This unit plays a critical role in standardizing quantitative data across mathematical, physical, and engineering domains, ensuring consistency in curriculum experiments."
  }
];
