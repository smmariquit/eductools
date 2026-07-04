import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';
import { GitHubMark } from './icons/GitHubMark';
import { VersionBadge } from './versioning';
import { SITE_VERSION } from '../data/versioning';

const REPO_URL = 'https://github.com/smmariquit/eduvisualsph';

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
                EduVisualsPH
              </div>
              <div className="mt-1">
                <VersionBadge version={SITE_VERSION} size="sm" />
              </div>
            </div>
          </div>
          <p className="max-w-xs text-sm text-base-content/70">
            Free interactive STEM tools for Philippine classrooms, tagged to MATATAG where they fit.
          </p>
          <p className="max-w-xs text-sm text-base-content/70 mt-3">
            EduVisualsPH is free and open source. Teachers and developers can read the code, report issues, and add visualizers.
          </p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline mt-4 w-fit"
          >
            <GitHubMark className="w-4 h-4" />
            View on GitHub
          </a>
          <a
            href="https://kape.stimmie.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm w-fit mt-2"
          >
            <Coffee className="w-4 h-4" />
            Buy me a kape
          </a>
          <p className="mt-4 text-xs font-semibold text-base-content/70">
            © {new Date().getFullYear()} EduVisualsPH. Code under the Apache 2.0 License.
          </p>
        </aside>

        {/* Company Section */}
        <nav>
          <header className="text-[#27272a] opacity-100 font-bold mb-4 uppercase tracking-wider text-sm">Company</header>
          <div className="flex flex-col gap-3 text-sm">
            <Link to="/about" className="link link-hover text-base-content hover:text-primary transition-colors font-medium">About Us</Link>
            <Link to="/changelog" className="link link-hover text-base-content hover:text-primary transition-colors font-medium">Changelog</Link>
            <Link to="/help" className="link link-hover text-base-content hover:text-primary transition-colors font-medium">Help & FAQs</Link>
            <Link to="/contact" className="link link-hover text-base-content hover:text-primary transition-colors font-medium">Contact</Link>
          </div>
        </nav>

        {/* Legal Section */}
        <nav>
          <header className="text-[#27272a] opacity-100 font-bold mb-4 uppercase tracking-wider text-sm">Legal</header>
          <div className="flex flex-col gap-3 text-sm">
            <Link to="/privacy" className="link link-hover text-base-content hover:text-primary transition-colors font-medium">Privacy Policy</Link>
            <Link to="/terms" className="link link-hover text-base-content hover:text-primary transition-colors font-medium">Terms of Use</Link>
            <Link to="/accessibility" className="link link-hover text-base-content hover:text-primary transition-colors font-medium">Accessibility Statement</Link>
            <Link to="/about#editorial-policy" className="link link-hover text-base-content hover:text-primary transition-colors font-medium">Editorial Policy</Link>
          </div>
        </nav>
      </div>

      <div className="max-w-[1600px] mx-auto w-full mt-12 pt-8 border-t border-base-content/10 text-xs text-[#52525b] leading-relaxed text-center md:text-left">
        <p className="mb-2"><strong>Disclaimer:</strong> EduVisualsPH is an independent educational platform. We are not officially affiliated with, endorsed by, or connected to the Department of Education (DepEd) of the Philippines or any government agency. The references to the MATATAG curriculum are for educational alignment and organizational purposes only.</p>
        <p>The interactive visualizers and simulations provided are intended for supplementary educational purposes. While we strive for scientific and mathematical accuracy, these tools should not be used for professional engineering, medical diagnostics, or critical safety calculations.</p>
      </div>
    </footer>
  );
};

export default Footer;
