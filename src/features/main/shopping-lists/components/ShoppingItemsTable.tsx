import { useState } from "react";

import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";

import type { Lookup } from "../../../../types/core/common/Lookup";

import type {
  ShoppingItemRequest,
  ShoppingListItem,
} from "../../../../types/features/shoppingLists";

import { getAppIcon } from "../../../../utils/appIcons";
import NumberInputField from "../../../../components/form/NumberInputField";

type ShoppingItemsTableItem = ShoppingListItem & {
  shoppingListId: number;
  shoppingListName: string;
  shoppingListColor?: string;
  shoppingListBgColor?: string;
};

type ShoppingItemsTableProps = {
  items: ShoppingItemsTableItem[];
  units: Lookup[];
  completedStatusId?: number;
  quickUpdatingItemId: number | null;

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

const columns =
  "42px minmax(160px, 1.5fr) 120px 105px minmax(125px, 1.15fr) 105px minmax(110px, 1fr) 38px";

const ShoppingItemsTable = ({
  items,
  units,
  completedStatusId,
  quickUpdatingItemId,
  onEditItem,
  onDeleteItem,
  onToggleItemStatus,
  onQuickUpdateItem,
}: ShoppingItemsTableProps) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const [menuItem, setMenuItem] = useState<ShoppingItemsTableItem | null>(
    null,
  );

  const menuOpen = Boolean(menuAnchorEl);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    item: ShoppingItemsTableItem,
  ) => {
    event.stopPropagation();

    setMenuAnchorEl(event.currentTarget);
    setMenuItem(item);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setMenuItem(null);
  };

  const handleEdit = () => {
    if (!menuItem) return;

    onEditItem(menuItem, menuItem.shoppingListId);
    handleCloseMenu();
  };

  const handleDelete = () => {
    if (!menuItem) return;

    onDeleteItem(menuItem, menuItem.shoppingListId);
    handleCloseMenu();
  };

  if (!items.length) {
    return (
      <Paper
        elevation={0}
        sx={{
          minHeight: 220,
          p: 4,
          borderRadius: 1,
          border: "1px dashed rgba(15, 23, 42, 0.14)",
          backgroundColor: "#fcfdfd",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Stack
          spacing={1}
          sx={{
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              backgroundColor: "#eaf8ef",
              color: "#16a34a",
            }}
          >
            <StorefrontRoundedIcon />
          </Box>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 18,
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            No shopping items found
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "#64748b",
            }}
          >
            Try changing your filters or add a new item.
          </Typography>
        </Stack>
      </Paper>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        pb: 0.5,
      }}
    >
      <Box
        sx={{
          minWidth: 920,
          width: "100%",
          border: "1px solid rgba(15, 23, 42, 0.08)",
          borderRadius: 1,
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: columns,
            columnGap: 1.25,
            alignItems: "center",
            px: 2,
            height: 48,
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid rgba(15, 23, 42, 0.07)",
          }}
        >
          {[
            "Status",
            "Item",
            "Quantity",
            "Unit",
            "Store / Retailer",
            "Changed On",
            "Notes",
            "",
          ].map((heading, index) => (
            <Typography
              key={`${heading}-${index}`}
              sx={{
                fontSize: 11,
                fontWeight: 800,
                color: "#64748b",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
                textTransform: "uppercase",
              }}
            >
              {heading}
            </Typography>
          ))}
        </Box>

        {items.map((item) => {
          const isCompleted = item.statusId === completedStatusId;
          const isUpdating = quickUpdatingItemId === item.id;

          const changedDate = new Date(item.updatedAt);

          const formattedDate = changedDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          const formattedTime = changedDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });

          const handleRowClick = () => {
            if (!isUpdating) {
              onEditItem(item, item.shoppingListId);
            }
          };

          return (
            <Box
              key={`${item.shoppingListId}-${item.id}`}
              onClick={handleRowClick}
              sx={{
                display: "grid",
                gridTemplateColumns: columns,
                columnGap: 1.25,
                alignItems: "center",
                px: 2,
                minHeight: 76,
                borderBottom: "1px solid rgba(15, 23, 42, 0.055)",
                transition: "background-color 0.15s ease",
                cursor: isUpdating ? "default" : "pointer",

                "&:last-child": {
                  borderBottom: "none",
                },

                "&:hover": {
                  backgroundColor: "#fcfdfd",
                },
              }}
            >
              <Box
                onClick={(event) => {
                  event.stopPropagation();

                  if (!isUpdating) {
                    onToggleItemStatus(item, item.shoppingListId);
                  }
                }}
                sx={{
                  width: 21,
                  height: 21,
                  borderRadius: 0.75,
                  border: "1.5px solid",
                  borderColor: isCompleted ? "#16a34a" : "#cbd5e1",
                  backgroundColor: isCompleted ? "#16a34a" : "#fff",
                  display: "grid",
                  placeItems: "center",
                  cursor: isUpdating ? "default" : "pointer",
                  transition: "all 0.15s ease",

                  "&:hover": {
                    borderColor: "#16a34a",
                    backgroundColor: isCompleted ? "#15803d" : "#f0fdf4",
                  },
                }}
              >
                {isUpdating ? (
                  <CircularProgress
                    size={12}
                    sx={{
                      color: isCompleted ? "#fff" : "#16a34a",
                    }}
                  />
                ) : (
                  isCompleted && (
                    <CheckRoundedIcon
                      sx={{
                        fontSize: 15,
                        color: "#fff",
                      }}
                    />
                  )
                )}
              </Box>

              <Stack
                spacing={0.35}
                sx={{
                  minWidth: 0,
                  py: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 750,
                    color: isCompleted ? "#64748b" : "#0f172a",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textDecoration: isCompleted ? "line-through" : "none",
                  }}
                >
                  {item.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    color: item.shoppingListColor || "#94a3b8",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.shoppingListName}
                </Typography>
              </Stack>

              <NumberInputField
                value={item.quantity}
                allowDecimal={false}
                disabled={isUpdating}
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onBlurValueChange={(value) => {
                  const quantity = Math.max(1, value);

                  if (!isUpdating && quantity !== item.quantity) {
                    onQuickUpdateItem(item, item.shoppingListId, {
                      quantity,
                    });
                  }
                }}
                sx={{
                  width: 116,

                  "& .MuiOutlinedInput-root": {
                    height: 34,
                    minHeight: 34,
                    borderRadius: 1.5,
                    backgroundColor: "#fff",
                    padding: 0,
                  },

                  "& .MuiOutlinedInput-input": {
                    height: 34,
                    minHeight: 34,
                    boxSizing: "border-box",
                    padding: "0 8px",
                    textAlign: "center",
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#0f172a",
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(15, 23, 42, 0.10)",
                  },

                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(15, 23, 42, 0.18)",
                  },

                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#16a34a",
                  },
                }}
              />

              <Select
                size="small"
                value={String(item.unitId)}
                disabled={isUpdating}
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onChange={(event) =>
                  onQuickUpdateItem(item, item.shoppingListId, {
                    unitId: Number(event.target.value),
                  })
                }
                sx={{
                  width: 95,
                  height: 34,
                  minHeight: 34,
                  borderRadius: 1.5,
                  backgroundColor: "#fff",
                  fontSize: 12,

                  "& .MuiSelect-select": {
                    height: "34px !important",
                    minHeight: "34px !important",
                    boxSizing: "border-box",
                    padding: "0 25px 0 10px !important",
                    display: "flex",
                    alignItems: "center",
                  },

                  "& .MuiSelect-icon": {
                    right: 4,
                    fontSize: 17,
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(15, 23, 42, 0.10)",
                  },

                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(15, 23, 42, 0.18)",
                  },

                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#16a34a",
                  },
                }}
              >
                {units.map((unit) => (
                  <MenuItem
                    key={unit.id}
                    value={String(unit.id)}
                    sx={{
                      fontSize: 12,
                    }}
                  >
                    {unit.name}
                  </MenuItem>
                ))}
              </Select>

              <Stack
                direction="row"
                spacing={0.75}
                sx={{
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "#eaf8ef",
                    color: "#329d40",
                    flexShrink: 0,

                    "& svg": {
                      fontSize: 18,
                    },
                  }}
                >
                  {getAppIcon("store") ?? <StorefrontRoundedIcon />}
                </Box>

                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 650,
                    color: "#0f172a",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.storeName || "-"}
                </Typography>
              </Stack>

              <Stack
                spacing={0.2}
                sx={{
                  minWidth: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    color: "#0f172a",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {formattedDate}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 10,
                    color: "#94a3b8",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {formattedTime}
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "#475569",
                  fontWeight: 500,
                  minWidth: 0,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: 1.45,
                }}
                title={item.notes || ""}
              >
                {item.notes || "-"}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  size="small"
                  onClick={(event) => handleOpenMenu(event, item)}
                  sx={{
                    width: 30,
                    height: 30,
                    color: "#94a3b8",

                    "&:hover": {
                      color: "#0f172a",
                      backgroundColor: "#f1f5f9",
                    },
                  }}
                >
                  <MoreVertRoundedIcon
                    sx={{
                      fontSize: 19,
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Menu
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              mt: 0.5,
              minWidth: 140,
              borderRadius: 1.5,
              border: "1px solid rgba(15, 23, 42, 0.08)",
            },
          },
        }}
      >
        <MenuItem
          onClick={handleEdit}
          sx={{
            fontSize: 13,
            gap: 1,
            py: 1,
          }}
        >
          <EditRoundedIcon
            sx={{
              fontSize: 17,
              color: "#475569",
            }}
          />
          Edit
        </MenuItem>

        <MenuItem
          onClick={handleDelete}
          sx={{
            fontSize: 13,
            gap: 1,
            py: 1,
            color: "#dc2626",

            "&:hover": {
              backgroundColor: "#fef2f2",
            },
          }}
        >
          <DeleteOutlineRoundedIcon
            sx={{
              fontSize: 17,
              color: "#dc2626",
            }}
          />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ShoppingItemsTable;