import VisualizerLayout from '../../components/VisualizerLayout';
import ProcessCycle, { type ProcessStage } from '../../components/visualizers/ProcessCycle';
import { IntroState, useIntroState } from '../../components/onboarding';

const stages: ProcessStage[] = [
  {
    id: 'evaporation',
    title: 'Pagsingaw',
    subtitle: 'Evaporation',
    art: '☀️',
    description:
      'The sun heats the surface of oceans, lakes, and rivers. Liquid water absorbs that energy and turns into invisible water vapour that rises into the air.',
    phContext:
      'Strong tropical sun over the seas around the archipelago drives heavy evaporation all year round.',
  },
  {
    id: 'transpiration',
    title: 'Paglilipat-singaw',
    subtitle: 'Transpiration',
    art: '🌿',
    description:
      'Plants pull water up from the soil and release it as vapour through their leaves. Over forests, this adds a large amount of moisture to the air.',
    phContext:
      'Watersheds like the Sierra Madre release moisture through transpiration and slowly feed the rivers below.',
  },
  {
    id: 'condensation',
    title: 'Pamumuo ng Ulap',
    subtitle: 'Condensation',
    art: '☁️',
    description:
      'As the vapour rises it cools down and condenses into tiny water droplets clustered around dust, forming clouds.',
    phContext:
      'Moist monsoon air forced upward over mountain ranges cools quickly and builds the tall clouds that bring rain.',
  },
  {
    id: 'precipitation',
    title: 'Pag-ulan',
    subtitle: 'Precipitation',
    art: '🌧️',
    description:
      'Droplets in a cloud collide and grow until they are heavy enough to fall back to the surface as rain (or, in cold places, snow or hail).',
    phContext:
      'The Habagat (southwest monsoon, around June–October) and tropical typhoons deliver most of the country\'s rainfall.',
  },
  {
    id: 'runoff',
    title: 'Pag-agos',
    subtitle: 'Runoff',
    art: '🏞️',
    description:
      'Rain that does not soak into the ground flows downhill across the land, gathering into streams and rivers.',
    phContext:
      'On deforested slopes, fast runoff cannot be absorbed and leads to flash floods and landslides.',
  },
  {
    id: 'collection',
    title: 'Pagtitipon',
    subtitle: 'Collection',
    art: '🌊',
    description:
      'Water collects in rivers, lakes, the sea, and underground as groundwater — ready to evaporate again and repeat the cycle.',
    phContext:
      'Watersheds like Angat Dam store this water to supply Metro Manila; the cooler, drier Amihan season follows the rains.',
  },
];

const WaterCycleVisualizer = () => {
  const intro = useIntroState();
  return (
    <VisualizerLayout
      title="Siklo ng Tubig (Water Cycle)"
      description="Trace water through evaporation, transpiration, condensation, precipitation, runoff, and collection — with Philippine monsoon and watershed context."
      adSlotId="2001"
      guideLink="/blog/water-cycle"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 gap-6">
          {!intro.started ? (
            <IntroState
              lead="Follow a drop of water through six stages, from evaporation to collection, with Philippine monsoon and watershed context."
              actionLabel="Start the cycle"
              onStart={intro.start}
            />
          ) : (
            <>
              <p className="text-center text-sm text-base-content/70 max-w-2xl mx-auto">
                Water is never created or used up — it just keeps moving between the sea, the sky, and
                the land. Play the loop or jump to any stage.
              </p>

              <ProcessCycle
                stages={stages}
                mode="cycle"
                diagramAriaLabel="Stages of the water cycle"
              />
            </>
          )}
        </div>
      </div>
    </VisualizerLayout>
  );
};

export default WaterCycleVisualizer;
