import { useState, useCallback, useRef, useEffect, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils';

export interface ClickToCopyProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onCopy'> {
  /**
   * The text or identifier to copy to the clipboard.
   */
  text: string;
  /**
   * Optional display label or element rendered alongside the copy button.
   * If not provided, renders as an icon-only button.
   */
  children?: ReactNode;
  /**
   * Tooltip label displayed when the text has not yet been copied.
   * @default 'Copy to clipboard'
   */
  label?: string;
  /**
   * Tooltip label displayed immediately after a successful copy.
   * @default 'Copied!'
   */
  copiedLabel?: string;
  /**
   * Duration in milliseconds to maintain the copied state.
   * @default 2000
   */
  timeout?: number;
  /**
   * Optional callback triggered when text is copied.
   */
  onCopy?: (text: string) => void;
  /**
   * Visual variant for the button.
   * @default 'ghost'
   */
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  /**
   * Size configuration for the button.
   * Defaults to 'sm' when children are provided, or 'icon-sm' when icon-only.
   */
  size?: 'default' | 'sm' | 'xs' | 'icon' | 'icon-sm' | 'icon-xs';
  /**
   * Additional class names for the root container / button.
   */
  className?: string;
}

/**
 * ClickToCopy provides an accessible button to copy scientific identifiers,
 * DOIs, accessions, and commands with tooltip feedback and animated icon transitions.
 *
 * @example
 * ```tsx
 * <ClickToCopy text="10.1038/s41586-023-06283-x">
 *   10.1038/s41586-023-06283-x
 * </ClickToCopy>
 * ```
 */
export const ClickToCopy = ({
  text,
  children,
  label = 'Copy to clipboard',
  copiedLabel = 'Copied!',
  timeout = 2000,
  onCopy,
  variant = 'ghost',
  size,
  className,
  disabled,
  ...props
}: ClickToCopyProps) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    if (disabled) return;

    let successful = false;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        successful = true;
      } else if (typeof document !== 'undefined') {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        textArea.setAttribute('readonly', '');
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        successful = document.execCommand('copy');
        textArea.remove();
      }
    } catch {
      try {
        if (typeof document !== 'undefined') {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-9999px';
          textArea.style.top = '-9999px';
          textArea.setAttribute('readonly', '');
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          successful = document.execCommand('copy');
          textArea.remove();
        }
      } catch {
        successful = false;
      }
    }

    if (successful) {
      setCopied(true);
      if (onCopy) onCopy(text);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setCopied(false);
      }, timeout);
    } else {
      setCopied(false);
    }
  }, [text, disabled, onCopy, timeout]);

  const resolvedSize = size ?? (children ? 'sm' : 'icon-sm');

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant={variant}
            size={resolvedSize}
            disabled={disabled}
            onClick={handleCopy}
            aria-label={copied ? copiedLabel : label}
            className={cn(
              'group/copy inline-flex items-center gap-1.5 font-normal transition-all',
              children && 'font-mono text-xs',
              className,
            )}
            {...props}
          >
            {children && <span className="truncate">{children}</span>}
            <span
              className={cn(
                'inline-flex items-center justify-center transition-transform duration-200',
                copied && 'text-green-600 dark:text-green-400 scale-110',
              )}
            >
              {copied ? (
                <Check className="size-3.5" data-testid="copy-icon-check" />
              ) : (
                <Copy className="size-3.5 text-muted-foreground group-hover/copy:text-foreground" data-testid="copy-icon-copy" />
              )}
            </span>
            <span className="sr-only" aria-live="polite">
              {copied ? copiedLabel : ''}
            </span>
          </Button>
        }
      />
      <TooltipContent side="top">{copied ? copiedLabel : label}</TooltipContent>
    </Tooltip>
  );
};
