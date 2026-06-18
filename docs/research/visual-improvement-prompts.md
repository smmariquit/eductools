# Visual-Improvement Deep Research Prompts — EduVisualsPH

This document contains one tailored **Google Deep Research** prompt per visualizer in the EduVisualsPH library (Philippine K–12 STEM, MATATAG-aligned). Each prompt is meant to be pasted into Google Deep Research (or a comparable agentic research tool) to gather actionable, sourced guidance for improving that tool's **diagram/visual** for accuracy, clarity, and pedagogy.

Each prompt asks the research agent for:
- **(a)** the accepted/canonical way the concept is diagrammed in reputable sources (textbooks, PhET, OpenStax, NIST/BIPM, IUPAC, USGS, NASA, PAGASA/DOST, IUCN where relevant);
- **(b)** common student misconceptions the visual should avoid reinforcing;
- **(c)** UX/visual-design best practices for that diagram type (scale, spacing/overlap, color/contrast, labeling, animation, accessibility/reduced-motion);
- **(d)** MATATAG grade-band-appropriate representation;
- **(e)** concrete, specific layout/geometry fixes for the issues observed in the current build.

The observations below come from reading each component's source (read-only). Sections are grouped by subject. A priority triage table follows.

## Priority triage — 2D-diagram issues

Priority reflects how badly the **current 2D diagram** misrepresents, clutters, or under-serves the concept (High = fix first).

| Tool | Subject / Grade | 2D-diagram issue priority |
| --- | --- | --- |
| Projectile Motion | Physics · G9 | **High** |
| Electric Circuits | Physics · G8 | **High** |
| Mitosis Cell Division | Biology · G11–12 | **High** |
| Water Cycle | Earth Science · G4 | **High** |
| Plate Tectonics | Earth Science · G10 | **High** |
| Human Body Systems | Biology · G5 | **High** |
| GCF & LCM (Venn) | Math · G4–5 | Med |
| Trigonometry | Math · G9 | Med |
| Surface Area Builder | Math · G6 | Med |
| Sequences & Patterns | Math · G8 | Med |
| Optics (mirrors) | Physics · G10 | Med |
| Electromagnetic Spectrum | Physics · G10 | Med |
| Chemical Bonding | Chemistry · G9 | Med |
| Solution Concentration | Chemistry · G7 | Med |
| Rock Cycle | Earth Science · G11 | Med |
| Life Cycles | Biology · G4 | Med |
| Photosynthesis | Biology · G11–12 | Med |
| Seasons & Earth Tilt | Earth Science · G6 | Med |
| Typhoon Tracker | Earth Science/DRRR · G11–12 | Med |
| Virtual Microscope | Biology · G7 | Med |
| Fractions | Math · G1–3 | Low |
| Integer Number Line | Math · G7 | Low |
| Sets & Venn Diagrams | Math · G7 | Low |
| Pythagorean Theorem | Math · G8 | Low |
| Permutations & Combinations | Math · G10 | Low |
| Stoichiometry | Chemistry · G12 | Low |
| Reaction Rate | Chemistry · G10 | Low |
| Gas Laws | Physics/Chem · G10 | Low |
| States of Matter | Science · G3 | Low |
| Forces & Motion | Physics · G8 | Low–Med |
| Food Web | Biology · G5 | Low |
| Punnett Square | Biology · G8 | Low |
| Wave Physics | Physics · G10 | Low |
| Density & Buoyancy | Physics · G7 | Low |
| Solar System | Earth Science · G6 | Low |
| Digital Logic (Bits→Pixels) | CS · G8–10 | Low |

# Mathematics

## Fractions Visualizer (G1–3)

**Current visual:** Two SVG "buko pie" circles sliced into `den` equal sectors with `num` sectors filled, plus a numeric comparison row using cross-multiplication.

**Observed issues:**
- Sector geometry is sound, but the warning-colored "crust ring" (`r=90`, strokeWidth 6) sits at the same radius as the slice divider line endpoints, so dividers visually merge into the crust at the rim.
- Filled vs. empty sectors are distinguished mostly by opacity (0.85 vs 0.25) of the *same* hue — weak for color-vision-deficient learners and low-contrast on small screens.
- Equivalent-fraction badges always show ×1…×4 even when the fraction is already at a large denominator, which can crowd on narrow screens.
- No common-denominator visual when comparing A vs B (only cross-multiplication text), so the "which is bigger" claim isn't shown geometrically.

```text
I am improving the diagram for a "Fractions Visualizer" in a Philippine K-12 (MATATAG) math web app for Grades 1-3. It draws two pie/circle area models ("buko pie") each cut into d equal sectors with n sectors shaded, then compares the two fractions. Current problems: filled vs empty sectors are shown only by opacity of the same color (poor contrast and bad for color-blind kids); a decorative "crust ring" at the rim visually merges with the radial slice dividers; and the A-vs-B comparison is only numeric (cross-multiplication) with no shared visual.

Research and report, with citations:
(a) The canonical, research-backed ways fractions are diagrammed for early primary in reputable sources (PhET Fractions, OpenStax/Illustrative Mathematics, Van de Walle, DepEd/MATATAG Grade 1-3 numeracy materials) — area/circle models vs bar/tape vs number-line models, and when each is recommended.
(b) Common misconceptions a circle/pie fraction model can reinforce (e.g., that fractions are always "parts of a pizza," difficulty comparing unlike denominators, equal-area but unequal-looking sectors) and how the visual should avoid them.
(c) Visual-design best practices for fraction area models: ensuring sectors read as equal, distinguishing filled parts with both color AND pattern/fill (WCAG contrast, color-blind-safe palettes), label placement, and how to compare two fractions visually (overlaying a common-denominator grid, or aligned tape bars).
(d) Grade 1-3 appropriate representation under MATATAG: vocabulary, complexity limits (denominator ceilings), and Filipino-context framing.
(e) Concrete SVG layout fixes: how to make shaded sectors unambiguous without relying on opacity, how to separate the crust ring from slice dividers, and a recommended second representation (tape/number line) to make the magnitude comparison visual rather than purely numeric.
Return prioritized, specific recommendations a developer can implement.
```

## Integer Number Line (G7)

**Current visual:** An HTML canvas number line with a derived range, grid ticks, two stacked "hop" arrows (0→num1 at y−50, num1→result at y−80) and a result marker.

**Observed issues:**
- The two hop arrows live at fixed heights (`midY-50`, `midY-80`) only 30px apart; for large magnitudes their midpoint labels (`+n`) can overlap horizontally and crowd the `= result` label at `midY-100`.
- Tick labels switch to "every 5" when range > 12, but minor ticks remain drawn every unit, so at wide ranges the line gets visually dense with unlabeled ticks.
- The second arrow can be very short (when `num2` is small) making its arrowhead and label collide.
- Canvas text scales with the element but is rasterized (blurry on hi-DPI since no `devicePixelRatio` scaling is applied).

```text
I am improving an "Integer Number Line" canvas diagram in a Philippine MATATAG Grade 7 math app. It shows integer addition/subtraction as directional "hops": one arrow from 0 to the first number, a second arrow to the result, with a hidden-answer "predict" mode. Current problems: the two hop arrows are stacked at nearly fixed heights and their labels overlap when numbers are large or one hop is short; minor ticks stay dense at wide ranges; and canvas text is not DPI-scaled (blurry).

Research and report, with citations:
(a) The canonical way integer addition/subtraction is diagrammed on a number line in reputable sources (PhET, OpenStax, Illustrative Mathematics, DepEd Grade 7 modules) — hop/jump arrows, "facing" direction for subtraction, two-color (positive/negative) conventions.
(b) Misconceptions to avoid: "subtracting a negative" confusion, treating the minus sign as both operation and sign, direction-vs-magnitude confusion, and how arrow diagrams can mislead.
(c) Visual-design best practices for number-line hop diagrams: vertical stacking/offset of arrows to prevent label collision, arrowhead sizing for short hops, tick density and labeling at different scales, color-blind-safe positive/negative coding, reduced-motion behavior, and crisp canvas text (devicePixelRatio).
(d) Grade 7 MATATAG-appropriate conventions and Filipino framing (e.g., debt/temperature contexts).
(e) Concrete fixes: an arrow layout algorithm that adapts vertical offset to hop count/length so labels never overlap, a tick-labeling rule that stays readable from range 10 to 30+, and DPI-correct rendering.
Return specific, implementable recommendations.
```

## GCF & LCM Explorer (G4–5)

**Current visual:** Two SVG prime-factor trees, a CSS "Venn diagram" of shared/unique prime factors built from two overlapping `rounded-full` divs with negative margins, plus GCF/LCM results.

**Observed issues:**
- The Venn is a CSS hack: two `w-48 h-48` circles pulled together with `-mr-12`/`-ml-12` and an absolutely-positioned center stack for shared factors. It is **not** a true two-set intersection — the "overlap" region is just a floating badge cluster with `max-w-20`, and unique-factor badges use `pr-10`/`pl-10` padding to dodge the center rather than being properly bounded inside each lens.
- With several prime factors, badges wrap and can overflow the circle or collide with the center cluster; nothing clips to the circle geometry.
- Factor-tree node radius is fixed (`R=17`) with `GAP=48`; deep trees (e.g. 48 = 2×2×2×2×3) can get tall and the right-leaning recursion produces visually lopsided trees.

```text
I am improving the diagrams for a "GCF & LCM Explorer" in a Philippine MATATAG Grade 4-5 math app. It shows two prime-factor trees and a Venn-style diagram of shared vs unique prime factors, then computes GCF, LCM, and verifies GCF×LCM = A×B. The current "Venn" is faked with two overlapping CSS circles and a floating cluster of factor badges in the middle — factors are not actually contained within the correct lens regions, and badges overflow or collide when there are several primes. The factor trees are also lopsided (right-recursive) and can get tall.

Research and report, with citations:
(a) The canonical way GCF/LCM via prime factorization is diagrammed (factor trees, and the Venn-diagram method where shared primes go in the intersection) in reputable sources (OpenStax, Illustrative Mathematics, DepEd Grade 4-5 materials, NRICH).
(b) Misconceptions to avoid: confusing GCF with LCM, thinking the intersection gives the LCM, miscounting repeated prime factors (multiplicity), and Venn-region misreadings.
(c) Visual-design best practices for two-set Venn diagrams that hold *labeled tokens*: how to lay out and clip items inside left-only / intersection / right-only regions so nothing overflows, balanced/centered factor-tree layouts, color-blind-safe set coloring, and labeling.
(d) Grade 4-5 appropriate representation and Filipino framing.
(e) Concrete geometry fixes: an SVG-based true Venn with three bounded regions (left lens, intersection lens, right lens) that wraps/sizes prime-factor tokens to fit, plus a balanced factor-tree layout algorithm (centered parents, even subtree spacing). Recommend exact region polygons/paths or a layout strategy.
Return implementable specifics.
```

## Surface Area Builder (G6)

**Current visual:** An SVG net of a rectangular prism / cube / triangular prism / cylinder that folds up via per-face scale transforms, with each face linked to a term in the surface-area formula.

**Observed issues:**
- The cylinder's lateral rectangle width is `2πr` but **capped** at 150px (`Math.min(sz(lat),150)`) while the circular caps use the true diameter scale, so the unrolled lateral face is off-scale relative to the caps — the "2πr" length isn't visually trustworthy.
- "Fold" is faked by 1-D `scale()` foreshortening about a hinge; faces shrink to a line rather than rotating in perspective, so the intermediate states don't read as a real 3-D fold and the triangular-prism slant faces don't visibly meet.
- Face labels (`fontSize=10`) can overlap on small faces; labels fade out by `fold*1.6` but small dimensions still crowd at flat state.
- `sz()` clamps each dimension to 16–120px independently, so a 10×1 prism shows nearly-square faces — the net's proportions don't match the entered dimensions.

```text
I am improving the diagram for a "Surface Area Builder" in a Philippine MATATAG Grade 6 math app. It draws the 2D net of a rectangular prism, cube, triangular prism, or cylinder and "folds" it into 3D, mapping each face to a term in the surface-area formula. Current problems: the cylinder's unrolled lateral face (length 2πr) is capped to a fixed pixel width so it is off-scale vs the circular caps; per-axis pixel clamping distorts face proportions vs the real dimensions; the "fold" is a 1D scale-to-a-line trick that doesn't read as a true 3D fold; and small-face labels overlap.

Research and report, with citations:
(a) The canonical way solids' nets and surface area are diagrammed (correct nets for prisms/cube/cylinder, the 2πr = circumference relationship for the cylinder's lateral face) in reputable sources (OpenStax, Illustrative Mathematics, NCTM Illuminations, DepEd Grade 6 materials).
(b) Misconceptions to avoid: confusing surface area with volume, not seeing that the lateral rectangle's width equals the base circumference, miscounting faces, and proportion distortions that mislead about which faces are congruent.
(c) Visual-design best practices for net/fold animations: keeping all faces to a single consistent scale, true hinged-fold animation (rotation/perspective) vs scale tricks, label placement that avoids overlap on small faces, color-coding faces to formula terms accessibly, and reduced-motion fallbacks.
(d) Grade 6 MATATAG-appropriate scope (which solids, formula presentation).
(e) Concrete fixes: a single uniform units-to-pixels scale across all faces (including an honest 2πr lateral face, even if it must scroll or wrap), proportion-faithful net layout, and a recommended fold animation technique (e.g., CSS/SVG 3D transforms or a precomputed hinge rotation) that looks like real folding.
Return specific, implementable guidance.
```

## Sets & Venn Diagrams (G7)

**Current visual:** A proper SVG two-circle Venn (fixed centers `AX=158`, `BX=242`, `R=96`) using masks/clip-paths to shade union/intersection/difference regions, with members rendered as stacked text in each region.

**Observed issues:**
- Region members are stacked vertically with `lineH=20` centered on `CY`; a set with many elements (e.g., 8+) overflows the top/bottom of the circle since nothing scales line height or font to fit.
- Intersection members are placed at the exact midpoint `(AX+BX)/2`; with the circles only 84px apart and `R=96`, the intersection lens is narrow, so multi-digit or numerous shared elements crowd against the only-A / only-B columns.
- Only-A / only-B members sit at fixed `AX-42` / `BX+42`; long lists shift toward the lens and can visually leak into the intersection.

```text
I am improving an SVG two-set Venn diagram in a Philippine MATATAG Grade 7 math app. Users type two number sets and pick union/intersection/difference; the matching region shades and the members are printed as stacked text inside each region (only-A, intersection, only-B). Current problems: members are stacked at a fixed line height centered on the circle, so larger sets overflow the circle vertically; the intersection lens is narrow so shared elements crowd the boundary; and only-A/only-B lists can leak toward the intersection.

Research and report, with citations:
(a) Canonical Venn-diagram conventions for set operations in reputable sources (OpenStax, NRICH, DepEd Grade 7 materials): circle sizing/overlap, region labeling, and how members are typically placed.
(b) Misconceptions to avoid: miscounting the intersection (inclusion-exclusion), placing shared elements in only one circle, and confusing "A − B" direction.
(c) Visual-design best practices for token placement inside Venn regions: auto-fitting/wrapping members within each lens, adaptive font/spacing as set size grows, ensuring the intersection lens is wide enough, and color-blind-safe region shading with sufficient contrast.
(d) Grade 7 appropriate scope and notation.
(e) Concrete geometry fixes: optimal circle separation/radius so the intersection lens comfortably holds tokens, a layout that bounds and wraps members strictly within each region (left-only, lens, right-only), and graceful handling/scaling for large sets.
Return implementable specifics.
```

## Sequences & Patterns (G8)

**Current visual:** A CSS bar chart with a real zero baseline (positive bars up, negative down), a differences/ratios row, and a formula builder.

**Observed issues:**
- Bars are scaled to `maxPos`/`maxNeg` of the *visible* terms. For geometric sequences (e.g., r=2, 8 terms → 384) the last term dwarfs the rest, so all early bars collapse to the `MIN_BAR=4px` floor and the chart conveys little until the final spike — a classic off-scale failure for exponential growth.
- Value labels sit just outside each bar end; for tall bars near the top they clamp to `top:0` and can overlap the term above; many terms (n up to 15) make labels tiny (`text-[10px]`) and crowded.
- No log-scale option, so exponential sequences are essentially unreadable as a bar chart.

```text
I am improving a bar-chart diagram for a "Sequences & Patterns" tool in a Philippine MATATAG Grade 8 math app. It plots the first n terms of an arithmetic or geometric sequence as bars above/below a zero line. Current problem: for geometric sequences the final term dwarfs the others so early bars collapse to a minimum height and the chart is unreadable (off-scale); value labels also overlap when bars are tall or numerous.

Research and report, with citations:
(a) How arithmetic vs geometric sequences are canonically visualized in reputable sources (OpenStax, Illustrative Mathematics, Desmos, DepEd Grade 8 materials) — linear bar/point plots for arithmetic, and the standard handling of exponential growth (log scale, point/line plots, or dual views).
(b) Misconceptions to avoid: conflating arithmetic and geometric growth, misreading a linear-scale chart of exponential data, and not seeing the common difference vs common ratio.
(c) Visual-design best practices for charts spanning large value ranges: when/how to offer a log scale, point-and-line vs bars, label de-cluttering, color-coding the highlighted nth term, and accessible/reduced-motion transitions.
(d) Grade 8 appropriate representation (introducing log scale carefully or providing a toggle with explanation).
(e) Concrete fixes: a recommended scaling strategy (e.g., auto-switch or toggle to log scale for geometric sequences, or a point/line plot), a non-overlapping label strategy, and how to keep the arithmetic case as a clean linear chart.
Return implementable specifics.
```

## Pythagorean Theorem (G8)

**Current visual:** An SVG dissection proof: a containing (a+b) square holds four congruent right triangles that slide between a two-squares (a²+b²) layout and one tilted square (c²) layout, with live numbers.

**Observed issues:**
- Geometry is mathematically sound and well-built; this is mostly a polish case.
- Triangle fill is a single `text-warning` at 0.35 opacity over colored leg squares; during the slide the overlap of translucent triangles can muddy the colors and the moving pieces can momentarily overlap the fading square labels.
- Side-length labels for a, b, c are not drawn on the triangle edges (only areas), so the link between the slider's "a/b" and the geometry relies on color memory.

```text
I am polishing an SVG "Pythagorean theorem" dissection-proof diagram in a Philippine MATATAG Grade 8 math app. A big (a+b) square holds four congruent right triangles that slide between the two-leg-squares (a²+b²) arrangement and the single hypotenuse-square (c²) arrangement. The math is correct; issues are visual: translucent moving triangles muddy the colors over the leg squares, moving pieces briefly overlap fading area labels, and the triangle legs aren't labeled a/b/c.

Research and report, with citations:
(a) Canonical dissection/rearrangement proofs of the Pythagorean theorem and how they're diagrammed (OpenStax, Illustrative Mathematics, NRICH, classic Bhaskara/Zhoubi proofs) and labeling conventions.
(b) Misconceptions to avoid: thinking a²+b²=c² applies to non-right triangles, confusing area equality with side equality, and losing track that total area is conserved during rearrangement.
(c) Visual-design best practices for animated dissection proofs: opacity/color layering so moving pieces stay distinct over colored regions, clear edge labels (a, b, c) that persist, motion pacing, and reduced-motion (snap-between-states) fallbacks.
(d) Grade 8 appropriate framing and Filipino context examples.
(e) Concrete fixes: a color/opacity scheme that keeps triangles legible over the leg squares throughout the slide, persistent edge labels tied to the sliders, and label-collision avoidance during the animation.
Return implementable specifics.
```

## Trigonometry Visualizer (G9)

**Current visual:** A dark canvas with a right triangle drawn to scale (`scale = maxTriSize/12`), a right-angle marker, an angle arc, side labels, and a small unit-circle reference in the top-right corner.

**Observed issues:**
- Side labels are placed with fixed offsets: "Opposite" is drawn at `bx+20` (right of the vertical leg) and can run off the right edge of the canvas at large adjacent lengths; the rotated "Hypotenuse" label can overlap the triangle interior at small angles.
- The unit-circle reference is anchored at `(w-100, 90)` r=60 — at large hypotenuse + small angle, the triangle's apex region and the unit circle compete for the top-right space (potential overlap).
- Triangle is pinned to a fixed origin; as angle/hypotenuse change, the figure shifts asymmetrically and can crowd one edge while leaving dead space on the other (no recentering to fit).
- Canvas text is not DPI-scaled (blurry on retina); dark `#0f172a` background is hard-coded rather than themed.

```text
I am improving a right-triangle + unit-circle canvas diagram for a "Trigonometry Visualizer" in a Philippine MATATAG Grade 9 math app. It draws a right triangle with adjacent/opposite/hypotenuse labeled and SOH-CAH-TOA readouts, plus a small unit circle in the corner. Current problems: side labels use fixed offsets and can run off-canvas or overlap the triangle; the corner unit circle can collide with the triangle at large sizes/small angles; the triangle isn't recentered to fit so it crowds one edge; and canvas text isn't DPI-scaled.

Research and report, with citations:
(a) The canonical way right-triangle trig ratios and the unit circle are diagrammed in reputable sources (OpenStax Trigonometry/Precalculus, PhET, Khan Academy, DepEd Grade 9 materials) — including how SOH-CAH-TOA and the unit circle are linked.
(b) Misconceptions to avoid: opposite/adjacent depend on the reference angle; sin/cos as ratios independent of triangle size; confusing degrees/radians; and that tan→∞ near 90°.
(c) Visual-design best practices: label placement that never overlaps edges or runs off-canvas (leader lines, edge-aware anchoring), auto-fit/recentering of the figure as parameters change, separating or linking the unit circle without overlap, color-coding sides to ratios accessibly, and crisp DPI-correct canvas text.
(d) Grade 9 appropriate representation (special angles 30/45/60, ratio emphasis).
(e) Concrete fixes: an auto-fit transform that keeps the triangle centered and fully on-canvas across the angle/hypotenuse ranges, edge-aware label anchoring (flip side, use leader lines), guaranteed non-overlap of the unit-circle inset, and devicePixelRatio scaling.
Return implementable specifics.
```

## Permutations & Combinations (G10)

**Current visual:** Colored lettered circles for n items, a scrollable sample of up to 20 arrangements/groups rendered as rows of circles, and KaTeX formula breakdowns.

**Observed issues:**
- Visualization is mostly enumerative lists, not a structural diagram; there is no tree/slot diagram showing *why* nPr divides out, or why combinations remove ordering (the conceptual core).
- The sample caps at 20 with "…and N more"; for large results this gives little insight into the counting structure.
- Colored circles rely on hue + letter; fine, but the permutation-vs-combination *difference* is shown only by whether duplicates-by-order appear, which is subtle in a flat list.

```text
I am improving the visual for a "Permutations & Combinations" tool in a Philippine MATATAG Grade 10 math app. It shows n colored lettered tokens, lists up to 20 sample arrangements/groups, and renders the nPr / nCr formulas. The current visual is mainly an enumerated list; it doesn't structurally show WHY order matters (permutations) vs not (combinations), and large counts just say "…and N more."

Research and report, with citations:
(a) The canonical ways permutations and combinations are diagrammed in reputable sources (OpenStax, Illustrative Mathematics, NRICH, DepEd Grade 10 materials) — slot/box diagrams (n × (n−1) × …), decision trees, and the "divide by r! to remove ordering" visual.
(b) Misconceptions to avoid: using permutations when order doesn't matter (and vice versa), double-counting, and the meaning of the r! divisor.
(c) Visual-design best practices for combinatorics diagrams: showing the multiplication of choices (filling slots), a tree that prunes for combinations, accessible color/labeling, and handling large counts (show structure, not exhaustive lists).
(d) Grade 10 appropriate representation and Filipino context (e.g., committees vs rankings).
(e) Concrete additions/fixes: a slot/box diagram for nPr and a tree or "remove duplicates" overlay that visually justifies dividing by r! for nCr, plus a strategy for conveying large results without listing them.
Return implementable specifics.
```

# Physics

## Forces and Motion — Jeepney Dynamics (G8)

**Current visual:** A DOM "road" with a jeepney div that translates along a looping track; a single text "F →" label appears above it when force > 0; a numeric panel reports friction, net force, acceleration, velocity.

**Observed issues:**
- No real **free-body diagram**: the only force shown is a text "F →" with no scaled vector; friction, weight, and normal forces are not drawn at all, so the F=ma story is numeric, not visual.
- The force indicator is not proportional (just text), so changing the slider doesn't change any arrow length.
- The jeepney loops by `(x/40)%1`, so position resets every 40 m with no odometer/scale markers — motion reads as "treadmill" rather than travel.

```text
I am improving the diagram for a "Forces and Motion" (Newton's second law) tool in a Philippine MATATAG Grade 8 physics app, themed around a jeepney. Currently it just slides a jeepney graphic along a looping road and shows a text "F →" plus numeric net force/acceleration. There is no proper free-body diagram and no scaled force vectors (friction, applied force, weight, normal).

Research and report, with citations:
(a) The canonical way Newton's second law and friction are diagrammed in reputable sources (PhET "Forces and Motion: Basics", OpenStax University/College Physics, DepEd Grade 8 materials) — free-body diagrams with proportional arrows, net-force arrows, and how applied vs friction forces are shown.
(b) Misconceptions to avoid: motion requires a continuous net force (vs Newton's first law), confusing velocity with acceleration, friction acting even when balanced, and that heavier = automatically slower.
(c) Visual-design best practices for force vectors: arrow length proportional to magnitude with a visible scale/legend, consistent color per force type (accessible), placing arrows at the body's center, a net-force resultant arrow, and reduced-motion options.
(d) Grade 8 appropriate representation and Filipino (jeepney) framing.
(e) Concrete additions/fixes: a proper free-body diagram overlay on the jeepney with proportional, color-coded arrows for applied force, friction, weight, and normal force, plus a net-force arrow; distance markers/odometer so motion reads as travel not a treadmill.
Return implementable specifics.
```

## Electric Circuits Simulator (G8)

**Current visual:** A CSS box (`aspect-video` bordered div) with a battery div on the left edge, an ON/OFF button at the bottom, and two bulb circles positioned absolutely on the top edge (series) or stacked on the right (parallel). Glow intensity tracks computed power.

**Observed issues — HIGH:**
- This is **not a circuit schematic**. There are no wires forming a closed loop; the battery, switch, and bulbs are decorations pinned to the edges of a rectangle. Current has nowhere to "flow."
- Series vs parallel **topology is not faithfully drawn**: "series" puts two bulbs side-by-side on the top edge with no series wiring; "parallel" stacks them on the right with two short `border-b` lines that don't form real parallel branches back to the battery.
- No conventional component symbols (cell, lamp, switch), no current-direction indicator, so the physics (same current in series, full voltage across each parallel branch) isn't visible — it's only in the text readout.
- The brightness glow is the only working visual signal of the physics.

```text
I am rebuilding the diagram for an "Electric Circuits" tool (series vs parallel) in a Philippine MATATAG Grade 8 physics app. The current "circuit" is just a CSS rectangle with a battery, a switch button, and two glowing bulb-circles stuck to the edges — there are NO wires forming a closed loop, and the series-vs-parallel topology is not actually drawn (bulbs are merely repositioned). It only conveys physics through a brightness glow and a numeric Ohm's-law readout.

Research and report, with citations:
(a) The canonical way series and parallel circuits are diagrammed in reputable sources (PhET "Circuit Construction Kit: DC", OpenStax, IEC 60617 / ANSI circuit symbols, DepEd Grade 8 materials) — proper schematic symbols for cell/battery, lamp, switch, and closed conductive loops, plus how series vs parallel wiring differs visually.
(b) Misconceptions to avoid: current "used up" by the first bulb, current flowing out both battery terminals and "meeting," that parallel bulbs are dimmer, and confusing voltage with current.
(c) Visual-design best practices for circuit schematics: standard symbols, clear closed loops, animated current/electron-flow indicators (with reduced-motion fallback), node/junction dots, color-coding, and labeling current/voltage at each element accessibly.
(d) Grade 8 MATATAG-appropriate level — whether to use formal IEC symbols or friendly pictorial-but-correct components, and Filipino framing.
(e) Concrete redesign: a true SVG schematic with a closed loop (battery → switch → bulbs → back), correct series wiring (single loop) and parallel wiring (two branches across the battery), animated current flow whose speed/density reflects current, and per-element voltage/current labels. Provide a recommended layout/topology for both modes.
Return implementable specifics.
```

## Projectile Motion Visualizer — Tumbang Preso (G9)

**Current visual:** A dark canvas with a fixed scale (`pixelsPerMeter=15`), a ground line, a target "lata" at 20 m, an angle arc + velocity vector at launch, and a spinning slipper ("pamato") following the trajectory; a HUD shows t, x, y, vᵧ.

**Observed issues — HIGH (off-scale):**
- **Fixed scale doesn't fit the motion.** `pixelsPerMeter=15` with a 600px-wide canvas only covers ~37 m horizontally (`startX=50`), yet `v₀x·t` for v₀=40 m/s easily exceeds that, so the projectile flies off the right edge. Vertically, max height for high angle/velocity (v₀=40, 90° → ~81 m → ~1224 px) vastly exceeds the 400px canvas — the arc disappears off the top.
- No auto-scaling/auto-fit to the actual range and apex, so most parameter combinations render an off-canvas or clipped trajectory.
- The slipper **spins** (`ctx.rotate(t*10)`) — a decorative effect that misrepresents projectile rotation and can distract from the parabola.
- The trajectory path itself isn't drawn (only the moving object), so the parabola shape and symmetry aren't visible as a trace.
- Canvas not DPI-scaled.

```text
I am fixing the canvas diagram for a "Projectile Motion" tool (themed as the Filipino game tumbang preso) in a Philippine MATATAG Grade 9 physics app. A pamato (slipper) is launched at an angle/velocity toward a can 20 m away. The BIG problem is scale: the pixels-per-meter is a fixed constant, so for many angle/velocity combinations the projectile flies off the right edge or far above the top of the canvas — the trajectory is frequently off-screen. The object also spins decoratively, and the parabolic path is not traced.

Research and report, with citations:
(a) The canonical way projectile motion is diagrammed in reputable sources (PhET "Projectile Motion", OpenStax University Physics, DepEd Grade 9 materials) — traced parabola, range/max-height markers, velocity-component vectors, and axes with a distance scale.
(b) Misconceptions to avoid: horizontal velocity decreasing during flight, vertical and horizontal motion not being independent, the object needing a forward force to keep moving, and 45° always being optimal regardless of launch/landing height.
(c) Visual-design best practices: auto-scaling the viewport to fit the full trajectory (range and apex) with a dynamic but labeled distance/height scale, drawing the parabola as a trace, showing decomposed velocity vectors, avoiding misleading rotation, and DPI-correct rendering.
(d) Grade 9 appropriate representation and units.
(e) Concrete fixes: an auto-fit camera/scale algorithm that computes range and max height from v₀/angle/g and sets pixels-per-meter so the whole arc fits with margins (with gridlines re-labeled to match), a persistent trajectory trace, removal of the decorative spin (or a physically honest spin), and DPI scaling. Keep the 20 m target meaningful within the rescaled view.
Return implementable specifics.
```

## Wave Physics Simulator (G10)

**Current visual:** A light canvas showing a 1-D transverse traveling wave on a string (10 m shown), a highlighted oscillating particle with a vertical guide, and a wavelength span marker between crests. Speed is derived as v=fλ.

**Observed issues:**
- Solid build; amplitude (≤1.5 m) at `PX_PER_M≈56` gives ≤84 px against a 130 px half-height, so it fits — low risk.
- The wavelength marker recomputes the first crest each frame; at small λ the `λ = x.x m` label between close crests can crowd; at λ near the 5 m max only one span fits.
- Hard-coded colors (`#2f8fe6`, etc.) instead of theme variables; canvas not DPI-scaled (mild blur).
- Only a transverse wave is shown — no longitudinal option, and no explicit phase/period time marker on the particle.

```text
I am polishing a canvas diagram for a "Wave Physics" tool in a Philippine MATATAG Grade 10 physics app. It animates a 1D transverse traveling wave on a string with a highlighted particle (to show purely vertical motion) and a wavelength marker, with v=fλ derived. It mostly works; concerns are a possibly crowded wavelength label at small λ, hard-coded colors, no DPI scaling, and only transverse (no longitudinal) representation.

Research and report, with citations:
(a) The canonical way transverse (and longitudinal) waves and the v=fλ relationship are diagrammed in reputable sources (PhET "Wave on a String", OpenStax, DepEd Grade 10 materials) — labeling wavelength, amplitude, crest/trough, and showing that medium particles oscillate in place.
(b) Misconceptions to avoid: the medium travels with the wave, amplitude affecting speed or wavelength, and confusing frequency with speed.
(c) Visual-design best practices: clear amplitude/wavelength annotations without label collisions at small λ, a period/time indicator on the tracked particle, themable colors, DPI-correct rendering, and reduced-motion (static labeled snapshot) support.
(d) Grade 10 appropriate representation, and whether to add a longitudinal-wave view.
(e) Concrete fixes: a robust wavelength-marker placement that stays readable at all λ, optional longitudinal mode, particle motion emphasis, and theming/DPI improvements.
Return implementable specifics.
```

## Electromagnetic Spectrum (G10)

**Current visual:** A single animated SVG sine wave whose cycle count grows with frequency (1–27 cycles), a colored "band" card naming the current region, and linked c=fλ and E=hf numeric readouts on a log-frequency slider.

**Observed issues:**
- There is **no full labeled spectrum band/ruler** showing all regions (radio→gamma) with wavelength/frequency axes — the canonical EM-spectrum chart. The user sees only the *current* region's name, not where it sits on the whole spectrum.
- The visible-light case can't actually render its rainbow: `data.color` for visible light is a CSS `linear-gradient(...)` string assigned to an SVG `stroke`, which is invalid, so it falls back to white.
- The single wave uses `strokeWidth=0.5` in a `0 0 100 20` viewBox with `preserveAspectRatio="none"`, so the wave is non-uniformly stretched and the amplitude is fixed (doesn't encode anything).

```text
I am improving the diagram for an "Electromagnetic Spectrum" tool in a Philippine MATATAG Grade 10 physics app. A log-frequency slider drives a single animated sine wave (more cycles = higher frequency) and shows the current band's name plus c=fλ and E=hf readouts. Problems: there is no full labeled spectrum chart (radio→gamma) showing where the current selection sits; the visible-light "rainbow" doesn't render (a CSS gradient string is wrongly used as an SVG stroke, so it falls back to white); and the lone wave is non-uniformly stretched with a meaningless fixed amplitude.

Research and report, with citations:
(a) The canonical way the EM spectrum is diagrammed in reputable sources (NASA Science "Tour of the EMS", OpenStax, NIST, DepEd Grade 10 materials) — a labeled band/ruler ordered by wavelength/frequency, the visible-light expansion, and representative scales/objects per band.
(b) Misconceptions to avoid: that visible light is a large part of the spectrum, that higher frequency = "stronger," confusing wavelength and frequency direction, and ionizing vs non-ionizing boundaries.
(c) Visual-design best practices: a full labeled spectrum band with a movable marker, correct rendering of the visible rainbow (SVG gradient defs), log-axis labeling, accessible color use (don't rely on hue alone), and a single representative wave with honest, uniform scaling.
(d) Grade 10 appropriate representation and Filipino/real-world examples per band.
(e) Concrete fixes: add a canonical full-spectrum band/ruler with a marker tied to the slider, implement the visible-light gradient correctly via SVG `<linearGradient>`, and fix the wave's aspect ratio/amplitude so it reads honestly.
Return implementable specifics.
```

## Optics Simulator — Mirrors (G10)

**Current visual:** A canvas ray-tracing tool for concave/convex/plane mirrors: principal axis, a curved (decorative arc) or flat mirror, F and C markers, an object arrow, up to 4 principal/chief rays, and the located image (real solid / virtual dashed). Image properties are reported.

**Observed issues:**
- The mirror is **drawn as a curved arc** (`ctx.arc` with an arbitrary center `MIRROR_X + curvature*2.5` and radius `mirrorHeight/1.6`) but rays are reflected off the **flat plane** `x=MIRROR_X` (thin-mirror approximation). The drawn curvature does not match the focal length, so F/C marker positions can look inconsistent with the mirror's apparent shape.
- The image arrow top is clamped (`Math.max(12, Math.min(h-12, ...))`) when the object is near F (large magnification), so the image can be silently mis-scaled at extremes.
- Diverging-ray back-extensions and the dashed virtual image rely on careful layering; at some parameters the extension length (`ext=300`) may not reach the canvas edge or may overshoot.
- Hard-coded dark/light fallback colors; canvas not DPI-scaled.

```text
I am improving a canvas ray-diagram tool for mirrors (concave, convex, plane) in a Philippine MATATAG Grade 10 physics app. It traces principal rays to locate the image and reports real/virtual, upright/inverted, enlarged/diminished. Problem: the mirror is DRAWN as a curved arc whose curvature is decorative and does not correspond to the focal length, while rays actually reflect off a flat plane (thin-mirror approximation) — so F and C markers can look inconsistent with the mirror's shape. Also the image height is clamped near the focal point (silent mis-scaling) and ray back-extensions for virtual images are fragile.

Research and report, with citations:
(a) The canonical ray diagrams for concave/convex/plane mirrors in reputable sources (PhET "Geometric Optics", OpenStax, HyperPhysics, DepEd Grade 10 materials) — the standard principal rays, sign conventions, and how the mirror, F, and C are drawn consistently.
(b) Misconceptions to avoid: virtual images "don't exist," confusing real vs virtual, image always same size, and that the mirror's drawn curvature is unrelated to f (it must be consistent).
(c) Visual-design best practices: making the drawn mirror curvature consistent with the focal length (radius of curvature R=2f), drawing exactly the conventional principal rays, clearly distinguishing real (solid) vs virtual (dashed) rays/images, handling object-near-F extremes gracefully (don't silently clamp — pan/zoom or annotate), themable colors, and DPI-correct text.
(d) Grade 10 appropriate scope and conventions.
(e) Concrete fixes: either draw a geometrically consistent curved mirror (with arc radius = 2f and correct reflection) OR clearly present a labeled "thin mirror plane" so the flat-plane reflection is honest; remove silent image clamping in favor of auto-fit/annotation; and robust virtual-ray back-extension to the image.
Return implementable specifics.
```

## Density & Buoyancy (G7)

**Current visual:** A DOM water tank (350 px) with a dashed water surface; a colored cube whose pixel size scales with `cbrt(volume)*60` floats with the correct submerged fraction (density ratio) or sinks to the bottom. Numeric density readout and float/sink badge.

**Observed issues:**
- Submerged-fraction logic is correct and the float depth is meaningful — generally solid.
- No buoyant-force or weight arrows, so Archimedes' principle (why it floats) is numeric, not visual.
- Cube size scales with volume but the water level is fixed; a large cube (volume 3 → ~86 px) plus large submerged fraction can place the cube near the tank floor with little context, and there's no displaced-water indication.
- "Submerged %" is shown as text but the waterline crossing the cube is the only visual cue (no shading of the underwater portion distinct from above-water).

```text
I am polishing a "Density and Buoyancy" tank diagram in a Philippine MATATAG Grade 7 physics app. A cube floats at the correct submerged fraction (ratio of densities) or sinks. It works, but there are no buoyant-force/weight arrows, no displaced-water indication, and the underwater vs above-water portion of the object isn't visually distinguished.

Research and report, with citations:
(a) The canonical way density and buoyancy/floating are diagrammed in reputable sources (PhET "Buoyancy"/"Density", OpenStax, DepEd Grade 7 materials) — submerged fraction, displaced fluid, and force arrows (weight vs buoyant force).
(b) Misconceptions to avoid: heavier objects always sink, size determines sinking, and that floating objects have no gravity acting — plus the role of the fluid's density.
(c) Visual-design best practices: clearly shading the submerged portion, showing displaced-water level change, proportional weight/buoyant-force arrows with a legend, accessible color, and reduced-motion settling animation.
(d) Grade 7 appropriate representation and Filipino fluid examples (seawater vs fresh water vs oil).
(e) Concrete additions: distinct shading for the underwater portion, optional buoyant-force vs weight arrows, and a displaced-water cue, while keeping the existing correct submerged-fraction geometry.
Return implementable specifics.
```

## Gas Laws Simulator (G10)

**Current visual:** A canvas piston chamber with 40 particles bouncing; pressure is *measured* from wall-collision impulse (not read from PV=nRT); a temperature colormap tints particles; volume/temperature sliders per selected law.

**Observed issues:**
- Conceptually strong (pressure emerges from collisions). Mostly polish.
- The piston "handle" is a bar drawn to the right of the chamber; at large volume (containerWidth near full width) the handle area nearly vanishes and the `← Volume →` label sits at the chamber center, which can overlap dense particles.
- Particle color encodes temperature via a custom RGB ramp (not theme/accessible-checked); no explicit speed/scale legend.
- No pressure gauge graphic — pressure is a number only; the collision→pressure link would benefit from a visible gauge.

```text
I am polishing a "Gas Laws" particle-piston simulator in a Philippine MATATAG Grade 10 physics/chemistry app. Particles bounce in a chamber and pressure is measured from wall collisions (kinetic theory) rather than read from PV=nRT. It's solid; concerns: the piston handle/label can overlap particles at large volume, particle-temperature coloring isn't accessibility-checked, and pressure is shown only as a number (no gauge).

Research and report, with citations:
(a) The canonical way kinetic molecular theory and Boyle/Charles/Gay-Lussac are diagrammed in reputable sources (PhET "Gas Properties", OpenStax Chemistry, DepEd Grade 10 materials) — piston, particle speed/temperature representation, and pressure gauges.
(b) Misconceptions to avoid: pressure as a static "amount of gas," temperature as "heat," particles losing energy over time, and confusing the three laws' held-constant variable.
(c) Visual-design best practices: an accessible temperature-to-color mapping with a legend, a visible pressure gauge tied to the measured collisions, piston/handle layout that never overlaps particles or labels, and reduced-motion handling.
(d) Grade 10 appropriate representation.
(e) Concrete fixes: add a pressure-gauge graphic, an accessible color/speed legend, and a piston/label layout that stays clear of particles across the full volume range.
Return implementable specifics.
```

# Computer Science

## Digital Logic: Bits to Pixels (CS, G8–10)

**Current visual:** Three 8-bit byte editors (toggle buttons with place-value labels 128…1), a large color swatch showing the resulting RGB hex, and three subpixel bars whose heights track R/G/B (0–255) via a negative-margin fill trick.

**Observed issues:**
- The subpixel "bars" use a fixed `h-16` track with `marginTop: -(value/255)*64` overlay — a hack that works but is fragile and not labeled with an axis (0–255 scale not shown on the bar).
- Conceptually clear; not a scientific "diagram" with accuracy concerns, but the link from binary place values to the 0–255 channel could be made more explicit visually.
- No representation of how three subpixels physically combine into one perceived color (additive mixing) beyond the single swatch.

```text
I am polishing a "Digital Logic: Bits to Pixels" tool in a Philippine K-12 computer-science context (Grades 8-10). Users toggle 8 bits per RGB channel; a swatch shows the resulting color and three bars show each channel 0-255. The bars use a negative-margin fill trick without a labeled scale, and additive color mixing (how 3 subpixels make one color) isn't shown beyond the swatch.

Research and report, with citations:
(a) The canonical way binary place value, byte→0-255 mapping, and additive RGB color are explained/diagrammed in reputable sources (CS Unplugged, code.org, Khan Academy, color-science references) — including subpixel/additive-mixing visuals.
(b) Misconceptions to avoid: bits as decimal digits, RGB as subtractive (paint) mixing, and that "more bits = brighter."
(c) Visual-design best practices: clearly labeled channel bars/meters (0-255 axis), an additive-mixing diagram (overlapping R/G/B light), accessible color use (don't rely on the swatch alone for color-blind users — show hex/values), and place-value annotation.
(d) Grade 8-10 appropriate representation.
(e) Concrete additions/fixes: a labeled 0-255 meter per channel, an additive RGB-overlap diagram, and a clearer binary-place-value-to-channel-value link.
Return implementable specifics.
```

# Chemistry & Matter

## States of Matter Simulator (G3)

**Current visual:** A Matter.js physics canvas with 80 water "particles." Below 0 °C they spring back to lattice home sites (solid, only vibrating); 0–100 °C they flow (liquid, gravity pools them); above 100 °C they disperse (gas). Color and damping change per phase.

**Observed issues:**
- Phase change is **abrupt** at exactly 0 and 100 °C — no melting/boiling transition is visualized (particles snap between behaviors), which can imply phase change is instantaneous.
- The solid lattice is a rectangular grid pinned at the bottom; it reads more like "stacked balls at the bottom" than a crystalline lattice with a defined shape, and there's no container/beaker outline distinguishing solid shape from liquid pooling.
- Gas uses `gravity.scale=0` so particles can drift to one corner depending on residual velocities rather than uniformly filling the space.

```text
I am polishing a Matter.js particle simulation for a "States of Matter" tool in a Philippine MATATAG Grade 3 science app (water as solid/liquid/gas). Particles lock in a grid (solid), pool at the bottom (liquid), or disperse (gas) as temperature crosses 0 °C and 100 °C. Concerns: the change is abrupt at the exact temperatures (no melting/boiling transition shown), the solid "lattice" looks like a pile of balls at the bottom rather than a fixed-shape crystal, and the gas can drift to a corner instead of filling the space.

Research and report, with citations:
(a) The canonical way the particle (kinetic) model of solids/liquids/gases is diagrammed for primary grades in reputable sources (PhET "States of Matter: Basics", OpenStax, DepEd/MATATAG Grade 3 materials) — particle spacing, arrangement, and motion per state, and how melting/boiling are shown.
(b) Misconceptions to avoid: particles only exist in some states, particles changing size/shape with state, gas particles "having nothing between them" vs filling the container, and that phase change is instantaneous.
(c) Visual-design best practices for particle-model diagrams at Grade 3: clear container/shape cues (fixed shape vs takes-shape-of-container vs fills-container), legible particle counts, motion that reads as vibrate/flow/fly-apart, accessible color, and reduced-motion options.
(d) Grade 3 appropriate vocabulary and simplicity (Tagalog: solido/likido/gas).
(e) Concrete fixes: a recognizable crystalline lattice with a defined shape and a container outline, gas that uniformly fills the box, and an optional brief melting/boiling transition near 0/100 °C so change doesn't look instantaneous.
Return implementable specifics.
```

## Solution Concentration Lab (G7)

**Current visual:** A dark canvas beaker (drawn as a rectangle with a small lip) with a volume-tied water level, fixed mL graduation marks, drifting dissolved particles, and an undissolved "pile" (half-ellipse) at the bottom when past the solubility limit; readouts for %m/m, %m/v, dissolved mass, saturation status.

**Observed issues:**
- The "beaker" is a plain rectangle (vertical sides + lip ticks); it doesn't read as a beaker (no tapered/rounded base) — minor realism gap.
- The undissolved pile is drawn at a fixed bottom location (`h-18`) regardless of the **water level**; at low solvent volume (50 mL) the water surface is high up but the pile sits at the very bottom — fine, but dissolved particles are clamped to `waterLevel+10 … h-30`, so at low fill they crowd into a thin band.
- Particle count caps at 80 and is a coarse proxy for mass; saturation vs supersaturation is shown by status badge and pile size, not by a clear "dissolved vs solubility ceiling" gauge.
- Hard-coded dark colors; canvas not DPI-scaled.

```text
I am improving a canvas "Solution Concentration Lab" (virtual beaker) in a Philippine MATATAG Grade 7 chemistry app. It shows water at a volume-tied level, dissolved particles drifting, and an undissolved pile at the bottom past the solubility limit, with %m/m, %m/v, and saturation status. Concerns: the beaker is just a rectangle (doesn't look like a beaker), the undissolved pile sits at the canvas bottom regardless of water level, dissolved particles crowd into a thin band at low fill, and saturation/supersaturation is conveyed mostly by a badge rather than a clear visual gauge.

Research and report, with citations:
(a) The canonical way solutions, concentration, and saturation/solubility are diagrammed in reputable sources (PhET "Concentration"/"Sugar and Salt Solutions", OpenStax Chemistry, DepEd Grade 7 materials) — solute particles in solution, undissolved solute at the bottom, and saturation indicators.
(b) Misconceptions to avoid: dissolved solute "disappears" (mass not conserved), concentration depends only on solute amount (not solution volume), and saturation as a fixed property regardless of temperature/volume.
(c) Visual-design best practices: a recognizable beaker shape with an accurate liquid level, undissolved solute resting at the actual liquid floor, particle density that scales believably with dissolved mass, a clear saturation gauge (dissolved vs solubility ceiling), accessible color, and DPI-correct rendering.
(d) Grade 7 appropriate representation and Filipino solute examples (asin/asukal).
(e) Concrete fixes: a proper beaker outline, pile/particle placement tied to the real water level, a "dissolved vs maximum solubility" bar/gauge to show unsaturated/saturated/supersaturated, and theming/DPI improvements.
Return implementable specifics.
```

## Chemical Bonding Simulator (G9)

**Current visual:** A stepped SVG sequence for ionic (Na+Cl→NaCl) and covalent (Cl+Cl→Cl₂): atoms as circles with Lewis dots, an electron-transfer arrow (ionic), a shared pair (covalent), an ionic lattice grid (step 4), and a Cl₂ molecule with a bond line. Octet status chips.

**Observed issues:**
- **Lewis dots are placed one-per-side then singly**, not grouped into proper lone *pairs* on each side — so the standard Lewis convention (paired dots) isn't followed, and a chlorine's "7 then +1" can look like 8 single dots rather than 4 pairs.
- The covalent shared pair (two dots) overlaps the drawn bond line; in the final Cl₂ the bond line and the shared-pair dots are both present and visually compete.
- No electron-shell (Bohr) rings are shown, so "outer shell / octet" is asserted by chips/text rather than depicted as a shell filling up.
- The ionic lattice is a flat 4×4 checkerboard (no 3-D cue), and Na⁺ vs Cl⁻ sizing (12 vs 16 r) is only roughly to ionic-radius scale.

```text
I am improving an SVG step-through diagram for a "Chemical Bonding" tool in a Philippine MATATAG Grade 9 chemistry app, covering ionic (NaCl) and covalent (Cl₂) bonding with Lewis dots and an octet tracker. Problems: valence electrons are drawn as single dots placed one-per-side rather than as proper lone PAIRS (Lewis convention); the covalent shared pair overlaps the bond line; there are no electron-shell (Bohr) rings so "octet" is asserted in text; and the ionic lattice is a flat checkerboard.

Research and report, with citations:
(a) The canonical conventions for Lewis dot structures and Bohr shell diagrams in reputable sources (IUPAC recommendations, OpenStax Chemistry, DepEd Grade 9 materials) — how lone pairs are grouped, how bonding pairs are shown, and how the octet rule is depicted.
(b) Misconceptions to avoid: ionic "sharing," covalent "transfer," that Na⁺ achieves an octet by emptying its shell (it actually exposes a full inner shell), dots vs shells confusion, and that NaCl is a discrete molecule rather than a lattice.
(c) Visual-design best practices: correct paired-dot placement, distinguishing bonding pairs from lone pairs, optional Bohr shells to show the outer shell filling to 8, a 3-D-cued ionic lattice, accessible color, and clear step transitions.
(d) Grade 9 appropriate representation (Lewis dots and/or Bohr shells per MATATAG).
(e) Concrete fixes: a proper Lewis-dot layout (lone pairs grouped two-per-side), a bonding pair shown as the shared pair without colliding with a separate bond line, optional shell rings showing octet completion, and a lattice with a 3-D hint and roughly correct relative ionic sizes.
Return implementable specifics.
```

## Reaction Rate Simulator (G10)

**Current visual:** A particle-box canvas (collision theory: reactive collisions need enough energy AND aligned reactive-site "notches") plus an SVG Maxwell–Boltzmann distribution with a shaded fraction above the activation energy and a movable Eₐ line.

**Observed issues:**
- Strong, well-built tool. The reactive site is shown only as a short "notch" line from the particle center; orientation success/failure may be hard to perceive at small particle radius (7 px).
- The MB curve is qualitative (relative units, clearly labeled as such) — accurate enough but the x-axis has no tick values, only "low/high energy."
- Catalyst is shown as a tinted strip labeled "CATALYST SURFACE" at the bottom; the mechanism (lowering Eₐ) is shown by moving the dashed line, which is good, but the surface strip doesn't visibly *do* anything to particles.

```text
I am polishing a "Reaction Rate / Collision Theory" tool in a Philippine MATATAG Grade 10 chemistry app. It has a particle box (reactions need sufficient energy AND correct orientation, shown by a notch) and a Maxwell-Boltzmann distribution with a shaded fraction above the activation energy and a movable Ea line. It's solid; concerns: the orientation "notch" is subtle at small particle size, the MB x-axis lacks tick values, and the catalyst is a labeled strip that doesn't visibly interact with particles.

Research and report, with citations:
(a) The canonical way collision theory and Maxwell-Boltzmann distributions are diagrammed in reputable sources (OpenStax Chemistry, RSC, PhET reactions, DepEd Grade 10 materials) — effective vs ineffective collisions, orientation, the Ea threshold, and how a catalyst is represented.
(b) Misconceptions to avoid: every collision reacts, temperature changes Ea (it doesn't — it shifts the distribution), catalysts are consumed, and confusing the area-above-Ea with rate magnitude.
(c) Visual-design best practices: making molecular orientation clearly visible (a distinct reactive face, not a thin notch), labeled axes on the MB curve, an honest catalyst depiction (lowering Ea, providing a surface), accessible color, and reduced-motion handling.
(d) Grade 10 appropriate representation.
(e) Concrete fixes: a clearer reactive-site/orientation depiction, axis ticks/labels on the MB distribution, and a catalyst that visibly relates to the lowered Ea line (and optionally the particle interactions).
Return implementable specifics.
```

## Stoichiometry: Limiting Reactant (G12)

**Current visual:** A balanced-equation header with colored coefficients, two mole sliders, two horizontal "reaction-sets" comparison bars (the shorter one limits), and result cards (limiting reactant, product formed, leftovers).

**Observed issues:**
- The visual is essentially **two comparison bars + text cards** — there is no particle/molecule-level depiction of reactant molecules combining in the mole ratio and an excess reactant being left over (the most intuitive way to "see" the limiting reactant).
- The bars normalize to `maxExtent`, which is good, but they convey "reaction sets" abstractly; a learner may not connect bar length to actual molecule counts.
- No visual of the leftover/excess reactant as physical leftover units.

```text
I am improving the visual for a "Stoichiometry: Limiting Reactant" tool in a Philippine MATATAG Grade 12 chemistry app. It shows a balanced equation, two "reaction sets" comparison bars (shorter one limits), and result cards. The current visual is abstract bars + numbers; there is no particle/molecule-level picture of reactants combining in the mole ratio with the excess reactant left over.

Research and report, with citations:
(a) The canonical ways limiting-reactant problems are diagrammed in reputable sources (OpenStax Chemistry, RSC, DepEd/SHS chemistry materials) — "before/after" molecule diagrams, mole-ratio groupings, and BCA (before-change-after) tables.
(b) Misconceptions to avoid: the limiting reactant is simply the one with fewer moles (ignoring coefficients), leftover product instead of leftover reactant, and that the excess reactant disappears.
(c) Visual-design best practices: a particle/molecule "before vs after" diagram that groups reactants by the mole ratio and shows leftover excess as concrete units, clear coefficient-aware grouping, accessible color, and pairing the visual with the existing numeric bars.
(d) Grade 12 appropriate representation.
(e) Concrete additions: a molecule-grouping (before/after) visual that pairs reactant units per the balanced ratio, forms product units, and shows the leftover excess reactant, complementing the current comparison bars.
Return implementable specifics.
```

# Biology

## Life Cycles: Philippine Eagle & Tamaraw (G4)

**Current visual:** A shared `ProcessCycle` ring component showing 4–5 stages as **emoji nodes** (🥚🐣🪶🦅🪺 for the eagle; 🐃 reused for calf/juvenile/adult plus ❤️ for the tamaraw) with a detail panel and Philippine-context notes.

**Observed issues:**
- The "diagram" is a ring of **emoji**, not actual life-cycle illustrations — the tamaraw uses the **same 🐃 emoji for calf, juvenile, and adult**, so the visual conveys no developmental change.
- The ring layout is generic (shared with the rock cycle, water cycle, mitosis), so there's nothing species- or biology-specific in the imagery.
- Stage size/scale doesn't convey growth; emoji rendering varies by platform/OS.

```text
I am improving a "Life Cycles" visualizer for two Philippine endemic species (Philippine eagle and tamaraw) in a MATATAG Grade 4 biology app. Stages are currently shown as a ring of emoji nodes — and the tamaraw reuses the SAME buffalo emoji for calf, juvenile, and adult, so no developmental change is visible. I want a proper life-cycle diagram.

Research and report, with citations:
(a) The canonical way animal life cycles (direct development, no metamorphosis) are diagrammed for primary grades in reputable sources (DepEd/MATATAG Grade 4 materials, encyclopedic/zoo/IUCN sources for these species) — circular life-cycle layouts, stage labeling, and showing growth from young to adult.
(b) Misconceptions to avoid: that birds/mammals undergo metamorphosis like insects/frogs, that young look unlike adults, and that all species develop at the same pace (these are slow breeders — a key conservation point).
(c) Visual-design best practices: distinct, accurate stage illustrations that show real size/feature changes (egg→chick→juvenile→adult; calf→juvenile→adult), consistent style, accessible labeling, and avoiding platform-dependent emoji.
(d) Grade 4 appropriate representation and Filipino terms (itlog, sisiw, guya, etc.).
(e) Concrete fixes: recommend a set of accurate, distinct per-stage illustrations (or a style spec) replacing emoji, a circular layout that conveys the slow once-every-two-years cycle, and how to emphasize the conservation angle visually.
Return implementable, sourced guidance (including reference images/figures to emulate).
```

## Human Body Systems (G5)

**Current visual:** Four canvas/DOM sub-views: (1) Homeostasis — a blobby "lungs" arc + a plain red circle "heart" that pulse with activity intensity; (2) Vascular — a circle heart with polyline vessels and flowing dots; (3) Absorption — a villus bezier with capillary loop + lacteal and moving particles; (4) Reflex arc — DOM circle nodes (Sensory/Spinal/Extensor/Flexor) with an absolutely-positioned SVG of hard-coded connector lines.

**Observed issues — HIGH:**
- **Anatomically loose, abstract shapes.** The homeostasis "lungs" are a single quadratic-curve blob and the heart is a plain circle; they aren't connected and don't resemble the cardiorespiratory system.
- **Reflex-arc connectors are misaligned.** The connector `<svg>` uses fixed pixel coordinates (`M 50 80 L 300 80`, etc.) inside a responsive, flex-laid-out, padded container, so the lines do not actually join the circle nodes across viewport sizes.
- Vessel/structure **labels are placed at fixed midpoints** and can overlap the heart, the capillary boxes, or run off-canvas (e.g., long "Blood Capillary (Absorbs Sugars/Amino Acids)" text).
- Hard-coded dark colors and no DPI scaling across all four canvases; the four views share little visual consistency.

```text
I am overhauling a multi-view "Human Body Systems" tool in a Philippine MATATAG Grade 5 biology app. It has four abstract canvas/DOM views: cardiorespiratory (a blobby lung shape + a plain circle heart that pulse), vascular double-circulation (circle heart + polyline vessels), small-intestine absorption (villus + capillary + lacteal), and a patellar reflex arc (DOM circle nodes connected by an SVG of HARD-CODED pixel line coordinates that don't actually align with the responsive nodes). Problems: shapes are anatomically loose and disconnected, the reflex-arc connector lines are misaligned across screen sizes, labels overlap or run off-canvas, and there's no DPI scaling.

Research and report, with citations:
(a) The canonical, age-appropriate way each system is diagrammed in reputable sources (OpenStax Anatomy & Physiology, InnerBody, DepEd/MATATAG Grade 5 materials): cardiorespiratory (heart + two lungs + pulmonary/systemic link), double circulation, small-intestine villus absorption (capillary for sugars/amino acids, lacteal for lipids), and the reflex arc (receptor → sensory neuron → spinal cord/interneuron → motor neuron → effector, with reciprocal inhibition).
(b) Misconceptions to avoid: a single circulatory loop, the heart as a literal "heart shape," blood "made" in the heart, reflexes routed through the brain, and lungs as simple balloons.
(c) Visual-design best practices: recognizable-but-simplified organ shapes, connectors that anchor to node positions in a responsive layout (compute line endpoints from element geometry, not fixed pixels), label placement that never overlaps or runs off-canvas (leader lines/edge-aware anchoring), consistent visual style across views, accessible color, and DPI-correct rendering.
(d) Grade 5 appropriate level of detail.
(e) Concrete fixes per view: anatomically clearer heart/lungs that are connected; a reflex-arc diagram whose connector lines are computed from actual node positions (SVG with coordinates derived from layout, or a single coordinate space) so they always join the nodes; non-overlapping labels; and DPI scaling.
Return implementable, sourced guidance (with reference figures to emulate).
```

## Food Web — Philippine Rice Paddy (G5)

**Current visual:** A Cytoscape.js force/breadthfirst graph of rice-paddy organisms (producers→apex) with tap-to-highlight neighborhoods, an info panel (eats/eaten-by), and a CSS energy pyramid (10% rule) plus a decomposer note.

**Observed issues:**
- Robust, library-managed layout — generally strong.
- Node labels are small (`9px`) with two-line wrapping; in a dense web some node labels can be hard to read, and the breadthfirst layout direction (arrows prey→predator) should be verified as unambiguous to students.
- The energy pyramid is a clean CSS tier stack; the decomposer is described in text/♻ emoji rather than integrated into the web/pyramid as a recycling arrow.

```text
I am polishing a "Philippine rice-paddy Food Web" tool in a MATATAG Grade 5 biology app. It uses a Cytoscape.js graph (producers→apex) with tap-to-highlight, plus a CSS energy pyramid (10% rule) and a decomposer note. It's solid; concerns: small node labels, ensuring arrow direction (who-eats-whom) is unambiguous, and the decomposer being only a text/emoji note rather than integrated as a recycling pathway.

Research and report, with citations:
(a) The canonical way food webs and energy pyramids are diagrammed in reputable sources (OpenStax Biology, DepEd Grade 5 materials, ecology texts) — arrow direction convention (energy flow from prey to predator), trophic-level coloring, the ~10% rule, and decomposers/recyclers.
(b) Misconceptions to avoid: arrows showing "who eats whom" backwards, food webs as simple chains, energy being recycled (it's lost as heat) vs nutrients being recycled, and decomposers sitting "at the top."
(c) Visual-design best practices: legible node labels in dense graphs, unambiguous directional arrows with a legend, trophic coloring (accessible), and integrating decomposers as an explicit nutrient-recycling arrow back to producers.
(d) Grade 5 appropriate representation and Filipino organism names.
(e) Concrete fixes: label legibility improvements, an explicit arrow-direction legend ("arrow points to the eater / energy flow"), and a decomposer recycling pathway connected to the web/pyramid rather than a side note.
Return implementable specifics.
```

## Virtual Microscope — Plant Cell (G7)

**Current visual:** An SVG plant (mango leaf) cell inside a round microscope viewport, zoomable via Framer Motion scale (40×/100×/400×) with a fixed transform origin; organelles are clickable shapes (cell wall polygon, vacuole blob, nucleus circle, chloroplast/mitochondria ellipses) with a callout panel.

**Observed issues:**
- The cell is an **irregular quadrilateral polygon** rather than the canonical brick-like (rectangular, rounded-corner) plant-cell shape; the central vacuole is an off-center blob rather than the dominant central structure.
- **Organelle proportions are off**: the nucleus (r=12) is large relative to the cell while chloroplasts/mitochondria are tiny; the central vacuole should occupy most of a mature plant cell's volume.
- Zoom uses a **fixed transform origin (40% 40%)** with hard-coded pan offsets; at 400× (scale 8) organelles near the edges (e.g., nucleus at 75,30) can pan out of the circular viewport, and the user can't choose what to center on.
- The two crosshair lines are decorative; magnification numbers (40×/100×/400×) aren't tied to any scale bar.

```text
I am improving an SVG "Virtual Microscope" plant-cell diagram in a Philippine MATATAG Grade 7 biology app. Users zoom (40x/100x/400x) and click organelles. Problems: the cell is an irregular quadrilateral (not the canonical brick-shaped plant cell), the central vacuole is an off-center blob rather than the dominant central structure, organelle proportions are off (nucleus too big, chloroplasts/mitochondria tiny), and zoom uses a fixed origin so edge organelles pan out of view at high magnification, with no scale bar.

Research and report, with citations:
(a) The canonical way a plant cell and its organelles are diagrammed in reputable sources (OpenStax Biology, DepEd Grade 7 materials, standard cell-biology figures) — overall cell shape, the large central vacuole, relative organelle sizes/positions, and what's visible at light-microscope magnifications.
(b) Misconceptions to avoid: plant cells being round like animal cells, the nucleus dominating the cell (the vacuole usually does), all organelles being visible/large at 40x, and confusing chloroplasts/mitochondria.
(c) Visual-design best practices: accurate cell shape and organelle proportions, a magnification scale bar, zoom that lets the user center on a clicked organelle (or keeps the focused organelle in view), accessible highlighting, and reduced-motion zoom.
(d) Grade 7 appropriate representation and which structures to label.
(e) Concrete fixes: a brick-shaped plant cell with a dominant central vacuole and proportionally correct organelles, a scale bar tied to the 40x/100x/400x levels, and zoom that recenters on the selected organelle so nothing pans off the circular field of view.
Return implementable, sourced guidance (with reference figures to emulate).
```

## Punnett Square Maker (G8)

**Current visual:** A clean DOM 2×2 grid for a monohybrid cross (R/r), with gamete-splitting step, color-coded cells (red dominant / white recessive), and reduced genotype/phenotype ratios.

**Observed issues:**
- Solid and correct; limited to a single-gene 2×2 monohybrid cross (no dihybrid/incomplete-dominance options).
- Dominant cells use red fill with light text; recessive cells are outlined white — color carries the phenotype, so a legend/pattern would help color-blind users.
- The gamete-split arrows are simple "↓" glyphs; the conceptual link (each parent contributes one allele) is textual.

```text
I am polishing a "Punnett Square" tool in a Philippine MATATAG Grade 8 biology app for a monohybrid cross (R = red dominant, r = white recessive in gumamela). It shows gamete splitting, a 2x2 grid, and genotype/phenotype ratios. It's correct; concerns: phenotype is conveyed mainly by cell color (accessibility), the gamete-contribution concept is mostly textual, and only a 2x2 monohybrid case is supported.

Research and report, with citations:
(a) The canonical way Punnett squares and gamete formation are diagrammed in reputable sources (OpenStax Biology, DepEd Grade 8 materials, genetics texts) — gamete rows/columns, allele combination in cells, and genotype vs phenotype ratio reading.
(b) Misconceptions to avoid: ratios as guarantees rather than probabilities, dominant = "more common," confusing genotype and phenotype, and that each parent passes both alleles.
(c) Visual-design best practices: encoding phenotype with color AND a pattern/label (color-blind-safe), clearly showing each parent contributing one allele per gamete, and an optional path toward dihybrid/incomplete-dominance without clutter.
(d) Grade 8 appropriate representation and Filipino (gumamela) framing.
(e) Concrete fixes: a phenotype legend with non-color cues, a clearer gamete-contribution visual, and (optionally) a scalable grid for future dihybrid/incomplete-dominance modes.
Return implementable specifics.
```

## Photosynthesis Simulator (G11–12)

**Current visual:** Two tabs. (1) Stomatal gas exchange — a canvas with two big green ellipse "guard cells" that part by an aperture, with CO₂/O₂ particles spawning by rate. (2) Van Helmont mass balance — a 🌳 **emoji** that scales up as biomass grows beside a soil block. Sliders for light/CO₂/water drive a non-rectangular-hyperbola + Michaelis–Menten rate.

**Observed issues:**
- The Van Helmont view represents the plant as a **scaling tree emoji**, not a diagram; soil is two faint bars. Mass change is shown by emoji scale + numbers.
- Stomata guard cells are drawn as **two plain vertical ellipses** rather than the canonical kidney-bean–shaped guard-cell pair forming a pore; the aperture is the gap between ellipses, and particles spawn from the center regardless of whether the stoma is open.
- The rate model (non-rectangular hyperbola, Michaelis–Menten) is quite advanced and the "limited by" label logic is fragile; the visuals don't show the light/CO₂/water limiting factors as a clear limiting-factor graph.
- Hard-coded dark colors; the two tabs differ stylistically.

```text
I am improving a two-tab "Photosynthesis" tool in a Philippine MATATAG Grade 11-12 biology app: (1) stomatal gas exchange (two green ellipse "guard cells" parting by an aperture, CO2/O2 particles), and (2) a Van Helmont mass-balance view where the plant is a TREE EMOJI that scales up. Problems: the Van Helmont plant is an emoji not a diagram; the guard cells are plain ellipses rather than the canonical kidney-bean guard-cell pair forming a stomatal pore, and particles spawn even when nearly closed; and the limiting-factor relationships (light/CO2/water) aren't shown as a clear graph.

Research and report, with citations:
(a) The canonical way stomata/guard cells and photosynthesis limiting factors are diagrammed in reputable sources (OpenStax Biology, RSC/SAPS, DepEd SHS materials, classic limiting-factor graphs) — kidney-bean guard cells forming a pore, gas exchange direction, and rate-vs-factor curves with plateaus.
(b) Misconceptions to avoid: plants gaining mass mostly from soil (Van Helmont's point — it's from atmospheric CO2), stomata as simple holes, O2 as the "food," and that one factor alone always limits regardless of others.
(c) Visual-design best practices: accurate kidney-bean guard-cell geometry with an aperture that gates particle flow, a limiting-factor line graph (rate vs light/CO2) showing plateaus and the active limiter, accessible color, consistent styling across tabs, and reduced-motion options.
(d) Grade 11-12 appropriate level (limiting factors; whether the advanced rate models are warranted or should be simplified).
(e) Concrete fixes: replace the tree emoji with a real before/after plant + air/soil mass-balance diagram; redraw guard cells as a kidney-bean pair whose aperture controls particle gating; add a limiting-factor graph; and unify styling.
Return implementable, sourced guidance (with reference figures to emulate).
```

## Mitosis: Cell Division (G11–12)

**Current visual:** The shared `ProcessCycle` ring with 6 stages (Interphase→Cytokinesis) shown as **emoji nodes** (🧬🌀🪢↔️🔵✌️) plus a per-stage text description.

**Observed issues — HIGH:**
- The core learning goal is **what happens to the chromosomes** at each phase — but the diagram is a ring of **emoji**, with no depiction of chromosomes, sister chromatids, spindle fibres, the metaphase plate, or the cell membrane pinching. The science is entirely in the text.
- Generic shared ring layout offers nothing mitosis-specific; the emoji (🪢 knot, ✌️ peace sign) are arbitrary and platform-dependent.
- No visual of chromosome number being conserved (the stated "key idea").

```text
I am replacing the diagram for a "Mitosis: Cell Division" tool in a Philippine MATATAG Grade 11-12 biology app. The phases (interphase, prophase, metaphase, anaphase, telophase, cytokinesis) are currently shown as a ring of arbitrary EMOJI with text only — there is NO depiction of chromosomes, sister chromatids, spindle fibres, the metaphase plate, or the dividing cell. The whole point (what happens to chromosomes each phase) is not visualized.

Research and report, with citations:
(a) The canonical way the phases of mitosis are diagrammed in reputable sources (OpenStax Biology, DepEd SHS materials, standard cell-biology figures) — chromosomes/sister chromatids, centromeres, spindle apparatus, nuclear envelope breakdown/reformation, metaphase plate alignment, and cytokinesis.
(b) Misconceptions to avoid: chromosomes appearing from nothing, DNA copied more than once, daughter cells differing genetically, plant vs animal cytokinesis differences, and confusing chromosomes with chromatids.
(c) Visual-design best practices for a phase sequence: showing a cell with a small, trackable chromosome set through each phase (so number conservation is visible), spindle/plate depiction, clear stage transitions, accessible color, and reduced-motion stepping.
(d) Grade 11-12 appropriate detail and whether to use animal and/or plant cell.
(e) Concrete redesign: a per-phase cell illustration that actually shows 2-4 chromosomes condensing, aligning, separating, and the cell dividing — replacing emoji — with consistent chromosome coloring so learners can track that each daughter gets a full set.
Return implementable, sourced guidance (with reference figures/animations to emulate).
```

# Earth & Space Science

## Solar System Explorer (G6)

**Current visual:** A React-Three-Fiber 3-D scene: the Sun + 8 planets on circular orbits, with a **log-compressed orbital-distance scale** and deliberately exaggerated planet sizes for visibility; speed/scale controls and a planet info panel.

**Observed issues:**
- 3-D and well-built. The **scale is intentionally non-physical** (log distances, exaggerated sizes) — pedagogically reasonable but must be clearly labeled as not-to-scale to avoid misconceptions.
- Circular (not elliptical) coplanar orbits; all planets shown in one plane with uniform circular paths.
- As a 3-D scene it's outside the "2D off-scale/overlap" problem class — low priority for the 2D-diagram cleanup, but the scale caveat matters pedagogically.

```text
I am refining a 3D "Solar System Explorer" (React Three Fiber) in a Philippine MATATAG Grade 6 earth-science app. For visibility it uses a LOG-compressed distance scale and exaggerated planet sizes, with circular coplanar orbits. I want to ensure it's pedagogically honest and well-labeled rather than reinforcing scale misconceptions.

Research and report, with citations:
(a) How the solar system is canonically represented in reputable sources (NASA Solar System, OpenStax Astronomy, DepEd Grade 6 materials) — the tension between true scale (impossible on one screen) and visibility, and how reputable visualizations disclose compressed scales.
(b) Misconceptions to avoid: planets are close together / similar sizes, orbits are strongly elliptical or all in obviously different planes, and that the textbook "lined-up planets" image is real.
(c) Visual-design best practices: clearly labeling "distances/sizes not to scale (log)," offering a true-scale toggle or comparison, accessible planet labeling, and reduced-motion orbit animation.
(d) Grade 6 appropriate representation and Filipino framing.
(e) Concrete fixes: prominent not-to-scale labeling, an optional true-scale or scale-comparison mode, and (optionally) slight orbital inclination/eccentricity cues — while keeping the current readable layout.
Return implementable specifics.
```

## Seasons & Earth's Tilt (G6)

**Current visual:** Two SVG panels: (1) a Sun–Earth orbit showing Earth at four orbital positions with a 23.5° tilted axis; (2) a hemisphere-insolation panel with the Philippines marked and monsoon (Amihan/Habagat) arrows, plus a "why the Philippines has wet/dry not 4 seasons" note.

**Observed issues:**
- The orbital panel shows the tilt but **doesn't clearly show the lit vs dark hemisphere** (day/night terminator) or how the *same* axial direction produces opposite seasons across the orbit — the key seasons mechanism.
- Monsoon arrows in panel 2 are drawn at fixed coordinates and can **clip the Philippines marker or the panel edge**; the wind direction reversal (Amihan NE vs Habagat SW) needs to be unambiguous.
- Earth's tilt direction must remain **fixed in space** across all four orbital positions (a common diagram error is to "tilt toward the Sun" at every position).

```text
I am improving a two-panel SVG "Seasons & Earth's Tilt" tool in a Philippine MATATAG Grade 6 earth-science app: (1) Earth at four orbital positions with a 23.5° axis, and (2) hemisphere insolation with Philippine monsoon (Amihan/Habagat) arrows. Problems: the orbit panel doesn't clearly show the lit/dark hemisphere or how a fixed tilt direction causes opposite seasons around the orbit; monsoon arrows are fixed-coordinate and can clip the Philippines marker/edge; and I must ensure the axis stays pointing the same way in space at all four positions.

Research and report, with citations:
(a) The canonical way the cause of seasons (axial tilt + revolution, not distance) and monsoons are diagrammed in reputable sources (NASA, OpenStax Astronomy/Earth science, PAGASA/DOST for Amihan/Habagat, DepEd Grade 6 materials) — fixed axis direction, solstice/equinox positions, day/night terminator, and insolation angle.
(b) Misconceptions to avoid: seasons caused by Earth-Sun distance, the axis tilting toward the Sun year-round, both hemispheres having the same season, and that the Philippines has four temperate seasons.
(c) Visual-design best practices: showing the lit/dark hemisphere (terminator), keeping the axis fixed in space across positions, clearly differentiated/labeled monsoon arrows that don't clip, accessible color, and reduced-motion.
(d) Grade 6 appropriate representation and the Philippine wet/dry + Amihan/Habagat framing.
(e) Concrete fixes: add a day/night terminator and consistent fixed-axis tilt across the four positions, reposition/label monsoon arrows so they never clip the marker or edges and clearly show the NE vs SW reversal, and tie insolation angle to the seasons explanation.
Return implementable specifics.
```

## Water Cycle (G4)

**Current visual:** The shared `ProcessCycle` ring with stages (evaporation, condensation, precipitation, collection, …) shown as **emoji nodes** (☀️💨☁️🌧️🌊 etc.) and per-stage text.

**Observed issues — HIGH:**
- The water cycle is fundamentally a **spatial landscape process** (ocean → sky → mountains → rivers → back to sea), but it's rendered as an **abstract emoji ring** with no landscape, no sun-driven directionality, and no spatial relationship between stages.
- Emoji are platform-dependent and don't show transport (e.g., wind moving clouds inland, runoff flowing downhill).
- Processes like transpiration, infiltration, and groundwater flow aren't depicted spatially.

```text
I am replacing the diagram for a "Water Cycle" tool in a Philippine MATATAG Grade 4 earth-science app. It currently shows the stages (evaporation, condensation, precipitation, collection) as an abstract ring of EMOJI with text — there is no landscape, no spatial flow (ocean→sky→mountains→rivers→ocean), and no directional transport. The water cycle is inherently spatial, so a ring of icons misrepresents it.

Research and report, with citations:
(a) The canonical way the water cycle is diagrammed in reputable sources (USGS Water Cycle diagram, NASA, DepEd/MATATAG Grade 4 materials) — a landscape cross-section (sea, land, mountains, sky) with labeled arrows for evaporation, transpiration, condensation, precipitation, runoff, infiltration, and groundwater.
(b) Misconceptions to avoid: the cycle as a fixed linear sequence, rain coming "straight back" to the same spot, ignoring transpiration/groundwater, and clouds "holding" water like containers.
(c) Visual-design best practices: a spatial landscape layout with clearly directioned, labeled arrows, sun as the energy driver, accessible color, and reduced-motion (animated droplets optional).
(d) Grade 4 appropriate representation and Filipino context (e.g., monsoon rain, rice paddies, rivers to the sea).
(e) Concrete redesign: replace the emoji ring with a landscape cross-section diagram (ocean→evaporation→clouds→precipitation over mountains→rivers/runoff→back to sea, plus transpiration and infiltration), with labeled directional arrows and the Sun driving evaporation.
Return implementable, sourced guidance (with reference figures to emulate).
```

## Plate Tectonics (G10)

**Current visual:** The shared `ProcessCycle` ring presenting boundary types/processes as **emoji nodes** (🌋🏔️〰️ etc.) with text descriptions.

**Observed issues — HIGH:**
- Plate boundaries are inherently **cross-sectional/spatial** (divergent ridge, convergent subduction with a trench + volcanic arc, transform strike-slip), but the tool shows an **emoji ring** with no cross-section, no plate motion arrows, no mantle, and no depiction of what happens at each boundary type.
- The three boundary types and their landforms (ridges, trenches, volcanoes, faults) cannot be distinguished from emoji.
- No Philippine-specific context (e.g., Philippine Trench, Philippine Fault, Pacific Ring of Fire) is shown spatially.

```text
I am replacing the diagram for a "Plate Tectonics" tool in a Philippine MATATAG Grade 10 earth-science app. Boundary types/processes are currently shown as a ring of EMOJI with text — there are NO cross-sections, no plate-motion arrows, no mantle, and no depiction of divergent/convergent/transform boundaries or their landforms. Plate tectonics is inherently spatial/cross-sectional, so an emoji ring misrepresents it.

Research and report, with citations:
(a) The canonical way plate boundaries are diagrammed in reputable sources (USGS "This Dynamic Earth", OpenStax/earth-science texts, PHIVOLCS/DOST for Philippine context, DepEd Grade 10 materials) — cross-sections of divergent (mid-ocean ridge), convergent (subduction zone with trench + volcanic arc, or collision), and transform boundaries, with mantle convection and plate-motion arrows.
(b) Misconceptions to avoid: continents floating on water, plates moving fast/visibly, all boundaries producing the same features, and earthquakes/volcanoes being unrelated to boundaries.
(c) Visual-design best practices: clear cross-sectional schematics per boundary type with motion arrows, consistent layering (crust/lithosphere/asthenosphere), accessible color, labels for landforms (ridge/trench/arc/fault), and reduced-motion.
(d) Grade 10 appropriate representation and Philippine framing (Philippine Trench, Philippine Fault, Ring of Fire).
(e) Concrete redesign: replace the emoji ring with labeled cross-section schematics for divergent, convergent (subduction), and transform boundaries, including plate-motion arrows, mantle, and resulting landforms, plus a Philippine-context example.
Return implementable, sourced guidance (with reference figures to emulate).
```

## Rock Cycle (G11)

**Current visual:** The shared `ProcessCycle` ring with rock types/processes (igneous, sedimentary, metamorphic; weathering, melting, etc.) as **emoji nodes** with text.

**Observed issues:**
- The rock cycle is genuinely cyclic, so a ring is a defensible layout — but using **emoji** for rock types/processes conveys little (a learner can't distinguish igneous vs sedimentary vs metamorphic from icons), and the **multiple pathways** (the rock cycle is not a single loop — rocks can skip stages) aren't shown.
- No depiction of the agents (heat/pressure, weathering/erosion, melting/cooling) acting between rock types, and no rock textures/appearances.

```text
I am improving a "Rock Cycle" tool in a Philippine MATATAG Grade 11 earth-science app. It shows rock types and processes (igneous, sedimentary, metamorphic; weathering, melting, etc.) as a ring of EMOJI with text. Concerns: emoji can't convey what each rock type looks like, and the rock cycle's MULTIPLE pathways (rocks can take shortcuts, not just one loop) aren't represented.

Research and report, with citations:
(a) The canonical way the rock cycle is diagrammed in reputable sources (USGS, OpenStax/geology texts, DepEd SHS materials) — the three rock types as nodes, the transforming processes as labeled arrows, and the multiple (non-linear) pathways including shortcuts.
(b) Misconceptions to avoid: the rock cycle as a single fixed loop, rocks always passing through every stage, and that the cycle happens quickly/visibly.
(c) Visual-design best practices: representing rock types with recognizable textures/appearances (not arbitrary icons), labeling transforming processes on arrows, showing multiple/branching pathways, accessible color, and reduced-motion.
(d) Grade 11 appropriate representation and Philippine rock/landform examples.
(e) Concrete fixes: replace emoji with representative rock-type imagery/textures, add labeled process arrows (heat/pressure, weathering/erosion + deposition, melting, cooling/crystallization), and show the branching shortcuts rather than a single ring.
Return implementable, sourced guidance (with reference figures to emulate).
```

## Typhoon Tracker (G11–12, DRRR)

**Current visual:** A stylized SVG map of the Philippines with a radial-gradient cyclone (rotating spiral bands + eye), a track polyline with category-colored points, PAGASA wind-signal context, and category readouts.

**Observed issues:**
- The Philippine landmass is a **rough stylized blob**, and the cyclone's size relative to the map isn't to scale; the track is a simple polyline.
- There is **no forecast cone** (track uncertainty) and no wind-signal radius rings around the storm — both are central to PAGASA's real advisories.
- The eye/bands are decorative (radial gradient + rotation) rather than tied to category/intensity in a quantitative way.

```text
I am improving an SVG "Typhoon Tracker" tool in a Philippine MATATAG Grade 11-12 DRRR/earth-science app. It shows a stylized Philippines map, a rotating spiral cyclone with an eye, and a category-colored track polyline with PAGASA wind-signal context. Problems: the map is a rough blob, the storm isn't to scale, there's no forecast cone (track uncertainty) and no wind-signal radius rings, and the spiral/eye are decorative rather than tied to intensity.

Research and report, with citations:
(a) The canonical way tropical cyclones and their tracks are diagrammed in authoritative sources (PAGASA/DOST advisories and Tropical Cyclone Wind Signal system, JTWC, NOAA/NHC cone-of-uncertainty graphics) — track lines, forecast cones, wind-radius/signal rings, and category color scales.
(b) Misconceptions to avoid: the forecast cone showing the storm's size (it shows track uncertainty), the eye being the most dangerous part, wind signals being the same everywhere, and that the line is a certain path.
(c) Visual-design best practices: a recognizable (reasonably accurate) Philippine map, an honest storm size/scale, a forecast cone and wind-signal rings, an accessible category color scale (PAGASA signals), and clear labeling.
(d) Grade 11-12 DRRR-appropriate representation and PAGASA terminology (Signal No. 1-5).
(e) Concrete fixes: improve map fidelity and storm scale, add a forecast cone of uncertainty and wind-signal radius rings tied to category, and base the storm graphic/eye/bands on intensity rather than pure decoration.
Return implementable, sourced guidance (citing PAGASA conventions specifically).
```

