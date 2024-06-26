import axios, { handler } from "@/api";

export function homeSetting() {
  return axios.get("/home").then((resp) => {
    return handler(resp);
  });
}
