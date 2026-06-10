/// <reference types="vite-plugin-pwa/client" />
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'katex/dist/katex.min.css';
import './i18n';
import { registerSW } from 'virtual:pwa-register';
import posthog from 'posthog-js';

// Initialize PostHog only when a real API key is configured
const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
if (posthogKey && posthogKey !== 'YOUR_POSTHOG_PROJECT_API_KEY') {
  posthog.init(posthogKey, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only' 
  });
}

// Register PWA service worker for offline use
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
