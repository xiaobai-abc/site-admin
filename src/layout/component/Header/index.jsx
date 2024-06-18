import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/shadcn-ui/ui/tooltip";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger
} from "@/shadcn-ui/ui/menubar";
import { Button } from "@/shadcn-ui/ui/button";
import { Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn-ui/ui/avatar";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthSlice } from "@/store/modules/authSlice.js";
import { useEffect, useState } from "react";

export default function Header() {
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

  function onItem(items,sub) {
    console.log(items,sub);
    navgiate(items.key);
  }

  return (
    <header className="header w-full fixed z-50 inset-x-0 h-14 bg-white p-2 flex items-center justify-between shadow-md">
      <span className="text-xl font-sans font-bold">xiaobai-abc admin</span>
      <Menubar value={"/dashboard"}>
        {builderMenuList.map((item) => {
          return (
            <MenubarMenu key={item.key} value={item.key}>
              <MenubarTrigger>{item.label}</MenubarTrigger>
              <MenubarContent>
                {item.children &&
                  item.children.map((items) => {
                    return (
                      <MenubarItem
                        onClick={() => onItem(items, item.key)}
                        key={items.key}
                      >
                        {items.label}
                      </MenubarItem>
                    );
                  })}

                {/* <MenubarSeparator /> */}
              </MenubarContent>
            </MenubarMenu>
          );
        })}
      </Menubar>
      <div className="flex">
        <TooltipProvider delayDuration={250}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="mr-4 w-8 h-8 rounded-full "
              >
                <Settings size={"1rem"} className="dc" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>操作</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>杨</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>用户</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
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
