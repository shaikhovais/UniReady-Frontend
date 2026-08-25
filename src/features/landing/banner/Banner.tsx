import { Box, Container } from "@mui/material";

import BannerContent from "./BannerContent";
import BannerVisual from "./BannerVisual";

const Banner = () => {
  return (
    <Box
      component="section"
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "42% 58%",
          },

          alignItems: "center",

          columnGap: {
            xs: 4,
            md: 0,
          },
        }}
      >
        {/* Left Side */}

        <Container
          maxWidth={false}
          sx={{
            maxWidth: "xl",
            ml: "auto",
            width: "100%",

            pr: {
              xs: 2,
              md: 6,
            },

            pl: {
              xs: 2,
              md: 4,
            },
          }}
        >
          <BannerContent />
        </Container>

        {/* Right Side */}

        <BannerVisual />
      </Box>
    </Box>
  );
};

export default Banner;