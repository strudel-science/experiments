# PageHeader

A semantic, responsive top-level page header component providing breadcrumb hierarchy, primary title (`h1`) with optional status badges, introductory abstract or description, action button slots, and contextual metadata.

## Scientific Motivation

Scientific applications frequently organize complex entities into deep taxonomic or structural hierarchies — such as Project > Study > Biosample > Omics Processing Run, or Material Class > Crystal System > Compound > Calculation. Users navigating these deep structures need consistent visual orientation (breadcrumbs), clear status badges (e.g. data curation status, quality check flags, or embargo periods), and rapid access to primary workflow actions (such as downloading raw data, initiating analysis pipelines, or citing the entry). `PageHeader` standardizes this essential landmark across data portals, detail pages, and task flows.

## Usage Guidelines

- Place `PageHeader` at the top of main page layouts, detail views, and multi-step task flows.
- Use `breadcrumbs` to show hierarchical pathing back to parent collections or index views. The current page should be highlighted without a hyperlink.
- Render the primary entity name or dataset title in `title`. Use `badge` to convey lifecycle states (e.g., "Draft", "Curated", "Public", "Failed QC").
- Use `actions` for the primary actions pertinent to the view (e.g., "Download Data", "Run Analysis", "Share", "Export Citation").
- Use `metadata` to surface secondary provenance details such as DOIs, accession numbers, last modified timestamps, or contributor attributions.

## Inspiration Sources

- STRUDEL Design System: Task Flow Layout and Page Header patterns (https://strudel.science)
- STRUDEL Kit upstream React Templates: `PageHeader` (https://github.com/strudel-science/strudel-kit)
- NMDC Data Portal: Biosample and Omics Processing detail views (https://data.microbiomedata.org)
- RCSB Protein Data Bank: Structure summary headers (https://www.rcsb.org)
