<template>
  <div id="technique-view">
    <div class="content">
      <div v-for="(info, index) in infos" :key="index">
        <transition name="text">
          <div
            v-if="index <= showHint"
            class="info"
            :style="{
              backgroundImage: `url('${info}')`,
              top: `${hintPos[index][0]}%`,
              left: `${hintPos[index][1]}%`
            }"
          ></div>
        </transition>
      </div>
      <div class="hint"></div>
    </div>
    <div
      class="wine-mask"
      v-if="showWine"
      @touchstart="onSwipePageStart"
      @touchmove.prevent="onSwipePageMove"
      @touchend="onSwipePageEnd"
      @touchcancel="onSwipePageCancel"
    >
      <div class="wine-info"></div>
    </div>
  </div>
</template>

<script>
import info0 from "../assets/elements/tech_info_0.png";
import info1 from "../assets/elements/tech_info_1.png";
import info2 from "../assets/elements/tech_info_3.png";
import info3 from "../assets/elements/tech_info_4.png";
import info4 from "../assets/elements/tech_info_2.png";
import info5 from "../assets/elements/tech_info_5.png";

export default {
  name: "Technique",
  data: () => ({
    dragOrigin: {
      x: 0,
      y: 0
    },
    delta: {
      x: 0,
      y: 0
    },
    page: 0,
    infos: [info0, info1, info2, info3, info4, info5],
    hintPos: [
      [1, 35],
      [19, 40],
      [36, 40],
      [53, 40],
      [67, 35],
      [85, 40]
    ],
    showHint: 0,
    showWine: false,
    maxScroll: Math.ceil(window.innerWidth * 12.992 - window.innerHeight) - 1
  }),
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      let currentScroll = Math.floor(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageXOffset
      );
      console.log(currentScroll);
      let ratio = currentScroll / this.maxScroll;
      console.log(ratio);
      let showRatio = [0.1, 0.3, 0.5, 0.7, 0.9, 0.99];
      for (let i = 0; i < showRatio.length; i++) {
        if (showRatio[i] > ratio) {
          this.showHint = Math.max(i, this.showHint);
          break;
        }
      }
      if (!this.showWine && ratio >= 0.99) {
        setTimeout(() => {
          this.showWine = true;
        }, 800);
      }
    },
    onSwipePageStart(event) {
      let cord = event.touches[0];
      this.dragOrigin = {
        x: cord.screenX,
        y: cord.screenY
      };
    },
    onSwipePageMove(event) {
      let cord = event.touches[0];
      this.delta = {
        x: cord.screenX - this.dragOrigin.x,
        y: cord.screenY - this.dragOrigin.y
      };
    },
    onSwipePageEnd() {
      if (this.delta.y < -100) {
        if (this.showWine) {
          this.$router.replace("cellar");
        }
      }
    },
    onSwipePageCancel() {
      this.delta = { x: 0, y: 0 };
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>

<style scoped lang="less">
#technique-view {
  .content {
    height: 1299vw;
    width: 100vw;
    background: url("../assets/elements/technique.png") no-repeat center;
    background-size: cover;
    position: relative;
    .text-enter-active,
    .text-leave-active {
      transition: opacity 0.5s;
    }
    .text-enter,
    .text-leave-to {
      opacity: 0;
    }
    .info {
      position: absolute;
      width: 70px;
      height: 194px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    .hint {
      position: fixed;
      width: 56px;
      height: 70px;
      background: url("../assets/elements/left_hint.png") no-repeat center;
      background-size: contain;
      left: calc(50vw - 28px);
      bottom: 10px;
    }
  }
  .wine-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: url("../assets/backgrounds/wine_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    .wine-info {
      position: fixed;
      width: 100%;
      height: 100%;
      background-image: url("../assets/elements/tech_wine.png");
      background-color: black;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center bottom;
    }
  }
}
</style>
