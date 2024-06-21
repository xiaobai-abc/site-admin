import { Outlet } from "react-router-dom";
import { Layout } from "@arco-design/web-react";
import { useEffect, useState } from "react";

import Breadcrumb from "./component/Breadcrumb";
import Menu from "./component/Menu";
import HeaderCom from "./component/Header";

import styles from "./default.module.less";

const Sider = Layout.Sider;
const Header = Layout.Header;
const Content = Layout.Content;

function LayoutDefault({ children }) {
  // menu 是否折叠
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.defaultLayout}>
      <Header
        className={styles.header}
        style={{ borderBottom: "1px solid #ededed" }}
      >
        <HeaderCom></HeaderCom>
      </Header>
      <Layout>
        <Sider className={styles.sider} width={220} collapsed={isCollapsed}>
          <div className={styles.siderMenu}>
            <Menu></Menu>
          </div>
        </Sider>
        <Content
          className={styles.content}
          style={{
            paddingLeft: isCollapsed ? 20 : 220,
            paddingTop: 50
          }}
        >
          <div className={styles.contentBox}>
            <Breadcrumb></Breadcrumb>
            {/* 目前只有notfound页面需要给layout传参  */}
            {/* 主要部分 */}
            <Render children={children}></Render>
          </div>
        </Content>
      </Layout>
    </Layout>
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
