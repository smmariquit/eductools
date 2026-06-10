import ChemicalBondingMdx from '../../content/deep-dives/chemical-bonding.mdx';
import { useState, useEffect, useRef, useCallback } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

const ChemicalBondingVisualizer = () => {
  const [bonded, setBonded] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstanceRef = useRef<unknown>(null);

  const init3DViewer = useCallback(async () => {
    if (!viewerRef.current || viewerInstanceRef.current) return;
    
    // Dynamically import 3Dmol to avoid SSR issues
    const $3Dmol = await import('3dmol');
    
    const viewer = $3Dmol.createViewer(viewerRef.current, {
      backgroundColor: '0x0f172a',
      antialias: true,
    });

    // Build NaCl crystal lattice (2x2x2 unit cell)
    const a = 2.82; // NaCl lattice constant in Angstroms (halved for visualization)
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          // Na+ at corners
          viewer.addSphere({
            center: { x: x * a, y: y * a, z: z * a },
            radius: 0.8,
            color: '0xef4444',
          });
          // Cl- at face centers (offset by half lattice)
          if (x < 2 && y < 2 && z < 2) {
            viewer.addSphere({
              center: { x: x * a + a/2, y: y * a + a/2, z: z * a + a/2 },
              radius: 1.0,
              color: '0x22c55e',
            });
          }
        }
      }
    }

    // Add labels
    viewer.addLabel('Na⁺', { position: { x: 0, y: 0, z: 0 }, fontSize: 14, fontColor: 'white', backgroundColor: '0xef4444', backgroundOpacity: 0.8 });
    viewer.addLabel('Cl⁻', { position: { x: a/2, y: a/2, z: a/2 }, fontSize: 14, fontColor: 'white', backgroundColor: '0x22c55e', backgroundOpacity: 0.8 });

    viewer.zoomTo();
    viewer.spin('y', 0.5);
    viewer.render();
    viewerInstanceRef.current = viewer;
  }, []);

  useEffect(() => {
    if (show3D) {
      init3DViewer();
    }
    return () => {
      viewerInstanceRef.current = null;
    };
  }, [show3D, init3DViewer]);

  return (
    <VisualizerLayout
      title="Pagbuo ng Asin (Chemical Bonding)"
      description="Visualize ionic bonding and electron transfer between Sodium (Na) and Chlorine (Cl) to make Table Salt."
      adSlotId="1006"
      educationalContent={<ChemicalBondingMdx />}
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center py-12 overflow-x-auto">

          {/* Tab toggle */}
          <div className="tabs tabs-boxed mb-8">
            <button className={`tab ${!show3D ? 'tab-active' : ''}`} onClick={() => setShow3D(false)}>2D Electron Transfer</button>
            <button className={`tab ${show3D ? 'tab-active' : ''}`} onClick={() => setShow3D(true)}>3D Crystal (3Dmol.js)</button>
          </div>

          {!show3D ? (
            <>
              <div className="flex flex-col md:flex-row gap-8 items-center relative min-w-[500px]">
                {/* Sodium Atom */}
                <div className="relative w-[200px] h-[200px] flex items-center justify-center">
                  <div className="z-10 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg border-2 border-red-700">
                    Na{bonded && <sup className="ml-0.5 text-xs">+</sup>}
                  </div>
                  <div className="absolute w-[80px] h-[80px] border border-base-content/20 rounded-full"></div>
                  <div className="absolute w-[130px] h-[130px] border border-base-content/20 rounded-full"></div>
                  <div className="absolute w-[180px] h-[180px] border border-dashed border-base-content/40 rounded-full transition-opacity duration-1000" style={{ opacity: bonded ? 0.1 : 1 }}></div>
                  <div className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_#facc15] transition-transform duration-1000 ease-in-out z-20" style={{ top: '6px', right: '86px', transform: bonded ? 'translate(260px, 90px)' : 'translate(0, 0)' }}></div>
                </div>

                <div className="text-base-content/40 text-4xl hidden md:block font-bold">&rarr;</div>
                <div className="text-base-content/40 text-4xl block md:hidden font-bold">&darr;</div>

                {/* Chlorine Atom */}
                <div className="relative w-[220px] h-[220px] flex items-center justify-center mt-8 md:mt-0">
                  <div className="z-10 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg border-2 border-emerald-700">
                    Cl{bonded && <sup className="ml-0.5 text-xs">-</sup>}
                  </div>
                  <div className="absolute w-[80px] h-[80px] border border-base-content/20 rounded-full"></div>
                  <div className="absolute w-[130px] h-[130px] border border-base-content/20 rounded-full"></div>
                  <div className="absolute w-[200px] h-[200px] border border-base-content/40 rounded-full bg-emerald-500/5">
                    <div className="absolute w-3 h-3 bg-blue-400 rounded-full top-[4px] left-[95px]"></div>
                    <div className="absolute w-3 h-3 bg-blue-400 rounded-full top-[30px] right-[30px]"></div>
                    <div className="absolute w-3 h-3 bg-blue-400 rounded-full top-[95px] right-[-6px]"></div>
                    <div className="absolute w-3 h-3 bg-blue-400 rounded-full bottom-[30px] right-[30px]"></div>
                    <div className="absolute w-3 h-3 bg-blue-400 rounded-full bottom-[4px] left-[95px]"></div>
                    <div className="absolute w-3 h-3 bg-blue-400 rounded-full bottom-[30px] left-[30px]"></div>
                    <div className="absolute w-3 h-3 bg-blue-400 rounded-full top-[95px] left-[-6px]"></div>
                  </div>
                </div>
              </div>

              <button className={`btn btn-lg mt-12 w-full max-w-sm ${bonded ? 'btn-outline' : 'btn-primary'}`} onClick={() => setBonded(!bonded)}>
                {bonded ? 'Reset Atoms' : 'Transfer Electron (Form NaCl)'}
              </button>
            </>
          ) : (
            <div className="w-full">
              <div ref={viewerRef} className="w-full h-[400px] rounded-xl border-[3px] border-slate-700 shadow-inner" />
              <p className="text-center text-sm text-base-content/60 mt-4">Drag to rotate • Scroll to zoom • This is a 3D NaCl crystal lattice rendered by <strong>3Dmol.js</strong></p>
            </div>
          )}
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default ChemicalBondingVisualizer;
