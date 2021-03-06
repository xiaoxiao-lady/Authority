import { login, getUserInfo, getRolePermission } from "api/user";
import { setToken, removeToken, getToken } from "utils/storage";
import { resetRouter } from "router";
const getDefaultState = () => {
  return {
    name: "",
    token: getToken(),
    avatar: "",
    roles: [],
  };
};
const state = getDefaultState();
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState);
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};
const actions = {
  /**
   * @description:登录逻辑
   * 第一步：进入登录页面调用登录接口
   * 第二步：获取返回的 token
   * 第三步: vuex sessionStorage 存储 token
   * 第四步：登录成功之后，登录页重定向至首页
   * 注意1：本地存储 token 的原因：下次打开页面或者刷新页面的时候就能够记住用户的登录状态，不用再去登录页面
   *       了
   * 注意2：本地存储 token 的方式： session ,就是当浏览器关闭了就丢失了，重新打开浏览器都需要登录验证，后端
   *        也会在每周固定一个时间点重新刷新 token,让后台用户全部重新登录一次，确保后台用户不会因为电脑遗失
   *        或者其他原因被人随意使用账号
   */
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then((res) => {
        commit("SET_TOKEN", res.data);
        setToken(res.data);
        resolve();
      });
    }).catch((error) => {
      reject();
    });
  },
  /**
   * @description:获取用户信息
   */
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo({ token: state.token })
        .then((res) => {
          if (!res.data) {
            reject("权限校验失败，非法的登录信息");
          }
          const { roles, name, avatar } = res.data;
          if (!roles || roles.length <= 0) {
            reject("用户的权限列表为空");
          }
          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  /**
   * @description:获取权限信息
   */
  getRolePermission({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRolePermission({ token: state.token })
        .then((res) => {
          if (!res.data) {
            reject("权限校验失败，非法的登录信息");
          }
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken();
      commit("RESET_STATE");
      resolve();
    });
  },
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resetRouter();
      resolve();
    });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
