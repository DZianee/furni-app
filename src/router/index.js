import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FurnitureView from "../views/FurnitureView.vue";
import ServicesView from "../views/ServicesView.vue";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
