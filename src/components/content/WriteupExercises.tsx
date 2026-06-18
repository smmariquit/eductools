import React from 'react';
import { getWriteupExercises } from '../../data/writeupExercises';
import { WriteupExerciseItem } from './WriteupExerciseItem';

export interface WriteupExercisesProps {
  /** Visualizer registry id, or blog/deep-dive slug (aliases resolved automatically). */
  moduleId: string;
  className?: string;
}

/**
 * Three to five practice or reflection prompts for a tool writeup or blog article.
 * Integer answers can be checked inline; open prompts reveal answer and rationale.
 */
export const WriteupExercises: React.FC<WriteupExercisesProps> = ({ moduleId, className = '' }) => {
  const exercises = getWriteupExercises(moduleId);
  if (!exercises?.length) return null;

  return (
    <div
      className={`not-prose rounded-xl border border-primary/25 bg-primary/5 px-4 py-4 my-8 ${className}`.trim()}
    >
      <p className="text-xs font-bold uppercase tracking-wider text-primary/70 m-0 mb-3">
        Try these — reflect or solve
      </p>
      <ol className="m-0 pl-5 text-sm text-base-content/85 space-y-4 list-decimal">
        {exercises.map((exercise, index) => (
          <WriteupExerciseItem key={`${moduleId}-${index}`} exercise={exercise} index={index} />
        ))}
      </ol>
    </div>
  );
};

export default WriteupExercises;
