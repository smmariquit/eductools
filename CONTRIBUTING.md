# Contributing to EduVisualsPH

Thanks for helping make STEM learning more accessible. Contributions of all
sizes are welcome: fixing a typo, correcting a scientific inaccuracy, improving
a Filipino translation, adding a visualizer, or writing a deep-dive article.

## Ways to contribute

- **Report a problem** — open an issue. Scientific or factual errors are high
  priority; please include a source if you can.
- **Suggest a module or feature** — open a feature request describing the topic,
  the target grade level, and what the interaction should teach.
- **Send a pull request** — for code, content, or docs.

## Local setup

Prerequisites: **Node.js 20+** and npm.

```bash
git clone https://github.com/smmariquit/eduvisualsph.git
cd eduvisualsph
npm install
npm run dev
```

Before opening a PR, make sure these pass:

```bash
npm run lint
npm run build
```

## Project conventions

This repo ships machine-readable conventions in `.cursor/rules/`. They apply to
human and AI contributors alike — please skim them:

- `writing-tone.mdc` — how prose should read, and the link-and-verify rule.
- `mdx-changelog.mdc` — edit tracking for articles (see below).
- `curriculum-guides.mdc` — how to use the bundled DepEd curriculum guides.

Sourcing guidance lives in `.cursor/skills/citing-curriculum-content/`.

## Writing or editing articles (`src/content/**/*.mdx`)

Articles are MDX. A few non-negotiables:

1. **Cite specifics.** Any law, statistic, study, or agency figure must link to a
   primary source you have confirmed is live:
   ```bash
   curl -sS -o /dev/null -m 25 -L -A "Mozilla/5.0" -w "%{http_code}" <url>
   ```
2. **Add a visual where it helps.** Use the content components instead of dumping
   numbers into a table:
   ```mdx
   import { BarChart, Sources, Changelog } from '../../components/content'
   ```
   `<BarChart>` for comparisons/breakdowns (values must match the cited figure
   exactly), `<Figure>` for credited images.
3. **Always end with `<Sources>`** — a numbered list of the primary references the
   article relies on, each with a live URL.
4. **Always end the file with `<Changelog>`.** On every edit, bump `updated` to
   today and prepend a one-line entry. History is append-only.
   ```mdx
   <Changelog
     updated="2026-06-18"
     entries={[
       { date: "2026-06-18", note: "Fixed the friction figure and its citation." },
       { date: "2026-06-15", note: "Initial article." },
     ]}
   />
   ```
   A project hook auto-stamps the `updated` date as a backstop, but you are
   responsible for writing the changelog note.
5. **Keep math in KaTeX** (`$...$` / `$$...$$`) and do not break the syntax.

## Adding a visualizer

1. Register it in `src/data/registry.ts` (id, title, description, path, tags).
2. Build the React component under `src/pages/` or `src/components/` and wire its
   route.
3. Add a matching deep-dive article at `src/content/deep-dives/<id>.mdx`.
4. Prefer small, dependency-light, offline-friendly implementations — many users
   are on low-end phones and weak connections.

## Pull request checklist

- [ ] `npm run lint` and `npm run build` pass.
- [ ] Article edits include updated `<Sources>` and `<Changelog>`.
- [ ] New claims are linked to verified primary sources.
- [ ] Any third-party content respects its license (PhET, CK-12, OpenStax, etc.).
- [ ] The change is described clearly in the PR body.

## Code style

- TypeScript + React function components and hooks.
- Tailwind v4 + DaisyUI for styling; reuse the existing "crayon" design tokens.
- Keep comments for non-obvious intent only.

## License of contributions

By contributing, you agree your code is licensed under the project's
[Apache License 2.0](./LICENSE). Do not submit third-party content unless its license
permits inclusion and you attribute it correctly.
