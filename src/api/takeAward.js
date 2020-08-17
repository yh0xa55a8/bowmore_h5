import axios from "./instance";

export function takeAward(awardId) {
  return axios
    .put("/api/bomo", {
      id: awardId,
      used: 1
    })
    .then(res => {
      return res.data.used === 1;
    });
}
