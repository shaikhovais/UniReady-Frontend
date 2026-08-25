import { ArrowForwardRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

import { getAppIcon } from "../../../../../utils/appIcons";
import type { CategoryOverview } from "../../../../../types/features/resource";

export interface CategoryCardProps {
  category: CategoryOverview;
  onClick: (categoryId: number) => void;
}

const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  const tintColor = category.color ?? "#1f733e";
  const hasArticles = category.totalCount > 0;

  return (
    <Box
      onClick={() => hasArticles && onClick(category.id)}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: hasArticles ? "pointer" : "default",
        background: `linear-gradient(135deg, ${tintColor}10, #ffffff 75%)`,
        border: "1px solid #EEF2F7",
        height: "100%",
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: tintColor,
          opacity: hasArticles ? 1 : 0.35,
        },

        "&:hover": hasArticles
          ? {
              transform: "translateY(-3px)",
              borderColor: `${tintColor}35`,
              boxShadow: `0 10px 24px ${tintColor}18`,

              "& .category-arrow": {
                transform: "translateX(4px)",
                backgroundColor: `${tintColor}20`,
              },
            }
          : {},
      }}
    >
      <Stack spacing={1.5}>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: `${tintColor}1A`,
              color: tintColor,
              flexShrink: 0,
            }}
          >
            {getAppIcon(category.icon ?? "customCategory")}
          </Box>

          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.3,
            }}
          >
            {category.name}
          </Typography>
        </Stack>

        {category.description && (
          <Typography
            sx={{
              fontSize: 13,
              color: "#6B7280",
              lineHeight: 1.5,
            }}
          >
            {category.description}
          </Typography>
        )}
      </Stack>

      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 700,
            color: hasArticles ? tintColor : "#9CA3AF",
          }}
        >
          {category.totalCount}{" "}
          {category.totalCount === 1 ? "guide" : "guides"}
        </Typography>

        {hasArticles && (
          <Box
            className="category-arrow"
            sx={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: `${tintColor}14`,
              color: tintColor,
              transition:
                "transform 0.2s ease, background-color 0.2s ease",
            }}
          >
            <ArrowForwardRounded sx={{ fontSize: 18 }} />
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default CategoryCard;