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