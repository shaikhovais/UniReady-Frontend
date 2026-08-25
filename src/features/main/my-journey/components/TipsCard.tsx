import { useEffect, useState } from "react";

import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";

import {
  Avatar,
  Box,
  Paper,
  Typography,
} from "@mui/material";

interface Props {
  title?: string;
  tips: string[];
}

const TipsCard = ({
  title = "Helpful Tips",
  tips,
}: Props) => {
  const [displayedTips, setDisplayedTips] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = [...tips].sort(
      () => Math.random() - 0.5,
    );

    setDisplayedTips(shuffled.slice(0, 3));
  }, [tips]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 2.5,
          sm: 3,
        },
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "rgba(217, 119, 6, 0.16)",
        background:
          "linear-gradient(135deg, #ffffff 0%, #fffbf5 100%)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.75,
          mb: 2.5,
        }}
      >
        <Avatar
          sx={{
            width: 46,
            height: 46,
            borderRadius: 1.5,
            bgcolor: "#fff8e8",
            color: "#d97706",
            flexShrink: 0,
          }}
        >
          <LightbulbRoundedIcon
            sx={{
              fontSize: 23,
            }}
          />
        </Avatar>

        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: 18,
              lineHeight: 1.25,
              color: "#0f172a",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              fontSize: 13,
              color: "#78716c",
              lineHeight: 1.4,
            }}
          >
            A few things worth keeping in mind.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.75,
        }}
      >
        {displayedTips.map((tip, index) => (
          <Box
            key={`${tip}-${index}`}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.25,
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                bgcolor: "#d97706",
                mt: "8px",
                flexShrink: 0,
              }}
            />

            <Typography
              sx={{
                color: "#57534e",
                lineHeight: 1.6,
                fontSize: 13.5,
              }}
            >
              {tip}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default TipsCard;