<template>
  <div class="avatar">
    <el-dropdown trigger="click">
      <div class="img">
        <img src="../../../assets/images/logo.jpg" alt="" />
        <svg-icon class-name="down-icon" icon-class="down"></svg-icon>
      </div>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.path}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
