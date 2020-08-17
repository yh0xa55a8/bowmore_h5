<template>
  <div id="portrait-view">
    <slot />
    <div class="hint-mask" v-if="actualOrientation !== 'portrait'">
      请关闭手机旋转功能
    </div>
  </div>
</template>

<script>
export default {
  name: "PortraitView",
  data: () => ({
    actualOrientation: null
  }),
  mounted() {
    let orientation = window.orientation;
    this.actualOrientation =
      orientation === 90 || orientation === -90 ? "landscape" : "portrait";
    window.addEventListener("orientationchange", () => {
      let orientation = window.orientation;
      this.actualOrientation =
        orientation === 90 || orientation === -90 ? "landscape" : "portrait";
    });
  }
};
</script>

<style scoped lang="less">
#portrait-view {
  width: 100vw;
  height: 100vh;
  .hint-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 30px;
  }
}
</style>
