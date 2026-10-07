import type { Meta, StoryObj } from '@storybook/react';
import { ChemicalFormula } from './ChemicalFormula';

const meta: Meta<typeof ChemicalFormula> = {
  title: 'Scientific Components/ChemicalFormula',
  component: ChemicalFormula,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Chemical formula string to format',
    },
    as: {
      control: 'select',
      options: ['span', 'div', 'p'],
      description: 'Root container element',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChemicalFormula>;

export const Water: Story = {
  args: {
    content: 'H2O',
  },
};

export const Glucose: Story = {
  args: {
    content: 'C6H12O6',
  },
};

export const IronSulfate: Story = {
  args: {
    content: 'Fe2(SO4)3',
  },
};

export const CopperSulfateHydrate: Story = {
  args: {
    content: 'CuSO4·5H2O',
  },
};

export const LargeStyled: Story = {
  args: {
    content: 'Ca10(PO4)6(OH)2',
    className: 'text-2xl font-bold text-primary tracking-wide',
  },
};
