import {
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";

import type { Country, UserProfile } from "../../../types/core/profile";

interface StepAboutYouProps {
  profile: UserProfile;
  countryLookup: Country[];
  onChange: <K extends keyof UserProfile>(
    field: K,
    value: UserProfile[K],
  ) => void;
}

export default function StepAboutYou({
  profile,
  countryLookup,
  onChange,
}: StepAboutYouProps) {
  return (
    <Stack
      spacing={{ xs: 1.5, sm: 2 }}
      sx={{
        position: "relative",
        width: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        p: {
          xs: 1.75,
          sm: 2.5,
        },
        border: "1px solid",
        borderColor: "rgba(22, 128, 75, 0.14)",
        borderRadius: 1.5,
        background:
          "linear-gradient(135deg, #EAF7F0 0%, #F7FCF9 42%, #FFFFFF 72%, #F0F8F5 100%)",
        boxShadow: "0 5px 20px rgba(22, 128, 75, 0.07)",
        overflow: "hidden",
        isolation: "isolate",
        "&::before": {
          content: '""',
          position: "absolute",
          width: {
            xs: 190,
            sm: 240,
          },
          height: {
            xs: 190,
            sm: 240,
          },
          borderRadius: "50%",
          top: {
            xs: -115,
            sm: -135,
          },
          right: {
            xs: -110,
            sm: -125,
          },
          background:
            "linear-gradient(135deg, rgba(22, 128, 75, 0.22), rgba(72, 187, 120, 0.04))",
          zIndex: -1,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: {
            xs: 120,
            sm: 160,
          },
          height: {
            xs: 120,
            sm: 160,
          },
          borderRadius: "50%",
          bottom: {
            xs: -90,
            sm: -110,
          },
          left: {
            xs: -80,
            sm: -100,
          },
          background:
            "radial-gradient(circle, rgba(22, 128, 75, 0.08), rgba(22, 128, 75, 0))",
          zIndex: -1,
          pointerEvents: "none",
        },
      }}
    >
      <Stack spacing={{ xs: 0.75, sm: 1 }} sx={{ minWidth: 0 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 500,
            fontFamily: "emoji",
            fontSize: {
              xs: "1.75rem",
              sm: "2.125rem",
            },
            lineHeight: {
              xs: 1.2,
              sm: 1.235,
            },
          }}
        >
          Tell us about yourself
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            fontSize: {
              xs: "0.82rem",
              sm: "1rem",
            },
            lineHeight: {
              xs: 1.55,
              sm: 1.6,
            },
          }}
        >
          Tell us a little about yourself to get started. Your name and home
          country help us create your profile and tailor your experience
          throughout UniReady.
        </Typography>
      </Stack>

      <Stack spacing={{ xs: 0.75, sm: 1 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
            },
          }}
        >
          First Name
        </Typography>

        <TextField
          fullWidth
          placeholder="Enter your first name"
          value={profile.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineRoundedIcon
                    color="action"
                    sx={{
                      fontSize: {
                        xs: "1.15rem",
                        sm: "1.5rem",
                      },
                    }}
                  />
                </InputAdornment>
              ),
              sx: {
                fontSize: {
                  xs: "0.85rem",
                  sm: "1rem",
                },
                minHeight: {
                  xs: 44,
                  sm: 56,
                },
              },
            },
          }}
        />
      </Stack>

      <Stack spacing={{ xs: 0.75, sm: 1 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
            },
          }}
        >
          Last Name
        </Typography>

        <TextField
          fullWidth
          placeholder="Enter your last name"
          value={profile.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineRoundedIcon
                    color="action"
                    sx={{
                      fontSize: {
                        xs: "1.15rem",
                        sm: "1.5rem",
                      },
                    }}
                  />
                </InputAdornment>
              ),
              sx: {
                fontSize: {
                  xs: "0.85rem",
                  sm: "1rem",
                },
                minHeight: {
                  xs: 44,
                  sm: 56,
                },
              },
            },
          }}
        />
      </Stack>

      <Stack spacing={{ xs: 0.75, sm: 1 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
            },
          }}
        >
          Country of Citizenship
        </Typography>

        <TextField
          select
          fullWidth
          value={profile.countryId ?? ""}
          onChange={(e) => onChange("countryId", Number(e.target.value))}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PublicRoundedIcon
                    color="action"
                    sx={{
                      fontSize: {
                        xs: "1.15rem",
                        sm: "1.5rem",
                      },
                    }}
                  />
                </InputAdornment>
              ),
              sx: {
                fontSize: {
                  xs: "0.85rem",
                  sm: "1rem",
                },
                minHeight: {
                  xs: 44,
                  sm: 56,
                },
              },
            },
          }}
        >
          <MenuItem value={-1} disabled>
            Select your country
          </MenuItem>

          {countryLookup.map((country) => (
            <MenuItem key={country.countryId} value={country.countryId}>
              {`${country.flagEmoji} ${country.name}`}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Stack>
  );
}