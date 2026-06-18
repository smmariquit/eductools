import React, { type ReactNode, Suspense, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link2, Check } from 'lucide-react';
import AdUnit from './AdUnit';
import { Helmet } from 'react-helmet-async';
import { visualizerModules } from '../data/registry';
import { getVisualizerDates, getWriteupDates } from '../data/contentDates';
import { getToolVersion } from '../data/versioning';
import { ContentDatesLine } from './content/ContentDatesLine';
import { StudyExamples } from './content/StudyExamples';
import { WriteupExercises } from './content/WriteupExercises';
import { ToolVersionPanel } from './versioning';
import { getMdxComponent } from '../lib/writeupMdx';
import { WriteupSkeleton } from './loading/WriteupSkeleton';
import { LoadingIndicator } from './ui/LoadingIndicator';

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
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const title = moduleInfo ? moduleInfo.title : fallbackTitle;
  const description = moduleInfo ? moduleInfo.description : fallbackDesc;

  const fullTitle = `${title} | EduVisualsPH`;
  const ogImageUrl = `https://eductools.ph/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 100))}`;

  const writeupComponent = useMemo(() => {
    if (!guideLink) return null;
    const slug = guideLink.split('/').pop();
    return slug ? getMdxComponent(slug) : null;
  }, [guideLink]);

  const writeupSlug = guideLink?.split('/').pop();
  const toolDates = moduleInfo ? getVisualizerDates(moduleInfo.id) : undefined;
  const writeupDates = writeupSlug ? getWriteupDates(writeupSlug) : undefined;
  const toolVersion = moduleInfo ? getToolVersion(moduleInfo.id) : undefined;

  return (
    <div className="w-full">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EduVisualsPH" />
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
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold text-primary">{title}</h1>
            <div className="tooltip tooltip-bottom" data-tip="Copy link to this tool">
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Copy link to this tool"
                className="btn btn-ghost btn-sm gap-1.5 normal-case"
              >
                {copied ? <Check className="w-4 h-4 text-success" /> : <Link2 className="w-4 h-4" />}
                <span className={`hidden sm:inline text-xs font-medium ${copied ? 'text-success' : 'text-base-content/70'}`}>
                  {copied ? 'Copied!' : 'Copy link'}
                </span>
              </button>
            </div>
          </div>
          <p className="text-sm text-base-content/60 mb-1">
            By{' '}
            <a href="https://stimmie.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Simonee Ezekiel Mariquit
            </a>
          </p>
          {toolDates && (
            <ContentDatesLine created={toolDates.created} updated={toolDates.updated} className="mb-1" />
          )}
          <p className="text-base-content/80 max-w-prose">{description}</p>
        </div>
        {adSlotId && (
          <div className="hidden md:block shrink-0">
            <AdUnit slotId={adSlotId} format="rectangle" />
          </div>
        )}
      </div>

      <div className="tool-surface mb-8">
        {children}
      </div>

      {writeupComponent && (
        <div className="mt-16 pt-8 border-t border-base-300">
          <article className="prose prose-lg dark:prose-invert max-w-none bg-base-200 p-8 md:p-12 rounded-2xl shadow-sm border border-base-300">
            <div className="not-prose mb-6 space-y-1">
              <p className="text-sm text-base-content/60 m-0">
                By{' '}
                <a href="https://stimmie.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Simonee Ezekiel Mariquit
                </a>
              </p>
              {writeupDates && (
                <ContentDatesLine created={writeupDates.created} updated={writeupDates.updated} />
              )}
            </div>
            {moduleInfo && <StudyExamples moduleId={moduleInfo.id} className="mb-8" />}
            <Suspense
              fallback={
                <div className="py-6">
                  <LoadingIndicator label="Loading writeup…" size="sm" className="mb-8" />
                  <WriteupSkeleton />
                </div>
              }
            >
              {React.createElement(writeupComponent)}
            </Suspense>
            {moduleInfo && <WriteupExercises moduleId={moduleInfo.id} />}
          </article>
        </div>
      )}
      
      {adSlotId && (
        <div className="mt-8">
          <AdUnit slotId={adSlotId} format="auto" />
        </div>
      )}

      {toolVersion && moduleInfo && (
        <div className="mt-10 pt-6 border-t border-base-300/60">
          <ToolVersionPanel toolTitle={title} record={toolVersion} className="mt-0" />
        </div>
      )}
    </div>
  );
};

export default VisualizerLayout;
