export default {
  "/menu2": {
    config: {
      name: "menu2",
    },
    meta: {
      title: "菜单二",
      icon: "drag",
    },
  },
  "/menu2Manage": {
    component: () => import("views/menu2/manage.vue"),
    config: {
      name: "menu2Manage",
    },
    meta: {
      title: "管理",
      icon: "drag",
    },
  },
  "/menu2Add": {
    component: () => import("views/menu2/add.vue"),
    config: {
      name: "menu2Add",
    },
    meta: {
      title: "添加",
      icon: "drag",
    },
  },
};
