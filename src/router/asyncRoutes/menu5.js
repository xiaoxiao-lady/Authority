export default {
  "/menu5": {
    config: {
      name: "menu5",
    },
    meta: {
      title: "菜单五",
      icon: "drag",
    },
  },
  "/menu5Manage": {
    component: () => import("views/menu5/manage.vue"),
    config: {
      name: "menu5Manage",
    },
    meta: {
      title: "管理",
      icon: "drag",
    },
  },
  "/menu5Add": {
    component: () => import("views/menu5/add.vue"),
    config: {
      name: "menu5Add",
    },
    meta: {
      title: "添加",
      icon: "drag",
    },
  },
};
