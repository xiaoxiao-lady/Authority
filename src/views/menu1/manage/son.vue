<template>
  <div class="">
    <div class="box" style="width:100%;height:200px;background-color:red">
      <el-scrollbar
        ref="scrollbar"
        class="boxScrollbar"
        :vertical="false"
        @wheel.native.prevent="handleWheel"
      >
        <div class="item" style="width:2000px;height:200px"></div>
      </el-scrollbar>
    </div>
    <el-button type="primary" @click="handleScrollLeft">滑倒最左</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    scrollbar() {
      return this.$refs.scrollbar.$refs.wrap;
    },
  },
  mounted() {
    this.scrollbar.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy() {
    this.scrollbar.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    /**
     * @description:滚轮左右滚动
     */
    handleWheel(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      this.scrollbar.scrollLeft = this.scrollbar.scrollLeft + eventDelta / 4;
    },
    /**
     * @description: 监听滚动条
     */
    handleScroll(e) {},
    /**
     * @description:滑倒最左端
     */
    handleScrollLeft() {
      let timer;
      let left = this.scrollbar.scrollLeft;
      clearInterval(timer);
      timer = setInterval(() => {
        let speed = left / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        left -= speed;
        this.scrollbar.scrollLeft = left;
        if (left <= 0) {
          clearInterval(timer);
          timer = null;
        }
      }, 20);
    },
  },
};
</script>

<style lang="scss" scoped></style>
