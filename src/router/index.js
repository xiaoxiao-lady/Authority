import Vue from "vue";
import VueRouter from "vue-router";
import constantRoutes from "router/constantRoutes";

/**
 * @description:解决重复点击路由跳转报错的问题
 */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

/**
 * @description:router
 * *路由权限控制：
 * **动态挂载路由：addRoutes()  已有方法 
 * **动态重置路由：resetRouter()  未有方法，需要自定义
 * *路由权限控制过程：
 * **用户登录返回权限凭证 Token
 * **用户通过 Token 获取角色、角色权限
 * **前端根据角色权限动态生成可访问的路由
 * **通过 addRoutes 进行动态的路由挂载
 * **但是，动态添加的路由不能动态的删除，当用户权限发生变化
 *   的时候（或者用户切换身份），我们只能通过刷新页面的方式，
 *   才能清空我们之前注册的路由
 * **此时我们自己定义一个重置路由的方法，用来重置路由
 */

const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

/**
 * @description: router.matcher
 * **介绍:所有的 vue-router 注册的路由信息都是存放在matcher之中的
 * **作用：对 router.matcher 属性做修改，那么新的 routes 会替换老的 routes
 * **router.matcher 对外提供两个方法
 *    ***match:负责 route 匹配
 *    ***addRoutes:动态添加路由
 */
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}
export default router;
