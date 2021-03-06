export default {
  "/menu9": {
    config: {
      name: "menu9",
    },
    meta: {
      title: "菜单三",
      icon: "drag",
    },
  },
  "/menu9Manage": {
    component: () => import("views/menu9/manage.vue"),
    config: {
      name: "menu9Manage",
    },
    meta: {
      title: "管理",
      icon: "drag",
    },
  },
  "/menu9Add": {
    component: () => import("views/menu9/add.vue"),
    config: {
      name: "menu9Add",
    },
    meta: {
      title: "添加",
      icon: "drag",
    },
  },
};
