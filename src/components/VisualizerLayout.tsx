import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AdUnit from './AdUnit';

interface VisualizerLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  educationalContent?: ReactNode;
  adSlotId?: string;
}

const VisualizerLayout = ({ title, description, children, educationalContent, adSlotId }: VisualizerLayoutProps) => {
  return (
    <div className="w-full">
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
