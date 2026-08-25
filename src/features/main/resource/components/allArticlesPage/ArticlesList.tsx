import { useEffect, useMemo, useState } from "react";

import {
  ArticleRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
} from "@mui/icons-material";

import {
  Box,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import type { ArticleListItem } from "../../../../../types/features/resource";
import type { Lookup } from "../../../../../types/core/common/Lookup";

import ArticleTable from "./ArticleTable";

interface Props {
  articles: ArticleListItem[];
  categories: Lookup[];
  onView: (article: ArticleListItem) => void;
  onToggleSave: (article: ArticleListItem) => void;
}

const pageSize = 10;

const ArticlesList = ({
  articles,
  categories,
  onView,
  onToggleSave,
}: Props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [articles]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(articles.length / pageSize));
  }, [articles]);

  const pagedItems = useMemo(() => {
    const start = (page - 1) * pageSize;

    return articles.slice(start, start + pageSize);
  }, [articles, page]);

  const startItem =
    articles.length === 0 ? 0 : (page - 1) * pageSize + 1;

  const endItem = Math.min(page * pageSize, articles.length);

  const hasArticles = articles.length > 0;

  return (
    <Stack spacing={2.5}>
      <Box
        sx={{
          borderRadius: "18px",
          border: "1px solid #E8EDF2",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
          boxShadow: "0 4px 18px rgba(15, 23, 42, 0.035)",
        }}
      >
        <Box
          sx={{
            px: {
              xs: 2,
              sm: 2.5,
            },
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
            background:
              "linear-gradient(180deg, #F8FCF9 0%, #FFFFFF 100%)",
            borderBottom: "1px solid #EEF2F4",
          }}
        >
          <Stack
            direction="row"
            spacing={1.25}
            sx={{
              alignItems: "center",
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ECFDF3",
                color: "#1F733E",
                flexShrink: 0,
              }}
            >
              <ArticleRounded sx={{ fontSize: 21 }} />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#172033",
                  lineHeight: 1.3,
                }}
              >
                All Guides
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: 12,
                  color: "#64748B",
                  lineHeight: 1.4,
                }}
              >
                Browse guides and resources
              </Typography>
            </Box>
          </Stack>

          {hasArticles && (
            <Box
              sx={{
                px: 1.25,
                py: 0.6,
                borderRadius: "999px",
                backgroundColor: "#F1F5F9",
                border: "1px solid #E2E8F0",
              }}
            >
              <Typography
                sx={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#64748B",
                  whiteSpace: "nowrap",
                }}
              >
                {articles.length}{" "}
                {articles.length === 1 ? "guide" : "guides"}
              </Typography>
            </Box>
          )}
        </Box>

        {hasArticles ? (
          <ArticleTable
            articles={pagedItems}
            categories={categories}
            onView={onView}
            onToggleSave={onToggleSave}
          />
        ) : (
          <Box
            sx={{
              minHeight: 260,
              px: 3,
              py: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack
              spacing={1}
              sx={{
                alignItems: "center",
                textAlign: "center",
                maxWidth: 420,
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F8FAFC",
                  color: "#94A3B8",
                  mb: 0.5,
                }}
              >
                <ArticleRounded sx={{ fontSize: 25 }} />
              </Box>

              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#172033",
                }}
              >
                No guides found
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "#64748B",
                }}
              >
                Try changing your search or filters to find
                other guides and resources.
              </Typography>
            </Stack>
          </Box>
        )}
      </Box>

      {hasArticles && (
        <Box
          sx={{
            px: {
              xs: 1.5,
              sm: 2,
            },
            py: 1.25,
            borderRadius: "14px",
            border: "1px solid #E8EDF2",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={1.5}
            sx={{
              alignItems: {
                xs: "stretch",
                sm: "center",
              },
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                color: "#64748B",
                textAlign: {
                  xs: "center",
                  sm: "left",
                },
              }}
            >
              Showing{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "#334155",
                }}
              >
                {startItem}–{endItem}
              </Box>{" "}
              of{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "#334155",
                }}
              >
                {articles.length}
              </Box>{" "}
              guides
            </Typography>

            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                size="small"
                disabled={page === 1}
                onClick={() =>
                  setPage((current) => Math.max(1, current - 1))
                }
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "9px",
                  border: "1px solid #E2E8F0",
                  color: "#475569",
                  transition: "all 0.18s ease",

                  "&:hover": {
                    backgroundColor: "#F8FAFC",
                    borderColor: "#CBD5E1",
                  },

                  "&.Mui-disabled": {
                    color: "#CBD5E1",
                    borderColor: "#F1F5F9",
                  },
                }}
              >
                <ChevronLeftRounded sx={{ fontSize: 19 }} />
              </IconButton>

              <Pagination
                page={page}
                count={totalPages}
                onChange={(_, value) => setPage(value)}
                siblingCount={1}
                boundaryCount={1}
                hideNextButton
                hidePrevButton
                sx={{
                  "& .MuiPaginationItem-root": {
                    minWidth: 32,
                    height: 32,
                    borderRadius: "9px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#64748B",
                    margin: "0 2px",
                  },

                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#ECFDF3",
                    color: "#15803D",
                    fontWeight: 800,
                    border: "1px solid #BBF7D0",
                  },

                  "& .MuiPaginationItem-root.Mui-selected:hover": {
                    backgroundColor: "#DCFCE7",
                  },

                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "#F8FAFC",
                  },
                }}
              />

              <IconButton
                size="small"
                disabled={page === totalPages}
                onClick={() =>
                  setPage((current) =>
                    Math.min(totalPages, current + 1),
                  )
                }
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "9px",
                  border: "1px solid #E2E8F0",
                  color: "#475569",
                  transition: "all 0.18s ease",

                  "&:hover": {
                    backgroundColor: "#F8FAFC",
                    borderColor: "#CBD5E1",
                  },

                  "&.Mui-disabled": {
                    color: "#CBD5E1",
                    borderColor: "#F1F5F9",
                  },
                }}
              >
                <ChevronRightRounded sx={{ fontSize: 19 }} />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default ArticlesList;