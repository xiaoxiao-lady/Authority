import router from "router";
import store from "store";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from "utils/get-page-title";
NProgress.configure({ showSpinner: false });
// 免登录名单
const whiteList = ["/login"];

router.beforeEach(async (to, form, next) => {
  NProgress.start();
  document.title = getPageTitle();
  /**
   * @description:判断是否有 token
   */
  const hasToken = store.getters.token;
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          //获取用户信息
          await store.dispatch('user/getUserInfo');
          // 获取用户所属角色的权限数据
          const permission = await store.dispatch("user/getRolePermission");
          //生成用户角色可访问的路由表
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            permission
          );
          // 动态挂载路由
          router.addRoutes(accessRoutes);
          /**
           * @description: 确保 addRoutes() 时动态添加的路由已经被完全被挂载
           * 背景：在addRoutes()之后第一次访问被添加的路由会白屏，这是因为刚刚addRoutes()就立刻访问被添加的路由，
           *      然而此时addRoutes()没有执行结束，因而找不到刚刚被添加的路由导致白屏。因此需要从新访问一次路由才
           *      行
           * 解读：next({ …to, replace: true })中的replace: true只是一个设置信息，告诉VUE本次操作后，不能通
           *      过浏览器后退按钮，返回前一个路由
           */
          next({ ...to, replace: true });
        } catch (error) {
          await store.dispatch("user/resetToken");
          Message.error(error || "登录信息有误，请重新登录");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /**
     * @description:如果在免登录白名单，直接进入该路由
     */
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      /**
       * @description:不在免登录白名单，全部重定向到登录页
       */
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
