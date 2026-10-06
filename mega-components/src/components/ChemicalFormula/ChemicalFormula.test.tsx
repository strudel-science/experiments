import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChemicalFormula } from "./ChemicalFormula";

describe("ChemicalFormula", () => {
  it("renders formula with accessible aria-label", () => {
    render(<ChemicalFormula content="H2O" />);
    const element = screen.getByLabelText("H2O");
    expect(element).toBeInTheDocument();
  });

  it("renders numbers as subscript tags", () => {
    render(<ChemicalFormula content="H2O" />);
    const subscripts = screen.getAllByTestId("formula-subscript");
    expect(subscripts).toHaveLength(1);
    expect(subscripts[0]).toHaveTextContent("2");
  });

  it("handles complex formulas with multiple subscripts", () => {
    render(<ChemicalFormula content="Fe2(SO4)3" />);
    const subscripts = screen.getAllByTestId("formula-subscript");
    expect(subscripts).toHaveLength(3);
    expect(subscripts.map((s) => s.textContent)).toEqual(["2", "4", "3"]);
  });

  it("applies custom class names", () => {
    render(<ChemicalFormula content="NaCl" className="text-blue-600" />);
    const element = screen.getByLabelText("NaCl");
    expect(element).toHaveClass("text-blue-600");
  });
});
