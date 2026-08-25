import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import CommonPageLayout from "./CommonPageLayout";

vi.mock("./navbar/Navbar", () => ({
  default: () => <div data-testid="navbar" />,
}));

vi.mock("./sidebar/SidebarContent", () => ({
  default: () => <div data-testid="sidebar" />,
}));

vi.mock("./featureHeader/FeatureHeader", () => ({
  default: ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) => (
    <div data-testid="feature-header">
      <span>{title}</span>
      <span>{subtitle}</span>
    </div>
  ),
}));

const renderPage = (header?: {
  title: string;
  subtitle: string;
  color?: string;
}) =>
  render(
    <MemoryRouter>
      <CommonPageLayout header={header}>
        <div data-testid="page-content">Page content</div>
      </CommonPageLayout>
    </MemoryRouter>
  );

describe("CommonPageLayout", () => {
  it("renders the common layout and page content", () => {
    renderPage();

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("page-content")).toBeInTheDocument();
  });

  it("renders the feature header when provided", () => {
    renderPage({
      title: "Budget Planner",
      subtitle: "Manage your student budget.",
    });

    expect(screen.getByTestId("feature-header")).toBeInTheDocument();
    expect(screen.getByText("Budget Planner")).toBeInTheDocument();
    expect(
      screen.getByText("Manage your student budget.")
    ).toBeInTheDocument();
  });

  it("does not render the feature header when it is not provided", () => {
    renderPage();

    expect(
      screen.queryByTestId("feature-header")
    ).not.toBeInTheDocument();
  });
});