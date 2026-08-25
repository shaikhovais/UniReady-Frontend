import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import MyJourneyPage from "./MyJourneyPage";

import { getJourney } from "../../../services/features/journeyService";

vi.mock("../../../services/features/journeyService", () => ({
  getJourney: vi.fn(),
}));

vi.mock("../../../hooks/useAuth", () => ({
  useAuth: vi.fn(() => ({
    user: {
      firstName: "Test",
      lastName: "User",
    },
  })),
}));

vi.mock("../common/CommonPageLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="common-page-layout">{children}</div>
  ),
}));

vi.mock("./components/ProgressCard", () => ({
  default: () => <div>Progress</div>,
}));

vi.mock("./components/DeadlinesCard", () => ({
  default: () => <div>Deadlines</div>,
}));

vi.mock("./components/ArrivalCard", () => ({
  default: () => <div data-testid="arrival-card">Arrival</div>,
}));

vi.mock("./components/JourneyStageCard", () => ({
  default: ({ stage }: { stage: { journeyStageName: string } }) => (
    <div data-testid="journey-stage-card">
      {stage.journeyStageName}
    </div>
  ),
}));

vi.mock("./components/TipsCard", () => ({
  default: () => <div data-testid="tips-card">Tips</div>,
}));

const mockGetJourney = vi.mocked(getJourney);

const beforeArrivalJourney = {
  header: {
    arrivalDate: "2026-09-15",
    hasArrived: false,
  },
  progress: {
    overall: {
      totalTasks: 10,
      completedTasks: 4,
      inProgressTasks: 2,
      pendingTasks: 4,
      completionPercentage: 40,
    },
    beforeArrival: {
      totalTasks: 6,
      completedTasks: 3,
      inProgressTasks: 1,
      pendingTasks: 2,
      completionPercentage: 50,
    },
    afterArrival: {
      totalTasks: 4,
      completedTasks: 1,
      inProgressTasks: 1,
      pendingTasks: 2,
      completionPercentage: 25,
    },
  },
  upcomingDeadlines: [],
  stages: [
    {
      journeyStageId: 1,
      journeyStageName: "Before Arrival",
      tasks: [],
    },
  ],
};

const afterArrivalJourney = {
  ...beforeArrivalJourney,
  header: {
    arrivalDate: "2026-08-01",
    hasArrived: true,
  },
  stages: [
    {
      journeyStageId: 2,
      journeyStageName: "After Arrival",
      tasks: [],
    },
  ],
};

describe("MyJourneyPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows the loader while the journey is loading", async () => {
    let resolveJourney!: (value: typeof beforeArrivalJourney) => void;

    mockGetJourney.mockReturnValue(
      new Promise((resolve) => {
        resolveJourney = resolve;
      })
    );

    render(<MyJourneyPage />);

    expect(
      screen.getByText("Getting everything ready...")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("progressbar")
    ).toBeInTheDocument();

    resolveJourney(beforeArrivalJourney);

    await waitFor(() => {
      expect(
        screen.getByText("Before Arrival")
      ).toBeInTheDocument();
    });
  });

  it("loads and renders the before-arrival journey", async () => {
    mockGetJourney.mockResolvedValue(beforeArrivalJourney);

    render(<MyJourneyPage />);

    await waitFor(() => {
      expect(mockGetJourney).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.getByText("Before Arrival")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("arrival-card")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("tips-card")
    ).toBeInTheDocument();
  });

  it("renders the after-arrival journey when the user has arrived", async () => {
    mockGetJourney.mockResolvedValue(afterArrivalJourney);

    render(<MyJourneyPage />);

    await waitFor(() => {
      expect(mockGetJourney).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.getByText("After Arrival")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("arrival-card")
    ).toBeInTheDocument();
  });
});