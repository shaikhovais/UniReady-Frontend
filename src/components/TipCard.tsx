import { Box, Stack, Typography } from "@mui/material";

import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";

interface Props {
  description: string;
}

export default function TipCard({ description }: Props) {
  return (
    <Box
      sx={{
        p: 1.25,
        mt: 1,
        borderRadius: 1,
        background:
          "linear-gradient(135deg, #DDF4E7 0%, #EAF8F0 50%, #F4FBF7 100%)",
        border: "1px solid",
        borderColor: "#A8D5BA",
        boxShadow: "0 3px 12px rgba(22, 128, 75, 0.12)",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            flexShrink: 0,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #BFE8CE, #D9F3E3)",
            color: "#16804B",
          }}
        >
          <TipsAndUpdatesRoundedIcon
            sx={{
              fontSize: 21,
            }}
          />
        </Box>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            fontSize: 12,
            lineHeight: 1.45,
            color: "#315B43",
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Box>
  );
}