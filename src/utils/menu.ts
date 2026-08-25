import type { ElementType } from "react";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

export interface Menu {
  title: string;
  path: string;
  icon: ElementType;
  color: string;
}

export const menu: Menu[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: DashboardRoundedIcon,
    color: "#347A62",
  },
  {
    title: "My Journey",
    path: "/my-journey",
    icon: RouteRoundedIcon,
    color: "#2563EB",
  },
  {
    title: "Checklists",
    path: "/checklists",
    icon: ChecklistRoundedIcon,
    color: "#D97706",
  },
  {
    title: "Budget Planner",
    path: "/budget-planner",
    icon: SavingsRoundedIcon,
    color: "#059669",
  },
  {
    title: "Shopping Lists",
    path: "/shopping-lists",
    icon: ShoppingBagRoundedIcon,
    color: "#DB2777",
  },
  {
    title: "Resources",
    path: "/resources",
    icon: MenuBookRoundedIcon,
    color: "#7C3AED",
  },
  {
    title: "Profile",
    path: "/edit-profile",
    icon: PersonOutlineRoundedIcon,
    color: "#475569",
  },
];