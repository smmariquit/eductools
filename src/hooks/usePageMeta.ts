import { useEffect } from 'react';

interface UsePageMetaOptions {
  title: string;
  description: string;
  path?: string;
}

/**
 * Sets document title and OpenGraph meta tags for a page.
 * Since this is a client-side SPA, we inject meta tags dynamically.
 * For social sharing previews, a server-side pre-rendering solution
 * (e.g., Vercel OG Image) would be needed for full bot support.
 */
export function usePageMeta({ title, description, path }: UsePageMetaOptions) {
  useEffect(() => {
    const fullTitle = `${title} | Eductools`;
    const url = path ? `https://eductools.ph${path}` : window.location.href;
    const ogImageUrl = `https://eductools.ph/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 100))}`;

    // Set document title
    document.title = fullTitle;

    // Helper to set or create a meta tag
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setMetaName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard meta
    setMetaName('description', description);

    // OpenGraph
    setMeta('og:title', fullTitle);
    setMeta('og:description', description);
    setMeta('og:type', 'website');
    setMeta('og:url', url);
    setMeta('og:image', ogImageUrl);
    setMeta('og:site_name', 'Eductools');
    setMeta('og:locale', 'en_PH');

    // Twitter Card
    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', fullTitle);
    setMetaName('twitter:description', description);
    setMetaName('twitter:image', ogImageUrl);

    return () => {
      document.title = 'Eductools | Philippine Educational Portal';
    };
  }, [title, description, path]);
}
