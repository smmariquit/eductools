import { useState, useRef, useEffect } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

type MirrorType = 'concave' | 'convex' | 'plane';

const OpticsVisualizer = () => {
  const [mirrorType, setMirrorType] = useState<MirrorType>('concave');
  const [objectDistance, setObjectDistance] = useState(150); // pixels from mirror
  const [focalLength, setFocalLength] = useState(80); // pixels
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const midY = h / 2;
    const mirrorX = w - 80; // mirror is on the right

    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
    }
    for (let i = 0; i < h; i += 40) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
    }

    // Principal axis
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(w, midY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw mirror
    const mirrorHeight = 200;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 4;

    if (mirrorType === 'plane') {
      ctx.beginPath();
      ctx.moveTo(mirrorX, midY - mirrorHeight / 2);
      ctx.lineTo(mirrorX, midY + mirrorHeight / 2);
      ctx.stroke();
    } else {
      const curvature = mirrorType === 'concave' ? 40 : -40;
      ctx.beginPath();
      ctx.arc(mirrorX + curvature * 2.5, midY, mirrorHeight / 1.6, 
        Math.PI - 0.65, Math.PI + 0.65, mirrorType === 'convex');
      ctx.stroke();
    }

    // Hatching behind mirror
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.lineWidth = 1;
    for (let i = -mirrorHeight / 2; i < mirrorHeight / 2; i += 8) {
      ctx.beginPath();
      ctx.moveTo(mirrorX + 2, midY + i);
      ctx.lineTo(mirrorX + 14, midY + i + 10);
      ctx.stroke();
    }

    // Focal point and center of curvature markers
    const f = mirrorType === 'convex' ? focalLength : focalLength; // always positive for drawing

    if (mirrorType !== 'plane') {
      // Focal point (F)
      const fX = mirrorType === 'concave' ? mirrorX - f : mirrorX + f;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(fX, midY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 13px Inter, system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('F', fX, midY + 22);

      // Center of curvature (C = 2F)
      const cX = mirrorType === 'concave' ? mirrorX - f * 2 : mirrorX + f * 2;
      ctx.fillStyle = '#a78bfa';
      ctx.beginPath();
      ctx.arc(cX, midY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('C', cX, midY + 22);
    }

    // Object (arrow)
    const objX = mirrorX - objectDistance;
    const objHeight = 60;
    const objTop = midY - objHeight;

    // Draw object arrow (blue)
    ctx.strokeStyle = '#3b82f6';
    ctx.fillStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(objX, midY);
    ctx.lineTo(objX, objTop);
    ctx.stroke();
    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(objX, objTop);
    ctx.lineTo(objX - 8, objTop + 14);
    ctx.lineTo(objX + 8, objTop + 14);
    ctx.fill();

    ctx.font = 'bold 12px Inter, system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Object', objX, midY + 18);

    // Calculate image using mirror equation: 1/f = 1/do + 1/di
    // For concave: f positive, for convex: f negative, for plane: f = infinity
    let imageDistance: number;
    let imageMagnification: number;

    if (mirrorType === 'plane') {
      imageDistance = -objectDistance; // behind mirror
      imageMagnification = 1;
    } else {
      const fVal = mirrorType === 'concave' ? focalLength : -focalLength;
      // 1/di = 1/f - 1/do
      const invDi = (1 / fVal) - (1 / objectDistance);
      imageDistance = invDi !== 0 ? 1 / invDi : Infinity;
      imageMagnification = imageDistance !== Infinity ? -imageDistance / objectDistance : 1;
    }

    const isReal = imageDistance > 0 && mirrorType === 'concave';
    const imgHeight = objHeight * Math.abs(imageMagnification);
    const clampedImgHeight = Math.min(imgHeight, 180); // prevent overflow

    // Draw image if not at infinity
    if (Math.abs(imageDistance) < 2000 && Math.abs(imageDistance) > 1) {
      const imgX = mirrorType === 'plane' 
        ? mirrorX + objectDistance // behind mirror for plane
        : (isReal ? mirrorX - imageDistance : mirrorX + Math.abs(imageDistance));
      
      const imgTop = imageMagnification > 0 
        ? midY - clampedImgHeight 
        : midY + clampedImgHeight;

      // Draw image arrow
      ctx.strokeStyle = isReal ? '#f87171' : '#f87171';
      ctx.fillStyle = isReal ? '#f87171' : '#f87171';
      ctx.lineWidth = 3;
      ctx.setLineDash(isReal ? [] : [6, 4]);
      ctx.beginPath();
      ctx.moveTo(imgX, midY);
      ctx.lineTo(imgX, imgTop);
      ctx.stroke();
      ctx.setLineDash([]);
      // Arrowhead
      const arrowDir = imgTop < midY ? 1 : -1;
      ctx.beginPath();
      ctx.moveTo(imgX, imgTop);
      ctx.lineTo(imgX - 8, imgTop + arrowDir * 14);
      ctx.lineTo(imgX + 8, imgTop + arrowDir * 14);
      ctx.fill();

      ctx.font = 'bold 12px Inter, system-ui';
      ctx.fillText('Image', imgX, midY + 18);

      // Draw ray traces (simplified: 2 principal rays)
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.6;

      if (mirrorType === 'concave') {
        // Ray 1: Parallel to axis → reflects through F
        ctx.strokeStyle = '#34d399';
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(objX, objTop);
        ctx.lineTo(mirrorX, objTop); // parallel to axis
        ctx.lineTo(imgX, imgTop); // through focal point to image
        ctx.stroke();

        // Ray 2: Through C → reflects back
        ctx.strokeStyle = '#f472b6';
        const cX = mirrorX - focalLength * 2;
        ctx.beginPath();
        ctx.moveTo(objX, objTop);
        ctx.lineTo(mirrorX, midY + (objTop - midY) * (mirrorX - objX) / (cX - objX)); // toward C, hits mirror
        ctx.lineTo(imgX, imgTop);
        ctx.stroke();
      } else if (mirrorType === 'convex') {
        // Ray 1: Parallel → diverges as if from F
        ctx.strokeStyle = '#34d399';
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(objX, objTop);
        ctx.lineTo(mirrorX, objTop);
        ctx.stroke();
        // Reflected ray diverging
        ctx.beginPath();
        ctx.moveTo(mirrorX, objTop);
        ctx.lineTo(objX, objTop + (mirrorX - objX) * objTop / focalLength * 0.3);
        ctx.stroke();
      }

      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    // Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Inter, system-ui';
    ctx.textAlign = 'left';
    ctx.fillText('Mirror', mirrorX - 20, midY - mirrorHeight / 2 - 10);

  }, [mirrorType, objectDistance, focalLength]);

  // Computed values for display
  const fVal = mirrorType === 'concave' ? focalLength : mirrorType === 'convex' ? -focalLength : Infinity;
  const invDi = mirrorType === 'plane' ? 0 : (1 / fVal) - (1 / objectDistance);
  const di = mirrorType === 'plane' ? -objectDistance : (invDi !== 0 ? 1 / invDi : Infinity);
  const m = mirrorType === 'plane' ? 1 : (Math.abs(di) < 2000 ? -di / objectDistance : 0);

  const imageProperties = () => {
    if (mirrorType === 'plane') return { orientation: 'Upright', size: 'Same size', type: 'Virtual' };
    if (di > 0 && mirrorType === 'concave') {
      return {
        orientation: m > 0 ? 'Upright' : 'Inverted',
        size: Math.abs(m) > 1.05 ? 'Enlarged' : Math.abs(m) < 0.95 ? 'Diminished' : 'Same size',
        type: 'Real'
      };
    }
    return {
      orientation: 'Upright',
      size: Math.abs(m) > 1.05 ? 'Enlarged' : Math.abs(m) < 0.95 ? 'Diminished' : 'Same size',
      type: 'Virtual'
    };
  };

  const props = imageProperties();

  return (
    <VisualizerLayout
      title="Optics Simulator (Optika)"
      description="Explore image formation by concave, convex, and plane mirrors. Trace rays and understand magnification."
      adSlotId="2014"
      educationalContent={
        <>
          <h2>Light and Optics: Science Grade 10 (MATATAG)</h2>
          <p>Mirrors form images by reflecting light. The type of image depends on the <strong>mirror shape</strong> and the <strong>object distance</strong>.</p>
          <h3>Mirror Equation</h3>
          <p className="font-mono text-lg">1/<span className="font-serif italic">f</span> = 1/<span className="font-serif italic">d<sub>o</sub></span> + 1/<span className="font-serif italic">d<sub>i</sub></span></p>
          <p>Where <span className="font-serif italic">f</span> = focal length, <span className="font-serif italic">d<sub>o</sub></span> = object distance, <span className="font-serif italic">d<sub>i</sub></span> = image distance.</p>
          <h3>Types of Images</h3>
          <ul>
            <li><strong>Real Image:</strong> Light rays actually converge. Can be projected on a screen. Always inverted.</li>
            <li><strong>Virtual Image:</strong> Light rays appear to diverge from the image. Cannot be projected. Always upright.</li>
          </ul>
          <p>Move the object closer and farther from the mirror to see how the image changes!</p>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          {/* Canvas */}
          <div className="flex-1">
            <canvas ref={canvasRef} width={600} height={350} className="w-full rounded-xl border-2 border-base-300" />

            {/* Image properties */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Orientation</div>
                <div className={`text-lg font-bold ${props.orientation === 'Upright' ? 'text-success' : 'text-error'}`}>{props.orientation}</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Size</div>
                <div className="text-lg font-bold text-primary">{props.size}</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-base-200 border border-base-300">
                <div className="text-xs uppercase tracking-wider font-bold text-base-content/60">Type</div>
                <div className={`text-lg font-bold ${props.type === 'Real' ? 'text-error' : 'text-warning'}`}>{props.type}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 flex flex-col gap-5 bg-base-200 p-6 rounded-xl border border-base-300">
            <div>
              <label className="block mb-2 font-bold text-sm">Mirror Type (Uri ng Salamin):</label>
              <div className="flex flex-col gap-2">
                <button onClick={() => setMirrorType('concave')} className={`btn btn-sm ${mirrorType === 'concave' ? 'btn-primary' : 'btn-outline'}`}>Concave (Malukong)</button>
                <button onClick={() => setMirrorType('convex')} className={`btn btn-sm ${mirrorType === 'convex' ? 'btn-secondary' : 'btn-outline'}`}>Convex (Malukot)</button>
                <button onClick={() => setMirrorType('plane')} className={`btn btn-sm ${mirrorType === 'plane' ? 'btn-accent' : 'btn-outline'}`}>Plane (Patag)</button>
              </div>
            </div>

            <div>
              <label className="flex justify-between mb-2 font-semibold text-sm">
                <span>Object Distance</span>
                <span className="text-primary font-mono">{objectDistance}px</span>
              </label>
              <input type="range" min="40" max="350" step="5" value={objectDistance} onChange={e => setObjectDistance(Number(e.target.value))} className="range range-primary range-sm" />
            </div>

            {mirrorType !== 'plane' && (
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Focal Length</span>
                  <span className="text-warning font-mono">{focalLength}px</span>
                </label>
                <input type="range" min="30" max="150" step="5" value={focalLength} onChange={e => setFocalLength(Number(e.target.value))} className="range range-warning range-sm" />
              </div>
            )}

            {/* Computed values */}
            <div className="bg-base-100 p-4 rounded-lg border border-base-300 space-y-2">
              <div className="text-xs font-bold text-base-content/60 uppercase tracking-wider">Calculated Values</div>
              <div className="text-sm font-mono">
                <span className="text-base-content/60">d<sub>o</sub> = </span>{objectDistance}
              </div>
              <div className="text-sm font-mono">
                <span className="text-base-content/60">f = </span>{fVal === Infinity ? '∞' : fVal}
              </div>
              <div className="text-sm font-mono">
                <span className="text-base-content/60">d<sub>i</sub> = </span>{Math.abs(di) > 1999 ? '∞' : di.toFixed(1)}
              </div>
              <div className="text-sm font-mono">
                <span className="text-base-content/60">m = </span>{Math.abs(m) > 100 ? '∞' : m.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default OpticsVisualizer;
