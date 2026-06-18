import { useState } from 'react';
import { AlertTriangle, Zap } from 'lucide-react';
import VisualizerLayout from '../../components/VisualizerLayout';
import ProcessCycle, { type ProcessStage } from '../../components/visualizers/ProcessCycle';
import { IntroState, useIntroState } from '../../components/onboarding';
import { imagePath } from '../../lib/images';

type Subject = 'eagle' | 'tamaraw' | 'mosquito' | 'cockroach';
type Pace = 'slow' | 'fast';

interface SubjectConfig {
  label: string;
  hint: string;
  pace: Pace;
  stages: ProcessStage[];
  diagramLabel: string;
}

const eagleStages: ProcessStage[] = [
  {
    id: 'egg',
    title: 'Itlog',
    subtitle: 'Egg',
    illustration: { name: 'life-eagle-egg', color: 'sunshine' },
    photo: {
      src: imagePath('life-cycles', 'eagle-nest.jpg'),
      alt: 'Philippine eagle at its nest during the breeding season',
      credit: 'Photo: markaharpe, CC BY-SA 2.0, via Wikimedia Commons (parent at nest during incubation).',
    },
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
    photo: {
      src: imagePath('life-cycles', 'eagle-eaglet.jpg'),
      alt: 'Downy Philippine eagle nestling in the nest',
      credit: 'Photo: markaharpe, CC BY-SA 2.0, via Wikimedia Commons.',
    },
    description:
      'A downy chick hatches and depends entirely on its parents, who hunt and bring food to the nest. Birds develop directly, so the eaglet is already a small eagle — there is no larval or metamorphosis stage.',
  },
  {
    id: 'juvenile',
    title: 'Juvenile',
    subtitle: 'Young eagle',
    illustration: { name: 'life-eagle-juvenile', color: 'leaf' },
    photo: {
      src: imagePath('life-cycles', 'eagle-juvenile.jpg'),
      alt: 'Young Philippine eagle perched in forest on Mindanao',
      credit: 'Photo: Francesco Veronesi, CC BY-SA 2.0, via Wikimedia Commons.',
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
      src: imagePath('life-cycles', 'eagle-adult.jpg'),
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
    photo: {
      src: imagePath('life-cycles', 'eagle-breeding.jpg'),
      alt: 'Mature Philippine eagle with raised crest and full adult plumage',
      credit: 'Photo: Olympus Gene Tibubos, CC BY 4.0, via Wikimedia Commons.',
    },
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
      src: imagePath('life-cycles', 'tamaraw-calf.jpg'),
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
      src: imagePath('life-cycles', 'tamaraw-closeup.jpg'),
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
      src: imagePath('life-cycles', 'tamaraw-adult.jpg'),
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
      src: imagePath('life-cycles', 'tamaraw-breeding.jpg'),
      alt: 'Group of tamaraw on Mindoro grassland',
      credit: 'Photo: Gregg Yan, CC BY-SA 3.0, via Wikimedia Commons.',
    },
    description:
      'Mature animals breed slowly, producing a single calf about every two years, which restarts the cycle.',
    phContext:
      'Surveys describe a collapse from an estimated 10,000 animals around 1900 to only a few hundred today.',
  },
];

const mosquitoStages: ProcessStage[] = [
  {
    id: 'egg',
    title: 'Itlog',
    subtitle: 'Egg',
    illustration: { name: 'life-mosquito-egg', color: 'sunshine' },
    photo: {
      src: imagePath('life-cycles', 'mosquito-egg.jpg'),
      alt: 'Cluster of mosquito eggs on water',
      credit: 'Photo: NIAID, public domain, via Wikimedia Commons.',
    },
    description:
      'A female lays dozens to hundreds of eggs at once, often in rafts on still water. Under warm conditions the eggs can hatch in about two days.',
    phContext:
      'Standing water in buckets, gutters, and tyres around homes is where dengue-carrying mosquitoes (Aedes) commonly breed in the Philippines.',
  },
  {
    id: 'larva',
    title: 'Larba',
    subtitle: 'Larva / wriggler',
    illustration: { name: 'life-mosquito-larva', color: 'leaf' },
    photo: {
      src: imagePath('life-cycles', 'mosquito-larva.jpg'),
      alt: 'Mosquito larvae swimming in water',
      credit: 'Photo: James Gathany, CDC, CC BY 2.5, via Wikimedia Commons.',
    },
    description:
      'The larva lives entirely in water, moulting several times as it grows. This is the “wriggler” stage you may see in puddles or containers.',
  },
  {
    id: 'pupa',
    title: 'Pupa',
    subtitle: 'Pupa / tumbler',
    illustration: { name: 'life-mosquito-pupa', color: 'sky' },
    photo: {
      src: imagePath('life-cycles', 'mosquito-pupa.jpg'),
      alt: 'Mosquito pupa among larvae in water',
      credit: 'Photo: Tanvir Rahat, CC BY-SA 4.0, via Wikimedia Commons.',
    },
    description:
      'The pupa is a resting stage with no feeding — the body inside remakes itself into an adult. Metamorphosis means the larva and adult look nothing alike.',
  },
  {
    id: 'adult',
    title: 'Adult',
    subtitle: 'Imago',
    illustration: { name: 'life-mosquito-adult', color: 'berry' },
    photo: {
      src: imagePath('life-cycles', 'mosquito-adult.jpg'),
      alt: 'Adult Aedes mosquito feeding',
      credit: 'Photo: Muhammad Mahdi Karim, GFDL 1.2, via Wikimedia Commons.',
    },
    description:
      'The adult emerges, dries its wings, and can mate within days. A single female may lay another batch of eggs soon after, restarting the cycle in as little as one to two weeks.',
    phContext:
      'This r-selected pace — many offspring, almost no parental care, rapid turnover — is the opposite of the eagle or tamaraw.',
  },
];

const cockroachStages: ProcessStage[] = [
  {
    id: 'egg',
    title: 'Ootheca',
    subtitle: 'Egg case',
    illustration: { name: 'life-cockroach-egg', color: 'sunshine' },
    photo: {
      src: imagePath('life-cycles', 'cockroach-egg.jpg'),
      alt: 'American cockroach carrying an egg case',
      credit: 'Photo: Rahul-kumi, CC BY-SA 4.0, via Wikimedia Commons.',
    },
    description:
      'The female produces a tough egg case (ootheca) holding dozens of eggs. She may carry it until just before the nymphs hatch, protecting a whole brood at once.',
  },
  {
    id: 'nymph',
    title: 'Nimfa',
    subtitle: 'Nymph',
    illustration: { name: 'life-cockroach-nymph', color: 'leaf' },
    photo: {
      src: imagePath('life-cycles', 'cockroach-nymph.jpg'),
      alt: 'Young cockroach nymph',
      credit: 'Photo: Insects Unlocked, CC0, via Wikimedia Commons.',
    },
    description:
      'Cockroaches develop through incomplete metamorphosis: nymphs hatch looking like wingless mini-adults and moult repeatedly, growing larger each time.',
  },
  {
    id: 'adult',
    title: 'Adult',
    subtitle: 'Fully grown',
    illustration: { name: 'life-cockroach-adult', color: 'ink' },
    photo: {
      src: imagePath('life-cycles', 'cockroach-adult.jpg'),
      alt: 'Adult American cockroach',
      credit: 'Photo: Eugene Zelenko, CC BY-SA 4.0, via Wikimedia Commons.',
    },
    description:
      'Adults develop wings and reach breeding size in a few months. In warm, food-rich places a population can multiply many times over a single season.',
  },
  {
    id: 'breeding',
    title: 'Pagpaparami',
    subtitle: 'Breeding',
    illustration: { name: 'life-cockroach-breeding', color: 'berry' },
    photo: {
      src: imagePath('life-cycles', 'cockroach-breeding.jpg'),
      alt: 'Cockroach egg case on a leaf',
      credit: 'Photo: public domain, via Wikimedia Commons.',
    },
    description:
      'Mated females keep producing new oothecae — sometimes one every few weeks. Each case can release dozens of nymphs, so numbers can climb very quickly.',
    phContext:
      'Unlike slow endemic mammals and birds, common pests rely on quantity: lose most of a generation and the survivors can still rebuild the population fast.',
  },
];

const SUBJECTS: Record<Subject, SubjectConfig> = {
  eagle: {
    label: 'Philippine Eagle',
    hint: 'One chick about every two years',
    pace: 'slow',
    stages: eagleStages,
    diagramLabel: 'Life cycle of the Philippine eagle',
  },
  tamaraw: {
    label: 'Tamaraw',
    hint: 'A dwarf buffalo found only on Mindoro',
    pace: 'slow',
    stages: tamarawStages,
    diagramLabel: 'Life cycle of the tamaraw',
  },
  mosquito: {
    label: 'Mosquito',
    hint: 'Egg to adult in about two weeks',
    pace: 'fast',
    stages: mosquitoStages,
    diagramLabel: 'Life cycle of the mosquito',
  },
  cockroach: {
    label: 'Cockroach',
    hint: 'Dozens of young per egg case',
    pace: 'fast',
    stages: cockroachStages,
    diagramLabel: 'Life cycle of the cockroach',
  },
};

const SUBJECT_ORDER: Subject[] = ['eagle', 'tamaraw', 'mosquito', 'cockroach'];

const SpeciesPicker = ({
  value,
  onChange,
}: {
  value: Subject;
  onChange: (s: Subject) => void;
}) => (
  <div className="grid w-full max-w-2xl mx-auto gap-4 sm:grid-cols-2">
    {(['slow', 'fast'] as const).map((pace) => (
      <div key={pace} className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50 text-center">
          {pace === 'slow' ? 'Slow breeders' : 'Fast breeders'}
        </p>
        <div className="grid gap-2">
          {SUBJECT_ORDER.filter((id) => SUBJECTS[id].pace === pace).map((id) => {
            const cfg = SUBJECTS[id];
            const active = value === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange(id)}
                aria-pressed={active}
                className={`rounded-xl border-2 p-3 text-left motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  active
                    ? 'border-primary bg-primary text-primary-content shadow-md'
                    : 'border-base-300 bg-base-100 text-base-content hover:border-primary/50'
                }`}
              >
                <span className="block font-semibold">{cfg.label}</span>
                <span className={`block text-xs mt-0.5 ${active ? 'text-primary-content/80' : 'text-base-content/60'}`}>
                  {cfg.hint}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

const LifeCyclesVisualizer = () => {
  const intro = useIntroState();
  const [subject, setSubject] = useState<Subject>('eagle');
  const config = SUBJECTS[subject];

  return (
    <VisualizerLayout
      title="Life Cycles: Slow & Fast Breeders"
      description="Compare endemic Philippine species that breed very slowly with common animals whose populations can explode in weeks — stage by stage with illustrations and reference photos."
      adSlotId="1002"
      guideLink="/blog/life-cycles"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 gap-6">
          {!intro.started ? (
            <IntroState
              lead="Pick a species and follow its life cycle stage by stage — from slow endemic breeders to animals that multiply in weeks."
              options={SUBJECT_ORDER.map((id) => ({
                label: SUBJECTS[id].label,
                hint: SUBJECTS[id].hint,
                onSelect: () => {
                  setSubject(id);
                  intro.start();
                },
              }))}
            />
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-lg font-bold text-base-content mb-1">Choose a species</h2>
                <p className="text-base-content/70 mb-4 max-w-prose mx-auto">
                  {config.pace === 'slow'
                    ? 'These endemic animals develop directly — no metamorphosis — but breed very slowly. Tap a stage in the loop, or use Play to walk through it.'
                    : 'These animals breed fast — many offspring, little parental care, and short generation times. Tap a stage in the loop, or use Play to walk through it.'}
                </p>
                <SpeciesPicker value={subject} onChange={setSubject} />
              </div>

              <ProcessCycle
                key={subject}
                stages={config.stages}
                mode="cycle"
                diagramAriaLabel={config.diagramLabel}
              />

              {config.pace === 'slow' ? (
                <div className="rounded-2xl border border-warning/40 bg-warning/10 p-4 md:p-5">
                  <h3 className="font-bold text-base-content flex items-center gap-2">
                    <AlertTriangle aria-hidden="true" className="w-5 h-5 text-warning" /> Conservation note
                  </h3>
                  <p className="mt-2 text-sm text-base-content/80 leading-relaxed">
                    Both endemic species are <strong>critically endangered</strong> on the IUCN Red List. The
                    Philippine eagle numbers only an estimated 400 pairs in the wild. Because each pair raises so
                    few young so slowly, every adult lost to hunting and every forest cleared removes breeding
                    capacity that takes the better part of a decade to replace.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-secondary/40 bg-secondary/10 p-4 md:p-5">
                  <h3 className="font-bold text-base-content flex items-center gap-2">
                    <Zap aria-hidden="true" className="w-5 h-5 text-secondary" /> Fast reproduction
                  </h3>
                  <p className="mt-2 text-sm text-base-content/80 leading-relaxed">
                    Mosquitoes and cockroaches sit at the opposite end of the life-history spectrum: many eggs,
                    almost no parental investment, and adults breeding again within days or weeks. That is why a
                    single puddle or kitchen can produce huge numbers in one season — and why clearing stagnant
                    water matters for dengue prevention.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </VisualizerLayout>
  );
};

export default LifeCyclesVisualizer;
