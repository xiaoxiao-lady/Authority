const getters = {
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  permission_routes: (state) => state.permission.routes,

  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,

  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,

  showSettings: (state) => state.settings.showSettings,
  sidebarLogo: (state) => state.settings.sidebarLogo,
  tagsView: (state) => state.settings.tagsView,
  fixedHeader: (state) => state.settings.fixedHeader,
};
export default getters;
