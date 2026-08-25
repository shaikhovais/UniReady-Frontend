import { InputAdornment, TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

interface AppTextFieldProps
  extends Omit<TextFieldProps, "variant"> {
  icon?: React.ReactNode;
}

export default function AppTextField({
  icon,
  slotProps,
  sx,
  ...props
}: AppTextFieldProps) {
  return (
    <TextField
      {...props}
      variant="outlined"
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          startAdornment: icon ? (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ) : undefined,
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          minHeight: 56,
          bgcolor: "background.paper",

          "& fieldset": {
            borderColor: "divider",
          },

          "&:hover fieldset": {
            borderColor: "primary.main",
          },

          "&.Mui-focused fieldset": {
            borderWidth: 2,
          },
        },

        ...sx,
      }}
    />
  );
}