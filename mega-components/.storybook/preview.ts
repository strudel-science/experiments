import type { Preview } from "@storybook/react-vite"
import "../src/index.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Getting Started", "Scientific Components", "UI Primitives"],
      },
    },
    a11y: {
      test: "todo",
    },
  },
}

export default preview

