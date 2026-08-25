import { useEffect, useState, type ReactNode } from "react";

import { AuthContext } from "./AuthContext";
import { tokenStorage } from "../utils/storage";

import { getProfile } from "../services/core/profileService";

import {
  login as loginUser,
  register as registerUser,
} from "../services/core/authService";

import type { UserProfile } from "../types/core/profile";
import type { AuthRequest } from "../types/core/auth";

interface Props {
  children: ReactNode;
}

const SHOW_ALL_MENU_KEY = "uniready-show-all-menu";

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    tokenStorage.exists(),
  );
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  const [showAllMenu, setShowAllMenuState] = useState(() => {
    return sessionStorage.getItem(SHOW_ALL_MENU_KEY) === "true";
  });

  const setShowAllMenu = (value: boolean) => {
    setShowAllMenuState(value);
    sessionStorage.setItem(
      SHOW_ALL_MENU_KEY,
      String(value),
    );
  };

  const refreshProfile = async () => {
    const response = await getProfile();

    setIsProfileCompleted(response.isProfileCompleted);

    if (response.isProfileCompleted) {
      setUser(response.profile);
    } else {
      setUser(null);
    }
  };

  const login = async (credentials: AuthRequest) => {
    const response = await loginUser(credentials);

    tokenStorage.set(response.token);

    setIsAuthenticated(true);

    await refreshProfile();

    return response;
  };

  const register = async (credentials: AuthRequest) => {
    const response = await registerUser(credentials);

    tokenStorage.set(response.token);

    setIsAuthenticated(true);
    setIsProfileCompleted(false);

    return response;
  };

  const logout = () => {
    tokenStorage.remove();

    sessionStorage.removeItem(SHOW_ALL_MENU_KEY);

    setUser(null);
    setIsAuthenticated(false);
    setIsProfileCompleted(false);
    setShowAllMenuState(false);
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        if (tokenStorage.exists()) {
          setIsAuthenticated(true);

          await refreshProfile();
        }
      } catch (error) {
        console.error(
          "Failed to initialise authentication.",
          error,
        );

        tokenStorage.remove();

        sessionStorage.removeItem(SHOW_ALL_MENU_KEY);

        setUser(null);
        setIsAuthenticated(false);
        setIsProfileCompleted(false);
        setShowAllMenuState(false);
      } finally {
        setIsLoading(false);
      }
    };

    void initialise();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isProfileCompleted,
        isLoading,
        showAllMenu,
        login,
        register,
        logout,
        refreshProfile,
        setShowAllMenu,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}