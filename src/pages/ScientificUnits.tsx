import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { scientificUnits as units } from '../data/scientificUnits';

const ScientificUnits = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUnits = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return units.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.symbol.toLowerCase().includes(query) ||
        u.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Scientific Units Reference | Eductools</title>
        <meta name="description" content="A comprehensive reference guide to standard scientific units, abbreviations, and their real-world meanings for STEM students." />
      </Helmet>
      
      <div className="mb-6 flex justify-between items-center">
        <Link to="/" className="btn btn-ghost">&larr; Back to Home</Link>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none bg-base-100 p-6 md:p-10 rounded-2xl shadow-xl border border-base-200">
        <h1 className="text-4xl font-extrabold text-primary mb-2">Scientific Units Reference</h1>
        <p className="text-lg text-base-content/70 mb-8">
          In science, a number without a unit is completely meaningless. This repository defines the standard SI and derived units used across all Eductools visualizers.
        </p>

        <div className="form-control w-full mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search by unit name, symbol, or category... (e.g. 'Watts', 'Hz', 'Chemistry')" 
            className="input input-lg input-bordered w-full pl-12 bg-base-200 focus:bg-base-100 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
              <button className="btn btn-ghost btn-circle btn-sm" onClick={() => setSearchQuery('')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          )}
        </div>

        <div className="mb-4 flex justify-between items-center text-sm font-semibold text-base-content/50">
          <span>Showing {filteredUnits.length} units</span>
          <span className="hidden sm:inline">Click a unit to expand details</span>
        </div>

        <div className="space-y-3">
          {filteredUnits.length > 0 ? (
            filteredUnits.map((unit) => (
              <div 
                key={unit.symbol + unit.name} 
                id={unit.symbol.replace(/[^a-zA-Z0-9]/g, '-')} 
                className="collapse collapse-arrow bg-base-200 border border-base-300 scroll-mt-24"
              >
                <input type="checkbox" className="peer" /> 
                <div className="collapse-title flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 peer-checked:bg-base-300/50 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-secondary m-0 leading-tight">{unit.name}</span>
                    <span className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mt-1">{unit.category}</span>
                  </div>
                  <div className="bg-base-100 px-3 py-1 rounded-md border border-base-300 shadow-inner font-mono text-lg font-black text-accent sm:min-w-[80px] text-center self-start sm:self-center">
                    {unit.symbol}
                  </div>
                </div>
                <div className="collapse-content peer-checked:bg-base-300/20 pt-2 pb-5 border-t border-base-300/50"> 
                  <div className="space-y-5 mt-4">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/70 m-0 mb-1">What it measures</h3>
                      <p className="text-base text-base-content m-0 leading-relaxed">{unit.description}</p>
                    </div>
                    {unit.misconception && (
                      <div className="bg-warning/10 border border-warning/30 p-4 rounded-xl">
                        <h3 className="text-sm font-black uppercase tracking-wider text-warning m-0 flex items-center gap-2 mb-2">
                          <span className="text-warning text-base">⚠️</span> Common Misconception
                        </h3>
                        <p className="m-0 text-sm leading-relaxed text-base-content/90 font-medium">{unit.misconception}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-base-200 rounded-xl border border-base-300">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="text-xl font-bold">No units found</h3>
              <p className="text-base-content/60 mt-2">We couldn't find any scientific unit matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScientificUnits;
