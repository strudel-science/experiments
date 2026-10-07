import { describe, expect, it } from "vitest";
import {
  cn,
  formatScientificNumber,
  hasValue,
  parseChemicalFormula,
  rangeHasValue,
  snakeToTitleCase,
  toTitleCase,
  truncateString,
  VALID_ELEMENTS,
} from "./utils";

describe("utils", () => {
  describe("cn", () => {
    it("merges class names correctly", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
      const isHidden = false;
      expect(cn("p-4", isHidden && "hidden", "text-red-500")).toBe("p-4 text-red-500");
    });
  });

  describe("string utilities", () => {
    describe("snakeToTitleCase", () => {
      it("converts snake_case to Title Case", () => {
        expect(snakeToTitleCase("sample_collection_date")).toBe("Sample Collection Date");
        expect(snakeToTitleCase("temperature")).toBe("Temperature");
        expect(snakeToTitleCase("")).toBe("");
      });
    });

    describe("toTitleCase", () => {
      it("converts camelCase, kebab-case, and snake_case to Title Case", () => {
        expect(toTitleCase("firstName")).toBe("First Name");
        expect(toTitleCase("target-sample-id")).toBe("Target Sample Id");
        expect(toTitleCase("dna_sequence_read")).toBe("Dna Sequence Read");
      });
    });

    describe("truncateString", () => {
      it("truncates string with ellipsis when longer than maxLength", () => {
        expect(truncateString("VeryLongScientificName", 10)).toBe("VeryLon...");
        expect(truncateString("Short", 10)).toBe("Short");
      });
    });
  });

  describe("scientific utilities", () => {
    describe("VALID_ELEMENTS", () => {
      it("contains fundamental periodic elements", () => {
        expect(VALID_ELEMENTS).toContain("H");
        expect(VALID_ELEMENTS).toContain("Fe");
        expect(VALID_ELEMENTS).toContain("Og");
      });
    });

    describe("parseChemicalFormula", () => {
      it("parses simple formula like H2O", () => {
        const tokens = parseChemicalFormula("H2O");
        expect(tokens).toEqual([
          { text: "H", type: "element" },
          { text: "2", type: "number" },
          { text: "O", type: "element" },
        ]);
      });

      it("parses complex formula with parentheses like Fe(NO3)3", () => {
        const tokens = parseChemicalFormula("Fe(NO3)3");
        expect(tokens).toEqual([
          { text: "Fe", type: "element" },
          { text: "(", type: "symbol" },
          { text: "N", type: "element" },
          { text: "O", type: "element" },
          { text: "3", type: "number" },
          { text: ")", type: "symbol" },
          { text: "3", type: "number" },
        ]);
      });
    });

    describe("hasValue", () => {
      it("returns true for 0 and false", () => {
        expect(hasValue(0)).toBe(true);
        expect(hasValue(false)).toBe(true);
      });

      it("returns false for empty arrays and null/undefined/empty string", () => {
        expect(hasValue([])).toBe(false);
        expect(hasValue(null)).toBe(false);
        expect(hasValue(undefined)).toBe(false);
        expect(hasValue("")).toBe(false);
      });

      it("returns true for non-empty arrays and strings", () => {
        expect(hasValue(["a"])).toBe(true);
        expect(hasValue("data")).toBe(true);
      });
    });

    describe("rangeHasValue", () => {
      it("returns true when values differ from min/max bounds", () => {
        expect(rangeHasValue([10, 50], 0, 100)).toBe(true);
      });

      it("returns false when values match min and max bounds", () => {
        expect(rangeHasValue([0, 100], 0, 100)).toBe(false);
      });
    });

    describe("formatScientificNumber", () => {
      it("formats very large numbers with exponential notation", () => {
        expect(formatScientificNumber(1500000)).toBe("1.500e+6");
      });

      it("formats moderate numbers as standard floats", () => {
        expect(formatScientificNumber(42.5)).toBe("42.5");
      });

      it("handles zero gracefully", () => {
        expect(formatScientificNumber(0)).toBe("0");
      });
    });
  });
});
