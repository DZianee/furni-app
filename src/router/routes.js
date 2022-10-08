// import { createRouter, createWebHashHistory } from "vue-router";

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
import InputProfileView from "../views/InputProfileView.vue";
import ProfileView from "../views/ProfileView.vue";
import ThreeD from "../views/Three.vue";

/* children components */
import ActivityAllOrders from "../components/OrderAll.vue";
import ActivityNewOrders from "../components/OrderNew.vue";
import ActivityCheckedOrders from "../components/OrderChecked.vue";
import ActivityCompletedOrders from "../components/OrderCompleted.vue";
import ActivityDeliveryOrders from "../components/OrderDelivery.vue";
import ActivityCancelledOrders from "../components/OrderCancelled.vue";

const router = [
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
    path: "/profile-view/:id/:name",
    name: "profileView",
    component: ProfileView,
    meta: { layout: "without-footer" },
    children: [
      { path: "allorders", component: ActivityAllOrders },
      { path: "neworders", component: ActivityNewOrders },
      { path: "receivedorders", component: ActivityCheckedOrders },
      { path: "deliveryorders", component: ActivityDeliveryOrders },
      { path: "completedorders", component: ActivityCompletedOrders },
      { path: "cancelledorders", component: ActivityCancelledOrders },
    ],
  },
  {
    path: "/profile-input-view/:id",
    name: "inputProfileView",
    component: InputProfileView,
    meta: { layout: "none" },
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
    path: "/product-details-view/:cateType/:id",
    name: "productDetailsView",
    component: ProductDetailsView,
  },
  {
    path: "/shopping-list-view",
    name: "shoppingListView",
    component: ShoppingListView,
    meta: { layout: "without-footer" },
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
    path: "/delivery-view/:id",
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
    path: "/product-manage-details-view/:id",
    name: "productManDetailsView",
    component: ProductManDetailsView,
    meta: { layout: "sidebar-manage" },
  },
  {
    path: "/three",
    name: "Three",
    component: ThreeD,
    meta: { layout: "none" },
  },
];

// const router = createRouter({
//   history: createWebHashHistory(),
//   router,
// });

export default router;
