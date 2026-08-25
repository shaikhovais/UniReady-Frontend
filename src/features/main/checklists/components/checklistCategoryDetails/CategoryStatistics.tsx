import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";

import { Box, Typography } from "@mui/material";

import type { ChecklistStatistics } from "../../../../../types/features/checklist/checklist";

interface Props {
  categoryStatistics: ChecklistStatistics;
}

interface StatisticCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  backgroundColor: string;
}

const StatisticCard = ({
  title,
  value,
  icon,
  color,
  backgroundColor,
}: StatisticCardProps) => (
  <Box
    sx={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: {
        xs: "column",
        sm: "column",
        md: "column",
        lg: "row",
      },
      gap: {
        xs: 0.5,
        sm: 0.75,
        md: 0.75,
        lg: 1.5,
      },
      px: {
        xs: 0.75,
        sm: 1,
        md: 1.25,
        lg: 1.5,
      },
      py: {
        xs: 1,
        sm: 1.25,
        md: 1.5,
        lg: 1.5,
      },
      minHeight: {
        xs: 100,
        sm: 105,
        md: 110,
        lg: 82,
      },
      minWidth: 0,
      borderRadius: 1,
      border: "1px solid",
      borderColor: "divider",
      bgcolor: "#fff",
      overflow: "hidden",
      transition: "all 0.2s ease",

      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: {
          xs: 2,
          lg: 3,
        },
        bgcolor: color,
      },

      "&:hover": {
        borderColor: `${color}55`,
        transform: "translateY(-1px)",
        boxShadow: `0 6px 18px ${color}18`,
      },
    }}
  >
    <Box
      sx={{
        width: {
          xs: 34,
          sm: 36,
          md: 40,
          lg: 44,
        },
        height: {
          xs: 34,
          sm: 36,
          md: 40,
          lg: 44,
        },
        borderRadius: {
          xs: 1,
          lg: 1.25,
        },
        bgcolor: backgroundColor,
        color,
        display: "grid",
        placeItems: "center",
        flexShrink: 0,

        "& svg": {
          fontSize: {
            xs: 18,
            sm: 19,
            md: 21,
            lg: 23,
          },
        },
      }}
    >
      {icon}
    </Box>

    <Box
      sx={{
        minWidth: 0,
        width: {
          xs: "100%",
          sm: "100%",
          md: "100%",
          lg: "auto",
        },
        textAlign: {
          xs: "center",
          sm: "center",
          md: "center",
          lg: "left",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: 20,
            sm: 21,
            md: 22,
            lg: 24,
          },
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "#0f172a",
        }}
      >
        {value}
      </Typography>

      <Typography
        sx={{
          mt: 0.35,
          fontSize: {
            xs: 10,
            sm: 10.5,
            md: 11,
            lg: 12,
          },
          fontWeight: 600,
          color: "#64748b",
          lineHeight: 1.25,
          whiteSpace: {
            xs: "normal",
            sm: "normal",
            md: "normal",
            lg: "nowrap",
          },
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordBreak: "normal",
          overflowWrap: "break-word",
        }}
      >
        {title}
      </Typography>
    </Box>
  </Box>
);

const CategoryStatistics = ({ categoryStatistics }: Props) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
        gap: {
          xs: 0.75,
          sm: 1,
          md: 1.25,
          lg: 1.5,
        },
        minWidth: 0,
      }}
    >
      <StatisticCard
        title="Total Items"
        value={categoryStatistics.totalItems}
        icon={<ListAltRoundedIcon />}
        color="#0B9BF5"
        backgroundColor="#EAF6FF"
      />

      <StatisticCard
        title="Got It"
        value={categoryStatistics.gotIt}
        icon={<CheckCircleRoundedIcon />}
        color="#2E7D32"
        backgroundColor="#EAF7ED"
      />

      <StatisticCard
        title="Need to Buy"
        value={categoryStatistics.needToBuy}
        icon={<ShoppingBagRoundedIcon />}
        color="#F59E0B"
        backgroundColor="#FFF7E6"
      />

      <StatisticCard
        title="To Review"
        value={categoryStatistics.toReview}
        icon={<RateReviewRoundedIcon />}
        color="#7E57C2"
        backgroundColor="#F3EEFF"
      />

      <StatisticCard
        title="Not Needed"
        value={categoryStatistics.notNeeded}
        icon={<RemoveShoppingCartRoundedIcon />}
        color="#64748B"
        backgroundColor="#F1F5F9"
      />
    </Box>
  );
};

export default CategoryStatistics;