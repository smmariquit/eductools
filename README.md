# EduVisualsPH

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

Free, interactive STEM visualizers and explainers for Philippine classrooms,
loosely aligned with the Department of Education's MATATAG curriculum. EduVisualsPH
runs as a Progressive Web App, works offline, and is built to be useful on a
cheap phone with a weak connection.

Live site: <https://eductools.ph>

## What's inside

- **Interactive visualizers** for Physics, Chemistry, Biology, Earth Science, and
 Math, built with `three` / react-three-fiber, `matter-js`, `cytoscape`, and `3dmol`.
- **Deep-dive articles** in MDX with real math (KaTeX), charts, and cited sources.
- **Offline-first PWA** so tools keep working when the network does not.
- **Programmatic SEO pages** (per-school) served by a separate Next.js app.

## Tech stack

| Area | Tooling |
|---|---|
| App (SPA) | Vite, React 19, React Router 7 |
| Styling | Tailwind CSS v4, DaisyUI v5 (single "crayon" theme) |
| Content | MDX (`@mdx-js/rollup`) with `remark-math` + `rehype-katex` |
| Visualizers | three.js / react-three-fiber, matter-js, cytoscape, 3dmol |

The app is a single-page Vite + React application.

## Getting started

Prerequisites: **Node.js 20+** and npm.

```bash
git clone https://github.com/smmariquit/eduvisualsph.git
cd eduvisualsph
npm install
npm run dev # Vite dev server (the main app)
```

Useful scripts:

```bash
npm run build # type-check + production build (tsc -b && vite build)
npm run lint # eslint
npm run preview # preview the production build
```

## Project layout

```
src/
 components/ Shared UI (Layout, Footer, content components, crayon art)
 content/ MDX building blocks: BarChart, Figure, Sources, Changelog
 crayon/ Hand-drawn SVG art system (CrayonArt + registry)
 content/
 blog/ Blog articles (.mdx)
 deep-dives/ Per-visualizer explainer articles (.mdx)
 data/ registry.ts (visualizers), blogPosts.ts, etc.
 pages/ Route components (Home, BlogPost, AboutUs, ...)
 index.css Tailwind v4 + DaisyUI theme + design tokens
.cursor/
 rules/ Project conventions (writing tone, MDX changelog, ...)
 skills/ Sourcing/citation workflow for curriculum content
 hooks/ afterFileEdit hook that stamps MDX "last updated" dates
```

## Writing and content standards

Articles are held to a specific bar, enforced by project rules in `.cursor/rules/`:

- **Voice** (`writing-tone.mdc`): write like a human expert; cite specific claims
 and link them to primary sources you have verified are live.
- **Visuals + sources**: add a chart where real data helps, and always end an
 article with a `<Sources>` block of verified references.
- **Edit tracking** (`mdx-changelog.mdc`): every `.mdx` ends with a `<Changelog>`;
 any edit bumps the `updated` date and appends a one-line note. A Git-tracked
 `afterFileEdit` hook auto-stamps the date as a backstop.
- **Sourcing** (`.cursor/skills/citing-curriculum-content/`): how to pick and
 license curriculum and subject-matter sources.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow.

## Contributing

Issues and pull requests are welcome: bug fixes, scientific corrections, new
visualizers, translations, and docs. Start with [CONTRIBUTING.md](./CONTRIBUTING.md)
and our [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

Source code is released under the [Apache License 2.0](./LICENSE).

Bundled or referenced **educational content** from third parties keeps its own
license: for example PhET (CC-BY 4.0), CK-12 (CC-BY-NC 3.0), OpenStax
(CC-BY 4.0), and Philippine government works (DepEd, DOST-SEI). Respect those
terms when reusing content. EduVisualsPH is an independent project and is not
affiliated with or endorsed by DepEd or any government agency.
