import {
  AccessTimeRounded,
  BookmarkBorderRounded,
  BookmarkRounded,
  CalendarTodayRounded,
} from "@mui/icons-material";

import { Box, IconButton, Stack, Typography } from "@mui/material";

import { getAppIcon } from "../../../../../utils/appIcons";

import type { ArticleDetail } from "../../../../../types/features/resource";

export interface ArticleHeaderProps {
  article: ArticleDetail;
  onToggleSave: () => void;
}

const ArticleHeader = ({
  article,
  onToggleSave,
}: ArticleHeaderProps) => {
  const categoryColor = article.categoryIconColor || "#1F733E";

  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  return (
    <Box
      sx={{
        position: "relative",
        p: {
          xs: 2,
          sm: 2.5,
          md: 3.5,
        },
        borderRadius: "20px 20px 0 0",
        background: `linear-gradient(
          135deg,
          ${categoryColor}08 0%,
          #FFFFFF 55%
        )`,
        border: `1px solid ${categoryColor}22`,
      }}
    >
      <Stack
        direction="row"
        spacing={{
          xs: 1.5,
          sm: 2,
          md: 2.75,
        }}
        sx={{
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: {
              xs: 60,
              sm: 66,
              md: 76,
            },
            height: {
              xs: 60,
              sm: 66,
              md: 76,
            },
            flexShrink: 0,
            borderRadius: {
              xs: "16px",
              md: "20px",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `${categoryColor}12`,
            border: `1px solid ${categoryColor}22`,
            color: categoryColor,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& svg": {
                fontSize: {
                  xs: 30,
                  sm: 34,
                  md: 40,
                },
              },
            }}
          >
            {getAppIcon(article.categoryIcon ?? "customCategory")}
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 1.25,
              py: 0.6,
              mb: 1,
              borderRadius: "999px",
              backgroundColor: `${categoryColor}10`,
              border: `1px solid ${categoryColor}25`,
              color: categoryColor,
              maxWidth: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 10.5,
                  sm: 11,
                },
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: "0.035em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {article.categoryName}
            </Typography>
          </Box>

          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: 24,
                sm: 29,
                md: 36,
              },
              fontWeight: 800,
              color: "#172033",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            {article.title}
          </Typography>

          <Stack
            direction="row"
            spacing={{
              xs: 1.25,
              sm: 2,
            }}
            sx={{
              mt: 1.75,
              alignItems: "center",
              flexWrap: "wrap",
              rowGap: 0.75,
            }}
          >
            <Stack
              direction="row"
              spacing={0.7}
              sx={{
                alignItems: "center",
              }}
            >
              <CalendarTodayRounded
                sx={{
                  fontSize: {
                    xs: 15,
                    md: 17,
                  },
                  color: "#94A3B8",
                }}
              />

              <Typography
                sx={{
                  fontSize: {
                    xs: 12.5,
                    md: 14,
                  },
                  color: "#64748B",
                  lineHeight: 1.4,
                }}
              >
                {formattedDate}
              </Typography>
            </Stack>

            <Box
              sx={{
                width: 4,
                height: 4,
                flexShrink: 0,
                borderRadius: "50%",
                backgroundColor: "#CBD5E1",
              }}
            />

            <Stack
              direction="row"
              spacing={0.7}
              sx={{
                alignItems: "center",
              }}
            >
              <AccessTimeRounded
                sx={{
                  fontSize: {
                    xs: 16,
                    md: 18,
                  },
                  color: "#94A3B8",
                }}
              />

              <Typography
                sx={{
                  fontSize: {
                    xs: 12.5,
                    md: 14,
                  },
                  color: "#64748B",
                  lineHeight: 1.4,
                }}
              >
                {article.readTimeMinutes} min read
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <IconButton
          onClick={onToggleSave}
          aria-label={
            article.isSaved
              ? "Remove saved article"
              : "Save article"
          }
          sx={{
            width: {
              xs: 40,
              sm: 44,
            },
            height: {
              xs: 40,
              sm: 44,
            },
            flexShrink: 0,
            alignSelf: "flex-start",
            borderRadius: "13px",
            border: article.isSaved
              ? `1px solid ${categoryColor}35`
              : "1px solid #E5E7EB",
            color: article.isSaved
              ? categoryColor
              : "#64748B",
            backgroundColor: article.isSaved
              ? `${categoryColor}10`
              : "#FFFFFF",
            transition:
              "transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",

            "&:hover": {
              transform: "translateY(-2px)",
              color: categoryColor,
              backgroundColor: `${categoryColor}10`,
              borderColor: `${categoryColor}35`,
            },
          }}
        >
          {article.isSaved ? (
            <BookmarkRounded
              sx={{
                fontSize: {
                  xs: 19,
                  sm: 21,
                },
              }}
            />
          ) : (
            <BookmarkBorderRounded
              sx={{
                fontSize: {
                  xs: 19,
                  sm: 21,
                },
              }}
            />
          )}
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ArticleHeader;