import { createWebHistory } from "vue-router";
import { createRouter } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/form",
      component: () => import("./views/Form.vue"),
    },
    {
      path: "/:userid",
      component: () => import("./views/space/Space.vue"),
    },
    {
      path: "/:userid/settings",
      component: () => import("./views/space/Settings.vue"),
    }
  ],
})
