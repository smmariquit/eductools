import VisualizerLayout from '../../components/VisualizerLayout';
import ProcessCycle, { type ProcessStage } from '../../components/visualizers/ProcessCycle';
import { IntroState, useIntroState } from '../../components/onboarding';

const stages: ProcessStage[] = [
  {
    id: 'interphase',
    title: 'Interphase',
    subtitle: 'Grow & copy DNA',
    art: '🧬',
    description:
      'Before mitosis begins, the cell grows and copies all of its DNA. Each chromosome is now made of two identical sister chromatids joined at a centromere.',
  },
  {
    id: 'prophase',
    title: 'Prophase',
    subtitle: 'Chromosomes appear',
    art: '🌀',
    description:
      'The loose chromatin coils tightly into visible chromosomes. The nuclear envelope breaks down and spindle fibres begin to form across the cell.',
  },
  {
    id: 'metaphase',
    title: 'Metaphase',
    subtitle: 'Line up in the middle',
    art: '🪢',
    description:
      'The chromosomes line up single-file along the middle of the cell (the metaphase plate). Spindle fibres attach to the centromere of each chromosome.',
  },
  {
    id: 'anaphase',
    title: 'Anaphase',
    subtitle: 'Chromatids pulled apart',
    art: '↔️',
    description:
      'The spindle fibres pull the sister chromatids apart, dragging one copy of each chromosome to opposite poles of the cell. Each pole now has a complete set.',
  },
  {
    id: 'telophase',
    title: 'Telophase',
    subtitle: 'Two nuclei form',
    art: '🔵',
    description:
      'The separated chromosomes reach the poles and unwind back into chromatin. A new nuclear envelope forms around each set, making two nuclei.',
  },
  {
    id: 'cytokinesis',
    title: 'Cytokinesis',
    subtitle: 'Cell splits in two',
    art: '✌️',
    description:
      'The cytoplasm pinches and divides, producing two genetically identical daughter cells. Each can then re-enter interphase and repeat the cycle.',
  },
];

const CellDivisionVisualizer = () => {
  const intro = useIntroState();
  return (
    <VisualizerLayout
      title="Mitosis: Cell Division"
      description="Step through the phases of mitosis and track what happens to the chromosomes at each stage."
      adSlotId="2008"
      guideLink="/blog/cell-division"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 gap-6">
          {!intro.started ? (
            <IntroState
              lead="Step through the phases of mitosis and track what happens to the chromosomes at each stage."
              actionLabel="Start the cycle"
              onStart={intro.start}
            />
          ) : (
          <>
          <p className="text-center text-sm text-base-content/70 max-w-2xl mx-auto">
            Mitosis makes two identical cells from one — the process behind growth, replacing dead
            skin, and healing a wound. Play the cycle or step through each phase.
          </p>

          <ProcessCycle
            stages={stages}
            mode="cycle"
            diagramAriaLabel="Phases of mitosis"
          />

          <div className="rounded-2xl border border-base-300 bg-base-200 p-4 md:p-5 text-sm text-base-content/80 leading-relaxed">
            <strong className="text-base-content">Key idea:</strong> the cell copies its DNA{' '}
            <em>once</em> (interphase) and divides it evenly (anaphase), so each daughter cell ends
            up with the same number and kind of chromosomes as the parent.
          </div>
          </>
          )}
        </div>
      </div>
    </VisualizerLayout>
  );
};

export default CellDivisionVisualizer;
