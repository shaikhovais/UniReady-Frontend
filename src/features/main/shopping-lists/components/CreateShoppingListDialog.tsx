import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type CreateShoppingListDialogProps = {
  open: boolean;
  name: string;
  description: string;
  isSubmitting: boolean;
  onClose: () => void;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: () => void;
};

const CreateShoppingListDialog = ({
  open,
  name,
  description,
  isSubmitting,
  onClose,
  onNameChange,
  onDescriptionChange,
  onSubmit,
}: CreateShoppingListDialogProps) => {
  const isNameValid = name.trim().length > 0;

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(15, 23, 42, 0.42)",
            backdropFilter: "blur(4px)",
          },
        },
        paper: {
          sx: {
            borderRadius: "22px",
            overflow: "hidden",
            boxShadow: "0 24px 70px rgba(15, 23, 42, 0.18)",
            border: "1px solid #E2E8E5",
            backgroundColor: "#FFFFFF",
          },
        },
      }}
    >
      {/* HEADER */}
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
          background:
            "linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 75%)",
          borderBottom: "1px solid #E8EFEB",
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
          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 20,
                  sm: 22,
                },
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.25,
                color: "#172033",
              }}
            >
              Create New List
            </Typography>

            <Typography
              sx={{
                mt: 0.6,
                fontSize: 12.5,
                lineHeight: 1.6,
                color: "#64748B",
              }}
            >
              Create a list to keep your shopping organised.
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            disabled={isSubmitting}
            size="small"
            sx={{
              width: 34,
              height: 34,
              flexShrink: 0,
              color: "#64748B",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8E5",
              "&:hover": {
                backgroundColor: "#F8FAF9",
                color: "#172033",
                borderColor: "#CBD5E1",
              },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 19 }} />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent
        sx={{
          px: {
            xs: 2.5,
            sm: 3,
          },
          pt: {
            xs: 2.5,
            sm: 3,
          },
          pb: 1.5,
        }}
      >
        <Stack spacing={2.5}>
          {/* LIST NAME */}
          <Box>
            <Typography
              sx={{
                mb: 0.8,
                fontSize: 12.5,
                fontWeight: 750,
                color: "#172033",
              }}
            >
              List Name{" "}
              <Box
                component="span"
                sx={{
                  color: "#DC2626",
                }}
              >
                *
              </Box>
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="e.g. Christmas Shopping"
              value={name}
              onChange={(event) =>
                onNameChange(event.target.value)
              }
              disabled={isSubmitting}
              slotProps={{
                htmlInput: {
                  maxLength: 50,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  minHeight: 46,
                  borderRadius: "12px",
                  backgroundColor: "#F8FAF9",
                  fontSize: 13,

                  "& fieldset": {
                    borderColor: "#E2E8E5",
                  },

                  "&:hover": {
                    backgroundColor: "#FFFFFF",

                    "& fieldset": {
                      borderColor: "#CBD5E1",
                    },
                  },

                  "&.Mui-focused": {
                    backgroundColor: "#FFFFFF",

                    "& fieldset": {
                      borderColor: "#16A34A",
                      borderWidth: 1,
                    },
                  },
                },

                "& .MuiOutlinedInput-input": {
                  px: 1.5,
                  py: 1.25,

                  "&::placeholder": {
                    color: "#94A3B8",
                    opacity: 1,
                  },
                },
              }}
            />

            <Box
              sx={{
                mt: 0.65,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                sx={{
                  fontSize: 10.5,
                  color: "#94A3B8",
                }}
              >
                {name.length}/50
              </Typography>
            </Box>
          </Box>

          {/* DESCRIPTION */}
          <Box>
            <Typography
              sx={{
                mb: 0.8,
                fontSize: 12.5,
                fontWeight: 750,
                color: "#172033",
              }}
            >
              Description{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 500,
                  color: "#94A3B8",
                }}
              >
                Optional
              </Box>
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="e.g. Gifts, decorations, wrapping paper, food..."
              value={description}
              onChange={(event) =>
                onDescriptionChange(event.target.value)
              }
              disabled={isSubmitting}
              slotProps={{
                htmlInput: {
                  maxLength: 120,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#F8FAF9",
                  fontSize: 13,

                  "& fieldset": {
                    borderColor: "#E2E8E5",
                  },

                  "&:hover": {
                    backgroundColor: "#FFFFFF",

                    "& fieldset": {
                      borderColor: "#CBD5E1",
                    },
                  },

                  "&.Mui-focused": {
                    backgroundColor: "#FFFFFF",

                    "& fieldset": {
                      borderColor: "#16A34A",
                      borderWidth: 1,
                    },
                  },
                },

                "& .MuiOutlinedInput-input": {
                  px: 1.5,
                  py: 1.25,

                  "&::placeholder": {
                    color: "#94A3B8",
                    opacity: 1,
                  },
                },
              }}
            />

            <Box
              sx={{
                mt: 0.65,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                sx={{
                  fontSize: 10.5,
                  color: "#94A3B8",
                }}
              >
                {description.length}/120
              </Typography>
            </Box>
          </Box>
        </Stack>
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions
        sx={{
          px: {
            xs: 2.5,
            sm: 3,
          },
          pt: 1.5,
          pb: {
            xs: 2.5,
            sm: 3,
          },
          gap: 1,
          borderTop: "1px solid #F1F5F3",
          backgroundColor: "#FCFDFC",
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isSubmitting}
          sx={{
            minWidth: 110,
            height: 42,
            px: 2,
            borderRadius: "11px",
            textTransform: "none",
            fontSize: 13,
            fontWeight: 700,
            color: "#475569",
            borderColor: "#E2E8E5",
            backgroundColor: "#FFFFFF",

            "&:hover": {
              borderColor: "#CBD5E1",
              backgroundColor: "#F8FAF9",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!isNameValid || isSubmitting}
          sx={{
            minWidth: 132,
            height: 42,
            px: 2,
            borderRadius: "11px",
            textTransform: "none",
            fontSize: 13,
            fontWeight: 700,
            backgroundColor: "#16A34A",
            boxShadow: "0 5px 14px rgba(22, 163, 74, 0.18)",

            "&:hover": {
              backgroundColor: "#15803D",
              boxShadow: "0 6px 18px rgba(22, 163, 74, 0.22)",
            },

            "&.Mui-disabled": {
              backgroundColor: "#E2E8E5",
              color: "#94A3B8",
              boxShadow: "none",
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress
              size={18}
              sx={{
                color: "#FFFFFF",
              }}
            />
          ) : (
            "Create List"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateShoppingListDialog;