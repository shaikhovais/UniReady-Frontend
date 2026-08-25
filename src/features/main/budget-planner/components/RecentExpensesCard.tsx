import { ArrowForwardRounded } from "@mui/icons-material";

import { Box, Divider, Paper, Stack, Typography } from "@mui/material";

import { getAppIcon } from "../../../../utils/appIcons";

import type { Expense } from "../../../../types/features/budget";

import {
  CHART_COLOURS,
  DEFAULT_CHART_COLOUR,
} from "../../../../utils/chartColours";

interface RecentExpensesProps {
  expenses: Expense[];
  onViewAll: () => void;
}

const RecentExpensesCard = ({ expenses, onViewAll }: RecentExpensesProps) => {
  const recentExpenses = expenses.slice(0, 5);

  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 1.25,
          sm: 2.25,
        },
        border: "1px solid #bee3ca",
        borderRadius: {
          xs: "14px",
          sm: "18px",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(135deg, #FFFFFF 0%, #F3FAF5 45%, #E8F6EC 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: {
            xs: 1,
            sm: 1.5,
          },
          gap: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 15,
                sm: 18,
              },
              fontWeight: 800,
              color: "#172033",
              lineHeight: 1.25,
            }}
          >
            Recent Expenses
          </Typography>

          <Typography
            sx={{
              mt: {
                xs: 0.2,
                sm: 0.35,
              },
              fontSize: {
                xs: 10.5,
                sm: 12.5,
              },
              color: "#64748B",
              lineHeight: 1.3,
            }}
          >
            Your latest spending activity.
          </Typography>
        </Box>

        <Box
          component="button"
          onClick={onViewAll}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.2,
            border: 0,
            background: "transparent",
            color: "#15803D",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: {
              xs: 10,
              sm: 12.5,
            },
            fontWeight: 700,
            px: {
              xs: 0.5,
              sm: 0.75,
            },
            py: {
              xs: 0.5,
              sm: 0.75,
            },
            borderRadius: "8px",
            flexShrink: 0,

            "&:hover": {
              backgroundColor: "#F0FDF4",
            },
          }}
        >
          View All
          <ArrowForwardRounded
            sx={{
              fontSize: {
                xs: 14,
                sm: 17,
              },
            }}
          />
        </Box>
      </Box>

      {recentExpenses.length === 0 ? (
        <Box
          sx={{
            flex: 1,
            minHeight: {
              xs: 120,
              sm: 180,
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: {
              xs: "11px",
              sm: "14px",
            },
            backgroundColor: "#F8FAF9",
            border: "1px dashed #DDE8E1",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              px: {
                xs: 1.25,
                sm: 2,
              },
            }}
          >
            <Typography
              sx={{
                color: "#475569",
                fontSize: {
                  xs: 11.5,
                  sm: 13.5,
                },
                fontWeight: 600,
              }}
            >
              No expenses yet
            </Typography>

            <Typography
              sx={{
                mt: 0.35,
                color: "#94A3B8",
                fontSize: {
                  xs: 10,
                  sm: 12,
                },
                lineHeight: 1.35,
              }}
            >
              Your expenses will appear here once added.
            </Typography>
          </Box>
        </Box>
      ) : (
        <Stack
          sx={{
            flex: 1,
          }}
          divider={
            <Divider
              sx={{
                borderColor: "#EDF2EF",
              }}
            />
          }
        >
          {recentExpenses.map((expense, index) => {
            const colour = CHART_COLOURS[index] ?? DEFAULT_CHART_COLOUR;

            return (
              <Box
                key={expense.expenseId}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: {
                    xs: 0.75,
                    sm: 2,
                  },
                  py: {
                    xs: 0.8,
                    sm: 1.35,
                  },
                  px: {
                    xs: 0.25,
                    sm: 0.5,
                  },
                  borderRadius: {
                    xs: "9px",
                    sm: "12px",
                  },
                  transition: "all 0.18s ease",

                  "&:hover": {
                    backgroundColor: "#F8FCF9",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: {
                      xs: 0.75,
                      sm: 1.5,
                    },
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: {
                        xs: 32,
                        sm: 42,
                      },
                      height: {
                        xs: 32,
                        sm: 42,
                      },
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: {
                        xs: "9px",
                        sm: "12px",
                      },
                      color: colour,
                      backgroundColor: `${colour}12`,
                      border: `1px solid ${colour}20`,

                      "& svg": {
                        fontSize: {
                          xs: 17,
                          sm: 21,
                        },
                      },
                    }}
                  >
                    {getAppIcon(expense.categoryIcon)}
                  </Box>

                  <Box
                    sx={{
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: {
                          xs: 12,
                          sm: 14.5,
                        },
                        color: "#172033",
                        lineHeight: 1.25,
                        display: "-webkit-box",
                        WebkitLineClamp: {
                          xs: 2,
                          sm: 1,
                        },
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        wordBreak: "break-word",
                      }}
                    >
                      {expense.name}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: {
                          xs: 0.45,
                          sm: 0.65,
                        },
                        mt: {
                          xs: 0.3,
                          sm: 0.45,
                        },
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#64748B",
                          fontSize: {
                            xs: 9.5,
                            sm: 12,
                          },
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          minWidth: 0,
                        }}
                      >
                        {expense.category}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#CBD5E1",
                          fontSize: {
                            xs: 9.5,
                            sm: 12,
                          },
                          flexShrink: 0,
                        }}
                      >
                        •
                      </Typography>

                      <Typography
                        sx={{
                          color: "#94A3B8",
                          fontSize: {
                            xs: 9.5,
                            sm: 12,
                          },
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {new Date(expense.expenseDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography
                  sx={{
                    flexShrink: 0,
                    fontWeight: 800,
                    fontSize: {
                      xs: 12,
                      sm: 15,
                    },
                    color: "#172033",
                  }}
                >
                  £{expense.amount.toFixed(2)}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      )}
    </Paper>
  );
};

export default RecentExpensesCard;
