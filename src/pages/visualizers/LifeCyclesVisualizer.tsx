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
    art: '🥚',
    description:
      'A breeding pair lays a single egg — usually only about once every two years. Both parents take turns incubating it for roughly 58 to 60 days.',
    phContext:
      'The Philippine eagle is endemic, found only in the old-growth forests of Luzon, Samar, Leyte, and Mindanao.',
  },
  {
    id: 'eaglet',
    title: 'Sisiw',
    subtitle: 'Eaglet / hatchling',
    art: '🐣',
    description:
      'A downy chick hatches and depends entirely on its parents, who hunt and bring food to the nest. Birds develop directly, so the eaglet is already a small eagle — there is no larval or metamorphosis stage.',
  },
  {
    id: 'juvenile',
    title: 'Juvenile',
    subtitle: 'Young eagle',
    art: '🪶',
    description:
      'The young eagle fledges and leaves the nest but keeps practising flight and hunting near its parents for many months before living on its own.',
  },
  {
    id: 'adult',
    title: 'Adult',
    subtitle: 'Fully grown',
    art: '🦅',
    description:
      'A full-grown eagle is a top forest predator. A single pair needs thousands of hectares of forest to find enough prey to survive.',
  },
  {
    id: 'breeding',
    title: 'Pagpaparami',
    subtitle: 'Breeding',
    art: '🪺',
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
    art: '🐃',
    description:
      'A cow gives birth to a single calf after a gestation of about 276 to 315 days, typically only once every two years.',
    phContext:
      'The tamaraw is a dwarf buffalo found only on the island of Mindoro — it lives nowhere else on Earth.',
  },
  {
    id: 'juvenile',
    title: 'Bisiro',
    subtitle: 'Juvenile',
    art: '🐃',
    description:
      'As a mammal, the tamaraw develops directly: the calf is a small version of the adult with no metamorphosis. It stays with its mother for two to four years.',
  },
  {
    id: 'adult',
    title: 'Adult',
    subtitle: 'Fully grown',
    art: '🐃',
    description:
      'The tamaraw is fully grown at around six years old — a stocky, solitary grazer of Mindoro\'s grasslands and forest edges.',
  },
  {
    id: 'breeding',
    title: 'Pagpaparami',
    subtitle: 'Breeding',
    art: '❤️',
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
      description="Follow the developmental stages of two critically endangered Philippine endemics and see why slow breeders are so fragile."
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
            <p className="text-sm text-base-content/70 mb-4">
              Both are birds and mammals that develop directly — no metamorphosis — but they breed
              very slowly.
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
