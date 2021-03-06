import axios from "axios";
import store from "src/store";
/**
 * @description: 创建 axios 实例
 */
const serve = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
});
/**
 * @description: 请求拦截器
 */
serve.interceptors.request.use(
  (config) => {
    const { token } = store.getters;
    if (token) {
      config.headers["Token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/**
 * @description: 响应拦截器
 */
serve.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      serve({
        url,
        method: "get",
        params,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      serve({
        url,
        method: "post",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
