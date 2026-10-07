import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/utils';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface LinkCardProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  /**
   * Primary title or heading for the card.
   */
  title: ReactNode;
  /**
   * Detailed explanation, abstract, or summary text.
   */
  description?: ReactNode;
  /**
   * Destination URL or path.
   * @default '#'
   */
  href?: string;
  /**
   * Optional icon, image, or thumbnail graphic.
   */
  icon?: ReactNode;
  /**
   * Optional status badge or category tag.
   */
  badge?: ReactNode;
  /**
   * Whether to display an external link indicator icon.
   * Defaults to true if target is '_blank'.
   */
  isExternal?: boolean;
}

/**
 * LinkCard renders an interactive card component linking to datasets, publications,
 * internal exploration views, or external scientific services.
 *
 * @example
 * ```tsx
 * <LinkCard
 *   title="Materials Project Database"
 *   description="Access open crystal structures and density-functional theory properties."
 *   href="https://next-gen.materialsproject.org"
 *   target="_blank"
 *   badge="External Portal"
 * />
 * ```
 */
export const LinkCard = ({
  title,
  description,
  href = '#',
  icon,
  badge,
  isExternal,
  target,
  className,
  ...props
}: LinkCardProps) => {
  const isExternalLink = isExternal ?? target === '_blank';

  return (
    <a
      href={href}
      target={target}
      rel={isExternalLink ? 'noopener noreferrer' : undefined}
      className={cn(
        'group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    >
      <Card className="h-full transition-all duration-200 group-hover:border-foreground/30 group-hover:shadow-md">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:text-foreground">
                  {icon}
                </div>
              )}
              <CardTitle className="text-base group-hover:text-primary transition-colors">{title}</CardTitle>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {badge && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  {badge}
                </span>
              )}
              {isExternalLink && (
                <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              )}
            </div>
          </div>
          {description && (
            <CardDescription className="line-clamp-3 text-sm leading-relaxed">{description}</CardDescription>
          )}
        </CardHeader>
      </Card>
    </a>
  );
}
