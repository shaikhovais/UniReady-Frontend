import { useState } from "react";

import {
  AssignmentRounded,
  CheckCircleRounded,
  ExpandLessRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";

import { Box, Button, Typography } from "@mui/material";

import type { Checklist } from "../../../../types/features/dashboard";

import {
  getChecklistIconColor,
  getChecklistProgressColor,
} from "../../checklists/checklistStyles";

import { getAppIcon } from "../../../../utils/appIcons";

interface ChecklistCardProps {
  checklist: Checklist;
  onGoToChecklists: () => void;
}

const BLUE_THEME = {
  color: "#2563EB",
  dark: "#1D4ED8",
  background: "rgba(37, 99, 235, 0.08)",
  border: "rgba(37, 99, 235, 0.14)",
  hover: "rgba(37, 99, 235, 0.13)",
};

const ChecklistCard = ({
  checklist,
  onGoToChecklists,
}: ChecklistCardProps) => {
  const [showAll, setShowAll] = useState(false);

  const hasMoreCategories = checklist.categories.length > 3;

  const visibleCategories = showAll
    ? checklist.categories
    : checklist.categories.slice(0, 3);

  const remainingCategories = Math.max(
    checklist.categories.length - 3,
    0,
  );

  const totalItems = checklist.totalItems;
  const completedItems = checklist.gotItItems;

  const overallPercentage =
    totalItems === 0
      ? 0
      : Math.min(
          Math.round((completedItems / totalItems) * 100),
          100,
        );

  const isComplete =
    totalItems > 0 && overallPercentage === 100;

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
            xs: 190,
            sm: 240,
          },
          height: {
            xs: 190,
            sm: 240,
          },
          borderRadius: "50%",
          top: -135,
          right: -110,
          background:
            "linear-gradient(135deg, rgba(37, 99, 235, 0.14), rgba(37, 99, 235, 0.02))",
          zIndex: -1,
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
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
              display: "flex",
              alignItems: "center",
              gap: 1.1,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                flexShrink: 0,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: BLUE_THEME.background,
                color: BLUE_THEME.color,
              }}
            >
              <AssignmentRounded
                sx={{
                  fontSize: 21,
                }}
              />
            </Box>

            <Box
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  color: "text.primary",
                }}
              >
                Preparation Checklist
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: "0.68rem",
                  color: "text.secondary",
                }}
              >
                Track your preparation by category
              </Typography>
            </Box>
          </Box>

          <Button
            onClick={onGoToChecklists}
            sx={{
              minWidth: 0,
              flexShrink: 0,
              px: 1.35,
              py: 0.7,
              borderRadius: 1,
              textTransform: "none",
              fontSize: "0.66rem",
              fontWeight: 800,
              color: BLUE_THEME.color,
              backgroundColor: BLUE_THEME.background,
              border: "1px solid",
              borderColor: BLUE_THEME.border,
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: BLUE_THEME.hover,
                borderColor: "rgba(37, 99, 235, 0.22)",
              },
            }}
          >
            View all
          </Button>
        </Box>

        <Box
          sx={{
            mt: 2.25,
            p: {
              xs: 1.6,
              sm: 1.8,
            },
            borderRadius: 1,
            border: "1px solid",
            borderColor: BLUE_THEME.border,
            background:
              "linear-gradient(135deg, rgba(37, 99, 235, 0.075), rgba(37, 99, 235, 0.025))",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
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
                  fontSize: "0.61rem",
                  fontWeight: 800,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Overall progress
              </Typography>

              <Box
                sx={{
                  mt: 0.45,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 0.6,
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "1.35rem",
                      sm: "1.45rem",
                    },
                    lineHeight: 1.1,
                    fontWeight: 850,
                    color: "text.primary",
                  }}
                >
                  {completedItems}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    color: "text.secondary",
                  }}
                >
                  of {totalItems} items completed
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                flexShrink: 0,
                minWidth: 64,
                px: 1.15,
                py: 0.75,
                borderRadius: 1,
                textAlign: "center",
                backgroundColor: isComplete
                  ? "rgba(22, 128, 75, 0.09)"
                  : BLUE_THEME.background,
                border: "1px solid",
                borderColor: isComplete
                  ? "rgba(22, 128, 75, 0.15)"
                  : BLUE_THEME.border,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  lineHeight: 1.1,
                  fontWeight: 850,
                  color: isComplete
                    ? "success.dark"
                    : BLUE_THEME.dark,
                }}
              >
                {overallPercentage}%
              </Typography>

              <Typography
                sx={{
                  mt: 0.2,
                  fontSize: "0.52rem",
                  fontWeight: 700,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
              >
                Complete
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 1.4,
              width: "100%",
              height: 8,
              borderRadius: 999,
              backgroundColor: "rgba(20, 45, 35, 0.08)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${overallPercentage}%`,
                height: "100%",
                borderRadius: 999,
                background:
                  overallPercentage === 100
                    ? "linear-gradient(90deg, #16804B, #22A05F)"
                    : "linear-gradient(90deg, #2563EB, #60A5FA)",
                transition: "width 0.3s ease",
              }}
            />
          </Box>

          <Box
            sx={{
              mt: 0.7,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.58rem",
                color: "text.secondary",
              }}
            >
              {isComplete
                ? "Everything is complete"
                : "Keep going with your preparation"}
            </Typography>

            <Typography
              sx={{
                fontSize: "0.58rem",
                fontWeight: 700,
                color: isComplete
                  ? "success.dark"
                  : BLUE_THEME.dark,
                whiteSpace: "nowrap",
              }}
            >
              {Math.max(totalItems - completedItems, 0)} remaining
            </Typography>
          </Box>
        </Box>

        {checklist.categories.length === 0 ? (
          <Box
            sx={{
              mt: 2,
              minHeight: 150,
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
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: BLUE_THEME.background,
                color: BLUE_THEME.color,
              }}
            >
              <AssignmentRounded
                sx={{
                  fontSize: 22,
                }}
              />
            </Box>

            <Typography
              sx={{
                mt: 1.25,
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "text.primary",
              }}
            >
              No checklist categories yet
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                maxWidth: 280,
                fontSize: "0.66rem",
                lineHeight: 1.5,
                color: "text.secondary",
              }}
            >
              Your preparation categories will appear here once they are
              available.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              mt: 2.25,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {visibleCategories.map((category) => {
              const totalCategoryItems = category.totalItems;
              const completedCategoryItems = category.gotItItems;

              const percentage =
                totalCategoryItems === 0
                  ? 0
                  : Math.min(
                      Math.round(
                        (completedCategoryItems /
                          totalCategoryItems) *
                          100,
                      ),
                      100,
                    );

              const iconColor = getChecklistIconColor(
                category.iconKey,
              );

              const progressColor =
                getChecklistProgressColor(
                  category.iconKey,
                );

              const isCategoryComplete =
                totalCategoryItems > 0 && percentage === 100;

              return (
                <Box
                  key={category.id}
                  sx={{
                    p: 1.35,
                    border: "1px solid",
                    borderColor: "rgba(20, 45, 35, 0.07)",
                    borderRadius: 1,
                    backgroundColor: "rgba(250, 251, 250, 0.72)",
                    transition:
                      "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      borderColor: "rgba(37, 99, 235, 0.15)",
                      boxShadow:
                        "0 5px 14px rgba(20, 45, 35, 0.05)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: iconColor.background,
                        color: iconColor.color,
                        "& svg": {
                          fontSize: 20,
                        },
                      }}
                    >
                      {getAppIcon(category.iconKey) || (
                        <AssignmentRounded
                          sx={{
                            fontSize: 20,
                          }}
                        />
                      )}
                    </Box>

                    <Box
                      sx={{
                        minWidth: 0,
                        flex: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.74rem",
                          fontWeight: 800,
                          color: "text.primary",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {category.name}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.2,
                          fontSize: "0.61rem",
                          color: "text.secondary",
                        }}
                      >
                        {completedCategoryItems} of{" "}
                        {totalCategoryItems} items completed
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        px: 0.85,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: isCategoryComplete
                          ? "rgba(22, 128, 75, 0.08)"
                          : BLUE_THEME.background,
                      }}
                    >
                      {isCategoryComplete && (
                        <CheckCircleRounded
                          sx={{
                            fontSize: 13,
                            color: "success.main",
                          }}
                        />
                      )}

                      <Typography
                        sx={{
                          fontSize: "0.64rem",
                          fontWeight: 800,
                          color: isCategoryComplete
                            ? "success.dark"
                            : BLUE_THEME.dark,
                        }}
                      >
                        {percentage}%
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      mt: 1,
                      width: "100%",
                      height: 5,
                      borderRadius: 999,
                      backgroundColor: "rgba(20, 45, 35, 0.07)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${percentage}%`,
                        height: "100%",
                        borderRadius: 999,
                        backgroundColor: isCategoryComplete
                          ? "success.main"
                          : progressColor,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}

        {hasMoreCategories && (
          <Box
            sx={{
              mt: 1.75,
              pt: 1.35,
              borderTop: "1px solid",
              borderColor: "rgba(20, 45, 35, 0.07)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() =>
                setShowAll((previous) => !previous)
              }
              endIcon={
                showAll ? (
                  <ExpandLessRounded
                    sx={{
                      fontSize: 18,
                    }}
                  />
                ) : (
                  <ExpandMoreRounded
                    sx={{
                      fontSize: 18,
                    }}
                  />
                )
              }
              sx={{
                minWidth: 0,
                px: 2,
                py: 0.65,
                borderRadius: 1,
                textTransform: "none",
                fontSize: "0.68rem",
                fontWeight: 800,
                color: BLUE_THEME.color,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: BLUE_THEME.background,
                },
              }}
            >
              {showAll
                ? "Show less"
                : `Show ${remainingCategories} more ${
                    remainingCategories === 1
                      ? "category"
                      : "categories"
                  }`}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChecklistCard;