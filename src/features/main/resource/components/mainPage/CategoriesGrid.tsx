import { CategoryRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

import type { CategoryOverview } from "../../../../../types/features/resource";

import CategoryCard from "./CategoryCard";

export interface CategoriesGridProps {
  categoriesOverview: CategoryOverview[];
  onCategoryClick: (categoryId: number) => void;
}

const CategoriesGrid = ({
  categoriesOverview,
  onCategoryClick,
}: CategoriesGridProps) => {
  const sortedCategories = [...categoriesOverview].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );

  return (
    <Box
      sx={{
        borderRadius: "20px",
        border: "1px solid #E8EEE9",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        boxShadow: "0 4px 18px rgba(17, 24, 39, 0.025)",
      }}
    >
      {/* Section Header */}
      <Box
        sx={{
          px: { xs: 2, sm: 2.5, md: 3 },
          py: { xs: 2, sm: 2.25 },
          background:
            "linear-gradient(135deg, #F5FAF6 0%, #FFFFFF 75%)",
          borderBottom: "1px solid #EEF2F7",
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              flexShrink: 0,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#EAF5ED",
              color: "#1F733E",
            }}
          >
            <CategoryRounded sx={{ fontSize: 22 }} />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 17,
                  sm: 18,
                },
                fontWeight: 750,
                color: "#172033",
                lineHeight: 1.3,
              }}
            >
              Explore by category
            </Typography>

            <Typography
              sx={{
                mt: 0.35,
                fontSize: 12.5,
                color: "#64748B",
                lineHeight: 1.45,
              }}
            >
              Find guides and resources based on what you need
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Categories */}
      <Box
        sx={{
          p: { xs: 1.5, sm: 2, md: 2.5 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gap: 1.75,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {sortedCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={onCategoryClick}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoriesGrid;