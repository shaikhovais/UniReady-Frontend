export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    requestPasswordReset: "/auth/request-password-reset",
    verifyResetOtp: "/auth/verify-reset-otp",
    resetPassword: "/auth/reset-password",
  },

  profile: {
    lookups: "/profile/lookups",
    get: "/profile",
    update: "/profile",
    updateArrivalDate: "/profile/arrival-date",
  },

  dashboard: {
    get: "/dashboard",
  },

  journey: {
    get: "/journey",
    update: (userJourneyTaskId: number) => `/journey/${userJourneyTaskId}`,
  },

  checklist: {
    get: "/checklist",
    category: (categoryId: number) => `/checklist/categories/${categoryId}`,
    update: (userChecklistItemId: number) =>
      `/checklist/items/${userChecklistItemId}`,
    add: "/checklist/custom-items",
    delete: (userChecklistItemId: number) =>
      `/checklist/items/${userChecklistItemId}`,
  },

  budget: {
    get: "/budget",
    overview: "/budget/overview",
    expenses: "/budget/expenses",
    expense: (expenseId: number) => `/budget/expenses/${expenseId}`,
    bills: "/budget/bills",
    bill: (billId: number) => `/budget/bills/${billId}`,
  },

  helper: {
    lookups: "/lookups",
    tips: "/helpers/tips",
    settings: "/helpers/settings",
  },

  resource: {
    get: "/resource",
    overview: "/resource/overview",
    byId: (articleId: number) => `/resource/${articleId}`,
    save: (articleId: number) => `/resource/${articleId}/save`,
    feedback: (articleId: number) => `/resource/${articleId}/feedback`,
  },

  shoppingLists: {
    get: "/shoppingLists",
    lists: "/shoppingLists/lists",
    list: (listId: number) => `/shoppingLists/lists/${listId}`,
    items: "/shoppingLists/items",
    item: (itemId: number) => `/shoppingLists/items/${itemId}`,
    stores: "/shoppingLists/stores",
  },
} as const;
