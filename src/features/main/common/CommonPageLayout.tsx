import { Box } from "@mui/material";
import type { ReactNode } from "react";

import FeatureHeader from "./featureHeader/FeatureHeader";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/SidebarContent";

interface MainPageLayoutProps {
  children: ReactNode;
  header?: {
    title: string;
    subtitle: string;
    color?: string;
  };
}

const CommonPageLayout = ({
  children,
  header,
}: MainPageLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F8F7F2",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      <Box
        sx={{
          display: "flex",
          width: "100%",
          position: "relative",

          pt: {
            xs: "68px",
            md: "74px",
          },

          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <Box
          component="aside"
          sx={{
            display: {
              xs: "none",
              md: "block",
            },

            width: 260,
            minWidth: 260,
            flexShrink: 0,

            position: "fixed",
            left: 0,

            top: {
              xs: 68,
              md: 74,
            },

            bottom: 0,

            overflowY: "auto",
            overflowX: "hidden",

            borderRight:
              "1px solid rgba(226, 232, 240, 0.45)",

            "&::-webkit-scrollbar": {
              width: 5,
            },

            "&::-webkit-scrollbar-thumb": {
              backgroundColor:
                "rgba(148, 163, 184, 0.25)",
              borderRadius: 10,
            },
          }}
        >
          <Sidebar />
        </Box>

        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,

            ml: {
              xs: 0,
              md: "260px",
            },

            position: "relative",
            overflowX: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: {
                xs: 220,
                md: 360,
              },
              height: {
                xs: 220,
                md: 360,
              },
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(52,122,98,0.055) 0%, rgba(52,122,98,0) 70%)",
              top: -120,
              right: -100,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: {
                xs: 180,
                md: 300,
              },
              height: {
                xs: 180,
                md: 300,
              },
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.035) 0%, rgba(124,58,237,0) 70%)",
              bottom: 80,
              left: -130,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {header && (
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <FeatureHeader
                title={header.title}
                subtitle={header.subtitle}
                color={header.color}
              />
            </Box>
          )}

          <Box
            sx={{
              position: "relative",
              zIndex: 1,

              width: "100%",
              maxWidth: 1500,

              mx: "auto",

              px: {
                xs: 2,
                sm: 2.5,
                md: 3,
                lg: 4,
                xl: 5,
              },

              py: {
                xs: 1,
                sm: 1,
                md: 2,
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CommonPageLayout;