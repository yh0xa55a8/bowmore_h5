import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openid: null
  },
  mutations: {
    setOpenid: (state, payload) => {
      state.openid = payload;
    }
  },
  getters: {
    gotId: state => {
      return state.openid != null;
    }
  }
});
