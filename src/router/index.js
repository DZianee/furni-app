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
import ProductManDetailsView from "../views/ProductManDetailsView.vue";
import FinanceView from "../views/FinanceView.vue";
import RegisterView from "../views/RegisterView.vue";

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
    path: "/register-view",
    name: "registerView",
    component: RegisterView,
    meta: { layout: "empty" },
  },
  {
    path: "/furniture-view/:id",
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
    path: "/manage-view/:id",
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
    path: "/finance-view",
    name: "financeView",
    component: FinanceView,
    meta: { layout: "sidebar-manage" },
  },
  {
    path: "/product-category-view/:id",
    name: "productCategoryView",
    component: ProductCategoryView,
    meta: { layout: "sidebar-manage" },
  },
  {
    path: "/product-manage-details-view",
    name: "productManDetailsView",
    component: ProductManDetailsView,
    meta: { layout: "sidebar-manage" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
