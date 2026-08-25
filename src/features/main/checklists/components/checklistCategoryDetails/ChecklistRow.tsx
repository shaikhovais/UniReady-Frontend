import { useEffect, useState } from "react";

import EditRoundedIcon from "@mui/icons-material/EditRounded";

import {
  Box,
  Chip,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { getAppIcon } from "../../../../../utils/appIcons";

import type {
  ChecklistItem,
  UpdateChecklistItemRequest,
} from "../../../../../types/features/checklist/checklist";

import { updateChecklistItem } from "../../../../../services/features/checklistService";

import type { Lookup } from "../../../../../types/core/common/Lookup";

interface Props {
  item: ChecklistItem;
  checklistImportances: Lookup[];
  checklistStatuses: Lookup[];
  onUpdated?: () => void;
  gridTemplateColumns: {
    xs: string;
    md: string;
  };
}

const ChecklistRow = ({
  item,
  checklistImportances,
  checklistStatuses,
  onUpdated,
  gridTemplateColumns,
}: Props) => {
  const [editingName, setEditingName] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);

  const [name, setName] = useState(item.name);
  const [notes, setNotes] = useState(item.notes ?? "");

  const [importanceId, setImportanceId] = useState(item.importanceId);
  const [statusId, setStatusId] = useState(item.statusId);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(item.name);
    setNotes(item.notes ?? "");
    setImportanceId(item.importanceId);
    setStatusId(item.statusId);
  }, [item]);

  const saveChanges = async (request: UpdateChecklistItemRequest) => {
    try {
      setSaving(true);

      await updateChecklistItem(item.id, request);

      onUpdated?.();
    } finally {
      setSaving(false);
    }
  };

  const handleNameBlur = async () => {
    setEditingName(false);

    const trimmedName = name.trim();

    if (!trimmedName || trimmedName === item.name) {
      setName(item.name);
      return;
    }

    await saveChanges({
      name: trimmedName,
    });
  };

  const handleNotesBlur = async () => {
    setEditingNotes(false);

    if (notes === (item.notes ?? "")) {
      return;
    }

    await saveChanges({
      notes,
    });
  };

  const handleImportanceChange = async (value: number) => {
    setImportanceId(value);

    await saveChanges({
      importanceId: value,
    });
  };

  const handleStatusChange = async (value: number) => {
    setStatusId(value);

    await saveChanges({
      statusId: value,
    });
  };

  const getImportance = (id: number) =>
    checklistImportances.find((lookup) => lookup.id === id);

  const getStatus = (id: number) =>
    checklistStatuses.find((lookup) => lookup.id === id);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 1fr) minmax(0, 1fr)",
          md: gridTemplateColumns.md,
        },
        gap: {
          xs: 1.25,
          sm: 1.5,
          md: 2,
        },
        alignItems: "center",
        px: {
          xs: 1.5,
          sm: 2,
          md: 2,
        },
        py: {
          xs: 1.75,
          sm: 2,
          md: 1,
        },
        mx: {
          xs: 0.75,
          sm: 1,
          md: 0,
        },
        my: {
          xs: 0.75,
          sm: 0.75,
          md: 0,
        },
        border: {
          xs: "1px solid #b8c7d6",
          sm: "1px solid #b8c7d6",
          md: "none",
        },
        borderRadius: {
          xs: 1,
          sm: 1,
          md: 0,
        },
        bgcolor: {
          xs: "#ffffff",
          sm: "#ffffff",
          md: "transparent",
        },
        boxShadow: {
          xs: "0 1px 5px rgba(15, 23, 42, 0.07)",
          sm: "0 1px 5px rgba(15, 23, 42, 0.07)",
          md: "none",
        },
        transition: "background-color 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          bgcolor: {
            xs: "#f8fafc",
            md: "#f8fafc",
          },
        },

        "&:hover .edit-icon": {
          opacity: 1,
        },

        "&:last-child": {
          borderBottom: {
            md: "none",
          },
        },
      }}
    >
      <Box
        sx={{
          minWidth: 0,
          gridColumn: {
            xs: "1 / -1",
            md: "auto",
          },
        }}
      >
        {editingName ? (
          <TextField
            autoFocus
            fullWidth
            size="small"
            value={name}
            disabled={saving}
            onChange={(event) => setName(event.target.value)}
            onBlur={handleNameBlur}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                (event.target as HTMLInputElement).blur();
              }

              if (event.key === "Escape") {
                setName(item.name);
                setEditingName(false);
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#fff",
                borderRadius: 1,

                "& fieldset": {
                  borderColor: "#b8c7d6",
                },

                "&:hover fieldset": {
                  borderColor: "#94a8bb",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#90caf9",
                },
              },
            }}
          />
        ) : (
          <Box
            onClick={() => setEditingName(true)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: {
                xs: 1,
                sm: 1.25,
              },
              minWidth: 0,
              px: {
                xs: 0.75,
                sm: 1,
              },
              py: {
                xs: 0.5,
                sm: 0.75,
              },
              borderRadius: 1,
              cursor: "pointer",
              transition: "background-color 0.2s ease",

              "&:hover": {
                bgcolor: "#f1f5f9",
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 34,
                  sm: 36,
                },
                height: {
                  xs: 34,
                  sm: 36,
                },
                borderRadius: 1,
                bgcolor: "#f1f5f9",
                color: "#64748b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,

                "& svg": {
                  fontSize: {
                    xs: 18,
                    sm: 20,
                  },
                },
              }}
            >
              {getAppIcon(item.iconKey)}
            </Box>

            <Typography
              sx={{
                flex: 1,
                minWidth: 0,
                fontSize: {
                  xs: 13.5,
                  sm: 14,
                  md: 14.5,
                },
                fontWeight: 600,
                color: "#1e293b",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </Typography>

            <IconButton
              className="edit-icon"
              size="small"
              disabled={saving}
              onClick={(event) => {
                event.stopPropagation();
                setEditingName(true);
              }}
              sx={{
                width: 28,
                height: 28,
                opacity: {
                  xs: 1,
                  md: 0,
                },
                color: "#64748b",
                transition: "all 0.2s ease",

                "&:hover": {
                  bgcolor: "#e2e8f0",
                  color: "#334155",
                },
              }}
            >
              <EditRoundedIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
            mb: 0.6,
            fontSize: 11,
            fontWeight: 700,
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Importance
        </Typography>

        <Select
          size="small"
          fullWidth
          value={importanceId}
          disabled={saving}
          variant="outlined"
          onChange={(event) =>
            handleImportanceChange(Number(event.target.value))
          }
          renderValue={(selected) => {
            const importance = getImportance(Number(selected));

            return (
              <Chip
                label={importance?.name ?? ""}
                sx={{
                  width: "100%",
                  height: {
                    xs: 25,
                    sm: 27,
                    md: 28,
                  },
                  borderRadius: 999,
                  color: importance?.color ?? "#64748b",
                  bgcolor: "#fff7ed",
                  fontWeight: 700,
                  fontSize: {
                    xs: 10.5,
                    sm: 11,
                    md: 12,
                  },

                  "& .MuiChip-label": {
                    width: "100%",
                    px: 0.75,
                    textAlign: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                }}
              />
            );
          }}
          sx={{
            width: "100%",
            backgroundColor: "transparent",

            "&:hover": {
              backgroundColor: "transparent",
            },

            "&.Mui-focused": {
              backgroundColor: "transparent",
            },

            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },

            "& .MuiSelect-select": {
              py: 0.4,
              px: 0,
              display: "flex",
              alignItems: "center",
              backgroundColor: "transparent",
            },

            "& .MuiSelect-icon": {
              right: 0,
              color: "#94a3b8",
              fontSize: 18,
            },
          }}
        >
          {[...checklistImportances]
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((importanceOption) => (
              <MenuItem
                key={importanceOption.id}
                value={importanceOption.id}
                sx={{
                  fontSize: 12,
                }}
              >
                {importanceOption.name}
              </MenuItem>
            ))}
        </Select>
      </Box>

      <Box
        sx={{
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
            mb: 0.6,
            fontSize: 11,
            fontWeight: 700,
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Status
        </Typography>

        <Select
          size="small"
          fullWidth
          value={statusId}
          disabled={saving}
          variant="outlined"
          onChange={(event) =>
            handleStatusChange(Number(event.target.value))
          }
          renderValue={(selected) => {
            const status = getStatus(Number(selected));

            return (
              <Chip
                label={status?.name ?? ""}
                sx={{
                  width: "100%",
                  height: {
                    xs: 25,
                    sm: 27,
                    md: 28,
                  },
                  borderRadius: 999,
                  color: status?.color ?? "#64748b",
                  bgcolor: "#eff8ff",
                  fontWeight: 700,
                  fontSize: {
                    xs: 10.5,
                    sm: 11,
                    md: 12,
                  },

                  "& .MuiChip-label": {
                    width: "100%",
                    px: 0.75,
                    textAlign: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                }}
              />
            );
          }}
          sx={{
            width: "100%",
            backgroundColor: "transparent",

            "&:hover": {
              backgroundColor: "transparent",
            },

            "&.Mui-focused": {
              backgroundColor: "transparent",
            },

            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },

            "& .MuiSelect-select": {
              py: 0.4,
              px: 0,
              display: "flex",
              alignItems: "center",
              backgroundColor: "transparent",
            },

            "& .MuiSelect-icon": {
              right: 0,
              color: "#94a3b8",
              fontSize: 18,
            },
          }}
        >
          {[...checklistStatuses]
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((statusOption) => (
              <MenuItem
                key={statusOption.id}
                value={statusOption.id}
                sx={{
                  fontSize: 12,
                }}
              >
                {statusOption.name}
              </MenuItem>
            ))}
        </Select>
      </Box>

      <Box
        sx={{
          minWidth: 0,
          gridColumn: {
            xs: "1 / -1",
            md: "auto",
          },
        }}
      >
        <Typography
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
            mb: 0.75,
            fontSize: 11,
            fontWeight: 700,
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Notes
        </Typography>

        {editingNotes ? (
          <TextField
            autoFocus
            fullWidth
            size="small"
            value={notes}
            disabled={saving}
            placeholder="Add notes..."
            onChange={(event) => setNotes(event.target.value)}
            onBlur={handleNotesBlur}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                (event.target as HTMLInputElement).blur();
              }

              if (event.key === "Escape") {
                setNotes(item.notes ?? "");
                setEditingNotes(false);
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#fff",
                borderRadius: 1,

                "& fieldset": {
                  borderColor: "#b8c7d6",
                },

                "&:hover fieldset": {
                  borderColor: "#94a8bb",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#90caf9",
                },
              },
            }}
          />
        ) : (
          <Tooltip
            title={notes || "No notes added"}
            arrow
            placement="top-start"
          >
            <Box
              onClick={() => setEditingNotes(true)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                minWidth: 0,
                px: {
                  xs: 0.75,
                  sm: 1,
                },
                py: {
                  xs: 0.5,
                  sm: 0.75,
                },
                borderRadius: 1,
                cursor: "pointer",
                transition: "background-color 0.2s ease",

                "&:hover": {
                  bgcolor: "#f1f5f9",
                },
              }}
            >
              <Typography
                sx={{
                  flex: 1,
                  minWidth: 0,
                  fontSize: {
                    xs: 12.5,
                    sm: 13,
                    md: 13.5,
                  },
                  color: notes ? "#475569" : "#94a3b8",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {notes || "Add notes"}
              </Typography>

              <IconButton
                className="edit-icon"
                size="small"
                disabled={saving}
                onClick={(event) => {
                  event.stopPropagation();
                  setEditingNotes(true);
                }}
                sx={{
                  width: 28,
                  height: 28,
                  flexShrink: 0,
                  opacity: {
                    xs: 1,
                    md: 0,
                  },
                  color: "#64748b",
                  transition: "all 0.2s ease",

                  "&:hover": {
                    bgcolor: "#e2e8f0",
                    color: "#334155",
                  },
                }}
              >
                <EditRoundedIcon sx={{ fontSize: 15 }} />
              </IconButton>
            </Box>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default ChecklistRow;