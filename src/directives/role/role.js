import store from "store";
function checkRolePermission(el, binding) {
  const { value } = binding;
  const haveRoles = store.getters && store.getters.roles;
  if (value && value instanceof Array) {
    if (value.length > 0) {
      const needRoles = value;
      const hasPermission = haveRoles.some((role) => {
        return needRoles.includes(role);
      });
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  } else {
    throw new Error("需要配置角色信息，比如 ['admin'] admin 角色");
  }
}
export default {
  inserted(el, binding) {
    checkRolePermission(el, binding);
  },
  update(el, binding) {
    checkRolePermission(el, binding);
  },
};
