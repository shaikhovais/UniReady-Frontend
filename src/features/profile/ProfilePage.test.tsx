import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  mockNavigate,
  mockRefreshProfile,
  mockUpdateProfile,
  mockGetProfileLookups,
  mockGetLookups,
} = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockRefreshProfile: vi.fn(),
  mockUpdateProfile: vi.fn(),
  mockGetProfileLookups: vi.fn(),
  mockGetLookups: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    refreshProfile: mockRefreshProfile,
  }),
}));

vi.mock("../../services/core/profileService", () => ({
  getProfileLookups: mockGetProfileLookups,
  updateProfile: mockUpdateProfile,
}));

vi.mock("../../services/core/common/helperService", () => ({
  getLookups: mockGetLookups,
}));

vi.mock("./components/ProfileProgress", () => ({
  default: ({ currentStep }: { currentStep: number }) => (
    <div data-testid="current-step">{currentStep}</div>
  ),
}));

vi.mock("./components/ProfileImage", () => ({
  default: () => <div data-testid="profile-image" />,
}));

vi.mock("../../components/TipCard", () => ({
  default: () => <div data-testid="tip-card" />,
}));

vi.mock("./components/StepAboutYou", () => ({
  default: ({
    onChange,
  }: {
    onChange: (field: string, value: unknown) => void;
  }) => (
    <button
      onClick={() => {
        onChange("firstName", "Test");
        onChange("lastName", "User");
        onChange("countryId", 1);
      }}
    >
      Complete Step 1
    </button>
  ),
}));

vi.mock("./components/StepStudies", () => ({
  default: ({
    onChange,
  }: {
    onChange: (field: string, value: unknown) => void;
  }) => (
    <button
      onClick={() => {
        onChange("cityId", 1);
        onChange("universityId", 1);
        onChange("degreeLevelId", 1);
        onChange("courseName", "MSc Software Development");
      }}
    >
      Complete Step 2
    </button>
  ),
}));

vi.mock("./components/StepJourney", () => ({
  default: ({
    onChange,
  }: {
    onChange: (field: string, value: unknown) => void;
  }) => (
    <button
      onClick={() => {
        onChange("hasArrived", true);
        onChange("arrivalDate", "2026-09-01");
        onChange("accommodationTypeId", 1);
      }}
    >
      Complete Step 3
    </button>
  ),
}));

import ProfilePage from "./ProfilePage";

describe("ProfilePage save flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockGetProfileLookups.mockResolvedValue({
      countries: [],
      cities: [],
      universities: [],
    });

    mockGetLookups.mockResolvedValue([
      {
        id: 1,
        name: "Looking for accommodation",
        type: "AccommodationType",
      },
      {
        id: 1,
        name: "Postgraduate Taught",
        type: "DegreeLevel",
      },
    ]);

    mockUpdateProfile.mockResolvedValue({
      success: true,
      message: "Profile updated successfully.",
    });

    mockRefreshProfile.mockResolvedValue(undefined);
  });

  it("calls updateProfile with the completed profile", async () => {
    render(<ProfilePage />);

    await screen.findByText("Complete Step 1");

    fireEvent.click(screen.getByText("Complete Step 1"));
    fireEvent.click(screen.getByText("Continue"));

    await screen.findByText("Complete Step 2");

    fireEvent.click(screen.getByText("Complete Step 2"));
    fireEvent.click(screen.getByText("Continue"));

    await screen.findByText("Complete Step 3");

    fireEvent.click(screen.getByText("Complete Step 3"));
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledTimes(1);
    });

    expect(mockUpdateProfile).toHaveBeenCalledWith({
      id: "",
      email: "",
      firstName: "Test",
      lastName: "User",
      countryId: 1,
      cityId: 1,
      universityId: 1,
      degreeLevelId: 1,
      courseName: "MSc Software Development",
      hasArrived: true,
      arrivalDate: "2026-09-01",
      accommodationTypeId: 1,
      postcode: "",
    });
  });

  it("refreshes the profile after a successful save", async () => {
    render(<ProfilePage />);

    await screen.findByText("Complete Step 1");

    fireEvent.click(screen.getByText("Complete Step 1"));
    fireEvent.click(screen.getByText("Continue"));

    await screen.findByText("Complete Step 2");

    fireEvent.click(screen.getByText("Complete Step 2"));
    fireEvent.click(screen.getByText("Continue"));

    await screen.findByText("Complete Step 3");

    fireEvent.click(screen.getByText("Complete Step 3"));
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(mockRefreshProfile).toHaveBeenCalledTimes(1);
    });
  });

  it("navigates to the dashboard after a successful save", async () => {
    render(<ProfilePage />);

    await screen.findByText("Complete Step 1");

    fireEvent.click(screen.getByText("Complete Step 1"));
    fireEvent.click(screen.getByText("Continue"));

    await screen.findByText("Complete Step 2");

    fireEvent.click(screen.getByText("Complete Step 2"));
    fireEvent.click(screen.getByText("Continue"));

    await screen.findByText("Complete Step 3");

    fireEvent.click(screen.getByText("Complete Step 3"));
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("does not navigate when saving the profile fails", async () => {
    mockUpdateProfile.mockResolvedValue({
      success: false,
      message: "Unable to save profile.",
    });

    render(<ProfilePage />);

    await screen.findByText("Complete Step 1");

    fireEvent.click(screen.getByText("Complete Step 1"));
    fireEvent.click(screen.getByText("Continue"));

    await screen.findByText("Complete Step 2");

    fireEvent.click(screen.getByText("Complete Step 2"));
    fireEvent.click(screen.getByText("Continue"));

    await screen.findByText("Complete Step 3");

    fireEvent.click(screen.getByText("Complete Step 3"));
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(screen.getByText("Unable to save profile.")).toBeInTheDocument();
    });

    expect(mockRefreshProfile).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});