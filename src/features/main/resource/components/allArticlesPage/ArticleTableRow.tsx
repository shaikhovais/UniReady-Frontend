import dayjs from "dayjs";

import {
  AccessTimeRounded,
  BookmarkBorderRounded,
  BookmarkRounded,
} from "@mui/icons-material";

import {
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { getAppIcon } from "../../../../../utils/appIcons";

import type { Lookup } from "../../../../../types/core/common/Lookup";
import type { ArticleListItem } from "../../../../../types/features/resource";

export interface ArticleTableRowProps {
  article: ArticleListItem;
  category?: Lookup;
  onView: (article: ArticleListItem) => void;
  onToggleSave: (article: ArticleListItem) => void;
}

const ArticleTableRow = ({
  article,
  category,
  onView,
  onToggleSave,
}: ArticleTableRowProps) => {
  const tintColor = category?.color ?? "#1F733E";

  return (
    <Box
      onClick={() => onView(article)}
      sx={{
        cursor: "pointer",
        display: "grid",
        gridTemplateColumns:
          "minmax(220px, 1.8fr) 140px minmax(200px, 1.6fr) 110px 90px 70px",
        columnGap: 2,
        alignItems: "center",
        px: 2,
        py: 1.75,
        minHeight: 76,
        borderBottom: "1px solid #F1F5F9",
        transition: "background-color 0.18s ease",

        "&:last-child": {
          borderBottom: "none",
        },

        "&:hover": {
          backgroundColor: "#FAFCFB",

          "& .article-title": {
            color: tintColor,
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
          sx={{
            width: 42,
            height: 42,
            flexShrink: 0,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `${tintColor}14`,
            color: tintColor,
          }}
        >
          {getAppIcon(category?.icon ?? "customCategory")}
        </Box>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <Typography
            className="article-title"
            sx={{
              fontSize: 13.5,
              fontWeight: 700,
              color: "#172033",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              transition: "color 0.18s ease",
            }}
          >
            {article.title}
          </Typography>
        </Stack>
      </Stack>

      <Tooltip
        title={article.categoryName}
        arrow
        placement="top"
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            maxWidth: "100%",
            width: "fit-content",
            px: 1.15,
            py: 0.55,
            borderRadius: "999px",
            backgroundColor: `${tintColor}12`,
            border: `1px solid ${tintColor}20`,
            color: tintColor,
            cursor: "default",
          }}
        >
          <Typography
            sx={{
              fontSize: 11.5,
              fontWeight: 700,
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {article.categoryName}
          </Typography>
        </Box>
      </Tooltip>

      <Typography
        sx={{
          fontSize: 12.5,
          lineHeight: 1.5,
          color: "#64748B",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {article.shortDescription}
      </Typography>

      <Typography
        sx={{
          fontSize: 12,
          color: "#64748B",
          whiteSpace: "nowrap",
        }}
      >
        {dayjs(article.createdAt).format("MMM D, YYYY")}
      </Typography>

      <Stack
        direction="row"
        spacing={0.6}
        sx={{
          alignItems: "center",
        }}
      >
        <AccessTimeRounded
          sx={{
            fontSize: 15,
            color: "#94A3B8",
          }}
        />

        <Typography
          sx={{
            fontSize: 12,
            color: "#64748B",
            whiteSpace: "nowrap",
          }}
        >
          {article.readTimeMinutes} min
        </Typography>
      </Stack>

      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          onToggleSave(article);
        }}
        aria-label={
          article.isSaved ? "Unsave article" : "Save article"
        }
        sx={{
          width: 34,
          height: 34,
          borderRadius: "10px",
          color: article.isSaved ? "#15803D" : "#94A3B8",
          backgroundColor: article.isSaved
            ? "#ECFDF3"
            : "transparent",
          border: article.isSaved
            ? "1px solid #BBF7D0"
            : "1px solid transparent",
          transition:
            "background-color 0.18s ease, color 0.18s ease, transform 0.18s ease, border-color 0.18s ease",

          "&:hover": {
            backgroundColor: "#ECFDF3",
            color: "#15803D",
            borderColor: "#BBF7D0",
            transform: "translateY(-1px)",
          },
        }}
      >
        {article.isSaved ? (
          <BookmarkRounded sx={{ fontSize: 18 }} />
        ) : (
          <BookmarkBorderRounded sx={{ fontSize: 18 }} />
        )}
      </IconButton>
    </Box>
  );
};

export default ArticleTableRow;