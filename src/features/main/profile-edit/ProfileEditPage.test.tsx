import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import ProfileEditPage from "./ProfileEditPage";

import {
  getProfile,
  getProfileLookups,
  updateProfile,
} from "../../../services/core/profileService";

import { getLookups } from "../../../services/core/common/helperService";

import { AuthProvider } from "../../../context/AuthProvider";

import type {
  GetProfileResponse,
  ProfileLookups,
} from "../../../types/core/profile";

import type { Lookup } from "../../../types/core/common/Lookup";

vi.mock("../../../services/core/profileService", () => ({
  getProfile: vi.fn(),
  updateProfile: vi.fn(),
  getProfileLookups: vi.fn(),
}));

vi.mock("../../../services/core/common/helperService", () => ({
  getLookups: vi.fn(),
}));

const mockGetProfile = vi.mocked(getProfile);
const mockGetProfileLookups = vi.mocked(getProfileLookups);
const mockGetLookups = vi.mocked(getLookups);
const mockUpdateProfile = vi.mocked(updateProfile);

const profileResponse: GetProfileResponse = {
  isProfileCompleted: true,
  profile: {
    id: "user-1",
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    countryId: 1,
    postcode: "G12 8QQ",
    cityId: 1,
    universityId: 1,
    degreeLevelId: 1,
    courseName: "MSc Software Development",
    hasArrived: false,
    arrivalDate: "2026-09-15",
    accommodationTypeId: 1,
  },
};

const profileLookups: ProfileLookups = {
  countries: [
    {
      countryId: 1,
      name: "United Kingdom",
      code: "GB",
      flagEmoji: "🇬🇧",
    },
  ],
  cities: [
    {
      cityId: 1,
      countryId: 1,
      name: "Glasgow",
    },
  ],
  universities: [
    {
      universityId: 1,
      cityId: 1,
      name: "University of Glasgow",
    },
  ],
};

const helperLookups: Lookup[] = [
  {
    id: 1,
    name: "Student Accommodation",
    type: "AccommodationType",
    description: "Student accommodation",
    icon: "HomeRounded",
    displayOrder: 1,
    color: "#347A62",
  },
  {
    id: 1,
    name: "Postgraduate",
    type: "DegreeLevel",
    description: "Postgraduate degree",
    icon: "SchoolRounded",
    displayOrder: 1,
    color: "#347A62",
  },
];

const renderPage = () =>
  render(
    <MemoryRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <ProfileEditPage />
        </AuthProvider>
      </LocalizationProvider>
    </MemoryRouter>,
  );

describe("ProfileEditPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockGetProfile.mockResolvedValue(profileResponse);
    mockGetProfileLookups.mockResolvedValue(profileLookups);
    mockGetLookups.mockResolvedValue(helperLookups);
    mockUpdateProfile.mockResolvedValue({
      success: true,
      message: "Profile updated successfully.",
    });
  });

  it("loads and displays the profile", async () => {
    renderPage();

    expect(
      await screen.findByDisplayValue("Test"),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("User"),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("MSc Software Development"),
    ).toBeInTheDocument();

    expect(mockGetProfile).toHaveBeenCalledTimes(1);
    expect(mockGetProfileLookups).toHaveBeenCalledTimes(1);
    expect(mockGetLookups).toHaveBeenCalledTimes(1);
  });

  it("loads the profile lookup data", async () => {
    renderPage();

    await waitFor(() => {
      expect(mockGetProfileLookups).toHaveBeenCalledTimes(1);
      expect(mockGetLookups).toHaveBeenCalledTimes(1);
    });

    expect(
      await screen.findByText("University of Glasgow"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Glasgow"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Postgraduate"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Student Accommodation"),
    ).toBeInTheDocument();
  });

  it("updates the profile", async () => {
    const user = userEvent.setup();

    renderPage();

    const firstNameInput = await screen.findByDisplayValue("Test");

    await user.clear(firstNameInput);
    await user.type(firstNameInput, "Updated");

    const saveButton = screen.getByRole("button", {
      name: /save/i,
    });

    await user.click(saveButton);

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledTimes(1);
    });

    expect(mockUpdateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "Updated",
      }),
    );
  });
});