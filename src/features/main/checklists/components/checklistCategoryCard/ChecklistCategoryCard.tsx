import { ArrowForwardRounded } from "@mui/icons-material";

import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type { ChecklistCategorySummary } from "../../../../../types/features/checklist/checklist";

import { getAppIcon } from "../../../../../utils/appIcons";

import {
  getChecklistIconColor,
  getChecklistProgressColor,
} from "../../checklistStyles";

interface Props {
  category: ChecklistCategorySummary;
  onViewItems: (categoryId: number) => void;
}

const ChecklistCategoryCard = ({
  category,
  onViewItems,
}: Props) => {
  const packed = category.statistics.gotIt;
  const total = category.statistics.totalItems;
  const percentage = category.statistics.progress;

  const iconColor = getChecklistIconColor(category.iconKey);
  const progressColor = getChecklistProgressColor(category.iconKey);

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        p: { xs: 2.5, sm: 3 },
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
        background: `linear-gradient(
          135deg,
          #ffffff 0%,
          ${iconColor.background} 180%
        )`,
        overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 10px 28px rgba(15, 23, 42, 0.07)",
        },
      }}
    >
      <Stack
        sx={{
          height: "100%",
          gap: 2.25,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.75,
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 1.5,
              bgcolor: iconColor.background,
              color: iconColor.color,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              border: `1px solid ${iconColor.color}18`,

              "& svg": {
                fontSize: 27,
              },
            }}
          >
            {getAppIcon(category.iconKey)}
          </Box>

          <Box
            sx={{
              minWidth: 0,
              flex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 17, sm: 18 },
                fontWeight: 800,
                lineHeight: 1.25,
                color: "#0f172a",
              }}
            >
              {category.name}
            </Typography>

            <Typography
              sx={{
                mt: 0.55,
                fontSize: 13.5,
                lineHeight: 1.55,
                color: "#64748b",
              }}
            >
              {category.description}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              color: "#64748b",
            }}
          >
            {total} {total === 1 ? "item" : "items"}
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 800,
              color: progressColor,
            }}
          >
            {percentage}%
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 7,
            borderRadius: 999,
            bgcolor: "#e2e8f0",

            "& .MuiLinearProgress-bar": {
              bgcolor: progressColor,
              borderRadius: 999,
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: 12.5,
              color: "#64748b",
            }}
          >
            {packed} of {total} completed
          </Typography>

          {percentage === 100 && (
            <Typography
              sx={{
                fontSize: 12.5,
                fontWeight: 700,
                color: progressColor,
              }}
            >
              Complete
            </Typography>
          )}
        </Box>

        <Button
          fullWidth
          variant="outlined"
          endIcon={
            <ArrowForwardRounded
              sx={{
                fontSize: 18,
              }}
            />
          }
          onClick={() => onViewItems(category.id)}
          sx={{
            mt: "auto",
            minHeight: 42,
            borderRadius: 1,
            borderColor: `${iconColor.color}35`,
            bgcolor: iconColor.background,
            color: iconColor.color,
            fontSize: 13.5,
            fontWeight: 700,
            textTransform: "none",
            transition: "all 0.2s ease",

            "& .MuiButton-endIcon": {
              transition: "transform 0.2s ease",
            },

            "&:hover": {
              bgcolor: iconColor.color,
              color: "#fff",
              borderColor: iconColor.color,
              boxShadow: `0 8px 20px ${iconColor.color}22`,

              "& .MuiButton-endIcon": {
                transform: "translateX(4px)",
              },
            },
          }}
        >
          View items
        </Button>
      </Stack>
    </Paper>
  );
};

export default ChecklistCategoryCard;