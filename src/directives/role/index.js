import checkRolePermission from "./role";
const install = function(Vue) {
  Vue.directive("checkRolePermission", checkRolePermission);
};
if (window.Vue) {
  window["checkRolePermission"] = checkRolePermission;
  Vue.use(install);
}
checkRolePermission.install = install;
export default checkRolePermission;
