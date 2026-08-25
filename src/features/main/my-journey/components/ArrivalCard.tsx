import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FlightLandRoundedIcon from "@mui/icons-material/FlightLandRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type { JourneyHeader } from "../../../../types/features/journey";
import TipCard from "../../../../components/TipCard";

interface Props {
  header: JourneyHeader;
  onArrivalDateUpdated: (
    arrivalDate: string,
    hasArrived: boolean,
  ) => Promise<void>;
}

type DateDialogMode = "expected" | "arrival";

const ArrivalCard = ({ header, onArrivalDateUpdated }: Props) => {
  const [date, setDate] = useState(header.arrivalDate ?? "");

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    header.arrivalDate ? dayjs(header.arrivalDate) : null,
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  const [dialogMode, setDialogMode] =
    useState<DateDialogMode>("expected");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDate(header.arrivalDate ?? "");

    setSelectedDate(
      header.arrivalDate ? dayjs(header.arrivalDate) : null,
    );
  }, [header.arrivalDate]);

  const handleOpenExpectedDialog = () => {
    setDialogMode("expected");

    setSelectedDate(
      header.arrivalDate ? dayjs(header.arrivalDate) : null,
    );

    setDialogOpen(true);
  };

  const handleOpenArrivalDialog = () => {
    setDialogMode("arrival");

    // Arrival date cannot be in the future.
    setSelectedDate(dayjs());

    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    if (saving) return;

    setSelectedDate(
      header.arrivalDate ? dayjs(header.arrivalDate) : null,
    );

    setDialogMode("expected");
    setDialogOpen(false);
  };

  /*
   * Validate the selected date independently from DatePicker.
   *
   * Expected arrival:
   * - Must be a valid date
   * - Cannot be before today
   *
   * Actual arrival:
   * - Must be a valid date
   * - Cannot be after today
   */
  const isDateValid = (() => {
    if (!selectedDate || !selectedDate.isValid()) {
      return false;
    }

    const today = dayjs().startOf("day");
    const selected = selectedDate.startOf("day");

    if (dialogMode === "arrival") {
      return !selected.isAfter(today);
    }

    return !selected.isBefore(today);
  })();

  const handleSave = async () => {
    if (!isDateValid || !selectedDate) {
      return;
    }

    const formattedDate = selectedDate.format("YYYY-MM-DD");

    const hasArrived = dialogMode === "arrival";

    if (
      !hasArrived &&
      formattedDate === date &&
      !header.hasArrived
    ) {
      setDialogOpen(false);
      return;
    }

    setSaving(true);

    try {
      setDate(formattedDate);

      await onArrivalDateUpdated(
        formattedDate,
        hasArrived,
      );

      setDialogOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const hasArrived = header.hasArrived;

  const accent = hasArrived
    ? "#7c3aed"
    : "#15803d";

  const accentDark = hasArrived
    ? "#6d28d9"
    : "#166534";

  const accentLight = hasArrived
    ? "#f3e8ff"
    : "#eaf8ef";

  const accentBorder = hasArrived
    ? "rgba(124, 58, 237, 0.20)"
    : "rgba(21, 128, 61, 0.20)";

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 1.5,
          border: "1px solid",
          borderColor: accentBorder,
          background: hasArrived
            ? "linear-gradient(135deg, #ffffff 0%, #faf7ff 100%)"
            : "#fff",
          overflow: "hidden",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          sx={{
            minHeight: 150,
          }}
        >
          {/* DATE PANEL */}
          <Box
            sx={{
              width: {
                xs: "100%",
                md: 170,
              },
              minHeight: {
                xs: 105,
                md: "auto",
              },
              backgroundColor: accentLight,

              borderRight: {
                xs: "none",
                md: `1px solid ${accentBorder}`,
              },

              borderBottom: {
                xs: `1px solid ${accentBorder}`,
                md: "none",
              },

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Stack
              spacing={0.5}
              sx={{
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: accent,
                }}
              >
                {hasArrived ? "Arrived" : "Arrival"}
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 24,
                    md: 25,
                  },
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#0f172a",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                {date
                  ? new Date(
                      `${date}T00:00:00`,
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })
                  : "Not set"}
              </Typography>

              {date && (
                <Typography
                  sx={{
                    fontSize: 12.5,
                    color: "#64748b",
                    fontWeight: 600,
                  }}
                >
                  {new Date(
                    `${date}T00:00:00`,
                  ).getFullYear()}
                </Typography>
              )}
            </Stack>
          </Box>

          {/* CONTENT */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              p: {
                xs: 2.5,
                sm: 3,
              },
            }}
          >
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              sx={{
                height: "100%",
                justifyContent: "space-between",
                alignItems: {
                  xs: "stretch",
                  sm: "center",
                },
              }}
            >
              <Box
                sx={{
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    mb: 0.7,
                  }}
                >
                  {hasArrived ? (
                    <CelebrationRoundedIcon
                      sx={{
                        fontSize: 19,
                        color: accent,
                      }}
                    />
                  ) : (
                    <CalendarMonthRoundedIcon
                      sx={{
                        fontSize: 19,
                        color: accent,
                      }}
                    />
                  )}

                  <Typography
                    sx={{
                      fontSize: 17,
                      fontWeight: 800,
                      color: "#0f172a",
                    }}
                  >
                    {hasArrived
                      ? "Welcome to the UK!"
                      : "Plan your arrival"}
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: "#64748b",
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    maxWidth: 560,
                  }}
                >
                  {hasArrived
                    ? "Your journey is now using post-arrival tasks to help you settle into the UK."
                    : "Your arrival date helps personalise your journey and organise your pre-arrival tasks."}
                </Typography>

                <Button
                  onClick={
                    hasArrived
                      ? handleOpenExpectedDialog
                      : handleOpenArrivalDialog
                  }
                  disabled={saving}
                  endIcon={
                    <ArrowForwardRoundedIcon
                      sx={{
                        fontSize: 17,
                      }}
                    />
                  }
                  sx={{
                    mt: 1.5,
                    p: 0,
                    minWidth: 0,
                    textTransform: "none",
                    fontSize: 13,
                    fontWeight: 700,
                    color: accent,

                    "&:hover": {
                      backgroundColor: "transparent",
                      color: accentDark,
                    },
                  }}
                >
                  {hasArrived
                    ? "Not arrived yet"
                    : "I've arrived"}
                </Button>
              </Box>

              <Button
                variant="text"
                onClick={
                  hasArrived
                    ? handleOpenArrivalDialog
                    : handleOpenExpectedDialog
                }
                disabled={saving}
                startIcon={
                  saving ? (
                    <CircularProgress
                      size={15}
                      sx={{
                        color: accent,
                      }}
                    />
                  ) : (
                    <EditCalendarRoundedIcon
                      sx={{
                        fontSize: 18,
                      }}
                    />
                  )
                }
                sx={{
                  minWidth: 118,
                  height: 38,
                  px: 1.75,
                  borderRadius: 1,
                  textTransform: "none",
                  fontSize: 13,
                  fontWeight: 700,
                  color: accent,
                  backgroundColor: accentLight,
                  flexShrink: 0,
                  transition: "all 0.2s ease",

                  "&:hover": {
                    backgroundColor: hasArrived
                      ? "#ede9fe"
                      : "#dcfce7",
                  },

                  "&.Mui-disabled": {
                    color: "#94a3b8",
                    backgroundColor: "#f8fafc",
                  },

                  "& .MuiButton-startIcon": {
                    marginRight: 0.75,
                  },
                }}
              >
                {saving ? "Updating..." : "Change date"}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* DATE DIALOG */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="xs"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor:
                "rgba(15, 23, 42, 0.52)",
              backdropFilter: "blur(2px)",
            },
          },

          paper: {
            sx: {
              width: "100%",
              maxWidth: 460,
              borderRadius: 1.5,
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow:
                "0 24px 70px rgba(15, 23, 42, 0.18)",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            px: {
              xs: 2.5,
              sm: 3,
            },
            pt: {
              xs: 2.5,
              sm: 3,
            },
            pb: 2.25,
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: 1,
                bgcolor: accentLight,
                color: accent,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              {dialogMode === "arrival" ? (
                <FlightLandRoundedIcon
                  sx={{
                    fontSize: 24,
                  }}
                />
              ) : (
                <EditCalendarRoundedIcon
                  sx={{
                    fontSize: 24,
                  }}
                />
              )}
            </Box>

            <Box
              sx={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: 21,
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1.25,
                }}
              >
                {dialogMode === "arrival"
                  ? "Confirm your arrival"
                  : "Update arrival date"}
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13.5,
                  color: "#64748b",
                }}
              >
                {dialogMode === "arrival"
                  ? "Choose the date you arrived in the UK."
                  : "Choose the date you expect to arrive in the UK."}
              </Typography>
            </Box>

            <IconButton
              onClick={handleCloseDialog}
              disabled={saving}
              size="small"
              sx={{
                width: 34,
                height: 34,
                color: "#64748b",
                flexShrink: 0,
              }}
            >
              <CloseRoundedIcon
                sx={{
                  fontSize: 20,
                }}
              />
            </IconButton>
          </Stack>
        </DialogTitle>

        <Divider />

        <DialogContent
          sx={{
            px: {
              xs: 2.5,
              sm: 3,
            },
            py: 3,
          }}
        >
          <Stack spacing={1.5}>
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                {dialogMode === "arrival"
                  ? "Date of arrival"
                  : "Expected arrival date"}
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,
                  fontSize: 12,
                  color: "#64748b",
                  lineHeight: 1.45,
                }}
              >
                {dialogMode === "arrival"
                  ? "Select today or a date in the past."
                  : "Select today or a date in the future."}
              </Typography>
            </Box>

            <DatePicker
              value={selectedDate}
              disablePast={
                dialogMode === "expected"
              }
              maxDate={
                dialogMode === "arrival"
                  ? dayjs()
                  : undefined
              }
              onChange={(value) =>
                setSelectedDate(value)
              }
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  fullWidth: true,

                  error:
                    selectedDate !== null &&
                    !isDateValid,

                  helperText:
                    selectedDate !== null &&
                    !isDateValid
                      ? dialogMode === "arrival"
                        ? "Please enter a valid date that is today or earlier."
                        : "Please enter a valid date that is today or later."
                      : undefined,

                  sx: {
                    "& .MuiOutlinedInput-root": {
                      minHeight: 52,
                      borderRadius: 1,
                      backgroundColor: "#fff",

                      "&:hover .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor:
                            !isDateValid &&
                            selectedDate !== null
                              ? "#dc2626"
                              : hasArrived
                                ? "rgba(124, 58, 237, 0.45)"
                                : "rgba(21, 128, 61, 0.45)",
                        },

                      "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor:
                            !isDateValid &&
                            selectedDate !== null
                              ? "#dc2626"
                              : accent,
                          borderWidth: 1.5,
                        },
                    },

                    "& .MuiOutlinedInput-input": {
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#0f172a",
                    },

                    "& .MuiIconButton-root": {
                      color: "#64748b",

                      "&:hover": {
                        color: accent,
                        backgroundColor:
                          accentLight,
                      },
                    },

                    "& .MuiFormHelperText-root": {
                      marginLeft: 0,
                      fontSize: 11.5,
                    },
                  },
                },
              }}
            />

            <TipCard
              description={
                dialogMode === "arrival"
                  ? "Your journey will switch to post-arrival tasks after you confirm your arrival."
                  : "Your arrival date helps us organise your journey around the time you expect to arrive."
              }
            />
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions
          sx={{
            px: {
              xs: 2.5,
              sm: 3,
            },
            py: 2,
            gap: 1,
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={handleCloseDialog}
            disabled={saving}
            sx={{
              minWidth: 90,
              height: 40,
              borderRadius: 1,
              textTransform: "none",
              fontWeight: 700,
              fontSize: 13.5,
              color: "#475569",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={
              saving ||
              !selectedDate ||
              !isDateValid
            }
            sx={{
              minWidth:
                dialogMode === "arrival"
                  ? 135
                  : 105,
              height: 40,
              borderRadius: 1,
              textTransform: "none",
              fontWeight: 700,
              fontSize: 13.5,
              backgroundColor: accent,
              boxShadow: "none",

              "&:hover": {
                backgroundColor: accentDark,
                boxShadow: "none",
              },

              "&.Mui-disabled": {
                backgroundColor: "#d1d5db",
                color: "#fff",
              },
            }}
          >
            {saving ? (
              <CircularProgress
                size={18}
                sx={{
                  color: "#fff",
                }}
              />
            ) : dialogMode === "arrival" ? (
              "Confirm arrival"
            ) : (
              "Save date"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ArrivalCard;