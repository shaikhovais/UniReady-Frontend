import {
  AddRounded,
  ArrowForwardRounded,
  AttachMoneyRounded,
  CalendarMonthRounded,
  EditRounded,
  PaymentsRounded,
  ReceiptLongRounded,
  SavingsRounded,
  WalletRounded,
} from "@mui/icons-material";

import { Box, Button, Typography } from "@mui/material";

import type {
  BudgetOverview,
  RecentPayment,
  UpcomingBill,
} from "../../../../types/features/dashboard";

interface BudgetPlannerCardProps {
  budget: BudgetOverview;
  recentPayments: RecentPayment[];
  upcomingBills: UpcomingBill[];
  onViewPayments: () => void;
  onViewBills: () => void;
  onAddExpense: () => void;
  onEditBudget: () => void;
}

const BudgetPlannerCard = ({
  budget,
  recentPayments,
  upcomingBills,
  onViewPayments,
  onViewBills,
  onAddExpense,
  onEditBudget,
}: BudgetPlannerCardProps) => {
  const spentPercentage = Math.min(
    Math.max(budget.spentPercentage, 0),
    100,
  );

  const isBudgetHealthy =
    budget.remaining >= 0 && spentPercentage < 90;

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
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
            xs: 170,
            sm: 250,
          },
          height: {
            xs: 170,
            sm: 250,
          },
          borderRadius: "50%",
          top: -120,
          right: -110,
          background:
            "linear-gradient(135deg, rgba(22, 128, 75, 0.16), rgba(22, 128, 75, 0.02))",
          zIndex: -1,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: {
            xs: 150,
            sm: 220,
          },
          height: {
            xs: 150,
            sm: 220,
          },
          borderRadius: "50%",
          bottom: -120,
          left: -110,
          background:
            "linear-gradient(315deg, rgba(22, 128, 75, 0.11), rgba(22, 128, 75, 0.015))",
          zIndex: -1,
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          p: {
            xs: 1.75,
            sm: 2.5,
            md: 2.75,
          },
          position: "relative",
          zIndex: 1,
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "minmax(0, 1fr) auto",
            },
            gap: {
              xs: 1.5,
              sm: 2,
            },
            alignItems: "center",
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
                width: {
                  xs: 36,
                  sm: 40,
                },
                height: {
                  xs: 36,
                  sm: 40,
                },
                flexShrink: 0,
                borderRadius: 1.75,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(22, 128, 75, 0.09)",
                color: "success.dark",
              }}
            >
              <WalletRounded
                sx={{
                  fontSize: {
                    xs: 19,
                    sm: 21,
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "0.8rem",
                    sm: "0.84rem",
                  },
                  lineHeight: 1.25,
                  fontWeight: 800,
                  color: "text.primary",
                }}
              >
                Budget Planner
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: {
                    xs: "0.63rem",
                    sm: "0.68rem",
                  },
                  lineHeight: 1.4,
                  color: "text.secondary",
                }}
              >
                Stay on top of your monthly spending
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                sm: "auto auto",
              },
              gap: 0.75,
              minWidth: 0,
            }}
          >
            <Button
              onClick={onEditBudget}
              startIcon={
                <EditRounded
                  sx={{
                    fontSize: "15px !important",
                  }}
                />
              }
              sx={{
                minWidth: 0,
                px: {
                  xs: 1,
                  sm: 1.5,
                },
                py: 0.7,
                borderRadius: 1,
                textTransform: "none",
                fontSize: {
                  xs: "0.62rem",
                  sm: "0.66rem",
                },
                fontWeight: 800,
                color: "success.dark",
                backgroundColor: "rgba(22, 128, 75, 0.045)",
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: "rgba(22, 128, 75, 0.09)",
                },
              }}
            >
              Edit budget
            </Button>

            <Button
              onClick={onAddExpense}
              startIcon={
                <AddRounded
                  sx={{
                    fontSize: "16px !important",
                  }}
                />
              }
              variant="contained"
              sx={{
                minWidth: 0,
                px: {
                  xs: 1,
                  sm: 1.5,
                },
                py: 0.7,
                borderRadius: 1,
                textTransform: "none",
                fontSize: {
                  xs: "0.62rem",
                  sm: "0.66rem",
                },
                fontWeight: 800,
                backgroundColor: "success.main",
                boxShadow: "none",
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: "success.dark",
                  boxShadow: "none",
                },
              }}
            >
              Add expense
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            mt: {
              xs: 1.75,
              sm: 2.25,
            },
            p: {
              xs: 1.5,
              sm: 2,
            },
            borderRadius: 1.5,
            border: "1px solid",
            borderColor: "rgba(22, 128, 75, 0.1)",
            background:
              "linear-gradient(135deg, rgba(22, 128, 75, 0.075), rgba(22, 128, 75, 0.025))",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr) auto",
                sm: "minmax(0, 1fr) auto",
              },
              gap: 1.5,
              alignItems: "start",
            }}
          >
            <Box
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.64rem",
                  fontWeight: 700,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
              >
                Monthly budget
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: {
                    xs: "1.35rem",
                    sm: "1.6rem",
                  },
                  lineHeight: 1.15,
                  fontWeight: 850,
                  color: "text.primary",
                }}
              >
                £{budget.monthlyBudget.toFixed(2)}
              </Typography>
            </Box>

            <Box
              sx={{
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.62rem",
                  color: "text.secondary",
                }}
              >
                Remaining
              </Typography>

              <Typography
                sx={{
                  mt: 0.2,
                  fontSize: {
                    xs: "0.88rem",
                    sm: "0.95rem",
                  },
                  fontWeight: 850,
                  color:
                    budget.remaining >= 0
                      ? "success.dark"
                      : "error.main",
                }}
              >
                £{budget.remaining.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 0.8,
              display: "flex",
              alignItems: "flex-start",
              gap: 0.5,
              minWidth: 0,
            }}
          >
            <WalletRounded
              sx={{
                mt: 0.05,
                flexShrink: 0,
                fontSize: 14,
                color: isBudgetHealthy
                  ? "success.main"
                  : "error.main",
              }}
            />

            <Typography
              sx={{
                minWidth: 0,
                fontSize: {
                  xs: "0.59rem",
                  sm: "0.62rem",
                },
                lineHeight: 1.4,
                fontWeight: 700,
                color: isBudgetHealthy
                  ? "success.dark"
                  : "error.main",
              }}
            >
              {isBudgetHealthy
                ? "Your spending is currently on track"
                : "Keep an eye on your spending this month"}
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.62rem",
                color: "text.secondary",
              }}
            >
              £{budget.spent.toFixed(2)} spent
            </Typography>

            <Typography
              sx={{
                fontSize: "0.62rem",
                fontWeight: 800,
                color:
                  spentPercentage >= 90
                    ? "error.main"
                    : "success.dark",
              }}
            >
              {spentPercentage}% used
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 0.65,
              width: "100%",
              height: 7,
              borderRadius: 999,
              backgroundColor: "rgba(20, 45, 35, 0.08)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${spentPercentage}%`,
                height: "100%",
                borderRadius: 999,
                backgroundColor:
                  spentPercentage >= 90
                    ? "error.main"
                    : "success.main",
                transition: "width 0.3s ease",
              }}
            />
          </Box>

          <Box
            sx={{
              mt: 1.5,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                sm: "repeat(3, 1fr)",
              },
              gap: {
                xs: 1.25,
                sm: 1,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.65,
                minWidth: 0,
              }}
            >
              <AttachMoneyRounded
                sx={{
                  flexShrink: 0,
                  fontSize: 16,
                  color: "success.main",
                }}
              />

              <Box
                sx={{
                  minWidth: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.57rem",
                    color: "text.secondary",
                  }}
                >
                  Spent
                </Typography>

                <Typography
                  sx={{
                    mt: 0.1,
                    fontSize: "0.67rem",
                    fontWeight: 800,
                    color: "text.primary",
                  }}
                >
                  £{budget.spent.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.65,
                minWidth: 0,
              }}
            >
              <SavingsRounded
                sx={{
                  flexShrink: 0,
                  fontSize: 16,
                  color: "success.main",
                }}
              />

              <Box
                sx={{
                  minWidth: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.57rem",
                    color: "text.secondary",
                  }}
                >
                  Savings goal
                </Typography>

                <Typography
                  sx={{
                    mt: 0.1,
                    fontSize: "0.67rem",
                    fontWeight: 800,
                    color: "text.primary",
                  }}
                >
                  £{budget.savingsGoal.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: {
                  xs: "flex",
                  sm: "flex",
                },
                alignItems: "center",
                gap: 0.65,
                minWidth: 0,
                gridColumn: {
                  xs: "1 / -1",
                  sm: "auto",
                },
              }}
            >
              <Box
                sx={{
                  width: 26,
                  height: 26,
                  flexShrink: 0,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isBudgetHealthy
                    ? "rgba(22, 128, 75, 0.09)"
                    : "rgba(211, 47, 47, 0.08)",
                  color: isBudgetHealthy
                    ? "success.main"
                    : "error.main",
                }}
              >
                <WalletRounded
                  sx={{
                    fontSize: 14,
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
                    fontSize: "0.57rem",
                    color: "text.secondary",
                  }}
                >
                  Status
                </Typography>

                <Typography
                  sx={{
                    mt: 0.1,
                    fontSize: "0.67rem",
                    fontWeight: 800,
                    color: isBudgetHealthy
                      ? "success.dark"
                      : "error.main",
                  }}
                >
                  {isBudgetHealthy
                    ? "On track"
                    : "Watch spending"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            mt: {
              xs: 1.75,
              sm: 2.25,
            },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: {
              xs: 1.75,
              md: 2,
            },
          }}
        >
          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.7,
                  minWidth: 0,
                }}
              >
                <PaymentsRounded
                  sx={{
                    flexShrink: 0,
                    fontSize: 17,
                    color: "success.dark",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    color: "text.primary",
                  }}
                >
                  Recent payments
                </Typography>
              </Box>

              <Button
                onClick={onViewPayments}
                endIcon={
                  <ArrowForwardRounded
                    sx={{
                      fontSize: "13px !important",
                    }}
                  />
                }
                sx={{
                  minWidth: 0,
                  px: 1,
                  py: 0.3,
                  flexShrink: 0,
                  borderRadius: 1,
                  textTransform: "none",
                  fontSize: "0.61rem",
                  fontWeight: 800,
                  color: "success.dark",
                  "&:hover": {
                    backgroundColor: "rgba(22, 128, 75, 0.08)",
                    color: "success.dark",
                  },
                }}
              >
                View all
              </Button>
            </Box>

            <Box
              sx={{
                mt: 0.9,
                p: {
                  xs: 1,
                  sm: 1.25,
                },
                borderRadius: 1,
                border: "1px solid",
                borderColor: "rgba(20, 45, 35, 0.07)",
                backgroundColor: "rgba(20, 45, 35, 0.018)",
              }}
            >
              {recentPayments.length === 0 ? (
                <Box
                  sx={{
                    minHeight: 82,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.6,
                  }}
                >
                  <ReceiptLongRounded
                    sx={{
                      fontSize: 20,
                      color: "text.disabled",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: "0.64rem",
                      color: "text.secondary",
                    }}
                  >
                    No recent payments
                  </Typography>
                </Box>
              ) : (
                <Box>
                  {recentPayments.map((payment, index) => (
                    <Box
                      key={payment.id}
                      sx={{
                        py: 0.85,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                        borderBottom:
                          index < recentPayments.length - 1
                            ? "1px solid rgba(20, 45, 35, 0.06)"
                            : "none",
                      }}
                    >
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          flexShrink: 0,
                          borderRadius: 1.25,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor:
                            "rgba(22, 128, 75, 0.08)",
                          color: "success.dark",
                        }}
                      >
                        <ReceiptLongRounded
                          sx={{
                            fontSize: 15,
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          minWidth: 0,
                          flex: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.65rem",
                            fontWeight: 750,
                            color: "text.primary",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {payment.name}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.1,
                            fontSize: "0.56rem",
                            color: "text.secondary",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {payment.categoryName} · {payment.expenseDate}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          flexShrink: 0,
                          fontSize: "0.65rem",
                          fontWeight: 800,
                          color: "text.primary",
                        }}
                      >
                        £{payment.amount.toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.7,
                  minWidth: 0,
                }}
              >
                <CalendarMonthRounded
                  sx={{
                    flexShrink: 0,
                    fontSize: 17,
                    color: "success.dark",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    color: "text.primary",
                  }}
                >
                  Upcoming bills
                </Typography>
              </Box>

              <Button
                onClick={onViewBills}
                endIcon={
                  <ArrowForwardRounded
                    sx={{
                      fontSize: "13px !important",
                    }}
                  />
                }
                sx={{
                  minWidth: 0,
                  px: 1,
                  py: 0.3,
                  flexShrink: 0,
                  borderRadius: 1,
                  textTransform: "none",
                  fontSize: "0.61rem",
                  fontWeight: 800,
                  color: "success.dark",
                  "&:hover": {
                    backgroundColor: "rgba(22, 128, 75, 0.08)",
                    color: "success.dark",
                  },
                }}
              >
                View all
              </Button>
            </Box>

            <Box
              sx={{
                mt: 0.9,
                p: {
                  xs: 1,
                  sm: 1.25,
                },
                borderRadius: 1,
                border: "1px solid",
                borderColor: "rgba(20, 45, 35, 0.07)",
                backgroundColor: "rgba(20, 45, 35, 0.018)",
              }}
            >
              {upcomingBills.length === 0 ? (
                <Box
                  sx={{
                    minHeight: 82,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.6,
                  }}
                >
                  <CalendarMonthRounded
                    sx={{
                      fontSize: 20,
                      color: "text.disabled",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: "0.64rem",
                      color: "text.secondary",
                    }}
                  >
                    No upcoming bills
                  </Typography>
                </Box>
              ) : (
                <Box>
                  {upcomingBills.map((bill, index) => (
                    <Box
                      key={bill.id}
                      sx={{
                        py: 0.85,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                        borderBottom:
                          index < upcomingBills.length - 1
                            ? "1px solid rgba(20, 45, 35, 0.06)"
                            : "none",
                      }}
                    >
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          flexShrink: 0,
                          borderRadius: 1.25,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor:
                            "rgba(22, 128, 75, 0.08)",
                          color: "success.dark",
                        }}
                      >
                        <CalendarMonthRounded
                          sx={{
                            fontSize: 15,
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          minWidth: 0,
                          flex: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.65rem",
                            fontWeight: 750,
                            color: "text.primary",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {bill.name}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.1,
                            fontSize: "0.56rem",
                            color: "text.secondary",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {bill.categoryName} · {bill.frequency}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          flexShrink: 0,
                          textAlign: "right",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.65rem",
                            fontWeight: 800,
                            color: "text.primary",
                          }}
                        >
                          £{bill.amount.toFixed(2)}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.1,
                            fontSize: "0.54rem",
                            color: "text.secondary",
                          }}
                        >
                          {bill.dueDate}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetPlannerCard;