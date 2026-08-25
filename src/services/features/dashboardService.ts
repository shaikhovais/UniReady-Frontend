import client from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";

import type { DashboardResponse } from "../../types/features/dashboard";

export const getDashboard = async (): Promise<DashboardResponse> => {
  const { data } = await client.get<DashboardResponse>(ENDPOINTS.dashboard.get);

  return data;
};
