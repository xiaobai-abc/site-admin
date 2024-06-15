import { LAYOUT } from "../constant";

import NotFoundPage from "@/pages/notFound";
// 404 on a page 始终要放到列表最底部
export const PAGE_NOT_FOUND_ROUTE = {
  path: "*",
  element: (
    <LAYOUT>
      <NotFoundPage></NotFoundPage>
    </LAYOUT>
  ),
};

// export const ERROR_LOG_ROUTE = {
//   path: "/error",
//   name: "Error",
//   element: <LAYOUT></LAYOUT>,
//   meta: {
//     title: "ErrorLog",
//   },
//   children: [],
// };
