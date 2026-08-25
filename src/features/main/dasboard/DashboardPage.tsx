import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Snackbar,
} from "@mui/material";

import CommonPageLayout from "../common/CommonPageLayout";
import PageLoader from "../../../components/Loader";

import ArrivalCard from "./components/ArrivalCard";
import JourneyOverviewCard from "./components/JourneyCard";
import UpcomingDeadlinesCard from "./components/UpcomingDeadlinesCard";
import GuideCard from "./components/GuideCard";
import ChecklistCard from "./components/ChecklistCard";
import BudgetPlannerCard from "./components/BudgetPlannerCard";
import ShoppingListsCard from "./components/ShoppingListsCard";

import { getDashboard } from "../../../services/features/dashboardService";
import { updateArrivalDate } from "../../../services/core/profileService";

import {
  getBudgetOverview,
  saveExpense,
} from "../../../services/features/budgetService";

import {
  createShoppingStore,
  getShoppingLists,
  saveShoppingItem,
} from "../../../services/features/shoppinglistsService";

import { getLookups } from "../../../services/core/common/helperService";

import type { DashboardResponse } from "../../../types/features/dashboard";

import type {
  ExpenseCategoryOption,
  SaveExpenseRequest,
} from "../../../types/features/budget";

import type {
  ShoppingListsResponse,
  ShoppingItemRequest,
} from "../../../types/features/shoppingLists";

import type { Lookup } from "../../../types/core/common/Lookup";
import type { ShoppingItemFormState } from "../shopping-lists/components/ShoppingItemDialog";

import ManageExpenseDialog from "../budget-planner/components/ManageExpenseDialog";
import ShoppingItemDialog from "../shopping-lists/components/ShoppingItemDialog";
import CreateShoppingStoreDialog from "../shopping-lists/components/CreateShoppingStoreDialog";

const DashboardPage = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [expenseDialogOpen, setExpenseDialogOpen] =
    useState(false);

  const [expenseCategories, setExpenseCategories] =
    useState<ExpenseCategoryOption[]>([]);

  const [paymentMethods, setPaymentMethods] =
    useState<Lookup[]>([]);

  const [shoppingDialogOpen, setShoppingDialogOpen] =
    useState(false);

  const [shoppingData, setShoppingData] =
    useState<ShoppingListsResponse | null>(null);

  const [shoppingUnits, setShoppingUnits] =
    useState<Lookup[]>([]);

  const [shoppingStatuses, setShoppingStatuses] =
    useState<Lookup[]>([]);

  const [shoppingItemForm, setShoppingItemForm] =
    useState<ShoppingItemFormState | null>(null);

  const [createStoreDialogOpen, setCreateStoreDialogOpen] =
    useState(false);

  const [newStoreName, setNewStoreName] =
    useState("");

  const [isSubmittingStore, setIsSubmittingStore] =
    useState(false);

  const [isSubmittingShoppingItem, setIsSubmittingShoppingItem] =
    useState(false);

  const [isLoadingQuickAction, setIsLoadingQuickAction] =
    useState(false);

  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const loadDashboard = useCallback(async () => {
    const response = await getDashboard();

    setDashboard(response);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        await loadDashboard();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [loadDashboard]);

  const handleArrivalUpdated = async (
    arrivalDate: string,
    hasArrived: boolean,
  ) => {
    await updateArrivalDate({
      arrivalDate,
      hasArrived,
    });

    await loadDashboard();
  };

  const openExpenseDialog = async () => {
    setIsLoadingQuickAction(true);

    try {
      const today = new Date();

      const [overviewResponse, lookupResponse] =
        await Promise.all([
          getBudgetOverview({
            month: today.getMonth() + 1,
            year: today.getFullYear(),
          }),
          getLookups(["PaymentMethod"]),
        ]);

      setExpenseCategories(
        overviewResponse.overview.categories.map(
          (category) => ({
            userBudgetCategoryId:
              category.userBudgetCategoryId,
            name: category.name,
            icon: category.icon,
          }),
        ),
      );

      setPaymentMethods(
        lookupResponse.filter(
          (lookup) =>
            lookup.type === "PaymentMethod",
        ),
      );

      setExpenseDialogOpen(true);
    } catch {
      setNotice({
        type: "error",
        message:
          "Unable to open the expense form. Please try again.",
      });
    } finally {
      setIsLoadingQuickAction(false);
    }
  };

  const handleSaveExpense = async (
    request: SaveExpenseRequest,
  ) => {
    try {
      await saveExpense(request);

      setExpenseDialogOpen(false);

      await loadDashboard();

      setNotice({
        type: "success",
        message: "Expense added successfully.",
      });
    } catch {
      setNotice({
        type: "error",
        message: "Failed to add expense.",
      });
    }
  };

  const loadShoppingData = useCallback(async () => {
    const [shoppingResponse, lookupResponse] =
      await Promise.all([
        getShoppingLists(),
        getLookups([
          "QuantityUnit",
          "ShoppingItemStatus",
        ]),
      ]);

    const units = lookupResponse.filter(
      (lookup) =>
        lookup.type === "QuantityUnit",
    );

    const statuses = lookupResponse.filter(
      (lookup) =>
        lookup.type === "ShoppingItemStatus",
    );

    setShoppingData(shoppingResponse);
    setShoppingUnits(units);
    setShoppingStatuses(statuses);

    return {
      shoppingResponse,
      units,
      statuses,
    };
  }, []);

  const openShoppingItemDialog = async () => {
    setIsLoadingQuickAction(true);

    try {
      const {
        shoppingResponse,
        units,
        statuses,
      } = await loadShoppingData();

      const defaultUnit = units[0];

      const pendingStatus =
        statuses.find((status) => {
          const name = status.name.toLowerCase();

          return (
            name.includes("need") ||
            name.includes("pending")
          );
        }) ?? statuses[0];

      if (!defaultUnit || !pendingStatus) {
        setNotice({
          type: "error",
          message:
            "Shopping item lookups are not available.",
        });

        return;
      }

      const targetListId =
        shoppingResponse.lists[0]?.id;

      if (!targetListId) {
        setNotice({
          type: "error",
          message:
            "Please create a shopping list first.",
        });

        return;
      }

      setShoppingItemForm({
        name: "",
        userShoppingListId: targetListId,
        quantity: 1,
        unitId: defaultUnit.id,
        shoppingStoreId: undefined,
        userShoppingStoreId: undefined,
        estimatedPrice: "",
        notes: "",
        statusId: pendingStatus.id,
      });

      setShoppingDialogOpen(true);
    } catch {
      setNotice({
        type: "error",
        message:
          "Unable to open the shopping item form. Please try again.",
      });
    } finally {
      setIsLoadingQuickAction(false);
    }
  };

  const handleSaveShoppingItem = async () => {
    if (!shoppingItemForm) {
      return;
    }

    const trimmedName =
      shoppingItemForm.name.trim();

    const trimmedNotes =
      shoppingItemForm.notes.trim();

    if (!trimmedName) {
      setNotice({
        type: "error",
        message: "Item name is required.",
      });

      return;
    }

    setIsSubmittingShoppingItem(true);

    try {
      const request: ShoppingItemRequest = {
        id: shoppingItemForm.id,
        name: trimmedName,
        userShoppingListId:
          shoppingItemForm.userShoppingListId,
        quantity: shoppingItemForm.quantity,
        unitId: shoppingItemForm.unitId,
        shoppingStoreId:
          shoppingItemForm.shoppingStoreId,
        userShoppingStoreId:
          shoppingItemForm.userShoppingStoreId,
        estimatedPrice:
          shoppingItemForm.estimatedPrice
            ? Number(
                shoppingItemForm.estimatedPrice,
              )
            : undefined,
        notes: trimmedNotes || undefined,
        statusId: shoppingItemForm.statusId,
      };

      await saveShoppingItem(request);

      setShoppingDialogOpen(false);
      setShoppingItemForm(null);

      await loadDashboard();

      setNotice({
        type: "success",
        message:
          "Shopping item added successfully.",
      });
    } catch {
      setNotice({
        type: "error",
        message:
          "Failed to add shopping item.",
      });
    } finally {
      setIsSubmittingShoppingItem(false);
    }
  };

  const openCreateStoreDialog = () => {
    setNewStoreName("");
    setCreateStoreDialogOpen(true);
  };

  const handleCreateStore = async () => {
    const trimmedName =
      newStoreName.trim();

    if (!trimmedName) {
      setNotice({
        type: "error",
        message: "Store name is required.",
      });

      return;
    }

    setIsSubmittingStore(true);

    try {
      await createShoppingStore({
        name: trimmedName,
      });

      setCreateStoreDialogOpen(false);
      setNewStoreName("");

      const {
        shoppingResponse,
      } = await loadShoppingData();

      setShoppingData(shoppingResponse);

      setNotice({
        type: "success",
        message:
          "Store created successfully.",
      });
    } catch {
      setNotice({
        type: "error",
        message:
          "Failed to create store.",
      });
    } finally {
      setIsSubmittingStore(false);
    }
  };

  const closeShoppingDialog = () => {
    if (isSubmittingShoppingItem) {
      return;
    }

    setShoppingDialogOpen(false);
    setShoppingItemForm(null);
  };

  if (loading || !dashboard) {
    return (
      <CommonPageLayout>
        <PageLoader />
      </CommonPageLayout>
    );
  }

  const isPostArrival =
    dashboard.isPostArrival;

  const preparationChecklist =
    dashboard.preArrival
      ?.preparationChecklist ?? null;

  const budgetOverview =
    dashboard.postArrival
      ?.budgetOverview ?? null;

  const recentPayments =
    dashboard.postArrival
      ?.recentPayments ?? [];

  const upcomingBills =
    dashboard.postArrival
      ?.upcomingBills ?? [];

  const shoppingLists =
    dashboard.postArrival
      ?.shoppingLists ?? null;

  return (
    <CommonPageLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "repeat(2, minmax(0, 1fr))",
            },
            gap: 2,
            alignItems: "stretch",
          }}
        >
          <ArrivalCard
            arrival={dashboard.arrival}
            isPostArrival={isPostArrival}
            onArrivalUpdated={
              handleArrivalUpdated
            }
          />

          <JourneyOverviewCard
            overview={
              dashboard.journeyOverview
            }
            onGoToJourney={() =>
              navigate("/my-journey")
            }
          />
        </Box>

        {isPostArrival ? (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: "3fr 2fr",
                },
                gap: 2,
                alignItems: "stretch",
              }}
            >
              {budgetOverview && (
                <BudgetPlannerCard
                  budget={budgetOverview}
                  recentPayments={
                    recentPayments
                  }
                  upcomingBills={
                    upcomingBills
                  }
                  onViewPayments={() =>
                    navigate(
                      "/budget-planner",
                    )
                  }
                  onViewBills={() =>
                    navigate(
                      "/budget-planner",
                    )
                  }
                  onAddExpense={
                    openExpenseDialog
                  }
                  onEditBudget={() =>
                    navigate(
                      "/budget-planner",
                    )
                  }
                />
              )}

              <UpcomingDeadlinesCard
                deadlines={
                  dashboard.upcomingDeadlines
                }
                onGoToJourney={() =>
                  navigate(
                    "/my-journey",
                  )
                }
              />
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, minmax(0, 1fr))",
                  lg: "2fr 1fr 1fr",
                },
                gap: 2,
                alignItems: "stretch",
              }}
            >
              {shoppingLists && (
                <Box
                  sx={{
                    gridColumn: {
                      xs: "1 / -1",
                      md: "1 / -1",
                      lg: "auto",
                    },
                  }}
                >
                  <ShoppingListsCard
                    shoppingLists={
                      shoppingLists
                    }
                    onAddItem={
                      openShoppingItemDialog
                    }
                    onEditLists={() =>
                      navigate(
                        "/shopping-lists",
                      )
                    }
                  />
                </Box>
              )}

              <Box
                sx={{
                  mt: {
                    xs: 0,
                    md: 6.25,
                    lg: 0,
                  },
                }}
              >
                <GuideCard
                  guides={
                    dashboard.featuredResources
                  }
                  type="featured"
                  onViewAll={() =>
                    navigate(
                      "/resources",
                    )
                  }
                  onGuideClick={(articleId) =>
                    navigate(
                      `/resources/${articleId}`,
                    )
                  }
                />
              </Box>

              <Box
                sx={{
                  mt: {
                    xs: 0,
                    md: 6.25,
                    lg: 0,
                  },
                }}
              >
                <GuideCard
                  guides={
                    dashboard.savedResources
                  }
                  type="saved"
                  onViewAll={() =>
                    navigate(
                      "/resources",
                    )
                  }
                  onGuideClick={(articleId) =>
                    navigate(
                      `/resources/${articleId}`,
                    )
                  }
                />
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: "3fr 2fr",
                },
                gap: 2,
                alignItems: "stretch",
              }}
            >
              {preparationChecklist && (
                <ChecklistCard
                  checklist={
                    preparationChecklist
                  }
                  onGoToChecklists={() =>
                    navigate(
                      "/checklists",
                    )
                  }
                />
              )}

              <UpcomingDeadlinesCard
                deadlines={
                  dashboard.upcomingDeadlines
                }
                onGoToJourney={() =>
                  navigate(
                    "/my-journey",
                  )
                }
              />
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, minmax(0, 1fr))",
                },
                gap: 2,
                alignItems: "stretch",
              }}
            >
              <GuideCard
                guides={
                  dashboard.featuredResources
                }
                type="featured"
                onViewAll={() =>
                  navigate(
                    "/resources",
                  )
                }
                onGuideClick={(articleId) =>
                  navigate(
                    `/resources/${articleId}`,
                  )
                }
              />

              <GuideCard
                guides={
                  dashboard.savedResources
                }
                type="saved"
                onViewAll={() =>
                  navigate(
                    "/resources",
                  )
                }
                onGuideClick={(articleId) =>
                  navigate(
                    `/resources/${articleId}`,
                  )
                }
              />
            </Box>
          </>
        )}
      </Box>

      <ManageExpenseDialog
        open={expenseDialogOpen}
        categories={expenseCategories}
        editExpense={undefined}
        paymentMethods={paymentMethods}
        onClose={() =>
          setExpenseDialogOpen(false)
        }
        onSave={handleSaveExpense}
      />

      <ShoppingItemDialog
        open={shoppingDialogOpen}
        form={shoppingItemForm}
        lists={shoppingData?.lists ?? []}
        stores={shoppingData?.stores ?? []}
        units={shoppingUnits}
        statuses={shoppingStatuses}
        editingItem={null}
        isSubmitting={
          isSubmittingShoppingItem
        }
        onClose={
          closeShoppingDialog
        }
        onChange={
          setShoppingItemForm
        }
        onCreateStore={
          openCreateStoreDialog
        }
        onSubmit={
          handleSaveShoppingItem
        }
      />

      <CreateShoppingStoreDialog
        open={createStoreDialogOpen}
        storeName={newStoreName}
        isSubmitting={
          isSubmittingStore
        }
        onClose={() =>
          setCreateStoreDialogOpen(false)
        }
        onStoreNameChange={
          setNewStoreName
        }
        onSubmit={
          handleCreateStore
        }
      />

      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={3500}
        onClose={() =>
          setNotice(null)
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {notice ? (
          <Alert
            severity={notice.type}
            variant="filled"
            onClose={() =>
              setNotice(null)
            }
            sx={{
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            {notice.message}
          </Alert>
        ) : undefined}
      </Snackbar>

      {isLoadingQuickAction && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              "rgba(255, 255, 255, 0.35)",
            backdropFilter: "blur(2px)",
            pointerEvents: "none",
          }}
        />
      )}
    </CommonPageLayout>
  );
};

export default DashboardPage;