import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LinearMeter } from './LinearMeter';

describe('LinearMeter', () => {
  it('renders with correct meter role and ARIA attributes', () => {
    render(<LinearMeter value={50} min={0} max={100} />);
    const meter = screen.getByRole('meter');
    expect(meter).toBeInTheDocument();
    expect(meter).toHaveAttribute('aria-valuenow', '50');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps values exceeding max or min', () => {
    render(<LinearMeter value={150} min={0} max={100} />);
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuenow', '100');
  });

  it('displays formatted value text when showValue is true', () => {
    render(<LinearMeter value={75} showValue formatValue={(val) => `${val} Joules`} />);
    expect(screen.getByText('75 Joules')).toBeInTheDocument();
  });

  it('sets width of progress indicator proportional to value range', () => {
    const { container } = render(<LinearMeter value={25} min={0} max={100} />);
    const indicator = container.querySelector("[data-slot='linear-meter-indicator']");
    expect(indicator).toHaveStyle({ width: '25%' });
  });
});
