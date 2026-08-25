import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";

import StatusChip from "./StatusChip";

import { getAppIcon } from "../../../../utils/appIcons";

import { updateJourneyTask } from "../../../../services/features/journeyService";

import type { JourneyTask } from "../../../../types/features/journey";
import type { Lookup } from "../../../../types/core/common/Lookup";

interface Props {
  open: boolean;
  task: JourneyTask | null;
  taskStatuses: Lookup[];
  onClose: () => void;
  onSaved: () => Promise<void>;
}

const getStatusStyle = (statusName: string) => {
  switch (statusName) {
    case "Pending":
      return {
        borderColor: "#FBC02D",
        color: "#B28704",
        background: "#FFFBEA",
        selectedBackground: "#FBC02D",
        hoverBackground: "#FFF8D6",
        hoverSelectedBackground: "#F9A825",
      };

    case "In Progress":
      return {
        borderColor: "#1976D2",
        color: "#1565C0",
        background: "#F3F8FF",
        selectedBackground: "#1976D2",
        hoverBackground: "#EAF3FF",
        hoverSelectedBackground: "#1565C0",
      };

    case "Completed":
      return {
        borderColor: "#2E7D32",
        color: "#2E7D32",
        background: "#F2FBF4",
        selectedBackground: "#2E7D32",
        hoverBackground: "#EAF8EC",
        hoverSelectedBackground: "#1B5E20",
      };

    default:
      return {
        borderColor: "divider",
        color: "text.primary",
        background: "background.paper",
        selectedBackground: "primary.main",
        hoverBackground: "action.hover",
        hoverSelectedBackground: "primary.dark",
      };
  }
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function TaskDetailsDialog({
  open,
  task,
  taskStatuses,
  onClose,
  onSaved,
}: Props) {
  const [notes, setNotes] = useState("");
  const [statusId, setStatusId] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!task) {
      return;
    }

    setNotes(task.notes ?? "");
    setStatusId(task.statusId);
    setError("");
  }, [task]);

  const sortedTaskStatuses = useMemo(
    () => [...taskStatuses].sort((a, b) => a.displayOrder - b.displayOrder),
    [taskStatuses],
  );

  const hasChanges = useMemo(() => {
    if (!task) {
      return false;
    }

    return notes !== (task.notes ?? "") || statusId !== task.statusId;
  }, [notes, statusId, task]);

  const handleSave = async () => {
    if (!task) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updateJourneyTask(task.userJourneyTaskId, {
        statusId,
        notes,
      });

      await onSaved();

      onClose();
    } catch {
      setError("Unable to save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!task) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          mx: {
            xs: 1.5,
            sm: 3,
          },
          width: {
            xs: "calc(100% - 24px)",
            sm: "100%",
          },
          borderRadius: {
            xs: 1.5,
            sm: 2,
          },
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "48px minmax(0, 1fr)",
              sm: "60px minmax(0, 1fr)",
            },
            columnGap: {
              xs: 1.5,
              sm: 2,
            },
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              width: {
                xs: 48,
                sm: 60,
              },
              height: {
                xs: 48,
                sm: 60,
              },
              borderRadius: "50%",
              bgcolor: "#f4f8e9",
              color: "#146e27",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& svg": {
                fontSize: {
                  xs: 26,
                  sm: 32,
                },
              },
            }}
          >
            {getAppIcon(task.iconKey)}
          </Box>

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                alignItems: {
                  xs: "flex-start",
                  sm: "center",
                },
                justifyContent: "space-between",
                gap: {
                  xs: 0.75,
                  sm: 2,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.3,
                  minWidth: 0,
                }}
              >
                {task.title}
              </Typography>

              <StatusChip status={task.status} />
            </Box>
          </Box>

          <Box
            sx={{
              gridColumn: "1 / -1",
              mt: {
                xs: 0.5,
                sm: 0,
              },
            }}
          >
            <Typography variant="body1" color="text.secondary">
              {task.description}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mt: 1 }} />
      </DialogTitle>

      <DialogContent
        sx={{
          px: {
            xs: 2,
            sm: 3,
          },
          pb: {
            xs: 2,
            sm: 3,
          },
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
              }}
            >
              <CalendarTodayRoundedIcon color="primary" fontSize="small" />

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                  },
                }}
              >
                Recommended Timeline
              </Typography>
            </Stack>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: {
                  xs: "0.875rem",
                  sm: "0.95rem",
                },
              }}
              color="text.secondary"
            >
              {formatDate(task.recommendedStartDate)}
              {" - "}
              {formatDate(task.recommendedEndDate)}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: "#f4f1fa",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <LightbulbRoundedIcon
                sx={{
                  color: "#6D28D9",
                  fontSize: 30,
                  flexShrink: 0,
                }}
              />

              <Typography
                variant="subtitle1"
                sx={{
                  color: "#6D28D9",
                  fontWeight: 700,
                }}
              >
                Why is this important?
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
                lineHeight: 1.6,
                width: "100%",
              }}
            >
              {task.importanceReason}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                mb: 1,
              }}
            >
              Personal Notes (Optional)
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              slotProps={{
                htmlInput: {
                  maxLength: 500,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  p: 1,
                },
                "& .MuiOutlinedInput-input": {
                  p: 1,
                },
              }}
            />

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                textAlign: "right",
                mt: 0.75,
              }}
            >
              {notes.length}/500
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                mb: 1.5,
              }}
            >
              Update Status
            </Typography>

            <Stack
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(3, minmax(0, 1fr))",
                },
                gap: 1.25,
                width: "100%",
              }}
            >
              {sortedTaskStatuses.map((status) => {
                const style = getStatusStyle(status.name);

                const selected = statusId === status.id;

                return (
                  <Button
                    key={status.id}
                    variant={selected ? "contained" : "outlined"}
                    onClick={() => setStatusId(status.id)}
                    sx={{
                      width: "100%",
                      minWidth: 0,
                      justifyContent: "center",
                      textTransform: "none",
                      borderRadius: 1,
                      py: {
                        xs: 1.25,
                        sm: 1.5,
                      },
                      px: 1,
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                      },
                      fontWeight: 600,
                      borderColor: style.borderColor,
                      color: selected ? "#FFFFFF" : style.color,
                      bgcolor: selected
                        ? style.selectedBackground
                        : style.background,
                      "&:hover": {
                        borderColor: style.borderColor,
                        bgcolor: selected
                          ? style.hoverSelectedBackground
                          : style.hoverBackground,
                      },
                    }}
                  >
                    {status.name}
                  </Button>
                );
              })}
            </Stack>
          </Box>

          {error && (
            <Alert
              sx={{
                borderRadius: 1,
              }}
              severity="error"
            >
              {error}
            </Alert>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              justifyContent: "space-between",
              alignItems: {
                xs: "stretch",
                sm: "center",
              },
              gap: 1.5,
              pt: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: hasChanges ? "warning.main" : "text.secondary",
                fontWeight: hasChanges ? 600 : 400,
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.875rem",
                },
              }}
            >
              {hasChanges
                ? "You have changes ready to save."
                : "No changes made."}
            </Typography>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1.25,
                justifyContent: {
                  xs: "stretch",
                  sm: "flex-end",
                },
                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              <Button
                onClick={onClose}
                disabled={saving}
                variant="outlined"
                sx={{
                  minWidth: {
                    xs: 0,
                    sm: 110,
                  },
                  flex: {
                    xs: 1,
                    sm: "initial",
                  },
                  textTransform: "none",
                  borderRadius: 1,
                }}
              >
                Close
              </Button>

              <Button
                variant="contained"
                onClick={handleSave}
                disabled={!hasChanges || saving}
                sx={{
                  minWidth: {
                    xs: 0,
                    sm: 180,
                  },
                  flex: {
                    xs: 1,
                    sm: "initial",
                  },
                  borderRadius: 1,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                {saving ? (
                  <>
                    <CircularProgress
                      size={18}
                      color="inherit"
                      sx={{
                        mr: 1,
                      }}
                    />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
