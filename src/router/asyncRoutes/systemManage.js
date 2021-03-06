export default {
  "/systemManage": {
    config: {
      name: "systemManage",
    },
    meta: {
      title: "系统管理",
      icon: "system",
    },
  },
  "/roleManage": {
    component: () => import("views/systemManage/roleManage.vue"),
    config: {
      name: "roleManage",
    },
    meta: {
      title: "角色管理",
      icon: "roles",
    },
  },
};
