import { forwardRef, useState } from "react";

import {
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

type PasswordFieldProps = TextFieldProps;

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <TextField
        {...props}
        ref={ref}
        type={showPassword ? "text" : "password"}
        slotProps={{
          input: {
            ...(props.slotProps?.input ?? {}),

            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),

            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    );
  }
);

PasswordField.displayName = "PasswordField";

export default PasswordField;