import { describe, expect, it } from "vitest";
import { snakeToTitleCase, toTitleCase, truncateString } from "./string";

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
