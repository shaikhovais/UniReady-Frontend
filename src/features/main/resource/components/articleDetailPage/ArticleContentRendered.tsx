import { Box } from "@mui/material";

import type { ArticleContentBlock } from "../../../../../types/features/resource";
import HeadingBlock from "./blocks/HeadingBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";
import ListBlock from "./blocks/ListBlock";
import ImageBlock from "./blocks/ImageBlock";
import NoteBlock from "./blocks/NoteBlock";
import DividerBlock from "./blocks/DividerBlock";

export interface ArticleContentRendererProps {
  blocks: ArticleContentBlock[];
}

const ArticleContentRenderer = ({ blocks }: ArticleContentRendererProps) => {
  const sortedBlocks = [...blocks].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  return (
    <Box>
      {sortedBlocks.map((block) => {
        switch (block.blockTypeName) {
          case "Heading":
            return <HeadingBlock key={block.id} block={block} />;
          case "Paragraph":
            return <ParagraphBlock key={block.id} block={block} />;
          case "List":
            return <ListBlock key={block.id} block={block} />;
          case "Image":
            return <ImageBlock key={block.id} block={block} />;
          case "Note":
            return <NoteBlock key={block.id} block={block} />;
          case "Divider":
            return <DividerBlock key={block.id} />;
          default:
            return null;
        }
      })}
    </Box>
  );
};

export default ArticleContentRenderer;