# KUBECA Website Architecture

This site is intentionally kept as a static, no-build website while the pitch and design language are still evolving. The code is split into small browser scripts loaded in order from `index.html`.

## Narrative Spine

The investor-room menu follows `KUBECA_Website_Pitch_Roadmap_v2-1.pdf`:

1. Hero
2. Why This Matters
3. Why Now
4. What We Build
5. How It Works
6. What It Enables
7. Why We Win
8. Market Areas
9. Team / Validation
10. CTA

Rule of thumb:

- `What We Build` defines the product architecture.
- `How It Works` explains the mission sequence.
- `What It Enables` explains outcomes and use cases.
- `Why We Win` holds deeper technology and defensibility.

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

- one small chapter header, e.g. `04 / WHAT WE BUILD`;
- one dominant headline;
- one strong visual or diagram;
- thin dividers and large whitespace;
- avoid repeating the same system definition in multiple sections.
