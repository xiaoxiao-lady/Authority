import { getSidebar, setSidebar } from "utils/storage";
const state = {
  sidebar: {
    opened: getSidebar() ? Boolean(getSidebar) : true,
    withoutAnimation: false,
  },
  device:'pc',
};
const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    setSidebar(false);
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
};
const actions = {
  toggleSidebar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  closeSidebar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({commit},device){
    commit('TOGGLE_DEVICE',device);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
