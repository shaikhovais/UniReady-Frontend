import { useCallback, useEffect, useState } from "react";

import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CommonPageLayout from "../common/CommonPageLayout";

import StatsCard from "./components/StatsCard";
import BudgetOverview from "./components/budgetOverview/BudgetOverview";
import BudgetInsights from "./components/BudgetInsights";
import RecentExpensesCard from "./components/RecentExpensesCard";
import UpcomingBills from "./components/UpcomingBills";
import BudgetTipsCard from "./components/BudgetTipsCard";
import ManageExpenseDialog from "./components/ManageExpenseDialog";
import ExpenseList from "./components/allExpenses/ExpenseList";

import {
  getBudget,
  getBudgetOverview,
  getExpenses,
  saveBudget,
  saveBill,
  deleteBill,
  saveExpense,
  deleteExpense,
} from "../../../services/features/budgetService";

import PageLoader from "../../../components/Loader";

import ManageBudgetDialog, {
  type ManageBudgetTab,
} from "./components/manageBudget/ManageBudgetDialog";

import type {
  GetBudgetOverviewResponse,
  GetBudgetResponse,
  SaveBudgetRequest,
  SaveBillRequest,
  SaveExpenseRequest,
  Expense,
  GetExpensesRequest,
} from "../../../types/features/budget";

import type { Lookup } from "../../../types/core/common/Lookup";
import { getLookups } from "../../../services/core/common/helperService";
import dayjs from "dayjs";

const BudgetPlannerPage = () => {
  const [budget, setBudget] = useState<GetBudgetResponse | null>(null);
  const [overview, setOverview] = useState<GetBudgetOverviewResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [budgetSetupOpen, setBudgetSetupOpen] = useState(false);

  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const [manageBudgetOpen, setManageBudgetOpen] = useState(false);
  const [manageBudgetTab, setManageBudgetTab] =
    useState<ManageBudgetTab>("budget");

  const [manageExpenseOpen, setManageExpenseOpen] = useState(false);
  const [showAllExpenses, setShowAllExpenses] = useState(false);
  const [editExpense, setEditExpense] = useState<Expense>();

  const [paymentMethods, setPaymentMethods] = useState<Lookup[]>([]);
  const [billFrequencies, setBillFrequencies] = useState<Lookup[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const loadExpenses = useCallback(async (request?: GetExpensesRequest) => {
    const today = new Date();

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const response = await getExpenses(
      request ?? {
        name: "",
        userBudgetCategoryId: -1,
        paymentMethodId: -1,
        startDate: startOfMonth.toISOString().slice(0, 10),
        endDate: today.toISOString().slice(0, 10),
      },
    );

    setExpenses(response.expenses);
  }, []);

  const loadBudget = useCallback(async () => {
    const response = await getBudget();

    setBudget(response);

    if (response.header.totalBudget === 0) {
      setBudgetSetupOpen(true);
    }
  }, []);

  const loadBudgetOverview = useCallback(async () => {
    const response = await getBudgetOverview({
      month: selectedMonth,
      year: selectedYear,
    });

    setOverview(response);
  }, [selectedMonth, selectedYear]);

  const loadLookups = useCallback(async () => {
    const lookupResponse = await getLookups(["PaymentMethod", "BillFrequency"]);

    setPaymentMethods(lookupResponse.filter((x) => x.type === "PaymentMethod"));

    setBillFrequencies(
      lookupResponse.filter((x) => x.type === "BillFrequency"),
    );
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      await Promise.all([
        loadBudget(),
        loadBudgetOverview(),
        loadLookups(),
        loadExpenses(),
      ]);
    } finally {
      setLoading(false);
    }
  }, [loadBudget, loadBudgetOverview, loadLookups, loadExpenses]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const openBudgetDialog = (tab: ManageBudgetTab) => {
    setBudgetSetupOpen(false);
    setManageBudgetTab(tab);
    setManageBudgetOpen(true);
  };

  const closeBudgetDialog = () => {
    setManageBudgetOpen(false);
  };

  const handleSaveBudget = async (request: SaveBudgetRequest) => {
    await saveBudget(request);

    await Promise.all([loadBudget(), loadBudgetOverview()]);

    closeBudgetDialog();
  };

  const handleSaveBill = async (request: SaveBillRequest) => {
    await saveBill(request);
    await loadBudget();
  };

  const handleDeleteBill = async (billId: number) => {
    await deleteBill(billId);
    await loadBudget();
  };

  const handleSaveExpense = async (request: SaveExpenseRequest) => {
    await saveExpense(request);

    await Promise.all([loadBudget(), loadBudgetOverview(), loadExpenses()]);

    setEditExpense(undefined);
    setManageExpenseOpen(false);
  };

  const handleDeleteExpense = async (expenseId: number) => {
    await deleteExpense(expenseId);

    await Promise.all([loadBudget(), loadBudgetOverview(), loadExpenses()]);
  };

  const handleEditExpense = (editExpense: Expense) => {
    setEditExpense(editExpense);
    setManageExpenseOpen(true);
  };

  const upcomingBills =
    budget?.bills
      .filter((bill) => {
        const dueDate = dayjs(bill.dueDate);
        const today = dayjs().startOf("day");
        const next30Days = today.add(30, "day");

        return (
          dueDate.isSame(today, "day") ||
          (dueDate.isAfter(today, "day") &&
            dueDate.isBefore(next30Days.add(1, "day"), "day"))
        );
      })
      .sort((a, b) => dayjs(a.dueDate).valueOf() - dayjs(b.dueDate).valueOf())
      .slice(0, 3) ?? [];

  if (loading || !budget || !overview) {
    return (
      <CommonPageLayout
        header={{
          title: "Budget Planner",
          subtitle:
            "Manage your income and expenses, track your spending and achieve your financial goals."
        }}
      >
        <PageLoader />
      </CommonPageLayout>
    );
  }

  return (
    <CommonPageLayout
      header={{
        title: "Budget Planner",
        subtitle:
          "Manage your income and expenses, track your spending and achieve your financial goals."
      }}
    >
      {!showAllExpenses ? (
        <Stack spacing={3}>
          <StatsCard
            header={budget.header}
            onEditBudget={() => openBudgetDialog("budget")}
            onViewAllExpenses={() => setShowAllExpenses(true)}
            onAddExpense={() => setManageExpenseOpen(true)}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "68% 32%",
              },
              gap: 2,
              alignItems: "stretch",
            }}
          >
            <BudgetOverview
              overview={overview.overview}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onMonthChange={setSelectedMonth}
              onYearChange={setSelectedYear}
              onManageCategories={() => openBudgetDialog("budget")}
            />

            <BudgetInsights insights={budget.insights} />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "1fr 1fr",
              },
              gap: 2,
              alignItems: "start",
            }}
          >
            <RecentExpensesCard
              expenses={budget.expenses.slice(0, 6)}
              onViewAll={() => setShowAllExpenses(true)}
            />

            <Stack spacing={2}>
              <UpcomingBills
                bills={upcomingBills}
                onManageBills={() => openBudgetDialog("bills")}
              />

              <BudgetTipsCard tips={budget.tips} />
            </Stack>
          </Box>
        </Stack>
      ) : (
        <ExpenseList
          expenses={expenses}
          onClose={() => setShowAllExpenses(false)}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
          paymentMethods={paymentMethods}
          onSearchExpenses={loadExpenses}
          categories={overview.overview.categories.map((category) => ({
            userBudgetCategoryId: category.userBudgetCategoryId,
            name: category.name,
            icon: category.icon,
          }))}
        />
      )}

      <Dialog
        open={budgetSetupOpen}
        onClose={() => setBudgetSetupOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(15, 23, 42, 0.55)",
              backdropFilter: "blur(5px)",
            },
          },
          paper: {
            sx: {
              borderRadius: 1.5,
              overflow: "hidden",
              boxShadow: "0 30px 90px rgba(15, 23, 42, 0.22)",
            },
          },
        }}
      >
        <Box
          sx={{
            height: 150,
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #EEF8FF 0%, #F4FAFF 55%, #F0F8F4 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              bgcolor: "#DDEFFF",
              top: -90,
              right: -40,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: "50%",
              bgcolor: "#E2F2EA",
              bottom: -70,
              left: -30,
            }}
          />

          <Box
            sx={{
              position: "relative",
              width: 72,
              height: 72,
              borderRadius: 2.5,
              bgcolor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.main",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
            }}
          >
            <AccountBalanceWalletRoundedIcon sx={{ fontSize: 36 }} />
          </Box>
        </Box>

        <Box
          sx={{
            px: 3.5,
            pt: 3,
            pb: 3.5,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 23,
              fontWeight: 800,
              lineHeight: 1.25,
              letterSpacing: "-0.4px",
            }}
          >
            Start with your budget
          </Typography>

          <Typography
            sx={{
              mt: 1.25,
              fontSize: 14,
              lineHeight: 1.7,
              color: "text.secondary",
              maxWidth: 360,
              mx: "auto",
            }}
          >
            Set your monthly budget and we'll help you understand your spending,
            track what's left and stay on top of your finances.
          </Typography>

          <Stack spacing={1} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setBudgetSetupOpen(false);
                openBudgetDialog("budget");
              }}
              sx={{
                height: 46,
                borderRadius: 1.5,
                textTransform: "none",
                fontWeight: 700,
                fontSize: 14,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              Set my budget
            </Button>

            <Button
              fullWidth
              onClick={() => setBudgetSetupOpen(false)}
              sx={{
                height: 42,
                borderRadius: 1.5,
                textTransform: "none",
                fontWeight: 700,
                fontSize: 14,
                color: "text.secondary",
              }}
            >
              Maybe later
            </Button>
          </Stack>
        </Box>
      </Dialog>

      <ManageBudgetDialog
        open={manageBudgetOpen}
        initialTab={manageBudgetTab}
        budget={budget}
        overview={overview.overview}
        bills={budget.bills}
        paymentMethods={paymentMethods}
        billFrequencies={billFrequencies}
        onClose={closeBudgetDialog}
        onSaveBudget={handleSaveBudget}
        onSaveBill={handleSaveBill}
        onDeleteBill={handleDeleteBill}
      />

      <ManageExpenseDialog
        open={manageExpenseOpen}
        categories={overview.overview.categories.map((category) => ({
          userBudgetCategoryId: category.userBudgetCategoryId,
          name: category.name,
          icon: category.icon,
        }))}
        editExpense={editExpense}
        paymentMethods={paymentMethods}
        onClose={() => setManageExpenseOpen(false)}
        onSave={handleSaveExpense}
      />
    </CommonPageLayout>
  );
};

export default BudgetPlannerPage;
