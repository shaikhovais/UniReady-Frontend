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
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";

type CreateShoppingStoreDialogProps = {
  open: boolean;
  storeName: string;
  isSubmitting: boolean;
  onClose: () => void;
  onStoreNameChange: (value: string) => void;
  onSubmit: () => void;
};

const CreateShoppingStoreDialog = ({
  open,
  storeName,
  isSubmitting,
  onClose,
  onStoreNameChange,
  onSubmit,
}: CreateShoppingStoreDialogProps) => {
  const isValid = storeName.trim().length > 0;

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2EAE5",
            boxShadow: "0 20px 55px rgba(15,23,42,0.14)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          px: {
            xs: 2,
            sm: 2.5,
          },
          pt: {
            xs: 2,
            sm: 2.25,
          },
          pb: {
            xs: 1.5,
            sm: 1.75,
          },
          background:
            "linear-gradient(135deg, #F5FBF7 0%, #FFFFFF 100%)",
          borderBottom: "1px solid #EEF3EF",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
          }}
        >
          <Stack
            direction="row"
            spacing={1.1}
            sx={{
              alignItems: "center",
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 38,
                  sm: 40,
                },
                height: {
                  xs: 38,
                  sm: 40,
                },
                borderRadius: "10px",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                backgroundColor: "#EAF7EE",
                color: "#15803D",

                "& svg": {
                  fontSize: {
                    xs: 20,
                    sm: 21,
                  },
                },
              }}
            >
              <StorefrontRoundedIcon />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 17,
                    sm: 18,
                  },
                  lineHeight: 1.2,
                  fontWeight: 800,
                  color: "#172033",
                  letterSpacing: "-0.015em",
                }}
              >
                Add New Store
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontSize: {
                    xs: 11,
                    sm: 11.5,
                  },
                  lineHeight: 1.35,
                  color: "#64748B",
                }}
              >
                Add a store to use in your shopping lists.
              </Typography>
            </Box>
          </Stack>

          <IconButton
            onClick={onClose}
            disabled={isSubmitting}
            size="small"
            sx={{
              width: 32,
              height: 32,
              flexShrink: 0,
              color: "#64748B",
              borderRadius: "8px",
              backgroundColor: "#F8FAF9",

              "&:hover": {
                backgroundColor: "#EEF3EF",
                color: "#172033",
              },
            }}
          >
            <CloseRoundedIcon
              sx={{
                fontSize: 18,
              }}
            />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          px: {
            xs: 2,
            sm: 2.5,
          },
          pt: {
            xs: 2,
            sm: 2.25,
          },
          pb: {
            xs: 1,
            sm: 1.25,
          },
        }}
      >
        <Stack spacing={0.75}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#172033",
            }}
          >
            Store Name
            <Box
              component="span"
              sx={{
                ml: 0.3,
                color: "#DC2626",
              }}
            >
              *
            </Box>
          </Typography>

          <TextField
            fullWidth
            placeholder="e.g. Morrisons"
            value={storeName}
            onChange={(event) =>
              onStoreNameChange(event.target.value)
            }
            disabled={isSubmitting}
            autoFocus
            slotProps={{
              htmlInput: {
                maxLength: 80,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                minHeight: 42,
                borderRadius: "9px",
                backgroundColor: "#FFFFFF",
                fontSize: 12.5,

                "& fieldset": {
                  borderColor: "#D8E2DC",
                },

                "&:hover fieldset": {
                  borderColor: "#AEBDB4",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#16A34A",
                  borderWidth: 1,
                },
              },

              "& .MuiOutlinedInput-input": {
                px: 1.25,
                py: 1.05,
              },

              "& .MuiOutlinedInput-input::placeholder": {
                color: "#94A3B8",
                opacity: 1,
              },
            }}
          />

          <Typography
            sx={{
              pt: 0.1,
              fontSize: 10.5,
              lineHeight: 1.35,
              color: "#94A3B8",
            }}
          >
            You can use this store when adding or updating shopping items.
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: {
            xs: 2,
            sm: 2.5,
          },
          pt: 0.75,
          pb: {
            xs: 1.75,
            sm: 2,
          },
          gap: 0.75,
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isSubmitting}
          sx={{
            minWidth: 90,
            height: 38,
            px: 1.5,
            borderRadius: "9px",
            textTransform: "none",
            fontSize: 12,
            fontWeight: 700,
            color: "#475569",
            borderColor: "#D8E2DC",
            backgroundColor: "#FFFFFF",

            "&:hover": {
              borderColor: "#B8C6BD",
              backgroundColor: "#F8FAF9",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!isValid || isSubmitting}
          sx={{
            minWidth: 102,
            height: 38,
            px: 1.75,
            borderRadius: "9px",
            textTransform: "none",
            fontSize: 12,
            fontWeight: 700,
            backgroundColor: "#16A34A",
            boxShadow: "none",

            "&:hover": {
              backgroundColor: "#15803D",
              boxShadow: "none",
            },

            "&.Mui-disabled": {
              backgroundColor: "#D8E0DB",
              color: "#94A3B8",
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress
              size={16}
              sx={{
                color: "#FFFFFF",
              }}
            />
          ) : (
            "Add Store"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateShoppingStoreDialog;