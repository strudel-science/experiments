import type { Meta, StoryObj } from '@storybook/react';
import { LinearMeter } from './LinearMeter';

const meta: Meta<typeof LinearMeter> = {
  title: 'Scientific Components/LinearMeter',
  component: LinearMeter,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    min: { control: 'number' },
    max: { control: 'number' },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'destructive', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    showValue: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof LinearMeter>;

export const Default: Story = {
  args: {
    value: 65,
    showValue: true,
  },
};

export const SuccessThreshold: Story = {
  args: {
    value: 92,
    variant: 'success',
    showValue: true,
  },
};

export const WarningUtilization: Story = {
  args: {
    value: 78,
    variant: 'warning',
    showValue: true,
    formatValue: (val) => `${val}% Cluster Load`,
  },
};

export const CriticalAlert: Story = {
  args: {
    value: 98,
    variant: 'destructive',
    showValue: true,
    size: 'lg',
  },
};
