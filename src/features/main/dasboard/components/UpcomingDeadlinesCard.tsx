import {
  ArrowForwardRounded,
  AssignmentRounded,
  CalendarMonthRounded,
  CheckCircleRounded,
  ScheduleRounded,
} from "@mui/icons-material";

import { Box, Button, Typography } from "@mui/material";

import type { UpcomingDeadline } from "../../../../types/features/dashboard";

interface UpcomingDeadlinesCardProps {
  deadlines: UpcomingDeadline[];
  onGoToJourney: () => void;
}

const UpcomingDeadlinesCard = ({
  deadlines,
  onGoToJourney,
}: UpcomingDeadlinesCardProps) => {
  const yellowTheme = {
    background: "rgba(245, 158, 11, 0.09)",
    softBackground: "rgba(245, 158, 11, 0.055)",
    color: "#D88A00",
    border: "rgba(245, 158, 11, 0.18)",
  };

  const getDeadlineColor = (daysRemaining: number) => {
    if (daysRemaining < 7) {
      return {
        background: "rgba(236, 72, 153, 0.1)",
        color: "#db2727",
      };
    }

    if (daysRemaining < 7) {
      return {
        background: "rgba(220, 70, 70, 0.09)",
        color: "#d64a4a",
      };
    }

    if (daysRemaining <= 15) {
      return {
        background: "rgba(59, 130, 246, 0.1)",
        color: "#2563EB",
      };
    }

    return {
      background: "rgba(22, 128, 75, 0.09)",
      color: "#16804B",
    };
  };

  const getDeadlineLabel = (daysRemaining: number) => {
    if (daysRemaining < 0) {
      return "Overdue";
    }

    if (daysRemaining === 0) {
      return "Due today";
    }

    if (daysRemaining === 1) {
      return "Tomorrow";
    }

    return `${daysRemaining} days`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 520,
        display: "flex",
        flexDirection: "column",
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
            "linear-gradient(135deg, rgba(245, 158, 11, 0.16), rgba(245, 158, 11, 0.02))",
          zIndex: -1,
          pointerEvents: "none",
        },

        "&::after": {
          content: '""',
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
            "linear-gradient(315deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.015))",
          zIndex: -1,
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          p: {
            xs: 2.5,
            sm: 3,
          },
          display: "flex",
          flexDirection: "column",
          flex: 1,
          position: "relative",
          zIndex: 1,
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
                width: 42,
                height: 42,
                flexShrink: 0,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: yellowTheme.background,
                color: yellowTheme.color,
              }}
            >
              <CalendarMonthRounded sx={{ fontSize: 21 }} />
            </Box>

            <Box
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.92rem",
                  fontWeight: 800,
                  color: "text.primary",
                }}
              >
                Upcoming Deadlines
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: "0.7rem",
                  color: "text.secondary",
                }}
              >
                Keep an eye on what needs your attention
              </Typography>
            </Box>
          </Box>

          {deadlines.length > 0 && (
            <Box
              sx={{
                flexShrink: 0,
                px: 1.4,
                py: 0.7,
                borderRadius: 999,
                backgroundColor: yellowTheme.background,
                color: yellowTheme.color,
                border: "1px solid",
                borderColor: yellowTheme.border,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                }}
              >
                {deadlines.length}{" "}
                {deadlines.length === 1 ? "deadline" : "deadlines"}
              </Typography>
            </Box>
          )}
        </Box>

        {deadlines.length === 0 ? (
          <Box
            sx={{
              mt: 2,
              minHeight: 150,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: 2,
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: yellowTheme.background,
                color: yellowTheme.color,
              }}
            >
              <CheckCircleRounded
                sx={{
                  fontSize: 26,
                }}
              />
            </Box>

            <Typography
              sx={{
                mt: 1.5,
                fontSize: "0.82rem",
                fontWeight: 800,
                color: "text.primary",
              }}
            >
              Nothing due soon
            </Typography>

            <Typography
              sx={{
                mt: 0.45,
                maxWidth: 270,
                fontSize: "0.7rem",
                lineHeight: 1.5,
                color: "text.secondary",
              }}
            >
              You’re all caught up for now. Keep making progress on your
              journey.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              mt: 2.25,
              display: "flex",
              flexDirection: "column",
              gap: 1.1,
            }}
          >
            {deadlines.map((deadline) => {
              const deadlineColor = getDeadlineColor(
                deadline.daysRemaining,
              );

              return (
                <Box
                  key={deadline.userJourneyTaskId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    p: 1.35,
                    border: "1px solid",
                    borderColor: yellowTheme.border,
                    borderRadius: 1,
                    backgroundColor: yellowTheme.softBackground,
                    transition:
                      "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",

                    "&:hover": {
                      transform: "translateY(-1px)",
                      backgroundColor: "rgba(245, 158, 11, 0.075)",
                      boxShadow: "0 5px 14px rgba(20, 45, 35, 0.055)",
                    },
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
                      backgroundColor: yellowTheme.background,
                      color: yellowTheme.color,
                    }}
                  >
                    <AssignmentRounded
                      sx={{
                        fontSize: 20,
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
                        fontSize: "0.76rem",
                        fontWeight: 750,
                        color: "text.primary",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {deadline.title}
                    </Typography>

                    <Box
                      sx={{
                        mt: 0.4,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <CalendarMonthRounded
                        sx={{
                          fontSize: 13,
                          color: "text.secondary",
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: "0.66rem",
                          color: "text.secondary",
                        }}
                      >
                        {formatDate(deadline.dueDate)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.45,
                      px: 1,
                      py: 0.55,
                      borderRadius: 999,
                      backgroundColor: deadlineColor.background,
                      color: deadlineColor.color,
                    }}
                  >
                    <ScheduleRounded
                      sx={{
                        fontSize: 14,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {getDeadlineLabel(deadline.daysRemaining)}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}

        <Box
          sx={{
            mt: "auto",
            pt: 2.25,
          }}
        >
          <Box
            sx={{
              borderTop: "1px solid",
              borderColor: "rgba(20, 45, 35, 0.08)",
              pt: 1.75,
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
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  color: "text.primary",
                }}
              >
                Stay on top of your journey
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: "0.62rem",
                  color: "text.secondary",
                }}
              >
                Manage tasks and track your progress
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
                color: yellowTheme.color,
                backgroundColor: yellowTheme.background,
                border: "1px solid",
                borderColor: yellowTheme.border,
                transition:
                  "background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease",

                "&:hover": {
                  backgroundColor: "rgba(245, 158, 11, 0.14)",
                  borderColor: "rgba(245, 158, 11, 0.25)",
                },
              }}
            >
              View journey
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UpcomingDeadlinesCard;