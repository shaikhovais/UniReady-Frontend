import { useMemo } from "react";

import { PieChart } from "@mui/x-charts/PieChart";

import {
  Box,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";

import type { ChecklistStatistics } from "../../../../../types/features/checklist/checklist";

interface ProgressCategory {
  id: number;
  name: string;
  statistics: ChecklistStatistics;
}

interface Props {
  categories: ProgressCategory[];
  selectedCategoryId: number;
  onCategoryChange: (categoryId: number) => void;
}

const ProgressCard = ({
  categories,
  selectedCategoryId,
  onCategoryChange,
}: Props) => {
  const selectedCategory = useMemo(
    () =>
      categories.find(
        (category) => category.id === selectedCategoryId,
      ) ?? categories[0],
    [categories, selectedCategoryId],
  );

  if (!selectedCategory) {
    return null;
  }

  const statistics = selectedCategory.statistics;

  const getPercentage = (value: number) => {
    if (statistics.totalItems === 0) {
      return 0;
    }

    return Math.round((value / statistics.totalItems) * 100);
  };

  const items = [
    {
      label: "Got It",
      value: statistics.gotIt,
      percentage: getPercentage(statistics.gotIt),
      color: "#2E7D32",
      icon: CheckCircleRoundedIcon,
    },
    {
      label: "Need to Buy",
      value: statistics.needToBuy,
      percentage: getPercentage(statistics.needToBuy),
      color: "#F59E0B",
      icon: ShoppingCartRoundedIcon,
    },
    {
      label: "To Review",
      value: statistics.toReview,
      percentage: getPercentage(statistics.toReview),
      color: "#7E57C2",
      icon: RateReviewRoundedIcon,
    },
    {
      label: "Not Needed",
      value: statistics.notNeeded,
      percentage: getPercentage(statistics.notNeeded),
      color: "#94A3B8",
      icon: BlockRoundedIcon,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "#dbeafe",
        background:
          "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
        overflow: "hidden",
      }}
    >
      <Stack
        sx={{
          p: {
            xs: 2,
            sm: 2.5,
          },
          gap: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 16,
                sm: 17,
              },
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              minWidth: 0,
            }}
          >
            Packing progress
          </Typography>

          <Select
            size="small"
            value={selectedCategory.id}
            onChange={(event) =>
              onCategoryChange(Number(event.target.value))
            }
            sx={{
              minWidth: {
                xs: 105,
                sm: 115,
              },
              width: {
                xs: 105,
                sm: 115,
              },
              height: 36,
              flexShrink: 0,
              borderRadius: 1.25,
              bgcolor: "#ffffff",
              fontSize: 12,
              fontWeight: 600,
              color: "#334155",

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#dbeafe",
              },

              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#93c5fd",
              },

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#60a5fa",
              },

              "& .MuiSelect-select": {
                py: 0.75,
                px: 1.25,
              },
            }}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.id}
                value={category.id}
                sx={{
                  fontSize: 12,
                }}
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{
            mt: {
              xs: 2,
              sm: 2.25,
            },
            display: "grid",
            gridTemplateColumns: {
              xs: "115px minmax(0, 1fr)",
              sm: "120px minmax(0, 1fr)",
            },
            alignItems: "center",
            columnGap: {
              xs: 1.5,
              sm: 2,
            },
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: {
                xs: 115,
                sm: 120,
              },
              height: {
                xs: 115,
                sm: 120,
              },
              flexShrink: 0,
            }}
          >
            <PieChart
              width={115}
              height={115}
              margin={{
                top: 2,
                bottom: 2,
                left: 2,
                right: 2,
              }}
              hideLegend
              series={[
                {
                  innerRadius: 37,
                  outerRadius: 52,
                  paddingAngle: 1,
                  cornerRadius: 3,
                  data: items.map((item, index) => ({
                    id: index,
                    value: item.value,
                    color: item.color,
                  })),
                },
              ]}
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <Typography
                sx={{
                  fontSize: 24,
                  lineHeight: 1,
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.03em",
                }}
              >
                {statistics.progress}%
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#64748b",
                }}
              >
                completed
              </Typography>
            </Box>
          </Box>

          <Stack
            sx={{
              gap: {
                xs: 1.1,
                sm: 1.25,
              },
              minWidth: 0,
            }}
          >
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <Box
                  key={item.label}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "26px minmax(0, 1fr) auto",
                    alignItems: "center",
                    columnGap: 0.75,
                    minWidth: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: 0.9,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: `${item.color}12`,
                      color: item.color,
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: 15,
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 10.5,
                          sm: 11,
                        },
                        fontWeight: 700,
                        color: "#0f172a",
                        lineHeight: 1.15,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.label}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.2,
                        fontSize: 9.5,
                        color: "#64748b",
                        lineHeight: 1.1,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.value}{" "}
                      {item.value === 1 ? "item" : "items"}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: 10.5,
                        sm: 11,
                      },
                      fontWeight: 800,
                      color: item.color,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {item.percentage}%
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>

        <Box
          sx={{
            mt: 2,
            pt: 1.35,
            borderTop: "1px solid",
            borderColor: "#dbeafe",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: "#64748b",
            }}
          >
            Total items
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            {statistics.totalItems}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProgressCard;