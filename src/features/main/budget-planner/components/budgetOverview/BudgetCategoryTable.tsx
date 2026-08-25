import { useState } from "react";

import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";

import { getAppIcon } from "../../../../../utils/appIcons";

import type { BudgetCategory } from "../../../../../types/features/budget";

import {
  CHART_COLOURS,
  DEFAULT_CHART_COLOUR,
} from "../../../../../utils/chartColours";

interface BudgetCategoryTableProps {
  categories: BudgetCategory[];
}

const INITIAL_VISIBLE_COUNT = 3;

const BudgetCategoryTable = ({
  categories,
}: BudgetCategoryTableProps) => {
  const [showAll, setShowAll] = useState(false);

  if (categories.length === 0) {
    return (
      <Box
        sx={{
          minHeight: {
            xs: 260,
            sm: 300,
            md: 360,
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: {
            xs: "13px",
            sm: "15px",
            md: "16px",
          },
          backgroundColor: "#F8FAF9",
          border: "1px dashed #DDE8E1",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 330,
            px: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },
          }}
        >
          <Box
            sx={{
              width: {
                xs: 54,
                sm: 62,
                md: 68,
              },
              height: {
                xs: 54,
                sm: 62,
                md: 68,
              },
              mx: "auto",
              mb: {
                xs: 1.25,
                sm: 1.5,
                md: 1.75,
              },
              borderRadius: {
                xs: "16px",
                sm: "18px",
                md: "20px",
              },
              backgroundColor: "#EEF8F0",
              display: "grid",
              placeItems: "center",
              fontSize: {
                xs: 25,
                sm: 28,
                md: 30,
              },
            }}
          >
            📋
          </Box>

          <Typography
            sx={{
              fontSize: {
                xs: 17,
                sm: 19,
                md: 20,
              },
              fontWeight: 800,
              color: "#172033",
            }}
          >
            No budget categories
          </Typography>

          <Typography
            sx={{
              mt: {
                xs: 0.5,
                sm: 0.65,
                md: 0.75,
              },
              color: "#64748B",
              fontSize: {
                xs: 12,
                sm: 12.5,
                md: 13,
              },
              lineHeight: 1.55,
            }}
          >
            No budget information is available for the selected month.
          </Typography>
        </Box>
      </Box>
    );
  }

  const hasMoreCategories =
    categories.length > INITIAL_VISIBLE_COUNT;

  const visibleCategories = showAll
    ? categories
    : categories.slice(0, INITIAL_VISIBLE_COUNT);

  const hiddenCount =
    categories.length - INITIAL_VISIBLE_COUNT;

  return (
    <Box
      sx={{
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: {
            xs: 1,
            sm: 1.5,
            md: 2,
          },
          mb: {
            xs: 1,
            sm: 1.25,
            md: 1.5,
          },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: {
                xs: 16,
                sm: 17,
                md: 18,
              },
              fontWeight: 800,
              color: "#172033",
              lineHeight: 1.25,
            }}
          >
            Budget Categories
          </Typography>

          <Typography
            sx={{
              mt: {
                xs: 0.25,
                sm: 0.3,
                md: 0.35,
              },
              fontSize: {
                xs: 11.5,
                sm: 12,
                md: 12.5,
              },
              color: "#64748B",
              lineHeight: 1.4,
            }}
          >
            Track spending across your budget categories.
          </Typography>
        </Box>

        <Box
          sx={{
            px: {
              xs: 0.75,
              sm: 0.9,
              md: 1,
            },
            py: {
              xs: 0.35,
              sm: 0.4,
              md: 0.45,
            },
            borderRadius: "8px",
            backgroundColor: "#F1F5F3",
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 10,
                sm: 10.5,
                md: 11,
              },
              fontWeight: 700,
              color: "#64748B",
            }}
          >
            {categories.length}{" "}
            {categories.length === 1
              ? "category"
              : "categories"}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          border: "1px solid #E5ECE8",
          borderRadius: {
            xs: "12px",
            sm: "13px",
            md: "14px",
          },
          backgroundColor: "#FFFFFF",

          "&::-webkit-scrollbar": {
            height: 4,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#CBD5D0",
            borderRadius: 999,
          },
        }}
      >
        <Box
          sx={{
            minWidth: {
              xs: 590,
              sm: 630,
              md: 680,
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:
                "minmax(190px, 2.5fr) 90px 90px minmax(165px, 1.5fr)",
              columnGap: {
                xs: 1,
                sm: 1.5,
                md: 2,
              },
              alignItems: "center",
              px: {
                xs: 1.25,
                sm: 1.5,
                md: 2,
              },
              py: {
                xs: 1,
                sm: 1.15,
                md: 1.35,
              },
              backgroundColor: "#F8FAF9",
              borderBottom: "1px solid #E5ECE8",
            }}
          >
            {["Category", "Spent", "Budget", "Progress"].map(
              (heading) => (
                <Typography
                  key={heading}
                  sx={{
                    fontSize: {
                      xs: 9.5,
                      sm: 10,
                      md: 10.5,
                    },
                    fontWeight: 800,
                    color: "#64748B",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {heading}
                </Typography>
              ),
            )}
          </Box>

          <Stack>
            {visibleCategories.map((category, index) => {
              const colour =
                CHART_COLOURS[index] ??
                DEFAULT_CHART_COLOUR;

              const isOverBudget =
                category.percentageUsed > 100;

              const progress = Math.min(
                category.percentageUsed,
                100,
              );

              return (
                <Box
                  key={category.userBudgetCategoryId}
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(190px, 2.5fr) 90px 90px minmax(165px, 1.5fr)",
                    columnGap: {
                      xs: 1,
                      sm: 1.5,
                      md: 2,
                    },
                    alignItems: "center",
                    px: {
                      xs: 1.25,
                      sm: 1.5,
                      md: 2,
                    },
                    py: {
                      xs: 1.1,
                      sm: 1.3,
                      md: 1.55,
                    },
                    borderBottom: "1px solid #EDF2EF",
                    transition: "background-color 0.18s ease",

                    "&:hover": {
                      backgroundColor: "#FAFCFB",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: {
                        xs: 0.9,
                        sm: 1.1,
                        md: 1.25,
                      },
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: {
                          xs: 32,
                          sm: 35,
                          md: 38,
                        },
                        height: {
                          xs: 32,
                          sm: 35,
                          md: 38,
                        },
                        flexShrink: 0,
                        borderRadius: {
                          xs: "9px",
                          sm: "10px",
                          md: "11px",
                        },
                        display: "grid",
                        placeItems: "center",
                        color: isOverBudget
                          ? "#DC2626"
                          : colour,
                        backgroundColor:
                          isOverBudget
                            ? "#FEF2F2"
                            : `${colour}12`,
                        border: `1px solid ${
                          isOverBudget
                            ? "#FECACA"
                            : `${colour}22`
                        }`,

                        "& svg": {
                          fontSize: {
                            xs: 17,
                            sm: 18,
                            md: 20,
                          },
                        },
                      }}
                    >
                      {getAppIcon(category.icon)}
                    </Box>

                    <Box
                      sx={{
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            xs: 12,
                            sm: 12.75,
                            md: 13.5,
                          },
                          fontWeight: 750,
                          color: "#172033",
                          lineHeight: 1.3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {category.name}
                      </Typography>

                      <Typography
                        sx={{
                          mt: {
                            xs: 0.2,
                            sm: 0.25,
                            md: 0.3,
                          },
                          fontSize: {
                            xs: 10,
                            sm: 10.5,
                            md: 11,
                          },
                          fontWeight: 600,
                          color: isOverBudget
                            ? "#DC2626"
                            : "#94A3B8",
                          lineHeight: 1.3,
                        }}
                      >
                        {isOverBudget
                          ? `£${Math.abs(
                              category.remaining,
                            ).toFixed(2)} over budget`
                          : `£${category.remaining.toFixed(
                              2,
                            )} remaining`}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: 12,
                        sm: 12.75,
                        md: 13.5,
                      },
                      fontWeight: 700,
                      color: "#172033",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    £{category.spent.toFixed(2)}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: 12,
                        sm: 12.75,
                        md: 13.5,
                      },
                      fontWeight: 600,
                      color: "#64748B",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    £{category.budget.toFixed(2)}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: {
                        xs: 0.65,
                        sm: 0.8,
                        md: 1,
                      },
                    }}
                  >
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        flex: 1,
                        height: {
                          xs: 6,
                          sm: 6.5,
                          md: 7,
                        },
                        borderRadius: 999,
                        backgroundColor:
                          isOverBudget
                            ? "#FEE2E2"
                            : `${colour}18`,

                        "& .MuiLinearProgress-bar": {
                          borderRadius: 999,
                          backgroundColor:
                            isOverBudget
                              ? "#DC2626"
                              : colour,
                        },
                      }}
                    />

                    <Typography
                      sx={{
                        width: {
                          xs: 34,
                          sm: 36,
                          md: 38,
                        },
                        flexShrink: 0,
                        textAlign: "right",
                        fontSize: {
                          xs: 10.5,
                          sm: 11,
                          md: 11.5,
                        },
                        fontWeight: 800,
                        color: isOverBudget
                          ? "#DC2626"
                          : colour,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {category.percentageUsed.toFixed(0)}
                      %
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Stack>

          {hasMoreCategories && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                borderTop: "1px solid #EDF2EF",
                backgroundColor: "#FCFDFC",
              }}
            >
              <Box
                component="button"
                type="button"
                onClick={() => setShowAll((value) => !value)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.4,
                  py: {
                    xs: 0.85,
                    sm: 1,
                    md: 1.15,
                  },
                  px: {
                    xs: 1.5,
                    sm: 1.75,
                    md: 2,
                  },
                  border: 0,
                  background: "transparent",
                  color: "#15803D",
                  fontSize: {
                    xs: 11,
                    sm: 11.5,
                    md: 12,
                  },
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",

                  "&:hover": {
                    color: "#166534",
                  },
                }}
              >
                {showAll
                  ? "Show less"
                  : `Show ${hiddenCount} more`}

                <IconButton
                  component="span"
                  disableRipple
                  sx={{
                    width: {
                      xs: 20,
                      sm: 21,
                      md: 22,
                    },
                    height: {
                      xs: 20,
                      sm: 21,
                      md: 22,
                    },
                    p: 0,
                    color: "inherit",
                    pointerEvents: "none",
                  }}
                >
                  {showAll ? (
                    <KeyboardArrowUpRounded
                      sx={{
                        fontSize: {
                          xs: 16,
                          sm: 17,
                          md: 18,
                        },
                      }}
                    />
                  ) : (
                    <KeyboardArrowDownRounded
                      sx={{
                        fontSize: {
                          xs: 16,
                          sm: 17,
                          md: 18,
                        },
                      }}
                    />
                  )}
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetCategoryTable;