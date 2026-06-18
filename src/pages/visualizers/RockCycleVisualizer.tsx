import VisualizerLayout from '../../components/VisualizerLayout';
import ProcessCycle, { type ProcessStage } from '../../components/visualizers/ProcessCycle';
import { IntroState, useIntroState } from '../../components/onboarding';

const stages: ProcessStage[] = [
  {
    id: 'magma',
    title: 'Magma',
    subtitle: 'Molten rock',
    art: '🌋',
    description:
      'Deep underground, intense heat melts rock into magma. When it erupts onto the surface it is called lava.',
    phContext:
      'The Philippines sits on the Pacific Ring of Fire, so magma is never far below — feeding active volcanoes like Taal and Mayon.',
  },
  {
    id: 'igneous',
    title: 'Igneous',
    subtitle: 'Cooling & crystallization',
    art: '🪨',
    description:
      'As magma or lava cools, its minerals crystallize and lock together into solid igneous rock. Fast cooling at the surface makes fine-grained rock; slow cooling underground makes coarse crystals.',
    phContext:
      'Mayon and Taal erupt basalt and andesite lava; the 1991 Pinatubo eruption left huge deposits of light, frothy pumice.',
  },
  {
    id: 'sediment',
    title: 'Sediments',
    subtitle: 'Weathering & erosion',
    art: '🏖️',
    description:
      'At the surface, wind, water, and temperature changes break rock into small fragments (weathering). Rivers and waves then carry and deposit these sediments in layers.',
  },
  {
    id: 'sedimentary',
    title: 'Sedimentary',
    subtitle: 'Compaction & cementation',
    art: '🧱',
    description:
      'As more layers pile up, the buried sediments are squeezed together (compaction) and glued by dissolved minerals (cementation), forming sedimentary rock.',
    phContext:
      'The limestone of the Puerto Princesa Underground River in Palawan is sedimentary rock built from ancient marine sediments.',
  },
  {
    id: 'metamorphic',
    title: 'Metamorphic',
    subtitle: 'Heat & pressure',
    art: '💎',
    description:
      'When existing rock is buried deeper and exposed to great heat and pressure — but not enough to melt it — its minerals recrystallize into denser metamorphic rock.',
    phContext:
      'Romblon marble is metamorphosed limestone, hardened and recrystallized by heat and pressure underground.',
  },
];

const RockCycleVisualizer = () => {
  const intro = useIntroState();
  return (
    <VisualizerLayout
      title="Siklo ng mga Bato (Rock Cycle)"
      description="Follow rock through melting, cooling, weathering, deposition, compaction, and heat & pressure as it transforms between igneous, sedimentary, and metamorphic — with Philippine volcanic examples."
      adSlotId="2009"
      guideLink="/blog/rock-cycle"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 gap-6">
          {!intro.started ? (
            <IntroState
              lead="Follow rock as it transforms between igneous, sedimentary, and metamorphic, with Philippine volcanic examples."
              actionLabel="Start the cycle"
              onStart={intro.start}
            />
          ) : (
          <>
          <p className="text-center text-sm text-base-content/70 max-w-2xl mx-auto">
            Rock is constantly recycled. Each stage shows the process that <em>forms</em> that rock
            type. If metamorphic rock gets hot enough it melts back into magma, closing the loop.
          </p>

          <ProcessCycle
            stages={stages}
            mode="cycle"
            diagramAriaLabel="Stages of the rock cycle"
          />

          <div className="rounded-2xl border border-base-300 bg-base-200 p-4 md:p-5 text-sm text-base-content/80 leading-relaxed">
            <strong className="text-base-content">It is not one fixed path.</strong> The arrows show
            the most common loop, but there are shortcuts: igneous rock can be metamorphosed
            directly, and any rock — igneous, sedimentary, or metamorphic — can be weathered into
            sediment or melted back into magma.
          </div>
          </>
          )}
        </div>
      </div>
    </VisualizerLayout>
  );
};

export default RockCycleVisualizer;
