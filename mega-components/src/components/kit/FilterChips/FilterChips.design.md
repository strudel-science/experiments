# FilterChips

A compact, accessible group of dismissible chips representing currently active search and facet filters, with facet category indicators, individual dismissal, and batch "Clear all" actions.

## Scientific Motivation

Scientific data portals (such as NMDC, Materials Project, cBioPortal, and GBIF) allow researchers to slice multi-dimensional datasets across complex facet hierarchies (e.g. Environmental Biome, Sequencing Technology, Host Organism, Temperature Range, Crystal System). When users apply filters across disparate sidebar accordions and nested menus, they need an immediate, persistent summary of their active query state. `FilterChips` provides explicit visual feedback on what criteria are constraining their results and allows quick adjustments or complete resets without navigating deep facet trees.

## Usage Guidelines

- Place `FilterChips` directly above data grids, search results, or visualization dashboards.
- Use the `category` property to clearly distinguish which attribute a filter value belongs to (e.g., `Biome: Soil`, `Technology: PacBio`).
- Provide an `onRemove` handler to remove individual filter constraints and an `onClearAll` handler to reset the entire facet filter state.
- Set `maxVisible` when screen real estate is limited or when queries may involve dozens of active facets, enabling a clean "+N more" expander toggle.
- Do not render the container when no filters are active to avoid visual noise.

## Inspiration Sources

- STRUDEL Design System: Filter and Search Task Flow patterns (https://strudel.science)
- STRUDEL Kit upstream React Components: `Filters` and `FilterGroup` (https://github.com/strudel-science/strudel-kit)
- NMDC Data Portal: Active Facet Filter bars (https://data.microbiomedata.org)
- Materials Project: Explorer active filter chips (https://next-gen.materialsproject.org)
