import {
  AddRounded,
  AutoAwesomeRounded,
  CalendarMonthRounded,
  DeleteOutlineRounded,
  EditRounded,
  ReceiptLongRounded,
} from "@mui/icons-material";

import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import type { Bill } from "../../../../../types/features/budget";
import type { Lookup } from "../../../../../types/core/common/Lookup";

import { getAppIcon } from "../../../../../utils/appIcons";

interface BillListProps {
  bills: Bill[];
  selectedBillId?: number;
  paymentMethods: Lookup[];
  onSelectBill: (bill: Bill) => void;
  onDeleteBill: (billId: number) => void;
  onAddBill: () => void;
}

const BillList = ({
  bills,
  selectedBillId,
  paymentMethods,
  onSelectBill,
  onDeleteBill,
  onAddBill,
}: BillListProps) => {
  const formatDueDate = (value: string) => {
    if (!value) {
      return "No due date";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getPaymentMethod = (paymentMethodId?: number) => {
    if (!paymentMethodId || paymentMethodId === -1) {
      return null;
    }

    return paymentMethods.find(
      (method) => method.id === paymentMethodId,
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: {
          xs: "auto",
          lg: "100%",
        },
        minHeight: {
          xs: 0,
          lg: 640,
        },
        border: "1px solid",
        borderColor: "#b9ebc8",
        borderRadius: 1.5,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(145deg, #F5FAFF 0%, #F8FBFF 48%, #F4FAF7 100%)",
      }}
    >
      <Box
        sx={{
          px: {
            xs: 1.75,
            sm: 2.5,
          },
          py: {
            xs: 1.75,
            sm: 2.5,
          },
          borderBottom: "1px solid #E6EDF4",
          backgroundColor: "rgba(255,255,255,0.72)",
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
          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 17,
                  sm: 19,
                },
                fontWeight: 800,
                color: "#172033",
                lineHeight: 1.25,
              }}
            >
              Your Bills
            </Typography>

            <Typography
              sx={{
                mt: 0.45,
                fontSize: {
                  xs: 11.5,
                  sm: 12.5,
                },
                color: "#64748B",
              }}
            >
              {bills.length === 0
                ? "No recurring payments yet"
                : `${bills.length} recurring ${
                    bills.length === 1
                      ? "payment"
                      : "payments"
                  }`}
            </Typography>
          </Box>

          <Button
            startIcon={<AddRounded />}
            onClick={onAddBill}
            sx={{
              minWidth: "auto",
              px: {
                xs: 1.25,
                sm: 1.5,
              },
              py: {
                xs: 0.7,
                sm: 0.85,
              },
              borderRadius: 1,
              backgroundColor: "#ECFDF3",
              color: "#15803D",
              textTransform: "none",
              fontWeight: 700,
              fontSize: {
                xs: 12,
                sm: 13,
              },
              boxShadow: "none",

              "&:hover": {
                backgroundColor: "#DCFCE7",
                boxShadow: "none",
              },
            }}
          >
            Add Bill
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          flex: {
            xs: "none",
            lg: 1,
          },
          overflowY: {
            xs: "visible",
            lg: "auto",
          },
          p: {
            xs: 1,
            sm: 1.5,
            lg: 1.75,
          },
          backgroundColor: "transparent",
        }}
      >
        {bills.length === 0 ? (
          <Box
            sx={{
              minHeight: {
                xs: 190,
                sm: 220,
                md: 240,
                lg: 450,
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: {
                xs: 2,
                sm: 3,
              },
            }}
          >
            <Box>
              <Box
                sx={{
                  width: {
                    xs: 52,
                    sm: 64,
                  },
                  height: {
                    xs: 52,
                    sm: 64,
                  },
                  mx: "auto",
                  borderRadius: 2,
                  backgroundColor: "#ECFDF3",
                  color: "#16A34A",
                  display: "grid",
                  placeItems: "center",
                  mb: {
                    xs: 1.25,
                    sm: 2,
                  },
                }}
              >
                <ReceiptLongRounded
                  sx={{
                    fontSize: {
                      xs: 25,
                      sm: 30,
                    },
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: {
                    xs: 14.5,
                    sm: 16,
                  },
                  fontWeight: 800,
                  color: "#172033",
                }}
              >
                No bills yet
              </Typography>

              <Typography
                sx={{
                  mt: 0.7,
                  fontSize: {
                    xs: 11.5,
                    sm: 13,
                  },
                  color: "#64748B",
                  lineHeight: 1.6,
                  maxWidth: 250,
                }}
              >
                Add recurring payments such as rent,
                subscriptions or utilities to keep them
                organised.
              </Typography>
            </Box>
          </Box>
        ) : (
          bills.map((bill) => {
            const selected =
              bill.billId === selectedBillId;

            const paymentMethod =
              getPaymentMethod(
                bill.paymentMethodId,
              );

            const paymentColor =
              paymentMethod?.color || "#64748B";

            return (
              <Paper
                key={bill.billId}
                elevation={0}
                onClick={() =>
                  onSelectBill(bill)
                }
                sx={{
                  mb: 1.25,
                  p: 1.75,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: selected
                    ? "#86EFAC"
                    : "#E1EAF2",
                  background: selected
                    ? "linear-gradient(135deg, #F0FDF4 0%, #F7FCF8 100%)"
                    : "#FFFFFF",
                  cursor: "pointer",
                  transition:
                    "all 0.2s ease",
                  boxShadow: selected
                    ? "0 4px 16px rgba(34,197,94,0.10)"
                    : "0 2px 8px rgba(15,23,42,0.025)",

                  "&:hover": {
                    borderColor: selected
                      ? "#4ADE80"
                      : "#CBD5E1",
                    transform:
                      "translateY(-1px)",
                    boxShadow: selected
                      ? "0 8px 22px rgba(34,197,94,0.12)"
                      : "0 8px 22px rgba(15,23,42,0.07)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems:
                      "flex-start",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "space-between",
                        gap: 1.5,
                        pr: 0.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 15.5,
                          fontWeight: 800,
                          color: "#172033",
                          whiteSpace:
                            "nowrap",
                          overflow:
                            "hidden",
                          textOverflow:
                            "ellipsis",
                        }}
                      >
                        {bill.name}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 16,
                          fontWeight: 800,
                          color: "#172033",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        £
                        {bill.amount.toFixed(
                          2,
                        )}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        mt: 0.65,
                        display: "flex",
                        alignItems:
                          "center",
                        gap: 0.65,
                      }}
                    >
                      <CalendarMonthRounded
                        sx={{
                          fontSize: 15,
                          color: "#64748B",
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#64748B",
                        }}
                      >
                        Due{" "}
                        {formatDueDate(
                          bill.dueDate,
                        )}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        mt: 1.1,
                        display: "flex",
                        alignItems:
                          "center",
                        gap: 0.65,
                        flexWrap:
                          "wrap",
                      }}
                    >
                      <Box
                        sx={{
                          px: 1,
                          py: 0.4,
                          borderRadius:
                            "999px",
                          backgroundColor:
                            "#F1F5F9",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize:
                              10.5,
                            fontWeight:
                              700,
                            color:
                              "#64748B",
                          }}
                        >
                          {
                            bill.frequencyName
                          }
                        </Typography>
                      </Box>

                      {paymentMethod && (
                        <Box
                          sx={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: 0.5,
                            px: 1,
                            py: 0.4,
                            borderRadius:
                              "999px",
                            backgroundColor:
                              `${paymentColor}14`,
                          }}
                        >
                          <Box
                            sx={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              color:
                                paymentColor,

                              "& svg": {
                                fontSize: 13,
                              },
                            }}
                          >
                            {getAppIcon(
                              paymentMethod.icon ||
                                "wallet",
                            )}
                          </Box>

                          <Typography
                            sx={{
                              fontSize:
                                10.5,
                              fontWeight:
                                700,
                              color:
                                paymentColor,
                            }}
                          >
                            {
                              paymentMethod.name
                            }
                          </Typography>
                        </Box>
                      )}

                      {bill.autoAddExpense && (
                        <Box
                          sx={{
                            px: 1,
                            py: 0.4,
                            borderRadius:
                              "999px",
                            backgroundColor:
                              "#ECFDF3",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: 0.4,
                          }}
                        >
                          <AutoAwesomeRounded
                            sx={{
                              fontSize: 12,
                              color:
                                "#16A34A",
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize:
                                10.5,
                              fontWeight:
                                700,
                              color:
                                "#15803D",
                            }}
                          >
                            Auto expense
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: 0.25,
                      flexShrink: 0,
                    }}
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    <IconButton
                      size="small"
                      onClick={() =>
                        onSelectBill(
                          bill,
                        )
                      }
                      sx={{
                        width: 30,
                        height: 30,
                        color:
                          "#64748B",

                        "&:hover": {
                          backgroundColor:
                            "#F0FDF4",
                          color:
                            "#15803D",
                        },
                      }}
                    >
                      <EditRounded
                        sx={{
                          fontSize: 17,
                        }}
                      />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() =>
                        onDeleteBill(
                          bill.billId,
                        )
                      }
                      sx={{
                        width: 30,
                        height: 30,
                        color:
                          "#EF4444",

                        "&:hover": {
                          backgroundColor:
                            "#FEF2F2",
                        },
                      }}
                    >
                      <DeleteOutlineRounded
                        sx={{
                          fontSize: 17,
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            );
          })
        )}
      </Box>
    </Paper>
  );
};

export default BillList;