const STORAGE = import.meta.env.APP_STORAGE;
const TOKEN_KEY = import.meta.env.APP_TOKEN;

const storageMethod =
  STORAGE === "localStorage" ? localStorage : sessionStorage;

// 获取存粗信息 用户
export function getAuthCache() {
  return storageMethod.getItem(TOKEN_KEY);
}

export function setAuthCache(value = "") {
  storageMethod.setItem(TOKEN_KEY, value);
}

// 删除token
export function clearAuthCache(key = "") {
  storageMethod.removeItem(key || TOKEN_KEY);
}
