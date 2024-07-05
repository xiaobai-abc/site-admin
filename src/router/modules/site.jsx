import { LAYOUT } from "../constant";

export default {
  path: "/site",
  name: "Site",
  order: 1,
  element: <LAYOUT></LAYOUT>,
  children: [
    {
      path: "home",
      element: () => import("@/pages/site/home.jsx"),
      meta: {
        label: "首页",
        // a : ()=>"asd"
      }
    },
    {
      path: "write",
      element: () => import("@/pages/site/write.jsx"),
      meta: {
        label: "文案"
      }
    }
  ],
  meta: {
    label: "网站设置",
    icon: "IconCodepen"
  }
};
