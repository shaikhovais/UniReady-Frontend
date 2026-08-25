import client from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";

import type { ApiResponse } from "../../types/core/common/apiResponse";

import type {
  JourneyResponse,
  UpdateJourneyTaskRequest,
} from "../../types/features/journey";

export const getJourney = async (): Promise<JourneyResponse> => {
  const { data } = await client.get<JourneyResponse>(
    ENDPOINTS.journey.get
  );

  return data;
};

export const updateJourneyTask = async (
  userJourneyTaskId: number,
  request: UpdateJourneyTaskRequest
): Promise<ApiResponse> => {
  const { data } = await client.put<ApiResponse>(
    ENDPOINTS.journey.update(userJourneyTaskId),
    request
  );

  return data;
};