import { Box } from "@mui/material";

import ImgStepAboutYou from "../../../assets/images/profile/StepAboutYou.png";
import ImgStepStudies from "../../../assets/images/profile/StepStudies.png";
import ImgStepJourney from "../../../assets/images/profile/StepJourney.webp";

interface Props {
  currentStep: number;
}

const images = [ImgStepAboutYou, ImgStepStudies, ImgStepJourney];

export default function ProfileImage({ currentStep }: Props) {
  return (
    <Box
      sx={{
        display: {
          xs: "none",
          md: "flex",
        },
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        bgcolor: "#FFFFFF",
        p: 4,
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={images[currentStep - 1]}
        alt={`Profile step ${currentStep}`}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}