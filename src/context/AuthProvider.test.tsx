import { useContext } from "react";
import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AuthContext } from "./AuthContext";
import { AuthProvider } from "./AuthProvider";
import type { UserProfile } from "../types/core/profile";
import { tokenStorage } from "../utils/storage";
import { getProfile } from "../services/core/profileService";
import {
  login as loginUser,
  register as registerUser,
} from "../services/core/authService";

vi.mock("../utils/storage", () => ({
  tokenStorage: {
    exists: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

vi.mock("../services/core/profileService", () => ({
  getProfile: vi.fn(),
}));

vi.mock("../services/core/authService", () => ({
  login: vi.fn(),
  register: vi.fn(),
}));

function TestConsumer() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext is not available.");
  }

  return (
    <div>
      <span data-testid="authenticated">
        {String(context.isAuthenticated)}
      </span>

      <span data-testid="profile-completed">
        {String(context.isProfileCompleted)}
      </span>

      <span data-testid="loading">
        {String(context.isLoading)}
      </span>

      <span data-testid="show-all-menu">
        {String(context.showAllMenu)}
      </span>

      <button
        onClick={() =>
          void context.login({
            email: "test@test.com",
            password: "TestPassword123!",
          })
        }
      >
        Login
      </button>

      <button
        onClick={() =>
          void context.register({
            email: "test@test.com",
            password: "TestPassword123!",
          })
        }
      >
        Register
      </button>

      <button onClick={context.logout}>Logout</button>

      <button onClick={() => context.setShowAllMenu(true)}>
        Show Menu
      </button>
    </div>
  );
}

function renderProvider() {
  return render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>,
  );
}

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();

    vi.mocked(tokenStorage.exists).mockReturnValue(false);
  });

  it("starts unauthenticated when no token exists", async () => {
    renderProvider();

    expect(screen.getByTestId("authenticated")).toHaveTextContent(
      "false",
    );

    expect(screen.getByTestId("loading")).toHaveTextContent(
      "false",
    );

    expect(screen.getByTestId("profile-completed")).toHaveTextContent(
      "false",
    );
  });

  it("logs in and loads a completed profile", async () => {
    const profile = {} as UserProfile;

    vi.mocked(loginUser).mockResolvedValue({
      token: "test-token",
    } as never);

    vi.mocked(getProfile).mockResolvedValue({
      isProfileCompleted: true,
      profile,
    } as never);

    renderProvider();

    await act(async () => {
      screen.getByRole("button", { name: "Login" }).click();
    });

    expect(loginUser).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "TestPassword123!",
    });

    expect(tokenStorage.set).toHaveBeenCalledWith("test-token");

    expect(getProfile).toHaveBeenCalled();

    expect(screen.getByTestId("authenticated")).toHaveTextContent(
      "true",
    );

    expect(screen.getByTestId("profile-completed")).toHaveTextContent(
      "true",
    );
  });

  it("logs in with an incomplete profile", async () => {
    vi.mocked(loginUser).mockResolvedValue({
      token: "test-token",
    } as never);

    vi.mocked(getProfile).mockResolvedValue({
      isProfileCompleted: false,
      profile: null,
    } as never);

    renderProvider();

    await act(async () => {
      screen.getByRole("button", { name: "Login" }).click();
    });

    expect(screen.getByTestId("authenticated")).toHaveTextContent(
      "true",
    );

    expect(screen.getByTestId("profile-completed")).toHaveTextContent(
      "false",
    );
  });

  it("registers a user and marks the profile as incomplete", async () => {
    vi.mocked(registerUser).mockResolvedValue({
      token: "register-token",
    } as never);

    renderProvider();

    await act(async () => {
      screen.getByRole("button", { name: "Register" }).click();
    });

    expect(registerUser).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "TestPassword123!",
    });

    expect(tokenStorage.set).toHaveBeenCalledWith(
      "register-token",
    );

    expect(screen.getByTestId("authenticated")).toHaveTextContent(
      "true",
    );

    expect(screen.getByTestId("profile-completed")).toHaveTextContent(
      "false",
    );

    expect(getProfile).not.toHaveBeenCalled();
  });

  it("logs out and clears authentication state", async () => {
    vi.mocked(tokenStorage.exists).mockReturnValue(true);

    vi.mocked(getProfile).mockResolvedValue({
      isProfileCompleted: true,
      profile: {} as UserProfile,
    } as never);

    renderProvider();

    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      screen.getByRole("button", { name: "Logout" }).click();
    });

    expect(tokenStorage.remove).toHaveBeenCalled();

    expect(screen.getByTestId("authenticated")).toHaveTextContent(
      "false",
    );

    expect(screen.getByTestId("profile-completed")).toHaveTextContent(
      "false",
    );

    expect(screen.getByTestId("show-all-menu")).toHaveTextContent(
      "false",
    );
  });

  it("persists the show all menu setting", async () => {
    renderProvider();

    await act(async () => {
      screen.getByRole("button", { name: "Show Menu" }).click();
    });

    expect(screen.getByTestId("show-all-menu")).toHaveTextContent(
      "true",
    );

    expect(
      sessionStorage.getItem("uniready-show-all-menu"),
    ).toBe("true");
  });

  it("restores an authenticated session when a token exists", async () => {
    vi.mocked(tokenStorage.exists).mockReturnValue(true);

    vi.mocked(getProfile).mockResolvedValue({
      isProfileCompleted: true,
      profile: {} as UserProfile,
    } as never);

    renderProvider();

    await act(async () => {
      await Promise.resolve();
    });

    expect(getProfile).toHaveBeenCalled();

    expect(screen.getByTestId("authenticated")).toHaveTextContent(
      "true",
    );

    expect(screen.getByTestId("profile-completed")).toHaveTextContent(
      "true",
    );
  });

  it("clears authentication when session restoration fails", async () => {
    vi.mocked(tokenStorage.exists).mockReturnValue(true);

    vi.mocked(getProfile).mockRejectedValue(
      new Error("Profile request failed"),
    );

    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    renderProvider();

    await act(async () => {
      await Promise.resolve();
    });

    expect(tokenStorage.remove).toHaveBeenCalled();

    expect(screen.getByTestId("authenticated")).toHaveTextContent(
      "false",
    );

    expect(screen.getByTestId("profile-completed")).toHaveTextContent(
      "false",
    );

    consoleError.mockRestore();
  });
});