import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";

import {
  getProfileLookups,
  updateProfile,
} from "../../services/core/profileService";

import type {
  ProfileLookups,
  UserProfile,
} from "../../types/core/profile";

import ProfileProgress from "./components/ProfileProgress";
import ProfileImage from "./components/ProfileImage";
import TipCard from "../../components/TipCard";
import StepAboutYou from "./components/StepAboutYou";
import StepStudies from "./components/StepStudies";
import StepJourney from "./components/StepJourney";

import type { ApiResponse } from "../../types/core/common/apiResponse";
import { ROUTES } from "../../routes/path";
import { AxiosError } from "axios";
import { useAuth } from "../../hooks/useAuth";
import type { Lookup } from "../../types/core/common/Lookup";
import { getLookups } from "../../services/core/common/helperService";
import { ArrowBackRounded } from "@mui/icons-material";

const emptyLookups: ProfileLookups = {
  countries: [],
  cities: [],
  universities: [],
};

const initialProfile: UserProfile = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  countryId: -1,
  cityId: -1,
  universityId: -1,
  degreeLevelId: -1,
  courseName: "",
  hasArrived: null,
  arrivalDate: null,
  accommodationTypeId: -1,
  postcode: "",
};

export default function ProfilePage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [loading, setLoading] = useState(true);

  const [profileLookups, setProfileLookups] =
    useState<ProfileLookups>(emptyLookups);

  const [accommodationTypeLookup, setAccommodationTypeLookup] =
    useState<Lookup[]>([]);

  const [degreeLevelLookup, setDegreeLevelLookup] =
    useState<Lookup[]>([]);

  const [profile, setProfile] =
    useState<UserProfile>(initialProfile);

  const [saving, setSaving] = useState(false);

  const [loggingOut, setLoggingOut] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { refreshProfile, logout } = useAuth();

  async function loadLookups() {
    try {
      const [profileLookupsData, lookupsData] =
        await Promise.all([
          getProfileLookups(),
          getLookups([
            "AccommodationType",
            "DegreeLevel",
          ]),
        ]);

      setProfileLookups(profileLookupsData);

      setAccommodationTypeLookup(
        lookupsData.filter(
          (x: Lookup) =>
            x.type === "AccommodationType",
        ),
      );

      setDegreeLevelLookup(
        lookupsData.filter(
          (x: Lookup) =>
            x.type === "DegreeLevel",
        ),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadLookups();
  }, []);

  const handleChange = <K extends keyof UserProfile>(
    field: K,
    value: UserProfile[K],
  ) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isStep1Valid = () => {
    return (
      profile.firstName.trim() !== "" &&
      profile.lastName.trim() !== "" &&
      profile.countryId !== -1
    );
  };

  const isStep2Valid = () => {
    return (
      profile.cityId !== -1 &&
      profile.universityId !== -1 &&
      profile.degreeLevelId !== -1 &&
      profile.courseName.trim() !== ""
    );
  };

  const isStep3Valid = () => {
    return (
      profile.hasArrived !== null &&
      profile.arrivalDate !== null &&
      profile.arrivalDate !== "" &&
      profile.accommodationTypeId !== -1
    );
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid();

      case 2:
        return isStep2Valid();

      case 3:
        return isStep3Valid();

      default:
        return false;
    }
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      setCurrentStep(3);
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response: ApiResponse =
        await updateProfile(profile);

      if (response.success) {
        await refreshProfile();
        navigate(ROUTES.DASHBOARD, {
          replace: true,
        });
      } else {
        setError(response.message);
        setSaving(false);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data?.message ??
            "Unable to save your profile. Please try again.",
        );
      } else {
        setError("Something went wrong.");
      }

      setSaving(false);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goBackToOnboarding = async () => {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      await logout();
      navigate(ROUTES.HOME, {
        replace: true,
      });
    } catch {
      setLoggingOut(false);
      setError(
        "Unable to log out. Please try again.",
      );
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        minWidth: 0,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          borderRadius: 1,
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            pt: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },
          }}
        >
          <Button
            onClick={goBackToOnboarding}
            disabled={loggingOut || saving}
            startIcon={
              loggingOut ? (
                <CircularProgress
                  size={16}
                  color="inherit"
                />
              ) : (
                <ArrowBackRounded
                  sx={{
                    fontSize: 18,
                  }}
                />
              )
            }
            sx={{
              minWidth: 0,
              px: 1.25,
              py: 0.7,
              borderRadius: 1,
              textTransform: "none",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                backgroundColor:
                  "rgba(46, 125, 98, 0.06)",
              },
            }}
          >
            {loggingOut
              ? "Logging out..."
              : "Back to home"}
          </Button>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "2fr 2fr",
            },
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              p: {
                xs: 2,
                sm: 3,
                md: 4,
              },
              minWidth: 0,
            }}
          >
            <ProfileProgress
              currentStep={currentStep}
            />

            <Box
              sx={{
                mt: 2,
                minWidth: 0,
              }}
            >
              {currentStep === 1 && (
                <StepAboutYou
                  profile={profile}
                  countryLookup={
                    profileLookups.countries
                  }
                  onChange={handleChange}
                />
              )}

              {currentStep === 2 && (
                <StepStudies
                  profile={profile}
                  profileLookups={
                    profileLookups
                  }
                  degreeLevelLookup={
                    degreeLevelLookup
                  }
                  onChange={handleChange}
                />
              )}

              {currentStep === 3 && (
                <StepJourney
                  profile={profile}
                  accommodationTypeLookup={
                    accommodationTypeLookup
                  }
                  onChange={handleChange}
                />
              )}
            </Box>

            <TipCard description="You can update your profile anytime from your account settings." />

            {error && (
              <Box
                sx={{
                  mt: 2,
                  mb: 1,
                  p: 2,
                  borderRadius: 1,
                  bgcolor: "error.light",
                  color:
                    "error.contrastText",
                }}
              >
                {error}
              </Box>
            )}

            <Stack
              direction="row"
              spacing={2}
              sx={{
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                disabled={
                  currentStep === 1 ||
                  saving ||
                  loggingOut
                }
                onClick={previousStep}
              >
                Back
              </Button>

              <Button
                variant="contained"
                onClick={nextStep}
                disabled={
                  !isCurrentStepValid() ||
                  saving ||
                  loggingOut
                }
              >
                {saving ? (
                  <CircularProgress
                    size={22}
                    color="inherit"
                  />
                ) : currentStep === 3 ? (
                  "Save"
                ) : (
                  "Continue"
                )}
              </Button>
            </Stack>
          </Box>

          <ProfileImage
            currentStep={currentStep}
          />
        </Box>
      </Paper>
    </Box>
  );
}