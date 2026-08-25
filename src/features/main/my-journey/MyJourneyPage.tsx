import { useCallback, useEffect, useState } from "react";

import { Box } from "@mui/material";

import CommonPageLayout from "../common/CommonPageLayout";
import PageLoader from "../../../components/Loader";

import JourneyStageCard from "./components/JourneyStageCard";
import ProgressCard from "./components/ProgressCard";
import DeadlinesCard from "./components/DeadlinesCard";
import TipsCard from "./components/TipsCard";
import ArrivalCard from "./components/ArrivalCard";

import { getJourney } from "../../../services/features/journeyService";
import { updateArrivalDate } from "../../../services/core/profileService";

import type { JourneyResponse } from "../../../types/features/journey";
import { useAuth } from "../../../hooks/useAuth";

const BEFORE_ARRIVAL_TIPS = [
  "Start your visa application early and make sure all required documents are ready.",
  "Book accommodation early to have more choice and potentially better prices.",
  "Keep your passport, visa documents and university documents together and easily accessible.",
  "Plan your travel and airport transfer before arriving in the UK.",
  "Make a packing list and prepare essential items well in advance.",
  "Keep some money available for your first few days while you set up your UK finances.",
];

const AFTER_ARRIVAL_TIPS = [
  "Register with a local GP and make sure you know how to access healthcare when needed.",
  "Set up your UK bank account and organise your regular payments and essential expenses.",
  "Get a local SIM or phone plan so you can stay connected without relying on your previous number.",
  "Learn how local buses, trains and other public transport work to make getting around easier.",
  "Keep important documents such as your passport, visa and university records safely stored.",
  "Explore your local area and find nearby supermarkets, pharmacies and other essential services.",
];

const MyJourneyPage = () => {
  const [journey, setJourney] = useState<JourneyResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { refreshProfile } = useAuth();

  const loadJourney = useCallback(async () => {
    const response = await getJourney();

    setJourney(response);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        await loadJourney();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [loadJourney]);

  const handleArrivalDateUpdated = async (
    arrivalDate: string,
    hasArrived: boolean,
  ) => {
    await updateArrivalDate({
      arrivalDate,
      hasArrived,
    });

    await refreshProfile();
    await loadJourney();
  };

  if (loading || !journey) {
    return (
      <CommonPageLayout
        header={{
          title: "My Journey",
          subtitle:
            "Track your progress and complete tasks on time for a smooth journey.",
        }}
      >
        <PageLoader />
      </CommonPageLayout>
    );
  }

  const beforeArrivalTasks = journey.stages.find(
    (x) => x.journeyStageName === "Before Arrival",
  );

  const afterArrivalTasks = journey.stages.find(
    (x) => x.journeyStageName === "After Arrival",
  );

  const currentProgress = journey.header.hasArrived
    ? journey.progress.afterArrival
    : journey.progress.beforeArrival;

  const journeyStage = !journey.header.hasArrived
    ? beforeArrivalTasks
    : afterArrivalTasks;

  const currentTips = journey.header.hasArrived
    ? AFTER_ARRIVAL_TIPS
    : BEFORE_ARRIVAL_TIPS;

  return (
    <CommonPageLayout
      header={{
        title: "My Journey",
        subtitle:
          "Track your progress and complete tasks on time for a smooth journey.",
      }}
    >
      <Box
        sx={{
          display: {
            xs: "flex",
            lg: "none",
          },
          flexDirection: "column",
          gap: 2,
        }}
      >
        <ArrivalCard
          header={journey.header}
          onArrivalDateUpdated={handleArrivalDateUpdated}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          <ProgressCard progress={currentProgress} />

          <DeadlinesCard deadlines={journey.upcomingDeadlines} />
        </Box>

        {journeyStage && (
          <JourneyStageCard
            stage={journeyStage}
            onJourneyUpdated={loadJourney}
          />
        )}

        <TipsCard tips={currentTips} />
      </Box>

      <Box
        sx={{
          display: {
            xs: "none",
            lg: "grid",
          },
          gridTemplateColumns: "2fr 1fr",
          gap: 2,
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <ArrivalCard
            header={journey.header}
            onArrivalDateUpdated={handleArrivalDateUpdated}
          />

          {journeyStage && (
            <JourneyStageCard
              stage={journeyStage}
              onJourneyUpdated={loadJourney}
            />
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            position: "sticky",
            top: 24,
          }}
        >
          <ProgressCard progress={currentProgress} />

          <DeadlinesCard deadlines={journey.upcomingDeadlines} />

          <TipsCard tips={currentTips} />
        </Box>
      </Box>
    </CommonPageLayout>
  );
};

export default MyJourneyPage;