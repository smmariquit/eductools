import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

// Dynamically import all visualizer pages using Vite's glob
const visualizerPages = import.meta.glob('./pages/*Visualizer.tsx') as Record<
  string,
  () => Promise<{ default: React.ComponentType }>
>;

// Build a map from route slug to lazy component
// File naming convention: ./pages/{PascalCaseName}Visualizer.tsx
// Route convention: /visualizer/{kebab-case-name}
function buildVisualizerRoutes() {
  const routes: { path: string; Component: React.LazyExoticComponent<React.ComponentType> }[] = [];

  for (const filePath of Object.keys(visualizerPages)) {
    // Extract the component name, e.g. "SolarSystem" from "./pages/SolarSystemVisualizer.tsx"
    const match = filePath.match(/\.\/pages\/(.+)Visualizer\.tsx$/);
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

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-base-content/50 text-xl font-semibold"><span className="loading loading-spinner loading-lg mr-4"></span>Loading interactive module...</div>}>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
          
          {/* Dynamically generated visualizer routes from file glob */}
          {visualizerRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <ErrorBoundary>
                  <Component />
                </ErrorBoundary>
              }
            />
          ))}

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
