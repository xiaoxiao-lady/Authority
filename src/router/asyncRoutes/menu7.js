export default {
  "/menu7": {
    config: {
      name: "menu7",
    },
    meta: {
      title: "菜单七",
      icon: "drag",
    },
  },
  "/menu7Manage": {
    component: () => import("views/menu7/manage.vue"),
    config: {
      name: "menu7Manage",
    },
    meta: {
      title: "管理",
      icon: "drag",
    },
  },
  "/menu7Add": {
    component: () => import("views/menu7/add.vue"),
    config: {
      name: "menu7Add",
    },
    meta: {
      title: "添加",
      icon: "drag",
    },
  },
};
