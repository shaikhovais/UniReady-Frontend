import {
  Box,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import type { UserProfile } from "../../../types/core/profile";
import type { Lookup } from "../../../types/core/common/Lookup";

interface StepJourneyProps {
  profile: UserProfile;
  accommodationTypeLookup: Lookup[];
  onChange: <K extends keyof UserProfile>(
    field: K,
    value: UserProfile[K],
  ) => void;
}

export default function StepJourney({
  profile,
  accommodationTypeLookup,
  onChange,
}: StepJourneyProps) {
  const hasArrived = profile.hasArrived === true;

  const handleArrivalStatusChange = (value: boolean) => {
    onChange("hasArrived", value);

    if (!profile.arrivalDate) {
      return;
    }

    const today = dayjs().startOf("day");
    const selectedDate = dayjs(profile.arrivalDate).startOf("day");

    const invalidDate = value
      ? selectedDate.isAfter(today)
      : selectedDate.isBefore(today);

    if (invalidDate) {
      onChange("arrivalDate", null);
    }
  };

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
        borderColor: "rgba(234, 88, 12, 0.14)",
        borderRadius: 1.5,
        background:
          "linear-gradient(135deg, #FFF4EA 0%, #FFF9F4 42%, #FFFFFF 72%, #EEF7FF 100%)",
        boxShadow: "0 5px 20px rgba(234, 88, 12, 0.06)",
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
            "linear-gradient(135deg, rgba(234, 88, 12, 0.18), rgba(251, 191, 36, 0.05))",
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
            "radial-gradient(circle, rgba(59, 130, 246, 0.09), rgba(59, 130, 246, 0))",
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
          Let's plan your journey
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
          Share where you are in your journey to the UK. We'll adapt your
          experience based on whether you're preparing to arrive or have
          already settled in.
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
          Have you already arrived in the UK?
        </Typography>

        <Stack direction="row" spacing={{ xs: 1, sm: 2 }} sx={{ minWidth: 0 }}>
          <ArrivalCard
            selected={profile.hasArrived === false}
            icon={<FlightTakeoffRoundedIcon />}
            title="No, I'm preparing"
            description="I'm still outside the UK and preparing to move."
            onClick={() => handleArrivalStatusChange(false)}
          />

          <ArrivalCard
            selected={profile.hasArrived === true}
            icon={<HomeRoundedIcon />}
            title="Yes, I've already arrived"
            description="I'm already in the UK and settling in."
            onClick={() => handleArrivalStatusChange(true)}
          />
        </Stack>
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
          {hasArrived
            ? "When did you arrive in the UK?"
            : "Expected arrival date in the UK"}
        </Typography>

        <DatePicker
          value={profile.arrivalDate ? dayjs(profile.arrivalDate) : null}
          onChange={(value) =>
            onChange(
              "arrivalDate",
              value ? value.format("YYYY-MM-DD") : null,
            )
          }
          disableFuture={hasArrived}
          disablePast={!hasArrived}
          format="DD MMM YYYY"
          slotProps={{
            textField: {
              fullWidth: true,
              sx: {
                "& .MuiInputBase-root": {
                  minHeight: {
                    xs: 44,
                    sm: 56,
                  },
                  fontSize: {
                    xs: "0.85rem",
                    sm: "1rem",
                  },
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
          Accommodation Status
        </Typography>

        <TextField
          select
          fullWidth
          value={profile.accommodationTypeId ?? ""}
          onChange={(event) =>
            onChange(
              "accommodationTypeId",
              event.target.value ? Number(event.target.value) : null,
            )
          }
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <HomeWorkRoundedIcon
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
          <MenuItem value="-1" disabled>
            Select your accommodation
          </MenuItem>

          {accommodationTypeLookup.map((status) => (
            <MenuItem key={status.id} value={status.id}>
              {status.name}
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
          Where do you live?
          <Typography
            component="span"
            color="text.secondary"
            sx={{
              ml: 0.5,
              fontWeight: 400,
              fontSize: {
                xs: "0.68rem",
                sm: "0.8rem",
              },
            }}
          >
            (Optional)
          </Typography>
        </Typography>

        <TextField
          fullWidth
          value={profile.postcode}
          onChange={(event) =>
            onChange("postcode", event.target.value.toUpperCase())
          }
          placeholder="e.g. G12 8QQ"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlinedIcon
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

interface ArrivalCardProps {
  selected: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function ArrivalCard({
  selected,
  title,
  description,
  icon,
  onClick,
}: ArrivalCardProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: "relative",
        flex: 1,
        minWidth: 0,
        cursor: "pointer",
        p: {
          xs: 0.75,
          sm: 1,
        },
        borderRadius: 1,
        border: "1.5px solid",
        borderColor: selected ? "primary.main" : "divider",
        bgcolor: selected ? "#F7FCF8" : "background.paper",
        transition: ".2s",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: {
            xs: 8,
            sm: 14,
          },
          left: {
            xs: 8,
            sm: 14,
          },
          width: {
            xs: 18,
            sm: 22,
          },
          height: {
            xs: 18,
            sm: 22,
          },
          borderRadius: "50%",
          border: "2px solid",
          borderColor: selected ? "primary.main" : "#BDBDBD",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selected && (
          <Box
            sx={{
              width: {
                xs: 7,
                sm: 10,
              },
              height: {
                xs: 7,
                sm: 10,
              },
              borderRadius: "50%",
              bgcolor: "primary.main",
            }}
          />
        )}
      </Box>

      <Stack
        sx={{
          gap: {
            xs: 0.6,
            sm: 1,
          },
          alignItems: "center",
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            width: {
              xs: 26,
              sm: 30,
            },
            height: {
              xs: 26,
              sm: 30,
            },
            borderRadius: "50%",
            bgcolor: "#EEF5F2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: selected ? "primary.main" : "text.secondary",
            "& svg": {
              fontSize: {
                xs: "1rem",
                sm: "1.25rem",
              },
            },
          }}
        >
          {icon}
        </Box>

        <Typography
          align="center"
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: "0.7rem",
              sm: "0.9375rem",
            },
            lineHeight: {
              xs: 1.25,
              sm: 1.4,
            },
          }}
        >
          {title}
        </Typography>

        <Typography
          align="center"
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: {
              xs: "0.6rem",
              sm: "0.75rem",
            },
            lineHeight: {
              xs: 1.35,
              sm: 1.5,
            },
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Box>
  );
}