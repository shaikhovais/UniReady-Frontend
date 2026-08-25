import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";

import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../../hooks/useAuth";
import { menu, type Menu } from "../../../../utils/menu";

interface SidebarContentProps {
  onNavigate?: () => void;
}

const SidebarContent = ({
  onNavigate,
}: SidebarContentProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    user,
    showAllMenu,
    setShowAllMenu,
  } = useAuth();

  const hasArrived = user?.hasArrived;

  const statusItems = menu.filter((item) => {
    if (
      hasArrived === true &&
      item.path === "/checklists"
    ) {
      return false;
    }

    if (
      hasArrived === false &&
      (item.path === "/budget-planner" ||
        item.path === "/shopping-lists")
    ) {
      return false;
    }

    return true;
  });

  const visibleItems = showAllMenu
    ? menu
    : statusItems;

  const handleShowAllToggle = () => {
    setShowAllMenu(!showAllMenu);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  const renderItem = (item: Menu) => {
    const Icon = item.icon;

    const isActive =
      location.pathname === item.path ||
      location.pathname.startsWith(`${item.path}/`);

    return (
      <ListItemButton
        key={item.path}
        onClick={() => handleNavigate(item.path)}
        sx={{
          position: "relative",
          minHeight: 48,
          px: 1.5,
          mb: 0.6,
          borderRadius: "13px",
          color: isActive
            ? item.color
            : "#596572",
          backgroundColor: isActive
            ? `${item.color}0D`
            : "transparent",
          border: "1px solid",
          borderColor: isActive
            ? `${item.color}18`
            : "transparent",
          boxShadow: isActive
            ? `0 3px 12px ${item.color}10`
            : "none",
          transition: "all 0.2s ease",

          "&:hover": {
            backgroundColor: `${item.color}0A`,
            color: item.color,
            borderColor: `${item.color}14`,
          },

          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: "50%",
            width: isActive ? 3 : 0,
            height: isActive ? 23 : 0,
            transform: "translateY(-50%)",
            borderRadius: "0 5px 5px 0",
            backgroundColor: item.color,
            transition: "all 0.2s ease",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            color: "inherit",
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              backgroundColor: isActive
                ? `${item.color}12`
                : "rgba(255,255,255,0.25)",
              transition: "all 0.2s ease",
            }}
          >
            <Icon
              sx={{
                fontSize: 21,
              }}
            />
          </Box>
        </ListItemIcon>

        <Typography
          sx={{
            fontSize: 13.5,
            fontWeight: isActive ? 700 : 550,
            color: "inherit",
            lineHeight: 1,
          }}
        >
          {item.title}
        </Typography>
      </ListItemButton>
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #F7FBF9 0%, #FBFAF6 48%, #FAF9FC 100%)",

        "&::before": {
          content: '""',
          position: "absolute",
          width: 320,
          height: 320,
          top: -170,
          left: -160,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(52,122,98,0.12) 0%, rgba(52,122,98,0.035) 35%, rgba(52,122,98,0) 72%)",
          pointerEvents: "none",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 300,
          height: 300,
          right: -190,
          bottom: -120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.075) 0%, rgba(124,58,237,0.02) 38%, rgba(124,58,237,0) 72%)",
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 180,
          height: 180,
          right: -100,
          top: 180,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(52,122,98,0.045) 0%, rgba(52,122,98,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          px: 1.5,
          pt: 2.5,
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            px: 1.25,
            mb: 1.25,
          }}
        >
          <Typography
            sx={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#9AA5AF",
            }}
          >
            Menu
          </Typography>
        </Box>

        <List disablePadding>
          {visibleItems.map(renderItem)}
        </List>

        {hasArrived !== null &&
          hasArrived !== undefined &&
          menu.length > statusItems.length && (
            <Box
              sx={{
                px: 0.5,
                mt: 0.75,
                mb: 1,
              }}
            >
              <Box
                component="button"
                type="button"
                onClick={handleShowAllToggle}
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.35,
                  px: 1,
                  py: 0.75,
                  border: "none",
                  borderRadius: "9px",
                  backgroundColor: "transparent",
                  color: "#8A94A0",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition:
                    "background-color 0.2s ease, color 0.2s ease",

                  "&:hover": {
                    backgroundColor:
                      "rgba(52,122,98,0.06)",
                    color: "#347A62",
                  },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: 11.5,
                    fontWeight: 650,
                    color: "inherit",
                    lineHeight: 1.3,
                  }}
                >
                  {showAllMenu
                    ? "Show relevant"
                    : "Show all"}
                </Typography>

                {showAllMenu ? (
                  <KeyboardArrowUpRounded
                    sx={{
                      fontSize: 17,
                    }}
                  />
                ) : (
                  <KeyboardArrowDownRounded
                    sx={{
                      fontSize: 17,
                    }}
                  />
                )}
              </Box>
            </Box>
          )}
      </Box>

      {hasArrived !== null &&
        hasArrived !== undefined && (
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              mx: 2,
              mb: 2,
              px: 1.5,
              py: 1.35,
              borderRadius: "14px",
              background: hasArrived
                ? "linear-gradient(135deg, rgba(248,245,255,0.95) 0%, rgba(252,250,255,0.9) 100%)"
                : "linear-gradient(135deg, rgba(243,250,247,0.96) 0%, rgba(248,252,250,0.92) 100%)",
              border: "1px solid",
              borderColor: hasArrived
                ? "rgba(124,58,237,0.10)"
                : "rgba(52,122,98,0.10)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  flexShrink: 0,
                  backgroundColor: hasArrived
                    ? "#8B5CF6"
                    : "#347A62",
                  boxShadow: hasArrived
                    ? "0 0 0 3px rgba(139,92,246,0.10)"
                    : "0 0 0 3px rgba(52,122,98,0.10)",
                }}
              />

              <Typography
                sx={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: hasArrived
                    ? "#6D28D9"
                    : "#347A62",
                }}
              >
                {hasArrived
                  ? "You're in the UK"
                  : "Preparing for your move"}
              </Typography>
            </Box>

            <Typography
              sx={{
                mt: 0.45,
                ml: 2,
                fontSize: 10.5,
                lineHeight: 1.4,
                color: "#8A94A0",
              }}
            >
              {hasArrived
                ? "Your experience is personalised for settling in."
                : "Your experience is personalised for preparation."}
            </Typography>

            <Box
              onClick={() =>
                handleNavigate("/edit-profile")
              }
              sx={{
                mt: 1,
                pt: 0.85,
                ml: 2,
                borderTop: "1px solid",
                borderColor: hasArrived
                  ? "rgba(124,58,237,0.08)"
                  : "rgba(52,122,98,0.08)",
                cursor: "pointer",
                width: "calc(100% - 16px)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 600,
                  lineHeight: 1.4,
                  color: "#7B8794",
                  transition: "color 0.2s ease",

                  "&:hover": {
                    color: hasArrived
                      ? "#7C3AED"
                      : "#347A62",
                  },
                }}
              >
                Status can be changed in your profile
              </Typography>
            </Box>
          </Box>
        )}
    </Box>
  );
};

export default SidebarContent;