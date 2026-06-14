import React, { type ReactNode, lazy, Suspense, type ComponentType, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AdUnit from './AdUnit';
import { Helmet } from 'react-helmet-async';
import { visualizerModules } from '../data/registry';

const mdxComponents = import.meta.glob([
  '../content/blog/*.mdx',
  '../content/deep-dives/*.mdx'
]);

const mdxCache = new Map<string, React.LazyExoticComponent<ComponentType<Record<string, unknown>>>>();
function getMdxComponent(id: string) {
  if (!mdxCache.has(id)) {
    let importFn = mdxComponents[`../content/blog/${id}.mdx`] || mdxComponents[`../content/deep-dives/${id}.mdx`];
    if (importFn) {
      mdxCache.set(id, lazy(importFn as () => Promise<{ default: ComponentType }>));
    }
  }
  return mdxCache.get(id) ?? null;
}

interface VisualizerLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  guideLink?: string;
  adSlotId?: string;
}

const VisualizerLayout = ({ title: fallbackTitle, description: fallbackDesc, children, guideLink, adSlotId }: VisualizerLayoutProps) => {
  const location = useLocation();
  const moduleInfo = visualizerModules.find(m => m.path === location.pathname);
  
  const title = moduleInfo ? moduleInfo.title : fallbackTitle;
  const description = moduleInfo ? moduleInfo.description : fallbackDesc;

  const fullTitle = `${title} | Eductools`;
  const ogImageUrl = `https://eductools.ph/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 100))}`;

  const writeupComponent = useMemo(() => {
    if (!guideLink) return null;
    const slug = guideLink.split('/').pop();
    return slug ? getMdxComponent(slug) : null;
  }, [guideLink]);

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
      
      <div className="pb-4 border-b border-base-300 mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
          <p className="text-base-content/80">{description}</p>
        </div>
        <div className="hidden md:block">
          {/* Top Ad Unit to adhere to strategic placement directive without CLS */}
          <div className="w-[300px] h-[90px] bg-base-200 flex flex-col items-center justify-center rounded-lg border border-base-300 text-xs text-base-content/40">
            <span className="uppercase tracking-widest font-semibold mb-1">Advertisement</span>
            <span>(Top Banner)</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        {children}
      </div>

      {writeupComponent && (
        <div className="mt-16 pt-8 border-t border-base-300">
          <article className="prose prose-lg dark:prose-invert max-w-none bg-base-200 p-8 md:p-12 rounded-2xl shadow-sm border border-base-300">
            <Suspense fallback={<div className="flex justify-center p-8"><span className="loading loading-spinner"></span></div>}>
              {React.createElement(writeupComponent)}
            </Suspense>
            <div className="mt-12 pt-6 border-t border-base-300/50 text-sm text-base-content/70 flex justify-end">
              <span>Writeup by <a href="https://stimmie.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold tracking-wide">Simonee Ezekiel Mariquit</a></span>
            </div>
          </article>
        </div>
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
