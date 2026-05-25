# KUBECA Website Architecture

This site is intentionally kept as a static, no-build website while the pitch and design language are still evolving. The code is split into small browser scripts loaded in order from `index.html`.

## Narrative Spine

The site follows `KUBECA_Investor_Website_Storyline.pdf` as the source of truth.

Public homepage:

1. `01 / HERO` - cinematic positioning for KUBECA as one supervised mission system for coordinated aerial autonomy.
2. `THE SYSTEM SHIFT` - a short investor bridge: bottleneck -> system layer -> first aerial configuration.

Investor Room:

1. `01 / WHY THIS MATTERS` - why isolated drone operations fail.
2. `02 / THE KUBECA SYSTEM` - the architecture: carrier / relay, local drone teams, mission intelligence, shared spatial data, and human oversight.
3. `03 / OUR PRODUCTS` - the configurable product stack: carrier platform, mission modules, local drone teams, and mission software.
4. `04 / WHERE KUBECA CREATES VALUE` - one initial defense focus and two explicit expansion paths.
5. `05 / CONTACT` - a single direct conversation path.

Rule of thumb:

- The homepage creates belief and frames the investment story before detailed evidence.
- The Investor Room provides evidence.
- `Why This Matters` owns the problem.
- `The KUBECA System` owns the coordinated mission-system explanation and closes with a brief future connected-assets teaser.
- `Our Products` owns the configurable product stack and the detailed future connected-asset extension.
- `Where KUBECA Creates Value` owns the market opportunity, without adding product claims.
- `Contact` closes with one clear next step.

## JavaScript Modules

- `assets/js/dom.js`: DOM references and shared runtime state.
- `assets/js/data.js`: deck/menu content and story detail content.
- `assets/js/auth.js`: private preview password gate.
- `assets/js/menu.js`: mega-menu open/close, collapsible groups, active state, and deck grouping.
- `assets/js/renderers.js`: chapter metadata and HTML render functions.
- `assets/js/panels.js`: detail overlays, deck overlays, product detail panels, scroll locking.
- `assets/js/story.js`: inline story detail and scroll-driven story state.
- `assets/js/events.js`: event wiring only.
- `assets/js/app-init.js`: startup/init code only.

## Adding a New Investor Section

1. Add the menu row/subtopics in `index.html`.
2. Add matching `deckData` entries in `assets/js/data.js`.
3. If the section needs a custom visual page, add chapter metadata and a renderer in `assets/js/renderers.js`.
4. Keep CSS selectors scoped by chapter class, for example `.chapter-page-build` or `.chapter-page-generic`.

## Design-System Direction

Keep the chapter language consistent:

- one small chapter header, e.g. `03 / THE KUBECA SYSTEM`;
- one dominant headline;
- one strong visual or diagram;
- thin dividers and large whitespace;
- avoid repeating the same system definition in multiple sections.
