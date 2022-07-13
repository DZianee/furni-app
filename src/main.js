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
import CreateModal from "./components/Modal/Modal.vue";
import InfoModal from "./components/Modal/ModalInfo.vue";
import RemoveModal from "./components/Modal/ModalRemove.vue";
import WarningModal from "./components/Modal/ModalWarning.vue";
import ImgModal from "./components/Modal/ModalImg.vue";
import Pagination from "./components/Pagination/PaginationBar.vue";
import "@/assets/css/main.css";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(store);

// axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (error) {
//     switch (error.response.status) {
//       // case 400:
//       //   break;
//       case 401: {
//         if (error.response.data.Message == "You are not authenticated") {
//           try {
//             await axios.post(`api/v1/User/RefreshToken`).then((res) => {
//               if (res.status == 200) {
//                 router.go();
//               }
//             });
//           } catch {
//             store.dispatch("logout");
//             router.push({ name: "login" });
//           }
//         } else {
//           store.dispatch("logout");
//           router.push({ name: "login" });
//         }
//         break;
//       }
//       case 403:
//         break;
//       case 500:
//         break;
//       default:
//         break;
//     }
//     return Promise.reject(error);
//   }
// );

app.use(router);
app
  .component("default-layout", DefaultLayout)
  .component("home-header-layout", HomeHeaderLayout)
  .component("sidebar-manage-layout", SidebarManage)
  .component("empty-layout", EmptyLayout)
  .component("create-modal", CreateModal)
  .component("info-modal", InfoModal)
  .component("remove-modal", RemoveModal)
  .component("warning-modal", WarningModal)
  .component("img-modal", ImgModal)
  .component("pagination-feature", Pagination)
  .mount("#app");
