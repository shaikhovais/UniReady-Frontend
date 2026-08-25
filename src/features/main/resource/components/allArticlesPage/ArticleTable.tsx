import { Box, Typography } from "@mui/material";

import type { Lookup } from "../../../../../types/core/common/Lookup";
import type { ArticleListItem } from "../../../../../types/features/resource";

import ArticleTableRow from "./ArticleTableRow";

export interface ArticlesTableProps {
  articles: ArticleListItem[];
  categories: Lookup[];
  onView: (article: ArticleListItem) => void;
  onToggleSave: (article: ArticleListItem) => void;
}

const HEADER_LABELS = [
  "Title",
  "Category",
  "Description",
  "Date Created",
  "Read Time",
  "Saved",
];

const ArticlesTable = ({
  articles,
  categories,
  onView,
  onToggleSave,
}: ArticlesTableProps) => {
  const categoryById = new Map(
    categories.map((category) => [category.id, category]),
  );

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          minWidth: 900,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "minmax(220px, 1.8fr) 140px minmax(200px, 1.6fr) 110px 90px 70px",
            columnGap: 2,
            alignItems: "center",
            px: 2,
            py: 1.4,
            background:
              "linear-gradient(180deg, #F8FCF9 0%, #FCFDFD 100%)",
            borderBottom: "1px solid #E8EDF0",
          }}
        >
          {HEADER_LABELS.map((label) => (
            <Typography
              key={label}
              sx={{
                fontSize: 11,
                fontWeight: 800,
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                lineHeight: 1.3,
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>

        {articles.length === 0 ? (
          <Box
            sx={{
              py: 6,
              px: 3,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: "#64748B",
              }}
            >
              No articles found for the selected filters.
            </Typography>
          </Box>
        ) : (
          articles.map((article, index) => (
            <Box
              key={article.id}
              sx={{
                borderBottom:
                  index === articles.length - 1
                    ? "none"
                    : "1px solid #F1F5F9",
                transition: "background-color 0.18s ease",

                "&:hover": {
                  backgroundColor: "#FAFCFB",
                },
              }}
            >
              <ArticleTableRow
                article={article}
                category={categoryById.get(article.categoryId)}
                onView={onView}
                onToggleSave={onToggleSave}
              />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ArticlesTable;