import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LabelValueTable } from "./LabelValueTable";

describe("LabelValueTable", () => {
  const sampleRows = [
    { label: "Sample ID", value: "SMP-1002" },
    {
      label: "Concentration",
      value: "45.2 mg/L",
      description: "Measured via HPLC",
    },
    { label: "Missing Field", value: null },
  ];

  it("renders rows with th header scope and td cells", () => {
    render(<LabelValueTable rows={sampleRows} />);
    const header = screen.getByRole("rowheader", { name: /Sample ID/i });
    expect(header).toBeInTheDocument();
    expect(screen.getByText("SMP-1002")).toBeInTheDocument();
  });

  it("renders row descriptions when present", () => {
    render(<LabelValueTable rows={sampleRows} />);
    expect(screen.getByText("Measured via HPLC")).toBeInTheDocument();
  });

  it("displays fallback text when value is null or undefined", () => {
    render(<LabelValueTable rows={sampleRows} />);
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });
});
