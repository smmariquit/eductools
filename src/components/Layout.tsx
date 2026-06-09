import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Layout = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<'EN' | 'PH'>('EN');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLanguageChange = (lng: 'EN' | 'PH') => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className="header-institutional">
        <div className="page-container" style={{ padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--accent-color)" fillOpacity="0.2" stroke="var(--accent-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="var(--accent-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="2" fill="var(--accent-color)"/>
              </svg>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-color)', letterSpacing: '1px', lineHeight: 1.1 }}>
                  EDUCTOOLS
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Philippine Educational Portal
                </div>
              </div>
            </Link>
          </div>
          
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <nav className="nav-menu">
                <Link to="/">{t('Home')}</Link>
                <Link to="/?subject=Biology">{t('Biology')}</Link>
                <Link to="/?subject=Physics">{t('Physics')}</Link>
                <Link to="/?subject=Chemistry">{t('Chemistry')}</Link>
                <Link to="/?subject=Earth Science">{t('Earth Science')}</Link>
                <Link to="/blog">{t('Blog')}</Link>
              </nav>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button 
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                style={{
                  background: 'var(--surface-color)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  borderRadius: '4px',
                  padding: '0.35rem 0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              <div style={{ display: 'flex', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                <button 
                onClick={() => handleLanguageChange('EN')}
                aria-label="Switch to English"
                style={{ 
                  padding: '0.25rem 0.5rem', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  border: 'none', 
                  background: language === 'EN' ? 'var(--accent-color)' : 'transparent',
                  color: language === 'EN' ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                EN
              </button>
              <button 
                onClick={() => handleLanguageChange('PH')}
                aria-label="Switch to Tagalog"
                style={{ 
                  padding: '0.25rem 0.5rem', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  border: 'none', 
                  background: language === 'PH' ? 'var(--accent-color)' : 'transparent',
                  color: language === 'PH' ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                PH
              </button>
            </div>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer className="footer-institutional">
        <div className="page-container" style={{ padding: '0 2rem', textAlign: 'center' }}>
          <p style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Eductools Philippine Educational Portal</p>
          <p>Designed in alignment with the MATATAG curriculum guidelines to support formal education.</p>
          <p style={{ marginTop: '1rem' }}>© {new Date().getFullYear()} Eductools. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
