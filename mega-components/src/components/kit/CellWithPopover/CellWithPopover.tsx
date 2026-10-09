import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils';

export interface CellWithPopoverProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Primary content rendered inside the table cell.
   * Typically text or simple nodes that may overflow.
   */
  children: ReactNode;
  /**
   * Optional custom content rendered inside the expanded popover overlay.
   * If not provided, falls back to rendering `children`.
   */
  popoverContent?: ReactNode;
  /**
   * Whether to open the popover on hover in addition to click/focus.
   * @default true
   */
  openOnHover?: boolean;
  /**
   * Delay in milliseconds before opening the popover on hover.
   * @default 200
   */
  hoverDelay?: number;
  /**
   * Optional maximum width for the cell content.
   * Examples: '200px', '16rem', '100%'.
   * @default '100%'
   */
  maxWidth?: string | number;
  /**
   * Whether to apply standard CSS text truncation (ellipsis).
   * @default true
   */
  truncate?: boolean;
  /**
   * Preferred side for popover positioning.
   * @default 'bottom'
   */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Alignment of the popover relative to the cell trigger.
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Additional class names for the popover popup container.
   */
  popoverClassName?: string;
  /**
   * Whether the popover trigger is disabled.
   * @default false
   */
  disabled?: boolean;
}

/**
 * CellWithPopover displays truncated content inside compact data-table cells,
 * with a full-fidelity popover overlay accessible on hover or click.
 *
 * @example
 * ```tsx
 * <CellWithPopover maxWidth="160px">
 *   ENSMUSG00000020122 (Transcriptional regulator protein)
 * </CellWithPopover>
 * ```
 */
export const CellWithPopover = ({
  children,
  popoverContent,
  openOnHover = true,
  hoverDelay = 200,
  maxWidth = '100%',
  truncate = true,
  side = 'bottom',
  align = 'start',
  className,
  popoverClassName,
  disabled = false,
  ...props
}: CellWithPopoverProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div
        className={cn('inline-flex max-w-full items-center', className)}
        {...props}
        style={{ maxWidth, ...props.style }}
      >
        <PopoverTrigger
          openOnHover={openOnHover}
          delay={hoverDelay}
          disabled={disabled}
          className={cn(
            'group cursor-pointer rounded text-left transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            truncate && 'truncate block w-full',
          )}
        >
          {children}
        </PopoverTrigger>
      </div>
      <PopoverContent
        side={side}
        align={align}
        className={cn('max-w-xs break-words text-xs shadow-lg md:max-w-sm', popoverClassName)}
      >
        {popoverContent ?? children}
      </PopoverContent>
    </Popover>
  );
};

export interface ArrayWithPopoverProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Array of values (strings or numbers) to render as tag chips.
   */
  values: (string | number)[];
  /**
   * Maximum number of chips visible directly in the cell before overflowing into popover.
   * @default 2
   */
  maxVisible?: number;
  /**
   * Visual badge variant for individual item chips.
   * @default 'secondary'
   */
  badgeVariant?: 'default' | 'secondary' | 'outline' | 'destructive';
  /**
   * Optional custom label or title rendered inside the expanded popover header.
   */
  popoverTitle?: ReactNode;
  /**
   * Whether to open popover on hover.
   * @default true
   */
  openOnHover?: boolean;
  /**
   * Whether the popover trigger is disabled.
   * @default false
   */
  disabled?: boolean;
}

/**
 * ArrayWithPopover renders an array of items as compact chips in a data-table cell,
 * truncating overflowing items into a "+N more" badge that opens a full view on hover/click.
 *
 * @example
 * ```tsx
 * <ArrayWithPopover
 *   values={['Cyanobacteria', 'Proteobacteria', 'Actinomycetota', 'Bacteroidota']}
 *   maxVisible={2}
 * />
 * ```
 */
export const ArrayWithPopover = ({
  values,
  maxVisible = 2,
  badgeVariant = 'secondary',
  popoverTitle,
  openOnHover = true,
  disabled = false,
  className,
  ...props
}: ArrayWithPopoverProps) => {
  const [open, setOpen] = useState(false);

  if (!values || values.length === 0) {
    return (
      <span className={cn('text-xs text-muted-foreground italic', className)} {...props}>
        None
      </span>
    );
  }

  const visibleItems = values.slice(0, maxVisible);
  const remainingCount = values.length - maxVisible;

  if (remainingCount <= 0) {
    return (
      <div className={cn('inline-flex flex-wrap items-center gap-1', className)} {...props}>
        {visibleItems.map((val, idx) => (
          <Badge key={`${val}-${idx}`} variant={badgeVariant} className="text-[11px] font-normal">
            {val}
          </Badge>
        ))}
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn('inline-flex items-center gap-1', className)} {...props}>
        {visibleItems.map((val, idx) => (
          <Badge key={`${val}-${idx}`} variant={badgeVariant} className="text-[11px] font-normal">
            {val}
          </Badge>
        ))}
        <PopoverTrigger
          openOnHover={openOnHover}
          delay={150}
          disabled={disabled}
          aria-label={`Show ${remainingCount} more items`}
          className="cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Badge variant="outline" className="text-[11px] font-normal hover:bg-accent">
            +{remainingCount}
          </Badge>
        </PopoverTrigger>
      </div>
      <PopoverContent side="bottom" align="start" className="w-64 p-3 shadow-lg">
        {popoverTitle ? (
          <div className="mb-2 text-xs font-semibold text-muted-foreground border-b pb-1">{popoverTitle}</div>
        ) : (
          <div className="mb-2 text-xs font-semibold text-muted-foreground border-b pb-1">
            All Items ({values.length})
          </div>
        )}
        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pt-1">
          {values.map((val, idx) => (
            <Badge key={`${val}-${idx}`} variant={badgeVariant} className="text-xs font-normal">
              {val}
            </Badge>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
