import { useState } from "react";

import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

interface VerifyOtpFormProps {
  email: string;
  onConfirm: (otp: string) => void;
  onBack: () => void;
}

const VerifyOtpForm = ({ email, onConfirm, onBack }: VerifyOtpFormProps) => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 6);

    setOtp(value);
  };

  const handleConfirm = () => {
    if (otp.length !== 6) {
      return;
    }
    onConfirm(otp);
  };

  return (
    <Box>
      <Box
        sx={{
          textAlign: "center",
          mb: 4,
        }}
      >
        <Box
          sx={{
            width: 58,
            height: 58,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            bgcolor: "rgba(46, 125, 98, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LockOutlinedIcon
            sx={{
              fontSize: 28,
              color: "primary.main",
            }}
          />
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          Enter verification code
        </Typography>

        <Typography color="text.secondary">
          Enter the 6-digit code sent to
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          {email}
        </Typography>
      </Box>

      <Stack spacing={2.5}>
        <TextField
          fullWidth
          label="Verification Code"
          placeholder="Enter 6-digit code"
          value={otp}
          onChange={handleOtpChange}
          slotProps={{
            htmlInput: {
              maxLength: 6,
              inputMode: "numeric",
              pattern: "[0-9]*",
            },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          variant="contained"
          size="large"
          startIcon={<CheckCircleOutlineRoundedIcon />}
          onClick={handleConfirm}
          disabled={otp.length !== 6}
          sx={{
            py: 1.4,
            textTransform: "none",
          }}
        >
          Confirm code
        </Button>

        <Divider>Entered the wrong email?</Divider>

        <Button
          variant="outlined"
          size="large"
          startIcon={<ArrowBackRoundedIcon />}
          onClick={onBack}
          sx={{
            py: 1.4,
            textTransform: "none",
          }}
        >
          Change email
        </Button>
      </Stack>
    </Box>
  );
};

export default VerifyOtpForm;
