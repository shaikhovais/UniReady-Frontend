import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AuthContext } from "../context/AuthContext";
import { useAuth } from "./useAuth";

describe("useAuth", () => {
  it("returns the auth context", () => {
    const contextValue = {
      isAuthenticated: false,
      isProfileCompleted: false,
      isLoading: false,
    } as never;

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toBe(contextValue);
  });

  it("throws when used outside AuthProvider", () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth must be used inside AuthProvider.");
  });
});