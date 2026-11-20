import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils';
import { Button } from '@/components/ui/button';

export interface FilterChipItem {
  /**
   * Unique identifier for the filter.
   */
  id: string;
  /**
   * Optional category or facet name (e.g., "Biome", "Assay", "Organism").
   */
  category?: string;
  /**
   * Human-readable label for the filter value (e.g., "Permafrost", "Metagenome").
   */
  label: string;
  /**
   * Optional underlying filter value payload.
   */
  value?: unknown;
}

export interface FilterChipsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Array of active filter objects to display.
   */
  filters: FilterChipItem[];
  /**
   * Callback fired when an individual filter chip is dismissed.
   */
  onRemove?: (filter: FilterChipItem) => void;
  /**
   * Callback fired when the "Clear all" button is clicked.
   */
  onClearAll?: () => void;
  /**
   * Custom label for the "Clear all" action.
   * @default 'Clear all'
   */
  clearAllLabel?: string;
  /**
   * Whether to display the "Clear all" button when active filters exist.
   * @default true
   */
  showClearAll?: boolean;
  /**
   * Optional prefix heading or label (e.g., "Active filters:").
   */
  label?: ReactNode;
  /**
   * Visual badge variant styling.
   * @default 'secondary'
   */
  variant?: 'default' | 'secondary' | 'outline';
  /**
   * Maximum number of chips to display before collapsing remaining items.
   * When set, displays a toggleable "+N more" badge.
   */
  maxVisible?: number;
  /**
   * Additional class names for the container.
   */
  className?: string;
}

/**
 * FilterChips renders active facet filters as compact, dismissible chips
 * with facet category prefixes, an optional "Clear all" button, and keyboard accessibility.
 *
 * @example
 * ```tsx
 * <FilterChips
 *   filters={[
 *     { id: '1', category: 'Biome', label: 'Soil' },
 *     { id: '2', category: 'Sequencing', label: 'Metagenome' }
 *   ]}
 *   onRemove={(filter) => handleRemove(filter.id)}
 *   onClearAll={() => handleClear()}
 * />
 * ```
 */
export const FilterChips = ({
  filters,
  onRemove,
  onClearAll,
  clearAllLabel = 'Clear all',
  showClearAll = true,
  label,
  variant = 'secondary',
  maxVisible,
  className,
  ...props
}: FilterChipsProps) => {
  const [expanded, setExpanded] = useState(false);

  if (!filters || filters.length === 0) {
    return null;
  }

  const hasOverflow = typeof maxVisible === 'number' && maxVisible > 0 && filters.length > maxVisible;
  const visibleFilters = hasOverflow && !expanded ? filters.slice(0, maxVisible) : filters;
  const hiddenCount = filters.length - (maxVisible ?? 0);

  const variantClasses = {
    default: 'bg-primary text-primary-foreground border-transparent',
    secondary: 'bg-secondary text-secondary-foreground border-transparent',
    outline: 'bg-background text-foreground border-border',
  }[variant];

  return (
    <div
      role="region"
      aria-label="Active filters"
      className={cn('flex flex-wrap items-center gap-2 text-sm', className)}
      {...props}
    >
      {label && <span className="text-xs font-semibold text-muted-foreground mr-1">{label}</span>}

      <ul className="flex flex-wrap items-center gap-1.5 p-0 m-0 list-none" role="list">
        {visibleFilters.map((filter) => {
          const filterTitle = filter.category ? `${filter.category}: ${filter.label}` : filter.label;
          return (
            <li key={filter.id} role="listitem">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
                  variantClasses,
                )}
              >
                {filter.category && (
                  <span className="font-semibold text-muted-foreground/80 dark:text-muted-foreground">
                    {filter.category}:
                  </span>
                )}
                <span>{filter.label}</span>
                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(filter)}
                    aria-label={`Remove filter ${filterTitle}`}
                    className="ml-0.5 inline-flex size-3.5 items-center justify-center rounded-full text-muted-foreground hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      {hasOverflow && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-1.5 py-0.5"
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : `+${hiddenCount} more`}
        </button>
      )}

      {showClearAll && onClearAll && (
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={onClearAll}
          className="text-xs text-muted-foreground hover:text-foreground h-6 px-2"
        >
          {clearAllLabel}
        </Button>
      )}
    </div>
  );
};
