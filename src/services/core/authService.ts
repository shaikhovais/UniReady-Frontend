import client from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";

import type {
  AuthRequest,
  AuthResponse,
} from "../../types/core/auth";

import type { ApiResponse } from "../../types/core/common/apiResponse";

export const login = async (
  request: AuthRequest,
): Promise<AuthResponse> => {
  const { data } = await client.post<AuthResponse>(
    ENDPOINTS.auth.login,
    request,
  );

  return data;
};

export const register = async (
  request: AuthRequest,
): Promise<AuthResponse> => {
  const { data } = await client.post<AuthResponse>(
    ENDPOINTS.auth.register,
    request,
  );

  return data;
};

export const requestPasswordReset = async (
  email: string,
): Promise<ApiResponse> => {
  const { data } = await client.post<ApiResponse>(
    ENDPOINTS.auth.requestPasswordReset,
    { email },
  );

  return data;
};

export const verifyResetOtp = async (
  email: string,
  otp: string,
): Promise<ApiResponse> => {
  const { data } = await client.post<ApiResponse>(
    ENDPOINTS.auth.verifyResetOtp,
    {
      email,
      otp,
    },
  );

  return data;
};

export const resetPassword = async (
  email: string,
  password: string,
): Promise<ApiResponse> => {
  const { data } = await client.post<ApiResponse>(
    ENDPOINTS.auth.resetPassword,
    {
      email,
      password,
    },
  );

  return data;
};