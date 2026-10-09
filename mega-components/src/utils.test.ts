import { describe, expect, it, vi } from 'vitest';
import {
  cn,
  downloadBlob,
  downloadFile,
  formatCompactNumber,
  formatFileSize,
  formatQuantity,
  formatScientificNumber,
  hasValue,
  parseChemicalFormula,
  rangeHasValue,
  snakeToTitleCase,
  toTitleCase,
  truncateString,
  VALID_ELEMENTS,
} from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
      const isHidden = false;
      expect(cn('p-4', isHidden && 'hidden', 'text-red-500')).toBe('p-4 text-red-500');
    });
  });

  describe('string utilities', () => {
    describe('snakeToTitleCase', () => {
      it('converts snake_case to Title Case', () => {
        expect(snakeToTitleCase('sample_collection_date')).toBe('Sample Collection Date');
        expect(snakeToTitleCase('temperature')).toBe('Temperature');
        expect(snakeToTitleCase('')).toBe('');
      });
    });

    describe('toTitleCase', () => {
      it('converts camelCase, kebab-case, and snake_case to Title Case', () => {
        expect(toTitleCase('firstName')).toBe('First Name');
        expect(toTitleCase('target-sample-id')).toBe('Target Sample Id');
        expect(toTitleCase('dna_sequence_read')).toBe('Dna Sequence Read');
      });
    });

    describe('truncateString', () => {
      it('truncates string with ellipsis when longer than maxLength', () => {
        expect(truncateString('VeryLongScientificName', 10)).toBe('VeryLon...');
        expect(truncateString('Short', 10)).toBe('Short');
      });
    });
  });

  describe('scientific utilities', () => {
    describe('VALID_ELEMENTS', () => {
      it('contains fundamental periodic elements', () => {
        expect(VALID_ELEMENTS).toContain('H');
        expect(VALID_ELEMENTS).toContain('Fe');
        expect(VALID_ELEMENTS).toContain('Og');
      });
    });

    describe('parseChemicalFormula', () => {
      it('parses simple formula like H2O', () => {
        const tokens = parseChemicalFormula('H2O');
        expect(tokens).toEqual([
          { text: 'H', type: 'element' },
          { text: '2', type: 'number' },
          { text: 'O', type: 'element' },
        ]);
      });

      it('parses complex formula with parentheses like Fe(NO3)3', () => {
        const tokens = parseChemicalFormula('Fe(NO3)3');
        expect(tokens).toEqual([
          { text: 'Fe', type: 'element' },
          { text: '(', type: 'symbol' },
          { text: 'N', type: 'element' },
          { text: 'O', type: 'element' },
          { text: '3', type: 'number' },
          { text: ')', type: 'symbol' },
          { text: '3', type: 'number' },
        ]);
      });
    });

    describe('hasValue', () => {
      it('returns true for 0 and false', () => {
        expect(hasValue(0)).toBe(true);
        expect(hasValue(false)).toBe(true);
      });

      it('returns false for empty arrays and null/undefined/empty string', () => {
        expect(hasValue([])).toBe(false);
        expect(hasValue(null)).toBe(false);
        expect(hasValue(undefined)).toBe(false);
        expect(hasValue('')).toBe(false);
      });

      it('returns true for non-empty arrays and strings', () => {
        expect(hasValue(['a'])).toBe(true);
        expect(hasValue('data')).toBe(true);
      });
    });

    describe('rangeHasValue', () => {
      it('returns true when values differ from min/max bounds', () => {
        expect(rangeHasValue([10, 50], 0, 100)).toBe(true);
      });

      it('returns false when values match min and max bounds', () => {
        expect(rangeHasValue([0, 100], 0, 100)).toBe(false);
      });
    });

    describe('formatScientificNumber', () => {
      it('formats very large numbers with exponential notation', () => {
        expect(formatScientificNumber(1500000)).toBe('1.500e+6');
      });

      it('formats moderate numbers as standard floats', () => {
        expect(formatScientificNumber(42.5)).toBe('42.5');
      });

      it('handles zero gracefully', () => {
        expect(formatScientificNumber(0)).toBe('0');
      });
    });

    describe('formatFileSize', () => {
      it('formats 0 bytes as 0 B', () => {
        expect(formatFileSize(0)).toBe('0 B');
      });

      it('returns empty string for negative numbers, null, undefined, NaN, or non-finite numbers', () => {
        expect(formatFileSize(-100)).toBe('');
        expect(formatFileSize(null)).toBe('');
        expect(formatFileSize(undefined)).toBe('');
        expect(formatFileSize(Number.NaN)).toBe('');
        expect(formatFileSize(Number.POSITIVE_INFINITY)).toBe('');
        expect(formatFileSize(Number.NEGATIVE_INFINITY)).toBe('');
      });

      it('formats bytes under 1000 without prefix', () => {
        expect(formatFileSize(500)).toBe('500 B');
        expect(formatFileSize(999)).toBe('999 B');
      });

      it('uses decimal SI prefixes (powers of 1000) by default', () => {
        expect(formatFileSize(1000)).toBe('1.0 kB');
        expect(formatFileSize(1500000)).toBe('1.5 MB');
        expect(formatFileSize(2000000000)).toBe('2.0 GB');
        expect(formatFileSize(5000000000000)).toBe('5.0 TB');
      });

      it('supports custom precision', () => {
        expect(formatFileSize(1550, { precision: 2 })).toBe('1.55 kB');
        expect(formatFileSize(1550, { precision: 0 })).toBe('2 kB');
      });

      it('uses IEC binary prefixes (powers of 1024) when binaryPrefix is true', () => {
        expect(formatFileSize(1024, { binaryPrefix: true })).toBe('1.0 KiB');
        expect(formatFileSize(1048576, { binaryPrefix: true })).toBe('1.0 MiB');
        expect(formatFileSize(1073741824, { binaryPrefix: true })).toBe('1.0 GiB');
        expect(formatFileSize(1536, { binaryPrefix: true, precision: 2 })).toBe('1.50 KiB');
      });
    });

    describe('downloadBlob & downloadFile', () => {
      it('creates an ObjectURL, triggers download click, and revokes URL for downloadBlob', () => {
        const createSpy = vi.fn().mockReturnValue('blob:http://localhost/12345');
        const revokeSpy = vi.fn();
        window.URL.createObjectURL = createSpy;
        window.URL.revokeObjectURL = revokeSpy;

        const clickSpy = vi.fn();
        const appendChildSpy = vi.spyOn(document.body, 'appendChild');

        // Spy on anchor click
        const originalCreateElement = document.createElement.bind(document);
        vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
          const el = originalCreateElement(tagName);
          if (tagName === 'a') {
            el.click = clickSpy;
          }
          return el;
        });

        const testBlob = new Blob(['sample data'], { type: 'text/plain' });
        downloadBlob(testBlob, 'test.txt');

        expect(createSpy).toHaveBeenCalledWith(testBlob);
        expect(appendChildSpy).toHaveBeenCalled();
        expect(clickSpy).toHaveBeenCalled();
        expect(revokeSpy).toHaveBeenCalledWith('blob:http://localhost/12345');

        vi.restoreAllMocks();
      });

      it('converts string and object content into Blob for downloadFile', () => {
        const createSpy = vi.fn().mockReturnValue('blob:http://localhost/mock-url');
        const revokeSpy = vi.fn();
        window.URL.createObjectURL = createSpy;
        window.URL.revokeObjectURL = revokeSpy;

        const clickSpy = vi.fn();
        const originalCreateElement = document.createElement.bind(document);
        vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
          const el = originalCreateElement(tagName);
          if (tagName === 'a') {
            el.click = clickSpy;
          }
          return el;
        });

        // Test string download
        downloadFile('csv,data,here', 'data.csv', 'text/csv');
        expect(createSpy).toHaveBeenCalled();

        // Test object download
        downloadFile({ sample: 123 }, 'data.json');
        expect(createSpy).toHaveBeenCalledTimes(2);

        vi.restoreAllMocks();
      });
    });

    describe('formatQuantity', () => {
      it('returns empty string for null, undefined, or empty object', () => {
        expect(formatQuantity(null)).toBe('');
        expect(formatQuantity(undefined)).toBe('');
        expect(formatQuantity({})).toBe('');
      });

      it('formats single numeric value with unit', () => {
        expect(formatQuantity({ value: 25, unit: 'mg/L' })).toBe('25 mg/L');
        expect(formatQuantity({ value: 0, unit: 'm' })).toBe('0 m');
      });

      it('omits dimensionless units (unit === "1")', () => {
        expect(formatQuantity({ value: 42, unit: '1' })).toBe('42');
        expect(formatQuantity({ min: 1, max: 5, unit: '1' })).toBe('1 - 5');
      });

      it('formats intervals (min - max unit)', () => {
        expect(formatQuantity({ min: 10, max: 20, unit: '°C' })).toBe('10 - 20 °C');
        expect(formatQuantity({ min: 0, max: 100 })).toBe('0 - 100');
      });

      it('formats bounded minimum (> min)', () => {
        expect(formatQuantity({ min: 5, unit: 'pH' })).toBe('> 5 pH');
        expect(formatQuantity({ min: 10 })).toBe('> 10');
      });

      it('formats bounded maximum (< max)', () => {
        expect(formatQuantity({ max: 0.05, unit: 'ppm' })).toBe('< 0.05 ppm');
        expect(formatQuantity({ max: 100 })).toBe('< 100');
      });

      it('falls back to rawValue when numeric values are not present', () => {
        expect(formatQuantity({ rawValue: 'trace amounts' })).toBe('trace amounts');
      });

      it('supports LinkML / NMDC snake_case properties', () => {
        expect(
          formatQuantity({
            has_minimum_numeric_value: 2,
            has_maximum_numeric_value: 8,
            has_unit: 'meters',
          }),
        ).toBe('2 - 8 meters');
      });
    });

    describe('formatCompactNumber', () => {
      it('returns empty string for null, undefined, NaN, or non-finite numbers', () => {
        expect(formatCompactNumber(null)).toBe('');
        expect(formatCompactNumber(undefined)).toBe('');
        expect(formatCompactNumber(Number.NaN)).toBe('');
        expect(formatCompactNumber(Number.POSITIVE_INFINITY)).toBe('');
        expect(formatCompactNumber(Number.NEGATIVE_INFINITY)).toBe('');
      });

      it('formats zero correctly', () => {
        expect(formatCompactNumber(0)).toBe('0');
      });

      it('formats metric suffixes K, M, B, T', () => {
        expect(formatCompactNumber(500)).toBe('500');
        expect(formatCompactNumber(1000)).toBe('1K');
        expect(formatCompactNumber(1500)).toBe('1.5K');
        expect(formatCompactNumber(2500000)).toBe('2.5M');
        expect(formatCompactNumber(3800000000)).toBe('3.8B');
        expect(formatCompactNumber(4200000000000)).toBe('4.2T');
      });

      it('supports custom precision', () => {
        expect(formatCompactNumber(1234567, { precision: 2 })).toBe('1.23M');
        expect(formatCompactNumber(1234567, { precision: 0 })).toBe('1M');
      });

      it('handles boundary rounding rollovers correctly across unit tiers', () => {
        expect(formatCompactNumber(999950, { precision: 1 })).toBe('1M');
        expect(formatCompactNumber(999.6, { precision: 0 })).toBe('1K');
        expect(formatCompactNumber(-999950, { precision: 1 })).toBe('-1M');
        expect(formatCompactNumber(999999950, { precision: 1 })).toBe('1B');
      });

      it('supports prefix and suffix', () => {
        expect(formatCompactNumber(1500, { prefix: '$', suffix: '/yr' })).toBe('$1.5K/yr');
        expect(formatCompactNumber(1000000, { prefix: '#' })).toBe('#1M');
      });

      it('formats negative numbers correctly', () => {
        expect(formatCompactNumber(-1500)).toBe('-1.5K');
        expect(formatCompactNumber(-2500000, { prefix: '$' })).toBe('-$2.5M');
      });
    });
  });
});
