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

There should also be a set of shared utility functions for common computations that are used across components (e.g. converting snake_case to Title Case).

## Code Style

- Generally follow the guidance laid out here: https://react-typescript-style-guide.com/
- Code should be readable by humans and use understandable variable names
- Code should generally be functional in style
- Props should always have docstrings
- Components should always have docstrings
- Always import and use react methods explicitly (e.g. `useState()`) instead of using the base `React` variable for everything (e.g. `React.useState()`)
- In most circumstances, use arrow function expression to define functions (including components) 

## Agent Behavior

- Always summarize and explain what you did and why you did it after making changes.
- Log my exact prompts in `prompts.md`.
  - Each initial prompt for a chat thread should be logged with ## while any follow-up prompts within that same thread should use ### and only show the time (not the full date).
  - If there are markdown headings inside the prompt, the headings and their inner content should be put into a blockquote.
  - Example:

```md
## 10/07/2026 5:00 PM

This is the first prompt in my first conversation thread.

### 5:07 PM

This is a follow-up prompt inside the first conversation thread.

### 5:11 PM

This is another follow-up prompt inside the first conversation thread.

> # This heading is part of the prompt
>
> Here is the content within that heading section

## 10/07/2026 5:31 PM

This is the first prompt in my second conversation thread.

### 5:38 PM

This is a follow-up prompt inside the second conversation thread.
```

## Custom Components

Customized components should live in `src/components/kit` while components brought in directly from shadcn/base-ui should live in `src/components/ui`.

When writing a new custom component, it should always have its own new directory in `src/components/kit` that is named after the component itself (e.g. `MyCustomComponent/`). Inside the component's directory should live its main component file (e.g. `MyCustomComponent.tsx`), its unit test file (e.g. `MyCustomComponent.test.tsx`), its storybook story file (e.g. `MyCustomComponent.stories.tsx`), and its design file (e.g. `MyCustomComponent.design.md`).

### Component Design Files (`.design.md`)

The design file (`.design.md`) for each component should be a human-readable and agent-readable specification that describes four things about the component: Brief Description, Scientific Motivation, Usage Guidelines, and Inspiration Sources. Use the below as a template:

```md
# {{ ComponentName }}

{{ brief description of the component }}

## Scientific Motivation

{{ describe why this component is important for scientific web applications }}

## Usage Guidelines

{{ describe when and how this component should be used }}

## Inspiration Sources

- {{ list links to sources that inspired the inclusion of this component }}
```
