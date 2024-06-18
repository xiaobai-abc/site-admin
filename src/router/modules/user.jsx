import { LAYOUT } from "../constant";

export default {
  path: "/user",
  name: "Dashboard",
  order: 1,
  element: <LAYOUT></LAYOUT>,
  children: [
    {
      path: "info",
      element: () => import("@/pages/user/info"),
      meta: {
        label: "用户信息",
      },
    },
    {
      path: "setting",
      element: () => import("@/pages/user/setting"),
      meta: {
        label: "用户设置",
      },
    },
  ],
  meta: {
    label: "个人中心",
    icon: "IconDashboard",
  },
};
