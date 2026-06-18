import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import VisualizerLayout from '../../components/VisualizerLayout';
import ProcessCycle, { type ProcessStage } from '../../components/visualizers/ProcessCycle';
import { Toggle } from '../../components/ui/Toggle';
import { IntroState, useIntroState } from '../../components/onboarding';

type Subject = 'eagle' | 'tamaraw';

const eagleStages: ProcessStage[] = [
  {
    id: 'egg',
    title: 'Itlog',
    subtitle: 'Egg',
    illustration: { name: 'life-eagle-egg', color: 'sunshine' },
    description:
      'A breeding pair lays a single egg — usually only about once every two years. Both parents take turns incubating it for roughly 58 to 60 days.',
    phContext:
      'The Philippine eagle is endemic, found only in the old-growth forests of Luzon, Samar, Leyte, and Mindanao.',
  },
  {
    id: 'eaglet',
    title: 'Sisiw',
    subtitle: 'Eaglet / hatchling',
    illustration: { name: 'life-eagle-eaglet', color: 'sunshine' },
    description:
      'A downy chick hatches and depends entirely on its parents, who hunt and bring food to the nest. Birds develop directly, so the eaglet is already a small eagle — there is no larval or metamorphosis stage.',
  },
  {
    id: 'juvenile',
    title: 'Juvenile',
    subtitle: 'Young eagle',
    illustration: { name: 'life-eagle-juvenile', color: 'leaf' },
    photo: {
      src: '/images/life-cycles/eagle-adult.jpg',
      alt: 'Philippine eagle perched on a branch with crest feathers raised',
      credit: 'Photo: shankar s., CC BY 2.0, via Wikimedia Commons (young birds resemble adults but keep learning to hunt).',
    },
    description:
      'The young eagle fledges and leaves the nest but keeps practising flight and hunting near its parents for many months before living on its own.',
  },
  {
    id: 'adult',
    title: 'Adult',
    subtitle: 'Fully grown',
    illustration: { name: 'life-eagle-adult', color: 'sky' },
    photo: {
      src: '/images/life-cycles/eagle-adult.jpg',
      alt: 'Adult Philippine eagle with shaggy crest and brown-and-white plumage',
      credit: 'Photo: shankar s., CC BY 2.0, via Wikimedia Commons.',
    },
    description:
      'A full-grown eagle is a top forest predator. A single pair needs thousands of hectares of forest to find enough prey to survive.',
  },
  {
    id: 'breeding',
    title: 'Pagpaparami',
    subtitle: 'Breeding',
    illustration: { name: 'life-eagle-nest', color: 'berry' },
    description:
      'Eagles only reach breeding age at about five to seven years old. Pairs bond for life and raise just one chick at a time before the cycle begins again.',
    phContext:
      'This slow pace — one chick every two years after a long wait to mature — is why the species recovers so slowly from any loss.',
  },
];

const tamarawStages: ProcessStage[] = [
  {
    id: 'calf',
    title: 'Guya',
    subtitle: 'Calf',
    illustration: { name: 'life-tamaraw-calf', color: 'leaf' },
    photo: {
      src: '/images/life-cycles/tamaraw-calf.jpg',
      alt: 'Young tamaraw on Mindoro grassland',
      credit: 'Photo: Gregg Yan, CC BY-SA 3.0, via Wikimedia Commons.',
    },
    description:
      'A cow gives birth to a single calf after a gestation of about 276 to 315 days, typically only once every two years.',
    phContext:
      'The tamaraw is a dwarf buffalo found only on the island of Mindoro — it lives nowhere else on Earth.',
  },
  {
    id: 'juvenile',
    title: 'Bisiro',
    subtitle: 'Juvenile',
    illustration: { name: 'life-tamaraw-juvenile', color: 'sunshine' },
    photo: {
      src: '/images/life-cycles/tamaraw-closeup.jpg',
      alt: 'Close-up of a tamaraw with V-shaped horns',
      credit: 'Photo: Gregg Yan, CC BY-SA 3.0, via Wikimedia Commons.',
    },
    description:
      'As a mammal, the tamaraw develops directly: the calf is a small version of the adult with no metamorphosis. It stays with its mother for two to four years.',
  },
  {
    id: 'adult',
    title: 'Adult',
    subtitle: 'Fully grown',
    illustration: { name: 'life-tamaraw-adult', color: 'ink' },
    photo: {
      src: '/images/life-cycles/tamaraw-adult.jpg',
      alt: 'Adult tamaraw bull crossing a grassy field on Mindoro',
      credit: 'Photo: Gregg Yan, CC BY-SA 3.0, via Wikimedia Commons.',
    },
    description:
      'The tamaraw is fully grown at around six years old — a stocky, solitary grazer of Mindoro\'s grasslands and forest edges.',
  },
  {
    id: 'breeding',
    title: 'Pagpaparami',
    subtitle: 'Breeding',
    illustration: { name: 'life-tamaraw-breeding', color: 'berry' },
    photo: {
      src: '/images/life-cycles/tamaraw-adult.jpg',
      alt: 'Tamaraw in habitat at Mount Iglit-Baco National Park',
      credit: 'Photo: Gregg Yan, CC BY-SA 3.0, via Wikimedia Commons.',
    },
    description:
      'Mature animals breed slowly, producing a single calf about every two years, which restarts the cycle.',
    phContext:
      'Surveys describe a collapse from an estimated 10,000 animals around 1900 to only a few hundred today.',
  },
];

const LifeCyclesVisualizer = () => {
  const intro = useIntroState();
  const [subject, setSubject] = useState<Subject>('eagle');
  const stages = subject === 'eagle' ? eagleStages : tamarawStages;

  return (
    <VisualizerLayout
      title="Life Cycles: Philippine Eagle & Tamaraw"
      description="Follow the developmental stages of two critically endangered Philippine endemics — with hand-drawn stage art and reference photos."
      adSlotId="1002"
      guideLink="/blog/life-cycles"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 gap-6">
          {!intro.started ? (
            <IntroState
              lead="Pick an endemic Philippine species and follow its life cycle stage by stage."
              options={[
                {
                  label: 'Philippine Eagle',
                  hint: 'One chick about every two years',
                  onSelect: () => { setSubject('eagle'); intro.start(); },
                },
                {
                  label: 'Tamaraw',
                  hint: 'A dwarf buffalo found only on Mindoro',
                  onSelect: () => { setSubject('tamaraw'); intro.start(); },
                },
              ]}
            />
          ) : (
            <>
          <div className="text-center">
            <h2 className="text-lg font-bold text-base-content mb-1">Choose an endemic species</h2>
            <p className="text-base-content/70 mb-4 max-w-prose mx-auto">
              Both are birds and mammals that develop directly — no metamorphosis — but they breed
              very slowly. Tap a stage in the loop, or use Play to walk through it.
            </p>
            <Toggle<Subject>
              value={subject}
              onChange={setSubject}
              options={[
                { value: 'eagle', label: 'Philippine Eagle' },
                { value: 'tamaraw', label: 'Tamaraw' },
              ]}
            />
          </div>

          <ProcessCycle
            key={subject}
            stages={stages}
            mode="cycle"
            diagramAriaLabel={`Life cycle of the ${subject === 'eagle' ? 'Philippine eagle' : 'tamaraw'}`}
          />

          <div className="rounded-2xl border border-warning/40 bg-warning/10 p-4 md:p-5">
            <h3 className="font-bold text-base-content flex items-center gap-2">
              <AlertTriangle aria-hidden="true" className="w-5 h-5 text-warning" /> Conservation note
            </h3>
            <p className="mt-2 text-sm text-base-content/80 leading-relaxed">
              Both species are <strong>endemic</strong> (found nowhere else) and{' '}
              <strong>critically endangered</strong> on the IUCN Red List. The Philippine eagle
              numbers only an estimated 400 pairs in the wild. Because each pair raises so few young
              so slowly, every adult lost to hunting and every forest cleared removes breeding
              capacity that takes the better part of a decade to replace.
            </p>
          </div>
            </>
          )}
        </div>
      </div>
    </VisualizerLayout>
  );
};

export default LifeCyclesVisualizer;
