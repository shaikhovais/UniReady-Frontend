export interface JourneyHeader {
  arrivalDate: string;
  hasArrived: boolean;
}

export interface JourneyProgressSummary {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  completionPercentage: number;
}

export interface JourneyProgress {
  overall: JourneyProgressSummary;
  beforeArrival: JourneyProgressSummary;
  afterArrival: JourneyProgressSummary;
}

export interface UpcomingDeadline {
  userJourneyTaskId: number;
  title: string;
  dueDate: string;
  daysRemaining: number;
}

export interface JourneyTask {
  userJourneyTaskId: number;
  journeyTaskId: number;

  title: string;
  description: string;
  importanceReason: string;
  notes?: string;
  iconKey: string;

  isRequired: boolean;

  statusId: number;
  status: string;

  completedAt: string | null;

  recommendedStartDate: string;
  recommendedEndDate: string;

  daysRemaining: number;

  displayOrder: number;
}

export interface JourneyStage {
  journeyStageId: number;
  journeyStageName: string;
  tasks: JourneyTask[];
}

export interface JourneyResponse {
  header: JourneyHeader;
  progress: JourneyProgress;
  upcomingDeadlines: UpcomingDeadline[];
  stages: JourneyStage[];
}

export interface UpdateJourneyTaskRequest {
  statusId: number;
  notes: string;
}