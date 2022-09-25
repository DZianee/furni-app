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
import NoneLayout from "./layout/NoneLayout.vue";
import WithoutFooter from "./layout/WithoutFooter.vue";
import SidebarManage from "./layout/SidebarManage.vue";
import CreateModal from "./components/Modal/Modal.vue";
import InfoModal from "./components/Modal/ModalInfo.vue";
import RemoveModal from "./components/Modal/ModalRemove.vue";
import WarningModal from "./components/Modal/ModalWarning.vue";
import ImgModal from "./components/Modal/ModalImg.vue";
import NotifiModal from "./components/Modal/ModalNotifi.vue";
import CmtModal from "./components/Modal/ModalComment.vue";
import Pagination from "./components/Pagination/PaginationBar.vue";
import OrderCardSample from "./components/OrderCard/OrderCardSample.vue";
import OrderTableSample from "./components/Table/OrderTable.vue";
import "@/assets/css/main.css";
// import Vue from "vue";
import VueObserveVisibility from "vue-observe-visibility";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(store);
app.use(VueObserveVisibility);
app.use(router);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    switch (error.response.status) {
      case 401: {
        // try {
        //   const res = await axios.post(`api/User/refreshToken`);
        //   if (res.status == 200) {
        //     store.dispatch("refreshToken", res);
        //     router.go();
        //   }
        // } catch {
        //   store.dispatch("logout");
        //   router.push({ name: "home" });
        // }
        router.push({ name: "home" });

        break;
      }
      case 403:
        try {
          const res = await axios.post(`api/User/refreshToken`);
          if (res.status == 200) {
            store.dispatch("refreshToken", res);
            router.go();
          }
        } catch {
          store.dispatch("logout");
          router.push({ name: "home" });
        }
        break;
      case 500:
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

app
  .component("default-layout", DefaultLayout)
  .component("home-header-layout", HomeHeaderLayout)
  .component("sidebar-manage-layout", SidebarManage)
  .component("empty-layout", EmptyLayout)
  .component("none-layout", NoneLayout)
  .component("without-footer-layout", WithoutFooter)
  .component("create-modal", CreateModal)
  .component("info-modal", InfoModal)
  .component("remove-modal", RemoveModal)
  .component("warning-modal", WarningModal)
  .component("img-modal", ImgModal)
  .component("comment-modal", CmtModal)
  .component("notifi-modal", NotifiModal)
  .component("pagination-feature", Pagination)
  .component("order-card-list", OrderCardSample)
  .component("order-table", OrderTableSample)
  .mount("#app");
