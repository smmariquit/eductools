import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('eductools-cookie-consent');
    if (!hasConsented) {
      // Small delay so it animates in after initial load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('eductools-cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 sm:p-6 pointer-events-none flex justify-center">
      <div className="bg-base-100 shadow-2xl border border-base-300 p-6 rounded-2xl max-w-4xl w-full pointer-events-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transform transition-all duration-500 ease-out translate-y-0 opacity-100">
        <div className="flex gap-4 items-start md:items-center">
          <div className="text-3xl hidden sm:block">🍪</div>
          <div className="text-sm text-base-content/80 leading-relaxed">
            <strong className="text-base-content block mb-1 text-base">Cookies on EduVisualsPH</strong>
            We use cookies for analytics and advertising (Google Analytics & AdSense). No student or personal data you enter is collected: all computation runs entirely in your browser.{' '}
            <Link to="/privacy" className="font-semibold underline text-[#1d4ed8] hover:text-[#1e40af]">
              Privacy Policy
            </Link>
          </div>
        </div>
        <button 
          onClick={acceptCookies}
          className="btn btn-primary shadow-md whitespace-nowrap w-full md:w-auto"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
