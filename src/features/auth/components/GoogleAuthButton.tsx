import { Button } from "@mui/material";

const GoogleAuthButton = () => {
  return (
    <Button
      fullWidth
      variant="outlined"
      sx={{
        py: 1.4,
        color: "text.primary",
        borderColor: "#D8DDD9",
        textTransform: "none",
        fontSize: "0.95rem",
        fontWeight: 500,
      }}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleAuthButton;