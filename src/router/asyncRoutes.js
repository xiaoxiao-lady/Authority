/**
 * @description: 自动引入路由表
 * *路由表数据结构：
 *    export default{
      '/menu1':{
        component:()=>important('./home.vue'),
        config:{
          name:'menu1'
        },
        meta:{
          title: "菜单一",
          icon: "drag",
        },
      },
    }
 */
const moduleFiles = require.context("./asyncRoutes", true, /\.js$/);
const modules = moduleFiles.keys().reduce((modules, route) => {
  modules = Object.assign(modules, { ...moduleFiles(route).default });
  return modules;
}, {});
export default modules;
