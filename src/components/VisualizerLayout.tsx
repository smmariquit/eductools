import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AdUnit from './AdUnit';
import { Helmet } from 'react-helmet-async';
import { visualizerModules } from '../data/registry';

interface VisualizerLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  educationalContent?: ReactNode;
  adSlotId?: string;
}

const VisualizerLayout = ({ title: fallbackTitle, description: fallbackDesc, children, educationalContent, adSlotId }: VisualizerLayoutProps) => {
  const location = useLocation();
  const moduleInfo = visualizerModules.find(m => m.path === location.pathname);
  
  const title = moduleInfo ? moduleInfo.title : fallbackTitle;
  const description = moduleInfo ? moduleInfo.description : fallbackDesc;

  const fullTitle = `${title} | Eductools`;
  const ogImageUrl = `https://eductools.ph/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 100))}`;

  return (
    <div className="w-full">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Eductools" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>
      <div className="mb-6">
        <Link to="/" className="btn btn-outline btn-sm">&larr; Back to Modules</Link>
      </div>
      
      <div className="pb-4 border-b border-base-300 mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
        <p className="text-base-content/80">{description}</p>
      </div>

      <div className="mb-8">
        {children}
      </div>

      {educationalContent && (
        <article className="prose lg:prose-xl mt-12 pt-8 border-t border-base-300 max-w-none text-base-content">
          {educationalContent}
        </article>
      )}
      
      {adSlotId && (
        <div className="mt-8">
          <AdUnit slotId={adSlotId} format="auto" />
        </div>
      )}
    </div>
  );
};

export default VisualizerLayout;
