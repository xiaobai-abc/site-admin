import RequestHttp from "./http";

const URL = import.meta.env.APP_BASE_URL;
console.log(URL)
const config = {
  // 默认地址
  baseURL: URL,
  // 设置超时时间
  timeout: 20 * 1000,
  // 跨域时候允许携带凭证
  withCredentials: false,
};

const axios = new RequestHttp(config);

export default axios;
