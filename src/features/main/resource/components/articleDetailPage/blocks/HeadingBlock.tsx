import { Typography } from "@mui/material";

import type { ArticleContentBlock } from "../../../../../../types/features/resource";

interface HeadingJsonContent {
  level?: "H2" | "H3" | "H4";
}

export interface HeadingBlockProps {
  block: ArticleContentBlock;
}

const HeadingBlock = ({ block }: HeadingBlockProps) => {
  let level: HeadingJsonContent["level"] = "H2";

  if (block.jsonContent) {
    try {
      const parsed = JSON.parse(block.jsonContent) as HeadingJsonContent;
      level = parsed.level ?? "H2";
    } catch {
      level = "H2";
    }
  }

  const isSubHeading = level === "H3" || level === "H4";

  return (
    <Typography
      component={isSubHeading ? "h3" : "h2"}
      sx={{
        fontSize: isSubHeading ? { xs: 16, md: 18 } : { xs: 19, md: 22 },
        fontWeight: 700,
        color: "#111827",
        lineHeight: 1.4,
        mt: isSubHeading ? 3 : 4,
        mb: 1.25,
      }}
    >
      {block.textContent}
    </Typography>
  );
};

export default HeadingBlock;