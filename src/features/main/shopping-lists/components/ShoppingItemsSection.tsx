import {
  ArrowBackRounded,
  AddRounded,
  CheckCircleRounded,
  ChecklistRounded,
  SearchRounded,
  ShoppingCartRounded,
  StorefrontRounded,
} from "@mui/icons-material";

import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { Lookup } from "../../../../types/core/common/Lookup";

import type {
  ShoppingList,
  ShoppingListItem,
  ShoppingStore,
  ShoppingItemRequest,
} from "../../../../types/features/shoppingLists";

import ShoppingItemsTable from "./ShoppingItemsTable";

type ShoppingItemsSectionProps = {
  lists: ShoppingList[];
  stores: ShoppingStore[];
  units: Lookup[];

  selectedList: ShoppingList | null;
  selectedListId: number | "all";

  storeFilter: number | "all";
  search: string;

  filteredItems: Array<
    ShoppingListItem & {
      shoppingListId: number;
      shoppingListName: string;
      shoppingListColor?: string;
      shoppingListBgColor?: string;
    }
  >;

  totalFilteredItems: number;
  completedFilteredItems: number;
  completedStatusId?: number;
  quickUpdatingItemId: number | null;

  onChangeListFilter: (value: number | "all") => void;
  onChangeStoreFilter: (value: number | "all") => void;
  onChangeSearch: (value: string) => void;

  onCreateStore: () => void;
  onAddItem: () => void;
  onViewAllLists: () => void;

  onEditItem: (item: ShoppingListItem, listId: number) => void;
  onDeleteItem: (item: ShoppingListItem, listId: number) => void;
  onToggleItemStatus: (item: ShoppingListItem, listId: number) => void;
  onQuickUpdateItem: (
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
  ) => void;
};

const SummaryCard = ({
  icon,
  value,
  label,
  bgcolor,
  iconColor,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  bgcolor: string;
  iconColor: string;
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        minWidth: 0,
        width: "100%",
        height: {
          xs: 48,
          sm: 52,
          lg: 56,
        },
        px: {
          xs: 0.65,
          sm: 0.85,
          lg: 1.1,
        },
        borderRadius: {
          xs: "9px",
          lg: "10px",
        },
        border: "1px solid rgba(15, 23, 42, 0.07)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.92))",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: {
            xs: 27,
            sm: 31,
            lg: 35,
          },
          height: {
            xs: 27,
            sm: 31,
            lg: 35,
          },
          borderRadius: {
            xs: "8px",
            lg: "9px",
          },
          display: "grid",
          placeItems: "center",
          backgroundColor: bgcolor,
          color: iconColor,
          flexShrink: 0,

          "& svg": {
            fontSize: {
              xs: 16,
              sm: 18,
              lg: 19,
            },
          },
        }}
      >
        {icon}
      </Box>

      <Stack
        spacing={0.1}
        sx={{
          ml: {
            xs: 0.55,
            sm: 0.7,
            lg: 0.9,
          },
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 13,
              sm: 15,
              lg: 17,
            },
            lineHeight: 1.1,
            fontWeight: 800,
            color: "#0f172a",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: 8,
              sm: 9,
              lg: 10,
            },
            lineHeight: 1.2,
            color: "#64748b",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
      </Stack>
    </Paper>
  );
};

const ShoppingItemsSection = ({
  lists,
  stores,
  units,
  selectedList,
  selectedListId,
  storeFilter,
  search,
  filteredItems,
  totalFilteredItems,
  completedFilteredItems,
  completedStatusId,
  quickUpdatingItemId,
  onChangeListFilter,
  onChangeStoreFilter,
  onChangeSearch,
  onCreateStore,
  onAddItem,
  onViewAllLists,
  onEditItem,
  onDeleteItem,
  onToggleItemStatus,
  onQuickUpdateItem,
}: ShoppingItemsSectionProps) => {
  const isAllItems = selectedListId === "all";

  const controlSx = {
    width: "100%",
    minWidth: 0,

    "& .MuiOutlinedInput-root": {
      height: {
        xs: 42,
        sm: 44,
        lg: 48,
      },
      borderRadius: "10px",
      backgroundColor: "#fff",
      fontSize: {
        xs: 11.5,
        sm: 12,
        lg: 13,
      },
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(15, 23, 42, 0.10)",
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(15, 23, 42, 0.18)",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#16a34a",
      borderWidth: 1,
    },
  };

  const actionButtonSx = {
    height: {
      xs: 40,
      sm: 42,
      lg: 42,
    },
    minWidth: 0,
    px: {
      xs: 0.7,
      sm: 1.15,
      lg: 1.5,
    },
    borderRadius: "10px",
    textTransform: "none",
    fontSize: {
      xs: 10,
      sm: 11,
      lg: 12.5,
    },
    fontWeight: 700,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",

    "& .MuiButton-startIcon": {
      marginRight: {
        xs: 0.35,
        sm: 0.5,
        lg: 0.6,
      },
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        p: {
          xs: 1,
          sm: 1.25,
          md: 1.5,
          lg: 1.75,
        },
        borderRadius: {
          xs: "12px",
          sm: "13px",
          lg: "14px",
        },
        border: "1px solid rgba(15, 23, 42, 0.07)",
        background:
          "radial-gradient(circle at 100% 0%, rgba(22,163,74,0.055), transparent 28%), linear-gradient(135deg, #ffffff 0%, #fbfefc 55%, #f8fbf9 100%)",
        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.035)",
      }}
    >
      <Stack
        spacing={{
          xs: 1.25,
          sm: 1.5,
          lg: 1.75,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            gap: {
              xs: 1.25,
              lg: 1.5,
            },
            alignItems: {
              xs: "stretch",
              lg: "center",
            },
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction="row"
            spacing={{
              xs: 0.9,
              sm: 1.1,
              lg: 1.25,
            }}
            sx={{
              alignItems: "center",
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 38,
                  sm: 42,
                  lg: 44,
                },
                height: {
                  xs: 38,
                  sm: 42,
                  lg: 44,
                },
                borderRadius: {
                  xs: "11px",
                  lg: "12px",
                },
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(135deg, #eaf8ef 0%, #dcf3e5 100%)",
                color: "#15803d",
                flexShrink: 0,

                "& svg": {
                  fontSize: {
                    xs: 19,
                    sm: 21,
                    lg: 22,
                  },
                },
              }}
            >
              <ShoppingCartRounded />
            </Box>

            <Stack
              spacing={0.2}
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 18,
                    sm: 22,
                    md: 24,
                    lg: 26,
                  },
                  lineHeight: 1.2,
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.02em",
                  overflowWrap: "anywhere",
                }}
              >
                {isAllItems
                  ? "All Shopping Items"
                  : (selectedList?.name ?? "Shopping Items")}
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 10.5,
                    sm: 11.5,
                    lg: 12.5,
                  },
                  color: "#64748b",
                  lineHeight: 1.4,
                  overflowWrap: "anywhere",
                }}
              >
                {isAllItems
                  ? "Manage all your lists and items in one place."
                  : selectedList?.description || "Manage items in this list."}
              </Typography>
            </Stack>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                sm: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(3, auto)",
              },
              gap: {
                xs: 0.6,
                sm: 0.75,
              },
              width: {
                xs: "100%",
                lg: "auto",
              },
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddRounded />}
              onClick={onAddItem}
              sx={{
                ...actionButtonSx,
                gridColumn: {
                  xs: "1 / -1",
                  sm: "auto",
                },
                color: "#fff",
                backgroundColor: "#16a34a",
                boxShadow: "0 4px 12px rgba(22, 163, 74, 0.16)",

                "&:hover": {
                  backgroundColor: "#15803d",
                  boxShadow: "0 4px 12px rgba(22, 163, 74, 0.16)",
                },
              }}
            >
              Add Item
            </Button>

            <Button
              variant="outlined"
              startIcon={<StorefrontRounded />}
              onClick={onCreateStore}
              sx={{
                ...actionButtonSx,
                color: "#0f172a",
                borderColor: "rgba(15, 23, 42, 0.10)",
                backgroundColor: "rgba(255,255,255,0.75)",

                "&:hover": {
                  borderColor: "rgba(15, 23, 42, 0.18)",
                  backgroundColor: "#fff",
                },
              }}
            >
              Add New Store
            </Button>

            <Button
              variant="outlined"
              startIcon={<ArrowBackRounded />}
              onClick={onViewAllLists}
              sx={{
                ...actionButtonSx,
                color: "#0f172a",
                borderColor: "rgba(15, 23, 42, 0.10)",
                backgroundColor: "rgba(255,255,255,0.75)",

                "&:hover": {
                  borderColor: "rgba(15, 23, 42, 0.18)",
                  backgroundColor: "#fff",
                },
              }}
            >
              View All Lists
            </Button>
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 0.7,
              sm: 0.9,
              lg: 1.1,
            },
            borderRadius: {
              xs: "11px",
              lg: "12px",
            },
            border: "1px solid rgba(15, 23, 42, 0.065)",
            background:
              "linear-gradient(135deg, rgba(248,250,252,0.95), rgba(255,255,255,0.9))",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "minmax(180px, 1.25fr) minmax(150px, 1fr) minmax(150px, 1fr) repeat(3, minmax(110px, 0.8fr))",
              },
              gap: {
                xs: 0.65,
                sm: 0.75,
                lg: 0.9,
              },
              alignItems: "stretch",
            }}
          >
            <TextField
              value={search}
              onChange={(event) => onChangeSearch(event.target.value)}
              placeholder="Search items..."
              sx={{
                width: "100%",
                minWidth: 0,
                gridColumn: {
                  xs: "1 / -1",
                  sm: "1 / -1",
                  lg: "auto",
                },

                "& .MuiOutlinedInput-root": {
                  height: {
                    xs: 42,
                    sm: 44,
                    lg: 48,
                  },
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                },

                "& .MuiOutlinedInput-root fieldset": {
                  borderColor: "rgba(15, 23, 42, 0.10)",
                },

                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "rgba(15, 23, 42, 0.18)",
                },

                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#16a34a",
                  borderWidth: 1,
                },

                "& .MuiInputAdornment-root": {
                  marginRight: 0.5,
                  marginLeft: 0,
                },

                "& .MuiOutlinedInput-input": {
                  paddingLeft: 0,
                  fontSize: {
                    xs: 11.5,
                    sm: 12,
                    lg: 13,
                  },
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded
                        sx={{
                          color: "#94a3b8",
                          fontSize: {
                            xs: 18,
                            lg: 20,
                          },
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <FormControl
              sx={{
                ...controlSx,
                gridColumn: {
                  xs: "1 / -1",
                  sm: "auto",
                  lg: "auto",
                },
                mt: {
                  xs: 1,
                  sm: 0,
                },
              }}
            >
              <InputLabel>Filter by Store</InputLabel>

              <Select
                value={String(storeFilter)}
                label="Filter by Store"
                onChange={(event) => {
                  const value = event.target.value;

                  onChangeStoreFilter(value === "all" ? "all" : Number(value));
                }}
              >
                <MenuItem value="all">All Stores</MenuItem>

                {stores.map((store) => (
                  <MenuItem key={store.id} value={String(store.id)}>
                    {store.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              sx={{
                ...controlSx,
                gridColumn: {
                  xs: "1 / -1",
                  sm: "auto",
                  lg: "auto",
                },
                mt: {
                  xs: 1,
                  sm: 0,
                },
              }}
            >
              <InputLabel>Filter by List</InputLabel>

              <Select
                value={String(selectedListId)}
                label="Filter by List"
                onChange={(event) => {
                  const value = event.target.value;

                  onChangeListFilter(value === "all" ? "all" : Number(value));
                }}
              >
                <MenuItem value="all">All Lists</MenuItem>

                {lists.map((list) => (
                  <MenuItem key={list.id} value={String(list.id)}>
                    {list.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box
              sx={{
                gridColumn: {
                  xs: "1 / -1",
                  sm: "1 / -1",
                  lg: "4 / -1",
                },
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: {
                  xs: 0.65,
                  sm: 0.75,
                  lg: 0.9,
                },
                minWidth: 0,
                width: "100%",
              }}
            >
              <SummaryCard
                icon={<ChecklistRounded />}
                value={totalFilteredItems}
                label="Total Items"
                bgcolor="#e8f1ff"
                iconColor="#2563eb"
              />

              <SummaryCard
                icon={<CheckCircleRounded />}
                value={completedFilteredItems}
                label="Have"
                bgcolor="#e8f7ee"
                iconColor="#16a34a"
              />

              <SummaryCard
                icon={<ShoppingCartRounded />}
                value={totalFilteredItems - completedFilteredItems}
                label="Pending"
                bgcolor="#fff3df"
                iconColor="#f59e0b"
              />
            </Box>
          </Box>
        </Paper>

        <Box
          sx={{
            width: "100%",
            minWidth: 0,
            overflowX: "auto",
          }}
        >
          <ShoppingItemsTable
            items={filteredItems}
            units={units}
            completedStatusId={completedStatusId}
            quickUpdatingItemId={quickUpdatingItemId}
            onEditItem={onEditItem}
            onDeleteItem={onDeleteItem}
            onToggleItemStatus={onToggleItemStatus}
            onQuickUpdateItem={onQuickUpdateItem}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default ShoppingItemsSection;
