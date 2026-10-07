# Mega Components Library - Agent Specs

This is the specification document for the Mega Components Library. It is intended to be consumed by agents to help with the generation of code for this library.

## Overview

The Mega Components Library is an attempt to build a comprehensive reusable frontend component library for science and research focused web applications. It should take into account patterns identified by:
- STRUDEL
  - Website: https://strudel.science
  - GitHub: https://github.com/strudel-science/strudel-kit
- And other similar projects

It should also incorporate elements and patterns from other existing scientific UI tools and repositories such as:
- NMDC
  - Website: https://data.microbiomedata.org
  - GitHub: https://github.com/microbiomedata/nmdc-server
- TA Connect
  - Website: https://taconnect.lbl.gov
  - GitHub: https://github.com/lbnl-emp-ta/ta-connect
- RIVER
  - Website: https://river.lbl.gov
  - GitHub: local only
- PROMMIS Superstructure UI
  - Website: not live
  - GitHub: https://github.com/prommis/prommis-ui
- Science Capsule
  - Website: not live
  - GitHub: local only
- Materials Project
  - Website: https://next-gen.materialsproject.org
  - GitHub: https://github.com/materialsproject/mp-react-components

## Types of Web Applications

The components in the library should broadly target science and research focused web applications. These include data portals, high-performance computing applications, data analysis apps, data exploration apps, agentic science, scientific workflows, scientific user facilities, and others. The primary domains of interest are biology, materials science, HPC, environmental science, physics, and astronomy. These components should consider these domains specifically but this is not a hard boundary.

## Architecture

### Starting Point

The component library should use the strudel-kit's react-components package (`/strudel-kit-upstream/packages/react-components`) as an inspirational starting point.

### Libraries and Tools

The component library should utilize the latest stable versions of these specific libraries and tools:
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/) as the primary frontend framework.
- [shadcn/ui](https://ui.shadcn.com/) as the starting component library.
- [Base UI](https://base-ui.com/) as the primitive component library used by shadcn.
- [Tailwind](https://tailwindcss.com/) for theming and styling (incorporated with shadcn).
- [Vite](https://vite.dev/) provides the development server and production build.
- [Storybook](https://storybook.js.org/) for component examples and implementations.
- [Vitest](https://vitest.dev/) for tests.
- [Storybook Vitest addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon) for combining stories and tests.
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) for linting.
- [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) for code formatting.
- (if necessary) [Tanstack Router](https://tanstack.com/router/latest) provides file-based routing.
- (if necessary) [Tanstack Query](https://tanstack.com/query/latest) loads, caches, and mutates server data.

### Structure

The library should be structured as a reusable component library that will be distributable through the [shadcn registry](https://ui.shadcn.com/docs/registry).

There should also be a set of shared utility functions for commons computations that are used across components (e.g. converting snake_case to Title Case).

## Code Style

- Generally follow the guidance laid out here: https://react-typescript-style-guide.com/
- Code should be readable by humans and use understandable variable names
- Code should generally be functional
- Props should always have docstrings
- Components should always have docstrings
- Always import and use react methods explicitly (e.g. `useState()`) instead of using the base `React` variable for everything (e.g. `React.useState()`)

