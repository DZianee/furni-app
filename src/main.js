import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import axios from "./plugins/axios";
import DefaultLayout from "./layout/DefaultLayout.vue";
import HomeHeaderLayout from "./layout/HomeHeaderLayout.vue";
import EmptyLayout from "./layout/EmptyLayout.vue";
import SidebarManage from "./layout/SidebarManage.vue";
import Modal from "./components/Modal.vue";
import "@/assets/css/main.css";

const app = createApp(App);
app.config.globalProperties.$axios = axios;

createApp(App)
  .use(store)
  .use(router)
  .component("default-layout", DefaultLayout)
  .component("home-header-layout", HomeHeaderLayout)
  .component("sidebar-manage-layout", SidebarManage)
  .component("empty-layout", EmptyLayout)
  .component("confirm-modal", Modal)
  .mount("#app");
