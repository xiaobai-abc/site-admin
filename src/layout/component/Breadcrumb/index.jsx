import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import { Breadcrumb } from "@arco-design/web-react";
import { useSelector } from "react-redux";
import { selectAuthSlice } from "@/store/modules/authSlice";
import Icons from "@/components/Icons";
const BreadcrumbItem = Breadcrumb.Item;

/**
 *  @description 面包屑             要匹配的对象
 * @description matchPath 匹配路径 参数一 obj 参数二 : path
 */
function BreadcrumbComponent() {
  // const navigate = useNavigate();
  const location = useLocation();

  const { builderMenuList } = useSelector(selectAuthSlice);

  // 生成面包屑 数据 每一项为 单个路由对象
  const breadcrumbArr = useMemo(() => {
    if (builderMenuList.length === 0) return [];
    // 拆分路径
    const pathArr = splitPathToArr(location.pathname);
    // 处理成完整路径
    const menuPathList = processMenuPaths(builderMenuList);
    // 扁平后的数据
    const flatMenu = flattenMenuItems(menuPathList);
    // 处理后  子路由和父路由拼接为 path
    const breadcrumbArr = pathArr.map((p) => {
      // p /device 路径 每段 都和 路由列表匹配
      const length = flatMenu.length;
      for (let i = 0; i < length; i++) {
        const element = flatMenu[i];
        const match = matchPath(
          {
            path: element.path,
            exact: true,
            strict: false
          },
          p
        );
        if (match) {
          const meta = element.meta;
          const result = {
            match,
            path: element.path
          };
          meta.label && (result.label = meta.label);
          meta.icon && (result.icon = meta.icon);
          return result;
        }
      }
      return {
        label: "未找到页面",
        path: "/404"
      };
    });

    return breadcrumbArr;
  }, [location.pathname, builderMenuList.length]);

  return (
    <Breadcrumb style={{ fontSize: 14, marginBottom: "16px" }}>
      <BreadcrumbItem>
        {breadcrumbArr[0] && <Icons icon={breadcrumbArr[0].icon}></Icons>}
      </BreadcrumbItem>
      {breadcrumbArr.map((item, index) => {
        if (item) {
          return <BreadcrumbItem key={item.path}>{item.label}</BreadcrumbItem>;
        }
      })}
    </Breadcrumb>
  );
}

/**
 * @description 查分path 传入一个path 拆分成数据
 * @param {String} path
 * @returns {Array}
 */
function splitPathToArr(path = "") {
  const result = [];
  // 查分路径
  const cutPath = path.split("/").filter((e) => e);
  cutPath.reduce((pre, cur, index) => {
    const rPath = pre + "/" + cur; //分成每段路径 /home /home/index
    result.push(rPath);
    return rPath;
  }, "");

  return result;
}

/***
 *
 * @description 扁平数组
 */

function flattenMenuItems(arr) {
  return arr.flatMap((item) => [
    { path: item.path, meta: item.meta },
    ...(item.children ? flattenMenuItems(item.children) : [])
  ]);
}

/**
 * @description 处理路由路径  连贯路径 /home/index
 * @param {Array} list
 * @param {String} fatherPath
 * @returns
 */
function processMenuPaths(list, fatherPath = "") {
  // fatherPath = fatherPath ? fatherPath + "/" : "";
  // return list.map((item) => {
  //   const cloneObj = Object.assign({}, item);
  //   const children = cloneObj.children;
  //   const nowPath = fatherPath + cloneObj.path;
  //   if (children && children.length) {
  //     cloneObj.children = handlerMenuPath(children, nowPath);
  //   }
  //   if (cloneObj.path) {
  //     cloneObj.path = nowPath;
  //   }

  //   return cloneObj;
  // });
  fatherPath = fatherPath ? `${fatherPath}/` : "";
  return list.map((item) => {
    const { children, path, ...rest } = item;
    const nowPath = `${fatherPath}${path}`;
    const updatedChildren = children
      ? processMenuPaths(children, nowPath)
      : null;
    return { ...rest, path: nowPath, children: updatedChildren };
  });
}

export default BreadcrumbComponent;
