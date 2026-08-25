import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import type { Lookup } from "../../../../types/core/common/Lookup";

import type {
  ShoppingList,
  ShoppingListItem,
  ShoppingStore,
} from "../../../../types/features/shoppingLists";

export type ShoppingItemFormState = {
  id?: number;
  name: string;
  userShoppingListId: number;
  quantity: number;
  unitId: number;
  shoppingStoreId?: number;
  userShoppingStoreId?: number;
  estimatedPrice: string | null;
  notes: string;
  statusId: number;
};

type ShoppingItemDialogProps = {
  open: boolean;
  form: ShoppingItemFormState | null;
  lists: ShoppingList[];
  stores: ShoppingStore[];
  units: Lookup[];
  statuses: Lookup[];
  editingItem: ShoppingListItem | null;
  isSubmitting: boolean;
  onClose: () => void;
  onChange: React.Dispatch<
    React.SetStateAction<ShoppingItemFormState | null>
  >;
  onCreateStore: () => void;
  onSubmit: () => void;
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: 48,
    borderRadius: "11px",
    backgroundColor: "#FFFFFF",
    transition: "all 0.15s ease",

    "& fieldset": {
      borderColor: "#E2E8F0",
    },

    "&:hover fieldset": {
      borderColor: "#CBD5E1",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#16A34A",
      borderWidth: "1px",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#475569",
    fontSize: 14,
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#15803D",
  },

  "& .MuiOutlinedInput-input": {
    fontSize: 13.5,
  },
};

const ShoppingItemDialog = ({
  open,
  form,
  lists,
  stores,
  units,
  statuses,
  editingItem,
  isSubmitting,
  onClose,
  onChange,
  onCreateStore,
  onSubmit,
}: ShoppingItemDialogProps) => {
  const updateForm = <K extends keyof ShoppingItemFormState>(
    key: K,
    value: ShoppingItemFormState[K],
  ) => {
    onChange((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleStoreChange = (value: string) => {
    if (value === "create-new-store") {
      onCreateStore();
      return;
    }

    const selectedStore = stores.find((store) => store.id === Number(value));

    if (!selectedStore) {
      onChange((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          shoppingStoreId: undefined,
          userShoppingStoreId: undefined,
        };
      });

      return;
    }

    onChange((prev) => {
      if (!prev) return prev;

      if (selectedStore.isCustom) {
        return {
          ...prev,
          shoppingStoreId: undefined,
          userShoppingStoreId: selectedStore.id,
        };
      }

      return {
        ...prev,
        shoppingStoreId: selectedStore.id,
        userShoppingStoreId: undefined,
      };
    });
  };

  const selectedStoreValue = form?.shoppingStoreId
    ? String(form.shoppingStoreId)
    : form?.userShoppingStoreId
      ? String(form.userShoppingStoreId)
      : "";

  const orderedStatuses = [...statuses].sort((a, b) => {
    const aHave = a.name.toLowerCase().includes("have");
    const bHave = b.name.toLowerCase().includes("have");

    if (aHave && !bHave) return -1;
    if (!aHave && bHave) return 1;

    return 0;
  });

  const estimatedPriceValue =
    form?.estimatedPrice === null ||
    form?.estimatedPrice === undefined ||
    form?.estimatedPrice === "null"
      ? ""
      : form.estimatedPrice;

  const handleEstimatedPriceChange = (value: string) => {
    if (value === "") {
      updateForm("estimatedPrice", "");
      return;
    }

    if (/^\d*\.?\d*$/.test(value)) {
      updateForm("estimatedPrice", value);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            maxWidth: 640,
            maxHeight: "92vh",
            borderRadius: "20px",
            overflow: "hidden",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 24px 70px rgba(15, 23, 42, 0.14)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          px: {
            xs: 2.5,
            sm: 3.5,
          },
          pt: {
            xs: 2.5,
            sm: 3,
          },
          pb: 2.5,
          background: "linear-gradient(180deg, #F7FCF8 0%, #FFFFFF 100%)",
          borderBottom: "1px solid #EEF2F0",
        }}
      >
        <Stack
          direction="row"
          spacing={1.75}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: "center",
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: "14px",
                display: "grid",
                placeItems: "center",
                backgroundColor: "#ECFDF3",
                border: "1px solid #D1FAE5",
                color: "#15803D",
                flexShrink: 0,
              }}
            >
              <ShoppingBagRoundedIcon />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 20,
                    sm: 22,
                  },
                  lineHeight: 1.2,
                  fontWeight: 800,
                  color: "#172033",
                  letterSpacing: "-0.02em",
                }}
              >
                {editingItem ? "Edit Item" : "Add New Item"}
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#64748B",
                  lineHeight: 1.45,
                }}
              >
                {editingItem
                  ? "Update the shopping item details."
                  : "Add a new item to keep track of what you need."}
              </Typography>
            </Box>
          </Stack>

          <IconButton
            onClick={onClose}
            disabled={isSubmitting}
            size="small"
            sx={{
              width: 36,
              height: 36,
              color: "#64748B",
              borderRadius: "10px",
              flexShrink: 0,
              border: "1px solid transparent",
              transition: "all 0.15s ease",

              "&:hover": {
                color: "#172033",
                backgroundColor: "#F1F5F9",
                borderColor: "#E2E8F0",
              },
            }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent
        sx={{
          px: {
            xs: 2.5,
            sm: 3.5,
          },
          py: {
            xs: 2.5,
            sm: 3,
          },
          backgroundColor: "#FFFFFF",
        }}
      >
        {!form ? null : (
          <Stack spacing={3}>
            <Box>
              <Stack spacing={2}>
                <Box>
                  <Typography
                    sx={{
                      mb: 0.75,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#172033",
                    }}
                  >
                    Item Name{" "}
                    <Box
                      component="span"
                      sx={{
                        color: "#DC2626",
                      }}
                    >
                      *
                    </Box>
                  </Typography>

                  <TextField
                    fullWidth
                    placeholder="e.g. Milk, Eggs, Bread"
                    value={form.name}
                    onChange={(event) => updateForm("name", event.target.value)}
                    slotProps={{
                      htmlInput: {
                        maxLength: 100,
                      },
                    }}
                    sx={fieldSx}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr",
                    },
                    gap: 1.5,
                  }}
                >
                  <FormControl fullWidth sx={fieldSx}>
                    <InputLabel>List *</InputLabel>

                    <Select
                      value={String(form.userShoppingListId)}
                      label="List *"
                      onChange={(event) =>
                        updateForm(
                          "userShoppingListId",
                          Number(event.target.value),
                        )
                      }
                    >
                      {lists.map((list) => (
                        <MenuItem key={list.id} value={String(list.id)}>
                          {list.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={fieldSx}>
                    <InputLabel>Store</InputLabel>

                    <Select
                      value={selectedStoreValue}
                      label="Store"
                      onChange={(event) =>
                        handleStoreChange(event.target.value)
                      }
                    >
                      <MenuItem value="create-new-store">
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            alignItems: "center",
                            color: "#15803D",
                          }}
                        >
                          <AddRoundedIcon fontSize="small" />

                          <Typography
                            sx={{
                              fontSize: 13.5,
                              fontWeight: 700,
                            }}
                          >
                            Add New Store
                          </Typography>
                        </Stack>
                      </MenuItem>

                      <Divider />

                      {stores.map((store) => (
                        <MenuItem key={store.id} value={String(store.id)}>
                          {store.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </Box>

            <Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    sm: "1.15fr 0.75fr 1fr",
                  },
                  gap: 1.5,
                  alignItems: "end",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      mb: 0.75,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#172033",
                    }}
                  >
                    Quantity{" "}
                    <Box
                      component="span"
                      sx={{
                        color: "#DC2626",
                      }}
                    >
                      *
                    </Box>
                  </Typography>

                  <Stack
                    direction="row"
                    sx={{
                      height: 48,
                      border: "1px solid #E2E8F0",
                      borderRadius: "11px",
                      overflow: "hidden",
                      backgroundColor: "#FFFFFF",
                      transition: "border-color 0.15s ease",

                      "&:hover": {
                        borderColor: "#CBD5E1",
                      },
                    }}
                  >
                    <Button
                      onClick={() =>
                        updateForm(
                          "quantity",
                          Math.max(1, form.quantity - 1),
                        )
                      }
                      sx={{
                        minWidth: {
                          xs: 36,
                          sm: 44,
                        },
                        px: 0,
                        borderRadius: 0,
                        color: "#475569",
                        fontSize: 20,
                        fontWeight: 500,
                        transition: "all 0.15s ease",

                        "&:hover": {
                          backgroundColor: "#F8FAFC",
                          color: "#172033",
                        },
                      }}
                    >
                      −
                    </Button>

                    <Box
                      sx={{
                        flex: 1,
                        display: "grid",
                        placeItems: "center",
                        minWidth: 30,
                        borderLeft: "1px solid #F1F5F9",
                        borderRight: "1px solid #F1F5F9",
                        backgroundColor: "#FAFCFB",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: "#172033",
                        }}
                      >
                        {form.quantity}
                      </Typography>
                    </Box>

                    <Button
                      onClick={() =>
                        updateForm("quantity", form.quantity + 1)
                      }
                      sx={{
                        minWidth: {
                          xs: 36,
                          sm: 44,
                        },
                        px: 0,
                        borderRadius: 0,
                        color: "#16A34A",
                        fontSize: 20,
                        fontWeight: 500,
                        transition: "all 0.15s ease",

                        "&:hover": {
                          backgroundColor: "#F0FDF4",
                          color: "#15803D",
                        },
                      }}
                    >
                      +
                    </Button>
                  </Stack>
                </Box>

                <FormControl fullWidth sx={fieldSx}>
                  <InputLabel>Unit *</InputLabel>

                  <Select
                    value={String(form.unitId)}
                    label="Unit *"
                    onChange={(event) =>
                      updateForm("unitId", Number(event.target.value))
                    }
                  >
                    {units.map((unit) => (
                      <MenuItem key={unit.id} value={String(unit.id)}>
                        {unit.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Estimated Price"
                  placeholder="e.g. 1.50"
                  value={estimatedPriceValue}
                  onChange={(event) =>
                    handleEstimatedPriceChange(event.target.value)
                  }
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            sx={{
                              color: "#64748B",
                              fontSize: 14,
                              fontWeight: 700,
                            }}
                          >
                            £
                          </Typography>
                        </InputAdornment>
                      ),
                    },

                    htmlInput: {
                      inputMode: "decimal",
                      maxLength: 10,
                    },
                  }}
                  sx={{
                    ...fieldSx,
                    gridColumn: {
                      xs: "1 / -1",
                      sm: "auto",
                    },
                  }}
                />
              </Box>
            </Box>

            <Box>
              <Typography
                sx={{
                  mb: 0.75,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#172033",
                }}
              >
                Notes
              </Typography>

              <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder="Add any notes about this item (brand, size, preference, etc.)"
                value={form.notes}
                onChange={(event) => updateForm("notes", event.target.value)}
                slotProps={{
                  htmlInput: {
                    maxLength: 150,
                  },
                }}
                sx={{
                  ...fieldSx,

                  "& .MuiOutlinedInput-root": {
                    ...fieldSx["& .MuiOutlinedInput-root"],
                    minHeight: 96,
                    alignItems: "flex-start",
                    paddingTop: "2px",
                  },

                  "& .MuiOutlinedInput-input": {
                    py: 1.5,
                    fontSize: 13.5,
                  },
                }}
              />
            </Box>

            <Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                  },
                  gap: 1.5,
                }}
              >
                {orderedStatuses.map((status) => {
                  const isSelected = form.statusId === status.id;

                  const isPositive =
                    status.name.toLowerCase().includes("have") ||
                    status.name.toLowerCase().includes("complete") ||
                    status.name.toLowerCase().includes("checked");

                  return (
                    <Box
                      key={status.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => updateForm("statusId", status.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          updateForm("statusId", status.id);
                        }
                      }}
                      sx={{
                        minHeight: 82,
                        p: 1.75,
                        borderRadius: "12px",
                        border: "1px solid",
                        borderColor: isSelected
                          ? isPositive
                            ? "#86C99B"
                            : "#F6C56D"
                          : "#E2E8F0",
                        backgroundColor: isSelected
                          ? isPositive
                            ? "#F0FDF4"
                            : "#FFFBEB"
                          : "#FFFFFF",
                        cursor: "pointer",
                        transition:
                          "border-color 0.15s ease, background-color 0.15s ease, transform 0.15s ease",

                        "&:hover": {
                          borderColor: isPositive ? "#86C99B" : "#F6C56D",
                          transform: "translateY(-1px)",
                        },

                        "&:focus-visible": {
                          outline: "2px solid #86C99B",
                          outlineOffset: 2,
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            minWidth: 0,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 13.5,
                              fontWeight: 800,
                              color: "#172033",
                              lineHeight: 1.35,
                            }}
                          >
                            {status.name}
                          </Typography>

                          {status.description && (
                            <Typography
                              sx={{
                                mt: 0.5,
                                fontSize: 11.5,
                                lineHeight: 1.45,
                                color: "#64748B",
                              }}
                            >
                              {status.description}
                            </Typography>
                          )}
                        </Box>

                        <Box
                          sx={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            border: "2px solid",
                            borderColor: isSelected
                              ? isPositive
                                ? "#16A34A"
                                : "#F59E0B"
                              : "#CBD5E1",
                            backgroundColor: isSelected
                              ? isPositive
                                ? "#16A34A"
                                : "#F59E0B"
                              : "transparent",
                            boxShadow: isSelected
                              ? "inset 0 0 0 3px #FFFFFF"
                              : "none",
                            flexShrink: 0,
                            transition: "all 0.15s ease",
                          }}
                        />
                      </Stack>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            <Alert
              icon={
                <InfoOutlinedIcon
                  sx={{
                    fontSize: 19,
                  }}
                />
              }
              severity="info"
              sx={{
                borderRadius: "12px",
                py: 0.75,
                px: 1.5,
                backgroundColor: "#F0F9FF",
                border: "1px solid #BAE6FD",
                color: "#0369A1",

                "& .MuiAlert-icon": {
                  color: "#0284C7",
                  pt: 0.2,
                },

                "& .MuiAlert-message": {
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: "#475569",
                },
              }}
            >
              You can move an existing item to another list by changing the
              list above.
            </Alert>
          </Stack>
        )}
      </DialogContent>

      <Divider
        sx={{
          borderColor: "#E2E8F0",
        }}
      />

      <DialogActions
        sx={{
          px: {
            xs: 2.5,
            sm: 3.5,
          },
          py: 2,
          justifyContent: "space-between",
          backgroundColor: "#FAFCFB",
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isSubmitting}
          sx={{
            minWidth: 110,
            height: 42,
            borderRadius: "10px",
            textTransform: "none",
            fontSize: 13,
            fontWeight: 700,
            color: "#172033",
            borderColor: "#CBD5E1",
            backgroundColor: "#FFFFFF",
            transition: "all 0.15s ease",

            "&:hover": {
              borderColor: "#94A3B8",
              backgroundColor: "#F8FAFC",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={isSubmitting || !form || !form.name.trim()}
          sx={{
            minWidth: 125,
            height: 42,
            px: 2.5,
            borderRadius: "10px",
            textTransform: "none",
            fontSize: 13,
            fontWeight: 700,
            backgroundColor: "#16A34A",
            boxShadow: "none",
            transition: "all 0.15s ease",

            "&:hover": {
              backgroundColor: "#15803D",
              boxShadow: "none",
              transform: "translateY(-1px)",
            },

            "&:active": {
              transform: "translateY(0)",
            },

            "&.Mui-disabled": {
              backgroundColor: "#D1D5DB",
              color: "#FFFFFF",
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress
              size={18}
              sx={{
                color: "#FFFFFF",
              }}
            />
          ) : editingItem ? (
            "Save Changes"
          ) : (
            "Add Item"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShoppingItemDialog;