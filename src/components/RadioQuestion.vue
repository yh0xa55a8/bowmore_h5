<template>
  <div class="radio-question">
    <div class="q">{{ question.title }}</div>
    <div class="options" :class="{ columned }">
      <label v-for="(option, index) in question.options" :key="index">
        <input
          type="radio"
          :name="question.name"
          :value="option"
          v-model="answer"
        />
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioQuestion",
  props: {
    question: Object,
    value: String,
    columned: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    answer: null
  }),
  watch: {
    answer: function(newAnswer) {
      this.$emit("input", newAnswer);
    }
  }
};
</script>

<style scoped lang="less">
.radio-question {
  display: flex;
  flex-direction: column;
  .q {
    padding-left: 1em;
    text-indent: -1em;
  }
  .options {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 1em;
    &.columned {
      flex-direction: column;
      label {
        width: 100%;
        margin-top: 10px;
      }
    }
    label {
      width: 50%;
      display: flex;
      flex-direction: row;
      align-items: center;
      &:nth-child(1n + 3) {
        margin-top: 10px;
      }
      input[type="radio"] {
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
      label {
        flex-grow: 1;
        border-bottom: 1px solid white;
        input[type="text"] {
          appearance: none;
          outline: none;
          box-shadow: none;
          background: none;
          border: none;
          min-width: 20px;
          max-width: 100%;
          color: white;
        }
      }
    }
  }
}
</style>
