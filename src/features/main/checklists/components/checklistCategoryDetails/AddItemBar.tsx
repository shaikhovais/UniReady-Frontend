import { useEffect, useState } from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";

import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { Lookup } from "../../../../../types/core/common/Lookup";

interface Props {
  loading?: boolean;
  checklistImportances: Lookup[];
  checklistStatuses: Lookup[];

  onAdd: (
    name: string,
    importanceId: number,
    statusId: number,
  ) => Promise<void>;
}

const AddItemBar = ({
  loading = false,
  checklistImportances,
  checklistStatuses,
  onAdd,
}: Props) => {
  const [name, setName] = useState("");

  const [importanceId, setImportanceId] = useState(
    checklistImportances[0]?.id ?? 0,
  );

  const [statusId, setStatusId] = useState(
    checklistStatuses[0]?.id ?? 0,
  );

  useEffect(() => {
    if (checklistImportances.length > 0 && importanceId === 0) {
      setImportanceId(checklistImportances[0].id);
    }
  }, [checklistImportances, importanceId]);

  useEffect(() => {
    if (checklistStatuses.length > 0 && statusId === 0) {
      setStatusId(checklistStatuses[0].id);
    }
  }, [checklistStatuses, statusId]);

  const handleAdd = async () => {
    if (!name.trim()) return;

    await onAdd(name.trim(), importanceId, statusId);

    setName("");

    if (checklistImportances.length > 0) {
      setImportanceId(checklistImportances[0].id);
    }

    if (checklistStatuses.length > 0) {
      setStatusId(checklistStatuses[0].id);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: 1,
        border: "1px solid",
        borderColor: "#B9D9EE",
        background:
          "linear-gradient(135deg, #F9FCFF 0%, #F3F9FD 50%, #EAF5FC 100%)",
        boxShadow: "none",
      }}
    >
      <Stack spacing={2}>
        <Stack
          sx={{
            flexDirection: "row",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 1.25,
              bgcolor: "#E3F3FC",
              color: "#2386B8",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <ChecklistRoundedIcon sx={{ fontSize: 22 }} />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 17,
                fontWeight: 800,
                color: "#0F172A",
                lineHeight: 1.25,
              }}
            >
              Add a checklist item
            </Typography>

            <Typography
              sx={{
                mt: 0.35,
                fontSize: 13,
                color: "#64748B",
              }}
            >
              Add something you need to prepare or pack.
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              md: "1fr 150px 150px auto",
            },
            gap: 1.25,
            alignItems: "stretch",
          }}
        >
          <TextField
            placeholder="e.g. Buy a warm jacket"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            size="small"
            sx={{
              gridColumn: {
                xs: "1 / -1",
                md: "auto",
              },
              "& .MuiOutlinedInput-root": {
                minHeight: 44,
                borderRadius: 1,
                backgroundColor: "#FFFFFF",

                "& fieldset": {
                  borderColor: "#A9CFE7",
                  borderWidth: 1,
                },

                "&:hover fieldset": {
                  borderColor: "#6FB3D8",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#42A5D5",
                  borderWidth: 1.5,
                },
              },

              "& .MuiOutlinedInput-input": {
                fontSize: 13.5,
              },
            }}
          />

          <TextField
            select
            label="Importance"
            value={importanceId}
            onChange={(e) => setImportanceId(Number(e.target.value))}
            size="small"
            sx={{
              gridColumn: {
                xs: "1",
                md: "auto",
              },
              "& .MuiOutlinedInput-root": {
                minHeight: 44,
                borderRadius: 1,
                backgroundColor: "#FFFFFF",

                "& fieldset": {
                  borderColor: "#A9CFE7",
                  borderWidth: 1,
                },

                "&:hover fieldset": {
                  borderColor: "#6FB3D8",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#42A5D5",
                  borderWidth: 1.5,
                },
              },

              "& .MuiInputLabel-root": {
                fontSize: 13,
                color: "#526D7D",
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2386B8",
              },

              "& .MuiSelect-select": {
                fontSize: 13,
              },
            }}
          >
            {checklistImportances.map((importance) => (
              <MenuItem key={importance.id} value={importance.id}>
                {importance.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Status"
            value={statusId}
            onChange={(e) => setStatusId(Number(e.target.value))}
            size="small"
            sx={{
              gridColumn: {
                xs: "2",
                md: "auto",
              },
              "& .MuiOutlinedInput-root": {
                minHeight: 44,
                borderRadius: 1,
                backgroundColor: "#FFFFFF",

                "& fieldset": {
                  borderColor: "#A9CFE7",
                  borderWidth: 1,
                },

                "&:hover fieldset": {
                  borderColor: "#6FB3D8",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#42A5D5",
                  borderWidth: 1.5,
                },
              },

              "& .MuiInputLabel-root": {
                fontSize: 13,
                color: "#526D7D",
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2386B8",
              },

              "& .MuiSelect-select": {
                fontSize: 13,
              },
            }}
          >
            {checklistStatuses.map((status) => (
              <MenuItem key={status.id} value={status.id}>
                {status.name}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            startIcon={
              loading ? undefined : <AddRoundedIcon sx={{ fontSize: 19 }} />
            }
            onClick={handleAdd}
            disabled={loading || !name.trim()}
            sx={{
              gridColumn: {
                xs: "1 / -1",
                md: "auto",
              },
              mt: {
                xs: 0.5,
                md: 0,
              },
              minWidth: 105,
              minHeight: 44,
              borderRadius: 1,
              textTransform: "none",
              fontSize: 13.5,
              fontWeight: 700,
              backgroundColor: "#2386B8",
              boxShadow: "none",

              "&:hover": {
                backgroundColor: "#1D719C",
                boxShadow: "none",
              },

              "&.Mui-disabled": {
                backgroundColor: "#BFD5E2",
                color: "#FFFFFF",
              },
            }}
          >
            {loading ? "Adding..." : "Add item"}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default AddItemBar;