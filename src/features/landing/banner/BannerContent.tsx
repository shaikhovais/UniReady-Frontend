import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const BannerContent = () => {
  return (
    <Box
      sx={{
        maxWidth: 450,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "2rem",
          lineHeight: 1.05,
          mb: 0,
        }}
      >
        New country.
        <br />
        New opportunities.
      </Typography>

      <Typography
        variant="h1"
        sx={{
          color: "primary.main",
          fontSize: "2rem",
          lineHeight: 1,
          mb: 1,
        }}
      >
        We've got your back.
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: 520,
          mb: 1,
          fontSize: "0.8rem",
        }}
      >
        UniReady helps you make life in the UK simpler with personalised checklists, budgeting tools, shopping lists, useful resources and practical guidance, all in one place.
      </Typography>

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        sx={{
          mb: 1,
        }}
      >
        <Button
          component={Link}
          to="/register"
          variant="contained"
          startIcon={<PersonAddAlt1Icon />}
          sx={{
            height: 40,
            px: 3,
          }}
        >
          Create Account
        </Button>

        <Button
          component={Link}
          to="/login"
          variant="outlined"
          startIcon={<LoginIcon />}
          sx={{
            height: 40,
            px: 2,
          }}
        >
          Log In
        </Button>
      </Stack>
    </Box>
  );
};

export default BannerContent;
