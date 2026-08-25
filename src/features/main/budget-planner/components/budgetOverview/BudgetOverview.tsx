import { Box, Paper } from "@mui/material";

import BudgetPieChart from "./BudgetPieChart";
import BudgetCategoryTable from "./BudgetCategoryTable";

import type { BudgetOverview as BudgetOverviewModel } from "../../../../../types/features/budget";

interface BudgetOverviewProps {
  overview: BudgetOverviewModel;
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onManageCategories: () => void;
}

const BudgetOverview = ({
  overview,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  onManageCategories,
}: BudgetOverviewProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #E1E9E4",
        borderRadius: {
          xs: "14px",
          sm: "18px",
          lg: "20px",
        },
        overflow: "hidden",
        background:
          "linear-gradient(145deg, #FFFFFF 0%, #F9FCFA 100%)",
      }}
    >
      <Box
        sx={{
          p: {
            xs: 1.25,
            sm: 2.5,
            lg: 3,
          },
        }}
      >
        <BudgetPieChart
          overview={overview}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
          onManageCategories={onManageCategories}
        />
      </Box>

      <Box
        sx={{
          height: "1px",
          backgroundColor: "#E8EFEB",
        }}
      />

      <Box
        sx={{
          p: {
            xs: 1.25,
            sm: 2.5,
            lg: 3,
          },
        }}
      >
        <BudgetCategoryTable
          categories={overview.categories}
        />
      </Box>
    </Paper>
  );
};

export default BudgetOverview;