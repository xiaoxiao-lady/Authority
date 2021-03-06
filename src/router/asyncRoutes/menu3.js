export default {
  "/menu3": {
    config: {
      name: "menu3",
    },
    meta: {
      title: "菜单三",
      icon: "drag",
    },
  },
  "/menu3Manage": {
    component: () => import("views/menu3/manage.vue"),
    config: {
      name: "menu3Manage",
    },
    meta: {
      title: "管理",
      icon: "drag",
    },
  },
  "/menu3Add": {
    component: () => import("views/menu3/add.vue"),
    config: {
      name: "menu3Add",
    },
    meta: {
      title: "添加",
      icon: "drag",
    },
  },
};
