export const ChecklistImportance = {
  Optional: 1,
  Important: 2,
  Essential: 3,
} as const;

export type ChecklistImportance =
  (typeof ChecklistImportance)[keyof typeof ChecklistImportance];

export const ChecklistStatus = {
  GotIt: 1,
  NeedToBuy: 2,
  ToReview: 3,
  NotNeeded: 4,
} as const;

export type ChecklistStatus =
  (typeof ChecklistStatus)[keyof typeof ChecklistStatus];