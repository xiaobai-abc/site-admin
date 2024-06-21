// 布局头部
import classNames from "classnames";
import { Typography } from "@arco-design/web-react";
import styles from "./index.module.less";

//图标
const iconList = [
  {
    id: 1,
    icon: "settings"
  },
  {
    id: 2,
    icon: "user"
  }
];

const headImgError = new URL(`@/assets/head.png`, import.meta.url).href;

function LayoutHeader() {
  return (
    <header className={styles.header}>
      <Typography.Title heading={5} style={{ margin: "10px 15px" }}>
        xiaobai-abc 管理
      </Typography.Title>
    </header>
  );
}

export default LayoutHeader;
