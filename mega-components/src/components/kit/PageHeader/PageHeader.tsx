import { type HTMLAttributes, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils';

export interface BreadcrumbItem {
  /**
   * Label text or element for the breadcrumb item.
   */
  label: ReactNode;
  /**
   * Link destination URL. If omitted or item is current, rendered as text.
   */
  href?: string;
  /**
   * Whether this item represents the current active page.
   */
  current?: boolean;
}

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Primary title or heading for the page.
   */
  title: ReactNode;
  /**
   * Optional list of breadcrumb items or a custom ReactNode breadcrumbs component.
   */
  breadcrumbs?: BreadcrumbItem[] | ReactNode;
  /**
   * Descriptive text, summary, or abstract explaining the page contents.
   */
  description?: ReactNode;
  /**
   * Action controls or buttons rendered alongside the page heading.
   */
  actions?: ReactNode;
  /**
   * Status badge, category pill, or version tag displayed next to the title.
   */
  badge?: ReactNode;
  /**
   * Additional metadata slot rendered below the description (e.g., timestamps, DOIs, contributors).
   */
  metadata?: ReactNode;
  /**
   * Additional class names for the header container.
   */
  className?: string;
}

/**
 * PageHeader provides a consistent, accessible top-level header for scientific pages,
 * explorer dashboards, and detail views. Supports breadcrumbs, titles with badges, descriptions,
 * action toolbars, and metadata badges.
 *
 * @example
 * ```tsx
 * <PageHeader
 *   title="Soil Metagenome Biosample 1024"
 *   badge={<Badge variant="outline">Sequenced</Badge>}
 *   breadcrumbs={[
 *     { label: 'Biosamples', href: '/biosamples' },
 *     { label: 'SMP-1024', current: true }
 *   ]}
 *   description="High-resolution metagenomic sequence of permafrost active layer."
 *   actions={<Button>Download FASTQ</Button>}
 * />
 * ```
 */
export const PageHeader = ({
  title,
  breadcrumbs,
  description,
  actions,
  badge,
  metadata,
  className,
  ...props
}: PageHeaderProps) => {
  const isBreadcrumbArray = Array.isArray(breadcrumbs);

  return (
    <header className={cn('space-y-3 pb-6 border-b border-border/40', className)} {...props}>
      {breadcrumbs && (
        <nav aria-label="Breadcrumb">
          {isBreadcrumbArray ? (
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              {(breadcrumbs as BreadcrumbItem[]).map((item, index) => {
                const isLast = index === (breadcrumbs as BreadcrumbItem[]).length - 1;
                const isCurrent = item.current ?? isLast;

                return (
                  <li key={index} className="inline-flex items-center gap-1.5">
                    {index > 0 && (
                      <ChevronRight className="size-3 text-muted-foreground/60 shrink-0" aria-hidden="true" />
                    )}
                    {item.href && !isCurrent ? (
                      <a
                        href={item.href}
                        className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span
                        aria-current={isCurrent ? 'page' : undefined}
                        className={cn(isCurrent && 'font-medium text-foreground')}
                      >
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          ) : (
            breadcrumbs
          )}
        </nav>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
            {badge && <div className="inline-flex items-center">{badge}</div>}
          </div>
          {description && <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">{description}</p>}
        </div>

        {actions && <div className="flex items-center gap-2 shrink-0 sm:self-center">{actions}</div>}
      </div>

      {metadata && (
        <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">{metadata}</div>
      )}
    </header>
  );
};
