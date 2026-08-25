import { Typography } from "@mui/material";

import type { ArticleContentBlock } from "../../../../../../types/features/resource";

export interface ParagraphBlockProps {
  block: ArticleContentBlock;
}

const ParagraphBlock = ({ block }: ParagraphBlockProps) => {
  if (!block.textContent) return null;

  const paragraphs = block.textContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <Typography
          key={index}
          component="p"
          sx={{
            fontSize: { xs: 15, md: 15.5 },
            color: "#4B5563",
            lineHeight: 1.8,
            letterSpacing: "0.005em",
            mb: index === paragraphs.length - 1 ? 2.5 : 1.5,
          }}
        >
          {paragraph}
        </Typography>
      ))}
    </>
  );
};

export default ParagraphBlock;