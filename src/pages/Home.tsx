import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { LayoutGrid, List } from 'lucide-react';
import { GitHubMark } from '../components/icons/GitHubMark';
import AdUnit from '../components/AdUnit';
import { visualizerModules } from '../data/registry';
import { searchModules } from '../utils/search';
import { Helmet } from 'react-helmet-async';
import { CrayonArt } from '../components/crayon';
import { crayonArtForTags } from '../components/crayon/subjectArt';
import { Sources } from '../components/content';
import { Pagination } from '../components/ui/Pagination';

const TOOLS_PER_PAGE = 9;

const Home = () => {
  const fullTitle = 'Interactive STEM Visualizers | EduVisualsPH';
  const description = 'Free interactive STEM visualizers aligned with the Philippine DepEd MATATAG curriculum. Explore Physics, Chemistry, Biology, and Earth Science.';
 const ogImageUrl = `https://eductools.ph/api/og?title=${encodeURIComponent('Interactive STEM Visualizers')}&desc=${encodeURIComponent(description.slice(0, 100))}`;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const subjectParam = searchParams.get('subject');

  const [activeGrade, setActiveGrade] = useState('All');
  const [matatagOnly, setMatatagOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Derive activeSubject directly from URL params — no useEffect needed
  const activeSubject = subjectParam || 'All';
  const setActiveSubject = (value: string) => {
    if (value === 'All') {
      searchParams.delete('subject');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ subject: value });
    }
  };

  const grades = ['All', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const subjects = ['All', 'Math', 'Science', 'Biology', 'Physics', 'Chemistry', 'Earth Science', 'DRRR'];

  const filteredModules = useMemo(() => {
    const byFilters = visualizerModules.filter(m => {
      const matchGrade = activeGrade === 'All' || m.tags.includes(activeGrade);
      const matchSubject = activeSubject === 'All' || m.tags.includes(activeSubject);
      const matchMatatag = !matatagOnly || m.tags.includes('MATATAG Aligned');
      return matchGrade && matchSubject && matchMatatag;
    });
    // Approximate (fuzzy, typo- and synonym-tolerant) search across
    // title + description + tags + searchTags; also ranks results by relevance.
    return searchModules(byFilters, searchQuery);
  }, [activeGrade, activeSubject, matatagOnly, searchQuery]);

  const [page, setPage] = useState(1);

  // Reset to the first page whenever the active filters change.
  useEffect(() => {
    setPage(1);
  }, [activeGrade, activeSubject, matatagOnly, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredModules.length / TOOLS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pagedModules = filteredModules.slice((currentPage - 1) * TOOLS_PER_PAGE, currentPage * TOOLS_PER_PAGE);

  const handlePageChange = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Typeahead suggestions: rank by where the query matches (title prefix beats
  // title substring beats tag beats description), independent of the filters.
  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return visualizerModules
      .map((m) => {
        const title = m.title.toLowerCase();
        let score = -1;
        if (title.startsWith(q)) score = 0;
        else if (title.includes(q)) score = 1;
        else if (m.tags.some((tag) => tag.toLowerCase().includes(q))) score = 2;
        else if (m.description.toLowerCase().includes(q)) score = 3;
        return { module: m, score };
      })
      .filter((s) => s.score >= 0)
      .sort((a, b) => a.score - b.score || a.module.title.localeCompare(b.module.title))
      .slice(0, 6)
      .map((s) => s.module);
  }, [searchQuery]);

  // Reset the keyboard highlight whenever the suggestion list changes.
  useEffect(() => {
    setActiveSuggestion(-1);
  }, [searchQuery]);

  // Close the suggestions when clicking outside the search box.
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const goToTool = (path: string) => {
    setShowSuggestions(false);
    navigate(path);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Escape') setShowSuggestions(false);
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion((i) => (i + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion((i) => (i - 1 + suggestions.length) % suggestions.length);
        break;
      case 'Enter':
        if (activeSuggestion >= 0) {
          e.preventDefault();
          goToTool(suggestions[activeSuggestion].path);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EduVisualsPH" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>
      <div className="py-8 border-b border-base-300 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <CrayonArt name="rocket" size={52} className="hidden sm:inline-block shrink-0" />
            <h1 className="text-4xl font-extrabold text-primary mb-0">Learning Modules &amp; Visualizers</h1>
          </div>
          <CrayonArt name="underline-squiggle" width="clamp(160px, 60%, 280px)" height={18} className="block mt-1 mb-3" animate="draw" />
          <p className="text-lg text-base-content/80 max-w-3xl">
            Free interactive tools for Philippine science and math classes. Pick a module, move the sliders,
            and read the deep-dive below when you want the full explanation.
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
          <a
            href="https://github.com/smmariquit/eduvisualsph"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm border border-base-300 shadow-sm hover:shadow-md transition-shadow"
 title="EduVisualsPH is open source: view the code on GitHub"
 aria-label="View source on GitHub"
          >
            <GitHubMark className="w-4 h-4" />
            <span className="max-sm:hidden">GitHub</span>
          </a>
          <Link to="/units" className="btn btn-secondary btn-outline shadow-sm hover:shadow-md transition-shadow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            Scientific Units Reference
          </Link>
        </div>
      </div>

      <AdUnit slotId="1111111111" />

      {/* Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 bg-base-200 p-4 lg:p-6 rounded-xl border border-base-300 shadow-sm">
        
        {/* Search Bar */}
        <div className="w-full md:w-1/3 relative" ref={searchBoxRef}>
          <input 
            type="text" 
 placeholder="Search tools..." 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => { if (searchQuery.trim()) setShowSuggestions(true); }}
            onKeyDown={handleSearchKeyDown}
            className="input input-bordered w-full bg-base-100"
            role="combobox"
            aria-expanded={showSuggestions && suggestions.length > 0}
            aria-controls="search-suggestions"
            aria-autocomplete="list"
            aria-activedescendant={activeSuggestion >= 0 ? `search-suggestion-${activeSuggestion}` : undefined}
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul
              id="search-suggestions"
              role="listbox"
              className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-lg"
            >
              {suggestions.map((mod, i) => {
                const art = crayonArtForTags(mod.tags);
                return (
                  <li
                    key={mod.id}
                    id={`search-suggestion-${i}`}
                    role="option"
                    aria-selected={i === activeSuggestion}
                    onMouseEnter={() => setActiveSuggestion(i)}
                    onMouseDown={(e) => { e.preventDefault(); goToTool(mod.path); }}
                    className={`flex cursor-pointer items-center gap-3 px-3 py-2 border-b border-base-200 last:border-0 ${i === activeSuggestion ? 'bg-base-200' : ''}`}
                  >
                    <CrayonArt name={art.name} color={art.color} size={26} className="shrink-0" />
                    <div className="min-w-0">
                      <p className="m-0 truncate font-semibold text-base-content">{mod.title}</p>
                      <p className="m-0 truncate text-xs text-base-content/60">{mod.tags.slice(0, 3).join(' · ')}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap gap-4 items-center flex-1">
          <h3 className="text-lg font-bold text-base-content hidden lg:block m-0">Filter by Grade / Subject:</h3>
          
          {/* Grade Filter */}
          <div className="flex items-center gap-2">
          <label htmlFor="grade-level-filter" className="text-xs tracking-widest uppercase font-semibold text-base-content">Grade Level</label>
          <select 
            id="grade-level-filter"
            value={activeGrade} 
            onChange={e => setActiveGrade(e.target.value)}
            className="select select-bordered select-sm bg-base-100"
          >
            {grades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>

        {/* Subject Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="subject-area-filter" className="text-xs tracking-widest uppercase font-semibold text-base-content">Subject Area</label>
          <select 
            id="subject-area-filter"
            value={activeSubject} 
            onChange={e => setActiveSubject(e.target.value)}
            className="select select-bordered select-sm bg-base-100"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

          {/* Alignment */}
          <div className="ml-auto">
             <label className="label cursor-pointer flex items-center gap-2">
                <input type="checkbox" checked={matatagOnly} onChange={e => setMatatagOnly(e.target.checked)} className="checkbox checkbox-primary checkbox-sm" />
                <span className="label-text font-semibold text-base-content">MATATAG Aligned Only</span>
             </label>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 border-l border-base-300 pl-4 ml-auto lg:ml-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`btn btn-sm btn-square ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
 title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`btn btn-sm btn-square ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
 title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4" : "flex flex-col gap-4 mt-4"}>
        {filteredModules.length > 0 ? pagedModules.map((mod) => {
          const art = crayonArtForTags(mod.tags);
          return (
          <div key={mod.id} className={`card bg-base-100 shadow-md border border-base-200 hover:shadow-lg transition-shadow`}>
            <div className={`card-body ${viewMode === 'list' ? 'md:flex-row md:items-center' : ''}`}>
              <div className={viewMode === 'list' ? "md:flex-1 md:pr-6" : ""}>
                <h2 className="card-title text-2xl text-primary">
                  <CrayonArt name={art.name} color={art.color} size={34} className="shrink-0" />
                  {mod.title}
                </h2>
                <div className="flex flex-wrap gap-2 my-2">
                  {mod.tags.map(tag => (
                    <span key={tag} className="badge badge-outline badge-sm font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-base-content/80 mt-2 mb-4">
                  {mod.description}
                </p>
              </div>
              <div className={`card-actions justify-end mt-auto ${viewMode === 'list' ? 'md:mt-0 md:shrink-0' : ''}`}>
                <Link to={mod.path} className="btn btn-primary w-full md:w-auto">Open Module</Link>
              </div>
            </div>
          </div>
          );
        }) : (
          <div className="card bg-base-200 col-span-full border border-base-300">
            <div className="card-body items-center text-center py-12">
              <CrayonArt name="globe" size={88} animate="wiggle" className="mb-2" />
              <p className="text-xl text-base-content/60">No modules found matching these criteria.</p>
              <div className="card-actions mt-4">
                <button onClick={() => { setActiveGrade('All'); setActiveSubject('All'); setMatatagOnly(false); setSearchQuery(''); }} className="btn btn-outline">Clear Filters</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="mt-10"
        label="Tools pagination"
      />

      <article className="prose lg:prose-xl mt-16 pt-8 border-t border-base-300 max-w-none text-base-content">
        <h2 className="text-primary">Why I build sliders instead of writing more notes</h2>
        <p>
          I run Python and machine-learning workshops for students around the country, and I kept
          hitting the same wall. A kid can recite that the area of a circle is <em>πr²</em> and still
          go quiet when I ask what happens to that area if you double the radius. The formula got
          memorized. The idea behind it never landed. That gap is the reason this site exists: I
          wanted tools that show an idea instead of just defining it.
        </p>
        <h3>What this has to do with MATATAG</h3>
        <p>
          DepEd's{' '}
          <a href="https://www.deped.gov.ph/matatag/" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-[color:var(--link)]">MATATAG curriculum</a>{' '}
          is built on a related observation. It cuts down the sheer number of learning competencies
          so a class can sit with the foundational ones instead of sprinting through an overloaded
          list, the same decongestion goal behind the{' '}
          <a href="https://lawphil.net/statutes/repacts/ra2013/ra_10533_2013.html" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-[color:var(--link)]">K-12 reform</a>{' '}
          it grew out of. Fewer topics, more time on each. A visualizer is one way to spend that
          time: load a single concept and actually poke at it until it makes sense.
        </p>
        <h3>What the research actually says</h3>
        <p>
          I try not to oversell this. The careful version comes from Freeman and colleagues'{' '}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4060654/" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-[color:var(--link)]">2014 meta-analysis of 225 STEM studies</a>,
          which found that students who do something in class, rather than only listen, score about
          6% higher on exams, and that students stuck in plain lectures were roughly 1.5 times more
          likely to fail. That is undergraduate data, not Grade 8, so I won't pretend it maps one to
          one onto a junior-high science class. But the direction lines up with what{' '}
          <a href="https://phet.colorado.edu/en/research" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-[color:var(--link)]">PhET at the University of Colorado Boulder</a>{' '}
          has found over years of building interactive sims, and with what I watch happen in person
          when a student drags a slider and the graph moves with them.
        </p>
        <h3>Why it all runs in a browser</h3>
        <p>
          The last piece is access. A school with a single shared projector and a temperamental
          connection should still be able to open these, so they load in any browser, keep working
          offline once cached, and cost nothing. The code is public on{' '}
          <a href="https://github.com/smmariquit/eduvisualsph" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-[color:var(--link)]">GitHub</a>,
          which means a teacher can check exactly what a simulation is doing before trusting it in
          front of a class. None of this replaces a good teacher. It just makes the abstract part a
          little less abstract.
        </p>
        <Sources
          items={[
            { label: 'Department of Education, "MATATAG Curriculum"', href: 'https://www.deped.gov.ph/matatag/' },
            { label: 'Republic Act No. 10533, Enhanced Basic Education Act of 2013 (LawPhil)', href: 'https://lawphil.net/statutes/repacts/ra2013/ra_10533_2013.html' },
            { label: 'Freeman et al. (2014), "Active learning increases student performance in science, engineering, and mathematics," PNAS 111(23)', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4060654/' },
 { label: 'PhET Interactive Simulations: Research, University of Colorado Boulder', href: 'https://phet.colorado.edu/en/research' },
          ]}
        />
      </article>

      <AdUnit slotId="2222222222" />
    </div>
  );
};

export default Home;
