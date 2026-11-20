import type { Meta, StoryObj } from '@storybook/react';
import { Database, Dna, Microscope } from 'lucide-react';
import { LinkCard } from './LinkCard';

const meta: Meta<typeof LinkCard> = {
  title: 'Scientific Components/LinkCard',
  component: LinkCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    href: { control: 'text' },
    badge: { control: 'text' },
    isExternal: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof LinkCard>;

export const DataPortal: Story = {
  args: {
    title: 'National Microbiome Data Collaborative',
    description: 'Explore, analyze, and download integrative multi-omics microbiome datasets across biosystems.',
    href: 'https://data.microbiomedata.org',
    target: '_blank',
    badge: 'Repository',
    icon: <Database className="size-5" />,
  },
};

export const SequencingPipeline: Story = {
  args: {
    title: 'Metagenome Annotation Pipeline',
    description: 'Automated functional annotation and gene prediction for high-throughput assemblies.',
    href: '#',
    badge: 'Workflow',
    icon: <Dna className="size-5" />,
  },
};

export const FacilityBeamline: Story = {
  args: {
    title: 'Advanced Light Source - Beamline 8.3.2',
    description: 'Hard X-ray micro-tomography for non-destructive 3D imaging of materials and geological samples.',
    href: '#',
    badge: 'Facility',
    icon: <Microscope className="size-5" />,
  },
};
