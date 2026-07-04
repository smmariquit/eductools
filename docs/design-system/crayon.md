# Crayon Cosmos: Design System

EduVisualsPH uses a single design system: **Crayon Cosmos**, a warm storybook-lab
aesthetic (cream paper, crayon-box accents, rounded friendly shapes) layered
with hand-drawn SVG art. It is whimsical on the surface and usable underneath:
AA-level contrast, real focus states, readable type.

- **Theme** (DaisyUI): `crayon`: defined in `src/index.css`. It is the default
 and only theme; `data-theme="crayon"` is set in `src/components/Layout.tsx`.
- **Fonts**: Fredoka (display) + Nunito (body), loaded in `index.html`.
- **Palette**: cream `#FFF8EF`, ink `#2B2B3A`, sky `#2F8FE6`, berry `#FF6B8A`,
 sunshine `#F5A800`, leaf `#2FA46A`, grape `#8A6FE0`.

---

## Crayon art system

Hand-drawn SVGs live in `src/assets/crayon/<category>/<name>.svg` and are
auto-discovered (via `import.meta.glob`) by the registry in
`src/components/crayon/crayonRegistry.ts`. **No wiring needed**: drop a
spec-compliant SVG in the folder and it is instantly usable.

Categories: `icons/` (subject + UI), `spots/` (larger illustrations),
`flourishes/` (dividers, underlines, arrows), `accents/` (stars, sparkles,
highlight scribbles).

### Using art: `<CrayonArt>`

```tsx
import { CrayonArt } from '@/components/crayon'; // or '../components/crayon'

<CrayonArt name="beaker" size={34} color="sky" animate="draw" title="Chemistry" />
```

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `name` | string |: | SVG file name without `.svg` (e.g. `beaker`) |
| `size` | number \| string | `1.5em` | Square box. Number => px |
| `width` / `height` | number \| string |: | Override for wide art (dividers/underlines) |
| `color` | `ink\|sky\|berry\|sunshine\|leaf\|grape\|paper` | `ink` | Sets `currentColor` for `currentColor` paths |
| `animate` | `none\|draw\|wiggle` | `none` | `draw` = self-drawing strokes; honors reduced-motion |
| `title` | string |: | If set: accessible image with this label. If omitted: `aria-hidden` (decorative) |

Subject → icon helper (for module cards, nav, filters):

```tsx
import { crayonArtForTags } from '@/components/crayon/subjectArt';
const art = crayonArtForTags(module.tags); // { name, color }
<CrayonArt name={art.name} color={art.color} size={34} />
```

Preview every asset live at the **`/crayon`** route (gallery).

---

## Authoring a new crayon SVG (the spec)

Follow this so the drawing recolors with the system and animates cheaply.

1. **Location & name**: `src/assets/crayon/<category>/<kebab-name>.svg`. The file
 name is the `name` prop. Use lowercase-kebab (`open-book`, not `OpenBook`).
2. **Canvas**: square `viewBox="0 0 100 100"` for icons/spots/accents. For wide
 flourishes use a wide viewBox (e.g. `0 0 200 22`) and add
 `preserveAspectRatio="none"` if it should stretch.
3. **No `width`/`height`** attributes on the root `<svg>` (the component sizes it).
4. **Colors via classes, never hardcoded hex.** Use:
 - Fills: `crayon-fill-sky | crayon-fill-berry | crayon-fill-sunshine |
 crayon-fill-leaf | crayon-fill-grape | crayon-fill-paper | crayon-ink`
 - Strokes: `crayon-stroke-ink | crayon-stroke-sky | crayon-stroke-berry |
 crayon-stroke-sunshine | crayon-stroke-leaf | crayon-stroke-grape`
 - For art that should follow the `color` prop, use literal
 `stroke="currentColor"` / `fill="currentColor"` instead of a class.
5. **Crayon look (baked wobble)**: draw slightly irregular paths; use
 `stroke-linecap="round"`, `stroke-linejoin="round"`, and chunky
 `stroke-width` (~5 in a 100 box). Do not rely on a runtime filter.
6. **Draw-on animation (optional)**: add `pathLength="1"` and the `crayon-draw`
 class to each stroke you want to self-draw.

### Copy-paste template

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
 <!-- fill shape sits behind the ink outline -->
 <path class="crayon-fill-sky" d="M..." opacity="0.9"/>
 <!-- ink outline, draws itself -->
 <path class="crayon-draw crayon-stroke-ink" pathLength="1"
 d="M..." stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

---

## Usability rules (do not break)

- Crayon art is **decoration and illustration only**. Never place it on top of
 data, form controls, or anything that must stay precise. Visualizer canvases
 and body text stay crisp.
- Default art to **decorative** (`aria-hidden`, i.e. no `title`). Only add a
 `title` when the drawing conveys real meaning.
- All motion respects `prefers-reduced-motion` (handled in `src/index.css`).
