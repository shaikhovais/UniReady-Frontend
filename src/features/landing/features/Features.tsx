import { Box, Container } from "@mui/material";

// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import FeatureItem from "./FeatureItem";
import { featureData } from "./featureData";

const Features = () => {
  return (
    <Box
      component="section"
      sx={{
        py: {
          xs: 1,
          md: 2,
        },
        // pb: 2
      }}
    >
      <Container maxWidth="xl">
        <Box
        	sx={{
            bgcolor: "#FCFBF8",
            border: "1px solid #EEE7DF",
            borderRadius: 1,
            px: {
              xs: 1,
              md: 1.5,
            },
            py: {
              xs: 1,
              md: 1.5,
            },
            boxShadow: "0 10px 35px rgba(0,0,0,.04)",
          }}
        >
          {/* Heading */}

          {/* <Stack
            sx={{
              // mb: 1,
              gap: 1,
              alignItems: "center",
            }}
          >
            <Stack
              sx={{
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
              }}
            >
              <AutoAwesomeIcon
                sx={{
                  color: "#F6B73C",
                }}
              />

              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Kalam", cursive',
                  fontWeight: 700,
                  textAlign: "center",
                  fontSize: {
                    xs: "1rem",
                    md: "1.5rem",
                  },
                }}
              >
                Everything you need, in one place
              </Typography>
            </Stack>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                textAlign: "center",
                maxWidth: 650,
              }}
            >
              Everything international students need before arriving and after
              settling into life in the UK.
            </Typography>
          </Stack> */}

          {/* Desktop */}

          <Box
  sx={{
    display: {
      xs: "none",
      md: "flex",
    },
  }}
>
  {featureData.map((feature, index) => (
    <FeatureItem
      key={feature.title}
      {...feature}
      showDivider={index !== featureData.length - 1}
    />
  ))}
</Box>

          {/* Tablet & Mobile */}

          <Box
  sx={{
    display: {
      xs: "grid",
      md: "none",
    },
    gridTemplateColumns: {
      xs: "1fr",
      sm: "1fr 1fr",
    },
    gap: 3,
  }}
>
  {featureData.map((feature) => (
    <Box
      key={feature.title}
      sx={{
        border: "1px solid #EEE7DF",
        borderRadius: 1,
        bgcolor: "#fff",
      }}
    >
      <FeatureItem {...feature} showDivider={false} />
    </Box>
  ))}
</Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
