import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  // Checkbox,
  // Divider,
  // FormControlLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

import { AxiosError } from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordField from "./PasswordField";
// import GoogleAuthButton from "./GoogleAuthButton";

import { loginSchema } from "../validation/loginSchema";
import type { LoginFormData } from "../validation/loginSchema";
import type { AuthResponse } from '../../../types/core/auth'
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../routes/path";

const LoginForm = () => {
  const navigate = useNavigate();

  const auth = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const emailRegister = register("email");
  const passwordRegister = register("password");

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage("");

    try {
      const response: AuthResponse = await auth.login(data);
      
      if(response.profileCompleted) {
        navigate(ROUTES.DASHBOARD);
      } else {
        navigate(ROUTES.PROFILE);
      }

    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data?.message ??
            "Unable to sign in. Please try again."
        );
      } else {
        setErrorMessage("Something went wrong.");
      }
    }
  };

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
          Welcome back
        </Typography>

        <Typography color="text.secondary">
          Sign in to your account and continue making life in the UK simpler.
        </Typography>
      </Box>

      <Stack
        component="form"
        spacing={2.5}
        onSubmit={handleSubmit(onSubmit)}
      >
        {errorMessage && (
          <Alert severity="error" sx={{borderRadius: 1, alignItems: "center"}}>
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

        <PasswordField
          fullWidth
          label="Password"
          placeholder="Enter your password"
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

        <Typography
          component={Link}
          to="/forgot-password"
          sx={{
            color: "primary.main",
            fontSize: "0.9rem",
            textDecoration: "none",
            width: "fit-content",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Forgot your password?
        </Typography>

        {/* <FormControlLabel
          control={<Checkbox />}
          label="Remember me"
        /> */}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          startIcon={<LoginRoundedIcon />}
        >
          {isSubmitting ? "Signing in..." : "Log in"}
        </Button>

        {/* <Divider>or continue with</Divider>

        <GoogleAuthButton /> */}

        <Typography
          sx={{
            textAlign: "center",
            fontSize: "0.9rem",
            color: "text.secondary",
          }}
        >
          Don't have an account?{" "}
          <Box
            component={Link}
            to="/register"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Create account
          </Box>
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoginForm;