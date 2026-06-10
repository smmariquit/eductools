import { useState, useRef, useEffect } from 'react';
import VisualizerLayout from '../components/VisualizerLayout';

const PythagoreanVisualizer = () => {
  const [sideA, setSideA] = useState(3);
  const [sideB, setSideB] = useState(4);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sideC = Math.sqrt(sideA * sideA + sideB * sideB);
  const areaA = sideA * sideA;
  const areaB = sideB * sideB;
  const areaC = sideC * sideC; // = areaA + areaB

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Scale factor to fit
    const maxSide = Math.max(sideA, sideB, sideC);
    const scale = Math.min((w - 160) / (sideB + sideC + 2), (h - 120) / (sideA + sideC + 2)) * 0.42;

    // Triangle vertices (right angle at bottom-left)
    const originX = w * 0.35;
    const originY = h * 0.62;

    const ax = originX; // right angle vertex
    const ay = originY;
    const bx = originX + sideB * scale; // bottom-right
    const by = originY;
    const cx = originX; // top
    const cy = originY - sideA * scale;

    // --- Draw squares on each side ---

    // Square on side a (vertical side, drawn to the left)
    ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(ax - sideA * scale, cy, sideA * scale, sideA * scale);
    ctx.fill();
    ctx.stroke();

    // Grid lines in square a
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 1; i < sideA; i++) {
      const frac = i / sideA;
      ctx.beginPath();
      ctx.moveTo(ax - sideA * scale, cy + frac * sideA * scale);
      ctx.lineTo(ax, cy + frac * sideA * scale);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ax - sideA * scale + frac * sideA * scale, cy);
      ctx.lineTo(ax - sideA * scale + frac * sideA * scale, ay);
      ctx.stroke();
    }

    // Label
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 14px Inter, system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(`a² = ${sideA}² = ${areaA}`, ax - sideA * scale / 2, cy + sideA * scale / 2 + 5);

    // Square on side b (horizontal side, drawn below)
    ctx.fillStyle = 'rgba(34, 197, 94, 0.15)';
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(ax, ay, sideB * scale, sideB * scale);
    ctx.fill();
    ctx.stroke();

    // Grid lines in square b
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 1; i < sideB; i++) {
      const frac = i / sideB;
      ctx.beginPath();
      ctx.moveTo(ax, ay + frac * sideB * scale);
      ctx.lineTo(bx, ay + frac * sideB * scale);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ax + frac * sideB * scale, ay);
      ctx.lineTo(ax + frac * sideB * scale, ay + sideB * scale);
      ctx.stroke();
    }

    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 14px Inter, system-ui';
    ctx.fillText(`b² = ${sideB}² = ${areaB}`, (ax + bx) / 2, ay + sideB * scale / 2 + 5);

    // Square on hypotenuse c
    // Need to rotate: the square sits on the hypotenuse line
    const hypAngle = Math.atan2(cy - by, cx - bx);
    const cSquareSize = sideC * scale;

    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(hypAngle);

    ctx.fillStyle = 'rgba(96, 165, 250, 0.15)';
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(0, 0, cSquareSize, cSquareSize);
    ctx.fill();
    ctx.stroke();

    // Grid lines in square c
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.12)';
    ctx.lineWidth = 1;
    const cGrid = Math.max(1, Math.round(sideC));
    for (let i = 1; i < cGrid; i++) {
      const frac = i / cGrid;
      ctx.beginPath();
      ctx.moveTo(0, frac * cSquareSize);
      ctx.lineTo(cSquareSize, frac * cSquareSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(frac * cSquareSize, 0);
      ctx.lineTo(frac * cSquareSize, cSquareSize);
      ctx.stroke();
    }

    ctx.fillStyle = '#60a5fa';
    ctx.font = 'bold 14px Inter, system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(`c² = ${areaC.toFixed(1)}`, cSquareSize / 2, cSquareSize / 2 + 5);

    ctx.restore();

    // --- Draw the triangle ---
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.stroke();

    // Right angle marker
    const markSize = 12;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ax + markSize, ay);
    ctx.lineTo(ax + markSize, ay - markSize);
    ctx.lineTo(ax, ay - markSize);
    ctx.stroke();

    // Side labels
    ctx.font = 'bold 16px Inter, system-ui';
    ctx.textAlign = 'center';

    // a (vertical)
    ctx.fillStyle = '#ef4444';
    ctx.fillText(`a = ${sideA}`, ax - 20, (ay + cy) / 2);

    // b (horizontal)
    ctx.fillStyle = '#22c55e';
    ctx.fillText(`b = ${sideB}`, (ax + bx) / 2, ay - 10);

    // c (hypotenuse)
    ctx.fillStyle = '#60a5fa';
    const midHypX = (bx + cx) / 2 + 18;
    const midHypY = (by + cy) / 2;
    ctx.fillText(`c = ${sideC.toFixed(2)}`, midHypX, midHypY);

  }, [sideA, sideB, sideC, areaA, areaB, areaC]);

  return (
    <VisualizerLayout
      title="Pythagorean Theorem (Teorema ni Pythagoras)"
      description="See the visual proof of a² + b² = c². Watch how the squares on each side of a right triangle relate to each other."
      adSlotId="2018"
      educationalContent={
        <>
          <h2>Pythagorean Theorem: Math Grade 8 (MATATAG)</h2>
          <p>The <strong>Pythagorean Theorem</strong> states that in any right triangle, the square of the hypotenuse (the longest side, opposite the right angle) equals the sum of the squares of the other two sides.</p>
          <h3>Formula</h3>
          <p className="text-2xl font-mono font-bold"><span className="text-error">a²</span> + <span className="text-success">b²</span> = <span className="text-info">c²</span></p>
          <h3>Visual Proof (Patunay)</h3>
          <p>If you build a square on each side of the triangle, the <strong>area</strong> of the two smaller squares always adds up exactly to the area of the largest square. This isn't a coincidence — it's a fundamental law of geometry!</p>
          <p>Try a classic 3-4-5 triangle: 3² + 4² = 9 + 16 = 25 = 5². The areas perfectly balance!</p>
        </>
      }
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          {/* Canvas */}
          <div className="flex-1">
            <canvas ref={canvasRef} width={600} height={450} className="w-full rounded-xl border-2 border-base-300" />
          </div>

          {/* Controls & Proof */}
          <div className="w-full lg:w-80 flex flex-col gap-6">
            <div className="bg-base-200 p-6 rounded-xl border border-base-300 flex flex-col gap-5">
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Side <span className="text-error font-bold">a</span></span>
                  <span className="text-error font-mono">{sideA}</span>
                </label>
                <input type="range" min="1" max="12" step="1" value={sideA} onChange={e => setSideA(Number(e.target.value))} className="range range-error range-sm" />
              </div>
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Side <span className="text-success font-bold">b</span></span>
                  <span className="text-success font-mono">{sideB}</span>
                </label>
                <input type="range" min="1" max="12" step="1" value={sideB} onChange={e => setSideB(Number(e.target.value))} className="range range-success range-sm" />
              </div>

              {/* Pythagorean triples */}
              <div className="border-t border-base-300 pt-4">
                <label className="block mb-2 font-bold text-xs text-base-content/60 uppercase tracking-wider">Pythagorean Triples</label>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => { setSideA(3); setSideB(4); }} className="btn btn-outline btn-xs">3-4-5</button>
                  <button onClick={() => { setSideA(5); setSideB(12); }} className="btn btn-outline btn-xs">5-12-13</button>
                  <button onClick={() => { setSideA(8); setSideB(6); }} className="btn btn-outline btn-xs">6-8-10</button>
                  <button onClick={() => { setSideA(7); setSideB(7); }} className="btn btn-outline btn-xs">7-7-√98</button>
                </div>
              </div>
            </div>

            {/* Live proof */}
            <div className="bg-base-200 p-6 rounded-xl border border-base-300 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-base-content/60">Live Proof</h3>

              <div className="flex items-center gap-3">
                <div className="text-center p-3 rounded-lg bg-error/10 border border-error/30 flex-1">
                  <div className="text-xs text-error/70 font-bold">a²</div>
                  <div className="text-xl font-bold font-mono text-error">{areaA}</div>
                </div>
                <span className="text-2xl font-bold text-base-content/50">+</span>
                <div className="text-center p-3 rounded-lg bg-success/10 border border-success/30 flex-1">
                  <div className="text-xs text-success/70 font-bold">b²</div>
                  <div className="text-xl font-bold font-mono text-success">{areaB}</div>
                </div>
              </div>

              <div className="text-center text-2xl font-bold text-base-content/50">=</div>

              <div className="text-center p-4 rounded-lg bg-info/10 border-2 border-info/30">
                <div className="text-xs text-info/70 font-bold">c²</div>
                <div className="text-3xl font-extrabold font-mono text-info">{areaC.toFixed(1)}</div>
              </div>

              <div className="text-center font-mono text-sm text-base-content/60">
                c = √{areaC.toFixed(1)} = <span className="text-info font-bold">{sideC.toFixed(4)}</span>
              </div>

              {/* Check if it's a perfect triple */}
              {Number.isInteger(sideC) && (
                <div className="alert alert-success py-2 text-sm">
                  <span>🎉 Perfect Pythagorean Triple! ({sideA}, {sideB}, {sideC})</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default PythagoreanVisualizer;
