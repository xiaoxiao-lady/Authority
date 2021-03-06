<template>
  <div class="dashboard">
    <!-- el-scrolbar  API 文档：
          native: Boolean,  // 是否使用本地，设为true则不会启用element-ui自定义的滚动条
           wrapStyle: {},  // 包裹层自定义样式
          wrapClass: {},  // 包裹层自定义样式类
          viewClass: {},  // 可滚动部分自定义样式类
          viewStyle: {},  // 可滚动部分自定义样式
          noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
          tag: {  // 生成的标签类型，默认使用 `div`标签包裹
            type: String,
            default: 'div'
          } -->
    <el-scrollbar
      ref="scrollbar"
      class="dashboardScroll"
      :native="false"
    >
      <component :is="currentView"></component>
      <div style='width:100%;height:500px'></div>
    </el-scrollbar>
  </div>
</template>

<script>
import admin from "./admin";
import user from "./user";
import { mapGetters } from "vuex";
export default {
  components: { admin, user },
  data() {
    return {
      currentView: "admin",
      value: "",
      show:false,
    };
  },
  computed: {
    ...mapGetters(["roles"]),
    scrollbar() {
      return this.$refs.scrollbar.$refs.wrap;
    },
  },
  watch: {},
  created() {
    if (!this.roles.includes("admin")) {
      this.currentView = user;
    }
  },
  mounted() {
  },
  methods: {
    scrollTop() {
      let timer;
      let top = this.scrollbar.scrollTop;
      clearInterval(timer);
      timer = setInterval(() => {
        let speed = top / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        top -= speed;
        this.scrollbar.scrollTop = top;
        if (top <= 0) {
          clearInterval(timer);
          timer = null;
        }
      }, 20);
    },
    search() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: 100%;
  & .dashboard-icon {
    font-size: 18px;
  }
}
</style>
