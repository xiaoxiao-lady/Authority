import Layout from "layout";
import constantRoutes from "router/constantRoutes";
import asyncRoutes from "router/asyncRoutes.js";

/**
 * @description: 通过后端返回的路由表，结合 asyncRoutesMap 生成新的路由表
 */
export function filterAsyncRoutes(menu, deep) {
  return menu.map((item) => {
    //解构后端路由表
    const { path, parentId } = item;
    let { children } = item;
    //筛选出菜单权限
    children = children.filter((itemChild) => {
      return itemChild.type == "菜单";
    });
    //通过后端路由表路径，寻找前端路由表 map
    const map = asyncRoutes[String(path).trim()];
    //如果前端路由表匹配不到后端 path,直接重定向到 404
    if (!map) {
      return {
        path,
        redirect: "/404",
        component: Layout,
        hidden: true,
      };
    }
    //解构匹配到后端 path 的前端路由表 map
    const { component, config, meta } = map;
    if (children && children.length > 0) {
      return {
        path,
        component: deep ? component : Layout,
        redirect: children[0].path,
        alwaysShow: true,
        children: filterAsyncRoutes(children, 1),
        meta: {
          ...meta,
        },
        ...config,
      };
    } else {
      if (parentId == "0") {
        return {
          path: "/",
          component: Layout,
          redirect: path,
          children: [
            {
              path,
              component,
              meta: { ...meta },
              ...config,
            },
          ],
        };
      } else {
        return {
          path,
          component,
          meta: {
            ...meta,
          },
          ...config,
        };
      }
    }
  });
}
const state = {
  routes: [],
  addRoutes: [],
};
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};
const actions = {
  generateRoutes({ commit }, permission) {
    return new Promise((resolve) => {
      const accessedRoutes = filterAsyncRoutes(permission, 0);
      //补充 404 页面，必须放到路由的最后
      accessedRoutes.push({ path: "*", redirect: "/404", hidden: true });
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
