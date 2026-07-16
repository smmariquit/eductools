import { Skeleton } from '../ui/Skeleton';
import { LoadingIndicator } from '../ui/LoadingIndicator';

/** Full-page skeleton while a visualizer route chunk loads. Layout (header/footer) stays visible. */
export const VisualizerPageSkeleton = () => (
  <div className="w-full" aria-busy="true" aria-label="Loading visualizer">
    <Skeleton variant="button" className="w-36 mb-6" />

    <div className="pb-4 border-b border-base-300 mb-8 flex justify-between items-start gap-6">
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton variant="title" className="w-64 max-w-full" />
          <Skeleton variant="button" className="w-20 h-8" />
        </div>
        <Skeleton variant="text" className="w-48" />
        <Skeleton variant="text" className="w-56" />
        <div className="space-y-2 pt-1 max-w-prose">
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-5/6" />
        </div>
      </div>
      <Skeleton variant="block" className="hidden md:block w-72 h-56 shrink-0" />
    </div>

    <div className="tool-surface mb-8 min-h-[22rem] flex items-center justify-center rounded-2xl border border-base-300/60 bg-base-100/50">
      <LoadingIndicator label="Loading interactive module…" size="lg" />
    </div>

    <div className="mt-16 pt-8 border-t border-base-300">
      <div className="rounded-2xl border border-base-300 bg-base-200/60 p-8 md:p-12 space-y-6">
        <Skeleton variant="text" className="w-40" />
        <Skeleton variant="block" className="w-full h-20 rounded-xl" />
        <div className="space-y-3">
          <Skeleton variant="title" className="w-3/5 h-6" />
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-4/5" />
        </div>
      </div>
    </div>
  </div>
);

export default VisualizerPageSkeleton;
