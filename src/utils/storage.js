export const setItem = function(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
};
export const getItem = function(key) {
  return JSON.parse(sessionStorage.getItem(key) || "{}");
};
export const removeItem = function(key) {
  sessionStorage.removeItem(key);
};
export const setToken = function(value) {
  sessionStorage.setItem("token", value);
};
export const getToken = function() {
  return sessionStorage.getItem("token");
};
export const removeToken = function() {
  sessionStorage.removeItem("token");
};
export const setSidebar = function(value) {
  sessionStorage.setItem("sidebar", value);
};
export const getSidebar = function() {
  return sessionStorage.getItem("sidebar");
};
export const removeSidebar = function() {
  sessionStorage.removeItem("sidebar");
};
