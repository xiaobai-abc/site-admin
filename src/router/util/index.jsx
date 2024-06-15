import { lazy, Suspense } from "react";
import { LAYOUT } from "../constant";

const LoadingComponent = () => {
  // return <>loading</>;
  return <>{""}</>;
};
// 组件懒加载
export function LazyElement({ routeElement }) {
  const LazyComponent = lazy(routeElement);
  return (
    <Suspense fallback={<LoadingComponent></LoadingComponent>}>
      <LazyComponent />
    </Suspense>
  );
}

// 组件懒加载 不包含suspense
export function LazyComponent(routeElement) {
  const LazyComponent = lazy(routeElement);
  return <LazyComponent />;
}

// 处理懒加载格式 这里对参数校验不是很严格
export function wrapRoutesWithLazy(route) {
  return route.map((item, index) => {
    const tempItem = Object.assign({}, item);
    if (typeof item.element === "function") {
      tempItem.element = (
        <LazyElement routeElement={item.element}></LazyElement>
      );
    }
    if (item.children) {
      tempItem.children = wrapRoutesWithLazy(item.children);
    }
    return tempItem;
  });
}

// 生成路由的模版
export function defautlComponent({ path, element,name }, ...otherRoute) {
  return {
    path,
    element: <LAYOUT></LAYOUT>,
    name,
    children: [
      {
        path: "",
        element: element,
      },
      ...otherRoute,
    ],
  };
}
