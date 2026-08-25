import { AppBar, Box, Container, Toolbar } from "@mui/material";

import Logo from "../../../components/Logo";
// import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{mt: 2}}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            // pt: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Logo />

          {/* Desktop Navigation */}
          {/* <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <DesktopMenu />
          </Box> */}

          {/* Desktop Buttons */}
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <AuthButtons />
          </Box>

          {/* Mobile Menu */}
          <Box
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            <MobileMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;