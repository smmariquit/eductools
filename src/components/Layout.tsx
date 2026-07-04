import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import PwaStatus from './PwaStatus';

const Layout = () => {
  // Crayon Cosmos is the sole design system.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'crayon');
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-base-content font-sans">
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
                  EduVisualsPH
                </div>
                <div className="hidden sm:block text-[0.7rem] text-base-content/60 uppercase tracking-wider font-semibold">
                  Interactive STEM for PH classrooms
                </div>
              </div>
            </Link>
          </div>
          
          <div className="flex gap-2 sm:gap-4 items-center justify-end flex-1 lg:flex-none">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-6 items-center text-sm font-medium">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <Link to="/?subject=Biology" className="hover:text-primary transition-colors">Biology</Link>
              <Link to="/?subject=Physics" className="hover:text-primary transition-colors">Physics</Link>
              <Link to="/?subject=Chemistry" className="hover:text-primary transition-colors">Chemistry</Link>
              <Link to="/?subject=Earth Science" className="hover:text-primary transition-colors">Earth Science</Link>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            </nav>

            {/* Mobile Navigation (Hamburger) */}
            <div className="dropdown dropdown-end lg:hidden">
              <div tabIndex={0} role="button" aria-label="Open navigation menu" className="btn btn-ghost btn-sm sm:btn-md btn-circle border border-base-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow-xl bg-base-200 rounded-box w-52 border border-base-300">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/?subject=Biology">Biology</Link></li>
                <li><Link to="/?subject=Physics">Physics</Link></li>
                <li><Link to="/?subject=Chemistry">Chemistry</Link></li>
                <li><Link to="/?subject=Earth Science">Earth Science</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-8">
        <Outlet />
      </main>

      <Footer />
      <CookieConsent />
      <PwaStatus />
    </div>
  );
};

export default Layout;
