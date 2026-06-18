import { useState, useRef, useEffect } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { GuidedInputFlow, useTouchedFields } from '../../components/onboarding';

const DEFAULT_ANGLE = 30;
const DEFAULT_HYP = 10;

const TrigonometryVisualizer = () => {
  const [angle, setAngle] = useState(DEFAULT_ANGLE); // degrees
  const [hypotenuse, setHypotenuse] = useState(DEFAULT_HYP); // length
  const fields = useTouchedFields<'angle'>();
  const ready = fields.isTouched('angle');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const angleRad = (angle * Math.PI) / 180;
  const sinVal = Math.sin(angleRad);
  const cosVal = Math.cos(angleRad);
  const tanVal = angle === 90 ? Infinity : Math.tan(angleRad);

  const opposite = hypotenuse * sinVal;
  const adjacent = hypotenuse * cosVal;

  const reset = () => {
    setAngle(DEFAULT_ANGLE);
    setHypotenuse(DEFAULT_HYP);
    fields.reset();
  };

  const fillExample = () => {
    setAngle(30);
    setHypotenuse(DEFAULT_HYP);
    fields.touch('angle');
  };

  const angleSlider = (
    <div>
      <Slider
        id="trig-angle"
        motif="angle"
        label="Angle θ (Anggulo)"
        value={angle}
        min={5}
        max={85}
        step={1}
        unit="°"
        colorClass="warning"
        onChange={(e) => { setAngle(Number(e.target.value)); fields.touch('angle'); }}
        aria-valuetext={`${angle} degrees`}
      />
      <div className="flex justify-between text-xs text-base-content/50 mt-1">
        <span>5°</span><span>45°</span><span>85°</span>
      </div>
    </div>
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const styles = getComputedStyle(canvas);
    const v = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
    const colBg = v('--color-base-200', '#fffdf8');
    const colGrid = v('--color-base-300', '#f2e6d6');
    const colInk = v('--color-base-content', '#2b2b3a');
    const colAdj = v('--color-success', '#2fa46a');   // adjacent / cos
    const colOpp = v('--color-secondary', '#ff6b8a'); // opposite / sin
    const colHyp = v('--color-primary', '#2f8fe6');    // hypotenuse / radius
    const colAng = v('--color-accent', '#f5a800');     // angle

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = colBg;
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = colGrid;
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 30) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke(); }
    for (let i = 0; i < h; i += 30) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke(); }

    const withAlpha = (hex: string, alpha: number) => {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!m) return hex;
      return `rgba(${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}, ${alpha})`;
    };

    // ============ LEFT: right triangle (scaled by hypotenuse) ============
    const triScale = 230 / 12; // 12 = max hypotenuse value
    const originX = 60;
    const originY = 320;
    const bx = originX + adjacent * triScale; // foot of the right angle
    const by = originY;
    const cx = bx;
    const cy = originY - opposite * triScale; // apex

    ctx.fillStyle = withAlpha(colHyp, 0.08);
    ctx.beginPath();
    ctx.moveTo(originX, originY); ctx.lineTo(bx, by); ctx.lineTo(cx, cy); ctx.closePath(); ctx.fill();

    ctx.lineWidth = 4;
    ctx.strokeStyle = colAdj;
    ctx.beginPath(); ctx.moveTo(originX, originY); ctx.lineTo(bx, by); ctx.stroke();
    ctx.strokeStyle = colOpp;
    ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(cx, cy); ctx.stroke();
    ctx.strokeStyle = colHyp;
    ctx.beginPath(); ctx.moveTo(originX, originY); ctx.lineTo(cx, cy); ctx.stroke();

    // Right-angle marker
    const markSize = 14;
    ctx.strokeStyle = colInk;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx - markSize, by); ctx.lineTo(bx - markSize, by - markSize); ctx.lineTo(bx, by - markSize); ctx.stroke();

    // Angle arc
    ctx.strokeStyle = colAng;
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(originX, originY, 32, -angleRad, 0); ctx.stroke();

    ctx.fillStyle = colAng;
    ctx.font = 'bold 13px Inter, system-ui';
    ctx.textAlign = 'left';
    ctx.fillText(`θ = ${angle}°`, originX + 38 * Math.cos(-angleRad / 2), originY + 38 * Math.sin(-angleRad / 2) + 4);

    ctx.font = 'bold 12px Inter, system-ui';
    ctx.fillStyle = colAdj;
    ctx.textAlign = 'center';
    ctx.fillText(`adj = ${adjacent.toFixed(2)}`, (originX + bx) / 2, originY + 20);
    ctx.fillStyle = colOpp;
    ctx.save(); ctx.translate(bx + 8, (by + cy) / 2); ctx.textAlign = 'left'; ctx.fillText(`opp = ${opposite.toFixed(2)}`, 0, 0); ctx.restore();
    ctx.fillStyle = colHyp;
    ctx.save(); ctx.translate((originX + cx) / 2 - 12, (originY + cy) / 2 - 10); ctx.rotate(-angleRad); ctx.textAlign = 'center'; ctx.fillText(`hyp = ${hypotenuse.toFixed(1)}`, 0, 0); ctx.restore();

    ctx.fillStyle = colInk;
    ctx.font = 'bold 12px Inter, system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Right triangle', originX + 110, 350);

    // ============ RIGHT: unit circle (same angle, radius = 1) ============
    const ucX = 470;
    const ucY = 200;
    const ucR = 120;

    // axes
    ctx.strokeStyle = colGrid;
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ucX - ucR - 15, ucY); ctx.lineTo(ucX + ucR + 15, ucY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ucX, ucY + ucR + 15); ctx.lineTo(ucX, ucY - ucR - 15); ctx.stroke();

    // circle
    ctx.strokeStyle = colInk;
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(ucX, ucY, ucR, 0, Math.PI * 2); ctx.stroke();

    // angle arc
    ctx.strokeStyle = colAng;
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(ucX, ucY, 26, -angleRad, 0); ctx.stroke();

    const px = ucX + ucR * cosVal;
    const py = ucY - ucR * sinVal;

    // cos segment (x), drawn along the axis
    ctx.strokeStyle = colAdj;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(ucX, ucY); ctx.lineTo(px, ucY); ctx.stroke();
    // sin segment (y)
    ctx.strokeStyle = colOpp;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(px, ucY); ctx.lineTo(px, py); ctx.stroke();
    // radius (hypotenuse of the unit triangle)
    ctx.strokeStyle = colHyp;
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(ucX, ucY); ctx.lineTo(px, py); ctx.stroke();

    // point
    ctx.fillStyle = colAng;
    ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();

    // labels
    ctx.fillStyle = colAdj;
    ctx.font = 'bold 12px Inter, system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(`cos θ = ${cosVal.toFixed(2)}`, (ucX + px) / 2, ucY + 18);
    ctx.fillStyle = colOpp;
    ctx.save(); ctx.translate(px + 8, (ucY + py) / 2); ctx.textAlign = 'left'; ctx.fillText(`sin θ = ${sinVal.toFixed(2)}`, 0, 0); ctx.restore();

    ctx.fillStyle = colInk;
    ctx.font = 'bold 12px Inter, system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Unit circle (radius = 1)', ucX, ucY + ucR + 32);
    ctx.font = '11px Inter, system-ui';
    ctx.fillText('(x, y) = (cos θ, sin θ)', px + 4, py - 12);

  }, [angle, hypotenuse, angleRad, sinVal, cosVal, opposite, adjacent]);

  return (
    <VisualizerLayout
      title="Trigonometry Visualizer (Trigonometriya)"
      description="Change the angle once and watch the right triangle and the unit circle move together, so you can see that the triangle's ratios are exactly the circle's (cos θ, sin θ) coordinates."
      adSlotId="2012"
      guideLink="/blog/trigonometry"
    >
      {!ready ? (
        <GuidedInputFlow
          intro="Set the angle to draw the right triangle and its matching unit-circle point."
          onFillExample={fillExample}
          onReset={reset}
          steps={[
            { id: 'angle', title: 'Set the angle', helper: 'Between 5° and 85°.', complete: fields.isTouched('angle'), children: angleSlider },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          {/* Canvas */}
          <div className="flex-1 min-w-0">
            <canvas
              ref={canvasRef}
              width={680}
              height={400}
              className="w-full h-auto aspect-[17/10] rounded-xl border-2 border-base-300"
              role="img"
              aria-label={`At θ = ${angle} degrees: the right triangle has adjacent ${adjacent.toFixed(2)}, opposite ${opposite.toFixed(2)}, hypotenuse ${hypotenuse.toFixed(1)}. The matching unit circle point is (cos θ ${cosVal.toFixed(2)}, sin θ ${sinVal.toFixed(2)}).`}
            />
            <p className="text-xs text-base-content/60 mt-2 m-0 text-center">
              Same angle, two views: the triangle is just the unit circle&rsquo;s radius stretched to length {hypotenuse.toFixed(1)}.
            </p>
          </div>

          {/* Controls & Readout */}
          <div className="w-full lg:w-80 flex flex-col gap-6">
            {/* Controls */}
            <div className="bg-base-200 p-6 rounded-xl border border-base-300 flex flex-col gap-5">
              {angleSlider}

              <Slider
                id="trig-hyp"
                motif="length"
                label="Hypotenuse"
                value={hypotenuse}
                min={3}
                max={12}
                step={0.5}
                colorClass="info"
                formatValue={(v) => v.toFixed(1)}
                onChange={(e) => setHypotenuse(Number(e.target.value))}
                aria-valuetext={`hypotenuse length ${hypotenuse.toFixed(1)}`}
              />
              <p className="text-xs text-base-content/50 mt-1 m-0">Stretching the hypotenuse scales the triangle but never changes the ratios.</p>

              {/* Quick presets */}
              <div>
                <span className="block mb-2 font-bold text-xs text-base-content/60 uppercase tracking-wider">Special Angles</span>
                <div className="flex gap-2 flex-wrap">
                  {[30, 45, 60].map(a => (
                    <button key={a} onClick={() => setAngle(a)} className={`btn btn-sm ${angle === a ? 'btn-warning' : 'btn-outline'}`} aria-pressed={angle === a}>
                      {a}°
                    </button>
                  ))}
                  <button onClick={reset} className="btn btn-ghost btn-sm">Reset</button>
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
              <div className="text-center p-2 rounded-lg bg-base-200 border border-base-300">
                <div className="text-[10px] uppercase font-bold text-success/70">Adjacent</div>
                <div className="font-mono font-bold text-success">{adjacent.toFixed(2)}</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-base-200 border border-base-300">
                <div className="text-[10px] uppercase font-bold text-error/70">Opposite</div>
                <div className="font-mono font-bold text-error">{opposite.toFixed(2)}</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-base-200 border border-base-300">
                <div className="text-[10px] uppercase font-bold text-info/70">Hypotenuse</div>
                <div className="font-mono font-bold text-info">{hypotenuse.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default TrigonometryVisualizer;
