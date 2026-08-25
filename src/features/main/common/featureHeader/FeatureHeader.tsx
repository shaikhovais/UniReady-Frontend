import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import { menu, type Menu } from "../../../../utils/menu";

interface FeatureHeaderProps {
  title: string;
  subtitle: string;
  color?: string;
}

const FeatureHeader = ({
  title,
  subtitle,
  color,
}: FeatureHeaderProps) => {
  const location = useLocation();

  const currentMenuItem: Menu | undefined = menu.find(
    (item) =>
      location.pathname === item.path ||
      location.pathname.startsWith(`${item.path}/`),
  );

  const themeColor = color ?? currentMenuItem?.color ?? "#347A62";

  return (
    <Box
      sx={{
        px: {
          xs: 1.5,
          sm: 2,
          md: 2.5,
          lg: 3,
        },
        pt: {
          xs: 1.5,
          md: 2,
        },
        pb: {
          xs: 0.5,
          md: 1,
        },
        backgroundColor: "#F8F7F2",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          minHeight: {
            xs: 105,
            sm: 115,
            md: 125,
          },
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          borderRadius: "18px",
          border: "1px solid",
          borderColor: `${themeColor}2E`,
          background: `linear-gradient(
            135deg,
            ${themeColor}16 0%,
            ${themeColor}08 52%,
            #FFFFFF 100%
          )`,
          boxShadow: "0 4px 18px rgba(23, 32, 51, 0.035)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 180,
            height: 180,
            right: -90,
            top: -100,
            borderRadius: "50%",
            backgroundColor: `${themeColor}0D`,
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 100,
            height: 100,
            right: 45,
            bottom: -65,
            borderRadius: "50%",
            backgroundColor: `${themeColor}0A`,
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            width: "100%",
            position: "relative",
            zIndex: 1,
            px: {
              xs: 2,
              sm: 2.5,
              md: 3,
              lg: 4,
            },
            py: {
              xs: 1.75,
              md: 2,
            },
          }}
        >
          <Box
            sx={{
              minWidth: 0,
              maxWidth: 850,
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontSize: {
                  xs: 22,
                  sm: 25,
                  md: 28,
                },
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                color: "#172033",
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                maxWidth: 760,
                fontSize: {
                  xs: 12,
                  sm: 12.5,
                  md: 13.5,
                },
                fontWeight: 500,
                lineHeight: 1.45,
                color: "#64748B",
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FeatureHeader;