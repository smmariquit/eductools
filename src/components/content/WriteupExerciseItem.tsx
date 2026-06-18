import React, { useId, useState } from 'react';
import type { WriteupExercise } from '../../data/writeupExercises';

function verifyIntegerInput(input: string, answer: number): boolean {
  const trimmed = input.trim();
  if (trimmed === '') return false;
  const n = Number(trimmed);
  return Number.isFinite(n) && n === answer;
}

export interface WriteupExerciseItemProps {
  exercise: WriteupExercise;
  index: number;
}

export const WriteupExerciseItem: React.FC<WriteupExerciseItemProps> = ({ exercise, index }) => {
  const inputId = useId();
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const handleCheck = () => {
    if (exercise.kind !== 'integer') return;
    setStatus(verifyIntegerInput(value, exercise.answer) ? 'correct' : 'incorrect');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCheck();
    }
  };

  return (
    <li className="leading-relaxed space-y-2">
      <p className="m-0">
        <span className="sr-only">Question {index + 1}: </span>
        {exercise.prompt}
      </p>

      {exercise.kind === 'integer' ? (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor={inputId} className="sr-only">
              Your answer for question {index + 1}
            </label>
            <input
              id={inputId}
              type="number"
              inputMode="numeric"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              onKeyDown={handleKeyDown}
              className="input input-bordered input-sm w-28 font-mono bg-base-100"
              placeholder="Answer"
              aria-invalid={status === 'incorrect'}
            />
            <button type="button" className="btn btn-sm btn-primary" onClick={handleCheck}>
              Check
            </button>
          </div>
          {status === 'incorrect' && (
            <>
              <p className="m-0 text-sm text-error" role="status">
                Not quite — check your work and try again.
              </p>
              <details className="group">
                <summary className="cursor-pointer list-none text-sm text-primary hover:text-primary/80">
                  <span className="font-medium">Show answer and why</span>
                </summary>
                <div className="mt-2 space-y-1.5 pl-3 border-l-2 border-primary/30 text-sm text-base-content/80">
                  <p className="m-0">
                    <span className="font-semibold text-base-content">Answer: </span>
                    {exercise.answer}
                  </p>
                  {exercise.why && <p className="m-0">{exercise.why}</p>}
                </div>
              </details>
            </>
          )}
          {status === 'correct' && (
            <p className="m-0 text-sm font-medium text-success" role="status">
              Correct!
            </p>
          )}
          {exercise.why && status === 'correct' && (
            <details className="group" open>
              <summary className="cursor-pointer list-none text-sm text-primary hover:text-primary/80">
                <span className="font-medium">Why</span>
              </summary>
              <p className="mt-2 mb-0 pl-3 border-l-2 border-primary/30 text-sm text-base-content/80">
                {exercise.why}
              </p>
            </details>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <p className="m-0 text-xs text-base-content/55 italic">
            Auto-check isn&apos;t available for this one yet.
          </p>
          <details className="group">
            <summary className="cursor-pointer list-none text-sm text-primary hover:text-primary/80">
              <span className="font-medium">Show answer and why</span>
            </summary>
            <div className="mt-2 space-y-1.5 pl-3 border-l-2 border-primary/30 text-sm text-base-content/80">
              <p className="m-0">
                <span className="font-semibold text-base-content">Answer: </span>
                {exercise.answer}
              </p>
              <p className="m-0">{exercise.why}</p>
            </div>
          </details>
        </div>
      )}
    </li>
  );
};

export default WriteupExerciseItem;
