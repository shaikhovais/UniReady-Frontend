import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <Box
    	sx={{
        width: "100%",
        maxWidth: 560,
        bgcolor: "#FFFFFF",
        borderRadius: 1,
        boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
        px: {
          xs: 2.5,
          sm: 4,
          md: 5,
        },
        py: {
          xs: 3,
          md: 4,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default AuthCard;