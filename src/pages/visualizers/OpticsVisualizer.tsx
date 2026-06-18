import { useState, useRef, useEffect } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { IntroState, useIntroState } from '../../components/onboarding';

type MirrorType = 'concave' | 'convex' | 'plane';

const CANVAS_W = 600;
const CANVAS_H = 350;
const PX_PER_CM = 10; // canvas scale: 10 px on the bench = 1 cm
const OBJ_H = 60; // object arrow height in px
const MIRROR_X = CANVAS_W - 80;
const MID_Y = CANVAS_H / 2;

const DEFAULT_OBJECT_CM = 25; // beyond C, so the real-image rays sit on-canvas
const DEFAULT_FOCAL_CM = 8;

const cssVar = (name: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

const OpticsVisualizer = () => {
  const intro = useIntroState();
  const [mirrorType, setMirrorType] = useState<MirrorType>('concave');
  const [objectCm, setObjectCm] = useState(DEFAULT_OBJECT_CM);
  const [focalCm, setFocalCm] = useState(DEFAULT_FOCAL_CM);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mirror equation in cm (real distances positive, in front of the mirror).
  const fCm = mirrorType === 'concave' ? focalCm : mirrorType === 'convex' ? -focalCm : Infinity;
  const diCm = mirrorType === 'plane'
    ? -objectCm
    : (() => {
        const inv = 1 / fCm - 1 / objectCm;
        return inv !== 0 ? 1 / inv : Infinity;
      })();
  const m = mirrorType === 'plane' ? 1 : (Number.isFinite(diCm) ? -diCm / objectCm : Infinity);
  const realImage = mirrorType === 'concave' && Number.isFinite(diCm) && diCm > 0;

  useEffect(() => {
    if (!intro.started) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bg = cssVar('--color-base-200', '#fffdf8');
    const ink = cssVar('--color-base-content', '#2b2b3a');
    const objColor = cssVar('--color-primary', '#2f8fe6');
    const imgColor = realImage ? cssVar('--color-error', '#ff6b8a') : cssVar('--color-warning', '#f5a800');
    const fColor = cssVar('--color-accent', '#f5a800');
    const cColor = cssVar('--color-secondary', '#ff6b8a');
    const rayColors = [
      cssVar('--color-success', '#2fa46a'),
      cssVar('--color-primary', '#2f8fe6'),
      cssVar('--color-secondary', '#ff6b8a'),
      cssVar('--color-accent', '#f5a800'),
    ];

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = ink;
    ctx.globalAlpha = 0.08;
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }
    ctx.globalAlpha = 1;

    // Principal axis
    ctx.strokeStyle = ink;
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 4]);
    ctx.beginPath(); ctx.moveTo(0, MID_Y); ctx.lineTo(w, MID_Y); ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // Mirror
    const mirrorHeight = 200;
    ctx.strokeStyle = ink;
    ctx.lineWidth = 4;
    if (mirrorType === 'plane') {
      ctx.beginPath();
      ctx.moveTo(MIRROR_X, MID_Y - mirrorHeight / 2);
      ctx.lineTo(MIRROR_X, MID_Y + mirrorHeight / 2);
      ctx.stroke();
    } else {
      const curvature = mirrorType === 'concave' ? 40 : -40;
      ctx.beginPath();
      ctx.arc(MIRROR_X + curvature * 2.5, MID_Y, mirrorHeight / 1.6, Math.PI - 0.65, Math.PI + 0.65, mirrorType === 'convex');
      ctx.stroke();
    }
    // Hatching behind the reflective surface
    ctx.strokeStyle = ink;
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = 1;
    for (let i = -mirrorHeight / 2; i < mirrorHeight / 2; i += 8) {
      ctx.beginPath();
      ctx.moveTo(MIRROR_X + 2, MID_Y + i);
      ctx.lineTo(MIRROR_X + 14, MID_Y + i + 10);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const objPx = objectCm * PX_PER_CM;
    const fPx = focalCm * PX_PER_CM;
    const objX = MIRROR_X - objPx;
    const objTop = MID_Y - OBJ_H;

    // Focal point & centre of curvature markers
    if (mirrorType !== 'plane') {
      const dir = mirrorType === 'concave' ? -1 : 1; // in front (concave) vs behind (convex)
      const fX = MIRROR_X + dir * fPx;
      const cX = MIRROR_X + dir * fPx * 2;
      ctx.fillStyle = fColor;
      ctx.beginPath(); ctx.arc(fX, MID_Y, 5, 0, Math.PI * 2); ctx.fill();
      ctx.font = 'bold 13px Inter, system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('F', fX, MID_Y + 22);
      ctx.fillStyle = cColor;
      ctx.beginPath(); ctx.arc(cX, MID_Y, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillText('C', cX, MID_Y + 22);
    }

    // Object arrow
    ctx.strokeStyle = objColor;
    ctx.fillStyle = objColor;
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(objX, MID_Y); ctx.lineTo(objX, objTop); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(objX, objTop); ctx.lineTo(objX - 8, objTop + 14); ctx.lineTo(objX + 8, objTop + 14); ctx.fill();
    ctx.font = 'bold 12px Inter, system-ui';
    ctx.fillText('Object', objX, MID_Y + 18);

    const diPx = Number.isFinite(diCm) ? diCm * PX_PER_CM : Infinity;
    const imageDrawable = Number.isFinite(diPx) && Math.abs(diPx) < 4000;

    if (imageDrawable) {
      const imgX = mirrorType === 'plane'
        ? MIRROR_X + objPx
        : (realImage ? MIRROR_X - diPx : MIRROR_X + Math.abs(diPx));
      // Image height keeps the object's sign times magnification; clamp for drawing.
      const rawImgTop = MID_Y - m * OBJ_H;
      const imgTop = Math.max(12, Math.min(h - 12, rawImgTop));

      // Reflected ray for one incident ray that hits the mirror plane at hitY.
      const drawRay = (hitY: number, color: string) => {
        if (!Number.isFinite(hitY)) return;
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.7;
        ctx.lineWidth = 1.5;
        // Incident ray: object top to the mirror plane.
        ctx.setLineDash([]);
        ctx.beginPath(); ctx.moveTo(objX, objTop); ctx.lineTo(MIRROR_X, hitY); ctx.stroke();
        if (realImage) {
          // Reflected ray converges in front at the real image.
          ctx.beginPath(); ctx.moveTo(MIRROR_X, hitY); ctx.lineTo(imgX, imgTop); ctx.stroke();
        } else {
          // Physical reflected ray diverges to the front; its backward
          // extension (dashed) locates the virtual image behind the mirror.
          const dx = MIRROR_X - imgX;
          const dy = hitY - imgTop;
          const len = Math.hypot(dx, dy) || 1;
          const ext = 300;
          ctx.beginPath();
          ctx.moveTo(MIRROR_X, hitY);
          ctx.lineTo(MIRROR_X + (dx / len) * ext, hitY + (dy / len) * ext);
          ctx.stroke();
          ctx.setLineDash([5, 4]);
          ctx.beginPath(); ctx.moveTo(MIRROR_X, hitY); ctx.lineTo(imgX, imgTop); ctx.stroke();
          ctx.setLineDash([]);
        }
        ctx.globalAlpha = 1;
      };

      // Height where an incident ray from the object top, aimed through (pointX, MID_Y),
      // crosses the mirror plane x = MIRROR_X.
      const hitThrough = (pointX: number) => {
        const span = pointX - objX;
        if (Math.abs(span) < 1) return Infinity;
        const t = (MIRROR_X - objX) / span;
        return objTop + t * (MID_Y - objTop);
      };

      if (mirrorType === 'plane') {
        drawRay(objTop, rayColors[0]); // parallel ray reflects straight back
        drawRay(MID_Y, rayColors[3]); // chief ray to the vertex
      } else {
        const dir = mirrorType === 'concave' ? -1 : 1;
        const fX = MIRROR_X + dir * fPx;
        const cX = MIRROR_X + dir * fPx * 2;
        drawRay(objTop, rayColors[0]); // 1. parallel → through F
        drawRay(hitThrough(fX), rayColors[1]); // 2. through F → parallel
        drawRay(hitThrough(cX), rayColors[2]); // 3. through C → back on itself
        drawRay(MID_Y, rayColors[3]); // 4. chief ray to the vertex
      }

      // Image arrow (on top of the rays)
      ctx.strokeStyle = imgColor;
      ctx.fillStyle = imgColor;
      ctx.lineWidth = 3;
      ctx.setLineDash(realImage ? [] : [6, 4]);
      ctx.beginPath(); ctx.moveTo(imgX, MID_Y); ctx.lineTo(imgX, imgTop); ctx.stroke();
      ctx.setLineDash([]);
      const arrowDir = imgTop < MID_Y ? 1 : -1;
      ctx.beginPath();
      ctx.moveTo(imgX, imgTop);
      ctx.lineTo(imgX - 8, imgTop + arrowDir * 14);
      ctx.lineTo(imgX + 8, imgTop + arrowDir * 14);
      ctx.fill();
      ctx.font = 'bold 12px Inter, system-ui';
      ctx.fillText('Image', imgX, MID_Y + 18);
    }

    // Mirror label
    ctx.fillStyle = ink;
    ctx.globalAlpha = 0.6;
    ctx.font = '11px Inter, system-ui';
    ctx.textAlign = 'left';
    ctx.fillText('Mirror', MIRROR_X - 20, MID_Y - mirrorHeight / 2 - 10);
    ctx.globalAlpha = 1;
  }, [mirrorType, objectCm, focalCm, diCm, m, realImage, intro.started]);

  const imageProperties = () => {
    if (mirrorType === 'plane') return { orientation: 'Upright', size: 'Same size', type: 'Virtual' };
    if (!Number.isFinite(diCm)) return { orientation: '—', size: 'At infinity', type: 'No image' };
    if (realImage) {
      return {
        orientation: m > 0 ? 'Upright' : 'Inverted',
        size: Math.abs(m) > 1.05 ? 'Enlarged' : Math.abs(m) < 0.95 ? 'Diminished' : 'Same size',
        type: 'Real',
      };
    }
    return {
      orientation: 'Upright',
      size: Math.abs(m) > 1.05 ? 'Enlarged' : Math.abs(m) < 0.95 ? 'Diminished' : 'Same size',
      type: 'Virtual',
    };
  };

  const props = imageProperties();

  const reset = () => {
    setMirrorType('concave');
    setObjectCm(DEFAULT_OBJECT_CM);
    setFocalCm(DEFAULT_FOCAL_CM);
  };

  const mirrorButtons: { type: MirrorType; label: string; cls: string }[] = [
    { type: 'concave', label: 'Concave (Malukong)', cls: 'btn-primary' },
    { type: 'convex', label: 'Convex (Malukot)', cls: 'btn-secondary' },
    { type: 'plane', label: 'Plane (Patag)', cls: 'btn-accent' },
  ];

  return (
    <VisualizerLayout
      title="Optics Simulator (Optika)"
      description="Trace the principal rays for concave, convex, and plane mirrors to find where the image forms and whether it is real or virtual."
      adSlotId="2014"
      guideLink="/blog/optics"
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        {!intro.started ? (
          <div className="card-body p-6 md:p-8">
            <IntroState
              lead="Pick a mirror, then trace the principal rays to see where the image forms and whether it is real or virtual."
              options={[
                {
                  label: 'Concave mirror',
                  hint: 'Malukong',
                  onSelect: () => { setMirrorType('concave'); intro.start(); },
                },
                {
                  label: 'Convex mirror',
                  hint: 'Malukot',
                  onSelect: () => { setMirrorType('convex'); intro.start(); },
                },
                {
                  label: 'Plane mirror',
                  hint: 'Patag',
                  onSelect: () => { setMirrorType('plane'); intro.start(); },
                },
              ]}
            />
          </div>
        ) : (
        <div className="card-body p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          {/* Canvas */}
          <div className="flex-1 min-w-0">
            <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="w-full h-auto aspect-[12/7] rounded-xl border-2 border-base-300" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Orientation</div>
                <div className={`text-lg font-bold ${props.orientation === 'Upright' ? 'text-success' : props.orientation === 'Inverted' ? 'text-error' : 'text-base-content'}`}>{props.orientation}</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Size</div>
                <div className="text-lg font-bold text-primary">{props.size}</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Type</div>
                <div className={`text-lg font-bold ${props.type === 'Real' ? 'text-error' : props.type === 'Virtual' ? 'text-warning' : 'text-base-content'}`}>{props.type}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 flex flex-col gap-5 bg-base-200 p-6 rounded-xl border border-base-300">
            <div>
              <span className="block mb-2 font-bold text-sm">Mirror type (Uri ng Salamin):</span>
              <div className="flex flex-col gap-2">
                {mirrorButtons.map((b) => (
                  <button
                    key={b.type}
                    onClick={() => setMirrorType(b.type)}
                    className={`btn btn-sm ${mirrorType === b.type ? b.cls : 'btn-outline'}`}
                    aria-pressed={mirrorType === b.type}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="optics-obj" className="flex justify-between mb-2 font-semibold text-sm">
                <span>Object distance</span>
                <span className="text-primary font-mono">{objectCm} cm</span>
              </label>
              <input id="optics-obj" type="range" min="4" max="35" step="0.5" value={objectCm} onChange={(e) => setObjectCm(Number(e.target.value))} className="range range-primary range-sm w-full" aria-valuetext={`object distance ${objectCm} centimetres`} />
            </div>

            {mirrorType !== 'plane' && (
              <div>
                <label htmlFor="optics-focal" className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Focal length</span>
                  <span className="text-warning font-mono">{focalCm} cm</span>
                </label>
                <input id="optics-focal" type="range" min="3" max="15" step="0.5" value={focalCm} onChange={(e) => setFocalCm(Number(e.target.value))} className="range range-warning range-sm w-full" aria-valuetext={`focal length ${focalCm} centimetres`} />
              </div>
            )}

            <div className="bg-base-100 p-4 rounded-lg border border-base-300 space-y-2">
              <div className="text-xs font-bold text-base-content/60 uppercase tracking-wider">Calculated values</div>
              <div className="text-sm font-mono"><span className="text-base-content/60">d<sub>o</sub> = </span>{objectCm} cm</div>
              <div className="text-sm font-mono"><span className="text-base-content/60">f = </span>{fCm === Infinity ? '∞' : `${fCm} cm`}</div>
              <div className="text-sm font-mono"><span className="text-base-content/60">d<sub>i</sub> = </span>{Number.isFinite(diCm) ? `${diCm.toFixed(1)} cm` : '∞'}</div>
              <div className="text-sm font-mono"><span className="text-base-content/60">m = </span>{Number.isFinite(m) ? m.toFixed(2) : '∞'}</div>
            </div>

            <button className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
          </div>
        </div>
        )}
      </div>
    </VisualizerLayout>
  );
};
export default OpticsVisualizer;
