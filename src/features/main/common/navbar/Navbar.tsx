import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import Logo from "../../../../components/Logo";
import SidebarContent from "../sidebar/SidebarContent";

import { useAuth } from "../../../../hooks/useAuth";
import { ROUTES } from "../../../../routes/path";

const drawerWidth = 260;

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const profileMenuOpen = Boolean(anchorEl);

  const firstName = user?.firstName ?? "";
  const lastName = user?.lastName ?? "";
  const email = user?.email ?? "";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "U";

  const handleDrawerToggle = () => {
    setDrawerOpen((previous) => !previous);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleProfileOpen = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleProfileClose();
    navigate(ROUTES.EDIT_PROFILE);
  };

  const handleLogout = () => {
    handleProfileClose();
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#FFFFFF",
          color: "#172033",
          borderBottom: "1px solid #C8D6D0",
          boxShadow: "0 2px 7px rgba(15, 23, 42, 0.055)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            position: "relative",
            minHeight: {
              xs: 68,
              md: 74,
            },
            pl: {
              xs: 1.5,
              sm: 2.5,
              md: 3,
              lg: 4,
            },
            pr: {
              xs: 0.5,
              sm: 2.5,
              md: 3,
              lg: 4,
            },
            overflow: "hidden",
            background:
              "linear-gradient(90deg, #F7FBF9 0%, #FFFFFF 42%, #FFFFFF 62%, #FBF9FF 100%)",

            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: 0.45,
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(52,122,98,0.10) 1px, transparent 0)",
              backgroundSize: "22px 22px",
              maskImage:
                "linear-gradient(to right, black 0%, transparent 35%, transparent 70%, black 100%)",
            },

            "&::after": {
              content: '""',
              position: "absolute",
              width: 420,
              height: 420,
              borderRadius: "50%",
              right: -180,
              top: -260,
              pointerEvents: "none",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.075) 0%, rgba(124,58,237,0.025) 38%, transparent 70%)",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 360,
              height: 360,
              borderRadius: "50%",
              left: -220,
              top: -245,
              pointerEvents: "none",
              background:
                "radial-gradient(circle, rgba(52,122,98,0.12) 0%, rgba(52,122,98,0.045) 38%, transparent 70%)",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              left: {
                xs: "28%",
                md: "35%",
              },
              bottom: -160,
              pointerEvents: "none",
              background:
                "radial-gradient(circle, rgba(52,122,98,0.045) 0%, transparent 70%)",
            }}
          />

          <Stack
            direction="row"
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                alignItems: "center",
                minWidth: 0,
              }}
            >
              <IconButton
                onClick={handleDrawerToggle}
                aria-label={
                  drawerOpen
                    ? "Close navigation"
                    : "Open navigation"
                }
                aria-expanded={drawerOpen}
                sx={{
                  display: {
                    xs: "flex",
                    lg: "none",
                  },
                  width: 42,
                  height: 42,
                  color: "#374151",
                  border: "1px solid #E1E8E4",
                  backgroundColor: "rgba(255,255,255,0.82)",
                  backdropFilter: "blur(8px)",
                  boxShadow:
                    "0 2px 8px rgba(15, 23, 42, 0.035)",

                  "&:hover": {
                    backgroundColor: "#F3F8F5",
                    borderColor: "#C9DCD4",
                  },
                }}
              >
                <MenuRoundedIcon />
              </IconButton>

              <Logo />
            </Stack>

            <Stack
              direction="row"
              spacing={{
                xs: 0.5,
                sm: 1.25,
              }}
              sx={{
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                  textAlign: "right",
                  mr: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: "#94A3B8",
                    lineHeight: 1.2,
                    letterSpacing: "0.01em",
                  }}
                >
                  Welcome back
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    fontSize: 14,
                    fontWeight: 750,
                    color: "#172033",
                    lineHeight: 1.2,
                  }}
                >
                  {firstName || "Student"}
                </Typography>
              </Box>

              <IconButton
                onClick={handleProfileOpen}
                aria-label="Open profile menu"
                aria-controls={
                  profileMenuOpen ? "profile-menu" : undefined
                }
                aria-haspopup="true"
                aria-expanded={
                  profileMenuOpen ? "true" : undefined
                }
                sx={{
                  p: 0.25,
                  borderRadius: "15px",
                  border: "1px solid transparent",
                  transition: "all 0.2s ease",

                  "&:hover": {
                    borderColor: "#E1E8E4",
                  },
                }}
              >
                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: {
                        xs: 40,
                        sm: 42,
                      },
                      height: {
                        xs: 40,
                        sm: 42,
                      },
                      background:
                        "linear-gradient(135deg, #E3F3EC 0%, #D6EAE1 55%, #E9E2FA 100%)",
                      color: "#347A62",
                      border: "1px solid #CDE2D9",
                      fontSize: 14,
                      fontWeight: 800,
                      boxShadow:
                        "0 3px 10px rgba(52,122,98,0.08)",
                    }}
                  >
                    {initials}
                  </Avatar>

                  <KeyboardArrowDownRoundedIcon
                    sx={{
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                      fontSize: 20,
                      color: "#64748B",
                    }}
                  />
                </Stack>
              </IconButton>

              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={profileMenuOpen}
                onClose={handleProfileClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1,
                      minWidth: 245,
                      borderRadius: "17px",
                      border: "1px solid #E5EBE8",
                      backgroundColor: "#FFFFFF",
                      boxShadow:
                        "0 18px 45px rgba(15, 23, 42, 0.11)",
                      overflow: "hidden",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    px: 2,
                    py: 1.75,
                    overflow: "hidden",
                    background:
                      "linear-gradient(135deg, #F1F8F5 0%, #FFFFFF 58%, #FAF8FF 100%)",

                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: 110,
                      height: 110,
                      borderRadius: "50%",
                      right: -55,
                      top: -65,
                      background:
                        "radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.25}
                    sx={{
                      alignItems: "center",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 42,
                        height: 42,
                        background:
                          "linear-gradient(135deg, #E3F3EC 0%, #E8E0F8 100%)",
                        color: "#347A62",
                        border: "1px solid #D1E4DC",
                        fontSize: 13,
                        fontWeight: 800,
                      }}
                    >
                      {initials}
                    </Avatar>

                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: "#172033",
                          lineHeight: 1.3,
                        }}
                      >
                        {firstName || "Student"} {lastName}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.3,
                          fontSize: 11.5,
                          color: "#64748B",
                          lineHeight: 1.3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: 180,
                        }}
                      >
                        {email}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Divider
                  sx={{
                    borderColor: "#EEF2F7",
                  }}
                />

                <Box sx={{ p: 0.75 }}>
                  <MenuItem
                    onClick={handleProfile}
                    sx={{
                      minHeight: 44,
                      borderRadius: "10px",
                      px: 1.25,
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: "#374151",

                      "&:hover": {
                        backgroundColor: "#F3F8F5",
                        color: "#347A62",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 34,
                        color: "#347A62",
                      }}
                    >
                      <ManageAccountsRoundedIcon
                        sx={{
                          fontSize: 20,
                        }}
                      />
                    </ListItemIcon>

                    My Profile
                  </MenuItem>

                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      minHeight: 44,
                      borderRadius: "10px",
                      px: 1.25,
                      mt: 0.25,
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: "#374151",

                      "&:hover": {
                        backgroundColor: "#FEF2F2",
                        color: "#B91C1C",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 34,
                        color: "#64748B",
                      }}
                    >
                      <LogoutRoundedIcon
                        sx={{
                          fontSize: 20,
                        }}
                      />
                    </ListItemIcon>

                    Logout
                  </MenuItem>
                </Box>
              </Menu>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          display: {
            xs: "block",
            lg: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            mt: {
              xs: "68px",
              md: "74px",
            },
            height: {
              xs: "calc(100% - 68px)",
              md: "calc(100% - 74px)",
            },
            boxSizing: "border-box",
            borderRight: "1px solid #E5EBE7",
            backgroundColor: "#FFFFFF",
            backgroundImage:
              "radial-gradient(circle at 0% 0%, rgba(52,122,98,0.055), transparent 30%), radial-gradient(circle at 100% 100%, rgba(124,58,237,0.035), transparent 30%)",
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
};

export default Navbar;