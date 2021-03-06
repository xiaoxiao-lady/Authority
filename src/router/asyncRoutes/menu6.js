export default {
  "/menu6": {
    config: {
      name: "menu6",
    },
    meta: {
      title: "菜单六",
      icon: "drag",
    },
  },
  "/menu6Manage": {
    component: () => import("views/menu6/manage.vue"),
    config: {
      name: "menu6Manage",
    },
    meta: {
      title: "管理",
      icon: "drag",
    },
  },
  "/menu6Add": {
    component: () => import("views/menu6/add.vue"),
    config: {
      name: "menu6Add",
    },
    meta: {
      title: "添加",
      icon: "drag",
    },
  },
};
