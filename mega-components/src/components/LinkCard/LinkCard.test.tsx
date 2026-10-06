import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LinkCard } from "./LinkCard";

describe("LinkCard", () => {
  it("renders card title and description", () => {
    render(
      <LinkCard
        title="Microbiome Data Portal"
        description="Search environmental metagenomics samples."
        href="https://data.microbiomedata.org"
      />,
    );
    expect(screen.getByText("Microbiome Data Portal")).toBeInTheDocument();
    expect(screen.getByText("Search environmental metagenomics samples.")).toBeInTheDocument();
  });

  it("adds rel='noopener noreferrer' when target is _blank", () => {
    render(<LinkCard title="External Tool" href="https://example.org" target="_blank" />);
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("target", "_blank");
    expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders custom badge when provided", () => {
    render(<LinkCard title="Resource with Badge" href="/local" badge="v2.4" />);
    expect(screen.getByText("v2.4")).toBeInTheDocument();
  });
});
