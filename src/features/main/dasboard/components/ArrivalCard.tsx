import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";

import {
  CalendarMonthRounded,
  CheckCircleRounded,
  FlightTakeoffRounded,
  HomeRounded,
  LocationOnRounded,
  SaveRounded,
  WorkRounded,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import type { Arrival } from "../../../../types/features/dashboard";

interface ArrivalCardProps {
  arrival: Arrival;
  isPostArrival: boolean;
  onArrivalUpdated: (
    arrivalDate: string,
    hasArrived: boolean,
  ) => Promise<void>;
}

const ArrivalCard = ({
  arrival,
  isPostArrival,
  onArrivalUpdated,
}: ArrivalCardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [arrivalDate, setArrivalDate] = useState<Dayjs | null>(
    dayjs(arrival.arrivalDate),
  );
  const [hasArrived, setHasArrived] = useState(isPostArrival);
  const [saving, setSaving] = useState(false);

  const today = dayjs().startOf("day");

  const accentColor = isPostArrival ? "#7C4DB4" : "#16804B";

  const accentBackground = isPostArrival
    ? "rgba(124, 77, 180, 0.08)"
    : "rgba(22, 128, 75, 0.08)";

  const accentSoftBackground = isPostArrival
    ? "rgba(124, 77, 180, 0.06)"
    : "rgba(22, 128, 75, 0.06)";

  const accentBorder = isPostArrival
    ? "rgba(124, 77, 180, 0.14)"
    : "rgba(22, 128, 75, 0.14)";

  const handleOpenDialog = () => {
    setArrivalDate(dayjs(arrival.arrivalDate));
    setHasArrived(isPostArrival);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    if (saving) {
      return;
    }

    setDialogOpen(false);
  };

  const handleSave = async () => {
    if (!arrivalDate) {
      return;
    }

    setSaving(true);

    try {
      await onArrivalUpdated(
        arrivalDate.format("YYYY-MM-DD"),
        hasArrived,
      );

      setDialogOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const formattedArrivalDate = dayjs(arrival.arrivalDate).format(
    "DD MMMM YYYY",
  );

  const progress = Math.min(
    Math.max(arrival.preparationProgressPercentage, 0),
    100,
  );

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          minHeight: {
            xs: 300,
            sm: 320,
          },
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
              xs: 180,
              sm: 230,
            },
            height: {
              xs: 180,
              sm: 230,
            },
            borderRadius: "50%",
            top: -115,
            right: -90,
            background: isPostArrival
              ? "linear-gradient(135deg, rgba(124, 77, 180, 0.16), rgba(124, 77, 180, 0.025))"
              : "linear-gradient(135deg, rgba(22, 128, 75, 0.16), rgba(22, 128, 75, 0.025))",
            zIndex: -1,
            pointerEvents: "none",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: {
              xs: 150,
              sm: 190,
            },
            height: {
              xs: 150,
              sm: 190,
            },
            borderRadius: "50%",
            bottom: -115,
            left: -100,
            background: isPostArrival
              ? "linear-gradient(315deg, rgba(124, 77, 180, 0.11), rgba(124, 77, 180, 0.015))"
              : "linear-gradient(315deg, rgba(22, 128, 75, 0.11), rgba(22, 128, 75, 0.015))",
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
            position: "relative",
            zIndex: 1,
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
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
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    flexShrink: 0,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: accentBackground,
                    color: accentColor,
                  }}
                >
                  {isPostArrival ? (
                    <HomeRounded sx={{ fontSize: 18 }} />
                  ) : (
                    <FlightTakeoffRounded sx={{ fontSize: 18 }} />
                  )}
                </Box>

                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    color: accentColor,
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                  }}
                >
                  {isPostArrival
                    ? "You're settling in"
                    : "Your arrival"}
                </Typography>
              </Box>

              <Typography
                sx={{
                  mt: 1.8,
                  fontSize: {
                    xs: "1.55rem",
                    sm: "1.8rem",
                  },
                  lineHeight: 1.15,
                  fontWeight: 800,
                  color: "text.primary",
                }}
              >
                {isPostArrival
                  ? "Welcome!"
                  : "Getting ready for your arrival"}
              </Typography>

              <Typography
                sx={{
                  mt: 0.8,
                  maxWidth: 520,
                  fontSize: "0.78rem",
                  lineHeight: 1.6,
                  color: "text.secondary",
                }}
              >
                {isPostArrival
                  ? "You're here. Keep working through your journey and make settling in easier."
                  : "Keep your plans on track and make sure you're ready for the move."}
              </Typography>

              <Box
                sx={{
                  mt: 1.5,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    px: 1.25,
                    py: 0.65,
                    borderRadius: 2,
                    backgroundColor: accentSoftBackground,
                    color: accentColor,
                  }}
                >
                  <CalendarMonthRounded sx={{ fontSize: 17 }} />

                  <Typography
                    sx={{
                      fontSize: "0.76rem",
                      fontWeight: 700,
                    }}
                  >
                    {formattedArrivalDate}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    px: 1.25,
                    py: 0.65,
                    borderRadius: 2,
                    backgroundColor: accentSoftBackground,
                    color: accentColor,
                  }}
                >
                  <LocationOnRounded sx={{ fontSize: 17 }} />

                  <Typography
                    sx={{
                      fontSize: "0.76rem",
                      fontWeight: 700,
                    }}
                  >
                    {arrival.cityName}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "0.74rem",
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              >
                {isPostArrival
                  ? "Journey progress"
                  : "Preparation progress"}
              </Typography>

              <Typography
                sx={{
                  mt: 0.35,
                  fontSize: "0.78rem",
                  color: "text.primary",
                  fontWeight: 600,
                }}
              >
                {isPostArrival
                  ? "Keep making progress on your journey"
                  : "Stay focused and complete your tasks on time"}
              </Typography>
            </Box>

            <Typography
              sx={{
                flexShrink: 0,
                fontSize: "1rem",
                fontWeight: 800,
                color: accentColor,
              }}
            >
              {progress}%
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 1,
              width: "100%",
              height: 8,
              borderRadius: 999,
              backgroundColor: "rgba(20, 45, 35, 0.08)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${progress}%`,
                height: "100%",
                borderRadius: 999,
                backgroundColor: accentColor,
                transition: "width 0.3s ease",
              }}
            />
          </Box>

          <Box
            sx={{
              mt: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "text.secondary",
            }}
          >
            <CheckCircleRounded
              sx={{
                fontSize: 17,
                color: accentColor,
              }}
            />

            <Typography
              sx={{
                fontSize: "0.75rem",
              }}
            >
              {isPostArrival
                ? "You're now settling into your new life in the UK."
                : arrival.daysUntilArrival !== null
                  ? `${arrival.daysUntilArrival} ${
                      arrival.daysUntilArrival === 1
                        ? "day"
                        : "days"
                    } to go`
                  : "Your journey starts soon"}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box
          sx={{
            minHeight: {
              xs: 88,
              sm: 96,
            },
            px: {
              xs: 2.5,
              sm: 3,
            },
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            backgroundColor: accentSoftBackground,
            position: "relative",
            zIndex: 1,
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              minWidth: 0,
            }}
          >
            <WorkRounded
              sx={{
                fontSize: 17,
                color: accentColor,
                flexShrink: 0,
              }}
            />

            <Box
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  color: "text.secondary",
                }}
              >
                Journey status
              </Typography>

              <Typography
                sx={{
                  mt: 0.15,
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  color: accentColor,
                }}
              >
                {isPostArrival
                  ? "You've arrived"
                  : "You're preparing to arrive"}
              </Typography>
            </Box>
          </Box>

          <Button
            onClick={handleOpenDialog}
            sx={{
              minWidth: 0,
              flexShrink: 0,
              px: 1.5,
              py: 0.65,
              borderRadius: 1,
              textTransform: "none",
              fontSize: "0.72rem",
              fontWeight: 800,
              color: accentColor,
              border: "1px solid",
              borderColor: accentBorder,
              backgroundColor: "background.paper",
              "&:hover": {
                backgroundColor: accentBackground,
                borderColor: accentColor,
              },
            }}
          >
            Edit journey
          </Button>
        </Box>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 1.5,
              backgroundColor: "background.paper",
              boxShadow: "0 18px 50px rgba(20, 45, 35, 0.16)",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            px: 3,
            pt: 3,
            pb: 1,
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "text.primary",
          }}
        >
          Update your journey
        </DialogTitle>

        <DialogContent
          sx={{
            px: 3,
            pt: 1,
          }}
        >
          <Typography
            sx={{
              mb: 2.5,
              fontSize: "0.78rem",
              lineHeight: 1.6,
              color: "text.secondary",
            }}
          >
            Change your expected arrival date or tell us when you've arrived.
            Your dashboard will update automatically after saving.
          </Typography>

          <Box
            sx={{
              p: 1.5,
              mb: 2.5,
              borderRadius: 1,
              backgroundColor: accentSoftBackground,
              border: "1px solid",
              borderColor: accentBorder,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {hasArrived ? (
                <HomeRounded
                  sx={{
                    fontSize: 19,
                    color: accentColor,
                  }}
                />
              ) : (
                <FlightTakeoffRounded
                  sx={{
                    fontSize: 19,
                    color: accentColor,
                  }}
                />
              )}

              <Typography
                sx={{
                  fontSize: "0.76rem",
                  fontWeight: 800,
                  color: accentColor,
                }}
              >
                {hasArrived
                  ? "You've arrived"
                  : "You're still preparing to arrive"}
              </Typography>
            </Box>

            <Typography
              sx={{
                mt: 0.55,
                fontSize: "0.7rem",
                lineHeight: 1.5,
                color: "text.secondary",
              }}
            >
              {hasArrived
                ? "Your arrival date must be today or earlier."
                : "Choose the date you expect to arrive."}
            </Typography>
          </Box>

          <DatePicker
            label="Arrival date"
            value={arrivalDate}
            onChange={(value) => setArrivalDate(value)}
            minDate={!hasArrived ? today : undefined}
            maxDate={hasArrived ? today : undefined}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                sx: {
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "background.paper",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "0.75rem",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "0.78rem",
                  },
                },
              },
            }}
          />

          <Typography
            sx={{
              mt: 2.5,
              mb: 1,
              fontSize: "0.76rem",
              fontWeight: 800,
              color: "text.primary",
            }}
          >
            Where are you in your journey?
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 1.25,
            }}
          >
            <Button
              onClick={() => {
                setHasArrived(false);

                if (arrivalDate && arrivalDate.isBefore(today, "day")) {
                  setArrivalDate(today);
                }
              }}
              variant={!hasArrived ? "contained" : "outlined"}
              startIcon={<FlightTakeoffRounded />}
              sx={{
                minHeight: 58,
                borderRadius: 1,
                textTransform: "none",
                fontSize: "0.75rem",
                fontWeight: 700,
                borderColor: "rgba(22, 128, 75, 0.25)",
                color: !hasArrived
                  ? "common.white"
                  : "success.dark",
                backgroundColor: !hasArrived
                  ? "success.main"
                  : "background.paper",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: !hasArrived
                    ? "success.dark"
                    : "rgba(22, 128, 75, 0.06)",
                  boxShadow: "none",
                },
              }}
            >
              I'm preparing to arrive
            </Button>

            <Button
              onClick={() => {
                setHasArrived(true);

                if (arrivalDate && arrivalDate.isAfter(today, "day")) {
                  setArrivalDate(today);
                }
              }}
              variant={hasArrived ? "contained" : "outlined"}
              startIcon={<HomeRounded />}
              sx={{
                minHeight: 58,
                borderRadius: 1,
                textTransform: "none",
                fontSize: "0.75rem",
                fontWeight: 700,
                borderColor: "rgba(124, 77, 180, 0.25)",
                color: hasArrived
                  ? "common.white"
                  : "#7C4DB4",
                backgroundColor: hasArrived
                  ? "#7C4DB4"
                  : "background.paper",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: hasArrived
                    ? "#6A3FA0"
                    : "rgba(124, 77, 180, 0.06)",
                  boxShadow: "none",
                },
              }}
            >
              I've arrived
            </Button>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pt: 2,
            pb: 2.5,
            gap: 1,
          }}
        >
          <Button
            onClick={handleCloseDialog}
            disabled={saving}
            sx={{
              px: 1.5,
              textTransform: "none",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "text.secondary",
              borderRadius: 1,
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={!arrivalDate || saving}
            variant="contained"
            startIcon={<SaveRounded sx={{ fontSize: 17 }} />}
            sx={{
              px: 2,
              py: 0.8,
              textTransform: "none",
              fontSize: "0.75rem",
              fontWeight: 800,
              borderRadius: 1,
              backgroundColor: accentColor,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: isPostArrival
                  ? "#6A3FA0"
                  : "success.dark",
                boxShadow: "none",
              },
            }}
          >
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ArrivalCard;