import type { ReactNode, TableHTMLAttributes } from 'react';
import { cn } from '@/utils';

export interface LabelValueRow {
  /**
   * The label/key for this scientific attribute (e.g. 'Sample ID', 'Molecular Weight').
   */
  label: ReactNode;
  /**
   * The value content for this attribute.
   */
  value: ReactNode;
  /**
   * Optional auxiliary description or tooltip text.
   */
  description?: string;
}

export interface LabelValueTableProps extends TableHTMLAttributes<HTMLTableElement> {
  /**
   * Array of label-value pairs to display.
   */
  rows: LabelValueRow[];
  /**
   * Optional custom width for the label column (e.g., '180px', '30%').
   * @default '160px'
   */
  labelWidth?: string | number;
  /**
   * Whether to use compact / dense padding for row items.
   * @default false
   */
  dense?: boolean;
  /**
   * Whether to add subtle dividers between rows.
   * @default true
   */
  bordered?: boolean;
  /**
   * Whether to alternate row background colors.
   * @default false
   */
  striped?: boolean;
}

/**
 * LabelValueTable displays key-value scientific metadata (e.g. sample parameters,
 * chemical properties, run configurations, instrument details) in an accessible two-column table.
 *
 * @example
 * ```tsx
 * <LabelValueTable
 *   rows={[
 *     { label: 'Sample ID', value: 'SMP-2026-904' },
 *     { label: 'Formula', value: <ChemicalFormula content="Fe2O3" /> },
 *     { label: 'Purity', value: '99.98%' }
 *   ]}
 *   dense
 * />
 * ```
 */
export function LabelValueTable({
  rows,
  labelWidth = '160px',
  dense = false,
  bordered = true,
  striped = false,
  className,
  ...props
}: LabelValueTableProps) {
  const widthStyle = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth;

  return (
    <div className="w-full overflow-x-auto">
      <table className={cn('w-full text-left text-sm text-foreground border-collapse', className)} {...props}>
        <tbody className={cn(bordered && 'divide-y divide-border')}>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={cn('transition-colors', striped && index % 2 === 1 && 'bg-muted/40', 'hover:bg-muted/20')}
            >
              <th
                scope="row"
                style={{ width: widthStyle }}
                className={cn(
                  'align-top font-medium text-muted-foreground',
                  dense ? 'py-1.5 pr-4 pl-0' : 'py-2.5 pr-4 pl-0',
                )}
              >
                <div>{row.label}</div>
                {row.description && (
                  <div className="text-xs font-normal text-muted-foreground/75 mt-0.5">{row.description}</div>
                )}
              </th>
              <td
                className={cn(
                  'align-top font-normal text-foreground break-words',
                  dense ? 'py-1.5 px-0' : 'py-2.5 px-0',
                )}
              >
                {row.value ?? <span className="text-muted-foreground italic">N/A</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
