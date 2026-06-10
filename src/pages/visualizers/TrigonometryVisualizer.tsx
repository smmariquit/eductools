import TrigonometryMdx from '../../content/deep-dives/trigonometry.mdx';
import { useState, useRef, useEffect } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

const TrigonometryVisualizer = () => {
  const [angle, setAngle] = useState(30); // degrees
  const [hypotenuse, setHypotenuse] = useState(10); // length
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const angleRad = (angle * Math.PI) / 180;
  const sinVal = Math.sin(angleRad);
  const cosVal = Math.cos(angleRad);
  const tanVal = angle === 90 ? Infinity : Math.tan(angleRad);

  const opposite = hypotenuse * sinVal;
  const adjacent = hypotenuse * cosVal;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 30) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
    }
    for (let i = 0; i < h; i += 30) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
    }

    // Triangle positioning
    const padding = 80;
    const maxTriSize = Math.min(w - padding * 2, h - padding * 2);
    const scale = maxTriSize / 12; // 12 = max hypotenuse

    const originX = padding + 30;
    const originY = h - padding;

    const adjLen = adjacent * scale;
    const oppLen = opposite * scale;

    const bx = originX + adjLen;
    const by = originY;
    const cx = originX + adjLen;
    const cy = originY - oppLen;

    // --- Draw triangle ---

    // Fill
    ctx.fillStyle = 'rgba(59, 130, 246, 0.08)';
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(bx, by);
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.fill();

    // Adjacent side (bottom) - GREEN
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(bx, by);
    ctx.stroke();

    // Opposite side (vertical) - RED
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    // Hypotenuse - BLUE
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    // Right angle marker
    const markSize = 15;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx - markSize, by);
    ctx.lineTo(bx - markSize, by - markSize);
    ctx.lineTo(bx, by - markSize);
    ctx.stroke();

    // Angle arc
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(originX, originY, 35, -angleRad, 0);
    ctx.stroke();

    // Angle label
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 14px Inter, system-ui';
    ctx.textAlign = 'left';
    const labelAngleRad = -angleRad / 2;
    ctx.fillText(`θ = ${angle}°`, originX + 42 * Math.cos(labelAngleRad), originY + 42 * Math.sin(labelAngleRad) + 5);

    // Side labels
    ctx.font = 'bold 14px Inter, system-ui';

    // Adjacent label (green, below bottom side)
    ctx.fillStyle = '#34d399';
    ctx.textAlign = 'center';
    ctx.fillText(`Adjacent = ${adjacent.toFixed(2)}`, (originX + bx) / 2, originY + 25);

    // Opposite label (red, to the right of vertical side)
    ctx.fillStyle = '#f87171';
    ctx.save();
    ctx.translate(bx + 20, (by + cy) / 2);
    ctx.fillText(`Opposite = ${opposite.toFixed(2)}`, 0, 0);
    ctx.restore();

    // Hypotenuse label (blue, along hypotenuse)
    ctx.fillStyle = '#60a5fa';
    const hypMidX = (originX + cx) / 2;
    const hypMidY = (originY + cy) / 2;
    ctx.save();
    ctx.translate(hypMidX - 15, hypMidY - 12);
    ctx.rotate(-angleRad);
    ctx.fillText(`Hypotenuse = ${hypotenuse.toFixed(1)}`, 0, 0);
    ctx.restore();

    // Unit circle reference (small, top-right)
    const ucX = w - 100;
    const ucY = 90;
    const ucR = 60;

    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(ucX, ucY, ucR, 0, Math.PI * 2);
    ctx.stroke();

    // Axes
    ctx.beginPath();
    ctx.moveTo(ucX - ucR - 10, ucY);
    ctx.lineTo(ucX + ucR + 10, ucY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ucX, ucY - ucR - 10);
    ctx.lineTo(ucX, ucY + ucR + 10);
    ctx.stroke();

    // Point on circle
    const ucPx = ucX + ucR * cosVal;
    const ucPy = ucY - ucR * sinVal;

    // cos line
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ucX, ucY);
    ctx.lineTo(ucPx, ucY);
    ctx.stroke();

    // sin line
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ucPx, ucY);
    ctx.lineTo(ucPx, ucPy);
    ctx.stroke();

    // Radius
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ucX, ucY);
    ctx.lineTo(ucPx, ucPy);
    ctx.stroke();

    // Point
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(ucPx, ucPy, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Inter, system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Unit Circle', ucX, ucY + ucR + 20);

  }, [angle, hypotenuse, angleRad, sinVal, cosVal, opposite, adjacent]);

  return (
    <VisualizerLayout
      title="Trigonometry Visualizer (Trigonometriya)"
      description="Explore sine, cosine, and tangent ratios with an interactive right triangle. See how changing the angle affects the ratios in real time."
      adSlotId="2012"
      educationalContent={<TrigonometryMdx />}
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          {/* Canvas */}
          <div className="flex-1">
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="w-full rounded-xl border-2 border-base-300"
            />
          </div>

          {/* Controls & Readout */}
          <div className="w-full lg:w-80 flex flex-col gap-6">
            {/* Controls */}
            <div className="bg-base-200 p-6 rounded-xl border border-base-300 flex flex-col gap-5">
              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Angle θ (Anggulo)</span>
                  <span className="text-warning font-mono">{angle}°</span>
                </label>
                <input
                  type="range" min="5" max="85" step="1"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="range range-warning range-sm"
                />
                <div className="flex justify-between text-xs text-base-content/50 mt-1">
                  <span>5°</span><span>45°</span><span>85°</span>
                </div>
              </div>

              <div>
                <label className="flex justify-between mb-2 font-semibold text-sm">
                  <span>Hypotenuse</span>
                  <span className="text-info font-mono">{hypotenuse.toFixed(1)}</span>
                </label>
                <input
                  type="range" min="3" max="12" step="0.5"
                  value={hypotenuse}
                  onChange={(e) => setHypotenuse(Number(e.target.value))}
                  className="range range-info range-sm"
                />
              </div>

              {/* Quick presets */}
              <div>
                <label className="block mb-2 font-bold text-xs text-base-content/60 uppercase tracking-wider">Special Angles</label>
                <div className="flex gap-2 flex-wrap">
                  {[30, 45, 60].map(a => (
                    <button key={a} onClick={() => setAngle(a)} className={`btn btn-sm ${angle === a ? 'btn-warning' : 'btn-outline'}`}>
                      {a}°
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trig ratios readout */}
            <div className="bg-base-200 p-6 rounded-xl border border-base-300 space-y-4">
              <h3 className="font-bold text-base-content text-sm uppercase tracking-wider">Trigonometric Ratios</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-base-100 p-3 rounded-lg border border-base-300">
                  <div className="badge badge-error badge-sm font-bold">SOH</div>
                  <div className="flex-1">
                    <div className="text-xs text-base-content/60">sin({angle}°)</div>
                    <div className="font-mono font-bold text-lg">{sinVal.toFixed(4)}</div>
                  </div>
                  <div className="text-xs text-base-content/50 font-mono text-right">
                    {opposite.toFixed(2)}/{hypotenuse.toFixed(1)}
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-base-100 p-3 rounded-lg border border-base-300">
                  <div className="badge badge-success badge-sm font-bold">CAH</div>
                  <div className="flex-1">
                    <div className="text-xs text-base-content/60">cos({angle}°)</div>
                    <div className="font-mono font-bold text-lg">{cosVal.toFixed(4)}</div>
                  </div>
                  <div className="text-xs text-base-content/50 font-mono text-right">
                    {adjacent.toFixed(2)}/{hypotenuse.toFixed(1)}
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-base-100 p-3 rounded-lg border border-base-300">
                  <div className="badge badge-info badge-sm font-bold">TOA</div>
                  <div className="flex-1">
                    <div className="text-xs text-base-content/60">tan({angle}°)</div>
                    <div className="font-mono font-bold text-lg">{tanVal === Infinity ? '∞' : tanVal.toFixed(4)}</div>
                  </div>
                  <div className="text-xs text-base-content/50 font-mono text-right">
                    {opposite.toFixed(2)}/{adjacent.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Side lengths */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 rounded-lg bg-success/10 border border-success/30">
                <div className="text-[10px] uppercase font-bold text-success/70">Adjacent</div>
                <div className="font-mono font-bold text-success">{adjacent.toFixed(2)}</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-error/10 border border-error/30">
                <div className="text-[10px] uppercase font-bold text-error/70">Opposite</div>
                <div className="font-mono font-bold text-error">{opposite.toFixed(2)}</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-info/10 border border-info/30">
                <div className="text-[10px] uppercase font-bold text-info/70">Hypotenuse</div>
                <div className="font-mono font-bold text-info">{hypotenuse.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default TrigonometryVisualizer;
