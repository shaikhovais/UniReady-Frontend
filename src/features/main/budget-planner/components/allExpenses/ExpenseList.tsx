import { useEffect, useMemo, useState } from "react";
import dayjs, { type Dayjs } from "dayjs";

import {
  ArrowBackRounded,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  RefreshRounded,
  SearchRounded,
} from "@mui/icons-material";

import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import ExpenseRow from "./ExpenseRow";

import type {
  Expense,
  ExpenseCategoryOption,
} from "../../../../../types/features/budget";
import type { Lookup } from "../../../../../types/core/common/Lookup";

interface ExpenseListProps {
  expenses: Expense[];
  paymentMethods: Lookup[];
  categories: ExpenseCategoryOption[];
  onClose: () => void;
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (expenseId: number) => void;
  onSearchExpenses?: (request: {
    name: string;
    userBudgetCategoryId: number;
    paymentMethodId: number;
    startDate: string;
    endDate: string;
  }) => Promise<void>;
}

const ITEMS_PER_PAGE = 10;

const TABLE_COLUMNS =
  "120px minmax(180px, 1.2fr) minmax(140px, 1fr) 150px 170px 100px 64px";

const ExpenseList = ({
  expenses,
  paymentMethods,
  categories,
  onClose,
  onEditExpense,
  onDeleteExpense,
  onSearchExpenses,
}: ExpenseListProps) => {
  const today = dayjs();
  const startOfMonth = dayjs().startOf("month");

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(-1);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    useState<number>(-1);
  const [startDate, setStartDate] = useState<Dayjs>(startOfMonth);
  const [endDate, setEndDate] = useState<Dayjs>(today);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const expenseDay = dayjs(expense.expenseDate);
      const query = searchTerm.trim().toLowerCase();

      const matchesSearch =
        query === "" ||
        expense.name.toLowerCase().includes(query) ||
        expense.category.toLowerCase().includes(query) ||
        expense.paymentMethod.toLowerCase().includes(query) ||
        (expense.notes ?? "").toLowerCase().includes(query);

      const matchesCategory =
        selectedCategoryId === -1 ||
        expense.userBudgetCategoryId === selectedCategoryId;

      const matchesPaymentMethod =
        selectedPaymentMethodId === -1 ||
        expense.paymentMethodId === selectedPaymentMethodId;

      const matchesDateRange =
        (expenseDay.isAfter(startDate.startOf("day")) ||
          expenseDay.isSame(startDate, "day")) &&
        (expenseDay.isBefore(endDate.endOf("day")) ||
          expenseDay.isSame(endDate, "day"));

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPaymentMethod &&
        matchesDateRange
      );
    });
  }, [
    expenses,
    searchTerm,
    selectedCategoryId,
    selectedPaymentMethodId,
    startDate,
    endDate,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE),
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedExpenses = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;

    return filteredExpenses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredExpenses, page]);

  const startItem =
    filteredExpenses.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(page * ITEMS_PER_PAGE, filteredExpenses.length);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleStartDateChange = (value: Dayjs | null) => {
    if (!value) {
      return;
    }

    let nextStartDate = value.startOf("day");

    if (nextStartDate.isAfter(today, "day")) {
      nextStartDate = today.startOf("day");
    }

    if (nextStartDate.isAfter(endDate, "day")) {
      setEndDate(nextStartDate);
    }

    setStartDate(nextStartDate);
    setPage(1);
  };

  const handleEndDateChange = (value: Dayjs | null) => {
    if (!value) {
      return;
    }

    let nextEndDate = value.startOf("day");

    if (nextEndDate.isAfter(today, "day")) {
      nextEndDate = today.startOf("day");
    }

    if (nextEndDate.isBefore(startDate, "day")) {
      nextEndDate = startDate;
    }

    setEndDate(nextEndDate);
    setPage(1);
  };

  const handleSearch = async () => {
    setSearchTerm(searchInput.trim());
    setPage(1);

    if (onSearchExpenses) {
      await onSearchExpenses({
        name: searchInput.trim(),
        userBudgetCategoryId: selectedCategoryId,
        paymentMethodId: selectedPaymentMethodId,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      });
    }
  };

  const handleResetFilters = async () => {
    const nextStartDate = dayjs().startOf("month");
    const nextEndDate = dayjs();

    setSearchInput("");
    setSearchTerm("");
    setSelectedCategoryId(-1);
    setSelectedPaymentMethodId(-1);
    setStartDate(nextStartDate);
    setEndDate(nextEndDate);
    setPage(1);

    if (onSearchExpenses) {
      await onSearchExpenses({
        name: "",
        userBudgetCategoryId: -1,
        paymentMethodId: -1,
        startDate: nextStartDate.format("YYYY-MM-DD"),
        endDate: nextEndDate.format("YYYY-MM-DD"),
      });
    }
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      height: 40,
      borderRadius: "9px",
      backgroundColor: "#FFFFFF",
    },
    "& .MuiOutlinedInput-input": {
      fontSize: {
        xs: 13,
        sm: 13,
        lg: 12.5,
      },
    },
  };

  const selectSx = {
    height: 40,
    borderRadius: "9px",
    backgroundColor: "#FFFFFF",
    fontSize: {
      xs: 12,
      sm: 12.5,
      lg: 12.5,
    },
    "& .MuiSelect-select": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      py: 1,
      px: {
        xs: 1.25,
        lg: 1.15,
      },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        bgcolor: "#FFFFFF",
        borderRadius: {
          xs: "14px",
          sm: "18px",
        },
        overflow: "hidden",
        border: "1px solid #E1E9E4",
      }}
    >
      <Box
        sx={{
          px: {
            xs: 1.5,
            sm: 2,
            lg: 2.25,
            xl: 2.5,
          },
          pt: {
            xs: 1.5,
            sm: 2,
            lg: 2,
          },
          pb: {
            xs: 1.5,
            sm: 1.75,
            lg: 2,
          },
          borderBottom: "1px solid #E5ECE8",
          background: "linear-gradient(135deg, #F1FAF4 0%, #FFFFFF 65%)",
          position: "relative",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            width: 150,
            height: 150,
            borderRadius: "50%",
            backgroundColor: "#DCFCE7",
            opacity: 0.45,
            right: -70,
            top: -85,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
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
                sm: 1.15,
              },
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
                flexShrink: 0,
                borderRadius: {
                  xs: "10px",
                  sm: "12px",
                },
                display: "grid",
                placeItems: "center",
                color: "#15803D",
                background: "linear-gradient(135deg, #DCFCE7, #ECFDF5)",
                border: "1px solid #D2EFDA",
              }}
            >
              <SearchRounded
                sx={{
                  fontSize: {
                    xs: 20,
                    sm: 22,
                  },
                }}
              />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 16,
                    sm: 18,
                    lg: 18,
                  },
                  fontWeight: 800,
                  color: "#172033",
                  lineHeight: 1.2,
                }}
              >
                Recent Expenses
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontSize: {
                    xs: 11,
                    sm: 11.5,
                    lg: 12,
                  },
                  color: "#64748B",
                  lineHeight: 1.35,
                  maxWidth: {
                    xs: 210,
                    sm: 320,
                    lg: "none",
                  },
                }}
              >
                Search, filter and manage your spending activity.
              </Typography>
            </Box>
          </Box>

          <Button
            startIcon={<ArrowBackRounded />}
            onClick={onClose}
            sx={{
              minWidth: 0,
              flexShrink: 0,
              height: {
                xs: 34,
                sm: 35,
                lg: 36,
              },
              px: {
                xs: 0.9,
                sm: 1.1,
              },
              borderRadius: "9px",
              textTransform: "none",
              fontSize: {
                xs: 11.5,
                sm: 12,
              },
              fontWeight: 700,
              color: "#475467",
              backgroundColor: "#FFFFFF",
              border: "1px solid #DCE7E0",
              "& .MuiButton-startIcon": {
                mr: 0.4,
              },
              "&:hover": {
                backgroundColor: "#F8FAF9",
                borderColor: "#C9D9CF",
              },
            }}
          >
            Back
          </Button>
        </Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            mt: {
              xs: 1.25,
              sm: 1.5,
              lg: 1.5,
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gap: {
                xs: 0.75,
                sm: 0.85,
                lg: 0.75,
              },
              gridTemplateColumns: {
                xs: "1fr 1fr",
                lg: "1.35fr 1fr 1fr 1fr 1fr auto",
              },
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Search expenses..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              sx={{
                ...inputSx,
                gridColumn: {
                  xs: "1 / -1",
                  lg: "auto",
                },
              }}
              onKeyDown={async (event) => {
                if (event.key === "Enter") {
                  await handleSearch();
                }
              }}
            />

            <FormControl
              sx={{
                gridColumn: {
                  xs: "1 / 2",
                  lg: "auto",
                },
                minWidth: 0,
              }}
            >
              <Select
                value={selectedCategoryId}
                onChange={(event) => {
                  setSelectedCategoryId(Number(event.target.value));
                  setPage(1);
                }}
                sx={selectSx}
              >
                <MenuItem value={-1}>All Categories</MenuItem>

                {categories.map((category) => (
                  <MenuItem
                    key={category.userBudgetCategoryId}
                    value={category.userBudgetCategoryId}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              sx={{
                gridColumn: {
                  xs: "2 / 3",
                  lg: "auto",
                },
                minWidth: 0,
              }}
            >
              <Select
                value={selectedPaymentMethodId}
                onChange={(event) => {
                  setSelectedPaymentMethodId(Number(event.target.value));
                  setPage(1);
                }}
                sx={selectSx}
              >
                <MenuItem value={-1}>All Payment Methods</MenuItem>

                {paymentMethods.map((method) => (
                  <MenuItem key={method.id} value={method.id}>
                    {method.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <DatePicker
              label="Start date"
              value={startDate}
              maxDate={today}
              onChange={handleStartDateChange}
              slotProps={{
                textField: {
                  sx: {
                    ...inputSx,
                    gridColumn: {
                      xs: "1 / 2",
                      lg: "auto",
                    },
                  },
                },
              }}
            />

            <DatePicker
              label="End date"
              value={endDate}
              minDate={startDate}
              maxDate={today}
              onChange={handleEndDateChange}
              slotProps={{
                textField: {
                  sx: {
                    ...inputSx,
                    gridColumn: {
                      xs: "2 / 3",
                      lg: "auto",
                    },
                  },
                },
              }}
            />

            <Box
              sx={{
                gridColumn: {
                  xs: "1 / -1",
                  lg: "auto",
                },
                display: "flex",
                alignItems: "center",
                gap: 0.6,
                width: "100%",
                minWidth: {
                  lg: 82,
                },
              }}
            >
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  flex: 1,
                  height: 40,
                  minWidth: {
                    xs: 0,
                    lg: 40,
                  },
                  px: {
                    xs: 1,
                    sm: 1.25,
                    lg: 1,
                  },
                  borderRadius: "9px",
                  textTransform: "none",
                  fontSize: {
                    xs: 13,
                    sm: 13,
                    lg: 12.5,
                  },
                  fontWeight: 700,
                  backgroundColor: "#15803D",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#166534",
                    boxShadow: "none",
                  },
                  gap: 1
                }}
              >
                <SearchRounded sx={{ fontSize: 18 }} />

                <Box component="span">Search</Box>
              </Button>

              <IconButton
                onClick={handleResetFilters}
                aria-label="Reset filters"
                sx={{
                  width: 50,
                  height: 50,
                  flexShrink: 0,
                  border: "1px solid #D0D5DD",
                  borderRadius: "9px",
                  color: "#475467",
                  backgroundColor: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#F8FAF9",
                    borderColor: "#BFCBC3",
                  },
                }}
              >
                <RefreshRounded sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          px: {
            xs: 1,
            sm: 1.5,
            lg: 2,
            xl: 2.25,
          },
          py: {
            xs: 1.25,
            sm: 1.5,
            lg: 1.75,
          },
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            border: "1px solid #E8EFEB",
            borderRadius: {
              xs: "12px",
              sm: "15px",
            },
            backgroundColor: "#FFFFFF",
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": {
              height: 5,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#CBD5D0",
              borderRadius: 999,
            },
          }}
        >
          <Box
            sx={{
              minWidth: {
                xs: 850,
                sm: 850,
                lg: 900,
              },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: TABLE_COLUMNS,
                columnGap: 1.5,
                alignItems: "center",
                px: {
                  xs: 1.25,
                  sm: 1.5,
                },
                py: 1.15,
                background: "linear-gradient(180deg, #F8FBF9 0%, #F4F8F6 100%)",
                borderBottom: "1px solid #E8EFEB",
              }}
            >
              {[
                "Date",
                "Description",
                "Notes",
                "Category",
                "Payment Method",
                "Amount",
                "Actions",
              ].map((heading, index) => (
                <Typography
                  key={heading}
                  sx={{
                    fontSize: {
                      xs: 10,
                      sm: 10.5,
                    },
                    fontWeight: 800,
                    color: "#52606D",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    whiteSpace: "nowrap",
                    textAlign: index === 6 ? "right" : "left",
                    pr: index === 6 ? 1 : 0,
                  }}
                >
                  {heading}
                </Typography>
              ))}
            </Box>

            {paginatedExpenses.length === 0 ? (
              <Box
                sx={{
                  py: {
                    xs: 6,
                    sm: 8,
                  },
                  px: 3,
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  No expenses found
                </Typography>

                <Typography
                  sx={{
                    mt: 0.75,
                    fontSize: 13,
                    color: "#6B7280",
                  }}
                >
                  Try adjusting your search or filters.
                </Typography>
              </Box>
            ) : (
              paginatedExpenses.map((expense, index) => (
                <ExpenseRow
                  key={expense.expenseId}
                  expense={expense}
                  index={index}
                  paymentMethods={paymentMethods}
                  onEdit={onEditExpense}
                  onDelete={onDeleteExpense}
                />
              ))
            )}
          </Box>
        </Box>

        <Box
          sx={{
            mt: {
              xs: 1.25,
              sm: 1.5,
            },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 11.5,
                sm: 13,
              },
              color: "#6B7280",
            }}
          >
            Rows per page
            <Box
              component="span"
              sx={{
                ml: 0.75,
                px: 1,
                py: 0.55,
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                color: "#111827",
                backgroundColor: "#FFFFFF",
              }}
            >
              10
            </Box>
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <IconButton
              onClick={() => setPage((previous) => Math.max(1, previous - 1))}
              disabled={page === 1}
              sx={{
                width: 30,
                height: 30,
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              }}
            >
              <KeyboardArrowLeftRounded sx={{ fontSize: 18 }} />
            </IconButton>

            {pages.map((pageNumber) => (
              <Box
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "8px",
                  border: "1px solid",
                  borderColor: pageNumber === page ? "#86EFAC" : "#E5E7EB",
                  backgroundColor: pageNumber === page ? "#F0FDF4" : "#FFFFFF",
                  color: "#111827",
                  fontSize: 13,
                  fontWeight: pageNumber === page ? 700 : 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                {pageNumber}
              </Box>
            ))}

            <IconButton
              onClick={() =>
                setPage((previous) => Math.min(totalPages, previous + 1))
              }
              disabled={page === totalPages}
              sx={{
                width: 30,
                height: 30,
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              }}
            >
              <KeyboardArrowRightRounded sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          <Typography
            sx={{
              fontSize: {
                xs: 11.5,
                sm: 13,
              },
              color: "#6B7280",
            }}
          >
            {startItem} - {endItem} of {filteredExpenses.length} expenses
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ExpenseList;
