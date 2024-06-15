// 跟路由 不需要是layout  不需要懒加载
export { default as LAYOUT } from "@/layout/default";
export { default as LoginPage } from "@/pages/login";
export { default as TestPage } from "@/pages/test";

export const getParentLayout = (_name) => {
  return () => (resolve) => {
    resolve({
      name: _name || "ParentLayout",
    });
  };
};

// 默认重定向位置
export const REDIRECT_PATH = "/dashboard";
