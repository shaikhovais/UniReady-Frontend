import {
  LightbulbRounded,
  WarningAmberRounded,
} from "@mui/icons-material";

import { Box, Stack, Typography } from "@mui/material";

import type { ArticleContentBlock } from "../../../../../../types/features/resource";

interface NoteJsonContent {
  style?: "info" | "warning" | "tip";
}

const NOTE_STYLES = {
  info: {
    background: "#F0FDF4",
    border: "#BBF7D0",
    color: "#166534",
    iconBackground: "#DCFCE7",
    icon: LightbulbRounded,
  },
  tip: {
    background: "#F0FDF4",
    border: "#BBF7D0",
    color: "#166534",
    iconBackground: "#DCFCE7",
    icon: LightbulbRounded,
  },
  warning: {
    background: "#FFFBEB",
    border: "#FDE68A",
    color: "#92400E",
    iconBackground: "#FEF3C7",
    icon: WarningAmberRounded,
  },
} as const;

export interface NoteBlockProps {
  block: ArticleContentBlock;
}

const NoteBlock = ({ block }: NoteBlockProps) => {
  if (!block.textContent) return null;

  let style: keyof typeof NOTE_STYLES = "info";

  if (block.jsonContent) {
    try {
      const parsed = JSON.parse(block.jsonContent) as NoteJsonContent;

      if (parsed.style && parsed.style in NOTE_STYLES) {
        style = parsed.style;
      }
    } catch {
      style = "info";
    }
  }

  const {
    background,
    border,
    color,
    iconBackground,
    icon: Icon,
  } = NOTE_STYLES[style];

  return (
    <Box
      sx={{
        mb: 3,
        p: { xs: 1.5, sm: 2 },
        borderRadius: "16px",
        backgroundColor: background,
        border: `1px solid ${border}`,
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
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: iconBackground,
            color,
          }}
        >
          <Icon
            sx={{
              fontSize: 22,
            }}
          />
        </Box>

        <Typography
          sx={{
            flex: 1,
            fontSize: { xs: 13.5, sm: 14 },
            color,
            lineHeight: 1.65,
            fontWeight: 500,
          }}
        >
          {block.textContent}
        </Typography>
      </Stack>
    </Box>
  );
};

export default NoteBlock;