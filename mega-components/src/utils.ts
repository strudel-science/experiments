export { cn } from 'cn';

/**
 * Converts a snake_case string into Title Case.
 * Example: 'sample_collection_date' -> 'Sample Collection Date'
 *
 * @param str - The snake_case string to format
 * @returns The formatted Title Case string
 */
export const snakeToTitleCase = (str: string): string => {
  if (!str) return '';
  return str
    .split('_')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Converts camelCase, kebab-case, or snake_case string to Title Case.
 * Example: 'firstName' -> 'First Name', 'target-temp' -> 'Target Temp'
 *
 * @param str - The input string
 * @returns The formatted Title Case string
 */
export const toTitleCase = (str: string): string => {
  if (!str) return '';
  // Replace underscores and hyphens with space, and insert space before uppercase letters
  const spaced = str
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .trim();

  return spaced
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Truncates a string to a specified max length and appends an ellipsis.
 *
 * @param str - The string to truncate
 * @param maxLength - The maximum allowed length
 * @returns The truncated string
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (!str || str.length <= maxLength) return str;
  return `${str.slice(0, Math.max(0, maxLength - 3))}...`;
};

/**
 * Standard chemical elements list (Periodic Table elements).
 */
export const VALID_ELEMENTS: string[] =
  'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(
    ' ',
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

export type FormulaTokenType = 'element' | 'number' | 'symbol' | 'charge' | 'text';

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
export const parseChemicalFormula = (formula: string): FormulaToken[] => {
  if (!formula) return [];

  const tokens: FormulaToken[] = [];
  const regex = new RegExp(ELEMENTS_SPLIT_REGEX);
  let match: RegExpExecArray | null;

  while ((match = regex.exec(formula)) !== null) {
    const raw = match[0];
    if (!raw) continue;

    if (match[1]) {
      // Element
      tokens.push({ text: raw, type: 'element' });
    } else if (match[2]) {
      // Number (typically subscript count)
      tokens.push({ text: raw, type: 'number' });
    } else if (match[3]) {
      // Symbol like parentheses, hydrate dot, plus/minus
      tokens.push({ text: raw, type: 'symbol' });
    } else {
      tokens.push({ text: raw, type: 'text' });
    }
  }

  // Fallback: if tokenizer returned nothing, return as single text token
  if (tokens.length === 0) {
    tokens.push({ text: formula, type: 'text' });
  }

  return tokens;
};

/**
 * Determine if a value is truthy or present in the context of scientific filters.
 * Values like 0 and false are considered valid values, while empty arrays or null/undefined are not.
 *
 * @param value - Any value to check
 * @returns True if considered a present value
 */
export const hasValue = (value: unknown): boolean => {
  if (value === 0 || value === false) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined && value !== '';
};

/**
 * Determine if a numerical range value deviates from the default min/max bounds.
 *
 * @param value - The [low, high] tuple
 * @param min - Minimum bound
 * @param max - Maximum bound
 * @returns True if range represents an active filter
 */
export const rangeHasValue = (
  value: [number, number] | null | undefined,
  min: number,
  max: number,
): boolean => {
  if (!value) return false;
  const [low, high] = value;
  return (low !== null && low !== min) || (high !== null && high !== max);
};

/**
 * Formats a scientific number with configurable significant digits and optional exponential notation.
 *
 * @param val - Number to format
 * @param options - Formatting options
 * @returns Formatted number string
 */
export const formatScientificNumber = (
  val: number,
  options?: {
    precision?: number;
    useExponentialThreshold?: boolean;
  },
): string => {
  if (typeof val !== 'number' || Number.isNaN(val)) return 'N/A';

  const precision = options?.precision ?? 4;
  const useThreshold = options?.useExponentialThreshold ?? true;

  if (val === 0) return '0';

  const abs = Math.abs(val);
  if (useThreshold && (abs >= 1e5 || abs < 1e-3)) {
    return val.toExponential(precision - 1);
  }

  return Number(val.toPrecision(precision)).toString();
};

export interface FormatFileSizeOptions {
  /**
   * If true, uses IEC binary powers of 1024 (KiB, MiB, GiB, etc.).
   * If false, uses decimal SI powers of 1000 (kB, MB, GB, etc.).
   * @default false
   */
  binaryPrefix?: boolean;
  /**
   * Number of decimal places to display.
   * @default 1
   */
  precision?: number;
}

/**
 * Formats a byte number into a human-readable file size string.
 * Defaults to decimal SI (powers of 1000: kB, MB, GB).
 * Edge cases: 0 bytes -> '0 B', negative numbers -> '', null/undefined -> ''.
 *
 * @param bytes - Size in bytes
 * @param options - Formatting configuration options
 * @returns Human-readable size string
 */
export const formatFileSize = (
  bytes: number | null | undefined,
  options?: FormatFileSizeOptions,
): string => {
  if (
    bytes === null ||
    bytes === undefined ||
    typeof bytes !== 'number' ||
    !Number.isFinite(bytes) ||
    bytes < 0
  ) {
    return '';
  }
  if (bytes === 0) {
    return '0 B';
  }
  const binaryPrefix = options?.binaryPrefix ?? false;
  const precision = options?.precision ?? 1;
  const thresh = binaryPrefix ? 1024 : 1000;
  if (bytes < thresh) {
    return `${bytes} B`;
  }
  const units = binaryPrefix
    ? ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    : ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let u = -1;
  let current = bytes;
  const r = 10 ** precision;
  do {
    current /= thresh;
    u += 1;
  } while (Math.round(current * r) / r >= thresh && u < units.length - 1);

  return `${current.toFixed(precision)} ${units[u]}`;
};

/**
 * Safely downloads a Blob object on the client side via a temporary anchor element.
 * Creates an ObjectURL, simulates a download click, removes the anchor, and revokes the ObjectURL.
 *
 * @param blob - The Blob data to download
 * @param filename - Target filename for the download
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', url);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  window.URL.revokeObjectURL(url);
};

/**
 * Safe client-side file exporter creating an ObjectURL from Blob, string, or plain object/data.
 *
 * @param content - Content to export (Blob, string, or JSON-serializable object)
 * @param filename - Target filename for the downloaded file
 * @param mimeType - Optional MIME type override
 */
export const downloadFile = (
  content: Blob | string | object,
  filename: string,
  mimeType?: string,
): void => {
  let blob: Blob;
  if (content instanceof Blob) {
    blob = content;
  } else if (typeof content === 'string') {
    blob = new Blob([content], { type: mimeType ?? 'text/plain;charset=utf-8' });
  } else {
    blob = new Blob([JSON.stringify(content, null, 2)], {
      type: mimeType ?? 'application/json;charset=utf-8',
    });
  }
  downloadBlob(blob, filename);
};

export interface QuantityValue {
  /** Single numeric measurement */
  value?: number | null;
  /** Minimum numeric bound in an interval or range */
  min?: number | null;
  /** Maximum numeric bound in an interval or range */
  max?: number | null;
  /** Measurement unit (e.g. 'm', '°C', 'mg/L', or '1' for dimensionless) */
  unit?: string | null;
  /** Fallback raw value string (e.g. from legacy or unstructured data) */
  rawValue?: string | null;
  /** Optional LinkML / NMDC snake_case compatibility */
  has_numeric_value?: number | null;
  has_minimum_numeric_value?: number | null;
  has_maximum_numeric_value?: number | null;
  has_unit?: string | null;
  has_raw_value?: string | null;
}

/**
 * Physical measurement and range formatter for QuantityValue objects.
 * Handles dimensionless units (unit === '1'), single values, intervals (min - max unit),
 * and bounded values (> min, < max).
 *
 * @param quantity - QuantityValue measurement object or null/undefined
 * @returns Formatted quantity string
 */
export const formatQuantity = (quantity: QuantityValue | null | undefined): string => {
  if (!quantity) return '';

  const val = quantity.value ?? quantity.has_numeric_value;
  const min = quantity.min ?? quantity.has_minimum_numeric_value;
  const max = quantity.max ?? quantity.has_maximum_numeric_value;
  const unit = quantity.unit ?? quantity.has_unit;
  const rawValue = quantity.rawValue ?? quantity.has_raw_value;

  const hasUnit = unit !== null && unit !== undefined && unit !== '' && unit !== '1';
  const unitSuffix = hasUnit ? ` ${unit}` : '';

  const hasMin = min !== null && min !== undefined && !Number.isNaN(min);
  const hasMax = max !== null && max !== undefined && !Number.isNaN(max);
  const hasVal = val !== null && val !== undefined && !Number.isNaN(val);

  // Interval: min - max unit
  if (hasMin && hasMax) {
    return `${min} - ${max}${unitSuffix}`;
  }

  // Bounded: > min
  if (hasMin && !hasMax && !hasVal) {
    return `> ${min}${unitSuffix}`;
  }

  // Bounded: < max
  if (hasMax && !hasMin && !hasVal) {
    return `< ${max}${unitSuffix}`;
  }

  // Single value: value unit
  if (hasVal) {
    return `${val}${unitSuffix}`;
  }

  // Fallback to rawValue if present
  if (rawValue) {
    return rawValue;
  }

  return '';
};

export interface FormatCompactNumberOptions {
  /** Maximum number of fraction digits to display @default 1 */
  precision?: number;
  /** Prefix to prepend to the number (e.g. '$') @default '' */
  prefix?: string;
  /** Suffix to append to the formatted string (e.g. '/yr') @default '' */
  suffix?: string;
  /** Locale for number formatting @default 'en-US' */
  locale?: string;
}

/**
 * Metric suffix formatter for large numbers (K, M, B, T).
 *
 * @param num - Number to format
 * @param options - Formatting options
 * @returns Formatted compact number string
 */
export const formatCompactNumber = (
  num: number | null | undefined,
  options?: FormatCompactNumberOptions,
): string => {
  if (
    num === null ||
    num === undefined ||
    typeof num !== 'number' ||
    !Number.isFinite(num)
  ) {
    return '';
  }
  const { precision = 1, prefix = '', suffix = '', locale = 'en-US' } = options ?? {};
  const isNegative = num < 0;
  const abs = Math.abs(num);

  const units = [
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ];

  let matchedIndex = units.findIndex((u) => abs >= u.value);
  let scaled = abs;
  let unitSymbol = '';

  if (matchedIndex !== -1) {
    scaled = abs / units[matchedIndex].value;
    const factor = 10 ** precision;
    // Handle rounding rollover (e.g. 999.95 rounding to 1000 at precision 1)
    if (Math.round(scaled * factor) / factor >= 1000 && matchedIndex > 0) {
      matchedIndex -= 1;
      scaled = abs / units[matchedIndex].value;
    }
    unitSymbol = units[matchedIndex].symbol;
  } else {
    // If abs < 1000, check if rounding brings it to 1000 (rolling over to 1K)
    const factor = 10 ** precision;
    if (Math.round(abs * factor) / factor >= 1000) {
      scaled = abs / 1e3;
      unitSymbol = 'K';
    }
  }

  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision,
  }).format(scaled);

  const sign = isNegative ? '-' : '';
  return `${sign}${prefix}${formattedNumber}${unitSymbol}${suffix}`;
};

