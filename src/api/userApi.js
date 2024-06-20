import axios from "./index";

// 登录
export function postLogin(data) {
  return axios.post("/login", data);
}

// 验证
export function postVerifyzxc() {
  return axios.get("/verify");
}


// 测试状态码展示
export function testStatus(code) {
  return axios.get("/status", { code });
}
