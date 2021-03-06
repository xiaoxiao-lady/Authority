import defaultSettings from "src/settings";
const title = defaultSettings.title || "vue-element-admin";
/**
 * @description:设置网页标题
 * 描述：如果页面没有设置标题，则使用默认标题
 */
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}`;
  }
  return title;
}
