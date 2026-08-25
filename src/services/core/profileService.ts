import client from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";
import type { ApiResponse } from "../../types/core/common/apiResponse";

import type {
  UserProfile,
  ProfileLookups,
  UpdateArrivalDateRequest,
  GetProfileResponse,
} from "../../types/core/profile";

export const getProfile = async (): Promise<GetProfileResponse> => {
  const { data } = await client.get<GetProfileResponse>(ENDPOINTS.profile.get);

  return data;
};

export const updateProfile = async (
  profile: UserProfile,
): Promise<ApiResponse> => {
  const { data } = await client.put(ENDPOINTS.profile.update, profile);
  return data;
};

export const updateArrivalDate = async (
  request: UpdateArrivalDateRequest,
): Promise<ApiResponse> => {
  const { data } = await client.patch<ApiResponse>(
    ENDPOINTS.profile.updateArrivalDate,
    request,
  );
  return data;
};

export const getProfileLookups = async (): Promise<ProfileLookups> => {
  const response = await client.get<ProfileLookups>(ENDPOINTS.profile.lookups);
  return response.data;
};
