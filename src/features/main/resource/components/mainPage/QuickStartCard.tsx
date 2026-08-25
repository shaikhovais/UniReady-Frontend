import {
  AccountBalanceRounded,
  DirectionsBusRounded,
  ExploreRounded,
  LocalHospitalRounded,
  SimCardRounded,
} from "@mui/icons-material";
import type { SvgIconComponent } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

interface QuickStartStep {
  icon: SvgIconComponent;
  title: string;
  subtitle: string;
  color: string;
  bg: string;
}

const QUICK_START_STEPS: QuickStartStep[] = [
  {
    icon: AccountBalanceRounded,
    title: "Open Bank Account",
    subtitle: "Set up your finances",
    color: "#2563EB",
    bg: "#EFF6FF",
  },
  {
    icon: SimCardRounded,
    title: "Get a SIM Card",
    subtitle: "Stay connected",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  {
    icon: LocalHospitalRounded,
    title: "Register with GP",
    subtitle: "Take care of your health",
    color: "#DC2626",
    bg: "#FEF2F2",
  },
  {
    icon: DirectionsBusRounded,
    title: "Get Travel Pass",
    subtitle: "Save on transport",
    color: "#059669",
    bg: "#ECFDF5",
  },
  {
    icon: ExploreRounded,
    title: "Explore & Settle In",
    subtitle: "Make the most of your time",
    color: "#EA580C",
    bg: "#FFF7ED",
  },
];

const QuickStartCard = () => {
  return (
    <Box
      sx={{
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid #EEF2F7",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 16px rgba(15, 23, 42, 0.035)",
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 2,
          background:
            "linear-gradient(135deg, #1F733E 0%, #4C9466 100%)",
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.3,
          }}
        >
          Quick Start for New Students
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            color: "rgba(255,255,255,0.85)",
            mt: 0.5,
            lineHeight: 1.4,
          }}
        >
          Get started with essential steps
        </Typography>
      </Box>

      <Stack
        spacing={1.5}
        sx={{
          p: 2.5,
        }}
      >
        {QUICK_START_STEPS.map((step) => {
          const Icon = step.icon;

          return (
            <Stack
              key={step.title}
              direction="row"
              spacing={1.75}
              sx={{
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: step.bg,
                  color: step.color,
                  flexShrink: 0,
                }}
              >
                <Icon sx={{ fontSize: 23 }} />
              </Box>

              <Box
                sx={{
                  minWidth: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#111827",
                    lineHeight: 1.35,
                  }}
                >
                  {step.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12.5,
                    color: "#6B7280",
                    mt: 0.35,
                    lineHeight: 1.4,
                  }}
                >
                  {step.subtitle}
                </Typography>
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};

export default QuickStartCard;