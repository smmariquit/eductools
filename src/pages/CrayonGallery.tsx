import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CrayonArt, crayonAssets, CRAYON_ART_NAMES, type CrayonColor, type CrayonAnimate } from '../components/crayon';

const COLORS: CrayonColor[] = ['ink', 'sky', 'berry', 'sunshine', 'leaf', 'grape'];
const ANIMATIONS: CrayonAnimate[] = ['none', 'draw', 'wiggle'];

/**
 * Living catalog of the Crayon Cosmos art set. Lets anyone (humans + agents)
 * eyeball every available drawing and try colors/animations.
 */
const CrayonGallery = () => {
  const [color, setColor] = useState<CrayonColor>('ink');
  const [animate, setAnimate] = useState<CrayonAnimate>('none');

  const byCategory = useMemo(() => {
    const groups: Record<string, string[]> = {};
    for (const name of CRAYON_ART_NAMES) {
      const cat = crayonAssets[name].category;
      (groups[cat] ??= []).push(name);
    }
    return groups;
  }, []);

  return (
    <div className="w-full">
      <Helmet><title>Crayon Art Gallery | EduVisualsPH</title><meta name="robots" content="noindex" /></Helmet>

      <div className="py-6">
        <div className="flex items-center gap-3">
          <CrayonArt name="star" size={44} animate="wiggle" color="sunshine" />
          <h1 className="text-4xl font-extrabold text-primary mb-0">Crayon Art Gallery</h1>
        </div>
        <CrayonArt name="underline-squiggle" width={240} height={18} className="block mt-1 mb-3" />
        <p className="text-base-content/70 max-w-2xl">
          Every hand-drawn asset in the design system, auto-discovered from
          <code className="mx-1">src/assets/crayon/</code>. {CRAYON_ART_NAMES.length} drawings.
        </p>
      </div>

      <div className="flex flex-wrap gap-6 items-center bg-base-200 border border-base-300 rounded-xl p-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-base-content/60">Color</span>
          <div className="join border border-base-300">
            {COLORS.map(c => (
              <button key={c} onClick={() => setColor(c)} className={`join-item btn btn-xs capitalize ${color === c ? 'btn-primary' : 'btn-ghost'}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-base-content/60">Animate</span>
          <div className="join border border-base-300">
            {ANIMATIONS.map(a => (
              <button key={a} onClick={() => setAnimate(a)} className={`join-item btn btn-xs capitalize ${animate === a ? 'btn-primary' : 'btn-ghost'}`}>{a}</button>
            ))}
          </div>
        </div>
      </div>

      {Object.entries(byCategory).map(([category, names]) => (
        <section key={category} className="mb-10">
          <h2 className="text-2xl font-bold text-base-content capitalize mb-4">{category}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {names.map(name => (
              <div key={name} className="card bg-base-100 border border-base-200">
                <div className="card-body items-center text-center p-4 gap-2">
                  <div className="h-20 flex items-center justify-center">
                    <CrayonArt name={name} size={64} color={color} animate={animate} title={name} />
                  </div>
                  <code className="text-xs text-base-content/70 break-all">{name}</code>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default CrayonGallery;
