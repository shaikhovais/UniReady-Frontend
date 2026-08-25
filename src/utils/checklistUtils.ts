import {
  ChecklistImportance,
  ChecklistStatus,
} from "../types/features/checklist/checklistEnums";

export const getChecklistImportanceLabel = (
  importance: ChecklistImportance,
) => {
  switch (importance) {
    case ChecklistImportance.Optional:
      return "Optional";

    case ChecklistImportance.Important:
      return "Important";

    case ChecklistImportance.Essential:
      return "Essential";
  }
};

export const getChecklistStatusLabel = (
  status: ChecklistStatus,
) => {
  switch (status) {
    case ChecklistStatus.GotIt:
      return "Got It";

    case ChecklistStatus.NeedToBuy:
      return "Need to Buy";

    case ChecklistStatus.ToReview:
      return "To Review";

    case ChecklistStatus.NotNeeded:
      return "Not Needed";
  }
};

export const getChecklistImportanceColor = (
  importance: ChecklistImportance,
) => {
  switch (importance) {
    case ChecklistImportance.Optional:
      return "#d021f3";

    case ChecklistImportance.Important:
      return "#e44848";

    case ChecklistImportance.Essential:
      return "#21aed9";
  }
};

export const getChecklistStatusColor = (
  status: ChecklistStatus,
) => {
  switch (status) {
    case ChecklistStatus.GotIt:
      return "#16A34A";

    case ChecklistStatus.NeedToBuy:
      return "#F59E0B";

    case ChecklistStatus.ToReview:
      return "#6D28D9";

    case ChecklistStatus.NotNeeded:
      return "#616161";
  }
};