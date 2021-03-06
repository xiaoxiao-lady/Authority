import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "normalize.css/normalize.css";
import "styles/index.scss";

import ElementUI from "element-ui";

import './icons'

import "src/permission";

import checkRolePermission from "directives/role/";
Vue.use(checkRolePermission);

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
