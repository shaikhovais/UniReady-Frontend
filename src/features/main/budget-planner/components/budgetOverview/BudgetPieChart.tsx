import {
  AddRounded,
  CalendarMonthRounded,
  InsightsRounded,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

import type { BudgetOverview } from "../../../../../types/features/budget";

import {
  CHART_COLOURS,
  DEFAULT_CHART_COLOUR,
} from "../../../../../utils/chartColours";

interface BudgetPieChartProps {
  overview: BudgetOverview;
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onManageCategories: () => void;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();

const BudgetPieChart = ({
  overview,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  onManageCategories,
}: BudgetPieChartProps) => {
  const summary = overview.summary;

  const chartData = overview.categories
    .filter((category) => category.budget > 0)
    .map((category, index) => ({
      id: category.userBudgetCategoryId,
      value: category.budget,
      label: category.name,
      color: CHART_COLOURS[index] ?? DEFAULT_CHART_COLOUR,
    }));

  const hasBudgetData = chartData.length > 0;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: {
            xs: 1.25,
            sm: 1.5,
            md: 1.75,
            lg: 2,
          },
          mb: {
            xs: 1.5,
            sm: 1.75,
            md: 1.75,
            lg: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              xs: 1,
              sm: 1.15,
              md: 1.25,
            },
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: {
                xs: 38,
                sm: 40,
                md: 42,
              },
              height: {
                xs: 38,
                sm: 40,
                md: 42,
              },
              flexShrink: 0,
              borderRadius: {
                xs: "10px",
                sm: "11px",
                md: "12px",
              },
              display: "grid",
              placeItems: "center",
              color: "#7C3AED",
              background: "linear-gradient(135deg, #F3E8FF, #FAF5FF)",
              border: "1px solid #E9D5FF",
            }}
          >
            <InsightsRounded
              sx={{
                fontSize: {
                  xs: 20,
                  sm: 21,
                  md: 22,
                },
              }}
            />
          </Box>

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
                lineHeight: 1.2,
              }}
            >
              Budget Overview
            </Typography>

            <Typography
              sx={{
                mt: {
                  xs: 0.25,
                  sm: 0.3,
                  md: 0.35,
                },
                color: "#64748B",
                fontSize: {
                  xs: 11.5,
                  sm: 12,
                  md: 12.5,
                },
                lineHeight: 1.35,
              }}
            >
              Track your spending and budget allocation.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
          },
          gap: {
            xs: 0.75,
            sm: 1,
            md: 1,
          },
          mb: {
            xs: 1.5,
            sm: 1.75,
            md: 2,
          },
        }}
      >
        <Box
          sx={{
            px: {
              xs: 1,
              sm: 1.15,
              md: 1.25,
            },
            py: {
              xs: 0.8,
              sm: 0.9,
              md: 1,
            },
            borderRadius: {
              xs: "10px",
              sm: "11px",
              md: "12px",
            },
            backgroundColor: "#FFFFFF",
            border: "1px solid #E8EFEB",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 9.5,
                sm: 10,
                md: 10.5,
              },
              fontWeight: 700,
              color: "#64748B",
              mb: 0.2,
            }}
          >
            MONTH
          </Typography>

          <FormControl fullWidth variant="standard">
            <Select
              value={selectedMonth}
              disableUnderline
              onChange={(event) =>
                onMonthChange(event.target.value as number)
              }
              sx={{
                fontSize: {
                  xs: 13,
                  sm: 13.5,
                  md: 14,
                },
                fontWeight: 700,
                color: "#172033",
                "& .MuiSelect-select": {
                  padding: 0,
                  minHeight: "unset",
                  height: {
                    xs: 22,
                    sm: 23,
                    md: 24,
                  },
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiSelect-icon": {
                  color: "#64748B",
                  fontSize: {
                    xs: 19,
                    sm: 20,
                    md: 21,
                  },
                },
              }}
            >
              {months.map((month, index) => (
                <MenuItem key={month} value={index + 1}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            px: {
              xs: 1,
              sm: 1.15,
              md: 1.25,
            },
            py: {
              xs: 0.8,
              sm: 0.9,
              md: 1,
            },
            borderRadius: {
              xs: "10px",
              sm: "11px",
              md: "12px",
            },
            backgroundColor: "#FFFFFF",
            border: "1px solid #E8EFEB",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 9.5,
                sm: 10,
                md: 10.5,
              },
              fontWeight: 700,
              color: "#64748B",
              mb: 0.2,
            }}
          >
            YEAR
          </Typography>

          <FormControl fullWidth variant="standard">
            <Select
              value={selectedYear}
              disableUnderline
              onChange={(event) =>
                onYearChange(event.target.value as number)
              }
              sx={{
                fontSize: {
                  xs: 13,
                  sm: 13.5,
                  md: 14,
                },
                fontWeight: 700,
                color: "#172033",
                "& .MuiSelect-select": {
                  padding: 0,
                  minHeight: "unset",
                  height: {
                    xs: 22,
                    sm: 23,
                    md: 24,
                  },
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiSelect-icon": {
                  color: "#64748B",
                  fontSize: {
                    xs: 19,
                    sm: 20,
                    md: 21,
                  },
                },
              }}
            >
              {[currentYear - 2, currentYear - 1, currentYear].map(
                (year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {hasBudgetData ? (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr",
                md: "1fr",
                lg: "1.1fr 0.9fr",
              },
              alignItems: "center",
              gap: {
                xs: 0.5,
                sm: 0.75,
                md: 1,
                lg: 2,
              },
              py: 0,
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 280,
                height: 280,
                mx: "auto",
                maxWidth: "100%",
              }}
            >
              <PieChart
                width={280}
                height={280}
                hideLegend
                margin={{
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
                series={[
                  {
                    data: chartData,
                    innerRadius: 82,
                    outerRadius: 112,
                    paddingAngle: 1,
                    cornerRadius: 3,
                    startAngle: -90,
                    endAngle: 270,
                    cx: 140,
                    cy: 140,
                  },
                ]}
              />

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 31,
                        sm: 32,
                        md: 33,
                        lg: 34,
                      },
                      fontWeight: 800,
                      color: "#172033",
                      lineHeight: 1,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {summary.completionPercentage}%
                  </Typography>

                  <Typography
                    sx={{
                      mt: {
                        xs: 0.4,
                        sm: 0.45,
                        md: 0.5,
                      },
                      color: "#64748B",
                      fontSize: {
                        xs: 11.5,
                        sm: 12,
                        md: 12.5,
                      },
                      fontWeight: 600,
                    }}
                  >
                    Budget Used
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "none",
                  lg: "flex",
                },
                flexDirection: "column",
                gap: 1.25,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  p: 1.75,
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg, #FFF7ED 0%, #FFFBF7 100%)",
                  border: "1px solid #FDE7D0",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10.5,
                    color: "#9A3412",
                    fontWeight: 800,
                    letterSpacing: "0.4px",
                  }}
                >
                  TOTAL SPENT
                </Typography>

                <Typography
                  sx={{
                    mt: 0.45,
                    fontSize: 25,
                    fontWeight: 800,
                    color: "#172033",
                    lineHeight: 1.1,
                  }}
                >
                  £{summary.totalSpent.toFixed(2)}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 11.5,
                    color: "#9A3412",
                    fontWeight: 600,
                  }}
                >
                  Spending this month
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.75,
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg, #F0FDF4 0%, #F8FFF9 100%)",
                  border: "1px solid #DCFCE7",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10.5,
                    color: "#15803D",
                    fontWeight: 800,
                    letterSpacing: "0.4px",
                  }}
                >
                  REMAINING
                </Typography>

                <Typography
                  sx={{
                    mt: 0.45,
                    fontSize: 25,
                    fontWeight: 800,
                    color: "#172033",
                    lineHeight: 1.1,
                  }}
                >
                  £{summary.remaining.toFixed(2)}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 11.5,
                    color: "#15803D",
                    fontWeight: 600,
                  }}
                >
                  Available budget
                </Typography>
              </Box>
            </Box>
          </Box>

          <Paper
            elevation={0}
            onClick={onManageCategories}
            sx={{
              mt: {
                xs: 1,
                sm: 1.25,
                md: 1.5,
              },
              p: {
                xs: 1,
                sm: 1.1,
                md: 1.25,
              },
              borderRadius: {
                xs: "11px",
                sm: "12px",
                md: "13px",
              },
              border: "1px solid #E8EFEB",
              backgroundColor: "#FFFFFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: {
                xs: 1,
                sm: 1.1,
                md: 1.25,
              },
              transition:
                "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
              "&:hover": {
                transform: "translateY(-1px)",
                borderColor: "#CFE5D5",
                boxShadow: "0 6px 18px rgba(15,23,42,0.05)",
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 34,
                  sm: 36,
                  md: 38,
                },
                height: {
                  xs: 34,
                  sm: 36,
                  md: 38,
                },
                flexShrink: 0,
                borderRadius: {
                  xs: "9px",
                  sm: "10px",
                  md: "10px",
                },
                display: "grid",
                placeItems: "center",
                color: "#16A34A",
                backgroundColor: "#F0FDF4",
                border: "1px solid #D9F0DF",
              }}
            >
              <AddRounded
                sx={{
                  fontSize: {
                    xs: 18,
                    sm: 19,
                    md: 20,
                  },
                }}
              />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 12,
                    sm: 12.5,
                    md: 13,
                  },
                  fontWeight: 700,
                  color: "#172033",
                  lineHeight: 1.25,
                }}
              >
                Manage Categories
              </Typography>

              <Typography
                sx={{
                  mt: 0.15,
                  color: "#64748B",
                  fontSize: {
                    xs: 10.5,
                    sm: 11,
                    md: 11.5,
                  },
                  lineHeight: 1.3,
                }}
              >
                Add, edit or remove categories
              </Typography>
            </Box>
          </Paper>
        </>
      ) : (
        <Box
          sx={{
            minHeight: {
              xs: 250,
              sm: 270,
              md: 285,
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: {
              xs: "12px",
              sm: "13px",
              md: "14px",
            },
            backgroundColor: "#F8FAF9",
            border: "1px dashed #DDE8E1",
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
                xs: 46,
                sm: 49,
                md: 52,
              },
              height: {
                xs: 46,
                sm: 49,
                md: 52,
              },
              borderRadius: {
                xs: "12px",
                sm: "13px",
                md: "14px",
              },
              display: "grid",
              placeItems: "center",
              color: "#7C3AED",
              backgroundColor: "#F3E8FF",
              mb: {
                xs: 1,
                sm: 1.15,
                md: 1.25,
              },
            }}
          >
            <CalendarMonthRounded
              sx={{
                fontSize: {
                  xs: 22,
                  sm: 24,
                  md: 26,
                },
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: {
                xs: 14,
                sm: 14.5,
                md: 15,
              },
              fontWeight: 700,
              color: "#172033",
            }}
          >
            No budget categories yet
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: {
                xs: 11,
                sm: 11.5,
                md: 12,
              },
              color: "#64748B",
              maxWidth: 260,
              lineHeight: 1.4,
            }}
          >
            Add budget categories to see your spending allocation for this
            month.
          </Typography>

          <Box
            onClick={onManageCategories}
            sx={{
              mt: {
                xs: 1.25,
                sm: 1.4,
                md: 1.5,
              },
              px: {
                xs: 1.25,
                sm: 1.4,
                md: 1.5,
              },
              py: {
                xs: 0.7,
                sm: 0.75,
                md: 0.8,
              },
              borderRadius: "9px",
              color: "#15803D",
              backgroundColor: "#F0FDF4",
              border: "1px solid #D9EDDE",
              fontSize: {
                xs: 11,
                sm: 11.5,
                md: 12,
              },
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Manage Categories
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BudgetPieChart;