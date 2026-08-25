import { Box, LinearProgress, Typography } from "@mui/material";

import loaderIllustration from "../../src/assets/images/common/Loader.png";

interface PageLoaderProps {
  message?: string;
}

const PageLoader = ({
  message = "Getting everything ready...",
}: PageLoaderProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: {
          xs: "calc(100vh - 68px)",
          md: "calc(100vh - 74px)",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 3,
        transform: {
          xs: "translateY(-4vh)",
          sm: "translateY(-5vh)",
          md: "translateY(-6vh)",
        },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src={loaderIllustration}
          alt=""
          sx={{
            width: {
              xs: 200,
              sm: 230,
              md: 250,
            },
            height: "auto",
            objectFit: "contain",
            display: "block",
            mb: 1.5,
          }}
        />

        <Typography
          sx={{
            fontSize: {
              xs: 14,
              sm: 15,
            },
            fontWeight: 700,
            color: "#172033",
            lineHeight: 1.4,
          }}
        >
          {message}
        </Typography>

        <Typography
          sx={{
            mt: 0.4,
            fontSize: 12.5,
            color: "#94A3B8",
          }}
        >
          Please wait a moment
        </Typography>

        <Box
          sx={{
            width: {
              xs: "70%",
              sm: 260,
            },
            mt: 1.75,
          }}
        >
          <LinearProgress
            sx={{
              height: 5,
              borderRadius: "999px",
              backgroundColor: "#E8F1EB",

              "& .MuiLinearProgress-bar": {
                borderRadius: "999px",
                background:
                  "linear-gradient(90deg, #22C55E, #15803D)",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PageLoader;