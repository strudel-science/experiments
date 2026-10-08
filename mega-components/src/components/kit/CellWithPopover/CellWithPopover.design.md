# CellWithPopover

A data-table cell enhancement suite comprising `CellWithPopover` and `ArrayWithPopover` that gracefully truncates expansive text or multi-value arrays while providing instant, accessible portal overlays on hover or click.

## Scientific Motivation

Scientific datasets are notorious for high-dimensional metadata, extended identifier strings (e.g. NCBI GenBank accessions, PDB IDs, DOIs, Ensembl identifiers), verbose ontological classifications (such as Gene Ontology terms or ENVO biome terms), and multi-value sample attributes. In data grids and dense tabular views, displaying full strings disrupts grid alignment and overwhelms screen real estate. `CellWithPopover` maintains high information density in the primary table layout without sacrificing immediate access to complete metadata details.

## Usage Guidelines

- Use `CellWithPopover` inside table cells, metadata grids, or compact list rows where content length can exceed the column or container boundary.
- Specify `maxWidth` to constrain cell width and enforce ellipsis truncation.
- Use `ArrayWithPopover` when displaying lists of tags, taxonomy classifications, or multiple sample keywords within a single cell. Set `maxVisible` to control how many chips render inline before collapsing remaining items into a "+N more" badge.
- Ensure the popover overlay provides legible typography, high contrast, and accessible focus states for keyboard users.

## Inspiration Sources

- STRUDEL Design System: Data Table and Task Flow patterns (https://strudel.science)
- STRUDEL Kit upstream React Components: `CellWithPopover` and `ArrayWithPopover` (https://github.com/strudel-science/strudel-kit)
- NMDC Data Portal: Biosample search results and multi-omics data tables (https://data.microbiomedata.org)
- Materials Project: Materials details and calculation property grids (https://next-gen.materialsproject.org)
