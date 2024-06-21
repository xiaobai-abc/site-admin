import LayoutLoading from "@/layout/component/Loading";
import { getAuthCache } from "@/utils/auth/index.js";
import { filterRoutes } from "./util/auth";
import { asyncRoutes, basicRoutes, PAGE_NOT_FOUND_ROUTE } from "./routes";
import { REDIRECT_PATH } from "./constant";
import { wrapRoutesWithLazy } from "./util";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { useEffect, useCallback, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthSlice,
  setLastUpdateTime,
  setDynamicAddedRoutes,
  setBuilderMenuList,
  authVerify
} from "@/store/modules/authSlice";

// 存入白名单
const whiteRouteName = [];
[...basicRoutes].forEach((route) => {
  whiteRouteName.push(route.path);
});

const needAuthorization = true;

export default function getRoutes() {
  const loaction = useLocation();
  const naviagate = useNavigate();
  const dispatch = useDispatch();

  const { status, lastUpdateTime, dynamicAddedRoutes, userInfo } =
    useSelector(selectAuthSlice);

  //路由列表 只存储显示的路由列表 不包含基本路由
  const [routes, setRoutes] = useState([]);
  const authVerifyCallback = useCallback(
    async () => await dispatch(authVerify()),
    []
  );

  const GenerateRoutesMemo = useMemo(() => {
    return <GenerateRoutes routes={routes}> </GenerateRoutes>;
  }, [routes]);

  useEffect(() => {
    if (!needAuthorization) {
      console.log("不需要权限验证");
      return;
    }

    const path = loaction.pathname;
    const token = getAuthCache();

    if (whiteRouteName.includes(path)) {
      setLastUpdateTime(0);
      if (!token && path !== "/login") {
        naviagate("/login", { replace: true });
        return;
      } else if (token && path === "/login") {
        naviagate(REDIRECT_PATH, { replace: true });
      }
      setLastUpdateTime(new Date().getTime());

      return;
    }

    if (lastUpdateTime === 0) {
      authVerifyCallback();
    }
  }, [loaction.pathname]);

  useEffect(() => {
    if (status === "successed") {
      // 生成权限菜单列表 *去除element
      // dispatch(setBuilderMenuList(handlerList));
      // 根据权限生成路由
      // setRoutes(filterList);
      // setRoutes(asyncRoutes);

      if (dynamicAddedRoutes) return;
      // filterRoutes(0),
      console.log("userInfo", userInfo);
      setRoutes(asyncRoutes);
      const menuList = processAndModifyRoutes(asyncRoutes);

      dispatch(
        setBuilderMenuList(
          menuList.sort((a, b) => {
            return a.order - b.order;
          })
        )
      );
      dispatch(setDynamicAddedRoutes(true));
    }
  }, [status]);

  if (status === "loading") return <LayoutLoading />;

  return <>{GenerateRoutesMemo}</>;

  // 这里有个取巧  默认权限-1 数据未响应 生成的结果也是空 + 基本路由
  // return <GenerateRoutes routes={routes}> </GenerateRoutes>;
}

/**
 *
 * @description 处理完整路由
 */

function GenerateRoutes({ routes }) {
  const handlerLazyRoutes = routes.map((item) => {
    const temp = Object.assign({}, item);
    if (temp.children) {
      temp.children = wrapRoutesWithLazy(temp.children);
    }
    return temp;
  });

  // const handlerLazyRoutesCallback = useCallback(() => {
  //   // 处理路由为 懒加载

  //   return handlerLazyRoutes;
  // }, [routes]);

  const finishRoutes = [
    ...basicRoutes,
    ...handlerLazyRoutes,
    PAGE_NOT_FOUND_ROUTE
  ];

  return useRoutes(finishRoutes);
}

/**
 * @description 思考半天 已经生成出来的权限路由 这里要配置路由 menu也要用太臃肿了
 * 只能递归 然后所有操作在这里生成好
 * 同时删除元素组件
 * @param {Array} list 处理路由  传入的是过滤后的 权限路由列表
 */
function processAndModifyRoutes(list) {
  return list.map((item) => {
    const { children, element, ...rest } = item;
    const modifiedItem = {
      ...rest
      // key: item.path,
      // ...(meta || {}),
    };
    if (children && children.length) {
      modifiedItem.children = processAndModifyRoutes(children);
    }
    return modifiedItem;
  });
}
