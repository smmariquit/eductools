import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content border-t border-base-300 mt-16">
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <aside>
          <div className="flex items-center gap-3 no-underline mb-4">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" className="fill-primary stroke-primary opacity-20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17M2 12L12 17L22 12" className="stroke-primary" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="2" className="fill-primary"/>
            </svg>
            <div>
              <div className="text-xl font-extrabold text-primary tracking-wide leading-tight">
                EDUCTOOLS
              </div>
            </div>
          </div>
          <p className="max-w-xs text-sm text-base-content/70">
            Philippine Educational Portal designed in alignment with the MATATAG curriculum guidelines to support formal education.
          </p>
          <p className="mt-4 text-xs font-semibold text-base-content/50">
            © {new Date().getFullYear()} Eductools. All rights reserved.
          </p>
        </aside>

        {/* Company Section */}
        <nav>
          <header className="footer-title text-base-content font-bold mb-4 uppercase tracking-wider">Company</header>
          <div className="flex flex-col gap-3 text-sm">
            <Link to="/about" className="link link-hover text-base-content hover:text-primary transition-colors font-medium">About Us</Link>
            <Link to="/help" className="link link-hover text-base-content hover:text-primary transition-colors font-medium">Help & FAQs</Link>
            <Link to="/contact" className="link link-hover text-base-content hover:text-primary transition-colors font-medium">Contact</Link>
          </div>
        </nav>

        {/* Legal Section */}
        <nav>
          <header className="footer-title text-base-content font-bold mb-4 uppercase tracking-wider">Legal</header>
          <div className="flex flex-col gap-3 text-sm">
            <Link to="/privacy" className="link link-hover text-base-content hover:text-primary transition-colors font-medium">Privacy Policy</Link>
            <Link to="/terms" className="link link-hover text-base-content hover:text-primary transition-colors font-medium">Terms of Use</Link>
            <Link to="/accessibility" className="link link-hover text-base-content hover:text-primary transition-colors font-medium">Accessibility Statement</Link>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
