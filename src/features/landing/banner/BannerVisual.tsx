import { Box } from "@mui/material";
import FloatingCards from "./FloatingCards";
import bannerImage from "../../../assets/images/landing/glasgow-banner.webp";

const BannerVisual = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        component="img"
        src={bannerImage}
        alt="Glasgow Skyline"
        sx={{
          width: "100%",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",

          maxHeight: {
            xs: "none",
            lg: "clamp(400px, 52vh, 600px)",
          },

          objectFit: "contain",
        }}
      />
      <FloatingCards />
    </Box>
  );
};

export default BannerVisual;