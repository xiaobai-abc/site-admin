import axios from "./index";

export function postLogin(data) {
  return axios.post("/login", data);
}

export function postVerifyzxc() {
  return axios.get("/verify");
}
