import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Typography,
} from "@mui/material";

type ConfirmDeleteDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmDeleteDialog = ({
  open,
  title,
  description,
  confirmLabel,
  isSubmitting,
  onClose,
  onConfirm,
}: ConfirmDeleteDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(15,23,42,0.48)",
            backdropFilter: "blur(6px)",
          },
        },
        paper: {
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 24px 70px rgba(15,23,42,0.18)",
          },
        },
      }}
    >
      <Box
        sx={{
          height: {
            xs: 105,
            sm: 115,
          },
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #FFF5F5 0%, #FFF8F8 52%, #FFF2F2 100%)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 145,
            height: 145,
            borderRadius: "50%",
            backgroundColor: "#FEE2E2",
            top: -95,
            right: -40,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "#FFE4E6",
            bottom: -70,
            left: -35,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 45,
            height: 45,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.65)",
            top: 18,
            left: 35,
          }}
        />

        <Box
          sx={{
            position: "relative",
            width: {
              xs: 58,
              sm: 62,
            },
            height: {
              xs: 58,
              sm: 62,
            },
            borderRadius: "13px",
            backgroundColor: "#FFFFFF",
            display: "grid",
            placeItems: "center",
            color: "#DC2626",
            boxShadow: "0 10px 25px rgba(220,38,38,0.11)",
          }}
        >
          <DeleteOutlineRoundedIcon
            sx={{
              fontSize: {
                xs: 31,
                sm: 33,
              },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          px: {
            xs: 2.25,
            sm: 2.75,
          },
          pt: {
            xs: 2,
            sm: 2.25,
          },
          pb: 0.5,
          textAlign: "center",
        }}
      >
        <DialogTitle
          sx={{
            p: 0,
            fontSize: {
              xs: 19,
              sm: 20,
            },
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: "-0.3px",
            color: "#0F172A",
          }}
        >
          {title}
        </DialogTitle>

        <DialogContent
          sx={{
            p: 0,
            mt: 0.75,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 12.5,
                sm: 13,
              },
              lineHeight: 1.5,
              color: "#64748B",
              maxWidth: 340,
              mx: "auto",
            }}
          >
            {description}
          </Typography>
        </DialogContent>
      </Box>

      <DialogActions
        sx={{
          px: {
            xs: 2.25,
            sm: 2.75,
          },
          pt: {
            xs: 1.75,
            sm: 2,
          },
          pb: {
            xs: 2.25,
            sm: 2.5,
          },
          gap: 0.75,
          justifyContent: "stretch",
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={onClose}
          disabled={isSubmitting}
          sx={{
            height: 40,
            borderRadius: "9px",
            textTransform: "none",
            fontSize: 12.5,
            fontWeight: 700,
            color: "#334155",
            borderColor: "rgba(15,23,42,0.12)",
            backgroundColor: "#FFFFFF",

            "&:hover": {
              borderColor: "rgba(15,23,42,0.20)",
              backgroundColor: "#F8FAFC",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={onConfirm}
          disabled={isSubmitting}
          sx={{
            height: 40,
            borderRadius: "9px",
            textTransform: "none",
            fontSize: 12.5,
            fontWeight: 700,
            color: "#FFFFFF",
            backgroundColor: "#DC2626",
            boxShadow: "none",
            position: "relative",
            overflow: "hidden",

            "&:hover": {
              backgroundColor: "#B91C1C",
              boxShadow: "none",
            },

            "&.Mui-disabled": {
              backgroundColor: "#DC2626",
              color: "#FFFFFF",
              opacity: 0.85,
            },
          }}
        >
          {isSubmitting ? "Deleting..." : confirmLabel}

          {isSubmitting && (
            <LinearProgress
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 2,
                backgroundColor: "rgba(255,255,255,0.25)",

                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#FFFFFF",
                },
              }}
            />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;