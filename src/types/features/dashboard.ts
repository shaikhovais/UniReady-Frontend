export interface Arrival {
  cityName: string;
  arrivalDate: string;
  daysUntilArrival?: number | null;
  preparationProgressPercentage: number;
}

export interface JourneyOverview {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  completionPercentage: number;
}

export interface UpcomingDeadline {
  userJourneyTaskId: number;
  title: string;
  dueDate: string;
  daysRemaining: number;
  iconKey: string;
}

export interface ChecklistCategory {
  id: number;
  name: string;
  iconKey: string;
  totalItems: number;
  gotItItems: number;
  needToBuyItems: number;
  toReviewItems: number;
  notNeededItems: number;
}

export interface Checklist {
  totalItems: number;
  gotItItems: number;
  needToBuyItems: number;
  toReviewItems: number;
  notNeededItems: number;
  categories: ChecklistCategory[];
}

export interface Guide {
  id: number;
  title: string;
  slug: string;
  categoryName: string;
  categoryIcon: string;
  categoryIconColor: string;
  readTimeMinutes: number;
}

export interface PreArrivalDashboard {
  preparationChecklist: Checklist;
}

export interface BudgetOverview {
  monthlyBudget: number;
  spent: number;
  remaining: number;
  savingsGoal: number;
  spentPercentage: number;
  remainingPercentage: number;
}

export interface RecentPayment {
  id: number;
  name: string;
  categoryName: string;
  categoryIconKey: string;
  amount: number;
  expenseDate: string;
}

export interface UpcomingBill {
  id: number;
  name: string;
  amount: number;
  dueDate: string;
  categoryName: string;
  frequency: string;
}

export interface ShoppingListSummaryItem {
  id: number;
  name: string;
  iconKey: string;
  color: string;
  totalItems: number;
  checkedItems: number;
  pendingItems: number;
  completionPercentage: number;
}

export interface ShoppingListsSummary {
  totalLists: number;
  totalItems: number;
  checkedItems: number;
  pendingItems: number;
  lists: ShoppingListSummaryItem[];
}

export interface PostArrivalDashboard {
  budgetOverview: BudgetOverview;
  recentPayments: RecentPayment[];
  upcomingBills: UpcomingBill[];
  shoppingLists: ShoppingListsSummary;
}

export interface DashboardResponse {
  isPostArrival: boolean;
  arrival: Arrival;
  journeyOverview: JourneyOverview;
  upcomingDeadlines: UpcomingDeadline[];
  featuredResources: Guide[];
  savedResources: Guide[];
  preArrival?: PreArrivalDashboard;
  postArrival?: PostArrivalDashboard;
}
