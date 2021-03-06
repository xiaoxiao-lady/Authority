import request from "utils/request";
export const login = (params) => {
  return request.post("/user/login", params);
};
export const getUserInfo = (params) => {
  return request.post("/user/roleInfo", params);
};
export const getRolePermission = (params) => {
  return request.post("/user/rolePermission", params);
};
export const getRolePermissionRoleId = (params) => {
  return request.post("/user/rolePermissionRoleId", params);
};
export const getRoleList = (params) => {
  return request.post("/user/roleList", params);
};
export const gerPermissionList = (params) => {
  return request.post("/user/permissionList", params);
};
