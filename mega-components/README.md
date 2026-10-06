# Mega Components Library

A reusable frontend component library for science and research-focused web applications, adhering to patterns established by [STRUDEL](https://strudel.science), NMDC, Materials Project, and other scientific software projects.

## Tech Stack & Architecture

- **React 19 & TypeScript**: Strict, functional component design with full JSDoc documentation.
- **shadcn / Base UI**: Built on unstyled primitives (`@base-ui/react`) styled with Tailwind CSS.
- **Tailwind CSS v4**: Themeable design system using semantic CSS variables.
- **shadcn Registry**: Distributable via `registry.json` and built to `public/r/`.
- **Storybook 10**: Component explorer and documentation.
- **Vitest**: Fast test runner with DOM testing library support.
- **Oxlint & Oxfmt**: High-performance Rust-based linting and formatting.

## Initial Components

- [`ChemicalFormula`](src/components/ChemicalFormula/ChemicalFormula.tsx): Typographic subscripting for chemical formulas, hydrate dots, and complex ions.
- [`LinearMeter`](src/components/LinearMeter/LinearMeter.tsx): Accessible progress and threshold bar with ARIA meter semantics.
- [`LabelValueTable`](src/components/LabelValueTable/LabelValueTable.tsx): Accessible two-column layout for scientific metadata and parameters.
- [`LinkCard`](src/components/LinkCard/LinkCard.tsx): Resource navigation cards for external data portals and internal workflows.
- Foundational Base UI Primitives: Button, Card, Badge, Tooltip (`src/components/ui/`).

## Scripts

```bash
# Start Vite development server
npm run dev

# Launch Storybook
npm run storybook

# Run Vitest test suite
npm run test

# Lint with Oxlint
npm run lint

# Check/apply code formatting with Oxfmt
npm run format

# Build shadcn registry JSON files
npm run registry:build

# Build production bundle
npm run build
```