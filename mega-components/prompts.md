## 10/06/2026 04:32 PM

I want to begin implementing the Mega Components Library as described in the attached AGENTS.md specification file. Please ask questions if anything is confusing or needs my input. This should be an initial pass. We will continue to develop this library iteratively. However, I do want the initial version to be usable and runnable. All generated code for this library should be housed in experiments/mega-components/.

## 10/06/2026 05:09 PM

Move the custom science focused components into their own subdirectory under components called lab

## 10/06/2026 05:22 PM

move all the utils into one src/utils.ts file. And I think we can get rid of src/lib/utils. I don't know why it's there.

## 10/06/2026 06:06 PM

@[mega-components/.oxlintrc.json] add a rule about preferring arrow functions

### 06:12 PM

I do want to also want to disallow function declarations in favor of const foo = () => ... function expressions across the codebase

### 06:17 PM

Now fix all the linting errors introduced by these new rules

## 10/07/2026 05:18 PM

This all sounds good please implement but consider the following:

The formatFileSize parameter name should be binaryPrefix not just binary.

Note the new instructions in /Users/ctodonnell/Documents/Projects/Strudel/code/experiments/mega-components/AGENTS.md about .design.md files for components:

>## Custom Components
>
>Customized components should live in `src/components/kit` while components brought in directly from shadcn/base-ui should live in `src/components/ui`.
>
>When writing a new custom component, it should always have its own new directory in `src/components/kit` that is named after the component itself (e.g. `MyCustomComponent/`). Inside the component's directory should live its main component file (e.g. `MyCustomComponent.tsx`), its unit test file (e.g. `MyCustomComponent.test.tsx`), its storybook story file (e.g. `MyCustomComponent.stories.tsx`), and its design file (e.g. `MyCustomComponent.design.md`).
>
>### Component Design Files (`.design.md`)
>
>The design file (`.design.md`) for each component should be a human-readable and agent-readable specification that describes four things about the component: Brief Description, Scientific Motivation, Usage Guidelines, and Inspiration Sources. Use the below as a template:
>
>```md
># {{ ComponentName }}
>
>{{ brief description of the component }}
>
>## Scientific Motivation
>
>{{ describe why this component is important for scientific web applications }}
>
>## Usage Guidelines
>
>{{ describe when and how this component should be used }}
>
>## Inspiration Sources
>
>- {{ list links to sources that inspired the inclusion of this component }}
>```

## 10/08/2026 11:32 AM

I want the theme selection in storybook (light or dark) to be in sync with the ThemeProvider from @[mega-components/src/components/theme-provider.tsx] . Is that possible?

### 11:35 AM

yes implement

### 11:38 AM

issue: Cannot find module or type declarations for side-effect import of '../src/index.css'.ts(2882)

### 11:43 AM

This also needs to be synced with the native storybook "background" value. I would also like the storybook body to change from light to dark when this option changes (not just the demo blocks) /boost

### 12:25 PM

I can't accept these changes. They are far too complex and they produce errors on the frontend ui. The UI flashes back and forth repeatedely between light and dark when toggling. It would be better if there were not two buttons. Only implement a fix if it can be far more comprehensible and simplified.