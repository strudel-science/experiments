import { useMemo, type HTMLAttributes, type ReactNode } from 'react';
import { cn, parseChemicalFormula, type FormulaToken } from '@/utils';

export interface ChemicalFormulaProps extends HTMLAttributes<HTMLElement> {
  /**
   * The raw chemical formula string to parse and format.
   * Examples: 'H2O', 'Fe(NO3)3', 'CuSO4·5H2O', 'CH3CH2OH'
   */
  content: string;
  /**
   * HTML tag to render as root container.
   * @default 'span'
   */
  as?: 'span' | 'div' | 'p';
}

/**
 * Helper to render individual tokens with appropriate typographic subscript or standard styling.
 */
const renderFormulaToken = (token: FormulaToken, index: number): ReactNode => {
  if (token.type === 'number') {
    return (
      <sub
        key={index}
        className="text-[0.75em] leading-none select-text align-baseline relative -bottom-[0.25em]"
        data-testid="formula-subscript"
      >
        {token.text}
      </sub>
    );
  }

  return (
    <span key={index} className="inline-block">
      {token.text}
    </span>
  );
};

/**
 * ChemicalFormula renders a chemical formula string with correct typographic subscripts
 * for stoichiometric coefficients and element numbers.
 *
 * @example
 * ```tsx
 * <ChemicalFormula content="Fe2(SO4)3" className="font-semibold text-lg" />
 * ```
 */
export const ChemicalFormula = ({ content, as: Component = 'span', className, ...props }: ChemicalFormulaProps) => {
  const tokens = useMemo(() => parseChemicalFormula(content), [content]);

  return (
    <Component
      className={cn('inline-flex items-baseline font-mono tracking-tight', className)}
      aria-label={content}
      {...props}
    >
      {tokens.map((token, index) => renderFormulaToken(token, index))}
    </Component>
  );
};
