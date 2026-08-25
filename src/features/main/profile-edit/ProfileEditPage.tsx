import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  CheckCircleRounded,
  HomeRounded,
  LocationCityRounded,
  PersonOutlineRounded,
  SchoolRounded,
  PublicRounded,
  MenuBookRounded,
  FlightTakeoffRounded,
  SaveRounded,
  HistoryEduRounded,
  AccountCircleRounded,
  BadgeRounded,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CommonPageLayout from "../common/CommonPageLayout";
import CommonLoader from "../../../components/Loader";

import {
  getProfile,
  getProfileLookups,
  updateProfile,
} from "../../../services/core/profileService";

import { getLookups } from "../../../services/core/common/helperService";

import type {
  ProfileLookups,
  UserProfile,
} from "../../../types/core/profile";

import type { Lookup } from "../../../types/core/common/Lookup";

import type { ApiResponse } from "../../../types/core/common/apiResponse";

import { AxiosError } from "axios";

const initialProfile: UserProfile = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  countryId: null,
  postcode: "",
  cityId: null,
  universityId: null,
  degreeLevelId: null,
  courseName: "",
  hasArrived: null,
  arrivalDate: null,
  accommodationTypeId: null,
};

const emptyLookups: ProfileLookups = {
  countries: [],
  cities: [],
  universities: [],
};

const sectionSx = {
  p: { xs: 1.75, sm: 2.25, md: 2.75 },
  border: "1px solid #E8ECEA",
  borderRadius: { xs: "14px", md: "16px" },
  backgroundColor: "#FFFFFF",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: { xs: 48, sm: 50, md: 52 },
    borderRadius: "11px",
  },
};

const selectSx = {
  minHeight: { xs: 48, sm: 50, md: 52 },
  borderRadius: "11px",
  "& .MuiSelect-select": {
    minHeight: "unset !important",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
};

const labelSx = {
  mb: 0.65,
  fontSize: 12.5,
  fontWeight: 600,
  color: "#374151",
};

const ProfileEditPage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [profileLookups, setProfileLookups] =
    useState<ProfileLookups>(emptyLookups);

  const [degreeLevels, setDegreeLevels] = useState<Lookup[]>([]);
  const [accommodationTypes, setAccommodationTypes] = useState<Lookup[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const [profileResponse, profileLookupsResponse, lookupsResponse] =
          await Promise.all([
            getProfile(),
            getProfileLookups(),
            getLookups(["AccommodationType", "DegreeLevel"]),
          ]);

        setProfile({
          ...profileResponse.profile,
          postcode: profileResponse.profile.postcode ?? "",
        });

        setProfileLookups(profileLookupsResponse);

        setAccommodationTypes(
          lookupsResponse.filter(
            (lookup) => lookup.type === "AccommodationType",
          ),
        );

        setDegreeLevels(
          lookupsResponse.filter(
            (lookup) => lookup.type === "DegreeLevel",
          ),
        );
      } catch (error) {
        console.error(error);
        setError("Unable to load your profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  const cities = profileLookups.cities;

  const universities = useMemo(() => {
    if (profile.cityId === null) {
      return [];
    }

    return profileLookups.universities.filter(
      (university) => university.cityId === profile.cityId,
    );
  }, [profile.cityId, profileLookups.universities]);

  const handleChange = <K extends keyof UserProfile>(
    field: K,
    value: UserProfile[K],
  ) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const handleCountryChange = (countryId: number | null) => {
    setProfile((previous) => ({
      ...previous,
      countryId,
      cityId: null,
      universityId: null,
    }));

    setError("");
  };

  const handleCityChange = (cityId: number | null) => {
    setProfile((previous) => ({
      ...previous,
      cityId,
      universityId: null,
    }));

    setError("");
  };

  const handleArrivalStatusChange = (hasArrived: boolean) => {
    setProfile((previous) => {
      let arrivalDate = previous.arrivalDate;

      if (hasArrived) {
        if (
          arrivalDate &&
          dayjs(arrivalDate).isAfter(dayjs(), "day")
        ) {
          arrivalDate = dayjs().format("YYYY-MM-DD");
        }
      } else {
        if (
          arrivalDate &&
          dayjs(arrivalDate).isBefore(dayjs(), "day")
        ) {
          arrivalDate = null;
        }
      }

      return {
        ...previous,
        hasArrived,
        arrivalDate,
      };
    });

    setError("");
  };

  const isArrivalDateValid =
    profile.arrivalDate !== null &&
    profile.arrivalDate !== "" &&
    (profile.hasArrived === true
      ? !dayjs(profile.arrivalDate).isAfter(dayjs(), "day")
      : !dayjs(profile.arrivalDate).isBefore(dayjs(), "day"));

  const isValid =
    profile.firstName.trim() !== "" &&
    profile.lastName.trim() !== "" &&
    profile.countryId !== null &&
    profile.cityId !== null &&
    profile.universityId !== null &&
    profile.degreeLevelId !== null &&
    profile.courseName.trim() !== "" &&
    profile.hasArrived !== null &&
    isArrivalDateValid &&
    profile.accommodationTypeId !== null;

  const handleSave = async () => {
    if (!isValid) {
      setError("Please complete all required fields before saving.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response: ApiResponse = await updateProfile({
        ...profile,
        postcode: profile.postcode?.trim() || "",
      });

      if (response.success) {
        navigate("/dashboard");
        return;
      }

      setError(response.message || "Unable to update your profile.");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data?.message ??
            "Unable to update your profile. Please try again.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <CommonPageLayout
        header={{
          title: "Edit Profile",
          subtitle: "Keep your UniReady profile up to date.",
        }}
      >
        <CommonLoader />
      </CommonPageLayout>
    );
  }

  return (
    <CommonPageLayout
      header={{
        title: "Edit Profile",
        subtitle:
          "Update your details so UniReady can keep your experience personalised.",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
          mx: "auto",
          pb: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5EBE7",
            borderRadius: { xs: "14px", sm: "18px", md: "20px" },
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(17, 24, 39, 0.025)",
          }}
        >
          <Box
            sx={{
              px: { xs: 1.75, sm: 2.5, md: 3 },
              py: { xs: 1.75, sm: 2.25, md: 2.5 },
              background:
                "linear-gradient(135deg, #F2F8F5 0%, #FFFFFF 72%)",
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: { xs: 44, sm: 48, md: 52 },
                  height: { xs: 44, sm: 48, md: 52 },
                  borderRadius: { xs: "13px", md: "15px" },
                  backgroundColor: "#E1F1EA",
                  color: "#347A62",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: "1px solid #D2E8DF",
                }}
              >
                <AccountCircleRounded
                  sx={{
                    fontSize: { xs: 27, md: 30 },
                  }}
                />
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: { xs: 17, sm: 18, md: 20 },
                    fontWeight: 800,
                    color: "#172033",
                    lineHeight: 1.25,
                  }}
                >
                  Your Profile
                </Typography>

                <Typography
                  sx={{
                    mt: 0.35,
                    fontSize: { xs: 11.5, sm: 12.5, md: 13 },
                    color: "#64748B",
                    lineHeight: 1.45,
                  }}
                >
                  Keep your personal information up to date.
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Divider sx={{ borderColor: "#EEF2F7" }} />

          <Box
            sx={{
              p: {
                xs: 1.5,
                sm: 2,
                md: 2.75,
              },
            }}
          >
            <Box sx={sectionSx}>
              <Stack
                direction="row"
                spacing={1.1}
                sx={{
                  alignItems: "center",
                  mb: { xs: 1.75, md: 2 },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 36, md: 40 },
                    height: { xs: 36, md: 40 },
                    borderRadius: "11px",
                    backgroundColor: "#F0F7F4",
                    color: "#347A62",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <BadgeRounded
                    sx={{
                      fontSize: { xs: 20, md: 22 },
                    }}
                  />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 16, md: 18 },
                      fontWeight: 800,
                      color: "#172033",
                      lineHeight: 1.25,
                    }}
                  >
                    About You
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.25,
                      fontSize: { xs: 11.5, md: 13 },
                      color: "#64748B",
                    }}
                  >
                    Your personal and location information.
                  </Typography>
                </Box>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                  },
                  gap: { xs: 1.5, sm: 1.75, md: 2 },
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={labelSx}>First Name</Typography>

                  <TextField
                    value={profile.firstName}
                    onChange={(event) =>
                      handleChange("firstName", event.target.value)
                    }
                    placeholder="Enter your first name"
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <PersonOutlineRounded
                            sx={{
                              mr: 1,
                              fontSize: 20,
                              color: "#8B929A",
                            }}
                          />
                        ),
                      },
                    }}
                    sx={fieldSx}
                  />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={labelSx}>Last Name</Typography>

                  <TextField
                    value={profile.lastName}
                    onChange={(event) =>
                      handleChange("lastName", event.target.value)
                    }
                    placeholder="Enter your last name"
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <PersonOutlineRounded
                            sx={{
                              mr: 1,
                              fontSize: 20,
                              color: "#8B929A",
                            }}
                          />
                        ),
                      },
                    }}
                    sx={fieldSx}
                  />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={labelSx}>
                    Country of Citizenship
                  </Typography>

                  <Select
                    fullWidth
                    value={profile.countryId ?? ""}
                    displayEmpty
                    onChange={(event) => {
                      const value = event.target.value as number | "";

                      handleCountryChange(
                        value === "" ? null : Number(value),
                      );
                    }}
                    startAdornment={
                      <PublicRounded
                        sx={{
                          mr: 1,
                          fontSize: 20,
                          color: "#8B929A",
                        }}
                      />
                    }
                    sx={selectSx}
                  >
                    <MenuItem value="" disabled>
                      Select country
                    </MenuItem>

                    {profileLookups.countries.map((country) => (
                      <MenuItem
                        key={country.countryId}
                        value={country.countryId}
                      >
                        {country.flagEmoji} {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={labelSx}>
                    Postcode (Optional)
                  </Typography>

                  <TextField
                    value={profile.postcode ?? ""}
                    onChange={(event) =>
                      handleChange("postcode", event.target.value)
                    }
                    placeholder="e.g. G12 8QQ"
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <LocationCityRounded
                            sx={{
                              mr: 1,
                              fontSize: 20,
                              color: "#8B929A",
                            }}
                          />
                        ),
                      },
                    }}
                    sx={fieldSx}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                ...sectionSx,
                mt: { xs: 1.5, sm: 1.75, md: 2 },
              }}
            >
              <Stack
                direction="row"
                spacing={1.1}
                sx={{
                  alignItems: "center",
                  mb: { xs: 1.75, md: 2 },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 36, md: 40 },
                    height: { xs: 36, md: 40 },
                    borderRadius: "11px",
                    backgroundColor: "#F0F7F4",
                    color: "#347A62",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <SchoolRounded
                    sx={{
                      fontSize: { xs: 20, md: 22 },
                    }}
                  />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 16, md: 18 },
                      fontWeight: 800,
                      color: "#172033",
                      lineHeight: 1.25,
                    }}
                  >
                    Studies
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.25,
                      fontSize: { xs: 11.5, md: 13 },
                      color: "#64748B",
                    }}
                  >
                    Your university and current course details.
                  </Typography>
                </Box>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                  },
                  gap: { xs: 1.5, sm: 1.75, md: 2 },
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={labelSx}>University City</Typography>

                  <Select
                    fullWidth
                    value={profile.cityId ?? ""}
                    displayEmpty
                    disabled={profile.countryId === null}
                    onChange={(event) => {
                      const value = event.target.value as number | "";

                      handleCityChange(
                        value === "" ? null : Number(value),
                      );
                    }}
                    startAdornment={
                      <LocationCityRounded
                        sx={{
                          mr: 1,
                          fontSize: 20,
                          color: "#8B929A",
                        }}
                      />
                    }
                    sx={selectSx}
                  >
                    <MenuItem value="" disabled>
                      Select city
                    </MenuItem>

                    {cities.map((city) => (
                      <MenuItem key={city.cityId} value={city.cityId}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={labelSx}>University</Typography>

                  <Select
                    fullWidth
                    value={profile.universityId ?? ""}
                    displayEmpty
                    disabled={profile.cityId === null}
                    onChange={(event) => {
                      const value = event.target.value as number | "";

                      handleChange(
                        "universityId",
                        value === "" ? null : Number(value),
                      );
                    }}
                    startAdornment={
                      <SchoolRounded
                        sx={{
                          mr: 1,
                          fontSize: 20,
                          color: "#8B929A",
                        }}
                      />
                    }
                    sx={selectSx}
                  >
                    <MenuItem value="" disabled>
                      Select university
                    </MenuItem>

                    {universities.map((university) => (
                      <MenuItem
                        key={university.universityId}
                        value={university.universityId}
                      >
                        {university.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={labelSx}>Degree Level</Typography>

                  <Select
                    fullWidth
                    value={profile.degreeLevelId ?? ""}
                    displayEmpty
                    onChange={(event) => {
                      const value = event.target.value as number | "";

                      handleChange(
                        "degreeLevelId",
                        value === "" ? null : Number(value),
                      );
                    }}
                    startAdornment={
                      <HistoryEduRounded
                        sx={{
                          mr: 1,
                          fontSize: 20,
                          color: "#8B929A",
                        }}
                      />
                    }
                    sx={selectSx}
                  >
                    <MenuItem value="" disabled>
                      Select degree level
                    </MenuItem>

                    {degreeLevels.map((degree) => (
                      <MenuItem key={degree.id} value={degree.id}>
                        {degree.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={labelSx}>
                    Course / Programme
                  </Typography>

                  <TextField
                    value={profile.courseName}
                    onChange={(event) =>
                      handleChange("courseName", event.target.value)
                    }
                    placeholder="e.g. MSc Software Development"
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <MenuBookRounded
                            sx={{
                              mr: 1,
                              fontSize: 20,
                              color: "#8B929A",
                            }}
                          />
                        ),
                      },
                    }}
                    sx={fieldSx}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                ...sectionSx,
                mt: { xs: 1.5, sm: 1.75, md: 2 },
              }}
            >
              <Stack
                direction="row"
                spacing={1.1}
                sx={{
                  alignItems: "center",
                  mb: { xs: 1.75, md: 2 },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 36, md: 40 },
                    height: { xs: 36, md: 40 },
                    borderRadius: "11px",
                    backgroundColor: "#F0F7F4",
                    color: "#347A62",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FlightTakeoffRounded
                    sx={{
                      fontSize: { xs: 20, md: 22 },
                    }}
                  />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 16, md: 18 },
                      fontWeight: 800,
                      color: "#172033",
                      lineHeight: 1.25,
                    }}
                  >
                    Journey
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.25,
                      fontSize: { xs: 11.5, md: 13 },
                      color: "#64748B",
                    }}
                  >
                    Your arrival and accommodation information.
                  </Typography>
                </Box>
              </Stack>

              <Box>
                <Typography sx={{ ...labelSx, mb: 0.9 }}>
                  Have you already arrived in the UK?
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr",
                    },
                    gap: { xs: 1.25, sm: 1.5, md: 1.75 },
                  }}
                >
                  <Box
                    onClick={() => handleArrivalStatusChange(false)}
                    sx={{
                      minHeight: { xs: 82, sm: 88, md: 96 },
                      display: "flex",
                      alignItems: "center",
                      border: "1.5px solid",
                      borderColor:
                        profile.hasArrived === false
                          ? "#347A62"
                          : "#E5E7EB",
                      borderRadius: "13px",
                      p: { xs: 1.5, sm: 1.75 },
                      cursor: "pointer",
                      backgroundColor:
                        profile.hasArrived === false
                          ? "#F3FAF7"
                          : "#FFFFFF",
                      transition:
                        "border-color 0.2s ease, background-color 0.2s ease",
                      "&:hover": {
                        borderColor: "#347A62",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.25}
                      sx={{
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 36, sm: 40 },
                          height: { xs: 36, sm: 40 },
                          borderRadius: "11px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#EAF5F0",
                          color: "#347A62",
                          flexShrink: 0,
                        }}
                      >
                        <FlightTakeoffRounded
                          sx={{
                            fontSize: { xs: 20, sm: 22 },
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: 12.5, sm: 13.5 },
                            fontWeight: 700,
                            color: "#172033",
                          }}
                        >
                          No, I'm preparing
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.2,
                            fontSize: { xs: 10.5, sm: 11.5 },
                            color: "#6B7280",
                          }}
                        >
                          I'm still outside the UK.
                        </Typography>
                      </Box>

                      {profile.hasArrived === false && (
                        <CheckCircleRounded
                          sx={{
                            color: "#347A62",
                            fontSize: 21,
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </Stack>
                  </Box>

                  <Box
                    onClick={() => handleArrivalStatusChange(true)}
                    sx={{
                      minHeight: { xs: 82, sm: 88, md: 96 },
                      display: "flex",
                      alignItems: "center",
                      border: "1.5px solid",
                      borderColor:
                        profile.hasArrived === true
                          ? "#347A62"
                          : "#E5E7EB",
                      borderRadius: "13px",
                      p: { xs: 1.5, sm: 1.75 },
                      cursor: "pointer",
                      backgroundColor:
                        profile.hasArrived === true
                          ? "#F3FAF7"
                          : "#FFFFFF",
                      transition:
                        "border-color 0.2s ease, background-color 0.2s ease",
                      "&:hover": {
                        borderColor: "#347A62",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.25}
                      sx={{
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 36, sm: 40 },
                          height: { xs: 36, sm: 40 },
                          borderRadius: "11px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#EAF5F0",
                          color: "#347A62",
                          flexShrink: 0,
                        }}
                      >
                        <HomeRounded
                          sx={{
                            fontSize: { xs: 20, sm: 22 },
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: 12.5, sm: 13.5 },
                            fontWeight: 700,
                            color: "#172033",
                          }}
                        >
                          Yes, I've already arrived
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.2,
                            fontSize: { xs: 10.5, sm: 11.5 },
                            color: "#6B7280",
                          }}
                        >
                          I'm already in the UK.
                        </Typography>
                      </Box>

                      {profile.hasArrived === true && (
                        <CheckCircleRounded
                          sx={{
                            color: "#347A62",
                            fontSize: 21,
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </Stack>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  mt: { xs: 1.5, sm: 1.75, md: 2 },
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                  },
                  gap: { xs: 1.5, sm: 1.75, md: 2 },
                  alignItems: "start",
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={labelSx}>
                    {profile.hasArrived
                      ? "Arrival Date"
                      : "Expected Arrival Date"}
                  </Typography>

                  <DatePicker
                    value={
                      profile.arrivalDate
                        ? dayjs(profile.arrivalDate)
                        : null
                    }
                    onChange={(value) =>
                      handleChange(
                        "arrivalDate",
                        value
                          ? value.format("YYYY-MM-DD")
                          : null,
                      )
                    }
                    disablePast={profile.hasArrived !== true}
                    maxDate={
                      profile.hasArrived === true
                        ? dayjs()
                        : undefined
                    }
                    format="DD MMM YYYY"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: fieldSx,
                      },
                    }}
                  />

                  <Typography
                    sx={{
                      mt: 0.65,
                      fontSize: { xs: 10.5, md: 11.5 },
                      color: "#94A3B8",
                      lineHeight: 1.4,
                    }}
                  >
                    {profile.hasArrived
                      ? "Select the date you arrived in the UK (past or today)."
                      : "Select the date you expect to arrive in the UK (today or future)."}
                  </Typography>
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={labelSx}>
                    Accommodation Status
                  </Typography>

                  <Select
                    fullWidth
                    value={profile.accommodationTypeId ?? ""}
                    displayEmpty
                    onChange={(event) => {
                      const value = event.target.value as number | "";

                      handleChange(
                        "accommodationTypeId",
                        value === "" ? null : Number(value),
                      );
                    }}
                    startAdornment={
                      <HomeRounded
                        sx={{
                          mr: 1,
                          fontSize: 20,
                          color: "#8B929A",
                        }}
                      />
                    }
                    sx={selectSx}
                  >
                    <MenuItem value="" disabled>
                      Select accommodation status
                    </MenuItem>

                    {accommodationTypes.map((accommodation) => (
                      <MenuItem
                        key={accommodation.id}
                        value={accommodation.id}
                      >
                        {accommodation.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>
            </Box>

            {error && (
              <Box
                sx={{
                  mt: { xs: 1.5, sm: 1.75, md: 2 },
                  p: { xs: 1.25, md: 1.5 },
                  borderRadius: "11px",
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FECACA",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 13 },
                    fontWeight: 500,
                    color: "#B91C1C",
                    lineHeight: 1.45,
                  }}
                >
                  {error}
                </Typography>
              </Box>
            )}

            <Stack
              direction={{
                xs: "column-reverse",
                sm: "row",
              }}
              spacing={1.25}
              sx={{
                mt: { xs: 2, sm: 2.25, md: 2.5 },
                justifyContent: "flex-end",
                alignItems: {
                  xs: "stretch",
                  sm: "center",
                },
              }}
            >
              <Button
                variant="contained"
                startIcon={
                  saving ? (
                    <Box
                      sx={{
                        width: 17,
                        height: 17,
                        border: "2px solid rgba(255,255,255,0.4)",
                        borderTopColor: "#FFFFFF",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                        "@keyframes spin": {
                          from: {
                            transform: "rotate(0deg)",
                          },
                          to: {
                            transform: "rotate(360deg)",
                          },
                        },
                      }}
                    />
                  ) : (
                    <SaveRounded sx={{ fontSize: 19 }} />
                  )
                }
                onClick={handleSave}
                disabled={!isValid || saving}
                sx={{
                  minWidth: { xs: "100%", sm: 140 },
                  height: { xs: 44, sm: 46 },
                  px: 2.25,
                  borderRadius: "11px",
                  textTransform: "none",
                  fontSize: 13,
                  fontWeight: 700,
                  backgroundColor: "#347A62",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#28634F",
                    boxShadow: "none",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#D7E2DD",
                    color: "#FFFFFF",
                  },
                }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </CommonPageLayout>
  );
};

export default ProfileEditPage;