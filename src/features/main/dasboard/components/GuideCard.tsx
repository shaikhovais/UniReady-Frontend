import {
  BookmarkRounded,
  MenuBookRounded,
  ScheduleRounded,
} from "@mui/icons-material";

import { Box, Button, Typography } from "@mui/material";

import type { Guide } from "../../../../types/features/dashboard";
import { getAppIcon } from "../../../../utils/appIcons";

interface GuideCardProps {
  guides: Guide[];
  type: "featured" | "saved";
  onViewAll: () => void;
  onGuideClick: (articleId: number) => void;
}

const GuideCard = ({
  guides,
  type,
  onViewAll,
  onGuideClick,
}: GuideCardProps) => {
  const isFeatured = type === "featured";

  const theme = isFeatured
    ? {
        color: "#16804B",
        background: "rgba(22, 128, 75, 0.07)",
        border: "rgba(22, 128, 75, 0.16)",
        hover: "rgba(22, 128, 75, 0.11)",
      }
    : {
        color: "#7C3AED",
        background: "rgba(124, 58, 237, 0.07)",
        border: "rgba(124, 58, 237, 0.16)",
        hover: "rgba(124, 58, 237, 0.11)",
      };

  const title = isFeatured ? "Featured Guides" : "Saved Guides";

  const subtitle = isFeatured
    ? "Helpful guides to support your journey"
    : "Guides you've saved for later";

  const EmptyIcon = isFeatured ? MenuBookRounded : BookmarkRounded;

  return (
    <Box
      sx={{
        width: "100%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1.5,
        backgroundColor: "background.paper",
        boxShadow: "0 4px 18px rgba(20, 45, 35, 0.05)",
        overflow: "hidden",
        position: "relative",
        isolation: "isolate",
        "&::before": {
          content: '""',
          position: "absolute",
          width: {
            xs: 180,
            sm: 220,
          },
          height: {
            xs: 180,
            sm: 220,
          },
          borderRadius: "50%",
          top: -125,
          right: -105,
          background: isFeatured
            ? "linear-gradient(135deg, rgba(22, 128, 75, 0.10), rgba(22, 128, 75, 0.015))"
            : "linear-gradient(135deg, rgba(124, 58, 237, 0.10), rgba(124, 58, 237, 0.015))",
          zIndex: -1,
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          p: {
            xs: 2.25,
            sm: 2.75,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontWeight: 800,
                color: "text.primary",
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 0.35,
                fontSize: "0.72rem",
                lineHeight: 1.5,
                color: "text.secondary",
                maxWidth: 300,
              }}
            >
              {subtitle}
            </Typography>
          </Box>

          <Button
            onClick={onViewAll}
            sx={{
              flexShrink: 0,
              minWidth: 0,
              px: 1.4,
              py: 0.7,
              borderRadius: 1,
              textTransform: "none",
              fontSize: "0.68rem",
              fontWeight: 800,
              color: theme.color,
              backgroundColor: theme.background,
              border: "1px solid",
              borderColor: theme.border,
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: theme.hover,
                borderColor: theme.border,
              },
            }}
          >
            View all
          </Button>
        </Box>

        {guides.length === 0 ? (
          <Box
            sx={{
              mt: 2.25,
              minHeight: 175,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              border: "1px dashed",
              borderColor: "rgba(20, 45, 35, 0.12)",
              borderRadius: 1.5,
              backgroundColor: "rgba(250, 251, 250, 0.7)",
              px: 2,
            }}
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.background,
                color: theme.color,
              }}
            >
              <EmptyIcon
                sx={{
                  fontSize: 23,
                }}
              />
            </Box>

            <Typography
              sx={{
                mt: 1.35,
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "text.primary",
              }}
            >
              {isFeatured
                ? "No featured guides available"
                : "No saved guides yet"}
            </Typography>

            <Typography
              sx={{
                mt: 0.45,
                maxWidth: 300,
                fontSize: "0.67rem",
                lineHeight: 1.5,
                color: "text.secondary",
              }}
            >
              {isFeatured
                ? "Check back later for helpful guides and resources."
                : "Save useful guides and they will appear here for quick access."}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              mt: 2.25,
              display: "flex",
              flexDirection: "column",
              gap: 1.25,
            }}
          >
            {guides.map((guide) => {
              const categoryColor =
                guide.categoryIconColor || theme.color;

              const categoryBackground = getLightColor(categoryColor);

              const categoryIcon =
                getAppIcon(guide.categoryIcon) || (
                  <MenuBookRounded
                    sx={{
                      fontSize: 21,
                    }}
                  />
                );

              return (
                <Box
                  key={guide.id}
                  component="button"
                  type="button"
                  onClick={() => onGuideClick(guide.id)}
                  sx={{
                    width: "100%",
                    border: "1px solid",
                    borderColor: "rgba(20, 45, 35, 0.075)",
                    borderRadius: 1.5,
                    backgroundColor: "rgba(250, 251, 250, 0.72)",
                    p: {
                      xs: 1.5,
                      sm: 1.7,
                    },
                    display: "block",
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition:
                      "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      backgroundColor: "background.paper",
                      borderColor: `${categoryColor}35`,
                      boxShadow: `0 6px 18px ${categoryColor}12`,
                    },
                    "&:focus-visible": {
                      outline: "2px solid",
                      outlineColor: categoryColor,
                      outlineOffset: 2,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        flexShrink: 0,
                        borderRadius: 1.25,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: categoryBackground,
                        color: categoryColor,
                        "& svg": {
                          color: `${categoryColor} !important`,
                          fontSize: 18,
                        },
                      }}
                    >
                      {categoryIcon}
                    </Box>

                    <Typography
                      sx={{
                        minWidth: 0,
                        fontSize: "0.65rem",
                        lineHeight: 1.3,
                        fontWeight: 800,
                        color: categoryColor,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {guide.categoryName}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      mt: 1.05,
                      fontSize: "0.78rem",
                      lineHeight: 1.45,
                      fontWeight: 800,
                      color: "text.primary",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {guide.title}
                  </Typography>

                  <Box
                    sx={{
                      mt: 0.8,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.4,
                      color: "text.secondary",
                    }}
                  >
                    <ScheduleRounded
                      sx={{
                        fontSize: 13,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: "0.63rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {guide.readTimeMinutes} min read
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const getLightColor = (color: string) => {
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");

    const normalized =
      hex.length === 3
        ? hex
            .split("")
            .map((character) => character + character)
            .join("")
        : hex;

    if (normalized.length === 6) {
      const red = parseInt(normalized.substring(0, 2), 16);
      const green = parseInt(normalized.substring(2, 4), 16);
      const blue = parseInt(normalized.substring(4, 6), 16);

      return `rgba(${red}, ${green}, ${blue}, 0.10)`;
    }
  }

  return "rgba(22, 128, 75, 0.08)";
};

export default GuideCard;