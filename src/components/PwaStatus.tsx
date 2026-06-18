/// <reference types="vite-plugin-pwa/react" />
import { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Download, RefreshCw, X } from 'lucide-react';

/**
 * Registers the PWA service worker and shows a bottom toast when the app has
 * finished caching for offline use, plus an optional "update available" prompt.
 * Rendered once in the Layout so it is present on every route.
 */
const PwaStatus = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({ immediate: true });

  // Auto-dismiss the offline-ready toast after a few seconds; the update prompt
  // stays until the user acts on it.
  useEffect(() => {
    if (!offlineReady) return;
    const timer = setTimeout(() => setOfflineReady(false), 8000);
    return () => clearTimeout(timer);
  }, [offlineReady, setOfflineReady]);

  if (!offlineReady && !needRefresh) return null;

  return (
    <div className="toast toast-end toast-bottom z-50 p-4">
      {offlineReady && (
        <div
          role="status"
          aria-live="polite"
          className="alert max-w-sm items-start gap-3 rounded-2xl border border-base-300 bg-base-100 shadow-2xl"
        >
          <Download className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div className="text-sm text-base-content/80">
            <strong className="block text-base-content">Ready to use offline</strong>
            EduVisualsPH is saved on this device. Pages and tools you have opened will load even without a connection.
          </div>
          <button
            onClick={() => setOfflineReady(false)}
            className="btn btn-circle btn-ghost btn-xs"
            aria-label="Dismiss offline notice"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {needRefresh && (
        <div
          role="status"
          aria-live="polite"
          className="alert max-w-sm items-start gap-3 rounded-2xl border border-base-300 bg-base-100 shadow-2xl"
        >
          <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div className="text-sm text-base-content/80">
            <strong className="block text-base-content">Update available</strong>
            A new version of EduVisualsPH is ready.
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button onClick={() => updateServiceWorker(true)} className="btn btn-primary btn-xs">
              Reload
            </button>
            <button
              onClick={() => setNeedRefresh(false)}
              className="btn btn-circle btn-ghost btn-xs"
              aria-label="Dismiss update notice"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PwaStatus;
