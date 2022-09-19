import { createStore } from "vuex";
import axios from "../plugins/axios";

export default createStore({
  state: {
    token: null,
    authenticated: false,
    user: null,
    cateId: null,
    activateCateDetails: false,
    shoppingList: [],
  },
  mutations: {
    setAuth: (state, auth) => (state.authenticated = auth),
    setUser: (state, user) => (state.user = user),
    setToken: (state, accessToken) => (state.token = accessToken),
    setCateId: (state, cate) => (state.cateId = cate),
    setActivateCateDetails: (state, activateCate) =>
      (state.activateCateDetails = activateCate),
    setShoppingList: (state, shopList) => (state.shoppingList = shopList),
  },
  actions: {
    login({ commit }, res) {
      commit("setUser", JSON.stringify(res));
      localStorage.setItem("User", JSON.stringify(res));
      localStorage.setItem("Token", res.token);
      localStorage.setItem("Avatar", res.avatar);
    },
    verifiedUser({ commit }, res) {
      commit("setAuth", res);
      localStorage.setItem("Auth", res);
    },
    storeCateId({ commit }, res) {
      commit("setCateId", res);
      sessionStorage.setItem("CateId", res);
    },

    storeActivateCateDetails({ commit }, res) {
      commit("setActivateCateDetails", res);
      sessionStorage.setItem("ActivateCateDetails", res);
    },
    storeShoppingList({ commit }, res) {
      commit("setShoppingList", res);
      sessionStorage.setItem("shoppingList", JSON.stringify(res));
    },
    logout({ commit }) {
      commit("setAuth", false);
      commit("setToken", null);
      commit("setRefreshToken", null);
      commit("setUser", null);
      localStorage.clear();
    },

    accessToken({ commit }) {
      commit("setToken", localStorage.getItem("Token"));
      axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "Token"
      )}`;
    },
    refreshToken({ commit }, res) {
      localStorage.setItem("Token", res.data.token);
      commit("setToken", res.data.token);
    },
    getUser({ commit }) {
      commit("setUser", localStorage.getItem("User"));
    },
    getAuth({ commit }) {
      commit("setAuth", localStorage.getItem("Auth"));
    },
    getCateId({ commit }) {
      commit("setCateId", sessionStorage.getItem("CateId"));
    },
    getShoppingList({ commit }) {
      commit("setShoppingList", sessionStorage.getItem("shoppingList"));
    },
    getActivateCateDetails({ commit }) {
      commit(
        "setActivateCateDetails",
        sessionStorage.getItem("ActivateCateDetails")
      );
    },
    removeShoppingList({ commit }, res) {
      commit("setShoppingList", res);
      sessionStorage.setItem("shoppingList", res);
    },
  },
});
