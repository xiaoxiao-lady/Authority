/** * @description: 菜单栏-头像组件 */
<template>
  <div
    class="sidebar-logo-container"
    :class="{ 'sidebar-logo-container-collapse': collapse }"
  >
    <transition name="siderbarLogoFade">
      <router-link class="sidebar-logo-link" to="/">
        <img :src="logo" class="sidebar-logo" alt="" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      logo: require("images/logo.jpg"),
      title: "后台管理平台",
    };
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
