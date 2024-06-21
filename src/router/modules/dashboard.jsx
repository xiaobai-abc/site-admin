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
    },
    {
      path: "setting",
      element: () => import("@/pages/dashboard/setting.jsx"),
      meta: {
        label: "设置"
      }
    }
  ],
  meta: {
    label: "仪表盘",
    icon: "IconDashboard"
  }
};
