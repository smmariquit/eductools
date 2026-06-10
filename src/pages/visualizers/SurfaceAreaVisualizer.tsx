import SurfaceAreaMdx from '../../content/blog/surface-area.mdx';
import { useState } from 'react';
import VisualizerLayout from '../../components/VisualizerLayout';

type Shape = 'rectangular-prism' | 'cube' | 'triangular-prism' | 'cylinder';

interface Face {
  label: string;
  width: number;
  height: number;
  area: number;
  count: number;
  color: string;
}

const SurfaceAreaVisualizer = () => {
  const [shape, setShape] = useState<Shape>('rectangular-prism');
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(4);
  const [radius, setRadius] = useState(3);
  const [showNet, setShowNet] = useState(true);

  const getFaces = (): Face[] => {
    switch (shape) {
      case 'cube':
        return [
          { label: 'Top / Bottom', width: length, height: length, area: length * length, count: 2, color: 'bg-primary/20 border-primary/40' },
          { label: 'Front / Back', width: length, height: length, area: length * length, count: 2, color: 'bg-secondary/20 border-secondary/40' },
          { label: 'Left / Right', width: length, height: length, area: length * length, count: 2, color: 'bg-accent/20 border-accent/40' },
        ];
      case 'rectangular-prism':
        return [
          { label: 'Top / Bottom', width: length, height: width, area: length * width, count: 2, color: 'bg-primary/20 border-primary/40' },
          { label: 'Front / Back', width: length, height: height, area: length * height, count: 2, color: 'bg-secondary/20 border-secondary/40' },
          { label: 'Left / Right', width: width, height: height, area: width * height, count: 2, color: 'bg-accent/20 border-accent/40' },
        ];
      case 'triangular-prism': {
        const triArea = 0.5 * width * height;
        const slant = Math.sqrt((width / 2) ** 2 + height ** 2);
        return [
          { label: 'Triangle faces', width: width, height: height, area: triArea, count: 2, color: 'bg-primary/20 border-primary/40' },
          { label: 'Bottom rect', width: length, height: width, area: length * width, count: 1, color: 'bg-secondary/20 border-secondary/40' },
          { label: 'Side rects', width: length, height: slant, area: length * slant, count: 2, color: 'bg-accent/20 border-accent/40' },
        ];
      }
      case 'cylinder': {
        const circleArea = Math.PI * radius * radius;
        const lateralArea = 2 * Math.PI * radius * height;
        return [
          { label: 'Top / Bottom circles', width: radius * 2, height: radius * 2, area: circleArea, count: 2, color: 'bg-primary/20 border-primary/40' },
          { label: 'Lateral surface', width: 2 * Math.PI * radius, height: height, area: lateralArea, count: 1, color: 'bg-secondary/20 border-secondary/40' },
        ];
      }
    }
  };

  const faces = getFaces();
  const totalSA = faces.reduce((sum, f) => sum + f.area * f.count, 0);

  const shapeLabels: Record<Shape, string> = {
    'rectangular-prism': 'Rectangular Prism (Prisma)',
    'cube': 'Cube (Kubo)',
    'triangular-prism': 'Triangular Prism',
    'cylinder': 'Cylinder (Silindro)',
  };

  return (
    <VisualizerLayout
      title="Surface Area Builder (Sukat ng Ibabaw)"
      description="Unfold 3D shapes into flat nets. Calculate the surface area by adding up the area of each face."
      adSlotId="2017"
      educationalContent={<SurfaceAreaMdx />}
    >
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body p-6 md:p-8 flex flex-col gap-8">

          {/* Shape selector */}
          <div className="flex flex-wrap gap-2 justify-center">
            {(Object.keys(shapeLabels) as Shape[]).map(s => (
              <button key={s} onClick={() => setShape(s)} className={`btn ${shape === s ? 'btn-primary' : 'btn-outline'}`}>
                {shapeLabels[s]}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Net visualization */}
            <div className="flex-1 bg-slate-900 rounded-xl p-6 border-2 border-base-300 min-h-[320px] flex items-center justify-center">
              {showNet ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="text-xs text-base-content/50 uppercase tracking-wider font-bold mb-2">Unfolded Net</div>
                  {shape === 'cube' && (
                    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(4, ${Math.min(60, length * 10)}px)`, gridTemplateRows: `repeat(3, ${Math.min(60, length * 10)}px)` }}>
                      <div /><div className="bg-primary/30 border-2 border-primary/50 rounded flex items-center justify-center text-xs font-mono text-primary">{length}²</div><div /><div />
                      <div className="bg-accent/30 border-2 border-accent/50 rounded flex items-center justify-center text-xs font-mono text-accent">{length}²</div>
                      <div className="bg-secondary/30 border-2 border-secondary/50 rounded flex items-center justify-center text-xs font-mono text-secondary">{length}²</div>
                      <div className="bg-accent/30 border-2 border-accent/50 rounded flex items-center justify-center text-xs font-mono text-accent">{length}²</div>
                      <div className="bg-secondary/30 border-2 border-secondary/50 rounded flex items-center justify-center text-xs font-mono text-secondary">{length}²</div>
                      <div /><div className="bg-primary/30 border-2 border-primary/50 rounded flex items-center justify-center text-xs font-mono text-primary">{length}²</div><div /><div />
                    </div>
                  )}
                  {shape === 'rectangular-prism' && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-primary/30 border-2 border-primary/50 rounded flex items-center justify-center text-xs font-mono text-primary p-3" style={{ width: Math.min(200, length * 20), height: Math.min(60, width * 12) }}>
                        {length}×{width}
                      </div>
                      <div className="flex gap-1">
                        <div className="bg-accent/30 border-2 border-accent/50 rounded flex items-center justify-center text-xs font-mono text-accent p-2" style={{ width: Math.min(60, width * 12), height: Math.min(80, height * 14) }}>
                          {width}×{height}
                        </div>
                        <div className="bg-secondary/30 border-2 border-secondary/50 rounded flex items-center justify-center text-xs font-mono text-secondary p-2" style={{ width: Math.min(200, length * 20), height: Math.min(80, height * 14) }}>
                          {length}×{height}
                        </div>
                        <div className="bg-accent/30 border-2 border-accent/50 rounded flex items-center justify-center text-xs font-mono text-accent p-2" style={{ width: Math.min(60, width * 12), height: Math.min(80, height * 14) }}>
                          {width}×{height}
                        </div>
                      </div>
                      <div className="bg-primary/30 border-2 border-primary/50 rounded flex items-center justify-center text-xs font-mono text-primary p-3" style={{ width: Math.min(200, length * 20), height: Math.min(60, width * 12) }}>
                        {length}×{width}
                      </div>
                    </div>
                  )}
                  {shape === 'cylinder' && (
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-primary/30 border-2 border-primary/50 rounded-full flex items-center justify-center text-xs font-mono text-primary" style={{ width: Math.min(80, radius * 20), height: Math.min(80, radius * 20) }}>
                        πr²
                      </div>
                      <div className="bg-secondary/30 border-2 border-secondary/50 rounded flex items-center justify-center text-xs font-mono text-secondary p-3" style={{ width: Math.min(240, 2 * Math.PI * radius * 12), height: Math.min(80, height * 14) }}>
                        2πr × h
                      </div>
                      <div className="bg-primary/30 border-2 border-primary/50 rounded-full flex items-center justify-center text-xs font-mono text-primary" style={{ width: Math.min(80, radius * 20), height: Math.min(80, radius * 20) }}>
                        πr²
                      </div>
                    </div>
                  )}
                  {shape === 'triangular-prism' && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-primary/30 border-2 border-primary/50 rounded flex items-center justify-center text-xs font-mono text-primary p-2" style={{ width: Math.min(80, width * 14), height: Math.min(60, height * 10), clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
                      </div>
                      <div className="flex gap-1">
                        <div className="bg-accent/30 border-2 border-accent/50 rounded flex items-center justify-center text-[10px] font-mono text-accent p-1" style={{ width: Math.min(80, length * 12), height: Math.min(60, 40) }}>
                          side
                        </div>
                        <div className="bg-secondary/30 border-2 border-secondary/50 rounded flex items-center justify-center text-[10px] font-mono text-secondary p-1" style={{ width: Math.min(80, length * 12), height: Math.min(60, width * 8) }}>
                          base
                        </div>
                        <div className="bg-accent/30 border-2 border-accent/50 rounded flex items-center justify-center text-[10px] font-mono text-accent p-1" style={{ width: Math.min(80, length * 12), height: Math.min(60, 40) }}>
                          side
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-base-content/30 text-lg">Toggle "Show Net" to see the unfolded shape</div>
              )}
            </div>

            {/* Controls */}
            <div className="w-full lg:w-72 flex flex-col gap-5 bg-base-200 p-6 rounded-xl border border-base-300">
              <label className="label cursor-pointer justify-start gap-3">
                <input type="checkbox" checked={showNet} onChange={e => setShowNet(e.target.checked)} className="checkbox checkbox-primary checkbox-sm" />
                <span className="label-text font-bold">Show Net (Unfolded View)</span>
              </label>

              {shape !== 'cylinder' && (
                <div>
                  <label className="flex justify-between mb-2 font-semibold text-sm">
                    <span>Length (<span className="font-serif italic">l</span>)</span>
                    <span className="text-primary font-mono">{length}</span>
                  </label>
                  <input type="range" min="1" max="10" step="1" value={length} onChange={e => setLength(Number(e.target.value))} className="range range-primary range-sm" />
                </div>
              )}

              {(shape === 'rectangular-prism' || shape === 'triangular-prism') && (
                <div>
                  <label className="flex justify-between mb-2 font-semibold text-sm">
                    <span>Width (<span className="font-serif italic">w</span>)</span>
                    <span className="text-secondary font-mono">{width}</span>
                  </label>
                  <input type="range" min="1" max="10" step="1" value={width} onChange={e => setWidth(Number(e.target.value))} className="range range-secondary range-sm" />
                </div>
              )}

              {shape !== 'cube' && (
                <div>
                  <label className="flex justify-between mb-2 font-semibold text-sm">
                    <span>{shape === 'cylinder' ? 'Height' : 'Height'} (<span className="font-serif italic">h</span>)</span>
                    <span className="text-accent font-mono">{height}</span>
                  </label>
                  <input type="range" min="1" max="10" step="1" value={height} onChange={e => setHeight(Number(e.target.value))} className="range range-accent range-sm" />
                </div>
              )}

              {shape === 'cylinder' && (
                <div>
                  <label className="flex justify-between mb-2 font-semibold text-sm">
                    <span>Radius (<span className="font-serif italic">r</span>)</span>
                    <span className="text-primary font-mono">{radius}</span>
                  </label>
                  <input type="range" min="1" max="8" step="0.5" value={radius} onChange={e => setRadius(Number(e.target.value))} className="range range-primary range-sm" />
                </div>
              )}
            </div>
          </div>

          {/* Face breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {faces.map((face, i) => (
              <div key={i} className={`p-4 rounded-xl border-2 ${face.color}`}>
                <div className="text-sm font-bold mb-1">{face.label}</div>
                <div className="text-xs text-base-content/60 mb-2">×{face.count} face{face.count > 1 ? 's' : ''}</div>
                <div className="font-mono text-lg font-bold">{face.area.toFixed(2)} × {face.count} = <span className="text-warning">{(face.area * face.count).toFixed(2)}</span></div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="text-center p-6 rounded-xl bg-warning/10 border-2 border-warning/30">
            <div className="text-xs uppercase tracking-wider font-bold text-warning/70 mb-2">Total Surface Area</div>
            <div className="text-4xl font-extrabold font-mono text-warning">{totalSA.toFixed(2)} sq. units</div>
            <div className="text-sm font-mono text-base-content/60 mt-2">
              = {faces.map(f => `${(f.area * f.count).toFixed(2)}`).join(' + ')}
            </div>
          </div>

        </div>
      </div>
    </VisualizerLayout>
  );
};
export default SurfaceAreaVisualizer;
