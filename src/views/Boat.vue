<template>
  <div
    id="boat-view"
    @touchstart="onSwipePageStart"
    @touchmove.prevent="onSwipePageMove"
    @touchend="onSwipePageEnd"
    @touchcancel="onSwipePageCancel"
    @click="checkAndShowWine"
  >
    <div
      class="boat"
      :style="{
        left: activated ? '131px' : `calc(${origin.left + delta.x}px`,
        bottom: activated ? '206px' : `calc(${origin.bottom - delta.y}px)`,
        width: activated ? '183px' : '244px',
        height: activated ? '162px' : '216px'
      }"
      @touchstart="onDragBoatStart"
      @touchmove.prevent="onDragBoatMove"
      @touchend="onDragBoatEnd"
      @touchcancel="onDragBoatCancel"
    ></div>
    <div class="boat-hint" v-if="!activated"></div>
    <div class="info-box" v-if="activated"></div>
    <div class="wine-mask" v-if="showWine">
      <div class="wine-info"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Boat",
  mounted() {
    let code = localStorage.getItem("code");
    this.$api
      .getOpenId(code)
      .then(res => {
        this.openid = res.data.openid;
        this.$store.commit("setOpenid", res.data.openid);
      })
      .catch(err => {
        this.openid = err;
      });
  },
  computed: {
    code: () => {
      return localStorage.getItem("code") || "失败";
    }
  },
  data: () => ({
    openid: "未设置",
    origin: {
      bottom: 45,
      left: 45
    },
    dragOrigin: {
      x: 0,
      y: 0
    },
    delta: {
      x: 0,
      y: 0
    },
    activated: false,
    showWine: false
  }),
  methods: {
    onDragBoatStart(event) {
      if (this.activated) return;
      event.stopPropagation();
      let cord = event.touches[0];
      this.dragOrigin = {
        x: cord.screenX,
        y: cord.screenY
      };
    },
    onDragBoatMove(event) {
      if (this.activated) return;
      event.stopPropagation();
      let cord = event.touches[0];
      this.delta = {
        x: cord.screenX - this.dragOrigin.x,
        y: cord.screenY - this.dragOrigin.y
      };
    },
    onDragBoatEnd(event) {
      if (this.activated) return;
      event.stopPropagation();
      if (this.delta.y < -30.0) {
        this.activated = true;
      }
      this.delta = { x: 0, y: 0 };
    },
    onDragBoatCancel(event) {
      if (this.activated) return;
      event.stopPropagation();
      this.delta = { x: 0, y: 0 };
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
      if (this.delta.y < -100 && this.showWine) {
        this.$router.replace("tech");
      }
    },
    onSwipePageCancel() {
      this.delta = { x: 0, y: 0 };
    },
    checkAndShowWine() {
      if (this.activated && !this.showWine) {
        this.showWine = true;
      }
    }
  }
};
</script>

<style scoped lang="less">
#boat-view {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/backgrounds/boat_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom center;
  .boat {
    position: fixed;
    background-image: url("../assets/elements/boat.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .boat-hint {
    position: fixed;
    left: 60px;
    bottom: 200px;
    height: 366px;
    width: 45px;
    background-image: url("../assets/elements/boat_drag_hint.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .info-box {
    position: fixed;
    width: 139px;
    height: 245px;
    left: 140px;
    bottom: 390px;
    background-image: url("../assets/elements/boat_info.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
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
      background-image: url("../assets/elements/boat_wine.png");
      background-color: black;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center bottom;
    }
  }
}
</style>
