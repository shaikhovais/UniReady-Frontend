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

import { Link, useNavigate } from "react-router-dom";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

import VerifyOtpForm from "./VerifyOtpForm";
import ResetPasswordForm from "./ResetPasswordForm";

import {
  requestPasswordReset,
  verifyResetOtp,
  resetPassword,
} from "../../../../services/core/authService";

type ResetStep = "email" | "otp" | "password";

const ErrorMessage = ({ message }: { message: string }) => {
  if (!message) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1.5,
        py: 1.2,
        borderRadius: 1,
        bgcolor: "#FFF1F1",
        color: "#C62828",
      }}
    >
      <ErrorOutlineRoundedIcon
        sx={{
          fontSize: 20,
        }}
      />

      <Typography
        sx={{
          fontSize: "0.85rem",
          fontWeight: 500,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

const ForgotPasswordForm = () => {
  const [step, setStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSendResetLink = async () => {
    if (!isValidEmail) {
      return;
    }

    setErrorMessage("");

    try {
      const response = await requestPasswordReset(email.trim());

      if (!response.success) {
        setErrorMessage(response.message);
        return;
      }

      setStep("otp");
    } catch {
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const handleOtpConfirmed = async (otp: string) => {
    setErrorMessage("");

    try {
      const response = await verifyResetOtp(email.trim(), otp);

      if (!response.success) {
        setErrorMessage(response.message);
        return;
      }

      setStep("password");
    } catch {
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const handlePasswordChanged = async (email: string, password: string) => {
    setErrorMessage("");

    try {
      const response = await resetPassword(email.trim(), password);

      if (!response.success) {
        setErrorMessage(response.message);
        return;
      }

      navigate("/login");
    } catch {
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  if (step === "otp") {
    return (
      <Stack spacing={2.5}>
        <ErrorMessage message={errorMessage} />

        <VerifyOtpForm
          email={email}
          onConfirm={handleOtpConfirmed}
          onBack={() => {
            setErrorMessage("");
            setStep("email");
          }}
        />
      </Stack>
    );
  }

  if (step === "password") {
    return (
      <Stack spacing={2.5}>
        <ErrorMessage message={errorMessage} />

        <ResetPasswordForm
          email={email}
          onPasswordChanged={handlePasswordChanged}
        />
      </Stack>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          Forgot your password?
        </Typography>

        <Typography color="text.secondary">
          No worries! Enter your email address and we'll send you a link to
          reset your password.
        </Typography>
      </Box>

      <Stack spacing={2.5}>
        <ErrorMessage message={errorMessage} />

        <TextField
          fullWidth
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setErrorMessage("");
          }}
          type="email"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          variant="contained"
          size="large"
          startIcon={<SendOutlinedIcon />}
          onClick={handleSendResetLink}
          disabled={!isValidEmail}
          sx={{
            py: 1.4,
            textTransform: "none",
          }}
        >
          Send reset link
        </Button>

        <Divider>Remember your password?</Divider>

        <Button
          component={Link}
          to="/login"
          variant="outlined"
          size="large"
          startIcon={<ArrowBackRoundedIcon />}
          sx={{
            py: 1.4,
            textTransform: "none",
          }}
        >
          Back to log in
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            p: 2,
            borderRadius: 1,
            bgcolor: "rgba(46, 125, 98, 0.06)",
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              minWidth: 40,
              borderRadius: "50%",
              bgcolor: "rgba(46, 125, 98, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LightbulbOutlinedIcon
              sx={{
                fontSize: 22,
                color: "primary.main",
              }}
            />
          </Box>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: "0.8rem",
              lineHeight: 1.5,
            }}
          >
            If you don't see the email in your inbox, check your spam or junk
            folder.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default ForgotPasswordForm;
