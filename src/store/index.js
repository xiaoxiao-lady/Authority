import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
Vue.use(Vuex);

const modulesFiles=require.context('./modules',true,/\.js$/);
const modules=modulesFiles.keys().reduce((modules,modulesPath)=>{
  //作用： './app.js' 转换成 'app'
  const moduleName=modulesPath.replace(/^\.\/(.*)\.\w+$/,'$1');
  modules[moduleName]=modulesFiles(modulesPath).default;
  return modules;
},{});


export default new Vuex.Store({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules,
});
