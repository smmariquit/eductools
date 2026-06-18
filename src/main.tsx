/// <reference types="vite-plugin-pwa/client" />
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import 'katex/dist/katex.min.css';
import posthog from 'posthog-js';

// Initialize PostHog only when a real API key is configured
const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
if (posthogKey && posthogKey !== 'YOUR_POSTHOG_PROJECT_API_KEY') {
  posthog.init(posthogKey, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only' 
  });
}

// The PWA service worker is registered via the useRegisterSW hook in
// <PwaStatus />, which also surfaces the offline-ready and update toasts.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
