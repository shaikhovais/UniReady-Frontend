import { Stack, Typography } from "@mui/material";

import type { ChecklistItem } from "../../../../../types/features/checklist/checklist";
import type { Lookup } from "../../../../../types/core/common/Lookup";

import ChecklistRow from "./ChecklistRow";

interface Props {
  items: ChecklistItem[];
  checklistImportances: Lookup[];
  checklistStatuses: Lookup[];
  onUpdated?: () => void;
}

const ChecklistTable = ({
  items,
  checklistImportances,
  checklistStatuses,
  onUpdated,
}: Props) => {
  const gridTemplateColumns = {
    xs: "1fr",
    md: "minmax(0, 2.5fr) minmax(0, 1.2fr) minmax(0, 1.2fr) minmax(0, 2fr)",
  };

  if (items.length === 0) {
    return (
      <Stack
        sx={{
          minHeight: 220,
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1.5,
          bgcolor: "background.paper",
          px: 3,
          py: 5,
        }}
      >
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 14,
          }}
        >
          No checklist items found.
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack
      spacing={0}
      sx={{
        border: "1px solid",
        borderColor: "#e2e8f0",
        borderRadius: 1.5,
        overflow: "hidden",
        bgcolor: "#ffffff",

        "& > .checklist-row + .checklist-row": {
          borderTop: {
            xs: "8px solid #f8fafc",
            md: "none",
          },
        },
      }}
    >
      <Stack
        sx={{
          display: {
            xs: "none",
            md: "grid",
          },
          gridTemplateColumns,
          gap: 2,
          alignItems: "center",
          px: 2,
          py: 1.25,
          bgcolor: "#f8fafc",
          borderBottom: "1px solid",
          borderColor: "#e2e8f0",
        }}
      >
        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 700,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Item
        </Typography>

        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 700,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Importance
        </Typography>

        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 700,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Status
        </Typography>

        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 700,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Notes
        </Typography>
      </Stack>

      {items.map((item) => (
        <Stack
          key={item.id}
          className="checklist-row"
          sx={{
            bgcolor: "#ffffff",
          }}
        >
          <ChecklistRow
            item={item}
            checklistImportances={checklistImportances}
            checklistStatuses={checklistStatuses}
            onUpdated={onUpdated}
            gridTemplateColumns={gridTemplateColumns}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default ChecklistTable;