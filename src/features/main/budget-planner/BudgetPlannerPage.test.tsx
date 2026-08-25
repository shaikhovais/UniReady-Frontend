import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  mockGetBudget,
  mockGetBudgetOverview,
  mockGetExpenses,
  mockGetLookups,
  mockSaveBudget,
  mockSaveBill,
  mockDeleteBill,
  mockSaveExpense,
  mockDeleteExpense,
} = vi.hoisted(() => ({
  mockGetBudget: vi.fn(),
  mockGetBudgetOverview: vi.fn(),
  mockGetExpenses: vi.fn(),
  mockGetLookups: vi.fn(),
  mockSaveBudget: vi.fn(),
  mockSaveBill: vi.fn(),
  mockDeleteBill: vi.fn(),
  mockSaveExpense: vi.fn(),
  mockDeleteExpense: vi.fn(),
}));

vi.mock("../../../services/features/budgetService", () => ({
  getBudget: mockGetBudget,
  getBudgetOverview: mockGetBudgetOverview,
  getExpenses: mockGetExpenses,
  saveBudget: mockSaveBudget,
  saveBill: mockSaveBill,
  deleteBill: mockDeleteBill,
  saveExpense: mockSaveExpense,
  deleteExpense: mockDeleteExpense,
}));

vi.mock("../../../services/core/common/helperService", () => ({
  getLookups: mockGetLookups,
}));

vi.mock("../common/CommonPageLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("../../../components/Loader", () => ({
  default: () => <div data-testid="page-loader">Loading</div>,
}));

vi.mock("./components/StatsCard", () => ({
  default: ({
    onEditBudget,
    onViewAllExpenses,
    onAddExpense,
  }: {
    onEditBudget: () => void;
    onViewAllExpenses: () => void;
    onAddExpense: () => void;
  }) => (
    <div>
      <button onClick={onEditBudget}>Edit Budget</button>
      <button onClick={onViewAllExpenses}>View All Expenses</button>
      <button onClick={onAddExpense}>Add Expense</button>
    </div>
  ),
}));

vi.mock("./components/budgetOverview/BudgetOverview", () => ({
  default: () => <div>Budget Overview</div>,
}));

vi.mock("./components/BudgetInsights", () => ({
  default: () => <div>Budget Insights</div>,
}));

vi.mock("./components/RecentExpensesCard", () => ({
  default: () => <div>Recent Expenses</div>,
}));

vi.mock("./components/UpcomingBills", () => ({
  default: () => <div>Upcoming Bills</div>,
}));

vi.mock("./components/BudgetTipsCard", () => ({
  default: () => <div>Budget Tips</div>,
}));

vi.mock("./components/manageBudget/ManageBudgetDialog", () => ({
  default: ({
    open,
    onSaveBudget,
    onSaveBill,
    onDeleteBill,
  }: {
    open: boolean;
    onSaveBudget: (request: unknown) => void;
    onSaveBill: (request: unknown) => void;
    onDeleteBill: (billId: number) => void;
  }) =>
    open ? (
      <div data-testid="manage-budget-dialog">
        <button onClick={() => onSaveBudget({ monthlyBudget: 1500 })}>
          Save Budget
        </button>
        <button onClick={() => onSaveBill({ name: "Rent" })}>
          Save Bill
        </button>
        <button onClick={() => onDeleteBill(10)}>Delete Bill</button>
      </div>
    ) : null,
}));

vi.mock("./components/ManageExpenseDialog", () => ({
  default: ({
    open,
    onSave,
  }: {
    open: boolean;
    onSave: (request: unknown) => void;
  }) =>
    open ? (
      <div data-testid="manage-expense-dialog">
        <button
          onClick={() =>
            onSave({
              name: "Groceries",
              amount: 50,
            })
          }
        >
          Save Expense
        </button>
      </div>
    ) : null,
}));

vi.mock("./components/allExpenses/ExpenseList", () => ({
  default: ({
    expenses,
    onDeleteExpense,
    onEditExpense,
  }: {
    expenses: Array<{ id: number }>;
    onDeleteExpense: (id: number) => void;
    onEditExpense: (expense: unknown) => void;
  }) => (
    <div data-testid="expense-list">
      <span>{expenses.length} expenses</span>
      <button onClick={() => onDeleteExpense(5)}>Delete Expense</button>
      <button
        onClick={() =>
          onEditExpense({
            id: 5,
            name: "Groceries",
          })
        }
      >
        Edit Expense
      </button>
    </div>
  ),
}));

import BudgetPlannerPage from "./BudgetPlannerPage";

describe("BudgetPlannerPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockGetBudget.mockResolvedValue({
      header: {
        totalBudget: 1500,
      },
      bills: [],
      expenses: [],
      insights: [],
      tips: [],
    });

    mockGetBudgetOverview.mockResolvedValue({
      overview: {
        categories: [],
      },
    });

    mockGetExpenses.mockResolvedValue({
      expenses: [],
    });

    mockGetLookups.mockResolvedValue([
      {
        id: 1,
        name: "Card",
        type: "PaymentMethod",
      },
      {
        id: 2,
        name: "Monthly",
        type: "BillFrequency",
      },
    ]);

    mockSaveBudget.mockResolvedValue({});
    mockSaveBill.mockResolvedValue({});
    mockDeleteBill.mockResolvedValue({});
    mockSaveExpense.mockResolvedValue({});
    mockDeleteExpense.mockResolvedValue({});
  });

  it("loads the budget data when the page opens", async () => {
    render(<BudgetPlannerPage />);

    await waitFor(() => {
      expect(mockGetBudget).toHaveBeenCalledTimes(1);
      expect(mockGetBudgetOverview).toHaveBeenCalledTimes(1);
      expect(mockGetExpenses).toHaveBeenCalledTimes(1);
      expect(mockGetLookups).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText("Budget Overview")).toBeInTheDocument();
  });

  it("saves the budget and reloads budget data", async () => {
    render(<BudgetPlannerPage />);

    await screen.findByText("Edit Budget");

    fireEvent.click(screen.getByText("Edit Budget"));

    expect(
      screen.getByTestId("manage-budget-dialog"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Save Budget"));

    await waitFor(() => {
      expect(mockSaveBudget).toHaveBeenCalledTimes(1);
    });

    expect(mockSaveBudget).toHaveBeenCalledWith({
      monthlyBudget: 1500,
    });

    await waitFor(() => {
      expect(mockGetBudget).toHaveBeenCalledTimes(2);
      expect(mockGetBudgetOverview).toHaveBeenCalledTimes(2);
    });
  });

  it("saves an expense and reloads budget data", async () => {
    render(<BudgetPlannerPage />);

    await screen.findByText("Add Expense");

    fireEvent.click(screen.getByText("Add Expense"));

    expect(
      screen.getByTestId("manage-expense-dialog"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Save Expense"));

    await waitFor(() => {
      expect(mockSaveExpense).toHaveBeenCalledTimes(1);
    });

    expect(mockSaveExpense).toHaveBeenCalledWith({
      name: "Groceries",
      amount: 50,
    });

    await waitFor(() => {
      expect(mockGetBudget).toHaveBeenCalledTimes(2);
      expect(mockGetBudgetOverview).toHaveBeenCalledTimes(2);
      expect(mockGetExpenses).toHaveBeenCalledTimes(2);
    });
  });

  it("deletes an expense and reloads budget data", async () => {
    mockGetExpenses.mockResolvedValue({
      expenses: [
        {
          id: 5,
          name: "Groceries",
        },
      ],
    });

    render(<BudgetPlannerPage />);

    await screen.findByText("View All Expenses");

    fireEvent.click(screen.getByText("View All Expenses"));

    await screen.findByTestId("expense-list");

    fireEvent.click(screen.getByText("Delete Expense"));

    await waitFor(() => {
      expect(mockDeleteExpense).toHaveBeenCalledTimes(1);
    });

    expect(mockDeleteExpense).toHaveBeenCalledWith(5);

    await waitFor(() => {
      expect(mockGetBudget).toHaveBeenCalledTimes(2);
      expect(mockGetBudgetOverview).toHaveBeenCalledTimes(2);
      expect(mockGetExpenses).toHaveBeenCalledTimes(2);
    });
  });

  it("saves a bill and reloads the budget", async () => {
    render(<BudgetPlannerPage />);

    await screen.findByText("Edit Budget");

    fireEvent.click(screen.getByText("Edit Budget"));

    fireEvent.click(screen.getByText("Save Bill"));

    await waitFor(() => {
      expect(mockSaveBill).toHaveBeenCalledTimes(1);
    });

    expect(mockSaveBill).toHaveBeenCalledWith({
      name: "Rent",
    });

    await waitFor(() => {
      expect(mockGetBudget).toHaveBeenCalledTimes(2);
    });
  });
});