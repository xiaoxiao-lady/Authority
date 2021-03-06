<template>
  <div class="settings-container">
    <RightPanel>
      <div class="settings-title">设置</div>
      <div class="settings-item">
        <span>主题切换</span>
        <!-- 颜色选择器 -->
        <ThemePicker
          style="float:right;height:26px;margin:-3px 8px 0 0;"
          @change="themeChange"
        ></ThemePicker>
      </div>
      <div class="settings-item">
        <span>显示头像</span>
        <el-switch v-model="sidebarLogo" class="settings-switch"></el-switch>
      </div>
      <div class="settings-item">
        <span>显示标签栏</span>
        <el-switch v-model="tagsView" class="settings-switch"></el-switch>
      </div>
    </RightPanel>
  </div>
</template>

<script>
import RightPanel from "./RightPanel";
import ThemePicker from "./ThemePicker";

export default {
  components: {
    RightPanel,
    ThemePicker,
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    sidebarLogo: {
      get() {
        return this.$store.getters.sidebarLogo;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "sidebarLogo",
          value: val,
        });
      },
    },
    tagsView: {
      get() {
        return this.$store.getters.tagsView;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "tagsView",
          value: val,
        });
      },
    },
    fixedHeader: {
      get() {
        return this.$store.getters.fixedHeader;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "fixedHeader",
          value: val,
        });
      },
    },
  },
  mounted() {},
  methods: {
    themeChange(newVal) {
      this.$store.dispatch("settings/changeSetting", {
        key: theme,
        value: newVal,
      });
    },
  },
};
</script>
