import {
  ArrowForwardRounded,
  CalendarMonthRounded,
  ReceiptLongRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type { Bill } from "../../../../types/features/budget";

interface UpcomingBillsProps {
  bills: Bill[];
  onManageBills: () => void;
}

const UpcomingBills = ({
  bills,
  onManageBills,
}: UpcomingBillsProps) => {
  const getDay = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
    });
  };

  const getMonth = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      month: "short",
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 1.25,
          sm: 2.5,
        },
        border: "1px solid #bee3ca",
        borderRadius: {
          xs: "13px",
          sm: "16px",
        },
        background:
          "linear-gradient(135deg, #FFFFFF 0%, #F3FAF5 45%, #E8F6EC 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: {
            xs: 1,
            sm: 2,
          },
          mb: {
            xs: 1.5,
            sm: 2.5,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              xs: 0.9,
              sm: 1.5,
            },
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: {
                xs: 34,
                sm: 42,
              },
              height: {
                xs: 34,
                sm: 42,
              },
              flexShrink: 0,
              borderRadius: {
                xs: "10px",
                sm: "12px",
              },
              bgcolor: "#EEF8F0",
              color: "#2E6F57",
              display: "grid",
              placeItems: "center",
            }}
          >
            <ReceiptLongRounded
              sx={{
                fontSize: {
                  xs: 18,
                  sm: 22,
                },
              }}
            />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: {
                  xs: 15,
                  sm: 18,
                },
                lineHeight: 1.2,
                color: "#172033",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Upcoming Bills
            </Typography>

            <Typography
              sx={{
                color: "#64748B",
                fontSize: {
                  xs: 10.5,
                  sm: 12.5,
                },
                mt: {
                  xs: 0.25,
                  sm: 0.35,
                },
                lineHeight: 1.3,
              }}
            >
              {bills.length === 0
                ? "No bills scheduled"
                : `${bills.length} upcoming ${
                    bills.length === 1 ? "bill" : "bills"
                  }`}
            </Typography>
          </Box>
        </Box>

        <Button
          size="small"
          onClick={onManageBills}
          endIcon={<ArrowForwardRounded />}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            minWidth: 0,
            flexShrink: 0,
            px: {
              xs: 0.6,
              sm: 1,
            },
            py: {
              xs: 0.4,
              sm: 0.6,
            },
            fontSize: {
              xs: 10,
              sm: 13,
            },
            color: "#15803D",
            borderRadius: {
              xs: "7px",
              sm: "9px",
            },

            "& .MuiButton-endIcon": {
              marginLeft: {
                xs: 0.2,
                sm: 0.5,
              },
              "& svg": {
                fontSize: {
                  xs: 14,
                  sm: 18,
                },
              },
            },

            "&:hover": {
              backgroundColor: "#F0FDF4",
            },
          }}
        >
          Manage Bills
        </Button>
      </Box>

      {bills.length === 0 ? (
        <Box
          sx={{
            minHeight: {
              xs: 115,
              sm: 145,
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: {
              xs: "10px",
              sm: "13px",
            },
            background:
              "linear-gradient(135deg, #F8FAF9 0%, #F1F7F3 100%)",
            border: "1px dashed #D7E4DB",
            px: {
              xs: 1.5,
              sm: 3,
            },
          }}
        >
          <Box
            sx={{
              width: {
                xs: 38,
                sm: 48,
              },
              height: {
                xs: 38,
                sm: 48,
              },
              borderRadius: {
                xs: "11px",
                sm: "14px",
              },
              display: "grid",
              placeItems: "center",
              backgroundColor: "#EAF5ED",
              color: "#2E6F57",
              mb: {
                xs: 0.75,
                sm: 1.25,
              },
            }}
          >
            <CalendarMonthRounded
              sx={{
                fontSize: {
                  xs: 20,
                  sm: 25,
                },
              }}
            />
          </Box>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: 12,
                sm: 14,
              },
              color: "#172033",
            }}
          >
            No upcoming bills
          </Typography>

          <Typography
            sx={{
              color: "#64748B",
              fontSize: {
                xs: 10.5,
                sm: 12.5,
              },
              mt: {
                xs: 0.35,
                sm: 0.5,
              },
              lineHeight: 1.35,
              maxWidth: {
                xs: 280,
                sm: "none",
              },
            }}
          >
            Add your recurring bills to keep track of upcoming payments.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={0}>
          {bills.map((bill, index) => (
            <Box key={bill.billId}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: {
                    xs: 0.8,
                    sm: 1.5,
                  },
                  py: {
                    xs: 0.85,
                    sm: 1.25,
                  },
                  px: {
                    xs: 0.25,
                    sm: 0.5,
                  },
                  borderRadius: {
                    xs: "9px",
                    sm: "11px",
                  },
                  transition: "background-color 0.18s ease",

                  "&:hover": {
                    backgroundColor: "#F8FBF9",
                  },
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: 39,
                      sm: 48,
                    },
                    height: {
                      xs: 44,
                      sm: 52,
                    },
                    flexShrink: 0,
                    borderRadius: {
                      xs: "9px",
                      sm: "12px",
                    },
                    backgroundColor: "#F1F5F3",
                    border: "1px solid #E3EBE6",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 15,
                        sm: 18,
                      },
                      fontWeight: 800,
                      lineHeight: 1,
                      color: "#172033",
                    }}
                  >
                    {getDay(bill.dueDate)}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: 8.5,
                        sm: 10,
                      },
                      fontWeight: 700,
                      color: "#64748B",
                      textTransform: "uppercase",
                      mt: {
                        xs: 0.35,
                        sm: 0.5,
                      },
                    }}
                  >
                    {getMonth(bill.dueDate)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        xs: 12.5,
                        sm: 14.5,
                      },
                      color: "#172033",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {bill.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: {
                        xs: 0.5,
                        sm: 0.75,
                      },
                      mt: {
                        xs: 0.35,
                        sm: 0.6,
                      },
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 9.5,
                          sm: 11.5,
                        },
                        color: "#64748B",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {bill.userBudgetCategoryName}
                    </Typography>

                    {bill.frequencyName && (
                      <>
                        <Box
                          sx={{
                            width: 3,
                            height: 3,
                            flexShrink: 0,
                            borderRadius: "50%",
                            bgcolor: "#94A3B8",
                          }}
                        />

                        <Typography
                          sx={{
                            fontSize: {
                              xs: 9.5,
                              sm: 11.5,
                            },
                            color: "#64748B",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {bill.frequencyName}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>

                <Box
                  sx={{
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: {
                        xs: 13,
                        sm: 16,
                      },
                      color: "#172033",
                    }}
                  >
                    £{bill.amount.toFixed(2)}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: 8.5,
                        sm: 10.5,
                      },
                      color: "#64748B",
                      mt: {
                        xs: 0.15,
                        sm: 0.25,
                      },
                      maxWidth: {
                        xs: 65,
                        sm: "none",
                      },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {bill.paymentMethodName}
                  </Typography>
                </Box>
              </Box>

              {index < bills.length - 1 && (
                <Divider
                  sx={{
                    ml: {
                      xs: 5,
                      sm: 6.5,
                    },
                    borderColor: "#E8EFEB",
                  }}
                />
              )}
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  );
};

export default UpcomingBills;