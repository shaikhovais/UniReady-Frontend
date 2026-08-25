import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  // Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

import { AxiosError } from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordField from "./PasswordField";
// import GoogleAuthButton from "./GoogleAuthButton";

import {
  registerSchema,
  type RegisterFormData,
} from "../validation/registerSchema";

import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../routes/path";
import type { AuthResponse } from "../../../types/core/auth";
import TipCard from "../../../components/TipCard";

const RegisterForm = () => {
  const navigate = useNavigate();

  const auth = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const emailRegister = register("email");
  const passwordRegister = register("password");
  const confirmPasswordRegister = register("confirmPassword");

  const onSubmit = async (data: RegisterFormData) => {
    setErrorMessage("");

    try {
      const response: AuthResponse = await auth.register({
        email: data.email,
        password: data.password,
      });
      if (response.token !== "") {
        navigate(ROUTES.PROFILE);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data?.message ??
            "Unable to save your profile. Please try again.",
        );
      } else {
        setErrorMessage("Something went wrong.");
      }
    }
  };

  return (
    <Box>
      {/* Heading */}
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
          Create your account
        </Typography>

        <Typography color="text.secondary">
          Join UniReady and make planning, organising and managing life in
          the UK easier.
        </Typography>
      </Box>

      {/* Form */}
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && (
          <Alert
            severity="error"
            sx={{ borderRadius: 1, alignItems: "center" }}
          >
            {errorMessage}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email Address"
          placeholder="Enter your email address"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...emailRegister}
          onChange={(e) => {
            if (errorMessage) {
              setErrorMessage("");
            }

            emailRegister.onChange(e);
          }}
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

        <TipCard description="Use at least 8 characters, including one uppercase letter and one number." />
        
        <PasswordField
          fullWidth
          label="Password"
          placeholder="Create a password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...passwordRegister}
          onChange={(e) => {
            if (errorMessage) {
              setErrorMessage("");
            }

            passwordRegister.onChange(e);
          }}
        />

        <PasswordField
          fullWidth
          label="Confirm Password"
          placeholder="Confirm your password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...confirmPasswordRegister}
          onChange={(e) => {
            if (errorMessage) {
              setErrorMessage("");
            }

            confirmPasswordRegister.onChange(e);
          }}
        />

        {/* Create Account */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          startIcon={<PersonAddAltRoundedIcon />}
          sx={{
            py: 1.4,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>

        {/* Google Register */}
        {/* <Divider>or continue with</Divider>
        <GoogleAuthButton /> */}

        <Typography
          sx={{
            textAlign: "center",
            fontSize: "0.9rem",
            color: "text.secondary",
          }}
        >
          Already have an account?{" "}
          <Box
            component={Link}
            to={ROUTES.LOGIN}
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Log in
          </Box>
        </Typography>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
