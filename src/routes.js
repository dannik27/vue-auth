import VueRouter from "vue-router";

import HomeComponent from "./components/home";
import LoginComponent from "./components/login";
import RegistrationComponent from "./components/registration";
import Page401 from "./components/page401";

const routes = [
  {
    path: "/register",
    component: RegistrationComponent
  },
  {
    path: "/login",
    component: LoginComponent
  },
  {
    path: "/home",
    component: HomeComponent,
    meta: {
      secured: true
    }
  },
  {
    path: "/page401",
    component: Page401
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.secured)) {
    if (
      localStorage.getItem("token") == null ||
      localStorage.getItem("token") == "null"
    ) {
      next({
        path: "/page401",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
