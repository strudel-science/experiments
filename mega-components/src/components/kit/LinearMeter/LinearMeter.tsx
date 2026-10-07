import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const meterVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-secondary transition-all",
  {
    variants: {
      size: {
        sm: "h-1.5",
        default: "h-2.5",
        lg: "h-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const indicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-300 ease-in-out rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-emerald-600 dark:bg-emerald-500",
        warning: "bg-amber-500 dark:bg-amber-400",
        destructive: "bg-destructive",
        info: "bg-sky-500 dark:bg-sky-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface LinearMeterProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof meterVariants>,
    VariantProps<typeof indicatorVariants> {
  /**
   * The current numeric value to display on the meter.
   */
  value: number;
  /**
   * Minimum value representing 0% progress.
   * @default 0
   */
  min?: number;
  /**
   * Maximum value representing 100% progress.
   * @default 100
   */
  max?: number;
  /**
   * Whether to display the text label of the value beside or above the meter.
   * @default false
   */
  showValue?: boolean;
  /**
   * Custom formatter function for displaying the value string.
   */
  formatValue?: (val: number, percentage: number) => string;
}

/**
 * LinearMeter displays 1D scientific metrics (e.g. CPU utilization, sequence coverage,
 * measurement thresholds, or completion percentages) as a horizontal bar.
 *
 * @example
 * ```tsx
 * <LinearMeter value={75} variant="success" showValue />
 * ```
 */
export function LinearMeter({
  value,
  min = 0,
  max = 100,
  variant = "default",
  size = "default",
  showValue = false,
  formatValue,
  className,
  ...props
}: LinearMeterProps) {
  const clampedValue = Math.min(Math.max(value, min), max);
  const range = max - min;
  const percentage = range > 0 ? ((clampedValue - min) / range) * 100 : 0;

  const defaultFormatted = `${Math.round(percentage)}%`;
  const formattedText = formatValue ? formatValue(value, percentage) : defaultFormatted;

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {showValue && (
        <div className="flex justify-between text-xs font-mono font-medium text-muted-foreground">
          <span>{clampedValue}</span>
          <span>{formattedText}</span>
        </div>
      )}
      <div
        role="meter"
        aria-valuenow={clampedValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={formattedText}
        className={cn(meterVariants({ size }))}
      >
        <div
          data-slot="linear-meter-indicator"
          className={cn(indicatorVariants({ variant }))}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
