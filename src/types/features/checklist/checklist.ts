export interface ChecklistStatistics {
  totalItems: number;
  progress: number;

  gotIt: number;
  needToBuy: number;
  toReview: number;
  notNeeded: number;
}

export interface ChecklistCategorySummary {
  id: number;
  name: string;
  description: string;
  iconKey: string;
  importance: string;

  statistics: ChecklistStatistics;
}

export interface ChecklistOverviewResponse {
  overall: ChecklistStatistics;
  categories: ChecklistCategorySummary[];
}

export interface ChecklistTip {
  description: string;
  imagePath: string;
}

export interface ChecklistItem {
  id: number;
  name: string;
  iconKey: string;

  importanceId: number;
  statusId: number;

  notes: string | null;

  isCustom: boolean;
}

export interface ChecklistCategoryResponse {
  category: ChecklistCategorySummary;
  tip: ChecklistTip;
  items: ChecklistItem[];
}

export interface UpdateChecklistItemRequest {
  name?: string;
  importanceId?: number;
  statusId?: number;
  notes?: string;
}

export interface AddCustomChecklistItemRequest {
  categoryId: number;
  name: string;
  importanceId: number;
  statusId: number;
}