import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdUnit from '../components/AdUnit';
import { visualizerModules } from '../data/registry';

const Home = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const subjectParam = searchParams.get('subject');

  const [activeGrade, setActiveGrade] = useState('All');
  const [activeSubject, setActiveSubject] = useState(subjectParam || 'All');
  const [matatagOnly, setMatatagOnly] = useState(false);

  useEffect(() => {
    if (subjectParam) {
      setActiveSubject(subjectParam);
    } else {
      setActiveSubject('All');
    }
  }, [subjectParam]);

  const modules = visualizerModules;

  const grades = ['All', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const subjects = ['All', 'Math', 'Science', 'Biology', 'Physics', 'Chemistry', 'Earth Science', 'DRRR'];

  const filteredModules = modules.filter(m => {
    const matchGrade = activeGrade === 'All' || m.tags.includes(activeGrade);
    const matchSubject = activeSubject === 'All' || m.tags.includes(activeSubject);
    const matchMatatag = !matatagOnly || m.tags.includes('MATATAG Aligned');
    return matchGrade && matchSubject && matchMatatag;
  });

  return (
    <div className="page-container">
      <div style={{ padding: '2rem 0', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--accent-color)', fontSize: '2.5rem', marginBottom: '1rem' }}>{t('Welcome')}</h1>
        <p style={{ fontSize: '1.125rem' }}>
          {t('WelcomeDesc')}
        </p>
      </div>

      <AdUnit slotId="1111111111" />

      {/* Filter Section */}
      <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', background: 'var(--surface-color)', padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--text-primary)' }}>{t('Filter by')}:</h3>
        
        {/* Grade Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-secondary)' }}>Grade Level</label>
          <select 
            value={activeGrade} 
            onChange={e => setActiveGrade(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', outline: 'none' }}
          >
            {grades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>

        {/* Subject Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-secondary)' }}>Subject Area</label>
          <select 
            value={activeSubject} 
            onChange={e => setActiveSubject(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', outline: 'none' }}
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {/* Alignment */}
        <div style={{ marginLeft: 'auto' }}>
           <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', userSelect: 'none' }}>
              <input type="checkbox" checked={matatagOnly} onChange={e => setMatatagOnly(e.target.checked)} style={{ width: '1.1rem', height: '1.1rem', accentColor: 'var(--accent-color)', cursor: 'pointer' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>MATATAG Aligned Only</span>
           </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        {filteredModules.length > 0 ? filteredModules.map((mod) => (
          <div key={mod.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>{mod.title}</h2>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {mod.tags.map(tag => (
                  <span key={tag} style={{ 
                    background: 'var(--bg-color)', 
                    border: '1px solid var(--border-color)', 
                    padding: '0.15rem 0.5rem', 
                    borderRadius: '4px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600,
                    color: 'var(--text-secondary)' 
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{ marginBottom: '1.5rem' }}>
                {mod.description}
              </p>
            </div>
            <Link to={mod.path} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>{t('Open Module')}</Link>
          </div>
        )) : (
          <div className="card" style={{ textAlign: 'center', color: 'var(--text-secondary)', gridColumn: '1 / -1', padding: '3rem 1rem' }}>
            <p style={{ fontSize: '1.25rem' }}>{t('No modules found matching these criteria.')}</p>
            <button onClick={() => { setActiveGrade('All'); setActiveSubject('All'); setMatatagOnly(false); }} className="btn btn-outline" style={{ marginTop: '1rem', padding: '0.75rem 1.5rem' }}>{t('Clear Filters')}</button>
          </div>
        )}
      </div>

      <article className="article-content">
        <h2>The Importance of Visual Learning in the MATATAG Curriculum</h2>
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
