import { Box, Paper, Stack, Typography } from "@mui/material";

import { getAppIcon } from "../../../../utils/appIcons";

import type { Insight } from "../../../../types/features/budget";

interface BudgetInsightsProps {
  insights: Insight[];
}

const insightColours = [
  {
    primary: "#16A34A",
    soft: "#F0FDF4",
    border: "#D7EFDD",
    accent: "#DCFCE7",
    gradient: "linear-gradient(145deg, #FFFFFF 0%, #F0FDF4 100%)",
  },
  {
    primary: "#EA580C",
    soft: "#FFF7ED",
    border: "#FDE5D0",
    accent: "#FFEDD5",
    gradient: "linear-gradient(145deg, #FFFFFF 0%, #FFF7ED 100%)",
  },
  {
    primary: "#2563EB",
    soft: "#EFF6FF",
    border: "#DCE8FF",
    accent: "#DBEAFE",
    gradient: "linear-gradient(145deg, #FFFFFF 0%, #EFF6FF 100%)",
  },
  {
    primary: "#8E24AA",
    soft: "#FAF5FF",
    border: "#EADCF5",
    accent: "#F3E8FF",
    gradient: "linear-gradient(145deg, #FFFFFF 0%, #FAF5FF 100%)",
  },
];

const BudgetInsights = ({ insights }: BudgetInsightsProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 1.25,
          sm: 1.5,
          md: 1.75,
          lg: 2.25,
        },
        border: "1px solid #E1E9E4",
        borderRadius: {
          xs: "14px",
          sm: "16px",
          md: "17px",
          lg: "18px",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(145deg, #FFFFFF 0%, #F9FCFA 100%)",
      }}
    >
      <Box
        sx={{
          mb: {
            xs: 1.25,
            sm: 1.5,
            md: 1.75,
            lg: 2,
          },
        }}
      >
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
          Insights
        </Typography>

        <Typography
          sx={{
            mt: 0.35,
            fontSize: {
              xs: 11,
              sm: 11.5,
              md: 12,
              lg: 12.5,
            },
            color: "#64748B",
            lineHeight: 1.4,
          }}
        >
          A quick look at your budget activity.
        </Typography>
      </Box>

      <Stack
        spacing={{
          xs: 1,
          sm: 1.25,
          md: 1.5,
          lg: 1.5,
        }}
        sx={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(2, minmax(0, 1fr))",
            lg: "1fr",
          },
        }}
      >
        {insights.map((insight, index) => {
          const colours =
            insightColours[index % insightColours.length];

          return (
            <Paper
              key={insight.title}
              elevation={0}
              sx={{
                position: "relative",
                minWidth: 0,
                minHeight: {
                  xs: 145,
                  sm: 155,
                  md: 165,
                  lg: 145,
                },
                overflow: "hidden",
                borderRadius: {
                  xs: "13px",
                  sm: "14px",
                  md: "15px",
                  lg: "17px",
                },
                border: `1px solid ${colours.border}`,
                background: colours.gradient,
                transition:
                  "transform 0.2s ease, box-shadow 0.2s ease",

                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow:
                    "0 10px 26px rgba(15,23,42,0.07)",
                },

                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: {
                    xs: 110,
                    sm: 125,
                    md: 135,
                    lg: 150,
                  },
                  height: {
                    xs: 110,
                    sm: 125,
                    md: 135,
                    lg: 150,
                  },
                  borderRadius: "50%",
                  right: {
                    xs: -55,
                    sm: -60,
                    md: -65,
                    lg: -65,
                  },
                  top: {
                    xs: -60,
                    sm: -65,
                    md: -70,
                    lg: -80,
                  },
                  backgroundColor: colours.soft,
                },

                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: {
                    xs: 70,
                    sm: 75,
                    md: 80,
                    lg: 90,
                  },
                  height: {
                    xs: 70,
                    sm: 75,
                    md: 80,
                    lg: 90,
                  },
                  borderRadius: "50%",
                  right: {
                    xs: -28,
                    sm: -30,
                    md: -32,
                    lg: -35,
                  },
                  bottom: {
                    xs: -40,
                    sm: -42,
                    md: -45,
                    lg: -55,
                  },
                  backgroundColor: colours.accent,
                  opacity: 0.45,
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  p: {
                    xs: 1.25,
                    sm: 1.5,
                    md: 1.75,
                    lg: 2,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: {
                        xs: 34,
                        sm: 38,
                        md: 42,
                        lg: 48,
                      },
                      height: {
                        xs: 34,
                        sm: 38,
                        md: 42,
                        lg: 48,
                      },
                      borderRadius: {
                        xs: "10px",
                        sm: "11px",
                        md: "12px",
                        lg: "14px",
                      },
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      color: colours.primary,
                      backgroundColor: colours.soft,
                      border: `1px solid ${colours.border}`,

                      "& svg": {
                        fontSize: {
                          xs: 18,
                          sm: 20,
                          md: 22,
                          lg: 25,
                        },
                      },
                    }}
                  >
                    {getAppIcon(insight.headerIcon)}
                  </Box>

                  <Box
                    sx={{
                      px: {
                        xs: 0.7,
                        sm: 0.8,
                        md: 0.9,
                        lg: 1,
                      },
                      py: 0.4,
                      borderRadius: "999px",
                      backgroundColor: colours.soft,
                      color: colours.primary,
                      border: `1px solid ${colours.border}`,
                      maxWidth: {
                        xs: "58%",
                        sm: "60%",
                        md: "62%",
                        lg: "55%",
                      },
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 9,
                          sm: 9.5,
                          md: 10,
                          lg: 10.5,
                        },
                        fontWeight: 700,
                        lineHeight: 1.25,
                        whiteSpace: "normal",
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                      }}
                    >
                      {insight.subtitle}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: {
                      xs: 1.25,
                      sm: 1.5,
                      md: 1.75,
                      lg: 1.25,
                    },
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: 1,
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
                          xs: 11,
                          sm: 11.5,
                          md: 12,
                          lg: 13,
                        },
                        fontWeight: 700,
                        color: "#64748B",
                        lineHeight: 1.3,
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                      }}
                    >
                      {insight.title}
                    </Typography>

                    <Typography
                      sx={{
                        mt: {
                          xs: 0.45,
                          sm: 0.5,
                          md: 0.55,
                          lg: 0.25,
                        },
                        fontSize: {
                          xs: 21,
                          sm: 23,
                          md: 25,
                          lg: 27,
                        },
                        fontWeight: 800,
                        color: "#172033",
                        lineHeight: 1.1,
                        letterSpacing: "-0.5px",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                      }}
                    >
                      {insight.value}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: "auto",
                    pt: {
                      xs: 0.9,
                      sm: 1,
                      md: 1.1,
                      lg: 1.25,
                    },
                    display: "flex",
                    alignItems: "center",
                    gap: 0.6,
                    minWidth: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: {
                        xs: 21,
                        sm: 22,
                        md: 23,
                        lg: 24,
                      },
                      height: {
                        xs: 21,
                        sm: 22,
                        md: 23,
                        lg: 24,
                      },
                      borderRadius: {
                        xs: "7px",
                        sm: "7px",
                        md: "8px",
                        lg: "8px",
                      },
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      color: colours.primary,
                      backgroundColor: colours.soft,

                      "& svg": {
                        fontSize: {
                          xs: 12,
                          sm: 12.5,
                          md: 13,
                          lg: 14,
                        },
                      },
                    }}
                  >
                    {getAppIcon(insight.footerIcon)}
                  </Box>

                  <Typography
                    sx={{
                      minWidth: 0,
                      fontSize: {
                        xs: 9.5,
                        sm: 10,
                        md: 10.5,
                        lg: 11.5,
                      },
                      color: "#64748B",
                      fontWeight: 600,
                      lineHeight: 1.3,
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                    }}
                  >
                    {insight.description}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Stack>
    </Paper>
  );
};

export default BudgetInsights;