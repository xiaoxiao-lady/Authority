//克隆对象
export function deepClone(source) {
  return JSON.parse(JSON.stringify(source));
}
// 检测元素是否含有类名
export function hasClass(ele, clas) {
  return !!ele.className.match(new RegExp("(\\s|^)" + clas + "(\\s|$)"));
}
// 元素添加类名
export function addClass(ele, clas) {
  if (!hasClass(ele, clas)) ele.className += "" + clas;
}
// 元素删除类名
export function removeClass(ele, clas) {
  if (hasClass(ele, clas)) {
    const reg = new RegExp("(\\s|^)" + clas + "(\\s|$)");
    ele.className = ele.className.replace(reg, "");
  }
}
