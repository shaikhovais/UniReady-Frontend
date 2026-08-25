import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";
import UmbrellaRoundedIcon from "@mui/icons-material/UmbrellaRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import PowerRoundedIcon from "@mui/icons-material/PowerRounded";
import BatteryChargingFullRoundedIcon from "@mui/icons-material/BatteryChargingFullRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";

import { Box, Paper, Stack, Typography } from "@mui/material";

const recommendations = [
  {
    label: "Waterproof jacket",
    icon: UmbrellaRoundedIcon,
  },
  {
    label: "Umbrella",
    icon: UmbrellaRoundedIcon,
  },
  {
    label: "Warm hoodie",
    icon: CheckroomRoundedIcon,
  },
  {
    label: "Travel adapter",
    icon: PowerRoundedIcon,
  },
  {
    label: "Portable charger",
    icon: BatteryChargingFullRoundedIcon,
  },
  {
    label: "Reusable water bottle",
    icon: WaterDropRoundedIcon,
  },
];

const CityRecommendationsCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(135deg, #ffffff 0%, #fffaf5 100%)",
        overflow: "hidden",
      }}
    >
      <Stack spacing={2.25}>
        {/* Header */}

        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 1.25,
              bgcolor: "#FFF3E8",
              color: "#D97706",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <CloudQueueRoundedIcon sx={{ fontSize: 23 }} />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.25,
              }}
            >
              Glasgow essentials
            </Typography>

            <Typography
              sx={{
                mt: 0.35,
                fontSize: 13,
                color: "#64748b",
              }}
            >
              What to pack for the local weather
            </Typography>
          </Box>
        </Stack>

        {/* Weather message */}

        <Box
          sx={{
            px: 1.75,
            py: 1.5,
            borderRadius: 1.25,
            bgcolor: "#FFF7ED",
            border: "1px solid",
            borderColor: "#FED7AA",
          }}
        >
          <Stack
            direction="row"
            spacing={1.25}
            sx={{
              alignItems: "flex-start",
            }}
          >
            <CloudQueueRoundedIcon
              sx={{
                mt: "2px",
                fontSize: 19,
                color: "#D97706",
                flexShrink: 0,
              }}
            />

            <Typography
              sx={{
                fontSize: 13.5,
                lineHeight: 1.55,
                color: "#7C2D12",
              }}
            >
              Glasgow has frequent rain and changing weather, so it's useful
              to have a few weather-ready essentials with you.
            </Typography>
          </Stack>
        </Box>

        {/* Recommendations */}

        <Box>
          <Typography
            sx={{
              mb: 1.25,
              fontSize: 13,
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            Recommended essentials
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 1,
            }}
          >
            {recommendations.map((item) => {
              const Icon = item.icon;

              return (
                <Box
                  key={item.label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    px: 1.25,
                    py: 1,
                    borderRadius: 1,
                    bgcolor: "#fff",
                    border: "1px solid",
                    borderColor: "#fed7aa",
                    transition: "all 0.2s ease",

                    "&:hover": {
                      borderColor: "#fdba74",
                      bgcolor: "#fffaf5",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: 1,
                      bgcolor: "#FFF3E8",
                      color: "#D97706",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ fontSize: 17 }} />
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#334155",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default CityRecommendationsCard;