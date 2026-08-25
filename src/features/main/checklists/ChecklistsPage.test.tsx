import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ChecklistsPage from "./ChecklistsPage";

import {
  getChecklistOverview,
} from "../../../services/features/checklistService";

import { getLookups } from "../../../services/core/common/helperService";

vi.mock("../../../services/features/checklistService", () => ({
  getChecklistOverview: vi.fn(),
  getChecklistCategory: vi.fn(),
}));

vi.mock("../../../services/core/common/helperService", () => ({
  getLookups: vi.fn(),
}));

vi.mock("../../../hooks/useAuth", () => ({
  useAuth: () => ({
    user: {
      firstName: "Test",
      lastName: "User",
      email: "test@test.com",
    },
    logout: vi.fn(),
  }),
}));

const mockGetChecklistOverview = vi.mocked(getChecklistOverview);
const mockGetLookups = vi.mocked(getLookups);

const overview = {
  overall: {
    totalItems: 10,
    progress: 40,
    gotIt: 4,
    needToBuy: 2,
    toReview: 1,
    notNeeded: 3,
  },
  categories: [
    {
      id: 1,
      name: "Documents",
      description: "Important documents for your move.",
      iconKey: "Description",
      importance: "Important",
      statistics: {
        totalItems: 4,
        progress: 50,
        gotIt: 2,
        needToBuy: 1,
        toReview: 1,
        notNeeded: 0,
      },
    },
    {
      id: 2,
      name: "Clothing",
      description: "Clothing essentials for the UK.",
      iconKey: "Checkroom",
      importance: "Optional",
      statistics: {
        totalItems: 6,
        progress: 33,
        gotIt: 2,
        needToBuy: 1,
        toReview: 0,
        notNeeded: 3,
      },
    },
  ],
};

const renderPage = () =>
  render(
    <MemoryRouter>
      <ChecklistsPage />
    </MemoryRouter>
  );

describe("ChecklistsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockGetChecklistOverview.mockResolvedValue(overview);

    mockGetLookups.mockResolvedValue([
      {
        id: 1,
        name: "Got it",
        type: "ChecklistStatus",
        description: null,
        icon: null,
        displayOrder: 1,
        color: null,
      },
      {
        id: 2,
        name: "Need to buy",
        type: "ChecklistStatus",
        description: null,
        icon: null,
        displayOrder: 2,
        color: null,
      },
      {
        id: 3,
        name: "To review",
        type: "ChecklistStatus",
        description: null,
        icon: null,
        displayOrder: 3,
        color: null,
      },
      {
        id: 4,
        name: "Not needed",
        type: "ChecklistStatus",
        description: null,
        icon: null,
        displayOrder: 4,
        color: null,
      },
      {
        id: 1,
        name: "Essential",
        type: "ChecklistImportance",
        description: null,
        icon: null,
        displayOrder: 1,
        color: null,
      },
      {
        id: 2,
        name: "Important",
        type: "ChecklistImportance",
        description: null,
        icon: null,
        displayOrder: 2,
        color: null,
      },
      {
        id: 3,
        name: "Optional",
        type: "ChecklistImportance",
        description: null,
        icon: null,
        displayOrder: 3,
        color: null,
      },
    ]);
  });

  it("loads the checklist overview", async () => {
    renderPage();

    await waitFor(() => {
      expect(mockGetChecklistOverview).toHaveBeenCalledTimes(1);
    });
  });

  it("displays checklist categories after loading", async () => {
    renderPage();

    expect(
      await screen.findByText("Documents")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Clothing")
    ).toBeInTheDocument();
  });

  it("loads the required lookup data", async () => {
    renderPage();

    await waitFor(() => {
      expect(mockGetLookups).toHaveBeenCalledTimes(1);
    });
  });

  it("renders the checklist page", async () => {
    renderPage();

    expect(
      await screen.findByText("Documents")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Clothing")
    ).toBeInTheDocument();
  });
});