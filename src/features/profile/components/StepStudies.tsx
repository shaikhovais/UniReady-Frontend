import {
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

import type { ProfileLookups, UserProfile } from "../../../types/core/profile";
import TipCard from "../../../components/TipCard";
import type { Lookup } from "../../../types/core/common/Lookup";

interface StepStudiesProps {
  profile: UserProfile;
  profileLookups: ProfileLookups;
  degreeLevelLookup: Lookup[];
  onChange: <K extends keyof UserProfile>(
    field: K,
    value: UserProfile[K],
  ) => void;
}

export default function StepStudies({
  profile,
  profileLookups,
  degreeLevelLookup,
  onChange,
}: StepStudiesProps) {
  const filteredUniversities =
    profile.cityId === -1
      ? []
      : profileLookups.universities.filter(
          (university) => university.cityId === profile.cityId,
        );

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
        borderColor: "rgba(59, 130, 246, 0.15)",
        borderRadius: 1.5,
        background:
          "linear-gradient(135deg, #EEF5FF 0%, #F7FAFF 42%, #FFFFFF 72%, #F3F0FF 100%)",
        boxShadow: "0 5px 20px rgba(59, 130, 246, 0.07)",
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
            "linear-gradient(135deg, rgba(59, 130, 246, 0.20), rgba(139, 92, 246, 0.05))",
          zIndex: -1,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: {
            xs: 130,
            sm: 170,
          },
          height: {
            xs: 130,
            sm: 170,
          },
          borderRadius: "50%",
          bottom: {
            xs: -95,
            sm: -115,
          },
          left: {
            xs: -85,
            sm: -105,
          },
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.09), rgba(139, 92, 246, 0))",
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
          Tell us about your studies
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
          Your study details help us understand your academic journey today
          and will enable more relevant content and recommendations as new
          features are introduced.
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
          University City
        </Typography>

        <TextField
          select
          fullWidth
          value={profile.cityId}
          onChange={(e) => {
            onChange("cityId", Number(e.target.value));
            onChange("universityId", -1);
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LocationCityRoundedIcon
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
            Select your university city
          </MenuItem>

          {profileLookups.cities.map((city) => (
            <MenuItem key={city.cityId} value={city.cityId}>
              {city.name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <TipCard description="Personalised recommendations are currently available for Glasgow. More cities coming soon. All other UniReady features are available across the UK." />

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
          University
        </Typography>

        <TextField
          select
          fullWidth
          value={profile.universityId}
          disabled={profile.cityId === -1}
          onChange={(e) => onChange("universityId", Number(e.target.value))}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceRoundedIcon
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
            Select your university
          </MenuItem>

          {filteredUniversities.map((university) => (
            <MenuItem
              key={university.universityId}
              value={university.universityId}
            >
              {university.name}
            </MenuItem>
          ))}
        </TextField>

        {profile.cityId === -1 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: {
                xs: "0.72rem",
                sm: "0.875rem",
              },
            }}
          >
            Please select your university city first.
          </Typography>
        )}
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
          Degree Level
        </Typography>

        <TextField
          select
          fullWidth
          value={profile.degreeLevelId}
          onChange={(e) => onChange("degreeLevelId", Number(e.target.value))}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SchoolRoundedIcon
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
            Select your degree level
          </MenuItem>

          {degreeLevelLookup.map((degreeLevel) => (
            <MenuItem key={degreeLevel.id} value={degreeLevel.id}>
              {degreeLevel.name}
            </MenuItem>
          ))}
        </TextField>
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
          Course / Programme
        </Typography>

        <TextField
          fullWidth
          placeholder="e.g. MSc Computer Science"
          value={profile.courseName}
          onChange={(e) => onChange("courseName", e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MenuBookRoundedIcon
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
    </Stack>
  );
}