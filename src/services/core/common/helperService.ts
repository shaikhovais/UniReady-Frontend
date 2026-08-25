import client from "../../../api/client";
import { ENDPOINTS } from "../../../api/endpoints";

import type { Lookup } from "../../../types/core/common/Lookup";
import type { Tip } from "../../../types/core/common/Tip";
import type { Setting } from "../../../types/core/common/Setting";

export const getLookups = async (types: string[]): Promise<Lookup[]> => {
  const { data } = await client.get<Lookup[]>(ENDPOINTS.helper.lookups, {
    params: {
      types,
    },
    paramsSerializer: {
      indexes: null,
    },
  });

  return data;
};

export const getTips = async (
  section: string,
  referenceId?: number,
): Promise<Tip[]> => {
  const { data } = await client.get<Tip[]>(ENDPOINTS.helper.tips, {
    params: {
      section,
      referenceId,
    },
  });

  return data;
};

export const getSettings = async (
  type?: string,
  name?: string,
): Promise<Setting[]> => {
  const { data } = await client.get<Setting[]>(ENDPOINTS.helper.settings, {
    params: {
      type,
      name,
    },
  });

  return data;
};