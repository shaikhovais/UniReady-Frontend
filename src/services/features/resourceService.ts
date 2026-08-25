import client from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";

import type { ApiResponse } from "../../types/core/common/apiResponse";

import type {
  GetArticlesRequest,
  GetArticlesResponse,
  GetArticleDetailResponse,
  ArticleFeedbackRequest,
  GetResourceOverviewResponse,
} from "../../types/features/resource";

export const getResourceOverview =
  async (): Promise<GetResourceOverviewResponse> => {
    const { data } = await client.get<GetResourceOverviewResponse>(
      ENDPOINTS.resource.overview,
    );

    return data;
  };

export const getResources = async (
  request: GetArticlesRequest,
): Promise<GetArticlesResponse> => {
  const { data } = await client.get<GetArticlesResponse>(
    ENDPOINTS.resource.get,
    {
      params: request,
    },
  );

  return data;
};

export const getResourceById = async (
  articleId: number,
): Promise<GetArticleDetailResponse> => {
  const { data } = await client.get<GetArticleDetailResponse>(
    ENDPOINTS.resource.byId(articleId),
  );

  return data;
};

export const toggleSaveResource = async (
  articleId: number,
): Promise<ApiResponse> => {
  const { data } = await client.post<ApiResponse>(
    ENDPOINTS.resource.save(articleId),
  );

  return data;
};

export const submitResourceFeedback = async (
  articleId: number,
  request: ArticleFeedbackRequest,
): Promise<ApiResponse> => {
  const { data } = await client.post<ApiResponse>(
    ENDPOINTS.resource.feedback(articleId),
    request,
  );

  return data;
};
