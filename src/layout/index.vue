<template>
  <div class="app-container" :class="classObj">
    <!-- 遮罩层
      *需求：屏幕宽度为移动设备宽度时，打开菜单栏，显示遮罩层,点击遮罩，关闭菜单栏
     -->
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="mask"
      @click="handleCloseSidebar"
    ></div>
    <!-- 菜单栏 -->
    <Siderbar class="sidebar-container"></Siderbar>
    <!-- 内容 -->
    <div class="main-container" :class="{ tagsView: tagsView }">
      <!-- 导航栏 -->
      <Navbar></Navbar>
      <!-- 标签栏 -->
      <Tags v-if="tagsView"></Tags>
      <!-- 视图区 -->
      <Views></Views>
      <!-- 设置 -->
      <Settings v-if="showSettings"></Settings>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Siderbar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Tags from "./components/Tags";
import Views from "./components/Views";
import Settings from "./components/Settings";

/**
 * @description: 监听屏幕大小
 */
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  components: {
    Siderbar,
    Navbar,
    Tags,
    Views,
    Settings,
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      "sidebar",
      "device",
      "tagsView",
      "fixedHeader",
      "showSettings",
    ]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device == "mobile",
      };
    },
  },
  data() {
    return {
      Siderbar,
    };
  },
  watch: {},
  mounted() {},
  methods: {
    /**
     * @description: 关闭菜单栏
     */
    handleCloseSidebar() {
      this.$store.dispatch("app/closeSidebar", { withoutAnimation: false });
    },
  },
};
</script>
