import { PermissionsMap } from "@/utils/auth/permissions.js";
import { deepEach } from "@/utils/lib.js";
import { asyncRoutes } from "@/router/routes";
import { List, Map } from "immutable";

/**
 *
 * @description 根据路由 处理对应菜单列表
 */
export function transformRouteToMenu(routeList) {

  const handFilter = (arr) => {
    return arr.filter((item) => {
      let meta = item.meta;
      if (item.children) {
        item.children = handFilter(item.children);
      }
      return meta && meta.menu;
    });
  };
  const handMenu = deepEach(handFilter(menuList), (item) => {
    return {
      key: item.path,
      label: item.meta?.label,
      icon: item.meta?.icon,
    };
  });
}

/**
 * @param {*} permCode  当前用户权限
 * @description 根据权限参数 过滤
 */
export function filterRoutes(permCode) {
  const permissionsRoutes = List(asyncRoutes.map((item) => Map(item))).filter(
    (item) => {
      const path = item.get("path");
      const permChunk = PermissionsMap[path.slice(1)];
      if (Object.prototype.toString.call(permChunk) === "[object Array]") {
        if (permChunk.includes(permCode)) {
          return true;
        }
      }
      return false;
    }
  );

  return permissionsRoutes.map((e) => e.toJS()).toArray();
}
