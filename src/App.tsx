import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./features/landing/LandingPage";
import AuthPage from "./features/auth/AuthPage";
import ProfilePage from "./features/profile/ProfilePage";

import DashboardPage from "./features/main/dasboard/DashboardPage";
import MyJourneyPage from "./features/main/my-journey/MyJourneyPage";
import ChecklistsPage from "./features/main/checklists/ChecklistsPage";
import BudgetPlannerPage from "./features/main/budget-planner/BudgetPlannerPage";
import ExplorePage from "./features/main/explore/ExplorePage";
import ShoppingListsPage from "./features/main/shopping-lists/ShoppingListsPage";
import ResourcesPage from "./features/main/resource/ResourcesPage";
import ProfileEditPage from "./features/main/profile-edit/ProfileEditPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import { ROUTES } from "./routes/path";
import ArticleDetailPage from "./features/main/resource/components/articleDetailPage/ArticleDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        <Route path={ROUTES.HOME} element={<LandingPage />} />

        <Route path={ROUTES.LOGIN} element={<AuthPage mode="login" />} />

        <Route path={ROUTES.REGISTER} element={<AuthPage mode="register" />} />

        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={<AuthPage mode="forgot-password" />}
        />

        <Route path="/resources/:articleId" element={<ArticleDetailPage />} />

        <Route path={ROUTES.RESOURCES} element={<ResourcesPage />} />

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />

          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

          <Route path={ROUTES.MY_JOURNEY} element={<MyJourneyPage />} />

          <Route path={ROUTES.CHECKLISTS} element={<ChecklistsPage />} />

          <Route path={ROUTES.BUDGET_PLANNER} element={<BudgetPlannerPage />} />

          <Route path={ROUTES.EXPLORE} element={<ExplorePage />} />

          <Route path={ROUTES.SHOPPING_LISTS} element={<ShoppingListsPage />} />

          <Route path={ROUTES.EDIT_PROFILE} element={<ProfileEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
