---
version: alpha
name: Lathe Registry
description: "A dark, dense, evidence-first registry interface for reproducible Lathe CLI recipes. The system adapts Linear.app's restrained dark software-craft language to a registry and provenance workbench: near-black canvas, charcoal surface ladder, exact hairline borders, tight sans typography, mono command evidence, and one scarce Lathe green accent for primary action, focus, active state, and verified build signals."

colors:
  primary: "#22e6b5"
  primary-hover: "#5ff0cc"
  primary-focus: "#22e6b5"
  on-primary: "#03110d"
  ink: "#f7f8f8"
  ink-muted: "#c8d2d0"
  ink-subtle: "#8a9795"
  ink-tertiary: "#76827f"
  canvas: "#010605"
  surface-1: "#0b1111"
  surface-2: "#101818"
  surface-3: "#152020"
  surface-4: "#1a2827"
  hairline: "#203130"
  hairline-strong: "#2f4a47"
  hairline-tertiary: "#3a5c57"
  inverse-canvas: "#ffffff"
  inverse-surface-1: "#f5f7f7"
  inverse-ink: "#03110d"
  semantic-success: "#27c979"
  semantic-warning: "#d6a642"
  semantic-error: "#e16464"
  semantic-info: "#7aa7ff"
  semantic-overlay: "#000000"

typography:
  display-xl:
    fontFamily: "Inter, Geist Sans, SF Pro Display, -apple-system, system-ui, sans-serif"
    fontSize: 80px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -3px
  display-lg:
    fontFamily: "Inter, Geist Sans, SF Pro Display, -apple-system, system-ui, sans-serif"
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -1.8px
  display-md:
    fontFamily: "Inter, Geist Sans, SF Pro Display, -apple-system, system-ui, sans-serif"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -1px
  headline:
    fontFamily: "Inter, Geist Sans, SF Pro Display, -apple-system, system-ui, sans-serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.6px
  card-title:
    fontFamily: "Inter, Geist Sans, -apple-system, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: -0.4px
  subhead:
    fontFamily: "Inter, Geist Sans, -apple-system, system-ui, sans-serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: -0.2px
  body-lg:
    fontFamily: "Inter, Geist Sans, -apple-system, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: -0.1px
  body:
    fontFamily: "Inter, Geist Sans, -apple-system, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "Inter, Geist Sans, -apple-system, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: "Inter, Geist Sans, -apple-system, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  button:
    fontFamily: "Inter, Geist Sans, -apple-system, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0
  eyebrow:
    fontFamily: "Inter, Geist Sans, -apple-system, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.5px
  mono:
    fontFamily: "JetBrains Mono, Geist Mono, SF Mono, ui-monospace, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  xxl: 24px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-primary-pressed:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-primary-focused:
    backgroundColor: "{colors.primary-focus}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-secondary:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-tertiary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  text-input:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  text-input-focused:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  registry-table:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 0
  recipe-row:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xs}"
    padding: 16px
  recipe-card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  evidence-card:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  command-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.lg}"
    padding: 16px
  file-explorer:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.lg}"
    padding: 0
  action-panel:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 20px
  status-badge:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  status-badge-verified:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  status-badge-active:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  status-badge-success:
    backgroundColor: "{colors.semantic-success}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  status-badge-warning:
    backgroundColor: "{colors.semantic-warning}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  status-badge-error:
    backgroundColor: "{colors.semantic-error}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  status-badge-info:
    backgroundColor: "{colors.semantic-info}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  tertiary-meta:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-tertiary}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: 0
  nested-panel:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  floating-panel:
    backgroundColor: "{colors.surface-4}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  divider:
    backgroundColor: "{colors.hairline}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    height: 1px
    width: 100%
  divider-strong:
    backgroundColor: "{colors.hairline-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    height: 1px
    width: 100%
  divider-tertiary:
    backgroundColor: "{colors.hairline-tertiary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    height: 1px
    width: 100%
  overlay-scrim:
    backgroundColor: "{colors.semantic-overlay}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xs}"
    height: 56px
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: 64px 32px
---

## Overview

Lathe Registry is a recipe registry, multi-platform CLI download surface, and evidence workbench for reproducible Lathe CLI generation. It is not a general SaaS marketing site. The design should help engineers and agents answer three questions quickly: what CLI exists, how to download or build it for the required platform, and what inputs prove it is reproducible.

The visual foundation is adapted from Linear.app's restrained dark software-craft language: near-black canvas, charcoal surface ladder, precise hairline borders, compact rounded rectangles, tight sans typography, and product surfaces that carry the proof instead of decorative illustration. Lathe Registry changes the accent from Linear lavender to Lathe green and changes the protagonist from product screenshots to registry evidence: downloadable CLI binaries, recipe rows, pinned source hashes, generated catalogs, embedded Skills, build metadata, command snippets, and file explorers.

The interface should feel like a package registry crossed with a build provenance viewer. It is quiet, technical, and dense. The page should make reviewable state visible before persuasion: source refs, auth shape, smoke intent, generated outputs, stale or verified status, and copyable commands.

### Attribution

This design direction is inspired by Linear.app's dark, precise software-craft interface language. Lathe Registry uses that reference as a starting point, not as a clone: the product language, accent color, components, and information architecture are adapted for reproducible CLI recipes, provenance, and agent install workflows.

## Colors

The palette is a dark surface ladder with one green action signal.

- **Primary** ({colors.primary}) is Lathe green. Use it for the brand mark, primary CTAs, active search/filter state, focus rings, verified build state, and important copy actions. Do not use it as decorative fill across whole sections.
- **Canvas** ({colors.canvas}) is the page floor. It is almost black with a green undertone, not pure `#000000`.
- **Surface 1-4** ({colors.surface-1} through {colors.surface-4}) create hierarchy for registry tables, detail panels, nested evidence cards, and modal or popover surfaces.
- **Hairline** ({colors.hairline}) is the default border. Hairlines are the main depth mechanism.
- **Ink** ({colors.ink}) carries headings and primary text. Use muted ink tokens for metadata, commit hashes, source names, stale labels, and disabled artifacts.
- **Semantic colors** are secondary to the green accent. Use success, warning, error, and info only for build and validation state. Do not build a rainbow tag system.

## Typography

Use a single modern sans voice with a strict mono layer.

- **Display and UI:** Inter or Geist Sans. Display is 500-600 weight with negative tracking. Avoid serif display and avoid playful display faces.
- **Body:** Inter or Geist Sans at 14-16px. Registry pages are information surfaces, so default body should stay readable but compact.
- **Mono:** JetBrains Mono or Geist Mono. Use mono for commands, recipe paths, pinned refs, schema names, catalog IDs, hashes, file tree labels, and code blocks.
- **Eyebrows:** Small, uppercase, slightly tracked labels mark evidence groups such as `Pinned sources`, `Generated outputs`, `Smoke intent`, `Recipe structure`, and `Install surface`.

Do not set full paragraphs in mono. Mono is an evidence layer, not the prose voice.

## Layout

Lathe Registry should open with the usable registry, not a marketing hero.

- **Home:** top nav, compact product introduction, search/filter toolbar, registry table or dense recipe cards. The first viewport should show at least one real recipe row.
- **Recipe detail:** workbench layout. Main column contains README/prose and file explorer. Right column contains CLI download/build actions, embedded Skill state, pinned sources, build metadata, and smoke command.
- **Submit:** contribution checklist and required recipe shape. It should read like a review guide, not a conversion form.
- **Containers:** max content width around 1280px. Keep wide tables and file explorers inside the content width, not floating edge to edge.
- **Spacing:** use 4px increments. Internal panel gaps should be 16-24px. Section gaps should be 64-96px depending on density.

The dark canvas is the whitespace. Do not create empty marketing bands just to add breathing room.

## Elevation & Depth

Depth is surface ladder plus hairline borders. Shadows should be rare.

| Level | Treatment | Use |
|---|---|---|
| 0 | {colors.canvas}, no border | Page background, nav floor |
| 1 | {colors.surface-1} with {colors.hairline} | Registry table, file explorer, primary cards |
| 2 | {colors.surface-2} with {colors.hairline-strong} | Selected rows, nested proof cards, sticky action panel |
| 3 | {colors.surface-3} or {colors.surface-4} | Popovers, command palette, active detail panels |
| Focus | {colors.primary-focus} outline | Keyboard focus and active search input |

Use command blocks, file previews, and pinned source metadata as the main visual density. Do not add atmospheric gradients, glow blobs, hero spotlights, or generic decorative code art.

## Shapes

The shape vocabulary is engineered and compact.

- Buttons and inputs use {rounded.md} 8px.
- Registry cards, evidence panels, and file explorers use {rounded.lg} 12px.
- Larger framed workbench panels may use {rounded.xl} 16px, but only when they contain dense UI.
- Badges and small status tags may use {rounded.pill}.
- Avoid pill CTAs for primary actions. Lathe Registry should feel like a tool, not a consumer app.

## Components

### Navigation

`top-nav` is a slim dark bar with the Lathe Registry mark, primary navigation, Submit, and GitHub. It should stay quiet. Do not include a large CTA cluster in the nav.

### Registry Table

`registry-table` is the homepage protagonist. It should support scanning and comparison.

Recommended columns:

- Recipe name and description
- CLI name
- Category
- Source count and pinned source names
- Build or Skill status
- Primary action

Rows should have hairline separation, not heavy card boxing. The active or hovered row may lift one surface step.

### Recipe Card

Use `recipe-card` only when a card layout is more useful than a table, such as mobile or a featured recipe strip. A card must show concrete metadata: CLI, category, auth, source count, smoke intent, and Skill state. Do not create vague marketing feature cards.

### Evidence Card

`evidence-card` displays proof units: pinned commit refs, generated catalog location, Skill bundle path, build timestamp, smoke command, checksum, or stale state. It should be compact and label-heavy.

### Command Card

`command-card` displays exact commands such as:

```sh
lathe registry show daocloud-dce
dc commands schema --json
dc search "list clusters" --json
```

Commands should be copyable when implemented. Use mono text, subdued chrome, and one green copy affordance.

### File Explorer

`file-explorer` is a core detail-page component. It has a left file tree and right preview. It should favor legibility over decoration. Long paths wrap or truncate predictably. Code panes keep horizontal scroll rather than wrapping generated code badly.

### Action Panel

`action-panel` is sticky on recipe detail pages. It owns CLI download/build actions, pinned source summary, auth note, embedded Skill state, and generated artifact state. It should never become a generic marketing sidebar.

### Status Badges

Use status badges for actual registry state:

- `Skill ready`
- `CLI pending`
- `Build verified`
- `Generated stale`
- `Auth required`
- `Pinned specs`

Do not invent trust badges that are not backed by repository data.

## Do's and Don'ts

### Do

- Lead with registry utility: search, rows, detail actions, and proof.
- Keep the Linear.app-inspired dark surface discipline: canvas, surface ladder, hairlines, restrained accent.
- Use Lathe green only for action, focus, active state, and verified status.
- Show real recipe data: source refs, paths, commands, generated CLI artifacts, embedded Skill state, smoke intent.
- Use mono for evidence tokens and commands.
- Keep components dense enough for repeat engineering use.
- Treat generated outputs as evidence and distribution material, not source of truth.
- Keep copy precise: recipe, source, catalog, CLI binary, embedded Skill, build metadata, smoke intent.

### Don't

- Don't make the homepage a giant marketing hero.
- Don't use Claude-style cream, serif, and coral editorial warmth here.
- Don't present unverified CLI binaries or platforms that the build did not produce.
- Don't imply install safety or artifact provenance unless the data exists.
- Don't use neon grid effects, glow-heavy terminal cosplay, or decorative command art.
- Don't add many accent colors for category tags. Use structure and text before color.
- Don't hide pinned refs, auth requirements, stale generated outputs, or pending artifacts.
- Don't use large rounded pills for core CTAs.
- Don't put cards inside cards.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Desktop XL | 1440px | Registry and workbench use full 1280px content width |
| Desktop | 1280px | Table remains primary; detail page uses main column plus sticky action panel |
| Tablet | 1024px | Detail action panel stacks below header or after main summary |
| Mobile Large | 768px | Registry table becomes stacked recipe cards; file explorer becomes file list plus preview |
| Mobile | 480px | Single column; display-xl scales down to display-md; command cards preserve horizontal scroll |

### Touch Targets

- Buttons and copy controls should be at least 40px tall on desktop and 44px on touch viewports.
- File tree rows should have enough height for accurate tap selection on mobile.
- Search input should stay immediately reachable on home mobile.

### Collapsing Strategy

- Homepage search stays above recipe results at every breakpoint.
- Table rows collapse into cards by preserving the same metadata order.
- Detail action panel moves below the recipe summary before long README content on mobile.
- Code and command blocks scroll horizontally instead of wrapping semantic tokens into unreadable fragments.

## Iteration Guide

1. Start from the evidence the repository already has. Do not invent registry fields.
2. Choose the surface level before styling a component.
3. Use `{colors.primary}` only when a user can act or when a verified state needs signal.
4. Prefer table/list density over decorative cards.
5. Add new component variants as separate `components:` entries.
6. Run `npx @google/design.md lint DESIGN.md` after edits.
7. If a design choice makes recipe review slower, remove it.

## Known Gaps

- This file defines the target design language before the site rewrite. It may need one pass after the first real implementation to align tokens with final CSS.
- Artifact provenance rules are not complete yet. UI must distinguish pending artifacts from verified artifacts.
- Binary distribution is intentionally out of scope until checksum, signing, retention, and platform rules exist.
- Linear.app is credited as visual inspiration, but Lathe Registry must not copy Linear brand assets, names, screenshots, or proprietary typefaces.
