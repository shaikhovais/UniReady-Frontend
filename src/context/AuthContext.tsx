import { createContext } from "react";

import type { AuthRequest, AuthResponse } from "../types/core/auth";
import type { UserProfile } from "../types/core/profile";

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isProfileCompleted: boolean;
  isLoading: boolean;
  showAllMenu: boolean;

  login: (credentials: AuthRequest) => Promise<AuthResponse>;
  register: (credentials: AuthRequest) => Promise<AuthResponse>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  setShowAllMenu: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);