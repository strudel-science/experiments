import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof PageHeader> = {
  title: 'Scientific Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: 'Permafrost Active Layer Metagenome',
    badge: <Badge variant="secondary">Sequenced</Badge>,
    description:
      'Longitudinal metagenomic sequencing of soil cores collected at Barrow Environmental Observatory, Alaska.',
    breadcrumbs: [
      { label: 'Portals', href: '#' },
      { label: 'Biosamples', href: '#' },
      { label: 'GOLD:Gb012345', current: true },
    ],
    actions: (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Share</Button>
        <Button size="sm">Download FASTQ</Button>
      </div>
    ),
  },
};

export const Minimal: Story = {
  args: {
    title: 'Explore Datasets',
    description: 'Filter and inspect open multi-omics datasets across international repositories.',
  },
};

export const WithMetadata: Story = {
  args: {
    title: 'Crystal Structure of Nitrogenase Fe Protein',
    badge: <Badge variant="outline">PDB ID: 1FP6</Badge>,
    description:
      'High-resolution synchrotron X-ray diffraction analysis of Azotobacter vinelandii nitrogenase component.',
    breadcrumbs: [
      { label: 'Structures', href: '#' },
      { label: '1FP6', current: true },
    ],
    actions: (
      <Button size="sm">Export CIF</Button>
    ),
    metadata: (
      <>
        <span>DOI: 10.2210/pdb1fp6/pdb</span>
        <span>•</span>
        <span>Resolution: 1.60 Å</span>
        <span>•</span>
        <span>Deposited: 2000-03-15</span>
      </>
    ),
  },
};
