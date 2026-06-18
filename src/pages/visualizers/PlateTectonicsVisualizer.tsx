import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import ProcessCycle, { type ProcessStage } from '../../components/visualizers/ProcessCycle';
import { Toggle } from '../../components/ui/Toggle';
import { IntroState, useIntroState } from '../../components/onboarding';

type Boundary = 'divergent' | 'convergent' | 'transform';

interface Scenario {
  label: string;
  filipino: string;
  ariaLabel: string;
  intro: string;
  stages: ProcessStage[];
  transitionLabels: string[];
}

const scenarios: Record<Boundary, Scenario> = {
  divergent: {
    label: 'Divergent',
    filipino: 'Naghihiwalay',
    ariaLabel: 'Divergent boundary process',
    intro:
      'At a divergent boundary, two plates move away from each other and brand-new crust is born in the gap.',
    transitionLabels: ['', 'magma rises', 'crust forms'],
    stages: [
      {
        id: 'pull-apart',
        title: 'Plates pull apart',
        subtitle: 'Naghihiwalay',
        art: '↔️',
        description:
          'Two tectonic plates move slowly away from each other, stretching and thinning the crust between them.',
      },
      {
        id: 'magma-rise',
        title: 'Magma rises',
        subtitle: 'Pag-akyat ng magma',
        art: '🌋',
        description:
          'Hot magma from the mantle wells up to fill the widening gap because the pressure above it has been released.',
      },
      {
        id: 'new-crust',
        title: 'New crust forms',
        subtitle: 'Sea-floor spreading',
        art: '🌊',
        description:
          'The magma cools into new oceanic crust, slowly widening the ocean — this is sea-floor spreading, as at the Mid-Atlantic Ridge.',
        phContext:
          'Divergent boundaries are rare near the Philippines: our setting is dominated by plates colliding, not splitting apart.',
      },
    ],
  },
  convergent: {
    label: 'Convergent',
    filipino: 'Nagsasalpukan',
    ariaLabel: 'Convergent (subduction) boundary process',
    intro:
      'At a convergent boundary the plates collide. Where ocean crust meets another plate, the denser slab sinks — this is subduction.',
    transitionLabels: ['', 'denser plate sinks', 'magma & quakes'],
    stages: [
      {
        id: 'collide',
        title: 'Plates collide',
        subtitle: 'Nagsasalpukan',
        art: '💥',
        description:
          'Two plates move toward each other. Something has to give where they meet.',
      },
      {
        id: 'subduct',
        title: 'Subduction',
        subtitle: 'Paglubog ng plato',
        art: '⬇️',
        description:
          'The denser oceanic plate bends and slides beneath the other, carving a deep ocean trench at the surface.',
        phContext:
          'The Philippine Trench (east) and the Manila Trench (west) are subduction zones that flank the archipelago.',
      },
      {
        id: 'volcanoes',
        title: 'Volcanoes & earthquakes',
        subtitle: 'Bulkan at lindol',
        art: '🌋',
        description:
          'The sinking slab heats up and releases fluids that melt the rock above it. The magma rises to build volcanoes, while the grinding plates trigger powerful earthquakes.',
        phContext:
          'This is why the Philippines is on the Pacific Ring of Fire — and why Mayon, Pinatubo, and Taal exist.',
      },
    ],
  },
  transform: {
    label: 'Transform',
    filipino: 'Nagkikiskisan',
    ariaLabel: 'Transform boundary process',
    intro:
      'At a transform boundary, plates slide horizontally past each other. No crust is made or destroyed — but the stress builds up.',
    transitionLabels: ['', 'friction locks', 'sudden slip'],
    stages: [
      {
        id: 'slide',
        title: 'Plates slide past',
        subtitle: 'Nagkikiskisan',
        art: '↔️',
        description:
          'Two plates grind sideways past one another along a fault line, moving in opposite directions.',
      },
      {
        id: 'lock',
        title: 'Stress builds',
        subtitle: 'Pag-ipon ng tensyon',
        art: '🔒',
        description:
          'Friction locks the rough edges together. The plates keep pushing, so strain quietly accumulates in the rock for years or decades.',
      },
      {
        id: 'earthquake',
        title: 'Sudden slip → earthquake',
        subtitle: 'Lindol',
        art: '⚡',
        description:
          'When the stress finally overcomes the friction, the rock snaps and slips suddenly, releasing the stored energy as an earthquake. Transform boundaries make no volcanoes.',
        phContext:
          'The West Valley Fault runs through Metro Manila; a major slip is the basis of the feared "Big One" earthquake scenario.',
      },
    ],
  },
};

const PlateTectonicsVisualizer = () => {
  const intro = useIntroState();
  const [boundary, setBoundary] = useState<Boundary>('convergent');
  const scenario = scenarios[boundary];

  return (
    <VisualizerLayout
      title="Philippine Plate Tectonics"
      description="Step through how divergent, convergent (subduction), and transform plate boundaries work, with Philippine context — the Philippine and Manila Trenches, the West Valley Fault, and the Ring of Fire."
      adSlotId="1007"
      guideLink="/blog/plate-tectonics"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 gap-6">
          {!intro.started ? (
            <IntroState
              lead="Choose a plate boundary and step through how it shapes the land, with Philippine examples."
              options={[
                {
                  label: 'Divergent',
                  hint: 'Plates pull apart and new crust forms',
                  onSelect: () => { setBoundary('divergent'); intro.start(); },
                },
                {
                  label: 'Convergent',
                  hint: 'Plates collide and one sinks (subduction)',
                  onSelect: () => { setBoundary('convergent'); intro.start(); },
                },
                {
                  label: 'Transform',
                  hint: 'Plates slide past and stress builds',
                  onSelect: () => { setBoundary('transform'); intro.start(); },
                },
              ]}
            />
          ) : (
            <>
          <div className="text-center">
            <h2 className="text-lg font-bold text-base-content mb-3">Choose a boundary type</h2>
            <Toggle<Boundary>
              value={boundary}
              onChange={setBoundary}
              options={[
                { value: 'divergent', label: 'Divergent' },
                { value: 'convergent', label: 'Convergent' },
                { value: 'transform', label: 'Transform' },
              ]}
            />
            <p className="mt-4 text-sm text-base-content/70 max-w-2xl mx-auto">{scenario.intro}</p>
          </div>

          <ProcessCycle
            key={boundary}
            stages={scenario.stages}
            mode="linear"
            diagramAriaLabel={scenario.ariaLabel}
            transitionLabels={scenario.transitionLabels}
          />
            </>
          )}
        </div>
      </div>
    </VisualizerLayout>
  );
};

export default PlateTectonicsVisualizer;
