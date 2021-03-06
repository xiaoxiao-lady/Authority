import Layout from "layout";
export default [
  {
    path: "/login",
    name: "login",
    hidden: true,
    meta: {
      title: "登录",
    },
    component: () => import("views/login"),
  },
  {
    path: "/404",
    hidden: true,
    meta: {
      title: "404",
    },
    component: Layout,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        meta: { title: "首页", icon: "dashboard", affix: true },
        component: () => import("views/dashboard/index"),
      },
    ],
  },
];
