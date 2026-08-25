export interface ShoppingListItem {
  id: number;
  name: string;
  iconPath?: string;
  quantity: number;
  unitId: number;
  unitName: string;
  shoppingStoreId?: number;
  userShoppingStoreId?: number;
  storeName?: string;
  storeIconPath?: string;
  estimatedPrice?: number;
  notes?: string;
  statusId: number;
  statusName: string;
  updatedAt: string;
}

export interface ShoppingList {
  id: number;
  name: string;
  description?: string;
  iconKey?: string;
  color?: string;
  bgColor?: string;
  imagePath?: string;

  totalItems: number;
  completedItems: number;
  pendingItems: number;

  items: ShoppingListItem[];
}

export interface ShoppingStore {
  id: number;
  name: string;
  iconPath?: string;
  isCustom: boolean;
}

export interface ShoppingSummary {
  totalItems: number;
  completedItems: number;
  pendingItems: number;
  estimatedTotal: number;
}

export interface ShoppingListsResponse {
  lists: ShoppingList[];
  stores: ShoppingStore[];
  summary: ShoppingSummary;
}

export interface ShoppingItemRequest {
  id?: number;
  name: string;
  iconPath?: string;
  userShoppingListId: number;
  quantity: number;
  unitId: number;
  shoppingStoreId?: number;
  userShoppingStoreId?: number;
  estimatedPrice?: number;
  notes?: string;
  statusId: number;
}

export interface CreateShoppingStoreRequest {
  name: string;
}

export interface CreateShoppingListRequest {
  name: string;
  description?: string;
}