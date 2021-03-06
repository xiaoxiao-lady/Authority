export default {
  "/menu8": {
    config: {
      name: "menu8",
    },
    meta: {
      title: "菜单八",
      icon: "drag",
    },
  },
  "/menu8Manage": {
    component: () => import("views/menu8/manage.vue"),
    config: {
      name: "menu8Manage",
    },
    meta: {
      title: "管理",
      icon: "drag",
    },
  },
  "/menu8Add": {
    component: () => import("views/menu8/add.vue"),
    config: {
      name: "menu8Add",
    },
    meta: {
      title: "添加",
      icon: "drag",
    },
  },
};
