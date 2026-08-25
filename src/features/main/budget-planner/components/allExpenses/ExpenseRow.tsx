import { useMemo, useState } from "react";

import {
  DeleteOutlineRounded,
  EditRounded,
  MoreVertRounded,
} from "@mui/icons-material";

import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import { getAppIcon } from "../../../../../utils/appIcons";

import {
  CHART_COLOURS,
  DEFAULT_CHART_COLOUR,
} from "../../../../../utils/chartColours";

import type { Expense } from "../../../../../types/features/budget";
import type { Lookup } from "../../../../../types/core/common/Lookup";

interface ExpenseRowProps {
  expense: Expense;
  index: number;
  paymentMethods: Lookup[];
  onEdit: (expense: Expense) => void;
  onDelete: (expenseId: number) => void;
}

const TABLE_COLUMNS =
  "118px minmax(180px, 1.5fr) minmax(140px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr) 110px 52px";

const ExpenseRow = ({
  expense,
  index,
  paymentMethods,
  onEdit,
  onDelete,
}: ExpenseRowProps) => {
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const colour =
    CHART_COLOURS[index] ??
    DEFAULT_CHART_COLOUR;

  const paymentMethod = paymentMethods.find(
    (method) =>
      method.id === expense.paymentMethodId,
  );

  const paymentMethodName =
    paymentMethod?.name ??
    "Payment method";

  const paymentMethodColor =
    paymentMethod?.color || "#64748B";

  const formattedDate = useMemo(() => {
    const date = new Date(expense.expenseDate);

    return {
      day: date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      }),
      year: date.toLocaleDateString("en-GB", {
        year: "numeric",
      }),
      weekday: date.toLocaleDateString("en-GB", {
        weekday: "short",
      }),
    };
  }, [expense.expenseDate]);

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: TABLE_COLUMNS,
          columnGap: 1.5,
          alignItems: "center",
          minHeight: 68,
          px: 1.5,
          py: 1,
          borderBottom: "1px solid #F0F3F2",
          transition: "background-color .16s ease",
          "&:last-of-type": {
            borderBottom: "none",
          },
          "&:hover": {
            backgroundColor: "#FAFCFB",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "flex-start",
              px: 1,
              py: 0.6,
              borderRadius: "9px",
              backgroundColor: "#F8FAF9",
              border: "1px solid #E8EFEB",
              whiteSpace: "nowrap",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 800,
                color: "#172033",
                lineHeight: 1.2,
              }}
            >
              {formattedDate.day}
            </Typography>

            <Typography
              sx={{
                mt: 0.2,
                fontSize: 9.5,
                color: "#94A3B8",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {formattedDate.weekday}{" "}
              {formattedDate.year}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 750,
              color: "#172033",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.3,
            }}
          >
            {expense.name}
          </Typography>
        </Box>

        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Tooltip
            title={expense.notes?.trim() || "-"}
            arrow
          >
            <Typography
              sx={{
                fontSize: 12,
                color: "#64748B",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {expense.notes?.trim() || "-"}
            </Typography>
          </Tooltip>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              flexShrink: 0,
              borderRadius: "9px",
              display: "grid",
              placeItems: "center",
              color: colour,
              backgroundColor: `${colour}12`,
              border: `1px solid ${colour}20`,
              "& svg": {
                fontSize: 16,
              },
            }}
          >
            {getAppIcon(expense.categoryIcon)}
          </Box>

          <Typography
            sx={{
              minWidth: 0,
              fontSize: 12.5,
              fontWeight: 600,
              color: "#334155",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {expense.category}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.7,
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: 26,
              height: 26,
              flexShrink: 0,
              borderRadius: "8px",
              display: "grid",
              placeItems: "center",
              color: paymentMethodColor,
              backgroundColor: `${paymentMethodColor}12`,
              "& svg": {
                fontSize: 15,
              },
            }}
          >
            {getAppIcon(
              expense.paymentMethodIcon || "wallet",
            )}
          </Box>

          <Typography
            sx={{
              minWidth: 0,
              fontSize: 12.5,
              color: "#475467",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {paymentMethodName}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 800,
            color: "#172033",
            textAlign: "right",
            fontVariantNumeric: "tabular-nums",
            whiteSpace: "nowrap",
          }}
        >
          £{expense.amount.toFixed(2)}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <IconButton
            onClick={(event) =>
              setAnchorEl(event.currentTarget)
            }
            sx={{
              width: 32,
              height: 32,
              borderRadius: "9px",
              color: "#64748B",
              "&:hover": {
                color: "#172033",
                backgroundColor: "#F1F5F3",
              },
            }}
          >
            <MoreVertRounded
              sx={{ fontSize: 18 }}
            />
          </IconButton>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
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
            sx: {
              mt: 0.5,
              minWidth: 150,
              borderRadius: "12px",
              border: "1px solid #E8ECEA",
              boxShadow:
                "0 14px 30px rgba(15,23,42,.10)",
              overflow: "hidden",
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onEdit(expense);
          }}
          sx={{
            minHeight: 40,
            gap: 1,
            fontSize: 13,
            fontWeight: 600,
            color: "#334155",
          }}
        >
          <EditRounded sx={{ fontSize: 17 }} />
          Edit expense
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onDelete(expense.expenseId);
          }}
          sx={{
            minHeight: 40,
            gap: 1,
            fontSize: 13,
            fontWeight: 600,
            color: "#DC2626",
          }}
        >
          <DeleteOutlineRounded
            sx={{ fontSize: 17 }}
          />
          Delete expense
        </MenuItem>
      </Menu>
    </>
  );
};

export default ExpenseRow;