import {
  AccountBalanceWalletRounded,
  AddRounded,
  ArrowForwardRounded,
  AttachMoneyRounded,
  ChevronRightRounded,
  ListAltRounded,
  PieChartRounded,
  SavingsRounded,
} from "@mui/icons-material";

import { Box, LinearProgress, Paper, Stack, Typography } from "@mui/material";

import type { BudgetHeader } from "../../../../types/features/budget";

interface StatsCardsProps {
  header: BudgetHeader;
  onEditBudget: () => void;
  onViewAllExpenses: () => void;
  onAddExpense: () => void;
}

const cardSx = {
  p: {
    xs: 0.9,
    sm: 1.1,
    md: 1.5,
    lg: 2.25,
  },
  border: "1px solid #E1E9E4",
  borderRadius: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
  },
  minHeight: {
    xs: 105,
    sm: 115,
    md: 140,
    lg: 150,
  },
  backgroundColor: "#FFFFFF",
  transition: "all 0.18s ease",
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  "&:hover": {
    boxShadow: "0 6px 18px rgba(15,23,42,0.05)",
  },
};

const iconBoxSx = {
  width: {
    xs: 30,
    sm: 34,
    md: 38,
    lg: 46,
  },
  height: {
    xs: 30,
    sm: 34,
    md: 38,
    lg: 46,
  },
  borderRadius: {
    xs: "9px",
    sm: "10px",
    md: "11px",
    lg: "13px",
  },
  display: "grid",
  placeItems: "center",
  flexShrink: 0,
};

const StatsCards = ({
  header,
  onEditBudget,
  onViewAllExpenses,
  onAddExpense,
}: StatsCardsProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(6, minmax(0, 1fr))",
          md: "repeat(5, minmax(0, 1fr))",
        },
        gap: {
          xs: 0.75,
          sm: 1,
          md: 1.25,
          lg: 2,
        },
        alignItems: "stretch",
        width: "100%",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          ...cardSx,
          gridColumn: {
            xs: "span 3",
            md: "span 1",
          },
          borderColor: "#DCE8F8",
          background: "linear-gradient(135deg, #FFFFFF 0%, #F7FAFF 100%)",
          "&:hover": {
            borderColor: "#C8D9EF",
            boxShadow: "0 6px 18px rgba(15,23,42,0.05)",
          },
          minHeight: {
            xs: 80,
            sm: 95,
            md: 120,
            lg: 130,
          },
        }}
      >
        <Stack
          spacing={{
            xs: 0.75,
            sm: 1,
            md: 1.25,
            lg: 1.5,
          }}
          sx={{
            height: "100%",
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 0.75,
              minWidth: 0,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 9.5,
                    sm: 10.5,
                    md: 11.5,
                    lg: 12.5,
                  },
                  color: "#64748B",
                  fontWeight: 600,
                  whiteSpace: "normal",
                  overflow: "visible",
                  textOverflow: "unset",
                  overflowWrap: "break-word",
                  lineHeight: 1.3,
                }}
              >
                Expenses
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: {
                    xs: 14,
                    sm: 15,
                    md: 17,
                    lg: 20,
                  },
                  fontWeight: 800,
                  color: "#172033",
                  lineHeight: 1.25,
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                Manage
              </Typography>
            </Box>

            <Box
              sx={{
                ...iconBoxSx,
                backgroundColor: "#EFF6FF",
                color: "#2563EB",
                border: "1px solid #DCE8F8",
              }}
            >
              <ListAltRounded
                sx={{
                  fontSize: {
                    xs: 16,
                    sm: 18,
                    md: 20,
                    lg: 23,
                  },
                }}
              />
            </Box>
          </Box>

          <Stack
            direction="row"
            spacing={{
              xs: 0.5,
              sm: 0.6,
              md: 0.75,
              lg: 1,
            }}
            sx={{
              mt: "auto",
            }}
          >
            <Box
              component="button"
              onClick={onAddExpense}
              sx={{
                flex: 1,
                minWidth: 0,
                height: {
                  xs: 30,
                  sm: 32,
                  md: 34,
                  lg: 38,
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.3,
                border: "1px solid #D9EDDE",
                borderRadius: {
                  xs: "7px",
                  sm: "8px",
                  md: "9px",
                  lg: "10px",
                },
                backgroundColor: "#F0FDF4",
                color: "#15803D",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: {
                  xs: 8,
                  sm: 8.5,
                  md: 9,
                  lg: 10,
                },
                fontWeight: 700,
                transition: "all 0.18s ease",
                "&:hover": {
                  backgroundColor: "#DCFCE7",
                  borderColor: "#B9DCC3",
                },
              }}
            >
              <AddRounded
                sx={{
                  fontSize: {
                    xs: 12,
                    sm: 13,
                    md: 14,
                    lg: 15,
                  },
                }}
              />
              Add
            </Box>

            <Box
              component="button"
              onClick={onViewAllExpenses}
              sx={{
                flex: 1,
                minWidth: 0,
                height: {
                  xs: 30,
                  sm: 32,
                  md: 34,
                  lg: 38,
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.25,
                border: "1px solid #E2E8F0",
                borderRadius: {
                  xs: "7px",
                  sm: "8px",
                  md: "9px",
                  lg: "10px",
                },
                backgroundColor: "#FFFFFF",
                color: "#475569",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: {
                  xs: 7.5,
                  sm: 8,
                  md: 8.5,
                  lg: 10,
                },
                fontWeight: 700,
                transition: "all 0.18s ease",
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: "#F8FAFC",
                  borderColor: "#CBD5E1",
                },
              }}
            >
              View all
              <ArrowForwardRounded
                sx={{
                  fontSize: {
                    xs: 11,
                    sm: 12,
                    md: 13,
                    lg: 15,
                  },
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          ...cardSx,
          gridColumn: {
            xs: "span 3",
            md: "span 1",
          },
          borderColor: "#E1E9E4",
          background: "linear-gradient(135deg, #FFFFFF 0%, #F7FCF8 100%)",
          "&:hover": {
            borderColor: "#CFE5D5",
            boxShadow: "0 6px 18px rgba(15,23,42,0.05)",
          },
          minHeight: {
            xs: 80,
            sm: 95,
            md: 120,
            lg: 130,
          },
        }}
      >
        <Stack
          spacing={{
            xs: 0.75,
            sm: 1,
            md: 1.25,
            lg: 1.5,
          }}
          sx={{
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 0.75,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 9.5,
                    sm: 10.5,
                    md: 11.5,
                    lg: 12.5,
                  },
                  color: "#64748B",
                  fontWeight: 600,
                  whiteSpace: "normal",
                  overflow: "visible",
                  textOverflow: "unset",
                  overflowWrap: "break-word",
                  lineHeight: 1.3,
                }}
              >
                Monthly Budget
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: {
                    xs: 17,
                    sm: 19,
                    md: 21,
                    lg: 25,
                  },
                  fontWeight: 800,
                  color: "#172033",
                  lineHeight: 1.2,
                }}
              >
                £{header.totalBudget.toFixed(0)}
              </Typography>
            </Box>

            <Box
              sx={{
                ...iconBoxSx,
                background: "linear-gradient(135deg, #DCFCE7, #ECFDF5)",
                color: "#16A34A",
                border: "1px solid #D3F0DC",
              }}
            >
              <AccountBalanceWalletRounded
                sx={{
                  fontSize: {
                    xs: 16,
                    sm: 18,
                    md: 20,
                    lg: 23,
                  },
                }}
              />
            </Box>
          </Box>

          <Box
            onClick={onEditBudget}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.2,
              color: "#15803D",
              cursor: "pointer",
              width: "fit-content",
              borderRadius: "8px",
              px: 0.4,
              py: 0.2,
              ml: -0.4,
              mt: "auto",
              minWidth: 0,
              "&:hover": {
                backgroundColor: "#F0FDF4",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 8.5,
                  sm: 9.5,
                  md: 10.5,
                  lg: 12.5,
                },
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Edit budget
            </Typography>

            <ChevronRightRounded
              sx={{
                fontSize: {
                  xs: 12,
                  sm: 14,
                  md: 15,
                  lg: 17,
                },
              }}
            />
          </Box>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          ...cardSx,
          gridColumn: {
            xs: "span 2",
            md: "span 1",
          },
          background: "linear-gradient(135deg, #FFFFFF 0%, #FFFBF7 100%)",
          "&:hover": {
            borderColor: "#EADBCB",
            boxShadow: "0 6px 18px rgba(15,23,42,0.05)",
          },
        }}
      >
        <Stack
          spacing={{
            xs: 0.75,
            sm: 1,
            md: 1.25,
            lg: 1.5,
          }}
          sx={{
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 0.75,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 9.5,
                    sm: 10.5,
                    md: 11.5,
                    lg: 12.5,
                  },
                  color: "#64748B",
                  fontWeight: 600,
                  whiteSpace: "normal",
                  overflow: "visible",
                  textOverflow: "unset",
                  overflowWrap: "break-word",
                  lineHeight: 1.3,
                }}
              >
                Amount Spent
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: {
                    xs: 17,
                    sm: 19,
                    md: 21,
                    lg: 25,
                  },
                  fontWeight: 800,
                  color: "#172033",
                  lineHeight: 1.2,
                }}
              >
                £{header.totalSpent.toFixed(0)}
              </Typography>
            </Box>

            <Box
              sx={{
                ...iconBoxSx,
                backgroundColor: "#FFF4E8",
                color: "#F57C00",
                border: "1px solid #F6E2C9",
              }}
            >
              <AttachMoneyRounded
                sx={{
                  fontSize: {
                    xs: 17,
                    sm: 19,
                    md: 21,
                    lg: 24,
                  },
                }}
              />
            </Box>
          </Box>

          <Stack
            spacing={{
              xs: 0.4,
              sm: 0.5,
              md: 0.6,
              lg: 0.8,
            }}
            sx={{
              mt: "auto",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 8.5,
                  sm: 9.5,
                  md: 10.5,
                  lg: 12,
                },
                color: "#F57C00",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              {header.spentPercentage}% of budget
            </Typography>

            <LinearProgress
              variant="determinate"
              value={Math.min(header.spentPercentage, 100)}
              sx={{
                height: {
                  xs: 4,
                  sm: 5,
                  md: 6,
                  lg: 7,
                },
                borderRadius: "999px",
                backgroundColor: "#FBEBDD",
                "& .MuiLinearProgress-bar": {
                  borderRadius: "999px",
                  backgroundColor: "#F57C00",
                },
              }}
            />
          </Stack>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          ...cardSx,
          gridColumn: {
            xs: "span 2",
            md: "span 1",
          },
          background: "linear-gradient(135deg, #FFFFFF 0%, #F7FAFF 100%)",
          "&:hover": {
            borderColor: "#D4E1F2",
            boxShadow: "0 6px 18px rgba(15,23,42,0.05)",
          },
        }}
      >
        <Stack
          spacing={{
            xs: 0.75,
            sm: 1,
            md: 1.25,
            lg: 1.5,
          }}
          sx={{
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 0.75,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 9.5,
                    sm: 10.5,
                    md: 11.5,
                    lg: 12.5,
                  },
                  color: "#64748B",
                  fontWeight: 600,
                  whiteSpace: "normal",
                  overflow: "visible",
                  textOverflow: "unset",
                  overflowWrap: "break-word",
                  lineHeight: 1.3,
                }}
              >
                Remaining Balance
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: {
                    xs: 17,
                    sm: 19,
                    md: 21,
                    lg: 25,
                  },
                  fontWeight: 800,
                  color: header.remaining < 0 ? "#DC2626" : "#172033",
                  lineHeight: 1.2,
                }}
              >
                £{header.remaining.toFixed(0)}
              </Typography>
            </Box>

            <Box
              sx={{
                ...iconBoxSx,
                backgroundColor: "#EFF6FF",
                color: "#2563EB",
                border: "1px solid #DCE8F8",
              }}
            >
              <PieChartRounded
                sx={{
                  fontSize: {
                    xs: 16,
                    sm: 18,
                    md: 20,
                    lg: 23,
                  },
                }}
              />
            </Box>
          </Box>

          <Stack
            spacing={{
              xs: 0.4,
              sm: 0.5,
              md: 0.6,
              lg: 0.8,
            }}
            sx={{
              mt: "auto",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 8.5,
                  sm: 9.5,
                  md: 10.5,
                  lg: 12,
                },
                color: header.remaining < 0 ? "#DC2626" : "#2563EB",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              {header.remainingPercentage}% left
            </Typography>

            <LinearProgress
              variant="determinate"
              value={Math.min(Math.max(header.remainingPercentage, 0), 100)}
              sx={{
                height: {
                  xs: 4,
                  sm: 5,
                  md: 6,
                  lg: 7,
                },
                borderRadius: "999px",
                backgroundColor: "#E8F0FA",
                "& .MuiLinearProgress-bar": {
                  borderRadius: "999px",
                  backgroundColor: header.remaining < 0 ? "#EF4444" : "#2563EB",
                },
              }}
            />
          </Stack>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          ...cardSx,
          gridColumn: {
            xs: "span 2",
            md: "span 1",
          },
          background: "linear-gradient(135deg, #FFFFFF 0%, #FBF7FF 100%)",
          "&:hover": {
            borderColor: "#E5D9EF",
            boxShadow: "0 6px 18px rgba(15,23,42,0.05)",
          },
        }}
      >
        <Stack
          spacing={{
            xs: 0.75,
            sm: 1,
            md: 1.25,
            lg: 1.5,
          }}
          sx={{
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 0.75,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 9.5,
                    sm: 10.5,
                    md: 11.5,
                    lg: 12.5,
                  },
                  color: "#64748B",
                  fontWeight: 600,
                  whiteSpace: "normal",
                  overflow: "visible",
                  textOverflow: "unset",
                  overflowWrap: "break-word",
                  lineHeight: 1.3,
                }}
              >
                Savings Goal
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: {
                    xs: 17,
                    sm: 19,
                    md: 21,
                    lg: 25,
                  },
                  fontWeight: 800,
                  color: "#172033",
                  lineHeight: 1.2,
                }}
              >
                £{header.savingsGoal.toFixed(0)}
              </Typography>
            </Box>

            <Box
              sx={{
                ...iconBoxSx,
                backgroundColor: "#F7EDFF",
                color: "#8E24AA",
                border: "1px solid #EBDDF5",
              }}
            >
              <SavingsRounded
                sx={{
                  fontSize: {
                    xs: 16,
                    sm: 18,
                    md: 20,
                    lg: 23,
                  },
                }}
              />
            </Box>
          </Box>

          <Typography
            sx={{
              fontSize: {
                xs: 8.5,
                sm: 9.5,
                md: 10.5,
                lg: 12,
              },
              color: "#8E24AA",
              fontWeight: 700,
              mt: "auto",
              whiteSpace: "nowrap",
            }}
          >
            Monthly target
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default StatsCards;
