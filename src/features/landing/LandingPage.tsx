import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "./navigation/Navbar";
import Banner from "./banner/Banner";
import Features from "./features/Features";

import { useAuth } from "../../hooks/useAuth";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Banner />
        <Features />
      </Box>
    </Box>
  );
};

export default LandingPage;