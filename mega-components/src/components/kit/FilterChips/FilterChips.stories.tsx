import type { Meta, StoryObj } from '@storybook/react';
import { FilterChips } from './FilterChips';

const meta: Meta<typeof FilterChips> = {
  title: 'Scientific Components/FilterChips',
  component: FilterChips,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline'],
    },
    showClearAll: { control: 'boolean' },
    clearAllLabel: { control: 'text' },
    maxVisible: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof FilterChips>;

export const Default: Story = {
  args: {
    label: 'Active filters:',
    filters: [
      { id: '1', category: 'Biome', label: 'Permafrost' },
      { id: '2', category: 'Sequencing', label: 'Metagenome' },
      { id: '3', category: 'Depth', label: '10 - 50 m' },
      { id: '4', category: 'Project', label: 'DOE 1000 Soils' },
    ],
  },
};

export const WithoutCategories: Story = {
  args: {
    label: 'Selected tags:',
    filters: [
      { id: '1', label: 'Cryosphere' },
      { id: '2', label: 'Metabolomics' },
      { id: '3', label: 'Illumina NovaSeq' },
    ],
  },
};

export const TruncatedWithOverflow: Story = {
  args: {
    label: 'Applied facets:',
    maxVisible: 3,
    filters: [
      { id: '1', category: 'Biome', label: 'Permafrost' },
      { id: '2', category: 'Ecosystem', label: 'Tundra' },
      { id: '3', category: 'Organism', label: 'Methanocella' },
      { id: '4', category: 'Status', label: 'Analyzed' },
      { id: '5', category: 'Year', label: '2024' },
    ],
  },
};

export const OutlineVariant: Story = {
  args: {
    variant: 'outline',
    filters: [
      { id: '1', category: 'Taxa', label: 'Bacteria' },
      { id: '2', category: 'Platform', label: 'PacBio HiFi' },
    ],
  },
};
