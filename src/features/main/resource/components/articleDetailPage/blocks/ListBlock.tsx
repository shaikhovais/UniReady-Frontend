import { Box, Stack, Typography } from "@mui/material";

import type { ArticleContentBlock } from "../../../../../../types/features/resource";

interface ListJsonContent {
  type?: "bullet" | "numbered";
  items?: string[];
}

export interface ListBlockProps {
  block: ArticleContentBlock;
}

const ListBlock = ({ block }: ListBlockProps) => {
  if (!block.jsonContent) return null;

  let listContent: ListJsonContent;

  try {
    listContent = JSON.parse(block.jsonContent) as ListJsonContent;
  } catch {
    return null;
  }

  const items = listContent.items ?? [];

  if (items.length === 0) return null;

  const isNumbered = listContent.type === "numbered";

  return (
    <Stack
      spacing={1}
      sx={{
        mb: 2,
      }}
    >
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {isNumbered ? (
            <Typography
              sx={{
                width: 28,
                flexShrink: 0,
                fontSize: 15,
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.7,
              }}
            >
              {index + 1}.
            </Typography>
          ) : (
            <Box
              sx={{
                width: 28,
                flexShrink: 0,
                display: "flex",
                justifyContent: "flex-start",
                pt: "9px",
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: "#226d13",
                }}
              />
            </Box>
          )}

          <Typography
            sx={{
              flex: 1,
              fontSize: 15,
              color: "#4B5563",
              lineHeight: 1.7,
            }}
          >
            {item}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
};

export default ListBlock;