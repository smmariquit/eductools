import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const units = [
  {
    name: 'Photosynthetic Photon Flux Density (PPFD)',
    symbol: 'μmol m⁻² s⁻¹',
    category: 'Biology / Optics',
    description: 'Measures the amount of light (photons) reaching a specific surface area per second. Specifically, it counts the photons within the 400–700 nanometer spectrum, which are the only ones plants can use for photosynthesis.',
    misconception: 'Often confused with "Lux" or "Lumens." Lux measures how bright light appears to the human eye (which is highly sensitive to green light). Plants actually absorb red and blue light, reflecting green. Therefore, PPFD is the true measure of "plant-useful" light.'
  },
  {
    name: 'Parts Per Million',
    symbol: 'ppm',
    category: 'Chemistry / Environmental Science',
    description: 'A way of measuring very dilute concentrations of substances. For example, 400 ppm of CO₂ means that out of every one million air molecules, 400 of them are Carbon Dioxide.',
    misconception: 'It can be hard to visualize how small a "part per million" is. If you had a million drops of water (which equals roughly 50 liters), one part per million is exactly one drop.'
  },
  {
    name: 'Molar Mass',
    symbol: 'g/mol',
    category: 'Chemistry',
    description: 'The mass of one mole of a substance. A mole is exactly 6.022 × 10²³ particles (Avogadro\'s number). It bridges the gap between the microscopic world of atoms and the macroscopic world we can measure on a scale.',
    misconception: 'Often confused with molecular weight. Molar mass is a physical property (grams), whereas molecular weight is technically a dimensionless ratio, though the numerical values are often the same.'
  },
  {
    name: 'Joule',
    symbol: 'J',
    category: 'Physics',
    description: 'The standard unit of energy or work. One Joule is the amount of energy required to lift a small apple (about 100 grams) one meter straight up into the air.',
    misconception: 'Energy and Power are often conflated. A Joule is an amount of energy, whereas a Watt (Joules per second) is the *rate* at which that energy is being used.'
  },
  {
    name: 'Pascal',
    symbol: 'Pa',
    category: 'Physics / Earth Science',
    description: 'The standard unit of pressure. One Pascal is equal to one Newton of force spread evenly over one square meter.',
    misconception: 'Because a Pascal is incredibly small (roughly the pressure a single sheet of paper exerts on a desk), meteorologists and scientists usually work in kiloPascals (kPa) or hectoPascals (hPa).'
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
