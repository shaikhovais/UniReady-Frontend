import type { ApiResponse } from "../core/common/apiResponse";
import type { Tip } from "../core/common/Tip";

export interface BudgetHeader {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  savingsGoal: number;
  spentPercentage: number;
  remainingPercentage: number;
}

export interface BudgetProgressSummary {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  completionPercentage: number;
}

export interface BudgetCategory {
  userBudgetCategoryId: number;
  name: string;
  icon: string;
  budget: number;
  spent: number;
  remaining: number;
  percentageUsed: number;
  displayOrder: number;
}

export interface BudgetOverview {
  summary: BudgetProgressSummary;
  categories: BudgetCategory[];
}

export interface Insight {
  title: string;
  subtitle: string;
  value: string;
  description: string;
  headerIcon: string;
  footerIcon: string;
}

export interface Expense {
  expenseId: number;
  name: string;
  userBudgetCategoryId: number;
  category: string;
  categoryIcon: string;
  paymentMethodId: number;
  paymentMethod: string;
  paymentMethodIcon: string;
  expenseDate: string;
  amount: number;
  notes?: string;
}

export interface Bill {
  billId: number;
  name: string;
  amount: number;
  dueDate: string;
  frequencyId: number;
  frequencyName: string;
  autoAddExpense: boolean;
  paymentMethodId: number;
  paymentMethodName?: number;
  userBudgetCategoryId: number;
  userBudgetCategoryName: string;
  notes?: string;
}
export interface GetBudgetResponse {
  header: BudgetHeader;
  insights: Insight[];
  tips: Tip[];
  expenses: Expense[];
  bills: Bill[];
}

export interface GetBudgetOverviewResponse {
  overview: BudgetOverview;
}

export interface GetExpensesResponse {
  expenses: Expense[];
}

export interface GetBudgetOverviewRequest {
  month: number;
  year: number;
}

export interface GetExpensesRequest {
  name: string;
  userBudgetCategoryId: number;
  paymentMethodId: number;
  startDate: string;
  endDate: string;
}

export interface SaveBudgetCategoryRequest {
  userBudgetCategoryId?: number;
  name: string;
  icon: string;
  allocatedAmount: number;
  displayOrder: number;
}

export interface SaveBudgetRequest {
  totalBudget: number;
  savingsGoal: number;
  categories: SaveBudgetCategoryRequest[];
}

export interface SaveExpenseRequest {
  expenseId?: number;
  name: string;
  amount: number;
  userBudgetCategoryId: number;
  expenseDate: string;
  paymentMethodId: number;
  notes?: string;
}

export interface SaveBillRequest {
  billId?: number;
  name: string;
  amount: number;
  dueDate: string;
  frequencyId: number;
  autoAddExpense: boolean;
  paymentMethodId: number;
  userBudgetCategoryId: number;
  notes?: string;
}

export interface ExpenseCategoryOption {
  userBudgetCategoryId: number;
  name: string;
  icon: string;
}

export type SaveBudgetResponse = ApiResponse;
export type SaveExpenseResponse = ApiResponse;
export type SaveBillResponse = ApiResponse;
export type DeleteExpenseResponse = ApiResponse;
export type DeleteBillResponse = ApiResponse;