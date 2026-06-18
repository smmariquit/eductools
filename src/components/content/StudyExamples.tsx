import React from 'react';
import { getStudyExamples } from '../../data/studyExamples';

export interface StudyExamplesProps {
  /** Visualizer registry id, or blog/deep-dive slug (aliases resolved automatically). */
  moduleId: string;
  className?: string;
}

/**
 * One or two common study examples for a tool or writeup.
 * Import in MDX: `import { StudyExamples } from '../../components/content'`.
 */
export const StudyExamples: React.FC<StudyExamplesProps> = ({ moduleId, className = '' }) => {
  const examples = getStudyExamples(moduleId);
  if (!examples?.length) return null;

  return (
    <div
      className={`not-prose rounded-xl border border-base-300 bg-base-200/60 px-4 py-3 my-6 ${className}`.trim()}
    >
      <p className="text-xs font-bold uppercase tracking-wider text-base-content/50 m-0 mb-1.5">
        Examples you might study
      </p>
      <ul className="m-0 pl-4 text-sm text-base-content/80 space-y-1 list-disc">
        {examples.map((ex) => (
          <li key={ex}>{ex}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudyExamples;
