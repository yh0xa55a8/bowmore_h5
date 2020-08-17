<template>
  <div id="question-view" :class="{ fix: !answering || finished || thanking }">
    <div class="logo"></div>
    <div v-if="!answering" class="enter">
      <div class="text"></div>
      <div class="button" @click="answering = true"></div>
    </div>
    <div v-if="answering && !finished" class="questions">
      <RadioQuestion
        class="question"
        :question="questions.gender"
        v-model="answer.gender"
      />
      <RadioQuestion
        class="question"
        :question="questions.age"
        v-model="answer.age"
      />
      <div class="question input">
        <div class="text">您所在的城市是：</div>
        <label>
          <input
            type="text"
            v-model="answer.city"
            size="12"
            placeholder="当前城市"
          />
        </label>
      </div>
      <RadioQuestion
        class="question"
        :question="questions.q1"
        v-model="answer.q1"
      />
      <CheckBoxQuestion
        class="question"
        :question="questions.q2"
        v-model="answer.q2"
        :disable="answer.q1 !== '是'"
      ></CheckBoxQuestion>
      <RadioQuestion
        class="question"
        :question="questions.q3"
        v-model="answer.q3"
      />
      <RadioQuestion
        class="question"
        :question="questions.q4"
        v-model="answer.q4"
        :columned="true"
      />
      <div class="button" @click="submit"></div>
    </div>
    <div v-if="finished && !thanking" class="end" @click="onClickReward">
      <div class="reward" v-if="!errorMsg">
        {{ rewardData.success ? "恭喜您获得" : "请您在活动时间" }}<br />
        {{ rewardData.success ? rewardData.data : "至现场参加互动" }}
      </div>
      <div class="reward" v-if="errorMsg">
        {{ errorMsg }}
      </div>
      <div
        class="reward-hint"
        v-if="rewardData.success === undefined || rewardData.success"
      />
    </div>
    <div v-if="thanking" class="thanks">
      <div class="thanks-text">
        非常感谢参与体验<br />
        波摩展台！
      </div>
      <div class="foot-note" />
    </div>
    <div class="toast" v-if="toastContent !== ''">{{ toastContent }}</div>
  </div>
</template>

<script>
import RadioQuestion from "@/components/RadioQuestion";
import CheckBoxQuestion from "@/components/CheckBoxQuestion";

export default {
  name: "Question",
  components: { CheckBoxQuestion, RadioQuestion },
  data: () => ({
    answering: false,
    finished: false,
    thanking: false,
    answer: {
      gender: null,
      age: null,
      city: "",
      q1: null,
      q2: {
        selected: []
      },
      q3: null,
      q4: null
    },
    questions: {
      gender: {
        title: "您的性别是：",
        name: "gender",
        options: ["男", "女"]
      },
      age: {
        title: "您的年龄：",
        name: "age",
        options: ["18-25", "26-35", "36-45", "46岁以上"]
      },
      q1: {
        title: "1. 在今天的波摩展台体验之前是否喝过波摩？（单选）",
        name: "q1",
        options: ["是", "否"]
      },
      q2: {
        title: "2. 如果喝过的话，是在什么渠道购买的？（多选）",
        name: "q2",
        options: [
          "酒吧",
          "餐厅",
          "免税店",
          "商场或精品超市",
          "酒类专卖店",
          "电商"
        ]
      },
      q3: {
        title: "3. 此次活动是否帮助您更加深入了解波摩单一麦芽威士忌？（单选）",
        name: "q3",
        options: ["是", "否"]
      },
      q4: {
        title: "4. 从本次活动体验中，给您印象最深刻的体验点是什么？（单选）",
        name: "q4",
        options: [
          "波摩诞生于1779年",
          "坐落于海平面以下的一号酒窖",
          "坚持运用地板发麦工艺",
          "THE ART OF TIME的主题"
        ]
      }
    },
    rewardData: {},
    counter: 0,
    toastContent: "",
    interval: null,
    errorMsg: null
  }),
  mounted() {
    const openid = this.$store.state.openid;
    if (!openid) {
      this.answering = true;
      this.finished = true;
      this.errorMsg = "网络错误\n请您退出后重新体验";
      return;
    }
    this.$api.checkAwarded(openid).then(res => {
      if (res === -1) {
        return;
      }
      if (res.used === 1) {
        this.answering = true;
        this.finished = true;
        this.thanking = true;
      } else {
        this.answering = true;
        this.finished = true;
        this.rewardData = {
          success: true,
          data: res.item,
          id: res.id
        };
      }
    });
    this.interval = setInterval(() => {
      this.counter = 0;
    }, 4000);
  },
  methods: {
    submit() {
      if (this.checkAnswer()) {
        const dateTime = new Date();
        const date = dateTime.getDate();
        const hour = dateTime.getHours();
        const minute = dateTime.getMinutes();
        const success =
          (date === 14 && hour >= 12 && hour < 19) ||
          (date === 15 && hour >= 13 && hour < 19) ||
          (date === 16 &&
            hour >= 13 &&
            (hour > 19 || (hour < 20 && minute < 30)));
        if (!success) {
          this.rewardData.success = false;
          return;
        }
        this.$api
          .submitAnswer(this.$store.state.openid, this.answer)
          .then(res => {
            this.rewardData = res;
            this.finished = true;
          });
      } else {
        this.showToast("请回答所有问题", 1500);
      }
    },
    checkAnswer() {
      return (
        this.answer.gender != null &&
        this.answer.age != null &&
        this.answer.city !== "" &&
        this.answer.q1 != null &&
        (this.answer.q1 === "否" || this.answer.q2.selected.length !== 0) &&
        this.answer.q3 != null &&
        this.answer.q4 != null
      );
    },
    showToast(content, time) {
      this.toastContent = content;
      setTimeout(() => {
        this.toastContent = "";
      }, time);
    },
    onClickReward() {
      if (this.counter < 2) {
        this.counter++;
      } else {
        if (this.errorMsg) return;
        this.$api.takeAward(this.rewardData.id).then(res => {
          console.log(res);
          this.thanking = true;
        });
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped lang="less">
#question-view {
  width: 100vw;
  background-image: url("../assets/backgrounds/question_bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  &.fix {
    height: 100vh;
  }
  .logo {
    width: 223px;
    height: 83px;
    background-image: url("../assets/elements/question_logo.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-top: 80px;
  }
  .enter {
    display: flex;
    flex-direction: column;
    align-items: center;
    .text {
      width: 253px;
      height: 172px;
      background-image: url("../assets/elements/question_enter_text.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      margin-top: 120px;
    }
    .button {
      width: 188px;
      height: 60px;
      background-image: url("../assets/elements/question_enter_button.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      margin-top: 120px;
    }
  }
  .questions {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .question {
      margin-top: 28px;
      margin-left: 40px;
      margin-right: 40px;
      color: white;
      font-size: 16px;
      font-weight: bold;
      &:first-child {
        margin-top: 80px;
      }
      &.input {
        display: flex;
        flex-direction: row;
        margin-inline-end: 28px;
        label {
          flex-grow: 1;
          background-color: white;
          input {
            appearance: none;
            outline: none;
            box-shadow: none;
            background: none;
            border: none;
            min-width: 20px;
            max-width: 100%;
            color: black;
            &::placeholder {
              color: darkgray;
            }
          }
        }
      }
    }
    .button {
      width: 188px;
      height: 60px;
      background-image: url("../assets/elements/question_answering_confirm.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      margin-top: 100px;
      margin-bottom: 100px;
      align-self: center;
    }
  }
  .end {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .reward {
      background-image: url("../assets/elements/reward_bg.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      width: 224px;
      height: 80px;
      margin-top: 100px;
      text-align: center;
      font-size: 22px;
      line-height: 40px;
      color: white;
    }
    .reward-hint {
      background-image: url("../assets/elements/reward_hint.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      width: 136px;
      height: 63px;
      margin-bottom: 80px;
    }
  }
  .thanks {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .thanks-text {
      background-image: url("../assets/elements/reward_bg.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      width: 224px;
      height: 80px;
      margin-top: 100px;
      text-align: center;
      font-size: 22px;
      line-height: 40px;
      color: white;
    }
    .foot-note {
      background-image: url("../assets/elements/thanks_footnote.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      width: 228px;
      height: 85px;
      margin-bottom: 80px;
    }
  }
  .toast {
    min-width: 70px;
    height: auto;
    padding: 10px 20px;
    font-size: 20px;
    color: white;
    border-radius: 5px;
    background: #333333;
    position: fixed;
    // left: calc(50vw - 50%);
    bottom: 100px;
  }
}
</style>
