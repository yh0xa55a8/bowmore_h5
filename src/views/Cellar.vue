<template>
  <div
    id="cellar-view"
    @touchstart="onSwipePageStart"
    @touchmove.prevent="onSwipePageMove"
    @touchend="onSwipePageEnd"
    @touchcancel="onSwipePageCancel"
    @click="checkAndShowWine"
  >
    <div class="door" :class="{ playing: opening }" v-if="!opened"></div>
    <div class="cellar" v-if="opened">
      <div class="info"></div>
    </div>
    <div class="wine-mask" v-if="showWine">
      <div class="wine-info"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cellar",
  data: () => ({
    dragOrigin: {
      x: 0,
      y: 0
    },
    delta: {
      x: 0,
      y: 0
    },
    opened: false,
    opening: false,
    showWine: false
  }),
  methods: {
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
          this.$router.replace("question");
        }
      }
    },
    onSwipePageCancel() {
      this.delta = { x: 0, y: 0 };
    },
    checkAndShowWine() {
      if (!this.opened) {
        this.opening = true;
        setTimeout(() => {
          this.opened = true;
          this.opening = false;
        }, 1200);
      } else if (this.opened && !this.showWine) {
        this.showWine = true;
      }
    }
  }
};
</script>

<style scoped lang="less">
#cellar-view {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .door {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: url("../assets/elements/door_closed.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    &.playing {
      background-image: url("../assets/elements/door_animation.gif");
    }
  }
  .cellar {
    width: 100%;
    height: 100%;
    background-image: url("../assets/backgrounds/cellar_bg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .info {
      position: fixed;
      width: 150px;
      height: 265px;
      right: 40px;
      bottom: 40px;
      background-image: url("../assets/elements/cellar_info.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
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
      background-image: url("../assets/elements/cellar_wine.png");
      background-color: black;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center bottom;
    }
  }
}
</style>
