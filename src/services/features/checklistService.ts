import client from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";

import type { ApiResponse } from "../../types/core/common/apiResponse";

import type {
  AddCustomChecklistItemRequest,
  ChecklistCategoryResponse,
  ChecklistOverviewResponse,
  UpdateChecklistItemRequest,
} from "../../types/features/checklist/checklist";

export const getChecklistOverview =
  async (): Promise<ChecklistOverviewResponse> => {
    const { data } = await client.get<ChecklistOverviewResponse>(
      ENDPOINTS.checklist.get
    );

    return data;
  };

export const getChecklistCategory = async (
  categoryId: number
): Promise<ChecklistCategoryResponse> => {
  const { data } = await client.get<ChecklistCategoryResponse>(
    ENDPOINTS.checklist.category(categoryId)
  );

  return data;
};

export const updateChecklistItem = async (
  userChecklistItemId: number,
  request: UpdateChecklistItemRequest
): Promise<ApiResponse> => {
  const { data } = await client.put<ApiResponse>(
    ENDPOINTS.checklist.update(userChecklistItemId),
    request
  );

  return data;
};

export const addCustomChecklistItem = async (
  request: AddCustomChecklistItemRequest
): Promise<ApiResponse> => {
  const { data } = await client.post<ApiResponse>(
    ENDPOINTS.checklist.add,
    request
  );

  return data;
};

export const deleteChecklistItem = async (
  userChecklistItemId: number
): Promise<ApiResponse> => {
  const { data } = await client.delete<ApiResponse>(
    ENDPOINTS.checklist.delete(userChecklistItemId)
  );

  return data;
};