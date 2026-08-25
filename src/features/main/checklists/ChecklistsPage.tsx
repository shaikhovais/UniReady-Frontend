import { useEffect, useMemo, useState } from "react";

import { Box, Stack } from "@mui/material";

import CommonPageLayout from "../common/CommonPageLayout";
import PageLoader from "../../../components/Loader";

import ProgressCard from "./components/rightSidebar/ProgressCard";
import ChecklistCategoryGrid from "./components/checklistCategoryCard/ChecklistCategoryGrid";
import ChecklistCategoryDetails from "./components/checklistCategoryDetails/ChecklistCategoryDetails";
import LuggageWeightGuideCard from "./components/rightSidebar/LuggageWeightGuideCard";
import CityRecommendationsCard from "./components/rightSidebar/CityRecommendationsCard";

import {
  getChecklistCategory,
  getChecklistOverview,
} from "../../../services/features/checklistService";

import type {
  ChecklistCategoryResponse,
  ChecklistOverviewResponse,
  ChecklistStatistics,
} from "../../../types/features/checklist/checklist";

import type { Lookup } from "../../../types/core/common/Lookup";

import { getLookups } from "../../../services/core/common/helperService";

interface ProgressCategory {
  id: number;
  name: string;
  statistics: ChecklistStatistics;
}

const ChecklistsPage = () => {
  const [overview, setOverview] =
    useState<ChecklistOverviewResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [loadingCategory, setLoadingCategory] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<ChecklistCategoryResponse | null>(null);

  const [selectedProgressCategoryId, setSelectedProgressCategoryId] =
    useState(-1);

  const [checklistStatuses, setChecklistStatuses] = useState<Lookup[]>([]);

  const [checklistImportances, setChecklistImportances] = useState<Lookup[]>(
    [],
  );

  const loadChecklistOverview = async () => {
    try {
      const [overviewResponse, lookupResponse] = await Promise.all([
        getChecklistOverview(),
        getLookups(["ChecklistStatus", "ChecklistImportance"]),
      ]);

      setOverview(overviewResponse);

      setChecklistStatuses(
        lookupResponse.filter(
          (lookup) => lookup.type === "ChecklistStatus",
        ),
      );

      setChecklistImportances(
        lookupResponse.filter(
          (lookup) => lookup.type === "ChecklistImportance",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const loadCategory = async (categoryId: number) => {
    setLoadingCategory(true);

    try {
      const response = await getChecklistCategory(categoryId);

      setSelectedCategory(response);
      setSelectedProgressCategoryId(categoryId);
    } finally {
      setLoadingCategory(false);
    }
  };

  const refreshSelectedCategory = async () => {
    if (!selectedCategory) {
      return;
    }

    const response = await getChecklistCategory(
      selectedCategory.category.id,
    );

    setSelectedCategory(response);

    await loadChecklistOverview();
  };

  useEffect(() => {
    void loadChecklistOverview();
  }, []);

  const progressCategories: ProgressCategory[] = useMemo(() => {
    if (!overview) {
      return [];
    }

    return [
      {
        id: -1,
        name: "All",
        statistics: overview.overall,
      },
      ...overview.categories.map((category) => ({
        id: category.id,
        name: category.name,
        statistics: category.statistics,
      })),
    ];
  }, [overview]);

  if (loading || !overview) {
    return (
      <CommonPageLayout
        header={{
          title: "Checklists",
          subtitle:
            "Prepare for your move by collecting everything you'll need.",
        }}
      >
        <PageLoader />
      </CommonPageLayout>
    );
  }

  return (
    <CommonPageLayout
      header={{
        title: "Checklists",
        subtitle:
          "Prepare for your move by collecting everything you'll need.",
      }}
    >
      {/* Mobile progress */}
      {!selectedCategory && (
        <Box
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
            width: "100%",
            minWidth: 0,
            mb: 2.5,
          }}
        >
          <ProgressCard
            categories={progressCategories}
            selectedCategoryId={selectedProgressCategoryId}
            onCategoryChange={setSelectedProgressCategoryId}
          />
        </Box>
      )}

      {/* Category details */}
      {selectedCategory ? (
        <Box
          sx={{
            width: "100%",
            minWidth: 0,
          }}
        >
          {loadingCategory ? (
            <PageLoader />
          ) : (
            <ChecklistCategoryDetails
              category={selectedCategory}
              checklistStatuses={checklistStatuses}
              checklistImportances={checklistImportances}
              onBack={() => {
                setSelectedCategory(null);
                setSelectedProgressCategoryId(-1);
              }}
              onRefresh={refreshSelectedCategory}
            />
          )}
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            minWidth: 0,

            display: "grid",

            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              lg: "minmax(0, 1.9fr) minmax(280px, 0.9fr)",
            },

            gap: {
              xs: 2,
              lg: 2.5,
            },

            alignItems: "start",
          }}
        >
          {/* LEFT — Checklist Categories */}
          <Box
            sx={{
              width: "100%",
              minWidth: 0,
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            {loadingCategory ? (
              <PageLoader />
            ) : (
              <ChecklistCategoryGrid
                categories={overview.categories}
                onViewItems={loadCategory}
              />
            )}
          </Box>

          {/* RIGHT — Sidebar */}
          <Box
            sx={{
              width: "100%",
              minWidth: 0,
              maxWidth: "100%",

              position: {
                lg: "sticky",
              },

              top: {
                lg: 24,
              },
            }}
          >
            <Stack
              sx={{
                width: "100%",
                minWidth: 0,
                gap: 2.5,
              }}
            >
              {/* Progress */}
              <Box
                sx={{
                  display: {
                    xs: "none",
                    lg: "block",
                  },
                  width: "100%",
                  minWidth: 0,
                }}
              >
                <ProgressCard
                  categories={progressCategories}
                  selectedCategoryId={selectedProgressCategoryId}
                  onCategoryChange={setSelectedProgressCategoryId}
                />
              </Box>

              {/* Luggage Guide */}
              <Box
                sx={{
                  width: "100%",
                  minWidth: 0,
                }}
              >
                <LuggageWeightGuideCard />
              </Box>

              {/* City Recommendations */}
              <Box
                sx={{
                  width: "100%",
                  minWidth: 0,
                }}
              >
                <CityRecommendationsCard />
              </Box>
            </Stack>
          </Box>
        </Box>
      )}
    </CommonPageLayout>
  );
};

export default ChecklistsPage;