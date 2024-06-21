import { PermissionsMap } from "@/utils/auth/permissions.js";
import { asyncRoutes } from "@/router/routes";
import { List, Map } from "immutable";

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
