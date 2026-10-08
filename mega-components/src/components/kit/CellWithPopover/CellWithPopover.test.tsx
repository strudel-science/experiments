import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CellWithPopover, ArrayWithPopover } from './CellWithPopover';

describe('CellWithPopover', () => {
  it('renders children inside the cell trigger', () => {
    render(<CellWithPopover>Long biological sample annotation text</CellWithPopover>);
    expect(screen.getByText('Long biological sample annotation text')).toBeInTheDocument();
  });

  it('applies custom maxWidth and merges with style prop without losing maxWidth', () => {
    const { container } = render(
      <CellWithPopover maxWidth="120px" style={{ color: 'red' }} data-testid="cell-wrapper">
        Extended description
      </CellWithPopover>,
    );
    const wrapper = container.querySelector("[data-testid='cell-wrapper']");
    expect(wrapper).toHaveStyle({ maxWidth: '120px', color: 'rgb(255, 0, 0)' });
  });

  it('supports disabled prop on trigger', () => {
    render(
      <CellWithPopover disabled>
        Disabled cell
      </CellWithPopover>,
    );
    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
  });
});

describe('ArrayWithPopover', () => {
  it('renders fallback for empty arrays and preserves className and html attributes', () => {
    render(<ArrayWithPopover values={[]} className="custom-empty-class" data-testid="empty-array" />);
    const el = screen.getByTestId('empty-array');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('custom-empty-class');
    expect(screen.getByText('None')).toBeInTheDocument();
  });

  it('renders all items when values count does not exceed maxVisible', () => {
    render(<ArrayWithPopover values={['GeneA', 'GeneB']} maxVisible={2} />);
    expect(screen.getByText('GeneA')).toBeInTheDocument();
    expect(screen.getByText('GeneB')).toBeInTheDocument();
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
  });

  it('shows overflow count badge when items exceed maxVisible', () => {
    render(<ArrayWithPopover values={['GeneA', 'GeneB', 'GeneC', 'GeneD']} maxVisible={2} />);
    expect(screen.getByText('GeneA')).toBeInTheDocument();
    expect(screen.getByText('GeneB')).toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });
});
