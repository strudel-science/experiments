/**
 * Standard chemical elements list (Periodic Table elements).
 */
export const VALID_ELEMENTS: string[] =
  "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split(
    " ",
  );

/**
 * Regular expression matching element symbols.
 */
export const ELEMENTS_REGEX =
  /A[cglmrstu]|B[aehikr]?|C[adeflmnorsu]?|D[bsy]|E[rsu]|F[elmr]?|G[ade]|H[efgos]?|I[nr]?|K[r]?|L[airuv]|M[cdgnot]|N[abdehiop]?|O[gs]?|P[abdmortu]?|R[abefghnu]|S[bcegimnr]?|T[abcehilms]|U|V|W|Xe|Y[b]?|Z[nr]/g;

/**
 * Regular expression for splitting formula tokens into elements, numbers, and symbols.
 */
export const ELEMENTS_SPLIT_REGEX =
  /(A[cglmrstu]|B[aehikr]?|C[adeflmnorsu]?|D[bsy]|E[rsu]|F[elmr]?|G[ade]|H[efgos]?|I[nr]?|K[r]?|L[airuv]|M[cdgnot]|N[abdehiop]?|O[gs]?|P[abdmortu]?|R[abefghnu]|S[bcegimnr]?|T[abcehilms]|U|V|W|Xe|Y[b]?|Z[nr])|(\d+(?:\.\d+)?)|([()+*\-·•])|([^A-Za-z0-9()+*\-·•\s]+)|(\s+)/g;

export type FormulaTokenType = "element" | "number" | "symbol" | "charge" | "text";

export interface FormulaToken {
  /** Text content of the token */
  text: string;
  /** Categorized type of the token for subscript/superscript rendering */
  type: FormulaTokenType;
}

/**
 * Parses a chemical formula string into categorized tokens for rendering.
 * Supports numbers as subscripts, charges (+, -, 2+, 3-) as superscripts,
 * and element symbols.
 *
 * @param formula - Raw formula string (e.g. 'H2O', 'Fe(NO3)3', 'SO4^2-', 'CuSO4·5H2O')
 * @returns Array of categorized formula tokens
 */
export function parseChemicalFormula(formula: string): FormulaToken[] {
  if (!formula) return [];

  const tokens: FormulaToken[] = [];
  const regex = new RegExp(ELEMENTS_SPLIT_REGEX);
  let match: RegExpExecArray | null;

  while ((match = regex.exec(formula)) !== null) {
    const raw = match[0];
    if (!raw) continue;

    if (match[1]) {
      // Element
      tokens.push({ text: raw, type: "element" });
    } else if (match[2]) {
      // Number (typically subscript count)
      tokens.push({ text: raw, type: "number" });
    } else if (match[3]) {
      // Symbol like parentheses, hydrate dot, plus/minus
      tokens.push({ text: raw, type: "symbol" });
    } else {
      tokens.push({ text: raw, type: "text" });
    }
  }

  // Fallback: if tokenizer returned nothing, return as single text token
  if (tokens.length === 0) {
    tokens.push({ text: formula, type: "text" });
  }

  return tokens;
}

/**
 * Determine if a value is truthy or present in the context of scientific filters.
 * Values like 0 and false are considered valid values, while empty arrays or null/undefined are not.
 *
 * @param value - Any value to check
 * @returns True if considered a present value
 */
export function hasValue(value: unknown): boolean {
  if (value === 0 || value === false) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined && value !== "";
}

/**
 * Determine if a numerical range value deviates from the default min/max bounds.
 *
 * @param value - The [low, high] tuple
 * @param min - Minimum bound
 * @param max - Maximum bound
 * @returns True if range represents an active filter
 */
export function rangeHasValue(
  value: [number, number] | null | undefined,
  min: number,
  max: number,
): boolean {
  if (!value) return false;
  const [low, high] = value;
  return (low !== null && low !== min) || (high !== null && high !== max);
}

/**
 * Formats a scientific number with configurable significant digits and optional exponential notation.
 *
 * @param val - Number to format
 * @param options - Formatting options
 * @returns Formatted number string
 */
export function formatScientificNumber(
  val: number,
  options?: {
    precision?: number;
    useExponentialThreshold?: boolean;
  },
): string {
  if (typeof val !== "number" || Number.isNaN(val)) return "N/A";

  const precision = options?.precision ?? 4;
  const useThreshold = options?.useExponentialThreshold ?? true;

  if (val === 0) return "0";

  const abs = Math.abs(val);
  if (useThreshold && (abs >= 1e5 || abs < 1e-3)) {
    return val.toExponential(precision - 1);
  }

  return Number(val.toPrecision(precision)).toString();
}
