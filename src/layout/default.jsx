import { Outlet } from "react-router-dom";
// import { Layout, Typography } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { useNavigate, useOutlet } from "react-router-dom";

// import Menu from "./component/Menu";

function LayoutDefault({ children }) {
  // menu 是否折叠
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <>
    asd
      {/* <Breadcrumb></Breadcrumb> */}
      {/* 目前只有notfound页面需要给layout传参  */}
      {/* 主要部分 */}
      {/* <Render children={children}></Render> */}
    </>
  );
}

export default LayoutDefault;

function Render(context) {
  const { children } = context;

  if (children) {
    return children;
  }
  return <Outlet />;
}
