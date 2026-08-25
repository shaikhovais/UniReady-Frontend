import { useEffect, useMemo, useState } from "react";
import dayjs, { type Dayjs } from "dayjs";

import {
  CloseRounded,
  ReceiptLongRounded,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { getAppIcon } from "../../../../utils/appIcons";
import NumberInputField from "../../../../components/form/NumberInputField";

import {
  CHART_COLOURS,
  DEFAULT_CHART_COLOUR,
} from "../../../../utils/chartColours";

import type {
  Expense,
  SaveExpenseRequest,
  ExpenseCategoryOption,
} from "../../../../types/features/budget";
import type { Lookup } from "../../../../types/core/common/Lookup";

interface ManageExpenseDialogProps {
  open: boolean;
  editExpense: Expense | undefined;
  categories: ExpenseCategoryOption[];
  paymentMethods: Lookup[];
  onClose: () => void;
  onSave: (request: SaveExpenseRequest) => Promise<void>;
}

const inputSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: {
      xs: 40,
      sm: 44,
    },
    borderRadius: {
      xs: "9px",
      sm: "11px",
    },
    backgroundColor: "#FFFFFF",
    "& fieldset": {
      borderColor: "#DCE5E0",
    },
    "&:hover fieldset": {
      borderColor: "#B7CDBE",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#16A34A",
      borderWidth: 1.5,
    },
  },
  "& .MuiOutlinedInput-input": {
    fontSize: {
      xs: 13,
      sm: 14,
    },
    color: "#172033",
    py: {
      xs: 0.9,
      sm: 1.1,
    },
  },
};

const ManageExpenseDialog = ({
  open,
  editExpense,
  categories,
  paymentMethods,
  onClose,
  onSave,
}: ManageExpenseDialogProps) => {
  const initialState = useMemo<SaveExpenseRequest>(
    () => ({
      name: "",
      amount: 0,
      userBudgetCategoryId: 0,
      expenseDate: dayjs().format("YYYY-MM-DD"),
      paymentMethodId: 0,
      notes: "",
    }),
    [],
  );

  const [expense, setExpense] =
    useState<SaveExpenseRequest>(initialState);

  useEffect(() => {
    if (open) {
      setExpense(editExpense ?? initialState);
    }
  }, [open, initialState, editExpense]);

  const handleClose = () => {
    setExpense(initialState);
    onClose();
  };

  const handleSave = async () => {
    await onSave({
      ...expense,
      name: expense.name.trim(),
      notes: expense.notes?.trim() || "",
    });

    setExpense(initialState);
    onClose();
  };

  const handleDateChange = (value: Dayjs | null) => {
    setExpense((previous) => ({
      ...previous,
      expenseDate: value ? value.format("YYYY-MM-DD") : "",
    }));
  };

  const getCategoryColour = (categoryId: number) => {
    const categoryIndex = categories.findIndex(
      (item) => item.userBudgetCategoryId === categoryId,
    );

    return CHART_COLOURS[categoryIndex] ?? DEFAULT_CHART_COLOUR;
  };

  const isSaveDisabled =
    !expense.name.trim() ||
    expense.amount <= 0 ||
    !expense.userBudgetCategoryId ||
    !expense.expenseDate ||
    !expense.paymentMethodId;

  const labelSx = {
    mb: {
      xs: 0.45,
      sm: 0.7,
    },
    fontSize: {
      xs: 11.5,
      sm: 12.5,
    },
    fontWeight: 700,
    color: "#334155",
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-container": {
          p: {
            xs: 1,
            sm: 2,
          },
        },
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: 540,
          maxHeight: {
            xs: "calc(100vh - 16px)",
            sm: "calc(100vh - 32px)",
          },
          m: 0,
          borderRadius: {
            xs: "13px",
            sm: "18px",
          },
          overflow: "hidden",
          border: "1px solid #E1E9E4",
          boxShadow: "0 24px 70px rgba(15,23,42,0.16)",
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          backgroundColor: "#FFFFFF",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: 5,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#CBD5D0",
            borderRadius: 999,
          },
        }}
      >
        <Box
          sx={{
            px: {
              xs: 1.5,
              sm: 2.75,
            },
            pt: {
              xs: 1.5,
              sm: 2.75,
            },
            pb: {
              xs: 1.5,
              sm: 2.25,
            },
            borderBottom: "1px solid #E5ECE8",
            background:
              "linear-gradient(135deg, #F1FAF4 0%, #FFFFFF 68%)",
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              width: {
                xs: 100,
                sm: 150,
              },
              height: {
                xs: 100,
                sm: 150,
              },
              borderRadius: "50%",
              backgroundColor: "#DCFCE7",
              opacity: 0.45,
              right: {
                xs: -55,
                sm: -70,
              },
              top: {
                xs: -55,
                sm: -85,
              },
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: {
                  xs: 1,
                  sm: 1.5,
                },
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: 38,
                    sm: 46,
                  },
                  height: {
                    xs: 38,
                    sm: 46,
                  },
                  flexShrink: 0,
                  borderRadius: {
                    xs: "10px",
                    sm: "14px",
                  },
                  display: "grid",
                  placeItems: "center",
                  color: "#15803D",
                  background:
                    "linear-gradient(135deg, #DCFCE7, #ECFDF5)",
                  border: "1px solid #D2EFDA",
                }}
              >
                <ReceiptLongRounded
                  sx={{
                    fontSize: {
                      xs: 20,
                      sm: 24,
                    },
                  }}
                />
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 16,
                      sm: 19,
                    },
                    fontWeight: 800,
                    color: "#172033",
                    lineHeight: 1.2,
                  }}
                >
                  {editExpense
                    ? "Edit Expense"
                    : "Add New Expense"}
                </Typography>

                <Typography
                  sx={{
                    mt: {
                      xs: 0.25,
                      sm: 0.5,
                    },
                    fontSize: {
                      xs: 10.5,
                      sm: 12.5,
                    },
                    color: "#64748B",
                    lineHeight: 1.4,
                    maxWidth: {
                      xs: 250,
                      sm: "none",
                    },
                  }}
                >
                  {editExpense
                    ? "Update the details of your expense."
                    : "Record a purchase and keep your spending organised."}
                </Typography>
              </Box>
            </Box>

            <IconButton
              onClick={handleClose}
              sx={{
                width: {
                  xs: 30,
                  sm: 34,
                },
                height: {
                  xs: 30,
                  sm: 34,
                },
                flexShrink: 0,
                borderRadius: {
                  xs: "8px",
                  sm: "10px",
                },
                color: "#64748B",
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                  color: "#172033",
                },
              }}
            >
              <CloseRounded
                sx={{
                  fontSize: {
                    xs: 18,
                    sm: 20,
                  },
                }}
              />
            </IconButton>
          </Box>
        </Box>

        <Stack
          spacing={{
            xs: 1.35,
            sm: 2,
          }}
          sx={{
            px: {
              xs: 1.5,
              sm: 2.75,
            },
            py: {
              xs: 1.5,
              sm: 2.5,
            },
          }}
        >
          <Box>
            <Typography sx={labelSx}>
              Expense Name
            </Typography>

            <TextField
              fullWidth
              placeholder="e.g. Tesco shop, Bus ticket, Spotify"
              value={expense.name}
              onChange={(event) =>
                setExpense((previous) => ({
                  ...previous,
                  name: event.target.value,
                }))
              }
              sx={inputSx}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: {
                xs: 1.35,
                sm: 1.5,
              },
            }}
          >
            <Box>
              <Typography sx={labelSx}>
                Amount
              </Typography>

              <NumberInputField
                fullWidth
                value={expense.amount}
                onValueChange={(value) =>
                  setExpense((previous) => ({
                    ...previous,
                    amount: value,
                  }))
                }
                emptyValue={0}
                sx={inputSx}
                startAdornment={
                  <Box
                    sx={{
                      color: "#172033",
                      mr: 0.6,
                      fontSize: {
                        xs: 14,
                        sm: 15,
                      },
                      fontWeight: 800,
                    }}
                  >
                    £
                  </Box>
                }
              />

              <Typography
                sx={{
                  mt: 0.35,
                  fontSize: {
                    xs: 9.5,
                    sm: 11,
                  },
                  color: "#94A3B8",
                }}
              >
                Enter the amount spent
              </Typography>
            </Box>

            <Box>
              <Typography sx={labelSx}>
                Category
              </Typography>

              <FormControl fullWidth>
                <Select
                  value={expense.userBudgetCategoryId || ""}
                  displayEmpty
                  onChange={(event) =>
                    setExpense((previous) => ({
                      ...previous,
                      userBudgetCategoryId: Number(
                        event.target.value,
                      ),
                    }))
                  }
                  sx={{
                    minHeight: {
                      xs: 40,
                      sm: 44,
                    },
                    borderRadius: {
                      xs: "9px",
                      sm: "11px",
                    },
                    backgroundColor: "#FFFFFF",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#DCE5E0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#B7CDBE",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#16A34A",
                      borderWidth: 1.5,
                    },
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      py: {
                        xs: "8px",
                        sm: "10px",
                      },
                      fontSize: {
                        xs: 13,
                        sm: 14,
                      },
                      overflow: "hidden",
                    },
                  }}
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <Typography
                          sx={{
                            fontSize: {
                              xs: 13,
                              sm: 14,
                            },
                            color: "#94A3B8",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          Select category
                        </Typography>
                      );
                    }

                    const category = categories.find(
                      (item) =>
                        item.userBudgetCategoryId === selected,
                    );

                    if (!category) {
                      return (
                        <Typography
                          sx={{
                            fontSize: {
                              xs: 13,
                              sm: 14,
                            },
                            color: "#94A3B8",
                          }}
                        >
                          Select category
                        </Typography>
                      );
                    }

                    const colour = getCategoryColour(
                      category.userBudgetCategoryId,
                    );

                    return (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: {
                            xs: 0.7,
                            sm: 1,
                          },
                          minWidth: 0,
                        }}
                      >
                        <Box
                          sx={{
                            width: {
                              xs: 24,
                              sm: 28,
                            },
                            height: {
                              xs: 24,
                              sm: 28,
                            },
                            borderRadius: {
                              xs: "7px",
                              sm: "9px",
                            },
                            display: "grid",
                            placeItems: "center",
                            color: colour,
                            backgroundColor: `${colour}14`,
                            flexShrink: 0,
                            "& svg": {
                              fontSize: {
                                xs: 15,
                                sm: 17,
                              },
                            },
                          }}
                        >
                          {getAppIcon(category.icon)}
                        </Box>

                        <Typography
                          sx={{
                            fontSize: {
                              xs: 12.5,
                              sm: 14,
                            },
                            fontWeight: 600,
                            color: "#172033",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {category.name}
                        </Typography>
                      </Box>
                    );
                  }}
                >
                  {categories.map((category) => {
                    const colour = getCategoryColour(
                      category.userBudgetCategoryId,
                    );

                    return (
                      <MenuItem
                        key={category.userBudgetCategoryId}
                        value={category.userBudgetCategoryId}
                        sx={{
                          minHeight: 44,
                          borderRadius: "9px",
                          mx: 0.5,
                          my: 0.25,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.25,
                          }}
                        >
                          <Box
                            sx={{
                              width: 30,
                              height: 30,
                              borderRadius: "8px",
                              display: "grid",
                              placeItems: "center",
                              color: colour,
                              backgroundColor: `${colour}14`,
                              flexShrink: 0,
                              "& svg": {
                                fontSize: 17,
                              },
                            }}
                          >
                            {getAppIcon(category.icon)}
                          </Box>

                          <Typography
                            sx={{
                              fontSize: 13.5,
                              fontWeight: 600,
                              color: "#172033",
                            }}
                          >
                            {category.name}
                          </Typography>
                        </Box>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: {
                xs: 1.35,
                sm: 1.5,
              },
            }}
          >
            <Box>
              <Typography sx={labelSx}>
                Date
              </Typography>

              <DatePicker
                value={
                  expense.expenseDate
                    ? dayjs(expense.expenseDate)
                    : null
                }
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: inputSx,
                  },
                }}
              />
            </Box>

            <Box>
              <Typography sx={labelSx}>
                Payment Method
              </Typography>

              <FormControl fullWidth>
                <Select
                  value={expense.paymentMethodId || ""}
                  displayEmpty
                  onChange={(event) =>
                    setExpense((previous) => ({
                      ...previous,
                      paymentMethodId: Number(
                        event.target.value,
                      ),
                    }))
                  }
                  sx={{
                    minHeight: {
                      xs: 40,
                      sm: 44,
                    },
                    borderRadius: {
                      xs: "9px",
                      sm: "11px",
                    },
                    backgroundColor: "#FFFFFF",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#DCE5E0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#B7CDBE",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#16A34A",
                      borderWidth: 1.5,
                    },
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      py: {
                        xs: "7px",
                        sm: "8px",
                      },
                      fontSize: {
                        xs: 13,
                        sm: 14,
                      },
                      overflow: "hidden",
                    },
                  }}
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <Typography
                          sx={{
                            fontSize: {
                              xs: 13,
                              sm: 14,
                            },
                            color: "#94A3B8",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          Select payment method
                        </Typography>
                      );
                    }

                    const method = paymentMethods.find(
                      (item) => item.id === selected,
                    );

                    if (!method) {
                      return (
                        <Typography
                          sx={{
                            fontSize: {
                              xs: 13,
                              sm: 14,
                            },
                            color: "#94A3B8",
                          }}
                        >
                          Select payment method
                        </Typography>
                      );
                    }

                    const colour =
                      method.color || "#64748B";

                    return (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: {
                            xs: 0.7,
                            sm: 1,
                          },
                          minWidth: 0,
                        }}
                      >
                        <Box
                          sx={{
                            width: {
                              xs: 24,
                              sm: 28,
                            },
                            height: {
                              xs: 24,
                              sm: 28,
                            },
                            borderRadius: {
                              xs: "7px",
                              sm: "9px",
                            },
                            display: "grid",
                            placeItems: "center",
                            color: colour,
                            backgroundColor: method.color
                              ? `${method.color}14`
                              : "#F1F5F9",
                            flexShrink: 0,
                            "& svg": {
                              fontSize: {
                                xs: 15,
                                sm: 17,
                              },
                            },
                          }}
                        >
                          {getAppIcon(
                            method.icon || "wallet",
                          )}
                        </Box>

                        <Typography
                          sx={{
                            fontSize: {
                              xs: 12.5,
                              sm: 14,
                            },
                            fontWeight: 600,
                            color: "#172033",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {method.name}
                        </Typography>
                      </Box>
                    );
                  }}
                >
                  <MenuItem value="">
                    Select payment method
                  </MenuItem>

                  {paymentMethods.map((method) => {
                    const colour =
                      method.color || "#64748B";

                    return (
                      <MenuItem
                        key={method.id}
                        value={method.id}
                        sx={{
                          minHeight: 44,
                          borderRadius: "9px",
                          mx: 0.5,
                          my: 0.25,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.25,
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              width: 30,
                              height: 30,
                              borderRadius: "8px",
                              display: "grid",
                              placeItems: "center",
                              color: colour,
                              backgroundColor: method.color
                                ? `${method.color}14`
                                : "#F1F5F9",
                              flexShrink: 0,
                              "& svg": {
                                fontSize: 17,
                              },
                            }}
                          >
                            {getAppIcon(
                              method.icon || "wallet",
                            )}
                          </Box>

                          <Typography
                            sx={{
                              fontSize: 13.5,
                              fontWeight: 600,
                              color: "#172033",
                            }}
                          >
                            {method.name}
                          </Typography>
                        </Box>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box>
            <Typography sx={labelSx}>
              Notes (Optional)
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Add a note about this expense..."
              value={expense.notes}
              onChange={(event) =>
                setExpense((previous) => ({
                  ...previous,
                  notes: event.target.value.slice(
                    0,
                    120,
                  ),
                }))
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: {
                    xs: "9px",
                    sm: "11px",
                  },
                  backgroundColor: "#FFFFFF",
                  alignItems: "flex-start",
                  "& fieldset": {
                    borderColor: "#DCE5E0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#B7CDBE",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#16A34A",
                    borderWidth: 1.5,
                  },
                },
                "& .MuiOutlinedInput-input": {
                  fontSize: {
                    xs: 13,
                    sm: 14,
                  },
                  px: {
                    xs: 1,
                    sm: 1.25,
                  },
                  py: {
                    xs: 0.85,
                    sm: 1,
                  },
                },
              }}
            />

            <Typography
              sx={{
                mt: 0.35,
                fontSize: {
                  xs: 9.5,
                  sm: 10.5,
                },
                color: "#94A3B8",
                textAlign: "right",
              }}
            >
              {(expense.notes ?? "").length}/120
            </Typography>
          </Box>

          <Box
            sx={{
              pt: {
                xs: 0,
                sm: 0.5,
              },
              display: "flex",
              justifyContent: "flex-end",
              gap: {
                xs: 0.75,
                sm: 1.25,
              },
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                flex: {
                  xs: 1,
                  sm: "unset",
                },
                minWidth: {
                  xs: 0,
                  sm: 105,
                },
                height: {
                  xs: 40,
                  sm: 42,
                },
                textTransform: "none",
                borderRadius: {
                  xs: "9px",
                  sm: "11px",
                },
                borderColor: "#D8E1DC",
                color: "#475569",
                fontSize: {
                  xs: 12.5,
                  sm: 14,
                },
                fontWeight: 700,
                backgroundColor: "#FFFFFF",
                "&:hover": {
                  borderColor: "#B8C8BE",
                  backgroundColor: "#F8FAF9",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isSaveDisabled}
              sx={{
                flex: {
                  xs: 1,
                  sm: "unset",
                },
                minWidth: {
                  xs: 0,
                  sm: 135,
                },
                height: {
                  xs: 40,
                  sm: 42,
                },
                px: {
                  xs: 1.25,
                  sm: 2,
                },
                textTransform: "none",
                borderRadius: {
                  xs: "9px",
                  sm: "11px",
                },
                fontSize: {
                  xs: 12.5,
                  sm: 14,
                },
                fontWeight: 700,
                background:
                  "linear-gradient(135deg, #16A34A, #15803D)",
                boxShadow:
                  "0 5px 14px rgba(22,163,74,0.18)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #15803D, #166534)",
                  boxShadow:
                    "0 7px 18px rgba(22,163,74,0.24)",
                },
                "&.Mui-disabled": {
                  background: "#E2E8E5",
                  color: "#94A3B8",
                  boxShadow: "none",
                },
              }}
            >
              {editExpense
                ? "Save Changes"
                : "Save Expense"}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ManageExpenseDialog;