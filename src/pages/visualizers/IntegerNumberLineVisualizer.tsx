import { useState, useRef, useEffect } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';
import { Slider } from '../../components/ui/Slider';
import { GuidedInputFlow, useTouchedFields } from '../../components/onboarding';

const DEFAULTS = { num1: 3, num2: -5, operation: '+' as '+' | '-' };

const IntegerNumberLineVisualizer = () => {
  const [num1, setNum1] = useState(DEFAULTS.num1);
  const [num2, setNum2] = useState(DEFAULTS.num2);
  const [operation, setOperation] = useState<'+' | '-'>(DEFAULTS.operation);
  const [predictMode, setPredictMode] = useState(false);
  const [guess, setGuess] = useState('');
  const [revealed, setRevealed] = useState(false);
  const fields = useTouchedFields<'num1' | 'op' | 'num2'>();
  const ready = fields.isTouched('num1') && fields.isTouched('op') && fields.isTouched('num2');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const result = operation === '+' ? num1 + num2 : num1 - num2;
  const showResult = !predictMode || revealed;

  // Axis range adapts so every value (including the result) is always visible.
  const maxAbs = Math.max(10, Math.abs(num1), Math.abs(num2), Math.abs(result));
  const range = Math.ceil(maxAbs / 5) * 5;

  // When the problem changes, hide any revealed answer again.
  const clearPrediction = () => {
    setRevealed(false);
    setGuess('');
  };
  const changeNum1 = (val: number) => { setNum1(val); clearPrediction(); fields.touch('num1'); };
  const changeNum2 = (val: number) => { setNum2(val); clearPrediction(); fields.touch('num2'); };
  const changeOperation = (op: '+' | '-') => { setOperation(op); clearPrediction(); fields.touch('op'); };
  const togglePredict = () => { setPredictMode((p) => !p); clearPrediction(); };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const styles = getComputedStyle(canvas);
    const v = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
    const colBg = v('--color-base-200', '#fffdf8');
    const colLine = v('--color-base-content', '#2b2b3a');
    const colGrid = v('--color-base-300', '#f2e6d6');
    const colPos = v('--color-success', '#2fa46a');
    const colNeg = v('--color-error', '#ff6b8a');
    const colFirst = v('--color-primary', '#2f8fe6');
    const colResult = v('--color-warning', '#f5a800');

    const w = canvas.width;
    const h = canvas.height;
    const midY = h / 2;
    const midX = w / 2;
    const step = (w - 80) / (range * 2);
    const toCanvasX = (n: number) => midX + n * step;
    const labelEvery = range > 12 ? 5 : 1;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = colBg;
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = colGrid;
    ctx.lineWidth = 1;
    for (let i = -range; i <= range; i++) {
      const x = toCanvasX(i);
      ctx.beginPath();
      ctx.moveTo(x, midY - 40);
      ctx.lineTo(x, midY + 40);
      ctx.stroke();
    }

    // Main number line
    ctx.strokeStyle = colLine;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(30, midY);
    ctx.lineTo(w - 30, midY);
    ctx.stroke();

    // Arrowheads
    ctx.fillStyle = colLine;
    ctx.beginPath();
    ctx.moveTo(w - 30, midY); ctx.lineTo(w - 40, midY - 6); ctx.lineTo(w - 40, midY + 6); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(30, midY); ctx.lineTo(40, midY - 6); ctx.lineTo(40, midY + 6); ctx.fill();

    // Tick marks and numbers
    ctx.font = 'bold 11px Inter, system-ui';
    ctx.textAlign = 'center';
    for (let i = -range; i <= range; i++) {
      const x = toCanvasX(i);
      const isMajor = i % 5 === 0;
      const tickLen = isMajor ? 12 : 6;
      ctx.strokeStyle = isMajor ? colLine : colGrid;
      ctx.lineWidth = isMajor ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(x, midY - tickLen);
      ctx.lineTo(x, midY + tickLen);
      ctx.stroke();

      if (i % labelEvery === 0) {
        ctx.fillStyle = i === 0 ? colLine : i < 0 ? colNeg : colPos;
        ctx.fillText(String(i), x, midY + 28);
      }
    }

    // Zero marker
    ctx.fillStyle = colLine;
    ctx.beginPath();
    ctx.arc(toCanvasX(0), midY, 5, 0, Math.PI * 2);
    ctx.fill();

    const startX = toCanvasX(0);
    const firstX = toCanvasX(num1);
    const resultX = toCanvasX(result);

    const drawArrow = (fromX: number, toX: number, y: number, color: string, label: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(fromX, y);
      ctx.lineTo(toX, y);
      ctx.stroke();
      const dir = toX >= fromX ? 1 : -1;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(toX, y);
      ctx.lineTo(toX - dir * 10, y - 6);
      ctx.lineTo(toX - dir * 10, y + 6);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.font = 'bold 13px Inter, system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(label, (fromX + toX) / 2, y - 10);
    };

    // Arrow 1: 0 -> num1
    drawArrow(startX, firstX, midY - 50, colFirst, `${num1 >= 0 ? '+' : ''}${num1}`);

    // First-number marker
    ctx.fillStyle = colFirst;
    ctx.beginPath();
    ctx.arc(firstX, midY, 6, 0, Math.PI * 2);
    ctx.fill();

    const effectiveMovement = operation === '+' ? num2 : -num2;
    const arrowColor = effectiveMovement >= 0 ? colPos : colNeg;
    const arrowLabel = operation === '+'
      ? `${num2 >= 0 ? '+' : ''}${num2}`
      : `−(${num2 >= 0 ? '' : '−'}${Math.abs(num2)})`;

    if (showResult) {
      // Arrow 2: num1 -> result
      drawArrow(firstX, resultX, midY - 80, arrowColor, arrowLabel);

      // Result marker
      ctx.fillStyle = colResult;
      ctx.beginPath();
      ctx.arc(resultX, midY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = colBg;
      ctx.font = 'bold 10px Inter, system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('=', resultX, midY + 4);

      ctx.fillStyle = colResult;
      ctx.font = 'bold 16px Inter, system-ui';
      ctx.fillText(`= ${result}`, resultX, midY - 100);
    } else {
      // Predict mode: show the move direction but not the landing point
      ctx.fillStyle = colLine;
      ctx.font = 'bold 15px Inter, system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`Start at ${num1}, then ${arrowLabel} → land where?`, midX, midY - 90);
    }

    // Legend
    ctx.textAlign = 'left';
    ctx.font = '11px Inter, system-ui';
    ctx.fillStyle = colFirst;
    ctx.fillRect(15, h - 50, 10, 10);
    ctx.fillStyle = colLine;
    ctx.fillText('1st Number (Unang Bilang)', 30, h - 41);
    ctx.fillStyle = arrowColor;
    ctx.fillRect(15, h - 35, 10, 10);
    ctx.fillStyle = colLine;
    ctx.fillText(`${operation === '+' ? 'Add (Dagdagan)' : 'Subtract (Bawasan)'}`, 30, h - 26);
    if (showResult) {
      ctx.fillStyle = colResult;
      ctx.fillRect(15, h - 20, 10, 10);
      ctx.fillStyle = colLine;
      ctx.fillText('Result (Sagot)', 30, h - 11);
    }
  }, [num1, num2, operation, result, range, showResult]);

  const reset = () => {
    setNum1(DEFAULTS.num1);
    setNum2(DEFAULTS.num2);
    setOperation(DEFAULTS.operation);
    setPredictMode(false);
    setGuess('');
    setRevealed(false);
    fields.reset();
  };

  const fillExample = () => {
    setNum1(DEFAULTS.num1);
    setNum2(DEFAULTS.num2);
    setOperation(DEFAULTS.operation);
    fields.touchAll(['num1', 'op', 'num2']);
  };

  const guessNum = guess.trim() === '' ? null : Number(guess);
  const guessCorrect = guessNum !== null && guessNum === result;

  const num1Slider = (
    <div>
      <Slider
        id="int-num1"
        motif="number"
        label="1st Number (Unang Bilang)"
        value={num1}
        min={-15}
        max={15}
        step={1}
        colorClass="primary"
        onChange={(e) => changeNum1(Number(e.target.value))}
        aria-valuetext={`first number ${num1}`}
      />
      <div className="flex justify-between text-xs text-base-content/50 mt-1">
        <span>−15</span><span>0</span><span>+15</span>
      </div>
    </div>
  );

  const operationPicker = (
    <div className="flex flex-col items-center justify-center gap-3">
      <span className="font-semibold text-sm">Operation</span>
      <div className="flex gap-2">
        <button
          onClick={() => changeOperation('+')}
          className={`btn btn-lg font-mono ${operation === '+' ? 'btn-success' : 'btn-outline'}`}
          aria-pressed={operation === '+'}
          aria-label="Add"
        >
          +
        </button>
        <button
          onClick={() => changeOperation('-')}
          className={`btn btn-lg font-mono ${operation === '-' ? 'btn-error' : 'btn-outline'}`}
          aria-pressed={operation === '-'}
          aria-label="Subtract"
        >
          −
        </button>
      </div>
    </div>
  );

  const num2Slider = (
    <div>
      <Slider
        id="int-num2"
        motif="number"
        label="2nd Number (Pangalawang Bilang)"
        value={num2}
        min={-15}
        max={15}
        step={1}
        colorClass="secondary"
        onChange={(e) => changeNum2(Number(e.target.value))}
        aria-valuetext={`second number ${num2}`}
      />
      <div className="flex justify-between text-xs text-base-content/50 mt-1">
        <span>−15</span><span>0</span><span>+15</span>
      </div>
    </div>
  );

  return (
    <VisualizerLayout
      title="Integer Number Line (Bilang na Buumbilang)"
      description="Add and subtract integers as arrows hopping along a number line, then switch on Predict mode to guess each answer before it is revealed."
      adSlotId="2011"
      guideLink="/blog/integer-number-line"
    >
      {!ready ? (
        <GuidedInputFlow
          intro="Set the first number, the operation, and the second number to hop the arrows along the line."
          onFillExample={fillExample}
          onReset={reset}
          steps={[
            { id: 'num1', title: 'Set the first number', helper: 'From -15 to 15.', complete: fields.isTouched('num1'), children: num1Slider },
            { id: 'op', title: 'Pick the operation', helper: 'Add or subtract.', complete: fields.isTouched('op'), children: operationPicker },
            { id: 'num2', title: 'Set the second number', helper: 'From -15 to 15.', complete: fields.isTouched('num2'), children: num2Slider },
          ]}
        />
      ) : (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col gap-8">
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            width={800}
            height={250}
            className="w-full h-auto aspect-[16/5] rounded-xl border-2 border-base-300"
            role="img"
            aria-label={
              showResult
                ? `${num1} ${operation} (${num2}) equals ${result} on the number line`
                : `Predict: start at ${num1}, then ${operation}(${num2}). Number line shown with the answer hidden.`
            }
          />

          {/* Equation display */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-3xl font-mono font-bold text-primary">{num1}</span>
            <span className="text-3xl font-mono font-bold text-base-content">{operation === '+' ? '+' : '−'}</span>
            <span className="text-3xl font-mono font-bold text-secondary">({num2})</span>
            <span className="text-3xl font-mono font-bold text-base-content">=</span>
            {showResult ? (
              <span className="text-4xl font-mono font-extrabold text-warning">{result}</span>
            ) : (
              <span className="text-4xl font-mono font-extrabold text-base-content/30">?</span>
            )}
          </div>

          {/* Predict-the-step panel */}
          <div className="bg-base-200 p-5 rounded-xl border border-base-300 flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="font-bold text-sm">Predict the next step</span>
              <button
                onClick={togglePredict}
                className={`btn btn-sm ${predictMode ? 'btn-accent' : 'btn-outline'}`}
                aria-pressed={predictMode}
              >
                {predictMode ? 'Predict mode: ON' : 'Predict mode: OFF'}
              </button>
            </div>
            {predictMode && (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-base-content/70 m-0">
                  Trace the arrows in your head. Where does the second arrow land? Type your answer, then check it.
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <label htmlFor="int-guess" className="text-sm font-semibold">Your prediction:</label>
                  <input
                    id="int-guess"
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    className="input input-bordered input-sm w-28 font-mono"
                    placeholder="?"
                    disabled={revealed}
                  />
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setRevealed(true)}
                    disabled={guessNum === null || revealed}
                  >
                    Check
                  </button>
                  {revealed && (
                    <span className={`badge badge-lg ${guessCorrect ? 'badge-success' : 'badge-error'}`}>
                      {guessCorrect ? `Tama! It lands on ${result}.` : `Not yet — it lands on ${result}.`}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-base-200 p-6 rounded-xl border border-base-300">
            {num1Slider}
            {operationPicker}
            {num2Slider}
          </div>

          {/* Insight card */}
          <div className="alert shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <span className="font-bold">Tip: </span>
              {operation === '+' && num2 >= 0 && 'Adding a positive number means moving RIGHT on the number line. (Dagdagan = Pakanan)'}
              {operation === '+' && num2 < 0 && 'Adding a negative number means moving LEFT on the number line. Think of it as: adding a debt makes you poorer. (Pagdagdag ng utang = Pakaliwa)'}
              {operation === '-' && num2 >= 0 && 'Subtracting a positive means moving LEFT. (Pagbawas ng positibo = Pakaliwa)'}
              {operation === '-' && num2 < 0 && 'Subtracting a negative is the SAME as adding a positive! Double negative = positive. Move RIGHT! (Pagbawas ng negatibo = Pakanan!)'}
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={reset} className="btn btn-ghost btn-sm">Reset</button>
          </div>
        </div>
      </div>
      )}
    </VisualizerLayout>
  );
};
export default IntegerNumberLineVisualizer;
