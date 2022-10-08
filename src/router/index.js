import { createRouter, createWebHashHistory } from "vue-router";

import routes from "./routes";
import store from "../store/index";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
console.log("test");
router.beforeEach((to, from, next) => {
  var user = JSON.parse(store.state.user);
  if (user != null && user.role.name != "Admin") {
    switch (to.name) {
      case "home":
      case "furnitureView":
      case "productDetailsView":
      case "servicesView":
      case "companyView":
      case "Three":
      case "profileView":
        next();
        break;
      case "shoppingListView":
      case "successOrderView":
        if (user.role.name == "Default User") {
          next();
        } else {
          next("/");
        }
        break;
      case "dashboardView":
      case "storageView":
      case "deliveryView":
      case "productCategoryView":
      case "productManDetailsView":
        if (user.role.name == "Manager" || user.role.name == "Employee") {
          next();
        } else {
          next("/");
        }
        break;
      case "manageView":
      case "financeView":
        if (user.role.name == "Manager") {
          next();
        } else {
          next("/");
        }
        break;
    }
  } else if (user != null && user.role.name == "Admin") {
    next();
  } else {
    next();
  }
});

export default router;
