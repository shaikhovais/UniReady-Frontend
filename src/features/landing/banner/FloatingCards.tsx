import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
// import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import KitchenRoundedIcon from "@mui/icons-material/KitchenRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

const cardStyle = {
  flex: 1,
  minWidth: 0,
  borderRadius: 1,
  bgcolor: "rgba(255, 255, 255, 0.96)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.08)",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.12)",
  },
};

const circle = (bg: string) => ({
  width: 32,
  height: 32,
  minWidth: 32,
  borderRadius: "50%",
  bgcolor: bg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const smallCircle = (bg: string) => ({
  width: 25,
  height: 25,
  borderRadius: "50%",
  bgcolor: bg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const FloatingCards = () => {
  return (
    <Stack
      direction="row"
      sx={{
        display: {
          xs: "none",
          md: "flex",
        },
        position: "absolute",
        left: "52%",
        bottom: "5%",
        transform: "translateX(-50%)",
        width: {
          md: "68%",
          lg: "64%",
        },
        gap: 1,
        zIndex: 10,
      }}
    >
      {/* Checklist */}

      <Card elevation={0} sx={cardStyle}>
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": {
              pb: 1.5,
            },
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <Box sx={circle("#EAF7F2")}>
              <ChecklistRoundedIcon
                sx={{
                  fontSize: 19,
                  color: "#2E7D62",
                }}
              />
            </Box>

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.72rem",
              }}
            >
              Personalised Checklist
            </Typography>
          </Stack>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: "0.6rem",
              lineHeight: 1.4,
              minHeight: 34,
            }}
          >
            Custom tasks for every stage of your journey.
          </Typography>

          <Stack
            sx={{
              mt: 1.5,
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
            }}
          >
            <LinearProgress
              variant="determinate"
              value={75}
              sx={{
                flex: 1,
                height: 3,
                borderRadius: 999,
              }}
            />

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.6rem",
              }}
            >
              75%
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* Budget */}

      <Card elevation={0} sx={cardStyle}>
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": {
              pb: 1.5,
            },
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <Box sx={circle("#FFF2EB")}>
              <AccountBalanceWalletRoundedIcon
                sx={{
                  fontSize: 19,
                  color: "#C26A35",
                }}
              />
            </Box>

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.72rem",
              }}
            >
              Budget Planner
            </Typography>
          </Stack>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: "0.6rem",
              lineHeight: 1.4,
              minHeight: 34,
            }}
          >
            Plan your expenses and manage your budget wisely.
          </Typography>

          <Typography
            sx={{
              mt: 1.25,
              mb: 0.5,
              fontWeight: 600,
              fontSize: "0.6rem",
            }}
          >
            £850 / £1,200
          </Typography>

          <LinearProgress
            variant="determinate"
            value={70}
            color="warning"
            sx={{
              height: 3,
              borderRadius: 999,
            }}
          />
        </CardContent>
      </Card>

      {/* Nearby Services */}

      {/* <Card elevation={0} sx={cardStyle}>
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": {
              pb: 1.5,
            },
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <Box sx={circle("#F3EEFF")}>
              <LocationOnOutlinedIcon
                sx={{
                  fontSize: 20,
                  color: "#6A52C8",
                }}
              />
            </Box>

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.72rem",
              }}
            >
              Nearby Services
            </Typography>
          </Stack>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: "0.6rem",
              lineHeight: 1.4,
              minHeight: 34,
            }}
          >
            Find essential services near your location.
          </Typography>

          <Stack
            sx={{
              mt: 1.5,
              flexDirection: "row",
              gap: 0.75,
              justifyContent: "center",
            }}
          >
            <Box sx={smallCircle("#EEF7F3")}>
              <ShoppingCartOutlinedIcon
                sx={{
                  fontSize: 14,
                  color: "#2E7D62",
                }}
              />
            </Box>

            <Box sx={smallCircle("#FFF0F0")}>
              <LocalHospitalOutlinedIcon
                sx={{
                  fontSize: 14,
                  color: "#D14343",
                }}
              />
            </Box>

            <Box sx={smallCircle("#EEF2FF")}>
              <DirectionsBusOutlinedIcon
                sx={{
                  fontSize: 14,
                  color: "#3A57D6",
                }}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card> */}
      
      {/* Shopping Lists */}

      <Card elevation={0} sx={cardStyle}>
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": {
              pb: 1.5,
            },
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center", mb: 1, gap: 1 }}>
            <Box sx={circle("#EAF7F2")}>
              <ShoppingCartRoundedIcon
                sx={{
                  fontSize: 19,
                  color: "#2E7D62",
                }}
              />
            </Box>

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.72rem",
              }}
            >
              Shopping Lists
            </Typography>
          </Stack>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: "0.6rem",
              lineHeight: 1.4,
              minHeight: 34,
            }}
          >
            Keep track of everything you need for your new life in the UK.
          </Typography>

          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-evenly",
              mt: 1.5,
            }}
          >
              <Box sx={smallCircle("#EEF7F3")}>
                <KitchenRoundedIcon
                  sx={{
                    fontSize: 14,
                    color: "#2E7D62",
                  }}
                />
              </Box>

              <Box sx={smallCircle("#FFF3EC")}>
                <HomeRoundedIcon
                  sx={{
                    fontSize: 14,
                    color: "#C26A35",
                  }}
                />
              </Box>

              <Box sx={smallCircle("#F1EEFF")}>
                <SchoolRoundedIcon
                  sx={{
                    fontSize: 14,
                    color: "#6A52C8",
                  }}
                />
              </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default FloatingCards;
