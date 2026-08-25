import { useEffect, useRef } from "react";
import dayjs from "dayjs";

import { DeleteOutlineRounded, ReceiptLongRounded } from "@mui/icons-material";

import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import type {
  Bill,
  BudgetCategory,
  SaveBillRequest,
} from "../../../../../types/features/budget";

import {
  CHART_COLOURS,
  DEFAULT_CHART_COLOUR,
} from "../../../../../utils/chartColours";

import NumberInputField from "../../../../../components/form/NumberInputField";
import type { Lookup } from "../../../../../types/core/common/Lookup";
import { getAppIcon } from "../../../../../utils/appIcons";

interface BillFormProps {
  bill: SaveBillRequest;
  selectedBill?: Bill | null;
  paymentMethods: Lookup[];
  frequencies: Lookup[];
  budgetCategories: BudgetCategory[];
  onChange: (bill: SaveBillRequest) => void;
  onSave: () => void;
  onDelete: () => void;
  onCancel: () => void;
  focusNameTrigger?: number;
}

const inputSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: 46,
    borderRadius: "11px",
    backgroundColor: "#FFFFFF",
    transition: "all 0.18s ease",

    "& fieldset": {
      borderColor: "#DDE5EF",
    },

    "&:hover fieldset": {
      borderColor: "#B9C8D8",
    },

    "&.Mui-focused": {
      boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.08)",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#16A34A",
      borderWidth: 1.5,
    },
  },

  "& .MuiOutlinedInput-input": {
    fontSize: 14,
  },
};

const selectSx = {
  minHeight: 46,
  borderRadius: "11px",
  backgroundColor: "#FFFFFF",
  transition: "all 0.18s ease",

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#DDE5EF",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#B9C8D8",
  },

  "&.Mui-focused": {
    boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.08)",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#16A34A",
    borderWidth: 1.5,
  },

  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    py: "11px",
    fontSize: 14,
  },
};

const fieldLabelSx = {
  mb: 0.75,
  fontSize: 12.5,
  fontWeight: 700,
  color: "#334155",
};

const BillForm = ({
  bill,
  selectedBill,
  paymentMethods,
  frequencies,
  budgetCategories,
  onChange,
  onSave,
  onDelete,
  onCancel,
  focusNameTrigger = 0,
}: BillFormProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusNameTrigger === 0) {
      return;
    }

    requestAnimationFrame(() => {
      nameInputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    });
  }, [focusNameTrigger]);

  const getCategoryColour = (categoryId: number) => {
    const categoryIndex = budgetCategories.findIndex(
      (category) => category.userBudgetCategoryId === categoryId,
    );

    if (categoryIndex === -1) {
      return DEFAULT_CHART_COLOUR;
    }

    return (
      CHART_COLOURS[categoryIndex % CHART_COLOURS.length] ??
      DEFAULT_CHART_COLOUR
    );
  };

  const isSaveDisabled =
    !bill.name.trim() ||
    bill.amount <= 0 ||
    !bill.dueDate ||
    bill.frequencyId === -1 ||
    bill.paymentMethodId === -1 ||
    bill.userBudgetCategoryId === -1;

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        minHeight: 640,
        borderRadius: "22px",
        overflow: "hidden",
        border: "1px solid #b9ebc8",
        background:
          "linear-gradient(145deg, #F1F7FF 0%, #F8FBFF 48%, #F1F7FF 100%)",
        boxShadow: "0 12px 35px rgba(30, 64, 175, 0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          px: { xs: 2.5, sm: 3 },
          py: 2.5,
          borderBottom: "1px solid #E1EAF4",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(244,249,255,0.8))",
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "14px",
            background: "linear-gradient(145deg, #ECFDF3 0%, #DCFCE7 100%)",
            color: "#15803D",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            boxShadow: "0 6px 16px rgba(22, 163, 74, 0.1)",
          }}
        >
          <ReceiptLongRounded sx={{ fontSize: 24 }} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 19,
              fontWeight: 800,
              color: "#172033",
              lineHeight: 1.25,
              letterSpacing: "-0.25px",
            }}
          >
            {selectedBill ? "Edit Bill" : "Add New Bill"}
          </Typography>

          <Typography
            sx={{
              mt: 0.45,
              fontSize: 13,
              color: "#64748B",
              lineHeight: 1.4,
            }}
          >
            {selectedBill
              ? "Update your recurring bill details."
              : "Add a recurring payment to keep track of it."}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          p: { xs: 2, sm: 2.5 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: "17px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E1E8F0",
            boxShadow: "0 4px 15px rgba(15, 23, 42, 0.025)",
          }}
        >
          <Typography sx={fieldLabelSx}>Bill Name</Typography>

          <TextField
            fullWidth
            inputRef={nameInputRef}
            placeholder="e.g. Rent, Netflix, Internet"
            value={bill.name}
            onChange={(event) =>
              onChange({
                ...bill,
                name: event.target.value,
              })
            }
            sx={inputSx}
          />

          <Box
            sx={{
              mt: 2,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            <Box>
              <Typography sx={fieldLabelSx}>Amount</Typography>

              <NumberInputField
                fullWidth
                value={bill.amount}
                onValueChange={(value) =>
                  onChange({
                    ...bill,
                    amount: value,
                  })
                }
                emptyValue={0}
                sx={inputSx}
                startAdornment={
                  <Box
                    sx={{
                      color: "#64748B",
                      mr: 1,
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    £
                  </Box>
                }
              />
            </Box>

            <Box>
              <Typography sx={fieldLabelSx}>Due Date</Typography>

              <DatePicker
                disablePast
                value={bill.dueDate ? dayjs(bill.dueDate) : null}
                onChange={(value) =>
                  onChange({
                    ...bill,
                    dueDate: value ? value.format("YYYY-MM-DD") : "",
                  })
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: inputSx,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: "17px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E1E8F0",
            boxShadow: "0 4px 15px rgba(15, 23, 42, 0.025)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            <Box>
              <Typography sx={fieldLabelSx}>Repeat</Typography>

              <FormControl fullWidth>
                <Select
                  value={bill.frequencyId}
                  displayEmpty
                  onChange={(event) =>
                    onChange({
                      ...bill,
                      frequencyId: Number(event.target.value),
                    })
                  }
                  sx={selectSx}
                  renderValue={(selected) => {
                    if (selected === -1) {
                      return (
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: "#94A3B8",
                          }}
                        >
                          Select frequency
                        </Typography>
                      );
                    }

                    return (
                      frequencies.find((frequency) => frequency.id === selected)
                        ?.name ?? "Select frequency"
                    );
                  }}
                >
                  <MenuItem value={-1}>Select frequency</MenuItem>

                  {frequencies.map((frequency) => (
                    <MenuItem key={frequency.id} value={frequency.id}>
                      {frequency.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Typography sx={fieldLabelSx}>Payment Method</Typography>

              <FormControl fullWidth>
                <Select
                  value={bill.paymentMethodId ?? -1}
                  displayEmpty
                  onChange={(event) =>
                    onChange({
                      ...bill,
                      paymentMethodId: Number(event.target.value),
                    })
                  }
                  sx={selectSx}
                  renderValue={(selected) => {
                    if (selected === -1) {
                      return (
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: "#94A3B8",
                          }}
                        >
                          Select payment method
                        </Typography>
                      );
                    }

                    return (
                      paymentMethods.find((method) => method.id === selected)
                        ?.name ?? "Select payment method"
                    );
                  }}
                >
                  <MenuItem value={-1}>Select payment method</MenuItem>

                  {paymentMethods.map((method) => (
                    <MenuItem
                      key={method.id}
                      value={method.id}
                      sx={{
                        minHeight: 48,
                        px: 1.5,
                        py: 0.75,
                        borderRadius: "10px",
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
                            width: 34,
                            height: 34,
                            borderRadius: "10px",
                            display: "grid",
                            placeItems: "center",
                            color: method.color,
                            backgroundColor: `${method.color}14`,
                            flexShrink: 0,
                            "& svg": {
                              fontSize: 19,
                            },
                          }}
                        >
                          {getAppIcon(method.icon || "wallet")}
                        </Box>

                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#1E293B",
                          }}
                        >
                          {method.name}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={fieldLabelSx}>Budget Category</Typography>

            <FormControl fullWidth>
              <Select
                value={bill.userBudgetCategoryId}
                displayEmpty
                onChange={(event) =>
                  onChange({
                    ...bill,
                    userBudgetCategoryId: Number(event.target.value),
                  })
                }
                sx={selectSx}
                renderValue={(selected) => {
                  if (selected === -1) {
                    return (
                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "#94A3B8",
                        }}
                      >
                        Select category
                      </Typography>
                    );
                  }

                  const category = budgetCategories.find(
                    (item) => item.userBudgetCategoryId === selected,
                  );

                  if (!category) {
                    return (
                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "#94A3B8",
                        }}
                      >
                        Select category
                      </Typography>
                    );
                  }

                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: getCategoryColour(
                            category.userBudgetCategoryId,
                          ),
                          "& svg": {
                            fontSize: 18,
                          },
                        }}
                      >
                        {getAppIcon(category.icon)}
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "#111827",
                        }}
                      >
                        {category.name}
                      </Typography>
                    </Box>
                  );
                }}
              >
                <MenuItem value={-1}>Select category</MenuItem>

                {budgetCategories.map((category) => (
                  <MenuItem
                    key={category.userBudgetCategoryId}
                    value={category.userBudgetCategoryId}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: getCategoryColour(
                            category.userBudgetCategoryId,
                          ),
                          "& svg": {
                            fontSize: 18,
                          },
                        }}
                      >
                        {getAppIcon(category.icon)}
                      </Box>

                      <Typography sx={{ fontSize: 14 }}>
                        {category.name}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography
              sx={{
                mt: 0.7,
                fontSize: 11.5,
                color: "#94A3B8",
              }}
            >
              Used when this bill is automatically added as an expense.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
            borderRadius: "17px",
            background: "linear-gradient(135deg, #F0FDF4 0%, #F7FEF9 100%)",
            border: "1px solid #D7F0DE",
            boxShadow: "0 4px 15px rgba(22, 163, 74, 0.035)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 750,
                  color: "#172033",
                }}
              >
                Automatically add expense
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,
                  fontSize: 12,
                  color: "#64748B",
                  lineHeight: 1.5,
                  maxWidth: 440,
                }}
              >
                Add this bill to your expenses automatically on its due date.
              </Typography>
            </Box>

            <Switch
              checked={bill.autoAddExpense}
              onChange={(event) =>
                onChange({
                  ...bill,
                  autoAddExpense: event.target.checked,
                })
              }
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#16A34A",
                },

                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#16A34A",
                },
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            mt: "auto",
            pt: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>
            {selectedBill && (
              <Button
                startIcon={<DeleteOutlineRounded />}
                onClick={onDelete}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  color: "#DC2626",
                  borderRadius: "10px",
                  px: 1.25,

                  "&:hover": {
                    backgroundColor: "#FEF2F2",
                  },
                }}
              >
                Delete
              </Button>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <Button
              onClick={onCancel}
              sx={{
                minWidth: 95,
                height: 42,
                borderRadius: "11px",
                textTransform: "none",
                fontWeight: 700,
                color: "#475569",

                "&:hover": {
                  backgroundColor: "#F1F5F9",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              disabled={isSaveDisabled}
              onClick={onSave}
              sx={{
                minWidth: 120,
                height: 42,
                borderRadius: "11px",
                textTransform: "none",
                fontWeight: 700,
                backgroundColor: "#16A34A",
                boxShadow: "0 5px 14px rgba(22, 163, 74, 0.18)",

                "&:hover": {
                  backgroundColor: "#15803D",
                  boxShadow: "0 7px 18px rgba(22, 163, 74, 0.22)",
                },
              }}
            >
              {selectedBill ? "Save Changes" : "Add Bill"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default BillForm;
