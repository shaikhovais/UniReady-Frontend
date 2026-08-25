import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import AuthForm from "./components/AuthForm";

import logo from "../../assets/images/logo/UniReady.png";
import authBackground from "../../assets/images/auth/auth-bg.png";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export type AuthMode = "login" | "register" | "forgot-password";

interface AuthPageProps {
  mode: AuthMode;
}

const AuthPage = ({ mode }: AuthPageProps) => {
  const { isAuthenticated, isProfileCompleted } = useAuth();
  if (isAuthenticated) {
    return (
      <Navigate to={isProfileCompleted ? "/dashboard" : "/profile"} replace />
    );
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      {/* Glasgow map background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${authBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.75,
          pointerEvents: "none",
        }}
      />

      {/* Back to home */}

      <Box
        component={Link}
        to="/"
        sx={{
          position: "absolute",
          top: {
            xs: 20,
            md: 28,
          },
          right: {
            xs: 20,
            md: 32,
          },
          zIndex: 3,
          display: "inline-flex",
          alignItems: "center",
          gap: 0.8,
          px: {
            xs: 1.5,
            md: 1.8,
          },
          py: {
            xs: 0.9,
            md: 1,
          },
          borderRadius: "999px",
          backgroundColor: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(46, 125, 98, 0.12)",
          boxShadow: "0 4px 16px rgba(15, 23, 42, 0.08)",
          color: "#2E7D62",
          textDecoration: "none",
          transition: "all 0.2s ease",

          "&:hover": {
            backgroundColor: "#FFFFFF",
            transform: "translateY(-1px)",
            boxShadow: "0 6px 20px rgba(15, 23, 42, 0.12)",
          },
        }}
      >
        <ArrowBackRoundedIcon
          sx={{
            fontSize: {
              xs: 30,
              md: 40,
            },
          }}
        />
      </Box>

      {/* Auth content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: {
            xs: "flex-start",
            md: "center",
          },
          px: {
            xs: 2,
            sm: 3,
          },
          py: {
            xs: 3,
            md: 3,
          },
        }}
      >
        {/* Mobile logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: {
              xs: "inline-flex",
              md: "none",
            },
            justifyContent: "center",
            mb: 2,
            textDecoration: "none",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="UniReady"
            sx={{
              height: 52,
              width: "auto",
              display: "block",
            }}
          />
        </Box>

        {/* Auth form */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AuthForm mode={mode} />
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
