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
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content font-sans">
      <header className="bg-base-200 border-b border-base-300 py-4 shadow-sm">
        <div className="max-w-[1600px] w-full mx-auto px-4 md:px-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <Link to="/" className="flex items-center gap-3 no-underline">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" className="fill-primary stroke-primary opacity-20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" className="stroke-primary" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="2" className="fill-primary"/>
              </svg>
              <div>
                <div className="text-2xl font-extrabold text-primary tracking-wide leading-tight">
                  EDUCTOOLS
                </div>
                <div className="text-[0.7rem] text-base-content/60 uppercase tracking-wider font-semibold">
                  Philippine Educational Portal
                </div>
              </div>
            </Link>
          </div>
          
          <div className="flex gap-6 items-center flex-wrap justify-center">
            <nav className="flex gap-6 items-center text-sm font-medium">
              <Link to="/" className="hover:text-primary transition-colors">{t('Home')}</Link>
              <Link to="/?subject=Biology" className="hover:text-primary transition-colors">{t('Biology')}</Link>
              <Link to="/?subject=Physics" className="hover:text-primary transition-colors">{t('Physics')}</Link>
              <Link to="/?subject=Chemistry" className="hover:text-primary transition-colors">{t('Chemistry')}</Link>
              <Link to="/?subject=Earth Science" className="hover:text-primary transition-colors">{t('Earth Science')}</Link>
              <Link to="/blog" className="hover:text-primary transition-colors">{t('Blog')}</Link>
            </nav>

            <div className="flex gap-3 items-center">
              <label className="swap swap-rotate btn btn-sm btn-ghost btn-circle border border-base-300">
                <input type="checkbox" onChange={toggleTheme} checked={theme === 'light'} />
                <span className="swap-on text-lg">☀️</span>
                <span className="swap-off text-lg">🌙</span>
              </label>

              <div className="join border border-base-300">
                <button 
                  onClick={() => handleLanguageChange('EN')}
                  className={`join-item btn btn-xs ${language === 'EN' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => handleLanguageChange('PH')}
                  className={`join-item btn btn-xs ${language === 'PH' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  PH
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-8">
        <Outlet />
      </main>

      <footer className="footer footer-center p-10 bg-base-200 text-base-content border-t border-base-300 mt-16">
        <aside>
          <p className="font-bold text-lg">Eductools Philippine Educational Portal</p>
          <p>Designed in alignment with the MATATAG curriculum guidelines to support formal education.</p>
          <p className="mt-4">© {new Date().getFullYear()} Eductools. All rights reserved.</p>
        </aside>
      </footer>
    </div>
  );
};

export default Layout;
