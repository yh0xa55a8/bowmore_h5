<template>
  <div id="app">
    <PortraitView>
      <router-view />
    </PortraitView>
  </div>
</template>

<script>
import PortraitView from "@/components/PortraitView";

export default {
  components: { PortraitView },
  mounted() {
    const url = location.href;
    const params = (url.split("#")[0].split("?")[1] || "").split("&");
    let paramObj = {};
    for (let param of params) {
      let tmp = param.split("=");
      paramObj[tmp[0]] = tmp[1];
    }
    console.log(paramObj);
    const code = paramObj.code;
    if (code) {
      localStorage.setItem("code", code);
    } else {
      let appid = "wx98bd2e1b966d581a";
      let backUrl = "https%3A%2F%2Fev1.beamsuntory.com.cn%2Fbomore";
      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${backUrl}&response_type=code&scope=snsapi_userinfo&state=STATE`;
    }
  }
};
</script>
