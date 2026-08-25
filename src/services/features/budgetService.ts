import client from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";

import type { ApiResponse } from "../../types/core/common/apiResponse";

import type {
  GetBudgetOverviewRequest,
  GetBudgetOverviewResponse,
  GetBudgetResponse,
  GetExpensesRequest,
  GetExpensesResponse,
  SaveBillRequest,
  SaveBudgetRequest,
  SaveExpenseRequest,
} from "../../types/features/budget";

export const getBudget = async (): Promise<GetBudgetResponse> => {
  const { data } = await client.get<GetBudgetResponse>(
    ENDPOINTS.budget.get
  );

  return data;
};

export const getBudgetOverview = async (
  request: GetBudgetOverviewRequest
): Promise<GetBudgetOverviewResponse> => {
  const { data } = await client.get<GetBudgetOverviewResponse>(
    ENDPOINTS.budget.overview,
    {
      params: request,
    }
  );

  return data;
};

export const getExpenses = async (
  request: GetExpensesRequest
): Promise<GetExpensesResponse> => {
  const { data } = await client.get<GetExpensesResponse>(
    ENDPOINTS.budget.expenses,
    {
      params: request,
    }
  );

  return data;
};

export const saveBudget = async (
  request: SaveBudgetRequest
): Promise<ApiResponse> => {
  const { data } = await client.post<ApiResponse>(
    ENDPOINTS.budget.get,
    request
  );

  return data;
};

export const saveExpense = async (
  request: SaveExpenseRequest
): Promise<ApiResponse> => {
  const { data } = await client.post<ApiResponse>(
    ENDPOINTS.budget.expenses,
    request
  );

  return data;
};

export const deleteExpense = async (
  expenseId: number
): Promise<ApiResponse> => {
  const { data } = await client.delete<ApiResponse>(
    ENDPOINTS.budget.expense(expenseId)
  );

  return data;
};

export const saveBill = async (
  request: SaveBillRequest
): Promise<ApiResponse> => {
  const { data } = await client.post<ApiResponse>(
    ENDPOINTS.budget.bills,
    request
  );

  return data;
};

export const deleteBill = async (
  billId: number
): Promise<ApiResponse> => {
  const { data } = await client.delete<ApiResponse>(
    ENDPOINTS.budget.bill(billId)
  );

  return data;
};