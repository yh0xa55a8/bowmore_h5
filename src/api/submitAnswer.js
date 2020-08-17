import axios from "./instance";

export function submitAnswer(openId, answers) {
  const surveyUrl = "/api/survey";
  let q2ans = answers.q2.selected;
  if (answers.q2.input !== "") {
    q2ans[q2ans.indexOf("其他")] = `其他:${answers.q2.input}`;
  }
  if (answers.q1 === "否") {
    q2ans = [];
  }
  q2ans = JSON.stringify(q2ans);
  const postAnswers = [
    axios.post(surveyUrl, {
      openId: openId,
      project: "bowmore",
      problem: "个人信息",
      answer: `${answers.gender}#${answers.age}#${answers.city}`
    }),
    axios.post(surveyUrl, {
      openId: openId,
      project: "bowmore",
      problem: "1. 在今天的波摩展台体验之前是否喝过波摩？（单选）",
      answer: answers.q1
    }),
    axios.post(surveyUrl, {
      openId: openId,
      project: "bowmore",
      problem: "2. 如果喝过的话，是在什么渠道购买的？（多选）",
      answer: q2ans
    }),
    axios.post(surveyUrl, {
      openId: openId,
      project: "bowmore",
      problem: "3. 此次活动是否帮助您更加深入了解波摩单一麦芽威士忌？（单选）",
      answer: answers.q3
    }),
    axios.post(surveyUrl, {
      openId: openId,
      project: "bowmore",
      problem: "4. 从本次活动体验中，给您印象最深刻的体验点是什么？（单选）",
      answer: answers.q4
    })
  ];
  return Promise.all(postAnswers)
    .then(reses => {
      for (let res of reses) {
        console.log(res);
      }
      return axios.post("/api/bomo", { openId });
    })
    .then(res => {
      if (res.data.msg === "恭喜你中奖了") {
        return {
          success: true,
          data: res.data.item,
          id: res.data.id
        };
      } else {
        return {
          success: false,
          data: res.data.msg
        };
      }
    });
}
