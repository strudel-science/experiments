import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ClickToCopy } from './ClickToCopy';

describe('ClickToCopy', () => {
  const originalClipboard = navigator.clipboard;
  const originalExecCommand = document.execCommand;

  beforeEach(() => {
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
    document.execCommand = vi.fn().mockReturnValue(false);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    Object.assign(navigator, { clipboard: originalClipboard });
    document.execCommand = originalExecCommand;
  });

  it('renders copy button with icon', () => {
    render(
      <TooltipProvider>
        <ClickToCopy text="10.1038/nature12345" />
      </TooltipProvider>,
    );
    expect(screen.getByTestId('copy-icon-copy')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Copy to clipboard');
  });

  it('renders child label text alongside icon', () => {
    render(
      <TooltipProvider>
        <ClickToCopy text="SMP-001">SMP-001</ClickToCopy>
      </TooltipProvider>,
    );
    expect(screen.getByText('SMP-001')).toBeInTheDocument();
  });

  it('copies text to clipboard, shows check icon, and reverts after timeout', async () => {
    const onCopySpy = vi.fn();
    render(
      <TooltipProvider>
        <ClickToCopy text="SAMPLE_IDENTIFIER_XYZ" timeout={1500} onCopy={onCopySpy} />
      </TooltipProvider>,
    );

    const button = screen.getByRole('button');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('SAMPLE_IDENTIFIER_XYZ');
    expect(onCopySpy).toHaveBeenCalledWith('SAMPLE_IDENTIFIER_XYZ');
    expect(screen.getByTestId('copy-icon-check')).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Copied!');

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByTestId('copy-icon-copy')).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Copy to clipboard');
  });

  it('falls back to document.execCommand when navigator.clipboard is unavailable', async () => {
    // @ts-expect-error mutating for test
    delete navigator.clipboard;

    const execCommandSpy = vi.fn().mockReturnValue(true);
    document.execCommand = execCommandSpy;

    const onCopySpy = vi.fn();
    render(
      <TooltipProvider>
        <ClickToCopy text="fallback-id" onCopy={onCopySpy} />
      </TooltipProvider>,
    );

    const button = screen.getByRole('button');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(execCommandSpy).toHaveBeenCalledWith('copy');
    expect(onCopySpy).toHaveBeenCalledWith('fallback-id');
    expect(screen.getByTestId('copy-icon-check')).toBeInTheDocument();
  });

  it('falls back to document.execCommand when navigator.clipboard.writeText throws', async () => {
    (navigator.clipboard.writeText as any).mockRejectedValueOnce(new Error('Permission denied'));
    const execCommandSpy = vi.fn().mockReturnValue(true);
    document.execCommand = execCommandSpy;

    const onCopySpy = vi.fn();
    render(
      <TooltipProvider>
        <ClickToCopy text="fallback-on-error" onCopy={onCopySpy} />
      </TooltipProvider>,
    );

    const button = screen.getByRole('button');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(execCommandSpy).toHaveBeenCalledWith('copy');
    expect(onCopySpy).toHaveBeenCalledWith('fallback-on-error');
    expect(screen.getByTestId('copy-icon-check')).toBeInTheDocument();
  });

  it('does not set copied state or call onCopy when both clipboard write and fallback fail', async () => {
    (navigator.clipboard.writeText as any).mockRejectedValueOnce(new Error('Permission denied'));
    document.execCommand = vi.fn().mockReturnValue(false);
    const onCopySpy = vi.fn();

    render(
      <TooltipProvider>
        <ClickToCopy text="failing-text" onCopy={onCopySpy} />
      </TooltipProvider>,
    );

    const button = screen.getByRole('button');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(onCopySpy).not.toHaveBeenCalled();
    expect(screen.getByTestId('copy-icon-copy')).toBeInTheDocument();
  });

  it('does not trigger copy when disabled', async () => {
    const onCopySpy = vi.fn();
    render(
      <TooltipProvider>
        <ClickToCopy text="disabled-text" disabled onCopy={onCopySpy} />
      </TooltipProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    await act(async () => {
      fireEvent.click(button);
    });

    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
    expect(onCopySpy).not.toHaveBeenCalled();
  });

  it('resets timer properly on rapid multiple clicks', async () => {
    render(
      <TooltipProvider>
        <ClickToCopy text="rapid-text" timeout={1000} />
      </TooltipProvider>,
    );

    const button = screen.getByRole('button');
    await act(async () => {
      fireEvent.click(button);
    });
    expect(screen.getByTestId('copy-icon-check')).toBeInTheDocument();

    // Advance halfway
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.getByTestId('copy-icon-check')).toBeInTheDocument();

    // Click again before first timeout expires
    await act(async () => {
      fireEvent.click(button);
    });

    // Advance 600ms (1100ms from start, would have reverted if timer wasn't reset)
    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(screen.getByTestId('copy-icon-check')).toBeInTheDocument();

    // Advance another 500ms (total 1100ms from second click)
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.getByTestId('copy-icon-copy')).toBeInTheDocument();
  });
});
