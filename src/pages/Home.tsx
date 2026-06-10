import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdUnit from '../components/AdUnit';
import { visualizerModules } from '../data/registry';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const fullTitle = 'Interactive STEM Visualizers | Eductools';
  const description = 'Free interactive STEM visualizers aligned with the Philippine DepEd MATATAG curriculum. Explore Physics, Chemistry, Biology, and Earth Science.';
  const ogImageUrl = `https://eductools.ph/api/og?title=${encodeURIComponent('Interactive STEM Visualizers')}&desc=${encodeURIComponent(description.slice(0, 100))}`;

  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const subjectParam = searchParams.get('subject');

  const [activeGrade, setActiveGrade] = useState('All');
  const [matatagOnly, setMatatagOnly] = useState(false);

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

  const filteredModules = visualizerModules.filter(m => {
    const matchGrade = activeGrade === 'All' || m.tags.includes(activeGrade);
    const matchSubject = activeSubject === 'All' || m.tags.includes(activeSubject);
    const matchMatatag = !matatagOnly || m.tags.includes('MATATAG Aligned');
    return matchGrade && matchSubject && matchMatatag;
  });

  return (
    <div className="w-full">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Eductools" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>
      <div className="py-8 border-b border-base-300 mb-8">
        <h1 className="text-4xl font-extrabold text-primary mb-4">{t('Welcome')}</h1>
        <p className="text-lg text-base-content/80">
          {t('WelcomeDesc')}
        </p>
      </div>

      <AdUnit slotId="1111111111" />

      {/* Filter Section */}
      <div className="mb-8 flex flex-wrap gap-6 items-center bg-base-200 p-4 lg:p-6 rounded-xl border border-base-300 shadow-sm">
        <h3 className="text-lg font-bold text-base-content m-0">{t('Filter by')}:</h3>
        
        {/* Grade Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs tracking-widest uppercase font-semibold text-base-content/60">Grade Level</label>
          <select 
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
          <label className="text-xs tracking-widest uppercase font-semibold text-base-content/60">Subject Area</label>
          <select 
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
        {filteredModules.length > 0 ? filteredModules.map((mod) => (
          <div key={mod.id} className="card bg-base-100 shadow-md border border-base-200 hover:shadow-lg transition-shadow">
            <div className="card-body">
              <h2 className="card-title text-2xl text-primary">{mod.title}</h2>
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
              <div className="card-actions justify-end mt-auto">
                <Link to={mod.path} className="btn btn-primary w-full">{t('Open Module')}</Link>
              </div>
            </div>
          </div>
        )) : (
          <div className="card bg-base-200 col-span-full border border-base-300">
            <div className="card-body items-center text-center py-12">
              <p className="text-xl text-base-content/60">{t('No modules found matching these criteria.')}</p>
              <div className="card-actions mt-4">
                <button onClick={() => { setActiveGrade('All'); setActiveSubject('All'); setMatatagOnly(false); }} className="btn btn-outline">{t('Clear Filters')}</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <article className="prose lg:prose-xl mt-16 pt-8 border-t border-base-300 max-w-none text-base-content">
        <h2 className="text-primary">The Importance of Visual Learning in the MATATAG Curriculum</h2>
        <p>
          The Department of Education (DepEd) in the Philippines has introduced the MATATAG Curriculum to decongest learning competencies and focus on foundational skills. A core component of this revised educational framework is the emphasis on experiential and visually-driven learning. 
        </p>
        <h3>Why Interactive Visualizers Matter</h3>
        <p>
          Research indicates that interactive models significantly improve retention rates, especially in STEM subjects such as Science and Mathematics. Tools that visualize abstract concepts bridge the gap between theoretical textbooks and practical understanding.
        </p>
        <ul>
          <li><strong>Engagement:</strong> Interactive elements keep students focused.</li>
          <li><strong>Comprehension:</strong> Visualizing abstract concepts aids cognitive processing.</li>
          <li><strong>Accessibility:</strong> Web-based tools can be accessed nationwide, supporting DepEd's goal of equitable education.</li>
        </ul>
      </article>

      <AdUnit slotId="2222222222" />
    </div>
  );
};

export default Home;
