export default {
  "/menu4": {
    config: {
      name: "menu4",
    },
    meta: {
      title: "菜单四",
      icon: "drag",
    },
  },
  "/menu4Manage": {
    component: () => import("views/menu4/manage.vue"),
    config: {
      name: "menu3Manage",
    },
    meta: {
      title: "管理",
      icon: "drag",
    },
  },
  "/menu4Add": {
    component: () => import("views/menu4/add.vue"),
    config: {
      name: "menu4Add",
    },
    meta: {
      title: "添加",
      icon: "drag",
    },
  },
};
