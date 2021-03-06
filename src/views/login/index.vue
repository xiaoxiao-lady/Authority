<template>
  <div class="login-container">
    <login ref="login" @login="login"></login>
  </div>
</template>

<script>
import login from "./components/login";
export default {
  components: {
    login,
  },
  data() {
    return {
      redirect: "",
    };
  },
  watch: {
    $route: {
      handler(route) {
        const query = route.query;
        if (query) {
          this.redirect = route.query.redirect;
        }
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    /**
     * @description:登录成功，需要重定向到首页（登录成功后，不能再返回登录页）
     * 问题1：Redirected when going from "/login?redirect=%2Fdashboard" to "/dashboard"
     * 解决：每次push都去主动写一个空的回调
     */
    login(formData) {
      this.$store.dispatch("user/login", formData).then((res) => {
        this.$router.replace({ path: this.redirect || "/" }, () => {});
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: #283443;
.login-container {
  width: 100%;
  height: 100%;
  background-color: $bg;
  position: relative;
}
</style>
