import type { Meta, StoryObj } from '@storybook/react';
import { ClickToCopy } from './ClickToCopy';
import { TooltipProvider } from '@/components/ui/tooltip';

const meta: Meta<typeof ClickToCopy> = {
  title: 'Scientific Components/ClickToCopy',
  component: ClickToCopy,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="p-4 flex items-center gap-4">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
  argTypes: {
    text: { control: 'text' },
    label: { control: 'text' },
    copiedLabel: { control: 'text' },
    timeout: { control: 'number' },
    variant: {
      control: 'select',
      options: ['ghost', 'outline', 'secondary', 'default'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'xs', 'icon', 'icon-sm', 'icon-xs'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClickToCopy>;

export const Default: Story = {
  args: {
    text: 'doi:10.1038/s41586-023-06283-x',
  },
};

export const WithIdentifierText: Story = {
  args: {
    text: 'nmdc:bsm-11-0000001',
    children: 'nmdc:bsm-11-0000001',
    variant: 'outline',
  },
};

export const MonospaceCodeSnippet: Story = {
  args: {
    text: 'curl -X GET "https://api.microbiomedata.org/biosample/12345"',
    children: 'curl -X GET "https://api.microbiomedata.org/biosample/12345"',
    variant: 'secondary',
  },
};
