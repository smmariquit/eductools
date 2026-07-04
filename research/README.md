# Research

Deep-research prompts for EduVisualsPH. Each markdown file here is a single,
self-contained prompt you can hand to a deep-research tool (or another agent) to
gather the sourced, primary-document-backed material that later becomes a
visualizer, a deep-dive, or a blog post.

These files are **prompts and their findings**, not site content. Finished
writing lives in `src/content/` and must still follow the house rules below when
it ships. The point of this folder is to do the sourcing work once, in the open,
so the article that follows can trace every claim to a real source.

## What goes in a prompt

Start from [`_template.md`](./_template.md). Every prompt should make these
explicit so the research comes back usable:

- **Objective**: the one question the research must answer.
- **Target**: the tool/article it feeds, and the MATATAG grade band and subject
 (cross-checked against `docs/curriculum-guides/`).
- **Key questions**: the specific sub-questions to chase down.
- **Source requirements**: primary sources only, with live URLs. Republic Acts
 via LawPhil, agency facts via the agency (DepEd, PSA, PAGASA, BIR), science via
 the authoritative org (OpenStax, OECD, World Bank, the journal). No guessed
 URLs; every link must resolve.
- **Output format**: usually a findings section with each claim followed by its
 citation, ready to drop into a `<Sources>` block.
- **Constraints**: describe MATATAG and DepEd neutrally and factually; no
 unqualified benefit claims; flag anything that cannot be sourced rather than
 inventing it.

## Naming

`<topic-slug>.md`, matching the content/tool id where one exists so the prompt and
its article line up (for example `density.md`, `digital-divide.md`). Use a short
descriptive slug for exploratory topics that do not map to a tool yet.

## Workflow

1. Copy `_template.md` to `<topic-slug>.md` and fill in the prompt.
2. Run the deep research; paste the sourced findings back into the same file
 under a "Findings" section, with live links.
3. Verify every link loads before relying on it
 (`curl -sS -o /dev/null -m 25 -L -A "Mozilla/5.0" -w "%{http_code}" <url>`).
4. Write the article in `src/content/`, carrying the sources into its
 `<Sources>` block.

## Related rules and references

- Writing voice, sourcing, and MATATAG neutrality: `.cursor/rules/writing-tone.mdc`
- Curriculum alignment and grade bands: `.cursor/rules/curriculum-guides.mdc` and
 `docs/curriculum-guides/`
- Source selection and licensing for curriculum content:
 `.cursor/skills/citing-curriculum-content/SKILL.md`
