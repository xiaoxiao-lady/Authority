<template>
  <div :class='{hasLogo:sidebarLogo}'>
    <Logo v-if='sidebarLogo' :collapse="isCollapse"></Logo>
    <el-scrollbar class='sidebarScroll'>
      <!-- 解读：
        * default-active:当前激活的菜单 index
        * background-color: 菜单背景颜色
        *texyt-color:菜单文字颜色
        *collapse-transition:是否开启折叠动画
        *collapse:是否水平折叠收起菜单
        *unique-opened:是否只保持一个子菜单展开
       -->
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse="isCollapse"
        :collapse-transition="true"
        :unique-opened="true"
      >
        <!-- 解读
          *item:路由
          *base-path:路由路径
         -->
        <SidebarItem
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></SidebarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "styles/variables.scss";

import { mapGetters } from "vuex";
export default {
  components: {
    Logo,
    SidebarItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["permission_routes", "sidebar","sidebarLogo"]),
    variables() {
      return variables;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  watch: {},
  mounted() {
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
