import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

import { Link } from "react-router-dom";

import PasswordField from "../PasswordField";
import {
  registerSchema,
  type RegisterFormData,
} from "../../validation/registerSchema";
import TipCard from "../../../../components/TipCard";

interface ResetPasswordFormProps {
  email: string;
  onPasswordChanged: (email: string, password: string) => void;
}

const ResetPasswordForm = ({
  email,
  onPasswordChanged,
}: ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email,
      password: "",
      confirmPassword: "",
    },
  });

  const passwordField = register("password");
  const confirmPasswordField = register("confirmPassword");

  const onSubmit = (data: RegisterFormData) => {
    onPasswordChanged(email, data.password);
  };

  return (
    <Box>
      <Box
        sx={{
          textAlign: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
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
          }}
        >
          Create a new password
        </Typography>

        <Typography color="text.secondary">
          Enter a new password for your UniReady account.
        </Typography>
      </Box>

      <Stack
        component="form"
        spacing={2.5}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TipCard description="Use at least 8 characters, including one uppercase letter and one number."/>
        <PasswordField
          fullWidth
          label="New Password"
          placeholder="Create a new password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...passwordField}
        />

        <PasswordField
          fullWidth
          label="Confirm New Password"
          placeholder="Confirm your new password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...confirmPasswordField}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<CheckCircleOutlineRoundedIcon />}
          disabled={isSubmitting}
          sx={{
            py: 1.4,
            textTransform: "none",
          }}
        >
          Change password
        </Button>

        <Button
          component={Link}
          to="/login"
          variant="outlined"
          size="large"
          sx={{
            py: 1.4,
            textTransform: "none",
          }}
        >
          Back to log in
        </Button>
      </Stack>
    </Box>
  );
};

export default ResetPasswordForm;