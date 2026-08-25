import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import logo from "../assets/images/logo/UniReady.png";

const Logo = () => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="UniReady"
        sx={{
          height: {
            xs: 48,
            md: 62,
          },
          width: "auto",
          display: "block",
          cursor: "pointer",
        }}
      />
    </Box>
  );
};

export default Logo;