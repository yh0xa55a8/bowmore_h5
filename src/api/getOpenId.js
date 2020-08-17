import axios from "./instance";

export function getOpenId(code) {
  return axios.get("/api/project/openid", {
    params: { code }
  });
}
