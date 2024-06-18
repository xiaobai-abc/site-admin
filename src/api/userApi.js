import axios from "./index";

export function postLogin(data) {
  return axios.post("/login", data);
}

export function postVerifyzxc() {
  // return axios.get("/verify");
  return new Promise((resolve) => {
    resolve({
      code: 200,
      data: {
        user_name: "admin",
        user_type: {
          type_name: "超级管理员",
          type_code: 1
        }
      },
      message: "登录成功"
    });
  });
}
