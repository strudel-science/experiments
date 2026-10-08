import type { Meta, StoryObj } from '@storybook/react';
import { CellWithPopover, ArrayWithPopover } from './CellWithPopover';

const meta: Meta<typeof CellWithPopover> = {
  title: 'Scientific Components/CellWithPopover',
  component: CellWithPopover,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: { control: 'text' },
    truncate: { control: 'boolean' },
    openOnHover: { control: 'boolean' },
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CellWithPopover>;

export const Default: Story = {
  args: {
    maxWidth: '180px',
    children: 'ENSMUSG00000020122 - High mobility group AT-hook 2 (Hmga2)',
  },
};

export const CustomPopoverContent: Story = {
  args: {
    maxWidth: '160px',
    children: 'SMP-EAST-RIVER-2026',
    popoverContent: (
      <div className="space-y-1">
        <div className="font-semibold text-foreground">East River Biosample SMP-EAST-RIVER-2026</div>
        <p className="text-muted-foreground text-xs">
          Coordinates: 38.9585° N, 106.9894° W. Collected at depth 0.45 m.
        </p>
      </div>
    ),
  },
};

export const ArrayChips: StoryObj<typeof ArrayWithPopover> = {
  render: () => (
    <div className="max-w-xs space-y-4">
      <div>
        <p className="text-xs text-muted-foreground mb-1">Taxonomic Phyla (maxVisible = 2):</p>
        <ArrayWithPopover
          values={[
            'Cyanobacteria',
            'Proteobacteria',
            'Actinomycetota',
            'Bacteroidota',
            'Firmicutes',
            'Planctomycetota',
          ]}
          maxVisible={2}
        />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">Gene Annotations (all visible):</p>
        <ArrayWithPopover values={['gyrA', 'recA']} maxVisible={3} badgeVariant="outline" />
      </div>
    </div>
  ),
};
