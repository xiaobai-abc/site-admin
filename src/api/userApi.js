import axios from "./index";
const BASE_URL = "/user";

// 登录
export function postLogin(data) {
  return axios.post(BASE_URL + "/login", data);
}

// 验证
export function postVerifyzxc() {
  return axios.get(BASE_URL + "/verify");
}

// 测试状态码展示
export function testStatus(code) {
  return axios.get(BASE_URL + "/status", { code });
}
