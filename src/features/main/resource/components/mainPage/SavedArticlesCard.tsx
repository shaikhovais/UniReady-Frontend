import { BookmarkRounded, ChevronRightRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

export interface SavedArticlesCardProps {
  onClick: () => void;
}

const SavedArticlesCard = ({ onClick }: SavedArticlesCardProps) => {
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
            "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
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
          Saved Articles
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            color: "rgba(255,255,255,0.88)",
            mt: 0.5,
            lineHeight: 1.4,
          }}
        >
          Access your bookmarked guides quickly
        </Typography>
      </Box>

      <Stack
        direction="row"
        onClick={onClick}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 1.75,
          backgroundColor: "#FFFFFF",
          cursor: "pointer",
          transition:
            "background-color 0.2s ease, transform 0.2s ease",

          "&:hover": {
            backgroundColor: "#FAF9FF",

            "& .saved-icon": {
              transform: "scale(1.05)",
            },

            "& .saved-arrow": {
              transform: "translateX(4px)",
              color: "#7C3AED",
            },

            "& .saved-text": {
              color: "#7C3AED",
            },
          },
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <Box
            className="saved-icon"
            sx={{
              width: 46,
              height: 46,
              borderRadius: "13px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F5F3FF",
              color: "#7C3AED",
              flexShrink: 0,
              transition: "transform 0.2s ease",
            }}
          >
            <BookmarkRounded sx={{ fontSize: 22 }} />
          </Box>

          <Typography
            className="saved-text"
            sx={{
              fontSize: 13.5,
              fontWeight: 700,
              color: "#111827",
              transition: "color 0.2s ease",
            }}
          >
            View saved guides
          </Typography>
        </Stack>

        <ChevronRightRounded
          className="saved-arrow"
          sx={{
            fontSize: 21,
            color: "#CBD5E1",
            flexShrink: 0,
            transition:
              "transform 0.2s ease, color 0.2s ease",
          }}
        />
      </Stack>
    </Box>
  );
};

export default SavedArticlesCard;