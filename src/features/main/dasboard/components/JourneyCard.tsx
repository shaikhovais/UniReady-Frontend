import type { ReactNode } from "react";

import {
  ArrowForwardRounded,
  BarChartRounded,
  CheckCircleRounded,
  PendingActionsRounded,
  ScheduleRounded,
} from "@mui/icons-material";

import { Box, Button, Divider, Typography } from "@mui/material";

import { PieChart } from "@mui/x-charts/PieChart";

import type { JourneyOverview } from "../../../../types/features/dashboard";

interface JourneyCardProps {
  overview: JourneyOverview;
  onGoToJourney: () => void;
}

interface ProgressItemProps {
  icon: ReactNode;
  label: string;
  count: number;
  percentage: number;
  color: string;
  backgroundColor: string;
  progressColor: string;
}

const JourneyCard = ({ overview, onGoToJourney }: JourneyCardProps) => {
  const chartData = [
    {
      id: 0,
      value: overview.completedTasks,
      label: "Completed",
    },
    {
      id: 1,
      value: overview.inProgressTasks,
      label: "In progress",
    },
    {
      id: 2,
      value: overview.pendingTasks,
      label: "Pending",
    },
  ];

  const completionPercentage = Math.min(
    Math.max(overview.completionPercentage, 0),
    100,
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1.5,
        backgroundColor: "background.paper",
        boxShadow: "0 4px 18px rgba(20, 45, 35, 0.05)",
        overflow: "hidden",
        position: "relative",
        isolation: "isolate",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: {
            xs: 190,
            sm: 250,
          },
          height: {
            xs: 190,
            sm: 250,
          },
          borderRadius: "50%",
          top: -135,
          right: -105,
          background:
            "linear-gradient(135deg, rgba(22, 128, 75, 0.15), rgba(22, 128, 75, 0.02))",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: {
            xs: 170,
            sm: 220,
          },
          height: {
            xs: 170,
            sm: 220,
          },
          borderRadius: "50%",
          bottom: -135,
          left: -115,
          background:
            "linear-gradient(315deg, rgba(22, 128, 75, 0.1), rgba(22, 128, 75, 0.015))",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: {
            xs: 145,
            sm: 185,
          },
          height: {
            xs: 145,
            sm: 185,
          },
          borderRadius: "50%",
          top: 35,
          right: -95,
          border: "1px solid rgba(22, 128, 75, 0.07)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

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
                width: 38,
                height: 38,
                flexShrink: 0,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(22, 128, 75, 0.09)",
                color: "success.dark",
              }}
            >
              <BarChartRounded
                sx={{
                  fontSize: 20,
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
                Journey Overview
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: "0.68rem",
                  color: "text.secondary",
                }}
              >
                See how far you've come
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              flexShrink: 0,
              px: 1.05,
              py: 0.55,
              borderRadius: 1,
              backgroundColor: "rgba(22, 128, 75, 0.07)",
              color: "success.dark",
              border: "1px solid",
              borderColor: "rgba(22, 128, 75, 0.12)",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.65rem",
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              {overview.totalTasks}{" "}
              {overview.totalTasks === 1 ? "task" : "tasks"}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 2.25,
            p: {
              xs: 1.5,
              sm: 1.75,
            },
            borderRadius: 1.5,
            background:
              "linear-gradient(135deg, rgba(22, 128, 75, 0.055), rgba(255, 255, 255, 0.92))",
            border: "1px solid rgba(22, 128, 75, 0.08)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "minmax(170px, 0.85fr) 1.15fr",
              },
              alignItems: "center",
              gap: {
                xs: 1,
                sm: 1.5,
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                minHeight: 190,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PieChart
                series={[
                  {
                    data: chartData,
                    innerRadius: 60,
                    outerRadius: 82,
                    paddingAngle: 1,
                    cornerRadius: 3,
                    startAngle: -90,
                    endAngle: 270,
                    highlightScope: {
                      fade: "global",
                      highlight: "item",
                    },
                  },
                ]}
                colors={["#16804B", "#2878D7", "#F2A116"]}
                width={180}
                height={180}
                hideLegend
                slotProps={{
                  tooltip: {
                    trigger: "item",
                  },
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  pointerEvents: "none",
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "1.55rem",
                      sm: "1.7rem",
                    },
                    lineHeight: 1,
                    fontWeight: 800,
                    color: "text.primary",
                  }}
                >
                  {completionPercentage}%
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "text.secondary",
                  }}
                >
                  completed
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.15,
              }}
            >
              <ProgressItem
                icon={
                  <CheckCircleRounded
                    sx={{
                      fontSize: 16,
                    }}
                  />
                }
                label="Completed"
                count={overview.completedTasks}
                percentage={getPercentage(
                  overview.completedTasks,
                  overview.totalTasks,
                )}
                color="success.dark"
                backgroundColor="rgba(22, 128, 75, 0.09)"
                progressColor="#16804B"
              />

              <ProgressItem
                icon={
                  <PendingActionsRounded
                    sx={{
                      fontSize: 16,
                    }}
                  />
                }
                label="In progress"
                count={overview.inProgressTasks}
                percentage={getPercentage(
                  overview.inProgressTasks,
                  overview.totalTasks,
                )}
                color="primary.main"
                backgroundColor="rgba(45, 108, 210, 0.09)"
                progressColor="#2878D7"
              />

              <ProgressItem
                icon={
                  <ScheduleRounded
                    sx={{
                      fontSize: 16,
                    }}
                  />
                }
                label="Pending"
                count={overview.pendingTasks}
                percentage={getPercentage(
                  overview.pendingTasks,
                  overview.totalTasks,
                )}
                color="warning.dark"
                backgroundColor="rgba(242, 161, 22, 0.1)"
                progressColor="#F2A116"
              />
            </Box>
          </Box>
        </Box>

        <Divider
          sx={{
            mt: 1.75,
            mb: 1.4,
            borderColor: "rgba(20, 45, 35, 0.07)",
          }}
        />

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
                fontSize: "0.76rem",
                fontWeight: 800,
                color: "text.primary",
              }}
            >
              Keep your journey moving
            </Typography>

            <Typography
              sx={{
                mt: 0.25,
                fontSize: "0.65rem",
                color: "text.secondary",
              }}
            >
              View your tasks and see what’s next
            </Typography>
          </Box>

          <Button
            onClick={onGoToJourney}
            endIcon={
              <ArrowForwardRounded
                sx={{
                  fontSize: 17,
                  transition: "transform 0.2s ease",
                }}
              />
            }
            sx={{
              flexShrink: 0,
              minWidth: 0,
              px: 1.7,
              py: 1,
              borderRadius: 1,
              textTransform: "none",
              fontSize: "0.7rem",
              fontWeight: 800,
              color: "#16804B",
              backgroundColor: "rgba(22, 128, 75, 0.07)",
              border: "1px solid",
              borderColor: "rgba(22, 128, 75, 0.12)",
              transition:
                "background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(22, 128, 75, 0.12)",
                borderColor: "rgba(22, 128, 75, 0.2)",
                "& .MuiButton-endIcon": {
                  transform: "translateX(2px)",
                },
              },
            }}
          >
            View journey
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const ProgressItem = ({
  icon,
  label,
  count,
  percentage,
  color,
  backgroundColor,
  progressColor,
}: ProgressItemProps) => {
  return (
    <Box
      sx={{
        px: 1.15,
        py: 1,
        borderRadius: 1,
        backgroundColor: "rgba(255, 255, 255, 0.72)",
        border: "1px solid rgba(20, 45, 35, 0.045)",
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
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: 0.9,
          }}
        >
          <Box
            sx={{
              width: 27,
              height: 27,
              flexShrink: 0,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor,
              color,
            }}
          >
            {icon}
          </Box>

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.7rem",
                lineHeight: 1.2,
                fontWeight: 750,
                color: "text.primary",
              }}
            >
              {label}
            </Typography>

            <Typography
              sx={{
                mt: 0.2,
                fontSize: "0.61rem",
                color: "text.secondary",
              }}
            >
              {count} {count === 1 ? "task" : "tasks"}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            flexShrink: 0,
            fontSize: "0.75rem",
            fontWeight: 800,
            color,
          }}
        >
          {percentage}%
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 0.8,
          width: "100%",
          height: 4,
          borderRadius: 999,
          backgroundColor: "rgba(20, 45, 35, 0.06)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${percentage}%`,
            height: "100%",
            borderRadius: 999,
            backgroundColor: progressColor,
            transition: "width 0.3s ease",
          }}
        />
      </Box>
    </Box>
  );
};

const getPercentage = (value: number, total: number) => {
  if (total === 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
};

export default JourneyCard;
