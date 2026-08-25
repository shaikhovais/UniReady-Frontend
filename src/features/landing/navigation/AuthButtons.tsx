import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const AuthButtons = () => {
  return (
    <Stack direction="row" spacing={2} sx={{ pr: 2 }}>
      <Button
        component={Link}
        to="/login"
        variant="outlined"
        sx={{
          minWidth: 120,
        }}
      >
        Log In
      </Button>

      <Button
        component={Link}
        to="/register"
        variant="contained"
        sx={{
          minWidth: 120,
        }}
      >
        Register
      </Button>
    </Stack>
  );
};

export default AuthButtons;
