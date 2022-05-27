import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FurnitureView from "../views/FurnitureView.vue";
import ServicesView from "../views/ServicesView.vue";
import ProductDetailsView from "../views/ProductDetailsView.vue";
import ShoppingListView from "../views/ShoppingListView.vue";
import SuccessOrderView from "../views/SuccessOrderView.vue";
import DashboardView from "../views/DashboardView.vue";
import DeliveryView from "../views/DeliveryView.vue";
import StorageView from "../views/StorageView.vue";
import ManageView from "../views/ManageView.vue";
import ProductCategoryView from "../views/ProductCategory.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { layout: "home-header" },
  },
  {
    path: "/about",
    name: "companyView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/furniture-view",
    name: "furnitureView",
    component: FurnitureView,
  },
  {
    path: "/services-view",
    name: "servicesView",
    component: ServicesView,
  },
  {
    path: "/product-details-view",
    name: "productDetailsView",
    component: ProductDetailsView,
  },
  {
    path: "/shopping-list-view",
    name: "shoppingListView",
    component: ShoppingListView,
  },
  {
    path: "/success-order-view",
    name: "successOrderView",
    component: SuccessOrderView,
  },
  {
    path: "/dashboard-view",
    name: "dashboardView",
    component: DashboardView,
    meta: { layout: "sidebar-manage" },
  },
  {
    path: "/manage-view",
    name: "manageView",
    component: ManageView,
    meta: { layout: "sidebar-manage" },
  },
  {
    path: "/storage-view",
    name: "storageView",
    component: StorageView,
    meta: { layout: "sidebar-manage" },
  },
  {
    path: "/delivery-view",
    name: "deliveryView",
    component: DeliveryView,
    meta: { layout: "sidebar-manage" },
  },
  {
    path: "/product-category-view",
    name: "productCategoryView",
    component: ProductCategoryView,
    meta: { layout: "sidebar-manage" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
