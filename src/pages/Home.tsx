import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdUnit from '../components/AdUnit';
import { visualizerModules, allTags } from '../data/registry';

const Home = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('All');

  const modules = visualizerModules;

  const filteredModules = activeFilter === 'All' 
    ? modules 
    : modules.filter(m => m.tags.includes(activeFilter));

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
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>{t('Filter by')}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`btn ${activeFilter === tag ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', borderRadius: '20px' }}
              aria-label={`Filter by ${tag}`}
            >
              {tag}
            </button>
          ))}
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
            <p style={{ fontSize: '1.25rem' }}>{t('No modules')}</p>
            <button onClick={() => setActiveFilter('All')} className="btn btn-outline" style={{ marginTop: '1rem', padding: '0.75rem 1.5rem' }}>{t('Clear Filters')}</button>
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
