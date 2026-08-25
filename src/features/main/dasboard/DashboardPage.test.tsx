import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import DashboardPage from "./DashboardPage";

import { getDashboard } from "../../../services/features/dashboardService";

import type { DashboardResponse } from "../../../types/features/dashboard";

vi.mock("../../../services/features/dashboardService", () => ({
  getDashboard: vi.fn(),
}));

vi.mock("../../../services/core/profileService", () => ({
  updateArrivalDate: vi.fn(),
}));

vi.mock("../../../services/features/budgetService", () => ({
  getBudgetOverview: vi.fn(),
  saveExpense: vi.fn(),
}));

vi.mock("../../../services/features/shoppinglistsService", () => ({
  createShoppingStore: vi.fn(),
  getShoppingLists: vi.fn(),
  saveShoppingItem: vi.fn(),
}));

vi.mock("../../../services/core/common/helperService", () => ({
  getLookups: vi.fn(),
}));

vi.mock("../common/CommonPageLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="common-page-layout">{children}</div>
  ),
}));

vi.mock("../../../components/Loader", () => ({
  default: () => <div data-testid="page-loader">Loading...</div>,
}));

vi.mock("./components/ArrivalCard", () => ({
  default: () => <div data-testid="arrival-card">Arrival</div>,
}));

vi.mock("./components/JourneyCard", () => ({
  default: () => <div data-testid="journey-card">Journey</div>,
}));

vi.mock("./components/UpcomingDeadlinesCard", () => ({
  default: () => (
    <div data-testid="deadlines-card">Upcoming Deadlines</div>
  ),
}));

vi.mock("./components/GuideCard", () => ({
  default: () => <div data-testid="guide-card">Guides</div>,
}));

vi.mock("./components/ChecklistCard", () => ({
  default: () => <div data-testid="checklist-card">Checklist</div>,
}));

vi.mock("./components/BudgetPlannerCard", () => ({
  default: () => <div data-testid="budget-card">Budget</div>,
}));

vi.mock("./components/ShoppingListsCard", () => ({
  default: () => <div data-testid="shopping-card">Shopping</div>,
}));

vi.mock("../budget-planner/components/ManageExpenseDialog", () => ({
  default: () => null,
}));

vi.mock("../shopping-lists/components/ShoppingItemDialog", () => ({
  default: () => null,
}));

vi.mock("../shopping-lists/components/CreateShoppingStoreDialog", () => ({
  default: () => null,
}));

const mockGetDashboard = vi.mocked(getDashboard);

const preArrivalDashboard: DashboardResponse = {
  isPostArrival: false,
  arrival: {
    cityName: "Glasgow",
    arrivalDate: "2026-09-01",
    daysUntilArrival: 10,
    preparationProgressPercentage: 40,
  },
  journeyOverview: {
    totalTasks: 10,
    completedTasks: 4,
    inProgressTasks: 2,
    pendingTasks: 4,
    completionPercentage: 40,
  },
  upcomingDeadlines: [],
  featuredResources: [],
  savedResources: [],
  preArrival: {
    preparationChecklist: {
      totalItems: 10,
      gotItItems: 4,
      needToBuyItems: 2,
      toReviewItems: 1,
      notNeededItems: 3,
      categories: [],
    },
  },
};

const postArrivalDashboard: DashboardResponse = {
  isPostArrival: true,
  arrival: {
    cityName: "Glasgow",
    arrivalDate: "2026-08-01",
    daysUntilArrival: null,
    preparationProgressPercentage: 100,
  },
  journeyOverview: {
    totalTasks: 10,
    completedTasks: 5,
    inProgressTasks: 2,
    pendingTasks: 3,
    completionPercentage: 50,
  },
  upcomingDeadlines: [],
  featuredResources: [],
  savedResources: [],
  postArrival: {
    budgetOverview: {
      monthlyBudget: 1000,
      spent: 300,
      remaining: 700,
      savingsGoal: 200,
      spentPercentage: 30,
      remainingPercentage: 70,
    },
    recentPayments: [],
    upcomingBills: [],
    shoppingLists: {
      totalLists: 0,
      totalItems: 0,
      checkedItems: 0,
      pendingItems: 0,
      lists: [],
    },
  },
};

const renderPage = () =>
  render(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>
  );

describe("DashboardPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows the loader while the dashboard is loading", async () => {
    let resolveDashboard:
      | ((value: DashboardResponse) => void)
      | undefined;

    mockGetDashboard.mockImplementation(
      () =>
        new Promise<DashboardResponse>((resolve) => {
          resolveDashboard = resolve;
        })
    );

    renderPage();

    expect(
      screen.getByTestId("page-loader")
    ).toBeInTheDocument();

    resolveDashboard?.(preArrivalDashboard);

    await waitFor(() => {
      expect(
        screen.queryByTestId("page-loader")
      ).not.toBeInTheDocument();
    });
  });

  it("loads and renders the pre-arrival dashboard", async () => {
    mockGetDashboard.mockResolvedValue(preArrivalDashboard);

    renderPage();

    await waitFor(() => {
      expect(mockGetDashboard).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.getByTestId("arrival-card")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("checklist-card")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("deadlines-card")
    ).toBeInTheDocument();
  });

  it("loads and renders the post-arrival dashboard", async () => {
    mockGetDashboard.mockResolvedValue(postArrivalDashboard);

    renderPage();

    await waitFor(() => {
      expect(mockGetDashboard).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.getByTestId("arrival-card")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("budget-card")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("shopping-card")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("deadlines-card")
    ).toBeInTheDocument();
  });
});