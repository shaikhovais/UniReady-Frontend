import { useEffect, useState } from "react";

import {
  CloseRounded,
  ReceiptLongRounded,
  SavingsRounded,
} from "@mui/icons-material";

import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import BudgetCategoriesTab from "./BudgetCategoriesTab";
import BillsTab from "./BillsTab";

import type {
  Bill,
  BudgetOverview,
  GetBudgetResponse,
  SaveBillRequest,
  SaveBudgetRequest,
} from "../../../../../types/features/budget";
import type { Lookup } from "../../../../../types/core/common/Lookup";

export type ManageBudgetTab = "budget" | "bills";

interface ManageBudgetDialogProps {
  open: boolean;
  initialTab: ManageBudgetTab;
  budget: GetBudgetResponse;
  overview: BudgetOverview;
  onClose: () => void;
  onSaveBudget: (request: SaveBudgetRequest) => Promise<void>;
  bills: Bill[];
  paymentMethods: Lookup[];
  billFrequencies: Lookup[];
  onSaveBill: (request: SaveBillRequest) => Promise<void>;
  onDeleteBill: (billId: number) => Promise<void>;
}

const ManageBudgetDialog = ({
  open,
  initialTab,
  budget,
  overview,
  onClose,
  onSaveBudget,
  bills,
  paymentMethods,
  billFrequencies,
  onSaveBill,
  onDeleteBill,
}: ManageBudgetDialogProps) => {
  const [activeTab, setActiveTab] = useState<ManageBudgetTab>("budget");

  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
    }
  }, [open, initialTab]);

  const isBudgetTab = activeTab === "budget";
  const isBillsTab = activeTab === "bills";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={{
        "& .MuiDialog-container": {
          p: {
            xs: 1,
            sm: 2,
          },
        },

        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: 1080,
          height: {
            xs: "94vh",
            sm: "88vh",
          },
          maxHeight: "920px",
          margin: 0,
          borderRadius: {
            xs: "18px",
            sm: "22px",
          },
          overflow: "hidden",
          border: "1px solid #E1E9E4",
          boxShadow: "0 24px 70px rgba(15, 23, 42, 0.16)",
          backgroundColor: "#F8FBF9",
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: {
            xs: "auto",
            sm: "hidden",
          },
          background:
            "linear-gradient(145deg, #F7FBF8 0%, #F8FBFF 52%, #F3FAF6 100%)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            flexShrink: 0,
            px: {
              xs: 2,
              sm: 3,
            },
            pt: {
              xs: 2,
              sm: 2.5,
            },
            pb: {
              xs: 1.75,
              sm: 2.25,
            },
            borderBottom: "1px solid #E1E9E4",
            background:
              "linear-gradient(135deg, #F1FAF4 0%, #FFFFFF 58%, #F6FBF8 100%)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              backgroundColor: "#E4F4E9",
              opacity: 0.55,
              right: -85,
              top: -110,
              pointerEvents: "none",
            }}
          />

          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 18,
                    sm: 20,
                  },
                  fontWeight: 800,
                  color: "#172033",
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                }}
              >
                Manage Budget
              </Typography>

              <Typography
                sx={{
                  mt: 0.55,
                  fontSize: {
                    xs: 12.5,
                    sm: 13,
                  },
                  color: "#64748B",
                  lineHeight: 1.5,
                  maxWidth: 650,
                }}
              >
                Manage your monthly budget, spending categories and recurring
                bills.
              </Typography>
            </Box>

            <IconButton
              onClick={onClose}
              sx={{
                width: 36,
                height: 36,
                flexShrink: 0,
                color: "#64748B",
                border: "1px solid #E2E8E5",
                backgroundColor: "#FFFFFF",
                borderRadius: "11px",
                transition: "all 0.18s ease",

                "&:hover": {
                  color: "#172033",
                  backgroundColor: "#F8FAF9",
                  borderColor: "#CBD9D0",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <CloseRounded sx={{ fontSize: 19 }} />
            </IconButton>
          </Box>

          <Stack
            direction="row"
            spacing={{
              xs: 0.8,
              sm: 1.25,
            }}
            sx={{
              position: "relative",
              mt: 2,
              width: "100%",
            }}
          >
            <Paper
              elevation={0}
              onClick={() => setActiveTab("budget")}
              sx={{
                flex: 1,
                minWidth: 0,
                px: {
                  xs: 1,
                  sm: 2,
                },
                py: {
                  xs: 1,
                  sm: 1.5,
                },
                cursor: "pointer",
                borderRadius: {
                  xs: "12px",
                  sm: "15px",
                },
                border: "1px solid",
                borderColor: isBudgetTab ? "#86D49B" : "#E1E8E4",
                background: isBudgetTab
                  ? "linear-gradient(135deg, #F0FDF4 0%, #F8FFFA 100%)"
                  : "#FFFFFF",
                boxShadow: isBudgetTab
                  ? "0 5px 18px rgba(22, 163, 74, 0.08)"
                  : "0 2px 8px rgba(15, 23, 42, 0.025)",
                transition: "all 0.2s ease",

                "&:hover": {
                  borderColor: "#86D49B",
                  backgroundColor: "#F8FFFA",
                  transform: "translateY(-1px)",
                  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
                },
              }}
            >
              <Stack
                direction="row"
                spacing={{
                  xs: 0.75,
                  sm: 1.25,
                }}
                sx={{
                  alignItems: "center",
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
                    borderRadius: {
                      xs: "10px",
                      sm: "12px",
                    },
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    background: isBudgetTab
                      ? "linear-gradient(135deg, #DCFCE7, #ECFDF5)"
                      : "#F1F5F3",
                    color: isBudgetTab ? "#15803D" : "#64748B",
                    border: isBudgetTab
                      ? "1px solid #D2F0DA"
                      : "1px solid #E5EAE7",
                    transition: "all 0.2s ease",
                  }}
                >
                  <SavingsRounded
                    sx={{
                      fontSize: {
                        xs: 18,
                        sm: 21,
                      },
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
                      fontWeight: 800,
                      fontSize: {
                        xs: 11.5,
                        sm: 14.5,
                      },
                      color: "#172033",
                      lineHeight: 1.3,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: {
                          xs: "inline",
                          sm: "none",
                        },
                      }}
                    >
                      Budget
                    </Box>

                    <Box
                      component="span"
                      sx={{
                        display: {
                          xs: "none",
                          sm: "inline",
                        },
                      }}
                    >
                      Budget & Categories
                    </Box>
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.3,
                      fontSize: {
                        xs: 9.5,
                        sm: 11.5,
                      },
                      color: "#64748B",
                      lineHeight: 1.4,
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                    }}
                  >
                    Monthly budget, savings and categories.
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper
              elevation={0}
              onClick={() => setActiveTab("bills")}
              sx={{
                flex: 1,
                minWidth: 0,
                px: {
                  xs: 1,
                  sm: 2,
                },
                py: {
                  xs: 1,
                  sm: 1.5,
                },
                cursor: "pointer",
                borderRadius: {
                  xs: "12px",
                  sm: "15px",
                },
                border: "1px solid",
                borderColor: isBillsTab ? "#86D49B" : "#E1E8E4",
                background: isBillsTab
                  ? "linear-gradient(135deg, #F0FDF4 0%, #F8FFFA 100%)"
                  : "#FFFFFF",
                boxShadow: isBillsTab
                  ? "0 5px 18px rgba(22, 163, 74, 0.08)"
                  : "0 2px 8px rgba(15, 23, 42, 0.025)",
                transition: "all 0.2s ease",

                "&:hover": {
                  borderColor: "#86D49B",
                  backgroundColor: "#F8FFFA",
                  transform: "translateY(-1px)",
                  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
                },
              }}
            >
              <Stack
                direction="row"
                spacing={{
                  xs: 0.75,
                  sm: 1.25,
                }}
                sx={{
                  alignItems: "center",
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
                    borderRadius: {
                      xs: "10px",
                      sm: "12px",
                    },
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    background: isBillsTab
                      ? "linear-gradient(135deg, #DCFCE7, #ECFDF5)"
                      : "#F1F5F3",
                    color: isBillsTab ? "#15803D" : "#64748B",
                    border: isBillsTab
                      ? "1px solid #D2F0DA"
                      : "1px solid #E5EAE7",
                    transition: "all 0.2s ease",
                  }}
                >
                  <ReceiptLongRounded
                    sx={{
                      fontSize: {
                        xs: 18,
                        sm: 21,
                      },
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
                      fontWeight: 800,
                      fontSize: {
                        xs: 11.5,
                        sm: 14.5,
                      },
                      color: "#172033",
                      lineHeight: 1.3,
                      whiteSpace: {
                        xs: "nowrap",
                        sm: "normal",
                      },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Bills
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.3,
                      fontSize: {
                        xs: 9.5,
                        sm: 11.5,
                      },
                      color: "#64748B",
                      lineHeight: 1.4,
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                    }}
                  >
                    Recurring bills and payment reminders.
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: {
              xs: "visible",
              sm: "auto",
            },
            px: {
              xs: 1.25,
              sm: 2.5,
              md: 3,
            },
            py: {
              xs: 1.5,
              sm: 2,
            },
            background:
              "linear-gradient(145deg, #F7FBF8 0%, #F8FBFF 52%, #F3FAF6 100%)",

            "&::-webkit-scrollbar": {
              width: 7,
            },

            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },

            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#CBD9D0",
              borderRadius: "999px",
            },

            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#AFC2B5",
            },
          }}
        >
          {isBudgetTab ? (
            <BudgetCategoriesTab
              header={budget.header}
              overview={overview}
              onSave={onSaveBudget}
              onCancel={onClose}
            />
          ) : (
            <BillsTab
              bills={bills}
              paymentMethods={paymentMethods}
              billFrequencies={billFrequencies}
              budgetCategories={overview.categories}
              onSave={onSaveBill}
              onDelete={onDeleteBill}
              onCancel={onClose}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ManageBudgetDialog;
