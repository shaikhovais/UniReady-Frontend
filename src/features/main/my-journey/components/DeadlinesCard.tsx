import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import {
  Avatar,
  Box,
  Paper,
  Typography,
} from "@mui/material";

import type { UpcomingDeadline } from "../../../../types/features/journey";

interface Props {
  deadlines: UpcomingDeadline[];
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const DeadlinesCard = ({ deadlines }: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 2.5,
          sm: 3,
        },
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "rgba(220, 38, 38, 0.16)",
        background:
          "linear-gradient(135deg, #ffffff 0%, #fff8f8 100%)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.75,
          mb: 2.5,
        }}
      >
        <Avatar
          sx={{
            width: 46,
            height: 46,
            borderRadius: 1.5,
            bgcolor: "#fef2f2",
            color: "#dc2626",
            flexShrink: 0,
          }}
        >
          <CalendarTodayRoundedIcon
            sx={{
              fontSize: 22,
            }}
          />
        </Avatar>

        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: 18,
              lineHeight: 1.25,
              color: "#0f172a",
            }}
          >
            Upcoming Deadlines
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              fontSize: 13,
              color: "#78716c",
              lineHeight: 1.4,
            }}
          >
            Keep track of important dates.
          </Typography>
        </Box>
      </Box>

      {deadlines.length === 0 ? (
        <Box
          sx={{
            py: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 13.5,
              color: "#64748b",
            }}
          >
            No upcoming deadlines 🎉
          </Typography>
        </Box>
      ) : (
        <Box>
          {deadlines.map((deadline, index) => {
            const urgent = deadline.daysRemaining <= 3;

            const badgeColor = urgent
              ? "#dc2626"
              : "#ef4444";

            const badgeBackground = urgent
              ? "#fef2f2"
              : "#fff1f2";

            return (
              <Box
                key={deadline.userJourneyTaskId}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  pb:
                    index !== deadlines.length - 1
                      ? 1.75
                      : 0,
                  mb:
                    index !== deadlines.length - 1
                      ? 1.75
                      : 0,
                  borderBottom:
                    index !== deadlines.length - 1
                      ? "1px solid"
                      : "none",
                  borderColor:
                    "rgba(148, 163, 184, 0.18)",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    mt: "7px",
                    borderRadius: "50%",
                    bgcolor: badgeColor,
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
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#0f172a",
                      lineHeight: 1.4,
                    }}
                  >
                    {deadline.title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.45,
                      fontSize: 12.5,
                      color: "#64748b",
                    }}
                  >
                    Due: {formatDate(deadline.dueDate)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 1,
                    py: 0.55,
                    borderRadius: 1,
                    bgcolor: badgeBackground,
                    flexShrink: 0,
                  }}
                >
                  <WarningAmberRoundedIcon
                    sx={{
                      fontSize: 15,
                      color: badgeColor,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 11.5,
                      fontWeight: 800,
                      color: badgeColor,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {deadline.daysRemaining === 0
                      ? "Today"
                      : deadline.daysRemaining === 1
                        ? "1 day left"
                        : `${deadline.daysRemaining} days left`}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Paper>
  );
};

export default DeadlinesCard;