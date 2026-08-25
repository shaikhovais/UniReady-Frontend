import client from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";

import type { ApiResponse } from "../../types/core/common/apiResponse";

import type {
  ShoppingListsResponse,
  ShoppingItemRequest,
  CreateShoppingStoreRequest,
  CreateShoppingListRequest,
} from "../../types/features/shoppingLists";

export const getShoppingLists = async (): Promise<ShoppingListsResponse> => {
  const { data } = await client.get<ShoppingListsResponse>(
    ENDPOINTS.shoppingLists.get,
  );

  return data;
};

export const saveShoppingItem = async (
  request: ShoppingItemRequest,
): Promise<ApiResponse> => {
  const { data } = await client.post<ApiResponse>(
    ENDPOINTS.shoppingLists.items,
    request,
  );

  return data;
};

export const deleteShoppingItem = async (
  itemId: number,
): Promise<ApiResponse> => {
  const { data } = await client.delete<ApiResponse>(
    ENDPOINTS.shoppingLists.item(itemId),
  );

  return data;
};

export const createShoppingStore = async (
  request: CreateShoppingStoreRequest,
): Promise<ApiResponse> => {
  const { data } = await client.post<ApiResponse>(
    ENDPOINTS.shoppingLists.stores,
    request,
  );

  return data;
};

export const createShoppingList = async (
  request: CreateShoppingListRequest,
): Promise<ApiResponse> => {
  const { data } = await client.post<ApiResponse>(
    ENDPOINTS.shoppingLists.lists,
    request,
  );

  return data;
};

export const deleteShoppingList = async (
  listId: number,
): Promise<ApiResponse> => {
  const { data } = await client.delete<ApiResponse>(
    ENDPOINTS.shoppingLists.list(listId),
  );

  return data;
};
