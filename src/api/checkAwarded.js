import axios from "./instance";

export function checkAwarded(openid) {
  return axios
    .get("/api/bomo", {
      params: {
        openId: openid
      }
    })
    .then(res => {
      if (res.data === "") {
        return -1;
      }
      return res.data;
    });
}
