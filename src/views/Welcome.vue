<template>
  <div
    id="welcome-view"
    @touchstart="onSwipePageStart"
    @touchmove.prevent="onSwipePageMove"
    @touchend="onSwipePageEnd"
    @touchcancel="onSwipePageCancel"
  >
    <div class="title"></div>
    <div class="rotate-hint"></div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data: () => ({
    dragOrigin: {
      x: 0,
      y: 0
    },
    delta: {
      x: 0,
      y: 0
    }
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
        this.$router.replace("boat");
      }
    },
    onSwipePageCancel() {
      this.delta = { x: 0, y: 0 };
    }
  }
};
</script>

<style scoped lang="less">
#welcome-view {
  width: 100%;
  height: 100%;
  background-image: url("../assets/backgrounds/welcome_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .title {
    width: 80vw;
    height: 45.8vw;
    background-image: url("../assets/elements/welcome_title.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    margin-top: 100px;
  }
  .rotate-hint {
    width: 40vw;
    height: 28.4vw;
    background-image: url("../assets/elements/welcome_hint.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    margin-bottom: 45px;
  }
}
</style>
