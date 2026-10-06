import type { Meta, StoryObj } from "@storybook/react";
import { LabelValueTable } from "./LabelValueTable";

const meta: Meta<typeof LabelValueTable> = {
  title: "Scientific Components/LabelValueTable",
  component: LabelValueTable,
  tags: ["autodocs"],
  argTypes: {
    dense: { control: "boolean" },
    bordered: { control: "boolean" },
    striped: { control: "boolean" },
    labelWidth: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof LabelValueTable>;

export const SampleMetadata: Story = {
  args: {
    rows: [
      {
        label: "Sample ID",
        value: "NMDCS:SMP-09418",
        description: "Permanent NMDC identifier",
      },
      {
        label: "Material",
        value: "Soil Metagenome",
      },
      {
        label: "Collection Site",
        value: "East River Watershed, Crested Butte, CO",
      },
      {
        label: "Coordinates",
        value: "38.9221° N, 106.9912° W",
      },
      {
        label: "pH Value",
        value: "6.8 ± 0.1",
      },
      {
        label: "Sequencing Depth",
        value: "42.8 Gbp",
      },
    ],
    dense: false,
    bordered: true,
  },
};

export const DenseMetadata: Story = {
  args: {
    rows: [
      { label: "Instrument", value: "Illumina NovaSeq 6000" },
      { label: "Flowcell ID", value: "H2N3GDRX2" },
      { label: "Read Length", value: "2 x 150bp" },
      { label: "Status", value: "Completed" },
    ],
    dense: true,
    striped: true,
  },
};
