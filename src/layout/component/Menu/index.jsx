import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthSlice } from "@/store/modules/authSlice.js";
import {
  useLocation,
  useNavigate,
  matchPath,
  useRoutes
} from "react-router-dom";

// import { BaseMenu, MenuSubItem, MenuItem } from "./Base";
import { CircleGauge, Ban } from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger
} from "@/shadcn-ui/ui/menubar";

/**
 * @description 菜单列表
 * @returns
 */
function RMenu() {
  const loaction = useLocation();
  const navgiate = useNavigate();
  const [currentRoute, setCurrentRoute] = useState("/");
  const [builderMenuList, setBuilderMenuList] = useState([]);
  const { status, builderMenuList: permMenuList } =
    useSelector(selectAuthSlice); // 权限路由列表 处理成可展示的菜单列表 推入builderMenuList

  useEffect(() => {
    const menuList = filterHasMenu(permMenuList);
    console.log(menuList);
    setBuilderMenuList(menuList);
  }, [permMenuList]);

  useEffect(() => {
    // 设置当前路由地址
    // matchPath(
    //   {
    //     path: "/device/list/*",
    //     exact: true,
    //     strict: false,
    //   },
    //   loaction.pathname
    // )
    const path = loaction.pathname;
    console.log(path);
    // menu 菜单似乎 本来就可以处理 是子路由的情况
    setCurrentRoute(path);
  }, [loaction.pathname]);

  function getIconFromKey(icon) {
    const size = "1rem";
    const classname = "mr-3";
    switch (icon) {
      case "CircleGauge":
        return <CircleGauge size={size} className={classname} />;
      default:
        return <Ban size={size} className={classname} />;
    }
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem></MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>

    // <BaseMenu
    //   selectedKey={currentRoute}
    //   onClickSubMenu={(key) => console.log("asd", key)}
    // >
    //   {builderMenuList.map((item) => {
    //     return (
    //       <MenuSubItem
    //         key={item.key}
    //         path={item.key}
    //         title={
    //           <>
    //             {getIconFromKey(item.icon)} {item.label}
    //           </>
    //         }
    //       >
    //         {item.children
    //           ? item.children.map((items) => {
    //               return (
    //                 <MenuItem
    //                   key={items.key}
    //                   title={items.label}
    //                   path={items.key}
    //                 ></MenuItem>
    //               );
    //             })
    //           : "no children"}
    //       </MenuSubItem>
    //     );
    //   })}
    // </BaseMenu>
  );
}

/**
 * @description 过滤出菜单列表 去除element
 * @param {Array} list
 * @returns
 */
function filterHasMenu(list) {
  const result = [];
  list.forEach((item) => {
    const meta = item.meta || {};
    const path = item.path;
    const obj = {
      key: item.path,
      // label: meta.label,
      // icon: meta.icon,
      ...meta
    };

    if (Array.isArray(item.children) && item.children.length) {
      const temp = filterHasMenu(item.children).map((item) => {
        // 子路由和根路由拼接
        return {
          ...item,
          key: item.key ? `${path}/${item.key}` : item.key
        };
      });
      temp.length && (obj.children = temp);
    }
    result.push(obj);
  });
  return result;
}

export default RMenu;
