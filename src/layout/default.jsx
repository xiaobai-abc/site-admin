import { Outlet } from "react-router-dom";
// import { Layout, Typography } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { useNavigate, useOutlet } from "react-router-dom";
import { ScrollArea } from "@/shadcn-ui/ui/scroll-area";

import Header from "./component/Header";
import Menu from "./component/Menu";

import ThemeTest from "./themeTest";

function LayoutDefault({ children }) {
  // menu 是否折叠
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <main className="container p-0 overflow-hidden">
      <Header></Header>

      <div className="layout pt-14 br">
        {/* 侧边栏 */}
        {/* <div
          className="slider"
          style={{
            width: "220px"
          }}
        >
          <div className="fixed h-full w-[inherit] pt-2 z-10 overflow-hidden">
            <ScrollArea className="h-full w-full overflow-hidden overflow-y-auto">
              <Menu></Menu>
            </ScrollArea>
          </div>
        </div> */}
        {/* 内容 */}
        {/* <div className="content"></div> */}
        {/* <ThemeTest></ThemeTest> */}
        <Render children={children}></Render>
      </div>

      {/* <Breadcrumb></Breadcrumb> */}
      {/* 目前只有notfound页面需要给layout传参  */}
      {/* 主要部分 */}
      {/* <Render children={children}></Render> */}
    </main>
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
