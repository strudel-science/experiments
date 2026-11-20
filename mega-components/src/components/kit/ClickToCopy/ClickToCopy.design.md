# ClickToCopy

An accessible, streamlined button component that copies scientific identifiers, accessions, DOIs, checksums, or CLI commands to the user's clipboard with instant visual and screen-reader feedback.

## Scientific Motivation

Scientific workflows hinge on precise, error-free identifiers — such as NCBI GenBank accession numbers, DOI references, PDB structure codes, UniProt identifiers, MD5/SHA256 checksums, and workflow execution commands. Manual selection and copying of these dense, character-sensitive strings is error-prone and frustrating. `ClickToCopy` enables one-click replication of exact strings with immediate visual confirmation, preventing typos in downstream CLI analysis, literature citations, or data queries.

## Usage Guidelines

- Place `ClickToCopy` directly next to persistent identifiers (PIDs), sample IDs, DOIs, API keys, or snippet blocks.
- Use the child slot to render the identifier itself inside the button (`<ClickToCopy text={id}>{id}</ClickToCopy>`), or render as an icon-only button adjacent to an existing label.
- Provide custom `label` and `copiedLabel` props when the context demands domain-specific guidance (e.g., "Copy DOI" -> "DOI copied!").
- Keep timeouts within 1500ms - 2500ms so users clearly register that the copy succeeded without blocking subsequent interactions.

## Inspiration Sources

- STRUDEL Design System: Data Display and Identifier patterns (https://strudel.science)
- STRUDEL Kit upstream React Components: `ClickToCopy` (https://github.com/strudel-science/strudel-kit)
- GitHub UI: Repository clone URLs, commit SHA copy buttons, and file path copy widgets
- NCBI / PubMed Central: Citation and accession copy helpers
