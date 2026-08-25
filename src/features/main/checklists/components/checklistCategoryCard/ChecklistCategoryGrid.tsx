import { Grid } from "@mui/material";

import type { ChecklistCategorySummary } from "../../../../../types/features/checklist/checklist";

import ChecklistCategoryCard from "./ChecklistCategoryCard";

interface Props {
  categories: ChecklistCategorySummary[];
  onViewItems: (categoryId: number) => void;
}

const ChecklistCategoryGrid = ({ categories, onViewItems }: Props) => {
  return (
    <Grid container spacing={1}>
      {categories.map((category) => (
        <Grid
          key={category.id}
          size={{
            xs: 12,
            md: 6,
            xl: 4,
          }}
        >
          <ChecklistCategoryCard category={category} onViewItems={onViewItems} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ChecklistCategoryGrid;