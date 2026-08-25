import { Box, Typography } from "@mui/material";

import type { ArticleContentBlock } from "../../../../../../types/features/resource";

export interface ImageBlockProps {
  block: ArticleContentBlock;
}

const ImageBlock = ({ block }: ImageBlockProps) => {
  if (!block.mediaUrl) return null;

  return (
    <Box sx={{ mb: 2.5 }}>
      <Box
        component="img"
        src={block.mediaUrl}
        alt={block.caption ?? ""}
        sx={{
          width: "100%",
          borderRadius: "14px",
          border: "1px solid #EEF2F7",
          display: "block",
        }}
      />

      {block.caption && (
        <Typography
          sx={{ mt: 1, fontSize: 13, color: "#9CA3AF", textAlign: "center" }}
        >
          {block.caption}
        </Typography>
      )}
    </Box>
  );
};

export default ImageBlock;
