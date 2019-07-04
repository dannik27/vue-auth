import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

import App from "./App.vue";
import router from "./routes";

Vue.config.productionTip = false;

Vue.use(VueRouter);

axios.interceptors.request.use(
  function(config) {
    config.headers.Authorization = localStorage.token;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    if (error.response.status == 401) {
      localStorage.username = null;
      localStorage.token = null;
      router.push("/page401");
    }
    return Promise.reject(error);
  }
);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
