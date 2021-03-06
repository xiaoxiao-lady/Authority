<template>
  <el-scrollbar
    ref="scrollbar"
    :vertical="false"
    class="tagsScrollbar"
    @wheel.native.prevent="handleScroll"
  >
    <slot></slot>
  </el-scrollbar>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tagAndTagSpacing : 4 // tagAndTagSpacing
    };
  },
  computed: {
    scrollbar() {
      return this.$refs.scrollbar.$refs.wrap;
    },
  },
  watch: {},
  mounted() {
    this.scrollbar.addEventListener("scroll", this.emitScroll, true);
  },
  beforeDestroy() {
    this.scrollbar.removeEventListener("scroll", this.emitScroll);
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = this.scrollbar;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
    },
    emitScroll() {},
    moveToCurrentTag(currentTag) {
      const $container = this.$refs.scrollbar.$el;
      const $containerWidth = $container.offsetWidth;
      const $scrollWrapper = this.scrollbar;
      const tagList = this.$parent.$refs.tag;

      let firstTag = null;
      let lastTag = null;

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0];
        lastTag = tagList[tagList.length - 1];
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0;
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft =
          $scrollWrapper.scrollWidth - $containerWidth;
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex((item) => item === currentTag);
        const prevTag = tagList[currentIndex - 1];
        const nextTag = tagList[currentIndex + 1];

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + this.tagAndTagSpacing;

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft =
          prevTag.$el.offsetLeft - this.tagAndTagSpacing;

        if (
          afterNextTagOffsetLeft >
          $scrollWrapper.scrollLeft + $containerWidth
        ) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
