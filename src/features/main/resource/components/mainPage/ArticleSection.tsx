import dayjs from "dayjs";

import {
  ArrowForwardRounded,
  ArticleRounded,
  CalendarTodayRounded,
} from "@mui/icons-material";

import { Box, Stack, Typography } from "@mui/material";

import { getAppIcon } from "../../../../../utils/appIcons";

import type { ArticleListItem } from "../../../../../types/features/resource";
import type { Lookup } from "../../../../../types/core/common/Lookup";

export interface ArticleSectionProps {
  title: string;
  articles: ArticleListItem[];
  categories: Lookup[];
  onClick: (article: ArticleListItem) => void;
}

const ArticleSection = ({
  title,
  articles,
  categories,
  onClick,
}: ArticleSectionProps) => {
  return (
    <Stack spacing={2}>
      {/* Section Header */}
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack
          direction="row"
          spacing={1.25}
          sx={{
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#EAF5ED",
              color: "#1F733E",
              flexShrink: 0,
            }}
          >
            <ArticleRounded sx={{ fontSize: 19 }} />
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
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 0.25,
                fontSize: 12,
                color: "#64748B",
                lineHeight: 1.4,
              }}
            >
              Discover useful guides and information
            </Typography>
          </Box>
        </Stack>
      </Stack>

      {/* Articles */}
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {articles.slice(0, 3).map((article) => {
          const category = categories.find(
            (item) => item.id === article.categoryId,
          );

          const tintColor = category?.color ?? "#1F733E";

          return (
            <Stack
              key={article.id}
              onClick={() => onClick(article)}
              sx={{
                position: "relative",
                minWidth: 0,
                minHeight: 205,
                p: 2.25,
                borderRadius: "16px",
                cursor: "pointer",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8EBEF",

                transition:
                  "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",

                "&:hover": {
                  transform: "translateY(-3px)",
                  borderColor: `${tintColor}35`,
                  boxShadow:
                    "0 10px 28px rgba(17, 24, 39, 0.08)",

                  "& .article-title": {
                    color: tintColor,
                  },

                  "& .article-arrow": {
                    transform: "translateX(4px)",
                    color: tintColor,
                  },

                  "& .article-category-icon": {
                    backgroundColor: `${tintColor}20`,
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              {/* Category */}
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  mb: 1.5,
                }}
              >
                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{
                    alignItems: "center",
                    minWidth: 0,
                  }}
                >
                  <Box
                    className="article-category-icon"
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "9px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: `${tintColor}14`,
                      color: tintColor,
                      flexShrink: 0,

                      transition:
                        "background-color 0.2s ease, transform 0.2s ease",

                      "& svg": {
                        fontSize: 17,
                      },
                    }}
                  >
                    {getAppIcon(
                      category?.icon ?? "customCategory",
                    )}
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: tintColor,
                      lineHeight: 1.2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {category?.name ?? "Guide"}
                  </Typography>
                </Stack>
              </Stack>

              {/* Title */}
              <Typography
                className="article-title"
                sx={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#111827",
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  transition: "color 0.2s ease",
                }}
              >
                {article.title}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  mt: 1,
                  fontSize: 12.5,
                  color: "#6B7280",
                  lineHeight: 1.55,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {article.shortDescription}
              </Typography>

              {/* Footer */}
              <Stack
                direction="row"
                sx={{
                  mt: "auto",
                  pt: 1.5,
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid #F1F3F5",
                }}
              >
                <Stack
                  direction="row"
                  spacing={0.6}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <CalendarTodayRounded
                    sx={{
                      fontSize: 13,
                      color: "#A1A7B0",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 11.5,
                      color: "#9CA3AF",
                    }}
                  >
                    {dayjs(article.createdAt).format(
                      "MMM D, YYYY",
                    )}
                  </Typography>
                </Stack>

                <ArrowForwardRounded
                  className="article-arrow"
                  sx={{
                    fontSize: 17,
                    color: "#9CA3AF",
                    transition:
                      "transform 0.2s ease, color 0.2s ease",
                  }}
                />
              </Stack>
            </Stack>
          );
        })}
      </Box>
    </Stack>
  );
};

export default ArticleSection;