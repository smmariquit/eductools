import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from './Footer';
import CookieConsent from './CookieConsent';

// Read persisted preferences, with fallbacks
function getStoredTheme(): 'dark' | 'light' {
  try {
    const stored = localStorage.getItem('eductools-theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch { /* localStorage not available */ }
  return 'dark';
}

function getStoredLanguage(): 'EN' | 'PH' {
  try {
    const stored = localStorage.getItem('eductools-lang');
    if (stored === 'EN' || stored === 'PH') return stored;
  } catch { /* localStorage not available */ }
  return 'EN';
}

const Layout = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<'EN' | 'PH'>(getStoredLanguage);
  const [theme, setTheme] = useState<'dark' | 'light'>(getStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('eductools-theme', theme); } catch { /* noop */ }
  }, [theme]);

  // Sync language on mount
  useEffect(() => {
    i18n.changeLanguage(language);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // Set favicon to the Eductools logo
  useEffect(() => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="16" fill="#3b82f6" />
        <path d="M32 8L8 20L32 32L56 20L32 8Z" fill="white" opacity="0.3" stroke="white" stroke-width="2" stroke-linejoin="round"/>
        <path d="M8 44L32 56L56 44M8 32L32 44L56 32" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="32" cy="32" r="4" fill="white"/>
      </svg>
    `;
    
    const svgUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
    
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    
    link.href = svgUrl;
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLanguageChange = (lng: 'EN' | 'PH') => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    try { localStorage.setItem('eductools-lang', lng); } catch { /* noop */ }
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content font-sans">
      <header className="bg-base-200 border-b border-base-300 py-4 shadow-sm">
        <div className="max-w-[1600px] w-full mx-auto px-4 md:px-8 flex justify-between items-center flex-nowrap gap-2 sm:gap-4">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 no-underline">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[36px] sm:h-[36px]">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" className="fill-primary stroke-primary opacity-20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" className="stroke-primary" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="2" className="fill-primary"/>
              </svg>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-primary tracking-wide leading-tight">
                  EDUCTOOLS
                </div>
                <div className="hidden sm:block text-[0.7rem] text-base-content/60 uppercase tracking-wider font-semibold">
                  Philippine Educational Portal
                </div>
              </div>
            </Link>
          </div>
          
          <div className="flex gap-2 sm:gap-4 items-center justify-end flex-1 lg:flex-none">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-6 items-center text-sm font-medium">
              <Link to="/" className="hover:text-primary transition-colors">{t('Home')}</Link>
              <Link to="/?subject=Biology" className="hover:text-primary transition-colors">{t('Biology')}</Link>
              <Link to="/?subject=Physics" className="hover:text-primary transition-colors">{t('Physics')}</Link>
              <Link to="/?subject=Chemistry" className="hover:text-primary transition-colors">{t('Chemistry')}</Link>
              <Link to="/?subject=Earth Science" className="hover:text-primary transition-colors">{t('Earth Science')}</Link>
              <Link to="/blog" className="hover:text-primary transition-colors">{t('Blog')}</Link>
            </nav>

            {/* Mobile Navigation (Hamburger) */}
            <div className="dropdown dropdown-end lg:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm sm:btn-md btn-circle border border-base-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow-xl bg-base-200 rounded-box w-52 border border-base-300">
                <li><Link to="/">{t('Home')}</Link></li>
                <li><Link to="/?subject=Biology">{t('Biology')}</Link></li>
                <li><Link to="/?subject=Physics">{t('Physics')}</Link></li>
                <li><Link to="/?subject=Chemistry">{t('Chemistry')}</Link></li>
                <li><Link to="/?subject=Earth Science">{t('Earth Science')}</Link></li>
                <li><Link to="/blog">{t('Blog')}</Link></li>
                
                <div className="divider my-1"></div>
                <li className="menu-title px-4 py-1 text-xs">Settings</li>
                <li className="hover:bg-transparent">
                  <div className="flex justify-between items-center w-full px-4 py-2 hover:bg-transparent cursor-default">
                    <span className="font-semibold text-xs uppercase text-base-content/60 tracking-wider">Theme</span>
                    <label className="swap swap-rotate btn btn-xs btn-ghost btn-circle border border-base-300">
                      <input type="checkbox" onChange={toggleTheme} checked={theme === 'light'} />
                      <span className="swap-on">☀️</span>
                      <span className="swap-off">🌙</span>
                    </label>
                  </div>
                </li>
                <li className="hover:bg-transparent">
                  <div className="flex justify-between items-center w-full px-4 py-2 hover:bg-transparent cursor-default">
                    <span className="font-semibold text-xs uppercase text-base-content/60 tracking-wider">Language</span>
                    <div className="join border border-base-300">
                      <button onClick={() => handleLanguageChange('EN')} className={`join-item btn btn-xs ${language === 'EN' ? 'btn-primary' : 'btn-ghost'}`}>EN</button>
                      <button onClick={() => handleLanguageChange('PH')} className={`join-item btn btn-xs ${language === 'PH' ? 'btn-primary' : 'btn-ghost'}`}>PH</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Desktop Theme/Lang Toggles */}
            <div className="hidden sm:flex gap-3 items-center flex-shrink-0">
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

      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
