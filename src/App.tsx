import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { VisualizerPageSkeleton } from './components/loading';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ScientificUnits from './pages/ScientificUnits';
import TermsOfUse from './pages/TermsOfUse';
import Accessibility from './pages/Accessibility';
import AboutUs from './pages/AboutUs';
import HelpFaq from './pages/HelpFaq';
import Contact from './pages/Contact';
import CrayonGallery from './pages/CrayonGallery';
import ChangelogPage from './pages/Changelog';

// Dynamically import all visualizer pages using Vite's glob
const visualizerPages = import.meta.glob('./pages/visualizers/*Visualizer.tsx') as Record<
  string,
  () => Promise<{ default: React.ComponentType }>
>;

// Build a map from route slug to lazy component
// File naming convention: ./pages/{PascalCaseName}Visualizer.tsx
// Route convention: /visualizer/{kebab-case-name}
function buildVisualizerRoutes() {
  const routes: { path: string; Component: React.LazyExoticComponent<React.ComponentType> }[] = [];

  for (const filePath of Object.keys(visualizerPages)) {
    // Extract the component name, e.g. "SolarSystem" from "./pages/visualizers/SolarSystemVisualizer.tsx"
    const match = filePath.match(/\.\/pages\/visualizers\/(.+)Visualizer\.tsx$/);
    if (!match) continue;

    const pascalName = match[1]; // e.g. "SolarSystem", "WavePhysics", "StatesOfMatter"
    
    // Convert PascalCase to kebab-case for the route
    const kebab = pascalName
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase();

    routes.push({
      path: `visualizer/${kebab}`,
      Component: lazy(visualizerPages[filePath]),
    });
  }

  return routes;
}

const visualizerRoutes = buildVisualizerRoutes();

// Reset scroll to the top whenever the route changes, so opening a tool
// always starts at the top instead of inheriting the previous page's scroll.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfUse />} />
          <Route path="accessibility" element={<Accessibility />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="help" element={<HelpFaq />} />
          <Route path="contact" element={<Contact />} />
          <Route path="changelog" element={<ChangelogPage />} />
          <Route path="units" element={<ScientificUnits />} />
          <Route path="crayon" element={<CrayonGallery />} />

          {visualizerRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <ErrorBoundary>
                  <Suspense fallback={<VisualizerPageSkeleton />}>
                    <Component />
                  </Suspense>
                </ErrorBoundary>
              }
            />
          ))}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
