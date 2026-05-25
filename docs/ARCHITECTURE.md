# KUBECA Website Architecture

This site is intentionally kept as a static, no-build website while the pitch and design language are still evolving. The code is split into small browser scripts loaded in order from `index.html`.

## Narrative Spine

The site follows `KUBECA_Investor_Website_Storyline.pdf` as the source of truth.

Public homepage:

1. `01 / HERO` - cinematic positioning for KUBECA as the mission intelligence layer for coordinated aerial autonomy.

Investor Room:

2. `02 / WHY THIS MATTERS` - why isolated drone operations fail.
3. `03 / THE KUBECA SYSTEM` - the architecture: carrier / relay, local drone teams, mission intelligence, shared spatial data, and human oversight.
4. `04 / HOW A MISSION WORKS` - the short mission sequence: Deploy -> Release + Relay -> Explore + Map -> Understand -> Confirm + Control.
5. `05 / WHAT IT ENABLES` - outcomes and spatial-intelligence value.
6. `06 / WHERE KUBECA CREATES VALUE` - operational use cases and market areas.
7. `07 / FIELD VALIDATION` - platform work, GPS-denied software testing, fixed-wing flight, spatial understanding, and operator / defense feedback.
8. `08 / ROADMAP` - milestone path to integrated system demonstration.
9. `09 / CTA` - partnership and mission brief request.

Rule of thumb:

- The homepage creates belief.
- The Investor Room provides evidence.
- `Why This Matters` owns the problem.
- `The KUBECA System` owns product architecture.
- `How A Mission Works` owns the mission flow only.
- `What It Enables` owns spatial-intelligence outcomes.

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
