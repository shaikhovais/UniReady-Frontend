import { useCallback, useEffect, useMemo, useState } from "react";

import { Alert, Box, Stack, Typography } from "@mui/material";

import CommonPageLayout from "../common/CommonPageLayout";

import PageLoader from "../../../components/Loader";

import type { Lookup } from "../../../types/core/common/Lookup";

import type {
  CreateShoppingListRequest,
  ShoppingItemRequest,
  ShoppingList,
  ShoppingListItem,
  ShoppingListsResponse,
  ShoppingStore,
} from "../../../types/features/shoppingLists";

import { getLookups } from "../../../services/core/common/helperService";

import {
  createShoppingList,
  createShoppingStore,
  deleteShoppingItem,
  deleteShoppingList,
  getShoppingLists,
  saveShoppingItem,
} from "../../../services/features/shoppinglistsService";

import ShoppingListsActionsPanel from "./components/ShoppingListsActionsPanel";
import ShoppingListsGrid from "./components/ShoppingListsGrid";
import ShoppingItemsSection from "./components/ShoppingItemsSection";
import CreateShoppingListDialog from "./components/CreateShoppingListDialog";
import ShoppingItemDialog, {
  type ShoppingItemFormState,
} from "./components/ShoppingItemDialog";
import CreateShoppingStoreDialog from "./components/CreateShoppingStoreDialog";
import ConfirmDeleteDialog from "./components/ConfirmDeleteDialog";

type NoticeState = {
  type: "success" | "error";
  message: string;
} | null;

const DEFAULT_TEMPLATE_LIST_NAMES = [
  "groceries & food",
  "household & cleaning",
  "clothing & accessories",
  "personal care",
  "general & others",
];

const ShoppingListsPage = () => {
  const EMPTY_LISTS: ShoppingList[] = [];
  const EMPTY_STORES: ShoppingStore[] = [];

  const [data, setData] = useState<ShoppingListsResponse | null>(null);

  const [units, setUnits] = useState<Lookup[]>([]);
  const [statuses, setStatuses] = useState<Lookup[]>([]);

  const [selectedListId, setSelectedListId] = useState<number | "all">("all");

  const [storeFilter, setStoreFilter] = useState<number | "all">("all");

  const [search, setSearch] = useState("");

  const [view, setView] = useState<"lists" | "items">("lists");

  const [isLoading, setIsLoading] = useState(true);

  const [notice, setNotice] = useState<NoticeState>(null);

  const [isCreateListDialogOpen, setIsCreateListDialogOpen] = useState(false);

  const [isCreateStoreDialogOpen, setIsCreateStoreDialogOpen] = useState(false);

  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);

  const [isDeleteListDialogOpen, setIsDeleteListDialogOpen] = useState(false);

  const [isDeleteItemDialogOpen, setIsDeleteItemDialogOpen] = useState(false);

  const [isSubmittingList, setIsSubmittingList] = useState(false);

  const [isSubmittingStore, setIsSubmittingStore] = useState(false);

  const [isSubmittingItem, setIsSubmittingItem] = useState(false);

  const [isDeletingList, setIsDeletingList] = useState(false);

  const [isDeletingItem, setIsDeletingItem] = useState(false);

  const [newListName, setNewListName] = useState("");

  const [newListDescription, setNewListDescription] = useState("");

  const [newStoreName, setNewStoreName] = useState("");

  const [editingItem, setEditingItem] = useState<ShoppingListItem | null>(null);

  const [itemForm, setItemForm] = useState<ShoppingItemFormState | null>(null);

  const [listToDelete, setListToDelete] = useState<ShoppingList | null>(null);

  const [itemToDelete, setItemToDelete] = useState<{
    item: ShoppingListItem;
    listId: number;
  } | null>(null);

  const [quickUpdatingItemId, setQuickUpdatingItemId] = useState<number | null>(
    null,
  );

  const loadLookups = useCallback(async () => {
    const lookupResponse = await getLookups([
      "QuantityUnit",
      "ShoppingItemStatus",
    ]);

    setUnits(lookupResponse.filter((x) => x.type === "QuantityUnit"));

    setStatuses(lookupResponse.filter((x) => x.type === "ShoppingItemStatus"));
  }, []);

  const loadShoppingLists = useCallback(async () => {
    const response = await getShoppingLists();

    setData(response);
  }, []);

  const loadPage = useCallback(async () => {
    setIsLoading(true);

    try {
      await Promise.all([loadShoppingLists(), loadLookups()]);
    } catch {
      setNotice({
        type: "error",
        message: "Failed to load shopping lists. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [loadLookups, loadShoppingLists]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  const lists = data?.lists ?? EMPTY_LISTS;
  const stores = data?.stores ?? EMPTY_STORES;
  const summary = data?.summary;

  const selectedList =
    selectedListId === "all"
      ? null
      : (lists.find((list) => list.id === selectedListId) ?? null);

  const allItems = useMemo(
    () =>
      lists.flatMap((list) =>
        list.items.map((item) => ({
          ...item,
          shoppingListId: list.id,
          shoppingListName: list.name,
          shoppingListColor: list.color,
          shoppingListBgColor: list.bgColor,
        })),
      ),
    [lists],
  );

  const filteredItems = useMemo(() => {
    const baseItems =
      selectedListId === "all"
        ? allItems
        : allItems.filter((item) => item.shoppingListId === selectedListId);

    return baseItems.filter((item) => {
      const matchesStore =
        storeFilter === "all"
          ? true
          : item.shoppingStoreId === storeFilter ||
            item.userShoppingStoreId === storeFilter;

      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return matchesStore && matchesSearch;
    });
  }, [allItems, search, selectedListId, storeFilter]);

  const pendingStatus = useMemo(
    () =>
      statuses.find(
        (status) =>
          status.name.toLowerCase().includes("need") ||
          status.name.toLowerCase().includes("pending"),
      ) ?? statuses[0],
    [statuses],
  );

  const completedStatus = useMemo(
    () =>
      statuses.find(
        (status) =>
          status.name.toLowerCase().includes("have") ||
          status.name.toLowerCase().includes("complete") ||
          status.name.toLowerCase().includes("checked"),
      ) ?? statuses[0],
    [statuses],
  );

  const defaultUnit = units[0];

  const isTemplateList = (list: ShoppingList) =>
    DEFAULT_TEMPLATE_LIST_NAMES.includes(list.name.toLowerCase());

  const refreshData = async () => {
    await loadShoppingLists();
  };

  const openCreateListDialog = () => {
    setNewListName("");
    setNewListDescription("");
    setIsCreateListDialogOpen(true);
  };

  const openCreateStoreDialog = () => {
    setNewStoreName("");
    setIsCreateStoreDialogOpen(true);
  };

  const openCreateItemDialog = (listId?: number) => {
    if (!defaultUnit || !pendingStatus) {
      setNotice({
        type: "error",
        message: "Shopping item lookups are not available.",
      });

      return;
    }

    const targetListId =
      listId ?? (selectedListId !== "all" ? selectedListId : lists[0]?.id);

    if (!targetListId) {
      setNotice({
        type: "error",
        message: "Please create a shopping list first.",
      });

      return;
    }

    setEditingItem(null);

    setItemForm({
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

    setIsItemDialogOpen(true);
  };

  const openEditItemDialog = (item: ShoppingListItem, listId: number) => {
    setEditingItem(item);

    setItemForm({
      id: item.id,
      name: item.name,
      userShoppingListId: listId,
      quantity: item.quantity,
      unitId: item.unitId,
      shoppingStoreId: item.shoppingStoreId,
      userShoppingStoreId: item.userShoppingStoreId,
      estimatedPrice:
        item.estimatedPrice !== undefined ? String(item.estimatedPrice) : "",
      notes: item.notes ?? "",
      statusId: item.statusId,
    });

    setIsItemDialogOpen(true);
  };

  const handleCreateList = async () => {
    const payload: CreateShoppingListRequest = {
      name: newListName.trim(),
      description: newListDescription.trim() || undefined,
    };

    if (!payload.name) {
      setNotice({
        type: "error",
        message: "List name is required.",
      });

      return;
    }

    setIsSubmittingList(true);

    try {
      await createShoppingList(payload);

      setIsCreateListDialogOpen(false);

      await refreshData();

      setNotice({
        type: "success",
        message: "Shopping list created successfully.",
      });
    } catch {
      setNotice({
        type: "error",
        message: "Failed to create shopping list.",
      });
    } finally {
      setIsSubmittingList(false);
    }
  };

  const handleCreateStore = async () => {
    const trimmedName = newStoreName.trim();

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

      setIsCreateStoreDialogOpen(false);

      await refreshData();

      setNotice({
        type: "success",
        message: "Store created successfully.",
      });
    } catch {
      setNotice({
        type: "error",
        message: "Failed to create store.",
      });
    } finally {
      setIsSubmittingStore(false);
    }
  };

  const handleSaveItem = async () => {
    if (!itemForm) {
      return;
    }

    const trimmedName = itemForm.name.trim();
    const trimmedNotes = itemForm.notes.trim();

    if (!trimmedName) {
      setNotice({
        type: "error",
        message: "Item name is required.",
      });

      return;
    }

    setIsSubmittingItem(true);

    try {
      const request: ShoppingItemRequest = {
        id: itemForm.id,
        name: trimmedName,
        userShoppingListId: itemForm.userShoppingListId,
        quantity: itemForm.quantity,
        unitId: itemForm.unitId,
        shoppingStoreId: itemForm.shoppingStoreId,
        userShoppingStoreId: itemForm.userShoppingStoreId,
        estimatedPrice: itemForm.estimatedPrice
          ? Number(itemForm.estimatedPrice)
          : undefined,
        notes: trimmedNotes || undefined,
        statusId: itemForm.statusId,
      };

      await saveShoppingItem(request);

      setIsItemDialogOpen(false);
      setItemForm(null);
      setEditingItem(null);

      await refreshData();

      setNotice({
        type: "success",
        message: editingItem
          ? "Shopping item updated successfully."
          : "Shopping item added successfully.",
      });
    } catch {
      setNotice({
        type: "error",
        message: editingItem
          ? "Failed to update shopping item."
          : "Failed to add shopping item.",
      });
    } finally {
      setIsSubmittingItem(false);
    }
  };

  const handleDeleteList = async () => {
    if (!listToDelete) {
      return;
    }

    setIsDeletingList(true);

    try {
      await deleteShoppingList(listToDelete.id);

      setIsDeleteListDialogOpen(false);
      setListToDelete(null);

      if (selectedListId === listToDelete.id) {
        setSelectedListId("all");
      }

      await refreshData();

      setNotice({
        type: "success",
        message: "Shopping list deleted successfully.",
      });
    } catch {
      setNotice({
        type: "error",
        message: "Failed to delete shopping list.",
      });
    } finally {
      setIsDeletingList(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete) {
      return;
    }

    setIsDeletingItem(true);

    try {
      await deleteShoppingItem(itemToDelete.item.id);

      setIsDeleteItemDialogOpen(false);
      setItemToDelete(null);

      await refreshData();

      setNotice({
        type: "success",
        message: "Shopping item deleted successfully.",
      });
    } catch {
      setNotice({
        type: "error",
        message: "Failed to delete shopping item.",
      });
    } finally {
      setIsDeletingItem(false);
    }
  };

  const handleQuickToggleStatus = async (
    item: ShoppingListItem,
    listId: number,
  ) => {
    if (!completedStatus || !pendingStatus) {
      return;
    }

    const nextStatusId =
      item.statusId === completedStatus.id
        ? pendingStatus.id
        : completedStatus.id;

    setQuickUpdatingItemId(item.id);

    try {
      await saveShoppingItem({
        id: item.id,
        name: item.name,
        iconPath: item.iconPath,
        userShoppingListId: listId,
        quantity: item.quantity,
        unitId: item.unitId,
        shoppingStoreId: item.shoppingStoreId,
        userShoppingStoreId: item.userShoppingStoreId,
        estimatedPrice: item.estimatedPrice,
        notes: item.notes,
        statusId: nextStatusId,
      });

      await refreshData();
    } catch {
      setNotice({
        type: "error",
        message: "Failed to update item status.",
      });
    } finally {
      setQuickUpdatingItemId(null);
    }
  };

  const handleQuickUpdateItem = async (
    item: ShoppingListItem,
    listId: number,
    changes: Partial<
      Pick<
        ShoppingItemRequest,
        | "quantity"
        | "unitId"
        | "statusId"
        | "shoppingStoreId"
        | "userShoppingStoreId"
      >
    >,
  ) => {
    setQuickUpdatingItemId(item.id);

    try {
      await saveShoppingItem({
        id: item.id,
        name: item.name,
        iconPath: item.iconPath,
        userShoppingListId: listId,
        quantity: changes.quantity ?? item.quantity,
        unitId: changes.unitId ?? item.unitId,
        shoppingStoreId:
          changes.shoppingStoreId !== undefined
            ? changes.shoppingStoreId
            : item.shoppingStoreId,
        userShoppingStoreId:
          changes.userShoppingStoreId !== undefined
            ? changes.userShoppingStoreId
            : item.userShoppingStoreId,
        estimatedPrice: item.estimatedPrice,
        notes: item.notes,
        statusId: changes.statusId ?? item.statusId,
      });

      await refreshData();
    } catch {
      setNotice({
        type: "error",
        message: "Failed to update shopping item.",
      });
    } finally {
      setQuickUpdatingItemId(null);
    }
  };

  if (isLoading || !data) {
    return (
      <CommonPageLayout
        header={{
          title: "Shopping Lists",
          subtitle:
            "Organise your everyday shopping in reusable lists. Tick when you have it, untick when you need to buy again.",
        }}
      >
        <PageLoader />
      </CommonPageLayout>
    );
  }

  return (
    <CommonPageLayout
      header={{
        title: "Shopping Lists",
        subtitle:
          "Organise your everyday shopping in reusable lists. Tick when you have it, untick when you need to buy again.",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <Stack spacing={3}>
          {notice && (
            <Alert
              severity={notice.type}
              onClose={() => setNotice(null)}
              sx={{
                borderRadius: "14px",
                border: "1px solid",
                borderColor: notice.type === "success" ? "#BBF7D0" : "#FECACA",
                backgroundColor:
                  notice.type === "success" ? "#F0FDF4" : "#FEF2F2",
                color: notice.type === "success" ? "#166534" : "#991B1B",
                "& .MuiAlert-icon": {
                  color: notice.type === "success" ? "#16A34A" : "#DC2626",
                },
              }}
            >
              {notice.message}
            </Alert>
          )}

          <ShoppingListsActionsPanel
            listCount={lists.length}
            totalItems={summary?.totalItems ?? 0}
            pendingItems={summary?.pendingItems ?? 0}
            onCreateList={openCreateListDialog}
            onAddItem={() => {
              openCreateItemDialog(
                selectedListId !== "all" ? selectedListId : undefined,
              );

              setView("items");
            }}
            onViewAll={() => {
              setSelectedListId("all");
              setView("items");
            }}
          />

          {!lists.length ? (
            <Box
              sx={{
                minHeight: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 3,
                py: 5,
                borderRadius: "22px",
                border: "1px solid #E2E8E5",
                background: "linear-gradient(135deg, #FFFFFF 0%, #F7FBF8 100%)",
                boxShadow: "0 8px 30px rgba(15, 23, 42, 0.04)",
                textAlign: "center",
              }}
            >
              <Stack
                spacing={1.5}
                sx={{
                  alignItems: "center",
                  maxWidth: 460,
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ECFDF3",
                    color: "#15803D",
                    mb: 0.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 28,
                      fontWeight: 800,
                    }}
                  >
                    +
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: {
                      xs: 21,
                      sm: 23,
                    },
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "#172033",
                  }}
                >
                  No shopping lists yet
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13.5,
                    lineHeight: 1.7,
                    color: "#64748B",
                  }}
                >
                  Create your first shopping list and keep everything you need
                  for your new life in the UK organised in one place.
                </Typography>
              </Stack>
            </Box>
          ) : (
            <>
              {view === "lists" ? (
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "28px",
                    p: {
                      xs: 2,
                      sm: 2.5,
                      md: 3,
                    },
                    background:
                      "linear-gradient(135deg, #ECFDF5 0%, #F4FAF7 38%, #F7F4FF 72%, #F3EEFF 100%)",
                    border: "1px solid rgba(52,122,98,0.12)",
                    boxShadow:
                      "0 12px 40px rgba(52,122,98,0.06), 0 8px 30px rgba(124,58,237,0.035)",

                    "&::before": {
                      content: '""',
                      position: "absolute",
                      width: 360,
                      height: 360,
                      borderRadius: "50%",
                      top: -220,
                      left: -170,
                      pointerEvents: "none",
                      background:
                        "radial-gradient(circle, rgba(52,122,98,0.14) 0%, rgba(52,122,98,0.05) 38%, transparent 72%)",
                    },

                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: 420,
                      height: 420,
                      borderRadius: "50%",
                      right: -230,
                      bottom: -280,
                      pointerEvents: "none",
                      background:
                        "radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0.035) 42%, transparent 72%)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 1,
                      mb: {
                        xs: 2,
                        sm: 2.5,
                      },
                      display: "flex",
                      alignItems: {
                        xs: "flex-start",
                        sm: "center",
                      },
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: {
                            xs: 21,
                            sm: 24,
                          },
                          fontWeight: 800,
                          letterSpacing: "-0.025em",
                          color: "#172033",
                          lineHeight: 1.2,
                        }}
                      >
                        Your Lists
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.6,
                          fontSize: {
                            xs: 12.5,
                            sm: 13.5,
                          },
                          color: "#64748B",
                          lineHeight: 1.55,
                        }}
                      >
                        Keep your shopping organised by category.
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.7,
                        px: 1.4,
                        py: 0.7,
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.72)",
                        border: "1px solid rgba(52,122,98,0.12)",
                        boxShadow: "0 3px 12px rgba(15,23,42,0.035)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          backgroundColor: "#347A62",
                          boxShadow: "0 0 0 3px rgba(52,122,98,0.10)",
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 750,
                          color: "#347A62",
                        }}
                      >
                        {lists.length} {lists.length === 1 ? "list" : "lists"}
                      </Typography>
                    </Box>
                  </Box>

                  <ShoppingListsGrid
                    lists={lists}
                    selectedListId={selectedListId}
                    onSelectList={(listId) => {
                      setSelectedListId(listId);
                      setView("items");
                    }}
                    onDeleteList={(list) => {
                      setListToDelete(list);
                      setIsDeleteListDialogOpen(true);
                    }}
                    isTemplateList={isTemplateList}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    borderRadius: "22px",
                    background:
                      "linear-gradient(135deg, #FFFFFF 0%, #F9FCFA 100%)",
                    border: "1px solid #E2E8E5",
                    boxShadow: "0 8px 30px rgba(15, 23, 42, 0.035)",
                    overflow: "hidden",
                  }}
                >
                  <ShoppingItemsSection
                    lists={lists}
                    stores={stores}
                    units={units}
                    selectedList={selectedList}
                    selectedListId={selectedListId}
                    storeFilter={storeFilter}
                    search={search}
                    filteredItems={filteredItems}
                    totalFilteredItems={filteredItems?.length ?? 0}
                    completedFilteredItems={
                      filteredItems.filter(
                        (item) => item.statusId === completedStatus?.id,
                      ).length ?? 0
                    }
                    completedStatusId={completedStatus?.id}
                    quickUpdatingItemId={quickUpdatingItemId}
                    onChangeListFilter={setSelectedListId}
                    onChangeStoreFilter={setStoreFilter}
                    onChangeSearch={setSearch}
                    onCreateStore={openCreateStoreDialog}
                    onAddItem={() =>
                      openCreateItemDialog(
                        selectedListId !== "all" ? selectedListId : undefined,
                      )
                    }
                    onViewAllLists={() => {
                      setView("lists");
                    }}
                    onEditItem={openEditItemDialog}
                    onDeleteItem={(item, listId) => {
                      setItemToDelete({
                        item,
                        listId,
                      });

                      setIsDeleteItemDialogOpen(true);
                    }}
                    onToggleItemStatus={handleQuickToggleStatus}
                    onQuickUpdateItem={handleQuickUpdateItem}
                  />
                </Box>
              )}
            </>
          )}

          <CreateShoppingListDialog
            open={isCreateListDialogOpen}
            name={newListName}
            description={newListDescription}
            isSubmitting={isSubmittingList}
            onClose={() => setIsCreateListDialogOpen(false)}
            onNameChange={setNewListName}
            onDescriptionChange={setNewListDescription}
            onSubmit={handleCreateList}
          />

          <CreateShoppingStoreDialog
            open={isCreateStoreDialogOpen}
            storeName={newStoreName}
            isSubmitting={isSubmittingStore}
            onClose={() => setIsCreateStoreDialogOpen(false)}
            onStoreNameChange={setNewStoreName}
            onSubmit={handleCreateStore}
          />

          <ShoppingItemDialog
            open={isItemDialogOpen}
            form={itemForm}
            lists={lists}
            stores={stores}
            units={units}
            statuses={statuses}
            editingItem={editingItem}
            isSubmitting={isSubmittingItem}
            onClose={() => {
              setIsItemDialogOpen(false);
              setItemForm(null);
              setEditingItem(null);
            }}
            onChange={setItemForm}
            onCreateStore={openCreateStoreDialog}
            onSubmit={handleSaveItem}
          />

          <ConfirmDeleteDialog
            open={isDeleteListDialogOpen}
            title="Delete List"
            description="Deleting this list will also delete all items inside it."
            confirmLabel="Delete List"
            isSubmitting={isDeletingList}
            onClose={() => {
              setIsDeleteListDialogOpen(false);
              setListToDelete(null);
            }}
            onConfirm={handleDeleteList}
          />

          <ConfirmDeleteDialog
            open={isDeleteItemDialogOpen}
            title="Delete Item"
            description="Are you sure you want to delete this shopping item?"
            confirmLabel="Delete Item"
            isSubmitting={isDeletingItem}
            onClose={() => {
              setIsDeleteItemDialogOpen(false);
              setItemToDelete(null);
            }}
            onConfirm={handleDeleteItem}
          />
        </Stack>
      </Box>
    </CommonPageLayout>
  );
};

export default ShoppingListsPage;
