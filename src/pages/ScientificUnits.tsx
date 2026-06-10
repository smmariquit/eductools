import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { scientificUnits as units } from '../data/scientificUnits';

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
