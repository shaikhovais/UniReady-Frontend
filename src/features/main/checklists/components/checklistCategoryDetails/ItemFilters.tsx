import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import {
  Box,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import type { Lookup } from "../../../../../types/core/common/Lookup";

interface Props {
  search: string;
  status: number | "";
  importance: number | "";

  checklistStatuses: Lookup[];
  checklistImportances: Lookup[];

  onSearchChange: (value: string) => void;
  onStatusChange: (value: number | "") => void;
  onImportanceChange: (value: number | "") => void;
}

const ItemFilters = ({
  search,
  status,
  importance,
  checklistStatuses,
  checklistImportances,
  onSearchChange,
  onStatusChange,
  onImportanceChange,
}: Props) => {
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            md: "minmax(0, 2fr) 190px 190px",
          },
          gap: { xs: 1.25, sm: 1.5 },
        }}
      >
        <TextField
          fullWidth
          placeholder="Search items..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            gridColumn: {
              xs: "1 / -1",
              md: "auto",
            },
            "& .MuiOutlinedInput-root": {
              minHeight: 44,
              bgcolor: "#FFFFFF",
              borderRadius: 1,

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
              fontSize: {
                xs: 13,
                sm: 14,
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon
                    sx={{
                      color: "#7FA8BF",
                      fontSize: 21,
                    }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          select
          fullWidth
          value={importance}
          onChange={(e) =>
            onImportanceChange(
              e.target.value === "" ? "" : Number(e.target.value),
            )
          }
          sx={{
            gridColumn: {
              xs: "1",
              md: "auto",
            },
            "& .MuiOutlinedInput-root": {
              minHeight: 44,
              bgcolor: "#FFFFFF",
              borderRadius: 1,

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
          }}
          slotProps={{
            select: {
              displayEmpty: true,
              renderValue: (value) => {
                if (value === "") {
                  return (
                    <Typography
                      sx={{
                        color: "#526D7D",
                        fontSize: {
                          xs: 12.5,
                          sm: 14,
                        },
                      }}
                    >
                      All Importance
                    </Typography>
                  );
                }

                return (
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 12.5,
                        sm: 14,
                      },
                      fontWeight: 600,
                      color: "#334155",
                    }}
                  >
                    {checklistImportances.find(
                      (x) => x.id === Number(value),
                    )?.name ?? ""}
                  </Typography>
                );
              },
            },
          }}
        >
          <MenuItem value="">All Importance</MenuItem>

          {[...checklistImportances]
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          select
          fullWidth
          value={status}
          onChange={(e) =>
            onStatusChange(
              e.target.value === "" ? "" : Number(e.target.value),
            )
          }
          sx={{
            gridColumn: {
              xs: "2",
              md: "auto",
            },
            "& .MuiOutlinedInput-root": {
              minHeight: 44,
              bgcolor: "#FFFFFF",
              borderRadius: 1,

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
          }}
          slotProps={{
            select: {
              displayEmpty: true,
              renderValue: (value) => {
                if (value === "") {
                  return (
                    <Typography
                      sx={{
                        color: "#526D7D",
                        fontSize: {
                          xs: 12.5,
                          sm: 14,
                        },
                      }}
                    >
                      All Status
                    </Typography>
                  );
                }

                return (
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 12.5,
                        sm: 14,
                      },
                      fontWeight: 600,
                      color: "#334155",
                    }}
                  >
                    {checklistStatuses.find(
                      (item) => item.id === Number(value),
                    )?.name ?? ""}
                  </Typography>
                );
              },
            },
          }}
        >
          <MenuItem value="">All Status</MenuItem>

          {[...checklistStatuses]
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </TextField>
      </Box>
    </Paper>
  );
};

export default ItemFilters;