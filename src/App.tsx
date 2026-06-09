import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
const SolarSystemVisualizer = lazy(() => import('./pages/SolarSystemVisualizer'));
const WavePhysicsVisualizer = lazy(() => import('./pages/WavePhysicsVisualizer'));
const StatesOfMatterVisualizer = lazy(() => import('./pages/StatesOfMatterVisualizer'));
const LifeCyclesVisualizer = lazy(() => import('./pages/LifeCyclesVisualizer'));
const HumanBodyVisualizer = lazy(() => import('./pages/HumanBodyVisualizer'));
const MicroscopeVisualizer = lazy(() => import('./pages/MicroscopeVisualizer'));
const ForcesAndMotionVisualizer = lazy(() => import('./pages/ForcesAndMotionVisualizer'));
const ChemicalBondingVisualizer = lazy(() => import('./pages/ChemicalBondingVisualizer'));
const PlateTectonicsVisualizer = lazy(() => import('./pages/PlateTectonicsVisualizer'));
const PhotosynthesisVisualizer = lazy(() => import('./pages/PhotosynthesisVisualizer'));
const TyphoonTrackerVisualizer = lazy(() => import('./pages/TyphoonTrackerVisualizer'));
const FractionsVisualizer = lazy(() => import('./pages/FractionsVisualizer'));

// New batch of 10 tools
const WaterCycleVisualizer = lazy(() => import('./pages/WaterCycleVisualizer'));
const FoodWebVisualizer = lazy(() => import('./pages/FoodWebVisualizer'));
const SeasonsVisualizer = lazy(() => import('./pages/SeasonsVisualizer'));
const DensityVisualizer = lazy(() => import('./pages/DensityVisualizer'));
const PunnettSquareVisualizer = lazy(() => import('./pages/PunnettSquareVisualizer'));
const ProjectileMotionVisualizer = lazy(() => import('./pages/ProjectileMotionVisualizer'));
const ElectromagneticSpectrumVisualizer = lazy(() => import('./pages/ElectromagneticSpectrumVisualizer'));
const CellDivisionVisualizer = lazy(() => import('./pages/CellDivisionVisualizer'));
const RockCycleVisualizer = lazy(() => import('./pages/RockCycleVisualizer'));
const StoichiometryVisualizer = lazy(() => import('./pages/StoichiometryVisualizer'));
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="page-container" style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)' }}>Loading interactive module...</div>}>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="visualizer/solar-system" element={<SolarSystemVisualizer />} />
          <Route path="visualizer/wave-physics" element={<WavePhysicsVisualizer />} />
          <Route path="visualizer/states-of-matter" element={<StatesOfMatterVisualizer />} />
          <Route path="visualizer/life-cycles" element={<LifeCyclesVisualizer />} />
          <Route path="visualizer/human-body" element={<HumanBodyVisualizer />} />
          <Route path="visualizer/microscope" element={<MicroscopeVisualizer />} />
          <Route path="visualizer/forces-motion" element={<ForcesAndMotionVisualizer />} />
          <Route path="visualizer/chemical-bonding" element={<ChemicalBondingVisualizer />} />
          <Route path="visualizer/plate-tectonics" element={<PlateTectonicsVisualizer />} />
          <Route path="visualizer/photosynthesis" element={<PhotosynthesisVisualizer />} />
          <Route path="visualizer/typhoon-tracker" element={<TyphoonTrackerVisualizer />} />
          <Route path="visualizer/fractions" element={<FractionsVisualizer />} />
          
          <Route path="visualizer/water-cycle" element={<WaterCycleVisualizer />} />
          <Route path="visualizer/food-web" element={<FoodWebVisualizer />} />
          <Route path="visualizer/seasons" element={<SeasonsVisualizer />} />
          <Route path="visualizer/density" element={<DensityVisualizer />} />
          <Route path="visualizer/punnett-square" element={<PunnettSquareVisualizer />} />
          <Route path="visualizer/projectile-motion" element={<ProjectileMotionVisualizer />} />
          <Route path="visualizer/em-spectrum" element={<ElectromagneticSpectrumVisualizer />} />
          <Route path="visualizer/cell-division" element={<CellDivisionVisualizer />} />
          <Route path="visualizer/rock-cycle" element={<RockCycleVisualizer />} />
          <Route path="visualizer/stoichiometry" element={<StoichiometryVisualizer />} />
        </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
