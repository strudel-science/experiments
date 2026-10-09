import type { Preview } from '@storybook/react-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/theming';
import { useEffect, useState, type PropsWithChildren } from 'react';
import '../src/index.css';

const ThemedDocsContainer = ({ children, context }: PropsWithChildren<DocsContainerProps>) => {
  const getInitialTheme = () => {
    const channelTheme =
      (context as any)?.store?.userGlobals?.globals?.theme ??
      (context as any)?.store?.globals?.globals?.theme ??
      (context as any)?.globals?.theme;
    if (channelTheme) return channelTheme;
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  };

  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);

  useEffect(() => {
    const channel = context.channel;
    if (!channel) return;

    const handleGlobalsUpdated = ({ globals }: { globals?: Record<string, any> }) => {
      if (globals && 'theme' in globals) {
        const nextTheme = globals.theme || 'light';
        setCurrentTheme(nextTheme);
      }
    };

    channel.on('globalsUpdated', handleGlobalsUpdated);
    return () => {
      channel.off('globalsUpdated', handleGlobalsUpdated);
    };
  }, [context]);

  const isDark = currentTheme === 'dark';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, [isDark]);

  return (
    <DocsContainer context={context} theme={isDark ? themes.dark : themes.light}>
      {children}
    </DocsContainer>
  );
};

const preview: Preview = {
  parameters: {
    docs: {
      container: ThemedDocsContainer,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Getting Started', 'Scientific Components', 'UI Primitives'],
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
