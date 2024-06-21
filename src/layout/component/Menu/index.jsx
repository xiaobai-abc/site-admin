import { Menu } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthSlice } from "@/store/modules/authSlice.js";
import { useLocation, useNavigate } from "react-router-dom";
// import LazyIcon from "@/components/LazyIcon";
// import { IconDashboard, IconUser } from "@arco-design/web-react/icon";
import Icons from "@/components/Icons";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

/**
 * @description 菜单列表
 * @returns
 */
function RMenu() {
  const loaction = useLocation();
  const navgiate = useNavigate();
  const [currentRoute, setCurrentRoute] = useState("/");
  const [builderMenuList, setBuilderMenuList] = useState([]);
  const { builderMenuList: permMenuList } = useSelector(selectAuthSlice); // 权限路由列表 处理成可展示的菜单列表 推入builderMenuList

  useEffect(() => {
    const menuList = filterHasMenu(permMenuList);
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
    // menu 菜单似乎 本来就可以处理 是子路由的情况
    setCurrentRoute(path);
  }, [loaction.pathname]);

  //定义方法:菜单无限级递归
  function tree(data) {
    return data.map((item) => {
      if (item.children && item.children.length) {
        return (
          <SubMenu
            key={item.key}
            title={
              <>
                <Icons icon={item.icon} />
                {item.label}
              </>
            }
          >
            {tree(item.children)}
          </SubMenu>
        );
      }
      return (
        <MenuItem key={item.key} style={{ transition: "all 0.25s" }}>
          <span style={{ display: "inline-block", width: "10px" }}></span>
          {item.label}
        </MenuItem>
      );
    });
  }

  // 点击菜单项
  function handMenuItem(k) {
    console.log(k);
    if (k) {
      currentRoute !== k && navgiate(k);
      return;
    }
    console.log("跳转失败~~~~", k);
  }

  const element = tree(builderMenuList);

  return (
    <Menu
      selectedKeys={currentRoute}
      style={{ height: "100%" }}
      autoOpen={true}
      onClickMenuItem={handMenuItem}
    >
      {element}
    </Menu>
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
