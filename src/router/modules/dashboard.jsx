import { LAYOUT } from "../constant";

export default {
  path: "/dashboard",
  name: "Dashboard",
  order: 1,
  element: <LAYOUT></LAYOUT>,
  children: [
    {
      path: "work",
      element: () => import("@/pages/dashboard/index.jsx"),
      meta: {
        label: "工作台"
      }
    }
  ],
  meta: {
    label: "仪表盘",
    icon: "IconDashboard"
  }
};
