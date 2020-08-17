<template>
  <div class="check-box-question">
    <div class="q">{{ question.title }}</div>
    <div class="options">
      <label v-for="(option, index) in question.options" :key="index">
        <input
          type="checkbox"
          :name="question.name"
          :value="option"
          v-model="answer"
          :disabled="disable"
        />
        {{ option }}
      </label>
      <label class="input-label">
        <input
          type="checkbox"
          :name="question.name"
          value="其他"
          v-model="answer"
          :disabled="disable"
        />
        其他
        <label>
          <input
            type="text"
            v-model="inputAnswer"
            size="8"
            placeholder="手动填写"
            :disabled="disable"
          />
        </label>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckBoxQuestion",
  props: {
    question: Object,
    value: Object,
    disable: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    answer: [],
    inputAnswer: ""
  }),
  watch: {
    answer: function(newAnswer) {
      this.$emit("input", {
        selected: newAnswer,
        input: this.inputAnswer
      });
    },
    inputAnswer: function(newValue) {
      this.$emit("input", {
        selected: this.answer,
        input: newValue
      });
    }
  }
};
</script>

<style scoped lang="less">
.check-box-question {
  display: flex;
  flex-direction: column;
  .q {
    padding-left: 1em;
    text-indent: -1em;
  }
  .options {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-left: 1em;
    label {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 10px;

      input[type="checkbox"] {
        appearance: none;
        width: 1em;
        height: 1em;
        vertical-align: center;
        margin: 0 10px 0 0;
        background-image: url("../assets/elements/dot_unselected.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        outline: none;
        box-shadow: none;
        &:checked {
          background-image: url("../assets/elements/dot_selected.png");
        }
      }
      &.input-label {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      label {
        width: auto;
        height: 100%;
        margin-top: 0;
        flex-grow: 1;
        margin-left: 10px;
        background: white;
        input[type="text"] {
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
}
</style>
