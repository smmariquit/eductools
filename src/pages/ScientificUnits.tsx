import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { scientificUnits as units } from '../data/scientificUnits';
import { unitGuideSlug } from '../lib/unitGuide';
import { Search, X, ChevronLeft, AlertTriangle, Info, ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { UnitGuideLink } from '../components/scientific-units/UnitGuideLink';
import { CrayonArt } from '../components/crayon';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { SIFoundations } from '../components/scientific-units/SIFoundations';

const BlockMath = ({ math }: { math: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(math, ref.current, { displayMode: true, throwOnError: false });
    }
  }, [math]);
  return <div ref={ref} className="overflow-x-auto my-2 py-1 scrollbar-none" />;
};

const InlineMath = ({ math }: { math: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(math, ref.current, { displayMode: false, throwOnError: false });
    }
  }, [math]);
  return <span ref={ref} />;
};

const FormattedText = ({ text }: { text: string }) => {
  if (!text) return null;
  const blocks = text.split(/(\$\$.*?\$\$)/g);
  return (
    <>
      {blocks.map((block, i) => {
        if (block.startsWith('$$') && block.endsWith('$$')) {
          const math = block.slice(2, -2);
          return <BlockMath key={i} math={math} />;
        }
        const inlines = block.split(/(\$.*?\$)/g);
        return (
          <span key={i}>
            {inlines.map((part, j) => {
              if (part.startsWith('$') && part.endsWith('$')) {
                const math = part.slice(1, -1);
                return <InlineMath key={j} math={math} />;
              }
              return part;
            })}
          </span>
        );
      })}
    </>
  );
};

const categoryTabs = [
  { id: 'All', label: 'All Units' },
  { id: 'Physics', label: 'Physics' },
  { id: 'Chemistry', label: 'Chemistry' },
  { id: 'Biology', label: 'Biology & Life' },
  { id: 'Space', label: 'Earth & Space' },
  { id: 'Computer', label: 'Computer Sci' },
  { id: 'Prefixes', label: 'Prefixes' },
  { id: 'Customary', label: 'US Customary' }
];

const matchesCategoryTab = (unitCategory: string, tabId: string) => {
  if (tabId === 'All') return true;
  const cat = unitCategory.toLowerCase();
  switch (tabId) {
    case 'Physics':
      return (
        cat.includes('physics') ||
        cat.includes('kinematics') ||
        cat.includes('dynamics') ||
        cat.includes('energy') ||
        cat.includes('waves') ||
        cat.includes('mechanics') ||
        cat.includes('electricity') ||
        cat.includes('magnetism') ||
        cat.includes('electromagnetism') ||
        cat.includes('thermodynamics') ||
        cat.includes('optics') ||
        cat.includes('acoustics') ||
        cat.includes('aviation')
      );
    case 'Chemistry':
      return cat.includes('chemistry') || cat.includes('biochemistry');
    case 'Biology':
      return (
        cat.includes('biology') ||
        cat.includes('genetics') ||
        cat.includes('physiology') ||
        cat.includes('medicine') ||
        cat.includes('botany') ||
        cat.includes('biochemistry')
      );
    case 'Space':
      return (
        cat.includes('astronomy') ||
        cat.includes('earth science') ||
        cat.includes('oceanography') ||
        cat.includes('meteorology')
      );
    case 'Computer':
      return (
        cat.includes('computer science') ||
        cat.includes('graphics') ||
        cat.includes('telecommunications')
      );
    case 'Prefixes':
      return cat.includes('prefix');
    case 'Customary':
      return (
        cat.includes('us customary') ||
        cat.includes('imperial') ||
        cat.includes('avoided') ||
        cat.includes('obsolete')
      );
    default:
      return true;
  }
};

const ScientificUnits = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('All');
  const [selectedUnit, setSelectedUnit] = useState<typeof units[0] | null>(units[0]);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

  const filteredUnits = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return units.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(query) ||
        u.symbol.toLowerCase().includes(query) ||
        u.category.toLowerCase().includes(query);
      const matchesTab = matchesCategoryTab(u.category, activeCategoryTab);
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeCategoryTab]);

  const currentUnit = useMemo(() => {
    if (!selectedUnit) return filteredUnits[0] || null;
    const exists = filteredUnits.some((u) => u.name === selectedUnit.name && u.symbol === selectedUnit.symbol);
    return exists ? selectedUnit : (filteredUnits[0] || null);
  }, [filteredUnits, selectedUnit]);

  const selectUnit = useCallback((unit: typeof units[0]) => {
    setSelectedUnit(unit);
    setMobileView('detail');
    const slug = unitGuideSlug(unit.symbol);
    window.history.replaceState(null, '', `#${encodeURIComponent(slug)}`);
  }, []);

  useEffect(() => {
    const pickFromHash = () => {
      const raw = window.location.hash.slice(1);
      if (!raw) return;
      const hash = decodeURIComponent(raw);
      const found =
        units.find((u) => unitGuideSlug(u.symbol) === hash) ??
        units.find((u) => u.symbol === hash);
      if (found) {
        setSelectedUnit(found);
        setMobileView('detail');
      }
    };
    pickFromHash();
    window.addEventListener('hashchange', pickFromHash);
    return () => window.removeEventListener('hashchange', pickFromHash);
  }, []);

  return (
    <>
    <div className="container mx-auto px-4 py-6 max-w-6xl h-auto md:h-[calc(100vh-120px)] flex flex-col">
      <Helmet>
        <title>Scientific Units Reference | EduVisualsPH</title>
        <meta name="description" content="SI and common scientific units with plain definitions, standard symbols, and the misconceptions students actually hit." />
      </Helmet>
      
      <div className="flex justify-between items-center mb-4 shrink-0">
        <Link to="/" className="btn btn-ghost btn-sm gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="mb-6 shrink-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2 tracking-tight">Scientific Units Explorer</h1>
        <p className="text-sm md:text-base text-base-content/70">
          In science, a number without a unit is completely meaningless. Browse the standard SI and derived units used across EduVisualsPH.
        </p>
      </div>

      <div className="flex-1 min-h-[500px] md:min-h-0 bg-base-100 rounded-2xl border border-base-300 shadow-xl overflow-hidden flex flex-col md:flex-row mb-6">
        
        <div className={`w-full md:w-5/12 lg:w-4/12 border-r border-base-300 flex flex-col min-h-0 h-full ${mobileView === 'detail' ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-base-300 space-y-3 shrink-0 bg-base-200/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/40" />
              <input 
                type="text" 
                placeholder="Search units, symbols..." 
                className="input input-bordered w-full pl-10 pr-10 bg-base-100 focus:bg-base-100 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70 transition-colors"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategoryTab(tab.id)}
                  className={`btn btn-xs rounded-full px-3 whitespace-nowrap border ${
                    activeCategoryTab === tab.id
                      ? 'btn-primary border-primary'
                      : 'bg-base-100 border-base-300 hover:bg-base-200 text-base-content/75'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-base-200/20">
            {filteredUnits.length > 0 ? (
              filteredUnits.map((unit) => {
                const isActive = currentUnit && currentUnit.name === unit.name && currentUnit.symbol === unit.symbol;
                return (
                  <button
                    key={unit.symbol + unit.name}
                    onClick={() => selectUnit(unit)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-base-200 border-base-300 text-primary font-semibold shadow-sm'
                        : 'bg-base-100 hover:bg-base-200/50 border-base-200 text-base-content'
                    }`}
                  >
                    <div className={`min-w-[3rem] min-h-[2.5rem] w-auto h-auto px-2 py-1 shrink-0 flex items-center justify-center font-mono text-xs sm:text-sm font-black rounded-lg shadow-sm border text-center break-words max-w-[80px] sm:max-w-none ${
                      isActive
                        ? 'bg-primary text-primary-content border-primary/20'
                        : 'bg-base-200 text-secondary border-base-300'
                    }`}>
                      {unit.symbol}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold truncate">{unit.name}</div>
                      <div className="text-[10px] uppercase tracking-wider text-base-content/50 truncate mt-0.5">{unit.category}</div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-12 px-4">
                <Search className="w-7 h-7 mx-auto mb-2 text-base-content/40" aria-hidden="true" />
                <h3 className="text-base font-bold text-base-content/80">No units found</h3>
                <p className="text-xs text-base-content/50 mt-1">Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-base-300 bg-base-200/50 text-xs text-base-content/50 flex justify-between items-center shrink-0">
            <span>{filteredUnits.length} units matching</span>
            <span className="hidden md:inline">Select to view info</span>
          </div>
        </div>

        <div className={`w-full md:w-7/12 lg:w-8/12 flex flex-col min-h-0 h-full ${mobileView === 'list' ? 'hidden md:flex' : 'flex bg-base-100'}`}>
          {currentUnit ? (
            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col justify-between">
              <div>
                <button 
                  className="md:hidden btn btn-ghost btn-sm gap-1 pl-0 mb-6 text-primary"
                  onClick={() => setMobileView('list')}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to List
                </button>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-base-200 text-base-content/80 border border-base-300 mb-4 uppercase tracking-wider">
                  {currentUnit.category}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">{currentUnit.name}</h2>
                  </div>
                  
                  <div className="font-mono text-3xl font-black text-accent bg-base-200 border border-base-300 px-6 py-3 rounded-2xl shadow-inner min-w-[100px] text-center self-start sm:self-center inline-flex items-center justify-center gap-2">
                    {currentUnit.symbol}
                    <UnitGuideLink unit={currentUnit.symbol} size={18} className="text-base-content/40" />
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Brief Overview */}
                  <div className="prose max-w-none">
                    <p className="text-base md:text-lg text-base-content/90 leading-relaxed font-medium">
                      {currentUnit.description}
                    </p>
                  </div>

                  {/* Formal Scientific Definition */}
                  <div className="bg-base-200 border border-base-300 rounded-2xl p-5 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="h-4 w-4 text-primary" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Formal Scientific Definition</h4>
                    </div>
                    <div className="text-base text-base-content leading-relaxed font-semibold">
                      <FormattedText text={currentUnit.formalDefinition} />
                    </div>
                  </div>

                  {/* Detailed Explanation / Body */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-base-content/60">
                      <BookOpen className="h-4 w-4 text-secondary" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">Details &amp; Context</h4>
                    </div>
                    <p className="text-sm md:text-base text-base-content/85 leading-relaxed">
                      {currentUnit.body}
                    </p>
                  </div>

                  {/* Common Student Misconception */}
                  {currentUnit.misconception && (
                    <div className="bg-base-200 border border-base-300 rounded-2xl p-5 md:p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-3 text-warning">
                        <AlertTriangle className="h-4 w-4" />
                        <h4 className="text-xs font-bold uppercase tracking-wider">Common Student Misconception</h4>
                      </div>
                      <p className="text-sm text-base-content/95 leading-relaxed font-semibold">
                        {currentUnit.misconception}
                      </p>
                    </div>
                  )}

                  {/* Sources & References */}
                  {currentUnit.sources && currentUnit.sources.length > 0 && (
                    <div className="pt-4 border-t border-base-200 space-y-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-base-content/40">Sources &amp; References</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentUnit.sources.map((source) => (
                          <a
                            key={source.href}
                            href={source.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-base-200 border border-base-300 rounded-lg px-2.5 py-1 text-xs text-base-content/70 font-medium hover:bg-base-300 hover:text-primary transition-colors"
                          >
                            <ExternalLink className="h-3 w-3 text-base-content/40" />
                            <span>{source.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-base-200 text-xs text-base-content/40 flex flex-col sm:flex-row justify-between gap-2">
                <span>Standard scientific reference • EduVisualsPH</span>
                <span>Values are defined in SI standard parameters</span>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-base-100">
              <div className="max-w-md space-y-4">
                <div className="flex justify-center opacity-60">
                  <CrayonArt name="ruler" size={64} color="sunshine" />
                </div>
                <h3 className="text-xl font-bold text-base-content/80">No Unit Selected</h3>
                <p className="text-sm text-base-content/50">
                  Select a scientific unit from the list on the left to explore its definition, standard notation, and common student misconceptions.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>

    <div className="container mx-auto px-4 pb-16 max-w-6xl">
      <SIFoundations />
    </div>
    </>
  );
};

export default ScientificUnits;
