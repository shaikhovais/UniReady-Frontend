import {
  Box,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";

interface Props {
  currentStep: number;
}

const steps = [
  "About You",
  "Studies",
  "Journey",
];

export default function ProfileProgress({
  currentStep,
}: Props) {
  return (
    <Box
      sx={{
        minWidth: 0,
        width: "100%",
      }}
    >
      <Stepper
        activeStep={currentStep - 1}
        sx={{
          "& .MuiStep-root": {
            px: {
              xs: 0.25,
              sm: 0.75,
            },
          },
          "& .MuiStepLabel-label": {
            fontSize: {
              xs: "0.68rem",
              sm: "0.875rem",
            },
            whiteSpace: "nowrap",
          },
          "& .MuiStepIcon-root": {
            fontSize: {
              xs: "1.25rem",
              sm: "1.5rem",
            },
          },
          "& .MuiStepLabel-iconContainer": {
            pr: {
              xs: 0.4,
              sm: 0.75,
            },
          },
        }}
      >
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}