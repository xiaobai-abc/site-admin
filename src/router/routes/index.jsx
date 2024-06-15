import { LAYOUT, LoginPage, TestPage, REDIRECT_PATH } from "../constant";
import { Navigate } from "react-router-dom";

// 导入所有模块
const modules = import.meta.glob("../modules/**/*.jsx", { eager: true });
const routeModuleList = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [...routeModuleList];

// 跟路由
export const RootRoute = {
  path: "/",
  exact: true,
  element: <LAYOUT></LAYOUT>,
  children: [
    {
      path: "",
      element: <Navigate to={REDIRECT_PATH} replace></Navigate>,
    },
  ],
  meta: {
    label: "root",
  },
};

const LoginPageRoute = {
  path: "/login",
  element: <LoginPage></LoginPage>,
  meta: {
    label: "登录",
  },
};

const TestPageRoute = {
  path: "/test",
  element: (
    <LAYOUT>
      <TestPage></TestPage>
    </LAYOUT>
  ),
};

// 基本页面
export const basicRoutes = [RootRoute, LoginPageRoute, TestPageRoute];

// 错误页面
export { PAGE_NOT_FOUND_ROUTE } from "./basic";
