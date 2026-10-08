import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('renders title as h1 heading', () => {
    render(<PageHeader title="Biosample Explorer" />);

    const heading = screen.getByRole('heading', { level: 1, name: 'Biosample Explorer' });
    expect(heading).toBeInTheDocument();
  });

  it('renders badge next to title', () => {
    render(
      <PageHeader
        title="Biosample Explorer"
        badge={<span data-testid="test-badge">Active</span>}
      />,
    );

    expect(screen.getByTestId('test-badge')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders description paragraph', () => {
    render(
      <PageHeader
        title="Biosample Explorer"
        description="Comprehensive dataset of multi-omics environmental biosamples."
      />,
    );

    expect(
      screen.getByText('Comprehensive dataset of multi-omics environmental biosamples.'),
    ).toBeInTheDocument();
  });

  it('renders breadcrumbs list with links and current item', () => {
    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Biosamples', href: '/biosamples' },
      { label: 'SMP-001', current: true },
    ];

    render(<PageHeader title="SMP-001" breadcrumbs={breadcrumbs} />);

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('href', '/');

    const currentSpan = screen.getByText('SMP-001', { selector: 'span' });
    expect(currentSpan).toHaveAttribute('aria-current', 'page');
  });

  it('renders custom breadcrumbs element when passed as ReactNode', () => {
    render(
      <PageHeader
        title="Custom Breadcrumb View"
        breadcrumbs={<div data-testid="custom-breadcrumbs">Custom / Crumb</div>}
      />,
    );

    expect(screen.getByTestId('custom-breadcrumbs')).toBeInTheDocument();
  });

  it('renders action buttons slot', () => {
    render(
      <PageHeader
        title="Sample View"
        actions={<button type="button">Download</button>}
      />,
    );

    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument();
  });

  it('renders metadata slot', () => {
    render(
      <PageHeader
        title="Sample View"
        metadata={<span data-testid="meta-info">DOI: 10.1000/182</span>}
      />,
    );

    expect(screen.getByTestId('meta-info')).toBeInTheDocument();
  });

  it('forwards HTML header attributes like data-testid and id', () => {
    render(
      <PageHeader
        title="Sample View"
        data-testid="main-header"
        id="sample-header"
      />,
    );

    const header = screen.getByTestId('main-header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('id', 'sample-header');
  });
});
