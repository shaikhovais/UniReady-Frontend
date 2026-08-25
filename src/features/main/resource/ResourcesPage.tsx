import { useCallback, useEffect, useState } from "react";

import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CommonPageLayout from "../common/CommonPageLayout";
import CommonLoader from "../../../components/Loader";

import SearchFilterBar from "./components/mainPage/SearchFilterBar";
import CategoriesGrid from "./components/mainPage/CategoriesGrid";
import QuickStartCard from "./components/mainPage/QuickStartCard";
import ArticleSection from "./components/mainPage/ArticleSection";
import SavedArticlesCard from "./components/mainPage/SavedArticlesCard";
import ArticlesList from "./components/allArticlesPage/ArticlesList";

import type {
  ArticleListItem,
  CategoryOverview,
} from "../../../types/features/resource";
import type { Lookup } from "../../../types/core/common/Lookup";

import { getLookups } from "../../../services/core/common/helperService";

import {
  getResourceOverview,
  getResources,
  toggleSaveResource,
} from "../../../services/features/resourceService";

const ResourcesPage = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Lookup[]>([]);
  const [categoriesOverview, setCategoriesOverview] = useState<
    CategoryOverview[]
  >([]);

  const [recentlyAddedArticles, setRecentlyAddedArticles] = useState<
    ArticleListItem[]
  >([]);

  const [featuredArticles, setFeaturedArticles] = useState<
    ArticleListItem[]
  >([]);

  const [articles, setArticles] = useState<ArticleListItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isArticlesLoading, setIsArticlesLoading] = useState(false);

  const [showListOnly, setShowListOnly] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [savedOnly, setSavedOnly] = useState(false);

  const loadOverviewData = useCallback(async () => {
    const response = await getResourceOverview();

    setCategoriesOverview(response.categoryOverview);
    setRecentlyAddedArticles(response.recentlyAddedArticles);
    setFeaturedArticles(response.featuredArticles);
  }, []);

  const loadLookups = useCallback(async () => {
    const response = await getLookups(["ResourceCategory"]);

    setCategories(
      response.filter(
        (lookup) => lookup.type === "ResourceCategory",
      ),
    );
  }, []);

  const loadArticles = useCallback(
    async (override?: {
      search?: string;
      categoryId?: number | null;
      savedOnly?: boolean;
    }) => {
      const finalSearch = override?.search ?? search;
      const finalCategoryId =
        override?.categoryId !== undefined
          ? override.categoryId
          : categoryId;
      const finalSavedOnly =
        override?.savedOnly ?? savedOnly;

      setIsArticlesLoading(true);

      try {
        const response = await getResources({
          search: finalSearch || undefined,
          categoryId: finalCategoryId ?? undefined,
          savedOnly: finalSavedOnly || undefined,
        });

        setArticles(response.articles);
        setShowListOnly(true);
      } finally {
        setIsArticlesLoading(false);
      }
    },
    [search, categoryId, savedOnly],
  );

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);

      try {
        await Promise.all([
          loadLookups(),
          loadOverviewData(),
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [loadLookups, loadOverviewData]);

  const handleFilterChange = (params: {
    search: string;
    categoryId: number | null;
    savedOnly: boolean;
  }) => {
    setSearch(params.search);
    setCategoryId(params.categoryId);
    setSavedOnly(params.savedOnly);
  };

  const handleSearch = async () => {
    await loadArticles({
      search,
      categoryId,
      savedOnly,
    });
  };

  const handleCategoryClick = async (id: number) => {
    const filters = {
      search: "",
      categoryId: id,
      savedOnly: false,
    };

    setSearch(filters.search);
    setCategoryId(filters.categoryId);
    setSavedOnly(filters.savedOnly);

    await loadArticles(filters);
  };

  const handleSavedArticlesClick = async () => {
    const filters = {
      search: "",
      categoryId: null,
      savedOnly: true,
    };

    setSearch(filters.search);
    setCategoryId(filters.categoryId);
    setSavedOnly(filters.savedOnly);

    await loadArticles(filters);
  };

  const handleViewArticle = (article: ArticleListItem) => {
    navigate(`/resources/${article.id}`);
  };

  const handleToggleSave = async (article: ArticleListItem) => {
    try {
      await toggleSaveResource(article.id);

      if (showListOnly) {
        await loadArticles({
          search,
          categoryId,
          savedOnly,
        });
      } else {
        await loadOverviewData();
      }
    } catch (error) {
      console.error("Failed to toggle saved article:", error);
    }
  };

  const handleBackToOverview = () => {
    setShowListOnly(false);

    setSearch("");
    setCategoryId(null);
    setSavedOnly(false);
  };

  if (isLoading) {
    return (
      <CommonPageLayout
        header={{
          title: "Resources & Guides",
          subtitle:
            "Trusted guides and resources to help you settle and thrive in the UK."
        }}
      >
        <CommonLoader />
      </CommonPageLayout>
    );
  }

  return (
    <CommonPageLayout
      header={{
        title: "Resources & Guides",
        subtitle:
          "Trusted guides and resources to help you settle and thrive in the UK."
      }}
    >
      <Stack spacing={3}>
        <SearchFilterBar
          categories={categories}
          search={search}
          categoryId={categoryId}
          savedOnly={savedOnly}
          showBackButton={showListOnly}
          onChange={handleFilterChange}
          onSearch={handleSearch}
          onBack={handleBackToOverview}
        />

        {isArticlesLoading ? (
          <CommonLoader />
        ) : showListOnly ? (
          <ArticlesList
            articles={articles}
            categories={categories}
            onView={handleViewArticle}
            onToggleSave={handleToggleSave}
          />
        ) : (
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0, 2.6fr) minmax(280px, 1fr)",
              },
              alignItems: "start",
            }}
          >
            <Stack spacing={3}>
              <CategoriesGrid
                categoriesOverview={categoriesOverview}
                onCategoryClick={handleCategoryClick}
              />

              <ArticleSection
                title="Recently Added Guides"
                articles={recentlyAddedArticles}
                categories={categories}
                onClick={handleViewArticle}
              />

              <ArticleSection
                title="Featured Guides"
                articles={featuredArticles}
                categories={categories}
                onClick={handleViewArticle}
              />
            </Stack>

            <Stack
              spacing={3}
              sx={{
                minWidth: 0,
              }}
            >
              <QuickStartCard />

              <SavedArticlesCard
                onClick={handleSavedArticlesClick}
              />
            </Stack>
          </Box>
        )}
      </Stack>
    </CommonPageLayout>
  );
};

export default ResourcesPage;