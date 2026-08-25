import { PieChart } from "@mui/x-charts/PieChart";

import {
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";

import type { JourneyProgressSummary } from "../../../../types/features/journey";

interface Props {
  progress: JourneyProgressSummary;
}

const ProgressCard = ({ progress }: Props) => {
  const getPercentage = (value: number) => {
    if (progress.totalTasks === 0) {
      return 0;
    }

    return Math.round(
      (value / progress.totalTasks) * 100,
    );
  };

  const completedPercentage = getPercentage(
    progress.completedTasks,
  );

  const inProgressPercentage = getPercentage(
    progress.inProgressTasks,
  );

  const pendingPercentage = getPercentage(
    progress.pendingTasks,
  );

  const items = [
    {
      label: "Completed",
      value: progress.completedTasks,
      percentage: completedPercentage,
      color: "#2E7D32",
      icon: CheckCircleRoundedIcon,
    },
    {
      label: "In progress",
      value: progress.inProgressTasks,
      percentage: inProgressPercentage,
      color: "#1976D2",
      icon: AutorenewRoundedIcon,
    },
    {
      label: "Pending",
      value: progress.pendingTasks,
      percentage: pendingPercentage,
      color: "#F9A825",
      icon: ScheduleRoundedIcon,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "rgba(37, 99, 235, 0.16)",
        background:
          "linear-gradient(135deg, #ffffff 0%, #f7faff 100%)",
        overflow: "hidden",
      }}
    >
      <Stack
        sx={{
          p: {
            xs: 2.5,
            sm: 3,
          },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.01em",
            }}
          >
            Journey progress
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 13.5,
              color: "#64748b",
            }}
          >
            Your progress through this stage.
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 2.5,
            display: "flex",
            alignItems: "center",
            gap: {
              xs: 2,
              sm: 2.5,
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 145,
              height: 145,
              flexShrink: 0,
            }}
          >
            <PieChart
              width={145}
              height={145}
              margin={{
                top: 4,
                bottom: 4,
                left: 4,
                right: 4,
              }}
              hideLegend
              series={[
                {
                  innerRadius: 47,
                  outerRadius: 65,
                  paddingAngle: 1,
                  cornerRadius: 3,
                  data: [
                    {
                      id: 0,
                      value: progress.completedTasks,
                      color: "#2E7D32",
                    },
                    {
                      id: 1,
                      value: progress.inProgressTasks,
                      color: "#1976D2",
                    },
                    {
                      id: 2,
                      value: progress.pendingTasks,
                      color: "#F9A825",
                    },
                  ],
                },
              ]}
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <Typography
                sx={{
                  fontSize: 27,
                  lineHeight: 1,
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.03em",
                }}
              >
                {progress.completionPercentage}%
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: "#64748b",
                }}
              >
                completed
              </Typography>
            </Box>
          </Box>

          <Stack
            spacing={1.5}
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <Box
                  key={item.label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    minWidth: 0,
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: 18,
                      color: item.color,
                      flexShrink: 0,
                    }}
                  />

                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#0f172a",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.label}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.25,
                        fontSize: 11.5,
                        color: "#64748b",
                      }}
                    >
                      {item.value}{" "}
                      {item.value === 1
                        ? "task"
                        : "tasks"}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 12.5,
                      fontWeight: 800,
                      color: item.color,
                      flexShrink: 0,
                    }}
                  >
                    {item.percentage}%
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>

        <Box
          sx={{
            mt: 2.5,
            pt: 1.5,
            borderTop: "1px solid",
            borderColor: "rgba(37, 99, 235, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: 12.5,
              color: "#64748b",
            }}
          >
            Tasks in this stage
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 800,
              color: "#2563eb",
            }}
          >
            {progress.totalTasks}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProgressCard;