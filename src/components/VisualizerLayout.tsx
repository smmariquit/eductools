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
    <div className="page-container">
      <div className="layout-header">
        <Link to="/" className="btn btn-outline btn-sm">&larr; Back to Modules</Link>
      </div>
      
      <div className="layout-title">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="visualizer-content">
        {children}
      </div>

      {educationalContent && (
        <article className="article-content">
          {educationalContent}
        </article>
      )}
      
      {adSlotId && <AdUnit slotId={adSlotId} format="auto" />}
    </div>
  );
};

export default VisualizerLayout;
