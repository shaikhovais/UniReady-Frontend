import { type KeyboardEvent } from "react";

import {
  ArrowBackRounded,
  SearchRounded,
  TuneRounded,
} from "@mui/icons-material";

import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { Lookup } from "../../../../../types/core/common/Lookup";

export interface SearchFilterBarProps {
  categories: Lookup[];
  search: string;
  categoryId: number | null;
  savedOnly: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  onChange: (params: {
    search: string;
    categoryId: number | null;
    savedOnly: boolean;
  }) => void;
  onSearch: () => void;
}

const SearchFilterBar = ({
  categories,
  search,
  categoryId,
  savedOnly,
  showBackButton = false,
  onBack,
  onChange,
  onSearch,
}: SearchFilterBarProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <Stack spacing={1.5}>
      {showBackButton && (
        <Button
          startIcon={<ArrowBackRounded sx={{ fontSize: 18 }} />}
          onClick={onBack}
          sx={{
            alignSelf: "flex-start",
            minWidth: 0,
            px: 0.5,
            py: 0.5,
            borderRadius: "8px",
            textTransform: "none",
            fontSize: 13,
            fontWeight: 700,
            color: "#64748B",

            "&:hover": {
              backgroundColor: "#F1F5F9",
              color: "#1F2937",
            },
          }}
        >
          Back to all resources
        </Button>
      )}

      <Box
        sx={{
          borderRadius: "18px",
          overflow: "hidden",
          border: "1px solid #E5EDE8",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 4px 16px rgba(15, 23, 42, 0.035)",
        }}
      >
        <Box
          sx={{
            px: {
              xs: 2,
              sm: 2.5,
            },
            py: 1.75,
            background:
              "linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%)",
            borderBottom: "1px solid #E5EFE8",
          }}
        >
          <Stack
            direction="row"
            spacing={1.25}
            sx={{
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#DCFCE7",
                color: "#15803D",
                flexShrink: 0,
              }}
            >
              <TuneRounded sx={{ fontSize: 19 }} />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 14.5,
                  fontWeight: 800,
                  color: "#172033",
                  lineHeight: 1.3,
                }}
              >
                Find a Guide
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: 12,
                  color: "#64748B",
                  lineHeight: 1.4,
                }}
              >
                Search and filter resources to find what you need.
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            p: {
              xs: 1.75,
              sm: 2.5,
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gap: 1.25,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1.6fr 1fr",
                lg: "1.6fr 1fr 1fr auto",
              },
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Search guides, topics or keywords..."
              value={search}
              onChange={(event) =>
                onChange({
                  search: event.target.value,
                  categoryId,
                  savedOnly,
                })
              }
              onKeyDown={handleKeyDown}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded
                        sx={{
                          fontSize: 19,
                          color: "#94A3B8",
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 46,
                  borderRadius: "11px",
                  backgroundColor: "#FFFFFF",
                  transition: "all 0.15s ease",

                  "& fieldset": {
                    borderColor: "#E2E8F0",
                  },

                  "&:hover fieldset": {
                    borderColor: "#CBD5E1",
                  },

                  "&.Mui-focused": {
                    boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.08)",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#16A34A",
                  },
                },

                "& .MuiOutlinedInput-input": {
                  fontSize: 13.5,
                },
              }}
            />

            <FormControl fullWidth>
              <Select
                value={categoryId ?? -1}
                displayEmpty
                onChange={(event) =>
                  onChange({
                    search,
                    categoryId:
                      Number(event.target.value) === -1
                        ? null
                        : Number(event.target.value),
                    savedOnly,
                  })
                }
                sx={{
                  height: 46,
                  borderRadius: "11px",
                  backgroundColor: "#FFFFFF",
                  fontSize: 13.5,

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E2E8F0",
                  },

                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#CBD5E1",
                  },

                  "&.Mui-focused": {
                    boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.08)",
                  },

                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#16A34A",
                  },
                }}
              >
                <MenuItem value={-1}>All Categories</MenuItem>

                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Select
                value={savedOnly ? "saved" : "all"}
                onChange={(event) =>
                  onChange({
                    search,
                    categoryId,
                    savedOnly: event.target.value === "saved",
                  })
                }
                sx={{
                  height: 46,
                  borderRadius: "11px",
                  backgroundColor: "#FFFFFF",
                  fontSize: 13.5,

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E2E8F0",
                  },

                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#CBD5E1",
                  },

                  "&.Mui-focused": {
                    boxShadow: "0 0 0 3px rgba(22, 163, 74, 0.08)",
                  },

                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#16A34A",
                  },
                }}
              >
                <MenuItem value="all">All Articles</MenuItem>
                <MenuItem value="saved">Saved Only</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={onSearch}
              startIcon={<SearchRounded sx={{ fontSize: 18 }} />}
              sx={{
                height: 46,
                px: 2.25,
                borderRadius: "11px",
                textTransform: "none",
                fontSize: 13.5,
                fontWeight: 700,
                backgroundColor: "#16A34A",
                boxShadow: "0 4px 12px rgba(22, 163, 74, 0.18)",
                whiteSpace: "nowrap",

                "&:hover": {
                  backgroundColor: "#15803D",
                  boxShadow: "0 6px 16px rgba(22, 163, 74, 0.22)",
                  transform: "translateY(-1px)",
                },

                "&:active": {
                  transform: "translateY(0)",
                },

                transition:
                  "background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default SearchFilterBar;