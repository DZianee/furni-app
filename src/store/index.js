import { createStore } from "vuex";
import axios from "../plugins/axios";

export default createStore({
  state: {
    token: null,
    refreshToken: null,
    authenticated: false,
    user: null,
    avatar: null,
    cateId: null,
  },
  mutations: {
    setAuth: (state, auth) => (state.authenticated = auth),
    setAvatar: (state, img) => (state.avatar = img),
    setUser: (state, user) => (state.user = user),
    setToken: (state, accessToken) => (state.token = accessToken),
    setRefreshToken: (state, refreshToken) =>
      (state.refreshToken = refreshToken),
    setCateId: (state, cate) => (state.cateId = cate),
  },
  actions: {
    login({ commit }, res) {
      commit("setUser", JSON.stringify(res.data.data));
      sessionStorage.setItem("User", JSON.stringify(res.data.data));
      sessionStorage.setItem("Token", res.data.data.token);
      sessionStorage.setItem("refreshToken", res.data.data.refreshToken);
      sessionStorage.setItem("Avatar", res.data.data.avatar);
    },
    verifiedUser({ commit }, res) {
      commit("setAuth", res);
      sessionStorage.setItem("Auth", res);
    },
    storeAvatar({ commit }, res) {
      commit("setAvatar", res);
      sessionStorage.setItem("Avatar", res);
    },
    storeCateId({ commit }, res) {
      commit("setCateId", res);
      sessionStorage.setItem("CateId", res);
    },
    logout({ commit }) {
      commit("setAuth", false);
      commit("setToken", null);
      commit("setRefreshToken", null);
      commit("setUser", null);
      sessionStorage.clear();
    },

    accessToken({ commit }) {
      commit("setToken", sessionStorage.getItem("Token"));
      axios.defaults.headers[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("Token")}`;
    },
    refreshToken({ commit }, res) {
      sessionStorage.setItem("Token", res.data.token);
      commit("setToken", res.data.token);
    },
    getUser({ commit }) {
      commit("setUser", sessionStorage.getItem("User"));
    },
    getAuth({ commit }) {
      commit("setAuth", sessionStorage.getItem("Auth"));
    },
    getAvatar({ commit }) {
      commit("setAvatar", sessionStorage.getItem("Avatar"));
    },
    getCateId({ commit }) {
      commit("setCateId", sessionStorage.getItem("CateId"));
    },
  },
});
