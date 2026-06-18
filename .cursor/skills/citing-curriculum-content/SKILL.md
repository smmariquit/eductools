---
name: citing-curriculum-content
description: Vetted, citable sources for Philippine curriculum and STEM subject matter, with license/reuse rules. Use when writing or fact-checking EduVisualsPH content (blog posts, MDX deep dives, visualizer descriptions, SEO copy), citing facts, claiming DepEd or MATATAG curriculum alignment, mapping topics to grade levels, or choosing references to quote or embed. Covers DepEd MATATAG and K to 12 (2016) curriculum guides, the LRMDS portal, PhET, DOST-SEI, CK-12, and OpenStax, plus their licenses and known content gaps.
---

# Citing Curriculum Content

Use vetted sources when writing/fact-checking EduVisualsPH content. The full
catalog (URLs, dates, reliability, licenses, references) is in
[sources.md](sources.md) — read it when you need details.

## Workflow

1. **Verify curriculum alignment** against the local DepEd guides in
   `docs/curriculum-guides/` first. They are the binding scope/sequence.
2. **Determine the target grade's framework.** Philippine basic ed is mid-
   transition: MATATAG (2023) rolls out by phase through ~2028; other grades
   still use K to 12 (2016). State which one a claim refers to; don't assume
   parity. Topic grade-placement shifted under MATATAG.
3. **Pick the source** (see shortlist below) and confirm the URL + license on
   the source site — Deep Research output can be stale or wrong.
4. **Check the license against commercial use** (see next section) before
   copying text/figures or embedding.
5. **Cite with attribution.** Use the reference format in sources.md.
6. **Write neutrally** — see the `writing-tone` rule. Don't glaze MATATAG.

## License vs. commercial use (READ THIS)

EduVisualsPH serves ads (AdSense), so it is a **commercial** site. That changes what
is reusable:

| Source | License | Can EduVisualsPH reuse text/figures? |
|--------|---------|-----------------------------------|
| PhET, OpenStax | CC-BY 4.0 | Yes — quote/adapt/embed with attribution (commercial OK) |
| CK-12 FlexBooks | CC-BY-NC 3.0 | No verbatim reuse — **cite/link only** (NC excludes ad-supported) |
| DepEd MATATAG CGs, Shaping Papers | PH govt work | Yes — quote/summarize/cite with attribution |
| DepEd LRMDS modules | DepEd © | **Cite/link only** — not for commercial reuse |
| DOST-SEI courseware | DOST-SEI © | **Cite/link only** — permission needed for reuse |

Default rule: write content in your own words and **cite** the source. Only
copy/adapt text or figures from CC-BY sources (PhET, OpenStax) or DepEd
public-domain documents.

## Best single source per subject

- **Curriculum alignment (all subjects):** DepEd MATATAG Curriculum Guides
  (legally binding scope/sequence) + local `docs/curriculum-guides/`.
- **Physics / Chemistry / Earth Science:** PhET Interactive Simulations.
- **Mathematics:** CK-12 FlexBooks (cite only) or OpenStax for Grades 9–10.
- **Philippine localization:** DOST-SEI courseware (cite only).

## Known gaps

- **Araling Panlipunan & Filipino:** little openly licensed interactive content.
  Rely on DepEd LRMDS text + primary historical/linguistic texts; build
  visualizers from scratch.
- **MATATAG-aligned third-party content:** none re-mapped yet (incl. DOST-SEI);
  do the cross-walk to competencies manually against `docs/curriculum-guides/`.
