import {
  CheckCircleOutlineRounded,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";

import { Box, Button, Stack, Typography } from "@mui/material";

export interface ArticleFeedbackSectionProps {
  isHelpful?: boolean | null;
  showLoginError: boolean;
  feedbackMessage: string;
  onFeedback: (isHelpful: boolean) => void;
}

const ArticleFeedbackSection = ({
  isHelpful,
  showLoginError,
  feedbackMessage,
  onFeedback,
}: ArticleFeedbackSectionProps) => {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 4 },
        backgroundColor: "#FAFCFA",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 17, md: 19 },
          fontWeight: 750,
          color: "#172033",
          mb: 0.5,
        }}
      >
        Was this article helpful?
      </Typography>

      <Typography
        sx={{
          fontSize: 13,
          color: "#64748B",
          mb: 2,
        }}
      >
        Your feedback helps us improve our guides.
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "center",
        }}
      >
        <Button
          startIcon={<ThumbUpOutlined sx={{ fontSize: 18 }} />}
          onClick={() => onFeedback(true)}
          sx={{
            minWidth: 100,
            height: 40,
            px: 2,
            borderRadius: "10px",
            textTransform: "none",
            fontSize: 13,
            fontWeight: 700,
            color: isHelpful === true ? "#166534" : "#475569",
            backgroundColor:
              isHelpful === true ? "#DCFCE7" : "#FFFFFF",
            border:
              isHelpful === true
                ? "1px solid #86EFAC"
                : "1px solid #E2E8F0",

            "&:hover": {
              backgroundColor: "#F0FDF4",
              borderColor: "#86EFAC",
              color: "#166534",
            },
          }}
        >
          Yes
        </Button>

        <Button
          startIcon={<ThumbDownOutlined sx={{ fontSize: 18 }} />}
          onClick={() => onFeedback(false)}
          sx={{
            minWidth: 100,
            height: 40,
            px: 2,
            borderRadius: "10px",
            textTransform: "none",
            fontSize: 13,
            fontWeight: 700,
            color: isHelpful === false ? "#991B1B" : "#475569",
            backgroundColor:
              isHelpful === false ? "#FEF2F2" : "#FFFFFF",
            border:
              isHelpful === false
                ? "1px solid #FCA5A5"
                : "1px solid #E2E8F0",

            "&:hover": {
              backgroundColor: "#FEF2F2",
              borderColor: "#FCA5A5",
              color: "#991B1B",
            },
          }}
        >
          No
        </Button>
      </Stack>

      {showLoginError && (
        <Box
          sx={{
            mt: 2,
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.75,
            width: "fit-content",
            maxWidth: "100%",
            px: 1.5,
            py: 0.9,
            borderRadius: "9px",
            backgroundColor: "#FEF2F2",
            color: "#B91C1C",
          }}
        >
          <Typography
            sx={{
              fontSize: 12.5,
              fontWeight: 600,
            }}
          >
            You need to log in to continue.
          </Typography>
        </Box>
      )}

      {feedbackMessage && (
        <Box
          sx={{
            mt: 2,
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.75,
            width: "fit-content",
            maxWidth: "100%",
            px: 1.5,
            py: 0.9,
            borderRadius: "9px",
            backgroundColor: "#F0FDF4",
            color: "#166534",
          }}
        >
          <CheckCircleOutlineRounded sx={{ fontSize: 16 }} />

          <Typography
            sx={{
              fontSize: 12.5,
              fontWeight: 600,
            }}
          >
            {feedbackMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ArticleFeedbackSection;