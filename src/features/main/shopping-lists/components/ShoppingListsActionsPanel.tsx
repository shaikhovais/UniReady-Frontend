import { Box, Button, Paper, Typography } from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";

type ShoppingListsActionsPanelProps = {
  listCount: number;
  totalItems: number;
  pendingItems: number;
  onCreateList: () => void;
  onAddItem: () => void;
  onViewAll: () => void;
};

const SummaryItem = ({
  icon,
  value,
  label,
  description,
  tint,
  iconColor,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  description: string;
  tint: string;
  iconColor: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: {
          xs: 0.65,
          sm: 0.8,
          lg: 1,
        },
        minWidth: 0,
        px: {
          xs: 0.75,
          sm: 0.9,
          lg: 1.1,
        },
        py: {
          xs: 0.7,
          sm: 0.75,
          lg: 0.85,
        },
        backgroundColor: "rgba(255,255,255,0.72)",
        border: "1px solid rgba(15,23,42,0.05)",
        borderRadius: {
          xs: "9px",
          lg: "10px",
        },
      }}
    >
      <Box
        sx={{
          width: {
            xs: 32,
            sm: 34,
            lg: 38,
          },
          height: {
            xs: 32,
            sm: 34,
            lg: 38,
          },
          borderRadius: "9px",
          display: "grid",
          placeItems: "center",
          backgroundColor: tint,
          color: iconColor,
          flexShrink: 0,

          "& svg": {
            fontSize: {
              xs: 17,
              sm: 18,
              lg: 20,
            },
          },
        }}
      >
        {icon}
      </Box>

      <Box
        sx={{
          minWidth: 0,
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: 0.5,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 10,
                sm: 12,
                lg: 14,
              },
              lineHeight: 1.15,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#0f172a",
              minWidth: 0,
              overflowWrap: "anywhere",
              whiteSpace: "normal",
            }}
          >
            {value} {label}
          </Typography>
        </Box>

        <Typography
          sx={{
            mt: 0.35,
            fontSize: {
              xs: 7,
              sm: 8,
              lg: 9,
            },
            lineHeight: 1.2,
            color: "#64748b",
            overflowWrap: "anywhere",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

const ActionButton = ({
  children,
  icon,
  endIcon,
  variant = "outlined",
  onClick,
  primary = false,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "contained" | "outlined";
  onClick: () => void;
  primary?: boolean;
}) => {
  return (
    <Button
      variant={variant}
      startIcon={icon}
      endIcon={endIcon}
      onClick={onClick}
      fullWidth
      sx={{
        height: {
          xs: 40,
          sm: 42,
          lg: 42,
        },
        minWidth: 0,
        px: {
          xs: 0.75,
          sm: 1,
          lg: 1.6,
        },
        borderRadius: {
          xs: "9px",
          lg: "10px",
        },
        textTransform: "none",
        fontWeight: 700,
        fontSize: {
          xs: 9.5,
          sm: 10.5,
          lg: 11.5,
        },
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        borderColor: primary ? "#16a34a" : "rgba(15,23,42,0.10)",
        color: primary ? "#FFFFFF" : "#0f172a",
        backgroundColor: primary ? "#16a34a" : "rgba(255,255,255,0.82)",
        boxShadow: primary ? "0 4px 12px rgba(22,163,74,0.16)" : "none",

        "& .MuiButton-startIcon": {
          marginRight: {
            xs: 0.35,
            sm: 0.55,
            lg: 0.65,
          },
          flexShrink: 0,
        },

        "& .MuiButton-endIcon": {
          marginLeft: {
            xs: 0.35,
            sm: 0.55,
            lg: 0.65,
          },
          flexShrink: 0,
        },

        "&:hover": {
          backgroundColor: primary ? "#15803d" : "#F8FAF9",
          borderColor: primary ? "#15803d" : "rgba(22,163,74,0.22)",
          boxShadow: primary ? "0 4px 12px rgba(22,163,74,0.16)" : "none",
        },

        "& svg": {
          fontSize: {
            xs: 16,
            sm: 17,
            lg: 18,
          },
        },
      }}
    >
      {children}
    </Button>
  );
};

const ShoppingListsActionsPanel = ({
  listCount,
  totalItems,
  pendingItems,
  onCreateList,
  onAddItem,
  onViewAll,
}: ShoppingListsActionsPanelProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        p: {
          xs: 0.9,
          sm: 1.1,
          lg: 1.5,
        },
        borderRadius: {
          xs: "12px",
          sm: "13px",
          lg: "16px",
        },
        border: "1px solid rgba(226,232,229,0.9)",
        background:
          "radial-gradient(circle at 0% 0%, rgba(220,252,231,0.7), transparent 32%), radial-gradient(circle at 100% 100%, rgba(219,234,254,0.45), transparent 30%), linear-gradient(135deg, #ffffff 0%, #f8fbf9 100%)",
        boxShadow: "0 8px 30px rgba(15,23,42,0.035)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            width: {
              xs: "100%",
              lg: "auto",
            },
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(3, minmax(0, 1fr))",
              lg: "auto auto auto",
            },
            gap: {
              xs: 0.65,
              sm: 0.75,
              lg: 0.75,
            },
          }}
        >
          <ActionButton
            variant="contained"
            icon={<AddRoundedIcon />}
            onClick={onCreateList}
            primary
          >
            Create New List
          </ActionButton>

          <ActionButton
            variant="outlined"
            icon={<AddRoundedIcon />}
            onClick={onAddItem}
          >
            Add Item
          </ActionButton>

          <ActionButton
            variant="outlined"
            endIcon={<ArrowForwardRoundedIcon />}
            onClick={onViewAll}
          >
            View All Items
          </ActionButton>
        </Box>

        <Box
          sx={{
            display: {
              xs: "block",
              lg: "block",
            },
            width: {
              xs: "100%",
              lg: "1px",
            },
            height: {
              xs: "1px",
              lg: "auto",
            },
            minHeight: {
              lg: 44,
            },
            my: {
              xs: 0.9,
              sm: 1,
              lg: 0,
            },
            mx: {
              xs: 0,
              lg: 1,
            },
            backgroundColor: "rgba(15,23,42,0.08)",
            flexShrink: 0,
          }}
        />

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 0,
          }}
        >
          <SummaryItem
            icon={<ChecklistRoundedIcon />}
            value={listCount}
            label="Lists"
            description="Your created lists"
            tint="#E8F7EE"
            iconColor="#15803D"
          />

          <SummaryItem
            icon={<ShoppingCartRoundedIcon />}
            value={totalItems}
            label="Total Items"
            description="Across all lists"
            tint="#FFF3DF"
            iconColor="#F59E0B"
          />

          <SummaryItem
            icon={<HourglassEmptyRoundedIcon />}
            value={pendingItems}
            label="Pending Items"
            description="Items you need to buy"
            tint="#E8F1FF"
            iconColor="#2563EB"
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default ShoppingListsActionsPanel;