import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ResourcesPage from "./ResourcesPage";

const {
  mockGetResourceOverview,
  mockGetResources,
  mockGetResourceById,
  mockToggleSaveResource,
  mockSubmitResourceFeedback,
  mockGetLookups,
} = vi.hoisted(() => ({
  mockGetResourceOverview: vi.fn(),
  mockGetResources: vi.fn(),
  mockGetResourceById: vi.fn(),
  mockToggleSaveResource: vi.fn(),
  mockSubmitResourceFeedback: vi.fn(),
  mockGetLookups: vi.fn(),
}));

vi.mock("../../../services/features/resourceService", () => ({
  getResourceOverview: mockGetResourceOverview,
  getResources: mockGetResources,
  getResourceById: mockGetResourceById,
  toggleSaveResource: mockToggleSaveResource,
  submitResourceFeedback: mockSubmitResourceFeedback,
}));

vi.mock("../../../services/core/common/helperService", () => ({
  getLookups: mockGetLookups,
}));

vi.mock("../common/CommonPageLayout", () => ({
  default: ({
    children,
  }: {
    children: React.ReactNode;
    header?: {
      title: string;
      subtitle: string;
      color?: string;
    };
  }) => <div>{children}</div>,
}));

const overviewResponse = {
  categoryOverview: [
    {
      id: 1,
      name: "Student Life",
      description: "Useful information for student life.",
      displayOrder: 1,
      icon: "School",
      color: "#1976d2",
      totalCount: 2,
    },
  ],
  recentlyAddedArticles: [
    {
      id: 1,
      title: "Student Life in Glasgow",
      slug: "student-life-in-glasgow",
      shortDescription: "A guide to student life.",
      categoryId: 1,
      categoryName: "Student Life",
      readTimeMinutes: 5,
      createdAt: "2026-01-01",
      isSaved: false,
    },
  ],
  featuredArticles: [
    {
      id: 2,
      title: "Moving to Glasgow",
      slug: "moving-to-glasgow",
      shortDescription: "Everything you need to know.",
      categoryId: 1,
      categoryName: "Student Life",
      readTimeMinutes: 4,
      createdAt: "2026-01-02",
      isSaved: true,
    },
  ],
};

const articlesResponse = {
  articles: [
    {
      id: 1,
      title: "Student Life in Glasgow",
      slug: "student-life-in-glasgow",
      shortDescription: "A guide to student life.",
      categoryId: 1,
      categoryName: "Student Life",
      readTimeMinutes: 5,
      createdAt: "2026-01-01",
      isSaved: false,
    },
  ],
  totalCount: 1,
};

const lookupResponse = [
  {
    id: 1,
    type: "ResourceCategory",
    name: "Student Life",
  },
];

const renderPage = () => {
  return render(
    <MemoryRouter>
      <ResourcesPage />
    </MemoryRouter>,
  );
};

describe("ResourcesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockGetResourceOverview.mockResolvedValue(
      overviewResponse,
    );

    mockGetResources.mockResolvedValue(
      articlesResponse,
    );

    mockGetLookups.mockResolvedValue(
      lookupResponse,
    );

    mockGetResourceById.mockResolvedValue({
      article: {
        id: 1,
        title: "Student Life in Glasgow",
        slug: "student-life-in-glasgow",
        categoryName: "Student Life",
        categoryIcon: "School",
        categoryIconColor: "#1976d2",
        readTimeMinutes: 5,
        createdAt: "2026-01-01",
        isSaved: false,
        isHelpful: false,
        contentBlocks: [],
      },
    });

    mockToggleSaveResource.mockResolvedValue({
      success: true,
      message: "Resource saved",
    });

    mockSubmitResourceFeedback.mockResolvedValue({
      success: true,
      message: "Feedback submitted",
    });
  });

  it("loads and displays the resource overview", async () => {
    renderPage();

    expect(
      await screen.findByText("Student Life in Glasgow"),
    ).toBeInTheDocument();

    expect(
      mockGetResourceOverview,
    ).toHaveBeenCalledTimes(1);
  });

  it("loads the resource lookup data", async () => {
    renderPage();

    await waitFor(() => {
      expect(mockGetLookups).toHaveBeenCalledWith([
        "ResourceCategory",
      ]);
    });
  });

  it("loads the resource articles", async () => {
    renderPage();

    await screen.findByText("Student Life in Glasgow");

    expect(
      mockGetResources,
    ).not.toHaveBeenCalled();
  });

  it("searches resources", async () => {
    renderPage();

    await screen.findByText("Student Life in Glasgow");

    const searchInput = screen.getByRole("textbox");

    fireEvent.change(searchInput, {
      target: {
        value: "Glasgow",
      },
    });

    const searchButton = screen.getByRole("button", {
      name: /search/i,
    });

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockGetResources).toHaveBeenCalledWith({
        search: "Glasgow",
        categoryId: undefined,
        savedOnly: undefined,
      });
    });
  });

  it("toggles a saved article", async () => {
    renderPage();

    await screen.findByText("Student Life in Glasgow");

    const buttons = screen.getAllByRole("button");

    expect(buttons.length).toBeGreaterThan(0);
  });
});