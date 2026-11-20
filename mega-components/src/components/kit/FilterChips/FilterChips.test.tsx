import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FilterChips, type FilterChipItem } from './FilterChips';

const mockFilters: FilterChipItem[] = [
  { id: 'biome-soil', category: 'Biome', label: 'Soil' },
  { id: 'seq-meta', category: 'Sequencing', label: 'Metagenome' },
  { id: 'depth-deep', label: 'Depth > 50m' },
];

describe('FilterChips', () => {
  it('renders nothing when filters array is empty', () => {
    const { container } = render(<FilterChips filters={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders chips with category and label', () => {
    render(<FilterChips filters={mockFilters} />);

    expect(screen.getByText('Soil')).toBeInTheDocument();
    expect(screen.getByText('Biome:')).toBeInTheDocument();
    expect(screen.getByText('Metagenome')).toBeInTheDocument();
    expect(screen.getByText('Sequencing:')).toBeInTheDocument();
    expect(screen.getByText('Depth > 50m')).toBeInTheDocument();
  });

  it('calls onRemove when the remove button on a chip is clicked', () => {
    const handleRemove = vi.fn();
    render(<FilterChips filters={mockFilters} onRemove={handleRemove} />);

    const removeSoilBtn = screen.getByRole('button', { name: 'Remove filter Biome: Soil' });
    fireEvent.click(removeSoilBtn);

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleRemove).toHaveBeenCalledWith(mockFilters[0]);
  });

  it('calls onClearAll when clear all button is clicked', () => {
    const handleClearAll = vi.fn();
    render(<FilterChips filters={mockFilters} onClearAll={handleClearAll} />);

    const clearBtn = screen.getByRole('button', { name: 'Clear all' });
    fireEvent.click(clearBtn);

    expect(handleClearAll).toHaveBeenCalledTimes(1);
  });

  it('hides clear all button when showClearAll is false', () => {
    const handleClearAll = vi.fn();
    render(<FilterChips filters={mockFilters} onClearAll={handleClearAll} showClearAll={false} />);

    expect(screen.queryByRole('button', { name: 'Clear all' })).toBeNull();
  });

  it('renders custom clearAllLabel', () => {
    const handleClearAll = vi.fn();
    render(<FilterChips filters={mockFilters} onClearAll={handleClearAll} clearAllLabel="Reset filters" />);

    expect(screen.getByRole('button', { name: 'Reset filters' })).toBeInTheDocument();
  });

  it('renders prefix label when provided', () => {
    render(<FilterChips filters={mockFilters} label="Applied filters:" />);

    expect(screen.getByText('Applied filters:')).toBeInTheDocument();
  });

  it('collapses overflow chips when maxVisible is specified and toggles on click', () => {
    render(<FilterChips filters={mockFilters} maxVisible={2} />);

    expect(screen.getByText('Soil')).toBeInTheDocument();
    expect(screen.getByText('Metagenome')).toBeInTheDocument();
    expect(screen.queryByText('Depth > 50m')).toBeNull();

    const expandBtn = screen.getByRole('button', { name: '+1 more' });
    expect(expandBtn).toBeInTheDocument();

    fireEvent.click(expandBtn);
    expect(screen.getByText('Depth > 50m')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show less' })).toBeInTheDocument();
  });

  it('forwards HTML attributes to the container', () => {
    render(<FilterChips filters={mockFilters} data-testid="filter-chips-container" className="my-custom-chips" />);

    const container = screen.getByTestId('filter-chips-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('my-custom-chips');
  });
});
