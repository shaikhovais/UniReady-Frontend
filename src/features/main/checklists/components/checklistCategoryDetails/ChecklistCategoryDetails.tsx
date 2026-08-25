import { useEffect, useMemo, useState } from "react";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import {
  Box,
  Button,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { getAppIcon } from "../../../../../utils/appIcons";

import CategoryStatistics from "./CategoryStatistics";
import AddItemBar from "./AddItemBar";
import ItemFilters from "./ItemFilters";
import ChecklistTable from "./ChecklistTable";

import { addCustomChecklistItem } from "../../../../../services/features/checklistService";

import type { ChecklistCategoryResponse } from "../../../../../types/features/checklist/checklist";

import type { Lookup } from "../../../../../types/core/common/Lookup";

interface Props {
  category: ChecklistCategoryResponse;
  checklistStatuses: Lookup[];
  checklistImportances: Lookup[];
  onBack: () => void;
  onRefresh: () => Promise<void>;
}

const ChecklistCategoryDetails = ({
  category,
  checklistStatuses,
  checklistImportances,
  onBack,
  onRefresh,
}: Props) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<number | "">("");
  const [importance, setImportance] = useState<number | "">("");

  const pageSize = 10;

  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return category.items.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.notes ?? "").toLowerCase().includes(query);

      const matchesStatus =
        status === "" || item.statusId === status;

      const matchesImportance =
        importance === "" ||
        item.importanceId === importance;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesImportance
      );
    });
  }, [
    category.items,
    search,
    status,
    importance,
  ]);

  useEffect(() => {
    setPage(1);
  }, [search, status, importance]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / pageSize),
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pagedItems = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filteredItems.slice(
      start,
      start + pageSize,
    );
  }, [filteredItems, page]);

  const firstItem =
    filteredItems.length === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const lastItem = Math.min(
    page * pageSize,
    filteredItems.length,
  );

  const handleAddItem = async (
    name: string,
    itemImportanceId: number,
    itemStatusId: number,
  ) => {
    await addCustomChecklistItem({
      categoryId: category.category.id,
      name,
      importanceId: itemImportanceId,
      statusId: itemStatusId,
    });

    await onRefresh();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 1,
        border: "1px solid",
        borderColor: "#F3C4D8",
        bgcolor: "#FFF1F6",
        overflow: "hidden",
      }}
    >
      <Stack spacing={0}>
        <Box
          sx={{
            px: {
              xs: 2,
              sm: 2.5,
            },
            pt: {
              xs: 1.5,
              sm: 2,
            },
          }}
        >
          <Button
            startIcon={
              <ArrowBackRoundedIcon
                sx={{
                  fontSize: 19,
                }}
              />
            }
            onClick={onBack}
            sx={{
              minWidth: 0,
              px: 1,
              py: 0.7,
              borderRadius: 1,
              color: "#9F4569",
              fontSize: 13,
              fontWeight: 700,
              textTransform: "none",

              "&:hover": {
                bgcolor: "#FFE0EC",
                color: "#7F3152",
              },
            }}
          >
            Back to categories
          </Button>
        </Box>

        <Box
          sx={{
            mx: {
              xs: 1,
              sm: 1.5,
            },
            mt: 0.5,
            borderRadius: 1,
            px: {
              xs: 1.5,
              sm: 2,
            },
            py: {
              xs: 2,
              sm: 2.5,
            },
            backgroundColor: "#FFE0EC",
            border: "1px solid",
            borderColor: "#F6C2D6",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 54,
                  sm: 60,
                },
                height: {
                  xs: 54,
                  sm: 60,
                },
                borderRadius: 1.5,
                bgcolor: "#f7b2cc",
                color: "#d4437b",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,

                "& svg": {
                  fontSize: {
                    xs: 28,
                    sm: 31,
                  },
                },
              }}
            >
              {getAppIcon(category.category.iconKey)}
            </Box>

            <Box
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 22,
                    sm: 26,
                  },
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#581C36",
                }}
              >
                {category.category.name}
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  color: "#8A536C",
                  fontSize: 13.5,
                  lineHeight: 1.5,
                }}
              >
                {category.category.description}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            px: {
              xs: 2,
              sm: 2.5,
            },
            pt: 2,
            pb: 2.5,
          }}
        >
          <CategoryStatistics
            categoryStatistics={category.category.statistics}
          />
        </Box>

        <Box
          sx={{
            mx: {
              xs: 2,
              sm: 2.5,
            },
            mb: 2,
            p: 1.5,
            borderRadius: 1.5,
            bgcolor: "#FFFFFF",
            border: "1px solid",
            borderColor: "#F0CBD9",
          }}
        >
          <AddItemBar
            checklistStatuses={checklistStatuses}
            checklistImportances={checklistImportances}
            onAdd={handleAddItem}
          />
        </Box>

        <Box
          sx={{
            mx: {
              xs: 2,
              sm: 2.5,
            },
            mb: 2,
            p: 1.5,
            borderRadius: 1.5,
            bgcolor: "#FFFFFF",
            border: "1px solid",
            borderColor: "#F0CBD9",
          }}
        >
          <ItemFilters
            search={search}
            status={status}
            importance={importance}
            checklistStatuses={checklistStatuses}
            checklistImportances={checklistImportances}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onImportanceChange={setImportance}
          />
        </Box>

        <Box
          sx={{
            mx: {
              xs: 2,
              sm: 2.5,
            },
            bgcolor: "#FFFFFF",
            borderRadius: 1.5,
            border: "1px solid",
            borderColor: "#F0CBD9",
            overflow: "hidden",
          }}
        >
          <ChecklistTable
            items={pagedItems}
            checklistImportances={checklistImportances}
            checklistStatuses={checklistStatuses}
            onUpdated={onRefresh}
          />
        </Box>

        <Box
          sx={{
            mx: {
              xs: 2,
              sm: 2.5,
            },
            mt: 2,
            mb: 2,
            px: 0.5,
            pt: 1.75,
            borderTop: "1px solid",
            borderColor: "#F0CBD9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              fontSize: 12.5,
              color: "#8A536C",
            }}
          >
            {filteredItems.length === 0
              ? "No items found"
              : `Showing ${firstItem}–${lastItem} of ${filteredItems.length} items`}
          </Typography>

          {filteredItems.length > 0 && (
            <Pagination
              page={page}
              count={totalPages}
              onChange={(_, value) => setPage(value)}
              shape="rounded"
              color="primary"
              siblingCount={1}
              boundaryCount={1}
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: 1,
                  fontWeight: 600,
                  color: "#9F4569",
                },

                "& .MuiPaginationItem-root.Mui-selected": {
                  bgcolor: "#E879A5",
                  color: "#FFFFFF",
                },

                "& .MuiPaginationItem-root.Mui-selected:hover": {
                  bgcolor: "#D95F8E",
                },
              }}
            />
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default ChecklistCategoryDetails;