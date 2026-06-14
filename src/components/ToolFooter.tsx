import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, ShieldCheck } from 'lucide-react';

interface ToolFooterProps {
  guideLink: string;
}

const ToolFooter: React.FC<ToolFooterProps> = ({ guideLink }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-8 border-t border-base-300 pt-6">
      <div className="bg-base-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg text-primary">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base-content text-lg">{t('Want to dive deeper?')}</h3>
            <p className="text-sm text-base-content/70 mt-1">
              {t('Read our comprehensive guide, theoretical background, and methodology.')}
            </p>
          </div>
        </div>
        <Link to={guideLink} className="btn btn-primary w-full md:w-auto shrink-0">
          {t('Read the full guide')}
        </Link>
      </div>

      <div className="mt-6 flex justify-center text-xs text-base-content/60">
        <Link 
          to="/about#editorial-policy" 
          className="hover:text-primary transition-colors hover:underline font-medium"
        >
          {t('Editorial Policy')}
        </Link>
      </div>
    </div>
  );
};

export default ToolFooter;
