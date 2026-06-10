import IntegerNumberLineMdx from '../../content/blog/integer-number-line.mdx';
import { useState, useRef, useEffect } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

const IntegerNumberLineVisualizer = () => {
  const [num1, setNum1] = useState(3);
  const [num2, setNum2] = useState(-5);
  const [operation, setOperation] = useState<'+' | '-'>('+');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const result = operation === '+' ? num1 + num2 : num1 - num2;

  // Animate the number line
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const midY = h / 2;
    const midX = w / 2;
    const range = 20; // -20 to +20
    const step = (w - 80) / (range * 2); // pixels per unit

    const toCanvasX = (n: number) => midX + n * step;

    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.3)';
    ctx.lineWidth = 1;
    for (let i = -range; i <= range; i++) {
      const x = toCanvasX(i);
      ctx.beginPath();
      ctx.moveTo(x, midY - 40);
      ctx.lineTo(x, midY + 40);
      ctx.stroke();
    }

    // Main number line
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(30, midY);
    ctx.lineTo(w - 30, midY);
    ctx.stroke();

    // Arrowheads
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(w - 30, midY);
    ctx.lineTo(w - 40, midY - 6);
    ctx.lineTo(w - 40, midY + 6);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(30, midY);
    ctx.lineTo(40, midY - 6);
    ctx.lineTo(40, midY + 6);
    ctx.fill();

    // Tick marks and numbers
    ctx.font = 'bold 11px Inter, system-ui';
    ctx.textAlign = 'center';
    for (let i = -range; i <= range; i++) {
      const x = toCanvasX(i);
      const isMajor = i % 5 === 0;
      const tickLen = isMajor ? 12 : 6;

      ctx.strokeStyle = isMajor ? '#94a3b8' : '#475569';
      ctx.lineWidth = isMajor ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(x, midY - tickLen);
      ctx.lineTo(x, midY + tickLen);
      ctx.stroke();

      if (isMajor || (i >= -10 && i <= 10)) {
        ctx.fillStyle = i === 0 ? '#f1f5f9' : i < 0 ? '#f87171' : '#34d399';
        ctx.fillText(String(i), x, midY + 28);
      }
    }

    // Zero marker
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.arc(toCanvasX(0), midY, 5, 0, Math.PI * 2);
    ctx.fill();

    // --- Draw the operation visualization ---
    const startX = toCanvasX(0);
    const firstX = toCanvasX(num1);
    const resultX = toCanvasX(result);

    // Clamp drawing to canvas bounds
    const clamp = (x: number) => Math.max(35, Math.min(w - 35, x));

    // Step 1: Arrow from 0 to num1 (blue)
    const drawArrow = (fromX: number, toX: number, y: number, color: string, label: string) => {
      const clampedFrom = clamp(fromX);
      const clampedTo = clamp(toX);

      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(clampedFrom, y);
      ctx.lineTo(clampedTo, y);
      ctx.stroke();

      // Arrowhead
      const dir = clampedTo > clampedFrom ? 1 : -1;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(clampedTo, y);
      ctx.lineTo(clampedTo - dir * 10, y - 6);
      ctx.lineTo(clampedTo - dir * 10, y + 6);
      ctx.fill();

      // Label
      ctx.fillStyle = color;
      ctx.font = 'bold 13px Inter, system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(label, (clampedFrom + clampedTo) / 2, y - 10);
    };

    // Arrow 1: 0 → num1 (starting position)
    drawArrow(startX, firstX, midY - 50, '#3b82f6', `${num1 >= 0 ? '+' : ''}${num1}`);

    // Arrow 2: num1 → result (the operation)
    const effectiveMovement = operation === '+' ? num2 : -num2;
    const arrowColor = effectiveMovement >= 0 ? '#34d399' : '#f87171';
    const arrowLabel = operation === '+' 
      ? `${num2 >= 0 ? '+' : ''}${num2}`
      : `−(${num2 >= 0 ? '' : '−'}${Math.abs(num2)})`;
    drawArrow(firstX, resultX, midY - 80, arrowColor, arrowLabel);

    // Result marker
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(clamp(resultX), midY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 10px Inter, system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('=', clamp(resultX), midY + 4);

    // Result label
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 16px Inter, system-ui';
    ctx.fillText(`= ${result}`, clamp(resultX), midY - 100);

    // Starting position marker
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(clamp(firstX), midY, 6, 0, Math.PI * 2);
    ctx.fill();

    // Legend
    ctx.textAlign = 'left';
    ctx.font = '11px Inter, system-ui';

    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(15, h - 50, 10, 10);
    ctx.fillText('1st Number (Unang Bilang)', 30, h - 41);

    ctx.fillStyle = arrowColor;
    ctx.fillRect(15, h - 35, 10, 10);
    ctx.fillText(`${operation === '+' ? 'Add' : 'Subtract'} (${operation === '+' ? 'Dagdagan' : 'Bawasan'})`, 30, h - 26);

    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(15, h - 20, 10, 10);
    ctx.fillText('Result (Sagot)', 30, h - 11);

  }, [num1, num2, operation, result]);

  return (
    <VisualizerLayout
      title="Integer Number Line (Bilang na Buumbilang)"
      description="Visualize addition and subtraction of integers on an interactive number line. Understand positive and negative numbers."
      adSlotId="2011"
      educationalContent={<IntegerNumberLineMdx />}
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col gap-8">
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            width={800}
            height={250}
            className="w-full rounded-xl border-2 border-base-300"
          />

          {/* Equation display */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-3xl font-mono font-bold text-primary">{num1 >= 0 ? '' : ''}{num1}</span>
            <span className="text-3xl font-mono font-bold text-base-content">{operation === '+' ? '+' : '−'}</span>
            <span className="text-3xl font-mono font-bold text-secondary">({num2 >= 0 ? '' : ''}{num2})</span>
            <span className="text-3xl font-mono font-bold text-base-content">=</span>
            <span className="text-4xl font-mono font-extrabold text-warning">{result}</span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-base-200 p-6 rounded-xl border border-base-300">
            <div>
              <label className="flex justify-between mb-2 font-semibold text-sm">
                <span>1st Number (Unang Bilang)</span>
                <span className="text-primary font-mono">{num1}</span>
              </label>
              <input
                type="range" min="-15" max="15" step="1"
                value={num1}
                onChange={(e) => setNum1(Number(e.target.value))}
                className="range range-primary range-sm"
              />
              <div className="flex justify-between text-xs text-base-content/50 mt-1">
                <span>−15</span><span>0</span><span>+15</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
              <label className="font-semibold text-sm">Operation</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setOperation('+')}
                  className={`btn btn-lg font-mono ${operation === '+' ? 'btn-success' : 'btn-outline'}`}
                >
                  +
                </button>
                <button
                  onClick={() => setOperation('-')}
                  className={`btn btn-lg font-mono ${operation === '-' ? 'btn-error' : 'btn-outline'}`}
                >
                  −
                </button>
              </div>
            </div>

            <div>
              <label className="flex justify-between mb-2 font-semibold text-sm">
                <span>2nd Number (Pangalawang Bilang)</span>
                <span className="text-secondary font-mono">{num2}</span>
              </label>
              <input
                type="range" min="-15" max="15" step="1"
                value={num2}
                onChange={(e) => setNum2(Number(e.target.value))}
                className="range range-secondary range-sm"
              />
              <div className="flex justify-between text-xs text-base-content/50 mt-1">
                <span>−15</span><span>0</span><span>+15</span>
              </div>
            </div>
          </div>

          {/* Insight card */}
          <div className="alert shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <span className="font-bold">Tip: </span>
              {operation === '+' && num2 >= 0 && "Adding a positive number means moving RIGHT on the number line. (Dagdagan = Pakanan)"}
              {operation === '+' && num2 < 0 && "Adding a negative number means moving LEFT on the number line. Think of it as: adding a debt makes you poorer. (Pagdagdag ng utang = Pakaliwa)"}
              {operation === '-' && num2 >= 0 && "Subtracting a positive means moving LEFT. (Pagbawas ng positibo = Pakaliwa)"}
              {operation === '-' && num2 < 0 && "Subtracting a negative is the SAME as adding a positive! Double negative = positive. Move RIGHT! (Pagbawas ng negatibo = Pakanan!)"}
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
};
export default IntegerNumberLineVisualizer;
