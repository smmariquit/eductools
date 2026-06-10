import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const units = [
  {
    name: 'Meter',
    symbol: 'm',
    category: 'Physics',
    description: 'The base unit of length and distance in the metric system. One meter is roughly the length of a standard baseball bat or the distance from the floor to the doorknob.',
    misconception: 'Students often confuse distance (total ground covered) with displacement (straight-line distance from start to finish). The meter measures both, but they are physically different concepts.'
  },
  {
    name: 'Kilogram',
    symbol: 'kg',
    category: 'Physics / Chemistry',
    description: 'The base unit of mass, which measures the amount of matter in an object. One kilogram is roughly the mass of a one-liter bottle of water or a thick textbook.',
    misconception: 'Mass is constantly confused with Weight. Mass (kg) never changes regardless of where you are in the universe. Weight (measured in Newtons) changes depending on gravity.'
  },
  {
    name: 'Newton',
    symbol: 'N',
    category: 'Physics',
    description: 'The standard unit of force, representing the push or pull on an object. One Newton is roughly the force required to hold a medium-sized apple in the palm of your hand against Earth\'s gravity.',
    misconception: 'Students often use kilograms to describe the force of gravity (e.g., "it weighs 10 kg"). Scientifically, weight is a force and must be measured in Newtons.'
  },
  {
    name: 'Joule',
    symbol: 'J',
    category: 'Physics / Chemistry',
    description: 'The standard unit of energy or work. One Joule is the amount of energy required to lift that same small apple one meter straight up into the air.',
    misconception: 'Energy (Joules) and Power (Watts) are frequently conflated. A Joule is an absolute amount of energy, like the amount of water in a bucket. Power is how fast you empty the bucket.'
  },
  {
    name: 'Watt',
    symbol: 'W',
    category: 'Physics',
    description: 'The unit of power, measuring the rate at which energy is transferred or used. One Watt equals one Joule per second. A standard incandescent lightbulb uses 60 Joules every single second (60 Watts).',
    misconception: 'Often thought of simply as "electricity." However, Watts can measure any power, including mechanical power (like how fast a motor lifts a weight) or biological power (human bodies run at about 100 Watts).'
  },
  {
    name: 'Meter per Second',
    symbol: 'm/s',
    category: 'Physics',
    description: 'The standard unit for speed and velocity. Walking at 1 m/s is a brisk, normal walking pace. Highway driving is roughly 25 to 30 m/s.',
    misconception: 'Speed and Velocity are often used interchangeably. Speed is just how fast you are going (m/s), but Velocity is a vector—meaning it includes both speed AND a specific direction.'
  },
  {
    name: 'Meter per Second Squared',
    symbol: 'm/s²',
    category: 'Physics',
    description: 'The unit of acceleration, measuring how much velocity changes every second. Earth\'s gravity causes free-falling objects to accelerate at 9.8 m/s² (they speed up by 9.8 m/s every passing second).',
    misconception: 'Students often assume that moving fast means high acceleration. An airplane flying at 900 km/h at a steady cruising speed has zero acceleration.'
  },
  {
    name: 'Hertz',
    symbol: 'Hz',
    category: 'Physics',
    description: 'The unit of frequency, measuring the number of cycles or waves that happen in exactly one second. One Hertz means one event per second. The human heart beats at roughly 1 to 1.5 Hz.',
    misconception: 'Often confused with the speed of a wave. Hertz tells you how many waves hit the shore per second, not how fast the wave itself was traveling across the ocean.'
  },
  {
    name: 'Kelvin',
    symbol: 'K',
    category: 'Chemistry / Physics',
    description: 'The absolute scientific scale for temperature, starting at Absolute Zero (the point where all atomic motion completely stops). Room temperature is roughly 293 K.',
    misconception: 'Students try to write it as "Degrees Kelvin" (°K). Unlike Celsius or Fahrenheit, Kelvin is an absolute scale, so it is just "Kelvins" without the degree symbol.'
  },
  {
    name: 'Pascal',
    symbol: 'Pa',
    category: 'Physics / Earth Science',
    description: 'The standard unit of pressure, equal to one Newton of force spread evenly over one square meter. Because a Pascal is tiny (the pressure of a single sheet of paper), meteorologists usually use hectoPascals (hPa).',
    misconception: 'Students confuse Pressure with Force. A sharp needle requires very little Force to pierce skin because the Force is concentrated onto a tiny area, creating massive Pressure.'
  },
  {
    name: 'Gram per Cubic Centimeter',
    symbol: 'g/cm³',
    category: 'Chemistry / Earth Science',
    description: 'The standard unit of density, measuring how tightly packed matter is. Pure water has a density of exactly 1.0 g/cm³. Anything with a higher density will sink in water.',
    misconception: 'Students think "heavier" objects sink. A massive log is incredibly heavy but floats because its density is lower than water. A tiny pebble is very light but sinks because its density is higher than water.'
  },
  {
    name: 'Mole',
    symbol: 'mol',
    category: 'Chemistry',
    description: 'A massive specific number used to count atoms. Just as "a dozen" always means 12, "a mole" always means exactly 6.022 × 10²³ particles (Avogadro\'s number).',
    misconception: 'Students struggle with the scale. If you had a mole of basketballs, they would create a new planet the size of Earth. In chemistry, a mole of water easily fits inside a tiny shot glass.'
  },
  {
    name: 'Molarity',
    symbol: 'M (mol/L)',
    category: 'Chemistry / Biology',
    description: 'The measure of chemical concentration, calculating how many moles of a substance are dissolved in exactly one liter of solution.',
    misconception: 'Often confused with the absolute amount of a chemical. A small cup of 1 M acid and a huge swimming pool of 1 M acid have the same concentration, but vastly different total amounts of acid.'
  },
  {
    name: 'Ampere',
    symbol: 'A',
    category: 'Physics',
    description: 'The unit of electric current, measuring the flow rate of electrical charge (electrons) through a wire. Imagine water flowing through a pipe: Amperes represent the gallons-per-minute flow rate.',
    misconception: 'Students view current as "using up" electricity. Current doesn\'t get consumed by a lightbulb; the same amount of current that flows into the bulb flows back out to complete the circuit.'
  },
  {
    name: 'Volt',
    symbol: 'V',
    category: 'Physics',
    description: 'The unit of electrical potential difference. Returning to the water pipe analogy, Volts represent the water pressure pushing the electrons through the wire.',
    misconception: 'Students assume high voltage means high danger. A static shock from a doorknob can be 20,000 Volts but contains almost zero Amps (flow), making it harmless. High amps are what kill.'
  },
  {
    name: 'Ohm',
    symbol: 'Ω',
    category: 'Physics',
    description: 'The unit of electrical resistance. It measures how much a material resists the flow of electrons. Copper wire has very low resistance; rubber has incredibly high resistance.',
    misconception: 'Students think thicker wires have higher resistance because they are "harder to get through." Actually, thicker wires have LOWER resistance because there is more physical space for electrons to travel.'
  },
  {
    name: 'Photosynthetic Photon Flux Density',
    symbol: 'μmol m⁻² s⁻¹',
    category: 'Biology / Optics',
    description: 'Measures the exact amount of plant-useful light (photons between 400–700 nm) striking a square meter of leaf surface every second.',
    misconception: 'Confused with Lux. Lux measures brightness for human eyes (heavily biased toward green light). Plants absorb red and blue light, so a green light might look bright to us (high Lux) but starve a plant (low PPFD).'
  },
  {
    name: 'Parts Per Million',
    symbol: 'ppm',
    category: 'Chemistry / Environmental Science',
    description: 'A way of measuring extremely dilute concentrations of substances in air or water. 400 ppm of atmospheric CO₂ means out of 1 million air molecules, exactly 400 are Carbon Dioxide.',
    misconception: 'Students struggle to visualize how tiny this is. If you had one million drops of water (roughly 50 liters or a small bathtub), one part per million is exactly one single drop.'
  }
];

const ScientificUnits = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Scientific Units Reference | Eductools</title>
        <meta name="description" content="A comprehensive reference guide to standard scientific units, abbreviations, and their real-world meanings for STEM students." />
      </Helmet>
      
      <div className="mb-8 flex justify-between items-center">
        <Link to="/" className="btn btn-ghost">&larr; Back to Home</Link>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none bg-base-100 p-8 md:p-12 rounded-2xl shadow-xl border border-base-200">
        <h1 className="text-4xl font-extrabold text-primary mb-2">Scientific Units Reference</h1>
        <p className="text-xl text-base-content/70 mb-10">
          In science, a number without a unit is completely meaningless. This repository defines the standard SI and derived units used across all Eductools visualizers.
        </p>

        <div className="space-y-8">
          {units.map((unit) => (
            <div key={unit.symbol} id={unit.symbol.replace(/[^a-zA-Z0-9]/g, '-')} className="bg-base-200 p-6 rounded-xl border border-base-300 scroll-mt-24">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-base-300">
                <div>
                  <h2 className="text-2xl font-bold m-0 p-0 text-secondary">{unit.name}</h2>
                  <span className="badge badge-outline mt-2">{unit.category}</span>
                </div>
                <div className="bg-base-100 px-4 py-2 rounded-lg border border-base-300 shadow-inner font-mono text-2xl font-black text-accent min-w-32 text-center">
                  {unit.symbol}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-base-content/60 m-0">What it measures</h3>
                  <p className="mt-1">{unit.description}</p>
                </div>
                <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-warning-content/80 m-0 flex items-center gap-2">
                    <span className="text-warning">⚠️</span> Common Misconception
                  </h3>
                  <p className="mt-1 text-sm">{unit.misconception}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScientificUnits;
